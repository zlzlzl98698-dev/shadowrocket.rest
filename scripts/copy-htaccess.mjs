import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const htSrc = path.resolve('.htaccess');
const htDst = path.join(distDir, '.htaccess');

if (fs.existsSync(htSrc) && fs.existsSync(distDir)) {
  fs.copyFileSync(htSrc, htDst);
  console.log('Copied .htaccess to dist/.htaccess');
}

// Expose a canonical flat /sitemap.xml alongside @astrojs/sitemap's sitemap-index.xml
// so Bing, Google, Shenma, and Baidu webmaster tools can submit /sitemap.xml directly.
const sitemap0 = path.join(distDir, 'sitemap-0.xml');
const sitemapXml = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemap0)) {
  fs.copyFileSync(sitemap0, sitemapXml);
  console.log('Copied dist/sitemap-0.xml to dist/sitemap.xml');
}
