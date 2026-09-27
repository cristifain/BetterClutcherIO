import { or, Do, Ha, Ia, fo, po } from "./main.js";
import { __p_KGFS_MAIN_STR } from "./decode.js";

// Weapon & ammo system
// weapon stat tables (Mi), spread/recoil generator, accuracy & viewpunch helpers,
// damage tables (ja, Xa), weapon definitions (V), weapons manager class (Fo), damage calc (Po).

var Mi = {
  ["ak47"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x46, 0x46],
    ["mag"]: [0x1e, 0x1e],
    ["magVar"]: [0x0, 0x0],
    ["recoverStand"]: .368,
    ["recoverCrouch"]: .305257,
    ["spread"]: [6e-4, 6e-4],
    ["inaccStand"]: [.00641, .00641],
    ["inaccCrouch"]: [.00481, .00481],
    ["inaccMove"]: [.17506, .17506],
    ["inaccJump"]: [.14076, .14076],
    ["inaccLand"]: [242e-6, 242e-6],
    ["inaccLadder"]: [.14, .14],
    ["inaccFire"]: [.0078, .0078],
    ["inaccReload"]: 0x0,
    ["seed"]: 0xdf,
    ["spreadSeed"]: 0x1234,
    ["recoverStandFinal"]: .506,
    ["recoverCrouchFinal"]: .419728,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .10094,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xd7, 0xd7],
    ["cycleTime"]: .1,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x0
  },
  ["aug"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x3c, 0x3c],
    ["mag"]: [0x18, 0x10],
    ["magVar"]: [0x0, 0x0],
    ["recoverStand"]: .429727,
    ["recoverCrouch"]: .30552,
    ["spread"]: [5e-4, 3e-4],
    ["inaccStand"]: [.0049, .00368],
    ["inaccCrouch"]: [.00368, .00311],
    ["inaccMove"]: [.13545, .10545],
    ["inaccJump"]: [.10599, .10599],
    ["inaccLand"]: [208e-6, 208e-6],
    ["inaccLadder"]: [.11004, .10004],
    ["inaccFire"]: [.00729, .00729],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x5e8c,
    ["spreadSeed"]: 0x2b3c,
    ["recoverStandFinal"]: .429727,
    ["recoverCrouchFinal"]: .30552,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .10156,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xdc, 0x96],
    ["cycleTime"]: .1,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x0
  },
  ["awp"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x14, 0x14],
    ["mag"]: [0x4e, 0x19],
    ["magVar"]: [0xf, 0x2],
    ["recoverStand"]: .34539,
    ["recoverCrouch"]: .24671,
    ["spread"]: [2e-4, 2e-4],
    ["inaccStand"]: [.0808, .002],
    ["inaccCrouch"]: [.0606, .0015],
    ["inaccMove"]: [.17648, .17648],
    ["inaccJump"]: [.13383, .13383],
    ["inaccLand"]: [307e-6, 1e-4],
    ["inaccLadder"]: [.1365, .1365],
    ["inaccFire"]: [.05385, .05385],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x1004,
    ["spreadSeed"]: 0x11d7,
    ["recoverStandFinal"]: .34539,
    ["recoverCrouchFinal"]: .24671,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .17286,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xc8, 0x64],
    ["cycleTime"]: 1.455,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 2.5,
    ["fullAuto"]: !0x1
  },
  ["bizon"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x46, 0x46],
    ["mag"]: [0x12, 0x12],
    ["magVar"]: [0x1, 0x1],
    ["recoverStand"]: .331572,
    ["recoverCrouch"]: .236837,
    ["spread"]: [.001, .001],
    ["inaccStand"]: [.014, .014],
    ["inaccCrouch"]: [.0105, .0105],
    ["inaccMove"]: [.02757, .02757],
    ["inaccJump"]: [.03347, .03347],
    ["inaccLand"]: [8e-5, 8e-5],
    ["inaccLadder"]: [.16965, .16965],
    ["inaccFire"]: [.00288, .00288],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x8e23,
    ["spreadSeed"]: 0x5a17,
    ["recoverStandFinal"]: .331572,
    ["recoverCrouchFinal"]: .236837,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .0459,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: .08,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x0
  },
  ["cz75"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x78, 0xb4],
    ["mag"]: [0x1f, 0x1b],
    ["magVar"]: [0x6, 0xc],
    ["recoverStand"]: .2425,
    ["recoverCrouch"]: .2275,
    ["spread"]: [.003, .003],
    ["inaccStand"]: [.01043, .01043],
    ["inaccCrouch"]: [.0076, .0076],
    ["inaccMove"]: [.01341, .01341],
    ["inaccJump"]: [.09296, .09296],
    ["inaccLand"]: [19e-5, 19e-5],
    ["inaccLadder"]: [.138, .138],
    ["inaccFire"]: [.035, .025],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x263c,
    ["spreadSeed"]: 0x3f0d,
    ["recoverStandFinal"]: .345388,
    ["recoverCrouchFinal"]: .287823,
    ["recoverStartBullet"]: 0x3,
    ["recoverEndBullet"]: 0xa,
    ["inaccJumpInitial"]: .09662,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: .1,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x0
  },
  ["deagle"]: {
    ["angle"]: 0x0,
    ["angleVar"]: [0x3c, 0x3c],
    ["mag"]: [48.200001, 48.200001],
    ["magVar"]: [0x12, 0x12],
    ["recoverStand"]: .8112,
    ["recoverCrouch"]: .449927,
    ["spread"]: [.002, .002],
    ["inaccStand"]: [.0042, .0042],
    ["inaccCrouch"]: [.00218, .00218],
    ["inaccMove"]: [.0481, .0481],
    ["inaccJump"]: [.04055, .37155],
    ["inaccLand"]: [43e-6, 73e-5],
    ["inaccLadder"]: [.152, .152],
    ["inaccFire"]: [.07223, .07223],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x5ae,
    ["spreadSeed"]: 0x8c41,
    ["recoverStandFinal"]: .8112,
    ["recoverCrouchFinal"]: .449927,
    ["recoverStartBullet"]: 0x3,
    ["recoverEndBullet"]: 0xa,
    ["inaccJumpInitial"]: .54882,
    ["inaccJumpApex"]: .33155,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xe6, 0xe6],
    ["cycleTime"]: .225,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 3.9,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x1
  },
  ["dualies"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x14, 0x14],
    ["mag"]: [0x1b, 0x1b],
    ["magVar"]: [0x4, 0x4],
    ["recoverStand"]: .524989,
    ["recoverCrouch"]: .437491,
    ["spread"]: [.002, .002],
    ["inaccStand"]: [.007, .01],
    ["inaccCrouch"]: [.00525, .0075],
    ["inaccMove"]: [.01785, .01785],
    ["inaccJump"]: [.15842, .15842],
    ["inaccLand"]: [255e-6, 255e-6],
    ["inaccLadder"]: [.102, .102],
    ["inaccFire"]: [.01116, .01196],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x5ff3,
    ["spreadSeed"]: 0x7c21,
    ["recoverStandFinal"]: .524989,
    ["recoverCrouchFinal"]: .437491,
    ["recoverStartBullet"]: 0x3,
    ["recoverEndBullet"]: 0xa,
    ["inaccJumpInitial"]: .09586,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: .12,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x1
  },
  ["famas"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x3c, 0x32],
    ["mag"]: [0x14, 0x14],
    ["magVar"]: [0x1, 0x1],
    ["recoverStand"]: .25,
    ["recoverCrouch"]: .12,
    ["spread"]: [6e-4, 6e-4],
    ["inaccStand"]: [.00759, .00369],
    ["inaccCrouch"]: [.0055, .00325],
    ["inaccMove"]: [.09934, .09934],
    ["inaccJump"]: [.11039, .11039],
    ["inaccLand"]: [205e-6, 205e-6],
    ["inaccLadder"]: [.118716, .118716],
    ["inaccFire"]: [.00605, .00335],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x9ac7,
    ["spreadSeed"]: 0x4a9e,
    ["recoverStandFinal"]: .5,
    ["recoverCrouchFinal"]: .48,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .09477,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xdc, 0xdc],
    ["cycleTime"]: .09,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x0
  },
  ["fiveseven"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x5, 0x5],
    ["mag"]: [0x19, 0x19],
    ["magVar"]: [0x4, 0x4],
    ["recoverStand"]: .2,
    ["recoverCrouch"]: .2,
    ["spread"]: [.002, .002],
    ["inaccStand"]: [.0091, .0091],
    ["inaccCrouch"]: [.00683, .00683],
    ["inaccMove"]: [.04, .01341],
    ["inaccJump"]: [.0897, .0897],
    ["inaccLand"]: [19e-5, 19e-5],
    ["inaccLadder"]: [.138, .138],
    ["inaccFire"]: [.025, .03245],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x81dc,
    ["spreadSeed"]: 0x6f35,
    ["recoverStandFinal"]: .5,
    ["recoverCrouchFinal"]: .5,
    ["recoverStartBullet"]: 0x0,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .09988,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: [.15, .3],
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x1
  },
  ["g3sg1"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x1e, 0x1e],
    ["mag"]: [0x1e, 0x1e],
    ["magVar"]: [0x4, 0x4],
    ["recoverStand"]: .544331,
    ["recoverCrouch"]: .388808,
    ["spread"]: [3e-4, 3e-4],
    ["inaccStand"]: [.0258, .002],
    ["inaccCrouch"]: [.01935, .0015],
    ["inaccMove"]: [.15048, .15048],
    ["inaccJump"]: [.15377, .15377],
    ["inaccLand"]: [262e-6, 262e-6],
    ["inaccLadder"]: [.11639, .11639],
    ["inaccFire"]: [.01861, .01861],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x74d4,
    ["spreadSeed"]: 0x22b8,
    ["recoverStandFinal"]: .544331,
    ["recoverCrouchFinal"]: .388808,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .10769,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xd7, 0x78],
    ["cycleTime"]: .25,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 2.5,
    ["fullAuto"]: !0x0
  },
  ["galil"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x46, 0x46],
    ["mag"]: [0x15, 0x15],
    ["magVar"]: [0x1, 0x1],
    ["recoverStand"]: .3,
    ["recoverCrouch"]: .15,
    ["spread"]: [6e-4, 6e-4],
    ["inaccStand"]: [.00877, .00778],
    ["inaccCrouch"]: [.00658, .00484],
    ["inaccMove"]: [.12356, .10652],
    ["inaccJump"]: [.14978, .14978],
    ["inaccLand"]: [256e-6, 256e-6],
    ["inaccLadder"]: [.11358, .11358],
    ["inaccFire"]: [.007, .00585],
    ["inaccReload"]: 0x0,
    ["seed"]: 0xc7f7,
    ["spreadSeed"]: 0x59da,
    ["recoverStandFinal"]: .5,
    ["recoverCrouchFinal"]: .47,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .10539,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xd7, 0xd7],
    ["cycleTime"]: .09,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x0
  },
  ["glock"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x14, 0x14],
    ["mag"]: [0x12, 0x1e],
    ["magVar"]: [0x0, 0x5],
    ["recoverStand"]: .2,
    ["recoverCrouch"]: .2,
    ["spread"]: [.002, .015],
    ["inaccStand"]: [.0056, .0056],
    ["inaccCrouch"]: [.0042, .003],
    ["inaccMove"]: [.01, .01295],
    ["inaccJump"]: [.08787, .08787],
    ["inaccLand"]: [185e-6, 185e-6],
    ["inaccLadder"]: [.137, .11925],
    ["inaccFire"]: [.056, .045],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x1184,
    ["spreadSeed"]: 0x18c3,
    ["recoverStandFinal"]: .33,
    ["recoverCrouchFinal"]: .33,
    ["recoverStartBullet"]: 0x0,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .09662,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: [.15, .3],
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x1
  },
  ["m249"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x32, 0x32],
    ["mag"]: [0x19, 0x19],
    ["magVar"]: [0x2, 0x2],
    ["recoverStand"]: .828931,
    ["recoverCrouch"]: .592093,
    ["spread"]: [.002, .002],
    ["inaccStand"]: [.0077, .0077],
    ["inaccCrouch"]: [.00534, .00534],
    ["inaccMove"]: [.15625, .15625],
    ["inaccJump"]: [.27947, .27947],
    ["inaccLand"]: [398e-6, 398e-6],
    ["inaccLadder"]: [.13281, .13281],
    ["inaccFire"]: [.00356, .00356],
    ["inaccReload"]: 0x0,
    ["seed"]: 0xc486,
    ["spreadSeed"]: 0x6d11,
    ["recoverStandFinal"]: .828931,
    ["recoverCrouchFinal"]: .592093,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .11827,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xc3, 0xc3],
    ["cycleTime"]: .08,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x0
  },
  ["m4a1s"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x41, 0x41],
    ["mag"]: [0x19, 0x15],
    ["magVar"]: [0x3, 0x0],
    ["recoverStand"]: .338941,
    ["recoverCrouch"]: .2421,
    ["spread"]: [6e-4, 5e-4],
    ["inaccStand"]: [.0049, .0049],
    ["inaccCrouch"]: [.0041, .0041],
    ["inaccMove"]: [.09288, .122],
    ["inaccJump"]: [.0997, .0997],
    ["inaccLand"]: [197e-6, 197e-6],
    ["inaccLadder"]: [.110994, .113672],
    ["inaccFire"]: [.012, .007],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x9835,
    ["spreadSeed"]: 0x3a2f,
    ["recoverStandFinal"]: .466044,
    ["recoverCrouchFinal"]: .332888,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .09677,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xe1, 0xe1],
    ["cycleTime"]: .1,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 3.475,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x0
  },
  ["m4a4"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x46, 0x46],
    ["mag"]: [0x17, 0x17],
    ["magVar"]: [0x0, 0x0],
    ["recoverStand"]: .338941,
    ["recoverCrouch"]: .2421,
    ["spread"]: [6e-4, 45e-5],
    ["inaccStand"]: [.0049, .0049],
    ["inaccCrouch"]: [.0041, .00368],
    ["inaccMove"]: [.13788, .122],
    ["inaccJump"]: [.09727, .09727],
    ["inaccLand"]: [192e-6, 197e-6],
    ["inaccLadder"]: [.110994, .113672],
    ["inaccFire"]: [.007, .00634],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x9837,
    ["spreadSeed"]: 0x51c7,
    ["recoverStandFinal"]: .466044,
    ["recoverCrouchFinal"]: .332888,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .09441,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xe1, 0xe1],
    ["cycleTime"]: .09,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x0
  },
  ["mac10"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x46, 0x46],
    ["mag"]: [0x12, 0x12],
    ["magVar"]: [0x1, 0x1],
    ["recoverStand"]: .399729,
    ["recoverCrouch"]: .285521,
    ["spread"]: [6e-4, 6e-4],
    ["inaccStand"]: [.0133, .0133],
    ["inaccCrouch"]: [.00998, .00998],
    ["inaccMove"]: [.01399, .01399],
    ["inaccJump"]: [.0333, .0333],
    ["inaccLand"]: [69e-6, 69e-6],
    ["inaccLadder"]: [.03426, .03426],
    ["inaccFire"]: [.00476, .00476],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x851f,
    ["spreadSeed"]: 0x27e4,
    ["recoverStandFinal"]: .399729,
    ["recoverCrouchFinal"]: .285521,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .03499,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: .075,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x0
  },
  ["mag7"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x14, 0x14],
    ["mag"]: [0xa5, 0xa5],
    ["magVar"]: [0x19, 0x19],
    ["recoverStand"]: .399729,
    ["recoverCrouch"]: .285521,
    ["spread"]: [.04, .04],
    ["inaccStand"]: [.007, .007],
    ["inaccCrouch"]: [.00525, .00525],
    ["inaccMove"]: [.01599, .01599],
    ["inaccJump"]: [.05009, .05009],
    ["inaccLand"]: [103e-6, 103e-6],
    ["inaccLadder"]: [.13426, .13426],
    ["inaccFire"]: [.01119, .01119],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x30e6,
    ["spreadSeed"]: 0x12fa364,
    ["recoverStandFinal"]: .399729,
    ["recoverCrouchFinal"]: .285521,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .05264,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xe1, 0xe1],
    ["cycleTime"]: .85,
    ["bullets"]: 0x8,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x1
  },
  ["mp5sd"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x46, 0x46],
    ["mag"]: [0x10, 0x10],
    ["magVar"]: [0x1, 0x1],
    ["recoverStand"]: .437491,
    ["recoverCrouch"]: .312494,
    ["spread"]: [6e-4, 6e-4],
    ["inaccStand"]: [.01, .01],
    ["inaccCrouch"]: [.0085, .0085],
    ["inaccMove"]: [.03, .01986],
    ["inaccJump"]: [.0596, .0596],
    ["inaccLand"]: [115e-6, 115e-6],
    ["inaccLadder"]: [.05756, .05756],
    ["inaccFire"]: [.00218, .00218],
    ["inaccReload"]: 0x0,
    ["seed"]: 0xf0d1,
    ["spreadSeed"]: 0x44b1,
    ["recoverStandFinal"]: .437491,
    ["recoverCrouchFinal"]: .312494,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .05541,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xeb, 0xdc],
    ["cycleTime"]: .08,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x0
  },
  ["mp7"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x46, 0x46],
    ["mag"]: [0x10, 0x10],
    ["magVar"]: [0x1, 0x1],
    ["recoverStand"]: .437491,
    ["recoverCrouch"]: .312494,
    ["spread"]: [6e-4, 6e-4],
    ["inaccStand"]: [.01, .01],
    ["inaccCrouch"]: [.0085, .0085],
    ["inaccMove"]: [.01986, .01986],
    ["inaccJump"]: [.0596, .0596],
    ["inaccLand"]: [115e-6, 115e-6],
    ["inaccLadder"]: [.05756, .05756],
    ["inaccFire"]: [.00218, .00218],
    ["inaccReload"]: 0x0,
    ["seed"]: 0xf0d3,
    ["spreadSeed"]: 0x695c,
    ["recoverStandFinal"]: .437491,
    ["recoverCrouchFinal"]: .312494,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .05541,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xdc, 0xdc],
    ["cycleTime"]: .08,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x0
  },
  ["mp9"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x46, 0x46],
    ["mag"]: [0x15, 0x15],
    ["magVar"]: [0x1, 0x1],
    ["recoverStand"]: .25789,
    ["recoverCrouch"]: .184207,
    ["spread"]: [6e-4, 6e-4],
    ["inaccStand"]: [.009, .009],
    ["inaccCrouch"]: [.008, .008],
    ["inaccMove"]: [.02904, .02904],
    ["inaccJump"]: [.05, .05],
    ["inaccLand"]: [56e-6, 56e-6],
    ["inaccLadder"]: [.148913, .148913],
    ["inaccFire"]: [.0037, .0037],
    ["inaccReload"]: 0x0,
    ["seed"]: 0xc629,
    ["spreadSeed"]: 0x1f8a,
    ["recoverStandFinal"]: .25789,
    ["recoverCrouchFinal"]: .184207,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .03728,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: .07,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x0
  },
  ["negev"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x0, 0x0],
    ["mag"]: [0x14, 0x14],
    ["magVar"]: [0x2, 0x2],
    ["recoverStand"]: .3,
    ["recoverCrouch"]: .25,
    ["spread"]: [.002, .002],
    ["inaccStand"]: [.01017, .01017],
    ["inaccCrouch"]: [.00763, .00763],
    ["inaccMove"]: [.15914, .15914],
    ["inaccJump"]: [.29223, .29223],
    ["inaccLand"]: [409e-6, 409e-6],
    ["inaccLadder"]: [.13643, .13643],
    ["inaccFire"]: [.03, .00337],
    ["inaccReload"]: 0x0,
    ["seed"]: 0xe26e,
    ["spreadSeed"]: 0x7e02,
    ["recoverStandFinal"]: .1,
    ["recoverCrouchFinal"]: .08,
    ["recoverStartBullet"]: 0x9,
    ["recoverEndBullet"]: 0xc,
    ["inaccJumpInitial"]: .11629,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: .02,
    ["inaccPitchShift"]: -0x32,
    ["maxSpeed"]: [0x96, 0x96],
    ["cycleTime"]: .075,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: .5,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x0
  },
  ["nova"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x14, 0x14],
    ["mag"]: [0x8f, 0x8f],
    ["magVar"]: [0x16, 0x16],
    ["recoverStand"]: .460517,
    ["recoverCrouch"]: .328941,
    ["spread"]: [.04, .04],
    ["inaccStand"]: [.007, .007],
    ["inaccCrouch"]: [.00525, .00525],
    ["inaccMove"]: [.03675, .03675],
    ["inaccJump"]: [.12631, .12631],
    ["inaccLand"]: [236e-6, 236e-6],
    ["inaccLadder"]: [.07875, .07875],
    ["inaccFire"]: [.00972, .00972],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x1e53,
    ["spreadSeed"]: 0x446a,
    ["recoverStandFinal"]: .460517,
    ["recoverCrouchFinal"]: .328941,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .1097,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xdc, 0xdc],
    ["cycleTime"]: .88,
    ["bullets"]: 0x9,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x1
  },
  ["p2000"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x0, 0x0],
    ["mag"]: [0x1a, 0x1a],
    ["magVar"]: [0x0, 0x0],
    ["recoverStand"]: .349532,
    ["recoverCrouch"]: .291277,
    ["spread"]: [.002, .0015],
    ["inaccStand"]: [.0049, .0049],
    ["inaccCrouch"]: [.00368, .00368],
    ["inaccMove"]: [.013, .01387],
    ["inaccJump"]: [.09448, .09448],
    ["inaccLand"]: [191e-6, 198e-6],
    ["inaccLadder"]: [.13832, .1199],
    ["inaccFire"]: [.05, .01315],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x1532,
    ["spreadSeed"]: 0x35f6,
    ["recoverStandFinal"]: .349532,
    ["recoverCrouchFinal"]: .291277,
    ["recoverStartBullet"]: 0x3,
    ["recoverEndBullet"]: 0xa,
    ["inaccJumpInitial"]: .0966,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: .17,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x1
  },
  ["p250"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0xa, 0xa],
    ["mag"]: [0x1a, 0x1a],
    ["magVar"]: [0x3, 0x3],
    ["recoverStand"]: .345388,
    ["recoverCrouch"]: .287823,
    ["spread"]: [.002, .002],
    ["inaccStand"]: [.0091, .0091],
    ["inaccCrouch"]: [.00683, .00683],
    ["inaccMove"]: [.02, .01341],
    ["inaccJump"]: [.09296, .09296],
    ["inaccLand"]: [19e-5, 19e-5],
    ["inaccLadder"]: [.138, .138],
    ["inaccFire"]: [.05245, .05245],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x2641,
    ["spreadSeed"]: 0x2c19,
    ["recoverStandFinal"]: .345388,
    ["recoverCrouchFinal"]: .287823,
    ["recoverStartBullet"]: 0x3,
    ["recoverEndBullet"]: 0xa,
    ["inaccJumpInitial"]: .09662,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: [.15, .3],
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x1
  },
  ["p90"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x46, 0x46],
    ["mag"]: [0x10, 0x10],
    ["magVar"]: [0x1, 0x1],
    ["recoverStand"]: .372098,
    ["recoverCrouch"]: .265784,
    ["spread"]: [.001, .001],
    ["inaccStand"]: [.01365, .01365],
    ["inaccCrouch"]: [.01024, .01024],
    ["inaccMove"]: [.031, .031],
    ["inaccJump"]: [.09008, .09008],
    ["inaccLand"]: [82e-6, 82e-6],
    ["inaccLadder"]: [.13217, .13217],
    ["inaccFire"]: [.00285, .00285],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x1845,
    ["spreadSeed"]: 0x48d3,
    ["recoverStandFinal"]: .372098,
    ["recoverCrouchFinal"]: .265784,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .1046,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xe6, 0xe6],
    ["cycleTime"]: .07,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x0
  },
  ["r8"]: {
    ["angle"]: [0x0, 0x3],
    ["angleVar"]: [0x28, 0x32],
    ["mag"]: [0x14, 0x2d],
    ["magVar"]: [0x0, 0x6],
    ["recoverStand"]: .9,
    ["recoverCrouch"]: .7,
    ["spread"]: [52e-5, .068],
    ["inaccStand"]: [.002, .012],
    ["inaccCrouch"]: [.001, .005],
    ["inaccMove"]: [.0065, .036],
    ["inaccJump"]: [.05323, .05323],
    ["inaccLand"]: [13e-5, 15e-5],
    ["inaccLadder"]: [.012, .035],
    ["inaccFire"]: [.05, .055],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x3039,
    ["spreadSeed"]: 0x10e5,
    ["recoverStandFinal"]: .8112,
    ["recoverCrouchFinal"]: .449927,
    ["recoverStartBullet"]: 0x3,
    ["recoverEndBullet"]: 0xa,
    ["inaccJumpInitial"]: .01865,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xb4, 0xdc],
    ["cycleTime"]: [.5, .4],
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x0
  },
  ["sawedoff"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x14, 0x14],
    ["mag"]: [0x8f, 0x8f],
    ["magVar"]: [0x16, 0x16],
    ["recoverStand"]: .460517,
    ["recoverCrouch"]: .328941,
    ["spread"]: [.062, .062],
    ["inaccStand"]: [.007, .007],
    ["inaccCrouch"]: [.00525, .00525],
    ["inaccMove"]: [.0168, .0168],
    ["inaccJump"]: [.0577, .0577],
    ["inaccLand"]: [108e-6, 108e-6],
    ["inaccLadder"]: [.036, .036],
    ["inaccFire"]: [.00972, .00972],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x441,
    ["spreadSeed"]: 0x5f2a,
    ["recoverStandFinal"]: .460517,
    ["recoverCrouchFinal"]: .328941,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .05012,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xd2, 0xd2],
    ["cycleTime"]: .85,
    ["bullets"]: 0x8,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x1
  },
  ["scar20"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x1e, 0x1e],
    ["mag"]: [0x1f, 0x1f],
    ["magVar"]: [0x4, 0x4],
    ["recoverStand"]: .544331,
    ["recoverCrouch"]: .388808,
    ["spread"]: [3e-4, 3e-4],
    ["inaccStand"]: [.0258, .002],
    ["inaccCrouch"]: [.01935, .0015],
    ["inaccMove"]: [.15048, .15048],
    ["inaccJump"]: [.15377, .15377],
    ["inaccLand"]: [262e-6, 262e-6],
    ["inaccLadder"]: [.11639, .11639],
    ["inaccFire"]: [.01861, .01861],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x4ba4,
    ["spreadSeed"]: 0x63b8,
    ["recoverStandFinal"]: .544331,
    ["recoverCrouchFinal"]: .388808,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .10769,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xd7, 0x78],
    ["cycleTime"]: .25,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 2.5,
    ["fullAuto"]: !0x0
  },
  ["sg553"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x3c, 0x3c],
    ["mag"]: [0x1c, 0x13],
    ["magVar"]: [0x2, 0x2],
    ["recoverStand"]: .452886,
    ["recoverCrouch"]: .379204,
    ["spread"]: [6e-4, 3e-4],
    ["inaccStand"]: [.00581, .00381],
    ["inaccCrouch"]: [.00381, .00305],
    ["inaccMove"]: [.13601, .13601],
    ["inaccJump"]: [.109, .109],
    ["inaccLand"]: [188e-6, 188e-6],
    ["inaccLadder"]: [.08366, .138758],
    ["inaccFire"]: [.00795, .0092],
    ["inaccReload"]: 0x0,
    ["seed"]: 0xa9ec,
    ["spreadSeed"]: 0x71e9,
    ["recoverStandFinal"]: .452886,
    ["recoverCrouchFinal"]: .379204,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .07879,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xd2, 0x96],
    ["cycleTime"]: .11,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x2,
    ["fullAuto"]: !0x0
  },
  ["ssg08"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x14, 0x14],
    ["mag"]: [0x21, 0x19],
    ["magVar"]: [0xf, 0x2],
    ["recoverStand"]: .142096,
    ["recoverCrouch"]: .055783,
    ["spread"]: [28e-5, 23e-5],
    ["inaccStand"]: [.0317, .003],
    ["inaccCrouch"]: [.02378, .0028],
    ["inaccMove"]: [.12345, .12345],
    ["inaccJump"]: [.00572, .00572],
    ["inaccLand"]: [215e-6, 215e-6],
    ["inaccLadder"]: [.09549, .09549],
    ["inaccFire"]: [.02292, .02292],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x4fe,
    ["spreadSeed"]: 0x1470,
    ["recoverStandFinal"]: .142096,
    ["recoverCrouchFinal"]: .055783,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .20872,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xe6, 0xe6],
    ["cycleTime"]: 1.25,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 2.5,
    ["fullAuto"]: !0x1
  },
  ["tec9"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x3c, 0x3c],
    ["mag"]: [0x17, 0x17],
    ["magVar"]: [0x3, 0x3],
    ["recoverStand"]: .391,
    ["recoverCrouch"]: .315,
    ["spread"]: [.002, .0018],
    ["inaccStand"]: [.0049, .00903],
    ["inaccCrouch"]: [.00368, .00727],
    ["inaccMove"]: [.00381, .00381],
    ["inaccJump"]: [.07978, .07978],
    ["inaccLand"]: [211e-6, 211e-6],
    ["inaccLadder"]: [.1206, .1206],
    ["inaccFire"]: [.045, .03688],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x315,
    ["spreadSeed"]: 0x6215,
    ["recoverStandFinal"]: .391,
    ["recoverCrouchFinal"]: .315,
    ["recoverStartBullet"]: 0x3,
    ["recoverEndBullet"]: 0xa,
    ["inaccJumpInitial"]: .07117,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: .12,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x1
  },
  ["ump45"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x28, 0x28],
    ["mag"]: [0x17, 0x17],
    ["magVar"]: [0x1, 0x1],
    ["recoverStand"]: .349993,
    ["recoverCrouch"]: .249995,
    ["spread"]: [.001, .001],
    ["inaccStand"]: [.01343, .01343],
    ["inaccCrouch"]: [.01007, .01007],
    ["inaccMove"]: [.02876, .02876],
    ["inaccJump"]: [.03725, .03725],
    ["inaccLand"]: [85e-6, 85e-6],
    ["inaccLadder"]: [.04235, .04235],
    ["inaccFire"]: [.00342, .00342],
    ["inaccReload"]: 0x0,
    ["seed"]: 0xe7a3,
    ["spreadSeed"]: 0x7a4c,
    ["recoverStandFinal"]: .349993,
    ["recoverCrouchFinal"]: .249995,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .04721,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xe6, 0xe6],
    ["cycleTime"]: .09,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x0
  },
  ["usps"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x0, 0x0],
    ["mag"]: [0x1d, 0x17],
    ["magVar"]: [0x0, 0x0],
    ["recoverStand"]: .349532,
    ["recoverCrouch"]: .291277,
    ["spread"]: [.0025, .0015],
    ["inaccStand"]: [.0049, .0049],
    ["inaccCrouch"]: [.00368, .00368],
    ["inaccMove"]: [.01387, .01387],
    ["inaccJump"]: [.09448, .09448],
    ["inaccLand"]: [191e-6, 198e-6],
    ["inaccLadder"]: [.13832, .1199],
    ["inaccFire"]: [.071, .052],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x1539,
    ["spreadSeed"]: 0x39ad,
    ["recoverStandFinal"]: .349532,
    ["recoverCrouchFinal"]: .291277,
    ["recoverStartBullet"]: 0x3,
    ["recoverEndBullet"]: 0xa,
    ["inaccJumpInitial"]: .0966,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xf0, 0xf0],
    ["cycleTime"]: .17,
    ["bullets"]: 0x1,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x1
  },
  ["xm1014"]: {
    ["angle"]: [0x0, 0x0],
    ["angleVar"]: [0x14, 0x14],
    ["mag"]: [0x50, 0x50],
    ["magVar"]: [0x14, 0x14],
    ["recoverStand"]: .506569,
    ["recoverCrouch"]: .361835,
    ["spread"]: [.038, .038],
    ["inaccStand"]: [.007, .007],
    ["inaccCrouch"]: [.00525, .00525],
    ["inaccMove"]: [.03603, .03603],
    ["inaccJump"]: [.13083, .13083],
    ["inaccLand"]: [232e-6, 232e-6],
    ["inaccLadder"]: [.07721, .07721],
    ["inaccFire"]: [.00883, .00883],
    ["inaccReload"]: 0x0,
    ["seed"]: 0x611e,
    ["spreadSeed"]: 0x5731,
    ["recoverStandFinal"]: .506569,
    ["recoverCrouchFinal"]: .361835,
    ["recoverStartBullet"]: 0x2,
    ["recoverEndBullet"]: 0x5,
    ["inaccJumpInitial"]: .10038,
    ["inaccJumpApex"]: 0x0,
    ["inaccAltSound"]: 0x0,
    ["inaccPitchShift"]: 0x0,
    ["maxSpeed"]: [0xd7, 0xd7],
    ["cycleTime"]: .35,
    ["bullets"]: 0x6,
    ["attackMoveFactor"]: 0x1,
    ["hsMult"]: 0x4,
    ["penetration"]: 0x1,
    ["fullAuto"]: !0x0
  }
};
var Fi = {
  ["head"]: 0x4,
  ["neck"]: 0x1,
  ["chest"]: 0x1,
  ["stomach"]: 1.25,
  ["arm"]: 0x1,
  ["leg"]: .75
};
Object["fromEntries"](Object["keys"](Mi)["map"](e => {
  return [e, Mi[e]["hsMult"]]
}));
var Li = 0x20;
var Ri = 0x41a7;
var zi = 0x7fffffff;
var Bi = 0x1f31d;
var Vi = 0xb14;
var Hi = 0x4000000;
var Ui = 0x1 / zi;
var Wi = .99999988;
var Gi = class {
  constructor(e = 0x0) {
    this["iv"] = new Int32Array(Li), this["idum"] = 0x0, this["iy"] = 0x0, this["setSeed"](e)
  } ["setSeed"](e) {
    this["idum"] = e < 0x0 ? e : -e, this["iy"] = 0x0
  } ["next"]() {
    let e;
    let t;
    if (this["idum"] <= 0x0 || !this["iy"]) {
      for (this["idum"] = -this["idum"] < 0x1 ? 0x1 : -this["idum"], e = 0x27; e >= 0x0; e--) {
        t = this["idum"] / Bi | 0x0, this["idum"] = Ri * (this["idum"] - t * Bi) - Vi * t, this["idum"] < 0x0 && (this["idum"] += zi), e < Li && (this["iv"][e] = this["idum"])
      }
      this["iy"] = this["iv"][0x0]
    }
    return t = this["idum"] / Bi | 0x0, this["idum"] = Ri * (this["idum"] - t * Bi) - Vi * t, this["idum"] < 0x0 && (this["idum"] += zi), e = this["iy"] / Hi | 0x0, this["iy"] = this["iv"][e], this["iv"][e] = this["idum"], this["iy"]
  } ["randomFloat"](e = 0x0, t = 0x1) {
    let n = Math["fround"](Ui * this["next"]());
    return n > Wi && (n = Wi), n * (t - e) + e
  } ["randomInt"](e, t) {
    let n = t - e + 0x1;
    if (n <= 0x1 || zi < n - 0x1) {
      return e
    }
    let r = zi - (zi % n + 0x1) % n;
    let i;
    do i = this["next"](); while (i > r);
    return e + i % n
  }
};
var z = {
  ["MOVE"]: .24,
  ["MOVE_PISTOL"]: 2.2,
  ["JUMP"]: .45,
  ["FIRE"]: .7,
  ["FIRE_PISTOL"]: .35,
  ["FIRST_SHOT_FREE"]: !0x0,
  ["HORIZ"]: .3,
  ["VERT"]: .85,
  ["VERT_SPRAY"]: .6,
  ["VERT_SPRAY_SHOTS"]: 0x5,
  ["VIEWPUNCH"]: .6,
  ["PER_WEAPON"]: {
    ["ak47"]: {
      ["acc"]: .85
    },
    ["ssg08"]: {
      ["stand"]: 2.546
    }
  },
  ["HIT_SHAKE"]: .45,
  ["STAND"]: 0x1
};
z["MOVE"] === 0x1 && z["JUMP"] === 0x1 && z["FIRE"] === 0x1 && z["HORIZ"] === 0x1 && z["VERT"] === 0x1 && z["STAND"] === 0x1 && z["VERT_SPRAY"];
var Ki = Math["fround"];
var qi = 0x40;
var Ji = 0x4;
var Yi = .75;
var Xi = .55;
var Zi = .055;
var Qi = 0x12;
var $i = 0x2;
var ea = 1.1;
var ta = (e, t, n) => {
  return t + (n - t) * e
};
var na = (e, t) => {
  return Array["isArray"](e) ? e["length"] > 0x1 ? e[t] : e[0x0] : e
};

