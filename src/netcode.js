// ============================================================================
// netcode.js - WebSocket client, matchmaking, state loop, sub-tick timestamps,
// remote-player interpolation, viewmodel wiring.
//
// INTEGRATION - add these 3 lines to main.js (once, after scene/camera exist):
//   import { initMultiplayer, requestMatch } from "./netcode.js";
//   initMultiplayer({ getPlayerTransform, applyRemoteUpdate, spawnRemotePlayer,
//     despawnRemotePlayer, onShot, onHit, onDead, onSelfSpawn, scene, camera });
//   // Play Online button: requestMatch().then(id => ...) - netcode handles the rest.
//
// BOT RULE: online matches are marked isOnline = true (window.__clutcherOnlineMatch
// is set while connected). Bot spawning logic in the game must check this flag and
// spawn ZERO bots for online matches.
//
// SUB-TICK: every outgoing message carries vt = performance.now(). The server
// records real timestamps per connection (clock-offset corrected) and rewinds
// other players to the shooter's vt through a ~1s position history ring buffer.
// ============================================================================

import {
  WS_BASE,
  MAX_HISTORY_MS,
  SEND_MS,
  isNum,
  angDiff,
  clamp,
  moveToward
} from "./shared.js";
import { validateMove, validateShot, flagSuspicious } from "./anticheat.js";
import { initViewModel, updateViewModel, setViewModelVisible, getViewModel } from "./pviewmodel.js";

var opts = null;              // callbacks passed to initMultiplayer
var ws = null;                // active WebSocket
var myId = null;
var connected = !1;
var roomId = null;
var onlineMatch = !1;         // true while in a matchmaking (online) match
var remotes = new Map();      // id -> { x,y,z,ry, tx,ty,tz,try_, hp }
var sendTimer = 0;
var rafId = 0;
var lastFrame = 0;
var pingTimer = 0;            // latency probe interval
var lastRtt = null;           // last measured round-trip in ms
var lastSent = null;          // last sent { x,y,z } for client-side validation
var lastSentT = 0;
var fullRetries = 0;          // /matchmake retries after { t:"full" }
var reconnects = 0;           // same-room reconnect attempts after abnormal close
var intentionalClose = !1;

// online-session flag: while set, the game's bot spawning logic must spawn
// ZERO bots (see main.js botMgr.setup guard)
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

// ---- matchmaking: ask the worker for a room, then connect automatically ----
// Rooms are per-map: the matchmaker only hands out rooms running the SAME map,
// so you can never spawn into a server playing a different map than selected.
var mmMap = "dusker";

export async function requestMatch(map) {
  mmMap = map || mmMap;
  let r = await fetch(WS_BASE + "/matchmake", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ map: mmMap })
  });
  if (!r.ok) {
    throw new Error("matchmaker HTTP " + r.status)
  }
  let j = await r.json();
  if (!j || !j.roomId) {
    throw new Error(j && (j.detail || j.error) || "matchmaker returned no room")
  }
  setOnline(!0);
  connect(j.roomId);
  return j.roomId
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
      x: p.x || 0, y: p.y || 0, z: p.z || 0, ry: p.ry || 0,
      tx: p.x || 0, ty: p.y || 0, tz: p.z || 0, ttry: p.ry || 0,
      hp: p.hp == null ? 100 : p.hp, team: p.team
    });
    try {
      opts.spawnRemotePlayer(p.id, { x: p.x || 0, y: p.y || 0, z: p.z || 0, ry: p.ry || 0, hp: p.hp == null ? 100 : p.hp, team: p.team })
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
      try {
        console.log("[net] welcome id=" + myId + " room=" + roomId + " players=" + (m.players || []).length)
      } catch {}
      // online-session flag: bot spawning logic in the game checks this and
      // must spawn ZERO bots while it is set
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
      remotes.set(m.id, { x: 0, y: 0, z: 0, ry: 0, tx: 0, ty: 0, tz: 0, ttry: 0, hp: 100 });
      try {
        opts.spawnRemotePlayer(m.id, { x: 0, y: 0, z: 0, ry: 0, hp: 100 })
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
      isNum(m.x) && (r.tx = m.x);
      isNum(m.y) && (r.ty = m.y);
      isNum(m.z) && (r.tz = m.z);
      isNum(m.ry) && (r.ttry = m.ry);
      if (m.tm === "CT" || m.tm === "T") r.team = m.tm;
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
    case "p2": {
      if (isNum(m.vt)) lastRtt = Math.max(0, Math.round(performance.now() - m.vt));
      break
    }
    case "full": {
      // room filled up between matchmake and connect: ask for another room
      intentionalClose = !0;
      try {
        ws.close()
      } catch {}
      connected = !1, ws = null, stopLoops();
      if (fullRetries++ < 5) {
        setTimeout(() => requestMatch()["catch"](() => setOnline(!1)), 400 * fullRetries)
      } else {
        setOnline(!1);
        flagSuspicious(myId, "matchmaker full, giving up")
      }
      break
    }
  }
}

