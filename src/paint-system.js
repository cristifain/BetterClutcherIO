// Weapon paint/skin material system, extracted from main.js (entry point: wp; shared deps imported from main.js).

import { $ as e, A as t, At as n, B as r, Bt as i, C as a, Ct as o, D as s, Dt as c, E as l, Et as u, F as d, Ft as f, G as p, Gt as m, H as h, Ht as g, I as _, It as v, J as y, K as b, L as x, Lt as S, M as C, Mt as w, N as T, Nt as E, O as D, Ot as O, P as k, Pt as A, Q as j, R as ee, Rt as te, S as M, St as N, T as P, Tt as ne, U as re, Ut as ie, V as ae, Vt as oe, W as se, Wt as ce, X as le, Y as ue, Z as de, _ as fe, _t as F, a as pe, at as me, b as he, bt as ge, c as _e, ct as ve, d as ye, dt as be, et as xe, f as Se, ft as Ce, g as we, gt as Te, h as Ee, ht as De, i as Oe, it as ke, j as Ae, jt as je, k as Me, kt as Ne, l as Pe, lt as Fe, m as Ie, mt as Le, n as Re, nt as ze, o as Be, ot as Ve, p as He, pt as Ue, q as We, r as Ge, rt as I, s as Ke, st as qe, t as Je, tt as Ye, u as Xe, ut as Ze, v as Qe, vt as $e, w as et, wt as tt, x as nt, xt as rt, y as it, yt as at, z as ot, zt as st } from "./three-B50Y55N1.js";
import { a as ct, c as lt, i as ut, l as dt, n as ft, o as pt, r as mt, s as ht, t as gt } from "./data-BdgATJBp.js";

import { $d, Cf, Gi, Kf, Sf, Vf, __p_KGFS_MAIN_STR, __p_V5bL_array, __p_nino_bufferToString, cf, cp, ep, gf, ip, up, wd, wf } from "./main.js";

var Td = {
  ["sin"]: 0x1,
  ["cos"]: 0x1,
  ["tan"]: 0x1,
  ["frac"]: 0x1,
  ["floor"]: 0x1,
  ["ceil"]: 0x1,
  ["saturate"]: 0x1,
  ["clamp"]: 0x3,
  ["lerp"]: 0x3,
  ["dot4"]: 0x2,
  ["dot3"]: 0x2,
  ["dot2"]: 0x2,
  ["log"]: 0x1,
  ["log2"]: 0x1,
  ["log10"]: 0x1,
  ["exp"]: 0x1,
  ["exp2"]: 0x1,
  ["sqrt"]: 0x1,
  ["rsqrt"]: 0x1,
  ["sign"]: 0x1,
  ["abs"]: 0x1,
  ["pow"]: 0x2,
  ["step"]: 0x2,
  ["smoothstep"]: 0x3,
  ["float4"]: 0x4,
  ["float3"]: 0x3,
  ["float2"]: 0x2,
  ["time"]: 0x0,
  ["min"]: 0x2,
  ["max"]: 0x2,
  ["SrgbLinearToGamma"]: 0x1,
  ["SrgbGammaToLinear"]: 0x1,
  ["random"]: 0x2,
  ["normalize"]: 0x1,
  ["length"]: 0x1,
  ["sqr"]: 0x1,
  ["rotation2d"]: 0x1,
  ["rotate2d"]: 0x2,
  ["sincos"]: 0x1,
  ["TextureSize"]: 0x1,
  ["TextureAverageColor"]: 0x1,
  ["MatrixIdentity"]: 0x0,
  ["MatrixScale"]: 0x1,
  ["MatrixTranslate"]: 0x1,
  ["MatrixMultiply"]: 0x2,
  ["MatrixColorCorrect"]: 0x2,
  ["MatrixColorCorrect2"]: 0x2,
  ["MatrixColorTint"]: 0x2,
  ["normalize_safe"]: 0x1,
  ["radians"]: 0x1,
  ["degrees"]: 0x1,
  ["MatrixColorTint2"]: 0x2,
  ["MatrixColorTint3"]: 0x2,
  ["RemapVal"]: 0x5,
  ["RemapValClamped"]: 0x5
};

var Ed = e => {
  let t = new Uint8Array(e["length"] / 0x2);
  for (let n = 0x0; n < t["length"]; n++) {
    t[n] = parseInt(e["substr"](n * 0x2, 0x2), 0x10)
  }
  return t
};

