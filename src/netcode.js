// netcode.js - WebSocket client

import {
  WS_BASE,
  MAX_HISTORY_MS,
  SEND_MS,
  MAX_UP_SPEED,
  MAX_DOWN_SPEED,
  isNum,
  angDiff,
  clamp,
  moveToward
} from "./shared.js";
import { validateShot, flagSuspicious } from "./anticheat.js";
import { initViewModel, updateViewModel, setViewModelVisible, getViewModel } from "./pviewmodel.js";

var opts = null;             
var ws = null;                
var myId = null;
var connected = !1;
var roomId = null;
var onlineMatch = !1;         
var remotes = new Map();      
var sendTimer = 0;
var rafId = 0;
var lastFrame = 0;
var pingTimer = 0;            
var lastRtt = null;           
var sendCount = 0;            
var lastSent = null;          
var lastSentT = 0;
var fullRetries = 0;          
var reconnects = 0;           
var intentionalClose = !1;
var visHooked = !1;           


function setOnline(v) {
  onlineMatch = v;
  try {
    window.__clutcherOnlineMatch = !!v
  } catch {}
}

export function isConnected() {
  return connected && !!ws && ws.readyState === 1
}

export function getMyId() {
  return myId
}

export function isOnlineMatch() {
  return onlineMatch
}

export function getLatency() {
  return lastRtt
}


var mmMap = "dusker";

var qmResolve = null;
var qmReject = null;
// socket generation: bumped in openSocket(); handlers capture their own
// generation and ignore their late events once a newer socket exists
var connGen = 0;

// settles the pending quickmatch promise exactly once (success -> resolve
// with roomId, failure -> reject). Every terminal path calls this so the
// caller awaiting requestMatch() (hud.js:1930) is never left hanging.
function settleQuick(err) {
  if (!qmResolve && !qmReject) return;
  let rs = qmResolve, rj = qmReject;
  qmResolve = qmReject = null;
  if (err && rj) rj(err);
  else if (rs) rs(roomId);
}

export function requestMatch(map) {
  mmMap = map || mmMap;
  setOnline(!0);
  return new Promise((resolve, reject) => {
    // a second requestMatch while one is pending (double-click, retry races)
    // must not orphan the old promise - hud.js awaits it with .catch
    settleQuick(new Error("superseded by a new match request"));
    qmResolve = resolve, qmReject = reject;
    try {
      console.log("[net] quickmatch map=" + mmMap)
    } catch {}
    connectQuick(mmMap);
  });
}

function connectQuick(map) {
  openSocket(WS_BASE + "/quickmatch/" + map, null);
}

function connectRoom(room) {
  openSocket(WS_BASE + "/match/" + room, room);
}

function openSocket(url, room) {
  roomId = room || roomId;
  intentionalClose = !1;
  // the old socket's close/message events still fire after this line (close()
  // is async) - every handler below is bound to this generation and ignores
  // itself once a newer socket exists, so a stale event can never tear down
  // the new connection's state (loops, remotes, connected flag)
  const gen = ++connGen;
  try {
    ws && ws.close()
  } catch {}
  ws = new WebSocket(url);
  ws.onopen = () => {
    if (gen !== connGen) return;
    try {
      console.log("[net] socket open " + url)
    } catch {}
  };
  ws.onmessage = e => {
    if (gen !== connGen) return; // the old room's messages must not leak in
    try {
      handleMsg(JSON.parse(e.data))
    } catch {}
  };
  ws.onclose = e => {
    if (gen !== connGen) return;
    try {
      console.warn("[net] socket close code=" + e.code + " reason=" + (e.reason || ""))
    } catch {}
    let was = connected;
    connected = !1;
    stopLoops();
    if (intentionalClose) return;
    // drop all remotes; the game clears meshes through the callback
    for (let id of [...remotes.keys()]) {
      remotes.delete(id);
      try {
        opts.despawnRemotePlayer(id)
      } catch {}
    }
    if (!was && !roomId) {
      // quickmatch never completed: retry it (the room id is unknown)
      if (reconnects++ < 3) {
        setTimeout(() => connectQuick(mmMap), 600 * reconnects)
      } else {
        setOnline(!1);
        settleQuick(new Error("could not reach matchmaker"))
      }
      return
    }
    if (reconnects++ < 3 && roomId) {
      setTimeout(() => connectRoom(roomId), 600 * reconnects)
    } else if (was) {
      setTimeout(() => requestMatch(mmMap)["catch"](() => setOnline(!1)), 1000)
    } else {
      // out of retries and never connected: fail the pending quickmatch
      // promise instead of leaving it hanging forever
      setOnline(!1);
      settleQuick(new Error("could not reach matchmaker"))
    }
  };
  ws.onerror = () => {};
}

