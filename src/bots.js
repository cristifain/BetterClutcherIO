// Bot system (NPC bots + AI), split verbatim from main.js (no logic changes).
// Contains: the agent-attach queue (hh/gh/_h/vh), culling scratch vectors,
// the bot entity class $h, its AI helpers, and the bot manager Og.
// Everything engine-side is imported from main.js (circular import is safe:
// all main.js bindings here are referenced only at runtime, never at module evaluation).
import { B as r, Ht as g, Ot as O, it as ke, mt as Le, nt as ze, rt as I } from "./three-B50Y55N1.js";
import {
  Ah,
  Ai,
  Bh,
  Ca,
  Da,
  Dh,
  Ea,
  Eh,
  Fh,
  Fo,
  Gh,
  Hh,
  Ih,
  Jh,
  Lh,
  Mh,
  Mt,
  Nh,
  Nm,
  Oh,
  Ph,
  Qh,
  Rh,
  Rn,
  Rt,
  Sa,
  Ta,
  Th,
  Tm,
  Ua,
  Uh,
  V,
  Vh,
  Wh,
  Ym,
  __p_KGFS_MAIN_STR,
  __p_V5bL_array,
  __p_nino_bufferToString,
  ah,
  ca,
  ch,
  da,
  dh,
  fa,
  fh,
  fo,
  ih,
  jh,
  jt,
  ka,
  kh,
  lh,
  mh,
  nh,
  oa,
  oh,
  ph,
  po,
  qh,
  rh,
  sa,
  sh,
  ua,
  uh,
  wm,
  z,
  zh
} from "./main.js";

var hh = [];

function gh(e, t) {
  let {
    ["bot"]: n, ["team"]: r
  } = t;
  let i = wm(r);
  return !i && e["reclaimAgentCorpse"] && e["reclaimAgentCorpse"](r) && (i = wm(r)), i ? (n["cs2Agent"] = i, i["root"]["visible"] = !0x1, e["scene"]["add"](i["root"]), n["_cs2Pending"] = !0x1, n["_locoN"] = -0x1, Promise["resolve"]()) : new Nm(e["renderer"])["load"](r)["then"](t => {
    n["cs2Agent"] = t, t["root"]["visible"] = !0x1, e["scene"]["add"](t["root"]), n["_cs2Pending"] = !0x1, n["_locoN"] = -0x1
  })["catch"](() => {
    n["cs2Agent"] = null, n["_cs2Pending"] = !0x1, n["_cs2Tries"] = (n["_cs2Tries"] | 0x0) + 0x1, n["_cs2Tries"] >= 0x3 && (n["_cs2Failed"] = !0x0)
  })
}

function _h(e) {
  let t = hh["shift"]();
  t && gh(e, t)
}

