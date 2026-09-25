// ============================================================================
// BACNet - BetterClutcher Anti-Cheat Network layer.
// Client-side movement/shot validation mirror. The deployed server re-runs
// the exact same movement checks per player (MatchRoom "s" handler) and
// silently drops anything invalid. Constants live in shared.js.
//
// Movement model (v2) - burst-tolerant, average-bound. Two layers:
//
//   1. Instantaneous per-axis caps reject only blatant per-frame
//      impossibilities: horizontal > HARD_H_SPEED, ascent > MAX_UP_SPEED,
//      descent > MAX_DOWN_SPEED. They sit far above real movement (run
//      <= 6.35 u/s, jump ~7.67 u/s) so ordinary physics never trips them.
//
//   2. A travel bucket enforces the AVERAGE: it holds BURST_UNITS (2s worth
//      of MAX_SPEED travel), refills at MAX_SPEED per elapsed second (dt is
//      measured from the last ACCEPTED update), and pays for horizontal +
//      upward displacement. Brief legit bursts - network-stall catch-up,
//      frame hitches, throttled-tab 1Hz sends - are absorbed silently
//      instead of rubber-banding; sustained overspeed drains the bucket and
//      gets dropped, so the enforced average can never exceed MAX_SPEED for
//      long no matter how a cheater paces their updates.
//
//   3. Descent is deliberately NOT bucket-bound: gravity makes long falls
//      legitimately faster than any run-speed average (a void dive reaches
//      ~46 u/s), so falling is covered by the descent cap + map bounds only.
//      "Falling fast" is not flying - sustained ASCENT is the cheat signal.
// ============================================================================

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

// Stateful movement validator (one per player on the server). The client
// mirror exists for parity/testing; netcode.js deliberately does NOT gate
// local sends with it (browser clock coarsening makes local dt unreliable) -
// the server is the single authority.
export function createMoveValidator() {
  return {
    bucket: BURST_UNITS,
    // prevPos/newPos: { x, y, z }. dtMs: elapsed ms since the last ACCEPTED
    // update (arrival clock). Returns true if the update is accepted.
    validate(prevPos, newPos, dtMs) {
      if (!isVec3(prevPos) || !isVec3(newPos) || !isNum(dtMs) || dtMs <= 0) {
        return !1
      }
      let dt = dtMs / 1000;
      let dx = newPos.x - prevPos.x;
      let dy = newPos.y - prevPos.y;
      let dz = newPos.z - prevPos.z;
      let horiz = Math.sqrt(dx * dx + dz * dz);
      // 1. instantaneous caps: blatant per-frame impossibilities only. The
      //    motion window is floored at one send interval - queued bursts
      //    after a stall carry ~50ms of motion per message despite tiny
      //    arrival gaps.
      let dtw = Math.max(dt, CAP_WINDOW_MIN);
      if (horiz > HARD_H_SPEED * dtw + MOVE_SLACK) {
        return !1
      }
      // ascent (fly): jump launch is ~7.67 u/s, so 20 u/s up is never legit
      if (dy > MAX_UP_SPEED * dtw + MOVE_SLACK) {
        return !1
      }
      // descent (fall): must cover real void dives (~46 u/s)
      if (-dy > MAX_DOWN_SPEED * dtw + MOVE_SLACK) {
        return !1
      }
      // map bounds
      if (newPos.y < MAP_MIN_Y || newPos.y > MAP_MAX_Y) {
        return !1
      }
      // 2. average bound: travel (horizontal + upward; descent is free -
      //    gravity makes long falls legitimately fast, falling is not flying)
      //    must fit MAX_SPEED * elapsed-since-accept plus the banked burst
      //    reserve. The allowance is evaluated FRESH each update and the
      //    bucket only changes on accept, so rejected updates accumulate
      //    nothing and the sustained average is hard-bounded at MAX_SPEED
      //    (+ one initial burst).
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
