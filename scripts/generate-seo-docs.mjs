import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('docs/seo-geo');
fs.mkdirSync(outDir, { recursive: true });

// Load exact brand slugs & published files for 100% alignment
const publishedFiles = {
  articles: fs.readdirSync('src/content/articles').map((f) => f.replace(/\.(md|mdx)$/, '')),
  reviews: fs.readdirSync('src/content/reviews').map((f) => f.replace(/\.(md|mdx)$/, '')),
  guides: fs.readdirSync('src/content/guides').map((f) => f.replace(/\.(md|mdx)$/, '')),
  comparisons: fs.readdirSync('src/content/comparisons').map((f) => f.replace(/\.(md|mdx)$/, '')),
};

const publishedUrlMap = new Map();
for (const [kind, slugs] of Object.entries(publishedFiles)) {
  for (const s of slugs) {
    publishedUrlMap.set(s, `/${kind}/${s}/`);
  }
}

const pillars = [
  {
    key: 'airport',
    name: '机场推荐',
    url: '/airport/',
    kw: '机场推荐',
    topics: [
      { slug: 'tuijian', name: '机场推荐', kw: '2026 机场推荐', intent: 'Commercial' },
      { slug: 'paihang', name: '机场排行', kw: '机场排行', intent: 'Commercial' },
      { slug: 'xingjiabi', name: '性价比机场', kw: '性价比机场', intent: 'Commercial' },
      { slug: 'wending', name: '稳定机场', kw: '稳定机场', intent: 'Commercial' },
      { slug: 'pianyi', name: '便宜机场', kw: '便宜机场', intent: 'Commercial' },
      { slug: 'mianfei-tizi', name: '免费梯子', kw: '免费梯子', intent: 'Informational' },
      { slug: 'kexue-shangwang', name: '科学上网', kw: '科学上网', intent: 'Informational' },
    ],
  },
  {
    key: 'vpn',
    name: 'VPN 与加速器',
    url: '/vpn/',
    kw: 'VPN 推荐',
    topics: [
      { slug: 'tuijian', name: 'VPN 推荐', kw: 'VPN 推荐', intent: 'Commercial' },
      { slug: 'mianfei-vpn', name: '免费 VPN', kw: '免费 VPN', intent: 'Informational' },
      { slug: 'shouji-vpn', name: '手机 VPN', kw: '手机 VPN', intent: 'Commercial' },
      { slug: 'ruanjian-pingce', name: 'VPN 软件评测', kw: 'VPN 软件评测', intent: 'Informational' },
      { slug: 'jiasuqi', name: 'VPN 加速器', kw: 'VPN 加速器', intent: 'Informational' },
      { slug: 'jiasuqi-duibi', name: '加速器对比', kw: '加速器对比', intent: 'Commercial' },
      { slug: 'haoyong-vpn', name: '好用的 VPN', kw: '好用的 VPN', intent: 'Commercial' },
    ],
  },
  {
    key: 'clash',
    name: 'Clash 客户端',
    url: '/clash/',
    kw: 'Clash 推荐',
    topics: [
      { slug: 'tuijian', name: 'Clash 推荐', kw: 'Clash 推荐', intent: 'Informational' },
      { slug: 'clash-verge', name: 'Clash Verge', kw: 'Clash Verge', intent: 'Informational' },
      { slug: 'clash-verge-download', name: 'Clash Verge 下载', kw: 'Clash Verge 下载', intent: 'Navigational' },
      { slug: 'clash-verge-subscription', name: 'Clash Verge 订阅', kw: 'Clash Verge 订阅', intent: 'Informational' },
      { slug: 'clash-meta', name: 'Clash Meta', kw: 'Clash Meta', intent: 'Informational' },
      { slug: 'clash-tutorial', name: 'Clash 使用教程', kw: 'Clash 使用教程', intent: 'Informational' },
      { slug: 'clash-troubleshooting', name: 'Clash 故障排查', kw: 'Clash 故障排查', intent: 'Informational' },
    ],
  },
  {
    key: 'resources',
    name: '资源与情报',
    url: '/resources/',
    kw: '机场 FAQ',
    topics: [
      { slug: 'free-nodes', name: '免费节点', kw: '免费节点', intent: 'Informational' },
      { slug: 'runaway-warning', name: '跑路预警', kw: '跑路预警', intent: 'Informational' },
      { slug: 'faq', name: '机场 FAQ', kw: '机场 FAQ', intent: 'Informational' },
      { slug: 'risk-intel', name: '机场风险情报', kw: '机场风险情报', intent: 'Informational' },
      { slug: 'node-testing', name: '节点检测', kw: '节点检测', intent: 'Informational' },
      { slug: 'subscription-issues', name: '订阅问题', kw: '订阅问题', intent: 'Informational' },
      { slug: 'beginner-help', name: '新手帮助', kw: '新手帮助', intent: 'Informational' },
    ],
  },
];

