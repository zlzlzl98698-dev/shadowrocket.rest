import type { PillarKey } from '@/data/navigation';

/**
 * Converts local `.svg` cover paths to raster `.png` counterparts for Open Graph
 * and JSON-LD Schema images, since Google Article Rich Results and social crawlers
 * generally reject or ignore vector SVG thumbnails.
 */
export function toSocialImagePath(imgPath: string): string {
  if (imgPath.startsWith('/images/covers/') && imgPath.endsWith('.svg')) {
    return imgPath.replace(/\.svg$/, '.png');
  }
  return imgPath;
}

export function toSocialImageUrl(imgPath: string, siteUrl: string): string {
  return new URL(toSocialImagePath(imgPath), siteUrl).toString();
}

/**
 * Prevents consecutive duplicate breadcrumb labels such as
 * `首页 > 机场推荐 > 机场推荐`.
 */
export function getPillarBreadcrumbLabel(
  pillarKey: PillarKey,
  pillarName: string,
  topicName?: string
): string {
  if (pillarKey === 'airport' && topicName === pillarName) {
    return '机场评测专栏';
  }
  return pillarName;
}
