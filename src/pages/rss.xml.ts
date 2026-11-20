import type { APIRoute } from 'astro';
import { SITE } from '@/data/site';
import { getAllPublishedEntries, getEntryUrl } from '@/utils/content';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const entries = await getAllPublishedEntries();
  const itemsXml = entries
    .map((entry) => {
      const link = new URL(getEntryUrl(entry), SITE.url).toString();
      const pubDate = entry.data.pubDate.toUTCString();
      const desc = entry.data.excerpt ?? entry.data.description;
      return `    <item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(entry.data.category)}</category>
      <description>${escapeXml(desc)}</description>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.fullName)}</title>
    <link>${SITE.url}/</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
