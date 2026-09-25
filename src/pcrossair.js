// Player crosshair HUD, split out of main.js (no logic changes).
// - buildCrosshair creates the #crosshair DOM (4 .chline arms + 4 .chout outer arms)
//   inside the HUD root and stores chEl/chInner/chOut on the HUD instance.
// - updateCrosshair is the per-frame crosshair drive (spread, hide/show, recoil follow),
//   moved verbatim from the HUD class method `updateCrosshair()` with `this` passed as `hud`.
// Both were decoded from main.js's obfuscated string table:
//   "chline ch-", "chout cho-", ".chline", "translate(0px,", "translate(", "px,0px)".
//
// Custom crosshair config (ported from the newer clutcher.io build):
// - persistent config in localStorage "clutcher_xhair" (same keys as the original:
//   style/dot/len/thick/gap/outline/outw/color/r/g/b/alpha/t/sniper/hit/snipehide)
// - applyCrosshair styles the arms (len/thick/gap/outline/color/alpha) like the
//   original's applyCrosshair; defaults reproduce the built-in CSS look 1:1
//   (default: thick 2, len 6, gap 3, green #3cff5a, outline 1px, sniper width 2)
// - style 0 = dynamic (built-in spread-reactive .chout layer visible),
//   style 1 = classic static (.chout layer hidden)
// - applySniperWidth sizes the scope lines (config "sniper", default 2 = CSS width)
// - snipehide hides the crosshair while holding an unscoped sniper (config "snipehide")
// - xhairHitEnabled() gates the hitmarker (config "hit", default on)
// - console command "xh" (devconsole.js) + window.BetterClutcherXhair API

export function buildCrosshair(Z, hudRoot, hud) {
  let t = Z("div", "crosshair", hudRoot);
  for (let e of ["n", "s", "e", "w"]) {
    Z("div", null, t, "chline ch-" + e)
  }
  hud["chOut"] = ["n", "s", "e", "w"]["map"](e => {
    return Z("div", null, t, "chout cho-" + e)
  }), hud["chEl"] = t, hud["chInner"] = Array["from"](t["querySelectorAll"](".chline"));
  _xhHud = hud;
  try {
    applyCrosshair(hud)
  } catch {}
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
  try {
    let v = xhair();
    let w = e["weapons"] && e["weapons"]["def"] ? e["weapons"]["def"]() : n;
    let b = !!(v && v["snipehide"] && w && w["class"] === "sniper" && !e["scoped"]);
    if (b !== hud["_chSnipeHid"]) {
      hud["_chSnipeHid"] = b;
      t["style"]["visibility"] = b ? "hidden" : ""
    }
  } catch {}
}

// ------------------------------------------------------------------ config

var XH_KEY = "clutcher_xhair";
var XH_DV = {
  style: 0x0,
  dot: 0x0,
  len: 0x6,
  thick: 0x2,
  gap: 0x3,
  outline: 0x1,
  outw: 0x1,
  color: 0x1,
  r: 0x3c,
  g: 0xff,
  b: 0x5a,
  alpha: 0xff,
  t: 0x0,
  sniper: 0x2,
  hit: 0x1,
  snipehide: 0x0
};
// palette for "color"; 5 = custom rgb (r/g/b keys). Index 1 is the default
// green (#3cff5a) that matches the built-in crosshair CSS.
var XH_PAL = {
  0: [0xff, 0xff, 0xff],
  1: [0x3c, 0xff, 0x5a],
  2: [0x40, 0xff, 0xff],
  3: [0xff, 0xdc, 0x40],
  4: [0xff, 0x60, 0xe0]
};
var _xh = null;
var _xhHud = null;

export var XH_KEYS = Object["keys"](XH_DV);

function _loadXhair() {
  let e = null;
  try {
    e = JSON["parse"](localStorage["getItem"](XH_KEY) || "null")
  } catch {}
  let t = Object["assign"]({}, XH_DV);
  if (e && typeof e == "object") {
    for (let n of Object["keys"](XH_DV)) {
      typeof e[n] == "number" && Number["isFinite"](e[n]) && (t[n] = e[n])
    }
  }
  return t["style"] = +(t["style"] === 0x1), t
}

export function xhair() {
  return _xh || (_xh = _loadXhair()), _xh
}

function _saveXhair() {
  try {
    localStorage["setItem"](XH_KEY, JSON["stringify"](_xh || xhair()))
  } catch {}
}