var Dd = (e, t) => {
  return e["map"](t)
};

var Od = (e, t, n) => {
  let r = Math["max"](e["length"], t["length"]);
  let i = Array(r);
  for (let a = 0x0; a < r; a++) {
    i[a] = n(e["length"] === 0x1 ? e[0x0] : e[a], t["length"] === 0x1 ? t[0x0] : t[a])
  }
  return i
};

var kd = e => {
  return Math["min"](0x1, Math["max"](0x0, e))
};

var Ad = e => {
  return e = kd(e), e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4
};

var jd = e => {
  return e = kd(e), e <= .0031308 ? e * 12.92 : 1.055 * e ** (0x1 / 2.4) - .055
};

var Md = [.2125, .7154, .0721];

var Nd = () => {
  return [0x1, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x1]
};

function Pd(e, t) {
  let n = Array(0x10)["fill"](0x0);
  for (let r = 0x0; r < 0x4; r++) {
    for (let i = 0x0; i < 0x4; i++) {
      let a = 0x0;
      for (let n = 0x0; n < 0x4; n++) {
        a += e[r * 0x4 + n] * t[n * 0x4 + i]
      }
      n[r * 0x4 + i] = a
    }
  }
  return n
}

var Fd = (...e) => {
  return e["reduce"]((e, t) => {
    return Pd(e, t)
  })
};

var Id = (e, t, n) => {
  return [e, 0x0, 0x0, 0x0, 0x0, t, 0x0, 0x0, 0x0, 0x0, n, 0x0, 0x0, 0x0, 0x0, 0x1]
};

var Ld = (e, t, n) => {
  return [0x1, 0x0, 0x0, e, 0x0, 0x1, 0x0, t, 0x0, 0x0, 0x1, n, 0x0, 0x0, 0x0, 0x1]
};

var Rd = e => {
  return [0x0, 0x4, 0x8, 0xc, 0x1, 0x5, 0x9, 0xd, 0x2, 0x6, 0xa, 0xe, 0x3, 0x7, 0xb, 0xf]["map"](t => {
    return e[t]
  })
};

function zd(e, t) {
  let n = e[0x0] * t[0x0] + e[0x1] * t[0x1] + e[0x2] * t[0x2];
  let r = e[0x1] * t[0x2] - e[0x2] * t[0x1];
  let i = e[0x2] * t[0x0] - e[0x0] * t[0x2];
  let a = e[0x0] * t[0x1] - e[0x1] * t[0x0];
  let o = Math["hypot"](r, i, a);
  if (!(o > 0x0)) {
    return Nd()
  }
  let s = [r / o, i / o, a / o];
  let c = 0x1 - n;
  return [n + s[0x0] * s[0x0] * c, s[0x0] * s[0x1] * c - s[0x2] * o, s[0x0] * s[0x2] * c + s[0x1] * o, 0x0, s[0x0] * s[0x1] * c + s[0x2] * o, n + s[0x1] * s[0x1] * c, s[0x1] * s[0x2] * c - s[0x0] * o, 0x0, s[0x0] * s[0x2] * c - s[0x1] * o, s[0x1] * s[0x2] * c + s[0x0] * o, n + s[0x2] * s[0x2] * c, 0x0, 0x0, 0x0, 0x0, 0x1]
}

var Bd = (() => {
  let e = Math["hypot"](Md[0x0], Md[0x1], Md[0x2]);
  return Md["map"](t => {
    return t / e
  })
})();

var Vd = zd(Bd, [0x0, 0x0, 0x1]);

var Hd = Rd(Vd);

var Ud = Id(Bd[0x0], Bd[0x1], Bd[0x2]);

var Wd = Id(0x1 / Bd[0x0], 0x1 / Bd[0x1], 0x1 / Bd[0x2]);

function Gd(e, t) {
  let [n, r, i] = [e[0x0] || 0x0, e[0x1] || 0x0, e[0x2] || 0x0];
  let a = [t[0x0] || 0x0, t[0x1] || 0x0, t[0x2] || 0x0];
  return Fd(Wd, Hd, Id(r, r, 0x1), Vd, Ud, Id(i, i, i), Ld(a[0x0], a[0x1], a[0x2]), Id(n, n, n), Ld(-a[0x0], -a[0x1], -a[0x2]))
}

