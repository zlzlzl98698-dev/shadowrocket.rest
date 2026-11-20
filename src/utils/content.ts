import { getCollection, type CollectionEntry } from 'astro:content';

export type ContentKind = 'articles' | 'reviews' | 'guides' | 'comparisons';

export type AnyEntry =
  | (CollectionEntry<'articles'> & { kind: 'articles' })
  | (CollectionEntry<'reviews'> & { kind: 'reviews' })
  | (CollectionEntry<'guides'> & { kind: 'guides' })
  | (CollectionEntry<'comparisons'> & { kind: 'comparisons' });

export function getEntryUrl(entry: { kind: ContentKind; id: string; data: { slug?: string } }): string {
  const cleanSlug = (entry.data.slug ?? entry.id).replace(/\.(md|mdx)$/, '');
  return `/${entry.kind}/${cleanSlug}/`;
}

export function getEntrySlug(entry: { id: string; data: { slug?: string } }): string {
  return (entry.data.slug ?? entry.id).replace(/\.(md|mdx)$/, '');
}

export async function getAllPublishedEntries(): Promise<AnyEntry[]> {
  const [articles, reviews, guides, comparisons] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('reviews', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
  ]);

  const combined: AnyEntry[] = [
    ...articles.map((e) => ({ ...e, kind: 'articles' as const })),
    ...reviews.map((e) => ({ ...e, kind: 'reviews' as const })),
    ...guides.map((e) => ({ ...e, kind: 'guides' as const })),
    ...comparisons.map((e) => ({ ...e, kind: 'comparisons' as const })),
  ];

  return combined.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export function estimateReadingMinutes(body?: string): number {
  if (!body) return 5;
  const clean = body.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '');
  const chineseChars = (clean.match(/[\u4e00-\u9fa5]/g) || []).length;
  const words = (clean.match(/[a-zA-Z0-9]+/g) || []).length;
  const totalUnits = chineseChars + words * 1.5;
  return Math.max(3, Math.ceil(totalUnits / 420));
}

export function formatZhDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-');
}

export function getKindLabel(kind: ContentKind): string {
  const map: Record<ContentKind, string> = {
    articles: '深度专栏',
    reviews: '品牌评测',
    guides: '实操教程',
    comparisons: '横向对比',
  };
  return map[kind];
}

export function findRelatedEntries(current: AnyEntry, all: AnyEntry[], limit = 4): AnyEntry[] {
  const currentSlug = getEntrySlug(current);
  const explicitSet = new Set(current.data.relatedSlugs ?? []);
  const explicit = all.filter(
    (e) => getEntrySlug(e) !== currentSlug && explicitSet.has(getEntrySlug(e))
  );

  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  const sameTopic = all.filter(
    (e) =>
      getEntrySlug(e) !== currentSlug &&
      !explicitSet.has(getEntrySlug(e)) &&
      (e.data.topicSlug === current.data.topicSlug || e.data.pillar === current.data.pillar)
  );

  return [...explicit, ...sameTopic].slice(0, limit);
}
