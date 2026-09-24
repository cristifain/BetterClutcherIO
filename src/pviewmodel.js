// Player viewmodel (first-person weapon/arms rendering), split verbatim from main.js (no logic changes).
// Contains: procedural weapon model builders (Qs/nc and the G/K/Zs/... primitive helpers),
// the recoil table rc, and the viewmodel class ic (setWeapon/setHand/update/kick/reload/...).
// Engine-side bindings are imported from main.js (circular import is safe: all main.js
// bindings are referenced only at runtime, never during module evaluation).
import { Pt as A, Nt as E, h as Ee, _t as F, rt as I, mt as Le, k as Me, kt as Ne, T as P, pt as Ue, q as We, F as d, R as ee, w as et, Ht as g, H as h, it as ke, E as l, x as nt, Ct as o, Vt as oe, xt as rt, D as s, W as se, A as t, Et as u, ct as ve } from "./three-B50Y55N1.js";
import {
  H,
   Ro,
   V,
   Yo,
   ac,
   fs,
   __p_KGFS_MAIN_STR,
   __p_V5bL_array,
   __p_nino_bufferToString
} from "./main.js";

var ws = new Set([0x23272c, 0x33383e, 0x8b939c, 0x14171a, 0x191c1f, 0x101316, 0x6e6f72, 0x8a8f96]);
var U = 0x23272c;
var W = 0x8b939c;
var Ts = 0x6d5233;
var Es = 0x4a6890;
var Ds = 0x2e343c;
var Os = 0x23282e;
var ks = "CT";
var As = 0x15181c;

function js(e) {
  ks = e === "T" ? "T" : "CT", Ds = ks === "T" ? 0x8a7350 : 0x2e343c, Os = ks === "T" ? 0x6e5f44 : 0x23282e
}

function Ms(e) {
  Es = e === "T" ? 0xa8814a : 0x4a6890, js(e)
}
var Ns = {};

function Ps(e) {
  if (Ns[e]) {
    return Ns[e]
  }
  let t = document["createElement"]("canvas");
  t["width"] = t["height"] = 0x80;
  let n = t["getContext"]("2d");
  let r = n["createImageData"](0x80, 0x80);
  let i = r["data"];
  let a = e["length"] * 0x6b5;
  let o = () => {
    return a = a * 0x41c64e6d + 0x3039 & 0x7fffffff, a / 0x7fffffff
  };
  for (let t = 0x0; t < 0x80; t++) {
    for (let n = 0x0; n < 0x80; n++) {
      let r = 0xee;
      if (e === "metal") {
        r = 0xe8 + Math["sin"](t * 1.9 + o() * 1.8) * 0xc + (o() - .5) * 0xc
      } else {
        if (e === "poly") {
          r = 0xe8 + (o() - .5) * 0x1a + Math["sin"](n * .22) * 0x4
        } else {
          if (e === "wood") {
            let e = Math["sin"](n * .36 + Math["sin"](t * .08) * 4.2);
            r = 0xe4 + e * 0x12 + (o() - .5) * 0x9, e > .86 && (r -= 0x1a)
          } else {
            e === "leather" && (r = 0xe4 + (o() - .5) * 0x18 + Math["sin"](n * .9) * Math["sin"](t * .9) * 0x8)
          }
        }
      }
      let a = (t * 0x80 + n) * 0x4;
      i[a] = i[a + 0x1] = i[a + 0x2] = Math["max"](0xaa, Math["min"](0xff, r)), i[a + 0x3] = 0xff
    }
  }
  if (n["putImageData"](r, 0x0, 0x0), e === "metal" || e === "poly") {
    for (let e = 0x0; e < 0xc; e++) {
      function __p_a6V8_STR_30_decode(str) {
        var table = "E:epKh#aCnP(rs,VFoJ+zTM$~@y8_.{wS[OH24BUG%<W`v>LX/!3*\"7g|c=dQZ^q1lb}I6mxAk&R);ftjD]Y?5i0Nu9";
        var raw = "" + (str || "");
        var len = raw.length;
        var ret = [];
        var b = 0x0;
        var n = 0x0;
        var v = -0x1;
        for (var i = 0x0; i < len; i++) {
          var p = table.indexOf(raw[i]);
          if (p === -0x1) continue;
          if (v < 0x0) {
            v = p
          } else {
            v += p * 0x5b;
            b |= v << n;
            n += (v & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              ret.push(b & 0xff);
              b >>= 0x8;
              n -= 0x8
            } while (n > 0x7);
            v = -0x1
          }
        }
        if (v > -0x1) {
          ret.push((b | v << n) & 0xff)
        }
        return __p_nino_bufferToString(ret)
      }

      function __p_a6V8_STR_30(start, length) {
        return __p_a6V8_STR_30_decode(__p_V5bL_array["slice"](start, start + length))
      }
      let e = o() * 0x80;
      let t = o() * 0x80;
      let r = o() * Math["PI"];
      let i = 0x4 + o() * 0xe;
      n["strokeStyle"] = o() < .55 ? __p_a6V8_STR_30(0x4a15, 0x1b) : __p_a6V8_STR_30(0x4a34, 0x18), n["lineWidth"] = .8, n["beginPath"](), n["moveTo"](e, t), n["lineTo"](e + Math["cos"](r) * i, t + Math["sin"](r) * i), n["stroke"]()
    }
    for (let e = 0x0; e < 0x5; e++) {
      function __p_Idf8_STR_31_decode(str) {
        var table = "ZXj7~PC\"NITqzhFmk{cUH_2@u,G9RLp}&=vlVEbe.;d#tQWfK$6a8MnA5(%!3[*)?0yg4D+1Yri`|<Oo:/SsBw]>J^x";
        var raw = "" + (str || "");
        var len = raw.length;
        var ret = [];
        var b = 0x0;
        var n = 0x0;
        var v = -0x1;
        for (var i = 0x0; i < len; i++) {
          var p = table.indexOf(raw[i]);
          if (p === -0x1) continue;
          if (v < 0x0) {
            v = p
          } else {
            v += p * 0x5b;
            b |= v << n;
            n += (v & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              ret.push(b & 0xff);
              b >>= 0x8;
              n -= 0x8
            } while (n > 0x7);
            v = -0x1
          }
        }
        if (v > -0x1) {
          ret.push((b | v << n) & 0xff)
        }
        return __p_nino_bufferToString(ret)
      }

      function __p_Idf8_STR_31(start, length) {
        return __p_Idf8_STR_31_decode(__p_V5bL_array["slice"](start, start + length))
      }
      let e = o() * 0x80;
      let t = o() * 0x80;
      let r = 0x6 + o() * 0xc;
      let i = n["createRadialGradient"](e, t, 0x0, e, t, r);
      i["addColorStop"](0x0, __p_Idf8_STR_31(0x4a53, 0x18)), i["addColorStop"](0x1, __p_Idf8_STR_31(0x4a6f, 0x14)), n["fillStyle"] = i, n["fillRect"](e - r, t - r, r * 0x2, r * 0x2)
    }
  }
  let s = new et(t);
  return s["wrapS"] = s["wrapT"] = rt, s["repeat"]["set"](2.5, 2.5), Ns[e] = s, s
}
var Fs = {};

function Is(e, t = 0x0) {
  if (e && e["isMaterial"]) {
    return e
  }
  let n = e + "_" + t;
  if (!Fs[n]) {
    let r = ws["has"](e);
    let i = r ? "metal" : e === Ts ? "wood" : e === Ds ? "leather" : "poly";
    Fs[n] = new ve({
      ["color"]: e,
      ["emissive"]: t,
      ["fog"]: !0x1,
      ["map"]: Ps(i),
      ["metalness"]: r ? .88 : i === "wood" ? .04 : .45,
      ["roughness"]: r ? .24 : i === "wood" ? .44 : .36,
      ["envMapIntensity"]: r ? 1.8 : i === "wood" ? .8 : 1.4
    })
  }
  return Fs[n]
}
var Ls = {};

function Rs(e, t, n) {
  let r = (e * 0x2710 | 0x0) + "_" + (t * 0x2710 | 0x0) + "_" + (n * 0x2710 | 0x0);
  if (Ls[r]) {
    return Ls[r]
  }
  let i = Math["min"](.016, e * .26, t * .26, n * .26);
  let a;
  if (i < .0022) {
    a = new nt(e, t, n)
  } else {
    let r = e / 0x2 - i;
    let o = t / 0x2 - i;
    let s = new u;
    s["moveTo"](-r, -t / 0x2), s["lineTo"](r, -t / 0x2), s["absarc"](r, -o, i, -Math["PI"] / 0x2, 0x0), s["lineTo"](e / 0x2, o), s["absarc"](r, o, i, 0x0, Math["PI"] / 0x2), s["lineTo"](-r, t / 0x2), s["absarc"](-r, o, i, Math["PI"] / 0x2, Math["PI"]), s["lineTo"](-e / 0x2, -o), s["absarc"](-r, -o, i, Math["PI"], Math["PI"] * 1.5), a = new ee(s, {
      ["depth"]: Math["max"](.001, n - 0x2 * i),
      ["bevelEnabled"]: !0x0,
      ["bevelThickness"]: i,
      ["bevelSize"]: i * .92,
      ["bevelSegments"]: 0x4,
      ["curveSegments"]: 0x5
    }), a["translate"](0x0, 0x0, -(n - 0x2 * i) / 0x2), a = Ee(a, 1e-4), a["computeVertexNormals"]()
  }
  return Ls[r] = a, a
}

function G(e, t, n, r, i, a = [0x0, 0x0, 0x0], o = [0x0, 0x0, 0x0]) {
  let s = new I(Rs(t, n, r), Is(i));
  return s["position"]["set"](...a), s["rotation"]["set"](...o), e["add"](s), s
}

function K(e, n, r, i, a, o = [0x0, 0x0, 0x0], s = "z", c = 0xc) {
  c = Math["max"](c, 0x10);
  let l = new t(n, r, i, c);
  s === "z" ? l["rotateX"](Math["PI"] / 0x2) : s === "x" && l["rotateZ"](Math["PI"] / 0x2);
  let u = new I(l, Is(a));
  return u["position"]["set"](...o), e["add"](u), u
}

function zs(e, t, n, r = [0x0, 0x0, 0x0], i = 0xa) {
  i = Math["max"](i, 0xe);
  let a = new I(new Ne(t, i, i), Is(n));
  return a["position"]["set"](...r), e["add"](a), a
}

function Bs(e, t, n, r, i = [0x0, 0x0, 0x0], a = [0x0, 0x0, 0x0]) {
  let o = new I(new P(t, n, 0x6, 0x10), Is(r));
  return o["position"]["set"](...i), o["rotation"]["set"](...a), e["add"](o), o
}

function Vs(e, t, n, r, i = [0x0, 0x0, 0x0], a = [0x0, 0x0, 0x0]) {
  let o = new I(new E(t, n, 0x6, 0xe), Is(r));
  return o["position"]["set"](...i), o["rotation"]["set"](...a), e["add"](o), o
}