function Kd(e, t) {
  let n = [e[0x0] || 0x0, e[0x1] || 0x0, e[0x2] || 0x0];
  let r = t[0x0] || 0x0;
  let i = Math["max"](n[0x0], n[0x1], n[0x2]);
  let a = Math["min"](n[0x0], n[0x1], n[0x2]);
  let o = i === 0x0 ? 0x0 : (i - a) / i;
  let s = Pd(Vd, Ud);
  let c = [0x0, 0x1, 0x2]["map"](e => {
    return s[e * 0x4] * n[0x0] + s[e * 0x4 + 0x1] * n[0x1] + s[e * 0x4 + 0x2] * n[0x2] + s[e * 0x4 + 0x3]
  });
  let l = r * o ** 0x2;
  return Fd(Wd, Hd, Ld(c[0x0], c[0x1], l * c[0x2]), Id(0x1 - o, 0x1 - o, 0x1 - l), Ld(-c[0x0], -c[0x1], 0x0), Vd, Ud)
}

function qd(e, {
  ["get"]: t,
  ["nameOf"]: n,
  ["feature"]: r,
  ["avgColor"]: i
}) {
  let a = Ed(e);
  let o = new DataView(a["buffer"]);
  let s = [];
  let c = [];
  let l = 0x0;
  let u = () => {
    return s["pop"]()
  };
  for (let e = 0x0; e < 0x2710; e++) {
    let e = a[l];
    switch (e) {
      case 0x0:
        return s["length"] ? s[s["length"] - 0x1] : [0x0];
      case 0x2:
        l = o["getUint16"](l + 0x1, !0x0);
        break;
      case 0x4: {
        let e = u();
        l = e && e[0x0] ? o["getUint16"](l + 0x1, !0x0) : o["getUint16"](l + 0x3, !0x0);
        break
      }
      case 0x6: {
        let e = wd[o["getUint16"](l + 0x1, !0x0)];
        let t = Td[e];
        if (t == null) {
          throw Error(__p_KGFS_MAIN_STR(0x6d1b, 0x17) + e)
        }
        let n = s["splice"](s["length"] - t, t);
        s["push"](Jd(e, n, i)), l += 0x3;
        break
      }
      case 0x7:
        s["push"]([o["getFloat32"](l + 0x1, !0x0)]), l += 0x5;
        break;
      case 0x8:
        c[a[l + 0x1]] = u(), l += 0x2;
        break;
      case 0x9:
        s["push"](c[a[l + 0x1]]), l += 0x2;
        break;
      case 0xc: {
        let e = u();
        s["push"]([+!e[0x0]]), l += 0x1;
        break
      }
      case 0xd:
      case 0xe:
      case 0xf:
      case 0x10:
      case 0x11:
      case 0x12: {
        let t = u()[0x0];
        let n = u()[0x0];
        let r = e === 0xd ? n === t : e === 0xe ? n !== t : e === 0xf ? n > t : e === 0x10 ? n >= t : e === 0x11 ? n < t : n <= t;
        s["push"]([+!!r]), l += 0x1;
        break
      }
      case 0x13:
      case 0x14:
      case 0x15:
      case 0x16:
      case 0x17: {
        let t = u();
        let n = u();
        let r = e === 0x13 ? (e, t) => {
          return e + t
        } : e === 0x14 ? (e, t) => {
          return e - t
        } : e === 0x15 ? (e, t) => {
          return e * t
        } : e === 0x16 ? (e, t) => {
          return e / t
        } : (e, t) => {
          return e % t
        };
        s["push"](Od(n, t, r)), l += 0x1;
        break
      }
      case 0x18:
        s["push"](Dd(u(), e => {
          return -e
        })), l += 0x1;
        break;
      case 0x1a:
        s["push"]([r ? r(a[l + 0x1]) | 0x0 : 0x0]), l += 0x2;
        break;
      case 0x1d: {
        let e = n(o["getUint32"](l + 0x1, !0x0));
        let r = e == null ? void 0x0 : t(e);
        s["push"](r == null ? [0x0] : Array["isArray"](r) ? r : [r]), l += 0x5;
        break
      }
      case 0x1e: {
        let e = a[l + 0x1];
        let t = u();
        let n = [e & 0x3, e >> 0x2 & 0x3, e >> 0x4 & 0x3, e >> 0x6 & 0x3];
        for (; n["length"] > 0x1 && n[n["length"] - 0x1] === n[n["length"] - 0x2];) {
          n["pop"]()
        }
        s["push"](n["map"](e => {
          return t[Math["min"](e, t["length"] - 0x1)]
        })), l += 0x2;
        break
      }
      default:
        throw Error(__p_KGFS_MAIN_STR(0x6d34, 0x17) + e["toString"](0x10) + " at " + l)
    }
  }
  throw Error(__p_KGFS_MAIN_STR(0x6d4c, 0x22))
}

