// Dev console.
// Off by default. Enable it once in Settings -> "Dev-Console" (persisted in
// localStorage); after that ` (backquote) toggles a draggable CS:GO-style
// console anywhere in the page.
// Commands: remove_bots, fly.

const LS_KEY = "clutcher_devconsole";

let game = null;
let enabled = false;
let visible = false;
let flyOn = false;
let history = [];
let historyIdx = -1;
let ui = null; // { root, log, input, close }
let rowTimer = 0;

function readEnabled() {
  try {
    return localStorage.getItem(LS_KEY) === "1";
  } catch {
    return false;
  }
}

function writeEnabled(v) {
  try {
    localStorage.setItem(LS_KEY, v ? "1" : "0");
  } catch {}
}

// ---------------------------------------------------------------- settings row

function syncSettingsRow() {
  const qrow = document.getElementById("opt-devconsole");
  if (!qrow) return;
  // default state is off, so "0" carries the isdef bullet
  for (const b of qrow.querySelectorAll("[data-v]")) {
    b.classList.toggle("sel", b.dataset.v === (enabled ? "1" : "0"));
    b.classList.toggle("isdef", b.dataset.v === "0");
  }
}

function injectSettingsRow() {
  if (document.getElementById("opt-devconsole")) return true;
  const anchor = document.querySelector("#tab-settings #opt-showfps") ||
    document.querySelector("#opt-showfps");
  const box = document.getElementById("settingsbox");
  if (!anchor || !box) return false;

  const srcRow = anchor.closest(".srow");
  let row;
  if (srcRow) {
    // clone the SHOW FPS row and rewrite it, so styling matches the rest
    row = srcRow.cloneNode(true);
    for (const n of row.querySelectorAll("[id]")) n.removeAttribute("id");
    const qrow = row.querySelector(".qrow") || row.querySelector("[data-v]")?.parentElement;
    if (!qrow) return false;
    qrow.id = "opt-devconsole";
    const label = row.querySelector("label");
    if (label) label.textContent = "DEV-CONSOLE";
    for (const b of qrow.querySelectorAll("[data-v]")) {
      b.classList.remove("sel", "isdef");
      b.onclick = null;
    }
    srcRow.after(row);
  } else {
    row = document.createElement("div");
    row.className = "srow";
    const label = document.createElement("label");
    label.textContent = "DEV-CONSOLE";
    const qrow = document.createElement("div");
    qrow.className = "qrow";
    qrow.id = "opt-devconsole";
    for (const [v, t] of [["1", "ON"], ["0", "OFF"]]) {
      const b = document.createElement("button");
      b.dataset.v = v;
      b.textContent = t;
      qrow.appendChild(b);
    }
    row.append(label, qrow);
    box.appendChild(row);
  }

  const qrow = row.querySelector(".qrow");
  qrow.addEventListener("click", e => {
    const b = e.target.closest("[data-v]");
    if (!b) return;
    setEnabled(b.dataset.v === "1");
    if (game && game.audio && game.audio.play) {
      try {
        game.audio.play("uiclick");
      } catch {}
    }
  });
  syncSettingsRow();
  return true;
}

function setEnabled(v) {
  enabled = v;
  writeEnabled(v);
  syncSettingsRow();
  if (!v && visible) hide();
}

// ------------------------------------------------------------------- console UI

function ensureStyle() {
  if (document.getElementById("devconsole-style")) return;
  const s = document.createElement("style");
  s.id = "devconsole-style";
  s.textContent = `
#devconsole {
  position: fixed; left: 42px; top: 64px; z-index: 1200;
  width: min(640px, calc(100vw - 32px)); height: min(400px, calc(100vh - 120px));
  display: none; flex-direction: column;
  background: rgba(37, 42, 46, 0.98);
  border: 1px solid #14171a; border-radius: 4px;
  box-shadow: 0 14px 48px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255,255,255,0.06);
  font-family: Consolas, "Lucida Console", monospace; font-size: 13px;
  color: #d7dee3; user-select: text;
}
#devconsole.open { display: flex; }
#devconsole .dc-title {
  display: flex; align-items: center; justify-content: space-between;
  padding: 7px 10px 7px 12px; cursor: move;
  background: linear-gradient(180deg, #3d4449, #2c3236);
  border-bottom: 1px solid #14171a; border-radius: 4px 4px 0 0;
  font-family: 'stratum2 condensed', 'Stratum2', Arial, sans-serif;
  font-size: 12px; font-weight: 700; letter-spacing: 2.5px; color: #eef2f5;
}
#devconsole .dc-title .dc-hint { font-weight: 400; letter-spacing: 1px; opacity: .5; font-size: 10px; }
#devconsole .dc-close {
  cursor: pointer; border: 0; background: transparent; color: #aab4bb;
  font: 700 15px/1 Consolas, monospace; padding: 2px 6px; border-radius: 3px;
}
#devconsole .dc-close:hover { background: #b8342e; color: #fff; }
#devconsole .dc-log {
  flex: 1; overflow-y: auto; padding: 8px 10px;
  background: rgba(24, 28, 31, 0.96); white-space: pre-wrap; word-break: break-word;
  scrollbar-width: thin; scrollbar-color: #4a5258 #1a1e21;
}
#devconsole .dc-log::-webkit-scrollbar { width: 9px; }
#devconsole .dc-log::-webkit-scrollbar-thumb { background: #4a5258; border-radius: 4px; }
#devconsole .dc-line { line-height: 1.45; }
#devconsole .dc-cmd { color: #ffffff; }
#devconsole .dc-out { color: #9fb0ba; }
#devconsole .dc-err { color: #e08a4f; }
#devconsole .dc-ok  { color: #9fce6a; }
#devconsole .dc-inputrow {
  display: flex; gap: 8px; padding: 8px; border-top: 1px solid #14171a;
  background: #2c3236; border-radius: 0 0 4px 4px;
}
#devconsole .dc-input {
  flex: 1; background: #1d2124; border: 1px solid #14171a; border-radius: 3px;
  color: #eef2f5; font: 13px Consolas, "Lucida Console", monospace;
  padding: 7px 9px; outline: none;
}
#devconsole .dc-input:focus { border-color: #6a7b86; }
#devconsole .dc-submit {
  border: 1px solid #14171a; border-radius: 3px; cursor: pointer;
  background: #3d4449; color: #eef2f5; padding: 0 14px;
  font-family: 'stratum2 condensed', 'Stratum2', Arial, sans-serif;
  font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
}
#devconsole .dc-submit:hover { background: #4a5258; }
`;
  document.head.appendChild(s);
}

