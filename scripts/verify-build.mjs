import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  console.error('FAIL: dist/ directory does not exist. Run astro build first.');
  process.exit(1);
}

let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  errors++;
}
function warn(msg) {
  console.warn(`WARN: ${msg}`);
  warnings++;
}

// 1. Check essential root output files
const requiredFiles = [
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'sitemap-index.xml',
  'rss.xml',
  '.htaccess',
  'pagefind/pagefind.js',
  'airport/index.html',
  'vpn/index.html',
  'clash/index.html',
  'resources/index.html',
  'brands/index.html',
  'compare/index.html',
  'clients/index.html',
  'search/index.html',
];

for (const rel of requiredFiles) {
  if (!fs.existsSync(path.join(distDir, rel))) {
    fail(`Missing required build output: dist/${rel}`);
  }
}

// 2. Collect all HTML files in dist
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const htmlFiles = walk(distDir);
console.log(`Scanned ${htmlFiles.length} HTML files in dist/`);

const affDomains = ['aff.com', 'aff.cc', 'civetnet.com', 'xingdaomeng.com', 'yuzoucloud.cc'];

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file);
  const html = fs.readFileSync(file, 'utf8');

  // Check viewport & H1 & title
  if (!html.includes('<meta name="viewport"')) fail(`${relPath}: missing viewport meta`);
  if (!/<title>.+<\/title>/s.test(html)) fail(`${relPath}: missing <title>`);
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) warn(`${relPath}: expected 1 <h1>, found ${h1Count}`);

  // Check canonical (404.html omits canonical intentionally)
  if (relPath !== '404.html' && !html.includes('rel="canonical"')) fail(`${relPath}: missing canonical link`);

  // Check internal hrefs & local img src
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (href.startsWith('/') && !href.startsWith('//')) {
      let clean = href.split('#')[0].split('?')[0];
      try {
        clean = decodeURIComponent(clean);
      } catch {
        // Keep raw clean if malformed
      }
      if (!clean || clean === '/') continue;
      if (clean.startsWith('/pagefind/')) continue;
      const candidate1 = path.join(distDir, clean);
      const candidate2 = path.join(distDir, clean, 'index.html');
      if (!fs.existsSync(candidate1) && !fs.existsSync(candidate2)) {
        fail(`${relPath}: broken internal link "${href}"`);
      }
    }
    // Check affiliate rel compliance
    if (href.startsWith('http') && affDomains.some((d) => href.includes(d))) {
      const anchorRegex = new RegExp(`<a[^>]*href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'g');
      const tags = html.match(anchorRegex) || [];
      for (const tag of tags) {
        if (!tag.includes('nofollow') || !tag.includes('sponsored') || !tag.includes('noopener')) {
          fail(`${relPath}: affiliate link missing rel="nofollow sponsored noopener": ${href}`);
        }
      }
    }
  }

  // Check local image src
  const srcs = [...html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/g)];
  for (const m of srcs) {
    const src = m[1];
    if (!m[0].includes('alt=')) fail(`${relPath}: <img> missing alt attribute: ${src}`);
    if (src.startsWith('/') && !fs.existsSync(path.join(distDir, src))) {
      fail(`${relPath}: missing local image "${src}"`);
    }
  }
}

// 3. Ensure no hardcoded affiliate URLs in src/content/
function walkContent(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkContent(full));
    else if (/\.(md|mdx)$/.test(entry.name)) out.push(full);
  }
  return out;
}
for (const cf of walkContent(path.resolve('src/content'))) {
  const txt = fs.readFileSync(cf, 'utf8');
  if (affDomains.some((d) => txt.includes(d))) {
    fail(`Hardcoded affiliate URL found in content file ${cf}`);
  }
  // Check minimum editorial depth for non-topic content files
  if (!cf.includes(`${path.sep}topics${path.sep}`)) {
    const body = txt.replace(/^---[\s\S]*?---/, '');
    const zhCount = (body.match(/[\u4e00-\u9fff]/g) || []).length;
    if (zhCount < 3500) {
      warn(`Short content (${zhCount} CJK chars < 3500) in ${path.relative(process.cwd(), cf)}`);
    }
  }
}

// 4. Check sitemap contains no /search/ or /404
const sitemapFiles = fs.readdirSync(distDir).filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'));
if (sitemapFiles.length === 0) fail('No sitemap XML files generated.');
for (const sf of sitemapFiles) {
  const xml = fs.readFileSync(path.join(distDir, sf), 'utf8');
  if (xml.includes('/search/') || xml.includes('/404')) {
    fail(`Sitemap ${sf} contains excluded route (/search/ or /404)`);
  }
}

// 5. Check SVG files in dist/ for unescaped XML ampersands (which break <img> rendering)
function walkSvgs(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkSvgs(full));
    else if (entry.name.endsWith('.svg')) out.push(full);
  }
  return out;
}
for (const svgPath of walkSvgs(distDir)) {
  const raw = fs.readFileSync(svgPath, 'utf8');
  if (/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/.test(raw)) {
    fail(`Invalid unescaped '&' in SVG ${path.relative(distDir, svgPath)}`);
  }
}

// 6. Preventive SEO/Schema checks: non-SVG og:image/Article.image, no duplicate BreadcrumbList names, <= 65 char titles
for (const htmlFile of htmlFiles) {
  const rel = path.relative(distDir, htmlFile);
  const html = fs.readFileSync(htmlFile, 'utf8');
  const isNoindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html);
  const ogImg = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)?.[1];
  if (ogImg && ogImg.endsWith('.svg')) {
    fail(`${rel}: og:image must use raster format (.png/.jpg/.webp), got ${ogImg}`);
  }
  const titleText = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
  if (!isNoindex && titleText.length > 65) {
    warn(`${rel}: <title> length ${titleText.length} > 65 ("${titleText}")`);
  }
  for (const m of html.matchAll(/<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script>/gi)) {
    try {
      const obj = JSON.parse(m[1]);
      if ((obj['@type'] === 'BlogPosting' || obj['@type'] === 'Article') && (!obj.image || String(obj.image).endsWith('.svg'))) {
        fail(`${rel}: ${obj['@type']} schema image missing or .svg (${obj.image})`);
      }
      if (obj['@type'] === 'BreadcrumbList' && Array.isArray(obj.itemListElement)) {
        const names = obj.itemListElement.map((x) => x.name);
        if (new Set(names).size !== names.length) {
          fail(`${rel}: BreadcrumbList contains duplicate segment names: ${names.join(' > ')}`);
        }
      }
    } catch (e) {
      fail(`${rel}: Invalid JSON-LD syntax: ${e.message}`);
    }
  }
}

console.log(`Verification complete. Errors: ${errors}, Warnings: ${warnings}`);
if (errors > 0) process.exit(1);