function Jd(e, t, n) {
  let r = e => {
    return t[e]
  };
  switch (e) {
    case "sin":
      return Dd(r(0x0), Math["sin"]);
    case "cos":
      return Dd(r(0x0), Math["cos"]);
    case "tan":
      return Dd(r(0x0), Math["tan"]);
    case "frac":
      return Dd(r(0x0), e => {
        return e - Math["floor"](e)
      });
    case "floor":
      return Dd(r(0x0), Math["floor"]);
    case "ceil":
      return Dd(r(0x0), Math["ceil"]);
    case "saturate":
      return Dd(r(0x0), e => {
        return Math["min"](0x1, Math["max"](0x0, e))
      });
    case "clamp":
      return Od(Od(r(0x0), r(0x1), Math["max"]), r(0x2), Math["min"]);
    case "lerp":
      return Od(Od(r(0x0), r(0x1), (e, t) => {
        return [e, t]
      }), r(0x2), (e, t) => {
        return e[0x0] + (e[0x1] - e[0x0]) * t
      });
    case "dot4":
    case "dot3":
    case "dot2": {
      let t = +e[0x3];
      let n = 0x0;
      for (let e = 0x0; e < t; e++) {
        n += (r(0x0)[e] || 0x0) * (r(0x1)[e] || 0x0)
      }
      return [n]
    }
    case "log":
      return Dd(r(0x0), Math["log"]);
    case "log2":
      return Dd(r(0x0), Math["log2"]);
    case "log10":
      return Dd(r(0x0), Math["log10"]);
    case "exp":
      return Dd(r(0x0), Math["exp"]);
    case "exp2":
      return Dd(r(0x0), e => {
        return 0x2 ** e
      });
    case "sqrt":
      return Dd(r(0x0), Math["sqrt"]);
    case "rsqrt":
      return Dd(r(0x0), e => {
        return 0x1 / Math["sqrt"](e)
      });
    case "sign":
      return Dd(r(0x0), Math["sign"]);
    case "abs":
      return Dd(r(0x0), Math["abs"]);
    case "pow":
      return Od(r(0x0), r(0x1), Math["pow"]);
    case "step":
      return Od(r(0x0), r(0x1), (e, t) => {
        return +(t >= e)
      });
    case "smoothstep": {
      let e = r(0x0);
      let t = r(0x1);
      return r(0x2)["map"]((n, r) => {
        let i = e["length"] === 0x1 ? e[0x0] : e[r];
        let a = t["length"] === 0x1 ? t[0x0] : t[r];
        let o = Math["min"](0x1, Math["max"](0x0, (n - i) / (a - i)));
        return o * o * (0x3 - 0x2 * o)
      })
    }
    case "float4":
      return [r(0x0)[0x0], r(0x1)[0x0], r(0x2)[0x0], r(0x3)[0x0]];
    case "float3":
      return [r(0x0)[0x0], r(0x1)[0x0], r(0x2)[0x0]];
    case "float2":
      return [r(0x0)[0x0], r(0x1)[0x0]];
    case "time":
      return [0x0];
    case "min":
      return Od(r(0x0), r(0x1), Math["min"]);
    case "max":
      return Od(r(0x0), r(0x1), Math["max"]);
    case "SrgbLinearToGamma":
      return Dd(r(0x0), jd);
    case "SrgbGammaToLinear":
      return r(0x0)["map"]((e, t) => {
        return t < 0x3 ? Ad(e) : e
      });
    case "normalize":
    case "normalize_safe": {
      let e = r(0x0);
      let t = Math["hypot"](...e) || 0x1;
      return e["map"](e => {
        return e / t
      })
    }
    case "length":
      return [Math["hypot"](...r(0x0))];
    case "sqr":
      return Dd(r(0x0), e => {
        return e * e
      });
    case "radians":
      return Dd(r(0x0), e => {
        return e * Math["PI"] / 0xb4
      });
    case "degrees":
      return Dd(r(0x0), e => {
        return e * 0xb4 / Math["PI"]
      });
    case "TextureAverageColor":
      return n && n(r(0x0)) || [.5, .5, .5, 0x1];
    case "MatrixIdentity":
      return Nd();
    case "MatrixMultiply":
      return Pd(r(0x0), r(0x1));
    case "MatrixColorTint2":
      return Kd(r(0x0), r(0x1));
    case "MatrixColorTint":
      return Kd(r(0x0), [0x1]);
    case "MatrixColorCorrect2":
      return Gd(r(0x0), r(0x1));
    case "MatrixColorCorrect":
      return Gd(r(0x0), [.5, .5, .5]);
    case "MatrixAxisToAxis":
      return zd(r(0x0), r(0x1));
    default:
      throw Error(__p_KGFS_MAIN_STR(0x6d75, 0xb) + e + __p_KGFS_MAIN_STR(0x6d85, 0x18))
  }
}

