// BACNet

import {
  WS_BASE,
  MAX_SPEED,
  HARD_H_SPEED,
  MAX_UP_SPEED,
  MAX_DOWN_SPEED,
  BURST_UNITS,
  MOVE_SLACK,
  CAP_WINDOW_MIN,
  MAP_MIN_Y,
  MAP_MAX_Y,
  isNum,
  isVec3
} from "./shared.js";


export function createMoveValidator() {
  return {
    bucket: BURST_UNITS,
    
    validate(prevPos, newPos, dtMs) {
      if (!isVec3(prevPos) || !isVec3(newPos) || !isNum(dtMs) || dtMs <= 0) {
        return !1
      }
      let dt = dtMs / 1000;
      let dx = newPos.x - prevPos.x;
      let dy = newPos.y - prevPos.y;
      let dz = newPos.z - prevPos.z;
      let horiz = Math.sqrt(dx * dx + dz * dz);
      
      let dtw = Math.max(dt, CAP_WINDOW_MIN);
      if (horiz > HARD_H_SPEED * dtw + MOVE_SLACK) {
        return !1
      }
      
      if (dy > MAX_UP_SPEED * dtw + MOVE_SLACK) {
        return !1
      }
      
      if (-dy > MAX_DOWN_SPEED * dtw + MOVE_SLACK) {
        return !1
      }
      // map bounds
      if (newPos.y < MAP_MIN_Y || newPos.y > MAP_MAX_Y) {
        return !1
      }
      
      let travel = horiz + Math.max(0, dy);
      if (travel > MAX_SPEED * dt + this.bucket) {
        return !1
      }
      this.bucket = Math.min(BURST_UNITS, this.bucket + MAX_SPEED * dt - travel);
      return !0
    }
  }
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
