import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('public/images/covers');
fs.mkdirSync(dir, { recursive: true });

const covers = [
  { name: 'editorial-network.svg', badge: 'CORE GUIDE', title: '2026 机场与专线选型', sub: 'IEPL / IPLC / 客户端全栈指南', c1: '#1E3A8A', c2: '#2563EB', accent: '#60A5FA' },
  { name: 'guangsuyun-review.svg', badge: 'BRAND REVIEW', title: '光速云深度实测报告', sub: 'MiaoKo 三网测速与 AI 解锁审计', c1: '#0F172A', c2: '#1D4ED8', accent: '#38BDF8' },
  { name: 'clash-verge-guide.svg', badge: 'CLIENT TUTORIAL', title: 'Clash Verge Rev 教程', sub: 'Mihomo 内核 · 订阅导入 · TUN 模式', c1: '#1E293B', c2: '#0284C7', accent: '#7DD3FC' },
  { name: 'shadowrocket-ios.svg', badge: 'iOS GUIDE', title: 'Shadowrocket 小火箭', sub: '规则分流 · 延迟测速 · 订阅配置', c1: '#1E1B4B', c2: '#4F46E5', accent: '#A5B4FC' },
  { name: 'comparison-matrix.svg', badge: 'COMPARISON', title: '主流品牌与套餐横评', sub: '光速云 vs 暮光加速 vs 飞猫云', c1: '#0F172A', c2: '#0369A1', accent: '#34D399' },
  { name: 'troubleshooting-ops.svg', badge: 'TROUBLESHOOTING', title: '订阅与节点故障排查', sub: 'Timeout / DNS 污染 / 端口残留修复', c1: '#172033', c2: '#334155', accent: '#FBBF24' },
  { name: 'speedtest-observatory.svg', badge: 'NETWORK LAB', title: 'MiaoKo 测速图表精读', sub: 'TLS RTT / HTTPS 延迟 / IP 纯净度', c1: '#0B1220', c2: '#1E3A8A', accent: '#10B981' },
  { name: 'ai-streaming-unlock.svg', badge: 'AI & STREAMING', title: 'AI 与流媒体解锁指南', sub: 'ChatGPT / Claude / Gemini / Netflix', c1: '#1E293B', c2: '#2563EB', accent: '#818CF8' },
  { name: 'risk-audit.svg', badge: 'RISK AUDIT', title: '低价套餐与跑路预警', sub: '31 家品牌资料核实与防坑指南', c1: '#1F2937', c2: '#991B1B', accent: '#FCA5A5' },
];

for (const c of covers) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" fill="none">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${c.c1}"/>
      <stop offset="100%" stop-color="${c.c2}"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1020" cy="140" r="220" fill="${c.accent}" fill-opacity="0.12"/>
  <circle cx="1020" cy="140" r="130" stroke="${c.accent}" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="8 8"/>
  <rect x="84" y="130" width="220" height="38" rx="19" fill="rgba(255,255,255,0.12)" stroke="${c.accent}" stroke-opacity="0.5"/>
  <text x="194" y="155" text-anchor="middle" fill="${c.accent}" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" letter-spacing="1.5">${c.badge}</text>
  <text x="84" y="275" fill="#FFFFFF" font-family="PingFang SC, Microsoft YaHei, system-ui, sans-serif" font-size="60" font-weight="700">${c.title}</text>
  <text x="84" y="345" fill="#CBD5E1" font-family="PingFang SC, Microsoft YaHei, system-ui, sans-serif" font-size="30" font-weight="400">${c.sub}</text>
  <rect x="84" y="465" width="260" height="56" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)"/>
  <text x="112" y="500" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="22" font-weight="600">shadowrocket.rest</text>
</svg>`;
  fs.writeFileSync(path.join(dir, c.name), svg, 'utf8');
}
console.log(`Generated ${covers.length} SVG covers in ${dir}`);
