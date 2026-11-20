import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const baseContentSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  slug: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  category: z.string().default('网络知识'),
  pillar: z.enum(['airport', 'vpn', 'clash', 'resources']),
  topicSlug: z.string(),
  clusterId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().default('/images/covers/editorial-network.svg'),
  coverAlt: z.string().optional(),
  author: z.string().default('小火箭编辑部'),
  excerpt: z.string().optional(),
  faq: z.array(faqItemSchema).default([]),
  relatedSlugs: z.array(z.string()).default([]),
  brandSlugs: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  canonical: z.string().optional(),
  sources: z.array(z.string()).default([]),
  searchIntent: z
    .enum(['Informational', 'Commercial', 'Transactional', 'Navigational'])
    .default('Informational'),
  primaryKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  verifiedDate: z.string().optional(),
  testDate: z.string().optional(),
  reviewStatus: z
    .enum(['verified', 'editorial', 'vendor-assisted', 'historical'])
    .default('editorial'),
});

export const collections = {
  articles: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
    schema: baseContentSchema,
  }),
  reviews: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
    schema: baseContentSchema.extend({
      primaryBrandSlug: z.string(),
      ratingNote: z.string().optional(),
    }),
  }),
  guides: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
    schema: baseContentSchema.extend({
      platforms: z.array(z.string()).default([]),
      difficulty: z.enum(['入门', '进阶', '排查']).default('入门'),
    }),
  }),
  comparisons: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
    schema: baseContentSchema.extend({
      comparedEntities: z.array(z.string()).default([]),
    }),
  }),
  topics: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topics' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pillar: z.enum(['airport', 'vpn', 'clash', 'resources']),
      topicSlug: z.string(),
      draft: z.boolean().default(false),
    }),
  }),
};
