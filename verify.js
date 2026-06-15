const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const d = html.match(/const _d = "([^"]+)";/)[1];
const k = html.match(/const _k = "([^"]+)";/)[1];

function decode(encoded, key) {
  const raw = Buffer.from(encoded, 'base64');
  const out = Buffer.alloc(raw.length);
  for (let i = 0; i < raw.length; i++) {
    out[i] = raw[i] ^ key.charCodeAt(i % key.length);
  }
  return JSON.parse(out.toString('utf8'));
}

const keywords = decode(d, k);
console.log('gato media =', keywords.gato);
console.log('has imgs path =', String(keywords.gato?.media || '').includes('imgs/'));
