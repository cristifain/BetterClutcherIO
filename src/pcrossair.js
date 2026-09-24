// Player crosshair HUD, split out of main.js (no logic changes).
// - buildCrosshair creates the #crosshair DOM (4 .chline arms + 4 .chout outer arms)
//   inside the HUD root and stores chEl/chInner/chOut on the HUD instance.
// - updateCrosshair is the per-frame crosshair drive (spread, hide/show, recoil follow),
//   moved verbatim from the HUD class method `updateCrosshair()` with `this` passed as `hud`.
// Both were decoded from main.js's obfuscated string table:
//   "chline ch-", "chout cho-", ".chline", "translate(0px,", "translate(", "px,0px)".

export function buildCrosshair(Z, hudRoot, hud) {
  let t = Z("div", "crosshair", hudRoot);
  for (let e of ["n", "s", "e", "w"]) {
    Z("div", null, t, "chline ch-" + e)
  }
  hud["chOut"] = ["n", "s", "e", "w"]["map"](e => {
    return Z("div", null, t, "chout cho-" + e)
  }), hud["chEl"] = t, hud["chInner"] = Array["from"](t["querySelectorAll"](".chline"));
  return t
}

export function updateCrosshair(hud) {
  let e = hud["game"];
  let t = hud["chEl"];
  if (!t) {
    return
  }
  let n = hud["_specEnt"]();
  let r = n || e["weapons"];
  if (!r || !(n || e["player"] && e["player"]["alive"]) || e["scoped"]) {
    if (hud["_chHid"] !== !0x0) {
      hud["_chHid"] = !0x0;
      for (let e of hud["chOut"]) {
        e["style"]["opacity"] = "0"
      }
    }
    e["scoped"] ? hud["updateScopeBlur"]() : hud["_scBlur"] && hud["setScopeBlur"](0x0);
    return
  }
  if (hud["_scBlur"] && hud["setScopeBlur"](0x0), hud["_chHid"]) {
    hud["_chHid"] = !0x1;
    for (let e of hud["chOut"]) {
      e["style"]["opacity"] = ""
    }
  }
  let i = innerHeight * .5 / Math["tan"](e["baseFov"] * .5 * .0174533);
  let a = (r["crosshairSpread"] ? r["crosshairSpread"]() : 0x0) * i;
  a >= 0x0 || (a = 0x0), a > innerHeight && (a = innerHeight);
  let o = hud["_chR"] || 0x0;
  a = o + (a - o) * .35, hud["_chR"] = a;
  let s = Math["max"](0x7, a);
  let c = hud["chOut"];
  let l = n || e["player"];
  let u = !l["onGround"] || Math["hypot"](l["vx"] || 0x0, l["vz"] || 0x0) > .6;
  let d = (r["restingSpread"] ? r["restingSpread"]() : 0x0) * i;
  let f = a > d + 1.5 || u || a > 0x8;
  if (f !== hud["_chShow"]) {
    hud["_chShow"] = f;
    for (let e of c) {
      e["style"]["opacity"] = f ? "" : "0"
    }
  }
  f && (c[0x0]["style"]["transform"] = "translate(0px," + (-s - 0x7) + "px)", c[0x1]["style"]["transform"] = "translate(0px," + s + "px)", c[0x2]["style"]["transform"] = "translate(" + (-s - 0x7) + "px,0px)", c[0x3]["style"]["transform"] = "translate(" + s + "px,0px)");
  let p = 0x0;
  let m = 0x0;
  if (e["chFollow"]) {
    let e = (r["punchP"] || 0x0) * .0174533 - (r["shkP"] || 0x0);
    let t = (r["punchY"] || 0x0) * .0174533 - (r["shkY"] || 0x0);
    p = Math["tan"](t) * i, m = -Math["tan"](e) * i
  }
  if (p !== hud["_chX"] || m !== hud["_chY"]) {
    hud["_chX"] = p, hud["_chY"] = m;
    let e = "translate(" + p + "px," + m + "px)";
    t["style"]["transform"] = e, hud["hmWrap"] && (hud["hmWrap"]["style"]["transform"] = e)
  }
}