function ra(e) {
  let t = [
    [],
    []
  ];
  for (let n = 0x0; n < 0x2; n++) {
    let r = new Gi(e["seed"]);
    let i = 0x0;
    let a = 0x0;
    for (let o = 0x0; o < qi; o++) {
      let s = Ki(na(e["angle"], n) + r["randomFloat"](-na(e["angleVar"], n), na(e["angleVar"], n)));
      let c = Ki(na(e["mag"], n) + r["randomFloat"](-na(e["magVar"], n), na(e["magVar"], n)));
      e["fullAuto"] && o > 0x0 ? (i = Ki(ta(Xi, i, s)), a = Ki(ta(Xi, a, c))) : (i = s, a = c), e["fullAuto"] && o < Ji && (a = Ki(a * ta(Ki(o / Ji), Yi, 0x1))), t[n]["push"]({
        ["angle"]: i,
        ["magnitude"]: a
      })
    }
  }
  return t
}
var ia = new Map;

function aa(e) {
  let t = ia["get"](e);
  if (!t) {
    let n = Mi[e];
    if (!n) {
      return null
    }
    t = ra(n), ia["set"](e, t)
  }
  return t
}

function oa(e, t, n) {
  let r = aa(e);
  return r ? (r[t] ? r[t] : r[0x0])[((n | 0x0) % qi + qi) % qi] : null
}

