const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('test_'));

let missing = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/src="([^"]+)"/g) || [];
  matches.forEach(m => {
    let src = m.replace('src="', '').replace('"', '');
    if (src.startsWith('http') || src.startsWith('data:')) return;
    if (src.endsWith('.js')) return; // script tags
    
    // Check if file exists
    const localPath = path.resolve(src);
    if (!fs.existsSync(localPath)) {
      console.warn(`[${file}] Missing image: ${src} -> ${localPath}`);
      missing++;
    }
  });
});

if (missing === 0) {
  console.log('>>> ALL STATIC IMAGES EXIST ON DISK! <<<');
} else {
  console.log(`Total missing: ${missing}`);
}