function send(o) {
  if (isConnected()) {
    try {
      ws.send(JSON.stringify(o))
    } catch {}
  }
}

function openRemotes(list) {
  for (let p of list || []) {
    if (!p || p.id == null || p.id === myId || remotes.has(p.id)) continue;
    remotes.set(p.id, {
      id: p.id,
      x: p.x || 0, y: p.y || 0, z: p.z || 0, ry: p.ry || 0,
      tx: p.x || 0, ty: p.y || 0, tz: p.z || 0, ttry: p.ry || 0,
      hp: p.hp == null ? 100 : p.hp, team: p.team, kills: p.kills || 0
    });
    try {
      opts.spawnRemotePlayer(p.id, { x: p.x || 0, y: p.y || 0, z: p.z || 0, ry: p.ry || 0, hp: p.hp == null ? 100 : p.hp, team: p.team, kills: p.kills || 0 })
    } catch {}
  }
}

function handleMsg(m) {
  if (!m || !m.t) return;
  switch (m.t) {
    case "welcome": {
      myId = m.id;
      connected = !0;
      reconnects = 0, fullRetries = 0;
      if (m.roomId) roomId = m.roomId;
      try {
        console.log("[net] welcome id=" + myId + " room=" + roomId + " players=" + (m.players || []).length)
      } catch {}
      
      settleQuick();
      
      onlineMatch = !0;
      try {
        window.__clutcherOnlineMatch = !0
      } catch {}
      openRemotes(m.players);
      // latency probe: first ping right away, then every 2s (server echoes vt)
      lastRtt = null;
      send({ t: "p", vt: performance.now() });
      clearInterval(pingTimer);
      pingTimer = setInterval(() => send({ t: "p", vt: performance.now() }), 2000);
      
      setViewModelVisible(!1);
      try {
        opts.onSelfSpawn({ id: myId, players: m.players || [], roomId })
      } catch {}
      // local player only: show the netcode viewmodel on the local camera
      setViewModelVisible(!0);
      startLoops();
      break
    }
    case "join": {
      if (m.id == null || m.id === myId || remotes.has(m.id)) break;
      remotes.set(m.id, { id: m.id, x: m.x || 0, y: m.y || 0, z: m.z || 0, ry: m.ry || 0, tx: m.x || 0, ty: m.y || 0, tz: m.z || 0, ttry: m.ry || 0, hp: 100, team: m.tm });
      try {
        opts.spawnRemotePlayer(m.id, { x: m.x || 0, y: m.y || 0, z: m.z || 0, ry: m.ry || 0, hp: 100, team: m.tm })
      } catch {}
      break
    }
    case "leave": {
      if (m.id == null) break;
      remotes.delete(m.id);
      try {
        opts.despawnRemotePlayer(m.id)
      } catch {}
      break
    }
    case "s": {
      let r = remotes.get(m.id);
      if (!r) break;
      if (!r.got1) {
        r.got1 = true;
        try { console.log("[net] first state from", m.id, m.x, m.y, m.z) } catch {}
      }
      isNum(m.x) && (r.tx = m.x);
      isNum(m.y) && (r.ty = m.y);
      isNum(m.z) && (r.tz = m.z);
      isNum(m.ry) && (r.ttry = m.ry);
      if (m.tm === "CT" || m.tm === "T") r.team = m.tm;
      if (isNum(m.k)) r.kills = m.k;
      break
    }
    case "sh": {
      try {
        opts.onShot({ id: m.id, ox: m.ox, oy: m.oy, oz: m.oz, dx: m.dx, dy: m.dy, dz: m.dz })
      } catch {}
      break
    }
    case "hp": {
      let r = remotes.get(m.id);
      if (r && isNum(m.hp)) r.hp = m.hp;
      if (opts.onHp) {
        try {
          opts.onHp({ id: m.id, hp: m.hp })
        } catch {}
      }
      break
    }
    case "dead": {
      let r = remotes.get(m.id);
      if (r) r.hp = 0;
      try {
        opts.onDead({ id: m.id, killer: m.killer })
      } catch {}
      break
    }
    case "players": {
      // authoritative snapshot (every ~5s): reconcile - spawn anything the
      // client is missing (e.g. a lost "join" event), refresh teams + hp
      if (!connected || !m.list) break;
      for (let p of m.list) {
        if (p.id == null || p.id === myId) continue;
        let r = remotes.get(p.id);
        if (!r) {
          remotes.set(p.id, { id: p.id, x: p.x || 0, y: p.y || 0, z: p.z || 0, ry: p.ry || 0, tx: p.x || 0, ty: p.y || 0, tz: p.z || 0, ttry: p.ry || 0, hp: p.hp == null ? 100 : p.hp, team: p.team });
          try {
            opts.spawnRemotePlayer(p.id, { x: p.x || 0, y: p.y || 0, z: p.z || 0, ry: p.ry || 0, hp: p.hp, team: p.team });
          } catch {}
        } else if (isNum(p.hp) && p.hp !== r.hp) {
          
          r.hp = p.hp;
          try { opts.onHp({ id: p.id, hp: p.hp }) } catch {}
        }
        if (p.team && r.team !== p.team) {
          r.team = p.team;
        }
      }
      break
    }
    case "p2": {
      if (isNum(m.vt)) lastRtt = Math.max(0, Math.round(performance.now() - m.vt));
      break
    }
    case "full": {
      
      intentionalClose = !0;
      try {
        ws.close()
      } catch {}
      connected = !1, ws = null, stopLoops();
      if (fullRetries++ < 5) {
        // retry the socket directly: requestMatch() would orphan the pending
        // promise the original caller is still awaiting
        setTimeout(() => connectQuick(mmMap), 400 * fullRetries)
      } else {
        setOnline(!1);
        flagSuspicious(myId, "matchmaker full, giving up");
        settleQuick(new Error("matchmaker full"))
      }
      break
    }
  }
}