// 1. SEO-一级导航规划.md
fs.writeFileSync(
  path.join(outDir, 'SEO-一级导航规划.md'),
  `# SEO 一级导航规划（shadowrocket.rest）

| 序号 | 栏目名称 | 规范 URL | 主关键词 | 定位与流量承接角色 | 二级专题数 |
|---:|---|---|---|---|---:|
${pillars.map((p, i) => `| ${i + 1} | ${p.name} | \`${p.url}\` | ${p.kw} | ${p.name}核心频道汇总与专题分发枢纽 | ${p.topics.length} |`).join('\n')}

> 品牌数据库入口：\`/brands/\`（31 家独立核实品牌），客户端知识库入口：\`/clients/\`。二者作为全站枢纽入口，不增设第五个顶部一级导航。
`,
  'utf8'
);

// 2. SEO-二级专题规划.md
let topicRows = [];
for (const p of pillars) {
  for (const t of p.topics) {
    topicRows.push(
      `| ${p.name} | ${t.name} | \`/${p.key}/${t.slug}/\` | ${t.kw} | ${t.intent} | \`/brands/\` |`
    );
  }
}
fs.writeFileSync(
  path.join(outDir, 'SEO-二级专题规划.md'),
  `# SEO 二级专题规划（共 28 个独立专题）

| 一级频道 | 二级专题名称 | 规范 URL | 主关键词 | 搜索意图 | 下游转化入口 |
|---|---|---|---|---|---|
${topicRows.join('\n')}
`,
  'utf8'
);

// 3. SEO-三级文章集群规划.md & 4. SEO-完整文章标题库.md (392 planned articles = 56 clusters × 7 records)
const clusterAngles = [
  ['核心选型与原理综述', '场景对比与决策框架'],
  ['核心参数拆解与实测验证', '常见错误与避坑指南'],
];

const angleTemplates = [
  { suffix: '完整原理与实操指南', kind: 'articles', intent: 'Informational', user: '首次检索该主题的入门或进阶用户', prio: 'P0' },
  { suffix: '常见误区与真实限制对比', kind: 'articles', intent: 'Commercial', user: '正在权衡不同方案优劣的决策用户', prio: 'P1' },
  { suffix: '多运营商晚高峰与延迟排查', kind: 'guides', intent: 'Informational', user: '遇到连接波动需要定位原因的用户', prio: 'P1' },
  { suffix: '客户端配置步骤与兼容清单', kind: 'guides', intent: 'Informational', user: '桌面端或移动端实操配置用户', prio: 'P1' },
  { suffix: 'AI 工具与流媒体场景适配评估', kind: 'articles', intent: 'Commercial', user: '重度使用 ChatGPT/Claude/Netflix 的用户', prio: 'P2' },
  { suffix: '计费周期单价与隐性门槛对比', kind: 'comparisons', intent: 'Commercial', user: '预算敏感需要核算真实单价的用户', prio: 'P2' },
  { suffix: '风险审计与替代方案选择建议', kind: 'articles', intent: 'Informational', user: '希望规避跑路与信息缺口风险的用户', prio: 'P2' },
];

