// ============================================================================
// BACNet - BetterClutcher Anti-Cheat Network layer.
// Client-side movement/shot validation. The deployed server re-runs the exact
// same checks on every message and silently drops anything invalid.
// Constants live in shared.js.
// ============================================================================

import {
  WS_BASE,
  MAX_SPEED,
  MAX_VERTICAL_SPEED,
  MAX_TELEPORT,
  MAP_MIN_Y,
  MAP_MAX_Y,
  isNum,
  isVec3
} from "./shared.js";

// prevPos/newPos: { x, y, z }. dtMs: real elapsed ms between the two samples.
export function validateMove(prevPos, newPos, dtMs) {
  if (!isVec3(prevPos) || !isVec3(newPos) || !isNum(dtMs) || dtMs <= 0) {
    return !1
  }
  let dt = dtMs / 1000;
  let dx = newPos.x - prevPos.x;
  let dy = newPos.y - prevPos.y;
  let dz = newPos.z - prevPos.z;
  // teleport guard (absolute, per single update)
  if (Math.sqrt(dx * dx + dy * dy + dz * dz) > MAX_TELEPORT) {
    return !1
  }
  // speed hack: horizontal distance above MAX_SPEED * dt
  let horiz = Math.sqrt(dx * dx + dz * dz);
  if (horiz > MAX_SPEED * dt + .01) {
    return !1
  }
  // fly hack: vertical delta above MAX_VERTICAL_SPEED * dt
  if (Math.abs(dy) > MAX_VERTICAL_SPEED * dt + .01) {
    return !1
  }
  // map bounds
  if (newPos.y < MAP_MIN_Y || newPos.y > MAP_MAX_Y) {
    return !1
  }
  return !0
}

// origin/dir: { x, y, z }. Basic sanity only - finite numbers, sane dir length.
export function validateShot(origin, dir) {
  if (!isVec3(origin) || !isVec3(dir)) {
    return !1
  }
  let len = Math.sqrt(dir.x * dir.x + dir.y * dir.y + dir.z * dir.z);
  if (len < 1e-6 || len > 4) {
    return !1
  }
  return !0
}

// Logs locally and (best-effort, fire-and-forget) reports to the worker so the
// operator can aggregate. Never throws.
export function flagSuspicious(playerId, reason) {
  try {
    console.warn("[anticheat]", playerId, reason)
  } catch {}
  try {
    fetch(WS_BASE.replace("wss://", "https://") + "/report", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ playerId, reason }),
      keepalive: !0
    })["catch"](() => {})
  } catch {}
}
