const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const d = html.match(/const _d = "([^"]+)";/)[1];
const k = html.match(/const _k = "([^"]+)";/)[1];

function decode(encoded, key) {
  const raw = Buffer.from(encoded, 'base64').toString('binary');
  let out = '';
  for (let i = 0; i < raw.length; i++) {
    out += String.fromCharCode(raw.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return out;
}

const s = decode(d, k);
console.log('LEN', s.length);
try {
  JSON.parse(s);
  console.log('JSON_OK');
} catch (e) {
  const m = e.message.match(/position (\d+)/);
  const pos = Number(m && m[1] ? m[1] : 0);
  console.log('ERR', e.message);
  console.log('POS', pos);
  console.log('CHAR_CODE', s.charCodeAt(pos));
  console.log('NEAR', JSON.stringify(s.slice(Math.max(0, pos - 60), pos + 120)));
  const bad = [];
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c < 32 && c !== 9 && c !== 10 && c !== 13) bad.push([i, c]);
  }
  console.log('BAD_CTRL_COUNT', bad.length);
  console.log('BAD_CTRL_SAMPLE', bad.slice(0, 50));
}
