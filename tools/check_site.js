const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('test_'));
console.log('Analyzing HTML files:', files);

let hasError = false;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check empty divs that might be leftovers
  const emptyDivs = content.match(/<div[^>]*>\s*<\/div>/g);
  if (emptyDivs) {
    console.log(`[${file}] Found empty divs:`, emptyDivs);
  }

  // Check data-wa="1" or empty href
  if (content.includes('data-wa="1"') || content.includes('href=""') || content.includes('href="#"')) {
    console.warn(`[${file}] Warning: found placeholder data-wa or empty href`);
    hasError = true;
  }

  // Check header, footer and waWidget
  if (!content.includes('id="siteHeader"')) {
    console.warn(`[${file}] Missing static siteHeader!`);
    hasError = true;
  }
  if (!content.includes('id="siteFooter"')) {
    console.warn(`[${file}] Missing static siteFooter!`);
    hasError = true;
  }
  if (!content.includes('id="waWidget"')) {
    console.warn(`[${file}] Missing static waWidget!`);
    hasError = true;
  }
});

if (!hasError) {
  console.log('>>> ALL HTML FILES PASSED INTEGRITY CHECKS! <<<');
} else {
  process.exit(1);
}