// ---- connection management ----
function connect(room) {
  roomId = room;
  intentionalClose = !1;
  try {
    ws && ws.close()
  } catch {}
  ws = new WebSocket(WS_BASE + "/match/" + room);
  ws.onopen = () => {
    try {
      console.log("[net] socket open, room=" + room)
    } catch {}
  };
  ws.onmessage = e => {
    try {
      handleMsg(JSON.parse(e.data))
    } catch {}
  };
  ws.onclose = e => {
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
    if (reconnects++ < 3 && roomId) {
      setTimeout(() => connect(roomId), 600 * reconnects)
    } else if (was) {
      setTimeout(() => requestMatch()["catch"](() => setOnline(!1)), 1000)
    } else {
      setOnline(!1)
    }
  };
  ws.onerror = () => {};
}

// ---- 20Hz state send (sub-tick: real client timestamp per update) ----
function sendState() {
  if (!isConnected() || !opts.getPlayerTransform) return;
  let t = opts.getPlayerTransform() || {};
  let now = performance.now();
  let dt = lastSent ? now - lastSentT : SEND_MS;
  if (!isNum(t.x) || !isNum(t.y) || !isNum(t.z) || !isNum(t.ry)) return;
  if (lastSent && !validateMove(lastSent, t, dt)) {
    // our own sample failed validation - skip it (server would drop it anyway)
    flagSuspicious(myId, "local move rejected (" + dt.toFixed(0) + "ms)");
    lastSent = { x: t.x, y: t.y, z: t.z }, lastSentT = now;
    return
  }
  lastSent = { x: t.x, y: t.y, z: t.z }, lastSentT = now;
  send({ t: "s", x: t.x, y: t.y, z: t.z, ry: t.ry, tm: t.team, vt: now })
}

export function sendShot(ox, oy, oz, dx, dy, dz) {
  if (!validateShot({ x: ox, y: oy, z: oz }, { x: dx, y: dy, z: dz })) {
    flagSuspicious(myId, "bad shot rejected locally");
    return !1
  }
  // sub-tick: the server rewinds targets to this exact timestamp for hit checks
  send({ t: "sh", ox, oy, oz, dx, dy, dz, vt: performance.now() });
  return !0
}

export function sendHit(targetId, dmg) {
  if (!targetId || !isNum(dmg)) return !1;
  send({ t: "hit", target: targetId, dmg: clamp(dmg, 0, 100), vt: performance.now() });
  return !0
}

// ---- per-frame: remote interpolation + viewmodel ----
function frame(now) {
  rafId = requestAnimationFrame(frame);
  let dt = lastFrame ? Math.min(.1, (now - lastFrame) / 1000) : .016;
  lastFrame = now;
  if (!connected) return;
  // interpolate every remote toward its latest sub-tick target (~15 u/s)
  for (let r of remotes.values()) {
    let d = Math.hypot(r.tx - r.x, r.ty - r.y, r.tz - r.z);
    if (d > 8) {
      // server jump (spawn/respawn/teleport correction): snap
      r.x = r.tx, r.y = r.ty, r.z = r.tz, r.ry = r.ttry
    } else {
      let step = 15 * dt;
      r.x = moveToward(r.x, r.tx, step);
      r.y = moveToward(r.y, r.ty, step);
      r.z = moveToward(r.z, r.tz, step);
      r.ry += clamp(angDiff(r.ry, r.ttry), -8 * dt, 8 * dt) // yaw wrap-around safe
    }
    try {
      opts.applyRemoteUpdate(r.id, { x: r.x, y: r.y, z: r.z, ry: r.ry, hp: r.hp, team: r.team })
    } catch {}
  }
  // viewmodel: bob/sway/recoil from the local player's transform rate
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
  lastSent = null, lastSentT = 0, lastFrame = 0;
  sendTimer = setInterval(sendState, SEND_MS);
  rafId = requestAnimationFrame(frame);
}

function stopLoops() {
  clearInterval(sendTimer), sendTimer = 0;
  clearInterval(pingTimer), pingTimer = 0;
  cancelAnimationFrame(rafId), rafId = 0;
}

// leave the online session entirely (menu opened / quit): drops remotes,
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
}

// ---- single entry point ----
export function initMultiplayer(o) {
  opts = o || {};
  initViewModel(opts.scene, opts.camera);
  return { requestMatch, sendShot, sendHit, getMyId, isConnected, isOnlineMatch, getViewModel, disconnectOnline, getLatency }
}