function sa() {
  return {
    ["aimPitch"]: 0x0,
    ["aimYaw"]: 0x0,
    ["velPitch"]: 0x0,
    ["velYaw"]: 0x0,
    ["viewPitch"]: 0x0,
    ["viewYaw"]: 0x0,
    ["index"]: 0x0,
    ["lastShot"]: -0x3b9aca00,
    ["vpPitch"]: 0x0,
    ["vpYaw"]: 0x0,
    ["vpVelPitch"]: 0x0,
    ["vpVelYaw"]: 0x0
  }
}

// CS2-style viewpunch spring (critically damped) + gaussian spread tuning
var VP_OMEGA = 24;
var VP_SIGMA = .35;

function ca(e, t, n) {
  let r = t * Math["PI"] / 0xb4;
  let i = Math["sin"](r);
  let a = Math["cos"](r);
  e["velYaw"] += -i * n * z["HORIZ"];
  let o = e["index"] || 0x0;
  let s = o >= z["VERT_SPRAY_SHOTS"] ? 0x1 : o / z["VERT_SPRAY_SHOTS"];
  e["velPitch"] += -a * n * z["VERT"] * (0x1 + (z["VERT_SPRAY"] - 0x1) * s);
  let c = n * Zi * z["VIEWPUNCH"];
  e["viewYaw"] -= i * c, e["viewPitch"] -= a * c
}

function la(e, t) {
  let n = Math["exp"](-0x8 * t);
  e["aimPitch"] *= n, e["aimYaw"] *= n;
  let r = Qi * t;
  let i = Math["hypot"](e["aimPitch"], e["aimYaw"]);
  if (i > r) {
    let t = 0x1 - r / i;
    e["aimPitch"] *= t, e["aimYaw"] *= t
  } else {
    e["aimPitch"] = 0x0, e["aimYaw"] = 0x0
  }
}

function ua(e, t) {
  la(e, t), e["aimPitch"] += e["velPitch"] * t * .5, e["aimYaw"] += e["velYaw"] * t * .5;
  let n = Math["exp"](-4.5 * t);
  e["velPitch"] *= n, e["velYaw"] *= n, e["aimPitch"] += e["velPitch"] * t * .5, e["aimYaw"] += e["velYaw"] * t * .5;
  let r = Math["exp"](-12.8 * t);
  e["viewPitch"] *= r, e["viewYaw"] *= r, Math["abs"](e["viewPitch"]) < 1e-4 && (e["viewPitch"] = 0x0), Math["abs"](e["viewYaw"]) < 1e-4 && (e["viewYaw"] = 0x0)
}

function da(e, t, n, r) {
  n > e["lastShot"] + t * ea && (e["index"] = ta(Math["exp"](r * -(Math["LN10"] * $i)), 0x0, e["index"]), e["index"] < .001 && (e["index"] = 0x0))
}

function fa(e) {
  return {
    ["pitch"]: e["aimPitch"] * 0x2,
    ["yaw"]: e["aimYaw"] * 0x2
  }
}
var pa = 0x1;
var ma = .34;
var ha = .25;
var ga = 301.993377;
var _a = 0x2;
var va = (e, t, n) => {
  return e < t ? t : e > n ? n : e
};
var ya = (e, t, n) => {
  return t + (n - t) * e
};

function ba(e, t, n, r, i) {
  return t === n ? e >= n ? i : r : r + (i - r) * va((e - t) / (n - t), 0x0, 0x1)
}

function xa(e, t, n, r, i) {
  return t === n ? e >= n ? i : r : r + (i - r) * (e - t) / (n - t)
}
var Sa = (e, t) => {
  return Array["isArray"](e) ? t && e["length"] > 0x1 ? e[0x1] : e[0x0] : e
};

function Ca() {
  return {
    ["penalty"]: 0x0,
    ["lastShot"]: -0x3b9aca00
  }
}

function wa(e, t, n) {
  if (t["onLadder"]) {
    return e["recoverStand"]
  }
  if (!t["onGround"]) {
    return e["recoverCrouch"] * 0x4
  }
  let r = n | 0x0;
  return t["ducking"] ? ba(r, e["recoverStartBullet"], e["recoverEndBullet"], e["recoverCrouch"], e["recoverCrouchFinal"]) : ba(r, e["recoverStartBullet"], e["recoverEndBullet"], e["recoverStand"], e["recoverStandFinal"])
}

function Ta(e, t, n, r, i) {
  let a = +!!n["zoomed"];
  let o = 0x0;
  if (n["onLadder"] ? o += Sa(t["inaccLadder"], a) + Sa(t["inaccLadder"], 0x0) : n["onGround"] ? n["ducking"] ? o += Sa(t["inaccCrouch"], a) * z["STAND"] * (t["standScale"] || 0x1) : o += Sa(t["inaccStand"], a) * z["STAND"] * (t["standScale"] || 0x1) : (o += Sa(t["inaccStand"], a) * z["STAND"], o += Sa(t["inaccJump"], a) * pa * z["JUMP"]), n["reloading"] && (o += t["inaccReload"] || 0x0), o > e["penalty"]) {
    e["penalty"] = o
  } else {
    let a = Math["LN10"] / Math["max"](1e-4, wa(t, n, i));
    e["penalty"] = ya(Math["exp"](r * -a), o, e["penalty"])
  }
  return e["penalty"]
}

function Ea(e, t, n) {
  let r = +!!n["zoomed"];
  let i = Sa(t["maxSpeed"], r) || Sa(t["maxSpeed"], 0x0) || 0xd7;
  let a = (n["speed"] || 0x0) / or;
  let o = e["penalty"];
  let s = ba(a, i * ma, i * .95, 0x0, 0x1);
  if (s > 0x0) {
    n["walking"] || (s **= +ha);
    let e = z["MOVE"] * (t["cls"] === "pistol" ? z["MOVE_PISTOL"] : 0x1);
    o += s * Sa(t["inaccMove"], r) * e
  }
  if (!n["onGround"]) {
    let e = Math["abs"]((n["velY"] || 0x0) / or);
    let r = (t["inaccJumpInitial"] || 0x0) * pa * z["JUMP"];
    let i = (t["inaccJumpApex"] || 0x0) * pa * z["JUMP"];
    let a = Math["sqrt"](ga);
    let s = xa(Math["sqrt"](e), a * .25, a, 0x0, r);
    s < i && (s = i), s < 0x0 ? s = 0x0 : s > _a * r && (s = _a * r), o += s
  }
  return t["accScale"] !== void 0x0 && t["accScale"] !== 0x1 && (o *= t["accScale"]), o > 0x1 ? 0x1 : o
}

function Da(e, t, n, r) {
  if (z["FIRST_SHOT_FREE"] && !(n["recoilIndex"] | 0x0)) {
    e["lastShot"] = r;
    return
  }
  let i = t["cls"] === "pistol" ? z["FIRE_PISTOL"] : 0x1;
  e["penalty"] += Sa(t["inaccFire"], +!!n["zoomed"]) * z["FIRE"] * i, e["lastShot"] = r
}
var Oa = Math["fround"](0x2 * Math["PI"]);

