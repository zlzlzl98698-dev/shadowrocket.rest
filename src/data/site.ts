export const SITE = {
  name: '小火箭',
  fullName: '小火箭 · 中文网络工具与机场评测媒体',
  domain: 'shadowrocket.rest',
  url: 'https://shadowrocket.rest',
  locale: 'zh-CN',
  description:
    '专注中文代理工具知识、机场品牌客观评测、套餐核实数据库、Clash Verge Rev / Shadowrocket 客户端教程与网络故障排查的专业评测博客。',
  tagline: '用可核实的测速、透明的套餐数据与清晰的客户端教程，帮中文用户少走弯路',
  authorDefault: {
    name: '小火箭编辑部',
    role: '网络线路评测与技术文档团队',
    bio: '专注于跨境网络传输协议、IEPL/IPLC 专线架构测试、第三方代理客户端配置与服务商数据核实。',
  },
  contact: {
    email: 'editorial@shadowrocket.rest',
    telegramNote: '内容纠错、品牌数据更新与测试反馈请通过站内联系邮箱沟通。',
  },
  siteVerification: {
    // 填入对应平台验证码字符串后重新构建即可静态注入 <head>
    google: '', // <meta name="google-site-verification" content="..." />
    bing: '', // <meta name="msvalidate.01" content="..." />
    shenma: '', // <meta name="shenma-site-verification" content="..." />
    baidu: '', // <meta name="baidu-site-verification" content="..." />
  },
  disclosure: {
    short: '含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。',
    full: '本站部分服务商注册入口采用合作推广链接（均标注 rel="nofollow sponsored noopener"）。商业合作不影响独立测速记录、套餐核实状态标注与风险提示，商用推荐位置与独立实测结论严格区分。',
  },
  editorialPolicy: {
    lastAuditDate: '2026-11-19',
    testMethodology:
      '本站区分「独立实测数据（Measured Data）」「服务商宣称资料（Vendor Data）」「历史存档数据（Historical）」与「待核实（Unverified）」，不将示例或年付折算价冒充普通月付价格。',
  },
  copyright: '© 2026 小火箭 (shadowrocket.rest). 保留所有权利。',
} as const;
