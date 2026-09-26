-- ============================================================================
-- BetterClutcher account database - Cloudflare D1 (SQLite)
-- Apply with (run from betterclutcher-server/, where wrangler.toml lives):
--   npx wrangler d1 execute betterclutcher-db --file=../_server/schema.sql --remote
--
-- DESIGN NOTES
-- ------------
-- * One account = one row in `users`. Storage budget: < 1MB per player even
--   when owning EVERY skin - inventory is compact JSON (skin ids are ~20
--   chars, so even 2,000 owned finishes is ~40KB), never rows-per-skin.
-- * Usernames are CASE-INSENSITIVE identities: `username` keeps the display
--   casing chosen at registration, `username_lower` (UNIQUE) is what login
--   and lookups use. "test" and "TeSt" are the same account - same password,
--   same tokens, same inventory.
-- * `tokens` is the account currency (the renamed "Coins"). New accounts
--   start with 20.
-- * `items` is the authoritative owned-cosmetics list: JSON array of skin
--   finish ids (the game's own ids from cases.js / the paint table, e.g.
--   "ak47_cu_m4a1_howling") - covers weapon skins AND knife finishes. The
--   SERVER owns this list; the client only displays it.
-- * `equipped` is a JSON map {weaponId: skinId}; the server validates on
--   every write that each skin is actually owned.
-- * `cases` is a JSON map {crateId: count} of unopened cases; `keys` counts
--   Universal Keys. Opening a case consumes one case + one key and the ROLL
--   happens server-side (the client never picks the reward).
-- * `sessions` backs the persistent browser login ("stay logged in"): the
--   client keeps a random bearer token in localStorage; the server stores
--   only its SHA-256 hash, so a DB leak never leaks usable sessions.
-- * `gun_stickers` is RESERVED for future per-gun sticker data. It is keyed
--   per GUN INSTANCE (gun_uid), not per weapon type, with one slot per
--   sticker position (CS2 guns have up to 5) and wear/rotation/scale columns
--   already in place.
-- ============================================================================

DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS gun_stickers;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  username       TEXT    NOT NULL,             -- display casing, set at register
  username_lower TEXT    NOT NULL UNIQUE,      -- case-insensitive identity ("test" == "TeSt")
  pass_hash      TEXT    NOT NULL,             -- "pbkdf2:<iterations>:<salt_b64>:<hash_b64>"
  tokens         INTEGER NOT NULL DEFAULT 20,  -- account currency (formerly "Coins"); start = 20
  items          TEXT    NOT NULL DEFAULT '[]',    -- owned skins + knife finishes (JSON array of ids)
  equipped       TEXT    NOT NULL DEFAULT '{}',    -- {weaponId: skinId}, validated against items
  cases          TEXT    NOT NULL DEFAULT '{}',    -- unopened cases {crateId: count}
  keys           INTEGER NOT NULL DEFAULT 0,       -- Universal Keys
  created_at     INTEGER NOT NULL,                 -- unix ms
  updated_at     INTEGER NOT NULL                  -- unix ms
);

CREATE TABLE sessions (
  token_hash TEXT    PRIMARY KEY,              -- sha-256 hex of the bearer token
  user_id    INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  last_seen  INTEGER NOT NULL
);
CREATE INDEX idx_sessions_user ON sessions(user_id);

-- RESERVED: per-gun sticker data (one row per sticker slot per gun instance)
CREATE TABLE gun_stickers (
  user_id    INTEGER NOT NULL,
  gun_uid    TEXT    NOT NULL,                 -- per-gun instance key (future inventory system)
  slot       INTEGER NOT NULL,                 -- sticker slot on the gun (0..4)
  sticker_id INTEGER,                          -- sticker item id (NULL = empty slot)
  wear       REAL,                             -- reserved: scrape/wear 0..1
  rotation   REAL,                             -- reserved: sticker rotation
  scale      REAL,                             -- reserved: sticker scale
  PRIMARY KEY (user_id, gun_uid, slot)
);
CREATE INDEX idx_gun_stickers_gun ON gun_stickers(user_id, gun_uid);