function _reapply() {
  _xhHud && (applyCrosshair(_xhHud), applySniperWidth(_xhHud))
}

export function getXhair() {
  return Object["assign"]({}, xhair())
}

export function setXhair(e, t) {
  let n = xhair();
  if (!(e in XH_DV) || typeof t != "number" || !Number["isFinite"](t)) {
    return !0x1
  }
  return n[e] = t, n["style"] = +(n["style"] === 0x1), _saveXhair(), _reapply(), !0x0
}

export function resetXhair() {
  return _xh = Object["assign"]({}, XH_DV), _saveXhair(), _reapply(), Object["assign"]({}, _xh)
}

export function xhairHitEnabled() {
  let e = xhair();
  return !e || !!e["hit"]
}

export function xhairPalette() {
  return Object["assign"]({}, XH_PAL)
}

function _rgba(e, t) {
  return "rgba(" + e[0x0] + "," + e[0x1] + "," + e[0x2] + "," + t + ")"
}

export function applyCrosshair(hud) {
  let e = xhair();
  if (!e || !hud || !hud["chEl"]) {
    return
  }
  let t = e["color"] === 0x5 ? [e["r"], e["g"], e["b"]] : XH_PAL[e["color"]] || XH_PAL[0x1];
  let n = Math["max"](0x0, Math["min"](0x1, e["alpha"] / 0xff));
  let r = _rgba(t, n);
  let i = Math["max"](0x0, e["len"] | 0);
  let a = Math["max"](0x1, e["thick"] | 0);
  let o = e["gap"] | 0;
  let s = e["outline"] ? Math["max"](0x1, e["outw"] | 0) + "px solid rgba(0,0,0," + (.7 * n)["toFixed"](0x3) + ")" : "none";
  let c = e["style"] === 0x1;
  // inner static arms: left/top/width/height match the original .ch-* CSS layout
  if (hud["chInner"]) {
    let l = [
      ["ch-n", -(a / 0x2), -(o + i), a + "px", i + "px"],
      ["ch-s", -(a / 0x2), o, a + "px", i + "px"],
      ["ch-w", -(o + i), -(a / 0x2), i + "px", a + "px"],
      ["ch-e", o, -(a / 0x2), i + "px", a + "px"]
    ];
    for (let t of hud["chInner"]) {
      t["style"]["display"] = c ? "none" : "";
      if (c) {
        continue
      }
      for (let [cn, ox, oy, cw, chh] of l) {
        if (t["classList"]["contains"](cn)) {
          t["style"]["left"] = ox + "px", t["style"]["top"] = oy + "px", t["style"]["width"] = cw, t["style"]["height"] = chh
        }
      }
      t["style"]["background"] = r, t["style"]["outline"] = s
    }
  }
  // outer dynamic arms: recolor only (per-frame transform/opacity is updateCrosshair's job)
  if (hud["chOut"]) {
    for (let t of hud["chOut"]) {
      t["style"]["background"] = r, t["style"]["outline"] = s, t["style"]["visibility"] = c ? "hidden" : ""
    }
  }
  // center dot
  let l = hud["chDot"] && hud["chDot"]["parentNode"] === hud["chEl"] ? hud["chDot"] : null;
  if (!l) {
    l = document["createElement"]("div"), l["className"] = "chdot", l["style"]["position"] = "absolute", hud["chEl"]["appendChild"](l), hud["chDot"] = l
  }
  let u = e["dot"] === 0x1;
  l["style"]["display"] = u ? "block" : "none";
  if (u) {
    let t = Math["max"](0x2, a);
    l["style"]["width"] = t + "px", l["style"]["height"] = t + "px", l["style"]["left"] = -(t / 0x2) + "px", l["style"]["top"] = -(t / 0x2) + "px", l["style"]["background"] = _rgba(t, (.85 * n)["toFixed"](0x3))
  }
}

export function applySniperWidth(hud) {
  let e = xhair();
  if (!e || !hud || !hud["scLines"] || !hud["scLines"]["length"]) {
    return
  }
  let t = Math["max"](0x1, e["sniper"] | 0x0) + "px";
  for (let n of hud["scLines"]) {
    n["classList"]["contains"]("v") ? n["style"]["width"] = t : n["style"]["height"] = t
  }
}

// window API (belt and suspenders alongside the devconsole "xh" command)
try {
  window["BetterClutcherXhair"] = {
    get: getXhair,
    set: setXhair,
    reset: resetXhair,
    palette: xhairPalette
  }
} catch {}