// ---- 20Hz state send sub-tick client timestamp per update
function sendState() {
  if (!isConnected() || !opts.getPlayerTransform) return;
  
  if (opts.canSendState && !opts.canSendState()) {
    lastSent = null;
    return
  }
  let t = opts.getPlayerTransform() || {};
  let now = performance.now();
  if (!isNum(t.x) || !isNum(t.y) || !isNum(t.z) || !isNum(t.ry)) return;
  
  lastSent = { x: t.x, y: t.y, z: t.z }, lastSentT = now;
  if (!sendCount) {
    try { console.log("[net] first state sent", t.x, t.y, t.z) } catch {}
  }
  sendCount++;
  send({ t: "s", x: t.x, y: t.y, z: t.z, ry: t.ry, tm: t.team, k: t.kills, vt: now })
}

export function sendShot(ox, oy, oz, dx, dy, dz) {
  if (!validateShot({ x: ox, y: oy, z: oz }, { x: dx, y: dy, z: dz })) {
    flagSuspicious(myId, "bad shot rejected locally");
    return !1
  }
  
  send({ t: "sh", ox, oy, oz, dx, dy, dz, vt: performance.now() });
  return !0
}

export function sendHit(targetId, dmg, ray) {
  if (!targetId || !isNum(dmg)) return !1;
  let m = { t: "hit", target: targetId, dmg: clamp(dmg, 0, 100), vt: performance.now() };
  
  if (ray && isNum(ray.ox) && isNum(ray.oy) && isNum(ray.oz) && isNum(ray.dx) && isNum(ray.dy) && isNum(ray.dz)) {
    m.ox = ray.ox, m.oy = ray.oy, m.oz = ray.oz, m.dx = ray.dx, m.dy = ray.dy, m.dz = ray.dz
  }
  send(m);
  return !0
}