function ensureUI() {
  if (ui) return ui;
  ensureStyle();
  const root = document.createElement("div");
  root.id = "devconsole";
  root.innerHTML = `
    <div class="dc-title"><span>CONSOLE <span class="dc-hint">\` to close</span></span>
      <button class="dc-close" title="Close">&#10005;</button></div>
    <div class="dc-log"></div>
    <div class="dc-inputrow">
      <input class="dc-input" type="text" spellcheck="false" autocomplete="off"
             placeholder="type a command... (remove_bots, fly)">
      <button class="dc-submit">SUBMIT</button>
    </div>`;
  document.body.appendChild(root);
  ui = {
    root,
    log: root.querySelector(".dc-log"),
    input: root.querySelector(".dc-input")
  };
  root.querySelector(".dc-close").addEventListener("click", hide);
  root.querySelector(".dc-submit").addEventListener("click", submit);
  ui.input.addEventListener("keydown", e => {
    e.stopPropagation();
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      if (!history.length) return;
      historyIdx = Math.min(history.length - 1, historyIdx + 1);
      ui.input.value = history[history.length - 1 - historyIdx];
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (historyIdx > 0) {
        historyIdx--;
        ui.input.value = history[history.length - 1 - historyIdx];
      } else {
        historyIdx = -1;
        ui.input.value = "";
      }
      e.preventDefault();
    }
  });
  // title bar drag
  const title = root.querySelector(".dc-title");
  let drag = null;
  title.addEventListener("mousedown", e => {
    if (e.target.closest(".dc-close")) return;
    drag = {
      dx: e.clientX - root.offsetLeft,
      dy: e.clientY - root.offsetTop
    };
    e.preventDefault();
  });
  addEventListener("mousemove", e => {
    if (!drag) return;
    root.style.left = Math.max(0, e.clientX - drag.dx) + "px";
    root.style.top = Math.max(0, e.clientY - drag.dy) + "px";
  });
  addEventListener("mouseup", () => {
    drag = null;
  });
  return ui;
}