function ka(e, t, n, r, i = {}) {
  t > 0x1 && (t = 0x1);
  let a = new Gi((e | 0x0) + 0x1);
  let o = a["randomFloat"]();
  if (i["r8Secondary"] && (o = 0x1 - o * o), i["negev"] && i["recoilIndex"] < 0x3) {
    for (let e = 0x3; e > i["recoilIndex"]; --e) {
      o *= o
    }
    o = 0x1 - o
  }
  let s = a["randomFloat"](0x0, Oa);
  o = Math["min"](0x1, Math["sqrt"](-0x2 * Math["log"](0x1 - o * .999999)) * VP_SIGMA);
  let c = o * t;
  let l = c * Math["cos"](s);
  let u = c * Math["sin"](s);
  let d = [];
  for (let e = 0x0; e < r; e++) {
    let e = a["randomFloat"]();
    if (i["r8Secondary"] && (e = 0x1 - e * e), i["negev"] && i["recoilIndex"] < 0x3) {
      for (let t = 0x3; t > i["recoilIndex"]; --t) {
        e *= e
      }
      e = 0x1 - e
    }
    let t = a["randomFloat"](0x0, Oa);
    e = Math["min"](0x1, Math["sqrt"](-0x2 * Math["log"](0x1 - e * .999999)) * VP_SIGMA);
    let r = e * n;
    d["push"]({
      ["x"]: l + r * Math["cos"](t),
      ["y"]: u + r * Math["sin"](t)
    })
  }
  return d
}
var Aa = 12.7;
var ja = {
  ["ak47"]: {
    ["dmg"]: 0x24,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .98,
    ["armorPen"]: .775,
    ["hs"]: 0x4,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0xa8c,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.461
  },
  ["aug"]: {
    ["dmg"]: 0x1c,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .98,
    ["armorPen"]: .9,
    ["hs"]: 0x4,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0xce4,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.588,
    ["zoomSpeed"]: 3.81
  },
  ["awp"]: {
    ["dmg"]: 0x73,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .99,
    ["armorPen"]: .975,
    ["hs"]: 0x4,
    ["pen"]: 2.5,
    ["bullets"]: 0x1,
    ["price"]: 0x128e,
    ["reward"]: 0x64,
    ["runSpeed"]: 5.08,
    ["zoomSpeed"]: 2.54
  },
  ["bizon"]: {
    ["dmg"]: 0x1b,
    ["rangeM"]: 91.44,
    ["rangeMod"]: .8,
    ["armorPen"]: .63,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x514,
    ["reward"]: 0x258,
    ["runSpeed"]: 6.096
  },
  ["cz75"]: {
    ["dmg"]: 0x1f,
    ["rangeM"]: 104.0384,
    ["rangeMod"]: .85,
    ["armorPen"]: .7765,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x1f4,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.096
  },
  ["deagle"]: {
    ["dmg"]: 0x35,
    ["rangeM"]: 104.0384,
    ["rangeMod"]: .85,
    ["armorPen"]: .932,
    ["hs"]: 3.9,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0x2bc,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.842
  },
  ["dualies"]: {
    ["dmg"]: 0x26,
    ["rangeM"]: 104.0384,
    ["rangeMod"]: .79,
    ["armorPen"]: .575,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x12c,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.096
  },
  ["famas"]: {
    ["dmg"]: 0x1e,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .96,
    ["armorPen"]: .7,
    ["hs"]: 0x4,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0x79e,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.588
  },
  ["fiveseven"]: {
    ["dmg"]: 0x20,
    ["rangeM"]: 104.0384,
    ["rangeMod"]: .81,
    ["armorPen"]: .9115,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x1f4,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.096
  },
  ["g3sg1"]: {
    ["dmg"]: 0x50,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .98,
    ["armorPen"]: .825,
    ["hs"]: 0x4,
    ["pen"]: 2.5,
    ["bullets"]: 0x1,
    ["price"]: 0x1388,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.461,
    ["zoomSpeed"]: 3.048
  },
  ["galil"]: {
    ["dmg"]: 0x1e,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .98,
    ["armorPen"]: .775,
    ["hs"]: 0x4,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0x708,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.461
  },
  ["glock"]: {
    ["dmg"]: 0x1e,
    ["rangeM"]: 104.0384,
    ["rangeMod"]: .85,
    ["armorPen"]: .47,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0xc8,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.096
  },
  ["m249"]: {
    ["dmg"]: 0x20,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .97,
    ["armorPen"]: .8,
    ["hs"]: 0x4,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0x1450,
    ["reward"]: 0x12c,
    ["runSpeed"]: 4.953
  },
  ["m4a1s"]: {
    ["dmg"]: 0x26,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .94,
    ["armorPen"]: .7,
    ["hs"]: 3.475,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0xb54,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.715
  },
  ["m4a4"]: {
    ["dmg"]: 0x21,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .97,
    ["armorPen"]: .7,
    ["hs"]: 0x4,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0xb54,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.715
  },
  ["mac10"]: {
    ["dmg"]: 0x1d,
    ["rangeM"]: 91.44,
    ["rangeMod"]: .8,
    ["armorPen"]: .575,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x41a,
    ["reward"]: 0x258,
    ["runSpeed"]: 6.096
  },
  ["mag7"]: {
    ["dmg"]: 0x1e,
    ["rangeM"]: 35.559999999999995,
    ["rangeMod"]: .45,
    ["armorPen"]: .75,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x8,
    ["price"]: 0x514,
    ["reward"]: 0x384,
    ["runSpeed"]: 5.715
  },
  ["mp5sd"]: {
    ["dmg"]: 0x1c,
    ["rangeM"]: 91.44,
    ["rangeMod"]: .87,
    ["armorPen"]: .625,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x578,
    ["reward"]: 0x258,
    ["runSpeed"]: 5.969,
    ["zoomSpeed"]: 5.588
  },
  ["mp7"]: {
    ["dmg"]: 0x1e,
    ["rangeM"]: 91.44,
    ["rangeMod"]: .87,
    ["armorPen"]: .625,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x578,
    ["reward"]: 0x258,
    ["runSpeed"]: 5.588
  },
  ["mp9"]: {
    ["dmg"]: 0x1a,
    ["rangeM"]: 91.44,
    ["rangeMod"]: .87,
    ["armorPen"]: .6,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x4e2,
    ["reward"]: 0x258,
    ["runSpeed"]: 6.096
  },
  ["negev"]: {
    ["dmg"]: 0x23,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .97,
    ["armorPen"]: .71,
    ["hs"]: 0x4,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0x6a4,
    ["reward"]: 0x12c,
    ["runSpeed"]: 3.81
  },
  ["nova"]: {
    ["dmg"]: 0x1a,
    ["rangeM"]: 76.2,
    ["rangeMod"]: .7,
    ["armorPen"]: .5,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x9,
    ["price"]: 0x41a,
    ["reward"]: 0x384,
    ["runSpeed"]: 5.588
  },
  ["p2000"]: {
    ["dmg"]: 0x23,
    ["rangeM"]: 104.0384,
    ["rangeMod"]: .91,
    ["armorPen"]: .505,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0xc8,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.096
  },
  ["p250"]: {
    ["dmg"]: 0x26,
    ["rangeM"]: 104.0384,
    ["rangeMod"]: .9,
    ["armorPen"]: .64,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x12c,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.096
  },
  ["p90"]: {
    ["dmg"]: 0x1a,
    ["rangeM"]: 93.97999999999999,
    ["rangeMod"]: .86,
    ["armorPen"]: .69,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x92e,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.842
  },
  ["r8"]: {
    ["dmg"]: 0x56,
    ["rangeM"]: 104.0384,
    ["rangeMod"]: .94,
    ["armorPen"]: .932,
    ["hs"]: 0x4,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0x258,
    ["reward"]: 0x12c,
    ["runSpeed"]: 4.572,
    ["zoomSpeed"]: 5.588
  },
  ["sawedoff"]: {
    ["dmg"]: 0x20,
    ["rangeM"]: 35.559999999999995,
    ["rangeMod"]: .45,
    ["armorPen"]: .75,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x8,
    ["price"]: 0x44c,
    ["reward"]: 0x384,
    ["runSpeed"]: 5.334
  },
  ["scar20"]: {
    ["dmg"]: 0x50,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .98,
    ["armorPen"]: .825,
    ["hs"]: 0x4,
    ["pen"]: 2.5,
    ["bullets"]: 0x1,
    ["price"]: 0x1388,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.461,
    ["zoomSpeed"]: 3.048
  },
  ["sg553"]: {
    ["dmg"]: 0x1e,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .98,
    ["armorPen"]: 0x1,
    ["hs"]: 0x4,
    ["pen"]: 0x2,
    ["bullets"]: 0x1,
    ["price"]: 0xbb8,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.334,
    ["zoomSpeed"]: 3.81
  },
  ["ssg08"]: {
    ["dmg"]: 0x58,
    ["rangeM"]: 208.0768,
    ["rangeMod"]: .98,
    ["armorPen"]: .85,
    ["hs"]: 0x4,
    ["pen"]: 2.5,
    ["bullets"]: 0x1,
    ["price"]: 0x6a4,
    ["reward"]: 0x12c,
    ["runSpeed"]: 5.842
  },
  ["tec9"]: {
    ["dmg"]: 0x21,
    ["rangeM"]: 104.0384,
    ["rangeMod"]: .79,
    ["armorPen"]: .906,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x1f4,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.096
  },
  ["ump45"]: {
    ["dmg"]: 0x23,
    ["rangeM"]: 93.97999999999999,
    ["rangeMod"]: .75,
    ["armorPen"]: .65,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0x4b0,
    ["reward"]: 0x258,
    ["runSpeed"]: 5.842
  },
  ["usps"]: {
    ["dmg"]: 0x23,
    ["rangeM"]: 104.0384,
    ["rangeMod"]: .91,
    ["armorPen"]: .505,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x1,
    ["price"]: 0xc8,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.096
  },
  ["xm1014"]: {
    ["dmg"]: 0x14,
    ["rangeM"]: 76.2,
    ["rangeMod"]: .7,
    ["armorPen"]: .8,
    ["hs"]: 0x4,
    ["pen"]: 0x1,
    ["bullets"]: 0x6,
    ["price"]: 0x7d0,
    ["reward"]: 0x258,
    ["runSpeed"]: 5.461
  }
};
var Xa = {
  ["c4"]: {
    ["price"]: 0x0,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.35
  },
  ["decoy"]: {
    ["price"]: 0x32,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.223
  },
  ["flash"]: {
    ["price"]: 0xc8,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.223
  },
  ["he"]: {
    ["dmg"]: 0x63,
    ["armorPen"]: .6,
    ["rangeM"]: 8.89,
    ["price"]: 0x12c,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.223
  },
  ["incend"]: {
    ["dmg"]: 0x28,
    ["armorPen"]: .7375,
    ["price"]: 0x1f4,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.223
  },
  ["knife"]: {
    ["armorPen"]: .85,
    ["price"]: 0x0,
    ["reward"]: 0x5dc,
    ["runSpeed"]: 6.35
  },
  ["molotov"]: {
    ["dmg"]: 0x28,
    ["armorPen"]: .9,
    ["price"]: 0x190,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.223
  },
  ["smoke"]: {
    ["price"]: 0x12c,
    ["reward"]: 0x12c,
    ["runSpeed"]: 6.223
  },
  ["zeus"]: {
    ["dmg"]: 0x1f4,
    ["armorPen"]: 0x1,
    ["rangeM"]: 3.048,
    ["price"]: 0xc8,
    ["reward"]: 0x64,
    ["runSpeed"]: 5.842
  }
};
var V = {
  ["glock"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x3fa8, 0xa),
    ["class"]: "pistol",
    ["side"]: "T",
    ["slot"]: 0x2,
    ["price"]: 0xc8,
    ["reward"]: 0x12c,
    ["dmg"]: 0x1e,
    ["hs"]: 0x4,
    ["armorPen"]: .47,
    ["rangeMod"]: .9,
    ["rpm"]: 0x190,
    ["cycleTime"]: .15,
    ["auto"]: !0x1,
    ["mag"]: 0x14,
    ["reserve"]: 0x78,
    ["reload"]: 2.266667,
    ["draw"]: 0x1,
    ["runSpeed"]: 6.096,
    ["sBase"]: .0032,
    ["sMove"]: .02,
    ["sJump"]: .09,
    ["sFire"]: .0045,
    ["recoil"]: {
      ["v"]: .55,
      ["h"]: .28,
      ["len"]: 0xc,
      ["seed"]: 0xb,
      ["cam"]: .5
    },
    ["sound"]: "shot_glock",
    ["vm"]: {
      ["kind"]: "pistol",
      ["color"]: 0x33383d,
      ["len"]: 0x1,
      ["sqGuard"]: !0x0,
      ["striker"]: !0x0,
      ["rail"]: !0x0,
      ["grooves"]: !0x0
    }
  },
  ["usps"]: {
    ["name"]: "USP-S",
    ["class"]: "pistol",
    ["side"]: "CT",
    ["slot"]: 0x2,
    ["price"]: 0xc8,
    ["reward"]: 0x12c,
    ["dmg"]: 0x23,
    ["hs"]: 0x4,
    ["armorPen"]: .505,
    ["rangeMod"]: .91,
    ["rpm"]: 0x161,
    ["cycleTime"]: .17,
    ["auto"]: !0x1,
    ["mag"]: 0xc,
    ["reserve"]: 0x18,
    ["reload"]: 2.2,
    ["draw"]: 0x1,
    ["runSpeed"]: 6.096,
    ["sBase"]: .0022,
    ["sMove"]: .018,
    ["sJump"]: .09,
    ["sFire"]: .0042,
    ["recoil"]: {
      ["v"]: .45,
      ["h"]: .22,
      ["len"]: 0xc,
      ["seed"]: 0xc,
      ["cam"]: .38
    },
    ["sound"]: "shot_usps",
    ["silenced"]: !0x0,
    ["vm"]: {
      ["kind"]: "pistol",
      ["color"]: 0x2e3338,
      ["len"]: 1.45,
      ["silencer"]: !0x0
    }
  },
  ["p2000"]: {
    ["name"]: "P2000",
    ["class"]: "pistol",
    ["side"]: "CT",
    ["slot"]: 0x2,
    ["price"]: 0xc8,
    ["reward"]: 0x12c,
    ["dmg"]: 0x23,
    ["hs"]: 0x4,
    ["armorPen"]: .505,
    ["rangeMod"]: .91,
    ["rpm"]: 0x161,
    ["cycleTime"]: .17,
    ["auto"]: !0x1,
    ["mag"]: 0xd,
    ["reserve"]: 0x34,
    ["reload"]: 2.266667,
    ["draw"]: 0x1,
    ["runSpeed"]: 6.096,
    ["sBase"]: .0024,
    ["sMove"]: .018,
    ["sJump"]: .09,
    ["sFire"]: .0042,
    ["recoil"]: {
      ["v"]: .6,
      ["h"]: .26,
      ["len"]: 0xd,
      ["seed"]: 0xd,
      ["cam"]: .5
    },
    ["sound"]: "shot_p2000",
    ["vm"]: {
      ["kind"]: "pistol",
      ["color"]: 0x44484d,
      ["len"]: 1.05,
      ["bigHammer"]: !0x0,
      ["wideSerr"]: !0x0
    }
  },
  ["dualies"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x3fb5, 0x10),
    ["class"]: "pistol",
    ["slot"]: 0x2,
    ["price"]: 0x12c,
    ["reward"]: 0x12c,
    ["dmg"]: 0x26,
    ["hs"]: 0x4,
    ["armorPen"]: .575,
    ["rangeMod"]: .88,
    ["rpm"]: 0x1f4,
    ["cycleTime"]: .12,
    ["auto"]: !0x1,
    ["mag"]: 0x1e,
    ["reserve"]: 0x78,
    ["reload"]: 3.766667,
    ["draw"]: 0x1,
    ["runSpeed"]: 6.096,
    ["sBase"]: .0036,
    ["sMove"]: .022,
    ["sJump"]: .09,
    ["sFire"]: .005,
    ["recoil"]: {
      ["v"]: .5,
      ["h"]: .35,
      ["len"]: 0x1e,
      ["seed"]: 0xe,
      ["cam"]: .45
    },
    ["sound"]: "shot_dualies",
    ["vm"]: {
      ["kind"]: "pistol",
      ["color"]: 0x8a8f96,
      ["len"]: 1.1,
      ["dual"]: !0x0
    }
  },
  ["p250"]: {
    ["name"]: "P250",
    ["class"]: "pistol",
    ["slot"]: 0x2,
    ["price"]: 0x12c,
    ["reward"]: 0x12c,
    ["dmg"]: 0x26,
    ["hs"]: 0x4,
    ["armorPen"]: .64,
    ["rangeMod"]: .9,
    ["rpm"]: 0x190,
    ["cycleTime"]: .15,
    ["auto"]: !0x1,
    ["mag"]: 0xd,
    ["reserve"]: 0x1a,
    ["reload"]: 2.266667,
    ["draw"]: 0x1,
    ["runSpeed"]: 6.096,
    ["sBase"]: .003,
    ["sMove"]: .019,
    ["sJump"]: .09,
    ["sFire"]: .0046,
    ["recoil"]: {
      ["v"]: .62,
      ["h"]: .3,
      ["len"]: 0xd,
      ["seed"]: 0xf,
      ["cam"]: .5
    },
    ["sound"]: "shot_p250",
    ["vm"]: {
      ["kind"]: "pistol",
      ["color"]: 0x53483c,
      ["len"]: 1.05,
      ["rail"]: !0x0,
      ["stubby"]: !0x0
    }
  },
  ["fiveseven"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x3fca, 0xd),
    ["class"]: "pistol",
    ["side"]: "CT",
    ["slot"]: 0x2,
    ["price"]: 0x1f4,
    ["reward"]: 0x12c,
    ["dmg"]: 0x20,
    ["hs"]: 0x4,
    ["armorPen"]: .91,
    ["rangeMod"]: .91,
    ["rpm"]: 0x190,
    ["cycleTime"]: .15,
    ["auto"]: !0x1,
    ["mag"]: 0x14,
    ["reserve"]: 0x64,
    ["reload"]: 2.266667,
    ["draw"]: 0x1,
    ["runSpeed"]: 6.096,
    ["sBase"]: .0026,
    ["sMove"]: .018,
    ["sJump"]: .09,
    ["sFire"]: .0042,
    ["recoil"]: {
      ["v"]: .58,
      ["h"]: .27,
      ["len"]: 0x14,
      ["seed"]: 0x10,
      ["cam"]: .5
    },
    ["sound"]: "shot_fiveseven",
    ["vm"]: {
      ["kind"]: "pistol",
      ["color"]: 0x2f3a30,
      ["len"]: 1.1,
      ["hump"]: !0x0,
      ["polyBody"]: !0x0
    }
  },
  ["tec9"]: {
    ["name"]: "Tec-9",
    ["class"]: "pistol",
    ["side"]: "T",
    ["slot"]: 0x2,
    ["price"]: 0x1f4,
    ["reward"]: 0x12c,
    ["dmg"]: 0x21,
    ["hs"]: 0x4,
    ["armorPen"]: .906,
    ["rangeMod"]: .91,
    ["rpm"]: 0x1f4,
    ["cycleTime"]: .12,
    ["auto"]: !0x1,
    ["mag"]: 0x12,
    ["reserve"]: 0x5a,
    ["reload"]: 2.566667,
    ["draw"]: 0x1,
    ["runSpeed"]: 6.096,
    ["sBase"]: .0042,
    ["sMove"]: .022,
    ["sJump"]: .09,
    ["sFire"]: .0055,
    ["recoil"]: {
      ["v"]: .6,
      ["h"]: .34,
      ["len"]: 0x12,
      ["seed"]: 0x11,
      ["cam"]: .5
    },
    ["sound"]: "shot_tec9",
    ["vm"]: {
      ["kind"]: "pistol",
      ["color"]: 0x39424a,
      ["len"]: 1.3,
      ["shroud"]: !0x0
    }
  },
  ["cz75"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x3fdf, 0xb),
    ["class"]: "pistol",
    ["slot"]: 0x2,
    ["price"]: 0x1f4,
    ["reward"]: 0x64,
    ["dmg"]: 0x1f,
    ["hs"]: 0x4,
    ["armorPen"]: .7735,
    ["rangeMod"]: .885,
    ["rpm"]: 0x258,
    ["cycleTime"]: .1,
    ["auto"]: !0x0,
    ["mag"]: 0xc,
    ["reserve"]: 0xc,
    ["reload"]: 2.733333,
    ["draw"]: 1.83333,
    ["runSpeed"]: 6.096,
    ["sBase"]: .0038,
    ["sMove"]: .022,
    ["sJump"]: .09,
    ["sFire"]: .007,
    ["recoil"]: {
      ["v"]: .72,
      ["h"]: .4,
      ["len"]: 0xc,
      ["seed"]: 0x12,
      ["cam"]: .5
    },
    ["sound"]: "shot_cz75",
    ["vm"]: {
      ["kind"]: "pistol",
      ["color"]: 0x2b3036,
      ["len"]: 1.1,
      ["longMag"]: !0x0,
      ["inFrame"]: !0x0
    }
  },
  ["deagle"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x3fef, 0xf),
    ["class"]: "pistol",
    ["slot"]: 0x2,
    ["price"]: 0x2bc,
    ["reward"]: 0x12c,
    ["dmg"]: 0x35,
    ["hs"]: 0x4,
    ["armorPen"]: .932,
    ["rangeMod"]: .81,
    ["rpm"]: 0x10b,
    ["cycleTime"]: .225,
    ["auto"]: !0x1,
    ["mag"]: 0x7,
    ["reserve"]: 0x23,
    ["reload"]: 2.2,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.842,
    ["sBase"]: .0035,
    ["sMove"]: .045,
    ["sJump"]: .12,
    ["sFire"]: .022,
    ["recoil"]: {
      ["v"]: 0x3,
      ["h"]: .6,
      ["len"]: 0x7,
      ["seed"]: 0x13,
      ["cam"]: .6
    },
    ["sound"]: "shot_deagle",
    ["vm"]: {
      ["kind"]: "pistol",
      ["color"]: 0x6e6f72,
      ["len"]: 1.5,
      ["heavy"]: !0x0
    }
  },
  ["r8"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x4001, 0xe),
    ["class"]: "pistol",
    ["slot"]: 0x2,
    ["price"]: 0x258,
    ["reward"]: 0x12c,
    ["dmg"]: 0x56,
    ["hs"]: 0x4,
    ["armorPen"]: .932,
    ["rangeMod"]: .81,
    ["rpm"]: 0x78,
    ["cycleTime"]: .5,
    ["auto"]: !0x1,
    ["chargeTime"]: .16,
    ["mag"]: 0x8,
    ["reserve"]: 0x8,
    ["reload"]: 2.266667,
    ["draw"]: 1.166667,
    ["runSpeed"]: 4.572,
    ["zoomSpeed"]: 5.588,
    ["sBase"]: .0012,
    ["sMove"]: .04,
    ["sJump"]: .12,
    ["sFire"]: .02,
    ["recoil"]: {
      ["v"]: 3.2,
      ["h"]: .5,
      ["len"]: 0x8,
      ["seed"]: 0x14,
      ["cam"]: .6
    },
    ["sound"]: "shot_r8",
    ["vm"]: {
      ["kind"]: "pistol",
      ["color"]: 0x4a4038,
      ["len"]: 1.6,
      ["heavy"]: !0x0,
      ["revolver"]: !0x0
    }
  },
  ["mac10"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x4017, 0x8),
    ["class"]: "smg",
    ["side"]: "T",
    ["slot"]: 0x1,
    ["price"]: 0x41a,
    ["reward"]: 0x258,
    ["dmg"]: 0x1d,
    ["hs"]: 0x4,
    ["armorPen"]: .575,
    ["rangeMod"]: .82,
    ["rpm"]: 0x320,
    ["cycleTime"]: .075,
    ["auto"]: !0x0,
    ["mag"]: 0x1e,
    ["reserve"]: 0x64,
    ["reload"]: 2.566667,
    ["draw"]: 0x1,
    ["runSpeed"]: 6.096,
    ["sBase"]: .0075,
    ["sMove"]: .012,
    ["sJump"]: .08,
    ["sFire"]: .0032,
    ["recoil"]: {
      ["v"]: .55,
      ["h"]: .42,
      ["len"]: 0x1e,
      ["seed"]: 0x1e,
      ["cam"]: .42
    },
    ["sound"]: "shot_mac10",
    ["vm"]: {
      ["kind"]: "smg",
      ["color"]: 0x33383e,
      ["len"]: .85,
      ["boxy"]: !0x0
    }
  },
  ["mp9"]: {
    ["name"]: "MP9",
    ["class"]: "smg",
    ["side"]: "CT",
    ["slot"]: 0x1,
    ["price"]: 0x4e2,
    ["reward"]: 0x258,
    ["dmg"]: 0x1a,
    ["hs"]: 0x4,
    ["armorPen"]: .6,
    ["rangeMod"]: .865,
    ["rpm"]: 0x359,
    ["cycleTime"]: .07,
    ["auto"]: !0x0,
    ["mag"]: 0x1e,
    ["reserve"]: 0x78,
    ["reload"]: 2.133333,
    ["draw"]: 1.2,
    ["runSpeed"]: 6.096,
    ["sBase"]: .0065,
    ["sMove"]: .01,
    ["sJump"]: .08,
    ["sFire"]: .003,
    ["recoil"]: {
      ["v"]: .5,
      ["h"]: .38,
      ["len"]: 0x1e,
      ["seed"]: 0x1f,
      ["cam"]: .42
    },
    ["sound"]: "shot_mp9",
    ["vm"]: {
      ["kind"]: "smg",
      ["color"]: 0x3c4249,
      ["len"]: .9,
      ["rail2"]: !0x0,
      ["angMag"]: !0x0
    }
  },
  ["mp7"]: {
    ["name"]: "MP7",
    ["class"]: "smg",
    ["slot"]: 0x1,
    ["price"]: 0x5dc,
    ["reward"]: 0x258,
    ["dmg"]: 0x1d,
    ["hs"]: 0x4,
    ["armorPen"]: .625,
    ["rangeMod"]: .85,
    ["rpm"]: 0x2ee,
    ["cycleTime"]: .08,
    ["auto"]: !0x0,
    ["mag"]: 0x1e,
    ["reserve"]: 0x78,
    ["reload"]: 3.166667,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.588,
    ["sBase"]: .006,
    ["sMove"]: .01,
    ["sJump"]: .08,
    ["sFire"]: .0028,
    ["recoil"]: {
      ["v"]: .52,
      ["h"]: .35,
      ["len"]: 0x1e,
      ["seed"]: 0x20,
      ["cam"]: .42
    },
    ["sound"]: "shot_mp7",
    ["vm"]: {
      ["kind"]: "smg",
      ["color"]: 0x2e3339,
      ["len"]: .95,
      ["vgrip"]: !0x0
    }
  },
  ["mp5sd"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x401f, 0x8),
    ["class"]: "smg",
    ["slot"]: 0x1,
    ["price"]: 0x5dc,
    ["reward"]: 0x258,
    ["dmg"]: 0x1b,
    ["hs"]: 0x4,
    ["armorPen"]: .625,
    ["rangeMod"]: .85,
    ["rpm"]: 0x2ee,
    ["cycleTime"]: .08,
    ["auto"]: !0x0,
    ["mag"]: 0x1e,
    ["reserve"]: 0x78,
    ["reload"]: 2.966667,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.969,
    ["zoomSpeed"]: 5.588,
    ["sBase"]: .0058,
    ["sMove"]: .01,
    ["sJump"]: .08,
    ["sFire"]: .0027,
    ["recoil"]: {
      ["v"]: .5,
      ["h"]: .33,
      ["len"]: 0x1e,
      ["seed"]: 0x21,
      ["cam"]: .42
    },
    ["sound"]: "shot_mp5sd",
    ["silenced"]: !0x0,
    ["vm"]: {
      ["kind"]: "smg",
      ["color"]: 0x23272c,
      ["len"]: 1.15,
      ["silencer"]: !0x0
    }
  },
  ["ump45"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x402b, 0x8),
    ["class"]: "smg",
    ["slot"]: 0x1,
    ["price"]: 0x4b0,
    ["reward"]: 0x258,
    ["dmg"]: 0x23,
    ["hs"]: 0x4,
    ["armorPen"]: .65,
    ["rangeMod"]: .75,
    ["rpm"]: 0x29b,
    ["cycleTime"]: .09,
    ["auto"]: !0x0,
    ["mag"]: 0x19,
    ["reserve"]: 0x64,
    ["reload"]: 3.466667,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.842,
    ["sBase"]: .0068,
    ["sMove"]: .011,
    ["sJump"]: .08,
    ["sFire"]: .003,
    ["recoil"]: {
      ["v"]: .6,
      ["h"]: .38,
      ["len"]: 0x19,
      ["seed"]: 0x22,
      ["cam"]: .42
    },
    ["sound"]: "shot_ump45",
    ["vm"]: {
      ["kind"]: "smg",
      ["color"]: 0x3a3f37,
      ["len"]: 0x1,
      ["angMag"]: !0x0,
      ["wedgeBody"]: !0x0
    }
  },
  ["p90"]: {
    ["name"]: "P90",
    ["class"]: "smg",
    ["slot"]: 0x1,
    ["price"]: 0x92e,
    ["reward"]: 0x12c,
    ["dmg"]: 0x1a,
    ["hs"]: 0x4,
    ["armorPen"]: .69,
    ["rangeMod"]: .885,
    ["rpm"]: 0x359,
    ["cycleTime"]: .07,
    ["auto"]: !0x0,
    ["mag"]: 0x32,
    ["reserve"]: 0x64,
    ["reload"]: 3.366667,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.842,
    ["sBase"]: .0062,
    ["sMove"]: .009,
    ["sJump"]: .08,
    ["sFire"]: .0026,
    ["recoil"]: {
      ["v"]: .45,
      ["h"]: .34,
      ["len"]: 0x32,
      ["seed"]: 0x23,
      ["cam"]: .4
    },
    ["sound"]: "shot_p90",
    ["vm"]: {
      ["kind"]: "smg",
      ["color"]: 0x3f4a52,
      ["len"]: 0x1,
      ["bullpup"]: !0x0,
      ["topRail"]: !0x0
    }
  },
  ["bizon"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x4036, 0xa),
    ["class"]: "smg",
    ["slot"]: 0x1,
    ["price"]: 0x578,
    ["reward"]: 0x258,
    ["dmg"]: 0x1b,
    ["hs"]: 0x4,
    ["armorPen"]: .575,
    ["rangeMod"]: .8,
    ["rpm"]: 0x2ee,
    ["cycleTime"]: .08,
    ["auto"]: !0x0,
    ["mag"]: 0x40,
    ["reserve"]: 0x78,
    ["reload"]: 2.433333,
    ["draw"]: 1.1,
    ["runSpeed"]: 6.096,
    ["sBase"]: .0072,
    ["sMove"]: .011,
    ["sJump"]: .08,
    ["sFire"]: .0028,
    ["recoil"]: {
      ["v"]: .5,
      ["h"]: .36,
      ["len"]: 0x40,
      ["seed"]: 0x24,
      ["cam"]: .42
    },
    ["sound"]: "shot_bizon",
    ["vm"]: {
      ["kind"]: "smg",
      ["color"]: 0x36322e,
      ["len"]: 0x1,
      ["drum"]: !0x0
    }
  },
  ["nova"]: {
    ["name"]: "Nova",
    ["class"]: "shotgun",
    ["slot"]: 0x1,
    ["price"]: 0x41a,
    ["reward"]: 0x384,
    ["dmg"]: 0x1a,
    ["hs"]: 0x2,
    ["armorPen"]: .5,
    ["rangeMod"]: .65,
    ["rpm"]: 0x44,
    ["cycleTime"]: .88,
    ["auto"]: !0x1,
    ["mag"]: 0x8,
    ["reserve"]: 0x20,
    ["reload"]: .466667,
    ["shellReload"]: !0x0,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.588,
    ["sBase"]: .03,
    ["sMove"]: .04,
    ["sJump"]: .1,
    ["sFire"]: .01,
    ["pellets"]: 0x9,
    ["recoil"]: {
      ["v"]: 3.2,
      ["h"]: .8,
      ["len"]: 0x8,
      ["seed"]: 0x28,
      ["cam"]: .6
    },
    ["sound"]: "shot_nova",
    ["vm"]: {
      ["kind"]: "shotgun",
      ["color"]: 0x3d4436,
      ["len"]: 1.2
    }
  },
  ["xm1014"]: {
    ["name"]: "XM1014",
    ["class"]: "shotgun",
    ["slot"]: 0x1,
    ["price"]: 0x7d0,
    ["reward"]: 0x384,
    ["dmg"]: 0x14,
    ["hs"]: 0x2,
    ["armorPen"]: .8,
    ["rangeMod"]: .7,
    ["rpm"]: 0xab,
    ["cycleTime"]: .35,
    ["auto"]: !0x0,
    ["mag"]: 0x7,
    ["reserve"]: 0x20,
    ["reload"]: .6,
    ["shellReload"]: !0x0,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.461,
    ["sBase"]: .035,
    ["sMove"]: .045,
    ["sJump"]: .1,
    ["sFire"]: .012,
    ["pellets"]: 0x6,
    ["recoil"]: {
      ["v"]: 2.6,
      ["h"]: .8,
      ["len"]: 0x7,
      ["seed"]: 0x29,
      ["cam"]: .55
    },
    ["sound"]: "shot_xm1014",
    ["vm"]: {
      ["kind"]: "shotgun",
      ["color"]: 0x2f3338,
      ["len"]: 1.25,
      ["semi"]: !0x0,
      ["pistolGrip"]: !0x0
    }
  },
  ["sawedoff"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x4046, 0xb),
    ["class"]: "shotgun",
    ["side"]: "T",
    ["slot"]: 0x1,
    ["price"]: 0x44c,
    ["reward"]: 0x384,
    ["dmg"]: 0x20,
    ["hs"]: 0x2,
    ["armorPen"]: .75,
    ["rangeMod"]: .45,
    ["rpm"]: 0x47,
    ["cycleTime"]: .85,
    ["auto"]: !0x1,
    ["mag"]: 0x7,
    ["reserve"]: 0x20,
    ["reload"]: .466667,
    ["shellReload"]: !0x0,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.334,
    ["sBase"]: .055,
    ["sMove"]: .06,
    ["sJump"]: .12,
    ["sFire"]: .014,
    ["pellets"]: 0x8,
    ["recoil"]: {
      ["v"]: 3.6,
      ["h"]: 0x1,
      ["len"]: 0x7,
      ["seed"]: 0x2a,
      ["cam"]: .6
    },
    ["sound"]: "shot_sawedoff",
    ["vm"]: {
      ["kind"]: "shotgun",
      ["color"]: 0x4a3b2e,
      ["len"]: .85,
      ["double"]: !0x0,
      ["noStock"]: !0x0
    }
  },
  ["mag7"]: {
    ["name"]: "MAG-7",
    ["class"]: "shotgun",
    ["side"]: "CT",
    ["slot"]: 0x1,
    ["price"]: 0x514,
    ["reward"]: 0x384,
    ["dmg"]: 0x1e,
    ["hs"]: 0x2,
    ["armorPen"]: .75,
    ["rangeMod"]: .45,
    ["rpm"]: 0x47,
    ["cycleTime"]: .85,
    ["auto"]: !0x1,
    ["mag"]: 0x5,
    ["reserve"]: 0x20,
    ["reload"]: 2.5,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.715,
    ["sBase"]: .038,
    ["sMove"]: .045,
    ["sJump"]: .1,
    ["sFire"]: .012,
    ["pellets"]: 0x8,
    ["recoil"]: {
      ["v"]: 3.4,
      ["h"]: .9,
      ["len"]: 0x5,
      ["seed"]: 0x2b,
      ["cam"]: .6
    },
    ["sound"]: "shot_mag7",
    ["vm"]: {
      ["kind"]: "shotgun",
      ["color"]: 0x384042,
      ["len"]: .95,
      ["boxMag"]: !0x0
    }
  },
  ["m249"]: {
    ["name"]: "M249",
    ["class"]: "mg",
    ["slot"]: 0x1,
    ["price"]: 0x1450,
    ["reward"]: 0x12c,
    ["dmg"]: 0x20,
    ["hs"]: 0x4,
    ["armorPen"]: .8,
    ["rangeMod"]: .97,
    ["rpm"]: 0x2ee,
    ["cycleTime"]: .08,
    ["auto"]: !0x0,
    ["mag"]: 0x64,
    ["reserve"]: 0xc8,
    ["reload"]: 5.7,
    ["draw"]: 1.1,
    ["runSpeed"]: 4.953,
    ["sBase"]: .01,
    ["sMove"]: .02,
    ["sJump"]: .1,
    ["sFire"]: .004,
    ["recoil"]: {
      ["v"]: .8,
      ["h"]: .55,
      ["len"]: 0x64,
      ["seed"]: 0x2c,
      ["cam"]: .45
    },
    ["sound"]: "shot_m249",
    ["vm"]: {
      ["kind"]: "mg",
      ["color"]: 0x3c4438,
      ["len"]: 1.3,
      ["topHandle"]: !0x0
    }
  },
  ["negev"]: {
    ["name"]: "Negev",
    ["class"]: "mg",
    ["slot"]: 0x1,
    ["price"]: 0x6a4,
    ["reward"]: 0x12c,
    ["dmg"]: 0x23,
    ["hs"]: 0x4,
    ["armorPen"]: .75,
    ["rangeMod"]: .97,
    ["rpm"]: 0x320,
    ["cycleTime"]: .075,
    ["auto"]: !0x0,
    ["mag"]: 0x96,
    ["reserve"]: 0xc8,
    ["reload"]: 5.7,
    ["draw"]: 1.1,
    ["runSpeed"]: 3.81,
    ["sBase"]: .02,
    ["sMove"]: .025,
    ["sJump"]: .1,
    ["sFire"]: -6e-4,
    ["recoil"]: {
      ["v"]: 0x1,
      ["h"]: .7,
      ["len"]: 0x96,
      ["seed"]: 0x2d,
      ["cam"]: .4
    },
    ["sound"]: "shot_negev",
    ["vm"]: {
      ["kind"]: "mg",
      ["color"]: 0x44392f,
      ["len"]: 1.35,
      ["slim"]: !0x0
    }
  },
  ["galil"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x4053, 0xa),
    ["class"]: "rifle",
    ["side"]: "T",
    ["slot"]: 0x1,
    ["price"]: 0x708,
    ["reward"]: 0x12c,
    ["dmg"]: 0x1e,
    ["hs"]: 0x4,
    ["armorPen"]: .775,
    ["rangeMod"]: .98,
    ["rpm"]: 0x29b,
    ["cycleTime"]: .09,
    ["auto"]: !0x0,
    ["mag"]: 0x23,
    ["reserve"]: 0x5a,
    ["reload"]: 3.033333,
    ["draw"]: 1.1,
    ["runSpeed"]: 5.461,
    ["sBase"]: .0042,
    ["sMove"]: .035,
    ["sJump"]: .1,
    ["sFire"]: .0028,
    ["recoil"]: {
      ["v"]: 1.15,
      ["h"]: .5,
      ["len"]: 0x23,
      ["seed"]: 0x32,
      ["cam"]: .42
    },
    ["sound"]: "shot_galil",
    ["vm"]: {
      ["kind"]: "rifle",
      ["color"]: 0x4a4438,
      ["len"]: 1.05,
      ["curved"]: !0x0,
      ["metal"]: !0x0,
      ["wire"]: !0x0
    }
  },
  ["famas"]: {
    ["name"]: "FAMAS",
    ["class"]: "rifle",
    ["side"]: "CT",
    ["slot"]: 0x1,
    ["price"]: 0x802,
    ["reward"]: 0x12c,
    ["dmg"]: 0x1e,
    ["hs"]: 0x4,
    ["armorPen"]: .7,
    ["rangeMod"]: .96,
    ["rpm"]: 0x29b,
    ["cycleTime"]: .09,
    ["auto"]: !0x0,
    ["mag"]: 0x19,
    ["reserve"]: 0x5a,
    ["reload"]: 3.3,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.588,
    ["sBase"]: .0036,
    ["sMove"]: .032,
    ["sJump"]: .1,
    ["sFire"]: .0026,
    ["recoil"]: {
      ["v"]: 1.05,
      ["h"]: .45,
      ["len"]: 0x19,
      ["seed"]: 0x33,
      ["cam"]: .42
    },
    ["sound"]: "shot_famas",
    ["vm"]: {
      ["kind"]: "rifle",
      ["color"]: 0x35393f,
      ["len"]: .95,
      ["bullpup"]: !0x0,
      ["wedge"]: !0x0
    }
  },
  ["ak47"]: {
    ["name"]: "AK-47",
    ["class"]: "rifle",
    ["side"]: "T",
    ["slot"]: 0x1,
    ["price"]: 0xa8c,
    ["reward"]: 0x12c,
    ["dmg"]: 0x24,
    ["hs"]: 0x4,
    ["armorPen"]: .775,
    ["rangeMod"]: .98,
    ["rpm"]: 0x258,
    ["cycleTime"]: .1,
    ["auto"]: !0x0,
    ["mag"]: 0x1e,
    ["reserve"]: 0x5a,
    ["reload"]: 2.466667,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.461,
    ["sBase"]: .0032,
    ["sMove"]: .04,
    ["sJump"]: .11,
    ["sFire"]: .003,
    ["recoil"]: {
      ["v"]: 1.55,
      ["h"]: .55,
      ["len"]: 0x1e,
      ["seed"]: 0x34,
      ["cam"]: .4
    },
    ["sound"]: "shot_ak47",
    ["vm"]: {
      ["kind"]: "rifle",
      ["color"]: 0x5a4632,
      ["len"]: 1.1,
      ["curved"]: !0x0
    }
  },
  ["m4a4"]: {
    ["name"]: "M4A4",
    ["class"]: "rifle",
    ["side"]: "CT",
    ["slot"]: 0x1,
    ["price"]: 0xb54,
    ["reward"]: 0x12c,
    ["dmg"]: 0x21,
    ["hs"]: 0x4,
    ["armorPen"]: .7,
    ["rangeMod"]: .97,
    ["rpm"]: 0x29b,
    ["cycleTime"]: .09,
    ["auto"]: !0x0,
    ["mag"]: 0x1e,
    ["reserve"]: 0x5a,
    ["reload"]: 3.066667,
    ["draw"]: 1.133333,
    ["runSpeed"]: 5.715,
    ["sBase"]: .0028,
    ["sMove"]: .035,
    ["sJump"]: .1,
    ["sFire"]: .0026,
    ["recoil"]: {
      ["v"]: 1.15,
      ["h"]: .45,
      ["len"]: 0x1e,
      ["seed"]: 0x35,
      ["cam"]: .42
    },
    ["sound"]: "shot_m4a4",
    ["vm"]: {
      ["kind"]: "rifle",
      ["color"]: 0x33383e,
      ["len"]: 1.1,
      ["handle"]: !0x0
    }
  },
  ["m4a1s"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x4062, 0x8),
    ["class"]: "rifle",
    ["side"]: "CT",
    ["slot"]: 0x1,
    ["price"]: 0xb54,
    ["reward"]: 0x12c,
    ["dmg"]: 0x26,
    ["hs"]: 0x4,
    ["armorPen"]: .7,
    ["rangeMod"]: .94,
    ["rpm"]: 0x258,
    ["cycleTime"]: .1,
    ["auto"]: !0x0,
    ["mag"]: 0x14,
    ["reserve"]: 0x50,
    ["reload"]: 3.066667,
    ["draw"]: 1.133333,
    ["runSpeed"]: 5.715,
    ["sBase"]: .0024,
    ["sMove"]: .033,
    ["sJump"]: .1,
    ["sFire"]: .0025,
    ["recoil"]: {
      ["v"]: 1.05,
      ["h"]: .4,
      ["len"]: 0x14,
      ["seed"]: 0x36,
      ["cam"]: .42
    },
    ["sound"]: "shot_m4a1s",
    ["silenced"]: !0x0,
    ["vm"]: {
      ["kind"]: "rifle",
      ["color"]: 0x2b2f34,
      ["len"]: 1.3,
      ["silencer"]: !0x0
    }
  },
  ["sg553"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x406d, 0x8),
    ["class"]: "rifle",
    ["side"]: "T",
    ["slot"]: 0x1,
    ["price"]: 0xbb8,
    ["reward"]: 0x12c,
    ["dmg"]: 0x1e,
    ["hs"]: 0x4,
    ["armorPen"]: 0x1,
    ["rangeMod"]: .98,
    ["rpm"]: 0x221,
    ["cycleTime"]: .11,
    ["auto"]: !0x0,
    ["mag"]: 0x1e,
    ["reserve"]: 0x5a,
    ["reload"]: 2.766667,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.334,
    ["zoomSpeed"]: 3.81,
    ["sBase"]: .003,
    ["sMove"]: .038,
    ["sJump"]: .1,
    ["sFire"]: .0032,
    ["zoom"]: [42.7],
    ["recoil"]: {
      ["v"]: 1.35,
      ["h"]: .5,
      ["len"]: 0x1e,
      ["seed"]: 0x37,
      ["cam"]: .42
    },
    ["sound"]: "shot_sg553",
    ["vm"]: {
      ["kind"]: "rifle",
      ["color"]: 0x3e4436,
      ["len"]: 1.1,
      ["scope"]: !0x0,
      ["curved"]: !0x0
    }
  },
  ["aug"]: {
    ["name"]: "AUG",
    ["class"]: "rifle",
    ["side"]: "CT",
    ["slot"]: 0x1,
    ["price"]: 0xce4,
    ["reward"]: 0x12c,
    ["dmg"]: 0x1c,
    ["hs"]: 0x4,
    ["armorPen"]: .9,
    ["rangeMod"]: .96,
    ["rpm"]: 0x258,
    ["cycleTime"]: .1,
    ["auto"]: !0x0,
    ["mag"]: 0x1e,
    ["reserve"]: 0x5a,
    ["reload"]: 3.766667,
    ["draw"]: 1.16667,
    ["runSpeed"]: 5.588,
    ["zoomSpeed"]: 3.81,
    ["sBase"]: .0026,
    ["sMove"]: .033,
    ["sJump"]: .1,
    ["sFire"]: .0026,
    ["zoom"]: [42.7],
    ["recoil"]: {
      ["v"]: 1.1,
      ["h"]: .42,
      ["len"]: 0x1e,
      ["seed"]: 0x38,
      ["cam"]: .42
    },
    ["sound"]: "shot_aug",
    ["vm"]: {
      ["kind"]: "rifle",
      ["color"]: 0x424a3c,
      ["len"]: 1.05,
      ["scope"]: !0x0,
      ["bullpup"]: !0x0
    }
  },
  ["ssg08"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x4079, 0x8),
    ["class"]: "sniper",
    ["slot"]: 0x1,
    ["price"]: 0x6a4,
    ["reward"]: 0x12c,
    ["dmg"]: 0x58,
    ["hs"]: 2.2,
    ["armorPen"]: .85,
    ["rangeMod"]: .97,
    ["rpm"]: 0x30,
    ["cycleTime"]: 1.25,
    ["auto"]: !0x1,
    ["boltTime"]: 1.25,
    ["mag"]: 0xa,
    ["reserve"]: 0x5a,
    ["reload"]: 3.7,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.842,
    ["sBase"]: .11,
    ["sScoped"]: 6e-4,
    ["sMove"]: .15,
    ["sJump"]: .004,
    ["sFire"]: .01,
    ["zoom"]: [30.5],
    ["recoil"]: {
      ["v"]: 2.4,
      ["h"]: .3,
      ["len"]: 0xa,
      ["seed"]: 0x39,
      ["cam"]: .5
    },
    ["sound"]: "shot_ssg08",
    ["vm"]: {
      ["kind"]: "sniper",
      ["color"]: 0x3f4a3a,
      ["len"]: 1.15,
      ["scope"]: !0x0,
      ["slim"]: !0x0
    }
  },
  ["awp"]: {
    ["name"]: "AWP",
    ["class"]: "sniper",
    ["slot"]: 0x1,
    ["price"]: 0x128e,
    ["reward"]: 0x64,
    ["dmg"]: 0x73,
    ["hs"]: 2.5,
    ["armorPen"]: .975,
    ["rangeMod"]: .99,
    ["rpm"]: 0x29,
    ["cycleTime"]: 1.455,
    ["auto"]: !0x1,
    ["boltTime"]: 1.455,
    ["mag"]: 0x5,
    ["reserve"]: 0x1e,
    ["reload"]: 3.666667,
    ["draw"]: 1.266667,
    ["runSpeed"]: 5.08,
    ["zoomSpeed"]: 2.54,
    ["sBase"]: .13,
    ["sScoped"]: 4e-4,
    ["sMove"]: .18,
    ["sJump"]: .2,
    ["sFire"]: .01,
    ["zoom"]: [30.5, 7.5],
    ["recoil"]: {
      ["v"]: 3.2,
      ["h"]: .3,
      ["len"]: 0x5,
      ["seed"]: 0x3a,
      ["cam"]: .55
    },
    ["sound"]: "shot_awp",
    ["vm"]: {
      ["kind"]: "sniper",
      ["color"]: 0x4a5240,
      ["len"]: 1.35,
      ["scope"]: !0x0
    }
  },
  ["g3sg1"]: {
    ["name"]: "G3SG1",
    ["class"]: "sniper",
    ["side"]: "T",
    ["slot"]: 0x1,
    ["price"]: 0x1388,
    ["reward"]: 0x12c,
    ["dmg"]: 0x50,
    ["hs"]: 2.2,
    ["armorPen"]: .825,
    ["rangeMod"]: .98,
    ["rpm"]: 0xf0,
    ["cycleTime"]: .25,
    ["auto"]: !0x0,
    ["mag"]: 0x14,
    ["reserve"]: 0x5a,
    ["reload"]: 4.666667,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.461,
    ["zoomSpeed"]: 3.048,
    ["sBase"]: .09,
    ["sScoped"]: .0012,
    ["sMove"]: .14,
    ["sJump"]: .2,
    ["sFire"]: .008,
    ["zoom"]: [30.5, 11.3],
    ["recoil"]: {
      ["v"]: 1.8,
      ["h"]: .6,
      ["len"]: 0x14,
      ["seed"]: 0x3b,
      ["cam"]: .45
    },
    ["sound"]: "shot_g3sg1",
    ["vm"]: {
      ["kind"]: "sniper",
      ["color"]: 0x39423b,
      ["len"]: 1.3,
      ["scope"]: !0x0,
      ["autoMag"]: "curve"
    }
  },
  ["scar20"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x4082, 0x9),
    ["class"]: "sniper",
    ["side"]: "CT",
    ["slot"]: 0x1,
    ["price"]: 0x1388,
    ["reward"]: 0x12c,
    ["dmg"]: 0x50,
    ["hs"]: 2.2,
    ["armorPen"]: .825,
    ["rangeMod"]: .98,
    ["rpm"]: 0xf0,
    ["cycleTime"]: .25,
    ["auto"]: !0x0,
    ["mag"]: 0x14,
    ["reserve"]: 0x5a,
    ["reload"]: 3.066667,
    ["draw"]: 0x1,
    ["runSpeed"]: 5.461,
    ["zoomSpeed"]: 3.048,
    ["sBase"]: .09,
    ["sScoped"]: .0012,
    ["sMove"]: .14,
    ["sJump"]: .2,
    ["sFire"]: .008,
    ["zoom"]: [30.5, 11.3],
    ["recoil"]: {
      ["v"]: 1.8,
      ["h"]: .6,
      ["len"]: 0x14,
      ["seed"]: 0x3c,
      ["cam"]: .45
    },
    ["sound"]: "shot_scar20",
    ["vm"]: {
      ["kind"]: "sniper",
      ["color"]: 0x6b5a41,
      ["len"]: 1.3,
      ["scope"]: !0x0,
      ["autoMag"]: "box",
      ["rail"]: !0x0
    }
  },
  ["knife"]: {
    ["name"]: "Knife",
    ["class"]: "knife",
    ["slot"]: 0x3,
    ["price"]: 0x0,
    ["reward"]: 0x5dc,
    ["dmg"]: 0x28,
    ["hs"]: 0x1,
    ["armorPen"]: .85,
    ["rpm"]: 0x78,
    ["range"]: 1.9,
    ["auto"]: !0x0,
    ["mag"]: 0x1 / 0x0,
    ["reserve"]: 0x0,
    ["reload"]: 0x0,
    ["draw"]: 0x1,
    ["runSpeed"]: 6.35,
    ["sound"]: "knife_swing",
    ["vm"]: {
      ["kind"]: "knife",
      ["color"]: 0x9aa2ab
    }
  },
  ["zeus"]: {
    ["name"]: "Taser",
    ["class"]: "zeus",
    ["slot"]: 0x3,
    ["price"]: 0xc8,
    ["reward"]: 0x0,
    ["dmg"]: 0x1f4,
    ["hs"]: 0x1,
    ["armorPen"]: 0x1,
    ["rpm"]: 0x1e,
    ["range"]: 2.7,
    ["auto"]: !0x1,
    ["mag"]: 0x1,
    ["reserve"]: 0x0,
    ["rechargeTime"]: 0x1e,
    ["reload"]: 0x0,
    ["draw"]: 0x1,
    ["runSpeed"]: 6.096,
    ["sound"]: "shot_zeus",
    ["vm"]: {
      ["kind"]: "zeus",
      ["color"]: 0xc9b436
    }
  },
  ["he"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x4092, 0xd),
    ["class"]: "grenade",
    ["slot"]: 0x4,
    ["price"]: 0x12c,
    ["reward"]: 0x12c,
    ["dmg"]: 0x62,
    ["armorPen"]: .6,
    ["runSpeed"]: 6.223,
    ["fuse"]: 1.6,
    ["draw"]: 0x1,
    ["sound"]: null,
    ["vm"]: {
      ["kind"]: "grenade",
      ["color"]: 0x4a5240
    }
  },
  ["flash"]: {
    ["name"]: "Flashbang",
    ["class"]: "grenade",
    ["slot"]: 0x4,
    ["price"]: 0xc8,
    ["reward"]: 0x12c,
    ["dmg"]: 0x1,
    ["runSpeed"]: 6.223,
    ["fuse"]: 1.6,
    ["draw"]: 0x1,
    ["sound"]: null,
    ["vm"]: {
      ["kind"]: "grenade",
      ["color"]: 0x5a6470,
      ["canister"]: !0x0,
      ["stripe"]: 0xd8d8d8
    }
  },
  ["smoke"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x40a4, 0x10),
    ["class"]: "grenade",
    ["slot"]: 0x4,
    ["price"]: 0x12c,
    ["reward"]: 0x12c,
    ["dmg"]: 0x0,
    ["runSpeed"]: 6.223,
    ["fuse"]: 1.2,
    ["draw"]: 0x1,
    ["sound"]: null,
    ["vm"]: {
      ["kind"]: "grenade",
      ["color"]: 0x4d5a4d,
      ["canister"]: !0x0,
      ["stripe"]: 0x8a9a8a
    }
  },
  ["molotov"]: {
    ["name"]: "Molotov",
    ["class"]: "grenade",
    ["side"]: "T",
    ["slot"]: 0x4,
    ["price"]: 0x190,
    ["reward"]: 0x12c,
    ["dmg"]: 0x28,
    ["runSpeed"]: 6.223,
    ["fuse"]: 0x2,
    ["draw"]: 0x1,
    ["sound"]: null,
    ["vm"]: {
      ["kind"]: "grenade",
      ["color"]: 0x8a4a30,
      ["bottle"]: !0x0
    }
  },
  ["incend"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x40ba, 0x17),
    ["class"]: "grenade",
    ["side"]: "CT",
    ["slot"]: 0x4,
    ["price"]: 0x258,
    ["reward"]: 0x12c,
    ["dmg"]: 0x28,
    ["runSpeed"]: 6.223,
    ["fuse"]: 0x2,
    ["draw"]: 0x1,
    ["sound"]: null,
    ["vm"]: {
      ["kind"]: "grenade",
      ["color"]: 0x84323c,
      ["canister"]: !0x0,
      ["stripe"]: 0xc46a5a
    }
  },
  ["decoy"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x40d2, 0x10),
    ["class"]: "grenade",
    ["slot"]: 0x4,
    ["price"]: 0x32,
    ["reward"]: 0x12c,
    ["dmg"]: 0x5,
    ["runSpeed"]: 6.223,
    ["fuse"]: 0x2,
    ["draw"]: 0x1,
    ["sound"]: null,
    ["vm"]: {
      ["kind"]: "grenade",
      ["color"]: 0x6a6a52,
      ["canister"]: !0x0,
      ["stripe"]: 0x9a9a7a
    }
  },
  ["c4"]: {
    ["name"]: __p_KGFS_MAIN_STR(0x40e7, 0xf),
    ["class"]: "c4",
    ["slot"]: 0x5,
    ["price"]: 0x0,
    ["reward"]: 0x12c,
    ["dmg"]: 0x1f4,
    ["runSpeed"]: 6.35,
    ["draw"]: .5,
    ["mag"]: 0x1,
    ["reserve"]: 0x0,
    ["reload"]: 0x0,
    ["sound"]: null,
    ["vm"]: {
      ["kind"]: "c4",
      ["color"]: 0xc9b896
    }
  }
};
for (let e in V) {
  let t = V[e];
  t["id"] = e;
  let n = Mi[e];
  if (n) {
    t["cs2"] = n, n["cls"] = t["class"];
    {
      let t = z["PER_WEAPON"] && z["PER_WEAPON"][e];
      let r = typeof t == "number" ? {
        ["acc"]: t
      } : t || {};
      n["accScale"] = r["acc"] || 0x1, n["standScale"] = r["stand"] || 0x1
    }
    t["recoverStand"] = n["recoverStand"], t["recoverCrouch"] = n["recoverCrouch"], aa(e)
  }
} {
  let e = {};
  for (let t in V) {
    let n = V[t];
    if (!n["cs2"] || !n["recoil"]) {
      continue
    }
    let r = Array["isArray"](n["cs2"]["mag"]) ? n["cs2"]["mag"][0x0] : n["cs2"]["mag"];
    r > 0x0 && (e[n["class"]] || (e[n["class"]] = []))["push"]([n, r])
  }
  for (let t in e) {
    let n = e[t];
    let r = 0x0;
    let i = 0x0;
    for (let [e, t] of n) {
      r += e["recoil"]["v"], i += t
    }
    let a = r / n["length"];
    let o = i / n["length"];
    for (let [e, t] of n) {
      e["vmKick"] = a * t / o
    }
  }
}
for (let [e, t] of Object["entries"](ja)) {
  let n = V[e];
  n && (n["dmg"] = t["dmg"], n["rangeMod"] = t["rangeMod"], n["hs"] = t["hs"], n["armorPen"] = t["armorPen"], n["penetration"] = t["pen"], n["maxRange"] = t["rangeM"], t["bullets"] > 0x1 && (n["pellets"] = t["bullets"]), n["price"] = t["price"], n["reward"] = t["reward"], n["runSpeed"] = t["runSpeed"], t["zoomSpeed"] === void 0x0 ? delete n["zoomSpeed"] : n["zoomSpeed"] = t["zoomSpeed"])
}
for (let [e, t] of Object["entries"](Xa)) {
  let n = V[e];
  n && (t["dmg"] !== void 0x0 && (n["dmg"] = t["dmg"]), t["armorPen"] !== void 0x0 && (n["armorPen"] = t["armorPen"]), t["rangeM"] !== void 0x0 && (n["range"] = t["rangeM"]), t["price"] !== void 0x0 && (n["price"] = t["price"]), t["reward"] !== void 0x0 && (n["reward"] = t["reward"]), t["runSpeed"] !== void 0x0 && (n["runSpeed"] = t["runSpeed"]))
}
function Po(e, t, n, r) {
  if (e["maxRange"] && t > e["maxRange"]) {
    return 0x0
  }
  if (e["class"] === "knife") {
    return e["dmg"]
  }
  let i = e["dmg"] * e["rangeMod"] ** +(t / Aa);
  if (n || r === "head") {
    i *= e["hs"] === void 0x0 ? Fi["head"] : e["hs"]
  } else {
    if (r === !0x0) {
      i *= Fi["leg"]
    } else {
      let e = Fi[r];
      e !== void 0x0 && (i *= e)
    }
  }
  return i
}
var Fo = class e {
  constructor(e) {
    this["game"] = e, this["slots"] = {
      0x1: null,
      0x2: null,
      0x3: "knife",
      0x5: null
    }, this["zeusOwned"] = !0x1, this["grenades"] = [], this["states"] = {}, this["current"] = "knife", this["pending"] = null, this["drawT"] = 0x0, this["nextFire"] = 0x0, this["reloadT"] = 0x0, this["reloading"] = !0x1, this["_reloadQueued"] = !0x1, this["lastShotT"] = -0xa, this["punch"] = sa(), this["acc"] = Ca(), this["_tickAcc"] = 0x0, this["punchP"] = 0x0, this["punchY"] = 0x0, this["shkP"] = 0x0, this["shkY"] = 0x0, this["shkR"] = 0x0, this["shkPV"] = 0x0, this["shkRV"] = 0x0, this["sprayP"] = 0x0, this["sprayY"] = 0x0, this["sprayIdx"] = 0x0, this["inaccFire"] = 0x0, this["scopeLevel"] = 0x0, this["charging"] = !0x1, this["chargeT"] = 0x0, this["grenadeCooking"] = !0x1, this["grenadeThrowT"] = 0x0, this["zeusRecharge"] = 0x0, this["shellT"] = 0x0, this["lastWeapon"] = "knife", this["vpP"] = 0x0, this["vpY"] = 0x0
  } ["def"]() {
    return V[this["current"]] || V["knife"]
  } ["state"](e) {
    if (e ||= this["current"], !this["states"][e]) {
      let t = V[e] || V["knife"];
      this["states"][e] = {
        ["ammo"]: t["mag"] === 0x1 / 0x0 ? 0x1 / 0x0 : t["mag"],
        ["reserve"]: t["reserve"]
      }
    }
    return this["states"][e]
  } ["give"](e) {
    let t = V[e];
    if (t) {
      if (t["class"] === "grenade") {
        return this["giveGrenade"](e)
      }
      this["slots"][t["slot"]] = e, this["states"][e] = {
        ["ammo"]: t["mag"],
        ["reserve"]: t["reserve"]
      }, this["equip"](e)
    }
  }
  static["NADE_PER_TYPE"] = 0x1;
  ["grenadeRoom"](t) {
    if (this["grenadeCount"]() >= Do["nadeTotal"]) {
      return !0x1
    }
    let n = t === "flash" ? Do["nadeFlash"] : e["NADE_PER_TYPE"];
    let r = this["grenades"]["find"](e => {
      return e["id"] === t
    });
    return !r || r["count"] < n
  } ["giveGrenade"](e) {
    if (!this["grenadeRoom"](e)) {
      return !0x1
    }
    let t = this["grenades"]["find"](t => {
      return t["id"] === e
    });
    return t ? t["count"]++ : this["grenades"]["push"]({
      ["id"]: e,
      ["count"]: 0x1
    }), !0x0
  } ["grenadeCount"]() {
    return this["grenades"]["reduce"]((e, t) => {
      return e + t["count"]
    }, 0x0)
  } ["hasWeapon"](e) {
    let t = V[e];
    if (!t) {
      return !0x1
    }
    if (t["class"] === "knife") {
      return !0x0
    }
    if (t["class"] === "grenade") {
      let t = this["grenades"]["find"](t => {
        return t["id"] === e
      });
      return !!(t && t["count"] > 0x0)
    }
    return t["class"] === "zeus" ? this["zeusOwned"] : t["slot"] === 0x1 || t["slot"] === 0x2 || t["slot"] === 0x5 ? this["slots"][t["slot"]] === e : !0x0
  } ["equip"](e) {
    if (!e || e === this["current"] || !V[e]) {
      return
    }
    this["grenadeCooking"] && (this["grenadeCooking"] = !0x1, this["grenadeUnder"] = !0x1, this["game"]["cs2"] && this["game"]["cs2"]["endCharge"] && this["game"]["cs2"]["endCharge"](.08), this["game"]["cs2"] && this["game"]["cs2"]["extinguishRagFire"] && this["game"]["cs2"]["extinguishRagFire"]());
    let t = V[e];
    if (t["slot"] === 0x1 || t["slot"] === 0x2) {
      if (this["slots"][t["slot"]] !== e) {
        return
      }
    } else {
      if (t["class"] === "grenade") {
        let t = this["grenades"]["find"](t => {
          return t["id"] === e
        });
        if (!t || t["count"] <= 0x0) {
          return
        }
      } else {
        if (t["class"] === "zeus") {
          if (!this["zeusOwned"]) {
            return
          }
        } else {
          if (t["slot"] === 0x5 && this["slots"][0x5] !== e) {
            return
          }
        }
      }
    }
    this["lastWeapon"] = this["current"], this["current"] = e, this["reloading"] = !0x1, this["_reloadQueued"] = !0x1, this["charging"] = !0x1, this["_deploy"](e, t)
  } ["_deploy"](e, t) {
    this["punch"]["index"] = 0x0, this["punch"]["lastShot"] = -0xa, this["sprayIdx"] = 0x0, this["sprayP"] = 0x0, this["sprayY"] = 0x0, this["vpP"] = 0x0, this["vpY"] = 0x0, this["punch"]["vpPitch"] = 0x0, this["punch"]["vpYaw"] = 0x0, this["punch"]["vpVelPitch"] = 0x0, this["punch"]["vpVelYaw"] = 0x0, this["setScope"](0x0, !0x0), this["drawT"] = V[e]["draw"] || .6, this["game"]["audio"]["prefetch"](e), this["game"]["cs2"] && this["game"]["cs2"]["_useCasing"] && this["game"]["cs2"]["_useCasing"](e, t["class"]);
    let n = this["game"]["cs2"];
    let r = Ha(e, this["game"]["player"]["team"]);
    this["_pendingDraw"] = null, n && Ia(r) ? (this["_pendingDraw"] = e, this["_pendingDrawAt"] = this["game"]["time"]) : this["playDrawSound"](e, t), n && n["rig"] && n["rig"]["weaponId"] === r && n["has"] && n["has"]("draw") && n["play"]("draw", {
      ["fade"]: 0x0,
      ["idleAfter"]: "idle"
    }), this["game"]["viewmodel"]["setWeapon"](e), this["game"]["hud"]["updateWeapon"]()
  } ["playDrawSound"](t, n) {
    if (n ||= V[t], n) {
      if (n["class"] === "knife") {
        let t = this["game"]["player"]["team"] === "T" ? "knife_draw_t" : "knife_draw";
        this["game"]["audio"]["play"](t, {
          ["gain"]: e["drawGain"](this["game"]["audio"], t)
        })
      } else {
        this["game"]["audio"]["playWeapon"]("draw", t, {
          ["gain"]: e["drawGain"](this["game"]["audio"], "draw_" + t)
        })
      }
    }
  }
  static["drawGain"](t, n) {
    if (!t["bank"]["has"](n)) {
      return e["DRAW_GEAR_GAIN"]
    }
    let r = t["eventGain"](n);
    return Math["max"]((r || 0x0) * e["DRAW_VOL"], e["DRAW_MIN"])
  } ["drawStarted"]() {
    let e = this["_pendingDraw"];
    e && (this["_pendingDraw"] = null, this["playDrawSound"](e, V[e]))
  } ["redeploy"]() {
    let e = this["def"]();
    !e || this["drawT"] > 0x0 || this["_deploy"](this["current"], e)
  } ["equipSlot"](e) {
    if (e === 0x4) {
      if (!this["grenades"]["length"]) {
        return
      }
      let e = this["grenades"]["findIndex"](e => {
        return e["id"] === this["current"]
      });
      let t = this["grenades"][(e + 0x1) % this["grenades"]["length"]];
      this["equip"](t["id"]);
      return
    }
    if (e === 0x3) {
      this["equip"](this["current"] === "knife" && this["zeusOwned"] ? "zeus" : "knife");
      return
    }
    this["slots"][e] && this["equip"](this["slots"][e])
  } ["setScope"](e, t) {
    let n = this["scopeLevel"];
    this["scopeLevel"] = e;
    let r = this["def"]();
    let i = e > 0x0 && r["zoom"] ? r["zoom"][e - 0x1] : this["game"]["baseFov"];
    this["game"]["setFov"](i, e > 0x0), !t && r["zoom"] && e !== n && this["game"]["audio"]["playWeapon"](e > 0x0 ? "zoom_in" : "zoom_out", this["current"])
  } ["maxSpeed"]() {
    let e = this["def"]();
    return this["scopeLevel"] > 0x0 && e["zoomSpeed"] ? e["zoomSpeed"] : e["runSpeed"] || 6.35
  } ["_accState"](e) {
    let t = this["game"]["player"];
    let n = this["_accSt"] ||= {};
    return n["onGround"] = !!t["onGround"], n["onLadder"] = !!t["onLadder"], n["ducking"] = !!(t["crouching"] && t["onGround"]), n["reloading"] = !!this["reloading"], n["zoomed"] = this["scopeLevel"] > 0x0, n["walking"] = !!t["walking"], n["speed"] = Math["hypot"](t["vx"], t["vz"]), n["velY"] = t["vy"] || 0x0, n["recoilIndex"] = this["punch"]["index"] | 0x0, n
  } ["spread"]() {
    let e = this["def"]();
    if (e["class"] === "knife" || e["class"] === "zeus" || e["class"] === "grenade" || e["class"] === "c4") {
      return 0x0
    }
    let t = e["cs2"];
    return t ? Ea(this["acc"], t, this["_accState"](t)) : e["sBase"] || 0x0
  } ["restingSpread"]() {
    let e = this["def"]();
    let t = e && e["cs2"];
    if (!t) {
      return 0x0
    }
    let n = this["scopeLevel"] > 0x0;
    let r = this["game"]["player"];
    return Sa(r && r["crouching"] && r["onGround"] ? t["inaccCrouch"] : t["inaccStand"], n) * z["STAND"] + Sa(t["spread"], n)
  } ["crosshairSpread"]() {
    let e = this["def"]();
    let t = e && e["cs2"];
    return t ? this["spread"]() + Sa(t["spread"], this["scopeLevel"] > 0x0) : this["spread"]()
  } ["cycleTime"]() {
    let e = this["def"]();
    return e["cycleTime"] == null ? e["rpm"] ? 0x3c / e["rpm"] : .1 : e["cycleTime"]
  } ["update"](e, t) {
    let n = this["game"];
    let r = n["time"];
    (!V[this["current"]] || !this["hasWeapon"](this["current"])) && (this["current"] = this["slots"][0x1] || this["slots"][0x2] || "knife", this["lastWeapon"] = null, n["viewmodel"]["setWeapon"](this["current"]), this["_deploy"](this["current"], V[this["current"]]), n["hud"]["updateWeapon"]());
    let i = this["def"]();
    let a = this["state"]();
    if (this["drawT"] > 0x0 && (this["drawT"] -= e), this["_pendingDraw"] && r - (this["_pendingDrawAt"] || 0x0) > 0x4) {
      let e = this["_pendingDraw"];
      this["_pendingDraw"] = null, this["playDrawSound"](e, V[e])
    }
    this["zeusRecharge"] > 0x0 && (this["zeusRecharge"] -= e, this["zeusRecharge"] <= 0x0 && this["zeusOwned"] && (this["state"]("zeus")["ammo"] = 0x1, n["hud"]["updateWeapon"](), n["audio"]["play"]("bolt_zeus")));
    {
      let t = i && i["cs2"];
      {
        let n = t ? this["_accState"](t) : null;
        this["_tickAcc"] += e;
        let i = 0x0;
        for (; this["_tickAcc"] >= Ao && i++ < 0x10;) {
          this["_tickAcc"] -= Ao, t && Ta(this["acc"], t, n, Ao, this["punch"]["index"]), ua(this["punch"], Ao), da(this["punch"], this["cycleTime"](), r, Ao)
        }
        i >= 0x10 && (this["_tickAcc"] = 0x0);
        let a = fa(this["punch"]);
        this["punchP"] = -a["pitch"], this["punchY"] = a["yaw"], this["shkP"] = -this["punch"]["viewPitch"] * ko, this["shkY"] = this["punch"]["viewYaw"] * ko, this["sprayIdx"] = this["punch"]["index"];
        {
          let tx = this["punchP"], ty = this["punchY"];
          let ac = VP_OMEGA * VP_OMEGA * (tx - this["punch"]["vpPitch"]) - 0x2 * VP_OMEGA * this["punch"]["vpVelPitch"];
          let ay = VP_OMEGA * VP_OMEGA * (ty - this["punch"]["vpYaw"]) - 0x2 * VP_OMEGA * this["punch"]["vpVelYaw"];
          this["punch"]["vpVelPitch"] += ac * Ao, this["punch"]["vpVelYaw"] += ay * Ao;
          this["punch"]["vpPitch"] += this["punch"]["vpVelPitch"] * Ao, this["punch"]["vpYaw"] += this["punch"]["vpVelYaw"] * Ao;
          this["vpP"] = this["punch"]["vpPitch"], this["vpY"] = this["punch"]["vpYaw"]
        }
      }
    }
    this["shkPV"] -= this["shkPV"] * 0xe * e, this["shkRV"] -= this["shkRV"] * 0xe * e, Math["abs"](this["shkPV"]) < .01 && (this["shkPV"] = 0x0), Math["abs"](this["shkRV"]) < .01 && (this["shkRV"] = 0x0);
    for (let e = 0x1; e <= 0x5; e++) {
      t["wasPressed"](jo[e - 0x1]) && this["equipSlot"](e)
    }
    if (t["wasPressedA"]("lastweapon")) {
      let e = this["current"];
      if (this["equip"](this["lastWeapon"]), this["current"] === e) {
        let t = [this["slots"][0x1], this["slots"][0x2], "knife"]["find"](t => {
          return t && t !== e
        });
        t && this["equip"](t)
      }
    }
    if (t["wheel"] !== 0x0) {
      let e = [this["slots"][0x1], this["slots"][0x2], "knife", this["zeusOwned"] ? "zeus" : null, ...this["grenades"]["map"](e => {
        return e["id"]
      }), this["slots"][0x5]]["filter"](Boolean);
      let n = e["indexOf"](this["current"]);
      n = (n + (t["wheel"] > 0x0 ? 0x1 : -0x1) + e["length"]) % e["length"], this["equip"](e[n])
    }
    if (this["drawT"] > 0x0) {
      t["wasPressedA"]("reload") && (this["_reloadQueued"] = !0x0), i["class"] === "grenade" ? (t["mouse1Pressed"] || t["wasPressedA"]("aim")) && (this["_cookQueued"] = !0x0) : this["_cookQueued"] = !0x1;
      return
    }
    let o = i["class"] === "knife" || i["class"] === "zeus" || i["class"] === "grenade";
    if (!(this["reloading"] || this["scopeLevel"] > 0x0 || this["grenadeCooking"] || n["time"] < this["nextFire"]) && (t["wasPressedA"]("inspect") || t["touchPressed"]["has"]("reload") && (o || a["ammo"] >= i["mag"])) && (n["viewmodel"]["inspect"](), n["cs2"] && n["cs2"]["inspect"] && n["cs2"]["inspect"]({
        ["deploying"]: this["drawT"] > 0x0
      })), this["reloading"]) {
      if (this["reloadT"] -= e, i["shellReload"]) {
        this["reloadT"] <= 0x0 && (a["ammo"]++, a["reserve"]--, n["audio"]["playWeapon"]("clipin", this["current"]), a["ammo"] >= i["mag"] || a["reserve"] <= 0x0 || t["mouse1"] && !n["frozen"] ? this["reloading"] = !0x1 : this["reloadT"] += i["reload"], n["hud"]["updateWeapon"]())
      } else {
        if (!this["_reloadFilled"] && this["reloadT"] <= (this["_reloadFillLeft"] || 0x0)) {
          this["_reloadFilled"] = !0x0;
          let e = i["mag"] - a["ammo"];
          let t = Math["min"](e, a["reserve"]);
          a["ammo"] += t, a["reserve"] -= t, n["hud"]["updateWeapon"]()
        }
        this["reloadT"] <= 0x0 && (this["reloading"] = !0x1, this["_clipDrivenReload"] || n["audio"]["playWeapon"]("clipin", this["current"]), this["_clipDrivenReload"] = !0x1, n["hud"]["updateWeapon"]())
      }
      return
    }
    if ((t["wasPressedA"]("reload") || this["_reloadQueued"]) && (this["_reloadQueued"] = !0x1, a["ammo"] < i["mag"] && a["reserve"] > 0x0 && i["class"] !== "knife" && i["class"] !== "zeus")) {
      this["startReload"]();
      return
    }
    if (!n["frozen"]) {
      if (i["class"] === "c4") {
        t["mouse1"] && n["modeCtl"] && (n["modeCtl"]["plantHeld"] = !0x0);
        return
      }
      if (i["class"] === "grenade") {
        let e = t["downA"]("aim");
        let r = t["mouse1Pressed"] || t["wasPressedA"]("aim");
        let i = this["_cookQueued"] && (t["mouse1"] || e);
        if (this["_cookQueued"] = !0x1, (r || i) && !this["grenadeCooking"] && (this["grenadeCooking"] = !0x0, this["grenadeUnder"] = r ? !t["mouse1Pressed"] && e : !t["mouse1"] && e, n["viewmodel"]["pullPin"](), n["cs2"] && n["cs2"]["play"] && n["cs2"]["play"]("pullpin", {
            ["fade"]: .05,
            ["idleAfter"]: null
          })), this["grenadeCooking"] && n["cs2"] && n["cs2"]["charge"]) {
          let e = Math["PI"] / 0x2 - .01;
          n["cs2"]["charge"](.5 + n["player"]["pitch"] / (0x2 * e))
        }
        this["grenadeCooking"] && !t["mouse1"] && !e && this["throwGrenade"]();
        return
      }
      if (t["wasPressedA"]("aim") && i["zoom"]) {
        let e = (this["scopeLevel"] + 0x1) % (i["zoom"]["length"] + 0x1);
        this["setScope"](e)
      }
      if (i["chargeTime"]) {
        t["mouse1"] && !this["charging"] && r >= this["nextFire"] && a["ammo"] > 0x0 && (this["charging"] = !0x0, this["chargeT"] = i["chargeTime"], n["audio"]["playWeapon"]("bolt", this["current"])), this["charging"] && (this["chargeT"] -= e, this["chargeT"] <= 0x0 && (this["charging"] = !0x1, this["fire"]()));
        return
      }
      if (i["class"] === "knife") {
        (t["mouse1"] || t["mouse1Pressed"]) && r >= this["nextFire"] ? this["knifeAttack"](!0x1) : t["wasPressedA"]("aim") && r >= this["nextFire"] && this["knifeAttack"](!0x0);
        return
      }
      if (i["class"] === "zeus") {
        t["mouse1Pressed"] && r >= this["nextFire"] && a["ammo"] > 0x0 && this["zeusAttack"]();
        return
      }
      if ((i["auto"] ? t["mouse1"] : t["mouse1Pressed"]) && r >= this["nextFire"]) {
        if (a["ammo"] <= 0x0) {
          t["mouse1Pressed"] && (n["audio"]["play"](i["class"] === "pistol" ? "dry_pistol" : "dry"), a["reserve"] > 0x0 && this["startReload"]());
          return
        }
        this["fire"]()
      }
    }
  } ["clearViewPunch"]() {
    this["punchP"] = 0x0, this["punchY"] = 0x0, this["shkP"] = 0x0, this["shkY"] = 0x0, this["shkR"] = 0x0, this["shkPV"] = 0x0, this["shkRV"] = 0x0, this["sprayP"] = 0x0, this["sprayY"] = 0x0, this["vpP"] = 0x0, this["vpY"] = 0x0, this["punch"] && (this["punch"]["aimPitch"] = 0x0, this["punch"]["aimYaw"] = 0x0, this["punch"]["velPitch"] = 0x0, this["punch"]["velYaw"] = 0x0, this["punch"]["viewPitch"] = 0x0, this["punch"]["viewYaw"] = 0x0, this["punch"]["index"] = 0x0, this["punch"]["lastShot"] = -0x3b9aca00, this["punch"]["vpPitch"] = 0x0, this["punch"]["vpYaw"] = 0x0, this["punch"]["vpVelPitch"] = 0x0, this["punch"]["vpVelYaw"] = 0x0)
  } ["startReload"]() {
    let e = this["def"]();
    let t = this["state"]();
    let n = t["ammo"] <= 0x0;
    this["reloading"] = !0x0, this["setScope"](0x0), this["reloadT"] = e["reload"];
    let r = Math["min"](e["mag"] - t["ammo"], t["reserve"]);
    let i = e["shellReload"] ? Math["max"](e["reload"], r * e["reload"]) : e["reload"];
    let a = this["game"]["cs2"];
    let o = !!(a && a["hasClipEvents"] && a["hasClipEvents"](this["current"], n));
    this["_clipDrivenReload"] = o;
    let s = a && a["reloadFillTime"] && !e["shellReload"] ? a["reloadFillTime"](this["current"], n, i) : null;
    if (this["_reloadFillLeft"] = s == null ? 0x0 : Math["max"](0x0, i - s), this["_reloadFilled"] = !0x1, o || (this["game"]["audio"]["playWeapon"]("clipout", this["current"]), e["shellReload"] || setTimeout(() => {
        this["reloading"] && this["game"]["state"] === "playing" && this["game"]["audio"]["playWeapon"]("bolt", this["current"])
      }, e["reload"] * 0x258)), this["game"]["viewmodel"]["reload"](e["reload"]), a && a["playTimed"]) {
      let e = n && a["has"]("reload_empty") ? "reload_empty" : "reload";
      a["playTimed"](e, i, {
        ["idleAfter"]: "idle"
      })
    }
    this["game"]["hud"]["updateWeapon"]()
  } ["fire"]() {
    let e = this["game"];
    let t = this["def"]();
    let n = this["state"]();
    if (n["ammo"]--, e["cs2"] && e["cs2Ready"] && e["cs2"]["play"]) {
      let r = n["ammo"] <= 0x0;
      let i = r && e["cs2"]["has"]("idle_empty") ? "idle_empty" : "idle";
      let a;
      t["vm"] && t["vm"]["dual"] ? (this["_dualLeft"] = !this["_dualLeft"], a = this["_dualLeft"] ? "shoot_left" : "shoot", n["ammo"] <= 0x1 && e["cs2"]["has"](a + "_last") && (a += "_last")) : a = r && e["cs2"]["has"]("shoot_empty") ? "shoot_empty" : "shoot", e["cs2"]["play"](a, {
        ["fade"]: .02,
        ["idleAfter"]: i
      })
    }
    this["nextFire"] = e["time"] + (t["boltTime"] ? t["boltTime"] : this["cycleTime"]()), this["lastShotT"] = e["time"];
    let r = t["cs2"];
    let i = this["scopeLevel"] > 0x0;
    let a = +!!i;
    let o = r && Sa(r["bullets"], !0x1) || t["pellets"] || 0x1;
    if (r) {
      let n = this["spread"]();
      let s = Sa(r["spread"], i);
      let c = ka(r["spreadSeed"] ? (r["spreadSeed"] + (this["punch"]["index"] | 0x0)) | 0x0 : Math["random"]() * 0x7fffffff | 0x0, n, s, o, {
        ["negev"]: t["id"] === "negev",
        ["recoilIndex"]: this["punch"]["index"] | 0x0,
        ["r8Secondary"]: !0x1
      });
      for (let n = 0x0; n < c["length"]; n++) {
        e["playerShoot"](t, c[n]["x"], c[n]["y"])
      }
      Da(this["acc"], r, this["_accState"](r), e["time"]);
      let l = r["fullAuto"] ? this["punch"]["index"] | 0x0 : Math["random"]() * 0x40 | 0x0;
      let u = oa(t["id"], a, l);
      u && ca(this["punch"], u["angle"], u["magnitude"]), this["punch"]["index"] += 0x1, this["punch"]["lastShot"] = e["time"]
    } else {
      let n = this["spread"]();
      for (let r = 0x0; r < o; r++) {
        let r = Math["random"]() * Math["PI"] * 0x2;
        let i = Math["min"](0x1, Math["sqrt"](-0x2 * Math["log"](0x1 - Math["random"]() * .999999)) * VP_SIGMA) * n;
        e["playerShoot"](t, Math["cos"](r) * i, Math["sin"](r) * i)
      }
    }
    e["audio"]["play"](t["sound"]), e["viewmodel"]["kick"](t);
    {
      let n = e["player"];
      let r = -Math["sin"](n["yaw"]);
      let i = -Math["cos"](n["yaw"]);
      let a = Math["cos"](n["yaw"]);
      let o = -Math["sin"](n["yaw"]);
      t["silenced"] || e["effects"]["flashLight"](n["x"] + r * 1.2, n["y"] + n["eyeH"] - .1, n["z"] + i * 1.2);
      let s = fo(this["current"], t["class"]);
      if (s) {
        let c = this["current"];
        let l = po(c);
        let u = !!(e["viewmodel"] && e["viewmodel"]["_twinLeft"]);
        let d = () => {
          if (!n["alive"]) {
            return
          }
          let l = e["cs2"];
          if (l && l["rig"] && l["rig"]["weaponId"] && l["rig"]["weaponId"] !== c) {
            return
          }
          let d = l && l["shellPort"] && !e["spectating"] ? l["shellPort"](u, e["camera"]) : null;
          d ? e["effects"]["ejectCasing"](s, d["p"]["x"], d["p"]["y"], d["p"]["z"], d["f"]["x"], d["f"]["y"], d["f"]["z"], d["l"]["x"], d["l"]["y"], d["l"]["z"], d["u"]["x"], d["u"]["y"], d["u"]["z"]) : e["effects"]["ejectFromGun"](c, t["class"], n["x"] + r * .35 + a * .22, n["y"] + n["eyeH"] - .16, n["z"] + i * .35 + o * .22, r, 0x0, i, u)
        };
        l > 0x0 ? setTimeout(d, l * 0x3e8) : d()
      }
    }
    e["hud"]["updateWeapon"](), e["noise"](t["silenced"] ? 0xc : 0x2d), t["boltTime"] && (this["setScope"](0x0), setTimeout(() => {
      e["state"] === "playing" && e["audio"]["playWeapon"]("bolt", this["current"])
    }, 0x15e)), n["ammo"] === 0x0 && n["reserve"] > 0x0 && t["class"] !== "sniper" && setTimeout(() => {
      this["state"]()["ammo"] === 0x0 && !this["reloading"] && this["def"]() === t && this["startReload"]()
    }, 0xfa)
  }
  static["KNIFE_GAIN"] = .6;
  static["DRAW_VOL"] = 1.6;
  static["DRAW_MIN"] = .4;
  static["DRAW_GEAR_GAIN"] = .8;
  static["ZEUS_GAIN"] = .6;
  static["HE_PIN_GAIN"] = .8;
  static["KNIFE_DMG"] = {
    ["slash"]: 0x28,
    ["slashBack"]: 0x5a,
    ["stab"]: 0x41,
    ["stabBack"]: 0xb4
  };
  ["knifeAttack"](t) {
    let n = this["game"];
    this["nextFire"] = n["time"] + (t ? 0x1 : .5), n["audio"]["play"](t ? "knife_swing_heavy" : "knife_swing", {
      ["gain"]: e["KNIFE_GAIN"]
    }), n["viewmodel"]["slash"](t), n["cs2"] && n["cs2"]["play"] && (this["_slashAlt"] = !this["_slashAlt"], n["cs2"]["play"](t ? "stab" : this["_slashAlt"] ? "slash" : "slash2", {
      ["fade"]: .04,
      ["idleAfter"]: "idle"
    }));
    let r = e["KNIFE_DMG"];
    n["playerMelee"](t ? r["stab"] : r["slash"], V["knife"], t ? r["stabBack"] : r["slashBack"], t)
  } ["zeusAttack"]() {
    let t = this["game"];
    let n = this["state"]();
    n["ammo"] = 0x0, this["zeusRecharge"] = V["zeus"]["rechargeTime"], this["nextFire"] = t["time"] + 0x2, t["audio"]["play"](V["zeus"]["sound"], {
      ["gain"]: e["ZEUS_GAIN"]
    }), t["cs2"] && t["cs2Ready"] && t["cs2"]["play"] && t["cs2"]["has"]("shoot") && t["cs2"]["play"]("shoot", {
      ["fade"]: .02,
      ["idleAfter"]: "idle"
    }), t["viewmodel"]["kick"](V["zeus"]), t["zeusShot"] ? t["zeusShot"]() : t["playerMelee"](0x1f4, V["zeus"]), t["hud"]["updateWeapon"]()
  } ["throwGrenade"]() {
    let e = this["game"];
    let t = this["current"];
    this["grenadeCooking"] = !0x1, this["game"]["cs2"] && this["game"]["cs2"]["endCharge"] && this["game"]["cs2"]["endCharge"](.05);
    let n = this["grenades"]["find"](e => {
      return e["id"] === t
    });
    if (!(!n || n["count"] <= 0x0)) {
      if (n["count"]--, n["count"] <= 0x0 && this["grenades"]["splice"](this["grenades"]["indexOf"](n), 0x1), e["audio"]["playWeapon"]("toss", t), e["voice"] && e["voice"]["say"](e["player"], {
          ["he"]: "grenade",
          ["flash"]: "flashbang",
          ["smoke"]: "smoke",
          ["molotov"]: "molotov",
          ["incend"]: "molotov",
          ["decoy"]: "decoy"
        } [t] || "grenade", {
          ["force"]: !0x0
        }), e["viewmodel"]["throwAnim"](), e["cs2"] && e["cs2"]["play"]) {
        let t = this["grenadeUnder"] && e["cs2"]["has"]("throw_under");
        e["cs2"]["play"](t ? "throw_under" : "throw", {
          ["fade"]: .04,
          ["idleAfter"]: "idle"
        })
      }
      this["grenadeUnder"] = !0x1, e["cs2"] && e["cs2"]["extinguishRagFire"] && e["cs2"]["extinguishRagFire"](), e["throwGrenade"](t), setTimeout(() => {
        if (this["current"] === t) {
          let e = this["grenades"]["find"](e => {
            return e["id"] === t
          });
          this["current"] = "nothing_tmp", this["equip"](e ? t : this["slots"][0x1] || this["slots"][0x2] || "knife")
        }
        e["hud"]["updateWeapon"]()
      }, 0x190)
    }
  }
};var ko = .0174533;
var Ao = 0x1 / 0x40;
var jo = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5"];

export { Mi, Fi, z, Li, Ri, zi, Bi, Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i, ea, ta, na, ra, ia, aa, oa, sa, ca, la, ua, da, fa, pa, ma, ha, ga, _a, va, ya, ba, xa, Sa, Ca, wa, Ta, Ea, Da, Oa, ka, ko, Ao, jo, Aa, ja, Xa, V, Po, Fo };
