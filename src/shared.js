// shared.js 

export var WS_BASE = "wss://betterclutcher-server.cfain.workers.dev";


export var MAX_ROOMS = 11;        // limit of concurrent online matches
export var MAX_PLAYERS = 10;      // 5v5 in one match


export var TICK_MS = 33;          // 30Hz, physics only
export var BATCH_MS = 50;         
export var SEND_MS = 50;          // client state send rate (20Hz)
export var RESPAWN_MS = 4000;     

// BACNet
export var MAX_SPEED = 10;        
export var HARD_H_SPEED = 20;     
export var MAX_UP_SPEED = 20;     
export var MAX_DOWN_SPEED = 55;   
export var BURST_SECONDS = 2;     
export var BURST_UNITS = MAX_SPEED * BURST_SECONDS; 
export var MOVE_SLACK = 0.05;     
export var CAP_WINDOW_MIN = 0.05; 
                                  
                                  
export var MAP_MIN_Y = -30;       
                                  
export var MAP_MAX_Y = 256;


export var MAX_HISTORY_MS = 1000; 
export var HISTORY_SAMPLES = 32;  
export var HIT_RADIUS = 1.0;      
export var TARGET_EYE = 0.9;      
export var MAX_HIT_DMG = 100;     
export var MAX_HITS_PER_SEC = 12; 
export var SHOT_TTL_MS = 400;     
export var CLOCK_SLACK_MS = 250;  


export var TAU = Math.PI * 2;

export function clamp(v, a, b) {
  return v < a ? a : v > b ? b : v
}

export function lerp(a, b, t) {
  return a + (b - a) * t
}


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


export function moveToward(cur, target, step) {
  let d = target - cur;
  if (Math.abs(d) <= step) return target;
  return cur + (d > 0 ? step : -step)
}

export function newId() {
  return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-3)
}


export function rayPointDist(ox, oy, oz, dx, dy, dz, px, py, pz) {
  let wx = px - ox, wy = py - oy, wz = pz - oz;
  let t = wx * dx + wy * dy + wz * dz;
  if (t < 0) t = 0;
  let cx = ox + dx * t - px, cy = oy + dy * t - py, cz = oz + dz * t - pz;
  return Math.sqrt(cx * cx + cy * cy + cz * cz)
}
