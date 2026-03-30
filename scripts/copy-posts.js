const fs = require('fs');
const path = require('path');

const src = 'content/posts';
const dest = '.open-next/server-functions/default/content/posts';

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

fs.readdirSync(src).forEach(f => {
  fs.copyFileSync(path.join(src, f), path.join(dest, f));
});

console.log('Copied posts to', dest);