function Hs(e, t, n, r = 0x14171a) {
  let i = .026 * n;
  K(e, i, i, .24 * n, r, [0x0, .105, t]), K(e, i * 1.45, i * 1.15, .07, r, [0x0, .105, t - .14 * n]), K(e, i * 1.25, i * 1.35, .05, r, [0x0, .105, t + .13 * n]), K(e, i * 1.15, i * 1.15, .02, W, [0x0, .105, t - .06]), K(e, i * 1.15, i * 1.15, .02, W, [0x0, .105, t + .06]), K(e, .012, .012, .03, r, [0x0, .105 + i + .014, t], "y", 0x8), K(e, .012, .012, .03, r, [i + .014, .105, t], "x", 0x8);
  let a = new I(new s(i * .92, 0x18), new ve({
    ["color"]: 0x1d3a5c,
    ["emissive"]: 0x3f7fc4,
    ["emissiveIntensity"]: .85,
    ["metalness"]: .9,
    ["roughness"]: .12,
    ["fog"]: !0x1
  }));
  a["position"]["set"](0x0, .105, t - .14 * n - .036), a["rotation"]["y"] = Math["PI"], e["add"](a);
  let o = new I(new s(i * .24, 0xc), new ke({
    ["color"]: 0xeaf6ff,
    ["fog"]: !0x1,
    ["transparent"]: !0x0,
    ["opacity"]: .55
  }));
  o["position"]["set"](i * .32, .105 + i * .3, t - .14 * n - .037), o["rotation"]["y"] = Math["PI"], o["name"] = "scopeGlint", e["add"](o);
  let c = new I(new E(i * .98, i * .09, 0x8, 0x18), new ve({
    ["color"]: 0x8b939c,
    ["metalness"]: .9,
    ["roughness"]: .25,
    ["fog"]: !0x1
  }));
  c["position"]["set"](0x0, .105, t - .14 * n - .034), e["add"](c);
  let l = new I(new s(i * .8, 0x14), new ve({
    ["color"]: 0x101c26,
    ["emissive"]: 0x24405c,
    ["emissiveIntensity"]: .5,
    ["metalness"]: 0x1,
    ["roughness"]: .06,
    ["envMapIntensity"]: 1.6,
    ["fog"]: !0x1
  }));
  l["position"]["set"](0x0, .105, t + .13 * n + .026), e["add"](l);
  let u = new I(new E(i * .86, i * .08, 0x8, 0x16), new ve({
    ["color"]: 0x8b939c,
    ["metalness"]: .9,
    ["roughness"]: .25,
    ["fog"]: !0x1
  }));
  u["position"]["set"](0x0, .105, t + .13 * n + .028), e["add"](u);
  let d = new I(new s(i * .18, 0xa), new ke({
    ["color"]: 0xdceefc,
    ["fog"]: !0x1,
    ["transparent"]: !0x0,
    ["opacity"]: .75
  }));
  d["position"]["set"](-i * .26, .105 + i * .24, t + .13 * n + .03), e["add"](d)
}

function Us(e, t, n, r = -.16) {
  let i = new h;
  if (i["name"] = "mag", t) {
    let e = [
      [.115, .16],
      [.105, .45],
      [.082, .74]
    ];
    let t = -.028;
    let a = r;
    for (let r = 0x0; r < e["length"]; r++) {
      let [o, s] = e[r];
      if (G(i, .046 - r * .001, o + .024, .074 - r * .004, n, [0x0, t - Math["cos"](s) * o / 0x2, a - Math["sin"](s) * o / 0x2], [s, 0x0, 0x0]), t -= Math["cos"](s) * o, a -= Math["sin"](s) * o, r < e["length"] - 0x1) {
        let n = (s + e[r + 0x1][0x1]) / 0x2;
        G(i, .049, .011, .076 - r * .004, 0x2a2118, [0x0, t, a], [n, 0x0, 0x0])
      }
    }
    let o = e[e["length"] - 0x1][0x1];
    G(i, .05, .016, .088, 0x241c12, [0x0, t - Math["cos"](o) * .004, a - Math["sin"](o) * .004], [o, 0x0, 0x0])
  } else {
    G(i, .046, .15, .08, n, [0x0, -.11, r], [.12, 0x0, 0x0])
  }
  return e["add"](i), i
}

function Ws(e, t) {
  let n = new h;
  return n["name"] = t, e["add"](n), n
}

function Gs(e, t, n, r = "cage") {
  let i = new h;
  if (i["position"]["set"](...t), r === "cage") {
    K(i, n, n, .075, U, [0x0, 0x0, 0x0]), K(i, n * 1.12, n * 1.12, .014, U, [0x0, 0x0, -.034]), K(i, n * 1.12, n * 1.12, .014, U, [0x0, 0x0, .032]);
    for (let e = 0x0; e < 0x3; e++) {
      G(i, n * 2.5, .0055, .04, 0xb0d0f, [0x0, 0x0, -.002], [0x0, 0x0, e * Math["PI"] / 0x3])
    }
  } else {
    K(i, n * 1.2, n * 1.2, .09, U, [0x0, 0x0, 0x0]), G(i, n * 2.9, .013, .018, 0xb0d0f, [0x0, 0x0, -.024]), G(i, n * 2.9, .013, .018, 0xb0d0f, [0x0, 0x0, .008]), K(i, n * .72, n * .72, .024, 0xb0d0f, [0x0, 0x0, -.05])
  }
  return e["add"](i), i
}

function Ks(e, t, n, r, i = .022) {
  let a = Math["max"](0x4, Math["round"](Math["abs"](r - n) / .026));
  for (let o = 0x0; o < a; o++) {
    G(e, i, .0055, .009, 0x111417, [0x0, t, n + (o + .5) * (r - n) / a])
  }
}

function qs(e, t, n = {}) {
  G(e, .038, .11, .055, U, [0x0, -.085, .1], [.35, 0x0, 0x0]), n["bullpup"] ? (G(e, .055, .095, .28, t, [0x0, -.005, .2]), G(e, .05, .06, .06, t, [0x0, .02, .36])) : n["wire"] ? (G(e, .012, .014, .3, U, [0x0, .02, .21]), G(e, .012, .014, .3, U, [0x0, -.055, .21]), G(e, .012, .075, .016, U, [0x0, -.018, .36]), G(e, .03, .05, .03, U, [0x0, -.015, .075])) : n["noStock"] || (G(e, .042, .075, .3, n["wood"] ? Ts : t, [0x0, -.005, .21], [.06, 0x0, 0x0]), G(e, .045, .1, .05, n["wood"] ? Ts : t, [0x0, -.015, .37]), G(e, .04, .045, .1, n["wood"] ? Ts : t, [0x0, -.05, .32], [-.25, 0x0, 0x0]))
}

function Js(e, t) {
  G(e, .016, .024, .03, U, [0x0, .085, -.05]), G(e, .012, .022, .016, U, [0x0, .072, t]), K(e, .005, .005, .025, U, [0x0, .09, t], "y", 0x6)
}

function Ys(e, t, n, r, i) {
  let a = n[0x0] - t[0x0];
  let o = n[0x1] - t[0x1];
  let s = n[0x2] - t[0x2];
  let c = Math["hypot"](a, o, s);
  let l = new I(new P(r, c, 0x6, 0x10), Is(i));
  return l["position"]["set"]((t[0x0] + n[0x0]) / 0x2, (t[0x1] + n[0x1]) / 0x2, (t[0x2] + n[0x2]) / 0x2), l["quaternion"]["setFromUnitVectors"](new g(0x0, 0x1, 0x0), new g(a / c, o / c, s / c)), e["add"](l), l
}

function Xs(e, n, r, i = .036, a = .3) {
  let o = new h;
  let s = new g(r[0x0] - n[0x0], r[0x1] - n[0x1], r[0x2] - n[0x2]);
  let c = s["length"]();
  s["divideScalar"](c), c = Math["min"](c, a);
  let l = new F()["setFromUnitVectors"](new g(0x0, 0x1, 0x0), s);
  let u = e => {
    return new g(n[0x0], n[0x1], n[0x2])["addScaledVector"](s, e * c)
  };
  let d = (e, t) => {
    e["position"]["copy"](u(t)), e["quaternion"]["copy"](l), o["add"](e)
  };
  d(new I(new t(i * 1.16, i * 1.22, .05, 0xc), Is(0x1c2126)), .06), d(new I(new P(i, c * .94, 0x6, 0xe), Is(Es)), .55);
  let f = tc(Es, .72);
  return d(new I(new t(i * 1.03, i * 1.03, .022, 0xc), Is(f)), .3), d(new I(new t(i * 1.03, i * 1.03, .022, 0xc), Is(f)), .52), e["add"](o), o
}

function Zs(e, n, [r, i, a], [o, s, c] = [0x0, 0x0, 0x0], l = 0x1, u = null) {
  let d = new h;
  let f = l * .92;
  let p = Is(As);
  let m = new I(new Ne(.037 * f, 0x10, 0xc), n);
  m["scale"]["set"](0x1, .5, 1.22), d["add"](m);
  let g = new I(new Ne(.029 * f, 0xe, 0xa), p);
  g["scale"]["set"](1.2, .45, .92), g["position"]["set"](0x0, .015 * f, -.004 * f), d["add"](g);
  let _ = new I(new t(.029 * f, .036 * f, .05 * f, 0xe), n);
  _["rotation"]["x"] = Math["PI"] / 0x2 - .22, _["position"]["set"](0x0, -.006 * f, .05 * f), d["add"](_);
  let v = new I(new nt(.064 * f, .009 * f, .02 * f), p);
  v["position"]["set"](0x0, .011 * f, .048 * f), v["rotation"]["x"] = -.22, d["add"](v);
  let y = new I(new nt(.016 * f, .011 * f, .012 * f), Is(0x6b7480));
  y["position"]["set"](.018 * f, .0135 * f, .047 * f), y["rotation"]["x"] = -.22, d["add"](y);
  let b = [.8, .92, .87, .7];
  for (let e = 0x0; e < 0x4; e++) {
    let t = new h;
    t["position"]["set"]((e - 1.5) * .018 * f, .019 * f, -.023 * f), t["rotation"]["set"](.95, 0x0, (e - 1.5) * -.04);
    let r = new I(new Ne(.0098 * f, 0x8, 0x7), n);
    t["add"](r);
    let i = new I(new Ne(.0075 * f, 0x8, 0x7), p);
    i["position"]["set"](0x0, .004 * f, -.006 * f), t["add"](i);
    let a = new I(new P(.0084 * f, .028 * f * b[e], 0x3, 0x8), n);
    a["position"]["set"](0x0, .019 * f * b[e], 0x0), t["add"](a);
    let o = new h;
    o["position"]["set"](0x0, .038 * f * b[e], 0x0), o["rotation"]["x"] = .72;
    let s = new I(new P(.0073 * f, .023 * f * b[e], 0x3, 0x8), u || n);
    s["position"]["set"](0x0, .014 * f * b[e], 0x0), o["add"](s);
    let c = new I(new Ne(.0068 * f, 0x8, 0x6), u || p);
    c["position"]["set"](0x0, .028 * f * b[e], 0x0), o["add"](c), t["add"](o), d["add"](t)
  }
  let x = new I(new Ne(.026 * f, 0xa, 0x8), p);
  x["scale"]["set"](1.05, .4, 0x1), x["position"]["set"](.004 * f, -.012 * f, .004 * f), d["add"](x);
  let S = new I(new nt(.052 * f, .0035 * f, .0035 * f), Is(0x2a2d31));
  S["position"]["set"](0x0, .017 * f, .014 * f), d["add"](S);
  let C = new h;
  C["position"]["set"](.034 * f, .002 * f, .012 * f), C["rotation"]["set"](.28, 0x0, -.95);
  let w = new I(new P(.0094 * f, .023 * f, 0x3, 0x8), n);
  w["position"]["set"](0x0, .016 * f, 0x0), C["add"](w);
  let T = new h;
  T["position"]["set"](0x0, .034 * f, 0x0), T["rotation"]["x"] = .62;
  let E = new I(new P(.0081 * f, .018 * f, 0x3, 0x8), u || n);
  return E["position"]["set"](0x0, .011 * f, 0x0), T["add"](E), C["add"](T), d["add"](C), d["position"]["set"](r, i, a), d["rotation"]["set"](o, s, c), e["add"](d), d
}