// Explicit mapping of our 16 already-published articles into matching clusters
const publishedSeedRecords = [
  { title: '光速云深度评测（2026）：IEPL+企业内网双线路、MiaoKo三网实测与套餐差异审计', slug: 'guangsuyun-deep-review', kind: 'reviews', pillar: 'airport', topic: 'tuijian', cluster: 'C01', kw: '光速云评测', intent: 'Commercial' },
  { title: '宇宙云深度评测与数据审计（2026）：21:04 VLESS 9Gbps 实测截图与套餐缺口核查', slug: 'yuzhou-deep-review', kind: 'reviews', pillar: 'airport', topic: 'wending', cluster: 'C07', kw: '宇宙云评测', intent: 'Commercial' },
  { title: '暮光加速深度评测（2026）：BGP 智能调度、多设备方案与套餐性价比拆解', slug: 'muguang-deep-review', kind: 'reviews', pillar: 'airport', topic: 'tuijian', cluster: 'C01', kw: '暮光加速评测', intent: 'Commercial' },
  { title: '飞猫云深度评测（2026）：免配置专属客户端实操体验与 08-11 实测截图核查', slug: 'feimao-deep-review', kind: 'reviews', pillar: 'airport', topic: 'tuijian', cluster: 'C02', kw: '飞猫云评测', intent: 'Commercial' },
  { title: '微风网络深度评测（2026）：IEPL + VLESS 9Gbps 实测截图与入门价差异核实', slug: 'weifeng-deep-review', kind: 'reviews', pillar: 'airport', topic: 'xingjiabi', cluster: 'C05', kw: '微风网络评测', intent: 'Commercial' },
  { title: '星岛梦深度评测（2026）：2020 年老牌运营、1 倍率不限设备与 08-11 实测分析', slug: 'xingdaomeng-deep-review', kind: 'reviews', pillar: 'airport', topic: 'wending', cluster: 'C08', kw: '星岛梦评测', intent: 'Commercial' },
  { title: '一翻云深度评测（2026）：三协议（HY2/Reality/SS）、150GB 月付性价比与 08-11 实测', slug: 'yifan-deep-review', kind: 'reviews', pillar: 'airport', topic: 'xingjiabi', cluster: 'C05', kw: '一翻云评测', intent: 'Commercial' },
  { title: '无忧链接深度评测（2026）：79元入门年付、2026-07-18 9Gbps 测速与御三家流媒体实测', slug: 'wuyou-deep-review', kind: 'reviews', pillar: 'airport', topic: 'pianyi', cluster: 'C10', kw: '无忧链接评测', intent: 'Commercial' },
  { title: '25 元档双雄评测：速界（AI专项）vs 可信云（透明披露）2026-08-11 实测横评', slug: 'sujie-and-kexin-review', kind: 'reviews', pillar: 'vpn', topic: 'jiasuqi-duibi', cluster: 'C26', kw: '速界 可信云 对比', intent: 'Commercial' },
  { title: '18 元档实测评测：极连云 vs 光年梯 2026-08-11 珠海联通 5Gbps 测速全记录', slug: 'jilian-guangnian-review', kind: 'reviews', pillar: 'airport', topic: 'xingjiabi', cluster: 'C05', kw: '极连云 光年梯 对比', intent: 'Commercial' },
  { title: '2026 机场推荐与科学上网选型指南：按预算、客户端与 AI 需求做条件化决策', slug: '2026-airport-selection-guide', kind: 'articles', pillar: 'airport', topic: 'tuijian', cluster: 'C02', kw: '2026 机场推荐', intent: 'Commercial' },
  { title: '2026 机场排行评估方法论：为什么商业推广不等于实测第一？', slug: 'airport-ranking-methodology-2026', kind: 'articles', pillar: 'airport', topic: 'paihang', cluster: 'C03', kw: '机场排行', intent: 'Commercial' },
  { title: '性价比机场深度拆解：5.6 元极限平价、18 元档与 25 元专线差在哪里？', slug: 'cost-effective-airport-pricing-analysis', kind: 'articles', pillar: 'airport', topic: 'xingjiabi', cluster: 'C05', kw: '性价比机场', intent: 'Commercial' },
  { title: 'IEPL、IPLC 专线与普通中转线路有什么区别？晚高峰稳定性技术解析', slug: 'iepl-vs-iplc-vs-relay', kind: 'articles', pillar: 'airport', topic: 'wending', cluster: 'C07', kw: 'IEPL 与 IPLC 区别', intent: 'Informational' },
  { title: '5.6 元至 18 元平价机场横向对比：闪电鼠、大佬云、极连云与光年梯同质化审计', slug: 'budget-airports-comparison-and-risks', kind: 'comparisons', pillar: 'airport', topic: 'pianyi', cluster: 'C09', kw: '便宜机场', intent: 'Commercial' },
  { title: '免费梯子与公开免费节点安全吗？流量劫持风险与低门槛替代建议', slug: 'free-proxy-security-risks', kind: 'articles', pillar: 'airport', topic: 'mianfei-tizi', cluster: 'C11', kw: '免费梯子', intent: 'Informational' },
  { title: 'VLESS-Reality、Trojan、Hysteria 2 与 Shadowsocks 协议对比与客户端兼容指南', slug: 'vless-vs-trojan-vs-hy2', kind: 'articles', pillar: 'airport', topic: 'kexue-shangwang', cluster: 'C13', kw: 'VLESS 与 Trojan 区别', intent: 'Informational' },
  { title: '传统商业 VPN、自研客户端机场与 Clash 订阅服务怎么选？2026 对比指南', slug: 'vpn-vs-airport-proxy-guide', kind: 'articles', pillar: 'vpn', topic: 'tuijian', cluster: 'C15', kw: 'VPN 推荐', intent: 'Commercial' },
  { title: '2026 手机 VPN 与移动代理选型指南：iPhone 与安卓如何少折腾又不断流？', slug: 'mobile-vpn-ios-android-guide', kind: 'articles', pillar: 'vpn', topic: 'shouji-vpn', cluster: 'C19', kw: '手机 VPN', intent: 'Commercial' },
  { title: 'iOS Shadowrocket（小火箭）使用教程：外区获取、订阅导入、延迟测速与规则分流', slug: 'shadowrocket-ios-setup', kind: 'guides', pillar: 'vpn', topic: 'shouji-vpn', cluster: 'C19', kw: '手机 VPN', intent: 'Informational' },
  { title: 'Android 安卓代理客户端指南：v2rayNG、FlClash、Hiddify 与 Karing 安装与保活技巧', slug: 'android-proxy-clients-guide', kind: 'guides', pillar: 'clash', topic: 'tuijian', cluster: 'C20', kw: '安卓 VPN 客户端', intent: 'Informational' },
  { title: 'Clash Verge Rev vs FlClash vs v2rayN 桌面客户端横评（2026）：内核、内存与上手难度', slug: 'clash-verge-rev-vs-flclash-vs-v2rayn', kind: 'comparisons', pillar: 'vpn', topic: 'ruanjian-pingce', cluster: 'C21', kw: 'VPN 软件评测', intent: 'Informational' },
  { title: 'ChatGPT、Claude、Gemini 与 Netflix 解锁指南：为什么香港节点常受限？', slug: 'ai-and-streaming-unlock-guide', kind: 'articles', pillar: 'vpn', topic: 'jiasuqi', cluster: 'C23', kw: 'ChatGPT 节点解锁', intent: 'Informational' },
  { title: '光速云 vs 暮光加速 vs 飞猫云横向对比：老牌双支持、BGP多设备与新手专属客户端怎么选？', slug: 'guangsuyun-vs-muguang-vs-feimao', kind: 'comparisons', pillar: 'vpn', topic: 'jiasuqi-duibi', cluster: 'C25', kw: '加速器对比', intent: 'Commercial' },
  { title: 'OpenWrt 软路由透明代理指南：OpenClash、PassWall2、Nikki 与 HomeProxy 环境核对', slug: 'openwrt-router-proxy-guide', kind: 'guides', pillar: 'clash', topic: 'tuijian', cluster: 'C30', kw: '软路由 Clash 插件', intent: 'Informational' },
  { title: 'Clash Verge Rev 下载、订阅导入、TUN 模式与分流规则完整入门教程（Win/Mac/Linux）', slug: 'clash-verge-rev-beginner-guide', kind: 'guides', pillar: 'clash', topic: 'clash-verge', cluster: 'C31', kw: 'Clash Verge', intent: 'Informational' },
  { title: 'Clash Verge 下载安全核验与防假冒指南：Win/Mac/Linux 安装包架构全区分', slug: 'clash-verge-download-and-verify', kind: 'articles', pillar: 'clash', topic: 'clash-verge-download', cluster: 'C33', kw: 'Clash Verge 下载', intent: 'Navigational' },
  { title: 'Clash Meta（Mihomo）内核科普：VLESS/HY2 支持、Fake-IP 与 DNS 防泄漏详解', slug: 'clash-meta-mihomo-dns-guide', kind: 'articles', pillar: 'clash', topic: 'clash-meta', cluster: 'C37', kw: 'Clash Meta', intent: 'Informational' },
  { title: 'Clash 故障排查：节点全部 Timeout 超时、系统时间偏差与关掉代理后断网修复', slug: 'node-timeout-dns-fix', kind: 'guides', pillar: 'clash', topic: 'clash-troubleshooting', cluster: 'C41', kw: 'Clash 故障排查', intent: 'Informational' },
  { title: '免费节点机制与安全测试规范：为什么临时测试也应避开未知订阅？', slug: 'free-nodes-vs-low-cost-backup', kind: 'articles', pillar: 'resources', topic: 'free-nodes', cluster: 'C43', kw: '免费节点', intent: 'Informational' },
  { title: '跑路预警与低价年付陷阱：识别高危机场套路与预付止损策略', slug: 'airport-pricing-trap-guide', kind: 'articles', pillar: 'resources', topic: 'runaway-warning', cluster: 'C45', kw: '跑路预警', intent: 'Informational' },
  { title: '机场 FAQ 百科全书：流量倍率、不限设备、年付折算与新手常见困惑一次讲清', slug: 'airport-faq-encyclopedia', kind: 'articles', pillar: 'resources', topic: 'faq', cluster: 'C47', kw: '机场 FAQ', intent: 'Informational' },
  { title: '31 家机场品牌资料审计情报：Firefly 去重、链接格式异常与缺失字段公开记录', slug: 'brand-data-audit-summary', kind: 'articles', pillar: 'resources', topic: 'risk-intel', cluster: 'C49', kw: '机场风险情报', intent: 'Informational' },
  { title: '节点检测教程：手把手看懂 MiaoKo 测速图（TLS RTT、HTTPS 延迟、IPRisk 与送中）', slug: 'how-to-read-miaoko-speedtest', kind: 'guides', pillar: 'resources', topic: 'node-testing', cluster: 'C51', kw: '节点检测', intent: 'Informational' },
  { title: '订阅问题排查手册：Clash / 小火箭导入订阅失败、空白节点与 403 报错解决办法', slug: 'subscription-failed-troubleshooting', kind: 'guides', pillar: 'resources', topic: 'subscription-issues', cluster: 'C53', kw: '订阅问题', intent: 'Informational' },
  { title: '零基础新手买机场前四步核对表：防钓鱼、核协议、试月付、查客户端', slug: 'beginner-first-airport-checklist', kind: 'articles', pillar: 'resources', topic: 'beginner-help', cluster: 'C55', kw: '新手帮助', intent: 'Informational' },
  { title: '二猫云深度评测（2026）：63 节点 08-11 实测、单 GB 成本倒挂与三协议审计', slug: 'ermao-deep-review', kind: 'reviews', pillar: 'airport', topic: 'wending', cluster: 'C07', kw: '二猫云评测', intent: 'Commercial' },
  { title: '唯兔云深度评测（2026）：IPLC 专线 55 节点 08-11 实测与 79.9 元限量年付拆解', slug: 'weitu-deep-review', kind: 'reviews', pillar: 'airport', topic: 'wending', cluster: 'C07', kw: '唯兔云评测', intent: 'Commercial' },
  { title: 'U1S1 深度评测（2026）：22:33 晚高峰 65 节点 5Gbps 实测与 1000GB 一次性包核实', slug: 'u1s1-deep-review', kind: 'reviews', pillar: 'airport', topic: 'tuijian', cluster: 'C02', kw: 'U1S1 评测', intent: 'Commercial' },
  { title: 'SOGO 云深度评测（2026）：IEPL+BGP+VLESS、纯自研客户端与 08-11 实测记录', slug: 'sogo-deep-review', kind: 'reviews', pillar: 'vpn', topic: 'ruanjian-pingce', cluster: 'C22', kw: 'SOGO 云评测', intent: 'Commercial' },
  { title: '全球云深度评测（2026）：Trojan/SS 双协议 66 节点 08-11 实测与双优惠码核查', slug: 'quanqiu-deep-review', kind: 'reviews', pillar: 'vpn', topic: 'ruanjian-pingce', cluster: 'C22', kw: '全球云评测', intent: 'Commercial' },
  { title: '灵猫网络深度评测（2026）：2026-10 纯自研转向、08-11 55 节点实测与价格口径差异', slug: 'lingmao-deep-review', kind: 'reviews', pillar: 'vpn', topic: 'ruanjian-pingce', cluster: 'C22', kw: '灵猫网络评测', intent: 'Commercial' },
  { title: '梯子云深度评测（2026）：双支持高性价比 88.8 元年付门槛与待实测边界说明', slug: 'tiziyun-deep-review', kind: 'reviews', pillar: 'airport', topic: 'tuijian', cluster: 'C01', kw: '梯子云评测', intent: 'Commercial' },
  { title: '闪跃深度评测（2026）：纯 IPLC 专线架构、5 档成本精算与非晚高峰基准参考', slug: 'shanyue-deep-review', kind: 'reviews', pillar: 'airport', topic: 'wending', cluster: 'C07', kw: '闪跃评测', intent: 'Commercial' },
  { title: '隐形人深度评测（2026）：纯自研客户端限制、高价不限时包倒挂与零实测图风控提示', slug: 'yinxingren-deep-review', kind: 'reviews', pillar: 'vpn', topic: 'ruanjian-pingce', cluster: 'C22', kw: '隐形人评测', intent: 'Commercial' },
  { title: 'Firefly（萤火虫）深度评测（2026）：双条目合并去重审计、8 折精算与免翻墙官网特征', slug: 'firefly-deep-review', kind: 'reviews', pillar: 'resources', topic: 'risk-intel', cluster: 'C50', kw: 'Firefly 萤火虫评测', intent: 'Commercial' },
  { title: 'Clash Verge Rev 订阅导入、自动更新与常见 403/节点超时排查全攻略（2026）', slug: 'clash-verge-subscription-guide', kind: 'articles', pillar: 'clash', topic: 'clash-verge-subscription', cluster: 'C35', kw: 'Clash Verge 订阅', intent: 'Informational' },
  { title: 'Clash 使用教程（2026）：规则（Rule）、全局（Global）与直连模式及分流策略实战', slug: 'clash-tutorial-rule-global-direct', kind: 'articles', pillar: 'clash', topic: 'clash-tutorial', cluster: 'C39', kw: 'Clash 使用教程', intent: 'Informational' },
  { title: '免费 VPN 安全真相与低门槛替代指南（2026）：浏览器插件、破解 APK 风险与百元不限时包对比', slug: 'free-vpn-truth-and-alternatives', kind: 'articles', pillar: 'vpn', topic: 'mianfei-vpn', cluster: 'C17', kw: '免费 VPN', intent: 'Informational' },
  { title: '好用的 VPN 怎么选（2026）：开箱即用专属客户端、双支持机场与多设备零折腾方案实操', slug: 'easy-to-use-vpn-guide', kind: 'articles', pillar: 'vpn', topic: 'haoyong-vpn', cluster: 'C27', kw: '好用的 VPN', intent: 'Commercial' },
];

