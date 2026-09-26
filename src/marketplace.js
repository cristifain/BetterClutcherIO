// ============================================================================
// marketplace.js - Marketplace catalog (UI mirror).
//
// The SERVER is the authority for prices, ownership and case rolls (see
// betterclutcher-server/src/index.js -> MARKET_CASES; the crate ids here MUST
// stay in sync with that table). This module only describes what the menu
// displays: three hardcoded crates picked from cases.js plus the Universal
// Key, everything priced in Tokens.
// ============================================================================
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
  .map(c => ({ id: c.id, name: c.name, icon: "ui/cases/" + c.icon + ".webp" }));

export var UNIKEY = { id: "unikey", name: "Universal Key", icon: "ui/cases/unikey.png", price: MARKET_PRICE };
