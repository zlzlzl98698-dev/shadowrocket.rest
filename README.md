<div align="center">

<img src="./public/logos/site-avatar.webp" alt="小火箭 shadowrocket.rest 标志" width="88" height="88" />

# 小火箭 · shadowrocket.rest

**中文机场评测媒体 · 31 家品牌核实数据库 · SEO / GEO 内容矩阵 · 代理客户端知识库**

[![Astro](https://img.shields.io/badge/Astro-7.4.13-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Pagefind](https://img.shields.io/badge/Search-Pagefind_1.6-2563EB)](https://pagefind.app/)
[![Output](https://img.shields.io/badge/Deploy-Apache_Static-D22128?logo=apache&logoColor=white)](#-apache-静态部署指南)

[核心架构](#-核心架构与功能矩阵) · [内容与品牌库](#-内容矩阵与数据分级) · [本地开发与构建](#-本地开发与构建校验) · [Apache 部署](#-apache-静态部署指南) · [日常维护](#-日常内容与站点维护)

</div>

---

## ✨ 项目简介

**小火箭（`https://shadowrocket.rest/`）** 是一个基于 **Astro 7 + Tailwind CSS v4 + Content Collections（Markdown/MDX）+ Pagefind + Apache 静态部署** 打造的现代化中文网络代理工具与机场评测媒体网站。

项目采用 **Minimal Editorial Blog + Modern Card Layout** 蓝白极简媒体风格，围绕“真实测速截图核查、透明套餐周期拆分、客户端实操排错与全站 SEO/GEO 结构化语义”设计，所有核心页面均在构建期静态预渲染（SSG）为纯 HTML，确保 Google、Bing、神马（`yisouspider`）与百度爬虫零门槛抓取。

---

## 🚀 核心架构与功能矩阵

| 模块 | 实现方案与关键特性 | 源码位置 |
| :--- | :--- | :--- |
| **静态站点核心** | Astro `output: 'static'`，Trailing Slash 统一规范，326 个预渲染页面 | [`astro.config.mjs`](./astro.config.mjs) |
| **卡片式视觉系统** | Tailwind CSS v4 + CSS Variables（`#FFFFFF` / `#F7F9FC` / `#2563EB`），11 种语义化卡片组件 | [`src/styles/global.css`](./src/styles/global.css) / [`src/components/cards/`](./src/components/cards/) |
| **四级栏目内容树** | 4 个一级频道（`airport` / `vpn` / `clash` / `resources`）+ 28 个二级专题 + 56 个三级集群 | [`src/data/navigation.ts`](./src/data/navigation.ts) / [`src/data/clusters.ts`](./src/data/clusters.ts) |
| **31 家品牌数据库** | 原始 32 条资料去重审计为 31 家独立品牌，支持线路/价位/客户端/AI/不限时包前端实时筛选 | [`src/data/brands/`](./src/data/brands/) / [`src/pages/brands/`](./src/pages/brands/) |
| **交互式对比器** | `/compare/` 零框架原生 JS 2–3 家品牌并排对比（SSR 默认 3 家 + 一键预设组） | [`src/pages/compare/index.astro`](./src/pages/compare/index.astro) |
| **中文全文搜索** | 构建期生成 Pagefind 中文分词索引（117 页 / 58,986 词条），支持全局检索 | [`src/pages/search/index.astro`](./src/pages/search/index.astro) |
| **SEO / GEO 基础设施** | 自指向 HTTPS Canonical、`sitemap.xml` + `sitemap-index.xml`（136 条索引 URL）、RSS 2.0、光栅 `og:image`（`1200×630` PNG）及全量 JSON-LD | [`src/components/common/SEOHead.astro`](./src/components/common/SEOHead.astro) |
| **自动化验收门禁** | 构建后自动校验断链、图片与 SVG XML 转义、Schema 一致性、推广链接 `rel` 属性与正文 ≥ 3,500 汉字深度 | [`scripts/verify-build.mjs`](./scripts/verify-build.mjs) |

---

## 📊 内容矩阵与数据分级

### 1. 已发布原创长文（共 50 篇）

全部长文均包含顶部 **Answer-First 核心摘要**、结构化 `<table>` 对比表、`<details>/<summary>` 折叠 FAQ，并通过正文 ≥ 3,500 纯汉字（实际 4,306–6,147 字）门禁校验：

- **品牌深度评测 MDX（`src/content/reviews/` · 20 篇）**：覆盖光速云、暮光加速、飞猫云、微风网络、星岛梦、一翻云、无忧链接、宇宙云、极连云、光年梯、速界、可信云、二猫云、唯兔云、U1S1、SOGO 云、全球云、灵猫网络、梯子云、闪跃、隐形人及 Firefly（萤火虫），内嵌价格明细表、测速报告与解锁矩阵组件。
- **核心与二级专题专栏（`src/content/articles/` · 20 篇）**：涵盖 2026 机场推荐与排行方法论、IEPL/IPLC 线路原理、VLESS/Trojan/HY2 协议对比、AI（ChatGPT/Claude/Gemini）与 Netflix 解锁、Clash Verge 订阅、Clash 规则教程、免费 VPN 真相与风险审计。
- **实操与排错手册（`src/content/guides/` · 7 篇）**：覆盖 Windows/macOS/Linux（Clash Verge Rev）、iOS（Shadowrocket 小火箭）、Android、OpenWrt 软路由、MiaoKo 测速图解读、订阅报错排查与 Timeout 修复。
- **横向对比专题（`src/content/comparisons/` · 3 篇）**：同价位档位、主力品牌与桌面开源客户端横评。

### 2. 四级数据核实口径

本站严格区分信息可信度边界，绝不以示例数值或年付折算均价冒充普通月付或全时段实测：

| 数据标签 | 含义与页面标识 |
| :--- | :--- |
| **Measured Data（实测截图）** | 附带具体时间戳、运营商宽带（如珠海联通 5Gbps/9Gbps）与完整截图，保留 `0B`/异常节点 |
| **Vendor Data（厂商与清单资料）** | 源自公开资料或非晚高峰基准，显式提示非全时段承诺并记录口径差异 |
| **Historical（历史记录）** | 源自早期归档（如灵动云、浪网、边缘节点 EdgeNova），提示核对现价与可用性 |
| **Unverified（待核实）** | 缺失实测图或套餐空白时（如 5.6 元低价档、浪网、EdgeNova），如实留空并标记待核实 |

---

## 🗂️ 目录结构概览

```text
shadowrocket.rest/
├── .htaccess                      # Apache 301(www->裸域 / HTTPS / 尾部斜杠)、404、Gzip 与缓存头
├── astro.config.mjs               # Astro 静态配置与 @astrojs/sitemap 薄归档过滤逻辑
├── package.json                   # 脚本入口：dev / build / build:verify / preview
├── public/
│   ├── robots.txt                 # 爬虫规则（放行 / 与静态资源，屏蔽 /pagefind/）
│   ├── logos/                     # 站点头像（site-avatar.webp）与品牌图标
│   └── images/
│       ├── covers/                # 9 张专题 SVG 封面 + 1200×630 PNG 社交/Schema 副本
│       └── tests/                 # 真实 MiaoKo / 流媒体解锁实测截图归档
├── scripts/
│   ├── copy-htaccess.mjs          # 复制 .htaccess 并导出平铺版 dist/sitemap.xml
│   ├── verify-build.mjs           # 全站构建产物、外链 rel、Schema、SVG 与深度校验脚本
│   └── generate-seo-docs.mjs      # 生成 docs/seo-geo/ 全套 13 份 SEO/GEO 规划文档
├── src/
│   ├── content/                   # articles / reviews / guides / comparisons / topics
│   ├── content.config.ts          # Zod Content Collections Schema 校验定义
│   ├── components/                # cards / charts / common / navigation / review / search / topic
│   ├── data/                      # site.ts（全站配置与站长验证码预留）、brands/、navigation.ts、clusters.ts、clients.ts
│   ├── layouts/                   # BaseLayout / ArticleLayout / BrandLayout / CategoryLayout / TopicLayout
│   ├── pages/                     # 全站静态路由 + rss.xml.ts + compare/ + brands/ + search/
│   └── utils/                     # content.ts / seo.ts 工具函数
└── docs/seo-geo/                  # 13 份 SEO/GEO 集群规划、关键词表、内链矩阵与审计报告
```

---

## 🛠️ 本地开发与构建校验

> 环境要求：Node.js `>= 20` 与 `npm`。

```bash
# 1. 安装项目依赖
npm install

# 2. 启动本地开发服务器
npm run dev

# 3. 执行完整生产构建（Astro SSG + Pagefind 索引 + 复制 .htaccess 与 sitemap.xml）
npm run build

# 4. 执行构建并运行全站自动化校验（推荐每次修改后必跑）
npm run build:verify

# 5. 本地预览 dist/ 构建产物
npm run preview
```

---

## 🌐 Apache 静态部署指南

1. 运行 `npm run build:verify`，确认退出码为 `0` 且输出 `Errors: 0, Warnings: 0`。
2. 将生成的 `dist/` 目录全量上传至 Apache 虚拟主机根目录（需包含隐藏文件 `dist/.htaccess`、`dist/sitemap.xml`、`dist/sitemap-index.xml`、`dist/rss.xml`、`dist/robots.txt` 与 `dist/pagefind/`）。
3. 确认 Apache 已启用 `mod_rewrite`、`mod_headers`、`mod_expires`、`mod_deflate` 且允许 `AllowOverride All`：
   - 自动将 `www.shadowrocket.rest` 与 `http://` 301 重定向至 `https://shadowrocket.rest/`；
   - 自动补全目录路径尾部斜杠；
   - 配置真实 `ErrorDocument 404 /404.html` 与 `Options -Indexes`，不使用错误的 SPA 全站回退。
4. 如需注入站长平台 Meta 验证码，只需填写 [`src/data/site.ts`](./src/data/site.ts) 中的 `siteVerification.{google, bing, shenma, baidu}` 后重新构建即可静态输出至 `<head>`。

---

## 📝 日常内容与站点维护

- **新增文章 / 评测 / 教程**：分别在 `src/content/{articles,reviews,guides,comparisons}/` 下新建 Markdown/MDX，遵循 [`src/content.config.ts`](./src/content.config.ts) 必填 Frontmatter；禁止在正文中硬编码服务商推广链接，请统一使用 `<BrandCTA brandSlug="..." />` 组件或内部链接 `/brands/<slug>/`。
- **更新品牌与推广链接**：品牌参数位于 `src/data/brands/tier-*.ts`，全部外链与优惠码集中维护于 [`src/data/brands/links.ts`](./src/data/brands/links.ts)（构建脚本会强制校验全站外链具备 `rel="nofollow sponsored noopener"`）。
- **SEO / GEO 审计与规划文档**：项目根目录保留 [`PROGRESS.md`](./PROGRESS.md) 与 [`Preventive_SEO_Audit_Report.md`](./Preventive_SEO_Audit_Report.md)，其余 13 份映射与词库位于 [`docs/seo-geo/`](./docs/seo-geo/)（可通过 `node scripts/generate-seo-docs.mjs` 同步刷新）。