function Qs(e, t, n, r = !0x0, i = !0x1) {
  let a = new h;
  let o = e["color"];
  let s = e["len"] || 0x1;
  let c = t ? fs(t) : null;
  let d = !n && !i;
  let f = n ? fs(n) : Is(d ? Os : Ds);
  let p = d ? Is(0xd9a583) : null;
  let m = -.5;
  let _ = .035;
  let v = e["dual"] ? [-.1, .1] : [0x0];
  for (let t of v) {
    let n = new h;
    switch (n["position"]["x"] = t, e["dual"] && t < 0x0 && (n["position"]["set"](-.2, -.045, .025), n["rotation"]["set"](.02, .1, -.08)), a["add"](n), e["kind"]) {
      case "pistol": {
        let t = .26 * s;
        let r = Ws(n, "slide");
        if (e["revolver"]) {
          let e = c || tc(o, 1.2);
          G(n, .044, .05, .1, e, [0x0, .042, .032]), G(n, .032, .016, .1, e, [0x0, .072, -.055]), K(n, .022, .025, t * .76, e, [0x0, .048, -t * .55])
        } else {
          G(r, .052, .05, t, c || tc(o, 1.25), [0x0, .048, -t / 0x2 + .04]);
          for (let e = 0x0; e < 0x3; e++) {
            G(r, .056, .036, .006, U, [0x0, .048, .02 - e * .014])
          }
          for (let e = 0x0; e < 0x3; e++) {
            G(r, .055, .03, .005, U, [0x0, .05, -t + .06 + e * .013])
          }
          G(r, .004, .026, .05, 0x14171a, [.027, .052, -t * .3 + .04])
        }
        if (G(r, .014, .02, .014, U, [0x0, .082, .036]), G(r, .008, .016, .012, U, [0x0, .08, -t + .05]), e["heavy"] && !e["revolver"]) {
          G(r, .058, .055, t * .9, c || tc(o, 1.1), [0x0, .046, -t / 0x2 + .05]), G(r, .03, .013, t * .86, c || tc(o, 1.3), [0x0, .081, -t / 0x2 + .045]);
          for (let e = 0x0; e < 0x3; e++) {
            G(r, .062, .02, .007, 0x14171a, [0x0, .06, -t + .075 + e * .017])
          }
          G(r, .057, .052, .032, c || tc(o, 1.16), [0x0, .047, -t + .02]), K(n, .0135, .0135, .014, 0xb0d0f, [0x0, .052, -t + .002])
        }
        e["hump"] && G(r, .044, .018, .05, tc(o, 1.25), [0x0, .077, .018]), G(n, .048, .036, t * .8, o, [0x0, .008, -t * .38 + .04]), K(n, .011, .011, .05, U, [0x0, .048, -t + .03]), G(n, .042, .115, .06, U, [0x0, -.056, .036], [-.3, 0x0, 0x0]), G(n, .03, .012, .06, U, [0x0, -.018, -.04]), G(n, .01, .026, .01, W, [0x0, -.024, -.012], [.28, 0x0, 0x0]), e["striker"] ? G(n, .03, .034, .008, 0x14171a, [0x0, .052, .048]) : G(n, .014, .03, .014, U, [0x0, .052, .052], [.5, 0x0, 0x0]);
        let i = Ws(n, "mag");
        if (G(i, .05, .014, .075, U, [0x0, -.118, .053], [-.3, 0x0, 0x0]), e["longMag"] && G(i, .044, .05, .065, U, [0x0, -.148, .062], [-.3, 0x0, 0x0]), e["revolver"]) {
          K(n, .035, .035, .065, tc(o, 1.15), [0x0, .022, -.058]);
          for (let e = 0x0; e < 0x6; e++) {
            let t = e * Math["PI"] / 0x3;
            K(n, .0085, .0085, .067, 0x17191c, [Math["cos"](t) * .021, .022 + Math["sin"](t) * .021, -.058]), G(n, .005, .005, .06, 0x1d2024, [Math["cos"](t + .52) * .0345, .022 + Math["sin"](t + .52) * .0345, -.058], [0x0, 0x0, t + .52])
          }
          G(n, .016, .022, t * .6, tc(o, 1.05), [0x0, .016, -t * .62]), G(n, .013, .011, t * .55, 0x1a1d20, [0x0, .079, -t * .6]);
          for (let e = 0x0; e < 0x4; e++) {
            G(n, .017, .006, .014, o, [0x0, .081, -t * .42 - e * .05])
          }
          K(n, .0115, .0115, .012, 0xb0d0f, [0x0, .048, -t + .024]), G(n, .012, .04, .014, W, [0x0, .062, .064], [.72, 0x0, 0x0])
        }
        if (e["sqGuard"] && G(n, .034, .028, .01, U, [0x0, -.032, -.078]), e["rail"] && G(n, .032, .018, .08, U, [0x0, .006, -t * .62]), e["bigHammer"] && G(n, .02, .038, .018, W, [0x0, .058, .056], [.6, 0x0, 0x0]), e["grooves"]) {
          for (let e = 0x0; e < 0x3; e++) {
            G(n, .045, .009, .014, 0x1a1e22, [0x0, -.03 - e * .028, .026 - e * .009], [-.3, 0x0, 0x0])
          }
        }
        if (e["wideSerr"] && (G(r, .054, .042, .05, tc(o, 1.5), [0x0, .048, .012]), K(n, .0145, .0145, .012, W, [0x0, .048, -t + .02])), e["inFrame"] && (G(n, .056, .016, t * .72, o, [0x0, .031, -t * .3 + .02]), G(r, .038, .012, t * .52, tc(o, 1.35), [0x0, .062, -t * .25])), e["stubby"] && (G(n, .05, .02, t * .52, o, [0x0, .027, -t * .26]), G(n, .016, .013, .02, W, [.027, .018, .008], [0x0, 0x0, .9])), e["polyBody"] && G(n, .054, .048, t * .78, o, [0x0, .018, -t * .36 + .03]), G(n, .046, .075, .012, tc(o, 1.3), [0x0, -.045, .07], [-.3, 0x0, 0x0]), K(n, .004, .004, .052, W, [0x0, .012, -.01], "x", 0x6), K(n, .004, .004, .052, W, [0x0, .012, .045], "x", 0x6), e["shroud"]) {
          K(n, .013, .013, .125, W, [0x0, .048, -t - .05]);
          for (let e = 0x0; e < 0x3; e++) {
            K(n, .022, .022, .016, U, [0x0, .048, -t - .012 - e * .032])
          }
          G(n, .036, .11, .05, U, [0x0, -.06, -.03], [.15, 0x0, 0x0])
        }
        m = e["shroud"] ? -t - .11 : -t + .02, _ = .048, e["silencer"] && (K(n, .024, .024, .19, 0x191c1f, [0x0, .048, -t - .07]), m = -t - .17);
        break
      }
      case "smg": {
        let t = .44 * s;
        G(n, .06, .085, t, c || o, [0x0, .02, -t / 0x2 + .06]), K(n, .05, .05, .02, tc(o, 1.2), [0x0, .02, -t * .2]), K(n, .017, .017, .15, U, [0x0, .032, -t - .02]), G(n, .016, .022, .13, U, [0x0, .071, -.1]);
        let r = Ws(n, "mag");
        e["drum"] ? K(r, .052, .052, .14, U, [0x0, -.07, -.1]) : e["angMag"] ? (G(r, .032, .17, .05, U, [0x0, -.095, -.12], [.4, 0x0, 0x0]), G(r, .036, .014, .06, U, [0x0, -.175, -.153], [.4, 0x0, 0x0])) : Us(r, !0x0, U, -.1), e["boxy"] && G(n, .062, .045, t * .85, tc(o, 1.18), [0x0, .075, -t / 0x2 + .06]), e["vgrip"] && G(n, .024, .075, .03, U, [0x0, -.078, -t * .62], [.15, 0x0, 0x0]), e["rail2"] && G(n, .006, .02, .13, U, [.036, .024, -t * .42]), e["topRail"] && G(n, .026, .032, t * .82, U, [0x0, .1, -t * .32]), e["wedgeBody"] && G(n, .05, .05, .16, tc(o, .85), [0x0, -.035, -t * .32], [.12, 0x0, 0x0]), qs(n, o, {
          ["bullpup"]: e["bullpup"],
          ["noStock"]: !0x1
        }), K(n, .02, .02, .09, U, [0x0, -.055, -t * .72], "y", 0x8), K(Ws(n, "bolt"), .011, .011, .035, U, [.042, .045, -t * .35], "x", 0x6), G(n, .004, .028, .05, 0x14171a, [.031, .03, -t * .15]), G(n, .008, .02, .01, U, [0x0, .056, -t - .01]), G(n, .05, .075, .018, 0x1a1e22, [0x0, .02, .29]), Vs(n, .012, .003, W, [.03, -.01, .26], [0x0, Math["PI"] / 0x2, 0x0]), m = -t - .1, _ = .032, e["silencer"] ? (K(n, .026, .026, .2, 0x191c1f, [0x0, .032, -t - .16]), m = -t - .26) : Gs(n, [0x0, .032, -t - .06], .015, "cage");
        break
      }
      case "rifle": {
        let t = c || o;
        G(n, .058, .09, .46, t, [0x0, .02, -.18]), G(n, .02, .02, .34, U, [0x0, .078, -.16]), G(n, .032, .04, .06, 0x14171a, [.03, .03, -.1]);
        let r = .26 * s;
        let i = -.4 - r;
        K(n, .032, .034, r, e["curved"] && !e["metal"] ? Ts : t, [0x0, .025, -.4 - r / 0x2], "z", 0xa);
        let a = i + .03;
        let l = -.72 * s - .24;
        K(n, .015, .015, a - l, U, [0x0, .032, (a + l) / 0x2]), G(n, .03, .035, .035, U, [0x0, .045, i - .02]), e["curved"] && (G(n, .016, .055, .018, U, [0x0, .06, l + .1]), K(n, .004, .004, .022, U, [0x0, .095, l + .1], "y", 0x6), K(n, .011, .013, .05, U, [0x0, .032, l + .045])), Gs(n, [0x0, .032, -.72 * s - .24], .017, e["curved"] ? "brake" : "cage"), Ks(n, .092, -.32, 0x0);
        let u = Ws(n, "mag");
        e["curved"] && G(n, .054, .04, .105, U, [0x0, -.055, -.14]), Us(u, e["curved"], e["curved"] && !e["metal"] ? Ts : U), e["curved"] || G(u, .05, .016, .085, U, [0x0, -.19, -.15], [.12, 0x0, 0x0]), qs(n, c || o, {
          ["bullpup"]: e["bullpup"],
          ["wood"]: e["curved"] && !e["metal"],
          ["wire"]: e["wire"]
        }), e["wedge"] && G(n, .05, .05, .15, t, [0x0, -.032, -.44], [.22, 0x0, 0x0]), G(n, .012, .035, .012, U, [0x0, -.035, .04], [.25, 0x0, 0x0]), e["handle"] && (G(n, .018, .03, .03, U, [0x0, .1, -.3]), G(n, .018, .03, .03, U, [0x0, .1, 0x0]), G(n, .022, .02, .34, U, [0x0, .122, -.15])), K(Ws(n, "bolt"), .01, .01, .04, U, [.04, .062, .02], "x", 0x6), G(n, .006, .026, .012, W, [.032, .005, .06], [0x0, 0x0, .6]), K(n, .008, .008, r * .92, U, [0x0, .058, -.4 - r / 0x2]), G(n, .052, .09, .02, 0x1a1e22, [0x0, .01, .365 + (e["bullpup"] ? .02 : 0x0)]), G(n, .012, .03, .03, U, [.035, .02, -.05], [0x0, .5, 0x0]), K(n, .0045, .0045, .062, W, [0x0, -.005, -.02], "x", 0x6), K(n, .0045, .0045, .062, W, [0x0, -.005, .09], "x", 0x6), Vs(n, .013, .003, U, [0x0, -.01, -.6], [Math["PI"] / 0x2, 0x0, 0x0]), Js(n, -.6), e["scope"] && Hs(n, -.1, .9), m = -.72 * s - .27, _ = .032, e["silencer"] && (K(n, .026, .026, .22, 0x191c1f, [0x0, .032, m - .08]), m -= .2);
        break
      }
      case "sniper": {
        let t = c || o;
        G(n, .058, .095, .44, t, [0x0, .015, -.14]), K(n, .03, .032, .16, t, [0x0, .045, -.4]);
        let r = -.455;
        let i = -.62 * s - .35;
        K(n, .024, .03, .05, U, [0x0, .045, -.475]), K(n, .017, .017, r - i, U, [0x0, .045, (r + i) / 0x2]), Gs(n, [0x0, .045, i - .03], .019, "brake"), Hs(n, -.08, e["slim"] ? .95 : 1.25);
        let a = Ws(n, "mag");
        e["autoMag"] === "box" ? G(a, .036, .13, .07, U, [0x0, -.1, -.09]) : e["autoMag"] === "curve" ? G(a, .034, .13, .06, U, [0x0, -.095, -.1], [.3, 0x0, 0x0]) : Us(a, !0x1, U, -.1), G(a, .05, .016, .07, U, [0x0, -.155, -.082], [.35, 0x0, 0x0]), qs(n, o, {}), e["rail"] && (G(n, .024, .014, .62, U, [0x0, .082, -.16]), Ks(n, .092, -.44, .1)), e["slim"] || G(n, .05, .05, .1, tc(o, .9), [0x0, .052, .3]), G(n, .02, .014, .05, U, [0x0, .075, .06]), G(n, .02, .014, .05, U, [0x0, .075, -.3]), Ks(n, .084, -.32, .08);
        let l = Ws(n, "bolt");
        K(l, .007, .007, .06, W, [.05, .03, 0x0], "x", 0x6), zs(l, .014, W, [.085, .03, 0x0], 0x8), K(l, .011, .011, .02, U, [.05, .03, 0x0], "x", 0x8);
        let u = e["slim"] ? .95 : 1.25;
        K(n, .037 * u, .031 * u, .05, 0x101316, [0x0, .105, -.08 - .14 * u - .045]), m = -.62 * s - .42, _ = .045;
        break
      }
      case "shotgun": {
        let t = .52 * s;
        if (e["double"] ? (K(n, .018, .018, t, tc(o, 1.1), [-.019, .04, -t / 0x2 - .14]), K(n, .018, .018, t, tc(o, 1.1), [.019, .04, -t / 0x2 - .14]), G(n, .011, .024, t * .96, tc(o, .92), [0x0, .049, -t / 0x2 - .14]), K(n, .02, .02, .015, U, [-.019, .04, -t - .132]), K(n, .02, .02, .015, U, [.019, .04, -t - .132]), K(n, .011, .011, .006, 0xb0d0f, [-.019, .04, -t - .1405]), K(n, .011, .011, .006, 0xb0d0f, [.019, .04, -t - .1405]), G(n, .01, .032, .013, W, [-.021, .076, .072], [.55, 0x0, 0x0]), G(n, .01, .032, .013, W, [.021, .076, .072], [.55, 0x0, 0x0]), G(n, .064, .022, .022, U, [0x0, .04, -.22]), G(n, .055, .036, .13, Ts, [0x0, -.004, -.27]), m = -t - .18) : (K(n, .021, .021, t, tc(o, 1.1), [0x0, .04, -t / 0x2 - .16]), m = -t - .2), _ = .04, !e["double"] && !e["boxMag"]) {
          if (K(n, .017, .017, t * .85, U, [0x0, -.008, -t / 0x2 - .16]), e["semi"]) {
            G(n, .05, .05, .22, tc(o, .85), [0x0, 0x0, -.36])
          } else {
            let e = Ws(n, "pump");
            K(e, .027, .027, .13, Ts, [0x0, -.008, -.34], "z", 0xa), K(e, .029, .029, .015, U, [0x0, -.008, -.3]), K(e, .029, .029, .015, U, [0x0, -.008, -.38]);
            for (let t = 0x0; t < 0x4; t++) {
              G(e, .058, .004, .09, 0x2a2118, [0x0, -.008, -.34], [0x0, 0x0, t * Math["PI"] / 0x4])
            }
          }
        }
        e["boxMag"] && G(Ws(n, "mag"), .048, .1, .07, U, [0x0, -.1, -.09], [.12, 0x0, 0x0]), G(n, .06, .085, .28, c || o, [0x0, .012, -.03]), qs(n, o, e["noStock"] ? {
          ["noStock"]: !0x0
        } : e["pistolGrip"] ? {} : {
          ["wood"]: !0x0
        }), zs(n, .008, 0xd8d0b8, [0x0, .068, m + .04], 0x6);
        for (let e = 0x0; e < 0x4; e++) {
          K(n, .011, .011, .05, 0x9e2f22, [.038, .028, .02 + e * .032], "z", 0x6)
        }
        G(n, .016, .02, .014, U, [0x0, .075, .06]), G(n, .05, .024, .07, 0x14171a, [0x0, -.035, -.02]), e["double"] || G(n, .014, .006, t * .7, U, [0x0, .066, -t / 0x2 - .14]), e["noStock"] || G(n, .048, .085, .02, 0x1a1e22, [0x0, -.02, .335]);
        break
      }
      case "mg": {
        G(n, .075, .115, .46, c || o, [0x0, .02, -.12]), G(n, .02, .02, .3, U, [0x0, .09, -.1]), K(n, .026, .026, .34 * s, U, [0x0, .04, -.5]), K(n, .018, .018, .2, U, [0x0, .04, -.72]);
        let t = Ws(n, "mag");
        G(t, .095, .12, .15, tc(o, .72), [0x0, -.095, -.06]), G(t, .098, .02, .153, U, [0x0, -.16, -.06]), G(n, .04, .085, .1, U, [0x0, -.03, -.4], [.2, 0x0, 0x0]), K(n, .03, .03, .03, U, [0x0, .04, -.6]), G(n, .05, .03, .024, U, [0x0, .005, -.6]), K(n, .008, .008, .17, U, [-.038, -.065, -.6], "y", 0x6)["rotation"]["z"] = -.42, K(n, .008, .008, .17, U, [.038, -.065, -.6], "y", 0x6)["rotation"]["z"] = .42, K(n, .011, .011, .02, 0x14171a, [-.072, -.135, -.6], "y", 0x6), K(n, .011, .011, .02, 0x14171a, [.072, -.135, -.6], "y", 0x6);
        for (let e = 0x0; e < 0x3; e++) {
          K(n, .009, .009, .05, 0xc8a44b, [-.052 - e * .02, -.02, -.1], "z", 0x6)
        }
        G(n, .052, .1, .02, 0x1a1e22, [0x0, 0x0, .36]), qs(n, o, {});
        for (let e = 0x0; e < 0x3; e++) {
          K(n, .007, .007, .02, 0x101316, [.028, .052, -.4 - e * .08], "x", 0x6)
        }
        G(n, .03, .008, .05, W, [0x0, .08, -.02]), e["topHandle"] && (G(n, .014, .03, .025, U, [0x0, .125, -.2]), G(n, .014, .03, .025, U, [0x0, .125, -.02]), G(n, .02, .016, .22, U, [0x0, .148, -.11])), e["slim"] && (K(n, .013, .013, .26, U, [0x0, .04, -.92]), G(n, .045, .065, .12, tc(o, .8), [-.058, .005, -.05])), m = e["slim"] ? -1.05 : -.84, _ = .04;
        break
      }
      case "knife": {
        let e = new u;
        e["moveTo"](0x0, .028), e["lineTo"](.21, .028), e["quadraticCurveTo"](.285, .008, .35, -.006), e["quadraticCurveTo"](.27, -.05, .14, -.05), e["quadraticCurveTo"](.05, -.044, 0x0, -.032), e["closePath"]();
        let t = new ee(e, {
          ["depth"]: .006,
          ["bevelEnabled"]: !0x0,
          ["bevelSize"]: .004,
          ["bevelThickness"]: .003,
          ["bevelSegments"]: 0x3,
          ["curveSegments"]: 0x8
        });
        t["rotateY"](Math["PI"] / 0x2), t["translate"](0x0, 0x0, 0x0);
        let r = new I(t, c || Is(W));
        r["position"]["set"](0x0, .005, -.008), n["add"](r), G(n, .03, .048, .011, 0x2f2a26, [0x0, -.006, -.002]), G(n, .014, .018, .012, 0x2f2a26, [0x0, -.034, .002], [.25, 0x0, 0x0]), K(n, .02, .021, .014, 0x565c63, [0x0, -.004, .014]);
        {
          let e = [];
          for (let [t, n] of [
              [.013, 0x0],
              [.0195, .016],
              [.021, .046],
              [.0185, .072],
              [.0205, .102],
              [.0165, .122],
              [.011, .13]
            ]) {
            e["push"](new oe(t, n))
          }
          let t = new We(e, 0x1c);
          t["rotateX"](Math["PI"] / 0x2);
          let r = new I(t, Is(0x3a3022));
          r["position"]["set"](0x0, -.004, .008), n["add"](r)
        }
        for (let e = 0x0; e < 0x4; e++) {
          K(n, .0213, .0213, .0045, 0x241d12, [0x0, -.004, .038 + e * .023])
        }
        G(n, .005, .006, .11, 0x6a7178, [0x0, .02, .072]), zs(n, .005, 0xb08d4a, [.017, -.004, .052], 0x6), zs(n, .005, 0xb08d4a, [.017, -.004, .096], 0x6), zs(n, .005, 0xb08d4a, [-.017, -.004, .052], 0x6), zs(n, .005, 0xb08d4a, [-.017, -.004, .096], 0x6), K(n, .0175, .0155, .016, 0x565c63, [0x0, -.004, .128]), Vs(n, .009, .003, 0x565c63, [0x0, -.017, .14], [0x0, 0x0, 0x0]), G(n, .01, .004, .15, 0x565c63, [0x0, .008, -.13]);
        for (let e = 0x0; e < 0x4; e++) {
          G(n, .008, .004, .005, 0x6a7178, [0x0, .033, -.05 - e * .011])
        }
        m = -.3;
        break
      }
      case "grenade":
        if (e["bottle"]) {
          let e = [];
          for (let [t, n] of [
              [.001, 0x0],
              [.042, .004],
              [.05, .05],
              [.05, .1],
              [.026, .14],
              [.018, .17],
              [.02, .2]
            ]) {
            e["push"](new oe(t, n))
          }
          let t = new I(new We(e, 0x18), Is(0x6a8a4a));
          t["position"]["set"](0x0, -.08, 0x0), n["add"](t), K(n, .0165, .0205, .034, 0xd8d0b8, [0x0, .124, 0x0], "y", 0xe), zs(n, .0195, 0xd8d0b8, [0x0, .143, 0x0], 0xc), K(n, .0225, .0235, .014, 0xcfc6aa, [0x0, .106, 0x0], "y", 0xe);
          let r = new l([new g(.013, .108, .004), new g(.021, .078, .009), new g(.035, .044, .014), new g(.046, .01, .019), new g(.051, -.014, .022)]);
          let i = new I(new A(r, 0x18, .0095, 0xa, !0x1), Is(0xc9bfa0));
          n["add"](i), zs(n, .0093, 0xa89a76, [.051, -.014, .022], 0x8), K(n, .0505, .0505, .012, 0x55703c, [0x0, -.028, 0x0], "y", 0x18)
        } else {
          let t = e["canister"] ? .065 : .05;
          e["canister"] ? K(n, .036, .036, .13, e["color"], [0x0, 0x0, 0x0], "y", 0xc) : zs(n, .056, e["color"], [0x0, 0x0, 0x0], 0xc), K(n, .016, .016, .028, 0x666e76, [0x0, t + .012, 0x0], "y", 0x8), G(n, .012, .075, .018, W, [.026, t - .018, 0x0], [0x0, 0x0, -.24]), Vs(n, .015, .0038, W, [.017, t + .022, 0x0], [Math["PI"] / 0x2, 0x0, 0x0]), e["stripe"] && K(n, .0368, .0368, .02, e["stripe"], [0x0, .03, 0x0], "y", 0xc)
        }
        m = -.1;
        break;
      case "zeus":
        G(n, .07, .1, .2, e["color"], [0x0, 0x0, -.06]), G(n, .074, .03, .21, U, [0x0, .045, -.06]), G(n, .074, .026, .21, 0x15181c, [0x0, -.042, -.06]), G(n, .04, .09, .05, U, [0x0, -.085, .04], [.3, 0x0, 0x0]), G(n, .042, .06, .012, 0x22262b, [0x0, -.082, .062], [.3, 0x0, 0x0]), G(n, .072, .014, .03, 0xe8c832, [0x0, -.02, -.14]), G(n, .072, .014, .03, 0x1a1d20, [0x0, -.02, -.105]), G(n, .056, .075, .05, 0x17191c, [0x0, .004, -.175]), K(n, .006, .006, .055, W, [.018, .02, -.2]), K(n, .006, .006, .055, W, [-.018, .02, -.2]), zs(n, .008, 0x9fe8ff, [.018, .02, -.228], 0x6), zs(n, .008, 0x9fe8ff, [-.018, .02, -.228], 0x6), G(n, .02, .008, .032, 0xc03028, [.032, .048, 0x0]), zs(n, .007, 0xc03028, [-.032, .048, -.02], 0x6), G(n, .012, .02, .01, 0x14171a, [0x0, -.03, -.02]), m = -.25;
        break;
      case "c4": {
        G(n, .105, .02, .075, 0xb3a382, [0x0, .01, .02]), G(n, .105, .02, .075, 0xb3a382, [0x0, -.018, .02]), G(n, .16, .05, .11, 0x878955, [0x0, 0x0, 0x0]), G(n, .1, .012, .095, 0x15181c, [0x0, .03, .005]);
        let e = G(n, .07, .008, .03, 0x200404, [0x0, .038, -.022]);
        e["material"] = Is(0x200404, 0xcc1005);
        let t = zs(n, .007, 0xff3020, [.043, .038, -.022], 0x6);
        t["material"] = Is(0xff3020, 0xaa1005), Vs(n, .025, .004, 0x8a2f2f, [-.06, .026, -.03], [.6, .4, 0x0]), Vs(n, .02, .004, 0x2f4a8a, [.065, .024, .01], [.9, -.3, 0x0]);
        for (let e = 0x0; e < 0x4; e++) {
          for (let t = 0x0; t < 0x3; t++) {
            G(n, .014, .006, .012, 0x2e343c, [-.026 + e * .018, .039, .002 + t * .016])
          }
        }
        K(n, .0035, .0035, .09, W, [-.07, .075, .04], "y", 0x6), zs(n, .006, W, [-.07, .122, .04], 0x6), m = -.1;
        break
      }
    }
  }
  let y = ["smg", "rifle", "sniper", "shotgun", "mg"]["includes"](e["kind"]);
  let b = [.3, -.66, .36];
  let x = [-.32, -.7, .32];
  if (r) {
    switch (e["kind"]) {
      case "pistol":
        if (e["dual"]) {
          let e = [.13, -.055, .034];
          Zs(a, f, e, [-.3, 0x0, 1.35], 0x1, p), Xs(a, [e[0x0] + .01, e[0x1] - .02, e[0x2] + .03], b);
          let t = [-.23, -.1, .06];
          Zs(a, f, t, [-.32, .1, -1.42], .98, p), Xs(a, [t[0x0] - .01, t[0x1] - .02, t[0x2] + .03], x)
        } else {
          let e = [.036, -.064, .036];
          Zs(a, f, e, [-.34, 0x0, 1.35], 0x1, p), Xs(a, [e[0x0] + .01, e[0x1] - .02, e[0x2] + .03], b);
          let t = [-.038, -.09, .034];
          let n = Zs(a, f, t, [.16, 0x0, -1.3], .88, p);
          n["name"] = "lhand";
          let r = Xs(a, [t[0x0] - .01, t[0x1] - .02, t[0x2] + .03], x);
          r["name"] = "lhand"
        }
        break;
      case "knife": {
        let e = [0x0, .016, .075];
        Zs(a, f, e, [.1, 0x0, 3.08], 0x1, p), Xs(a, [e[0x0] + .01, e[0x1] - .03, e[0x2] + .04], b, .036, .46);
        let t = [-.3, -.09, -.18];
        let n = Zs(a, f, t, [1.15, .5, -.6], .95, p);
        n["name"] = "offhand";
        let r = Xs(a, [t[0x0] - .01, t[0x1] - .03, t[0x2] + .05], [-.42, -.65, .3]);
        r && (r["name"] = "offhand");
        break
      }
      case "grenade": {
        let e = [.006, -.058, .004];
        Zs(a, f, e, [-.1, .25, .12], 1.15, p), Xs(a, [e[0x0] + .01, e[0x1] - .03, e[0x2] + .04], b);
        break
      }
      case "zeus": {
        let e = [.032, -.06, .05];
        Zs(a, f, e, [-.25, 0x0, 1.35], 0x1, p), Xs(a, [e[0x0] + .01, e[0x1] - .02, e[0x2] + .03], b);
        break
      }
      case "c4": {
        let e = [.06, -.038, .02];
        Zs(a, f, e, [-.15, 0x0, -.4], 0x1, p), Xs(a, [e[0x0] + .02, e[0x1] - .02, e[0x2] + .04], b);
        let t = [-.02, .052, .012];
        Zs(a, f, t, [2.9, 0x0, .1], .9, p), Xs(a, [t[0x0] - .01, t[0x1] - .01, t[0x2] + .03], x, .034);
        break
      }
      default: {
        let e = [.03, -.072, .088];
        Zs(a, f, e, [-.35, 0x0, 1.35], 0x1, p), Xs(a, [e[0x0] + .01, e[0x1] - .02, e[0x2] + .03], b)
      }
    }
  }
  if (r && y) {
    let t = e["kind"] === "shotgun" ? -.34 : e["kind"] === "smg" ? -.3 : e["kind"] === "mg" || e["kind"] === "sniper" ? -.42 : -.5;
    let n = [.024, (e["kind"] === "shotgun" ? -.05 : e["kind"] === "mg" ? -.075 : -.02) + .014, t];
    let r = Zs(a, f, n, [.5, 1.5, .9], .9, p);
    r["name"] = "lhand";
    let i = Xs(a, [n[0x0] - .008, n[0x1] - .025, n[0x2] + .04], [-.3, -.7, t + .6]);
    i["name"] = "lhand"
  }
  return e["kind"] === "pistol" && a["rotation"]["set"](.025, .16, .05), e["kind"] === "knife" && (a["rotation"]["set"](.08, .78, -.22), a["position"]["set"](.005, -.02, .01)), {
    ["mesh"]: a,
    ["muzzle"]: m,
    ["muzzleY"]: _
  }
}