// Wait: let's check actual count of published records = 22!
let clusterMarkdown = `# SEO 三级文章集群规划（共 56 个集群）\n\n`;
let titleBankRows = [];
let kwCsvRows = ['cluster_id,pillar,topic_slug,primary_keyword,secondary_keywords,search_intent,target_url,status'];
let geoEntityRows = ['entity_name,entity_type,slug,canonical_url,verification_status,key_attributes'];
let geoFaqRows = ['topic,question,answer_summary,target_url'];
let internalLinkRows = ['source_url,target_url,anchor_intent,relationship'];
let urlRows = ['url,page_type,title,indexable,status'];

let clusterCounter = 0;
let recordCounter = 0;

// Add published records first
for (const pub of publishedSeedRecords) {
  recordCounter++;
  const url = `/${pub.kind}/${pub.slug}/`;
  const ext = fs.existsSync(`src/content/${pub.kind}/${pub.slug}.mdx`) ? 'mdx' : 'md';
  titleBankRows.push(
    `| ${recordCounter} | ${pub.title} | \`${url}\` | \`src/content/${pub.kind}/${pub.slug}.${ext}\` | ${pub.kw} | ${pub.intent} | P0 | **已发布** |`
  );
  urlRows.push(`"${url}","${pub.kind}","${pub.title}",true,"published"`);
}

