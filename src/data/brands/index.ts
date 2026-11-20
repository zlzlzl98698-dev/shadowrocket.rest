import { BRANDS_TOP } from './tier-top';
import { BRANDS_MID } from './tier-mid';
import { BRANDS_BUDGET_HIST } from './tier-budget-hist';
import type { BrandProfile } from './schema';

export * from './schema';
export * from './links';

/**
 * 31 个去重核实后的独立品牌数据库
 * 注：原 32 条清单中 Firefly（#8）与 Firefly 萤火虫（2026-08-09 历史档）已合并去重。
 */
export const ALL_BRANDS: BrandProfile[] = [
  ...BRANDS_TOP,
  ...BRANDS_MID,
  ...BRANDS_BUDGET_HIST,
];

export function getBrandBySlug(slug: string): BrandProfile | undefined {
  return ALL_BRANDS.find((b) => b.slug === slug);
}

export function getBrandsBySlugs(slugs: string[]): BrandProfile[] {
  return slugs
    .map((s) => getBrandBySlug(s))
    .filter((b): b is BrandProfile => Boolean(b));
}

export const DATA_STATUS_META: Record<
  BrandProfile['dataStatus'],
  { label: string; badgeClass: string; desc: string }
> = {
  verified: {
    label: '含实测截图核实',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    desc: '包含实际测速或解锁截图核验（Measured Data），仍注明测试时间与网络条件',
  },
  vendor: {
    label: '品牌资料整理',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    desc: '基于品牌公开资料与清单原文（Vendor Data）整理，部分含非晚高峰基准测速',
  },
  historical: {
    label: '历史存档记录',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    desc: '源自 2026-08-09 历史档案（Historical），部分入口与现价需二次确认',
  },
  unverified: {
    label: '部分关键项待核实',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
    desc: '缺乏当前完整套餐或实测数据（Unverified），不做推定',
  },
};
