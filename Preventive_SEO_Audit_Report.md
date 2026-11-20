# shadowrocket.rest（小火箭）预防性 SEO 与 GEO 全站深度审计报告

- **审计对象**：`c:\Users\Pro User\Desktop\shadowrocket.rest\dist\`（已构建生产静态输出，共 **326** 个 HTML 页面、**324** 条 Sitemap 收录 URL、`robots.txt`、`.htaccess` 与全量 JSON-LD）
- **审计视角**：搜索引擎爬虫工程师、站群与垃圾内容风控算法分析师、GEO/AEO 语义评估师
- **审计时间**：2026-11-20
- **审计原则**：只审计、不修改任何源码；全项基于 `dist/` 实盘产物与响应/配置规则验证，未发现问题的项目如实标注 `PASS`。

---

## 1. 核心健康评分表（0–100 分）

| 审计维度 | 权重占比 | 得分 | 加权分 | 核心诊断说明 |
| :--- | :--- | :--- | :--- | :--- |
| **索引与抓取机制** | 25% | 80 | 20.0 | `PASS`：324 个可索引页 100% 自指向 HTTPS Canonical、0 死链、0 空 `<a>`、`.htaccess` 规范 301。<br>扣分：199 个超薄分类/标签页（占 Sitemap 61.4%）全部放行索引；`robots.txt` 与 `/search/` 的 `noindex` 指令冲突；`/compare/` 仅默认 3 品牌为 SSR。 |
| **站群风控与合规** | 25% | 88 | 22.0 | `PASS`：全部 **111/111** 条已渲染站外商业引流链接 100% 带有 `rel="nofollow sponsored noopener"`；0 共用 GA/百度/AdSense 追踪代码；0 服务器内网/物理路径泄露。<br>扣分：31 个 `/brands/<slug>/` 档案页使用完全一致的 11 节 H2 模板骨架；28/50 篇文章集中在同一发布日期 `2026-11-20`。 |
| **内容深度与 GEO** | 20% | 84 | 16.8 | `PASS`：50 篇深度文章/评测/教程/对比正文均 ≥ 4,306 纯汉字（`<main>` 3,026–9,114 汉字），100% 具备顶部 Answer-First 摘要、`<table>` 与 `<details>` FAQ，0 高代词模糊页面。<br>扣分：193/199 个标签/分类页正文 < 500 汉字；`/vpn/*` 与 `/resources/*` 部分二级专题页及 `/comparisons/` 索引页 < 2,000 字。 |
| **E-E-A-T 与信任** | 15% | 82 | 12.3 | `PASS`：0 虚假评分或 `AggregateRating`；明确区分实测/厂商/历史/待核实数据并保留错误样本（0B、日期遮挡）；具备独立免责、披露与隐私页。<br>扣分：`/about/`（297 汉字）、`/disclosure/`（247 汉字）等信任页偏单薄；全部 50 篇文章使用集体组名，缺少具名作者档案与独立测试方法论页。 |
| **Schema 与 SERP** | 15% | 70 | 10.5 | `PASS`：全站 JSON-LD 语法 0 报错、`FAQPage` 与可见 DOM 100% 一致、0 重复 `<title>`/`description`、0 缺失 `<img>` `alt`、0 缺失 OG 标签。<br>扣分：**50/50** `BlogPosting.image` 与 **325/326** `og:image` 为 `.svg`（不被主流富媒体与社交抓取支持）；**31/31** `/brands/*` `Article` Schema 缺 `image` 且 `headline` 与 `<h1>` 不一致；7 页出现连续重复面包屑名称。 |
| **综合总分** | **100%** | — | **81.6（约 82 分）** | 整体技术底座与合规性处于**中上偏稳健**水平，无 P0 降权红线，核心短板集中在**标签/分类页抓取预算膨胀**、**SVG 社交/Schema 图像格式不兼容**及 **31 家品牌页模板指纹与 Schema 一致性**。 |

---

## 2. 分模块逐项核查证据（含 `PASS` 与缺陷记录）

### 一、爬虫抓取与索引预算审计 (Crawl & Index)

1. **`robots.txt` 与 `.htaccess` 规则**：**基本合规（存在 1 项规则冲突）**
   - `PASS`：`dist/robots.txt` 设置 `Allow: /`，未屏蔽 CSS（`dist/_astro/BaseLayout.zGDEqvAd.css`）、JS 或图片资源，并正确指向 `Sitemap: https://shadowrocket.rest/sitemap-index.xml`。
   - `PASS`：`dist/.htaccess` 配置强制 HTTPS 301（兼容反向代理 `X-Forwarded-Proto` 防循环）及无后缀路径 301 补全尾部斜杠，有效防止 HTTP/HTTPS、有/无尾部斜杠造成的重复 URL 收录。
   - **冲突隐患（P2）**：`dist/robots.txt` 拦截 `Disallow: /search/`，而 `dist/search/index.html` 又输出了 `<meta name="robots" content="noindex, nofollow">` 且全站导航及 `/404.html` 均包含指向 `/search/` 的内链。若爬虫遵守 `Disallow: /search/` 不抓取该页，将无法读取页面内的 `noindex` 指令，易在 Google Search Console 出现“已编入索引，但被 robots.txt 屏蔽”警告。

2. **XML Sitemap 抓取预算与覆盖度**：**高危膨胀（P1）**
   - `PASS`：`dist/sitemap-0.xml` 共收录 **324** 条 URL，100% 对应真实存在的静态 HTML，未混入 `/search/` 或 `/404.html`，亦未出现 `noindex` 页面。
   - **核心问题（P1）**：Sitemap 收录的 324 个页面中，**168 个为 `/tags/*` 标签聚合页**、**31 个为 `/categories/*` 分类聚合页**，合计 **199 页（占全站 Sitemap 总额度的 61.4%）**。经统计 `<main>` 可见文本：
     - `/tags/*` 共 168 页中，**132 页（78.6%）仅含 ≤ 1 篇文章卡片**，**163 页（97.0%）正文纯汉字 < 500 字**（最低仅 **113 汉字 / 209 非空白字符**）。
     - `/categories/*` 共 31 页中，**30 页（96.8%）仅含 ≤ 1 篇文章卡片**，**30 页正文纯汉字 < 500 字**（最低仅 **119 汉字 / 203 非空白字符**）。
     - 全部 199 页均输出 `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">`，会大量消耗爬虫抓取预算并拉低整站内容质量均值。

3. **规范化 (Canonical) 矩阵**：**`PASS`（1 处 404 边缘瑕疵）**
   - `PASS`：全站 **324 个可索引页面 + `/search/`** 100% 具备自指向 HTTPS 绝对路径 Canonical（如 `<link rel="canonical" href="https://shadowrocket.rest/brands/guangsuyun/">`、`https://shadowrocket.rest/tags/%E5%85%89%E9%80%9F%E4%BA%91/`），无指向首页、HTTP 或测试域名现象。
   - **边缘瑕疵（P2）**：`dist/404.html` 的 `<link rel="canonical">` 为 `https://shadowrocket.rest/404/`，与实际文件 `/404.html` 不一致（因该页已设 `noindex, nofollow`，实际风险低）。

4. **JS 渲染（CSR）与 DOM 结构**：**主体 `PASS`（`/compare/` 存在部分 CSR 局限）**
   - `PASS`：首页、50 篇专栏/评测/教程/对比、31 家品牌档案页、28 个二级专题及 `/brands/` 主数据库均把全部核心文字、数据表格、FAQ 与品牌 CTA 完整输出在静态 HTML 中；全站 326 页 **0 个空 `<a>`（无 `href` / `href=""` / `href="#"` / `javascript:`）**、**0 个 `onclick=` 伪导航**。
   - **局限提示（P2）**：`dist/compare/index.html` 首屏仅静态 SSR 了默认 3 个品牌（`guangsuyun`、`muguang`、`feimao`，`<main>` 1,541 汉字），其余 28 家品牌通过内联 `<script>` 中的 `compactBrandData` 动态切换。爬虫无法直接抓取其他两两/三三组合的独立对比 URL。

5. **Soft 404 与全站死链检查**：**`PASS`**
   - `PASS`：全站 326 个 HTML 页面内链校验 **0 死链**；非标签/分类页面中无空白 Soft 404 页面（最低为法务/说明页 `/privacy/` 176 汉字、`/404.html` 64 汉字）。

---

### 二、站群风控与架构隔离审计 (Risk Control)

1. **代码与模板指纹评估**：**单站合理，但品牌档案页与专题页存在高度模板指纹（P1）**
   - 经核查全部 326 个页面仅引用单一主站构建样式 `dist/_astro/BaseLayout.zGDEqvAd.css`，当前为单站（`shadowrocket.rest`），暂不触发跨域名站群关联。
   - **站内模板指纹隐患（P1）**：
     - 全站 **31 个 `/brands/<slug>/` 档案页**使用了**完全一致的 11 节 `<h2>` 模板骨架**（`[品牌] · 核心技术参数与运营档案` → `套餐价格与流量周期明细` → `线路测速与延迟记录` → `AI 服务与流媒体解锁核查` → `客户端兼容性与传输架构` → `核心优势与突出特征` → `主要限制与不足` → `适合人群与不适合人群` → `购买前注意事项与风险提示` → `[品牌] 常见问题解答` → `同类型或相近价位品牌对比`）。虽然每页注入了各自的数据字段，但固定 11 节结构具有较强结构指纹。
     - **28 个二级专题页**（`/<pillar>/<topic>/`）同样共享统一模板框架，其中多个 `/vpn/*` 与 `/resources/*` 专题自身导读字数偏薄（详见第三节）。
     - `PASS`：全站 **20 篇 `/reviews/*`、20 篇 `/articles/*`、7 篇 `/guides/*`、3 篇 `/comparisons/*`** 各自具备独立的 H2/H3 论点结构（20 篇评测有 20 套独立 H2 提纲），不存在“仅替换 H1 与品牌名”的模板化内容农场问题。

2. **统计与追踪代码隔离**：**`PASS`**
   - 扫描全部 326 个 HTML 文件，`gtag(`、`googletagmanager`、`hm.baidu.com`、`adsbygoogle`、`ca-pub-`、`clarity.ms`、`umami` 命中数为 **0**，不存在跨站共享统计/广告 ID 风险。

3. **站外商业引流链接 `rel` 属性与 URL 合规**：**`PASS`**
   - **CRITICAL 红线检查结果：`PASS`**。全站静态 HTML 共检测出 **111 条站外商业跳转链接**（覆盖全部 31 个品牌关联域名，如 `sahude.gsyvipaff.com` 29 次、`guangs.flycataff.com` 5 次、`varnexa.twilightaff.com` 5 次、`vip01.civetnet.com` 3 次、`wzjc.yuzoucloud.cc` 3 次等），**111/111（100%）均严格包裹 `rel="nofollow sponsored noopener"`**。
   - 同时核查 `dist/compare/index.html` 的前端渲染脚本，动态生成外链模板同样严格带有 `rel="nofollow sponsored noopener"`。
   - **附注**：`/brands/liulianyun/` 上的推广链接为原始清单留存格式 `https://qwerty.liulianyunaff.com#/?code=hS5pvbfE`（主机名与 `#` 间缺少 `/`），页面已如实提示异常。

4. **基础设施与内网信息暴露**：**`PASS`**
   - 扫描全部 326 页与 `404.html`，**0 处**泄露 Windows 物理路径（`C:\Users`）或构建环境敏感注释；HTML 内 `127.0.0.1`、`192.168.*`、`localhost:3000` 匹配项均位于技术教程代码块内（如本地 `7890` 代理配置与 `Bypass` 示例），非服务器隐私泄露。

---

### 三、内容质量与语义权威审计 (E-E-A-T & GEO)

1. **内容厚度与薄内容识别**：**两极分化明显（文章深度优秀，分类/标签与部分专题偏薄）**
   - `PASS`（主力长文）：50 篇内容正文（`articles` 均值 7,056 汉字、`reviews` 均值 6,945 汉字、`guides` 均值 6,479 汉字、`comparisons` 5,595 汉字，全部 ≥ 3,026 `<main>` 汉字）厚度远超行业标准。
   - **薄内容清单（P1）**：
     - `/tags/*`（163/168 页 < 500 汉字，均值 221 汉字）与 `/categories/*`（30/31 页 < 500 汉字，均值 245 汉字）。
     - 12 个二级专题页 `<main>` 低于 2,000 汉字，尤以 `/vpn/` 与 `/resources/` 频道为甚：`/vpn/shouji-vpn/`（**791** 汉字）、`/vpn/ruanjian-pingce/`（**843** 汉字）、`/vpn/jiasuqi-duibi/`（**874** 汉字）、`/vpn/jiasuqi/`（**923** 汉字）、`/vpn/mianfei-vpn/`（**1,006** 汉字）、`/vpn/tuijian/`（**1,031** 汉字）、`/vpn/haoyong-vpn/`（**1,045** 汉字）、`/resources/node-testing/`（**1,211** 汉字）、`/resources/free-nodes/`（**1,224** 汉字）、`/airport/mianfei-tizi/`（**1,274** 汉字）、`/resources/faq/`（**1,279** 汉字）、`/resources/runaway-warning/`（**1,332** 汉字）。
     - `/comparisons/` 频道列表页仅 **432 汉字**（747 非空白字符），缺少导读表格与方法论说明。

2. **GEO / AEO 结构化布局**：**`PASS`**
   - `PASS`：全站 **50/50（100%）** 篇长文与评测均在文首设有“核心摘要 / 直接结论”（Answer-First）、正文含标准 HTML `<table>` 对比表，并采用原生 `<details>/<summary>` 包裹 FAQ。
   - `PASS`：31 家品牌档案页除 `/brands/yuzhou/` 因价格资料缺失如实未放虚构价格表外，其余 **30/31** 均含结构化 `<table>`，且 **31/31** 均含 `<details>` FAQ 块。
   - `PASS`：实体指代清晰，全站 **0 篇**文章出现每篇超过 15 次的“它/这家/该机场”模糊代词堆叠。

3. **数据溯源与 E-E-A-T 可信度**：**数据诚实度 `PASS`，作者与机构信任背书偏弱（P1/P2）**
   - `PASS`：未发现任何无依据的 `4.9/5` 虚假评分或模拟用户好评；实测数据明确区分 `Measured Data` / `Vendor Data` / `Historical` / `Unverified`，保留测试时间（如 `2026-08-11`、`2026-07-18`）、宽带环境（如珠海联通 5Gbps/9Gbps）与失败节点。
   - **短板 1 — 信任支撑页过薄（P1）**：`/about/` 仅 **297 汉字**、`/disclosure/` **247 汉字**、`/disclaimer/` **234 汉字**、`/privacy/` **176 汉字**。评测团队无具名编辑档案、测试设备与脚本环境说明，缺少独立的 `/methodology/`（实测标准与 MiaoKo 参数口径页）。
   - **短板 2 — 发布日期集中爆发信号（P2）**：50 篇 `BlogPosting` 的 `datePublished` 分布中，有 **28 篇（56%）集中在同一天 `2026-11-20`**，31 篇品牌页 `Article` 全部集中在 `2026-11-19`。对于新站而言，短时间集中放出大量同日时间戳不利于自然更新节奏信号。

---

### 四、结构化数据与社交展现审计 (Schema & SERP)

1. **JSON-LD 语法与可见 DOM 一致性**：**部分一致，但品牌页 `Article` Schema 与 SVG 图像存在严重规范问题（P1）**
   - `PASS`：全站 326 页所有 JSON-LD（`Organization` 326、`WebSite` 326、`BreadcrumbList` 324、`FAQPage` 82、`BlogPosting` 50、`Article` 31、`SoftwareApplication` 12、`ItemList` 1）`JSON.parse` 0 语法错误；**82 个 `FAQPage` 的问题与答案 100% 存在于可见 HTML 中**，0 隐藏标记欺骗；**50 个 `BlogPosting` 的 `headline` 均与可见正文一致**。
   - **问题 A — Schema 与社交缩略图全量使用 `.svg`（P1）**：
     - 全站 **50/50 篇 `BlogPosting` 的 `image` 字段均为 `.svg`**（如 `https://shadowrocket.rest/images/covers/editorial-network.svg`），**325/326 页的 `og:image` 亦为 `.svg`**（仅 1 页使用 `.jpg`）。Google 搜索 `Article` 富媒体结果要求 `image` 必须为 `.jpg`/`.png`/`.webp`（建议 ≥ 1200px 宽，16:9/4:3/1:1），Open Graph（Twitter/Facebook/Discord/Telegram/微信）爬虫通常也会忽略或无法渲染 `.svg` 预览图。
   - **问题 B — 31 个 `/brands/<slug>/` 页 `Article` Schema 多重瑕疵（P1）**：
     - `Article.headline`（例如 `"光速云 评测与套餐核实档案（2026）"`）与页面可见 `<h1>`（`"光速云（Guangsuyun） 品牌评测与套餐档案"`）不一致。
     - 31 个 `Article` Schema 均**完全缺失 `image` 字段**、缺失 `mainEntityOfPage`、且 `publisher` 缺失 `logo` 字段。
   - **问题 C — 面包屑 `BreadcrumbList` 同名层级重复（P2）**：
     - 7 个页面（`/airport/tuijian/`、`/articles/2026-airport-selection-guide/` 及 5 篇归属 `airport/tuijian` 的评测）出现第 2 级与第 3 级同名的 `首页 > 机场推荐 > 机场推荐`，影响 Breadcrumb 富媒体展示辨识度。

2. **Open Graph & Meta 标签质量**：**整体良好，6 页标题超长**
   - `PASS`：全站 **0 个重复 `<title>`**、**0 个重复 `<meta name="description">`**、**0 个缺失 `og:title`/`og:description`/`og:image`/`og:url`**、**0 个缺失 `alt` 的图片**。
   - **超长 `<title>`（P2）**：共 **6 个页面** `<title>` 超过 65 字符，易在 SERP 中被截断：
     - `/comparisons/clash-verge-rev-vs-flclash-vs-v2rayn/`（**79 字符**）
     - `/reviews/ermao-deep-review/`（**72 字符**）
     - `/reviews/u1s1-deep-review/`（**72 字符**）
     - `/guides/openwrt-router-proxy-guide/`（**66 字符**）
     - `/reviews/shanyue-deep-review/`（**66 字符**）
     - `/reviews/weitu-deep-review/`（**66 字符**）

---

## 3. 漏洞与降权风险清单

### 🚨 P0（致命红线 — 立即修复）
- **本次审计未发现 P0 致命红线（全项 `PASS`）**：
  - 全站 **111/111** 条站外商业引流链接 100% 带有 `rel="nofollow sponsored noopener"`；
  - **0** 共用追踪/广告 ID；
  - **0** Canonical 劫持（全站 324 个可索引页均自指向 HTTPS 正式域名）；
  - **0** 隐藏 FAQ / 虚假 `AggregateRating` 欺骗。

---

### ⚠️ P1（高危隐患 — 本周修复）

1. **199 个超薄标签与分类页占用了 61.4% 的 Sitemap 与索引预算**
   - **证据位置**：`dist/sitemap-0.xml`（总计 324 条 URL，含 `/tags/*` 168 页与 `/categories/*` 31 页）；其中 193 页正文 < 500 汉字（如 `dist/tags/光速云/index.html`、`dist/categories/协议科普/index.html` 多数仅挂 1 张文章卡片）。
   - **影响机制**：Google Helpful Content / Crawl Budget 机制——大量低文本密度聚合页会拉低整站质量评分，并挤占新发评测页的抓取配额。
   - **修复建议**：
     - 方案 A（推荐）：对文章数 `< 3` 的 `/tags/*` 与 `/categories/*` 页面设置 `<meta name="robots" content="noindex, follow">` 并从 `@astrojs/sitemap` `filter` 中剔除；
     - 方案 B：或直接停用细粒度单篇 `/tags/*` 路由，仅保留高聚合度的一级/二级专题与分类页参与索引。

2. **50 篇 `BlogPosting` 与 325 个页面 `og:image` 使用 `.svg` 封面图**
   - **证据位置**：`dist/articles/*/index.html`、`dist/reviews/*/index.html`、`dist/guides/*/index.html`、`dist/comparisons/*/index.html` 中的 `<meta property="og:image" content="https://shadowrocket.rest/images/covers/*.svg">` 及 `<script type="application/ld+json">` `"image": "...svg"`。
   - **影响机制**：Google Article Rich Results 不支持 SVG 图像作为主图；Twitter/X、Discord、Telegram 与主流中文社交/搜索引擎预览卡片对 `.svg` 抓图兼容性极差。
   - **修复建议**：将 `public/images/covers/` 下的 9 张封面图批量导出为 `1200×630` 的 `.png` 或 `.webp`（或保留矢量展示同时生成 `.webp` 副本专门用于 `og:image` 与 JSON-LD `image`）。

3. **31 个 `/brands/<slug>/` 页面 `Article` Schema 缺图且 `headline` 与 `<h1>` 不一致 + 高模板指纹**
   - **证据位置**：`dist/brands/*/index.html`（如 `/brands/guangsuyun/index.html` 中 `Article.headline` 为 `"光速云 评测与套餐核实档案（2026）"`，可见 `<h1>` 为 `"光速云（Guangsuyun） 品牌评测与套餐档案"`，且缺少 `image` 与 `publisher.logo`；全部 31 页共享同一套 11 节 H2 骨架）。
   - **影响机制**：Schema-DOM 不一致会降低结构化数据可信度；缺少 `image` 导致品牌页无法获得图片富媒体展示；统一 11 节骨架若缺乏差异化长评段落，易被识别为强模板化页面。
   - **修复建议**：
     - 将品牌页 `Article.headline` 与可见 `<h1>` 严格对齐，补全 `.webp`/`.png` `image`、`mainEntityOfPage` 及 `publisher.logo`；
     - 为每家品牌在模板中增加至少 1 段基于实测/定位差异的专属编者按或场景对比段落，降低 11 节 H2 骨架的结构重复率。

4. **部分 `/vpn/*`、`/resources/*` 二级专题与信任支撑页正文偏薄**
   - **证据位置**：`/vpn/shouji-vpn/`（791 汉字）、`/vpn/ruanjian-pingce/`（843 汉字）、`/vpn/jiasuqi-duibi/`（874 汉字）、`/comparisons/`（432 汉字）、`/about/`（297 汉字）、`/disclosure/`（247 汉字）。
   - **影响机制**：E-E-A-T 与专题枢纽页权重评估。重要二级落地页正文不足 1,000 字且与 `/about/` 等信任页同样单薄，会削弱 YMYL/工具安全类站点的专业权威信号。
   - **修复建议**：将 `/vpn/` 系列专题导读补齐至 1,500–2,000 字的决策树与客户端适配表；扩充 `/about/`（补充测试环境、MiaoKo 参数口径、编辑团队分工与纠错记录）并建立独立 `/methodology/` 页。

---

### 🟡 P2（优化机会 — 规划修复）

1. **`robots.txt` 与 `/search/` `noindex` 指令冲突**
   - **证据位置**：`dist/robots.txt`（`Disallow: /search/`）与 `dist/search/index.html`（`<meta name="robots" content="noindex, nofollow">`）。
   - **影响机制**：爬虫被 `robots.txt` 拦截后无法看到页内 `noindex`，当全站内链引用 `/search/` 时易引发 GSC “已编入索引但被 robots 屏蔽”报错。
   - **修复建议**：从 `robots.txt` 移除 `Disallow: /search/`（保留 `Disallow: /pagefind/` 即可），让爬虫读取 `<meta name="robots" content="noindex, nofollow">` 后自然退索引，并将导航中搜索改为弹窗触发或 `rel="nofollow"` 链接。

2. **7 个核心页面面包屑 `BreadcrumbList` 存在连续同名层级**
   - **证据位置**：`/airport/tuijian/`、`/articles/2026-airport-selection-guide/` 及 5 篇 `airport/tuijian` 评测页 DOM 与 `BreadcrumbList` JSON-LD 均为 `首页 > 机场推荐 > 机场推荐`。
   - **影响机制**：Google Breadcrumb 富媒体展示易出现重复词条，影响点击率与语义层级清晰度。
   - **修复建议**：将一级频道 `/airport/` 面包屑与导航展示名称区分开（如一级为 `机场频道` 或 `机场总览`，二级 `/airport/tuijian/` 保留 `机场推荐`）。

3. **6 篇深度内容 `<title>` 超过 65 字符（最长 79 字符）**
   - **证据位置**：`/comparisons/clash-verge-rev-vs-flclash-vs-v2rayn/`（79 字符）、`/reviews/ermao-deep-review/`（72 字符）、`/reviews/u1s1-deep-review/`（72 字符）等 6 页。
   - **影响机制**：SERP 移动端与桌面端标题截断，关键卖点（如 `| 小火箭` 前的实测结论）可能被隐藏。
   - **修复建议**：将 SEO `<title>`（`seoTitle`）精简至 32–55 汉字（含品牌后缀 `| 小火箭`），同时保留页面 `<h1>` 的完整副标题。

4. **28/50 篇 `BlogPosting` 集中于同一天发布（`2026-11-20`）**
   - **证据位置**：`dist/articles/*`、`dist/reviews/*` JSON-LD `datePublished`。
   - **影响机制**：新站单日集中发布过半数文章，容易被视作批量生产脉冲信号；而 `dist/404.html` 的 `canonical`（`https://shadowrocket.rest/404/`）亦可顺手清理。
   - **修复建议**：后续新文按每周 3–5 篇匀速发布；历史已发布稿件可依据实际实测批次日期（`2026-08`–`2026-11`）合理区分 `pubDate` 与 `updatedDate`。

---

## 4. 终极改造行动 SOP（Top 5 按 ROI 排序）

| 优先级 | 行动项 | 涉及文件/模块 | 预期 SEO/GEO 收益 |
| :--- | :--- | :--- | :--- |
| **TOP 1** | **收缩薄标签/分类索引，释放 61% 抓取预算** | `src/pages/tags/[tag].astro`、`src/pages/categories/[category].astro`、`astro.config.mjs` | 文章数 < 3 的标签/分类页加 `noindex, follow` 并从 Sitemap 排除，立即消除 193 个 <500 字薄页对整站权重与抓取配额的稀释。 |
| **TOP 2** | **批量生成 `.webp`/`.png` 封面图专供 `og:image` 与 Schema** | `public/images/covers/*`、`SEOHead.astro`、`src/data/seo` | 解决 50 篇 `BlogPosting` 与 325 页社交分享图使用 `.svg` 导致 Google 富媒体及社媒抓图失效的问题，直接提升 SERP 出图率与 CTR。 |
| **TOP 3** | **修复 31 个品牌页 `Article` Schema 一致性并增强页面差异化** | `src/pages/brands/[slug].astro` | 对齐 `Article.headline` 与 `<h1>`，补齐 `image`、`mainEntityOfPage` 与 `publisher.logo`，降低 31 页同构骨架指纹。 |
| **TOP 4** | **补厚 `/about/` 与薄弱 `/vpn/*` 二级专题，完善 E-E-A-T 背书** | `src/pages/about.astro`、`src/data/navigation.ts` / `[topic].astro` | 将 `/about/` 扩充为包含评测方法、硬件与 MiaoKo 口径、团队分工与历史勘误的权威页面；把 `/vpn/*` 专题导读扩充至 1,500+ 字。 |
| **TOP 5** | **清理 `robots.txt` `/search/` 冲突、重复面包屑与 6 个超长 `<title>`** | `public/robots.txt`、`src/data/navigation.ts`、6 篇长标题文章 frontmatter | 消除 GSC 索引警告、`首页 > 机场推荐 > 机场推荐` 重复面包屑与标题截断问题。 |