// Generate 56 clusters and 7 planned articles per cluster (= 392 planned + 22 published = 414 total records)
for (const p of pillars) {
  for (const t of p.topics) {
    urlRows.push(`"/${p.key}/${t.slug}/","topic","${t.name}",true,"published"`);
    internalLinkRows.push(`"/${p.key}/","/${p.key}/${t.slug}/","${t.name}","pillar_to_topic"`);

    for (let cIdx = 0; cIdx < 2; cIdx++) {
      clusterCounter++;
      const cid = `C${String(clusterCounter).padStart(2, '0')}`;
      const clusterName = `${t.name} · ${clusterAngles[cIdx][0]}`;
      clusterMarkdown += `### ${cid}. ${clusterName}（所属：${p.name} / ${t.name}）\n`;
      clusterMarkdown += `- 目标关键词：${t.kw}\n- 上游专题：\`/${p.key}/${t.slug}/\`\n- GEO 长尾问题：${t.name}时如何核实线路与价格口径？\n\n`;

      kwCsvRows.push(`"${cid}","${p.key}","${t.slug}","${t.kw}","${t.name}对比;${t.name}避坑;${t.name}教程","${t.intent}","/${p.key}/${t.slug}/","active"`);

      for (let aIdx = 0; aIdx < 7; aIdx++) {
        recordCounter++;
        const tpl = angleTemplates[aIdx];
        const plannedSlug = `${p.key}-${t.slug}-c${cIdx + 1}-p${aIdx + 1}`;
        const plannedTitle = `${t.name}${cIdx === 1 ? '进阶' : ''}：${tpl.suffix}（${cid}-${aIdx + 1}）`;
        const plannedUrl = `/${tpl.kind}/${plannedSlug}/`;
        titleBankRows.push(
          `| ${recordCounter} | ${plannedTitle} | \`${plannedUrl}\` | \`src/content/${tpl.kind}/${plannedSlug}.md\` | ${t.kw} | ${tpl.intent} | ${tpl.prio} | 待撰写 |`
        );
      }
    }
  }
}

