// HUD (in-game interface), split verbatim from main.js (no logic changes).
// Contains the Nv HUD class: crosshair mount (via pcrossair.js - the crosshair
// system itself stays fully independent in pcrossair.js), hitmarker, scope
// overlay, radar, killfeed, buy menu, pause/settings menus, scoreboard, cases UI.
// Engine-side bindings are imported from main.js (circular import is safe: all
// main.js bindings are referenced only at runtime, never during module evaluation).
import { a as ct, n as ft, s as ht, t as gt } from "./data-BdgATJBp.js";
import { applySniperWidth, buildCrosshair, updateCrosshair, xhairHitEnabled } from "./pcrossair.js";
import { A as t, A as mmCyl, H as mmGroup, Ht as mmVec, it as mmBasic, kt as mmSphere, rt as mmMesh, ct as mmStdMat } from "./three-B50Y55N1.js";
import { initMultiplayer, requestMatch } from "./netcode.js";
import { MARKET_CASES, UNIKEY, MARKET_PRICE } from "./marketplace.js";
import { onGameShot } from "./pviewmodel.js";
import { rayPointDist, WS_BASE } from "./shared.js";
import { $m, Ar, Av, Ba, Bm, Cr, Cs, Cv, Dr, Dv, Er, Ev, Fm, Fu, Gm, H, Iu, Km, Lu, Mo, Mu, Mv, Nm, Nu, Ov, Pu, Qg, Ru, Sv, Tm, Tr, Tv, Um, V, V_, Va, Xm, Z, __p_KGFS_MAIN_STR, __p_V5bL_array, __p_nino_bufferToString, _s, as, br, bv, eh, gs, ju, jv, kr, ku, kv, ps, qm, th, wm, wv, xr, xv, yr, ys, zm } from "./main.js";