var Xf = null;

var Zf = null;

function Qf() {
  return Zf ||= fetch($d + __p_KGFS_MAIN_STR(0xa9f3, 0x12))["then"](e => {
    return e["json"]()
  })["then"](e => {
    return Xf = e
  }), Zf
}

var tp = ["F_BACKWARDS_COMPATIBILITY", "F_ANISOTROPIC_GLOSS", "F_CLOTH_SHADING", "F_PATTERN", "F_PATTERN_PAINT", "F_PUFFY_PAINT", "F_TINT_ID", "F_OUTPUT_MODE"];

var dp = new Map;

function fp(e) {
  function __p_y2lM_STR_51_decode(str) {
    var table = "NOvL.}GS9s\"U1eV$IMh+*~uapTj>]!wC/_8A)zx|=#^:KF4<mJf5WdQq(nXgPBr@2R?o6H,iZ7;[tDk3y%0bE{Yl`c&";
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

  function __p_y2lM_STR_51(start, length) {
    return __p_y2lM_STR_51_decode(__p_V5bL_array["slice"](start, start + length))
  }
  let t = dp["get"](e);
  if (t) {
    return t
  }
  let n = Xf && Xf["tex"] && Xf["tex"][e] || {};
  let r = async e => {
    let t = await fetch(e);
    if (!t["ok"]) {
      throw Error(__p_KGFS_MAIN_STR(0xb67f, 0x1d) + e)
    }
    return createImageBitmap(await t["blob"](), {
      ["premultiplyAlpha"]: "none",
      ["colorSpaceConversion"]: "none"
    })
  };
  return t = Promise["all"]([r($d + __p_y2lM_STR_51(0xb6a0, 0xd) + e + ".webp"), n["a"] ? r($d + __p_y2lM_STR_51(0xb6a0, 0xd) + e + __p_y2lM_STR_51(0xb6b2, 0x9)) : null])["then"](([e, t]) => {
    return {
      ["color"]: e,
      ["alpha"]: t,
      ["w"]: e["width"],
      ["h"]: e["height"],
      ["ac"]: n["ac"] == null ? 0x1 : n["ac"]
    }
  }), dp["set"](e, t), t["catch"](() => {
    return dp["delete"](e)
  }), t
}

var pp = null;

function mp(e, t, n, r, i) {
  pp ||= document["createElement"]("canvas"), pp["width"] = t, pp["height"] = n;
  let a = pp["getContext"]("2d", {
    ["willReadFrequently"]: !0x0
  });
  a["imageSmoothingEnabled"] = t !== e["w"] || n !== e["h"], a["imageSmoothingQuality"] = "high", a["clearRect"](0x0, 0x0, t, n), a["drawImage"](e["color"], 0x0, 0x0, t, n);
  let o = a["getImageData"](0x0, 0x0, t, n)["data"];
  r["set"](o, i);
  let s = t * n;
  if (e["alpha"]) {
    a["clearRect"](0x0, 0x0, t, n), a["drawImage"](e["alpha"], 0x0, 0x0, t, n);
    let o = a["getImageData"](0x0, 0x0, t, n)["data"];
    for (let e = 0x0; e < s; e++) {
      r[i + e * 0x4 + 0x3] = o[e * 0x4]
    }
  } else {
    let t = Math["round"](e["ac"] * 0xff);
    for (let e = 0x0; e < s; e++) {
      r[i + e * 0x4 + 0x3] = t
    }
  }
}

function hp(e, t, n, r, i) {
  let a = r ? new Ae(e, t, n, r) : new C(e, t, n);
  return a["format"] = $e, a["type"] = st, a["colorSpace"] = i["srgb"] ? N : "", a["wrapS"] = a["wrapT"] = i["address"] === 0x2 ? D : i["address"] === 0x1 ? Fe : rt, i["filter"] === 0x0 ? (a["minFilter"] = a["magFilter"] = Ze, a["generateMipmaps"] = !0x1) : (a["minFilter"] = ue, a["magFilter"] = y, a["generateMipmaps"] = !0x0, a["anisotropy"] = i["filter"] === 0x55 ? 0x8 : 0x1), a["unpackAlignment"] = 0x1, a["flipY"] = !0x1, a["needsUpdate"] = !0x0, a
}

var gp = () => {
  return new Promise(e => {
    return setTimeout(e, 0x0)
  })
};

async function _p(e, t) {
  if (await gp(), t["layers"]) {
    let n = await Promise["all"](t["layers"]["map"](t => {
      return t && e["tex"][t] ? fp(e["tex"][t]) : null
    }));
    let r = 0x4;
    let i = 0x4;
    for (let e of n) {
      e && (r = Math["max"](r, e["w"]), i = Math["max"](i, e["h"]))
    }
    r = Math["min"](r, 0x400), i = Math["min"](i, 0x400);
    let a = new Uint8Array(r * i * 0x4 * 0x4)["fill"](0xff);
    return n["forEach"]((e, t) => {
      e && mp(e, r, i, a, t * r * i * 0x4)
    }), hp(a, r, i, 0x4, t)
  }
  let n = e["tex"][t["param"]];
  if (!n) {
    return null
  }
  let r = await fp(n);
  let i = new Uint8Array(r["w"] * r["h"] * 0x4);
  return mp(r, r["w"], r["h"], i, 0x0), hp(i, r["w"], r["h"], 0x0, t)
}

function vp(e, t) {
  let n = typeof t == "number" ? [t] : Array["isArray"](t) ? t : [0x0];
  let r = e => {
    return typeof n[e] == "number" && isFinite(n[e]) ? n[e] : 0x0
  };
  switch (e) {
    case "float":
      return r(0x0);
    case "int":
      return r(0x0) | 0x0;
    case "vec2":
      return new oe(r(0x0), r(0x1));
    case "vec3":
      return new g(r(0x0), r(0x1), r(0x2));
    case "vec4":
      return new ie(r(0x0), r(0x1), r(0x2), r(0x3));
    case "ivec4":
      return [r(0x0) | 0x0, r(0x1) | 0x0, r(0x2) | 0x0, r(0x3) | 0x0];
    case "mat4": {
      let e = new ze;
      return n["length"] >= 0x10 && e["fromArray"](n["slice"](0x0, 0x10)["map"]((e, t) => {
        return r(t)
      })), e
    }
  }
  return r(0x0)
}

function yp(e, t) {
  let n = Object["assign"]({}, e["p"]);
  n["g_fWearProgress"] = t["wear"] == null ? 0x0 : +t["wear"];
  for (let r of e["rolls"] || []) {
    let e = new Gi(t["seed"] | 0x0);
    for (let [t, i, a, o] of r["vars"]) {
      let r = [];
      for (let t = 0x0; t < i; t++) {
        r["push"](e["randomFloat"](a[t], o[t]))
      }
      n[t] = i === 0x1 ? r[0x0] : r
    }
  }
  for (let [t, r] of Object["entries"](e["tex"] || {})) {
    n[t] = {
      ["tex"]: r
    }
  }
  return n
}

var bp = new Map;

async function xp(e, t, n, r, i) {
  let a = r["seed"] | 0x0;
  let o = r["wear"] == null ? 0x0 : +r["wear"];
  let s = typeof window < "u" && window["__paintDbg"] ? JSON["stringify"](window["__paintDbg"]) : "";
  let c = "g|" + n["kit"] + "|" + a + "|" + o["toFixed"](0x3) + "|" + i + "|" + s;
  let l = bp["get"](c);
  if (l && !Kf(e, l["map"]) && (bp["delete"](c), l = null), l) {
    return l["t"] = performance["now"](), l
  }
  let u = await ep();
  let d = u["GLOVE_VARIANTS"][n["v"]];
  if (!d) {
    function __p_tVKf_STR_52_decode(str) {
      var table = "&vgbG4R[tMUwkryDd{BWEeiP@*<,YO!oH2:}>V#m$Q6.(CzT1=ph9Fx|^/_7~uq\"Kf8nlA50+jcXs3aL)Z;]%I`J?SN";
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

    function __p_tVKf_STR_52(start, length) {
      return __p_tVKf_STR_52_decode(__p_V5bL_array["slice"](start, start + length))
    }
    throw Error(__p_tVKf_STR_52(0xb6c1, 0x23) + n["v"])
  }
  let f = performance["now"]();
  await Promise["all"](d["samplers"]["flatMap"](e => {
    return (e["layers"] || [e["param"]])["map"](e => {
      return e && n["tex"][e] ? fp(n["tex"][e])["catch"](() => {
        return null
      }) : null
    })
  }));
  let p = performance["now"]();
  let m = [];
  for (let e of d["samplers"]) {
    m["push"](await _p(n, e)["catch"](e => {
      return console["warn"](__p_KGFS_MAIN_STR(0xa99a, 0x9), e["message"]), null
    }))
  }
  let h = performance["now"]();
  let g = bp["get"](c);
  if (g) {
    return m["forEach"](e => {
      return e && e["dispose"]()
    }), g
  }
  let _ = cp(u, n["v"]);
  let v = yp(n, r);
  let y = typeof window < "u" && window["__paintDbg"] || {};
  let b = e => {
    let t = e in v ? v[e] : u["GLOVE_DEFAULTS"][e];
    return t == null ? void 0x0 : typeof t == "number" ? [t] : t
  };
  let x = 0x0;
  let S = {
    ["get"]: b,
    ["nameOf"]: e => {
      return u["GLOVE_HASH"][(e >>> 0x0)["toString"](0x10)["padStart"](0x8, "0")]
    },
    ["feature"]: e => {
      return e === 0x7 ? x : +v[tp[e]] || 0x0
    },
    ["avgColor"]: e => {
      let n = e && e[0x0] && e[0x0]["tex"];
      let r = n && t["tex"][n];
      return r && r["refl"] ? r["refl"] : null
    }
  };
  let C = (e, t) => {
    let n = t[e];
    if (n) {
      try {
        return qd(n, S)
      } catch (t) {
        function __p_1VqE_STR_53_decode(str) {
          var table = "uIv[$FByY=w~Q*d3L)`l<Spc+&nga]{/4\"N_76XP2R(JsG|D%#mb,Ch^krKW5198ZeO}z;i@>TEjAt?V:H!.xUfoM0q";
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

        function __p_1VqE_STR_53(start, length) {
          return __p_1VqE_STR_53_decode(__p_V5bL_array["slice"](start, start + length))
        }
        console["warn"](__p_1VqE_STR_53(0xb6eb, 0x17), e, t["message"])
      }
    }
    return b(e)
  };
  for (let e of d["uniforms"]) {
    _["u"][e["name"]]["value"] = vp(e["glsl"], C(e["name"], u["GLOVE_EXPR"]))
  }
  if (n["v"] !== "old") {
    for (let [e, t] of ip) {
      _["u"][e]["value"] = vp(t, C(e, u["GLOVE_VS_EXPR"]))
    }
  }
  if (d["samplers"]["forEach"]((e, t) => {
      _["u"][e["uniform"]]["value"] = m[t] || cf
    }), y["gloveOverrides"]) {
    for (let [e, t] of Object["entries"](y["gloveOverrides"])) {
      _["u"][e] && (_["u"][e]["value"] = t)
    }
  }
  let w = [0x0, 0x1, 0x2, 0x3]["map"](t => {
    x = t, _["u"]["g_nOutputMode"] && (_["u"]["g_nOutputMode"]["value"] = t);
    let n = new ce(i, i, {
      ["depthBuffer"]: !0x1,
      ["stencilBuffer"]: !0x1,
      ["type"]: re,
      ["generateMipmaps"]: !0x1,
      ["minFilter"]: Ze,
      ["magFilter"]: Ze
    });
    return gf(e, _["scene"], _["cam"], n), n
  });
  m["forEach"](e => {
    return e && e["dispose"]()
  });
  let T = up();
  T["u"]["tColor"]["value"] = w[0x0]["texture"], T["u"]["tNrm"]["value"] = w[0x1]["texture"], T["u"]["tMetal"]["value"] = w[0x2]["texture"], T["u"]["tAO"]["value"] = w[0x3]["texture"], T["u"]["uFlipY"]["value"] = y["gloveFlipY"] == null ? -0x1 : y["gloveFlipY"];
  let E = Cf(e);
  let D = wf(i, Sf(e));
  let O = wf(i, !0x1);
  let k = wf(i, !0x1);
  let A = y["gloveSheen"] ? wf(Math["max"](0x40, i >> 0x1), !0x1) : null;
  [D, O, k, A]["forEach"]((t, n) => {
    t && (t["texture"]["anisotropy"] = E, t["texture"]["userData"]["paintBake"] = !0x0, T["u"]["uOut"]["value"] = n, gf(e, T["scene"], T["cam"], t))
  });
  let j = {
    ["map"]: D["texture"],
    ["normal"]: O["texture"],
    ["orm"]: k["texture"],
    ["cloth"]: A && A["texture"],
    ["sheen"]: +(n["p"]["g_flSheenScale"] == null ? .667 : n["p"]["g_flSheenScale"]),
    ["_rts"]: [D, O, k]["concat"](A ? [A] : []),
    ["t"]: performance["now"](),
    ["key"]: c
  };
  return y["keepGloveRaw"] ? j["raws"] = w : w["forEach"](e => {
    return e["dispose"]()
  }), j["timing"] = {
    ["fetch"]: Math["round"](p - f),
    ["convert"]: Math["round"](h - p),
    ["passes"]: Math["round"](performance["now"]() - h)
  }, typeof window < "u" && (window["__gloveBake"] = Object["assign"]({
    ["kit"]: n["kit"],
    ["variant"]: n["v"],
    ["uniforms"]: _["u"]
  }, j)), bp["set"](c, j), Vf(bp, 0x18, j), j
}

async function wp(e, t, n, r = {}, i = {}) {
  let a = await Qf();
  let o = a["kits"][n];
  if (!o) {
    return !0x1
  }
  o["kit"] = n;
  let s = {};
  t["userData"]["_gpaintToken"] = s;
  let c = await xp(e, a, o, r, i["size"] || 0x400);
  if (t["userData"]["_gpaintToken"] !== s) {
    return !0x1
  }
  let l = 0x0;
  return t["traverse"](e => {
    (e["isMesh"] || e["isSkinnedMesh"]) && (Array["isArray"](e["material"]) ? e["material"] : [e["material"]])["forEach"]((t, r) => {
      function __p_Qf25_STR_54_decode(str) {
        var table = "e2|Fs_KQJCW@>Pj`pc7iTbwu}*<aN]?/hrkgvXo1x;0~ySU9%&:Zl^Btn[5\"+L#!3zV4$A(OGd6,{8EmI=MHY)D.fqR";
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

      function __p_Qf25_STR_54(start, length) {
        return __p_Qf25_STR_54_decode(__p_V5bL_array["slice"](start, start + length))
      }
      if (!t || !new RegExp(__p_Qf25_STR_54(0xb709, 0x9), "i")["test"](t["name"] || "")) {
        return
      }
      let a;
      c["cloth"] ? (a = new qe, ve["prototype"]["copy"]["call"](a, t), a["defines"] = {
        ["STANDARD"]: "",
        ["PHYSICAL"]: ""
      }, a["sheen"] = c["sheen"], a["sheenColor"]["setRGB"](0x1, 0x1, 0x1), a["sheenColorMap"] = c["cloth"], a["sheenRoughness"] = .55) : a = t["clone"](), a["map"] = c["map"], a["normalMap"] = c["normal"], a["normalScale"] && a["normalScale"]["set"](0x1, 0x1), a["roughnessMap"] = c["orm"], a["metalnessMap"] = c["orm"], a["roughness"] = 0x1, a["metalness"] = 0x1, a["aoMap"] = c["orm"], a["aoMapIntensity"] = 0x1, a["color"] && a["color"]["setRGB"](0x1, 0x1, 0x1), i["envMapIntensity"] != null && (a["envMapIntensity"] = i["envMapIntensity"]), i["envMap"] && (a["envMap"] = i["envMap"]), a["userData"]["painted"] = n, a["needsUpdate"] = !0x0, Array["isArray"](e["material"]) ? e["material"][r] = a : e["material"] = a, l++
    })
  }), l > 0x0
}

export { wp };