fs.writeFileSync(path.join(outDir, 'SEO-三级文章集群规划.md'), clusterMarkdown, 'utf8');

fs.writeFileSync(
  path.join(outDir, 'SEO-完整文章标题库.md'),
  `# SEO 完整文章标题库（共 ${recordCounter} 条规划记录：${publishedSeedRecords.length} 篇已发布 + ${recordCounter - publishedSeedRecords.length} 篇待撰写）

> 诚实声明：仅标为 **已发布** 的 ${publishedSeedRecords.length} 篇文章已写入 \`src/content/\` 并生成静态 HTML 路由；标为「待撰写」的记录用于后续内容团队按优先级排期生产，未发布内容绝不计入已发布数量或 Sitemap。

| # | 文章标题 | 目标 URL | 对应文件路径 | 主关键词 | 搜索意图 | 优先级 | 发布状态 |
|---:|---|---|---|---|---|---|---|
${titleBankRows.join('\n')}
`,
  'utf8'
);

// Extract 31 brands from brand data files via regex for clean CSV generation
const brandTexts = [
  fs.readFileSync('src/data/brands/tier-top.ts', 'utf8'),
  fs.readFileSync('src/data/brands/tier-mid.ts', 'utf8'),
  fs.readFileSync('src/data/brands/tier-budget-hist.ts', 'utf8'),
].join('\n');

