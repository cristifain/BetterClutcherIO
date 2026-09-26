// ============================================================================
// shared.js - constants + utilities for the multiplayer netcode.
// Used by the browser client (netcode.js, anticheat.js). This file ships to
// the browser, so it must never contain server-only code or secrets.
// Dependency-free: no DOM, no node, no THREE.
// ============================================================================

// ---- backend (already deployed) ----
export var WS_BASE = "http://127.0.0.1:8787"; // TEMP TEST - revert to wss://betterclutcher-server.cfain.workers.dev

// ---- capacity ----
export var MAX_ROOMS = 11;        // concurrent online matches (change here only)
export var MAX_PLAYERS = 10;      // 5v5

// ---- timing ----
export var TICK_MS = 33;          // server simulation step (30Hz, physics only)
export var BATCH_MS = 50;         // server outgoing batch-flush window
export var SEND_MS = 50;          // client state send rate (20Hz)
export var RESPAWN_MS = 4000;     // server-side respawn delay after death

// ---- anticheat (movement) - BACNet v2: burst-tolerant, average-bound ----
// Player physics for reference: run speed <= 6.35 u/s, jump launch ~7.67 u/s,
// gravity 20.32 u/s^2 with NO terminal clamp (void dives reach ~46 u/s), no
// knockback mechanics. See anticheat.js for the validator these feed.
export var MAX_SPEED = 10;        // sustained average travel (bucket refill rate)
export var HARD_H_SPEED = 20;     // instantaneous horizontal cap (2x average)
export var MAX_UP_SPEED = 20;     // instantaneous ascent cap (fly-hack bound)
export var MAX_DOWN_SPEED = 55;   // instantaneous descent cap (covers void dives)
export var BURST_SECONDS = 2;     // travel-bucket capacity, in seconds of MAX_SPEED
export var BURST_UNITS = MAX_SPEED * BURST_SECONDS; // 20 units of burst reserve
export var MOVE_SLACK = 0.05;     // float slack on per-axis caps
export var CAP_WINDOW_MIN = 0.05; // min motion window for per-axis caps (one
                                  // send interval - queued bursts after a stall
                                  // carry ~50ms of motion per message)
export var MAP_MIN_Y = -30;       // hard floor: void kill is y < -25 client-side,
                                  // so no legit player ever sends below ~-25
export var MAP_MAX_Y = 256;

// ---- sub-tick hit detection ----
export var MAX_HISTORY_MS = 1000; // rewind buffer length
export var HISTORY_SAMPLES = 32;  // ring buffer entries (~1s at 30Hz)
export var HIT_RADIUS = 1.0;      // ray-to-target-center tolerance (units)
export var TARGET_EYE = 0.9;      // hit target center = feet + this (units)
export var MAX_HIT_DMG = 100;     // per-hit damage clamp
export var MAX_HITS_PER_SEC = 12; // per-shooter hit rate limit
export var SHOT_TTL_MS = 400;     // a "hit" must reference a recent shot
export var CLOCK_SLACK_MS = 250;  // max tolerated client clock lead

// ---- misc ----
export var TAU = Math.PI * 2;

export function clamp(v, a, b) {
  return v < a ? a : v > b ? b : v
}

export function lerp(a, b, t) {
  return a + (b - a) * t
}

// shortest signed angular difference b-a, wrapped to (-PI, PI]
export function angDiff(a, b) {
  let d = (b - a) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d
}

export function dist2(ax, az, bx, bz) {
  let x = ax - bx, z = az - bz;
  return x * x + z * z
}

export function isNum(v) {
  return typeof v === "number" && Number.isFinite(v)
}

export function isVec3(v) {
  return !!v && isNum(v.x) && isNum(v.y) && isNum(v.z)
}

// frame-rate independent "move cur toward target by at most step"
export function moveToward(cur, target, step) {
  let d = target - cur;
  if (Math.abs(d) <= step) return target;
  return cur + (d > 0 ? step : -step)
}

export function newId() {
  return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-3)
}

// point-to-line distance: ray origin o, normalized dir d, point p (3d arrays)
export function rayPointDist(ox, oy, oz, dx, dy, dz, px, py, pz) {
  let wx = px - ox, wy = py - oy, wz = pz - oz;
  let t = wx * dx + wy * dy + wz * dz;
  if (t < 0) t = 0;
  let cx = ox + dx * t - px, cy = oy + dy * t - py, cz = oz + dz * t - pz;
  return Math.sqrt(cx * cx + cy * cy + cz * cz)
}
