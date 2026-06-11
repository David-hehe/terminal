const fs = require('fs');
const { execFileSync } = require('child_process');

const out = execFileSync('node', ['encode.js'], { encoding: 'utf8' });
const match = out.match(/"([^"]+)"/);

if (!match) {
  throw new Error('Não foi possível localizar a string codificada no output do encode.js');
}

const encoded = match[1];
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/const _d = ".*?";/, `const _d = "${encoded}";`);
fs.writeFileSync('index.html', html);

console.log('ATUALIZADO _d com', encoded.length, 'caracteres');