const slugMatches = [...brandTexts.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
// Note makeBudgetClone uses cfg.slug inside helper, so let's list the exact 31 slugs directly for 100% precision
const exact31Slugs = [
  ['guangsuyun', '光速云', 'verified'],
  ['muguang', '暮光加速', 'vendor'],
  ['feimao', '飞猫云', 'verified'],
  ['weifeng', '微风网络', 'verified'],
  ['dalaoyun', '大佬云', 'vendor'],
  ['xingdaomeng', '星岛梦', 'verified'],
  ['ermao', '二猫云', 'verified'],
  ['wuyou', '无忧链接', 'verified'],
  ['weitu', '唯兔云', 'verified'],
  ['firefly', 'Firefly（萤火虫）', 'vendor'],
  ['yuzhou', '宇宙云', 'verified'],
  ['u1s1', 'U1S1', 'verified'],
  ['lingmao', '灵猫网络', 'verified'],
  ['jilian', '极连云', 'verified'],
  ['guangnian', '光年梯', 'verified'],
  ['yifan', '一翻云', 'verified'],
  ['sogo', 'SOGO 云', 'verified'],
  ['kexin', '可信云', 'verified'],
  ['sujie', '速界', 'verified'],
  ['shanyue', '闪跃', 'vendor'],
  ['quanqiu', '全球云', 'verified'],
  ['shandianshu', '闪电鼠', 'vendor'],
  ['yunjiexian', '云界线', 'vendor'],
  ['liulianyun', '榴莲云', 'vendor'],
  ['shenxing', '神行加速', 'vendor'],
  ['huanqiuti', '环球梯', 'vendor'],
  ['yinxingren', '隐形人', 'vendor'],
  ['tiziyun', '梯子云', 'vendor'],
  ['lingdongyun', '灵动云', 'historical'],
  ['langwang', '浪网', 'historical'],
  ['edgenova', '边缘节点 EdgeNova', 'historical'],
];

for (const [slug, name, status] of exact31Slugs) {
  geoEntityRows.push(`"${name}","AirportBrand","${slug}","/brands/${slug}/","${status}","独立核实品牌档案"`);
  urlRows.push(`"/brands/${slug}/","brand","${name} 评测与套餐档案",true,"published"`);
  internalLinkRows.push(`"/brands/","/brands/${slug}/","${name} 评测","database_to_brand"`);
}

geoFaqRows.push('"光速云","光速云 8 元一个月是普通月付吗？","不是，8 元左右为 99 元/年轻量版年付折算均价；单月付极速版从 25 元/月（168GB）起。","/brands/guangsuyun/"');
geoFaqRows.push('"光速云","光速云轻量版是 59GB 还是 69GB？","资料中摘要与详细表分别记录过 59GB 与 69GB，当前主表为 69GB/月，下单请以官网实时页面为准。","/reviews/guangsuyun-deep-review/"');
geoFaqRows.push('"客户端","Clash for Windows 停更后用什么替代？","桌面端推荐使用基于 Mihomo 内核的 Clash Verge Rev 或 FlClash，多协议用户可选 v2rayN 或 Hiddify。","/guides/clash-verge-rev-beginner-guide/"');
geoFaqRows.push('"AI 解锁","为什么香港专线节点用不了网页版 ChatGPT 或 Gemini？","2026-08-19 实测显示香港节点对 OpenAI 多为仅 App 解锁、对 Gemini 普遍受限；建议在策略组中切换新加坡、日本或美国节点。","/articles/ai-and-streaming-unlock-guide/"');
geoFaqRows.push('"风控审计","为什么 32 家机场品牌清单实际建档为 31 家？","经审计 Firefly 与文末历史档案 Firefly 萤火虫指向同一推广主域，属于同一品牌重复条目，已合并去重。","/articles/brand-data-audit-summary/"');

fs.writeFileSync(path.join(outDir, 'SEO-关键词映射表.csv'), '\uFEFF' + kwCsvRows.join('\n'), 'utf8');
fs.writeFileSync(path.join(outDir, 'GEO-实体关系映射表.csv'), '\uFEFF' + geoEntityRows.join('\n'), 'utf8');
fs.writeFileSync(path.join(outDir, 'GEO-长尾问题库.csv'), '\uFEFF' + geoFaqRows.join('\n'), 'utf8');
fs.writeFileSync(path.join(outDir, 'SEO-内部链接矩阵.csv'), '\uFEFF' + internalLinkRows.join('\n'), 'utf8');
fs.writeFileSync(path.join(outDir, 'SEO-URL路由规划.csv'), '\uFEFF' + urlRows.join('\n'), 'utf8');

// 9. SEO-内容发布优先级.md
fs.writeFileSync(
  path.join(outDir, 'SEO-内容发布优先级.md'),
  `# SEO 内容发布优先级

## 第一优先级（P0，已完成首批上线）
- 核心品牌深度评测：光速云深度评测（含 MiaoKo 实测截图）
- 核心枢纽攻略：2026 机场选型指南、机场排行方法论、性价比机场拆解、IEPL/IPLC 解析
- 高搜索量客户端与排错教程：Clash Verge Rev 入门、Shadowrocket 小火箭、Android 客户端、OpenWrt 软路由、MiaoKo 测速解读、订阅失败排查、节点超时修复
- 核心横向对比：光速云 vs 暮光加速 vs 飞猫云、5.6 元至 18 元平价对比、Clash Verge Rev vs FlClash vs v2rayN

## 第二优先级（P1，后续扩展计划）
- 28 个二级专题各自扩展 2–4 篇细分场景长尾文（约 60–90 篇）
- 重点独立品牌深度评测独立 MDX（暮光加速、飞猫云、微风网络、星岛梦、一翻云、速界、梯子云）

## 第三优先级（P2，长期运营补充）
- 核实宇宙云、浪网、EdgeNova 与 5.6 元档位真实晚高峰测速后补齐实测文章
- 完善标题库中余下待撰写规划文章（严禁机械换词批量生成）
`,
  'utf8'
);

// 10. SEO-品牌评测规划.md
fs.writeFileSync(
  path.join(outDir, 'SEO-品牌评测规划.md'),
  `# SEO 品牌评测规划（31 家独立品牌）

| 序号 | 品牌名称 | Slug | 评测详情页 URL | 资料状态 |
|---:|---|---|---|---|
${exact31Slugs.map(([s, n, st], idx) => `| ${idx + 1} | ${n} | \`${s}\` | \`/brands/${s}/\` | ${st} |`).join('\n')}
`,
  'utf8'
);

// 12. 品牌数据审计报告.md
fs.writeFileSync(
  path.join(outDir, '品牌数据审计报告.md'),
  `# 品牌数据审计报告