function vh(e) {
  let t = hh["splice"](0x0, hh["length"])["map"](t => {
    return gh(e, t)
  });
  return Promise["all"](t)
}
var yh = new r;
var bh = new ze;
var xh = new O(new g(), 1.5);
var Sh = new ze;
var $h = class e {
  static["ROAM_SCORED"] = !0x0;
  static["SKILL"] = [{
    ["react"]: .8,
    ["err"]: .09,
    ["turn"]: 4.2,
    ["burst"]: 0x1
  }, {
    ["react"]: .6,
    ["err"]: .058,
    ["turn"]: 4.2,
    ["burst"]: 0x1
  }, {
    ["react"]: .42,
    ["err"]: .038,
    ["turn"]: 4.2,
    ["burst"]: 0x1
  }, {
    ["react"]: .28,
    ["err"]: .024,
    ["turn"]: 5.6,
    ["burst"]: .78
  }, {
    ["react"]: .16,
    ["err"]: .014,
    ["turn"]: 7.4,
    ["burst"]: .55
  }, {
    ["react"]: .08,
    ["err"]: .006,
    ["turn"]: 9.6,
    ["burst"]: .38
  }];
  static["skill"](t) {
    let n = e["SKILL"];
    return n[Math["max"](0x0, Math["min"](n["length"] - 0x1, t | 0x0))] || n[0x2]
  }
  constructor(e, t, n, r) {
    this["game"] = e, this["team"] = t, this["name"] = n, this["difficulty"] = r, this["isPlayer"] = !0x1, this["x"] = 0x0, this["y"] = 0x0, this["z"] = 0x0, this["vx"] = 0x0, this["vy"] = 0x0, this["vz"] = 0x0, this["radius"] = .4064, this["height"] = 1.8288, this["eyeH"] = 1.6256, this["onGround"] = !0x1, this["alive"] = !0x1, this["health"] = 0x64, this["armor"] = 0x0, this["helmet"] = !0x1, this["yaw"] = 0x0, this["kills"] = 0x0, this["deaths"] = 0x0, this["assists"] = 0x0, this["money"] = 0x0, this["weapon"] = "ak47", this["ammo"] = 0x1e, this["reloadT"] = 0x0, this["nextFire"] = 0x0, this["burstLeft"] = 0x0, this["burstPause"] = 0x0, this["target"] = null, this["reactT"] = 0x0, this["focus"] = 0x0, this["lastSeen"] = {
      ["x"]: 0x0,
      ["y"]: 0x0,
      ["z"]: 0x0,
      ["t"]: -0x63
    }, this["path"] = [], this["pathI"] = 0x0, this["repathT"] = 0x0, this["visionT"] = Math["random"]() * .2, this["strafeDir"] = 0x0, this["strafeT"] = 0x0, this["stuckT"] = 0x0, this["lastX"] = 0x0, this["lastZ"] = 0x0, this["respawnT"] = 0x0, this["blindUntil"] = 0x0, this["_nade"] = null, this["deathAnimT"] = 0x0, this["tagFactor"] = 0x1, this["_visY"] = this["y"], this["cs2Agent"] = null, this["_cs2WasAlive"] = !0x1, this["_cs2Pending"] = !0x0, hh["push"]({
      ["bot"]: this,
      ["team"]: t
    }), this["shadow"] = new I(new Le(1.1, 1.1), new ke({
      ["map"]: Qh(),
      ["transparent"]: !0x0,
      ["depthWrite"]: !0x1
    })), this["shadow"]["rotation"]["x"] = -Math["PI"] / 0x2, this["shadow"]["visible"] = !0x1, e["scene"]["add"](this["shadow"])
  } ["bestGun"]() {
    let e = [...(this["_dry"] || []), this["weapon"]];
    let t = e => {
      return (V[e] || {})["class"]
    };
    return e["find"](e => {
      let n = t(e);
      return !!n && n !== "pistol" && n !== "knife" && n !== "grenade" && n !== "zeus" && n !== "c4"
    }) || e["find"](e => {
      return t(e) === "pistol"
    }) || this["weapon"]
  } ["spawn"]() {
    let e = this["game"];
    this["_dmGoal"] = null;
    let t = e["spawnSet"](this["team"], !e["modeCtl"]);
    let n = -0x1;
    let r = [];
    for (let i of t) {
      let t = 0x3b9aca00;
      for (let n of e["allEntities"]()) {
        n["alive"] && n["team"] !== this["team"] && (t = Math["min"](t, Math["hypot"](n["x"] - i["x"], n["z"] - i["z"])))
      }
      t === 0x3b9aca00 && (t = 0x3c), r["push"]({
        ["s"]: i,
        ["minD"]: t
      }), t > n && (n = t)
    }
    let i = r["filter"](e => {
      return e["minD"] >= Math["max"](0xc, n * .35)
    });
    let a = i["length"] ? i : r;
    let o = e["botMgr"] && e["botMgr"]["_regionT"];
    let s = e["time"];
    let c = a[0x0]["s"];
    let l = -0x3b9aca00;
    for (let e of a) {
      let t = o ? o["get"](this["team"] + "|" + bg(e["s"]["x"], e["s"]["z"])) : void 0x0;
      let n = Math["min"](s - (t === void 0x0 ? -0x3b9aca00 : t), 0xb4) + Math["random"]() * 0xa;
      n > l && (l = n, c = e["s"])
    }
    let u = (t, n) => {
      for (let r of e["allEntities"]()) {
        if (r !== this && r["alive"] && Math["hypot"](r["x"] - t, r["z"] - n) < .9) {
          return !0x0
        }
      }
      return !0x1
    };
    let d = c["x"] + (Math["random"]() - .5) * .6;
    let f = c["z"] + (Math["random"]() - .5) * .6;
    if (u(d, f)) {
      let n = !0x1;
      for (let e of t) {
        if (!u(e["x"], e["z"])) {
          c = e, d = e["x"], f = e["z"], n = !0x0;
          break
        }
      }
      if (!n) {
        outer: for (let t = 0x1; t <= 0x3; t++) {
          for (let r = 0x0; r < 0x8; r++) {
            let i = c["x"] + Math["cos"](r / 0x8 * Math["PI"] * 0x2) * t * .9;
            let a = c["z"] + Math["sin"](r / 0x8 * Math["PI"] * 0x2) * t * .9;
            let o = e["physics"]["groundHeight"](i, c["y"] + 1.2, a);
            if (o > -0x8 && Math["abs"](o - c["y"]) < 0x1 && !u(i, a)) {
              d = i, f = a, n = !0x0;
              break outer
            }
          }
        }
      }
    }
    if (this["x"] = d, this["y"] = c["y"] + .05, this["z"] = f, !Rt(e["physics"], this, .75)) {
      let t = e["physics"]["groundHeight"](this["x"], this["y"] + 1.2, this["z"]);
      t > -0x8 && t < this["y"] + 1.2 && (this["y"] = t + .02)
    }
    this["onGround"] = !0x0, this["vx"] = 0x0, this["vy"] = 0x0, this["vz"] = 0x0, this["_stepLift"] = 0x0, this["yaw"] = c["yaw"], this["health"] = 0x64, this["armor"] = 0x0, this["helmet"] = !0x1;
    let p = this["alive"] ? this["bestGun"]() : null;
    if (this["_dry"] = null, this["alive"] = !0x0, this["_dmgBy"] = null, this["target"] = null, this["path"] = [], this["repathT"] = 0x0, this["_lad"] = null, this["onLadder"] = !0x1, this["_breaking"] = !0x1, this["_ducked"] = !0x1, this["height"] = kh, this["eyeH"] = Ah, this["deathAnimT"] = 0x0, e["modeCtl"] && e["modeCtl"]["botBuy"]) {
      let t = e["modeCtl"]["botBuy"](this, p);
      p && t["gun"] !== p && e["spawnDrop"](this["x"], this["y"] + 1.2, this["z"], p, null, V[p]["mag"], V[p]["reserve"] || 0x0, null, null, !0x0), this["weapon"] = t["gun"], this["nades"] = t["nades"], this["armor"] = t["armor"] ? 0x64 : 0x0, this["helmet"] = !!t["helmet"]
    } else {
      if (e["modeCtl"] && e["modeCtl"]["botGun"]) {
        let t = e["modeCtl"]["botGun"](this, p);
        p && t !== p && e["spawnDrop"](this["x"], this["y"] + 1.2, this["z"], p, null, V[p]["mag"], V[p]["reserve"] || 0x0, null, null, !0x0), this["weapon"] = t, this["nades"] = [], Math["random"]() < .3 ? this["nades"]["push"]("he") : Math["random"]() < .2 && this["nades"]["push"]("flash"), this["armor"] = 0x64, this["helmet"] = !0x0
      } else {
        let t = this["team"] === "T" ? qh : Jh;
        let n = t[Math["random"]() * t["length"] | 0x0];
        p && n !== p && e["spawnDrop"](this["x"], this["y"] + 1.2, this["z"], p, null, V[p]["mag"], V[p]["reserve"] || 0x0, null, null, !0x0), this["weapon"] = n, this["nades"] = [], Math["random"]() < .25 && this["nades"]["push"]("he"), this["armor"] = 0x64, this["helmet"] = !0x0
      }
    }
    this["pistol"] = V[this["weapon"]]["class"] === "pistol" ? null : Ym(this["team"])["secondary"][0x0], this["ammo"] = V[this["weapon"]]["mag"], this["reserve"] = V[this["weapon"]]["reserve"] || 0x0, this["zoom"] = 0x0, this["_visY"] = this["y"], this["shadow"]["visible"] = !0x0
  } ["_syncHeldGear"](e) {
    let t = e["modeCtl"];
    let n = !(!t || t["carrier"] !== this || t["plantProgress"] > 0x0);
    if (this["_bombOn"] === n) {
      return
    }
    let r = this["cs2Agent"];
    r && r["setBomb"] && (this["_bombOn"] = n, r["setBomb"](n))
  } ["_handOverCorpse"](e) {
    let t = this["cs2Agent"];
    t && (this["cs2Agent"] = null, this["_cs2WasAlive"] = !0x1, this["_cs2Death"] = !0x1, this["_bombOn"] = null, t["loco"] && t["loco"]["freeze"] && t["loco"]["freeze"](), e["addAgentCorpse"](t, this["team"], e["time"]))
  } ["die"](e, t, n) {
    if (this["hasKit"] = !0x1, this["alive"] = !0x1, this["deaths"]++, this["deathAnimT"] = 2.6, this["cs2Agent"] && this["cs2Agent"]["die"]) {
      let n = t ? "head" : e === "stomach" ? "stomach" : e === "leg" ? "leg" : "chest";
      let r = this["cs2Agent"]["die"](n, this["crouchT"] > 0x0, !!t);
      r && (this["_cs2Death"] = !0x0, this["deathAnimT"] = r + .35);
      let i = this["game"]["physics"]["groundHeight"](this["x"], this["y"] + 1.2, this["z"]);
      let a = i > -0x14 && this["game"]["map"] && this["game"]["map"]["visualGround"] ? this["game"]["map"]["visualGround"](this["x"], this["z"], i) ?? i : i > -0x14 ? i : this["y"];
      this["cs2Agent"]["setTransform"](this["x"], a, this["z"], this["yaw"]), this["_deathDur"] = r, this["_restLift"] = r ? this["cs2Agent"]["restLift"](this["game"]["effects"] && this["game"]["effects"]["groundAt"]) : 0x0
    }
    if (this["cs2Agent"]) {
      let e = V[this["weapon"]];
      this["cs2Agent"]["setWeapon"] && this["cs2Agent"]["setWeapon"](null, e && e["class"]), this["cs2Agent"]["setBomb"] && this["cs2Agent"]["setBomb"](!0x1)
    }
    this["_bombOn"] = null, this["respawnT"] = 3.5, this["shadow"]["visible"] = !0x1;
    let r = n && n["class"] === "zeus" ? "death_taser" : "death";
    this["game"]["audio"]["play"](r, {
      ["pos"]: this
    })
  } ["_updateCS2Body"](e, t) {
    if (!this["cs2Agent"]) {
      !this["_cs2Pending"] && !this["_cs2Failed"] && this["alive"] && (this["_cs2Pending"] = !0x0, hh["push"]({
        ["bot"]: this,
        ["team"]: this["team"]
      }));
      return
    }
    let n = this["alive"];
    if (n) {
      this["cs2Agent"]["dead"] && this["cs2Agent"]["revive"] && (this["cs2Agent"]["revive"](), this["_locoN"] = -0x1), this["_cs2Death"] = !0x1;
      let n = t["modeCtl"];
      let r = !!(n && n["carrier"] === this && n["plantProgress"] > 0x0);
      let i = r ? "c4" : Ua(this["weapon"], this["team"]);
      if (this["weapon"] && this["cs2Agent"]["_weaponId"] !== i) {
        let e = r ? V["c4"] : V[this["weapon"]];
        let n = t["_botSkin"] ? t["_botSkin"](this, e) : null;
        let a = n && n["kit"] ? {
          ["kit"]: n["kit"],
          ["item"]: {
            ["wear"]: n["wmin"] || 0x0,
            ["seed"]: n["seed"] || 0x0
          }
        } : null;
        let o = this["cs2Agent"]["setWeapon"](i, e && e["class"], a);
        r && this["cs2Agent"]["loco"] && this["cs2Agent"]["loco"]["stopAction"] && this["cs2Agent"]["loco"]["stopAction"]();
        let s = !this["_drewOnce"];
        let c = this["cs2Agent"];
        this["_drewOnce"] = !0x0, !s && !r && this["_drewFor"] !== i && c["draw"] && o && o["then"] ? (this["_drewFor"] = i, o["then"](e => {
          e && this["cs2Agent"] === c && this["_drewFor"] === i && c["draw"](i, {
            ["crouched"]: this["crouchT"] > 0x0
          })
        })) : this["_drewFor"] = i
      }
      if (this["cs2Agent"]["setGloves"]) {
        let e = t["_botGloves"] ? t["_botGloves"](this) : null;
        let n = this["cs2Agent"]["setGloves"](e ? e["model"] : null, e ? {
          ["kit"]: e["kit"],
          ["item"]: e["item"]
        } : null, {
          ["size"]: 0x200
        });
        n && n["catch"] && n["catch"](() => {})
      } {
        let e = this["cs2Agent"]["heldWeapon"];
        e && (e["visible"] = r === (this["cs2Agent"]["_weaponId"] === "c4"))
      }
      this["cs2Agent"]["setTransform"](this["x"], this["_visY"], this["z"], this["yaw"]);
      let a = this["cs2Agent"]["root"]["visible"];
      {
        let t = +(this["crouchT"] > 0x0);
        let n = this["_crouchAmt"] || 0x0;
        let r = this["_crouchV"] || 0x0;
        this["_crouchV"] = r + ((t - n) * 0x190 - r * 0x28) * e, this["_crouchAmt"] = Math["min"](0x1, Math["max"](0x0, n + this["_crouchV"] * e))
      }
      if (a) {
        let n = t["camera"]["position"];
        let r = this["x"] - n["x"];
        let i = this["z"] - n["z"];
        let a = r * r + i * i;
        let o = a > 0x640 ? 0x3 : a > 0x190 ? 0x2 : 0x1;
        if (this["_locoDt"] = (this["_locoDt"] || 0x0) + e, this["_locoN"] = ((this["_locoN"] | 0x0) + 0x1) % o, this["_locoN"] === 0x0) {
          let e = t["modeCtl"];
          this["cs2Agent"]["update"](this["_locoDt"], {
            ["vx"]: this["vx"],
            ["vz"]: this["vz"],
            ["airborne"]: !this["onGround"],
            ["crouch"]: this["_crouchAmt"] || 0x0,
            ["pitch"]: this["_lookPitch"] || 0x0,
            ["flashed"]: Math["max"](0x0, Math["min"](0x1, ((this["blindUntil"] || 0x0) - t["time"]) / 1.2)),
            ["defusing"]: !!(e && e["defuser"] === this && e["defuseProgress"] > 0x0),
            ["planting"]: !!(e && e["carrier"] === this && e["plantProgress"] > 0x0)
          }), this["_locoDt"] = 0x0
        }
      }
    }
    this["_cs2WasAlive"] = n
  } ["update"](t) {
    let n = this["game"];
    if (!this["alive"]) {
      if (this["deathAnimT"] > 0x0) {
        if (this["deathAnimT"] -= t, this["cs2Agent"]) {
          let e = n["physics"]["groundHeight"](this["x"], this["y"] + 1.2, this["z"]);
          let r = e > -0x14 && n["map"] && n["map"]["visualGround"] ? n["map"]["visualGround"](this["x"], this["z"], e) ?? e : e > -0x14 ? e : this["y"];
          this["_visY"] = r, this["cs2Agent"]["root"]["visible"] = !0x0;
          let i = this["_deathDur"] || 0x0;
          let a = i > 0x0 ? Math["min"](0x1, Math["max"](0x0, ((i + .35 - this["deathAnimT"]) / i - .35) / .55)) : 0x1;
          let o = (this["_restLift"] || 0x0) * a * a * (0x3 - 0x2 * a);
          this["cs2Agent"]["setTransform"](this["x"], r + o, this["z"], this["yaw"]), this["cs2Agent"]["update"](t)
        }
        this["deathAnimT"] <= 0x0 && this["_handOverCorpse"](n)
      }
      this["respawnT"] -= t, this["respawnT"] <= 0x0 && n["roundActive"] && n["respawnAllowed"] && this["spawn"]();
      return
    }
    if (n["frozen"]) {
      this["vx"] = 0x0, this["vz"] = 0x0, this["onGround"] ? this["vy"] = 0x0 : this["vy"] -= Th * t, jt(n["physics"], this, t, n["_entColl"]), this["_stepLift"] = 0x0, this["_visY"] = this["y"], this["_syncHeldGear"](n), this["_updateCS2Body"](t, n);
      return
    }
    let r = V[this["weapon"]];
    let i = n["time"] < this["blindUntil"];
    if (this["_stepShooting"](t, r), this["visionT"] -= t, this["visionT"] <= 0x0 && (this["visionT"] = .12 + Math["random"]() * .05, this["target"] = i ? null : this["findTarget"](), this["target"] && (this["lastSeen"]["x"] = this["target"]["x"], this["lastSeen"]["y"] = this["target"]["y"], this["lastSeen"]["z"] = this["target"]["z"], this["lastSeen"]["t"] = n["time"], this["reactT"] <= 0x0 && (this["reactT"] = e["skill"](this["difficulty"])["react"] + Math["random"]() * .3))), this["reloadT"] > 0x0) {
      if (this["reloadT"] -= t, !this["_reloadFilled"] && this["reloadT"] <= (this["_reloadFillLeft"] || 0x0)) {
        this["_reloadFilled"] = !0x0;
        let e = Math["min"](r["mag"] - this["ammo"], Math["max"](0x0, this["reserve"] | 0x0));
        this["ammo"] += e, this["reserve"] -= e, this["game"]["povIs"] && this["game"]["povIs"](this) && this["game"]["hud"]["updateWeapon"]()
      }
    } else {
      if (this["ammo"] <= 0x0 && (this["reserve"] | 0x0) <= 0x0 && r["mag"] !== 0x1 / 0x0) {
        let e = this["pistol"] || "knife";
        (this["_dry"] ||= [])["push"](this["weapon"]), this["pistol"] = null, this["weapon"] = e, this["ammo"] = V[e]["mag"], this["reserve"] = V[e]["reserve"] || 0x0, this["zoom"] = 0x0, this["game"]["povIs"] && this["game"]["povIs"](this) && this["game"]["hud"]["updateWeapon"]()
      } else {
        if (this["ammo"] <= 0x0 && r["mag"] !== 0x1 / 0x0 && !this["_nade"]) {
          this["reloadT"] = (r["shellReload"] ? r["reload"] * r["mag"] : r["reload"]) || 2.5, this["zoom"] && this["_setZoom"](0x0);
          let e = this["game"]["cs2"] && this["game"]["cs2"]["reloadFillTime"] && !r["shellReload"] ? this["game"]["cs2"]["reloadFillTime"](Ua(this["weapon"], this["team"]), !0x0, this["reloadT"]) : null;
          this["_reloadFillLeft"] = e == null ? 0x0 : Math["max"](0x0, this["reloadT"] - e), this["_reloadFilled"] = !0x1, this["game"]["povIs"] && this["game"]["povIs"](this) || this["game"]["audio"]["playWeapon"]("clipout", this["weapon"], {
            ["pos"]: this
          }), this["game"]["povReload"] && this["game"]["povReload"](this, r, !0x0, this["reloadT"]), this["cs2Agent"] && this["cs2Agent"]["reload"] && this["cs2Agent"]["reload"](Ua(this["weapon"], this["team"]), this["reloadT"], {
            ["empty"]: !0x0,
            ["crouched"]: this["crouchT"] > 0x0
          })
        }
      }
    }
    let a = 0x0;
    let o = 0x0;
    let s = this["zoom"] > 0x0 && r["zoomSpeed"] ? r["zoomSpeed"] : r["runSpeed"] || 6.35;
    if (this["target"] && this["target"]["alive"]) {
      this["focus"] = Math["min"](0x2, this["focus"] + t);
      let c = this["target"]["x"];
      let l = this["target"]["z"];
      let u = c - this["x"];
      let d = l - this["z"];
      let f = Math["hypot"](u, d);
      let p = Math["atan2"](-u, -d);
      this["yaw"] = Tg(this["yaw"], p, t * (i ? 1.5 : e["skill"](this["difficulty"])["turn"])), this["strafeT"] -= t, this["strafeT"] <= 0x0 && (this["strafeT"] = .85 + Math["random"]() * 1.1, this["strafeDir"] = Math["random"]() < .34 ? 0x0 : Math["random"]() < .5 ? 0x1 : -0x1);
      let m = -d / f;
      let h = u / f;
      let g = r["class"] === "shotgun" || r["class"] === "knife" ? f > 0x6 : f > 0x22;
      if (a = m * this["strafeDir"] + (g ? u / f * .8 : 0x0), o = h * this["strafeDir"] + (g ? d / f * .8 : 0x0), r["class"] === "sniper" && (a *= .25, o *= .25), this["crouchT"] > 0x0 && (s *= .34), this["reactT"] -= t, r["zoom"] && this["zoom"] === 0x0 && this["reloadT"] <= 0x0 && this["ammo"] > 0x0 && this["reactT"] < .35 && n["time"] >= this["nextFire"] - .35 && n["time"] >= (this["_noscopeT"] || 0x0)) {
        let e = r["class"] === "sniper" ? f < 0x7 ? .35 : .06 : f < 0x9 ? .5 : .12;
        Math["random"]() < e ? this["_noscopeT"] = n["time"] + 1.2 : (this["_setZoom"](0x1), this["_zoomT"] = .25)
      }
      this["_zoomT"] = Math["max"](0x0, (this["_zoomT"] || 0x0) - t);
      let _ = !!r["zoom"] && n["time"] < (this["_noscopeT"] || 0x0);
      (!r["zoom"] || _ || this["zoom"] > 0x0 && this["_zoomT"] <= 0x0) && this["reactT"] <= 0x0 && this["reloadT"] <= 0x0 && this["ammo"] > 0x0 && n["time"] >= this["nextFire"] && Math["abs"](Eg(this["yaw"], p)) < .12 && (this["burstLeft"] <= 0x0 && (this["burstPause"] > 0x0 ? this["burstPause"] -= t : this["burstLeft"] = r["class"] === "rifle" ? 0x2 + (Math["random"]() * 0x3 | 0x0) : r["class"] === "smg" || r["class"] === "mg" ? 0x4 + (Math["random"]() * 0x4 | 0x0) : 0x1), this["burstLeft"] > 0x0 && (this["shoot"](f), this["burstLeft"]--, this["burstLeft"] <= 0x0 && (this["burstPause"] = (.55 + Math["random"]() * .65) * e["skill"](this["difficulty"])["burst"]), this["crouchT"] <= 0x0 && f < 0x16 && Math["random"]() < .06 && (this["crouchT"] = .9 + Math["random"]() * .8)))
    } else {
      this["focus"] = 0x0, this["burstLeft"] = 0x0, this["zoom"] && this["_setZoom"](0x0);
      let e = n["modeCtl"] ? n["modeCtl"]["botObjective"](this) : this["dmObjective"]();
      let r = this["lastSeen"]["t"] > 0x0 && n["time"] - this["lastSeen"]["t"] < zh;
      if (r) {
        let i = n["time"] - this["lastSeen"]["t"];
        (n["modeCtl"] && n["modeCtl"]["carrier"] === this || i > Bh && e && !e["hold"] && Math["hypot"](e["x"] - this["lastSeen"]["x"], e["z"] - this["lastSeen"]["z"]) > Vh) && (r = !0x1), r && (this["_huntT"] = (this["_huntT"] || 0x0) + t) > Hh && (r = !0x1)
      }
      if (r || (this["_huntT"] = 0x0), r) {
        if (Math["hypot"](this["lastSeen"]["x"] - this["x"], this["lastSeen"]["z"] - this["z"]) > 2.5) {
          this["followPathTo"](this["lastSeen"]["x"], this["lastSeen"]["z"], t);
          let e = this["currentWaypointDir"]();
          e && (a = e["x"], o = e["z"])
        } else {
          this["lastSeen"]["t"] = -0x63
        }
      } else {
        if (e && e["hold"]) {
          e["faceYaw"] !== void 0x0 && (this["yaw"] = Tg(this["yaw"], e["faceYaw"], t * 0x4))
        } else {
          if (e) {
            this["followPathTo"](e["x"], e["z"], t);
            let n = this["currentWaypointDir"]();
            if (n) {
              a = n["x"], o = n["z"]
            } else {
              let t = e["x"] - this["x"];
              let n = e["z"] - this["z"];
              Math["hypot"](t, n) > .8 && (a = t, o = n)
            }
          } else {
            this["repathT"] -= t, !this["path"]["length"] || this["pathI"] >= this["path"]["length"] || this["repathT"] <= 0x0 ? this["newRoamPath"]() : this["_pathGoalX"] !== void 0x0 && this["resumeRoam"]();
            let e = this["currentWaypointDir"]();
            e && (a = e["x"], o = e["z"])
          }
        }
      }
    }
    if (this["_breaking"] = !0x1, this["target"] && this["target"]["alive"]) {
      this["_lad"] && this["_lad"]["phase"] === 0x0 && (this["_lad"] = null)
    } else {
      let e = this["_linkStep"](t);
      e && (a = e["x"], o = e["z"])
    }
    this["_lad"] && this["_lad"]["phase"] > 0x0 && (a = 0x0, o = 0x0);
    {
      let e = !0x1;
      let t = n["map"]["waypoints"]["_crouchPts"];
      if (t) {
        for (let n of t) {
          if (Math["abs"](n["y"] - this["y"]) < 1.2 && Math["hypot"](n["x"] - this["x"], n["z"] - this["z"]) < 1.35) {
            e = !0x0;
            break
          }
        }
      }
      e || this["_ducked"] && this["_headBlocked"]() ? (this["_ducked"] = !0x0, this["height"] = jh, this["eyeH"] = Mh, this["crouchT"] = Math["max"](this["crouchT"] || 0x0, .2), s *= .34) : this["_ducked"] && (this["_ducked"] = !0x1, this["height"] = kh, this["eyeH"] = Ah)
    }
    let c = this["path"]["length"] && this["pathI"] < this["path"]["length"] ? n["map"]["waypoints"][this["path"][this["pathI"]]] : null;
    let l = !!(c && c["narrow"]);
    if (a || o) {
      let e = n["botMgr"]["bots"];
      let t = Math["hypot"](a, o) || 0x1;
      for (let n = 0x0; n < e["length"]; n++) {
        let r = e[n];
        if (r === this || !r["alive"] || r["team"] !== this["team"]) {
          continue
        }
        let i = r["x"] - this["x"];
        let u = r["z"] - this["z"];
        let d = Math["hypot"](i, u);
        if (!(d > .9 || d < 1e-4) && !((a * i + o * u) / (t * d) < .55)) {
          if (l && r["path"] && r["path"]["length"] && r["pathI"] < r["path"]["length"] && r["path"][r["pathI"]] === this["path"][this["pathI"]]) {
            let e = Math["hypot"](c["x"] - this["x"], c["z"] - this["z"]);
            let t = Math["hypot"](c["x"] - r["x"], c["z"] - r["z"]);
            if (t < e - .15) {
              s *= .15;
              continue
            }
            if (e < t - .15) {
              continue
            }
          }(r["vx"] * a + r["vz"] * o) / t < -.4 ? (r["isPlayer"] || this["name"] < r["name"]) && (a += -u / d * t * 1.1, o += i / d * t * 1.1) : s *= Math["max"](0x0, (d - .5) / .4)
        }
      }
    }
    let u = n["modeCtl"];
    let d = !!(u && (u["carrier"] === this && u["inSite"](this) || u["defuser"] === this)) || !!this["_lad"] || this["_breaking"];
    if (this["_visitT"] = (this["_visitT"] || 0x0) - t, this["_visitT"] <= 0x0) {
      this["_visitT"] = 1.5;
      let e = bg(this["x"], this["z"]);
      this["_regionT"] ||= new Map, this["_regionT"]["set"](e, n["time"]);
      let t = n["botMgr"];
      t && (t["_regionT"] ||= new Map, t["_regionT"]["set"](this["team"] + "|" + e, n["time"]))
    }
    if (this["stuckT"] += t, this["stuckT"] > (l ? .6 : 1.4)) {
      let e = Math["hypot"](this["x"] - this["lastX"], this["z"] - this["lastZ"]);
      if (!d && e < .5 && (this["path"]["length"] || this["target"])) {
        let e = Math["hypot"](a, o);
        let t = e > .01 ? a / e : Math["cos"](this["yaw"]);
        let r = e > .01 ? o / e : -Math["sin"](this["yaw"]);
        this["_detourSide"] = -(this["_detourSide"] || 0x1), this["_detourT"] = .55, this["_detourX"] = -r * this["_detourSide"] + t * .35, this["_detourZ"] = t * this["_detourSide"] + r * .35, this["path"]["length"] && this["pathI"] < this["path"]["length"] && (this["_avoid"] ||= new Map, this["_avoid"]["set"](this["path"][this["pathI"]], n["time"] + 0x6), this["_avoid"]["size"] > 0xc && this["_avoid"]["delete"](this["_avoid"]["keys"]()["next"]()["value"])), this["_forceRepath"] = !0x0, this["_repathCd"] = 0x0, !n["modeCtl"] && !this["path"]["length"] && this["newRoamPath"]()
      }
      this["stuckT"] = 0x0, this["lastX"] = this["x"], this["lastZ"] = this["z"]
    }
    if (this["_detourT"] > 0x0 && (this["_detourT"] -= t, a = this["_detourX"], o = this["_detourZ"]), a || o) {
      let e = this["path"]["length"] && this["pathI"] < this["path"]["length"] ? this["game"]["map"]["waypoints"][this["path"][this["pathI"]]] : null;
      this["_hopCd"] = Math["max"](0x0, (this["_hopCd"] || 0x0) - t), this["_blockedT"] > .2 && !this["_hopCd"] && e && e["y"] > this["y"] + .25 && Math["abs"](this["vy"]) < .01 && !this["_lad"] ? (this["vy"] = Eh, this["_hopCd"] = 1.2) : this["steerBlocked"](a, o) && (a = this["_wpDir"]["x"], o = this["_wpDir"]["z"])
    }
    let f = n["player"];
    if ((a || o) && f && f["alive"] && !this["isPlayer"] && f["team"] === this["team"]) {
      let e = f["x"] - this["x"];
      let t = f["z"] - this["z"];
      let n = Math["hypot"](e, t);
      if (n > 1e-4 && n < Rh) {
        let r = Math["hypot"](a, o) || 0x1;
        if ((a * e + o * t) / (r * n) > .1) {
          let i = -t / n;
          let c = e / n;
          let l = a * i + o * c >= 0x0 ? 0x1 : -0x1;
          let u = (Rh - n) / Rh * 1.6;
          a += i * l * r * u, o += c * l * r * u, n < .95 && (s *= Math["max"](.25, (n - .55) / .4))
        }
      }
    }
    this["tagFactor"] = Math["min"](0x1, this["tagFactor"] + t * 1.4);
    let p = Math["hypot"](a, o);
    if (p > .01) {
      a /= p, o /= p;
      let e = s * this["tagFactor"];
      if (this["onGround"]) {
        this["vx"] += (a * e - this["vx"]) * Math["min"](0x1, t * 5.5), this["vz"] += (o * e - this["vz"]) * Math["min"](0x1, t * 5.5)
      } else {
        let n = this["vx"] * a + this["vz"] * o;
        let r = Math["min"](e, Ph) - n;
        if (r > 0x0) {
          let n = Math["min"](Nh * e * t, r);
          this["vx"] += a * n, this["vz"] += o * n
        }
      }
      this["target"] || (this["yaw"] = Tg(this["yaw"], Math["atan2"](-a, -o), t * 4.5))
    } else {
      this["onGround"] && (this["vx"] *= Math["max"](0x0, 0x1 - t * 0x9), this["vz"] *= Math["max"](0x0, 0x1 - t * 0x9))
    }
    let m = !this["onGround"];
    m && (this["vy"] -= Th * t * .5);
    let h = this["x"];
    let g = this["z"];
    let _ = this["vy"];
    let v = !!(this["_lad"] && this["_lad"]["phase"] > 0x0);
    if (v ? this["_ladderMove"](t) : jt(n["physics"], this, t, n["_entColl"]), m && !this["onGround"] && !v && (this["vy"] -= Th * t * .5), m && this["onGround"] && -_ > sh) {
      let e = -_ >= ch ? 0x1 : .85;
      n["povIs"] && n["povIs"](this) ? n["audio"]["play"]("land", {
        ["vol"]: e,
        ["dist"]: (n["_specEyeH"] || this["eyeH"]) - oh
      }) : (lh["x"] = this["x"], lh["y"] = this["y"] + oh, lh["z"] = this["z"], n["audio"]["play"]("land", {
        ["vol"]: e,
        ["pos"]: lh
      }))
    }
    if (v || Rn(n["physics"], this, t, p > .01 ? a : 0x0, p > .01 ? o : 0x0), p > .01) {
      let e = (this["x"] - h) * a + (this["z"] - g) * o;
      let n = s * this["tagFactor"] * t;
      this["onGround"] && (e < n * .35 ? this["_blockedT"] = (this["_blockedT"] || 0x0) + t : (this["_blockedT"] = 0x0, this["_avoidSide"] = 0x0))
    } else {
      this["_blockedT"] && (this["_blockedT"] = 0x0, this["_avoidSide"] = 0x0)
    }
    let y = n["map"] && n["map"]["voidY"] !== void 0x0 ? n["map"]["voidY"] : -2.2;
    let b = n["map"] && n["map"]["ceilY"] !== void 0x0 ? n["map"]["ceilY"] : 0x1e;
    if (this["y"] < y) {
      let e = n["physics"]["groundHeight"](this["x"], b, this["z"]);
      if (e > y) {
        this["y"] = e + .1
      } else {
        let e = this["team"] === "T" ? n["map"]["spawnsT"] : n["map"]["spawnsCT"];
        let t = e[Math["random"]() * e["length"] | 0x0];
        this["x"] = t["x"], this["y"] = t["y"] + .1, this["z"] = t["z"]
      }
      this["vx"] = this["vy"] = this["vz"] = 0x0
    } {
      let e = Math["hypot"](this["vx"], this["vz"]);
      if (this["onGround"] && e > Ih && this["crouchT"] <= 0x0 && !this["walking"]) {
        if (this["_stepDist"] = (this["_stepDist"] || 0x0) + e * t, this["_stepDist"] > Fh) {
          this["_stepDist"] = 0x0;
          let e = Ai(n["physics"], this["x"], this["y"], this["z"]);
          let t = uh(n, this, e);
          let r = n["time"];
          let i = r - (n["_stepGateT"] || -0x9);
          let a = i > .1 || t > (n["_stepGateV"] || 0x0);
          n["povIs"] && n["povIs"](this) ? n["audio"]["play"](e, {
            ["dist"]: (n["_specEyeH"] || this["eyeH"]) - oh
          }) : t > .002 && a && (n["_stepGateT"] = r, n["_stepGateV"] = i > .1 ? t : Math["max"](t, n["_stepGateV"] || 0x0), lh["x"] = this["x"], lh["y"] = this["y"] + oh, lh["z"] = this["z"], n["audio"]["play"](e, {
            ["pos"]: lh
          }))
        }
      } else {
        this["_stepDist"] = Lh + Math["random"]() * Lh
      }
    }
    let x = 0x0;
    this["onGround"] && n["map"]["visualGround"] && (x = Math["max"](0x0, (n["map"]["visualGround"](this["x"], this["z"], this["y"]) ?? this["y"]) - this["y"]), x > .45 && (x = 0x0)), this["_visY"] = this["y"] - (this["_stepLift"] || 0x0) + x;
    let S = this["y"] + x;
    if (!this["onGround"]) {
      let e = n["physics"]["raycast"](this["x"], this["y"] + .1, this["z"], 0x0, -0x1, 0x0, 0xc);
      e && (S = e["y"])
    }
    let C = Math["min"](0x1, Math["max"](0x0, this["y"] - S) / 2.5);
    if (this["shadow"]["position"]["set"](this["x"], S + .03, this["z"]), this["shadow"]["scale"]["setScalar"](0x1 - C * .45), this["shadow"]["material"] && (this["shadow"]["material"]["opacity"] = .34 * (0x1 - C * .6)), this["_nade"]) {
      let e = this["_nade"];
      e["t"] -= t, e["phase"] === "draw" && e["t"] <= 0x0 ? (e["phase"] = "pin", e["t"] = ih, this["cs2Agent"] && this["cs2Agent"]["pullPin"] && this["cs2Agent"]["pullPin"](e["id"]), n["povPin"] && n["povPin"](this), e["id"] === "molotov" && (n["povIs"] && n["povIs"](this) ? n["audio"]["play"]("molotov_light") : n["audio"]["play"]("molotov_light", {
        ["pos"]: this
      }))) : e["phase"] === "pin" && e["t"] <= 0x0 && (this["_nade"] = null, this["_releaseNade"](e["id"]))
    } else {
      if (this["nades"] && this["nades"]["length"] && this["target"] && this["target"]["alive"] && n["time"] > (this["_nadeT"] || 0x0)) {
        let e = Math["hypot"](this["target"]["x"] - this["x"], this["target"]["z"] - this["z"]);
        e > 0x9 && e < 0x1e && Math["random"]() < t * .12 && (this["_nade"] = {
          ["id"]: this["nades"][this["nades"]["length"] - 0x1],
          ["phase"]: "draw",
          ["t"]: rh
        }, this["_nadeT"] = n["time"] + 0x12, n["povIs"] && n["povIs"](this) && n["hud"]["updateWeapon"]())
      }
    }
    n["modeCtl"], this["crouchT"] = Math["max"](0x0, (this["crouchT"] || 0x0) - t), this["_syncHeldGear"](n);
    let w = 0x0;
    if (this["target"] && this["target"]["alive"]) {
      let e = this["target"]["x"] - this["x"];
      let t = this["target"]["z"] - this["z"];
      let n = this["target"]["y"] + 1.2 - (this["y"] + this["eyeH"]);
      w = Math["max"](-mh, Math["min"](mh, Math["atan2"](n, Math["hypot"](e, t))))
    } else {
      let e = 0x0;
      let t = (this["path"] && this["path"]["length"] ? this["path"][this["pathI"]] : null) || (this["lastSeen"] && this["lastSeen"]["t"] ? this["lastSeen"] : null);
      if (t) {
        let n = t["x"] - this["x"];
        let r = t["z"] - this["z"];
        let i = Math["hypot"](n, r);
        i > 1.5 && (e = Math["atan2"]((t["y"] ?? this["y"]) - this["y"], i) * .7)
      }
      let r = this["_scanPh"] ||= Math["random"]() * Math["PI"] * 0x2;
      let i = Math["sin"](n["time"] * .45 + r) * .13 + Math["sin"](n["time"] * .17 + r * 2.1) * .07;
      w = Math["max"](-mh, Math["min"](mh, e + i))
    }
    this["_lookPitch"] = (this["_lookPitch"] || 0x0) + (w - (this["_lookPitch"] || 0x0)) * Math["min"](0x1, t * 0x7), this["_updateCS2Body"](t, n)
  } ["_accState"]() {
    let e = this["_accSt"] ||= {};
    return e["onGround"] = !!this["onGround"], e["onLadder"] = !!this["onLadder"], e["ducking"] = !!(this["crouchT"] > 0x0 && this["onGround"]), e["reloading"] = !!this["reloading"], e["zoomed"] = this["zoom"] > 0x0, e["walking"] = !0x1, e["speed"] = Math["hypot"](this["vx"], this["vz"]), e["velY"] = this["vy"] || 0x0, e["recoilIndex"] = (this["_punch"] && this["_punch"]["index"]) | 0x0, e
  } ["_stepShooting"](e, t) {
    let n = t && t["cs2"];
    if (!n || !this["_punch"]) {
      this["punchP"] = 0x0, this["punchY"] = 0x0, this["shkP"] = 0x0, this["shkY"] = 0x0;
      return
    }
    this["_csTick"] = (this["_csTick"] || 0x0) + e;
    let r = 0x0;
    for (; this["_csTick"] >= ah && r++ < 0x10;) {
      this["_csTick"] -= ah, Ta(this["_acc"], n, this["_accState"](), ah, this["_punch"]["index"]), ua(this["_punch"], ah), da(this["_punch"], Sa(n["cycleTime"], !0x1) || .1, this["game"]["time"], ah)
    }
    r >= 0x10 && (this["_csTick"] = 0x0);
    let i = fa(this["_punch"]);
    this["punchP"] = -i["pitch"], this["punchY"] = i["yaw"], this["shkP"] = -this["_punch"]["viewPitch"] * nh, this["shkY"] = this["_punch"]["viewYaw"] * nh
  } ["crosshairSpread"]() {
    let e = V[this["weapon"]];
    let t = e && e["cs2"];
    return !t || !this["_acc"] ? 0x0 : Ea(this["_acc"], t, this["_accState"]()) + Sa(t["spread"], this["zoom"] > 0x0)
  } ["restingSpread"]() {
    let e = V[this["weapon"]];
    let t = e && e["cs2"];
    return t ? Sa(this["crouchT"] > 0x0 && this["onGround"] ? t["inaccCrouch"] : t["inaccStand"], this["zoom"] > 0x0) * z["STAND"] + Sa(t["spread"], this["zoom"] > 0x0) : 0x0
  } ["findTarget"]() {
    let e = this["game"];
    let t = null;
    let n = 0x3b9aca00;
    let r = this["x"];
    let i = this["y"] + this["eyeH"];
    let a = this["z"];
    let o = -Math["sin"](this["yaw"]);
    let s = -Math["cos"](this["yaw"]);
    for (let c of e["allEntities"]()) {
      if (c === this || !c["alive"] || c["team"] === this["team"] || c["isPlayer"] && c["spawnProt"] > 0x0) {
        continue
      }
      let l = c["x"] - r;
      let u = c["z"] - a;
      let d = Math["hypot"](l, u);
      if (d > 0x41) {
        continue
      }
      let f = (l * o + u * s) / (d || 0x1);
      if (f < .15 && d > 0x4 && c !== this["target"]) {
        continue
      }
      let p = c["y"] + (c["eyeH"] || 1.5);
      if (!e["physics"]["lineClear"](r, i, a, c["x"], p, c["z"]) || e["grenadeMgr"]["lineBlockedBySmoke"](r, i, a, c["x"], p, c["z"])) {
        continue
      }
      let m = d - f * 0x8 + (c === this["target"] ? -0xc : 0x0);
      m < n && (n = m, t = c)
    }
    return t
  } ["_setZoom"](e) {
    if ((this["zoom"] | 0x0) === e) {
      return
    }
    this["zoom"] = e;
    let t = V[this["weapon"]];
    if (!t || !t["zoom"]) {
      return
    }
    let n = this["game"];
    let r = e > 0x0 ? "zoom_in" : "zoom_out";
    n["povIs"] && n["povIs"](this) ? n["audio"]["playWeapon"](r, this["weapon"]) : n["audio"]["playWeapon"](r, this["weapon"], {
      ["pos"]: this
    })
  } ["_releaseNade"](e) {
    let t = this["game"];
    let n = this["nades"] ? this["nades"]["lastIndexOf"](e) : -0x1;
    n >= 0x0 && this["nades"]["splice"](n, 0x1);
    let r = this["y"] + this["eyeH"];
    let i;
    let a;
    let o;
    let s = this["target"] && this["target"]["alive"] ? this["target"] : null;
    if (s) {
      let e = s["x"] - this["x"];
      let t = s["z"] - this["z"];
      let n = Math["max"](.001, Math["hypot"](e, t));
      i = e / n, a = (s["y"] + 0x1 - r) / n + .32, o = t / n
    } else {
      i = -Math["sin"](this["yaw"]), a = .32, o = -Math["cos"](this["yaw"])
    }
    let c = Math["hypot"](i, a, o);
    i /= c, a /= c, o /= c, t["grenadeMgr"]["throwFrom"](this, e, this["x"], r, this["z"], i, a, o, .9);
    let l = !!(t["povIs"] && t["povIs"](this));
    l ? t["audio"]["playWeapon"]("toss", e) : t["audio"]["playWeapon"]("toss", e, {
      ["pos"]: this
    }), t["voice"] && t["voice"]["say"](this, {
      ["he"]: "grenade",
      ["flash"]: "flashbang",
      ["smoke"]: "smoke",
      ["molotov"]: "molotov",
      ["incend"]: "molotov",
      ["decoy"]: "decoy"
    } [e] || "grenade", {
      ["force"]: !0x0
    });
    let u = a > .55;
    this["cs2Agent"] && this["cs2Agent"]["throwGrenade"] && this["cs2Agent"]["throwGrenade"]({
      ["under"]: u,
      ["crouched"]: this["crouchT"] > 0x0
    }), l && t["povThrow"] && t["povThrow"](this, e, u)
  } ["shoot"](t) {
    if (this["_nade"]) {
      return
    }
    let n = this["game"];
    let r = V[this["weapon"]];
    this["ammo"]--;
    let i = r["cycleTime"] == null ? 0x3c / r["rpm"] : r["cycleTime"];
    this["nextFire"] = n["time"] + (r["boltTime"] || i) * (r["auto"] ? 0x1 : 1.6 + Math["random"]());
    let a = r["class"] === "knife" && Math["random"]() < .25;
    a && (this["nextFire"] = n["time"] + 0x1), this["cs2Agent"] && (r["class"] === "knife" ? this["cs2Agent"]["knifeAttack"] && this["cs2Agent"]["knifeAttack"](a ? "stab" : "swing") : this["cs2Agent"]["shoot"] && this["cs2Agent"]["shoot"](Ua(this["weapon"], this["team"]), {
      ["crouched"]: this["crouchT"] > 0x0
    }));
    let o = !!(n["povIs"] && n["povIs"](this));
    o ? r["class"] === "knife" ? n["povKnife"] && n["povKnife"](this, a) : n["povShot"] && n["povShot"](this, r) : r["vm"] && r["vm"]["dual"] && (this["_dualLeft"] = !this["_dualLeft"]);
    let s = r["vm"] && r["vm"]["dual"] ? !!this["_dualLeft"] : !!r["silenced"];
    let c = e["skill"](this["difficulty"])["err"];
    let l = Math["max"](.6, 1.8 - this["focus"] * .55);
    let u = 0x1 + t / 0x2d;
    let d = 0x1 + Math["hypot"](this["vx"], this["vz"]) / 0x8;
    let f = this["target"] ? Math["hypot"](this["target"]["vx"] || 0x0, this["target"]["vz"] || 0x0) : 0x0;
    let p = c * l * u * d * (0x1 + f / 0x9);
    let m = this["target"];
    let h = this["x"];
    let g = this["y"] + this["eyeH"];
    let _ = this["z"];
    let v = m["y"] + (m["eyeH"] ? m["eyeH"] - .25 : 1.3);
    let y = m["x"] - h;
    let b = v - g;
    let x = m["z"] - _;
    let S = Math["hypot"](y, b, x);
    if (y /= S, b /= S, x /= S, r["class"] === "knife") {
      let e = a ? "knife_swing_heavy" : r["sound"];
      o ? n["audio"]["play"](e, {
        ["gain"]: Fo["KNIFE_GAIN"]
      }) : n["audio"]["play"](e, {
        ["pos"]: {
          ["x"]: h,
          ["y"]: g,
          ["z"]: _
        },
        ["gain"]: Fo["KNIFE_GAIN"]
      });
      let t = Fo["KNIFE_DMG"];
      n["meleeAttack"](this, a ? t["stab"] : t["slash"], r, a ? t["stabBack"] : t["slashBack"], a, y, b, x);
      return
    }
    let [C, w, T] = Dg(y, b, x, (Math["random"]() + Math["random"]() - 0x1) * p, (Math["random"]() + Math["random"]() - 0x1) * p);
    y = C, b = w, x = T;
    let E = r["cs2"];
    if (E) {
      this["_punch"] || (this["_punch"] = sa(), this["_acc"] = Ca());
      let e = fa(this["_punch"]);
      let [t, i, a] = Dg(y, b, x, -e["yaw"] * nh, -e["pitch"] * nh);
      let o = Ea(this["_acc"], E, this["_accState"]());
      let s = Sa(E["bullets"], !0x1) || r["pellets"] || 0x1;
      let c = ka(E["spreadSeed"] ? E["spreadSeed"] : Math["random"]() * 0x7fffffff | 0x0, o, Sa(E["spread"], this["zoom"] > 0x0), s, {
        ["negev"]: r["id"] === "negev",
        ["recoilIndex"]: this["_punch"]["index"] | 0x0
      });
      for (let e = 0x0; e < c["length"]; e++) {
        let [o, s, l] = Dg(t, i, a, c[e]["x"], c[e]["y"]);
        n["fireBullet"](this, h, g, _, o, s, l, r)
      }
      Da(this["_acc"], E, this["_accState"](), n["time"]);
      let l = E["fullAuto"] ? this["_punch"]["index"] | 0x0 : Math["random"]() * 0x40 | 0x0;
      let u = oa(r["id"], 0x0, l);
      u && ca(this["_punch"], u["angle"], u["magnitude"]), this["_punch"]["index"] += 0x1, this["_punch"]["lastShot"] = n["time"]
    } else {
      let e = r["pellets"] || 0x1;
      for (let t = 0x0; t < e; t++) {
        let [e, t, i] = Dg(y, b, x, (Math["random"]() + Math["random"]() - 0x1) * .035, (Math["random"]() + Math["random"]() - 0x1) * .035);
        n["fireBullet"](this, h, g, _, e, t, i, r)
      }
    }
    o ? n["audio"]["play"](r["sound"]) : n["audio"]["play"](r["sound"], {
      ["pos"]: {
        ["x"]: h,
        ["y"]: g,
        ["z"]: _
      }
    });
    let D = -Math["sin"](this["yaw"]);
    let O = -Math["cos"](this["yaw"]);
    if (!r["silenced"] && o && n["effects"]["flashLight"](this["x"] + D * 1.2, g - .1, this["z"] + O * 1.2), r["boltTime"]) {
      this["zoom"] && this["_setZoom"](0x0);
      let e = this["weapon"];
      setTimeout(() => {
        this["alive"] && this["weapon"] === e && (n["povIs"] && n["povIs"](this) ? n["audio"]["playWeapon"]("bolt", e) : n["audio"]["playWeapon"]("bolt", e, {
          ["pos"]: this
        }))
      }, 0x15e)
    }
    if (!r["silenced"] && !o) {
      let e = this["cs2Agent"];
      fh["set"](y, b, x);
      let t = e && e["muzzleWorld"] ? e["muzzleWorld"](dh, s, fh) : null;
      let r = t && e["muzzleDir"] ? e["muzzleDir"](ph, s) : null;
      let i = r ? r["x"] : fh["x"];
      let a = r ? r["y"] : fh["y"];
      let o = r ? r["z"] : fh["z"];
      let c = t ? t["x"] : h + D * .7;
      let l = t ? t["y"] : g - .1;
      let u = t ? t["z"] : _ + O * .7;
      n["effects"]["worldMuzzle"](c, l, u, this["weapon"], i, a, o), n["effects"]["flashLight"](c + i * .2, l + a * .2, u + o * .2, 0xffc060, 0xa, .06)
    }
    let k = fo(this["weapon"], r["class"]);
    if (k) {
      let e = this["weapon"];
      let t = po(e);
      let i = () => {
        if (!this["alive"] || this["weapon"] !== e) {
          return
        }
        let t = n["cs2"];
        let i = n["povIs"] && n["povIs"](this) && t && t["shellPort"] && t["rig"] && t["rig"]["weaponId"] === e ? t["shellPort"](!0x1, n["camera"]) : null;
        if (i) {
          n["effects"]["ejectCasing"](k, i["p"]["x"], i["p"]["y"], i["p"]["z"], i["f"]["x"], i["f"]["y"], i["f"]["z"], i["l"]["x"], i["l"]["y"], i["l"]["z"], i["u"]["x"], i["u"]["y"], i["u"]["z"]);
          return
        }
        let a = this["cs2Agent"];
        let o = a && a["shellPort"] ? a["shellPort"](r["vm"] && r["vm"]["dual"] ? !!this["_dualLeft"] : !0x1) : null;
        if (o) {
          n["effects"]["ejectCasing"](k, o["p"]["x"], o["p"]["y"], o["p"]["z"], o["f"]["x"], o["f"]["y"], o["f"]["z"], o["l"]["x"], o["l"]["y"], o["l"]["z"], o["u"]["x"], o["u"]["y"], o["u"]["z"]);
          return
        }
        let s = a && a["bones"] && (a["bones"]["hand_R"] || a["bones"]["wpn"]);
        let c;
        let l;
        let u;
        if (s) {
          s["updateWorldMatrix"](!0x0, !0x1), dh["setFromMatrixPosition"](s["matrixWorld"]), c = dh["x"], l = dh["y"], u = dh["z"]
        } else {
          let e = Math["cos"](this["yaw"]);
          let t = -Math["sin"](this["yaw"]);
          c = h + D * .35 + e * .18, l = g - .2, u = _ + O * .35 + t * .18
        }
        n["effects"]["ejectFromGun"](e, r["class"], c, l, u, y, b, x, !0x1)
      };
      t > 0x0 ? setTimeout(i, t * 0x3e8) : i()
    }
    n["noise"](r["silenced"] ? 0xa : 0x28, h, _)
  } ["deathmatchSiteGoal"](e) {
    let t = this["game"];
    if (t["modeCtl"]) {
      return -0x1
    }
    let n = t["map"]["bombsites"];
    if (!n || !n["length"] || Math["random"]() > .35) {
      return -0x1
    }
    this["_siteSeen"] ||= new Map;
    let r = null;
    let i = -0x1 / 0x0;
    for (let e of n) {
      let n = t["time"] - (this["_siteSeen"]["get"](e["name"]) ?? -0x3b9aca00);
      n > i && (i = n, r = e)
    }
    if (!r) {
      return -0x1
    }
    let a = -0x1;
    let o = 0x1 / 0x0;
    for (let t = 0x0; t < e["length"]; t++) {
      let n = Math["hypot"](e[t]["x"] - r["cx"], e[t]["z"] - r["cz"]);
      n < o && (o = n, a = t)
    }
    return a < 0x0 ? -0x1 : (this["_siteSeen"]["set"](r["name"], t["time"]), a)
  } ["dmObjective"]() {
    let e = this["game"]["time"];
    let t = this["_dmGoal"];
    return (!t || e > t["until"] || Math["hypot"](t["x"] - this["x"], t["z"] - this["z"]) < 0x8) && (t = this["_dmGoal"] = this["_pickDmGoal"](e)), t ? {
      ["x"]: t["x"],
      ["z"]: t["z"]
    } : null
  } ["_pickDmGoal"](e) {
    let t = this["game"];
    let n = yg(t["map"]);
    if (!n["length"]) {
      return null
    }
    let r = t["botMgr"] && t["botMgr"]["_regionT"];
    let i = t["botMgr"] && t["botMgr"]["bots"] || [];
    let a = t["map"]["bombsites"] || [];
    let o = -0x3b9aca00;
    let s = null;
    for (let t of n) {
      let n = r ? r["get"](this["team"] + "|" + t["key"]) : void 0x0;
      let c = Math["min"](e - (n === void 0x0 ? -0x3b9aca00 : n), 0x96);
      for (let e of a) {
        if (Math["hypot"](t["x"] - e["cx"], t["z"] - e["cz"]) < 0xe) {
          c += 0x23;
          break
        }
      }
      let l = Math["hypot"](t["x"] - this["x"], t["z"] - this["z"]);
      l < 0xc && (c -= 0x3c), c += Math["min"](l, 0x32) * .25;
      for (let n of i) {
        if (n === this || !n["alive"] || n["team"] !== this["team"]) {
          continue
        }
        n["_dmGoal"] && n["_dmGoal"]["key"] === t["key"] && n["_dmGoal"]["until"] > e && (c -= 0x46);
        let r = Math["hypot"](t["x"] - n["x"], t["z"] - n["z"]);
        r < 0xe && (c -= (0xe - r) * 0x2)
      }
      c += Math["random"]() * 0x14, c > o && (o = c, s = t)
    }
    if (!s) {
      return null
    }
    let c = s["idx"]["length"] ? t["map"]["waypoints"][s["idx"][Math["random"]() * s["idx"]["length"] | 0x0]] : null;
    let l = c ? c["x"] : s["x"];
    let u = c ? c["z"] : s["z"];
    let d = Math["hypot"](l - this["x"], u - this["z"]);
    return {
      ["key"]: s["key"],
      ["x"]: l,
      ["z"]: u,
      ["until"]: e + 0x14 + d * .9 + Math["random"]() * 0xa
    }
  } ["resumeRoam"]() {
    let e = this["game"]["map"]["waypoints"];
    if (this["_roamGoal"] === void 0x0 || !e[this["_roamGoal"]]) {
      this["newRoamPath"]();
      return
    }
    this["path"] = wg(e, this["nearestWaypoint"](), this["_roamGoal"], this["path"], this["_avoid"] && this["_avoid"]["size"] ? this["_avoid"] : null), this["pathI"] = 0x0, this["_pathGoalX"] = void 0x0, this["path"]["length"] || this["newRoamPath"]()
  } ["newRoamPath"]() {
    let t = this["game"];
    let n = t["map"]["waypoints"];
    if (!n["length"]) {
      return
    }
    let r = this["nearestWaypoint"]();
    let i = t["botMgr"]["bots"];
    let a = Math["random"]() * n["length"] | 0x0;
    if (e["ROAM_SCORED"]) {
      let e = yg(t["map"]);
      let n = t["botMgr"]["_regionT"];
      let r = t["time"];
      let o = -0x3b9aca00;
      let s = null;
      for (let t of e) {
        let e = this["_regionT"] ? this["_regionT"]["get"](t["key"]) : void 0x0;
        let a = n ? n["get"](this["team"] + "|" + t["key"]) : void 0x0;
        let c = Math["min"](r - (e === void 0x0 ? -0x3b9aca00 : e), 0x78) + Math["min"](r - (a === void 0x0 ? -0x3b9aca00 : a), 0x78) * .35;
        let l = Math["hypot"](t["x"] - this["x"], t["z"] - this["z"]);
        c += Math["min"](l, 0x2d) * .6, l < 0xa && (c -= 0x2d), this["_lastRegion"] === t["key"] && (c -= 0x3c);
        for (let e of i) {
          if (e === this || !e["alive"] || e["team"] !== this["team"]) {
            continue
          }
          let n = Math["hypot"](t["x"] - e["x"], t["z"] - e["z"]);
          n < 0xe && (c -= (0xe - n) * 1.6)
        }
        c += Math["random"]() * 0x19, c > o && (o = c, s = t)
      }
      s && (this["_lastRegion"] = s["key"], a = s["idx"][Math["random"]() * s["idx"]["length"] | 0x0])
    }
    let o = this["deathmatchSiteGoal"](n);
    if (o >= 0x0 && (a = o), this["_lastRoam"] = a, this["_roamGoal"] = a, this["path"] = wg(n, r, a, this["path"]), !this["path"]["length"]) {
      let e = Math["random"]() * n["length"] | 0x0;
      e !== a && (this["path"] = wg(n, r, e, this["path"]), this["path"]["length"] && (a = e, this["_roamGoal"] = e))
    }
    this["pathI"] = 0x0, this["repathT"] = 0x8 + this["path"]["length"] * 2.6 + Math["random"]() * 0x6, this["_pathGoalX"] = void 0x0
  } ["_headBlocked"]() {
    let e = this["game"]["physics"];
    let t = this["y"] + kh - .04;
    let n = .38;
    return e["solidAt"](this["x"], t, this["z"]) || e["solidAt"](this["x"] + n, t, this["z"]) || e["solidAt"](this["x"] - n, t, this["z"]) || e["solidAt"](this["x"], t, this["z"] + n) || e["solidAt"](this["x"], t, this["z"] - n)
  } ["_linkAhead"]() {
    let e = this["game"]["map"]["waypoints"];
    let t = e["_links"];
    if (!t || !this["path"]["length"] || this["pathI"] >= this["path"]["length"]) {
      return null
    }
    let n = this["path"][this["pathI"]];
    if (!e[n]["_link"]) {
      return null
    }
    let r = this["pathI"] > 0x0 ? this["path"][this["pathI"] - 0x1] : -0x1;
    let i = r >= 0x0 ? t["get"](r * ng + n) : null;
    if (!i && e[n]["_linkFrom"]) {
      for (let a of e[n]["_linkFrom"]) {
        let o = e[a];
        if (Math["abs"](o["y"] - this["y"]) < 0x1 && Math["hypot"](o["x"] - this["x"], o["z"] - this["z"]) < 3.2 && (i = t["get"](a * ng + n), r = a, i)) {
          break
        }
      }
    }
    return i && (this["_linkFrom"] = r, this["_linkTo"] = n), i || null
  } ["_linkStep"](e) {
    let t = this["_lw"] ||= {
      ["x"]: 0x0,
      ["z"]: 0x0
    };
    let n = this["_lad"];
    if (n && n["phase"] > 0x0) {
      return t["x"] = 0x0, t["z"] = 0x0, t
    }
    let r = this["_linkAhead"]();
    if (n && (!r || r !== n["link"]) && (this["_lad"] = null), !r) {
      return null
    }
    if (r["breakEnt"]) {
      let n = this["_breakStep"](r, e, t);
      if (n) {
        return n
      }
    }
    if (r["type"] !== "ladder") {
      return null
    }
    let i = this["game"]["map"]["waypoints"];
    let a = r["ladder"];
    let o = this["_linkTo"] === r["b"];
    this["_lad"] ||= {
      ["link"]: r,
      ["up"]: o,
      ["phase"]: 0x0,
      ["stepT"]: 0x0
    };
    let s = o ? i[r["a"]] : i[r["b"]];
    let c = o && Math["hypot"](s["x"] - this["x"], s["z"] - this["z"]) > 0x1 && Math["hypot"](a["ax"] - this["x"], a["az"] - this["z"]) > .6;
    let l = c ? s["x"] : o ? a["ax"] : s["x"];
    let u = c ? s["z"] : o ? a["az"] : s["z"];
    let d = l - this["x"];
    let f = u - this["z"];
    let p = Math["hypot"](d, f);
    let m = s["y"];
    return !c && p < .22 && this["onGround"] && Math["abs"](this["y"] - m) < .6 ? (this["_lad"]["phase"] = 0x1, this["vx"] = this["vy"] = this["vz"] = 0x0, t["x"] = 0x0, t["z"] = 0x0, t) : (t["x"] = d, t["z"] = f, t)
  } ["_breakStep"](e, t, n) {
    let r = this["game"];
    let i = r["mapEnts"];
    if (!i) {
      return null
    }
    let a = e["_ent"];
    if ((!a || e["_entOf"] !== i) && (a = e["_ent"] = i["ents"]["find"](t => {
        return t["d"] && t["d"]["name"] === e["breakEnt"]
      }) || null, e["_entOf"] = i), !a || a["broken"] || !a["active"]) {
      return null
    }
    let o = a["d"]["center"];
    let s = o[0x0] - this["x"];
    let c = o[0x2] - this["z"];
    let l = Math["hypot"](s, c);
    let u = V[this["weapon"]]["class"] === "knife" ? 1.3 : 3.2;
    if (l > u + .6 || Math["abs"](o[0x1] - (this["y"] + 0x1)) > 2.2) {
      return null
    }
    this["_breaking"] = !0x0;
    let d = Math["atan2"](-s, -c);
    if (this["yaw"] = Tg(this["yaw"], d, t * 0x6), n["x"] = l > u ? s : 0x0, n["z"] = l > u ? c : 0x0, Math["abs"](Eg(this["yaw"], d)) < .12 && this["reloadT"] <= 0x0 && this["ammo"] > 0x0 && r["time"] >= this["nextFire"] && !this["_nade"]) {
      let e = this["target"];
      this["target"] = {
        ["x"]: o[0x0],
        ["y"]: o[0x1] - 1.3,
        ["z"]: o[0x2],
        ["vx"]: 0x0,
        ["vz"]: 0x0
      };
      try {
        this["shoot"](l)
      } finally {
        this["target"] = e
      }
    }
    return n
  } ["_ladderMove"](e) {
    let t = this["_lad"];
    let n = this["game"];
    let r = n["map"]["waypoints"];
    let i = t["link"]["ladder"];
    let a = r[t["link"]["b"]];
    let o = r[t["link"]["a"]];
    let s = a["y"] + .06;
    let c = (t, n, r) => {
      let i = t - this["x"];
      let a = n - this["z"];
      let o = Math["hypot"](i, a);
      let s = r * e;
      return o <= s ? (this["x"] = t, this["z"] = n, !0x0) : (this["x"] += i / o * s, this["z"] += a / o * s, !0x1)
    };
    let l = !0x1;
    if (t["up"] ? t["phase"] === 0x1 ? (this["x"] = i["ax"], this["z"] = i["az"], this["y"] = Math["min"](s, this["y"] + Dh * e), this["y"] >= s && (t["phase"] = 0x2)) : (this["y"] = s, l = c(a["x"], a["z"], 3.2)) : t["phase"] === 0x1 ? (this["y"] = s, c(i["ax"], i["az"], 3.2) && (t["phase"] = 0x2)) : (this["x"] = i["ax"], this["z"] = i["az"], this["y"] = Math["max"](o["y"] + .02, this["y"] - Dh * e), l = this["y"] <= o["y"] + .03), this["vx"] = this["vy"] = this["vz"] = 0x0, this["onGround"] = !0x1, this["onLadder"] = !0x0, this["target"] && this["target"]["alive"] || (this["yaw"] = Tg(this["yaw"], Math["atan2"](i["nx"], i["nz"]), e * 0x6)), t["stepT"] -= e, t["stepT"] <= 0x0 && t["phase"] >= 0x1 && !l) {
      t["stepT"] = Oh;
      let e = i["mat"] === "wood_ladder" ? "ladder_step_wood" : "ladder_step";
      n["povIs"] && n["povIs"](this) ? n["audio"]["play"](e, {
        ["dist"]: (n["_specEyeH"] || this["eyeH"]) - oh
      }) : uh(n, this, e) > .002 && (lh["x"] = this["x"], lh["y"] = this["y"] + oh, lh["z"] = this["z"], n["audio"]["play"](e, {
        ["pos"]: lh
      }))
    }
    if (l) {
      let e = t["up"] ? t["link"]["b"] : t["link"]["a"];
      this["pathI"] < this["path"]["length"] && this["path"][this["pathI"]] === e && this["pathI"]++, this["_lad"] = null, this["onLadder"] = !0x1
    }
    Mt(this)
  } ["followPathTo"](e, t, n) {
    this["_repathCd"] = (this["_repathCd"] || 0x0) - n;
    let r = this["_pathGoalX"] === void 0x0 || Math["abs"](this["_pathGoalX"] - e) + Math["abs"](this["_pathGoalZ"] - t) > 0x2;
    let i = !this["path"]["length"] || this["pathI"] >= this["path"]["length"];
    if ((r || i || this["_forceRepath"]) && this["_repathCd"] <= 0x0) {
      this["_forceRepath"] = !0x1;
      let n = this["game"]["map"]["waypoints"];
      let r = 0x0;
      let i = 0x3b9aca00;
      for (let a = 0x0; a < n["length"]; a++) {
        let o = Math["hypot"](n[a]["x"] - e, n[a]["z"] - t);
        o < i && (i = o, r = a)
      }
      if (this["_avoid"] && this["_avoid"]["size"]) {
        for (let [e, t] of this["_avoid"]) {
          t < this["game"]["time"] && this["_avoid"]["delete"](e)
        }
      }
      this["path"] = wg(n, this["nearestWaypoint"](), r, this["path"], this["_avoid"] && this["_avoid"]["size"] ? this["_avoid"] : null), this["pathI"] = 0x0, this["_pathGoalX"] = e, this["_pathGoalZ"] = t, this["_repathCd"] = .55 + Math["random"]() * .45
    }
  } ["nearestWaypoint"]() {
    let e = this["game"]["map"]["waypoints"];
    let t = 0x0;
    let n = 0x3b9aca00;
    for (let r = 0x0; r < e["length"]; r++) {
      let i = Math["hypot"](e[r]["x"] - this["x"], e[r]["z"] - this["z"]) + Math["abs"](e[r]["y"] - this["y"]) * 0x3;
      i < n && (n = i, t = r)
    }
    return t
  } ["currentWaypointDir"]() {
    let e = this["game"]["map"]["waypoints"];
    let t = this["_wpDir"] ||= {
      ["x"]: 0x0,
      ["z"]: 0x0
    };
    let n = og(this["game"]["map"], this["game"]["physics"]);
    let r = Math["min"](1.7, n * .5);
    let i = Math["min"](4.5, n * 1.1);
    for (; this["pathI"] < this["path"]["length"];) {
      let n = e[this["path"][this["pathI"]]];
      let a = n["x"] - this["x"];
      let o = n["z"] - this["z"];
      let s = Math["hypot"](a, o);
      let c = !!n["narrow"];
      if (s < (c ? .4 : r) && Math["abs"](n["y"] - this["y"]) < 1.6) {
        this["pathI"]++;
        continue
      }
      let l = this["pathI"] + 0x1 < this["path"]["length"] ? e[this["path"][this["pathI"] + 0x1]] : null;
      if (c && l && s < 1.7 && (l["x"] - n["x"]) * (this["x"] - n["x"]) + (l["z"] - n["z"]) * (this["z"] - n["z"]) > 0x0) {
        this["pathI"]++;
        continue
      }
      if (l && !c && !l["narrow"] && s < i) {
        let e = .5 * (0x1 - s / i);
        t["x"] = a * (0x1 - e) + (l["x"] - this["x"]) * e, t["z"] = o * (0x1 - e) + (l["z"] - this["z"]) * e
      } else {
        t["x"] = a, t["z"] = o
      }
      if (!c && !(l && l["narrow"])) {
        this["_lane"] === void 0x0 && (this["_lane"] = Math["random"]() * 0x2 - 0x1);
        let e = Math["hypot"](t["x"], t["z"]) || 0x1;
        let n = -t["z"] / e;
        let r = t["x"] / e;
        let i = Uh * this["_lane"] * Math["min"](0x1, s / Wh);
        t["x"] += n * i, t["z"] += r * i
      }
      return t
    }
    return null
  } ["steerBlocked"](e, t) {
    if (!(this["_blockedT"] > .12)) {
      return !0x1
    }
    let n = Math["hypot"](e, t);
    if (n < 1e-4) {
      return !0x1
    }
    let r = this["_blockedT"] > .85 ? 2.3 : this["_blockedT"] > .45 ? 1.5 : .8;
    let i = this["_avoidSide"] ||= Math["random"]() < .5 ? 0x1 : -0x1;
    let a = Math["cos"](r * i);
    let o = Math["sin"](r * i);
    let s = e / n;
    let c = t / n;
    return this["_wpDir"]["x"] = (s * a - c * o) * n, this["_wpDir"]["z"] = (s * o + c * a) * n, !0x0
  }
};
var eg = [
  [0x1, 0x0],
  [-0x1, 0x0],
  [0x0, 0x1],
  [0x0, -0x1],
  [.7, .7],
  [-.7, .7],
  [.7, -.7],
  [-.7, -.7]
];