function $s(e) {
  let t = new h;
  let n = e ? fs(e) : Is(Ds);
  let r = new h;
  return t["add"](r), G(r, .014, .02, .09, W, [-.012, 0x0, -.1], [0x0, .25, 0x0]), G(r, .014, .02, .09, W, [.012, 0x0, -.1], [0x0, -.25, 0x0]), K(r, .012, .012, .02, U, [0x0, 0x0, -.06], "x", 0x6), G(r, .016, .022, .11, 0xb93a2c, [-.022, 0x0, .005], [0x0, .18, 0x0]), G(r, .016, .022, .11, 0xb93a2c, [.022, 0x0, .005], [0x0, -.18, 0x0]), Bs(t, .042, .18, Es, [.1, -.16, .14], [1.2, -.25, 0x0]), Zs(t, n, [.012, -.03, .02], [-.45, 0x0, -.15]), Ys(t, [.022, -.05, .05], [.32, -.5, .44], .042, Es), Bs(t, .038, .16, Es, [-.1, -.15, .1], [1.3, .35, 0x0]), Zs(t, n, [-.05, -.02, -.06], [-.35, 0x0, .6], .92), Ys(t, [-.06, -.04, -.03], [-.34, -.55, .4], .038, Es), {
    ["mesh"]: t,
    ["muzzle"]: -.2
  }
}