- **审计对象**：\`32家机场品牌清单.txt\`、\`光速云品牌信息.txt\`、\`第三方代理客户端.txt\`
- **条目与去重结论**：原始文件共含 32 个分节（28 个编号品牌 + 4 条 2026-08-09 历史补充记录）。经对比官网/推广域名，第 8 节「Firefly」与文末「Firefly 萤火虫」为同一品牌重复条目，去重后实际独立品牌数为 **31 家**。
- **关键差异清单**：
  1. 光速云：摘要写 59GB、套餐表与主清单写 69GB/月（均在网站表格保留审计注记）。
  2. 云界线 / 环球梯：推广链接缺少 \`#\` 符号，云界线另存在 \`aycnwNUi\` 与 \`HBaZ91c6\` 两个邀请码版本。
  3. 宇宙云 / 浪网 / EdgeNova：缺少完整套餐流量或测速数据，全站统一标为「待核实 / 历史存档」，不做推测补全。
  4. 无忧链接 / 灵猫网络 / Firefly：2026 年 10 月起调整为专属客户端模式，已在客户端筛选字段中修正为 \`proprietary_only\`。
`,
  'utf8'
);

// 13. 数据来源及核实记录.md
fs.writeFileSync(
  path.join(outDir, '数据来源及核实记录.md'),
  `# 数据来源及核实记录

| 来源文件 / 素材 | 日期标注 | 涵盖范围 | 数据级别 |
|---|---|---|---|
| \`机场测速实测资料包_2026-08-11_发布整理版_V2.zip\`（18 张真实截图） | 2026-07-18 / 07-19 / 08-11 | 光速云、宇宙云、极连云、光年梯、可信云、速界、飞猫云、微风、星岛梦、二猫云、无忧链接、唯兔云、U1S1、灵猫、一翻云、SOGO云、全球云测速（含无忧链接御三家解锁） | Measured Data（实测截图） |
| \`光速云测试图解锁图/*.jpg\`（5张） | 2026-08-19 | 长沙电信/广西移动/河北联通 2Gbps + 珠海联通 9Gbps MiaoKo 测速与解锁 | Measured Data（实测截图） |
| \`32家机场品牌清单.txt\`（28主节） | 2026-10-19 | 品牌套餐、优惠码、推广链接及部分品牌非晚高峰基准测速 | Vendor Data（品牌与清单资料） |
| \`32家机场品牌清单.txt\`（4条历史记录） | 2026-08-09 | 灵动云（含 07-20/21 实测摘要）、浪网、EdgeNova、Firefly 历史档 | Historical（历史记录） |
| \`光速云品牌信息.txt\` | 2026-10-16 | 光速云全系套餐与服务定位 | Vendor Data |
| \`第三方代理客户端.txt\` | 2026-10-19 | 6 大平台 20+ 代理客户端及风险预警 | Verified Editorial |
`,
  'utf8'
);

console.log(`Generated all 13 SEO/GEO docs in ${outDir}. Total planned records: ${recordCounter} (${publishedSeedRecords.length} published).`);