var Nv = class e {
  constructor(e) {
    this["game"] = e, this["dtEMA"] = 0x1 / 0x3c, this["fpsT"] = 0x0, this["hitT"] = 0x0, this["dmgT"] = 0x0, this["buyOpen"] = !0x1, this["scoreOpen"] = !0x1, this["forceScoreT"] = 0x0, this["build"]()
  } ["build"]() {
    function __p_DWtt_STR_66_decode(str) {
      var table = "?1OonKN_r&}m5HYfs@[2v{F^P6ER*JS\">h`M~Z|ix,]37W)L9+.Du(%gw<QCbU$!pTIzXB=e4aVkl8;:#d/GqyAjc0t";
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

    function __p_DWtt_STR_66(start, length) {
      return __p_DWtt_STR_66_decode(__p_V5bL_array["slice"](start, start + length))
    }
    let e = Z("div", "hud");
    this["root"] = e;
    let t = buildCrosshair(Z, e, this);
    let n = Z("div", "hitmarkwrap", e);
    this["hmWrap"] = n;
    let r = Z("div", "hitmark", n);
    for (let e = 0x0; e < 0x4; e++) {
      Z("div", null, r, "hm hm" + e)
    }
    let i = document["createElement"]("style");
    i["textContent"] = __p_DWtt_STR_66(0xe30a, 0x65), document["head"]["appendChild"](i);
    let a = Z("div", "cs2bottom", e);
    a["className"] = "cs2bt";
    let o = (e, t) => {
      function __p_87gB_STR_67_decode(str) {
        var table = "Cm0`r].Gh^x)ONtw(Kil;,jq$an&e<|2T:+d6\"/gc}fP%!{7Xs9_b[~o8*k>vSDWE=IUuBQR?4VAF@H#Z1yLJpYzM35";
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

      function __p_87gB_STR_67(start, length) {
        return __p_87gB_STR_67_decode(__p_V5bL_array["slice"](start, start + length))
      }
      return __p_87gB_STR_67(0xe374, 0x17) + t + __p_87gB_STR_67(0xe38d, 0x22) + jv(e) + __p_87gB_STR_67(0xe3b3, 0xb)
    };
    a["innerHTML"] = __p_DWtt_STR_66(0xe3c2, 0x249) + o(__p_DWtt_STR_66(0xe60f, 0xf), __p_DWtt_STR_66(0xe625, 0x3b)) + o(__p_DWtt_STR_66(0xe666, 0x10), __p_DWtt_STR_66(0xe67d, 0x3d)) + __p_DWtt_STR_66(0xe6c1, 0x1cf) + o(__p_DWtt_STR_66(0xe893, 0x12), __p_DWtt_STR_66(0xe8a8, 0x45)) + o(__p_DWtt_STR_66(0xe8f1, 0x10), __p_DWtt_STR_66(0xe904, 0x43)) + __p_DWtt_STR_66(0xe947, 0x362) + o(__p_DWtt_STR_66(0xecae, 0x10), __p_DWtt_STR_66(0xecc2, 0x45)) + __p_DWtt_STR_66(0xed0a, 0x25), this["btEl"] = a, this["hpEl"] = a["querySelector"](__p_DWtt_STR_66(0xed32, 0x1a)), this["hpBarEl"] = a["querySelector"](__p_DWtt_STR_66(0xed4f, 0x23)), this["armorEl"] = a["querySelector"](__p_DWtt_STR_66(0xed76, 0x18)), this["armorWrap"] = a["querySelector"](__p_DWtt_STR_66(0xed96, 0x10)), this["ammoEl"] = a["querySelector"](__p_DWtt_STR_66(0xedab, 0x19)), this["reserveEl"] = a["querySelector"](__p_DWtt_STR_66(0xedcb, 0x23)), this["magIconEl"] = a["querySelector"](__p_DWtt_STR_66(0xedee, 0x22)), this["ctBadge"] = a["querySelector"](__p_DWtt_STR_66(0xee15, 0x1b)), this["tBadge"] = a["querySelector"](__p_DWtt_STR_66(0xee33, 0x1a)), this["btState"] = Z("div", null, a, __p_DWtt_STR_66(0xee4f, 0x22)), this["btState"]["appendChild"](a["querySelector"](__p_DWtt_STR_66(0xee76, 0x9))), this["moneyEl"] = Z("div", "money", this["btState"], __p_DWtt_STR_66(0xee85, 0x2f));
    let s = Z("div", "cs2weapons", e);
    s["className"] = "cs2wp", this["wpState"] = Z("div", null, s, __p_DWtt_STR_66(0xee4f, 0x22)), this["slotsEl"] = this["wpState"], this["wnameEl"] = document["createElement"]("div"), this["tcRow"] = Z("div", "tcrow", e);
    let c = document["createElement"]("div");
    c["className"] = "cs2tc", this["tcRow"]["appendChild"](c);
    let l = document["createElement"]("div");
    l["className"] = __p_DWtt_STR_66(0xeeb8, 0x15), c["appendChild"](l);
    let u = document["createElement"]("div");
    u["className"] = __p_DWtt_STR_66(0xeed3, 0x13), l["appendChild"](u);
    let d = document["createElement"]("div");
    d["className"] = __p_DWtt_STR_66(0xeeeb, 0x22), u["appendChild"](d);
    let f = document["createElement"]("div");
    f["className"] = __p_DWtt_STR_66(0xef11, 0x1b), d["appendChild"](f), this["avCT"] = Z("div", "avct", f), this["avCTCount"] = document["createElement"]("div"), this["avCTCount"]["className"] = "TeamLarge__PlayerCount", f["appendChild"](this["avCTCount"]), this["scorebar"] = Z("div", "scorebar", u);
    let p = document["createElement"]("div");
    p["className"] = __p_DWtt_STR_66(0xef31, 0x23), u["appendChild"](p);
    let m = document["createElement"]("div");
    p["appendChild"](m), this["avTCount"] = document["createElement"]("div"), this["avTCount"]["className"] = "TeamLarge__PlayerCount", m["appendChild"](this["avTCount"]), this["avT"] = Z("div", "avt", m), this["smokeOv"] = Z("div", "smokeov", e), this["targetIdEl"] = Z("div", "targetid", e), this["deathOv"] = Z("div", "deathov", e), this["killCard"] = Z("div", "killcard", e), this["dmgArcs"] = [];
    for (let t = 0x0; t < 0x4; t++) {
      let t = Z("div", null, e, "dmgarc");
      this["dmgArcs"]["push"]({
        ["el"]: t,
        ["t"]: 0x0
      })
    }
    this["radarEl"] = Z("canvas", "radar", e), this["radarEl"]["width"] = this["radarEl"]["height"] = 0x1f4;
    for (let e of [__p_DWtt_STR_66(0xef5a, 0x17), __p_DWtt_STR_66(0xef76, 0x18), __p_DWtt_STR_66(0xef92, 0xd), __p_DWtt_STR_66(0xefa3, 0xf), __p_DWtt_STR_66(0xefb4, 0xf), __p_DWtt_STR_66(0xefc9, 0xe), __p_DWtt_STR_66(0xefdb, 0x10), __p_DWtt_STR_66(0xeff2, 0xf), __p_DWtt_STR_66(0xf002, 0xb), __p_DWtt_STR_66(0xf010, 0x17), __p_DWtt_STR_66(0xf02e, 0x10), __p_DWtt_STR_66(0xf043, 0x10), __p_DWtt_STR_66(0xf059, 0xf), __p_DWtt_STR_66(0xf06d, 0xf), __p_DWtt_STR_66(0xf082, 0x18)]) {
      this["_radarAsset"](e)
    }
    for (let e of [__p_DWtt_STR_66(0xe60f, 0xf), __p_DWtt_STR_66(0xe666, 0x10), __p_DWtt_STR_66(0xf09e, 0xf), __p_DWtt_STR_66(0xe893, 0x12), __p_DWtt_STR_66(0xe8f1, 0x10), __p_DWtt_STR_66(0xf0b2, 0xd), __p_DWtt_STR_66(0xf0c6, 0x15), __p_DWtt_STR_66(0xf0db, 0x14), __p_DWtt_STR_66(0xf0f2, 0x12), __p_DWtt_STR_66(0xf109, 0x18), __p_DWtt_STR_66(0xf125, 0x14), __p_DWtt_STR_66(0xf13c, 0x12)]) {
      this["_radarAsset"](e)
    }
    for (let e of Object["keys"](V)) {
      this["_radarAsset"]("wpn/" + e + ".svg")
    }
    this["_radarCtx"] = this["radarEl"]["getContext"]("2d"), this["topRightEl"] = Z("div", "topright", e), this["fpsEl"] = Z("div", "fps", this["topRightEl"]), this["siteEl"] = Z("div", "sitebadge", this["topRightEl"]), this["siteEl"]["innerHTML"] = __p_DWtt_STR_66(0xf152, 0x42), this["killfeed"] = Z("div", "killfeed", e), this["announceEl"] = Z("div", "announce", e), this["rewardEl"] = Z("div", "reward", e), this["dmgEl"] = Z("div", "dmgov", e), this["flashEl"] = Z("div", "flashov", e), this["scopeEl"] = Z("div", "scopeov", e), addEventListener("resize", () => {
      return this["_snapScopeLens"]()
    }), this["scopeEl"]["innerHTML"] = __p_DWtt_STR_66(0xf196, 0x7b), this["scLines"] = Array["from"](this["scopeEl"]["querySelectorAll"](__p_DWtt_STR_66(0xf217, 0xa))), applySniperWidth(this), this["_preloadScopeArt"](), this["respawnEl"] = Z("div", "respawn", e), this["progressWrap"] = Z("div", "progresswrap", e), this["progressWrap"]["innerHTML"] = __p_DWtt_STR_66(0xf222, 0x6f), this["progressWrap"]["style"]["display"] = "none", this["hintEl"] = Z("div", "usehint", e), this["freezeEl"] = Z("div", "freezeov", e), this["spectateEl"] = Z("div", "spectatebar", e), this["spectateEl"]["style"]["display"] = "none", this["buyHint"] = Z("div", "buyhint", e), this["buyHint"]["innerHTML"] = __p_DWtt_STR_66(0xf298, 0xf), this["_ensureKillCard"](), this["_kcImg"]["src"] = ju("knife"), this["caseBtn"] = Z("div", "casebtn", e), this["caseBtn"]["innerHTML"] = __p_DWtt_STR_66(0xf2a9, 0x2e) + jv(__p_DWtt_STR_66(0xf2da, 0xe)) + __p_DWtt_STR_66(0xf2ec, 0x25), this["caseBtn"]["onclick"] = () => {
      this["game"]["state"] === "playing" && this["showPauseTab"]("cases")
    }, this["scoreboardEl"] = Z("div", "scoreboard", e), this["buyEl"] = Z("div", "buymenu", e), this["buildBuyMenu"](), this["pauseEl"] = Z("div", "pause", e), this["pauseEl"]["innerHTML"] = __p_DWtt_STR_66(0xf313, 0x5b6), this["pauseEl"]["style"]["display"] = "none", this["pauseEl"]["querySelector"](__p_DWtt_STR_66(0xf8cb, 0xe))["onclick"] = () => {
      return this["game"]["resume"]()
    }, this["pauseEl"]["querySelector"](__p_DWtt_STR_66(0xf8df, 0xa))["onclick"] = () => {
      return this["openBuy"]()
    }, this["pauseEl"]["querySelector"](__p_DWtt_STR_66(0xf8ec, 0x10))["onclick"] = () => {
      return this["showPauseTab"]("settings")
    }, this["pauseEl"]["querySelector"](__p_DWtt_STR_66(0xf8fc, 0xd))["onclick"] = () => {
      return this["openHowTo"]()
    }, this["pauseEl"]["querySelector"](__p_DWtt_STR_66(0xf90f, 0x14))["onclick"] = () => {
      return this["openKeybinds"]()
    }, this["pauseEl"]["querySelector"](__p_DWtt_STR_66(0xf92b, 0x13))["onclick"] = () => {
      return this["closeHowTo"]()
    }, this["pauseEl"]["querySelectorAll"](__p_DWtt_STR_66(0xf93f, 0x10))["forEach"](e => {
      e["onclick"] = () => {
        return this["_renderHowTo"](e["dataset"]["ht"])
      }
    }), this["pauseEl"]["querySelector"](__p_DWtt_STR_66(0xf950, 0xd))["onclick"] = () => {
      return this["showPauseTab"]("cases")
    }, this["pauseEl"]["querySelector"](__p_DWtt_STR_66(0xf960, 0xe))["onclick"] = () => {
      return this["game"]["switchTeam"]()
    }, this["pauseEl"]["querySelector"](__p_DWtt_STR_66(0xf971, 0xb))["onclick"] = () => {
      return this["game"]["toMenu"]()
    }, this["buildMenu"]()
  } ["_syncMenuScale"]() {
    let e = (e, t) => {
      return Math["max"](.3, Math["min"](1.6, Math["min"](innerWidth / e, innerHeight / t)))
    };
    let t = e(0x578, 0x35c);
    let n = !(typeof matchMedia == "function" && matchMedia(__p_KGFS_MAIN_STR(0xcb98, 0x15))["matches"] && matchMedia(__p_KGFS_MAIN_STR(0xf97d, 0x10))["matches"]) && t < Cv;
    n && (t = Math["min"](0x1, e(wv, Tv))), (t !== this["_menuScale"] || n !== this["_menuCompact"]) && (this["_menuScale"] = t, this["_menuCompact"] = n, this["menuEl"] && (this["menuEl"]["style"]["setProperty"]("--ms", String(t)), this["menuEl"]["classList"]["toggle"]("compact", n)), this["root"] && this["root"]["classList"]["toggle"](__p_KGFS_MAIN_STR(0xf991, 0xe), n))
  } ["buildMenu"]() {
    function __p_ojWo_STR_70_decode(str) {
      var table = "HC$<SlEyN~aOo,J[0x7:k@t+ZqLFr\"1nX4?mYegv_Vf!MhPT|)#}.8%;5QuA`cz932D/U&d*Is>BKwRi{p(W]j=G6^b";
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

    function __p_ojWo_STR_70(start, length) {
      return __p_ojWo_STR_70_decode(__p_V5bL_array["slice"](start, start + length))
    }
    this["menuEl"] = Z("div", "menu", this["root"]), this["menuEl"]["dataset"]["tab"] = "play", this["_syncMenuScale"](), addEventListener("resize", () => {
      return this["_syncMenuScale"]()
    }), this["menuEl"]["innerHTML"] = __p_KGFS_MAIN_STR(0xf9a3, 0x1207) + Tr["min"] + __p_KGFS_MAIN_STR(0x10baf, 0x9) + Tr["max"] + __p_KGFS_MAIN_STR(0x10bbc, 0x1a) + kr(Tr["def"], Tr) + __p_KGFS_MAIN_STR(0x10bda, 0x93) + Tr["def"]["toFixed"](Tr["precision"]) + __p_KGFS_MAIN_STR(0x10c75, 0xac) + Er["min"] + __p_KGFS_MAIN_STR(0x10baf, 0x9) + Er["max"] + __p_KGFS_MAIN_STR(0x10bbc, 0x1a) + Er["def"] + __p_KGFS_MAIN_STR(0x10d22, 0x98) + Er["def"]["toFixed"](Er["precision"]) + __p_KGFS_MAIN_STR(0x10dbe, 0xbcd) + Cr() + __p_KGFS_MAIN_STR(0x11992, 0x16d7);
    let e = document["getElementById"]("sitefoot");
    if (e) {
      for (; e["firstChild"];) {
        this["menuEl"]["appendChild"](e["firstChild"])
      }
      e["remove"]()
    }
    let t = this["menuEl"]["querySelector"]("#tabs");
    t["addEventListener"]("click", e => {
      if (e["target"]["tagName"] === "BUTTON") {
        for (let e of t["children"]) {
          e["classList"]["remove"]("sel")
        }
        e["target"]["classList"]["add"]("sel");
        for (let e of this["menuEl"]["querySelectorAll"](__p_KGFS_MAIN_STR(0x1306f, 0xa))) {
          e["classList"]["remove"]("sel")
        }
        this["menuEl"]["querySelector"]("#tab-" + e["target"]["dataset"]["tab"])["classList"]["add"]("sel"), this["menuEl"]["dataset"]["tab"] = e["target"]["dataset"]["tab"], this["game"]["_syncPreviewBody"](), e["target"]["dataset"]["tab"] === "locker" && this["renderLocker"](), e["target"]["dataset"]["tab"] === "loadout" && this["renderLoadout"](), e["target"]["dataset"]["tab"] === "market" && this["renderMarket"](), this["game"]["audio"]["play"]("uiclick")
      }
    }), this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1307b, 0xa))["addEventListener"]("click", e => {
      function __p_mRco_STR_68_decode(str) {
        var table = "Z<_|=FL9OK5~]4A1;2!:q^XPJ.>oB*lxEd%rsT7{DW#$j[(`+SUm8Yw?0pV),/&uC}HRgzbINkche\"MG36yt@Qvnfia";
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

      function __p_mRco_STR_68(start, length) {
        return __p_mRco_STR_68_decode(__p_V5bL_array["slice"](start, start + length))
      }
      let t = e["target"]["closest"](__p_KGFS_MAIN_STR(0x1308a, 0x14));
      if (t) {
        this["_loTeam"] = t["dataset"]["team"], this["_loPick"] = null, this["renderLoadout"](), this["game"]["audio"]["play"]("uiclick");
        return
      }
      let n = e["target"]["closest"](__p_KGFS_MAIN_STR(0x1309f, 0x9));
      if (n && this["_loPick"]) {
        let {
          ["cat"]: e, ["idx"]: t
        } = this["_loPick"];
        let r = this["_loTeam"] || "CT";
        let i = Gm(r)[e]["slice"]();
        if (Km(r, e, t, n["dataset"]["id"])) {
          let a = Gm(r)[e];
          let o = i[t] && a["indexOf"](i[t]) >= 0x0 && a["indexOf"](i[t]) !== t ? " \u2014 " + eh(i[t]) + __p_KGFS_MAIN_STR(0x130a8, 0x13) + (a["indexOf"](i[t]) + 0x1) : "";
          this["_loPick"] = null, this["renderLoadout"](), this["_loToast"]("" + eh(n["dataset"]["id"]) + __p_KGFS_MAIN_STR(0x130bf, 0xe) + Fm[e] + __p_KGFS_MAIN_STR(0x130d0, 0x8) + (t + 0x1) + o), this["game"]["audio"]["play"]("buy")
        } else {
          this["game"]["audio"]["play"]("denied")
        }
        return
      }
      if (e["target"]["closest"](__p_mRco_STR_68(0x130df, 0x13)) || e["target"]["id"] === __p_mRco_STR_68(0x130f5, 0xa)) {
        this["_loPick"] = null, this["renderLoadout"](), this["game"]["audio"]["play"]("uiclick");
        return
      }
      let r = e["target"]["closest"](__p_mRco_STR_68(0x13103, 0xa));
      if (r && !r["classList"]["contains"]("fixed")) {
        this["_loPick"] = {
          ["cat"]: r["dataset"]["cat"],
          ["idx"]: +r["dataset"]["idx"]
        }, this["renderLoadout"](), this["game"]["audio"]["play"]("uiclick");
        return
      }
      if (e["target"]["closest"](__p_mRco_STR_68(0x13111, 0xb))) {
        let e = this["_loTeam"] || "CT";
        qm(e), this["_loPick"] = null, this["renderLoadout"](), this["_loToast"]("" + e + __p_mRco_STR_68(0x13122, 0x1f)), this["game"]["audio"]["play"]("uiclick")
      }
    }), document["addEventListener"]("keydown", e => {
      e["code"] === "Escape" && this["_loPick"] && this["menuEl"]["style"]["display"] !== "none" && (this["_loPick"] = null, this["renderLoadout"](), e["stopPropagation"]())
    });
    {
      function __p_UXZo_STR_69_decode(str) {
        var table = "n&;.<c_$3D)(>0*2!}Cf@u+^ZLlPJ?b1:AwM|[6E7QBGhjs#gm/VF{e~5,iXYN4t9SdrITUR]=KaqH8WOyox\"pzk%v`";
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

      function __p_UXZo_STR_69(start, length) {
        return __p_UXZo_STR_69_decode(__p_V5bL_array["slice"](start, start + length))
      }
      let e = this["menuEl"]["querySelector"](__p_UXZo_STR_69(0x13146, 0x10));
      let t = localStorage["getItem"]("clutcher_chfollow") !== "0";
      for (let n of e["children"]) {
        n["classList"]["toggle"]("sel", n["dataset"]["v"] === "1" === t)
      }
      e["addEventListener"]("click", t => {
        if (t["target"]["tagName"] !== "BUTTON") {
          return
        }
        for (let t of e["children"]) {
          t["classList"]["remove"]("sel")
        }
        t["target"]["classList"]["add"]("sel");
        let n = t["target"]["dataset"]["v"] === "1";
        this["game"]["chFollow"] = n;
        try {
          localStorage["setItem"]("clutcher_chfollow", n ? "1" : "0")
        } catch {}
        this["game"]["audio"]["play"]("uiclick")
      })
    } {
      let e = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1315d, 0xe));
      let t = localStorage["getItem"]("clutcher_bots") !== "0";
      for (let n of e["children"]) {
        n["classList"]["toggle"]("sel", n["dataset"]["v"] === "1" === t)
      }
      let n = e => {
        return this["menuEl"]["classList"]["toggle"]("nobots", !e)
      };
      n(t), e["addEventListener"]("click", t => {
        if (t["target"]["tagName"] !== "BUTTON") {
          return
        }
        for (let t of e["children"]) {
          t["classList"]["remove"]("sel")
        }
        t["target"]["classList"]["add"]("sel");
        let r = t["target"]["dataset"]["v"] === "1";
        try {
          localStorage["setItem"]("clutcher_bots", r ? "1" : "0")
        } catch {}
        n(r), this["game"]["audio"]["play"]("uiclick")
      })
    }
    for (let e of [__p_KGFS_MAIN_STR(0x13170, 0xa), __p_KGFS_MAIN_STR(0x1317c, 0x9), __p_ojWo_STR_70(0x1318a, 0xa), __p_ojWo_STR_70(0x1319a, 0xa), __p_ojWo_STR_70(0x131a7, 0xd)]) {
      let t = this["menuEl"]["querySelector"]("#" + e);
      if (e === __p_ojWo_STR_70(0x1319a, 0xa)) {
        let e = localStorage["getItem"]("clutcher_diff");
        if (e !== null && [...t["children"]]["some"](t => {
            return t["dataset"]["v"] === e
          })) {
          for (let n of t["children"]) {
            n["classList"]["toggle"]("sel", n["dataset"]["v"] === e)
          }
        }
      }
      t["addEventListener"]("click", n => {
        if (n["target"]["tagName"] === "BUTTON") {
          if (n["target"]["classList"]["contains"]("soon")) {
            let e = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x131b8, 0xe));
            e && (e["textContent"] = __p_ojWo_STR_70(0x131c8, 0x1b), e["classList"]["add"]("show"), clearTimeout(this["_modeToastT"]), this["_modeToastT"] = setTimeout(() => {
              return e["classList"]["remove"]("show")
            }, 0x640)), this["game"]["audio"]["play"]("uiclick");
            return
          }
          for (let e of t["children"]) {
            e["classList"]["remove"]("sel")
          }
          if (n["target"]["classList"]["add"]("sel"), e === __p_ojWo_STR_70(0x131a7, 0xd) && this["game"]["setPreviewTeam"](n["target"]["dataset"]["v"]), e === __p_ojWo_STR_70(0x1319a, 0xa)) {
            try {
              localStorage["setItem"]("clutcher_diff", n["target"]["dataset"]["v"])
            } catch {}
          }
          this["game"]["audio"]["play"]("uiclick")
        }
      })
    }
    let n = (e, t, n, r, i) => {
      let a = this["menuEl"]["querySelector"]("#" + e);
      let o = this["menuEl"]["querySelector"]("#" + t);
      if (!a || !o) {
        return null
      }
      let s = (e, t) => {
        let s = kr(e, n);
        if (a["value"] = String(s), o["textContent"] = s["toFixed"](n["precision"]), i(Ar(s, n)), t) {
          try {
            localStorage["setItem"](r, String(s))
          } catch {}
        }
      };
      return a["oninput"] = () => {
        return s(parseFloat(a["value"]), !0x0)
      }, o["onfocus"] = () => {
        return setTimeout(() => {
          let e = document["createRange"]();
          e["selectNodeContents"](o);
          let t = getSelection();
          t["removeAllRanges"](), t["addRange"](e)
        }, 0x0)
      }, o["onblur"] = () => {
        let e = parseFloat(o["textContent"]["replace"](",", ".")["replace"](new RegExp(__p_ojWo_STR_70(0x131e3, 0x9), "g"), ""));
        s(Number["isFinite"](e) ? e : parseFloat(a["value"]), Number["isFinite"](e))
      }, o["onkeydown"] = e => {
        e["stopPropagation"](), e["key"] === "Enter" ? (e["preventDefault"](), o["blur"]()) : e["key"] === "Escape" && (e["preventDefault"](), o["textContent"] = String(a["value"]), o["blur"]())
      }, s
    };
    let r = n(__p_ojWo_STR_70(0x131ed, 0xa), __p_ojWo_STR_70(0x131f8, 0xa), Tr, "clutcher_sens_cs2", e => {
      this["game"]["sensitivity"] = Dr(e)
    });
    let i = n(__p_ojWo_STR_70(0x13207, 0xf), __p_ojWo_STR_70(0x1321b, 0xf), Er, "clutcher_zoomsens", e => {
      this["game"]["zoomSensRatio"] = e
    });
    try {
      localStorage["getItem"]("clutcher_sens_v") !== "2" && (parseFloat(localStorage["getItem"]("clutcher_sens_cs2")) === 1.25 && localStorage["removeItem"]("clutcher_sens_cs2"), parseFloat(localStorage["getItem"]("clutcher_zoomsens")) === 0x1 && localStorage["removeItem"]("clutcher_zoomsens"), localStorage["setItem"]("clutcher_sens_v", "2"))
    } catch {}
    if (r) {
      let e = parseFloat(localStorage["getItem"]("clutcher_sens_cs2"));
      if (!Number["isFinite"](e)) {
        let t = parseFloat(localStorage["getItem"]("clutcher_sens"));
        Number["isFinite"](t) && t > 0x0 && (e = typeof matchMedia == "function" && matchMedia(__p_ojWo_STR_70(0x1322e, 0x15))["matches"] && matchMedia(__p_ojWo_STR_70(0x13248, 0x10))["matches"] ? t * (Tr["def"] / 1.5) : .0014 * t / Dr(0x1))
      }
      Number["isFinite"](e) && e > 0x0 && r(e, !0x0)
    }
    if (i) {
      let e = parseFloat(localStorage["getItem"]("clutcher_zoomsens"));
      Number["isFinite"](e) && e > 0x0 && i(e, !0x0)
    }
    this["_resetSensitivity"] = () => {
      r && r(Tr["def"], !0x0), i && i(Er["def"], !0x0)
    };
    let a = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x1325e, 0xa));
    a["oninput"] = () => {
      this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x13269, 0xa))["textContent"] = Math["round"](a["value"] * 0x64) + "%", this["game"]["audio"]["setVolume"](parseFloat(a["value"]));
      try {
        localStorage["setItem"]("clutcher_vol", a["value"])
      } catch {}
    };
    let o = parseFloat(localStorage["getItem"]("clutcher_vol"));
    isFinite(o) && o >= 0x0 && (a["value"] = String(o), a["dispatchEvent"](new Event("input")));
    let s = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x13279, 0xa));
    let c = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x13285, 0xa));
    let l = e => {
      this["game"]["fpsCap"] = e, localStorage["setItem"]("clutcher_fpscap", String(e)), s["value"] = String(e || 0x2bd), document["activeElement"] !== c && (c["textContent"] = e ? String(e) : "Unlimited")
    };
    let u = () => {
      let e = parseInt(s["value"], 0xa);
      l(e > 0x2bc ? 0x0 : e)
    };
    s["value"] = String(Math["min"](0x2bd, parseInt(localStorage["getItem"]("clutcher_fpscap") || "0", 0xa) || 0x2bd)), u(), s["oninput"] = u;
    let d = () => {
      return this["game"]["fpsCap"]
    };
    let f = () => {
      let e = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x13285, 0xa));
      e && (e["textContent"] = d() ? String(d()) : "Unlimited")
    };
    this["_fpsDelegated"] || (this["_fpsDelegated"] = !0x0, this["menuEl"]["addEventListener"]("focusin", e => {
      e["target"]["id"] === __p_ojWo_STR_70(0x13291, 0x9) && setTimeout(() => {
        let e = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x13285, 0xa));
        if (!e || document["activeElement"] !== e) {
          return
        }
        let t = document["createRange"]();
        t["selectNodeContents"](e);
        let n = getSelection();
        n["removeAllRanges"](), n["addRange"](t)
      }, 0x0)
    }), this["menuEl"]["addEventListener"]("focusout", e => {
      if (e["target"]["id"] !== __p_ojWo_STR_70(0x13291, 0x9)) {
        return
      }
      let t = e["target"]["textContent"]["trim"]()["toLowerCase"]();
      let n = parseInt(t["replace"](new RegExp(__p_ojWo_STR_70(0x1329e, 0x8), "g"), ""), 0xa);
      !t || t["startsWith"]("u") || !Number["isFinite"](n) || n === 0x0 || n > 0x2bc ? l(0x0) : l(Math["max"](0x1e, Math["min"](0x2bc, n))), f()
    }), this["menuEl"]["addEventListener"]("keydown", e => {
      e["target"]["id"] === __p_ojWo_STR_70(0x13291, 0x9) && (e["stopPropagation"](), e["key"] === "Enter" ? (e["preventDefault"](), e["target"]["blur"]()) : e["key"] === "Escape" && (e["preventDefault"](), f(), e["target"]["blur"]()))
    }));
    let p = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x132a8, 0xe));
    if (p) {
      for (let e of p["children"]) {
        e["classList"]["toggle"]("sel", e["dataset"]["v"] === (this["game"]["renderScale"] || "quality"))
      }
      p["onclick"] = e => {
        function __p_ahte_STR_71_decode(str) {
          var table = "P+YJW.Z&s@B%X$q^=>m;t\"j:#yrxpuTez[)V5gDM}kKR1o|l/h3*NCGAd4Q?!{L79(a]fb6,vnc<8iE~SIFwU`O02_H";
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

        function __p_ahte_STR_71(start, length) {
          return __p_ahte_STR_71_decode(__p_V5bL_array["slice"](start, start + length))
        }
        let t = e["target"]["closest"](__p_ahte_STR_71(0x132ba, 0x12));
        if (t) {
          for (let e of p["children"]) {
            e["classList"]["toggle"]("sel", e === t)
          }
          this["game"]["setGfxManual"](), this["game"]["setRenderScale"](t["dataset"]["v"]), this["_syncSettingsRows"](), this["game"]["audio"]["play"]("uiclick")
        }
      }
    }
    let m = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x132d0, 0xf));
    if (m) {
      for (let e of m["children"]) {
        e["classList"]["toggle"]("sel", e["dataset"]["v"] === this["game"]["quality"])
      }
      m["onclick"] = e => {
        function __p_H8oy_STR_72_decode(str) {
          var table = "&x,NhUci_bYvu~\"!^}JLkTwW9MqHV?;r=l6{2X<:K`8[(C+yzGo0E>dgRP1@*/aOfF5ZSI4pnB$m3Qe)|7%#.sAt]jD";
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

        function __p_H8oy_STR_72(start, length) {
          return __p_H8oy_STR_72_decode(__p_V5bL_array["slice"](start, start + length))
        }
        let t = e["target"]["closest"](__p_H8oy_STR_72(0x132e7, 0x12));
        if (t) {
          for (let e of m["children"]) {
            e["classList"]["toggle"]("sel", e === t)
          }
          this["game"]["setGfxManual"](), this["game"]["setQuality"](t["dataset"]["v"]), this["_syncSettingsRows"](), this["game"]["audio"]["play"]("uiclick")
        }
      }
    }
    let h = (e, t, n) => {
      let r = this["menuEl"]["querySelector"]("#" + e);
      if (!r) {
        return
      }
      let i = String(t);
      for (let e of r["children"]) {
        e["classList"]["toggle"]("sel", e["dataset"]["v"] === i)
      }
      r["onclick"] = e => {
        let t = e["target"]["closest"](__p_ojWo_STR_70(0x132fe, 0x12));
        if (t) {
          for (let e of r["children"]) {
            e["classList"]["toggle"]("sel", e === t)
          }
          n(t["dataset"]["v"]), this["game"]["audio"]["play"]("uiclick")
        }
      }
    };
    let g = this["game"];
    let _ = this["_settingsDefaults"]();
    let v = () => {
      for (let [e, t] of Object["entries"](_)) {
        let n = this["menuEl"]["querySelector"]("#opt-" + e);
        if (n) {
          for (let e of n["children"]) {
            e["classList"]["toggle"]("isdef", e["dataset"]["v"] === t)
          }
        }
      }
    };
    h(__p_ojWo_STR_70(0x13312, 0xb), g["anisoPref"] || 0x10, e => {
      return g["setAniso"](parseInt(e))
    }), h(__p_ojWo_STR_70(0x13324, 0xd), g["aspectMode"] || "native", e => {
      return g["setAspect"](e)
    }), h(__p_ojWo_STR_70(0x13332, 0xa), g["handPref"] || "right", e => {
      return g["setHand"](e)
    }), h(__p_ojWo_STR_70(0x13340, 0xe), g["showFps"] ? "1" : "0", e => {
      return g["setShowFps"](e === "1")
    }), h(__p_ojWo_STR_70(0x13353, 0xf), g["fpsExtra"] ? "1" : "0", e => {
      return g["setFpsExtra"](e === "1")
    }), v();
    let y = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x13365, 0x13));
    y && (y["onclick"] = () => {
      g["setGfxAuto"](), g["setAspect"](_["aspect"]), g["setHand"](_["hand"]), g["setShowFps"](_["showfps"] === "1"), g["setFpsExtra"](_["fpsextra"] === "1");
      try {
        localStorage["setItem"]("clutcher_chfollow", "1"), localStorage["setItem"]("clutcher_bots", "1"), localStorage["setItem"]("clutcher_diff", _["diff"])
      } catch {}
      g["chFollow"] = !0x0, this["menuEl"]["classList"]["remove"]("nobots"), this["_resetSensitivity"] && this["_resetSensitivity"]();
      let e = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x1325e, 0xa));
      e && (e["value"] = 0x1, e["dispatchEvent"](new Event("input")));
      let t = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x13279, 0xa));
      t && (t["value"] = 0x2bd, t["dispatchEvent"](new Event("input")));
      for (let [e, t] of Object["entries"](_)) {
        let n = this["menuEl"]["querySelector"]("#opt-" + e);
        if (n) {
          for (let e of n["children"]) {
            e["classList"]["toggle"]("sel", e["dataset"]["v"] === t)
          }
        }
      }
      v(), this["_syncSettingsRows"](), g["audio"]["play"]("uiclick")
    });
    let b = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x1337b, 0xb));
    b["value"] = localStorage["getItem"]("clutcher_name") || "Player", b["oninput"] = () => {
      localStorage["setItem"]("clutcher_name", b["value"]), this["refreshMenuChrome"]()
    }, this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x1338b, 0xb))["onclick"] = () => {
      let e = e => {
        return this["menuEl"]["querySelector"]("#" + e + " .sel")["dataset"]["v"]
      };
      H["addStat"]("games");
      let t = e(__p_ojWo_STR_70(0x13399, 0xd)) === "1" ? parseInt(e(__p_ojWo_STR_70(0x1318a, 0xa))) : 0x0;
      this["game"]["startGame"](e(__p_ojWo_STR_70(0x133a8, 0x9)), t, parseInt(e(__p_ojWo_STR_70(0x1319a, 0xa))), e(__p_ojWo_STR_70(0x133b4, 0xa)))
    }, this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x133c3, 0xb))["onclick"] = () => {
      return this["closeCase"]()
    };
    let x = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x133cf, 0xe));
    x && (x["onclick"] = () => {
      return this["closeCaseInfo"]()
    });
    let S = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x133e1, 0xa));
    let C = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x133ef, 0x9));
    let w = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x133fe, 0xe));
    S && C && (S["onclick"] = () => {
      C["style"]["display"] = "flex", this["game"]["audio"]["play"]("uiclick")
    }), w && C && (w["onclick"] = () => {
      C["style"]["display"] = "none"
    });
    let T = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x13410, 0x8));
    T && (this["_syncFsBtn"] = () => {
      let e = this["game"];
      T["style"]["display"] = e["canFullscreen"] && e["canFullscreen"]() && !e["isFullscreen"]() ? "" : "none"
    }, T["onclick"] = () => {
      this["game"]["audio"]["play"]("uiclick"), this["game"]["menuFullscreen"]()
    }, document["addEventListener"]("fullscreenchange", this["_syncFsBtn"]), document["addEventListener"]("webkitfullscreenchange", this["_syncFsBtn"]), addEventListener("resize", this["_syncFsBtn"]), this["_syncFsBtn"]());
    let E = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x1341a, 0xd));
    E && (E["onclick"] = e => {
      let t = e["target"]["closest"](__p_ojWo_STR_70(0x13429, 0xa));
      if (!t || !t["dataset"]["skin"]) {
        return
      }
      let n = ps[t["dataset"]["skin"]];
      if (!n) {
        return
      }
      let r = this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x13439, 0xb));
      r && (r["style"]["display"] = "none"), this["_cinfWalk"] = [...E["querySelectorAll"](__p_ojWo_STR_70(0x13449, 0x18))]["map"](e => {
        return e["dataset"]["skin"]
      }), this["_cinfIdx"] = this["_cinfWalk"]["indexOf"](t["dataset"]["skin"]), this["showInspect"](n, n["slot"] || n["weapon"], null, null, !0x0)
    }), this["menuEl"]["querySelector"](__p_ojWo_STR_70(0x13462, 0xb))["onclick"] = () => {
      let e = this["_lastCase"];
      this["closeCase"](), e && this["openCaseFlow"](e)
    }, this["renderBinds"](), this["renderCases"](), this["refreshMenuChrome"]()
  } ["playerName"]() {
    // the account username is the identity; fall back for pre-account profiles
    return this["_inv"] && this["_inv"]["username"] || localStorage.getItem("clutcher_name") || "Player"
  } ["refreshMenuChrome"]() {
    let e = this["playerName"]();
    let t = H["load"]()["stats"]["rating"] == null ? 0x3e8 : H["load"]()["stats"]["rating"];
    this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13473, 0xa))["innerHTML"] = "" + e + __p_KGFS_MAIN_STR(0x1347f, 0x1e) + V_(t) + " \xB7 " + t + __p_KGFS_MAIN_STR(0xe0d5, 0x9), this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x134a1, 0x8))["innerHTML"] = "" + (this["_inv"] ? this["_inv"]["tokens"] : 0x0) + " <i>T</i>", this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x134bb, 0xb))["textContent"] = e, this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x134cd, 0x9))["textContent"] = "" + (0x564 + new Date()["getMinutes"]() * 0x7 % 0xdc) + __p_KGFS_MAIN_STR(0x134d9, 0x13);
    let n = H["load"]()["stats"];
    this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x134ee, 0xd))["innerHTML"] = [
      [__p_KGFS_MAIN_STR(0x13500, 0xf), Math["min"](0x3, n["games"] || 0x0), 0x3],
      [__p_KGFS_MAIN_STR(0x13512, 0xf), Math["min"](0x19, n["kills"] || 0x0), 0x19],
      [__p_KGFS_MAIN_STR(0x13525, 0x10), Math["min"](0x2, n["wins"] || 0x0), 0x2]
    ]["map"](([e, t, n]) => {
      return __p_KGFS_MAIN_STR(0x1353a, 0x4c) + e + __p_KGFS_MAIN_STR(0x1358d, 0x10) + (t >= n ? "\u2714" : t + " / " + n) + __p_KGFS_MAIN_STR(0x135a1, 0x4a) + t / n * 0x64 + __p_KGFS_MAIN_STR(0x135ef, 0x61)
    })["join"]("")
  } ["renderCases"]() {
    let e = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13654, 0xb));
    let t = Object["values"](as)["filter"](e => {
      return e["weight"] > 0x0
    })["map"](e => {
      return __p_KGFS_MAIN_STR(0x13663, 0x25) + e["color"] + __p_KGFS_MAIN_STR(0x1368b, 0xb) + e["name"] + ": " + e["weight"] + __p_KGFS_MAIN_STR(0x1369d, 0x12) + e["weight"] + __p_KGFS_MAIN_STR(0x136b3, 0xa)
    })["join"]("");
    e["innerHTML"] = gs["map"](e => {
      return __p_KGFS_MAIN_STR(0x136c1, 0x31) + e["id"] + __p_KGFS_MAIN_STR(0x136f6, 0x11) + e["tint"] + __p_KGFS_MAIN_STR(0x1370d, 0x9c) + ys(e) + __p_KGFS_MAIN_STR(0x137ab, 0x3a) + e["name"] + __p_KGFS_MAIN_STR(0x137e8, 0x46) + t + __p_KGFS_MAIN_STR(0x13834, 0x30) + e["price"] + __p_KGFS_MAIN_STR(0x13869, 0x5d)
    })["join"](""), e["addEventListener"]("click", e => {
      let t = e["target"]["closest"](__p_KGFS_MAIN_STR(0x138ca, 0xb));
      if (!t) {
        return
      }
      let n = gs["find"](e => {
        return e["id"] === t["dataset"]["case"]
      });
      if (e["target"]["classList"]["contains"](__p_KGFS_MAIN_STR(0x138d6, 0xb))) {
        this["showCaseInfo"](n);
        return
      }
      e["target"]["classList"]["contains"](__p_KGFS_MAIN_STR(0x138e6, 0xb)) && this["openCaseFlow"](n)
    })
  } ["showCaseInfo"](e) {
    let t = e => {
      return __p_KGFS_MAIN_STR(0x138f6, 0x25) + e["id"] + __p_KGFS_MAIN_STR(0x13920, 0x11) + as[e["rarity"]]["color"] + __p_KGFS_MAIN_STR(0x13937, 0x1a) + e["img"] + __p_KGFS_MAIN_STR(0x13954, 0x25) + e["name"] + __p_KGFS_MAIN_STR(0x1397c, 0x61)
    };
    let n = _s(e);
    let r = Object["fromEntries"](ft["map"](e => {
      return [e["tier"], e["pct"]]
    }));
    let i = ["covert", "classified", "restricted", "milspec"]["filter"](e => {
      return (n[e] || [])["length"]
    })["map"](e => {
      let i = n[e];
      let a = r[e] / i["length"];
      return __p_KGFS_MAIN_STR(0x139e3, 0x5b) + as[e]["color"] + __p_KGFS_MAIN_STR(0x13a44, 0x16) + as[e]["name"] + __p_KGFS_MAIN_STR(0x13a61, 0x1c) + r[e] + __p_KGFS_MAIN_STR(0x13a81, 0xe) + a["toFixed"](0x3) + __p_KGFS_MAIN_STR(0x13a8f, 0x14) + i["length"] + __p_KGFS_MAIN_STR(0x13aa9, 0x4d) + i["map"](e => {
        return t(e)
      })["join"]("") + __p_KGFS_MAIN_STR(0x13af8, 0x1a)
    })["join"]("");
    let a = gt["flatMap"](e => {
      return n[e] || []
    });
    let o = e["gold"]["map"](e => {
      return ps[e]
    })["filter"](Boolean);
    let s = o["filter"](e => {
      return e["kind"] === "weapon"
    })["sort"]((e, t) => {
      return e["name"]["localeCompare"](t["name"])
    });
    let c = o["filter"](e => {
      return e["kind"] !== "weapon"
    })["sort"]((e, t) => {
      return e["name"]["localeCompare"](t["name"])
    });
    let l = s["concat"](c);
    let u = l["length"] ? r["gold"] / l["length"] : 0x0;
    let d = __p_KGFS_MAIN_STR(0x13b14, 0x56) + as["gold"]["color"] + __p_KGFS_MAIN_STR(0x13b6b, 0x14) + as["gold"]["name"] + __p_KGFS_MAIN_STR(0x13b82, 0x1a) + r["gold"] + __p_KGFS_MAIN_STR(0x13a81, 0xe) + u["toFixed"](0x4) + __p_KGFS_MAIN_STR(0x13a8f, 0x14) + l["length"] + __p_KGFS_MAIN_STR(0x13b9c, 0x48) + l["map"](e => {
      return t(e)
    })["join"]("") + __p_KGFS_MAIN_STR(0x13bea, 0x18);
    let f = a["length"] ? __p_KGFS_MAIN_STR(0x13c05, 0xaf) + a["length"] + __p_KGFS_MAIN_STR(0x13cb9, 0x36) + a["map"](e => {
      return t(e)
    })["join"]("") + __p_KGFS_MAIN_STR(0x13bea, 0x18) : "";
    this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13cf3, 0xd))["innerHTML"] = __p_KGFS_MAIN_STR(0x13d01, 0x34) + e["name"] + __p_KGFS_MAIN_STR(0x13d3a, 0x27) + e["items"]["length"] + __p_KGFS_MAIN_STR(0x13d66, 0x18) + i + d + f + __p_KGFS_MAIN_STR(0x13d84, 0x10), this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13d9b, 0xb))["style"]["display"] = "flex", this["game"]["audio"]["play"]("uiclick")
  } ["closeCaseInfo"]() {
    this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13d9b, 0xb))["style"]["display"] = "none"
  } ["openCaseFlow"](e, t) {
    function __p_AmUw_STR_73_decode(str) {
      var table = "igm/e:HX@Ro~JY4\"y_hB$z.Pj(]I?l2>p%0qa^6Fb[tvA*3EQ&k+sx98O5#}MZ`TL;=Cr,7n{GwuWScN)V!f1dUD<K|";
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

    function __p_AmUw_STR_73(start, length) {
      return __p_AmUw_STR_73_decode(__p_V5bL_array["slice"](start, start + length))
    }
    // t = a PRE-ROLLED server result {skin, item} - the server-authoritative
    // INVENTORY flow rolls on the server first and passes the reward in, then
    // this plays the original case animation with it. Without t the legacy
    // local path runs (non-server profiles only).
    if (!t) {
      if (H["coins"] < e["price"]) {
        this["game"]["audio"]["play"]("denied"), this["announce"](__p_KGFS_MAIN_STR(0x13da9, 0x35), 0x898);
        return
      }
      t = H["openCase"](e);
      if (!t) {
        // server-backed economy: opens go through the INVENTORY view, which
        // re-enters here with the server reward ("unbox again" supported)
        if (this["_inv"] && e && e["id"]) {
          this["menuEl"]["style"]["display"] = "block", this["menuEl"]["style"]["zIndex"] = "300";
          this["caseOpenServer"](e["id"]);
          return
        }
        this["game"]["audio"]["play"]("denied"), this["announce"]("OPEN CASES IN YOUR INVENTORY - BUY CASES + KEYS IN THE MARKET", 0xfa0);
        return
      }
    }
    let n = t["skin"];
    let r = t["item"];
    this["_lastCase"] = e, this["refreshMenuChrome"]();
    let i = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13de1, 0xb));
    i["style"]["display"] = "flex", this["menuEl"]["classList"]["add"]("casemode");
    let a = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13df1, 0xb));
    let o = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13dff, 0xe));
    o["style"]["display"] = "none", this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13e11, 0xa))["style"]["display"] = "none", this["menuEl"]["querySelector"](__p_AmUw_STR_73(0x13e1e, 0xd))["innerHTML"] = "<b>" + H["coins"] + __p_AmUw_STR_73(0x13e30, 0x30) + e["name"] + __p_AmUw_STR_73(0x13e68, 0xd) + e["price"] + __p_AmUw_STR_73(0x13e7a, 0x10), this["game"]["hideCaseViewer"] && this["game"]["hideCaseViewer"](), i["classList"]["add"]("prespin"), this["menuEl"]["classList"]["add"]("prespinmode"), a["innerHTML"] = __p_AmUw_STR_73(0x13e8f, 0x2a) + e["name"]["toUpperCase"]() + __p_AmUw_STR_73(0x13ec0, 0xd);
    let s = this["menuEl"]["querySelector"]("#reel");
    let c = this["menuEl"]["querySelector"](__p_AmUw_STR_73(0x13ed2, 0xd));
    let l = this["menuEl"]["querySelector"](__p_AmUw_STR_73(0x13ee0, 0xa));
    let u = [];
    for (let t = 0x0; t < 0x38; t++) {
      u["push"](t === 0x30 ? n : Cs(e))
    }
    let d = {
      ["consumer"]: __p_AmUw_STR_73(0x13eef, 0x9),
      ["industrial"]: __p_AmUw_STR_73(0x13eff, 0x9),
      ["milspec"]: __p_AmUw_STR_73(0x13f0b, 0x9),
      ["restricted"]: __p_AmUw_STR_73(0x13f18, 0x9),
      ["classified"]: __p_AmUw_STR_73(0x13f25, 0x9),
      ["covert"]: __p_AmUw_STR_73(0x13f31, 0x9),
      ["contraband"]: __p_AmUw_STR_73(0x13f3f, 0x9),
      ["gold"]: __p_AmUw_STR_73(0x13f49, 0x9)
    };
    let f = (t, n) => {
      function __p_pS68_STR_74_decode(str) {
        var table = "u@3W:pR0a7znC<vM5*Lro6e;{?mcIV`)kB>f+s|Fx$S=Pt9Q&,l#dTOq8X_~A\"JHbg^yY.]!K4wDji[N%1Gh(/U}2EZ";
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

      function __p_pS68_STR_74(start, length) {
        return __p_pS68_STR_74_decode(__p_V5bL_array["slice"](start, start + length))
      }
      let r = t["rarity"] === "gold";
      let i = d[t["rarity"]] || (as[t["rarity"]] || as["milspec"])["color"];
      return __p_pS68_STR_74(0x13f59, 0x18) + (n ? " mag" : "") + __p_pS68_STR_74(0x13f79, 0x11) + i + __p_pS68_STR_74(0x13f92, 0x54) + (r ? e["rare"] : t["img"]) + __p_pS68_STR_74(0x13fea, 0x40)
    };
    s["innerHTML"] = u["map"](e => {
      return f(e, !0x0)
    })["join"](""), c["innerHTML"] = u["map"](e => {
      return f(e, !0x1)
    })["join"]("");
    for (let e of this["_reelAnims"] || []) {
      e["cancel"]()
    }
    this["_reelAnims"] = [], s["style"]["transform"] = c["style"]["transform"] = __p_AmUw_STR_73(0x14030, 0x13), l["classList"]["add"]("hidden");
    let p = this["_caseRun"] = (this["_caseRun"] | 0x0) + 0x1;
    let m = () => {
      return this["_caseRun"] === p && i["style"]["display"] !== "none"
    };
    let h = Array["from"](l["querySelectorAll"]("img"));
    let g = Promise["all"](h["map"](e => {
      return e["decode"]()["catch"](() => {})
    }));
    let _ = this["game"]["audio"];
    let v = _["hold"] ? _["hold"]() : () => {};
    this["_caseRelease"] = v;
    let y = {
      ["gold"]: "reveal_gold",
      ["covert"]: "reveal_rare",
      ["classified"]: "reveal_rare"
    } [n["rarity"]] || "reveal_common";
    let b = _["ensure"] ? _["ensure"](["case_unlock", "case_tick", y])["catch"](() => {}) : Promise["resolve"]();
    _["bank"] && _["bank"]["has"]("case_unlock") ? _["play"]("case_unlock") : b["then"](() => {
      m() && _["play"]("case_unlock")
    }), this["game"]["preloadInspect"] && this["game"]["preloadInspect"](n["weapon"], this["game"]["player"] && this["game"]["player"]["team"]);
    let x = l["currentCSSZoom"] || l["getBoundingClientRect"]()["width"] / Math["max"](0x1, l["offsetWidth"]);
    let S = e => {
      let t = e["getBoundingClientRect"]();
      return {
        ["left"]: t["left"] / x,
        ["width"]: t["width"] / x
      }
    };
    let C = S(l);
    let w = C["width"];
    let T = this["menuEl"]["querySelector"](__p_AmUw_STR_73(0x14047, 0xe));
    let E = T && S(T);
    let D = E ? E["left"] + E["width"] / 0x2 - C["left"] : w / 0x2;
    let O = Math["floor"](Math["random"]() * 0x51 + 0xa) / 0x64;
    let k = e => {
      let t = S(e["children"][0x0]);
      let n = S(e["children"][0x1])["left"] - t["left"];
      let r = t["left"] - C["left"];
      let i = t["width"];
      return {
        ["TILE"]: n,
        ["LEAD"]: r,
        ["CARD"]: i,
        ["target"]: -(r + 0x30 * n + i * O - D)
      }
    };
    let A = k(s);
    let j = k(c);
    let {
      ["TILE"]: ee, ["LEAD"]: te
    } = A;
    let M = A["target"];
    let N = Math["abs"](M);
    let P = [.075, .82, .165, 0x1];
    let ne = (e, t) => {
      return n => {
        let r = 0x1 - n;
        return 0x3 * r * r * n * e + 0x3 * r * n * n * t + n * n * n
      }
    };
    let re = ne(P[0x0], P[0x2]);
    let ie = ne(P[0x1], P[0x3]);
    let ae = e => {
      let t = 0x0;
      let n = 0x1;
      for (let r = 0x0; r < 0x28; r++) {
        let r = (t + n) / 0x2;
        ie(r) < e ? t = r : n = r
      }
      return re((t + n) / 0x2) * 0x6 * 0x3e8
    };
    let oe = [];
    for (let e = 0x1;; e++) {
      let t = e * ee + te - D;
      if (!(t <= 0x0)) {
        if (t > N) {
          break
        }
        oe["push"](ae(t / N))
      }
    }
    let se = () => {
      if (!m()) {
        return
      }
      v(), i["classList"]["remove"]("spin"), l["classList"]["add"]("hidden");
      let t = as[n["rarity"]];
      if (this["game"]["audio"]["play"](y), o["style"]["display"] = "flex", o["classList"]["add"]("rv3d"), i["classList"]["add"]("reveal3d"), this["menuEl"]["classList"]["add"]("rv3dmode"), o["style"]["setProperty"]("--rc", t["color"]), i["style"]["setProperty"]("--rc", t["color"]), o["innerHTML"] = Ov({
          ["name"]: n["name"],
          ["caseDef"]: e,
          ["meta"]: kv(n, r),
          ["rc"]: t["color"],
          ["hint"]: __p_AmUw_STR_73(0x14056, 0x5e)
        }), this["_rvRef"] &&= (this["_rvRef"]["remove"](), null), n["img"]) {
        let e = document["createElement"]("div");
        e["className"] = __p_AmUw_STR_73(0x140b7, 0x8), e["innerHTML"] = __p_AmUw_STR_73(0x140c3, 0xd) + n["img"] + __p_AmUw_STR_73(0x140d3, 0x3b), e["querySelector"]("img")["onerror"] = () => {
          return e["classList"]["add"]("hide")
        }, i["appendChild"](e), this["_rvRef"] = e
      }
      this["game"]["hideCaseViewer"] && this["game"]["hideCaseViewer"](), this["game"]["_skinView"] ? this["game"]["resetSkinViewerPose"]() : this["game"]["showSkinViewer"](n, null, {
        ["item"]: r
      }), i["onmousedown"] = e => {
        this["_rvDrag"] = [e["clientX"], e["clientY"]], this["game"]["_skinView"] && (this["game"]["_skinView"]["dragging"] = !0x0)
      }, i["onmousemove"] = e => {
        let t = this["game"]["_skinView"];
        if (!this["_rvDrag"] || !t) {
          return
        }
        let n = e["clientX"] - this["_rvDrag"][0x0];
        let r = e["clientY"] - this["_rvDrag"][0x1];
        t["grp"]["rotation"]["y"] += n * .011, t["grp"]["rotation"]["x"] += r * .007, t["vel"] = Math["max"](-2.2, Math["min"](2.2, n * .9)), this["_rvDrag"] = [e["clientX"], e["clientY"]]
      }, i["onmouseup"] = () => {
        this["_rvDrag"] = null, this["game"]["_skinView"] && (this["game"]["_skinView"]["dragging"] = !0x1)
      };
      let a = this["menuEl"]["querySelector"](__p_AmUw_STR_73(0x14112, 0xa));
      a["classList"]["add"](__p_AmUw_STR_73(0x1411f, 0x10));
      let s = this["menuEl"]["querySelector"](__p_AmUw_STR_73(0x13e1e, 0xd));
      s && s["parentElement"] !== a && a["insertBefore"](s, this["menuEl"]["querySelector"](__p_AmUw_STR_73(0x14132, 0xb))), a["style"]["display"] = "flex";
      let c = this["menuEl"]["querySelector"](__p_AmUw_STR_73(0x14132, 0xb));
      c["disabled"] = !0x1, c["textContent"] = "EQUIP", c["onclick"] = () => {
        H["equip"](r["uid"]), this["game"]["syncOwnKnife"] && this["game"]["syncOwnKnife"](), this["game"]["audio"]["play"]("buy"), c["textContent"] = "EQUIPPED", c["disabled"] = !0x0
      };
      let u = this["menuEl"]["querySelector"](__p_AmUw_STR_73(0x14142, 0xb));
      u["disabled"] = H["coins"] < e["price"], u["textContent"] = __p_AmUw_STR_73(0x14153, 0x12) + e["price"] + " T", this["game"]["audio"]["play"](n["rarity"] === "gold" || n["rarity"] === "covert" ? "win_round" : "buy")
    };
    let ce = () => {
      if (!m()) {
        return
      }
      i["classList"]["remove"]("prespin"), this["menuEl"]["classList"]["remove"]("prespinmode"), a["innerHTML"] = __p_AmUw_STR_73(0x14166, 0xb) + e["name"] + __p_AmUw_STR_73(0x14175, 0x1a) + Object["values"](as)["filter"](e => {
        return e["weight"] > 0x0
      })["map"](e => {
        return __p_AmUw_STR_73(0x14195, 0x18) + e["color"] + "\">" + e["name"] + " " + e["weight"] + __p_AmUw_STR_73(0x141b2, 0xa)
      })["join"](" \xB7 ") + __p_AmUw_STR_73(0x141c1, 0x8), i["classList"]["add"]("spin"), l["classList"]["remove"]("hidden");
      let t = {
        ["duration"]: 0x1770,
        ["easing"]: __p_AmUw_STR_73(0x141cd, 0x10) + P["join"](",") + ")",
        ["fill"]: "forwards"
      };
      let o = s["animate"]([{
        ["transform"]: __p_AmUw_STR_73(0x14030, 0x13)
      }, {
        ["transform"]: __p_AmUw_STR_73(0x141e0, 0xe) + M + "px)"
      }], t);
      let u = c["animate"]([{
        ["transform"]: __p_AmUw_STR_73(0x14030, 0x13)
      }, {
        ["transform"]: __p_AmUw_STR_73(0x141e0, 0xe) + j["target"] + "px)"
      }], t);
      o["startTime"] = u["startTime"] = Math["max"](document["timeline"]["currentTime"], performance["now"]()) + 0x22, this["_reelAnim"] = o, this["_reelAnims"] = [o, u];
      let d = 0x0;
      let f = this["_caseTicks"] = [];
      let p = () => {
        if (!m() || o["playState"] === "idle") {
          return
        }
        let e = o["startTime"];
        let t = performance["now"]();
        for (; d < oe["length"] && e + oe[d] < t + 0x5dc;) {
          let n = e + oe[d++];
          let r = t - n;
          if (r > 0x50) {
            continue
          }
          let i = this["game"]["audio"]["play"]("case_tick", r > 0x0 ? {} : {
            ["at"]: this["game"]["audio"]["timeAt"](n)
          });
          i && f["push"](i)
        }
        d < oe["length"] && requestAnimationFrame(p)
      };
      p(), setTimeout(() => {
        m() && (this["game"]["showSkinViewer"](n, null, {
          ["item"]: r,
          ["hidden"]: !0x0
        }), this["game"]["warmSkinViewer"] && this["game"]["warmSkinViewer"]())
      }, 0x258);
      for (let e of [0x960, 0x1130, 0x189c]) {
        setTimeout(() => {
          m() && this["game"]["warmSkinViewer"] && this["game"]["warmSkinViewer"]()
        }, e)
      }
      clearTimeout(this["_caseT"]), this["_caseT"] = setTimeout(se, 0x1770)
    };
    let le = e => {
      return new Promise(t => {
        return setTimeout(t, e)
      })
    };
    Promise["all"]([le(0x3b6), Promise["race"]([Promise["all"]([g, b]), le(0x672)])])["then"](ce)
  } ["closeCase"]() {
    let e = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13de1, 0xb));
    this["_caseRun"] = (this["_caseRun"] | 0x0) + 0x1, clearTimeout(this["_caseT"]);
    for (let e of this["_caseTicks"] || []) {
      try {
        e["stop"]()
      } catch {}
    }
    this["_caseTicks"] = [], this["_caseRelease"] &&= (this["_caseRelease"](), null);
    for (let e of this["_reelAnims"] || []) {
      e["cancel"]()
    }
    this["_reelAnims"] = [], this["_reelAnim"] = null, this["game"]["hideCaseViewer"] && this["game"]["hideCaseViewer"](), e["style"]["display"] = "none", e["classList"]["remove"]("spin");
    let t = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x141f1, 0xa));
    t && t["classList"]["add"]("hidden"), e["classList"]["remove"]("prespin"), this["menuEl"]["classList"]["remove"]("prespinmode"), e["classList"]["remove"]("reveal3d"), this["menuEl"]["classList"]["remove"]("rv3dmode"), this["menuEl"]["classList"]["remove"]("casemode"), e["onmousedown"] = e["onmousemove"] = e["onmouseup"] = null, this["_rvRef"] &&= (this["_rvRef"]["remove"](), null);
    let n = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13e11, 0xa));
    let r = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x141ff, 0xd));
    if (n) {
      n["classList"]["remove"](__p_KGFS_MAIN_STR(0x1420e, 0x10)), r && r["parentElement"] === n && e["insertBefore"](r, n);
      let t = n["querySelector"](__p_KGFS_MAIN_STR(0x14222, 0xb));
      t && (t["onclick"] = null, t["disabled"] = !0x1, t["textContent"] = "EQUIP")
    }
    this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13dff, 0xe))["classList"]["remove"]("rv3d"), this["game"]["hideSkinViewer"](), this["refreshMenuChrome"]()
  } ["caseCovering"]() {
    let e = this["_caseOverlay"] ||= this["menuEl"] && this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13de1, 0xb));
    return !!e && e["style"]["display"] === "flex" && !e["classList"]["contains"]("reveal3d") && !e["classList"]["contains"]("prespin")
  } ["caseOpen"]() {
    let e = this["_caseOverlay"] ||= this["menuEl"] && this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13de1, 0xb));
    return !!e && e["style"]["display"] === "flex"
  } ["renderLocker"]() {
    let e = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x14230, 0xe));
    let t = {};
    for (let e in V) {
      let n = V[e]["class"];
      n !== "grenade" && n !== "c4" && (t[e] = [])
    }
    t["gloves"] = [];
    for (let e of H["items"]()) {
      let n = ps[e["skin"]];
      n && (t[n["weapon"]] = t[n["weapon"]] || [])["push"]({
        ["skin"]: n,
        ["item"]: e
      })
    }
    for (let e of Object["keys"](ht)) {
      t[e] = t[e] || []
    }
    for (let e of Object["keys"](ct)) {
      t[e] = t[e] || []
    }
    let n = [
      ["PISTOLS", ["pistol"]],
      ["SMGS", ["smg"]],
      ["HEAVY", ["shotgun", "mg"]],
      ["RIFLES", ["rifle"]],
      ["SNIPERS", ["sniper"]],
      ["TASER", ["zeus"]],
      ["KNIVES", ["knifemodel"]],
      ["GLOVES", ["glovemodel"]]
    ];
    let r = e => {
      return ht[e] ? "knifemodel" : ct[e] ? "glovemodel" : V[e] ? V[e]["class"] : ""
    };
    let i = H["ownedList"]()["length"] ? "" : __p_KGFS_MAIN_STR(0x14242, 0xa4);
    let a = {
      ["CT"]: {
        ["rc"]: __p_KGFS_MAIN_STR(0x142eb, 0x9),
        ["tint"]: __p_KGFS_MAIN_STR(0x142fb, 0x9)
      },
      ["T"]: {
        ["rc"]: __p_KGFS_MAIN_STR(0x1430b, 0x9),
        ["tint"]: __p_KGFS_MAIN_STR(0x14319, 0x9)
      }
    };
    for (let [e, o] of n) {
      let n = Object["keys"](t)["filter"](e => {
        return o["includes"](r(e))
      });
      if (!n["length"]) {
        continue
      }
      i += __p_KGFS_MAIN_STR(0x14329, 0x1e) + e + __p_KGFS_MAIN_STR(0x1434a, 0x20);
      let s = o[0x0] === "knifemodel" ? "knife" : o[0x0] === "glovemodel" ? "gloves" : null;
      if (s) {
        let e = !!H["equippedEntry"](s);
        let t = s === "gloves" ? () => {
          return "gloves"
        } : e => {
          return e === "T" ? "knife_t" : "knife"
        };
        let n = s === "gloves" ? "Gloves" : "Knife";
        i += __p_KGFS_MAIN_STR(0x1436f, 0x19) + ["CT", "T"]["map"](r => {
          return __p_KGFS_MAIN_STR(0x1438c, 0x31) + (e ? "" : "equipped") + __p_KGFS_MAIN_STR(0x143c1, 0x10) + s + __p_KGFS_MAIN_STR(0x143d4, 0x10) + r + __p_KGFS_MAIN_STR(0x143eb, 0x11) + a[r]["rc"] + __p_KGFS_MAIN_STR(0x14400, 0x2b) + n + __p_KGFS_MAIN_STR(0x14433, 0x54) + ju(t(r)) + __p_KGFS_MAIN_STR(0x14488, 0xb) + a[r]["tint"] + __p_KGFS_MAIN_STR(0x1449b, 0x31) + r + __p_KGFS_MAIN_STR(0x144cf, 0x91)
        })["join"]("") + __p_KGFS_MAIN_STR(0xdfcb, 0x8)
      }
      for (let e of n) {
        let n = t[e] || [];
        let r = ht[e] || ct[e] || (V[e] ? V[e]["name"] : e);
        let a = H["equippedUid"](e);
        if (s) {
          if (!n["length"]) {
            continue
          }
          let t = s === "knife" ? __p_KGFS_MAIN_STR(0x14566, 0xa8) + ju(e) + __p_KGFS_MAIN_STR(0x14614, 0x2f) + r + __p_KGFS_MAIN_STR(0x14645, 0x2f) : "";
          i += __p_KGFS_MAIN_STR(0x1436f, 0x19) + t + n["map"](e => {
            return Av(e["skin"], a === e["item"]["uid"] ? "equipped" : "", r, e["item"])
          })["join"]("") + __p_KGFS_MAIN_STR(0xdfcb, 0x8);
          continue
        }
        let o = __p_KGFS_MAIN_STR(0x14679, 0x24) + (n["length"] && !a ? "equipped" : "") + __p_KGFS_MAIN_STR(0x143c1, 0x10) + e + __p_KGFS_MAIN_STR(0x1469f, 0x41) + r + __p_KGFS_MAIN_STR(0x146e4, 0x38) + ju(e) + __p_KGFS_MAIN_STR(0x1471c, 0xbc);
        i += __p_KGFS_MAIN_STR(0x1436f, 0x19) + o + __p_KGFS_MAIN_STR(0x147da, 0xe) + n["map"](e => {
          return Av(e["skin"], a === e["item"]["uid"] ? "equipped" : "", r, e["item"])
        })["join"]("") + __p_KGFS_MAIN_STR(0xdfcb, 0x8)
      }
      i += __p_KGFS_MAIN_STR(0x147ed, 0xf)
    }
    i += __p_KGFS_MAIN_STR(0x14801, 0x50) + [
      ["c4", __p_KGFS_MAIN_STR(0x40e7, 0xf)],
      ["he", __p_KGFS_MAIN_STR(0x4092, 0xd)],
      ["flash", "Flashbang"],
      ["smoke", __p_KGFS_MAIN_STR(0x40a4, 0x10)],
      ["molotov", "Molotov"],
      ["incend", __p_KGFS_MAIN_STR(0x40ba, 0x17)],
      ["decoy", __p_KGFS_MAIN_STR(0x40d2, 0x10)],
      ["defkit", __p_KGFS_MAIN_STR(0x411e, 0xd)]
    ]["map"](([e, t]) => {
      return __p_KGFS_MAIN_STR(0x14858, 0x52) + e + __p_KGFS_MAIN_STR(0x148b0, 0x42) + t + __p_KGFS_MAIN_STR(0x148f8, 0x35) + ju(e) + __p_KGFS_MAIN_STR(0x14933, 0xc7)
    })["join"]("") + __p_KGFS_MAIN_STR(0x147ed, 0xf), e["innerHTML"] = i;
    let o = e => {
      let t = e["target"]["closest"] && e["target"]["closest"](__p_KGFS_MAIN_STR(0x149fe, 0xb));
      if (!t || t === this["_warmedTile"]) {
        return
      }
      this["_warmedTile"] = t;
      let n = t["dataset"]["skin"] ? ps[t["dataset"]["skin"]] : null;
      let r = t["dataset"]["gear"] || t["dataset"]["slot"] || n && n["weapon"];
      this["game"]["preloadInspect"] && this["game"]["preloadInspect"](r, t["dataset"]["team"])
    };
    e["onmouseover"] = o, e["ontouchstart"] = o, e["onclick"] = e => {
      let t = e["target"]["closest"](__p_KGFS_MAIN_STR(0x149fe, 0xb));
      if (t) {
        if (t["dataset"]["gear"]) {
          this["showInspect"](null, t["dataset"]["gear"]);
          return
        }
        if (e["target"]["closest"](__p_KGFS_MAIN_STR(0x14a0d, 0xa))) {
          let e = t["dataset"]["skin"] ? ps[t["dataset"]["skin"]] : null;
          this["showInspect"](e, t["dataset"]["slot"] || e && e["weapon"], t["dataset"]["team"], t["dataset"]["uid"] && H["item"](t["dataset"]["uid"]));
          return
        }
        t["classList"]["contains"]("default") ? H["unequip"](t["dataset"]["slot"]) : H["equip"](t["dataset"]["uid"]), this["game"]["syncOwnKnife"] && this["game"]["syncOwnKnife"](), this["game"]["audio"]["play"]("buy"), this["renderLocker"]()
      }
    }
  } ["reopenCaseInfoIfPending"]() {
    if (!this["_cinfFrom"]) {
      return
    }
    this["_cinfFrom"] = !0x1;
    let e = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x13d9b, 0xb));
    e && (e["style"]["display"] = "flex")
  } ["showInspect"](e, t, n, r, i = !0x1) {
    this["closeInspect"](!0x1), i && (this["_cinfFrom"] = !0x0), this["game"]["showSkinViewer"](e, t, {
      ["gloveTeam"]: n,
      ["item"]: r
    });
    let a = document["createElement"]("div");
    a["id"] = "inspectov";
    let o = !e && new Set(["c4", "he", "flash", "smoke", "molotov", "incend", "decoy", "zeus", "defkit"])["has"](t);
    let s = e ? e["name"] : o ? t === "defkit" ? __p_KGFS_MAIN_STR(0x411e, 0xd) : V[t]["name"] : "" + (t === "gloves" ? __p_KGFS_MAIN_STR(0x14a19, 0xe) + (n || "CT") + " " : t === "knife" ? __p_KGFS_MAIN_STR(0x14a2d, 0xd) + (n || "CT") + " " : V[t] ? V[t]["name"] + " \u2014 " : t + " \u2014 ") + "Default";
    let c = e && gs["find"](t => {
      return t["items"]["includes"](e["id"])
    }) || null;
    let l = e ? (as[e["rarity"]] || as["milspec"])["color"] : __p_KGFS_MAIN_STR(0x4250, 0x9);
    a["innerHTML"] = __p_KGFS_MAIN_STR(0x14a3e, 0x9) + (e && e["img"] ? __p_KGFS_MAIN_STR(0x14a49, 0x25) + e["img"] + __p_KGFS_MAIN_STR(0x14a75, 0x43) : "") + __p_KGFS_MAIN_STR(0x14a3e, 0x9) + Ov({
      ["name"]: s,
      ["caseDef"]: c,
      ["meta"]: e ? kv(e, r) : "",
      ["rc"]: l,
      ["hint"]: __p_KGFS_MAIN_STR(0x14abc, 0x5e)
    }) + __p_KGFS_MAIN_STR(0x14b1e, 0x6e) + (o || this["_cinfFrom"] ? "" : __p_KGFS_MAIN_STR(0x14b92, 0x3d)) + __p_KGFS_MAIN_STR(0x14bd7, 0x6c);
    let u = a["querySelector"](__p_KGFS_MAIN_STR(0x14c4b, 0xe));
    u && (u["onerror"] = () => {
      let e = u["closest"](__p_KGFS_MAIN_STR(0x14c5e, 0x9));
      e && e["classList"]["add"]("hide")
    }), a["onmousedown"] = e => {
      this["_inDrag"] = [e["clientX"], e["clientY"]], this["game"]["_skinView"] && (this["game"]["_skinView"]["dragging"] = !0x0)
    }, a["onmousemove"] = e => {
      let t = this["game"]["_skinView"];
      this["_inDrag"] && t && (t["grp"]["rotation"]["y"] += (e["clientX"] - this["_inDrag"][0x0]) * .011, t["grp"]["rotation"]["x"] += (e["clientY"] - this["_inDrag"][0x1]) * .007, t["vel"] = Math["max"](-2.2, Math["min"](2.2, (e["clientX"] - this["_inDrag"][0x0]) * .9)), this["_inDrag"] = [e["clientX"], e["clientY"]])
    }, a["onmouseup"] = () => {
      this["_inDrag"] = null, this["game"]["_skinView"] && (this["game"]["_skinView"]["dragging"] = !0x1)
    };
    let d = a["querySelector"](__p_KGFS_MAIN_STR(0x14c6d, 0xb));
    d && (d["onclick"] = () => {
      r ? H["equip"](r["uid"]) : H["unequip"](t), this["game"]["syncOwnKnife"] && this["game"]["syncOwnKnife"](), this["game"]["audio"]["play"]("buy"), this["closeInspect"](), this["renderLocker"]()
    }), a["querySelector"](__p_KGFS_MAIN_STR(0x14c7e, 0xb))["onclick"] = () => {
      return this["closeInspect"]()
    };
    let f = __p_KGFS_MAIN_STR(0x14c90, 0x77);
    let p = document["createElement"]("button");
    p["className"] = "mbtn", p["textContent"] = "\u2039", p["style"]["cssText"] = f + __p_KGFS_MAIN_STR(0x14d08, 0xd);
    let m = document["createElement"]("button");
    m["className"] = "mbtn", m["textContent"] = "\u203A", m["style"]["cssText"] = f + __p_KGFS_MAIN_STR(0x14d18, 0xe), a["appendChild"](p), a["appendChild"](m);
    let h;
    let g;
    if (this["_cinfFrom"] && this["_cinfWalk"] && this["_cinfWalk"]["length"]) {
      h = this["_cinfWalk"]["map"](e => {
        return ps[e]
      })["filter"](Boolean)["map"](e => {
        return {
          ["skin"]: e,
          ["slot"]: e["slot"] || e["weapon"],
          ["fromCase"]: !0x0
        }
      }), g = this["_cinfIdx"] | 0x0
    } else {
      h = [];
      let i = [...Object["keys"](V)["filter"](e => {
        return V[e]["vm"]
      }), ...Object["keys"](ht), ...Object["keys"](ct), "defkit"];
      for (let e of i) {
        ht[e] || ct[e] ? (h["push"]({
          ["slot"]: e,
          ["skin"]: null,
          ["team"]: "CT"
        }), h["push"]({
          ["slot"]: e,
          ["skin"]: null,
          ["team"]: "T"
        })) : h["push"]({
          ["slot"]: e,
          ["skin"]: null
        });
        for (let t of H["items"]()) {
          let n = ps[t["skin"]];
          n && n["weapon"] === e && h["push"]({
            ["slot"]: e,
            ["skin"]: n,
            ["item"]: t
          })
        }
      }
      g = h["findIndex"](i => {
        return i["slot"] === t && (r && i["item"] && i["item"]["uid"] === r["uid"] || !i["skin"] && !e && (!i["team"] || i["team"] === (n || "CT")))
      })
    }
    let _ = e => {
      if (!h["length"]) {
        return
      }
      let t = ((g < 0x0 ? 0x0 : g) + e + h["length"]) % h["length"];
      let n = h[t];
      n["fromCase"] && (this["_cinfIdx"] = t), this["showInspect"](n["skin"], n["slot"], n["team"], n["item"], !!n["fromCase"])
    };
    p["onclick"] = e => {
      e["stopPropagation"](), _(-0x1)
    }, m["onclick"] = e => {
      e["stopPropagation"](), _(0x1)
    }, this["menuEl"]["appendChild"](a), this["menuEl"]["classList"]["add"]("rv3dmode"), this["_inspectOv"] = a
  } ["closeInspect"](e = !0x0) {
    this["_inspectOv"] && (this["_inspectOv"]["remove"](), this["_inspectOv"] = null, this["menuEl"]["classList"]["remove"]("rv3dmode")), this["game"]["hideSkinViewer"](), this["_inDrag"] = null, e && this["reopenCaseInfoIfPending"]()
  } ["renderLoadout"]() {
    let e = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1307b, 0xa));
    if (!e) {
      return
    }
    let t = () => {
      return e["style"]["setProperty"]("--los", String(Math["max"](0x1, Math["min"](1.4, innerHeight / 0x438))))
    };
    t(), this["_loFitWired"] || (this["_loFitWired"] = !0x0, window["addEventListener"]("resize", t));
    let n = this["_loTeam"] || "CT";
    let r = Gm(n);
    let i = n === "CT" ? __p_KGFS_MAIN_STR(0x142eb, 0x9) : __p_KGFS_MAIN_STR(0x1430b, 0x9);
    let a = e => {
      return __p_KGFS_MAIN_STR(0x14d26, 0x2e) + ju(e) + __p_KGFS_MAIN_STR(0x14488, 0xb) + i + __p_KGFS_MAIN_STR(0x14d5a, 0x8)
    };
    let o = this["_loPick"];
    let s = (e, t, n, r) => {
      let i = o && o["cat"] === e && o["idx"] === t;
      return __p_KGFS_MAIN_STR(0x14d62, 0x1b) + (r ? __p_KGFS_MAIN_STR(0x14d81, 0x8) : "") + (i ? " sel" : "") + __p_KGFS_MAIN_STR(0x14d8c, 0xf) + e + __p_KGFS_MAIN_STR(0x14d9f, 0xf) + t + "\"" + (r ? __p_KGFS_MAIN_STR(0x14db3, 0xb) : "") + __p_KGFS_MAIN_STR(0x14dbf, 0xa) + (r ? __p_KGFS_MAIN_STR(0x14dce, 0x1b) : __p_KGFS_MAIN_STR(0x14deb, 0x3b)) + __p_KGFS_MAIN_STR(0x14e29, 0x1d) + (t + 0x1) + __p_KGFS_MAIN_STR(0x14e4d, 0x24) + eh(n) + __p_KGFS_MAIN_STR(0xe0d5, 0x9) + a(n) + (r ? "" : __p_KGFS_MAIN_STR(0x14e72, 0x2e)) + __p_KGFS_MAIN_STR(0x14ea4, 0xb)
    };
    let c = (e, t, n) => {
      return __p_KGFS_MAIN_STR(0x14eb6, 0x17) + (n ? __p_KGFS_MAIN_STR(0x14d81, 0x8) : "") + __p_KGFS_MAIN_STR(0x14ed3, 0x1e) + e + (n ? __p_KGFS_MAIN_STR(0x14ef8, 0x3b) : "") + __p_KGFS_MAIN_STR(0xdfcb, 0x8) + t + __p_KGFS_MAIN_STR(0xdfcb, 0x8)
    };
    let l = __p_KGFS_MAIN_STR(0x14f38, 0xc8);
    if (l += __p_KGFS_MAIN_STR(0x15006, 0x3f) + (n === "CT" ? " sel" : "") + __p_KGFS_MAIN_STR(0x15048, 0x52) + (n === "T" ? " sel" : "") + __p_KGFS_MAIN_STR(0x1509d, 0x2a), l += __p_KGFS_MAIN_STR(0x150c9, 0x17), l += c("Equipment", zm[n]["map"]((e, t) => {
        return s("equipment", t, e, !0x0)
      })["join"](""), !0x0), l += c("Pistols", __p_KGFS_MAIN_STR(0x150e6, 0x4b) + s("secondary", 0x0, r["secondary"][0x0], !0x1) + __p_KGFS_MAIN_STR(0x15134, 0x33) + r["secondary"]["slice"](0x1)["map"]((e, t) => {
        return s("secondary", t + 0x1, e, !0x1)
      })["join"](""), !0x1), l += c(__p_KGFS_MAIN_STR(0xb8eb, 0xa), r["smg"]["map"]((e, t) => {
        return s("smg", t, e, !0x1)
      })["join"](""), !0x1), l += c("Rifles", r["rifle"]["map"]((e, t) => {
        return s("rifle", t, e, !0x1)
      })["join"](""), !0x1), l += c("Grenades", Bm[n]["map"]((e, t) => {
        return s("grenade", t, e, !0x0)
      })["join"](""), !0x0), l += __p_KGFS_MAIN_STR(0xdfcb, 0x8), l += __p_KGFS_MAIN_STR(0x15169, 0x40) + n + __p_KGFS_MAIN_STR(0x151ac, 0xb1), l += __p_KGFS_MAIN_STR(0x15260, 0x1f), o) {
      let e = Um(n, o["cat"], o["idx"]);
      let t = r[o["cat"]][o["idx"]];
      let i = o["cat"] === "secondary" && o["idx"] === 0x0 ? __p_KGFS_MAIN_STR(0x15282, 0x28) : "" + Fm[o["cat"]] + __p_KGFS_MAIN_STR(0x152af, 0xb) + (o["idx"] + 0x1);
      l += __p_KGFS_MAIN_STR(0x152bd, 0xbd) + i + __p_KGFS_MAIN_STR(0x15380, 0xd) + (n === "CT" ? __p_KGFS_MAIN_STR(0xd589, 0x17) : "Terrorists") + __p_KGFS_MAIN_STR(0x15393, 0x84) + e["map"](e => {
        let n = r[o["cat"]]["indexOf"](e);
        let i = e === t ? __p_KGFS_MAIN_STR(0x1541b, 0x33) : n >= 0x0 ? __p_KGFS_MAIN_STR(0x15454, 0x2d) + (n + 0x1) + __p_KGFS_MAIN_STR(0xe0d5, 0x9) : "";
        let s = (th[e] || [""])[0x0];
        return __p_KGFS_MAIN_STR(0x15482, 0x1a) + (e === t ? " sel" : "") + (n >= 0x0 && e !== t ? " used" : "") + __p_KGFS_MAIN_STR(0x154a2, 0xe) + e + __p_KGFS_MAIN_STR(0x1368b, 0xb) + s + __p_KGFS_MAIN_STR(0x154b3, 0x23) + eh(e) + __p_KGFS_MAIN_STR(0x154de, 0x28) + s + __p_KGFS_MAIN_STR(0xe0d5, 0x9) + a(e) + __p_KGFS_MAIN_STR(0x1550d, 0x1e) + $m(e) + __p_KGFS_MAIN_STR(0xe0d5, 0x9) + i + __p_KGFS_MAIN_STR(0x14ea4, 0xb)
      })["join"]("") + __p_KGFS_MAIN_STR(0x1552d, 0xb7)
    }
    e["innerHTML"] = l
  } ["_loToast"](e) {
    let t = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x155e7, 0xb));
    t && (t["textContent"] = e, t["classList"]["add"]("show"), clearTimeout(this["_loToastT"]), this["_loToastT"] = setTimeout(() => {
      return t["classList"]["remove"]("show")
    }, 0x898))
  } ["_loadoutKey"](e) {
    let t = Gm(e);
    return e + ":" + t["secondary"]["join"](",") + "|" + t["smg"]["join"](",") + "|" + t["rifle"]["join"](",")
  } ["buildBuyMenu"](e) {
    this["buyTeam"] = e || null;
    let t = e === "T" ? "T" : "CT";
    let n = t === "CT" ? __p_KGFS_MAIN_STR(0x142eb, 0x9) : __p_KGFS_MAIN_STR(0x1430b, 0x9);
    let r = !this["game"]["modeCtl"];
    let i = [];
    let a = (e, t) => {
      let a = ju(e);
      return i["push"](a), __p_KGFS_MAIN_STR(0x155f7, 0x29) + e + __p_KGFS_MAIN_STR(0x15626, 0xf) + t + __p_KGFS_MAIN_STR(0x15639, 0x23) + t + __p_KGFS_MAIN_STR(0x15662, 0x2a) + eh(e) + __p_KGFS_MAIN_STR(0x1568f, 0x37) + a + __p_KGFS_MAIN_STR(0x14488, 0xb) + n + __p_KGFS_MAIN_STR(0x14d5a, 0x8) + (r ? "" : __p_KGFS_MAIN_STR(0x156ce, 0x1e) + $m(e) + __p_KGFS_MAIN_STR(0xe0d5, 0x9)) + (r ? "" : '<span class="bm-ref" data-id="' + e + '" title="Refund purchase"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/></svg></span>') + __p_KGFS_MAIN_STR(0x14ea4, 0xb)
    };
    let o = "";
    for (let e of Xm(t)) {
      o += __p_KGFS_MAIN_STR(0x156f1, 0x1b) + e["cat"] + __p_KGFS_MAIN_STR(0x14d8c, 0xf) + e["cat"] + __p_KGFS_MAIN_STR(0x15626, 0xf) + e["key"] + __p_KGFS_MAIN_STR(0x1570e, 0x3b) + e["key"] + __p_KGFS_MAIN_STR(0x1574a, 0x2a) + e["title"] + __p_KGFS_MAIN_STR(0x15777, 0x2b) + e["items"]["map"]((e, t) => {
        return a(e, t + 0x1)
      })["join"]("") + __p_KGFS_MAIN_STR(0x147ed, 0xf)
    }
    let s = r ? __p_KGFS_MAIN_STR(0x157a4, 0xab) : __p_KGFS_MAIN_STR(0x15854, 0x113);
    this["buyEl"]["innerHTML"] = __p_KGFS_MAIN_STR(0x1596a, 0x34) + s + __p_KGFS_MAIN_STR(0x159a0, 0x88) + o + __p_KGFS_MAIN_STR(0x15a2d, 0x117) + (r ? "" : __p_KGFS_MAIN_STR(0x15b46, 0xc7)) + __p_KGFS_MAIN_STR(0x15c12, 0x40), this["_bmGroundKey"] = null, this["_bmGround"] = [], this["buyEl"]["style"]["display"] = "none", this["_buyLoKey"] = this["_loadoutKey"](t), this["_bmCol"] = null, this["_warmBuyIcons"](i);
    let c = () => {
      let e = !!this["_menuCompact"];
      if (this["buyEl"]["classList"]["toggle"]("compact", e), this["root"]["classList"]["toggle"](__p_KGFS_MAIN_STR(0x15c56, 0xe), e && !!this["buyOpen"]), e) {
        let e = Math["round"](.03 * innerWidth);
        let t = Math["min"]((innerWidth - e - 0x18 - .3 * innerHeight) / 0x3b6, (innerHeight - 0x60) / Ev);
        this["buyEl"]["style"]["setProperty"]("--bms", String(Math["max"](.4, Math["min"](0x1, t)))), this["buyEl"]["style"]["setProperty"](__p_KGFS_MAIN_STR(0x15c6a, 0xb), e + "px");
        return
      }
      let t = Math["min"](.52 * innerWidth, 0x3b6);
      let n = Math["round"](.05 * innerWidth);
      let r = innerHeight / 0x438 * 1.1;
      r = Math["min"](r, (innerWidth - n - 0x28 - .4 * innerHeight) / t, (innerHeight - 0x6e) / 0x2a8), this["buyEl"]["style"]["setProperty"]("--bms", String(Math["max"](.55, Math["min"](1.7, r)))), this["buyEl"]["style"]["setProperty"](__p_KGFS_MAIN_STR(0x15c6a, 0xb), n + "px")
    };
    c(), this["_buyWired"] || (this["_buyWired"] = !0x0, window["addEventListener"]("resize", c), this["buyEl"]["addEventListener"]("click", e => {
      // CS2-style per-item refund: the revert icon lives INSIDE the item row,
      // so it must be checked before the generic .bm-item buy handler
      let f = e["target"]["closest"](".bm-ref");
      if (f) {
        this["game"]["refundOne"](f["dataset"]["id"]), this["refreshBuyMoney"](!0x0), this["_syncBuyPreview"]();
        return
      }
      let t = e["target"]["closest"](__p_KGFS_MAIN_STR(0x15c79, 0xa));
      if (t) {
        this["game"]["tryBuy"](t["dataset"]["id"], {
          ["throw"]: !!(e["shiftKey"] || e["ctrlKey"])
        }), this["refreshBuyMoney"](!0x0), this["_syncBuyPreview"]();
        return
      }
      let n = e["target"]["closest"](__p_KGFS_MAIN_STR(0x15c85, 0x14));
      if (n) {
        let e = this["_bmGround"] && this["_bmGround"][+n["dataset"]["i"]];
        e && this["game"]["pickDrop"](e), this["refreshBuyMoney"](!0x0);
        return
      }
      let r = e["target"]["closest"](__p_KGFS_MAIN_STR(0x15c9d, 0xd));
      if (r) {
        let e = r["dataset"]["act"];
        e === "rebuy" ? this["game"]["rebuyPrevious"]() : e === "autobuy" ? this["game"]["autoBuy"]() : e === "refund" ? this["game"]["refundAll"]() : e === "back" && this["closeBuy"](), this["refreshBuyMoney"](!0x0)
      }
    }), this["buyEl"]["addEventListener"]("mouseover", e => {
      let t = e["target"]["closest"](__p_KGFS_MAIN_STR(0x15c79, 0xa));
      t && (this["_bmHoverId"] = t["dataset"]["id"], this["showBuyInfo"](t["dataset"]["id"]))
    }), this["buyEl"]["addEventListener"]("mouseout", e => {
      e["target"]["closest"](__p_KGFS_MAIN_STR(0x15c79, 0xa)) && (e["relatedTarget"] && e["relatedTarget"]["closest"] && e["relatedTarget"]["closest"](__p_KGFS_MAIN_STR(0x15c79, 0xa)) || (this["_bmHoverId"] = null, this["_syncBuyPreview"]()))
    }))
  } ["showBuyInfo"](e) {
    this["game"]["buyPreviewWeapon"](e)
  } ["_syncBuyPreview"]() {
    this["game"]["buyPreviewWeapon"](this["_bmHoverId"] || this["game"]["weapons"]["current"])
  } ["buyBack"]() {
    return this["_bmCol"] != null && (this["_bmCol"] = null, this["refreshBuyMoney"](!0x0), !0x0)
  } ["_buyKeys"]() {
    let e = this["game"]["input"];
    let t = this["game"];
    for (let n = 0x1; n <= 0x5; n++) {
      if (e["wasPressed"]("Digit" + n) || e["wasPressed"]("Numpad" + n)) {
        if (this["_bmCol"] == null) {
          this["_bmCol"] = n
        } else {
          let r = this["buyEl"]["querySelector"](__p_KGFS_MAIN_STR(0x15cac, 0x17) + this["_bmCol"] + "\"]");
          let i = r && r["querySelectorAll"](__p_KGFS_MAIN_STR(0x15c79, 0xa))[n - 0x1];
          i && (t["tryBuy"](i["dataset"]["id"], {
            ["throw"]: e["keys"]["has"]("ShiftLeft") || e["keys"]["has"]("ShiftRight") || e["keys"]["has"]("ControlLeft") || e["keys"]["has"]("ControlRight")
          }), this["_syncBuyPreview"]())
        }
        this["refreshBuyMoney"](!0x0)
      }
    }(e["wasPressed"]("KeyR") || e["wasPressed"]("F4")) && (t["rebuyPrevious"](), this["refreshBuyMoney"](!0x0), this["_syncBuyPreview"]()), (e["wasPressed"]("Enter") || e["wasPressed"]("NumpadEnter") || e["wasPressed"]("F3")) && (t["autoBuy"](), this["refreshBuyMoney"](!0x0), this["_syncBuyPreview"]()), (e["wasPressed"]("Backspace") || e["wasPressed"]("Delete")) && (t["refundAll"](), this["refreshBuyMoney"](!0x0))
  } ["_warmBuyIcons"](e) {
    if (!this["_buyIconsArmed"]) {
      this["_buyIconsArmed"] = !0x0;
      try {
        ku()["then"](() => {
          return this["buildBuyMenu"](this["buyTeam"])
        })
      } catch {}
    }
    for (let t of e) {
      let e = new Image;
      e["src"] = t, e["decode"] && e["decode"]()["catch"](() => {})
    }
  } ["openBuy"]() {
    let e = this["game"]["player"]["team"];
    (this["buyTeam"] !== e || this["_buyLoKey"] !== this["_loadoutKey"](e)) && this["buildBuyMenu"](e), this["buyOpen"] = !0x0, this["_bmCol"] = null, this["_bmHoverId"] = null, this["pauseEl"]["style"]["display"] = "none", this["buyEl"]["style"]["display"] = "block", this["root"]["classList"]["toggle"](__p_KGFS_MAIN_STR(0x15c56, 0xe), this["buyEl"]["classList"]["contains"]("compact")), this["refreshBuyMoney"](!0x0), this["game"]["input"]["unlock"](), this["game"]["buyPreviewOn"](), this["buyEl"]["classList"]["toggle"]("dim3d", !!this["game"]["_buyPreview"])
  } ["closeBuy"]() {
    if (this["buyOpen"] = !0x1, this["_bmCol"] = null, this["buyEl"]["style"]["display"] = "none", this["root"]["classList"]["remove"](__p_KGFS_MAIN_STR(0x15c56, 0xe)), this["game"]["buyPreviewOff"](), this["game"]["state"] === "playing") {
      let e = this["game"]["input"];
      let t = () => {
        e["onLockError"] === t && (e["onLockError"] = null), this["game"]["state"] === "playing" && !e["locked"] && !this["buyOpen"] && !this["pauseMode"] && this["showPause"]()
      };
      e["onLockError"] = t, e["requestLock"](), setTimeout(() => {
        e["onLockError"] === t && t()
      }, 0x5dc)
    }
  } ["refreshBuyMoney"](e) {
    let t = this["game"];
    let n = t["player"];
    let r = t["modeCtl"];
    let i = this["buyEl"]["querySelector"](__p_KGFS_MAIN_STR(0x15cc7, 0xb));
    i && (i["textContent"] = "$" + n["money"]);
    let a = this["buyEl"]["querySelector"](__p_KGFS_MAIN_STR(0x15cd7, 0xb));
    if (a && r && r["buyTimeLeft"]) {
      let e = Math["max"](0x0, Math["ceil"](r["buyTimeLeft"]()));
      a["textContent"] = String(Math["floor"](e / 0x3c))["padStart"](0x2, "0") + ":" + String(e % 0x3c)["padStart"](0x2, "0")
    }
    let o = this["buyEl"]["querySelector"](__p_KGFS_MAIN_STR(0x15ce9, 0x9));
    o && r && r["nextRoundMin"] && (o["textContent"] = __p_KGFS_MAIN_STR(0x15cf9, 0x1a) + r["nextRoundMin"](n)["toLocaleString"]("en-US"));
    for (let e of this["buyEl"]["querySelectorAll"](__p_KGFS_MAIN_STR(0x15d17, 0x9))) {
      e["classList"]["toggle"]("sel", +e["dataset"]["key"] === this["_bmCol"])
    }
    for (let e of this["buyEl"]["querySelectorAll"](__p_KGFS_MAIN_STR(0x15c79, 0xa))) {
      let i = e["dataset"]["id"];
      let a = V[i] || Mo[i];
      if (!a) {
        continue
      }
      let o = !!r && $m(i) > n["money"];
      let s = a["class"] === "grenade" && !t["weapons"]["grenadeRoom"](i);
      let c = !0x1;
      Mo[i] ? c = i === "defkit" ? !!(r && r["playerKit"]) : n["armor"] >= 0x64 && (i === "kevlar" || n["helmet"]) : a["class"] === "zeus" ? c = !!t["weapons"]["zeusOwned"] : a["class"] !== "grenade" && (c = t["weapons"]["slots"][a["slot"] || (a["class"] === "pistol" ? 0x2 : 0x1)] === i), e["classList"]["toggle"]("cant", o || s), e["classList"]["toggle"]("own", c);
      // CS2-style refund: show the revert icon only on items bought this round
      e["classList"]["toggle"]("hasref", !!t["canRefundItem"] && t["canRefundItem"](i))
    }
    if (e || t["time"] - (this["_bmGroundT"] || -0x9) > .25) {
      this["_bmGroundT"] = t["time"];
      let e = this["buyEl"]["querySelector"](__p_KGFS_MAIN_STR(0x15d25, 0xd));
      if (e) {
        let r = t["drops"]["filter"](e => {
          return e["settled"] && Math["hypot"](e["x"] - n["x"], e["z"] - n["z"]) < 0x6 && Math["abs"](e["y"] - n["y"]) < 2.5
        });
        let i = new Map;
        for (let e of r) {
          let t = i["get"](e["id"]) || {
            ["d"]: e,
            ["n"]: 0x0
          };
          t["n"]++, i["set"](e["id"], t)
        }
        let a = [...i]["map"](([e, t]) => {
          return e + t["n"]
        })["join"]("|");
        if (a !== this["_bmGroundKey"]) {
          this["_bmGroundKey"] = a, this["_bmGround"] = [...i["values"]()]["map"](e => {
            return e["d"]
          });
          let t = n["team"] === "CT" ? __p_KGFS_MAIN_STR(0x142eb, 0x9) : __p_KGFS_MAIN_STR(0x1430b, 0x9);
          e["innerHTML"] = this["_bmGround"]["map"]((e, n) => {
            let r = i["get"](e["id"]);
            return __p_KGFS_MAIN_STR(0x15d33, 0x32) + n + __p_KGFS_MAIN_STR(0x15d6b, 0x30) + ju(e["id"]) + __p_KGFS_MAIN_STR(0x14488, 0xb) + t + __p_KGFS_MAIN_STR(0x15d9c, 0x2d) + r["n"] + __p_KGFS_MAIN_STR(0x15dce, 0x2e) + eh(e["id"]) + __p_KGFS_MAIN_STR(0x15dfd, 0x14)
          })["join"]("")
        }
        this["buyEl"]["querySelector"](__p_KGFS_MAIN_STR(0x15e17, 0xd))["classList"]["toggle"]("bare", !(this["_bmGround"] && this["_bmGround"]["length"]))
      }
    }
  } ["_hwNotice"]() {
    if (!this["menuEl"]) {
      return
    }
    let e = this["game"] && this["game"]["_device"];
    let t = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x15e24, 0xb));
    if (!(e && e["software"] && !bv())) {
      t && t["remove"]();
      return
    }
    if (t) {
      return
    }
    t = document["createElement"]("div"), t["id"] = "hwnotice";
    let n = document["createElement"]("b");
    n["textContent"] = __p_KGFS_MAIN_STR(0x15e34, 0x23);
    let r = document["createElement"]("div");
    r["textContent"] = __p_KGFS_MAIN_STR(0x15e5b, 0x6a) + Sv();
    let i = document["createElement"]("button");
    i["type"] = "button", i["textContent"] = "X", i["title"] = "Dismiss", i["onclick"] = () => {
      xv(), t["remove"]()
    }, t["append"](n, r, i), this["menuEl"]["appendChild"](t)
  } ["_lockNotice"]() {
    let e = this["game"] && this["game"]["input"];
    let t = !!(e && e["_lockRescued"]) && !yr();
    for (let e of [this["menuEl"], this["pauseEl"]]) {
      if (!e) {
        continue
      }
      let n = e["querySelector"](__p_KGFS_MAIN_STR(0x15ec8, 0x1f));
      if (!t) {
        n && n["remove"]();
        continue
      }
      if (n) {
        continue
      }
      let r = document["createElement"]("div");
      r["id"] = e === this["menuEl"] ? "locknotice" : "locknotice2";
      let i = document["createElement"]("b");
      i["textContent"] = __p_KGFS_MAIN_STR(0x15eea, 0x1e);
      let a = document["createElement"]("div");
      a["textContent"] = __p_KGFS_MAIN_STR(0x15f0b, 0xc0) + xr();
      let o = document["createElement"]("button");
      o["type"] = "button", o["textContent"] = "X", o["title"] = "Dismiss", o["onclick"] = () => {
        br(), this["_lockNotice"]()
      }, r["append"](i, a, o), e["appendChild"](r)
    }
  } ["setPlayLoading"](e) {
    let t = this["menuEl"] && this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x15fcf, 0xb));
    if (t) {
      if (e) {
        this["_joinPct"] = 0x0, t["classList"]["add"]("loading"), this["_paintPlayLoading"](0x0, "STARTING")
      } else {
        if (t["classList"]["contains"]("loading")) {
          t["classList"]["remove"]("loading");
          let e = t["querySelector"](__p_KGFS_MAIN_STR(0x15fdf, 0xb));
          e && (e["textContent"] = "PLAY");
          let n = t["querySelector"](__p_KGFS_MAIN_STR(0x15fee, 0xb));
          n && (n["textContent"] = "");
          let r = t["querySelector"](__p_KGFS_MAIN_STR(0x15ffb, 0xb));
          r && (r["style"]["width"] = "0%")
        }
      }
    }
  } ["_paintPlayLoading"](e, t) {
    let n = this["menuEl"] && this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x15fcf, 0xb));
    if (!n || !n["classList"]["contains"]("loading")) {
      return
    }
    let r = n["querySelector"](__p_KGFS_MAIN_STR(0x15fdf, 0xb));
    let i = n["querySelector"](__p_KGFS_MAIN_STR(0x15fee, 0xb));
    let a = n["querySelector"](__p_KGFS_MAIN_STR(0x15ffb, 0xb));
    r && (r["textContent"] = __p_KGFS_MAIN_STR(0x1600b, 0xa) + e + "%"), i && t && (i["textContent"] = t), a && (a["style"]["width"] = e + "%")
  } ["showMenu"]() {
    this["menuEl"]["style"]["display"] = "none";
    // new CS2-style main menu shell (index.html #menu-root) replaces the old
    // JS-built menuEl; the old element stays in the DOM but is never shown
    this["_mmRoot"] = this["_mmRoot"] || document["getElementById"]("menu-root");
    if (this["_mmRoot"]) {
      this["_mmRoot"]["classList"]["add"]("open");
      // returning from a match: drop any open settings/market/inventory view
      this["_mmRoot"]["_showHome"] && this["_mmRoot"]["_showHome"]();
      if (!this["_mmWired"]) {
        this["_mmWired"] = !0x0;
        try {
          this["_wireMainMenu"]()
        } catch {}
      }
    }
    this["setPlayLoading"](!0x1), this["_syncSettingsRows"](), this["_hwNotice"](), this["_lockNotice"](), this["_syncFsBtn"] && this["_syncFsBtn"](), this["pauseEl"]["style"]["display"] = "none", this["buyEl"]["style"]["display"] = "none", this["root"]["classList"]["add"]("inmenu"), document["body"]["classList"]["add"]("menuopen"), this["refreshMenuChrome"](), this["renderBinds"]();
    let e = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x16016, 0xf));
    if (e) {
      for (let t of e["children"]) {
        t["classList"]["toggle"]("sel", t["dataset"]["v"] === this["game"]["quality"])
      }
    }
  } ["hideMenu"]() {
    this["menuEl"]["style"]["display"] = "none", this["_mmRoot"] && this["_mmRoot"]["classList"]["remove"]("open"), this["setPlayLoading"](!0x1), this["root"]["classList"]["remove"]("inmenu"), document["body"]["classList"]["remove"]("menuopen")
  }
  // ------------------------------------------------------------------ main menu bridge
  // Wires the static #menu-root shell (index.html) to the game: match start,
  // bot difficulty + count (practice only, pre-match only), and the main-menu
  // settings (persisted to the same clutcher_* keys the game reads, with live
  // applies via the game's own setters). The in-game pause settings (pauseEl)
  // are untouched.
  ["_wireMainMenu"]() {
    let root = this["_mmRoot"];
    let game = this["game"];
    if (!root || !game) return;
    try {
      console.log("[mm] bridge v5 wired")
    } catch {}
    let q = e => root.querySelector(e);
    let store = (e, t) => {
      try {
        localStorage.setItem(e, t)
      } catch {}
    };
    let read = (e, t) => {
      try {
        let n = localStorage.getItem(e);
        return n === null ? t : n
      } catch {
        return t
      }
    };
    let click = () => {
      try {
        game.audio.play("uiclick")
      } catch {}
    };
    let toast = e => root._showToast && root._showToast(e);
    let paints = [];

    // ---- marketplace + inventory views: refresh content when they open
    let mkBtn = q("#mmMarketBtn"), mkTab = q("#mmMarketTab"), invTabBtn = q("#mmInvTab");
    mkBtn && mkBtn.addEventListener("click", () => {
      this["_dismissMkHint"](), this["renderMarket"]()
    });
    mkTab && mkTab.addEventListener("click", () => {
      this["_dismissMkHint"](), this["renderMarket"]()
    });
    invTabBtn && invTabBtn.addEventListener("click", () => this["renderLocker"]());

    // ---- profile square (top right): options -> Log out with confirmation.
    // Confirming disconnects from any match FIRST, then logs the account out
    // and forces the login gate back up.
    let userBtn = q("#mmUserBtn");
    if (userBtn && !document.getElementById("mmUserMenu")) {
      let um = document.createElement("div");
      um.id = "mmUserMenu";
      um.innerHTML = '<div class="umu-item" id="umuLogout">Log out</div>';
      document.body.appendChild(um);
      userBtn.addEventListener("click", e => {
        e.stopPropagation();
        let rr = userBtn.getBoundingClientRect();
        um.style.top = rr.bottom + 8 + "px";
        um.style.right = Math.max(8, innerWidth - rr.right) + "px";
        um.classList.toggle("show");
      });
      document.addEventListener("click", e => {
        if (!um.contains(e.target) && !userBtn.contains(e.target)) um.classList.remove("show");
      });
      let cm = null;
      um.querySelector("#umuLogout").onclick = () => {
        um.classList.remove("show");
        if (!cm) {
          cm = document.createElement("div");
          cm.id = "mmConfirm";
          cm.innerHTML = '<div class="mmc-box"><div class="mmc-text" id="mmcText"></div>'
            + '<div class="mmc-row"><button id="mmcYes" type="button">Yes i am sure</button>'
            + '<button id="mmcNo" type="button">No take me back!</button></div></div>';
          document.body.appendChild(cm);
          cm.querySelector("#mmcNo").onclick = () => cm.classList.remove("show");
        }
        cm.querySelector("#mmcText").textContent = "Are you sure you want to log out of the current account ("
          + (this["_inv"] && this["_inv"]["username"] || this["playerName"]())
          + ") you are logged into? it also disconnects you from the game";
        cm.classList.add("show");
        cm.querySelector("#mmcYes").onclick = () => {
          cm.classList.remove("show");
          // 1. leave any match first (practice or online)
          try {
            if (game.state === "playing" || game.state === "teamselect") game.toMenu();
          } catch {}
          try {
            this["_mmNet"] && this["_mmNet"]["isConnected"] && this["_mmNet"]["isConnected"]() && this["_mmNet"]["disconnectOnline"]();
          } catch {}
          // 2. revoke the session and clear the browser token
          try {
            fetch(WS_BASE.replace("wss://", "https://") + "/auth/logout", {
              method: "POST", headers: { Authorization: "Bearer " + (localStorage.getItem("clutcher_auth_token") || "") }
            })["catch"](() => {});
          } catch {}
          try { localStorage.removeItem("clutcher_auth_token") } catch {}
          this["_inv"] = null, H["__server"] = !0x1;
          let ap = document.getElementById("authpanel");
          ap && ap.classList.remove("in");
          let aps = document.getElementById("apStatus");
          aps && (aps.textContent = "LOGGED OUT");
          this["_syncMenuTokens"]();
          // 3. the login gate comes back
          this["_requireAuth"]();
        };
      };
    }

    // ---- play: category (matchmaking is a locked placeholder, practice plays)
    let goBtn = q("#mmGoBtn");
    let botDiffWrap = q("#mmBotDiffWrap");
    let botsWrap = q("#mmBotsWrap");
    let catTabs = [...root.querySelectorAll(".cat-tab[data-mmcat]")];
    let setCat = e => {
      store("clutcher_cat", e);
      for (let t of catTabs) t.classList.toggle("active", t.dataset.mmcat === e);
      let t = e === "practice";
      botDiffWrap.classList.toggle("visible", t), botsWrap.classList.toggle("visible", t)
    };
    for (let t of catTabs) t.addEventListener("click", () => {
      setCat(t.dataset.mmcat), click()
    });

    // ---- play: mode (practice only)
    let modeTabs = [...root.querySelectorAll(".mode-tab[data-mmmode]")];
    let setMode = e => {
      store("clutcher_mode", e);
      for (let t of modeTabs) t.classList.toggle("active", t.dataset.mmmode === e)
    };
    for (let t of modeTabs) t.addEventListener("click", () => {
      setMode(t.dataset.mmmode), click()
    });

    // ---- bot difficulty (only selectable here, before starting practice)
    let diffMenu = q("#mmBotDiffMenu");
    q("#mmBotDiffBtn").addEventListener("click", e => {
      e.stopPropagation(), diffMenu.classList.toggle("open")
    }), document.addEventListener("click", () => diffMenu.classList.remove("open"));
    let setDiff = e => {
      store("clutcher_diff", String(e));
      for (let t of diffMenu.querySelectorAll(".bot-diff-item")) t.classList.toggle("selected", t.dataset.value === String(e))
    };
    for (let t of diffMenu.querySelectorAll(".bot-diff-item")) t.addEventListener("click", e => {
      e.stopPropagation(), setDiff(parseInt(t.dataset.value) || 0), diffMenu.classList.remove("open"), click()
    });

    // ---- bot count stepper
    let botsVal = q("#mmBotsVal");
    let setBots = e => {
      e = Math.max(0, Math.min(16, e | 0)), store("clutcher_botcount", String(e)), botsVal.textContent = String(e)
    };
    q("#mmBotsMinus").addEventListener("click", () => {
      setBots((parseInt(read("clutcher_botcount", "10")) || 0) - 1), click()
    }), q("#mmBotsPlus").addEventListener("click", () => {
      setBots((parseInt(read("clutcher_botcount", "10")) || 0) + 1), click()
    });

    // ---- map cards
    let mapCards = [...root.querySelectorAll(".map-col[data-map]")];
    let setMap = e => {
      for (let t of mapCards) t.classList.toggle("sel", t.dataset.map === e)
    };
    for (let t of mapCards) t.addEventListener("click", () => {
      setMap(t.dataset.map), click()
    });

    // ---- GO: practice starts a local bot match; matchmaking joins an online
    // server running the SELECTED map (map-aware matchmaking) with zero bots
    let goStatus = q("#mmGoStatus");
    goBtn.addEventListener("click", () => {
      if (goBtn.classList.contains("starting") || game.state !== "menu" || game._starting) {
        try {
          console.log("[mm] GO blocked: state=" + game.state + " starting=" + game._starting)
        } catch {}
        return
      }
      // entering the game requires an account: show the register/login
      // overlay, then resume this click automatically after a successful login
      if (!this["_inv"]) {
        this["_requireAuth"](() => goBtn.click());
        return
      }
      click(), H["addStat"]("games");
      let e = parseInt(read("clutcher_botcount", "10")) || 0;
      let t = parseInt(read("clutcher_diff", "2")) || 0;
      let n = root.querySelector(".map-col.sel");
      let r = n ? n.dataset.map : "dusker";
      let i = read("clutcher_mode", "defusal");
      // the ACTIVE TAB is the source of truth (not localStorage) - whichever
      // category you see highlighted is the one GO executes
      let a = (root.querySelector(".cat-tab.active") || {})["dataset"] ? root.querySelector(".cat-tab.active").dataset.mmcat === "practice" : read("clutcher_cat", "matchmaking") === "practice";
      goBtn.classList.add("starting");
      goStatus && (goStatus.textContent = a ? "STARTING MATCH..." : "ENTERING SERVER...", goStatus.classList.add("show"));
      try {
        console.log("[mm] GO " + (a ? "practice" : "online") + " map=" + r + " mode=" + i)
      } catch {}
      let o = () => {
        goBtn.classList.remove("starting"), goStatus && goStatus.classList.remove("show")
      };
      if (a) {
        // practice: map load -> the team-select screen takes over and the
        // player picks CT or T themselves (no auto-pick, same as online)
        Promise.resolve(game.startGame(r, e, t, i)).then(() => o()).catch(() => {
          o(), toast("COULD NOT START MATCH")
        });
        return
      }
      // online: matchmake FIRST (independent of map loading), then enter the
      // world with zero bots. Online matches run the continuous-respawn
      // deathmatch controller: defusal rounds are simulated locally per client
      // and cannot stay in sync between players yet.
      try {
        window.__clutcherOnlineMatch = !0
      } catch {}
      this["_mmOnlineInit"]();
      let g = this["_mmNet"];
      i = "dm";
      g.requestMatch(r)["catch"](e => {
        try {
          console.error("[matchmaking]", e)
        } catch {}
        o();
        try {
          window.__clutcherOnlineMatch = !1
        } catch {}
        toast("COULD NOT JOIN SERVER")
      });
      Promise.resolve(game.startGame(r, 0, t, i)).then(() => {
        // map loaded (scene possibly rebuilt): re-attach any remote markers
        self["_mmReattach"] && self["_mmReattach"](), o()
      }).catch(e => {
        try {
          console.error("[matchmaking]", e)
        } catch {}
        o()
      })
    });

    // ---- player name: comes from the account (fixed at registration), so
    // there is no name setting in the menu anymore

    // ---- account (auth): username + password (+ confirm) register/login.
    // The bearer token persists in localStorage, so the browser stays logged
    // in from that point on; /auth/me revalidates it on every menu build.
    this["_authInit"]();

    // ---- marketplace tab: the MARKET nav button opens the server-backed
    // economy (3 cases + Universal Key, 10 tokens each, server-side rolls).
    // The decoded menu already ships an empty #tab-market placeholder page -
    // fill THAT one instead of appending a duplicate (the tab handler always
    // switches to the first #tab-market match, so a duplicate never shows).
    try {
      let mb = this["menuEl"].querySelector('[data-tab="market"]');
      mb && (mb.textContent = "MARKET");
      let pg = this["menuEl"].querySelector("#tab-market");
      pg && (pg.innerHTML = '<h2 class="pagetitle">MARKETPLACE</h2><div id="mkwrap"></div>');
    } catch {}

    // ---- currency rename: the obfuscated string table renders the currency
    // as a "C" glyph (<i>C</i>) in several menu surfaces; rewrite every one
    // of them to T (Tokens), present and future, with a mutation observer
    try {
      new MutationObserver(() => {
        this["menuEl"] && this["menuEl"].querySelectorAll("i").forEach(el => {
          el.textContent === "C" && (el.textContent = "T")
        })
      }).observe(this["menuEl"], { childList: !0, subtree: !0 })
    } catch {}

    // ---- settings: sensitivity (CS2 scale) + zoom sensitivity
    let sens = q("#mmSens"), sensVal = q("#mmSensVal");
    let zoom = q("#mmZoomSens"), zoomVal = q("#mmZoomSensVal");
    sens.min = Tr["min"], sens.max = Tr["max"], sens.step = .01;
    zoom.min = Er["min"], zoom.max = Er["max"], zoom.step = .01;
    let sensPrec = Tr["precision"] == null ? 2 : Tr["precision"];
    let zoomPrec = Er["precision"] == null ? 2 : Er["precision"];
    let paintSens = () => {
      let e = parseFloat(read("clutcher_sens_cs2", ""));
      Number.isFinite(e) || (e = Tr["def"]), sens.value = e, sensVal.textContent = e.toFixed(sensPrec)
    };
    let paintZoom = () => {
      let e = parseFloat(read("clutcher_zoomsens", ""));
      Number.isFinite(e) || (e = Er["def"]), zoom.value = e, zoomVal.textContent = e.toFixed(zoomPrec)
    };
    sens.addEventListener("input", () => {
      let e = parseFloat(sens.value);
      Number.isFinite(e) && (store("clutcher_sens_cs2", String(e)), sensVal.textContent = e.toFixed(sensPrec), game.sensitivity = Dr(e))
    }), zoom.addEventListener("input", () => {
      let e = parseFloat(zoom.value);
      Number.isFinite(e) && (store("clutcher_zoomsens", String(e)), zoomVal.textContent = e.toFixed(zoomPrec), game.zoomSensRatio = e)
    }), paints.push(paintSens, paintZoom);

    // ---- settings: master volume
    let vol = q("#mmVol"), volVal = q("#mmVolVal");
    let paintVol = () => {
      let e = parseFloat(read("clutcher_vol", "1"));
      Number.isFinite(e) || (e = 1), vol.value = Math.round(e * 100), volVal.textContent = Math.round(e * 100) + "%"
    };
    vol.addEventListener("input", () => {
      let e = parseInt(vol.value) / 100;
      store("clutcher_vol", String(e)), volVal.textContent = vol.value + "%";
      try {
        game.audio.setVolume(e)
      } catch {}
    }), paints.push(paintVol);

    // ---- settings: dev console (persisted; read again on next page load)
    let devEl = q("#mmDevConsole");
    let paintDev = () => {
      devEl.textContent = read("clutcher_devconsole", "0") === "1" ? "YES" : "NO"
    };
    devEl.addEventListener("click", () => {
      let e = read("clutcher_devconsole", "0") === "1";
      store("clutcher_devconsole", e ? "0" : "1"), paintDev(), click(), toast(e ? "CONSOLE OFF ON NEXT LOAD" : "CONSOLE ON ON NEXT LOAD")
    }), paints.push(paintDev);

    // ---- settings: video cycles (live applies via the game's own setters)
    let wireCycle = (e, t, n) => {
      let r = JSON.parse(e.dataset.opts), i = JSON.parse(e.dataset.labels);
      let a = () => {
        let o = t(), s = r.indexOf(o);
        e.textContent = i[s < 0 ? 0 : s]
      };
      e.addEventListener("click", () => {
        let o = t(), s = r.indexOf(o);
        n(r[(s + 1) % r.length]), a(), click()
      }), a(), paints.push(a)
    };
    for (let e of root.querySelectorAll("[data-mmset]")) {
      let t = e.dataset.mmset;
      t === "quality" ? wireCycle(e, () => game.quality, n => game.setQuality(n)) : t === "fpscap" ? wireCycle(e, () => parseInt(read("clutcher_fpscap", "0")) || 0, n => {
        game.fpsCap = n, store("clutcher_fpscap", String(n))
      }) : t === "shadows" ? wireCycle(e, () => read("clutcher_shadows", ""), n => game.setShadows(n)) : t === "aa" ? wireCycle(e, () => read("clutcher_aa", game._aaBase || "msaa"), n => game.setAA(n)) : t === "bloom" ? wireCycle(e, () => game.postfx && game.postfx.bloomOn ? 1 : 0, n => game.setBloomPref(!!n)) : t === "aniso" ? wireCycle(e, () => parseInt(read("clutcher_aniso", "16")) || 16, n => game.setAniso(n)) : t === "autotier" ? wireCycle(e, () => read("clutcher_autotier", "1") !== "0" ? 1 : 0, n => store("clutcher_autotier", n ? "1" : "0")) : t === "showfps" && wireCycle(e, () => game.showFps ? 1 : 0, n => game.setShowFps(!!n))
    }

    // ---- settings: crosshair rows (live via the pcrossair config API)
    let xhApi = window.BetterClutcherXhair;
    if (xhApi) {
      for (let e of root.querySelectorAll("[data-xh]")) {
        let t = e.dataset.xh;
        if (e.classList.contains("fake-select")) {
          let n = JSON.parse(e.dataset.opts), r = JSON.parse(e.dataset.labels);
          let i = () => {
            let a = xhApi.get()[t], o = n.indexOf(a);
            e.textContent = r[o < 0 ? 0 : o]
          };
          e.addEventListener("click", () => {
            let a = xhApi.get()[t], o = n.indexOf(a);
            xhApi.set(t, n[(o + 1) % n.length]), i(), click()
          }), i(), paints.push(i)
        } else {
          let a = root.querySelector(`[data-xhval="${t}"]`);
          e.addEventListener("input", () => {
            let o = parseFloat(e.value);
            Number.isFinite(o) && (xhApi.set(t, o), a && (a.textContent = String(o)))
          });
          let o = () => {
            let s = xhApi.get()[t];
            e.value = s, a && (a.textContent = String(s))
          };
          o(), paints.push(o)
        }
      }
    }

    // ---- live server stats next to the GO button (Rooms / Players online)
    let roomsEl = q("#mmRoomsN"), playersEl = q("#mmPlayersN");
    let pollStats = () => {
      fetch(WS_BASE.replace("wss://", "https://") + "/stats").then(e => e.json()).then(e => {
        roomsEl && (roomsEl.textContent = e.rooms), playersEl && (playersEl.textContent = e.players)
      })["catch"](() => {})
    };
    setInterval(pollStats, 5000), pollStats();

    // ---- sync on every menu open
    this["_mmSync"] = () => {
      // menu visible = not in a match: drop any online session (bots re-enable)
      if (this["_mmNet"] && this["_mmNet"]["isConnected"]()) this["_mmNet"]["disconnectOnline"]();
      setCat(read("clutcher_cat", "matchmaking")), setMode(read("clutcher_mode", "defusal")), setDiff(parseInt(read("clutcher_diff", "2")) || 0), setBots(parseInt(read("clutcher_botcount", "10")) || 0);
      goBtn.classList.remove("starting"), goStatus && goStatus.classList.remove("show");
      let e = root.querySelector(".map-col.sel");
      e || setMap("dusker");
      for (let t of paints) try {
        t()
      } catch {}
    }, this["_mmSync"]()
  }
  // ------------------------------------------------------------------ online bridge
  // Wires netcode.js to the game: real CS2 character models for remote human
  // players (movement via netcode interpolation; team model per player -
  // CT -> ctm_sas.glb + m4a4, T -> tm_phoenix.glb + ak47, via the bot agent
  // system Nm + its pool wm/Tm and the game's corpse manager), shot
  // audio/muzzle for remote shots, local-player damage feedback, and local
  // shots -> sendShot + raycast-vs-remote-bodies -> sendHit (server validates
  // with sub-tick rewind).
  ["_mmOnlineInit"]() {
    if (this["_mmNet"]) return this["_mmNet"];
    let self = this;
    let game = this["game"];
    let markers = self["_mmMarkers"] = new Map();
    let roster = self["_mmRoster"] = new Map(); // id -> { team, alive }
    let bodies = self["_mmBodies"] = new Map(); // id -> remote body record (agent/dying state)
    let mmDir = new mmVec, mmPos = new mmVec;
    let pushRoster = () => {
      // the scorebar team counter + avatar cards read game.onlinePlayers
      try {
        let sig = [...roster].map(e => e[0] + ":" + (e[1].team || "?"))["sort"]()["join"]("|");
        game["onlinePlayers"] = [...roster].map(e => ({ id: e[0], name: e[1].name, team: e[1].team, alive: e[1].alive, hp: e[1].hp == null ? 100 : e[1].hp, kills: e[1].kills || 0, isPlayer: !1 }));
        // membership/team changed -> rebuild the top-bar avatar cards so new
        // players appear (hp/death bars are handled per-frame by updateAvatars)
        if (sig !== self["_mmRosterSig"]) {
          self["_mmRosterSig"] = sig;
          game["map"] && self["buildAvatars"] && self["buildAvatars"]()
        }
      } catch {}
    };

    // ---- remote bodies: real CS2 character agents, one per remote player ----
    // Reuses the bot body pipeline (see bots.js): Nm loads a rigged model with
    // locomotion (Ja(): CT -> ctm_sas.glb, T -> tm_phoenix.glb), wm/Tm are the
    // per-team agent pool, and dead bodies are handed to the game's corpse
    // manager exactly like bot corpses. Team is swapped by pooling the old
    // model and fetching the other team's. Unknown team (not picked yet / DM)
    // shows the T model as a placeholder and swaps when the team arrives.

    function effTeam(e) {
      return e === "CT" ? "CT" : "T"
    }

    function remoteRec(e) {
      let t = bodies.get(e);
      if (!t) {
        bodies.set(e, t = {
          id: e, team: null, bodyTeam: null, alive: true,
          x: 0, y: 0, z: 0, ry: 0, px: null, pz: null,
          agent: null, loading: false, dying: null, deathAnimT: 0,
          retryAt: 0, lastT: 0, animAcc: 0, animN: 0
        })
      }
      return t
    }

    function attachAgent(e) {
      let t = remoteRec(e);
      if (t.agent || t.loading || t.dying) return;
      let n = effTeam(t.team);
      t.bodyTeam = n, t.loading = true, markers.set(e, null);
      // pool first (mirrors the bot attach queue in bots.js): free a matching
      // corpse back into the pool if needed, then load only on a real miss
      let r = null;
      try { r = wm(n) } catch {}
      if (!r) {
        try { game["reclaimAgentCorpse"] && game["reclaimAgentCorpse"](n) && (r = wm(n)) } catch {}
      }
      let i = r ? Promise.resolve(r) : new Nm(game["renderer"])["load"](n);
      i.then(r => {
        t.loading = false;
        // stale while loading: remote left, switched team, died or got a body
        if (!bodies.has(e) || effTeam(t.team) !== n || t.agent || t.dying) {
          try { Tm(n, r) } catch {}
          return
        }
        t.agent = r, r["root"]["name"] = "mremote_" + e;
        markers.set(e, r["root"]);
        try { game["scene"]["add"](r["root"]) } catch {}
        r["root"]["visible"] = !!t.alive;
        try { r["setTransform"](t.x, t.y, t.z, t.ry) } catch {}
        try {
          let e = r["setWeapon"](n === "CT" ? "m4a4" : "ak47", "rifle");
          e && e["catch"] && e["catch"](() => {})
        } catch {}
      })["catch"](() => {
        // load failed: clear the claim so a later state update retries
        t.loading = false, t.bodyTeam = null, t.retryAt = Date.now() + 2000
      })
    }

    function poolAgent(e) {
      if (!e.agent) return;
      try { Tm(e.agent["team"] || effTeam(e.team), e.agent) } catch {}
      e.agent = null, markers.set(e.id, null)
    }

    function driveAgent(e, t, n) {
      // mirrors the bot body update: setTransform every frame, mixer stepped
      // with distance LOD (1/2/3 frames by range, like bots.js _updateCS2Body)
      let r = e.agent;
      if (!r) return;
      try {
        r["root"]["parent"] !== game["scene"] && game["scene"]["add"](r["root"]);
        r["root"]["visible"] = !!e.alive;
        r["setTransform"](t.x, t.y, t.z, t.ry || 0);
        let i = game["camera"] && game["camera"]["position"];
        let a = 1;
        if (i) {
          let o = t.x - i["x"], s = t.z - i["z"], c = o * o + s * s;
          a = c > 1600 ? 3 : c > 625 ? 2 : 1
        }
        e.animAcc += n, e.animN = (e.animN + 1) % a;
        if (e.animN === 0) {
          // velocity estimate from the interpolated motion drives the walk anim
          let i = { vx: 0, vz: 0 };
          if (e.px != null && e.animAcc > 0) {
            i.vx = Math.max(-14, Math.min(14, (t.x - e.px) / e.animAcc));
            i.vz = Math.max(-14, Math.min(14, (t.z - e.pz) / e.animAcc))
          }
          e.px = t.x, e.pz = t.z;
          r["update"](e.animAcc, { vx: i.vx, vz: i.vz, airborne: false, crouch: 0, pitch: 0, flashed: 0, defusing: false, planting: false });
          e.animAcc = 0
        }
      } catch {}
    }

    function startRemoteDeath(e) {
      let t = e.agent;
      e.agent = null, markers.set(e.id, null);
      if (!t) return;
      let n = 0;
      try { n = t["die"]("chest", false, true) || 0 } catch {}
      // pin the body to the ground under the death position (bots.js die())
      let r = e.y;
      try {
        let i = game["physics"]["groundHeight"](e.x, e.y + 1.2, e.z);
        r = i > -20 && game["map"] && game["map"]["visualGround"] ? game["map"]["visualGround"](e.x, e.z, i) ?? i : i > -20 ? i : e.y
      } catch {}
      let i = 0;
      try { i = n ? t["restLift"](game["effects"] && game["effects"]["groundAt"]) : 0 } catch {}
      e.dying = { agent: t, t: 0, dur: n, groundY: r, lift: i, lastT: 0, px: e.x, pz: e.z, ry: e.ry || 0 };
      e.deathAnimT = n > 0 ? n + .35 : 2.6
    }

    function driveDying(e, t) {
      let n = e.dying;
      if (!n) return;
      let r = n.lastT ? Math.min(.1, (t - n.lastT) / 1000) : .016;
      n.lastT = t, e.deathAnimT -= r, n.t += r;
      let i = n.dur > 0 ? Math.min(1, Math.max(0, ((n.dur + .35 - e.deathAnimT) / n.dur - .35) / .55)) : 1;
      let a = (n.lift || 0) * i * i * (3 - 2 * i);
      try {
        n.agent["setTransform"](n.px, n.groundY + a, n.pz, n.ry), n.agent["update"](r)
      } catch {}
      e.deathAnimT <= 0 && handOverCorpse(e)
    }

    function handOverCorpse(e) {
      let t = e.dying;
      e.dying = null;
      if (!t) return;
      try { t.agent["loco"] && t.agent["loco"]["freeze"] && t.agent["loco"]["freeze"]() } catch {}
      try { game["addAgentCorpse"](t.agent, e.team || t.agent["team"] || "CT", game["time"]) } catch {
        try { t.agent["root"]["visible"] = false } catch {}
      }
    }

    self["_mmNet"] = initMultiplayer({
      scene: game["scene"],
      camera: game["camera"],
      getPlayerTransform: () => {
        let e = game["player"];
        return { x: e["x"], y: e["y"], z: e["z"], ry: e["yaw"], pitch: e["pitch"], onGround: e["onGround"], team: e["team"], kills: e["kills"] || 0 }
      },
      canSendState: () => game["state"] === "playing" && !!game["player"]["alive"],
      spawnRemotePlayer: (e, t) => {
        let n = remoteRec(e);
        n.team = t.team || n.team, n.alive = (t.hp == null ? 100 : t.hp) > 0;
        n.x = t.x || 0, n.y = t.y || 0, n.z = t.z || 0, n.ry = t.ry || 0, n.px = n.x, n.pz = n.z;
        markers.set(e, null), attachAgent(e);
        roster.set(e, { team: t.team, alive: n.alive, hp: t.hp == null ? 100 : t.hp, kills: t.kills || 0, name: "P" + String(e)["slice"](-4) }), pushRoster()
      },
      applyRemoteUpdate: (e, t) => {
        // self-heal: a state update ALWAYS guarantees a body and a roster
        // entry, even if the join/welcome event was missed (reconnect,
        // scene rebuild, timing)
        let n = remoteRec(e);
        let r = roster.get(e);
        if (!r) {
          roster.set(e, r = { team: t.team, alive: !0, hp: t.hp == null ? 100 : t.hp, kills: t.kills || 0, name: "P" + String(e)["slice"](-4) });
          pushRoster();
          try { console.log("[mm] materialized body for", e) } catch {}
        }
        n.x = t.x, n.y = t.y, n.z = t.z, n.ry = t.ry || 0;
        t.team && (n.team = t.team);
        // team swap -> the model must swap too (pool the old, fetch the new);
        // bodyTeam tracks which team the current/last fetch was for
        let i = effTeam(n.team);
        if (!n.loading && !n.dying && n.bodyTeam !== i && Date.now() >= n.retryAt) {
          poolAgent(n), attachAgent(e)
        }
        let a = performance.now();
        if (n.dying) {
          driveDying(n, a)
        } else if (n.agent) {
          let u = n.lastT ? Math.min(.1, (a - n.lastT) / 1000) : .016;
          n.lastT = a;
          driveAgent(n, t, u)
        } else {
          n.lastT = a
        }
        let o = false;
        if (t.team && r.team !== t.team) {
          r.team = t.team, o = true
        }
        if (t.kills != null && r.kills !== t.kills) {
          r.kills = t.kills, o = true
        }
        o && pushRoster()
      },
      despawnRemotePlayer: e => {
        let t = remoteRec(e);
        if (t.dying) handOverCorpse(t);
        poolAgent(t);
        bodies.delete(e), markers.delete(e);
        if (roster["delete"](e)) pushRoster()
      },
      onShot: e => {
        try {
          game["audio"]["play"]("shot_m4a4", { pos: { x: e.ox, y: e.oy, z: e.oz } }), game["effects"]["worldMuzzle"](e.ox, e.oy, e.oz)
        } catch {}
      },
      onHit: () => {},
      onHp: e => {
        let t = self["_mmNet"] && self["_mmNet"]["getMyId"]();
        if (e.id === t) {
          self["_mmLastHp"] == null && (self["_mmLastHp"] = 100);
          e.hp < self["_mmLastHp"] && self["damageFlash"]();
          self["_mmLastHp"] = e.hp;
          return
        }
        let n = remoteRec(e.id);
        n.alive = e.hp > 0;
        let r = roster.get(e.id);
        if (r) {
          r.alive = e.hp > 0, r.hp = e.hp, pushRoster()
        }
        if (n.agent) {
          // model came back alive (respawn / round start): undo a death pose
          if (e.hp > 0 && n.agent["dead"] && n.agent["revive"]) {
            n.agent["revive"](), n.px = null, n.pz = null
          }
          n.agent["root"]["visible"] = e.hp > 0
        } else if (e.hp > 0 && !n.loading && !n.dying) {
          // body was already handed to the corpse pile: re-arm a fetch
          n.bodyTeam = null
        }
      },
      onDead: e => {
        let t = self["_mmNet"] && self["_mmNet"]["getMyId"]();
        if (e.id === t) {
          self["_mmLastHp"] = 0;
          return
        }
        // online kill: the server saw this death - award the killer's tokens
        if (e.killer && e.killer === t) self["_awardKill"](!0x0);
        let n = remoteRec(e.id);
        n.alive = false;
        let r = roster.get(e.id);
        if (r) {
          r.alive = false, pushRoster()
        }
        startRemoteDeath(n)
      },
      onSelfSpawn: s => {
        // late joiner: adopt the room's elapsed time so the match clock matches
        // what everyone else sees instead of restarting at 10:00
        try {
          if (typeof s.age == "number" && s.age > 0 && game["roundTimeLeft"] != null) {
            game["roundTimeLeft"] = Math.max(30, 600 - Math.floor(s.age / 1000))
          }
        } catch {}
        // joined an online server: show server ID + live latency for 3 seconds
        try {
          let el = document.getElementById("mm-joininfo");
          if (!el) {
            el = document.createElement("div");
            el.id = "mm-joininfo";
            document.body.appendChild(el)
          }
          let net = self["_mmNet"];
          let done = Date.now() + 3000;
          el.classList.add("show");
          let tick = () => {
            if (!el.parentNode) return;
            let r = net && net.getLatency();
            el.textContent = "ONLINE SERVER " + (s.roomId || "?") + (r != null ? " \u00b7 " + r + "MS" : " \u00b7 CONNECTING");
            if (Date.now() < done) setTimeout(tick, 250);
            else el.classList.remove("show")
          };
          tick()
        } catch {}
      }
    });
    // local gun shots: relay to the server (sub-tick) and raycast the remote
    // bodies for hit detection -> sendHit (server rewinds + validates)
    self["_mmReattach"] = () => {
      for (let e of markers.values()) {
        e && e.parent !== game["scene"] && game["scene"]["add"](e)
      }
    };
    onGameShot(e => {
      let t = self["_mmNet"];
      if (!t || !t.isConnected()) return;
      let n = game["camera"];
      mmPos["copy"](n["position"]);
      n["getWorldDirection"](mmDir);
      t.sendShot(mmPos["x"], mmPos["y"], mmPos["z"], mmDir["x"], mmDir["y"], mmDir["z"]);
      let r = null, i = 1e9;
      // friendly fire off: never target teammates (the server rejects them
      // anyway - both teams must be known to count as same-team)
      let myTm = game["player"] && game["player"]["team"];
      for (let [a, o] of markers) {
        if (!o || !o["visible"]) continue;
        let tm = roster.get(a);
        if (tm && tm.team && myTm && tm.team === myTm) continue;
        let s = o["position"];
        let c = (s.x - mmPos.x) * mmDir.x + (s.y + .9 - mmPos.y) * mmDir.y + (s.z - mmPos.z) * mmDir.z;
        if (c <= 0 || c > 120 || c >= i) continue;
        rayPointDist(mmPos.x, mmPos.y, mmPos.z, mmDir.x, mmDir.y, mmDir.z, s.x, s.y + .9, s.z) <= .6 && (i = c, r = a)
      }
      r && t.sendHit(r, e && e.dmg || 25)
    });
    // knife/taser melee bridge: the local melee (game.playerMelee -> meleeAttack)
    // only raycasts game entities (bots), so online remotes are hit through this
    // bridge instead - same aim cone (.55 dot), reach (def.range + .4), line-of-
    // sight and backstab rules as the local melee, enemies only. The server
    // validates the swing ray as a short-range self-contained hit (same rewind,
    // team and rate rules as gun shots); dmg comes from the game's KNIFE_DMG
    // table (slash 40 / back 90 / stab 65 / backstab 180, zeus 500).
    if (!game["_mmMeleeHooked"]) {
      game["_mmMeleeHooked"] = true;
      let origMelee = game["playerMelee"];
      game["playerMelee"] = function() {
        let out = origMelee.apply(this, arguments);
        let f = game["_mmMeleeSwing"];
        try { f && f.apply(null, arguments) } catch {}
        return out
      }
    }
    game["_mmMeleeSwing"] = (e, t, n) => {
      let net = self["_mmNet"];
      if (!net || !net.isConnected()) return;
      if (game["state"] !== "playing" || !game["player"]["alive"]) return;
      let myTm = game["player"]["team"];
      let cam = game["camera"];
      mmPos["copy"](cam["position"]);
      cam["getWorldDirection"](mmDir);
      let reach = ((t && t["range"]) || 1.9) + .4;
      let best = null, bestD = 1e9;
      for (let [a, o] of markers) {
        if (!o || !o["visible"]) continue;
        let tm = roster.get(a);
        if (tm && tm.team && myTm && tm.team === myTm) continue;
        let s = o["position"];
        let wx = s.x - mmPos.x, wy = s.y + 1.1 - mmPos.y, wz = s.z - mmPos.z;
        let d = Math.hypot(wx, wy, wz);
        if (d > reach || d >= bestD) continue;
        if ((wx * mmDir.x + wy * mmDir.y + wz * mmDir.z) / (d || 1) < .55) continue;
        if (game["physics"]["lineClear"] && !game["physics"]["lineClear"](mmPos.x, mmPos.y, mmPos.z, s.x, s.y + 1.1, s.z)) continue;
        bestD = d, best = a
      }
      if (!best) return;
      // backstab: the swing lands behind the victim's facing (meleeAttack rule)
      let dmg = e;
      let rec = bodies.get(best);
      if (n != null && rec) {
        let fy = rec.ry || 0;
        mmDir.x * -Math.sin(fy) + mmDir.z * -Math.cos(fy) > .5 && (dmg = n)
      }
      net.sendHit(best, dmg, { ox: mmPos.x, oy: mmPos.y, oz: mmPos.z, dx: mmDir.x, dy: mmDir.y, dz: mmDir.z })
    };
    return self["_mmNet"]
  } ["_authInit"]() {
    // account panel: register/login with username + password + confirm
    // password (no email). On success the bearer token is kept in localStorage
    // so the browser stays logged in; tokens = the account currency.
    const API = WS_BASE.replace("wss://", "https://");
    const LS = "clutcher_auth_token";
    let panel = document.createElement("div");
    panel.id = "authpanel";
    panel.innerHTML = '<div class="ap-head">ACCOUNT</div>'
      + '<div class="ap-cred">'
      + '<input id="apUser" maxlength="20" placeholder="Username" autocomplete="off" spellcheck="false">'
      + '<input id="apPass" type="password" placeholder="Password">'
      + '<input id="apPass2" type="password" placeholder="Confirm password">'
      + '<div class="ap-row"><button id="apLogin" type="button">LOG IN</button><button id="apRegister" type="button">REGISTER</button></div>'
      + '</div>'
      + '<button id="apLogout" type="button" class="ap-logout">LOG OUT</button>'
      + '<div class="ap-status" id="apStatus"></div>';
    // anchored to the settings view content (the old name-input row is gone)
    let host = document.querySelector("#mmSettingsView .settings-content");
    (host || this["menuEl"]).insertBefore(panel, host ? host.firstChild : null);
    let ui = panel.querySelector("#apUser"), pi = panel.querySelector("#apPass"), p2 = panel.querySelector("#apPass2");
    let st = panel.querySelector("#apStatus");
    let getToken = () => {
      try { return localStorage.getItem(LS) || "" } catch { return "" }
    };
    let setToken = t => {
      try { t ? localStorage.setItem(LS, t) : localStorage.removeItem(LS) } catch {}
    };
    let showForm = msg => {
      panel.classList.remove("in"), st.textContent = msg || ""
    };
    let showIn = u => {
      panel.classList.add("in"), st.textContent = "LOGGED IN AS " + u.username + " \u00b7 TOKENS " + u.tokens
    };
    let call = async (path, opts) => {
      let r = await fetch(API + path, opts), j = null;
      try { j = await r.json() } catch {}
      return { ok: r.ok, j }
    };
    let authed = () => ({ headers: { Authorization: "Bearer " + getToken() } });
    let creds = () => JSON.stringify({ username: ui.value.trim(), password: pi.value, confirm: p2.value });
    let post = path => async () => {
      st.textContent = "...";
      let r = null;
      try {
        r = await call(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: creds() });
      } catch (e) {
        return showForm("COULD NOT REACH THE SERVER");
      }
      if (r.ok && r.j && r.j.token) {
        setToken(r.j.token), showIn({ username: r.j.inv ? r.j.inv.username : r.j.username, tokens: r.j.inv ? r.j.inv.tokens : 0 });
        this["_loadInv"]();
        try { console.log("[auth] ok") } catch {}
      } else {
        showForm("FAILED: " + (r.j && r.j.error || "no response"));
      }
    };
    panel.querySelector("#apLogin").onclick = post("/auth/login");
    panel.querySelector("#apRegister").onclick = post("/auth/register");
    panel.querySelector("#apLogout").onclick = async () => {
      try { await call("/auth/logout", { method: "POST", headers: { Authorization: "Bearer " + getToken() } }) } catch {}
      setToken(""), this["_inv"] = null, H["__server"] = !0x1, showForm("LOGGED OUT"), this["_syncMenuTokens"]();
      // logging out forces the login gate again - an account is required to play
      this["_requireAuth"]()
    };
    // stay logged in: resume an existing session if the token is still valid.
    // _authReady resolves once we KNOW the login state - the menu then forces
    // the login gate immediately if the player is not authenticated.
    this["_authReady"] = new Promise(res => {
      if (!getToken()) return res(!0x1);
      call("/auth/me", authed()).then(({ ok, j }) => {
        if (ok && j && j.user) {
          showIn(j.user), this["_loadInv"]()["then"](() => res(!0x0));
        } else {
          setToken(""), res(!0x1);
        }
      })["catch"](() => res(!0x1));
    });
    this["_authReady"]["then"](ok => {
      ok || this["_requireAuth"]()
    });
  } ["_authToken"]() {
    try {
      return localStorage.getItem("clutcher_auth_token") || ""
    } catch {
      return ""
    }
  } ["_loadInv"]() {
    // pull the authoritative inventory and hydrate the in-memory economy view
    let API = WS_BASE.replace("wss://", "https://");
    return fetch(API + "/api/inventory", { headers: { Authorization: "Bearer " + this["_authToken"]() } })
      .then(r => r.ok ? r.json() : null).then(j => {
        if (j && j.inv) {
          this["_inv"] = j.inv, H["hydrateServer"](j.inv), this["_wireEquipSync"](), this["_syncMenuTokens"]();
          this["renderMarket"](), this["renderLocker"](), this["_maybeShowMkHint"]();
        }
        return j && j.inv || null
      })["catch"](() => null)
  } ["_wireEquipSync"]() {
    // H.save() is a no-op in server mode; equips go to the server instead
    // (the server validates every skin is actually owned before storing it)
    if (this["_equipWired"]) {
      return
    }
    this["_equipWired"] = !0x0;
    let t = null;
    H["save"] = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        let eq = {};
        for (let [w, uid] of Object.entries(H["data"]["equipped"] || {})) {
          let it = H["item"](uid);
          it && (eq[w] = it["skin"])
        }
        fetch(WS_BASE.replace("wss://", "https://") + "/api/equip", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + this["_authToken"]() },
          body: JSON.stringify({ equipped: eq })
        })["catch"](() => {})
      }, 400)
    };
  } ["_syncMenuTokens"]() {
    // token balance lives in the top nav, right of NEWS
    try {
      let t = this["_inv"] ? this["_inv"]["tokens"] : 0x0;
      let el = document.getElementById("mmTokens");
      el && (el.innerHTML = t + " <i>T</i>");
      let old = this["menuEl"] && this["menuEl"].querySelector("#coins");
      old && (old.innerHTML = t + " <i>T</i>");
    } catch {}
  } ["_requireAuth"](t) {
    // entering the game requires an account: register/login overlay over the
    // menu background; the interrupted action resumes after a successful login
    this["_authResume"] = t;
    let ov = document.getElementById("authgate");
    if (ov) {
      ov.classList.add("show");
      return
    }
    ov = document.createElement("div");
    ov.id = "authgate", ov.className = "show";
    ov.innerHTML = '<div class="ag-box"><div class="ag-head" id="agHead">CREATE YOUR ACCOUNT</div>'
      + '<div class="ag-sub">Playing requires an account. Register with a username and password - no email needed.</div>'
      + '<input id="agUser" maxlength="20" placeholder="Username" autocomplete="off" spellcheck="false">'
      + '<input id="agPass" type="password" placeholder="Password">'
      + '<input id="agPass2" type="password" placeholder="Confirm password">'
      + '<button id="agGo" type="button" class="ag-main">REGISTER &amp; PLAY</button>'
      + '<div class="ag-alt" id="agAlt">Have an account? <a id="agSwitch">Login here</a></div>'
      + '<div class="ag-status" id="agStatus"></div></div>';
    document.body.appendChild(ov);
    let ui = ov.querySelector("#agUser"), pi = ov.querySelector("#agPass"), p2 = ov.querySelector("#agPass2");
    let st = ov.querySelector("#agStatus");
    let mode = "register";
    let setMode = m => {
      mode = m;
      ov.querySelector("#agHead").textContent = m === "register" ? "CREATE YOUR ACCOUNT" : "LOGIN";
      ov.querySelector("#agGo").textContent = m === "register" ? "REGISTER & PLAY" : "LOGIN & PLAY";
      ov.querySelector("#agAlt").innerHTML = m === "register" ? 'Have an account? <a id="agSwitch">Login here</a>' : 'No account yet? <a id="agSwitch">Register here</a>';
      ov.querySelector("#agSwitch").onclick = () => setMode(mode === "register" ? "login" : "register");
      st.textContent = "";
    };
    ov.querySelector("#agSwitch").onclick = () => setMode("login");
    let submit = async () => {
      st.textContent = "...";
      let j = null;
      try {
        let r = await fetch(WS_BASE.replace("wss://", "https://") + "/auth/" + mode, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: ui.value.trim(), password: pi.value, confirm: p2.value })
        });
        j = await r.json();
        if (r.ok && j && j.token) {
          try { localStorage.setItem("clutcher_auth_token", j.token) } catch {}
          ov.classList.remove("show"), st.textContent = "";
          await this["_loadInv"]();
          let f = this["_authResume"];
          this["_authResume"] = null;
          f && f();
          return
        }
      } catch (e) {
        st.textContent = "COULD NOT REACH THE SERVER" + (e && e.message ? " (" + e.message + ")" : "");
        return
      }
      st.textContent = "FAILED: " + (j && j.error || "no response");
    };
    ov.querySelector("#agGo").onclick = submit;
  } ["_marketApi"](path, body) {
    return fetch(WS_BASE.replace("wss://", "https://") + path, {
      method: body ? "POST" : "GET",
      headers: Object.assign({ "Content-Type": "application/json" }, this["_inv"] ? { Authorization: "Bearer " + this["_authToken"]() } : {}),
      body: body ? JSON.stringify(body) : undefined
    }).then(r => r.json().then(j => ({ ok: r.ok, j })))
  } ["_marketBuy"](item) {
    // buying requires an account: pop the login gate, resume after
    if (!this["_inv"]) {
      this["_requireAuth"](() => this["_marketBuy"](item));
      return
    }
    this["_marketApi"]("/api/market/buy", { item }).then(({ ok, j }) => {
      if (ok && j && j.inv) {
        this["_inv"] = j.inv, H["hydrateServer"](j.inv), this["renderMarket"](), this["renderLocker"](), this["_syncMenuTokens"](), this["game"]["audio"]["play"]("buy");
      } else {
        this["game"]["audio"]["play"]("denied");
        let m = this["_mmRoot"] && this["_mmRoot"]["_showToast"] && this["_mmRoot"]["_showToast"](j && j.error === "not_enough_tokens" ? "NOT ENOUGH TOKENS" : "PURCHASE FAILED");
        m || this["announce"] && this["announce"](j && j.error === "not_enough_tokens" ? "NOT ENOUGH TOKENS" : "PURCHASE FAILED", 0xfa0);
      }
    })["catch"](() => {})
  } ["caseOpenServer"](crate) {
    // THE case open path: the roll happens on the SERVER first (the client
    // never picks the reward), then the ORIGINAL case animation plays with
    // the server-decided reward. Cases are opened from the INVENTORY view.
    let toast = m => this["_mmRoot"] && this["_mmRoot"]["_showToast"] && this["_mmRoot"]["_showToast"](m);
    this["_marketApi"]("/api/case/open", { crate }).then(({ ok, j }) => {
      if (!ok || !j || !j.inv) {
        toast(j && j.error === "no_key" ? "YOU NEED A UNIVERSAL KEY - BUY ONE IN THE MARKET"
          : j && j.error === "no_case" ? "YOU DON'T OWN THIS CASE"
          : j && j.error === "not_enough_tokens" ? "NOT ENOUGH TOKENS" : "OPEN FAILED");
        return
      }
      this["_inv"] = j.inv, H["hydrateServer"](j.inv), this["_syncMenuTokens"]();
      let n = ps[j.reward.id];
      if (!n) return;
      // item instance for the reveal + locker: hydrateServer already created
      // one from the server's authoritative list (new AND duplicate rewards)
      // - reuse it, and only fall back to a fresh instance if it's missing
      let r = (H["data"]["items"] || []).find(it => it.skin === j.reward.id)
        || H["add"](n, { wear: (n.wmin + n.wmax) / 2, st: !0x1, seed: 0x0 });
      let def = MARKET_CASES.find(c => c.id === crate) || { id: crate, name: crate };
      // The animation overlay (#caseopen) lives inside #menu, which is nested
      // in #hud (z-index 10) - the menu-root shell (z-index 90) renders on top
      // and would hide the animation. The overlay must STAY inside #menu (the
      // whole animation queries it there), so instead raise #hud itself above
      // the shell for the run; the closeCase wrapper restores the z-index.
      this["menuEl"]["style"]["display"] = "block";
      this["menuEl"]["style"]["zIndex"] = "300";
      let hudEl = document.getElementById("hud");
      hudEl && (hudEl.style.zIndex = "500");
      // hide the menu shell during the animation - otherwise it covers the
      // game canvas the 3D reveal renders on
      let mr = document.getElementById("menu-root");
      mr && (mr.style.visibility = "hidden");
      if (!this["_closeCaseWrapped"]) {
        this["_closeCaseWrapped"] = !0x0;
        let orig = this["closeCase"];
        this["closeCase"] = function () {
          let h = document.getElementById("hud");
          h && (h.style.zIndex = "");
          let m2 = document.getElementById("menu-root");
          m2 && (m2.style.visibility = "");
          let out = orig.apply(this, arguments);
          try { this["renderLocker"](), this["renderMarket"](); } catch {}
          return out
        };
      }
      this["openCaseFlow"](def, { skin: n, item: r });
    })["catch"](() => {})
  } ["renderMarket"]() {
    // MARKET view: cards only - icon, name, buy button
    let w = document.querySelector("#mmMarketWrap") || this["menuEl"].querySelector("#mkwrap");
    if (!w) return;
    let rows = '<div class="mk-shop">';
    for (let c of MARKET_CASES) {
      rows += '<div class="mk-card"><img src="' + c.iconUrl + '" alt=""><div class="mk-name">' + c.name + '</div><button class="mk-buy" data-buy="case:' + c.id + '">BUY ' + MARKET_PRICE + ' T</button></div>'
    }
    rows += '<div class="mk-card"><img src="' + UNIKEY.icon + '" alt=""><div class="mk-name">' + UNIKEY.name + '</div><button class="mk-buy" data-buy="key">BUY ' + MARKET_PRICE + ' T</button></div></div>';
    w.innerHTML = rows;
    w.querySelectorAll(".mk-buy").forEach(b => {
      b.onclick = ev => {
        ev.stopPropagation(), this["_marketBuy"](b.dataset.buy)
      }
    });
  } ["renderLocker"]() {
    // INVENTORY view: cards only - owned cases with OPEN, owned skins/knives
    // with their artwork icon and EQUIP
    let w = document.querySelector("#mmInvWrap") || this["menuEl"].querySelector("#tab-locker");
    if (!w) return;
    let inv = this["_inv"];
    let d = H["load"]();
    let items = d["items"] || [];
    let eqWpn = {};
    for (let [wd, uid] of Object.entries(d["equipped"] || {})) {
      let it = H["item"](uid);
      it && (eqWpn[uid] = wd)
    }
    let rows = '<div class="mk-shop">';
    let noKeys = !inv || (inv.keys || 0) < 1;
    for (let c of MARKET_CASES) {
      let n = (inv && inv.cases && inv.cases[c.id]) || 0;
      if (!n) continue;
      rows += '<div class="mk-card"><img src="' + c.iconUrl + '" alt=""><div class="mk-name">' + c.name + '</div><button class="mk-buy" data-open="' + c.id + '"' + (noKeys ? " disabled" : "") + '>OPEN</button></div>'
    }
    rows += '</div><div class="lk-grid">';
    rows += items.map(it => {
      let p = ps[it["skin"]];
      let isEq = !!eqWpn[it["uid"]];
      return '<div class="lk-card' + (isEq ? " eq" : "") + '">'
        + '<img class="lk-img" src="' + (p && p["img"] || "") + '" alt="">'
        + '<div class="lk-name">' + (p && p["name"] || it["skin"]) + '</div>'
        + '<button class="lk-eq" data-uid="' + it["uid"] + '"' + (isEq ? " disabled" : "") + '>' + (isEq ? "EQUIPPED" : "EQUIP") + '</button></div>'
    }).join("");
    rows += '</div>';
    w.innerHTML = rows;
    w.querySelectorAll(".mk-buy[data-open]").forEach(b => {
      b.onclick = ev => {
        ev.stopPropagation(), this["caseOpenServer"](b.dataset.open)
      }
    });
    w.querySelectorAll(".lk-eq").forEach(b => {
      b.onclick = () => {
        H["equip"](b.dataset.uid), H["save"](), this["renderLocker"](), this["game"]["audio"]["play"]("buy")
      }
    });
  } ["_awardKill"](online) {
    // kill reward, server-side balance: +1 token in practice, +1.5 online
    let API = WS_BASE.replace("wss://", "https://");
    fetch(API + "/api/kill", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + this["_authToken"]() },
      body: JSON.stringify({ online: !!online })
    }).then(r => r.ok ? r.json() : null).then(j => {
      if (j && j.inv) {
        this["_inv"] = j.inv, this["_syncMenuTokens"]();
      }
    })["catch"](() => {})
  } ["_maybeShowMkHint"]() {
    // first-join hint under the marketplace button (per browser, localStorage
    // flag); disappears when clicked or when the marketplace button is used
    try {
      if (localStorage.getItem("clutcher_mkseen")) return;
      if (!this["_inv"]) return;
      let btn = document.getElementById("mmMarketBtn");
      if (!btn) return;
      let h = document.getElementById("mkhint");
      if (!h) {
        h = document.createElement("div");
        h.id = "mkhint";
        h.textContent = "Marketplace\n-----------\nThe place to buy cases or keys or player sold items.";
        document.body.appendChild(h);
        h.onclick = () => this["_dismissMkHint"]();
      }
      let rr = btn.getBoundingClientRect();
      h.style.left = Math.max(8, rr.left) + "px";
      h.style.top = rr.bottom + 8 + "px";
      h.classList.add("show");
    } catch {}
  } ["_dismissMkHint"]() {
    try { localStorage.setItem("clutcher_mkseen", "1") } catch {}
    let h = document.getElementById("mkhint");
    h && h.remove();
  } ["showPause"]() {
    this["buyOpen"] || (this["_renderPauseKeys"](), this["_lockNotice"](), this["pauseEl"]["style"]["display"] = "flex", this["pauseOpen"] = !0x0)
  } ["hidePause"]() {
    this["pauseEl"]["style"]["display"] = "none", this["pauseOpen"] = !0x1, this["closeHowTo"]()
  } ["keyName"](e) {
    let t = this["_boundCodes"](e);
    return t["length"] ? t["map"](e => {
      return this["_prettyKey"](e)
    })["join"](" or ") : "NONE"
  } ["_boundCodes"](e) {
    let t = this["game"]["input"]["binds"];
    let n = e === "crouch" ? [t["crouch"], t["crouch2"]] : [t[e]];
    return n["filter"]((e, t) => {
      return e && n["indexOf"](e) === t
    })
  } ["_renderPauseKeys"]() {
    let e = e => {
      return this["keyName"](e)
    };
    let t = ["forward", "left", "back", "right"]["map"](e);
    let n = t["every"](e => {
      return e["length"] === 0x1
    }) ? t["join"]("") : t["join"]("/");
    let r = this["pauseEl"]["querySelector"](__p_KGFS_MAIN_STR(0x16026, 0x10));
    r && (r["textContent"] = e("buy"));
    let i = this["pauseEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1603b, 0xf));
    i && (i["innerHTML"] = "" + n + __p_KGFS_MAIN_STR(0x1604e, 0xb) + e("walk") + __p_KGFS_MAIN_STR(0x1605c, 0xb) + e("crouch") + __p_KGFS_MAIN_STR(0x1606b, 0xe) + e("jump") + __p_KGFS_MAIN_STR(0x1607c, 0x1f) + e("aim") + __p_KGFS_MAIN_STR(0x1609c, 0x12) + e("reload") + __p_KGFS_MAIN_STR(0x160b1, 0xe) + e("buy") + __p_KGFS_MAIN_STR(0x160bf, 0xa) + e("use") + __p_KGFS_MAIN_STR(0x160ca, 0x15) + e("score") + __p_KGFS_MAIN_STR(0x160e2, 0x8))
  } ["openKeybinds"]() {
    this["_keybindsFromHowTo"] = !0x0, this["showPauseTab"]("settings");
    let e = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x160ef, 0x10));
    let t = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x16105, 0x19));
    let n = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x16126, 0xb));
    e && t && (e["scrollTop"] = Math["max"](0x0, t["offsetTop"] - 0xc)), n && (n["classList"]["remove"]("bindflash"), n["offsetWidth"], n["classList"]["add"]("bindflash"))
  } ["openHowTo"](e) {
    this["pauseEl"]["querySelector"](__p_KGFS_MAIN_STR(0x16132, 0x8))["style"]["display"] = "none", this["pauseEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1613b, 0x9))["style"]["display"] = "flex", this["howToOpen"] = !0x0, this["_renderHowTo"](e || (this["game"]["modeCtl"] ? "defusal" : "dm"))
  } ["closeHowTo"]() {
    this["howToOpen"] && (this["howToOpen"] = !0x1, this["pauseEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1613b, 0x9))["style"]["display"] = "", this["pauseEl"]["querySelector"](__p_KGFS_MAIN_STR(0x16132, 0x8))["style"]["display"] = "")
  } ["_prettyKey"](e) {
    return String(e || "")["replace"]("Key", "")["replace"]("Digit", "")["replace"]("ControlLeft", __p_KGFS_MAIN_STR(0x16149, 0x8))["replace"]("ControlRight", __p_KGFS_MAIN_STR(0x16154, 0x8))["replace"]("ShiftLeft", __p_KGFS_MAIN_STR(0x16162, 0x9))["replace"]("ShiftRight", __p_KGFS_MAIN_STR(0x1616d, 0x9))["replace"]("AltLeft", "L-ALT")["replace"]("Space", "SPACE")["replace"]("Mouse1", __p_KGFS_MAIN_STR(0x16178, 0x9))["replace"]("Mouse2", __p_KGFS_MAIN_STR(0x16181, 0x9))["toUpperCase"]()
  } ["_renderHowTo"](e, t = "pause") {
    let n = t === "pause";
    let r = n ? this["pauseEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1613b, 0x9)) : this["menuEl"] && this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1618d, 0x13));
    if (!r) {
      return
    }
    if (n) {
      this["_howToTab"] = e;
      let t = this["pauseEl"]["querySelector"](__p_KGFS_MAIN_STR(0x161a6, 0x14));
      t && (t["style"]["display"] = document["body"]["classList"]["contains"]("touchmode") ? "none" : "")
    } else {
      this["_settingsHowToTab"] = e
    }
    r["querySelectorAll"](__p_KGFS_MAIN_STR(0x161ba, 0x10))["forEach"](t => {
      return t["classList"]["toggle"]("sel", t["dataset"]["ht"] === e)
    });
    let i = r["querySelector"](__p_KGFS_MAIN_STR(0x161d1, 0x9));
    let a = this["game"]["input"]["binds"];
    let o = (...e) => {
      return e["map"](e => {
        return __p_KGFS_MAIN_STR(0x161e0, 0x17) + e + __p_KGFS_MAIN_STR(0xe0d5, 0x9)
      })["join"](" ")
    };
    let s = e => {
      let t = this["_boundCodes"](e);
      return t["length"] ? t["map"](e => {
        return o(this["_prettyKey"](e))
      })["join"](" or ") : o("NONE")
    };
    let c = (e, t) => {
      return __p_KGFS_MAIN_STR(0x161fa, 0x1f) + e + __p_KGFS_MAIN_STR(0x1358d, 0x10) + t + __p_KGFS_MAIN_STR(0x16219, 0x10)
    };
    let l = e => {
      return Math["floor"](e / 0x3c) + ":" + String(Math["floor"](e % 0x3c))["padStart"](0x2, "0")
    };
    let u = e => {
      return "$" + e["toLocaleString"]("en-US")
    };
    let d = Qg;
    let f;
    f = e === "defusal" ? __p_KGFS_MAIN_STR(0x1622a, 0x68) + l(d["roundTime"]) + __p_KGFS_MAIN_STR(0x16298, 0x2f) + d["winRounds"] + __p_KGFS_MAIN_STR(0x162cf, 0xa) + d["maxRounds"] + __p_KGFS_MAIN_STR(0x162da, 0x1d) + (d["halftime"] ? __p_KGFS_MAIN_STR(0x162f8, 0x2a) : "") + __p_KGFS_MAIN_STR(0x16325, 0x141) + s("use") + __p_KGFS_MAIN_STR(0x16468, 0x20) + o("5") + __p_KGFS_MAIN_STR(0x1648b, 0x1b) + o(__p_KGFS_MAIN_STR(0x16178, 0x9)) + __p_KGFS_MAIN_STR(0x164aa, 0x8) + d["plantTime"] + __p_KGFS_MAIN_STR(0x164b8, 0x52) + d["bombTime"] + __p_KGFS_MAIN_STR(0x16510, 0xb4) + s("drop") + __p_KGFS_MAIN_STR(0x165c6, 0x20c) + s("use") + ": " + d["defuseTime"] + __p_KGFS_MAIN_STR(0x167d8, 0x1f) + d["kitTime"] + __p_KGFS_MAIN_STR(0x167fa, 0x19) + u(Mo["defkit"]["price"]) + __p_KGFS_MAIN_STR(0x16817, 0x18b) + d["freezeTime"] + __p_KGFS_MAIN_STR(0x169a5, 0x57) + s("buy") + __p_KGFS_MAIN_STR(0x16a01, 0x34) + d["buyWindow"] + __p_KGFS_MAIN_STR(0x16a3a, 0x77) + u(d["startMoney"]) + __p_KGFS_MAIN_STR(0x16ab9, 0x19) + u(d["maxMoney"]) + __p_KGFS_MAIN_STR(0x16ad2, 0xed) + o(__p_KGFS_MAIN_STR(0x16178, 0x9)) + __p_KGFS_MAIN_STR(0x16bc1, 0x43) : e === "dm" ? __p_KGFS_MAIN_STR(0x16c06, 0xe5) + l(0x258) + __p_KGFS_MAIN_STR(0x16ceb, 0x18c) + s("buy") + __p_KGFS_MAIN_STR(0x16e7a, 0x43) + s("score") + __p_KGFS_MAIN_STR(0x16ec1, 0x34) : document["body"]["classList"]["contains"]("touchmode") ? __p_KGFS_MAIN_STR(0x16ef8, 0x32) + c("Move", __p_KGFS_MAIN_STR(0x16f2d, 0x10)) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x16f4a, 0xe), __p_KGFS_MAIN_STR(0x16f5d, 0x2d)) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c("Shoot", __p_KGFS_MAIN_STR(0x16f8d, 0x28)) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x16fb7, 0x1f), __p_KGFS_MAIN_STR(0x16fd9, 0xf)) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x16fed, 0x19), __p_KGFS_MAIN_STR(0x17006, 0x3e)) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x17047, 0x1e), __p_KGFS_MAIN_STR(0x17066, 0x18)) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x1707f, 0xa), __p_KGFS_MAIN_STR(0x17089, 0xd)) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x17098, 0x12), __p_KGFS_MAIN_STR(0x170b0, 0x3b)) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x170eb, 0xd), __p_KGFS_MAIN_STR(0x170ff, 0x12)) : __p_KGFS_MAIN_STR(0x17117, 0x29) + c("Move", o(...["forward", "left", "back", "right"]["map"](e => {
      return this["_prettyKey"](a[e])
    }))) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c("Jump", s("jump")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c("Crouch", s("crouch")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x17147, 0xf), s("walk")) + __p_KGFS_MAIN_STR(0x1715a, 0x2b) + c("Shoot", o(__p_KGFS_MAIN_STR(0x16178, 0x9))) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x16fb7, 0x1f), s("aim")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c("Reload", s("reload")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x1718c, 0x1f), o(__p_KGFS_MAIN_STR(0x16178, 0x9)) + " / " + s("aim")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x171ad, 0x2e), o(__p_KGFS_MAIN_STR(0x16178, 0x9)) + " / " + s("aim") + __p_KGFS_MAIN_STR(0x171e0, 0xe)) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x171f2, 0x18), s("inspect")) + __p_KGFS_MAIN_STR(0x1720f, 0x2a) + c(__p_KGFS_MAIN_STR(0x17240, 0x34), o("1", "2", "3", "4", "5")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x1727b, 0x1b), o(__p_KGFS_MAIN_STR(0x17298, 0xe))) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x172aa, 0x14), s("lastweapon")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x172bf, 0x39), s("drop")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x172fb, 0x25), s("use")) + __p_KGFS_MAIN_STR(0x17321, 0x3a) + c(__p_KGFS_MAIN_STR(0x17360, 0x27), s("use")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x1707f, 0xa), s("buy")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x1738b, 0x40), o("R", "ENTER", "BACKSPACE")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x173cd, 0x15), s("score")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x173e8, 0xd), s("cases")) + __p_KGFS_MAIN_STR(0x16f3d, 0xb) + c(__p_KGFS_MAIN_STR(0x170eb, 0xd), o("ESC")) + __p_KGFS_MAIN_STR(0x173f7, 0x5f) + (n ? __p_KGFS_MAIN_STR(0x17459, 0x34) : __p_KGFS_MAIN_STR(0x17491, 0x32)) + ".</p>", i["innerHTML"] = f, n && (i["scrollTop"] = 0x0)
  } ["_specEnt"]() {
    let e = this["game"];
    return !e["player"]["alive"] && e["spectating"] && e["spectating"]["alive"] ? e["spectating"] : null
  } ["_heldId"](e, t) {
    return t === "knife" ? e && e["isPlayer"] ? Va(e["team"]) : Ba(e ? e["team"] : "CT") : t
  } ["updateHealth"]() {
    let t = this["_specEnt"]() || this["game"]["player"];
    let n = Math["max"](0x0, Math["ceil"](t["health"]));
    this["hpEl"]["textContent"] = n, this["hpBarEl"]["style"]["width"] = Math["max"](0x0, Math["min"](0x64, n)) + "%";
    let r = n <= e["LOW_HEALTH"];
    this["btEl"]["classList"]["toggle"](__p_KGFS_MAIN_STR(0x174c7, 0x14), r), this["hpEl"]["classList"]["toggle"](__p_KGFS_MAIN_STR(0x174dd, 0x14), r), this["btEl"]["firstElementChild"]["classList"]["toggle"](__p_KGFS_MAIN_STR(0x174dd, 0x14), r);
    let i = Math["ceil"](t["armor"] || 0x0);
    this["armorWrap"]["style"]["opacity"] = +(i > 0x0), this["armorEl"]["textContent"] = i > 0x0 ? i : "";
    let a = this["btEl"]["querySelector"](__p_KGFS_MAIN_STR(0x174f5, 0xf));
    a["classList"]["toggle"](__p_KGFS_MAIN_STR(0x17508, 0x12), i > 0x0), a["classList"]["toggle"](__p_KGFS_MAIN_STR(0x1751b, 0x13), i > 0x0 && !!t["helmet"]);
    let o = t["team"] === "CT";
    for (let e of [this["btState"], this["wpState"]]) {
      e && (e["classList"]["toggle"](__p_KGFS_MAIN_STR(0x17535, 0x10), o), e["classList"]["toggle"](__p_KGFS_MAIN_STR(0x17546, 0x19), !o))
    }
  }
  static get["FIRE_ICON"]() {
    return {
      ["single"]: __p_KGFS_MAIN_STR(0x17561, 0x17),
      ["burst"]: __p_KGFS_MAIN_STR(0x1757b, 0x15),
      ["auto"]: __p_KGFS_MAIN_STR(0x17594, 0x14)
    }
  } ["_setAmmo"](t, n, r) {
    this["ammoEl"]["textContent"] = t === "" ? "" : t, r && r["mag"], this["btEl"]["firstElementChild"]["classList"]["remove"](__p_KGFS_MAIN_STR(0x175ac, 0x18)), this["reserveEl"]["textContent"] = n === "" ? "" : n;
    let i = r ? r["burst"] ? "burst" : r["auto"] ? "auto" : "single" : "single";
    if (i !== this["_fireMode"]) {
      this["_fireMode"] = i;
      let t = this["btState"];
      for (let e of ["single", "burst", "auto"]) {
        t["classList"]["toggle"](__p_KGFS_MAIN_STR(0x175c9, 0x10) + (e === "auto" ? __p_KGFS_MAIN_STR(0x175df, 0xb) : e), e === i)
      }
      this["magIconEl"]["style"]["setProperty"](__p_KGFS_MAIN_STR(0x175ed, 0x8), "url(" + jv(e["FIRE_ICON"][i]) + ")")
    }
    this["btEl"]["classList"]["toggle"](__p_KGFS_MAIN_STR(0x175fd, 0x9), t === ""), this["reserveEl"]["parentElement"]["parentElement"]["style"]["visibility"] = n === "" ? "hidden" : ""
  } ["_drawWeaponRows"](e, t = null) {
    let n = [];
    let r = e["current"];
    let i = (e, t, r, i) => {
      return t && n["push"]({
        ["n"]: e,
        ["id"]: t,
        ["count"]: r,
        ...i
      })
    };
    i(0x1, e["slots"][0x1]), i(0x2, e["slots"][0x2]), i(0x3, "knife", 0x0, {
      ["also"]: e["states"] && e["states"]["zeus"] ? "zeus" : null,
      ["glyphId"]: t ? Ba(t["team"]) : Va(this["game"]["player"]["team"])
    });
    let a = e["grenades"]["reduce"]((e, t) => {
      return e + (t["count"] || 0x0)
    }, 0x0);
    let o = t ? !!t["hasKit"] : !!(this["game"]["modeCtl"] && this["game"]["modeCtl"]["playerKit"]);
    n["push"]({
      ["n"]: 0x4,
      ["id"]: e["grenades"]["length"] ? e["grenades"][0x0]["id"] : null,
      ["count"]: a,
      ["pip"]: !0x0,
      ["nades"]: e["grenades"],
      ["bomb"]: e["slots"][0x5] || (o ? "defkit" : null),
      ["objNum"]: e["slots"][0x5] ? 0x5 : null
    });
    let s = n["map"](e => {
      return "" + e["n"] + ":" + e["id"] + ":" + (e["glyphId"] || "") + ":" + (e["count"] || "") + ":" + (e["also"] || "") + ":" + (e["bomb"] || "") + ":" + (e["objNum"] || "") + ":" + (e["nades"] ? e["nades"]["map"](e => {
        return e["id"] + e["count"]
      })["join"](",") : "")
    })["join"]("|") + "#" + r;
    if (s === this["_wpnSig"]) {
      return
    }
    this["_wpnSig"] = s;
    let c = r !== this["_wpnCur"];
    this["_wpnCur"] = r, this["slotsEl"]["innerHTML"] = n["map"](e => {
      V[e["id"]];
      let n = e["nades"] ? e["nades"]["some"](e => {
        return e["id"] === r
      }) || e["bomb"] === r : e["id"] === r;
      let i = e["bomb"] && e["bomb"] === r ? e["bomb"] : e["nades"] && e["nades"]["some"](e => {
        return e["id"] === r
      }) ? r : e["id"];
      let a = !t && this["game"]["weapons"] && this["game"]["weapons"]["states"] ? this["game"]["weapons"]["states"][i] : null;
      let o = t ? this["game"]["_botSkin"] ? this["game"]["_botSkin"](t, V[i]) : null : a && a["skinOverride"] === "default" ? null : a && a["skinOverride"] || (H["equippedFor"] ? H["equippedFor"](i) : null);
      let s = i ? o && o["name"] || V[i] && V[i]["name"] || Mo[i] && Mo[i]["name"] || i : "";
      let l = (e, t) => {
        return __p_KGFS_MAIN_STR(0x1760a, 0x4d) + (t ? __p_KGFS_MAIN_STR(0x1765b, 0x9) : "") + __p_KGFS_MAIN_STR(0x17665, 0x3d) + jv("wpn/" + e + ".svg") + __p_KGFS_MAIN_STR(0x176a8, 0xb)
      };
      let u = [];
      if (e["pip"]) {
        for (let t of e["nades"]) {
          for (let e = 0x0; e < t["count"]; e++) {
            u["push"](t["id"])
          }
        }
        for (; u["length"] < 0x4;) {
          u["push"](null)
        }
      }
      let d = [__p_KGFS_MAIN_STR(0x176b6, 0xd)];
      return n && d["push"](__p_KGFS_MAIN_STR(0x176c7, 0x19)), n && c && d["push"](__p_KGFS_MAIN_STR(0x176e2, 0x13)), e["pip"] && d["push"](__p_KGFS_MAIN_STR(0x176f7, 0xa)), e["gear"] && d["push"]("kit"), __p_KGFS_MAIN_STR(0x17708, 0xf) + d["join"](" ") + __p_KGFS_MAIN_STR(0x1771a, 0x5d) + (n ? __p_KGFS_MAIN_STR(0x1777c, 0x28) : "") + "\">" + (e["bomb"] ? __p_KGFS_MAIN_STR(0x177a5, 0x19) + (e["bomb"] === r ? __p_KGFS_MAIN_STR(0x177c2, 0x10) : "") + "\">" + l(e["bomb"]) + (e["objNum"] ? __p_KGFS_MAIN_STR(0x177d5, 0x54) + e["objNum"] + __p_KGFS_MAIN_STR(0xdfcb, 0x8) : "") + __p_KGFS_MAIN_STR(0xdfcb, 0x8) : "") + (__p_KGFS_MAIN_STR(0x1782c, 0x2f) + (e["pip"] ? __p_KGFS_MAIN_STR(0x17862, 0xe) : "") + (e["also"] ? __p_KGFS_MAIN_STR(0x17871, 0xb) : "") + "\">") + (e["pip"] ? (() => {
        let e = !0x1;
        return u["slice"](0x0, 0x4)["map"](t => {
          let n = !e && t && t === r;
          return n && (e = !0x0), __p_KGFS_MAIN_STR(0x17880, 0x1a) + (n ? __p_KGFS_MAIN_STR(0x1789c, 0x12) : "") + "\">" + (t ? l(t) : __p_KGFS_MAIN_STR(0x178ae, 0x1e)) + __p_KGFS_MAIN_STR(0xdfcb, 0x8)
        })["join"]("")
      })() : (e["also"] ? l(e["also"], e["also"] === r) : "") + l(e["glyphId"] || e["id"], e["also"] ? e["id"] === r : !0x1)) + __p_KGFS_MAIN_STR(0xdfcb, 0x8) + (e["gear"] ? "" : __p_KGFS_MAIN_STR(0x178cd, 0x60) + e["n"] + __p_KGFS_MAIN_STR(0xdfcb, 0x8)) + (__p_KGFS_MAIN_STR(0x17932, 0x8a) + s + __p_KGFS_MAIN_STR(0x179c2, 0x1e))
    })["join"]("")
  } ["updateMoney"]() {
    if (this["moneyEl"]["style"]["display"] = this["game"]["modeCtl"] ? "" : "none", !this["game"]["modeCtl"]) {
      return
    }
    let e = this["_specEnt"]() || this["game"]["player"];
    this["moneyEl"]["textContent"] = "$" + Math["max"](0x0, e["money"] | 0x0), this["buyOpen"] && this["refreshBuyMoney"]()
  } ["updateWeapon"]() {
    let e = this["_specEnt"]();
    if (e) {
      let t = this["game"]["_povOverride"];
      let n = t && t["ent"] === e ? t["wid"] : e["weapon"];
      let r = V[e["weapon"]] || V["knife"];
      let i = V[n] || r;
      this["wnameEl"]["textContent"] = i["name"] + (e["reloadT"] > 0x0 && i === r ? __p_KGFS_MAIN_STR(0x179e6, 0x14) : ""), Mv["has"](i["class"]) ? this["_setAmmo"]("", "", i) : this["_setAmmo"](Math["max"](0x0, e["ammo"] | 0x0), Math["max"](0x0, e["reserve"] | 0x0), i);
      let a = {};
      r["class"] === "pistol" ? a[0x2] = r["id"] : r["class"] !== "knife" && r["class"] !== "grenade" && r["class"] !== "c4" && (a[0x1] = r["id"]), e["pistol"] && !a[0x2] && (a[0x2] = e["pistol"]), e["hasBomb"] && (a[0x5] = "c4");
      let o = new Map;
      for (let t of e["nades"] || []) {
        o["set"](t, (o["get"](t) || 0x0) + 0x1)
      }
      let s = [...o]["map"](([e, t]) => {
        return {
          ["id"]: e,
          ["count"]: t
        }
      });
      this["_drawWeaponRows"]({
        ["slots"]: a,
        ["grenades"]: s,
        ["current"]: n,
        ["states"]: {}
      }, e);
      return
    }
    let t = this["game"]["weapons"];
    let n = t["def"]();
    let r = t["state"]();
    this["wnameEl"]["textContent"] = n["name"] + (t["reloading"] ? __p_KGFS_MAIN_STR(0x179e6, 0x14) : ""), Mv["has"](n["class"]) ? this["_setAmmo"]("", "", n) : this["_setAmmo"](r["ammo"], r["reserve"], n), this["_drawWeaponRows"](t)
  } ["updateScorebar"]() {
    let e = this["game"];
    let t = e["modeCtl"];
    let n = this["scorebar"]["firstChild"] && this["scorebar"]["querySelector"](__p_KGFS_MAIN_STR(0x179fb, 0xd));
    if (n && t && t["state"] === "planted") {
      let e = String(Math["max"](0x0, Math["ceil"](t["bombT"])));
      n["textContent"] !== e && (n["textContent"] = e);
      let r = t["bombT"] > 0x14 ? "Slow" : t["bombT"] > 0xa ? "Medium" : "Fast";
      if (this["_bombTier"] !== r) {
        this["_bombTier"] = r;
        let e = this["scorebar"]["querySelector"](__p_KGFS_MAIN_STR(0x17a0c, 0x14));
        e && (e["classList"]["remove"]("BombPlantedPulse__Slow", "BombPlantedPulse__Medium", "BombPlantedPulse__Fast"), e["classList"]["add"]("BombPlantedPulse__" + r))
      }
    }
    let r = t ? t["state"] + "|" + (t["state"] === "planted" ? "bomb" : Math["floor"](t["displayClock"]())) + "|" + t["score"]["CT"] + "|" + t["score"]["T"] : Math["floor"](Math["max"](0x0, e["roundTimeLeft"])) + "|dm";
    if (r === this["_sbSig"]) {
      return
    }
    this["_sbSig"] = r;
    let i;
    if (e["modeCtl"]) {
      let t = e["modeCtl"]["hudState"]();
      let n = Math["max"](0x0, t["clock"]);
      let r = t["bombPlanted"] ? n > 0x14 ? "Slow" : n > 0xa ? "Medium" : "Fast" : "Slow";
      let a = Math["floor"](n / 0x3c);
      let o = Math["floor"](n % 0x3c);
      i = __p_KGFS_MAIN_STR(0x17a27, 0x193) + (t["red"] ? "teamcounter_red_timer" : "") + __p_KGFS_MAIN_STR(0x17bbc, 0x15) + (t["bombPlanted"] ? "none" : "") + "\">" + a + ":" + o["toString"]()["padStart"](0x2, "0") + __p_KGFS_MAIN_STR(0x17bd4, 0xa7) + t["scoreCT"] + __p_KGFS_MAIN_STR(0x17c7f, 0x7d) + t["scoreT"] + __p_KGFS_MAIN_STR(0x17d01, 0x53) + (t["bombPlanted"] ? "" : "none") + __p_KGFS_MAIN_STR(0x17d59, 0x54) + r + __p_KGFS_MAIN_STR(0x17db2, 0x19) + jv(__p_KGFS_MAIN_STR(0x17dce, 0x8)) + __p_KGFS_MAIN_STR(0x17dda, 0x3b) + Math["ceil"](n) + __p_KGFS_MAIN_STR(0x17e17, 0x17)
    } else {
      let t = 0x0;
      let n = 0x0;
      for (let r of [...e["allEntities"](), ...(e["onlinePlayers"] || [])]) {
        r["team"] === "CT" ? t += r["kills"] || 0 : n += r["kills"] || 0
      }
      let r = Math["max"](0x0, e["roundTimeLeft"]);
      i = __p_KGFS_MAIN_STR(0x17e2f, 0x194) + Math["floor"](r / 0x3c) + ":" + Math["floor"](r % 0x3c)["toString"]()["padStart"](0x2, "0") + __p_KGFS_MAIN_STR(0x17bd4, 0xa7) + t + __p_KGFS_MAIN_STR(0x17c7f, 0x7d) + n + __p_KGFS_MAIN_STR(0x17fc4, 0x25)
    }
    if (i !== this["_sbHTML"] && (this["_sbHTML"] = i, this["scorebar"]["innerHTML"] = i));
    // team alive counts refresh every frame (players join/die mid-match);
    // works with AND without a modeCtl (dm has none)
    if (this["avCTCount"]) {
      let t = 0x0;
      let n = 0x0;
      for (let r of [...e["allEntities"](), ...(e["onlinePlayers"] || [])]) {
        r["alive"] && (r["team"] === "CT" ? t++ : n++)
      }
      this["avCTCount"]["textContent"] = t, this["avTCount"]["textContent"] = n
    }
  } ["addKill"](e, t, n, r, i = {}) {
    this["_lastKillT"] = performance["now"]();
    let a = document["createElement"]("div");
    let o = !!(e && e["isPlayer"]) && !n["isPlayer"];
    let s = !!n["isPlayer"];
    a["className"] = "kf" + (s ? __p_KGFS_MAIN_STR(0x17fee, 0xd) : o ? __p_KGFS_MAIN_STR(0x17ffe, 0xd) : "");
    let c = e ? e["name"] : "";
    let l = e && e["team"] === "CT" ? "ct" : "t";
    let u = n["team"] === "CT" ? "ct" : "t";
    let d = e => {
      return __p_KGFS_MAIN_STR(0x1800f, 0x1d) + e + "\">"
    };
    let f = i["blind"] ? d(Iu()) : "";
    let p = i["air"] ? __p_KGFS_MAIN_STR(0x18030, 0x24) + Pu() + "\">" : "";
    let m = i["suicide"] || !t ? "" : __p_KGFS_MAIN_STR(0x1805a, 0x1f) + ju(this["_heldId"](e, t["id"])) + "\">";
    let h = i["noscope"] ? d(Nu()) : "";
    let g = i["smoke"] ? d(Lu()) : "";
    let _ = i["pierced"] ? d(Fu()) : "";
    let v = r ? d(Mu()) : "";
    let y = i["suicide"] ? d(Ru()) : "";
    a["innerHTML"] = "" + f + __p_KGFS_MAIN_STR(0x1807f, 0x10) + l + " " + (e && e["isPlayer"] ? "me" : "") + "\">" + c + __p_KGFS_MAIN_STR(0xe0d5, 0x9) + p + m + h + g + _ + v + y + __p_KGFS_MAIN_STR(0x18091, 0x19) + u + " " + (n["isPlayer"] ? "me" : "") + "\">" + n["name"] + __p_KGFS_MAIN_STR(0xe0d5, 0x9), this["killfeed"]["appendChild"](a);
    let b = (o || s ? 7.5 : 0x5) * 0x3e8;
    for (setTimeout(() => {
        return a["classList"]["add"]("fade")
      }, b - 0x3e8), setTimeout(() => {
        return this["_retireKill"](a)
      }, b); this["killfeed"]["children"]["length"] > 0x6;) {
      this["_retireKill"](this["killfeed"]["firstChild"], !0x0)
    }
  } ["_retireKill"](e, t = !0x1) {
    if (e && !e["_retiring"]) {
      if (e["_retiring"] = !0x0, t) {
        e["remove"]();
        return
      }
      e["style"]["height"] = e["offsetHeight"] + "px", e["offsetHeight"], e["classList"]["add"]("collapse"), setTimeout(() => {
        return e["remove"]()
      }, 0xc8)
    }
  } ["hitmarker"](e) {
    if (!xhairHitEnabled()) {
      return
    }
    this["hitT"] = e ? .24 : .18;
    let t = document["getElementById"]("hitmark");
    t["classList"]["toggle"]("hs", e), t["classList"]["add"]("pop"), this["_hmFlip"] = !this["_hmFlip"], t["style"]["animationName"] = this["_hmFlip"] ? "hmpop2" : "hmpop", t["style"]["opacity"] = 0x1
  } ["damageFlash"]() {
    this["dmgT"] = .5
  } ["reward"](e) {
    this["rewardEl"]["textContent"] = e, this["rewardEl"]["style"]["opacity"] = 0x1, clearTimeout(this["_rt"]), this["_rt"] = setTimeout(() => {
      this["rewardEl"]["style"]["opacity"] = 0x0
    }, 0x384)
  } ["announce"](e, t = 0x9c4) {
    this["announceEl"]["textContent"] = e, this["announceEl"]["style"]["opacity"] = 0x1, clearTimeout(this["_at"]), this["_at"] = setTimeout(() => {
      this["announceEl"]["style"]["opacity"] = 0x0
    }, t)
  } ["scope"](e) {
    this["scopeEl"]["style"]["display"] = e ? "block" : "none", document["getElementById"]("crosshair")["style"]["display"] = e ? "none" : "", e && this["_snapScopeLens"]()
  } ["_settingsDefaults"]() {
    let e = !!(this["game"] && this["game"]["_isMobile"]);
    let t = this["game"] && this["game"]["autoDefaults"] ? this["game"]["autoDefaults"]() : null;
    return {
      ["quality"]: t ? t["quality"] : "high",
      ["aniso"]: t ? t["aniso"] : "16",
      ["aspect"]: "native",
      ["hand"]: "right",
      ["showfps"]: "0",
      ["fpsextra"]: "0",
      ["bots"]: "9",
      ["botson"]: "1",
      ["chfollow"]: "1",
      ["diff"]: "2",
      ["rscale"]: t ? t["rscale"] : e ? "balanced" : "quality"
    }
  } ["_syncSettingsRows"]() {
    let e = this["game"];
    if (!e || !this["menuEl"]) {
      return
    }
    let t = this["_settingsDefaults"]();
    let n = {
      ["quality"]: e["quality"],
      ["rscale"]: e["renderScale"],
      ["aniso"]: String(e["anisoPref"] || 0x10),
      ["aspect"]: e["aspectMode"] || "native",
      ["hand"]: e["handPref"] || "right",
      ["showfps"]: e["showFps"] ? "1" : "0",
      ["fpsextra"]: e["fpsExtra"] ? "1" : "0"
    };
    for (let [e, t] of Object["entries"](n)) {
      let n = this["menuEl"]["querySelector"]("#opt-" + e);
      if (n) {
        for (let e of n["children"]) {
          e["classList"]["toggle"]("sel", e["dataset"]["v"] === String(t))
        }
      }
    }
    for (let [e, n] of Object["entries"](t)) {
      let t = this["menuEl"]["querySelector"]("#opt-" + e);
      if (t) {
        for (let e of t["children"]) {
          e["classList"]["toggle"]("isdef", e["dataset"]["v"] === n)
        }
      }
    }
    let r = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x180ad, 0xf));
    r && (r["style"]["display"] = e["_gfxAuto"] ? "" : "none")
  } ["_preloadScopeArt"]() {
    for (let [e, t] of [
        [__p_KGFS_MAIN_STR(0x180c1, 0x1f), __p_KGFS_MAIN_STR(0x180e4, 0xa)]
      ]) {
      fetch(e)["then"](e => {
        return e["ok"] ? e["blob"]() : null
      })["then"](e => {
        if (!e) {
          return
        }
        let n = URL["createObjectURL"](e);
        let r = new Image;
        r["src"] = n;
        let i = () => {
          let e = this["scopeEl"] && this["scopeEl"]["querySelector"](t);
          e && e["style"]["setProperty"]("--ap", "url(\"" + n + "\")")
        };
        r["decode"] ? r["decode"]()["then"](i)["catch"](i) : r["onload"] = i
      })["catch"](() => {})
    }
  } ["_snapScopeLens"]() {
    let e = this["scopeEl"] && this["scopeEl"]["querySelector"](__p_KGFS_MAIN_STR(0x180f5, 0xa));
    if (!e) {
      return
    }
    let t = Math["round"](Math["min"](innerHeight * Dv, innerWidth));
    e["style"]["left"] = Math["round"]((innerWidth - t) / 0x2) + "px", e["style"]["top"] = Math["round"]((innerHeight - t) / 0x2) + "px", e["style"]["bottom"] = "auto", e["style"]["width"] = t + "px", e["style"]["height"] = t + "px", e["style"]["transform"] = "none"
  } ["showRespawn"](e) {
    let t = e === null ? null : Math["max"](0x0, Math["ceil"](e));
    if (t !== this["_respShown"]) {
      if (this["_respShown"] = t, t === null) {
        this["respawnEl"]["style"]["display"] = "none";
        return
      }
      this["respawnEl"]["style"]["display"] = "flex", this["respawnEl"]["innerHTML"] = __p_KGFS_MAIN_STR(0x18102, 0x2f) + (this["game"]["respawnAllowed"] ? "respawning" : "spectating") + " in " + t + __p_KGFS_MAIN_STR(0x18134, 0xb)
    }
  } ["setProgress"](e, t) {
    if (e == null || e <= 0x0) {
      this["progressWrap"]["style"]["display"] = "none";
      return
    }
    this["progressWrap"]["style"]["display"] = "block", document["getElementById"]("progresslabel")["textContent"] = t, document["getElementById"]("progressinner")["style"]["width"] = Math["min"](0x64, e * 0x64) + "%"
  } ["setHint"](e) {
    this["_hint"] !== e && (this["_hint"] = e, this["hintEl"]["textContent"] = e || "", this["hintEl"]["style"]["opacity"] = +!!e)
  } ["setFreeze"](e) {
    let t = e === null ? null : Math["ceil"](e);
    let n = t === null ? null : this["keyName"]("buy");
    if (t !== this["_fzShown"] || n !== this["_fzKey"]) {
      if (this["_fzShown"] = t, this["_fzKey"] = n, t === null) {
        this["freezeEl"]["style"]["display"] = "none";
        return
      }
      this["freezeEl"]["style"]["display"] = "flex", this["freezeEl"]["innerHTML"] = __p_KGFS_MAIN_STR(0x18146, 0x19) + t + __p_KGFS_MAIN_STR(0x1815f, 0x3a) + n + __p_KGFS_MAIN_STR(0xdfcb, 0x8)
    }
  } ["showPauseTab"](e) {
    let t = !!this["_keybindsFromHowTo"];
    this["_keybindsFromHowTo"] = !0x1, t || this["closeHowTo"](), this["pauseMode"] = !0x0, this["_syncSettingsRows"](), this["pauseEl"]["style"]["display"] = "none", this["menuEl"]["style"]["display"] = "block", this["menuEl"]["classList"]["add"]("pausemode"), this["root"]["classList"]["add"]("inmenu"), document["body"]["classList"]["add"]("menuopen");
    let n = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1819c, 0x15) + e + "\"]");
    n && n["click"](), this["renderBinds"](), this["_pback"] || (this["_pback"] = document["createElement"]("button"), this["_pback"]["id"] = __p_KGFS_MAIN_STR(0x181b7, 0xd), this["_pback"]["textContent"] = __p_KGFS_MAIN_STR(0x181c8, 0x14), this["_pback"]["onclick"] = () => {
      return this["closePauseMenu"]()
    }, this["menuEl"]["appendChild"](this["_pback"])), this["_pback"]["textContent"] = t ? __p_KGFS_MAIN_STR(0x181e3, 0x19) : __p_KGFS_MAIN_STR(0x181c8, 0x14), this["_pback"]["style"]["display"] = "block"
  } ["closePauseMenu"]() {
    this["pauseMode"] && (this["pauseMode"] = !0x1, this["closeCase"](), this["game"]["hideSkinViewer"](), this["menuEl"]["classList"]["remove"]("pausemode"), this["menuEl"]["style"]["display"] = "none", this["root"]["classList"]["remove"]("inmenu"), document["body"]["classList"]["remove"]("menuopen"), this["_pback"] && (this["_pback"]["style"]["display"] = "none"), this["showPause"](), this["howToOpen"] && this["_renderHowTo"](this["_howToTab"] || "controls"))
  } ["renderBinds"]() {
    let e = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x16126, 0xb));
    if (!e) {
      return
    }
    let t = {
      ["forward"]: __p_KGFS_MAIN_STR(0x181ff, 0xf),
      ["back"]: __p_KGFS_MAIN_STR(0x18213, 0xb),
      ["left"]: __p_KGFS_MAIN_STR(0x18225, 0xb),
      ["right"]: __p_KGFS_MAIN_STR(0x18231, 0xd),
      ["jump"]: "Jump",
      ["crouch"]: "Crouch",
      ["walk"]: __p_KGFS_MAIN_STR(0x18244, 0xf),
      ["use"]: __p_KGFS_MAIN_STR(0x18259, 0x19),
      ["reload"]: "Reload",
      ["buy"]: __p_KGFS_MAIN_STR(0x18275, 0xa),
      ["lastweapon"]: __p_KGFS_MAIN_STR(0x18287, 0xe),
      ["score"]: "Scoreboard",
      ["aim"]: __p_KGFS_MAIN_STR(0x1829c, 0xe),
      ["inspect"]: __p_KGFS_MAIN_STR(0x182aa, 0x12),
      ["cases"]: __p_KGFS_MAIN_STR(0x182c0, 0xd),
      ["drop"]: __p_KGFS_MAIN_STR(0x182d2, 0xe)
    };
    let n = e => {
      return this["_prettyKey"](e)
    };
    let r = this["game"]["input"]["binds"];
    let i = e => {
      return e ? n(e) : "NONE"
    };
    e["innerHTML"] = Object["entries"](t)["map"](([e, t]) => {
      return e === "crouch" ? __p_KGFS_MAIN_STR(0x182e5, 0x22) + t + __p_KGFS_MAIN_STR(0x18308, 0x5b) + i(r["crouch"]) + __p_KGFS_MAIN_STR(0x18366, 0x67) + i(r["crouch2"]) + __p_KGFS_MAIN_STR(0x183d4, 0x1a) : __p_KGFS_MAIN_STR(0x182e5, 0x22) + t + __p_KGFS_MAIN_STR(0x183f4, 0x37) + e + "\">" + i(r[e]) + __p_KGFS_MAIN_STR(0x1842b, 0x13)
    })["join"](""), e["querySelectorAll"](__p_KGFS_MAIN_STR(0x18441, 0xa))["forEach"](e => {
      e["onclick"] = () => {
        if (this["_bindWait"]) {
          return
        }
        this["_bindWait"] = e["dataset"]["action"], e["textContent"] = __p_KGFS_MAIN_STR(0x18451, 0x12), e["classList"]["add"]("waiting");
        let t = e => {
          e !== "Escape" && this["game"]["input"]["setBind"](this["_bindWait"], e), this["_bindWait"] = null, document["removeEventListener"]("keydown", n, !0x0), document["removeEventListener"]("mousedown", r, !0x0), this["renderBinds"]()
        };
        let n = e => {
          e["preventDefault"](), e["stopPropagation"](), t(e["code"])
        };
        let r = n => {
          n["target"] !== e && (n["preventDefault"](), n["stopPropagation"](), t(n["button"] === 0x2 ? "Mouse2" : n["button"] === 0x0 ? "Mouse1" : "Mouse" + n["button"]))
        };
        document["addEventListener"]("keydown", n, !0x0), setTimeout(() => {
          return document["addEventListener"]("mousedown", r, !0x0)
        }, 0x32)
      }
    });
    let a = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1846a, 0xf));
    a && (a["onclick"] = () => {
      localStorage["removeItem"]("clutcher_binds"), this["game"]["input"]["binds"] = {
        ["forward"]: "KeyW",
        ["back"]: "KeyS",
        ["left"]: "KeyA",
        ["right"]: "KeyD",
        ["jump"]: "Space",
        ["crouch"]: "ControlLeft",
        ["crouch2"]: "KeyC",
        ["walk"]: "ShiftLeft",
        ["use"]: "KeyE",
        ["reload"]: "KeyR",
        ["buy"]: "KeyB",
        ["lastweapon"]: "KeyQ",
        ["score"]: "Tab",
        ["aim"]: "Mouse2",
        ["inspect"]: "KeyF",
        ["cases"]: "KeyN",
        ["drop"]: "KeyG"
      }, this["renderBinds"]()
    });
    let o = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1618d, 0x13));
    if (o) {
      o["querySelectorAll"](__p_KGFS_MAIN_STR(0x161ba, 0x10))["forEach"](e => {
        e["onclick"] = () => {
          return this["_renderHowTo"](e["dataset"]["ht"], "settings")
        }
      });
      let e = this["menuEl"]["querySelector"](__p_KGFS_MAIN_STR(0x1847d, 0x12));
      this["_renderHowTo"](this["_settingsHowToTab"] || (e && e["dataset"]["v"] === "dm" ? "dm" : "defusal"), "settings")
    }
  } ["_ensureKillCard"]() {
    this["_kcName"] || (this["killCard"]["innerHTML"] = __p_KGFS_MAIN_STR(0x18494, 0xdd), this["_kcName"] = this["killCard"]["querySelector"](__p_KGFS_MAIN_STR(0x18576, 0xa)), this["_kcImg"] = this["killCard"]["querySelector"](__p_KGFS_MAIN_STR(0x18583, 0xe)), this["_kcWname"] = this["killCard"]["querySelector"](__p_KGFS_MAIN_STR(0x18592, 0xb)), this["_kcSkin"] = this["killCard"]["querySelector"](__p_KGFS_MAIN_STR(0x185a2, 0xa)))
  } ["showDeath"](e, t, n) {
    if (this["_deathShownAt"] = this["game"]["time"], this["deathOv"]["style"]["opacity"] = 0x1, e) {
      this["_ensureKillCard"]();
      let r = V[t];
      this["_kcName"]["textContent"] = e["name"], this["_kcName"]["style"]["color"] = e["team"] === "CT" ? __p_KGFS_MAIN_STR(0x185b2, 0xb) : __p_KGFS_MAIN_STR(0x185c3, 0xa), this["_kcImg"]["src"] = ju(this["_heldId"](e, t || "knife")), this["_kcWname"]["textContent"] = r ? r["name"] : "", this["_kcSkin"]["textContent"] = n || "", this["_kcSkin"]["style"]["display"] = n ? "" : "none", this["killCard"]["classList"]["add"]("show")
    }
  } ["hideDeath"]() {
    this["deathOv"]["style"]["opacity"] = 0x0, this["killCard"]["classList"]["remove"]("show")
  } ["clearTransient"]() {
    for (; this["killfeed"]["firstChild"];) {
      this["killfeed"]["firstChild"]["remove"]()
    }
    clearTimeout(this["_at"]), this["announceEl"]["style"]["opacity"] = 0x0, this["announceEl"]["textContent"] = "", clearTimeout(this["_rt"]), this["rewardEl"]["style"]["opacity"] = 0x0, this["scoreOpen"] = !0x1, this["forceScoreT"] = 0x0, this["_sbHeldT"] = 0x0, this["scoreboardEl"]["classList"]["remove"]("on"), this["scoreboardEl"]["style"]["display"] = "none", this["hitT"] = 0x0;
    let e = document["getElementById"]("hitmark");
    e && (e["style"]["opacity"] = 0x0, e["classList"]["remove"]("pop", "hs")), this["dmgT"] = 0x0, this["dmgEl"]["style"]["opacity"] = 0x0, this["flashEl"]["style"]["opacity"] = 0x0, this["smokeOv"]["style"]["opacity"] = 0x0;
    for (let e of this["dmgArcs"]) {
      e["t"] = 0x0, e["el"]["style"]["opacity"] = 0x0
    }
    this["targetIdEl"]["style"]["opacity"] = 0x0, this["killCard"]["classList"]["remove"]("show"), this["showRespawn"](null)
  } ["damageFrom"](e) {
    let t = this["dmgArcs"]["find"](e => {
      return e["t"] <= 0x0
    }) || this["dmgArcs"][0x0];
    t["t"] = .9, t["el"]["style"]["transform"] = __p_KGFS_MAIN_STR(0x185d1, 0x9) + e + "rad)"
  }
  static get["RADAR_CAL"]() {
    return {
      ["dusker"]: {
        ["img"]: __p_KGFS_MAIN_STR(0x185df, 0x17),
        ["posX"]: -0x9ac,
        ["posY"]: 0xca7,
        ["scale"]: 4.4
      },
      ["oasis"]: {
        ["img"]: __p_KGFS_MAIN_STR(0x185f9, 0x18),
        ["posX"]: -0xc9e,
        ["posY"]: 0x6b1,
        ["scale"]: 0x5
      }
    }
  }
  static get["CT_COLOR"]() {
    return __p_KGFS_MAIN_STR(0x18613, 0x14)
  }
  static get["T_COLOR"]() {
    return __p_KGFS_MAIN_STR(0x1430b, 0x9)
  }
  static get["BOMB_COLOR"]() {
    return __p_KGFS_MAIN_STR(0x1862b, 0x9)
  }
  static get["LOW_HEALTH"]() {
    return 0x14
  }
  static get["RADAR_RANGE"]() {
    return 0x1c
  } ["_radarAsset"](e) {
    let t = this["_rdImgs"] ||= {};
    if (t[e] === void 0x0) {
      let n = new Image;
      n["onload"] = () => {
        t[e] = n
      }, n["onerror"] = () => {
        t[e] = null
      }, n["src"] = "ui/" + e, t[e] = null
    }
    return t[e]
  } ["_radarTint"](e, t) {
    let n = e + "|" + t;
    let r = this["_rdTints"] ||= {};
    if (r[n]) {
      return r[n]
    }
    let i = this["_radarAsset"](e);
    if (!i || !i["width"]) {
      return null
    }
    let a = document["createElement"]("canvas");
    a["width"] = i["width"], a["height"] = i["height"];
    let o = a["getContext"]("2d");
    return o["drawImage"](i, 0x0, 0x0), o["globalCompositeOperation"] = __p_KGFS_MAIN_STR(0x18636, 0xb), o["fillStyle"] = t, o["fillRect"](0x0, 0x0, a["width"], a["height"]), r[n] = a
  } ["drawRadar"]() {
    let t = this["game"];
    let n = this["_specEnt"]() || t["player"];
    let r = e["RADAR_CAL"][t["map"] && t["map"]["id"]];
    if (!r || t["state"] !== "playing") {
      this["_radarVis"] !== !0x1 && (this["_radarVis"] = !0x1, this["radarEl"]["style"]["display"] = "none");
      return
    }
    if (t["time"] - (this["_radarT"] || 0x0) < .014) {
      return
    }
    this["_radarT"] = t["time"], this["_radarVis"] !== !0x0 && (this["_radarVis"] = !0x0, this["radarEl"]["style"]["display"] = "block");
    let i = this["_radarCtx"];
    let a = this["radarEl"]["width"];
    let o = a / 0x2;
    let s = e["RADAR_RANGE"];
    let c = o / s;
    let l = t["modeCtl"];
    let u = .0254;
    let d = n["team"];
    let f = n["yaw"];
    let p = d === "CT" ? e["CT_COLOR"] : e["T_COLOR"];
    p !== this["_rdRing"] && (this["_rdRing"] = p, this["radarEl"]["style"]["borderColor"] = p), i["clearRect"](0x0, 0x0, a, a), i["save"](), i["beginPath"](), i["arc"](o, o, o, 0x0, 0x7), i["clip"](), i["save"](), i["translate"](o, o), i["rotate"](f), i["scale"](c, c), i["translate"](-n["x"], -n["z"]);
    let m = this["_radarAsset"](r["img"]);
    if (m) {
      let e = r["scale"] * u;
      i["save"](), i["transform"](0x0, e, -e, 0x0, r["posY"] * u, r["posX"] * u), i["drawImage"](m, 0x0, 0x0), i["restore"]()
    }
    let h = (e, t, n) => {
      i["save"](), i["translate"](e, t), i["rotate"](-f), i["scale"](0x1 / c, 0x1 / c), n(), i["restore"]()
    };
    let g = (e, t, n) => {
      e && i["drawImage"](e, -t / 0x2, -n / 0x2, t, n)
    };
    let _ = d === "CT" ? e["CT_COLOR"] : e["T_COLOR"];
    for (let e of t["map"]["bombsites"]) {
      let t = e["name"] === "A" ? __p_KGFS_MAIN_STR(0x18649, 0x10) : __p_KGFS_MAIN_STR(0x1865b, 0x10);
      let r = this["_radarTint"](t, _);
      let a = e["cx"] - n["x"];
      let o = e["cz"] - n["z"];
      let c = Math["hypot"](a, o);
      let l = c > s * .88;
      let u = l ? s * .88 / (c || 0x1) : 0x1;
      h(n["x"] + a * u, n["z"] + o * u, () => {
        i["globalAlpha"] = l ? .95 : .7, g(r, 0xf, 0xf), i["globalAlpha"] = 0x1
      })
    }
    if (l) {
      let n = this["_radarTint"](__p_KGFS_MAIN_STR(0x18672, 0x18), e["BOMB_COLOR"]);
      if (l["planted"]) {
        let e = l["bombT"] || 0x0;
        let r = Math["max"](.18, Math["min"](0x1, e / 0x28) * .95);
        (t["time"] / r | 0x0) % 0x2 == 0x0 && h(l["planted"]["x"], l["planted"]["z"], () => {
          return g(n, 0x18, 0x18)
        })
      } else {
        l["dropped"] && h(l["dropped"]["x"], l["dropped"]["z"], () => {
          return g(n, 0x14, 0x14)
        })
      }
    }
    if (d === "CT" && t["drops"]) {
      for (let e of t["drops"]) {
        e["id"] === "defkit" && h(e["x"], e["z"], () => {
          return g(this["_radarAsset"](__p_KGFS_MAIN_STR(0x18690, 0x17)), 0xc, 0xc)
        })
      }
    }
    let v = e["CT_COLOR"];
    let y = e["T_COLOR"];
    let b = 0x0;
    for (let r of [...t["botMgr"]["bots"], t["player"]]) {
      if (r === n) {
        continue
      }
      let a = r["team"] === d;
      if (!(a || t["time"] - (r["_radarPing"] || -0x63) < 2.5)) {
        continue
      }
      let o = a ? ++b : 0x0;
      let c = r["x"] - n["x"];
      let u = r["z"] - n["z"];
      let p = Math["hypot"](c, u);
      let m = a ? d === "CT" ? v : y : __p_KGFS_MAIN_STR(0x186ac, 0x9);
      if (!r["alive"]) {
        a && p < s && h(r["x"], r["z"], () => {
          i["globalAlpha"] = .75, g(this["_radarTint"](__p_KGFS_MAIN_STR(0x186ba, 0xf), m), 0xf, 0xf), i["globalAlpha"] = 0x1
        });
        continue
      }
      if (p > s) {
        let e = Math["atan2"](u, c);
        h(n["x"] + s * .93 * Math["cos"](e), n["z"] + s * .93 * Math["sin"](e), () => {
          i["rotate"](e + f + Math["PI"] / 0x2), g(this["_radarTint"](__p_KGFS_MAIN_STR(0x186c9, 0x10), m), 0xe, 0xe)
        });
        continue
      }
      h(r["x"], r["z"], () => {
        a && (i["save"](), i["rotate"](r["yaw"]), i["globalAlpha"] = .22, g(this["_radarTint"](__p_KGFS_MAIN_STR(0x186d9, 0xe), m), 0x1a, 0x1a), i["globalAlpha"] = 0x1, i["restore"]()), g(this["_radarTint"](a ? __p_KGFS_MAIN_STR(0x186ee, 0xf) : __p_KGFS_MAIN_STR(0x18701, 0xf), m), a ? 0x11 : 0x14, a ? 0x11 : 0x14);
        let t = r["y"] - n["y"];
        t > 1.6 ? g(this["_radarAsset"](__p_KGFS_MAIN_STR(0x18712, 0xf)), 0x9, 0x5) : t < -1.6 && g(this["_radarAsset"](__p_KGFS_MAIN_STR(0x18726, 0xf)), 0x9, 0x5), l && l["carrier"] === r && a && (i["save"](), i["translate"](0x0, -0xa), g(this["_radarTint"](__p_KGFS_MAIN_STR(0x18672, 0x18), e["BOMB_COLOR"]), 0xf, 0xf), i["restore"]()), o && (i["fillStyle"] = "#fff", i["font"] = __p_KGFS_MAIN_STR(0x1873b, 0x33), i["textAlign"] = "center", i["textBaseline"] = "middle", i["fillText"](String(o), 0x0, .5))
      })
    }
    i["restore"](), i["save"](), i["translate"](o, o);
    let x = this["_radarCone"];
    x || (x = this["_radarCone"] = i["createLinearGradient"](0x0, 0x0, 0x0, -0x42), x["addColorStop"](0x0, __p_KGFS_MAIN_STR(0x1876e, 0x1b)), x["addColorStop"](0x1, __p_KGFS_MAIN_STR(0x69c2, 0x18))), i["fillStyle"] = x, i["beginPath"](), i["moveTo"](0x0, 0x0), i["lineTo"](-0x28, -0x42), i["lineTo"](0x28, -0x42), i["closePath"](), i["fill"]();
    let S = this["_radarAsset"](__p_KGFS_MAIN_STR(0x1878c, 0xd));
    S ? i["drawImage"](S, -0xb, -0xc, 0x16, 0x16) : (i["fillStyle"] = "#fff", i["beginPath"](), i["moveTo"](0x0, -7.5), i["lineTo"](5.5, 5.5), i["lineTo"](0x0, 2.4), i["lineTo"](-5.5, 5.5), i["closePath"](), i["fill"]()), i["restore"](), i["restore"](), i["save"](), i["translate"](o, o), i["rotate"](f), i["globalAlpha"] = .5, i["fillStyle"] = "#fff", i["beginPath"](), i["moveTo"](0x0, -o + 0x3), i["lineTo"](0x4, -o + 0xb), i["lineTo"](-0x4, -o + 0xb), i["closePath"](), i["fill"](), i["restore"]()
  } ["_makeAvatar"](e, t) {
    let n = document["createElement"]("canvas");
    n["width"] = n["height"] = 0x20;
    let r = n["getContext"]("2d");
    let i = 0x0;
    for (let t = 0x0; t < e["length"]; t++) {
      i = i * 0x1f + e["charCodeAt"](t) & 0xffff
    }
    let a = [__p_KGFS_MAIN_STR(0x187a0, 0x9), __p_KGFS_MAIN_STR(0x187af, 0x9), __p_KGFS_MAIN_STR(0x187bc, 0x9), __p_KGFS_MAIN_STR(0x187cb, 0x9)][i % 0x4];
    return r["fillStyle"] = t === "CT" ? __p_KGFS_MAIN_STR(0x187da, 0x9) : __p_KGFS_MAIN_STR(0x187e6, 0x9), r["fillRect"](0x0, 0x0, 0x20, 0x20), r["fillStyle"] = a, r["beginPath"](), r["arc"](0x10, 0xf, 8.5, 0x0, 0x7), r["fill"](), r["fillRect"](0x8, 0x18, 0x10, 0x8), r["fillStyle"] = t === "CT" ? __p_KGFS_MAIN_STR(0x187f3, 0x9) : __p_KGFS_MAIN_STR(0x18801, 0x9), r["fillRect"](0x8, 0x18, 0x10, 0x8), i % 0x3 && (r["fillStyle"] = __p_KGFS_MAIN_STR(0x1880c, 0x18), r["beginPath"](), r["arc"](0x10, 18.5, 6.5, .35, Math["PI"] - .35), r["fill"]()), r["fillStyle"] = t === "CT" ? __p_KGFS_MAIN_STR(0x18829, 0x9) : __p_KGFS_MAIN_STR(0x18837, 0x9), r["beginPath"](), r["arc"](0x10, 0xd, 8.7, Math["PI"], 0x0), r["fill"](), r["fillRect"](7.3, 0xc, 17.4, 2.2), r["fillStyle"] = __p_KGFS_MAIN_STR(0x18845, 0x9), r["fillRect"](0xc, 0x10, 2.2, 2.2), r["fillRect"](0x12, 0x10, 2.2, 2.2), n["toDataURL"]()
  } ["_syncUiScale"]() {
    let e = window["__cs2UiScale"] ? window["__cs2UiScale"]() : window["innerHeight"] / 0x438;
    e !== this["_uiScale"] && (this["_uiScale"] = e, document["documentElement"]["style"]["setProperty"](__p_KGFS_MAIN_STR(0x18853, 0x12), e))
  } ["buildAvatars"]() {
    if (this["_syncUiScale"](), this["_sbHTML"] = null, this["_sbSig"] = null, this["game"]["map"] && this["updateScorebar"](), this["avCT"]["innerHTML"] = "", this["avT"]["innerHTML"] = "", this["_avatars"] = [], this["game"]["map"]) {
      for (let e of ["CT", "T"]) {
        let t = e === "CT" ? this["avCT"] : this["avT"];
        let n = document["createElement"]("div");
        n["className"] = __p_KGFS_MAIN_STR(0x18868, 0x1f) + e, t["appendChild"](n);
        let r = [...this["game"]["allEntities"](), ...(this["game"]["onlinePlayers"] || [])]["filter"](t => {
          return t["team"] === e
        });
        e === "CT" && r["reverse"]();
        let i = 0x0;
        for (let t of r) {
          let r = t["isPlayer"] ? this["playerName"]() : t["name"];
          i++;
          let a = document["createElement"]("div");
          a["className"] = "AvatarLargeSnippet";
          let o = __p_KGFS_MAIN_STR(0x1888c, 0x1d) + (t["isPlayer"] ? "White" : e);
          a["title"] = r, a["innerHTML"] = __p_KGFS_MAIN_STR(0x188af, 0x64) + r + __p_KGFS_MAIN_STR(0x18918, 0x43) + o + __p_KGFS_MAIN_STR(0x1895e, 0x4e) + e + __p_KGFS_MAIN_STR(0x189ae, 0x20) + e + __p_KGFS_MAIN_STR(0x189d3, 0x60) + (e === "CT" ? "avatar_ct" : "avatar_t") + __p_KGFS_MAIN_STR(0x18a36, 0x145) + i + __p_KGFS_MAIN_STR(0x18b81, 0xa3) + jv(__p_KGFS_MAIN_STR(0x18c26, 0xe)) + __p_KGFS_MAIN_STR(0x18c37, 0x10e), n["appendChild"](a), this["_avatars"]["push"]({
            ["el"]: a,
            ["ent"]: t,
            ["isBot"]: !t["isPlayer"],
            ["bar"]: a["querySelector"](__p_KGFS_MAIN_STR(0x18d4c, 0x12)),
            ["c4"]: a["querySelector"](__p_KGFS_MAIN_STR(0x18d63, 0x9)),
            ["kit"]: a["querySelector"](__p_KGFS_MAIN_STR(0x18d6d, 0x12)),
            ["skull"]: a["querySelector"](__p_KGFS_MAIN_STR(0x18d83, 0xd)),
            ["bot"]: a["querySelector"](__p_KGFS_MAIN_STR(0x18d94, 0xa)),
            ["hp"]: -0x1,
            ["alive"]: null,
            ["hadC4"]: null,
            ["hadKit"]: null
          })
        }
      }
    }
  } ["updateAvatars"]() {
    if (this["_avatars"]) {
      this["_syncUiScale"]();
      for (let e of this["_avatars"]) {
        let t = !!e["ent"]["alive"];
        t !== e["alive"] && (e["alive"] = t, e["el"]["classList"]["toggle"]("dead", !t), e["skull"]["style"]["display"] = "none");
        let n = !!(this["game"]["player"] && this["game"]["player"]["team"] === "T") && (e["ent"]["hasBomb"] === !0x0 || e["ent"] === (this["game"]["modeCtl"] && this["game"]["modeCtl"]["carrier"]));
        n !== e["hadC4"] && (e["hadC4"] = n, e["c4"]["style"]["display"] = n ? "" : "none");
        let r = !!(this["game"]["player"] && this["game"]["player"]["team"] === "CT" && e["ent"]["team"] === "CT" && (e["ent"]["isPlayer"] ? this["game"]["modeCtl"] && this["game"]["modeCtl"]["playerKit"] : e["ent"]["hasKit"]));
        r !== e["hadKit"] && (e["hadKit"] = r, e["kit"]["style"]["display"] = r ? "" : "none"), e["bot"]["style"]["display"] !== "none" && (e["bot"]["style"]["display"] = "none");
        let i = e["ent"]["team"] === this["game"]["player"]["team"];
        e["enemyHidden"] !== !i && (e["enemyHidden"] = !i, e["bar"]["parentElement"]["style"]["display"] = i ? "" : "none");
        let a = t ? Math["max"](0x0, Math["min"](0x64, Math["round"](e["ent"]["health"]))) : 0x0;
        a !== e["hp"] && (e["hp"] = a, e["bar"]["style"]["width"] = a + "%")
      }
    }
  } ["showTeamSelect"](e, t) {
    this["hideTeamSelect"]();
    let n = document["createElement"]("div");
    n["id"] = "teamsel", n["innerHTML"] = __p_KGFS_MAIN_STR(0x18da2, 0x47) + e["toUpperCase"]() + " \u2014 " + (t === "dm" ? __p_KGFS_MAIN_STR(0x18dec, 0x13) : __p_KGFS_MAIN_STR(0x18e06, 0xe)) + __p_KGFS_MAIN_STR(0x18e17, 0x406);
    // deathmatch: the default card copy talks about bombsites/C4 - swap in
    // team-deathmatch descriptions so the choice makes sense in dm mode
    if (t === "dm") {
      let a = n["querySelector"](".tscard.ct .tdesc");
      let o = n["querySelector"](".tscard.t .tdesc");
      a && (a["textContent"] = "Play the Counter-Terrorist side. Team Deathmatch: score kills for CT, instant respawns, no bomb.");
      o && (o["textContent"] = "Play the Terrorist side. Team Deathmatch: score kills for T, instant respawns, no bomb.");
    }
    n["querySelectorAll"](__p_KGFS_MAIN_STR(0x1921e, 0x9))["forEach"](e => {
      e["onclick"] = () => {
        return this["game"]["finishTeamSelect"](e["dataset"]["team"])
      }
    }), n["querySelector"](__p_KGFS_MAIN_STR(0x19228, 0x9))["onclick"] = () => {
      return this["game"]["toMenu"]()
    }, this["root"]["appendChild"](n), this["root"]["classList"]["add"]("teamselect"), this["game"]["map"] || n["classList"]["add"]("tspreload"), this["_joinPct"] = 0x0, this["teamselEl"] = n
  } ["setTeamSelectReady"]() {
    this["teamselEl"] && this["teamselEl"]["classList"]["remove"]("tspreload")
  } ["setTeamSelectBusy"](e) {
    this["teamselEl"] && this["teamselEl"]["classList"]["toggle"]("tsloading", !!e)
  } ["setJoinProgress"](e, t) {
    let n = this["teamselEl"];
    let r = Math["max"](0x0, Math["min"](0x64, Math["round"](e * 0x64)));
    if (r < (this["_joinPct"] || 0x0)) {
      return
    }
    if (this["_joinPct"] = r, !n) {
      this["_paintPlayLoading"](r, t);
      return
    }
    let i = n["querySelector"](__p_KGFS_MAIN_STR(0x19234, 0xa));
    let a = n["querySelector"](__p_KGFS_MAIN_STR(0x19246, 0xa));
    let o = n["querySelector"](__p_KGFS_MAIN_STR(0x19254, 0x8));
    i && (i["style"]["width"] = r + "%"), o && (o["textContent"] = r + "%"), a && t && (a["textContent"] = t)
  } ["hideTeamSelect"]() {
    this["root"]["classList"]["remove"]("teamselect"), this["teamselEl"] &&= (this["teamselEl"]["remove"](), null)
  } ["setSpectate"](e) {
    if (e !== this["_specName"]) {
      if (this["_specName"] = e, !e) {
        this["spectateEl"]["style"]["display"] = "none";
        return
      }
      this["spectateEl"]["style"]["display"] = "block", this["spectateEl"]["innerHTML"] = __p_KGFS_MAIN_STR(0x1925f, 0x12) + e + __p_KGFS_MAIN_STR(0x19272, 0x1d)
    }
  }
  static get["PCOL"]() {
    return [__p_KGFS_MAIN_STR(0x19294, 0x9), __p_KGFS_MAIN_STR(0x192a1, 0x9), __p_KGFS_MAIN_STR(0x192ae, 0x9), __p_KGFS_MAIN_STR(0x192ba, 0x9), __p_KGFS_MAIN_STR(0x192c7, 0x9)]
  }
  static get["SB_COLS"]() {
    return [{
      ["s"]: "money",
      ["set"]: 0x0,
      ["lab"]: "Money",
      ["v"]: e => {
        return "$" + Math["round"](e["money"] || 0x0)
      }
    }, {
      ["s"]: "kills",
      ["set"]: 0x0,
      ["lab"]: "Kills",
      ["v"]: e => {
        return e["kills"] | 0x0
      }
    }, {
      ["s"]: "deaths",
      ["set"]: 0x0,
      ["lab"]: "Deaths",
      ["v"]: e => {
        return e["deaths"] | 0x0
      }
    }, {
      ["s"]: "assists",
      ["set"]: 0x0,
      ["lab"]: "Assists",
      ["v"]: e => {
        return e["assists"] | 0x0
      }
    }, {
      ["s"]: "hsp",
      ["set"]: 0x0,
      ["lab"]: "HS%",
      ["v"]: e => {
        return e["kills"] ? Math["round"]((e["_hsKills"] || 0x0) / e["kills"] * 0x64) : 0x0
      }
    }, {
      ["s"]: "mvps",
      ["set"]: 0x1,
      ["lab"]: "MVPs",
      ["v"]: e => {
        return e["_mvps"] | 0x0
      }
    }, {
      ["s"]: "utilitydamage",
      ["set"]: 0x1,
      ["lab"]: "UD",
      ["v"]: e => {
        return Math["round"](e["_udDmg"] || 0x0)
      }
    }, {
      ["s"]: "enemiesflashed",
      ["set"]: 0x1,
      ["lab"]: "EF",
      ["v"]: e => {
        return e["_efCount"] | 0x0
      }
    }, {
      ["s"]: "kdr",
      ["set"]: 0x1,
      ["lab"]: "KDR",
      ["v"]: e => {
        return (e["deaths"] ? e["kills"] / e["deaths"] : e["kills"])["toFixed"](0x2)
      }
    }, {
      ["s"]: "adr",
      ["set"]: 0x1,
      ["lab"]: "ADR",
      ["v"]: (e, t) => {
        return Math["round"]((e["_dmgDealt"] || 0x0) / t)
      }
    }, {
      ["s"]: "damage",
      ["lab"]: "DMG",
      ["v"]: e => {
        return Math["round"](e["_dmgDealt"] || 0x0)
      }
    }]
  }
  static get["SB_COLS_DM"]() {
    return e["SB_COLS"]["filter"](e => {
      return ["kills", "deaths", "assists", "kdr", "hsp", "damage"]["includes"](e["s"])
    })
  } ["_sbCols"]() {
    if (!this["game"]["modeCtl"]) {
      return e["SB_COLS_DM"]
    }
    let t = this["sbStatSet"] || 0x0;
    return e["SB_COLS"]["filter"](e => {
      return e["set"] === void 0x0 || e["set"] === t
    })
  } ["_ico"](e, t) {
    let n = new URL(e, document["baseURI"])["href"];
    return __p_KGFS_MAIN_STR(0x192d2, 0x1e) + (t ? " " + t : "") + __p_KGFS_MAIN_STR(0x17db2, 0x19) + n + __p_KGFS_MAIN_STR(0x176a8, 0xb)
  } ["_cell"](e, t, n) {
    return __p_KGFS_MAIN_STR(0x192f4, 0x14) + e + __p_KGFS_MAIN_STR(0x1930b, 0x2d) + e + (n ? " " + n : "") + "\">" + t + __p_KGFS_MAIN_STR(0xdfcb, 0x8)
  } ["_sbLabels"]() {
    let e = this["_sbCols"]()["map"](e => {
      return this["_cell"](e["s"], __p_KGFS_MAIN_STR(0x1933d, 0x18) + e["lab"] + __p_KGFS_MAIN_STR(0xdfcb, 0x8), __p_KGFS_MAIN_STR(0x1935b, 0x18))
    })["join"]("");
    return __p_KGFS_MAIN_STR(0x19378, 0xe9) + this["_cell"]("status", "") + this["_cell"]("ping", this["_ico"](__p_KGFS_MAIN_STR(0x19466, 0x13), __p_KGFS_MAIN_STR(0x1947f, 0x12)), __p_KGFS_MAIN_STR(0x1935b, 0x18)) + this["_cell"]("flair", "") + this["_cell"]("avatar", "") + this["_cell"]("name", "") + e + __p_KGFS_MAIN_STR(0x19496, 0x64)
  } ["_sbRow"](t, n, r, i) {
    let a = t["isPlayer"] ? this["playerName"]() : t["name"];
    let o = e["PCOL"][n % 0x5];
    let s = r === "CT" ? __p_KGFS_MAIN_STR(0x194fd, 0x18) : __p_KGFS_MAIN_STR(0x19518, 0x17);
    let c = [__p_KGFS_MAIN_STR(0x19530, 0x8), __p_KGFS_MAIN_STR(0x1953f, 0xb) + (r === "CT" ? "CT" : "TERRORIST")];
    t["isPlayer"] || c["push"]("bot"), t["alive"] || c["push"](__p_KGFS_MAIN_STR(0x1954c, 0x1a)), t["isPlayer"] && c["push"](__p_KGFS_MAIN_STR(0x1956c, 0x18));
    let l = this["_sbCols"]()["map"](e => {
      return this["_cell"](e["s"], __p_KGFS_MAIN_STR(0x19587, 0x42) + e["v"](t, i) + __p_KGFS_MAIN_STR(0xdfcb, 0x8))
    })["join"]("");
    return __p_KGFS_MAIN_STR(0x17708, 0xf) + c["join"](" ") + __p_KGFS_MAIN_STR(0x195cd, 0x24) + this["_cell"]("status", t["alive"] ? "" : this["_ico"](__p_KGFS_MAIN_STR(0x195f8, 0x17), __p_KGFS_MAIN_STR(0x19616, 0xf))) + this["_cell"]("ping", this["_ico"](__p_KGFS_MAIN_STR(0x1962b, 0x10), __p_KGFS_MAIN_STR(0x1963e, 0x1a)) + (__p_KGFS_MAIN_STR(0x1965c, 0x32) + (t["isPlayer"] ? this["game"]["pingMs"] | 0x0 || 0xf : "") + __p_KGFS_MAIN_STR(0xdfcb, 0x8))) + this["_cell"]("flair", "") + this["_cell"]("avatar", __p_KGFS_MAIN_STR(0x19691, 0x47) + s + __p_KGFS_MAIN_STR(0x196dd, 0x74) + o + __p_KGFS_MAIN_STR(0x19759, 0x12)) + this["_cell"]("name", __p_KGFS_MAIN_STR(0x19773, 0x3a) + a + __p_KGFS_MAIN_STR(0xdfcb, 0x8)) + l + __p_KGFS_MAIN_STR(0xdfcb, 0x8) + this["_cell"]("report", "", __p_KGFS_MAIN_STR(0x197b0, 0x3e)) + __p_KGFS_MAIN_STR(0xdfcb, 0x8)
  } ["_sbTeamBlock"](e, t, n) {
    let r = this["game"];
    let i = e === "CT" ? "CT" : "TERRORIST";
    let a = r["modeCtl"] ? r["modeCtl"]["score"][e] : t["reduce"]((e, t) => {
      return e + t["kills"]
    }, 0x0);
    let o = t["filter"](e => {
      return e["alive"]
    })["length"];
    let s = e === "CT" ? __p_KGFS_MAIN_STR(0xd589, 0x17) : "Terrorists";
    return __p_KGFS_MAIN_STR(0x197f2, 0x23) + i + __p_KGFS_MAIN_STR(0x19819, 0x17) + i + __p_KGFS_MAIN_STR(0x19835, 0x35) + i + __p_KGFS_MAIN_STR(0x19871, 0x28) + i + __p_KGFS_MAIN_STR(0x1989d, 0x18) + t["map"]((t, r) => {
      return this["_sbRow"](t, r, e, n)
    })["join"]("") + __p_KGFS_MAIN_STR(0x198b8, 0x4e) + i + __p_KGFS_MAIN_STR(0x1990b, 0xe) + i + __p_KGFS_MAIN_STR(0x1991b, 0x2d) + this["_ico"](__p_KGFS_MAIN_STR(0x1994d, 0xe) + (e === "CT" ? "ct" : "t") + ".svg", __p_KGFS_MAIN_STR(0x19960, 0x1f)) + (__p_KGFS_MAIN_STR(0x19986, 0x2e) + a + __p_KGFS_MAIN_STR(0x199b5, 0x5f) + s + __p_KGFS_MAIN_STR(0x19a1a, 0x63) + o + "/" + t["length"] + __p_KGFS_MAIN_STR(0x17e17, 0x17))
  } ["_sbTimeline"]() {
    return __p_KGFS_MAIN_STR(0x19a83, 0x57)
  } ["_sbMeta"]() {
    let e = this["game"];
    let t = e["modeCtl"];
    let n = t ? t["modeName"] || __p_KGFS_MAIN_STR(0xd3ba, 0xe) : __p_KGFS_MAIN_STR(0x19ae0, 0x13);
    let r = t ? n === "Competitive" ? "sb_competitive" : "sb_casual" : "sb_deathmatch";
    let i = t ? t["hudState"]()["clock"] : e["roundTimeLeft"];
    let a = Math["max"](0x0, i || 0x0);
    let o = "" + Math["floor"](a / 0x3c) + ":" + Math["floor"](a % 0x3c)["toString"]()["padStart"](0x2, "0");
    return __p_KGFS_MAIN_STR(0x19af6, 0xca) + r + __p_KGFS_MAIN_STR(0x19bc7, 0x70) + n + " | " + e["map"]["name"] + __p_KGFS_MAIN_STR(0x19c39, 0x75) + o + __p_KGFS_MAIN_STR(0x19cb1, 0xbe)
  } ["updateScoreboard"](e) {
    e && (this["forceScoreT"] = 4.5);
    let t = this["scoreOpen"] || (this["forceScoreT"] || 0x0) > 0x0;
    if (this["scoreboardEl"]["classList"]["toggle"]("on", t), this["scoreboardEl"]["style"]["display"] = t ? "" : "none", !t) {
      return
    }
    let n = this["game"];
    let r = n["modeCtl"] ? Math["max"](0x1, n["modeCtl"]["roundNum"]) : 0x1;
    let i = [...n["allEntities"]()];
    let a = e => {
      return i["filter"](t => {
        return t["team"] === e
      })["sort"]((e, t) => {
        return t["kills"] - e["kills"] || e["deaths"] - t["deaths"]
      })
    };
    this["scoreboardEl"]["innerHTML"] = __p_KGFS_MAIN_STR(0x19d72, 0x32) + this["_sbMeta"]() + __p_KGFS_MAIN_STR(0x19da7, 0x24) + this["_sbLabels"]() + this["_sbTeamBlock"]("CT", a("CT"), r) + __p_KGFS_MAIN_STR(0xdfcb, 0x8) + (n["modeCtl"] ? this["_sbTimeline"]() : "") + this["_sbTeamBlock"]("T", a("T"), r) + __p_KGFS_MAIN_STR(0x19dd2, 0xa3)
  } ["setScopeBlur"](e) {
    if (Math["abs"](e - (this["_scBlur"] || 0x0)) < .05) {
      return
    }
    this["_scBlur"] = e;
    let t = e > .05 ? "blur(" + e["toFixed"](0x2) + "px)" : "";
    for (let e of this["scLines"]) {
      e["style"]["filter"] = t
    }
  } ["updateScopeBlur"]() {
    let e = this["game"];
    let t = e["weapons"];
    if (!this["scLines"] || !this["scLines"]["length"] || !t) {
      return
    }
    let n = innerHeight * .5 / Math["tan"](e["baseFov"] * .5 * .0174533);
    let r = (t["crosshairSpread"] ? t["crosshairSpread"]() : 0x0) * n - (t["restingSpread"] ? t["restingSpread"]() : 0x0) * n;
    let i = r > 0x0 ? 4.5 * (0x1 - Math["exp"](-r / 0x19)) : 0x0;
    let a = this["_scBlurT"] || 0x0;
    i = a + (i - a) * .3, this["_scBlurT"] = i, this["setScopeBlur"](i)
  } ["update"](e) {
    this["buyOpen"] && (this["_buyKeys"](), this["refreshBuyMoney"]());
    let t = this["game"];
    if (updateCrosshair(this), this["_buyHintT"] = (this["_buyHintT"] || 0x0) - e, this["_buyHintT"] <= 0x0) {
      this["_buyHintT"] = .2;
      let e = t["modeCtl"];
      let n = !!(e && t["player"]["alive"] && !this["buyOpen"] && e["canBuy"] && e["canBuy"](t["player"]));
      if (this["buyHint"]["style"]["display"] = n ? "flex" : "none", n) {
        let e = this["moneyEl"]["getBoundingClientRect"]();
        if (e["width"]) {
          this["buyHint"]["style"]["left"] = Math["round"](e["right"] + 0xe) + "px";
          let t = getComputedStyle(this["moneyEl"]);
          let n = this["_mCtx"] ||= document["createElement"]("canvas")["getContext"]("2d");
          n["font"] = "" + t["fontWeight"] + " " + t["fontSize"] + " " + t["fontFamily"];
          let r = n["measureText"](this["moneyEl"]["textContent"] || "0");
          let i = e["top"] + e["height"] / 0x2;
          if (r["actualBoundingBoxAscent"] && r["fontBoundingBoxAscent"]) {
            let t = e["height"] / (this["moneyEl"]["offsetHeight"] || e["height"]);
            i = e["top"] + r["fontBoundingBoxAscent"] * t + (r["actualBoundingBoxDescent"] - r["actualBoundingBoxAscent"]) * t / 0x2
          }
          this["buyHint"]["style"]["top"] = Math["round"](i - this["buyHint"]["offsetHeight"] / 0x2) + "px", this["buyHint"]["style"]["bottom"] = "auto"
        }
      }
      let r = this["caseBtn"]["querySelector"](__p_KGFS_MAIN_STR(0x19eaa, 0xa));
      let i = t["input"]["binds"]["cases"];
      r["textContent"] = document["body"]["classList"]["contains"]("touchmode") || !i ? "" : "[" + i["replace"]("Key", "")["replace"]("Digit", "") + "]", this["caseBtn"]["classList"]["toggle"]("afford", H["coins"] >= 0xfa)
    }
    let n = this["_specEnt"]();
    n !== this["_specWas"] && (this["_specWas"] = n, this["_specHudT"] = 0x0, n || (this["updateHealth"](), this["updateWeapon"](), this["updateMoney"]())), this["_specHudT"] = (this["_specHudT"] || 0x0) - e, n && this["_specHudT"] <= 0x0 && (this["_specHudT"] = .15, this["updateHealth"](), this["updateWeapon"](), this["updateMoney"]());
    let r = performance["now"]();
    let i = this["_lastFrameMs"] ? (r - this["_lastFrameMs"]) / 0x3e8 : e;
    if (this["_lastFrameMs"] = r, this["dtEMA"] += (Math["min"](Math["max"](i, 1e-4), 0x1) - this["dtEMA"]) * .05, this["_phud"] === void 0x0 && (this["_phud"] = new URLSearchParams(location["search"])["has"]("perfhud") ? [] : null), this["_phud"] && (this["_phud"]["push"](e), this["_phud"]["length"] > 0x12c && this["_phud"]["shift"]()), this["fpsT"] -= e, this["fpsT"] <= 0x0) {
      this["fpsT"] = .4;
      let e = "";
      if (this["_phud"] && this["_phud"]["length"] > 0x1e) {
        let t = [...this["_phud"]]["sort"]((e, t) => {
          return e - t
        });
        let n = t[t["length"] * .95 | 0x0] * 0x3e8;
        let r = t[t["length"] - 0x1] * 0x3e8;
        let i = this["_phud"]["reduce"]((e, t) => {
          return e + +(t > .021)
        }, 0x0);
        e = __p_KGFS_MAIN_STR(0x19eb7, 0xa) + n["toFixed"](0x1) + __p_KGFS_MAIN_STR(0x19ec5, 0xa) + r["toFixed"](0x0) + __p_KGFS_MAIN_STR(0x19ed1, 0xb) + i
      }
      let n = t["player"];
      let r = n ? " \xB7 " + n["x"]["toFixed"](0x1) + " " + n["y"]["toFixed"](0x1) + " " + n["z"]["toFixed"](0x1) + " \xB7 y" + (n["yaw"] || 0x0)["toFixed"](0x2) : "";
      let i = t["renderer"]["getPixelRatio"]();
      this["fpsEl"]["textContent"] = t["fpsExtra"] ? Math["round"](0x1 / this["dtEMA"]) + __p_KGFS_MAIN_STR(0x19ee2, 0xa) + t["renderer"]["info"]["render"]["calls"] + __p_KGFS_MAIN_STR(0x19ef0, 0x9) + Math["round"](i * 0x64) / 0x64 + "x" + r + e : Math["round"](0x1 / this["dtEMA"]) + " fps" + e
    }
    this["updateScorebar"](), this["hitT"] > 0x0 && (this["hitT"] -= e, this["hitT"] <= 0x0 && (document["getElementById"]("hitmark")["style"]["opacity"] = 0x0)), this["dmgT"] > 0x0 && (this["dmgT"] -= e, this["dmgEl"]["style"]["opacity"] = Math["max"](0x0, this["dmgT"] / .5) * .55);
    let a = this["_specEnt"]();
    let o = (a ? a["blindUntil"] || 0x0 : t["player"]["flashUntil"]) - t["time"];
    if (this["flashEl"]["style"]["opacity"] = o > 0x0 ? Math["min"](0x1, o / 1.3) : 0x0, t["modeCtl"]) {
      let e = t["modeCtl"]["hudState"]();
      this["setProgress"](e["progress"], e["label"]), this["setHint"](t["spectating"] ? null : e["hint"]), this["setFreeze"](e["frozen"] ? e["freezeT"] : null)
    } else {
      this["setProgress"](null), this["setHint"](null), this["setFreeze"](null)
    }
    this["buyOpen"] && t["modeCtl"] && !t["modeCtl"]["canBuy"]() && this["closeBuy"](), this["updateAvatars"](), this["drawRadar"]();
    for (let t of this["dmgArcs"]) {
      t["t"] > 0x0 ? (t["t"] -= e, t["el"]["style"]["opacity"] = Math["min"](0x1, t["t"] * 2.2)) : t["el"]["style"]["opacity"] = 0x0
    }
    if (this["_deathShownAt"] !== void 0x0 && this["deathOv"]["style"]["opacity"] === "1") {
      let e = t["spectating"] && !t["player"]["alive"];
      (t["time"] - this["_deathShownAt"] > 0x5 || e) && this["hideDeath"]()
    }
    let s = this["_specEnt"]() || (t["player"]["alive"] ? t["player"] : null);
    let c = t["_lookTarget"];
    if (c && c["alive"] && s) {
      let e = c["team"] === s["team"];
      let t = V[c["weapon"]];
      this["targetIdEl"]["textContent"] = e ? c["name"] + "  \xB7  " + (t ? t["name"] : "") : c["name"], this["targetIdEl"]["style"]["color"] = e ? c["team"] === "CT" ? __p_KGFS_MAIN_STR(0x185b2, 0xb) : __p_KGFS_MAIN_STR(0x185c3, 0xa) : __p_KGFS_MAIN_STR(0x19ef9, 0x9), this["targetIdEl"]["style"]["opacity"] = 0x1
    } else {
      if (t["_lookDrop"] && s) {
        let e = t["_lookDrop"];
        let n = V[e["id"]];
        e["skin"] ? (this["targetIdEl"]["textContent"] = (e["item"] && e["item"]["st"] ? __p_KGFS_MAIN_STR(0x19f07, 0xf) : "") + e["skin"]["name"], this["targetIdEl"]["style"]["color"] = (as[e["skin"]["rarity"]] || {})["color"] || __p_KGFS_MAIN_STR(0x19f1c, 0x9)) : (this["targetIdEl"]["textContent"] = n ? n["name"] : e["id"], this["targetIdEl"]["style"]["color"] = __p_KGFS_MAIN_STR(0x19f1c, 0x9)), this["targetIdEl"]["style"]["opacity"] = 0x1
      } else {
        this["targetIdEl"]["style"]["opacity"] = 0x0
      }
    }
    let l = 0x0;
    if (t["grenadeMgr"]) {
      let e = t["camera"]["position"]["x"];
      let n = t["camera"]["position"]["y"];
      let r = t["camera"]["position"]["z"];
      for (let i of t["grenadeMgr"]["smokes"]) {
        let t = Math["hypot"](i["x"] - e, (i["y"] - n) * .8, i["z"] - r);
        t < i["r"] + .6 && (l = Math["max"](l, Math["min"](0x1, (i["r"] + .6 - t) / 1.6)))
      }
    }
    this["smokeOv"]["style"]["opacity"] = (l * .98)["toFixed"](0x2), this["setSpectate"](t["spectating"] && !t["player"]["alive"] ? t["spectating"]["name"] + " \xB7 " + (V[t["spectating"]["weapon"]] ? V[t["spectating"]["weapon"]]["name"] : "") : null), this["forceScoreT"] > 0x0 && (this["forceScoreT"] -= e, this["forceScoreT"] <= 0x0 && this["updateScoreboard"](!0x1));
    let u = t["input"]["downA"]("score");
    this["_sbHeldT"] = (this["_sbHeldT"] || 0x0) - e, (u !== this["scoreOpen"] || u && this["_sbHeldT"] <= 0x0) && (this["scoreOpen"] = u, this["_sbHeldT"] = .2, this["updateScoreboard"](!0x1))
  }
};;

export { Nv };
