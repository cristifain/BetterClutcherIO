// Audio engine
import { c as lt, l as dt } from "./data-BdgATJBp.js";
import { $ as e, A as t, At as n, B as r } from "./three-B50Y55N1.js";
import { __p_KGFS_MAIN_STR, __p_V5bL_array, __p_nino_bufferToString } from "./decode.js";

var Nr = __p_KGFS_MAIN_STR(0x2ef3, 0x19);;
var Pr = 0x21;;
var Fr = __p_KGFS_MAIN_STR(0x2f10, 0x2c5)["split"](".");;
var Ir = {
  ["shot_rifle"]: "shot_m4a4",
  ["shot_ak"]: "shot_ak47",
  ["shot_pistol"]: "shot_glock",
  ["shot_usp"]: "shot_usps",
  ["shot_heavy"]: "shot_deagle",
  ["shot_smg"]: "shot_mp9",
  ["shot_sniper"]: "shot_awp",
  ["shot_shotgun"]: "shot_nova",
  ["shot_mg"]: "shot_m249",
  ["shot_silenced"]: "shot_m4a1s",
  ["zeus"]: "shot_zeus",
  ["kill"]: "kill_confirm",
  ["hit_head_flesh"]: "hit_head",
  ["hurt_player"]: "hurt",
  ["step1"]: "step",
  ["step2"]: "step",
  ["step3"]: "step",
  ["step4"]: "step",
  ["step5"]: "step",
  ["step6"]: "step"
};;
function Lr(e, t) {
  if (t <= e[0x0][0x0]) {
    return e[0x0][0x1]
  }
  for (let n = 0x1; n < e["length"]; n++) {
    if (t <= e[n][0x0]) {
      let r = e[n - 0x1];
      let i = e[n];
      return i[0x0] === r[0x0] ? i[0x1] : r[0x1] + (i[0x1] - r[0x1]) * (t - r[0x0]) / (i[0x0] - r[0x0])
    }
  }
  return e[e["length"] - 0x1][0x1]
};
function Rr() {
  try {
    this["disconnect"]()
  } catch {}
  let e = this["_v"];
  let t = this["_au"];
  if (this["_v"] = this["_au"] = null, t && t["_live"] && t["_live"]["delete"](this), e && t) {
    let t = e["pool"];
    t && t["length"] < 0x30 && t["push"](e)
  }
  let n = this["_onEnd"];
  if (this["_onEnd"] = null, n) {
    try {
      n()
    } catch {}
  }
};
function zr(e) {
  let t = e["getChannelData"](0x0);
  let n = Math["min"](t["length"], e["sampleRate"]);
  for (let r = 0x0; r < n; r++) {
    if (Math["abs"](t[r]) > .002) {
      return Math["max"](0x0, r / e["sampleRate"] - .002)
    }
  }
  return 0x0
};
var Br = class {
  constructor() {
    this["ctx"] = null, this["bank"] = new Map, this["master"] = null, this["ready"] = !0x1, this["volume"] = 0x1, this["_live"] = new Set
  }
  async ["init"]() {
    return this["_initP"] ? this["_initP"] : this["_initP"] = this["_init"]()
  }
  async ["_init"]() {
    function __p_tYDk_STR_6_decode(str) {
      var table = "T&2P:~)gzc#7men3bZ0E\"p^rNj%5iF6v=O_x`9BVt|AWo/dQ?Uh.SDR}1YM(faC<$wu>4;lK@X[!JkyL*{,q8IG]+Hs";
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

    function __p_tYDk_STR_6(start, length) {
      return __p_tYDk_STR_6_decode(__p_V5bL_array["slice"](start, start + length))
    }
    if (this["ctx"]) {
      return
    }
    this["ctx"] = new(window["AudioContext"] || window["webkitAudioContext"]), this["master"] = this["ctx"]["createGain"](), this["master"]["gain"]["value"] = this["volume"], this["compressor"] = this["ctx"]["createDynamicsCompressor"](), this["compressor"]["threshold"]["value"] = -0xe, this["compressor"]["ratio"]["value"] = 0x6, this["master"]["connect"](this["compressor"])["connect"](this["ctx"]["destination"]), this["bus"] = {
      0x0: this["ctx"]["createGain"](),
      .5: this["ctx"]["createGain"]()
    }, this["bus"][0x0]["connect"](this["master"]), this["bus"][.5]["connect"](this["master"]), this["ready"] = !0x0, this["_manifestP"] = fetch(Nr)["then"](e => {
      return e["ok"] ? e["json"]() : {}
    })["catch"](() => {
      return {}
    })["then"](e => {
      return this["manifest"] = e
    }), await this["_manifestP"];
    let e = Object["keys"](this["manifest"]);
    let t = Fr["filter"](e => {
      return this["manifest"][e]
    });
    await this["_loadIds"](t);
    let n = new RegExp(__p_tYDk_STR_6(0x31d8, 0xe2), "");
    let r = e["filter"](e => {
      return !t["includes"](e) && !n["test"](e)
    });
    let i = e["filter"](e => {
      return !t["includes"](e) && n["test"](e)
    });
    this["_loadIds"](r)["then"](() => {
      return this["_loadIds"](i, 0x2)
    })["then"](() => {
      this["allLoaded"] = !0x0
    })
  }
  async ["_loadIds"](e, t = 0x8) {
    let n = 0x0;
    await Promise["all"](Array["from"]({
      ["length"]: Math["min"](t, e["length"])
    }, async () => {
      for (; n < e["length"];) {
        for (; this["_hold"];) {
          await this["_hold"]
        }
        await this["_loadId"](e[n++])
      }
    }))
  } ["hold"]() {
    this["_hold"] ||= new Promise(e => {
      return this["_holdRelease"] = e
    }), this["_holdN"] = (this["_holdN"] | 0x0) + 0x1;
    let e = !0x1;
    return () => {
      if (e || (e = !0x0, --this["_holdN"] > 0x0)) {
        return
      }
      let t = this["_holdRelease"];
      this["_hold"] = null, this["_holdRelease"] = null, t && t()
    }
  }
  async ["ensure"](e) {
    this["init"](), await this["_manifestP"], await Promise["all"](e["filter"](e => {
      return this["manifest"][e] && !this["bank"]["has"](e)
    })["map"](e => {
      return this["_loadId"](e)
    }))
  }
  async ["_loadId"](e) {
    let t = this["manifest"][e];
    if (!t || this["bank"]["has"](e)) {
      return
    }
    let n = [];
    let r = [];
    for (let e of t) {
      try {
        let t = await fetch(__p_KGFS_MAIN_STR(0x32bf, 0x9) + e);
        if (!t["ok"]) {
          continue
        }
        let i = await this["ctx"]["decodeAudioData"](await t["arrayBuffer"]());
        n["push"](i), r["push"](zr(i))
      } catch {}
    }
    n["length"] && this["bank"]["set"](e, {
      ["bufs"]: n,
      ["offs"]: r
    })
  } ["prefetch"](e) {
    if (!this["ctx"] || !this["manifest"]) {
      return
    }
    for (let t of ["shot_", "far_", "clipout_", "clipin_", "bolt_", "draw_", "toss_"]) {
      let n = t + e;
      this["manifest"][n] && !this["bank"]["has"](n) && this["_loadId"](n)
    }
    let t = lt[e];
    if (t) {
      for (let e in t) {
        for (let n of t[e]) {
          let e = dt[n["id"]];
          let t = e && e["kid"] ? Array["isArray"](e["kid"]) ? e["kid"] : [e["kid"]] : [];
          for (let e of [n["id"], ...t]) {
            this["manifest"][e] && !this["bank"]["has"](e) && this["_loadId"](e)
          }
        }
      }
    }
  } ["setVolume"](e) {
    this["volume"] = e, this["master"] && (this["master"]["gain"]["value"] = e)
  } ["resume"]() {
    this["ctx"] && this["ctx"]["state"] === "suspended" && this["ctx"]["resume"]()
  } ["stopAll"](e = null) {
    if (this["bus"]) {
      for (let e in this["bus"]) {
        let t = this["bus"][e]["gain"];
        t["cancelScheduledValues"](0x0), t["value"] = 0x1
      }
    }
    for (let t of [...this["_live"]]) {
      if (!(e && e(t["_id"]))) {
        t["_onEnd"] = null, this["_live"]["delete"](t);
        try {
          t["stop"]()
        } catch {}
      }
    }
  } ["setListener"](e, t, n, r, i, a) {
    if (!this["ctx"]) {
      return
    }
    this["_lx"] = e, this["_ly"] = t, this["_lz"] = n;
    let o = this["ctx"]["listener"];
    o["positionX"] ? (o["positionX"]["value"] = e, o["positionY"]["value"] = t, o["positionZ"]["value"] = n, o["forwardX"]["value"] = r, o["forwardY"]["value"] = i, o["forwardZ"]["value"] = a, this["_upSet"] || (this["_upSet"] = !0x0, o["upX"]["value"] = 0x0, o["upY"]["value"] = 0x1, o["upZ"]["value"] = 0x0)) : (o["setPosition"](e, t, n), o["setOrientation"](r, i, a, 0x0, 0x1, 0x0))
  } ["playWeapon"](e, t, n) {
    let r = e + "_" + t;
    return this["bank"]["has"](r) ? this["play"](r, n) : this["play"]({
      ["clipout"]: "clip_out",
      ["clipin"]: "clip_in",
      ["bolt"]: "bolt",
      ["draw"]: "draw"
    } [e] || e, n)
  } ["eventGain"](e) {
    let t = dt[this["bank"]["has"](e) ? e : Ir[e] || e];
    return t ? t["g"] : 0x1
  } ["gainAt"](e, t) {
    let n = dt[this["bank"]["has"](e) ? e : Ir[e] || e];
    return n ? n["g"] * (n["c"] ? Lr(n["c"], t) : 0x1) : 0x1
  } ["timeAt"](e) {
    let t = this["ctx"];
    if (!t) {
      return 0x0
    }
    let n = t["getOutputTimestamp"] ? t["getOutputTimestamp"]() : null;
    return n && n["performanceTime"] > 0x0 && n["contextTime"] > 0x0 ? n["contextTime"] + (e - n["performanceTime"]) / 0x3e8 : t["currentTime"] + (e - performance["now"]()) / 0x3e8 - (t["outputLatency"] || t["baseLatency"] || 0x0)
  } ["_acquireVoice"](e, t) {
    let n = (e ? "s" : "f") + (t ?? "");
    let r = this["_pools"] ||= {};
    let i = r[n] || (r[n] = []);
    let a = i["pop"]();
    if (!a) {
      let n = t == null || !this["bus"] || !this["bus"][t] ? this["master"] : this["bus"][t];
      let r = this["ctx"]["createGain"]();
      if (e) {
        let e = this["ctx"]["createPanner"]();
        e["panningModel"] = "equalpower", e["distanceModel"] = "inverse", e["maxDistance"] = 0xc8;
        let t = this["ctx"]["createBiquadFilter"]();
        t["type"] = "lowpass", e["connect"](t)["connect"](r)["connect"](n), a = {
          ["panner"]: e,
          ["lp"]: t,
          ["gain"]: r,
          ["spatial"]: !0x0,
          ["pool"]: i
        }
      } else {
        r["connect"](n), a = {
          ["gain"]: r,
          ["spatial"]: !0x1,
          ["pool"]: i
        }
      }
    }
    return a
  } ["shockwave"]() {
    if (!this["ctx"] || !this["bus"]) {
      return
    }
    let e = this["ctx"]["currentTime"];
    let t = 3.009901;
    let n = e => {
      if (e <= .387413) {
        return 0x1
      }
      let t = 2.622488;
      let n = Math["min"](0x1, (e - .387413) / t);
      let r = n * n;
      let i = r * n;
      return Math["max"](0x0, 0x2 * i - 0x3 * r + 0x1 + (i - 0x2 * r + n) * -.381317 * t + (i - r) * -.104825 * t)
    };
    for (let r of [0x0, .5]) {
      let i = this["bus"][r]["gain"];
      let a = new Float32Array(0x60);
      for (let e = 0x0; e < 0x60; e++) {
        a[e] = 0x1 - n(e / 0x5f * t) * (0x1 - r)
      }
      a[0x5f] = 0x1, i["cancelScheduledValues"](e);
      try {
        i["setValueCurveAtTime"](a, e, t)
      } catch {
        i["value"] = 0x1
      }
    }
  } ["play"](e, t = {}) {
    if (!this["ready"]) {
      return null
    }
    let {
      ["vol"]: n = 0x1, ["pos"]: r = null, ["loop"]: i = !0x1
    } = t;
    let a = this["bank"]["has"](e) ? e : Ir[e] || e;
    let o = dt[a];
    let s = t["gain"] == null ? o ? o["g"] : 0x1 : t["gain"];
    if (s <= 0x0) {
      return null
    }
    let c = t["dist"] || 0x0;
    r && (c = Math["hypot"](r["x"] - (this["_lx"] || 0x0), r["y"] - (this["_ly"] || 0x0), r["z"] - (this["_lz"] || 0x0)));
    let l = t["curve"] === !0x1 ? null : t["curve"] || o && o["c"] || null;
    let u = 0x1;
    if (l && (u = Lr(l, c), u <= .002)) {
      return null
    }
    if (o && o["kid"] && !t["_kid"]) {
      for (let e of Array["isArray"](o["kid"]) ? o["kid"] : [o["kid"]]) {
        this["play"](e, {
          ["pos"]: r,
          ["dist"]: t["dist"],
          ["vol"]: n,
          ["_kid"]: !0x0
        })
      }
    }
    let d = (t["rate"] == null ? 0x1 : t["rate"]) * (t["randPitch"] ? .94 + Math["random"]() * .12 : 0x1);
    o && (o["p"] && (d *= o["p"]), o["r"] && (d *= 0x1 + o["r"][0x0] + Math["random"]() * (o["r"][0x1] - o["r"][0x0])));
    let f = s * n * (o && o["vr"] ? 0x1 + o["vr"][0x0] + Math["random"]() * (o["vr"][0x1] - o["vr"][0x0]) : 0x1);
    let p = !0x1;
    if (c > Pr && !l) {
      let e = a["startsWith"]("shot_") ? "far_" + a["slice"](0x5) : a + "_far";
      this["bank"]["has"](e) && (a = e, p = !0x0)
    }
    let m = this["bank"]["get"](a);
    if (!m) {
      return null
    }
    let h = m["bufs"]["length"] > 0x1 ? Math["random"]() * m["bufs"]["length"] | 0x0 : 0x0;
    let g = m["bufs"][h];
    let _ = m["offs"][h];
    let v = this["ctx"]["createBufferSource"]();
    if (v["buffer"] = g, v["loop"] = i, i && _ > 0x0 && (v["loopStart"] = _, v["loopEnd"] = g["duration"]), v["playbackRate"]["value"] = d, !i) {
      let e = this["_acquireVoice"](!!r, o ? o["sw"] : void 0x0);
      return e["gain"]["gain"]["value"] = f * u, r ? (e["panner"]["refDistance"] = l ? 0x1 : t["ref"] || 0x7, e["panner"]["rolloffFactor"] = l ? 0x0 : t["rolloff"] || 1.1, e["panner"]["positionX"]["value"] = r["x"], e["panner"]["positionY"]["value"] = r["y"], e["panner"]["positionZ"]["value"] = r["z"], e["lp"]["frequency"]["value"] = !p && c > 0xa ? Math["max"](0x514, 0x4650 * .45 ** ((c - 0xa) / 0xf)) : 0x5dc0, e["lp"]["Q"]["value"] = .5, v["connect"](e["panner"])) : v["connect"](e["gain"]), v["_v"] = e, v["_au"] = this, v["_id"] = a, this["_live"]["add"](v), t["onEnd"] && (v["_onEnd"] = t["onEnd"]), v["onended"] = Rr, v["start"](t["at"] == null ? t["_kid"] && o && o["dl"] ? this["ctx"]["currentTime"] + o["dl"] : 0x0 : Math["max"](0x0, t["at"]), _), t["at"] == null ? null : v
    }
    let y = this["ctx"]["createGain"]();
    y["gain"]["value"] = f * u;
    let b = null;
    r ? (b = this["ctx"]["createPanner"](), b["panningModel"] = "equalpower", b["distanceModel"] = "inverse", b["refDistance"] = l ? 0x1 : t["ref"] || 0x7, b["maxDistance"] = 0xc8, b["rolloffFactor"] = l ? 0x0 : t["rolloff"] || 1.1, b["positionX"]["value"] = r["x"], b["positionY"]["value"] = r["y"], b["positionZ"]["value"] = r["z"], v["connect"](b)["connect"](y)["connect"](o && o["sw"] != null && this["bus"] ? this["bus"][o["sw"]] : this["master"])) : v["connect"](y)["connect"](o && o["sw"] != null && this["bus"] ? this["bus"][o["sw"]] : this["master"]), v["start"](0x0, _), v["_id"] = a, this["_live"]["add"](v);
    let x = 0x1;
    let S = () => {
      y["gain"]["value"] = f * u * x
    };
    return {
      ["stop"]: () => {
        this["_live"]["delete"](v);
        try {
          v["stop"]()
        } catch {}
      },
      ["setPos"]: (e, t, n) => {
        b && (b["positionX"]["value"] = e, b["positionY"]["value"] = t, b["positionZ"]["value"] = n), r && l && (u = Lr(l, Math["hypot"](e - (this["_lx"] || 0x0), t - (this["_ly"] || 0x0), n - (this["_lz"] || 0x0))), S())
      },
      ["setScale"]: e => {
        x = e, S()
      },
      ["gain"]: y
    }
  }
};;
var Di = {
  ["ladder"]: "step_ladder",
  ["wood_ladder"]: "step_ladder_wood"
};;
var ki = {
  ["sand"]: "step_sand",
  ["gravel"]: "step_gravel",
  ["dirt"]: "step_dirt",
  ["tile"]: "step_tile",
  ["grass"]: "step_grass",
  ["carpet"]: "step_carpet",
  ["glass"]: "step_glass",
  ["chainlink"]: "step_chainlink",
  ["metalvent"]: "step_metalvent",
  ["metalrailing"]: "step_metalrail",
  ["metal"]: "step_metal",
  ["solidmetal"]: "step_metal",
  ["metalpanel"]: "step_metal",
  ["metalvehicle"]: "step_metal",
  ["metal_sand_barrel"]: "step_metal",
  ["wood"]: "step_wood",
  ["wood_panel"]: "step_wood",
  ["wood_dense"]: "step_wood",
  ["wood_plank"]: "step_wood",
  ["wood_crate"]: "step_wood",
  ["wood_basket"]: "step_wood",
  ["wood_solid"]: "step_wood"
};;
function Ai(e, t, n, r) {
  let i = e["raycast"](t, n + .25, r, 0x0, -0x1, 0x0, .6);
  return i && ki[i["mat"]] || "step"
};

export { Nr, Pr, Fr, Ir, Lr, Rr, zr, Br, Di, ki, Ai };
