export type PillarKey = 'airport' | 'vpn' | 'clash' | 'resources';

export interface SubTopic {
  slug: string;
  name: string;
  pillar: PillarKey;
  href: string;
  shortDesc: string;
  intro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
  targetAudience: string;
  featuredBrandSlugs: string[];
  relatedGuideSlugs: string[];
}

export interface PillarNav {
  key: PillarKey;
  name: string;
  href: string;
  subtitle: string;
  description: string;
  primaryKeyword: string;
  badge: string;
  items: SubTopic[];
}

export const PILLARS: PillarNav[] = [
  {
    key: 'airport',
    name: '机场推荐',
    href: '/airport/',
    subtitle: '品牌数据库 · 套餐对比 · 专线评测',
    description:
      '基于 31 家独立核实品牌档案、套餐计费周期拆解、IEPL/IPLC 线路与 AI/流媒体测试数据，提供条件化筛选与透明排行。',
    primaryKeyword: '机场推荐',
    badge: '核心评测专题',
    items: [
      {
        slug: 'tuijian',
        name: '机场推荐',
        pillar: 'airport',
        href: '/airport/tuijian/',
        shortDesc: '按预算、线路类型、设备数与 AI 解锁场景筛选适合的稳定方案。',
        intro:
          '2026 年选择机场服务不应只看宣传带宽或最低月均价，而应结合个人常用终端、晚高峰稳定性、AI 工具（ChatGPT/Claude/Gemini）兼容需求与付款周期风险综合判断。本专题汇总已完成资料核实的品牌方案。',
        primaryKeyword: '2026 机场推荐',
        secondaryKeywords: ['机场推荐', '靠谱机场', '梯子推荐', '机场指南'],
        searchIntent: 'Commercial',
        targetAudience: '需要寻找稳定可用、价格透明代理服务的中文用户',
        featuredBrandSlugs: ['guangsuyun', 'muguang', 'feimao', 'weifeng', 'xingdaomeng', 'tiziyun'],
        relatedGuideSlugs: ['clash-verge-rev-beginner-guide', 'shadowrocket-ios-setup'],
      },
      {
        slug: 'paihang',
        name: '机场排行',
        pillar: 'airport',
        href: '/airport/paihang/',
        shortDesc: '明确区分商业推广位置与独立实测维度，公开排名评估标准。',
        intro:
          '榜单排序结合运营年限、线路架构透明度、MiaoKo/第三方测速记录完整度、协议支持与套餐灵活性五个维度，并明确标示商业推广合作关系，拒绝黑箱排名。',
        primaryKeyword: '机场排行',
        secondaryKeywords: ['机场排名', '2026 机场榜单', '机场评测排行'],
        searchIntent: 'Commercial',
        targetAudience: '希望快速对比主流机场综合表现与排名依据的决策用户',
        featuredBrandSlugs: ['guangsuyun', 'muguang', 'feimao', 'weifeng', 'dalaoyun', 'xingdaomeng'],
        relatedGuideSlugs: ['how-to-read-miaoko-speedtest'],
      },
      {
        slug: 'xingjiabi',
        name: '性价比机场',
        pillar: 'airport',
        href: '/airport/xingjiabi/',
        shortDesc: '拆解年付折算价、不限时流量包与月付中低价位的真实单价。',
        intro:
          '性价比不等于单纯低价，而是单位人民币获得的稳定可用流量与跨区解锁能力。本专题对比 5.6 元至 25 元档主流方案，严格区分年付折算价与单月付费价格。',
        primaryKeyword: '性价比机场',
        secondaryKeywords: ['高性价比机场', '便宜好用机场', '学生党机场推荐'],
        searchIntent: 'Commercial',
        targetAudience: '预算敏感但对日用稳定性与 AI 访问有明确要求的个人用户',
        featuredBrandSlugs: ['guangsuyun', 'weifeng', 'yifan', 'jilian', 'guangnian', 'tiziyun'],
        relatedGuideSlugs: ['airport-pricing-trap-guide'],
      },
      {
        slug: 'wending',
        name: '稳定机场',
        pillar: 'airport',
        href: '/airport/wending/',
        shortDesc: '聚焦 IEPL / IPLC 专线架构、多入口冗余与晚高峰传输表现。',
        intro:
          '面向跨境电商、远程开发与高频 AI 办公用户，重点分析运营时间较长、具备 BGP 多线入口及企业级专线架构的品牌，并提示潜在单点故障风险。',
        primaryKeyword: '稳定机场',
        secondaryKeywords: ['晚高峰稳定机场', 'IEPL 专线机场', 'IPLC 机场推荐'],
        searchIntent: 'Commercial',
        targetAudience: '依赖全天候稳定连接的远程办公、外贸及开发者群体',
        featuredBrandSlugs: ['guangsuyun', 'muguang', 'xingdaomeng', 'ermao', 'weitu', 'shanyue'],
        relatedGuideSlugs: ['iepl-vs-iplc-vs-relay'],
      },
      {
        slug: 'pianyi',
        name: '便宜机场',
        pillar: 'airport',
        href: '/airport/pianyi/',
        shortDesc: '整理 5.6 元至 15 元入门档位方案，同时标注限制与低价风险。',
        intro:
          '汇总年付折算约 5.6 元–12 元/月的轻量化机场套餐及小额不限时流量包，客观列出流量上限、单季/年付门槛及同质化套餐对比，避免低价盲目踩坑。',
        primaryKeyword: '便宜机场',
        secondaryKeywords: ['低价机场', '年付便宜机场', '备用机场推荐'],
        searchIntent: 'Commercial',
        targetAudience: '轻度浏览、需要低成本备用线路或初次尝试的学生用户',
        featuredBrandSlugs: ['shandianshu', 'dalaoyun', 'yunjiexian', 'liulianyun', 'huanqiuti', 'wuyou'],
        relatedGuideSlugs: ['airport-pricing-trap-guide'],
      },
      {
        slug: 'mianfei-tizi',
        name: '免费梯子',
        pillar: 'airport',
        href: '/airport/mianfei-tizi/',
        shortDesc: '理性评估免费梯子的带宽瓶颈、隐私风险与合规替代方案。',
        intro:
          '搜索“免费梯子”的用户往往只是为了临时应急或下载客户端。本专题客观剖析公开免费梯子的流量嗅探风险、极不稳定原因，并提供低成本试用及开源客户端自建思路。',
        primaryKeyword: '免费梯子',
        secondaryKeywords: ['免费机场', '免费科学上网', '免费梯子安全吗'],
        searchIntent: 'Informational',
        targetAudience: '预算为零或仅需临时应急访问海外资源的入门用户',
        featuredBrandSlugs: ['shandianshu', 'wuyou', 'guangsuyun'],
        relatedGuideSlugs: ['free-proxy-security-risks'],
      },
      {
        slug: 'kexue-shangwang',
        name: '科学上网',
        pillar: 'airport',
        href: '/airport/kexue-shangwang/',
        shortDesc: '从零理解订阅链接、代理协议、分流规则与多设备协同原理。',
        intro:
          '系统梳理新手最关心的入门概念：什么是机场订阅、为什么需要客户端、Shadowsocks / Trojan / VLESS / Hysteria 2 有何区别，以及如何安全完成首次连接。',
        primaryKeyword: '科学上网',
        secondaryKeywords: ['科学上网教程', '新手机场入门', '代理原理科普'],
        searchIntent: 'Informational',
        targetAudience: '首次接触代理工具与跨境网络的零基础新手',
        featuredBrandSlugs: ['feimao', 'tiziyun', 'guangsuyun', 'wuyou'],
        relatedGuideSlugs: ['clash-verge-rev-beginner-guide', 'vless-vs-trojan-vs-hy2'],
      },
    ],
  },
  {
    key: 'vpn',
    name: 'VPN 与加速器',
    href: '/vpn/',
    subtitle: '协议对比 · 跨平台工具 · 加速评测',
    description:
      '解析传统商业 VPN、自研客户端机场与通用代理软件在速度、分流精度、移动端续航及流媒体/AI 场景下的真实差异。',
    primaryKeyword: 'VPN 推荐',
    badge: '应用与加速评测',
    items: [
      {
        slug: 'tuijian',
        name: 'VPN 推荐',
        pillar: 'vpn',
        href: '/vpn/tuijian/',
        shortDesc: '对比传统 VPN 与专线代理工具在中文网络环境下的连通率差异。',
        intro:
          '传统海外 VPN 与国内优化的专线代理在协议特征、抗干扰能力与晚高峰延迟上存在显著差异。本专题帮助用户在两类产品之间做出符合实际网络环境的判断。',
        primaryKeyword: 'VPN 推荐',
        secondaryKeywords: ['2026 VPN 推荐', '电脑 VPN 推荐', '外贸 VPN'],
        searchIntent: 'Commercial',
        targetAudience: '正在对比海外商业 VPN 与国内中转/专线服务商的用户',
        featuredBrandSlugs: ['guangsuyun', 'muguang', 'feimao', 'tiziyun'],
        relatedGuideSlugs: ['vpn-vs-airport-proxy-guide'],
      },
      {
        slug: 'mianfei-vpn',
        name: '免费 VPN',
        pillar: 'vpn',
        href: '/vpn/mianfei-vpn/',
        shortDesc: '分析免费 VPN 的限速策略、日志隐私条款与连接失败常见原因。',
        intro:
          '市面上大多数所谓“永久免费 VPN”依靠广告变现、严格限速或限制节点运行。本专题拆解常见免费 VPN 的真实限制与安全隐患，帮助用户避开恶意软件陷阱。',
        primaryKeyword: '免费 VPN',
        secondaryKeywords: ['免费 VPN 推荐', '免费 VPN 安全吗', '免费电脑 VPN'],
        searchIntent: 'Informational',
        targetAudience: '寻找免费替代品但担心隐私泄漏或软件捆绑的普通用户',
        featuredBrandSlugs: ['shandianshu', 'feimao', 'wuyou'],
        relatedGuideSlugs: ['free-proxy-security-risks'],
      },
      {
        slug: 'shouji-vpn',
        name: '手机 VPN',
        pillar: 'vpn',
        href: '/vpn/shouji-vpn/',
        shortDesc: '涵盖 iOS Shadowrocket、Android v2rayNG / FlClash 与自研 App 体验。',
        intro:
          '针对 iPhone、iPad 与安卓手机在蜂窝网络、Wi-Fi 切换及后台保活场景下的痛点，评测免配置自研客户端与第三方规则客户端的耗电、延迟与分流表现。',
        primaryKeyword: '手机 VPN',
        secondaryKeywords: ['苹果手机 VPN', '安卓 VPN 推荐', '手机梯子'],
        searchIntent: 'Commercial',
        targetAudience: '主要在 iOS 和 Android 移动设备上使用跨境网络的用户',
        featuredBrandSlugs: ['feimao', 'tiziyun', 'wuyou', 'guangsuyun'],
        relatedGuideSlugs: ['shadowrocket-ios-setup', 'android-proxy-clients-guide'],
      },
      {
        slug: 'ruanjian-pingce',
        name: 'VPN 软件评测',
        pillar: 'vpn',
        href: '/vpn/ruanjian-pingce/',
        shortDesc: '从内核架构、分流引擎、DNS 防泄漏与 UI 易用性客观评测客户端。',
        intro:
          '深入评测主流代理客户端与机场自研客户端的技术细节，覆盖 Mihomo (Clash Meta)、sing-box、Xray 等核心在规则匹配、内存占用与 TUN 接管上的实际表现。',
        primaryKeyword: 'VPN 软件评测',
        secondaryKeywords: ['代理软件评测', '客户端对比', '自研客户端评测'],
        searchIntent: 'Informational',
        targetAudience: '注重软件安全性、规则控制力与多端统一体验的进阶用户',
        featuredBrandSlugs: ['guangsuyun', 'sogo', 'yinxingren', 'firefly'],
        relatedGuideSlugs: ['clash-verge-rev-vs-flclash-vs-v2rayn'],
      },
      {
        slug: 'jiasuqi',
        name: 'VPN 加速器',
        pillar: 'vpn',
        href: '/vpn/jiasuqi/',
        shortDesc: '解析跨境办公、AI 模型请求与 4K 流媒体场景的链路加速机制。',
        intro:
          '探讨 BGP 多线入口、IEPL 物理专线与协议层优化（如 Hysteria 2 / VLESS Reality）如何降低跨洋抖动与丢包，澄清“游戏加速器”与“全协议代理加速器”的功能边界。',
        primaryKeyword: 'VPN 加速器',
        secondaryKeywords: ['网络加速器', 'ChatGPT 加速器', '跨境加速工具'],
        searchIntent: 'Informational',
        targetAudience: '需要改善海外 SaaS、AI 接口及视频流加载卡顿的用户',
        featuredBrandSlugs: ['sujie', 'guangsuyun', 'yifan', 'shanyue'],
        relatedGuideSlugs: ['iepl-vs-iplc-vs-relay'],
      },
      {
        slug: 'jiasuqi-duibi',
        name: '加速器对比',
        pillar: 'vpn',
        href: '/vpn/jiasuqi-duibi/',
        shortDesc: '横向对比专线型、中转型与专属客户端型的优缺点及适用场景。',
        intro:
          '通过结构化参数矩阵对比不同技术路线与价位段的产品差异，包括自研客户端 vs 通用订阅、月付 vs 不限时流量包、原生 IP 解锁 vs 普通中转节点的实际权衡。',
        primaryKeyword: '加速器对比',
        secondaryKeywords: ['VPN 对比', '机场横向对比', '专线与中转对比'],
        searchIntent: 'Commercial',
        targetAudience: '已在两三个候选方案之间犹豫、需要参数化对比的准购买用户',
        featuredBrandSlugs: ['guangsuyun', 'muguang', 'yifan', 'sogo'],
        relatedGuideSlugs: ['vpn-vs-airport-proxy-guide'],
      },
      {
        slug: 'haoyong-vpn',
        name: '好用的 VPN',
        pillar: 'vpn',
        href: '/vpn/haoyong-vpn/',
        shortDesc: '从零配置上手门槛、客服响应与多终端同步角度筛选顺手工具。',
        intro:
          '好用的核心标准是“少折腾、少断流、出问题能查明原因”。本专题根据“是否需要手动导入订阅”“是否支持多设备不限连接”“AI 平台兼容性”筛选高频好评方案。',
        primaryKeyword: '好用的 VPN',
        secondaryKeywords: ['稳定好用的 VPN', '新手好用的梯子', '免配置 VPN'],
        searchIntent: 'Commercial',
        targetAudience: '希望减少技术配置成本、开箱即用的日常办公与娱乐用户',
        featuredBrandSlugs: ['feimao', 'tiziyun', 'guangsuyun', 'muguang'],
        relatedGuideSlugs: ['clash-verge-rev-beginner-guide'],
      },
    ],
  },
  {
    key: 'clash',
    name: 'Clash 客户端',
    href: '/clash/',
    subtitle: '下载指南 · 订阅配置 · 故障排除',
    description:
      '涵盖 Clash Verge Rev、FlClash、Mihomo 内核、Shadowrocket 及 OpenWrt 插件的官方获取渠道、订阅导入、规则分流与排错手册。',
    primaryKeyword: 'Clash 推荐',
    badge: '全平台技术教程',
    items: [
      {
        slug: 'tuijian',
        name: 'Clash 推荐',
        pillar: 'clash',
        href: '/clash/tuijian/',
        shortDesc: '按 Windows、macOS、Android、iOS、Linux 与软路由推荐活跃维护客户端。',
        intro:
          '在原版 Clash 停止维护后，社区已全面转向 Mihomo（Clash Meta）与 sing-box 生态。本专题严格核实 GitHub 与 App Store 官方项目状态，避免用户下载到高风险山寨包。',
        primaryKeyword: 'Clash 推荐',
        secondaryKeywords: ['Clash 客户端推荐', 'Clash 替代软件', 'Mihomo 客户端'],
        searchIntent: 'Informational',
        targetAudience: '需要选择安全、持续更新的 Clash 系或其他开源代理客户端的用户',
        featuredBrandSlugs: ['guangsuyun', 'weifeng', 'xingdaomeng', 'tiziyun'],
        relatedGuideSlugs: ['clash-verge-rev-vs-flclash-vs-v2rayn'],
      },
      {
        slug: 'clash-verge',
        name: 'Clash Verge',
        pillar: 'clash',
        href: '/clash/clash-verge/',
        shortDesc: '详解 Clash Verge Rev 的架构特性、TUN 模式、系统代理与分流策略。',
        intro:
          'Clash Verge Rev 是目前桌面端（Windows / macOS / Linux）最受推崇的 Mihomo 图形前端之一。本专题深入讲解其功能模块、覆写脚本（Merge/Script）与内存管理。',
        primaryKeyword: 'Clash Verge',
        secondaryKeywords: ['Clash Verge Rev', 'Clash Verge 教程', 'Clash Verge TUN 模式'],
        searchIntent: 'Informational',
        targetAudience: '使用桌面端电脑需要配置稳定规则代理与 TUN 接管的用户',
        featuredBrandSlugs: ['guangsuyun', 'muguang', 'yifan'],
        relatedGuideSlugs: ['clash-verge-rev-beginner-guide'],
      },
      {
        slug: 'clash-verge-download',
        name: 'Clash Verge 下载',
        pillar: 'clash',
        href: '/clash/clash-verge-download/',
        shortDesc: '核对官方 GitHub 发布渠道、系统架构版本区分与防假冒校验方法。',
        intro:
          '网络上充斥大量伪装成 Clash Verge 官网的广告站点与捆绑安装包。本专题提供官方开源仓库识别方法，详细区分 Windows x64/arm64、macOS Intel/Apple Silicon 与 Linux 包格式。',
        primaryKeyword: 'Clash Verge 下载',
        secondaryKeywords: ['Clash Verge Rev 下载', 'Clash Verge 官网', 'Mac Clash 下载'],
        searchIntent: 'Navigational',
        targetAudience: '寻找安全可靠的 Clash Verge Rev 安装包并准备首次安装的用户',
        featuredBrandSlugs: ['guangsuyun', 'tiziyun'],
        relatedGuideSlugs: ['clash-verge-rev-beginner-guide'],
      },
      {
        slug: 'clash-verge-subscription',
        name: 'Clash Verge 订阅',
        pillar: 'clash',
        href: '/clash/clash-verge-subscription/',
        shortDesc: '完整演示机场订阅链接获取、一键导入、自动更新频率与转换排错。',
        intro:
          '手把手说明如何在支持第三方订阅的服务商后台复制 Clash YAML 订阅地址、在 Clash Verge Rev 中导入并开启定时更新，同时澄清哪些品牌仅支持自研客户端而不提供订阅链接。',
        primaryKeyword: 'Clash Verge 订阅',
        secondaryKeywords: ['Clash 订阅导入', '订阅地址怎么用', '订阅更新失败'],
        searchIntent: 'Informational',
        targetAudience: '已购买机场套餐但不知道如何导入订阅或遇到格式错误的新手',
        featuredBrandSlugs: ['guangsuyun', 'weifeng', 'ermao', 'wuyou'],
        relatedGuideSlugs: ['clash-verge-rev-beginner-guide', 'subscription-failed-troubleshooting'],
      },
      {
        slug: 'clash-meta',
        name: 'Clash Meta',
        pillar: 'clash',
        href: '/clash/clash-meta/',
        shortDesc: '科普 Mihomo（原 Clash.Meta）内核的 VLESS-Reality、Hysteria 2 与 DNS 规则。',
        intro:
          'Mihomo 是当前绝大多数新锐机场与桌面客户端的底层引擎。本专题解析其对 VLESS、XTLS-Reality、Hysteria 2、Fake-IP 与 Redir-Host DNS 模式的原生支持逻辑。',
        primaryKeyword: 'Clash Meta',
        secondaryKeywords: ['Mihomo 内核', 'Clash Meta Android', 'VLESS Reality 配置'],
        searchIntent: 'Informational',
        targetAudience: '希望理解底层协议兼容性与自定义分流/DNS 配置的进阶用户',
        featuredBrandSlugs: ['yifan', 'guangsuyun', 'weifeng'],
        relatedGuideSlugs: ['vless-vs-trojan-vs-hy2'],
      },
      {
        slug: 'clash-tutorial',
        name: 'Clash 使用教程',
        pillar: 'clash',
        href: '/clash/clash-tutorial/',
        shortDesc: '覆盖全局模式、规则模式、直连模式、策略组测速与开机自启设置。',
        intro:
          '系统整理日常高频操作：什么时候该切全局模式（Global）？规则模式（Rule）如何避免国内网站绕路？如何利用延迟测试（Latency Test）快速避开拥堵节点？',
        primaryKeyword: 'Clash 使用教程',
        secondaryKeywords: ['Clash 规则模式', 'Clash 全局模式', '小火箭使用教程'],
        searchIntent: 'Informational',
        targetAudience: '刚完成安装需要掌握日常节点切换与模式调节的新手及进阶用户',
        featuredBrandSlugs: ['guangsuyun', 'xingdaomeng', 'tiziyun'],
        relatedGuideSlugs: ['clash-verge-rev-beginner-guide', 'shadowrocket-ios-setup'],
      },
      {
        slug: 'clash-troubleshooting',
        name: 'Clash 故障排查',
        pillar: 'clash',
        href: '/clash/clash-troubleshooting/',
        shortDesc: '按错误现象定位订阅拉取失败、系统时间偏移、端口占用与假连接问题。',
        intro:
          '遇到“节点全部 Timeout”“订阅 Fetch 失败”“开了代理反而国内国外都断网”？本专题提供标准化的五步定位排查流程，覆盖系统代理残留、DNS 污染与 TUN 网卡冲突。',
        primaryKeyword: 'Clash 故障排查',
        secondaryKeywords: ['Clash 连不上网', 'Clash 节点超时', 'Clash 订阅报错'],
        searchIntent: 'Informational',
        targetAudience: '在使用代理过程中突然断连或遭遇报错提示的用户',
        featuredBrandSlugs: ['guangsuyun', 'muguang', 'weifeng'],
        relatedGuideSlugs: ['subscription-failed-troubleshooting', 'node-timeout-dns-fix'],
      },
    ],
  },
  {
    key: 'resources',
    name: '资源与情报',
    href: '/resources/',
    subtitle: '风险预警 · 节点检测 · 疑难百科',
    description:
      '汇总订阅与节点故障百科、品牌异常状态追踪、测速方法论说明及新手避坑清单，所有风险提示均附可查来源与核实日期。',
    primaryKeyword: '机场 FAQ',
    badge: '情报与百科',
    items: [
      {
        slug: 'free-nodes',
        name: '免费节点',
        pillar: 'resources',
        href: '/resources/free-nodes/',
        shortDesc: '解析免费节点的获取原理、失效规律与公开订阅的安全边界。',
        intro:
          '针对临时测试客户端或应急使用场景，解释 GitHub/Telegram 公开免费节点的真实可用周期、常见限速与钓鱼订阅风险，指导如何用安全隔离方式做连接测试。',
        primaryKeyword: '免费节点',
        secondaryKeywords: ['免费 Clash 节点', '免费 V2Ray 节点', '免费节点安全吗'],
        searchIntent: 'Informational',
        targetAudience: '希望理解免费节点来源或测试客户端安装是否正常的用户',
        featuredBrandSlugs: ['shandianshu', 'wuyou'],
        relatedGuideSlugs: ['free-proxy-security-risks'],
      },
      {
        slug: 'runaway-warning',
        name: '跑路预警',
        pillar: 'resources',
        href: '/resources/runaway-warning/',
        shortDesc: '识别高危机场套路：超低价永久套餐、长期失联、域名频繁失效信号。',
        intro:
          '机场跑路往往有迹可循。本专题总结历史跑路案例的共性预警信号（如无节制促销多年付、全线长期超时无公告、工单停摆），并建议控制单次预付周期以降低损失。',
        primaryKeyword: '跑路预警',
        secondaryKeywords: ['机场跑路', '跑路机场名单', '怎么防机场跑路'],
        searchIntent: 'Informational',
        targetAudience: '准备购买年付/多年付套餐或发现当前机场异常的用户',
        featuredBrandSlugs: ['guangsuyun', 'kexin', 'ermao'],
        relatedGuideSlugs: ['airport-pricing-trap-guide'],
      },
      {
        slug: 'faq',
        name: '机场 FAQ',
        pillar: 'resources',
        href: '/resources/faq/',
        shortDesc: '集中解答流量倍率、设备数限制、年付折算与退款规则等高频疑问。',
        intro:
          '汇总新人与老用户最常提出的 20 余个实操问题：1 倍率和 2 倍率流量怎么算？不限设备会不会被封号？为什么香港节点看不了 Gemini？一文给出明确答案。',
        primaryKeyword: '机场 FAQ',
        secondaryKeywords: ['机场常见问题', '机场流量倍率', '机场不限设备'],
        searchIntent: 'Informational',
        targetAudience: '在购买前或日常使用中遇到计费、规则与平台解锁疑惑的用户',
        featuredBrandSlugs: ['guangsuyun', 'kexin', 'sujie'],
        relatedGuideSlugs: ['how-to-read-miaoko-speedtest'],
      },
      {
        slug: 'risk-intel',
        name: '机场风险情报',
        pillar: 'resources',
        href: '/resources/risk-intel/',
        shortDesc: '记录品牌资料缺口、推广链接格式异常、协议标注模糊等透明审计情报。',
        intro:
          '建立可追溯的品牌情报档案，如实披露各服务商的资料完整性：包括云界线/环球梯推广链接缺少 # 号异常、宇宙云/浪网价格字段缺失、Firefly 重复条目等核查发现。',
        primaryKeyword: '机场风险情报',
        secondaryKeywords: ['机场信息核查', '机场数据审计', '机场链接异常'],
        searchIntent: 'Informational',
        targetAudience: '重视信息透明度、希望在下单前核查品牌真实状态的用户',
        featuredBrandSlugs: ['kexin', 'yuzhou', 'langwang', 'yunjiexian', 'huanqiuti'],
        relatedGuideSlugs: ['airport-pricing-trap-guide'],
      },
      {
        slug: 'node-testing',
        name: '节点检测',
        pillar: 'resources',
        href: '/resources/node-testing/',
        shortDesc: '看懂 MiaoKo 测速图、TLS RTT、HTTPS 延迟、IP 风险度与流媒体解锁标示。',
        intro:
          '测速不是只看最高下载峰值。本专题结合光速云真实 MiaoKo 测速截图，手把手拆解 TLS RTT 与 HTTPS Ping 的区别、IPType（机房/家宽）、以及 ChatGPT 仅 App 解锁等关键指标。',
        primaryKeyword: '节点检测',
        secondaryKeywords: ['机场测速怎么看', 'MiaoKo 测速图', 'IP 纯净度检测'],
        searchIntent: 'Informational',
        targetAudience: '想读懂评测图表、自行判断节点真实质量与 AI 解锁能力的用户',
        featuredBrandSlugs: ['guangsuyun', 'lingdongyun'],
        relatedGuideSlugs: ['how-to-read-miaoko-speedtest'],
      },
      {
        slug: 'subscription-issues',
        name: '订阅问题',
        pillar: 'resources',
        href: '/resources/subscription-issues/',
        shortDesc: '解决订阅链接被墙、UA 标识被拒、节点列表为空与配置解析错误。',
        intro:
          '梳理机场订阅拉取失败的五大高频原因：订阅域名受网络干扰、客户端 User-Agent 不兼容、套餐到期流量耗尽、以及只提供自研客户端的品牌误操作导入订阅。',
        primaryKeyword: '订阅问题',
        secondaryKeywords: ['订阅失败', 'Clash 订阅更新不了', '小火箭订阅报错'],
        searchIntent: 'Informational',
        targetAudience: '在导入或更新订阅时遇到 Network Error / Invalid Config 的用户',
        featuredBrandSlugs: ['wuyou', 'feimao', 'sogo', 'yinxingren'],
        relatedGuideSlugs: ['subscription-failed-troubleshooting'],
      },
      {
        slug: 'beginner-help',
        name: '新手帮助',
        pillar: 'resources',
        href: '/resources/beginner-help/',
        shortDesc: '一份按顺序执行的入门路线图：选客户端 → 选套餐 → 导入配置 → 验证连通。',
        intro:
          '为初次接触代理网络的用户准备的防踩坑向导：从设备系统识别开始，教你区分“免订阅自研客户端机场”与“通用订阅机场”，避开山寨官网并顺利完成第一次测试。',
        primaryKeyword: '新手帮助',
        secondaryKeywords: ['机场新手教程', '第一次买机场', '代理软件怎么用'],
        searchIntent: 'Informational',
        targetAudience: '完全没有相关经验、希望按步骤稳妥上手的纯新手',
        featuredBrandSlugs: ['feimao', 'tiziyun', 'guangsuyun', 'weifeng'],
        relatedGuideSlugs: ['clash-verge-rev-beginner-guide', 'shadowrocket-ios-setup'],
      },
    ],
  },
];

export function getPillarByKey(key: PillarKey): PillarNav {
  const found = PILLARS.find((p) => p.key === key);
  if (!found) throw new Error(`Unknown pillar: ${key}`);
  return found;
}

export function getTopicBySlug(pillarKey: PillarKey, topicSlug: string): SubTopic | undefined {
  return getPillarByKey(pillarKey).items.find((t) => t.slug === topicSlug);
}

export function getAllTopics(): SubTopic[] {
  return PILLARS.flatMap((p) => p.items);
}
