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
  return JSON.parse(out);
}

const keywords = decode(d, k);
console.log('gato media =', keywords.gato);
console.log('has imgs path =', String(keywords.gato?.media || '').includes('imgs/'));
