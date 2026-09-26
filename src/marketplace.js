// marketplace.js

import { cases as allCases } from "./cases.js";

export var MARKET_PRICE = 10; // tokens per case, per Universal Key

var byId = id => {
  for (var c of allCases) {
    if (c.id === id) return c
  }
  return null

};

export var MARKET_CASES = ["crate_valve_1", "crate_esports_2013", "crate_valve_2"]
  .map(id => byId(id))
  .filter(Boolean)
  .map(c => Object.assign({}, c, { iconUrl: "ui/cases/" + c.icon + ".webp" }));

export var UNIKEY = { id: "unikey", name: "Universal Key", icon: "ui/cases/unikey.png", price: MARKET_PRICE };