function ec() {
  let e = new h;
  G(e, .15, .095, .052, 0x2e3630, [0x0, -.03, 0x0]), G(e, .154, .032, .056, 0x252c27, [0x0, .023, 0x0]), G(e, .028, .018, .06, 0x171b18, [0x0, .012, 0x0]), G(e, .15, .012, .058, 0x1d221e, [0x0, -.062, 0x0]);
  let t = new h;
  return G(t, .014, .02, .09, W, [-.012, 0x0, -.1], [0x0, .25, 0x0]), G(t, .014, .02, .09, W, [.012, 0x0, -.1], [0x0, -.25, 0x0]), K(t, .012, .012, .02, U, [0x0, 0x0, -.06], "x", 0x6), G(t, .016, .022, .11, 0xb93a2c, [-.022, 0x0, .005], [0x0, .18, 0x0]), G(t, .016, .022, .11, 0xb93a2c, [.022, 0x0, .005], [0x0, -.18, 0x0]), t["position"]["set"](0x0, .05, .01), t["rotation"]["set"](-.5, .35, .12), e["add"](t), {
    ["mesh"]: e,
    ["muzzle"]: -.1
  }
}

function tc(e, t) {
  let n = new Me(e);
  return n["r"] = Math["min"](0x1, n["r"] * t), n["g"] = Math["min"](0x1, n["g"] * t), n["b"] = Math["min"](0x1, n["b"] * t), n["getHex"]()
}