function frame(now) {
  rafId = requestAnimationFrame(frame);
  let dt = lastFrame ? Math.min(.1, (now - lastFrame) / 1000) : .016;
  lastFrame = now;
  if (!connected) return;
  // interpolate every remote toward its latest sub-tick target (~15 u/s
  // horizontal; vertical uses the physics caps, see MAX_UP/DOWN_SPEED)
  for (let [rid, r] of remotes) {
    let d = Math.hypot(r.tx - r.x, r.ty - r.y, r.tz - r.z);
    if (d > 8) {
      // server jump (spawn/respawn/teleport correction): snap
      r.x = r.tx, r.y = r.ty, r.z = r.tz, r.ry = r.ttry
    } else {
      let step = 15 * dt;
      r.x = moveToward(r.x, r.tx, step);
      r.z = moveToward(r.z, r.tz, step);
      // vertical: with no terminal velocity a fall reaches ~36-55 u/s, far
      // above the 15 u/s horizontal rate - interpolating y at that rate
      // renders falls in slow motion until the 8-unit snap fires. The server
      // validates ascent/descent against these same caps, so no legit
      // movement can outrun the interpolation.
      r.y = moveToward(r.y, r.ty, (r.ty < r.y ? MAX_DOWN_SPEED : MAX_UP_SPEED) * dt);
      r.ry += clamp(angDiff(r.ry, r.ttry), -8 * dt, 8 * dt) // yaw wrap-around safe
    }
    try {
      // pass the MAP KEY (rid) - remote objects are keyed by id
      opts.applyRemoteUpdate(rid, { x: r.x, y: r.y, z: r.z, ry: r.ry, hp: r.hp, team: r.team, kills: r.kills || 0 })
    } catch {}
  }
  
  let st = {};
  if (opts.getPlayerTransform) {
    let p = opts.getPlayerTransform() || {};
    st.yaw = p.ry || 0;
    st.pitch = p.pitch || 0;
    if (lastSent) {
      let dt2 = Math.max(.001, (now - lastSentT) / 1000);
      st.vx = (p.x - lastSent.x) / dt2;
      st.vz = (p.z - lastSent.z) / dt2;
    }
    st.onGround = p.onGround !== !1;
    st.recoil = 0;
  }
  updateViewModel(dt, st);
}

function startLoops() {
  stopLoops();
  lastSent = null, lastSentT = 0, lastFrame = 0, sendCount = 0;
  sendTimer = setInterval(sendState, SEND_MS);
  rafId = requestAnimationFrame(frame);
}

function stopLoops() {
  clearInterval(sendTimer), sendTimer = 0;
  clearInterval(pingTimer), pingTimer = 0;
  cancelAnimationFrame(rafId), rafId = 0;
}


// closes the socket, clears the online flag so practice bots work again
export function disconnectOnline() {
  intentionalClose = !0;
  for (let id of [...remotes.keys()]) {
    remotes.delete(id);
    try {
      opts && opts.despawnRemotePlayer(id)
    } catch {}
  }
  try {
    ws && ws.close()
  } catch {}
  ws = null, connected = !1, myId = null;
  stopLoops();
  setOnline(!1);
  settleQuick(new Error("left online mode"))
}

// ---- single entry point ----
export function initMultiplayer(o) {
  opts = o || {};
  initViewModel(opts.scene, opts.camera);
  // browsers throttle timers in hidden tabs (setInterval drops to ~1Hz), so
  // push a state update the instant the tab becomes visible again instead of
  // waiting for the throttled tick
  if (!visHooked) {
    visHooked = !0;
    try {
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && isConnected()) sendState()
      })
    } catch {}
  }
  return { requestMatch, sendShot, sendHit, getMyId, isConnected, isOnlineMatch, getViewModel, disconnectOnline, getLatency }
}
