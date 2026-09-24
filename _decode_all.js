const fs = require('fs');
const src = fs.readFileSync('src/main.js', 'utf8');

// Extract from "function __p_nino_bufferToString" up to just after the array declaration
const arrStart = src.indexOf('var __p_V5bL_array = ');
let arrEnd = src.indexOf('";\n', arrStart);
if (arrEnd === -1) arrEnd = src.indexOf('";\r\n', arrStart);
arrEnd += 3;
const arrDecl = src.slice(arrStart, arrEnd);
const bt = src.match(/function __p_nino_bufferToString\(buffer\) \{[\s\S]*?\n\}/)[0];
let head = arrDecl + '\n' + bt;
if (!head.includes('utf8ArrayToStr')) {
  const m = src.match(/function utf8ArrayToStr[\s\S]*?\n\}/);
  if (m) head = m[0] + '\n' + head;
}
// grab utf8ArrayToStr if defined elsewhere before
if (!head.includes('utf8ArrayToStr')) {
  const m = src.match(/function utf8ArrayToStr[\s\S]*?\n\}/);
  if (m) head = m[0] + '\n' + head;
}
const dec1 = src.match(/function __p_KGFS_MAIN_STR_decode\(str\) \{[\s\S]*?\n\}/)[0];
const dec2 = src.match(/function __p_KGFS_MAIN_STR\(start, length\) \{[\s\S]*?\n\}/)[0];

const sandboxCode = 'function utf8ArrayToStr(b){return Buffer.from(b).toString("utf8")}\n' + head + '\n' + dec1 + '\n' + dec2 + '\nmodule.exports = { S: __p_KGFS_MAIN_STR };';
fs.writeFileSync('_dec.js', sandboxCode);
const { S } = require('./_dec.js');

const calls = [...src.matchAll(/__p_KGFS_MAIN_STR\((0x[0-9a-f]+),\s*(0x[0-9a-f]+)\)/g)];
const seen = new Map();
for (const [, a, b] of calls) {
  const k = a + ',' + b;
  if (!seen.has(k)) {
    let v;
    try { v = S(Number(a), Number(b)); } catch (e) { v = 'ERR ' + e.message; }
    seen.set(k, v);
  }
}
for (const [k, v] of seen) console.log(k, '=>', JSON.stringify(v));