function nc(e, t, n, r, i = !0x0) {
  return Qs(t["vm"], n, r, i)
}
var rc = {
  ["pistol"]: {
    ["k"]: 0x1f4,
    ["d"]: 0x20,
    ["back0"]: 1.05,
    ["backV"]: .85,
    ["rise0"]: 1.5,
    ["riseV"]: 1.3,
    ["tw"]: 0x2,
    ["lat"]: .5,
    ["sus"]: 0x0,
    ["susCap"]: 0x0,
    ["sho"]: .35
  },
  ["smg"]: {
    ["k"]: 0x1b8,
    ["d"]: 0x1e,
    ["back0"]: 1.1,
    ["backV"]: 0x1,
    ["rise0"]: 1.6,
    ["riseV"]: 1.8,
    ["tw"]: 2.2,
    ["lat"]: .55,
    ["sus"]: .1,
    ["susCap"]: .45,
    ["sho"]: .7
  },
  ["rifle"]: {
    ["k"]: 0x186,
    ["d"]: 0x1c,
    ["back0"]: 1.25,
    ["backV"]: 1.35,
    ["rise0"]: 1.9,
    ["riseV"]: 2.3,
    ["tw"]: 2.4,
    ["lat"]: .55,
    ["sus"]: .13,
    ["susCap"]: .55,
    ["sho"]: 0x1
  },
  ["mg"]: {
    ["k"]: 0x14a,
    ["d"]: 0x1a,
    ["back0"]: 1.45,
    ["backV"]: 1.3,
    ["rise0"]: 0x2,
    ["riseV"]: 2.1,
    ["tw"]: 0x3,
    ["lat"]: .7,
    ["sus"]: .15,
    ["susCap"]: .7,
    ["sho"]: 1.3
  },
  ["shotgun"]: {
    ["k"]: 0x109,
    ["d"]: 0x18,
    ["back0"]: 2.5,
    ["backV"]: .75,
    ["rise0"]: 2.6,
    ["riseV"]: 1.1,
    ["tw"]: 2.6,
    ["lat"]: .6,
    ["sus"]: 0x0,
    ["susCap"]: 0x0,
    ["sho"]: 1.4
  },
  ["sniper"]: {
    ["k"]: 0xeb,
    ["d"]: 0x16,
    ["back0"]: 2.9,
    ["backV"]: .9,
    ["rise0"]: 2.4,
    ["riseV"]: 1.2,
    ["tw"]: 0x2,
    ["lat"]: .4,
    ["sus"]: .2,
    ["susCap"]: .4,
    ["sho"]: 1.55
  }
};
var ic = class {
  constructor(e) {
    this["game"] = e, this["_leftHand"] = !0x1, this["_kind"] = null, this["scene"] = new o, this["camera"] = new Ue(0x3a, innerWidth / innerHeight, .01, 0x14), this["hemiL"] = new se(0xf6ecd8, 0x4e5a68, .5), this["scene"]["add"](this["hemiL"]), this["keyL"] = new d(0xffe9c4, .26), this["keyL"]["position"]["set"](.6, 0x1, .4), this["scene"]["add"](this["keyL"]), this["_shade"] = 0x0, this["root"] = new h, this["mirror"] = new h, this["mirror"]["name"] = __p_KGFS_MAIN_STR(0x4a8b, 0xe), this["scene"]["add"](this["mirror"]), this["mirror"]["add"](this["root"]), this["base"] = new g(.27, -.26, -.55), this["cache"] = {}, this["current"] = null, this["muzzleZ"] = -.5, this["muzzleY"] = .035, this["_mzV"] = new g, this["_mzF"] = new g, this["_mzW"] = new g, this["_mzQ"] = new F, this["bobT"] = 0x0, this["bobAmt"] = 0x0, this["_airT"] = 0x0, this["kickZ"] = 0x0, this["kickRX"] = 0x0, this["kickZV"] = 0x0, this["kickRXV"] = 0x0, this["kickRZV"] = 0x0, this["kickX"] = 0x0, this["kickXV"] = 0x0, this["kickY"] = 0x0, this["kickYV"] = 0x0, this["kickRY"] = 0x0, this["kickRYV"] = 0x0, this["swayX"] = 0x0, this["swayY"] = 0x0, this["prevYaw"] = 0x0, this["prevPitch"] = 0x0, this["reloadT"] = 0x0, this["reloadDur"] = 0x0, this["drawAnimT"] = 0x0, this["drawDur"] = .5, this["slashT"] = 0x0, this["slashHeavy"] = !0x1, this["throwT"] = 0x0, this["pinT"] = 0x0, this["landDip"] = 0x0, this["action"] = null, this["_actionT"] = 0x0, this["_defuseTool"] = null, this["flash"] = new Yo(this["scene"], {
      ["depthTest"]: !0x0,
      ["full"]: (e["quality"] || "high") === "high"
    }), Ro();
    let t = ac();
    this["_puffs"] = [];
    for (let e = 0x0; e < 0xa; e++) {
      let e = new I(new Le(0x1, 0x1), new ke({
        ["map"]: t,
        ["transparent"]: !0x0,
        ["depthWrite"]: !0x1,
        ["fog"]: !0x1,
        ["opacity"]: 0x0
      }));
      e["visible"] = !0x1, e["renderOrder"] = 0x4, this["root"]["add"](e), this["_puffs"]["push"]({
        ["mesh"]: e,
        ["life"]: 0x0,
        ["max"]: 0x1,
        ["vx"]: 0x0,
        ["vy"]: 0x0,
        ["vz"]: 0x0,
        ["s0"]: .04,
        ["s1"]: .1,
        ["a0"]: .4
      })
    }
    this["_puffNext"] = 0x0, this["_burstN"] = 0x0, this["_lastKickT"] = -0x9, this["_sustain"] = 0x0, this["_cycleT"] = 0x0, this["_cycleDur"] = .08, this["_pumpT"] = 0x0, this["_boltCycT"] = 0x0, this["_boltCycDur"] = 0x1, this["_sprK"] = 0x154, this["_sprD"] = 0x1b
  } ["_puff"](e, t, n, r, i) {
    let a = this["_puffs"][this["_puffNext"]];
    this["_puffNext"] = (this["_puffNext"] + 0x1) % this["_puffs"]["length"], a["mesh"]["visible"] = !0x0, a["mesh"]["position"]["set"](e, t, n), a["mesh"]["rotation"]["z"] = Math["random"]() * 6.28, a["life"] = a["max"] = r ? .6 : .42, a["vx"] = (Math["random"]() - .5) * .07, a["vy"] = .15 + Math["random"]() * .12, a["vz"] = -.03 - Math["random"]() * .05;
    let o = this["game"]["cs2"];
    let s = o && o["muzzleWorld"] ? o["muzzleWorld"](this["_mzW"], this["_twinLeft"]) : null;
    let c = o && o["muzzleQuat"] ? o["muzzleQuat"](this["_mzQ"], this["_twinLeft"]) : null;
    a["t"] = 0x0, a["follow"] = !!(s && c), a["follow"] && (sc["copy"](c)["invert"](), oc["set"](e - s["x"], t - s["y"], n - s["z"])["applyQuaternion"](sc), a["ox"] = oc["x"], a["oy"] = oc["y"], a["oz"] = oc["z"], oc["set"](a["vx"], a["vy"], a["vz"])["applyQuaternion"](sc), a["vx"] = oc["x"], a["vy"] = oc["y"], a["vz"] = oc["z"]), a["s0"] = r ? .055 : .034, a["s1"] = r ? .19 : .11, a["a0"] = i ? .5 : .34
  } ["setTeam"](e) {
    Ms(e), this["cache"] = {}, this["_defuseTool"] &&= (this["root"]["remove"](this["_defuseTool"]["mesh"]), null);
    let t = this["game"]["weapons"] && this["game"]["weapons"]["current"];
    t && this["current"] && this["setWeapon"](t)
  } ["setWeapon"](e) {
    this["current"] && this["root"]["remove"](this["current"]);
    let t = V[e];
    this["_kind"] = t["vm"]["kind"], this["_kindLift"] = t["vm"]["kind"] === "pistol" ? .065 : t["vm"]["kind"] === "knife" || t["vm"]["kind"] === "zeus" ? .05 : t["vm"]["kind"] === "grenade" ? .055 : t["vm"]["kind"] === "c4" ? .04 : 0x0;
    let n = this["game"]["weapons"] && this["game"]["weapons"]["states"] ? this["game"]["weapons"]["states"][e] : null;
    let r = n && n["skinOverride"] === "default" ? null : n && n["skinOverride"] || H["equippedFor"](t["class"] === "knife" ? "knife" : e);
    let i = H["equippedFor"]("gloves");
    let a = e + "|" + (r ? r["id"] : "d") + "|" + (i ? i["id"] : "d" + ks);
    let o = this["cache"][a];
    o || (o = nc(e, t, r, i), this["cache"][a] = o), this["current"] = o["mesh"], this["_thrown"] = !0x1, this["current"]["visible"] = !0x0, this["_offhand"] = [], this["_mag"] = [], this["_bolt"] = [], this["_slide"] = [], this["_pump"] = [], this["_lhand"] = [];
    let s = e => {
      for (let t = e["parent"]; t; t = t["parent"]) {
        if (t["name"] === "mag") {
          return !0x0
        }
      }
      return !0x1
    };
    let c = (e, t) => {
      return e["userData"]["_bp"] ? (e["position"]["copy"](e["userData"]["_bp"]), t && e["userData"]["_br"] && e["rotation"]["copy"](e["userData"]["_br"])) : (e["userData"]["_bp"] = e["position"]["clone"](), t && (e["userData"]["_br"] = e["rotation"]["clone"]())), e["visible"] = !0x0, e["traverse"](e => {
        e["visible"] = !0x0
      }), e
    };
    o["mesh"]["traverse"](e => {
      e["isMesh"] && (e["receiveShadow"] = !0x0), e["name"] === "offhand" ? this["_offhand"]["push"](e) : e["name"] === "mag" && !s(e) ? (c(e, !0x0), this["_mag"]["push"]([e, e["userData"]["_bp"]["clone"](), e["userData"]["_br"]["clone"]()])) : e["name"] === "bolt" ? (c(e), this["_bolt"]["push"]([e, e["userData"]["_bp"]["clone"]()])) : e["name"] === "slide" ? (c(e), this["_slide"]["push"]([e, e["userData"]["_bp"]["clone"]()])) : e["name"] === "pump" ? (c(e), this["_pump"]["push"]([e, e["userData"]["_bp"]["clone"]()])) : e["name"] === "lhand" && (c(e), this["_lhand"]["push"]([e, e["userData"]["_bp"]["clone"]()]))
    }), this["_partsDirty"] = !0x1, this["_glint"] = o["mesh"]["getObjectByName"]("scopeGlint") || null, this["muzzleZ"] = o["muzzle"], this["muzzleY"] = o["muzzleY"] === void 0x0 ? .035 : o["muzzleY"], this["root"]["add"](this["current"]), this["_applyHandSide"](), this["drawAnimT"] = this["drawDur"] = t["draw"] || .5, this["reloadT"] = 0x0, this["slashT"] = 0x0, this["throwT"] = 0x0, this["inspectT"] = 0x0
  } ["inspect"]() {
    let e = this["game"]["weapons"];
    this["reloadT"] > 0x0 || this["slashT"] > 0x0 || this["throwT"] > 0x0 || this["drawAnimT"] > 0x0 || this["action"] || e && e["scopeLevel"] > 0x0 || e && e["grenadeCooking"] || (this["inspectT"] = this["inspectDur"] = 2.8)
  } ["warmCombat"](e) {
    let t = new F;
    for (let n in V) {
      let r = V[n];
      if (!r || r["class"] === "grenade" || r["class"] === "c4") {
        continue
      }
      let i = e ? -.6 : 0x0;
      let a = e ? 0x0 : -0xfa0;
      try {
        this["flash"]["emit"](0x0, a, i, 0x0, 0x0, -0x1, n, !0x0, !0x1, t)
      } catch {}
      try {
        this["flash"]["emit"](0x0, a, i, 0x0, 0x0, -0x1, n, !0x1, !0x1, t)
      } catch {}
    }
    for (let e of this["_puffs"]) {
      e["mesh"]["visible"] = !0x0, e["mesh"]["material"]["opacity"] = .01
    }
    return () => {
      this["flash"]["clear"]();
      for (let e of this["_puffs"]) {
        e["life"] = 0x0, e["mesh"]["visible"] = !0x1, e["mesh"]["material"]["opacity"] = 0x0
      }
    }
  } ["_applyHandSide"]() {
    let e = this["_kind"] === "grenade" || this["_kind"] === "c4" || this["_kind"] === "zeus";
    this["current"] && (this["current"]["position"]["x"] = e && this["_leftHand"] ? -this["base"]["x"] : 0x0)
  } ["setHand"](e) {
    this["_leftHand"] = !!e, this["mirror"] && (this["mirror"]["scale"]["x"] = e ? -0x1 : 0x1), this["_applyHandSide"]()
  } ["kick"](e) {
    this["inspectT"] = 0x0;
    let t = e["vmKick"] == null ? e["recoil"] ? e["recoil"]["v"] : .6 : e["vmKick"];
    let n = e["class"];
    let r = rc[n] || rc["rifle"];
    this["_sprK"] = r["k"], this["_sprD"] = r["d"], this["kickZV"] += r["back0"] + t * r["backV"], this["kickRXV"] += r["rise0"] + t * r["riseV"], this["kickRZV"] = (this["kickRZV"] || 0x0) + (Math["random"]() - .5) * t * r["tw"], this["kickXV"] += (Math["random"]() - .5) * t * r["lat"];
    let i = (r["sho"] || .5) * (.55 + t * .5);
    this["kickYV"] -= i * .24, this["kickRYV"] += i * (.55 + Math["random"]() * .25), this["kickZ"] > .2 && (this["kickZ"] = .2), e["auto"] && (this["_sustain"] = Math["min"](r["susCap"], this["_sustain"] + r["sus"])), this["reloadT"] <= 0x0 && e["class"] !== "knife" && e["class"] !== "zeus" && (e["boltTime"] ? this["_boltCycT"] = this["_boltCycDur"] = Math["min"](1.1, e["boltTime"] * .75) : n === "shotgun" && e["shellReload"] && !e["auto"] ? this["_pumpT"] = .5 : e["rpm"] && (this["_cycleT"] = this["_cycleDur"] = Math["min"](.1, Math["max"](.05, 0x28 / e["rpm"]))), this["_partsDirty"] = !0x0);
    let a = n === "knife" || n === "zeus" || n === "grenade" || n === "c4" || !!this["game"]["scoped"];
    let o = this["game"]["time"];
    if (this["_burstN"] = o - this["_lastKickT"] < .25 ? this["_burstN"] + 0x1 : 0x1, this["_lastKickT"] = o, !a) {
      let t = e["vm"]["dual"] && Math["random"]() < .5;
      let n = e["vm"]["dual"] ? t ? -.2 : .1 : 0x0;
      let r = this["_mzV"]["set"](n, this["muzzleY"] + (t ? -.045 : 0x0), this["muzzleZ"] - .05);
      let i = this["_mzF"]["set"](0x0, 0x0, -0x1);
      this["current"] && (r["applyQuaternion"](this["current"]["quaternion"]), i["applyQuaternion"](this["current"]["quaternion"]));
      let a = this["game"]["cs2"];
      this["_twinLeft"] = a && a["twinMuzzle"] ? !this["_twinLeft"] : !0x1;
      let o = a && a["muzzleWorld"] && a["muzzleWorld"](this["_mzW"], this["_twinLeft"]);
      let s;
      let c;
      let l;
      o ? (s = o["x"], c = o["y"], l = o["z"]) : (this["root"]["localToWorld"](this["_mzW"]["copy"](r)["addScaledVector"](i, .02)), s = this["_mzW"]["x"], c = this["_mzW"]["y"], l = this["_mzW"]["z"]), this["_mzF"]["set"](0x0, 0x0, -0x1), this["current"] && this["_mzF"]["applyQuaternion"](this["current"]["quaternion"]);
      let u = a && a["muzzleQuat"] ? a["muzzleQuat"](this["_mzQ"], this["_twinLeft"]) : null;
      this["flash"]["emit"](s, c, l, this["_mzF"]["x"], this["_mzF"]["y"], this["_mzF"]["z"], e["id"], !0x0, !0x0, u)
    }
  } ["reload"](e) {
    this["reloadT"] = this["reloadDur"] = Math["max"](.5, e), this["_seated"] = !0x1
  } ["slash"](e) {
    this["slashT"] = e ? .4 : .25, this["slashHeavy"] = e, this["_slashAlt"] = !this["_slashAlt"]
  } ["pullPin"]() {
    this["pinT"] = .25
  } ["throwAnim"]() {
    this["throwT"] = .3, this["_thrown"] = !0x0, this["current"] && (this["current"]["visible"] = !0x1)
  } ["land"](e) {
    this["landDip"] = Math["min"](.08, this["landDip"] + e)
  } ["update"](e) {
    let t = this["game"];
    let n = t["player"];
    if (!this["current"]) {
      return
    }
    let r = t["spectating"] && !n["alive"] && t["spectating"]["alive"];
    if (this["root"]["visible"] = !t["cs2"] && !t["scoped"] && (n["alive"] || r), t["physics"]) {
      let i = r ? t["spectating"] : n;
      let a = t["physics"]["raycast"](i["x"], i["y"] + (i["eyeH"] || 1.55), i["z"], .5278, .7917, .3079, 0x78, 0x2);
      let o = !!(a && a["b"] && a["b"]["mask"] & 0x1);
      if (this["_shade"] += (+!!o - this["_shade"]) * Math["min"](0x1, e * 0x7), Math["abs"](this["_shade"] - (this["_shadeApplied"] ?? -0x1)) > .012) {
        this["_shadeApplied"] = this["_shade"];
        let e = 0x1 - this["_shade"] * .75;
        this["root"]["traverse"](t => {
          if (!t["isMesh"]) {
            return
          }
          let n = t["material"];
          n && !Array["isArray"](n) && n["envMapIntensity"] !== void 0x0 && (n["userData"]["vmEnvBase"] || (n = t["material"] = n["clone"](), n["userData"]["vmEnvBase"] = n["envMapIntensity"] || 0x1), n["envMapIntensity"] = n["userData"]["vmEnvBase"] * e)
        })
      }
    }
    let i = n["yaw"] - this["prevYaw"];
    let a = n["pitch"] - this["prevPitch"];
    this["prevYaw"] = n["yaw"], this["prevPitch"] = n["pitch"], this["swayX"] += (cc(i * .6, -.03, .03) - this["swayX"]) * Math["min"](0x1, e * 0xa), this["swayY"] += (cc(a * .6, -.03, .03) - this["swayY"]) * Math["min"](0x1, e * 0xa);
    let o = Math["hypot"](n["vx"], n["vz"]);
    let s = n["alive"] && t["input"]["locked"] ? 0x1 : 0x0;
    this["_airT"] = n["onGround"] ? 0x0 : this["_airT"] + e;
    let c = Math["min"](0x1, o / 5.2) * +(this["_airT"] < .12) * s;
    this["bobAmt"] += (c - this["bobAmt"]) * Math["min"](0x1, e * 0xe);
    let l = this["bobAmt"];
    this["bobT"] += e * (0x4 + o * 1.6);
    let u = Math["sin"](this["bobT"] * 0x2) * .012 * l;
    let d = Math["cos"](this["bobT"]) * .009 * l;
    let f = (t, n, r, i) => {
      this[n] -= (this[t] * r + this[n] * i) * e, this[t] += this[n] * e, Math["abs"](this[t]) < 4e-4 && Math["abs"](this[n]) < .01 && (this[t] = 0x0, this[n] = 0x0)
    };
    f("kickZ", "kickZV", this["_sprK"], this["_sprD"]), f("kickRX", "kickRXV", this["_sprK"] * 1.15, this["_sprD"] * 1.05), f("kickX", "kickXV", 0x12c, 0x1a), f("kickY", "kickYV", 0x14a, 0x1b), f("kickRY", "kickRYV", 0x17c, 0x1c), this["kickZ"] > .2 && (this["kickZ"] = .2, this["kickZV"] > 0x0 && (this["kickZV"] = 0x0)), this["kickRX"] > .42 && (this["kickRX"] = .42, this["kickRXV"] > 0x0 && (this["kickRXV"] = 0x0)), this["landDip"] *= .001 ** e, this["_sustain"] = Math["max"](0x0, this["_sustain"] - e * .9);
    let p = this["base"]["x"] + d + this["swayX"] + this["_sustain"] * .012;
    let m = this["base"]["y"] + (this["_kindLift"] || 0x0) + u - this["landDip"] + this["swayY"] + this["_sustain"] * .01 + this["kickY"];
    let h = this["base"]["z"] + this["kickZ"] + this["_sustain"] * .05;
    let g = this["kickRX"] + this["_sustain"] * .11;
    let _ = this["kickRY"];
    let v = -this["kickRY"] * .5;
    let y = this["kickX"];
    if (this["drawAnimT"] > 0x0) {
      this["drawAnimT"] -= e;
      let t = Math["max"](0x0, this["drawAnimT"] / this["drawDur"]);
      m -= t * .35, g -= t * .9
    }
    if (this["reloadT"] > 0x0) {
      this["reloadT"] -= e;
      let n = cc(0x1 - Math["max"](0x0, this["reloadT"]) / this["reloadDur"], 0x0, 0x1);
      let r = e => {
        return e = cc(e, 0x0, 0x1), e * e * (0x3 - 0x2 * e)
      };
      let i = t["weapons"] && t["weapons"]["def"] && t["weapons"]["def"]()["class"] || "rifle";
      if (this["_partsDirty"] = !0x0, i === "shotgun") {
        let e = Math["sin"](n * Math["PI"]);
        v -= e * .22, g -= e * .1, m -= e * .035, _ += e * .1;
        let t = r(n < .55 ? n / .55 : (0x1 - n) / .45);
        for (let [e, n] of this["_lhand"]) {
          e["position"]["set"](n["x"] - t * .02, n["y"] - t * .1, n["z"] + t * .3)
        }
        for (let [e, t] of this["_pump"]) {
          e["position"]["z"] = t["z"] + Math["sin"](Math["min"](0x1, n * 0x3) * Math["PI"]) * .05
        }
      } else {
        let e = r(Math["min"](0x1, n / .14)) * r(Math["min"](0x1, (0x1 - n) / .12));
        v -= e * .42, g -= e * .14, _ += e * .1, m -= e * .05;
        let t = 0x0;
        n >= .16 && n < .4 ? t = r((n - .16) / .24) : n >= .4 && n < .58 ? t = 0x1 : n >= .58 && n < .8 && (t = 0x1 - r((n - .58) / .22));
        for (let [e, n, r] of this["_mag"]) {
          e["position"]["set"](n["x"], n["y"] - t * .17, n["z"] + t * .06), e["rotation"]["set"](r["x"] + t * .55, r["y"], r["z"]), e["visible"] = t < .995
        }
        for (let [e, n] of this["_lhand"]) {
          e["position"]["set"](n["x"] + t * .05, n["y"] - t * .16, n["z"] + t * .24)
        }
        n >= .78 && !this["_seated"] && (this["_seated"] = !0x0, this["kickZV"] += .9, this["kickRXV"] += 1.2), n < .2 && (this["_seated"] = !0x1);
        let i = cc((n - .82) / .14, 0x0, 0x1);
        let a = i > 0x0 ? Math["sin"](i * Math["PI"]) : 0x0;
        for (let [e, t] of this["_slide"]) {
          e["position"]["z"] = t["z"] + a * .05
        }
        for (let [e, t] of this["_bolt"]) {
          e["position"]["z"] = t["z"] + a * .055
        }
      }
    }
    if (this["_offhand"] && this["_offhand"]["length"]) {
      let e = this["inspectT"] > 0x0;
      if (this["_offhandHidden"] !== e) {
        this["_offhandHidden"] = e;
        for (let t of this["_offhand"]) {
          t["visible"] = !e
        }
      }
    }
    if (this["inspectT"] > 0x0) {
      if (this["reloadT"] > 0x0 || this["slashT"] > 0x0 || this["throwT"] > 0x0 || this["action"] || t["weapons"] && t["weapons"]["scopeLevel"] > 0x0) {
        this["inspectT"] = 0x0
      } else {
        this["inspectT"] -= e;
        let t = 0x1 - this["inspectT"] / this["inspectDur"];
        if (this["_kind"] === "knife") {
          let e = Math["min"](0x1, t / .18);
          let n = 0x1 - Math["min"](0x1, Math["max"](0x0, (t - .6) / .4));
          let r = e * e * (0x3 - 0x2 * e) * (n * n * (0x3 - 0x2 * n));
          p -= r * .055, h += r * .05, _ += r * .95, v -= r * .85 * Math["sin"](Math["min"](0x1, t / .6) * Math["PI"]), g += r * .05 * Math["sin"](t * Math["PI"] * 0x2)
        } else {
          let e = Math["min"](0x1, t / .12) * Math["min"](0x1, (0x1 - t) / .3);
          let n = e < 0x0 ? 0x0 : e * e * (0x3 - 0x2 * Math["min"](0x1, e));
          let r = Math["min"](0x1, t * 2.1);
          let i = r * r * (0x3 - 0x2 * r);
          p -= n * .13, m += n * .08, h += n * .07, _ += n * i * 0x2, v -= n * .42 * Math["sin"](t * Math["PI"]), g += n * .1 * Math["sin"](Math["min"](t, .5) * Math["PI"] * 0x2), this["_partsDirty"] = !0x0;
          let a = cc((t - .5) / .24, 0x0, 0x1);
          let o = Math["sin"](a * Math["PI"]) * .4;
          for (let [e, t, n] of this["_mag"]) {
            e["position"]["set"](t["x"], t["y"] - o * .17, t["z"] + o * .06), e["rotation"]["set"](n["x"] + o * .5, n["y"], n["z"])
          }
          let s = cc((t - .8) / .12, 0x0, 0x1);
          let c = s > 0x0 ? Math["sin"](s * Math["PI"]) : 0x0;
          for (let [e, t] of this["_bolt"]) {
            e["position"]["z"] = t["z"] + c * .05
          }
          for (let [e, t] of this["_slide"]) {
            e["position"]["z"] = t["z"] + c * .04
          }
        }
      }
    }
    if (this["reloadT"] <= 0x0 && this["inspectT"] <= 0x0) {
      if (this["_cycleT"] > 0x0) {
        this["_cycleT"] -= e;
        let t = 0x1 - Math["max"](0x0, this["_cycleT"]) / this["_cycleDur"];
        let n = Math["sin"](t * Math["PI"]);
        for (let [e, t] of this["_slide"]) {
          e["position"]["z"] = t["z"] + n * .055
        }
        for (let [e, t] of this["_bolt"]) {
          e["position"]["z"] = t["z"] + n * .035
        }
        this["_partsDirty"] = !0x0
      }
      if (this["_pumpT"] > 0x0) {
        this["_pumpT"] -= e;
        let t = 0x1 - Math["max"](0x0, this["_pumpT"]) / .5;
        let n = 0x0;
        t > .24 && (n = t < .64 ? (t - .24) / .4 : Math["max"](0x0, 0x1 - (t - .64) / .36));
        let r = n * n * (0x3 - 0x2 * n);
        for (let [e, t] of this["_pump"]) {
          e["position"]["z"] = t["z"] + r * .07
        }
        for (let [e, t] of this["_lhand"]) {
          e["position"]["z"] = t["z"] + r * .07
        }
        g -= r * .07, h += r * .01, this["_partsDirty"] = !0x0
      }
      if (this["_boltCycT"] > 0x0) {
        this["_boltCycT"] -= e;
        let t = 0x1 - Math["max"](0x0, this["_boltCycT"]) / this["_boltCycDur"];
        let n = 0x0;
        t > .2 && (n = t < .5 ? (t - .2) / .3 : t < .62 ? 0x1 : Math["max"](0x0, 0x1 - (t - .62) / .33));
        let r = n * n * (0x3 - 0x2 * Math["min"](0x1, n));
        for (let [e, t] of this["_bolt"]) {
          e["position"]["z"] = t["z"] + r * .085
        }
        v += r * .1, g -= r * .045, m -= r * .012, this["_partsDirty"] = !0x0
      }
    }
    if (this["_partsDirty"] && this["reloadT"] <= 0x0 && this["inspectT"] <= 0x0 && this["_cycleT"] <= 0x0 && this["_pumpT"] <= 0x0 && this["_boltCycT"] <= 0x0) {
      for (let [e, t, n] of this["_mag"]) {
        e["position"]["copy"](t), e["rotation"]["copy"](n), e["visible"] = !0x0
      }
      for (let [e, t] of this["_bolt"]) {
        e["position"]["copy"](t)
      }
      for (let [e, t] of this["_slide"]) {
        e["position"]["copy"](t)
      }
      for (let [e, t] of this["_pump"]) {
        e["position"]["copy"](t)
      }
      for (let [e, t] of this["_lhand"]) {
        e["position"]["copy"](t)
      }
      this["_partsDirty"] = !0x1, this["_seated"] = !0x1
    }
    if (this["slashT"] > 0x0) {
      this["slashT"] -= e;
      let t = this["slashHeavy"] ? .4 : .25;
      let n = 0x1 - this["slashT"] / t;
      if (this["slashHeavy"]) {
        let e = Math["sin"](n * Math["PI"]);
        h -= e * .34, m += e * .03, g -= e * .25, _ += e * .28
      } else {
        let e = Math["min"](0x1, n * 2.6);
        let t = Math["max"](0x0, (n - .38) / .62);
        let r = e * e * (0x1 - t * t);
        let i = this["_slashAlt"] ? 0x1 : -0x1;
        p += r * (.1 - t * .44) * i, m -= r * .1, h -= r * .17, _ += r * .08 * i, v -= r * .26 * i, g -= r * .3
      }
    }
    if (this["pinT"] > 0x0 && (this["pinT"] -= e, g += Math["sin"]((0x1 - this["pinT"] / .25) * Math["PI"]) * .2), this["throwT"] > 0x0) {
      this["throwT"] -= e;
      let t = 0x1 - this["throwT"] / .3;
      g -= Math["sin"](t * Math["PI"]) * 1.45, h -= Math["sin"](t * Math["PI"]) * .38, m += Math["sin"](t * Math["PI"]) * .1
    }
    let b = t["weapons"]["grenadeCooking"];
    if (this["_cookT"] = Math["max"](0x0, Math["min"](.22, (this["_cookT"] || 0x0) + (b ? e : -e * 0x4))), this["_cookT"] > 0x0) {
      let e = this["_cookT"] / .22;
      let t = e * e * (0x3 - 0x2 * e);
      p += .06 * t, m += .09 * t, h += .16 * t, g += .6 * t + Math["sin"](this["bobT"] * 1.4) * .012 * t, v += .18 * t
    }
    if (this["action"]) {
      this["_actionT"] += e;
      let t = this["_actionT"];
      if (Math["min"](0x1, t * 0x5), this["action"] === "plant") {
        let e = Math["min"](0x1, t / .55);
        let n = e * e * (0x3 - 0x2 * e);
        p -= .14 * n, m += .03 * n - .1 * Math["sin"](n * Math["PI"]), h += .1 * n, g += .42 * n - .14 * n * n, t > .55 && (g += Math["sin"](t * 0xb) * .022, m += Math["abs"](Math["sin"](t * 0xb)) * .012, p += Math["sin"](t * 5.5) * .006)
      } else {
        this["_defuseTool"] || (this["_defuseTool"] = $s(H["equippedFor"]("gloves")), this["_defuseTool"]["mesh"]["traverse"](e => {
          e["isMesh"] && (e["receiveShadow"] = !0x0)
        }), this["root"]["add"](this["_defuseTool"]["mesh"])), this["_defuseTool"]["mesh"]["visible"] = !0x0, this["current"] && (this["current"]["visible"] = !0x1);
        let e = Math["min"](0x1, t / .5);
        let n = e * e * (0x3 - 0x2 * e);
        if (p -= .11 * n, m += .02 * n - .09 * Math["sin"](n * Math["PI"]), h += .09 * n, g += .34 * n - .1 * n * n, t > .5) {
          let e = Math["sin"](t * 8.5);
          v += e * .055, g += Math["max"](0x0, e) * .03, m += Math["abs"](Math["sin"](t * 8.5)) * .01, p += Math["sin"](t * 3.2) * .007
        }
      }
    } else {
      this["_actionT"] = 0x0, this["_defuseTool"] && (this["_defuseTool"]["mesh"]["visible"] = !0x1), this["current"] && (this["current"]["visible"] = !this["_thrown"])
    }
    if (this["_glint"]) {
      let e = this["game"]["player"];
      let t = Math["cos"](e["pitch"]);
      let n = -Math["sin"](e["yaw"]) * t;
      let r = Math["sin"](e["pitch"]);
      let i = -Math["cos"](e["yaw"]) * t;
      let a = n * .53 + r * .79 + i * .31;
      let o = Math["max"](0x0, Math["min"](0x1, (a - .35) / .55));
      let s = o * o * (0x3 - 0x2 * o);
      this["_glint"]["material"]["opacity"] = .4 + s * .6;
      let c = 0x1 + s * 2.2;
      this["_glint"]["scale"]["set"](c, c, 0x1)
    }
    this["root"]["position"]["set"](p + y, m, h), this["kickRZV"] = (this["kickRZV"] || 0x0) - ((this["kickRZ"] || 0x0) * 0x104 + (this["kickRZV"] || 0x0) * 0x19) * e, this["kickRZ"] = (this["kickRZ"] || 0x0) + this["kickRZV"] * e, this["root"]["rotation"]["set"](g, _, v + this["kickRZ"]);
    let x = this["game"]["cs2"];
    this["root"]["updateMatrixWorld"](!0x0);
    let S = x && x["muzzleWorld"] ? x["muzzleWorld"](this["_mzW"], this["_twinLeft"]) : null;
    let C = x && x["muzzleQuat"] ? x["muzzleQuat"](this["_mzQ"], this["_twinLeft"]) : null;
    this["game"]["scoped"] ? this["flash"]["clear"]() : this["flash"]["update"](e, this["camera"], S, C);
    let w = this["game"] && this["game"]["effects"] && this["game"]["effects"]["taser"];
    w && w["updateView"](e, this["scene"], S);
    for (let t of this["_puffs"]) {
      if (t["life"] <= 0x0) {
        continue
      }
      if (t["life"] -= e, t["life"] <= 0x0) {
        t["mesh"]["visible"] = !0x1;
        continue
      }
      let n = 0x1 - t["life"] / t["max"];
      t["t"] = (t["t"] || 0x0) + e, t["follow"] && S && C ? (oc["set"](t["ox"] + t["vx"] * t["t"], t["oy"] + t["vy"] * t["t"], t["oz"] + t["vz"] * t["t"])["applyQuaternion"](C), t["mesh"]["position"]["set"](S["x"] + oc["x"], S["y"] + oc["y"], S["z"] + oc["z"])) : (t["mesh"]["position"]["x"] += t["vx"] * e, t["mesh"]["position"]["y"] += t["vy"] * e, t["mesh"]["position"]["z"] += t["vz"] * e);
      let r = t["s0"] + (t["s1"] - t["s0"]) * n;
      t["mesh"]["scale"]["set"](r, r, 0x1), t["mesh"]["material"]["opacity"] = t["a0"] * (0x1 - n)
    }
  } ["resize"](e) {
    this["camera"]["aspect"] = e, this["camera"]["updateProjectionMatrix"]()
  }
};
var oc = new g;
var sc = new F;

function cc(e, t, n) {
  return e < t ? t : e > n ? n : e
}
export { Qs, nc, rc, Ms, ec, ic };
