import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Computes `/tags/<tag>/` and `/categories/<cat>/` paths that have fewer than
 * 3 published entries so thin taxonomy archives are excluded from XML sitemap.
 */
function getThinTaxonomyPaths() {
  const tagCounts = new Map();
  const catCounts = new Map();
  const contentDirs = ['articles', 'reviews', 'guides', 'comparisons'];

  for (const dir of contentDirs) {
    const fullDir = path.resolve('src/content', dir);
    if (!fs.existsSync(fullDir)) continue;
    for (const file of fs.readdirSync(fullDir)) {
      if (!/\.(md|mdx)$/.test(file)) continue;
      const raw = fs.readFileSync(path.join(fullDir, file), 'utf8');
      const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      if (/^draft:\s*true\b/m.test(fm)) continue;

      const catMatch = fm.match(/^category:\s*["']?([^"'\r\n]+)["']?/m);
      if (catMatch) {
        const cat = catMatch[1].trim();
        catCounts.set(cat, (catCounts.get(cat) ?? 0) + 1);
      }

      const inlineTags = fm.match(/^tags:\s*\[([^\]]*)\]/m);
      if (inlineTags) {
        for (const t of inlineTags[1].split(',')) {
          const clean = t.trim().replace(/^["']|["']$/g, '');
          if (clean) tagCounts.set(clean, (tagCounts.get(clean) ?? 0) + 1);
        }
      } else {
        const blockTags = fm.match(/^tags:\s*\r?\n((?:\s+-\s+.+\r?\n?)*)/m);
        if (blockTags) {
          for (const line of blockTags[1].split(/\r?\n/)) {
            const m = line.match(/^\s+-\s+["']?([^"'\r\n]+)["']?/);
            if (m) tagCounts.set(m[1].trim(), (tagCounts.get(m[1].trim()) ?? 0) + 1);
          }
        }
      }
    }
  }

  const thinPaths = new Set();
  for (const [tag, count] of tagCounts) {
    if (count < 3) thinPaths.add(`/tags/${tag}/`);
  }
  for (const [cat, count] of catCounts) {
    if (count < 3) thinPaths.add(`/categories/${cat}/`);
  }
  return thinPaths;
}

const thinTaxonomyPaths = getThinTaxonomyPaths();

export default defineConfig({
  site: 'https://shadowrocket.rest',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        if (page.includes('/search/') || page.includes('/404')) return false;
        try {
          const decodedPath = decodeURIComponent(new URL(page).pathname);
          if (thinTaxonomyPaths.has(decodedPath)) return false;
        } catch {
          return false;
        }
        return true;
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2026-11-20'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