function print(text, cls) {
  const { log } = ensureUI();
  const line = document.createElement("div");
  line.className = "dc-line " + (cls || "out");
  line.textContent = text;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

function show() {
  ensureUI();
  ui.root.classList.add("open");
  visible = true;
  try {
    game && game.input && game.input.reset && game.input.reset();
  } catch {}
  if (document.pointerLockElement) {
    try {
      document.exitPointerLock();
    } catch {}
  }
  ui.input.value = "";
  historyIdx = -1;
  setTimeout(() => ui.input.focus(), 0);
}

function hide() {
  if (!ui) return;
  ui.root.classList.remove("open");
  visible = false;
  ui.input.blur();
  // give the cursor back to the game if we were mid-match
  try {
    if (game && game.state === "playing" && game.input && game.input.requestLock) {
      game.input.requestLock();
    }
  } catch {}
}

function toggle() {
  visible ? hide() : show();
}

// ------------------------------------------------------------------- commands

function removeBots() {
  const mgr = game && game.botMgr;
  if (!mgr || !mgr.bots) return -1;
  const n = mgr.bots.length;
  if (!n) return 0;
  // setup(0) reuses the game's own teardown: meshes, shadows and pooled
  // cs2 agents are removed from the scene exactly like a match restart with
  // zero bots. The array stays empty, so round restarts and DM respawns
  // bring nobody back until a new match is started.
  try {
    mgr.setup(0, 0, (game.player && game.player.team) || "CT");
  } catch {
    for (const b of mgr.bots) {
      try {
        game.scene.remove(b.mesh);
        game.scene.remove(b.shadow);
        if (b.cs2Agent) game.scene.remove(b.cs2Agent.root);
      } catch {}
    }
    mgr.bots.length = 0;
  }
  return n;
}

function runCommand(raw) {
  const cmd = raw.trim();
  if (!cmd) return;
  print("] " + cmd, "cmd");
  history.push(cmd);
  if (history.length > 64) history.shift();
  const name = cmd.toLowerCase().split(/\s+/)[0];
  switch (name) {
    case "remove_bots": {
      const n = removeBots();
      if (n < 0) print("remove_bots: no active match.", "err");
      else if (n === 0) print("No bots to remove.");
      else print("Removed " + n + " bot" + (n === 1 ? "" : "s") + ". You are still in the match.", "ok");
      break;
    }
    case "fly": {
      flyOn = !flyOn;
      if (flyOn) print("Fly ON. WASD + mouse to fly, Space up, Ctrl down, Shift slow. Type fly again to drop.", "ok");
      else print("Fly OFF. Gravity restored.", "ok");
      break;
    }
    default:
      print("Unknown command: " + name, "err");
      print("Available commands: remove_bots, fly", "out");
  }
}

function submit() {
  if (!ui) return;
  const v = ui.input.value;
  runCommand(v);
  ui.input.value = "";
  historyIdx = -1;
}

// ------------------------------------------------------------------- fly mode

const FLY_SPEED = 14;
const FLY_SLOW = 4;

function flyMove(p, dt, input, ph) {
  const fwd = (input.downA("forward") ? 1 : 0) - (input.downA("back") ? 1 : 0);
  const strafe = (input.downA("right") ? 1 : 0) - (input.downA("left") ? 1 : 0);
  const vert = (input.downA("jump") ? 1 : 0) - (input.downA("crouch") ? 1 : 0);
  if (!fwd && !strafe && !vert) return;
  const step = (input.downA("walk") ? FLY_SLOW : FLY_SPEED) * dt;
  const sinY = Math.sin(p.yaw), cosY = Math.cos(p.yaw);
  const sinP = Math.sin(p.pitch), cosP = Math.cos(p.pitch);
  // forward follows the look direction (incl. pitch); strafe stays horizontal
  let dx = -sinY * cosP * fwd + cosY * strafe;
  let dy = sinP * fwd + vert;
  let dz = -cosY * cosP * fwd - sinY * strafe;
  const len = Math.hypot(dx, dy, dz);
  if (len > 1) {
    dx /= len;
    dy /= len;
    dz /= len;
  }
  // axis-separated moves against the map grid so we slide along walls
  // instead of clipping through them
  const blocked = (x, y, z) =>
    !!(ph.solidAt(x, y + .35, z) || ph.solidAt(x, y + .95, z) || ph.solidAt(x, y + 1.55, z));
  const nx = p.x + dx * step;
  if (!blocked(nx, p.y, p.z)) p.x = nx;
  const nz = p.z + dz * step;
  if (!blocked(p.x, p.y, nz)) p.z = nz;
  const ny = p.y + dy * step;
  if (!blocked(p.x, ny, p.z)) p.y = ny;
}

function installFlyHook() {
  const p = game && game.player;
  if (!p) return;
  const proto = Object.getPrototypeOf(p);
  if (proto.__devFlyHooked) return;
  const orig = proto.update;
  proto.__devFlyHooked = true;
  proto.update = function (dt, input) {
    if (!flyOn || !this.alive || !input || !game || !game.physics) {
      return orig.call(this, dt, input);
    }
    // run the normal update for mouse look, crouch/eye height, weapons...
    // but with gravity and velocity neutralized
    this.onGround = false;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    orig.call(this, dt, input);
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.onGround = false;
    flyMove(this, dt, input, game.physics);
    // leaving fly mid-air restores normal physics: vy is 0, so we just fall
  };
}

// ------------------------------------------------------------------- entry

export function initDevConsole(g) {
  if (game) return;
  game = g;
  enabled = readEnabled();

  // wait for the menu to be built, then add the toggle to the settings tab
  rowTimer = setInterval(() => {
    if (injectSettingsRow()) clearInterval(rowTimer);
  }, 300);

  // ` toggles the console anywhere; while it is open, keydowns are kept away
  // from the game (keyup still passes so held keys don't stick)
  addEventListener("keydown", e => {
    if (!enabled) return;
    if (e.code === "Backquote") {
      e.preventDefault();
      e.stopPropagation();
      toggle();
      return;
    }
    if (!visible) return;
    // let keys aimed at the console itself through; the input's own
    // keydown handler stops them from bubbling to the game
    if (ui && e.target && ui.root.contains(e.target)) return;
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      hide();
      return;
    }
    if (e.key === "F5" || e.key === "F11" || e.key === "F12") return;
    e.stopPropagation();
  }, true);

  installFlyHook();
}