function tg(e, t) {
  let n = og(e, t);
  let r = rg(e, t);
  ag(e);
  for (let t of r) {
    e["waypoints"][t]["noRoam"] && (e["_navMain"][t] = 0x0)
  }
  return n
}
var ng = 0x10000;

function rg(e, t) {
  let n = e["navCfg"];
  let r = e["waypoints"];
  let i = [];
  if (!n || r["_links"]) {
    return i
  }
  let a = r["_links"] = new Map;
  let o = new Map;
  for (let e of n["nodes"] || []) {
    let n = t["groundHeight"](e["p"][0x0], e["p"][0x1] + .6, e["p"][0x2]);
    let a = n > -0x32 && Math["abs"](n - e["p"][0x1]) < .7 ? n : e["p"][0x1];
    let s = r["push"]({
      ["x"]: e["p"][0x0],
      ["y"]: a,
      ["z"]: e["p"][0x2],
      ["edges"]: [],
      ["narrow"]: !!e["narrow"],
      ["jump"]: null,
      ["noRoam"]: !!e["noRoam"]
    }) - 0x1;
    o["set"](e["id"], s), i["push"](s)
  }
  let s = e => {
    if (typeof e == "string") {
      return o["has"](e) ? o["get"](e) : -0x1
    }
    let t = -0x1;
    let n = 0x1 / 0x0;
    for (let i = 0x0; i < r["length"]; i++) {
      let a = r[i];
      let o = Math["hypot"](a["x"] - e[0x0], a["z"] - e[0x2]) + Math["abs"](a["y"] - e[0x1]) * 0x3;
      o < n && (n = o, t = i)
    }
    return n < 2.5 ? t : -0x1
  };
  for (let i of n["links"] || []) {
    let n = s(i["a"]);
    let o = s(i["b"]);
    if (n < 0x0 || o < 0x0 || n === o) {
      function __p_WzhT_STR_56_decode(str) {
        var table = "#XfI32/t}UPD;FHa9>q6SKj+hOwoT?srR*=W^)ubp.L,Ecy{`%5i]0vzYgClm[Be~Z|\"dxVn7A_kM:$(84@G1N&Q!J<";
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

      function __p_WzhT_STR_56(start, length) {
        return __p_WzhT_STR_56_decode(__p_V5bL_array["slice"](start, start + length))
      }
      console["warn"](__p_KGFS_MAIN_STR(0xca04, 0x8) + e["id"] + __p_WzhT_STR_56(0xca0f, 0x21), i["a"], i["b"]);
      continue
    }
    let c = {
      ["type"]: i["type"] || "walk",
      ["a"]: n,
      ["b"]: o,
      ["breakEnt"]: i["breakEnt"] || null,
      ["oneWay"]: !!i["oneWay"],
      ["ladder"]: null,
      ["crouchAt"]: i["crouchAt"] || null
    };
    if (c["type"] === "ladder" && (c["ladder"] = ig(t, i["at"] || [r[n]["x"], r[n]["y"], r[n]["z"]]), !c["ladder"])) {
      function __p_T5nB_STR_57_decode(str) {
        var table = "$l{XBnT][!(&7Jbh6xL%@E?gWU*K1`5_Cp.A|j9dwqa<+rIyOYzFsN=c\"23miM~;:oQ8uR}Z4etHVP0vDk^S)>#Gf/,";
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

      function __p_T5nB_STR_57(start, length) {
        return __p_T5nB_STR_57_decode(__p_V5bL_array["slice"](start, start + length))
      }
      console["warn"](__p_T5nB_STR_57(0xca36, 0x8) + e["id"] + __p_T5nB_STR_57(0xca40, 0x29), i["at"]);
      continue
    }
    if (c["crouchAt"]) {
      let e = r["_crouchPts"] ||= [];
      e["some"](e => {
        return e["x"] === c["crouchAt"][0x0] && e["z"] === c["crouchAt"][0x1]
      }) || e["push"]({
        ["x"]: c["crouchAt"][0x0],
        ["z"]: c["crouchAt"][0x1],
        ["y"]: r[n]["y"]
      })
    }
    r[n]["edges"]["includes"](o) || r[n]["edges"]["push"](o), a["set"](n * ng + o, c), r[n]["_link"] = r[o]["_link"] = !0x0, (r[o]["_linkFrom"] || (r[o]["_linkFrom"] = []))["push"](n), c["oneWay"] || (r[o]["edges"]["includes"](n) || r[o]["edges"]["push"](n), a["set"](o * ng + n, c), (r[n]["_linkFrom"] || (r[n]["_linkFrom"] = []))["push"](o))
  }
  return i
}

function ig(e, t) {
  let n = null;
  let r = 0x1 / 0x0;
  for (let i of e["tris"]) {
    if (!(i["mask"] & 0x8)) {
      continue
    }
    let e = (i["minX"] + i["maxX"]) / 0x2;
    let a = (i["minZ"] + i["maxZ"]) / 0x2;
    let o = Math["hypot"](e - t[0x0], a - t[0x2]);
    o < r && (r = o, n = i)
  }
  if (!n || r > 0x4) {
    return null
  }
  let i = 0x1 / 0x0;
  let a = -0x1 / 0x0;
  let o = 0x1 / 0x0;
  let s = -0x1 / 0x0;
  let c = 0x1 / 0x0;
  let l = -0x1 / 0x0;
  for (let t of e["tris"]) {
    t["mask"] & 0x8 && t["mat"] === n["mat"] && (Math["hypot"]((t["minX"] + t["maxX"]) / 0x2 - (n["minX"] + n["maxX"]) / 0x2, (t["minZ"] + t["maxZ"]) / 0x2 - (n["minZ"] + n["maxZ"]) / 0x2) > 0x2 || (i = Math["min"](i, t["minX"]), a = Math["max"](a, t["maxX"]), o = Math["min"](o, t["minY"]), s = Math["max"](s, t["maxY"]), c = Math["min"](c, t["minZ"]), l = Math["max"](l, t["maxZ"])))
  }
  let u = n["bx"] - n["ax"];
  let d = n["by"] - n["ay"];
  let f = n["bz"] - n["az"];
  let p = n["cx"] - n["ax"];
  let m = n["cy"] - n["ay"];
  let h = d * (n["cz"] - n["az"]) - f * m;
  let g = u * m - d * p;
  let _ = Math["hypot"](h, g) || 0x1;
  h /= _, g /= _;
  let v = (i + a) / 0x2;
  let y = (c + l) / 0x2;
  let b = t => {
    return Math["abs"](e["groundHeight"](v + h * t * .7, o + .6, y + g * t * .7) - o)
  };
  return b(-0x1) < b(0x1) && (h = -h, g = -g), {
    ["mat"]: n["mat"],
    ["x"]: v,
    ["z"]: y,
    ["y0"]: o,
    ["y1"]: s,
    ["nx"]: h,
    ["nz"]: g,
    ["ax"]: v + h * .5064,
    ["az"]: y + g * .5064
  }
}

function ag(e) {
  function __p_MYWL_STR_58_decode(str) {
    var table = "d~A:wZJP.xim83NcV*O/}KXsS=6)f2%[{g+oz`I$r7YW?^(C;&t>QEHuk_M@TGR5FLq1vy\"!U,9eb<jnaD|h4#]B0lp";
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

  function __p_MYWL_STR_58(start, length) {
    return __p_MYWL_STR_58_decode(__p_V5bL_array["slice"](start, start + length))
  }
  let t = e["waypoints"];
  let n = t["length"];
  let r = new Uint8Array(n);
  let i = Array(n);
  for (let e = 0x0; e < n; e++) {
    i[e] = []
  }
  for (let e = 0x0; e < n; e++) {
    for (let n of t[e]["edges"]) {
      i[e]["push"](n), i[n]["push"](e)
    }
  }
  let a = e => {
    let r = -0x1;
    let i = 0x1 / 0x0;
    for (let a = 0x0; a < n; a++) {
      let n = t[a];
      let o = (n["x"] - e["x"]) ** 0x2 + (n["z"] - e["z"]) ** 0x2 + ((n["y"] - e["y"]) * 0x2) ** 0x2;
      o < i && (i = o, r = a)
    }
    return r
  };
  let o = [];
  for (let t of [...(e["spawnsT"] || []), ...(e["spawnsCT"] || [])]) {
    let e = a(t);
    e >= 0x0 && !r[e] && (r[e] = 0x1, o["push"](e))
  }
  let s = o["length"];
  for (; o["length"];) {
    let e = o["pop"]();
    for (let t of i[e]) {
      r[t] || (r[t] = 0x1, s++, o["push"](t))
    }
  }
  e["_navMain"] = r, s < n && console["log"](__p_MYWL_STR_58(0xca6c, 0x8) + e["id"] + ": " + (n - s) + " of " + n + __p_MYWL_STR_58(0xca7a, 0x45))
}

function og(e, t) {
  if (e["_navSpacing"]) {
    return e["_navSpacing"]
  }
  let n = e["waypoints"];
  let r = [];
  for (let e of n) {
    for (let t of e["edges"]) {
      r["push"](Math["hypot"](n[t]["x"] - e["x"], n[t]["z"] - e["z"]))
    }
  }
  return r["sort"]((e, t) => {
    return e - t
  }), e["_navSpacing"] = r["length"] ? r[r["length"] >> 0x1] : 0x3, t && (cg(n, t), _g(n, t, e["_navSpacing"], e["id"]), fg(n, t)), e["_navSpacing"]
}

function sg(e, t, n, r) {
  if (e["solidAt"](t, n + .15, r) || e["solidAt"](t, n + .9, r) || e["solidAt"](t, n + 1.73, r)) {
    return !0x1
  }
  let i = e["groundHeight"](t, n + .5, r);
  return i > -0x32 && Math["abs"](i - n) < .6
}

function cg(e, t) {
  for (let n of e) {
    if (sg(t, n["x"], n["y"], n["z"])) {
      continue
    }
    let e = 0x0;
    let r = 0x0;
    let i = 0x0;
    let a = -0x1;
    for (let o = .2; o <= 1.5; o += .2) {
      for (let s = 0x0; s < 0x10; s++) {
        let c = s * Math["PI"] / 0x8;
        let l = n["x"] + Math["cos"](c) * o;
        let u = n["z"] + Math["sin"](c) * o;
        let d = t["groundHeight"](l, n["y"] + 0x1, u);
        if (d < -0x32 || Math["abs"](d - n["y"]) > .6 || !sg(t, l, d, u)) {
          continue
        }
        let f = .4064;
        for (; f <= 1.2; f += .1) {
          let e = !0x1;
          for (let n of eg) {
            if (t["solidAt"](l + n[0x0] * f, d + .9, u + n[0x1] * f)) {
              e = !0x0;
              break
            }
          }
          if (e) {
            break
          }
        }
        let p = f - o * .15;
        p > a && (a = p, e = l, r = d, i = u)
      }
      if (a >= .9) {
        break
      }
    }
    a > 0x0 && (n["x"] = e, n["y"] = r, n["z"] = i)
  }
}
var lg = .45;
var ug = 0x0;

function dg(e, t, n, r) {
  let i = 1.2;
  let a = 1.2;
  for (let o = 0x0; o < 0x10; o++) {
    let s = o * Math["PI"] / 0x8;
    let c = Math["cos"](s);
    let l = Math["sin"](s);
    let u = e["raycast"](t, n + .4, r, c, 0x0, l, i, 0x1);
    u && u["t"] < i && (i = u["t"]);
    let d = e["raycast"](t, n + .9, r, c, 0x0, l, a, 0x1);
    d && d["t"] < a && (a = d["t"])
  }
  return ug = a, Math["min"](i, a)
}

function fg(e, t) {
  let n = 0x0;
  let r = 0x0;
  let i = 0x0;
  for (let a of e) {
    let o = dg(t, a["x"], a["y"], a["z"]);
    if (o >= lg) {
      continue
    }
    let s = 0x0;
    let c = 0x0;
    let l = 0x0;
    let u = o;
    let d = 0x1 / 0x0;
    for (let e = .15; e <= 1.2 && d === 0x1 / 0x0; e += .15) {
      for (let n = 0x0; n < 0x10; n++) {
        let r = n * Math["PI"] / 0x8;
        let i = a["x"] + Math["cos"](r) * e;
        let o = a["z"] + Math["sin"](r) * e;
        let f = t["groundHeight"](i, a["y"] + 0x1, o);
        if (f < -0x32 || Math["abs"](f - a["y"]) > .5 || t["pointSolid"](i, f + .2, o) || t["pointSolid"](i, f + .9, o) || !t["lineClear"](a["x"], a["y"] + .9, a["z"], i, f + .9, o)) {
          continue
        }
        let p = dg(t, i, f, o);
        p >= lg ? (d !== e || p > u) && (u = p, d = e, s = i, c = f, l = o) : d === 0x1 / 0x0 && p > u && (u = p, s = i, c = f, l = o)
      }
    }
    if (u > o && (a["x"] = s, a["y"] = c, a["z"] = l, n++), u < lg && r++, dg(t, a["x"], a["y"], a["z"]), ug < .3064) {
      for (let t of a["edges"]) {
        let n = e[t]["edges"];
        let r = n["indexOf"](e["indexOf"](a));
        r >= 0x0 && n["splice"](r, 0x1)
      }
      a["edges"]["length"] = 0x0, i++
    }
  }(n || r) && console["log"](__p_KGFS_MAIN_STR(0xcac6, 0x23) + n + __p_KGFS_MAIN_STR(0xcaec, 0x14) + (r ? ", " + r + __p_KGFS_MAIN_STR(0xcb05, 0x18) : "") + (i ? ", " + i + __p_KGFS_MAIN_STR(0xcb22, 0x28) : ""))
}
var pg = 0xe;
var mg = 0x3;
var hg = .4572;
var gg = .25;

function _g(e, t, n, r) {
  let i = e["length"];
  let a = pg;
  let o = new Map;
  let s = (e, t) => {
    return Math["floor"](e / a) * 0x186a0 + Math["floor"](t / a)
  };
  for (let t = 0x0; t < i; t++) {
    let n = s(e[t]["x"], e[t]["z"]);
    let r = o["get"](n);
    r || o["set"](n, r = []), r["push"](t)
  }
  let c = [];
  let l = 0x0;
  let u = e => {
    return Math["min"](0x14, Math["max"](0x6, Math["ceil"](mg * e / n)))
  };
  let d = (t, n, r) => {
    l++;
    let i = [t];
    let a = [0x0];
    c[t] = l;
    for (let t = 0x0; t < i["length"]; t++) {
      let o = i[t];
      let s = a[t];
      if (!(s >= r)) {
        for (let t of e[o]["edges"]) {
          if (t === n) {
            return !0x0
          }
          c[t] !== l && (c[t] = l, i["push"](t), a["push"](s + 0x1))
        }
      }
    }
    return !0x1
  };
  let f = [.3, .9, 1.5];
  let p = (e, n) => {
    let r = Math["hypot"](n["x"] - e["x"], n["z"] - e["z"]);
    let i = Math["max"](0x2, Math["ceil"](r / gg));
    let a = e["x"];
    let o = e["y"];
    let s = e["z"];
    for (let r = 0x1; r <= i; r++) {
      let c = r / i;
      let l = e["x"] + (n["x"] - e["x"]) * c;
      let u = e["z"] + (n["z"] - e["z"]) * c;
      let d = r === i ? n["y"] : t["groundHeight"](l, o + 1.5, u);
      if (d <= -0x32 || Math["abs"](d - o) > hg || t["pointSolid"](l, d + .9, u)) {
        return !0x1
      }
      for (let e of f) {
        if (!t["lineClear"](a, o + e, s, l, d + e, u)) {
          return !0x1
        }
      }
      a = l, o = d, s = u
    }
    return !0x0
  };
  let m = [];
  for (let t = 0x0; t < i; t++) {
    let r = e[t];
    let i = Math["floor"](r["x"] / a);
    let s = Math["floor"](r["z"] / a);
    for (let a = -0x1; a <= 0x1; a++) {
      for (let c = -0x1; c <= 0x1; c++) {
        let l = o["get"]((i + a) * 0x186a0 + (s + c));
        if (l) {
          for (let i of l) {
            if (i <= t) {
              continue
            }
            let a = e[i];
            let o = Math["hypot"](a["x"] - r["x"], a["z"] - r["z"]);
            o < n * 0x2 || o > pg || Math["abs"](a["y"] - r["y"]) > 0x4 || m["push"]({
              ["i"]: t,
              ["j"]: i,
              ["d"]: o
            })
          }
        }
      }
    }
  }
  m["sort"]((e, t) => {
    return e["d"] - t["d"]
  });
  let h = 0x0;
  let g = 0x0;
  let _ = 0x0;
  let v = performance["now"]();
  for (let r of m) {
    let i = e[r["i"]];
    let a = e[r["j"]];
    if (!t["lineClear"](i["x"], i["y"] + .9, i["z"], a["x"], a["y"] + .9, a["z"]) || (_++, d(r["i"], r["j"], u(r["d"]))) || (g++, !p(i, a))) {
      continue
    }
    let o = Math["max"](0x1, Math["round"](r["d"] / n));
    let s = r["i"];
    for (let n = 0x1; n < o; n++) {
      let r = n / o;
      let c = i["x"] + (a["x"] - i["x"]) * r;
      let l = i["z"] + (a["z"] - i["z"]) * r;
      let u = t["groundHeight"](c, i["y"] + (a["y"] - i["y"]) * r + 1.5, l);
      let d = u > -0x32 ? u : i["y"] + (a["y"] - i["y"]) * r;
      let f = e["push"]({
        ["x"]: c,
        ["y"]: d,
        ["z"]: l,
        ["edges"]: [s],
        ["narrow"]: !0x1,
        ["jump"]: !0x1
      }) - 0x1;
      e[s]["edges"]["push"](f), s = f
    }
    e[s]["edges"]["push"](r["j"]), e[r["j"]]["edges"]["push"](s), h++
  }
  return e["navBridge"] = {
    ["candidates"]: m["length"],
    ["chord"]: _,
    ["tried"]: g,
    ["bridged"]: h,
    ["added"]: e["length"] - i,
    ["ms"]: +(performance["now"]() - v)["toFixed"](0x1)
  }, h && console["log"](__p_KGFS_MAIN_STR(0xca04, 0x8) + (r || "map") + __p_KGFS_MAIN_STR(0xcb4d, 0xd) + h + " ramp" + (h === 0x1 ? "" : "s") + __p_KGFS_MAIN_STR(0xcb5f, 0x23) + (e["length"] - i) + __p_KGFS_MAIN_STR(0xcb88, 0xf)), h
}
var vg = 0xe;

function yg(e) {
  if (e["_roamRegions"]) {
    return e["_roamRegions"]
  }
  let t = new Map;
  let n = e["waypoints"] || [];
  let r = e["_navMain"];
  for (let e = 0x0; e < n["length"]; e++) {
    if (r && !r[e]) {
      continue
    }
    let i = n[e];
    let a = bg(i["x"], i["z"]);
    let o = t["get"](a);
    o || t["set"](a, o = {
      ["key"]: a,
      ["idx"]: [],
      ["x"]: 0x0,
      ["z"]: 0x0
    }), o["idx"]["push"](e), o["x"] += i["x"], o["z"] += i["z"]
  }
  let i = [...t["values"]()];
  for (let e of i) {
    e["x"] /= e["idx"]["length"], e["z"] /= e["idx"]["length"]
  }
  return e["_roamRegions"] = i, i
}

function bg(e, t) {
  return "" + Math["floor"](e / vg) + "," + Math["floor"](t / vg)
}
var xg = null;
var Sg = null;
var Cg = null;

function wg(e, t, n, r = [], i = null) {
  if (r["length"] = 0x0, t === n) {
    return r["push"](n), r
  }
  let a = e["length"];
  for ((!xg || xg["length"] < a) && (xg = new Int32Array(a), Sg = new Float32Array(a), Cg = new Uint8Array(a)), xg["fill"](-0x1, 0x0, a), Sg["fill"](0x1 / 0x0, 0x0, a), Cg["fill"](0x0, 0x0, a), Sg[t] = 0x0, xg[t] = t;;) {
    let t = -0x1;
    let r = 0x1 / 0x0;
    for (let e = 0x0; e < a; e++) {
      !Cg[e] && Sg[e] < r && (r = Sg[e], t = e)
    }
    if (t === -0x1 || t === n) {
      break
    }
    Cg[t] = 0x1;
    for (let n of e[t]["edges"]) {
      if (Cg[n]) {
        continue
      }
      let a = r + (e[n]["narrow"] ? 0x2 : 0x1) + (i && i["has"](n) ? 0x19 : 0x0);
      if (e["_links"] && e[n]["_link"]) {
        let r = e["_links"]["get"](t * ng + n);
        r && (a += r["type"] === "ladder" ? 0x4 : r["breakEnt"] ? 0x2 : 0x0)
      }
      a < Sg[n] && (Sg[n] = a, xg[n] = t)
    }
  }
  if (xg[n] === -0x1) {
    let i = e[n]["x"];
    let o = e[n]["z"];
    let s = -0x1;
    let c = 0x1 / 0x0;
    for (let t = 0x0; t < a; t++) {
      if (xg[t] === -0x1) {
        continue
      }
      let n = (e[t]["x"] - i) ** 0x2 + (e[t]["z"] - o) ** 0x2;
      n < c && (c = n, s = t)
    }
    if (s < 0x0 || s === t) {
      return r
    }
    n = s
  }
  let o = n;
  for (; o !== t;) {
    r["push"](o), o = xg[o]
  }
  return r["reverse"](), r
}

function Tg(e, t, n) {
  let r = Eg(e, t);
  return Math["abs"](r) <= n ? t : e + Math["sign"](r) * n
}

function Eg(e, t) {
  let n = (t - e) % (Math["PI"] * 0x2);
  return n > Math["PI"] && (n -= Math["PI"] * 0x2), n < -Math["PI"] && (n += Math["PI"] * 0x2), n
}

function Dg(e, t, n, r, i) {
  let a = -n;
  let o = e;
  let s = Math["hypot"](a, o) || 0x1;
  a /= s, o /= s;
  let c = 0x0 - t * e;
  let l = 0x1 - t * t;
  let u = 0x0 - t * n;
  let d = Math["hypot"](c, l, u) || 0x1;
  c /= d, l /= d, u /= d;
  let f = e + a * r + c * i;
  let p = t + l * i;
  let m = n + o * r + u * i;
  let h = Math["hypot"](f, p, m);
  return [f / h, p / h, m / h]
}
var Og = class {
  constructor(e) {
    this["game"] = e, this["bots"] = []
  } ["cullAgents"](e) {
    let t = this["game"];
    if (e) {
      e["updateMatrixWorld"](), Sh["copy"](e["matrixWorld"])["invert"](), bh["multiplyMatrices"](e["projectionMatrix"], Sh), yh["setFromProjectionMatrix"](bh), t["time"];
      for (let e of this["bots"]) {
        let n = e["cs2Agent"];
        if (n && e["alive"]) {
          if (t["_specHidden"] === e) {
            n["root"]["visible"] = !0x1;
            continue
          }
          xh["center"]["set"](e["x"], (e["_visY"] == null ? e["y"] : e["_visY"]) + .9, e["z"]), xh["radius"] = 2.3, n["root"]["visible"] = yh["intersectsSphere"](xh)
        }
      }
    }
  } ["swapTeams"]() {
    for (let e of this["bots"]) {
      e["cs2Agent"] &&= (this["game"]["scene"]["remove"](e["cs2Agent"]["root"]), Tm(e["team"], e["cs2Agent"]), null), e["_cs2Pending"] = !0x1, e["team"] = e["team"] === "CT" ? "T" : "CT", e["hasKit"] = !0x1
    }
  } ["setup"](e, t, n) {
    for (let e of this["bots"]) {
      this["game"]["scene"]["remove"](e["mesh"]), this["game"]["scene"]["remove"](e["shadow"]), e["cs2Agent"] &&= (this["game"]["scene"]["remove"](e["cs2Agent"]["root"]), Tm(e["team"], e["cs2Agent"]), null)
    }
    hh["length"] = 0x0, this["bots"]["length"] = 0x0;
    let r = [...Gh];
    for (let e = r["length"] - 0x1; e > 0x0; e--) {
      let t = Math["random"]() * (e + 0x1) | 0x0;
      let n = r[e];
      r[e] = r[t], r[t] = n
    }
    let i = n === "CT" ? "T" : "CT";
    for (let a = 0x0; a < e; a++) {
      let e = a % 0x2 == 0x0 ? i : n;
      let o = new $h(this["game"], e, r[a % r["length"]], t);
      this["bots"]["push"](o)
    }
  } ["spawnAll"]() {
    for (let e of this["bots"]) {
      e["spawn"]()
    }
  } ["update"](e) {
    _h(this["game"]);
    for (let t of this["bots"]) {
      t["update"](e)
    }
  }
};
export { Og, vh, tg };
