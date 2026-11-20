---
title: "Clash 使用教程：Rule 规则、Global 全局、Direct 直连与 URL-Test 自动测速策略组精通"
description: "深度解析 Clash Verge Rev（Mihomo 内核）中 Rule 规则、Global 全局、Direct 直连四大转发模式的数据包底层走向，详解规则匹配优先级、国内网站变慢诊断、URL-Test 与 Fallback 策略组防抖调优、AI 与流媒体精细分流 YAML 扩展模板，以及 Connections 实时连接监控排错方法。"
slug: "clash-tutorial-rule-global-direct"
pubDate: "2026-11-20"
updatedDate: "2026-11-20"
category: "Clash 进阶教程"
pillar: "clash"
topicSlug: "clash-tutorial"
clusterId: "clash-tutorial-modes"
tags: ["Clash使用教程", "Rule规则模式", "Global全局模式", "URL-Test策略组", "Connections排查"]
cover: "/images/covers/clash-verge-guide.svg"
coverAlt: "Clash Rule Global Direct 与策略组精通教程封面"
author: "小火箭技术组"
excerpt: "直接结论：95% 的日常办公与流媒体场景应当锁定 Rule（规则）模式，绝不要长期挂着 Global（全局）模式运行——全局模式会让微信、淘宝、B 站与国内网银全部绕道海外节点再回国，不仅拖慢国内网速，还会白白烧光你的月付流量。真正让 Clash 顺手的核心，是理解规则自上而下的匹配优先级、把 URL-Test 自动测速的 tolerance 阈值调合理，并用 Connections 面板一眼抓出“到底哪个域名走错了线路”。"
brandSlugs: ["guangsuyun", "sujie", "xingdaomeng"]
featured: false
primaryKeyword: "Clash 使用教程"
secondaryKeywords: ["Clash 规则模式", "Clash 全局模式", "Clash URL-Test", "Clash Connections 排查"]
searchIntent: "Informational"
verifiedDate: "2026-11-20"
reviewStatus: "verified"
relatedSlugs: ["clash-verge-subscription-guide", "clash-meta-mihomo-dns-guide", "clash-verge-download-and-verify", "ai-and-streaming-unlock-guide"]
sources:
  - "第三方代理客户端.txt"
  - "32家机场品牌清单.txt"
faq:
  - question: "日常使用 Clash 时，为什么绝大部分教程都强调保持 Rule（规则）模式，而不是 Global（全局）模式？"
    answer: "因为 Rule 模式会根据内置的分流规则表自动判断：国内网站、本地局域网和国内应用直接走本地宽带（DIRECT），只有海外服务才走代理节点；而 Global 模式会把 100% 的公网请求（包括淘宝、微信传文件、百度网盘、国内视频和网银）全部先送去海外节点再绕回国内，这会导致国内网页加载极慢、网银触发异地安全拦截，并在几小时内耗尽机场套餐流量。"
  - question: "什么时候才需要临时切换到 Global（全局）模式或 Direct（直连）模式？"
    answer: "Global 模式只建议在两种场景下临时启用：第一，访问某个极冷门海外科研站点或小众工具，机场默认规则库未收录导致误走直连被墙；第二，排除分流规则本身引起的访问故障。Direct 模式则相当于“不关闭代理端口但把所有流量全放行直连”，适合临时排查某个游戏或公司内网软件是不是被分流规则误伤，排查完毕应立刻切回 Rule。"
  - question: "为什么我在 Clash 里已经点了 Rule（规则）模式，打开国内淘宝或 B 站还是明显变慢甚至显示海外 IP？"
    answer: "最常见的原因有三个：一是机场下发的订阅配置缺少 GEOIP,CN,DIRECT 或规则顺序把 MATCH,PROXY 写在了前面；二是开启了浏览器自带的海外安全 DNS（DoH），或者订阅里配置了错误的海外 DNS，导致国内域名被解析到了海外 CDN 边缘节点；三是某些客户端在 TUN 模式下启用了全局嗅探或 Fake-IP 过滤清单不完整，需要去 Connections 实时连接面板核对具体命中的规则。"
  - question: "URL-Test 自动测速策略组经常跳节点，导致看视频断流或者 ChatGPT 频繁退出登录怎么办？"
    answer: "这是因为自动测速参数 interval（检测周期）设得太短，且 tolerance（延迟容差）太小甚至为 0。假设香港 01 延迟 28ms、香港 02 延迟 25ms，仅仅波动 3ms 内核就会立刻切换出口 IP，从而触发 OpenAI 或流媒体风控断线。把 tolerance 设为 50–100ms、interval 设为 300–600 秒，或对 AI 分流组改用 select 手动锁定单一高纯净度节点，即可彻底消除频繁切 IP 的烦恼。"
  - question: "Clash 里的延迟测试数字（比如 45ms）和我在网上 Ping 出来的数字为什么不一样？"
    answer: "因为 Clash 客户端里的闪电测速（URL-Test）并不是传统 ICMP Ping，而是客户端通过代理节点实际向指定测试地址（如 http://www.gstatic.com/generate_204）发起一次完整的 HTTP/TLS 请求并等待 204 返回的耗时（URL Latency）。它反映的是“本地到入口 + 专线传输 + 出口落地再到目标网站”的真实端到端可用性，比单纯 Ping 服务器 IP 更有参考价值。"
  - question: "光速云的香港节点速度最快（22ms），为什么我不能全靠它一个节点来用 ChatGPT 和 Gemini？"
    answer: "根据本站 2026-08-19 对光速云的 MiaoKo 实测数据，其香港专线虽然下载和延迟表现极佳，但 OpenAI 策略表现为“仅 APP 解锁”，且香港地区普遍不在 Google Gemini 支持清单内；而日、新、美节点则可正常网页解锁。通过自定义的 AI 策略组把 OpenAI/Claude/Gemini 单独分流到新加坡、日本或美国节点，同时让其他所有日常浏览和 YouTube 继续走香港专线，才是体验最优解。"
  - question: "在 Clash Verge Rev 的「连接（Connections）」页面里，怎么一眼看出某个网站到底走了代理还是直连？"
    answer: "打开 Connections（连接）标签页，在顶部搜索框输入目标网站的域名关键词（例如 openai 或 taobao），列表中每一行都会明确展示「Host（目标地址）」「Rule（命中的规则名称，如 GEOSITE,openai 或 GEOIP,CN）」以及最右侧的「Chains（完整链路，例如 DIRECT 或 🚀 节点选择 -> 新加坡 02）」。如果发现国内域名链条里出现了海外节点，说明分流未命中直连，应当按顺序调整规则。"
---

## 直接结论：用对模式与策略组，代理体验才能真正“无感”

装好 **Clash Verge Rev** 并成功导入订阅之后，很多人的日常习惯是：挑一个延迟最低的节点，或者干脆一直开着“全局模式”不关，等到打不开淘宝、微信传图转圈、ChatGPT 弹出 `Access Denied` 时才到处手动切节点。

实际上，现代 Mihomo（原 Clash.Meta）内核最强大的能力，就在于用一套精密的**模式控制 + 规则匹配链 + 策略组自动化引擎**，把“什么时候走直连、什么时候走香港高速线、什么时候把 AI 请求送到新加坡或美国”全部自动化完成。

只要掌握以下四个核心结论，你就能告别 90% 的反复折腾：

1. **模式选择**：日常 95% 以上时间必须锁定 **`Rule`（规则模式）**；`Global`（全局）仅用于排错或访问极冷门未收录网站；`Direct`（直连）仅用于临时验证本地直连环境。
2. **规则顺序**：Clash 规则严格执行**“自上而下，命中即停”**。自定义规则必须插在最顶部，千万不能放在 `MATCH` 兜底规则之后。
3. **策略组防抖**：`URL-Test`（自动测速）千万别把容差设得太死，对于登录态敏感的 ChatGPT / Claude，建议用 `select` 手动锁定节点或搭配 `fallback`（故障转移）组。
4. **排错抓手**：不要凭感觉猜网站走没走代理，打开 **`Connections`（连接）** 面板搜索域名，直接看 `Rule` 和 `Chains` 两列即可 100% 实锤数据包到底去了哪里。

如果你尚未完成订阅导入与同步配置，请先参考 [Clash Verge 订阅导入与避坑指南](/articles/clash-verge-subscription-guide/)；需要深入核查品牌支持情况可前往 [31 家机场品牌数据库](/brands/)。

---

## 一、四大运行模式底层数据包走向全解析

在 Clash Verge Rev 的 **「代理（Proxies）」** 页面最顶部，通常会看到三个核心切换按钮：`规则（Rule）`、`全局（Global）`、`直连（Direct）`（部分老版本或特定配置中还会出现 `脚本（Script）` 入口，现代 Mihomo 已将其并入增强规则与扩展脚本体系）。它们决定的不是“软件开没开”，而是**所有进入 Clash 核心（默认端口 7897 或 TUN 虚拟网卡）的数据包该如何被路由分发**。

### 1.1 四种模式的数据包流向对照表

| 运行模式 | 底层路由引擎行为 | 国内网站（淘宝/微信/B站）走向 | 海外网站（Google/YouTube/AI）走向 | 适用场景与风险提示 |
| :--- | :--- | :--- | :--- | :--- |
| **Rule（规则模式）** | 逐条扫描 `rules` 列表，按域名、IP、进程名精确分流 | 命中 `DIRECT` 规则，直接走本地电信/联通/移动宽带 | 命中代理规则或 `MATCH`，通过选定的节点转发 | **日常主力唯一推荐模式**，兼顾国内外网速与流量节省 |
| **Global（全局模式）** | **完全跳过**整个 `rules` 分流表，直接走名为 `GLOBAL` 的总策略组 | **全部强行绕道海外节点后再回国内**（除非在 `GLOBAL` 里手动选了 `DIRECT`） | 全部走你选定的单一海外节点 | **仅限排错或冷门网站应急**；长期开会拖慢国内网速并快速烧光机场流量 |
| **Direct（直连模式）** | **完全跳过**规则表，强制将所有连接全部交给 `DIRECT` 出口 | 直接走本地宽带 | 直接走本地宽带（不经过任何代理节点，被墙站点将无法访问） | **临时排错专用**；无需关闭 TUN 网卡即可一键测试纯本地宽带表现 |
| **Script / 扩展覆写** | 在 Rule 流程前通过 JavaScript / Merge 覆写动态修改节点与规则 | 按动态脚本算出的策略执行 | 按动态脚本算出的策略执行 | 进阶自动化（如 Clash Verge Rev 全局扩展脚本自动注入 AI 规则） |

### 1.2 为什么很多人切到 Global 模式反而“上不去任何网站”？

新手最容易踩的一个隐藏坑是：点击了顶部 **`Global`（全局）** 模式后，没有注意到下面多出来一个名为 **`GLOBAL`** 的策略组卡片，而这个卡片默认选中的往往是 **`DIRECT`** 或者 **`REJECT`**！

当 `Global` 模式生效时，所有流量都会直奔 `GLOBAL` 策略组。如果你忘记在 `GLOBAL` 分组里点选一个具体节点（比如香港 01），那么切到全局模式反而等于“全盘直连”或“全盘断网”。因此切换到 `Global` 时，**务必顺手检查 `GLOBAL` 分组里当前高亮的到底是不是有效节点**。

---

## 二、Clash 规则匹配优先级与常用语法实战

理解 `Rule` 模式的灵魂，在于记住一句话：**规则列表从第一行开始往下逐条匹配，一旦命中某一条规则，立刻停止向下扫描并执行对应策略；如果全部扫描完仍未命中，则交给最后一行的 `MATCH` 兜底。**

### 2.1 常见规则关键字优先级与语义拆解

在 Mihomo 内核中，一份高质量的规则列表通常遵循“**精确域名 → 关键词/规则集 → 本地与国内 IP → 兜底策略**”的漏斗结构：

| 规则类型 | 标准写法示例 | 匹配逻辑与触发时机 | 常见问题与性能影响 |
| :--- | :--- | :--- | :--- |
| **`DOMAIN`** | `DOMAIN,api.openai.com,🤖 AI 专线` | 仅完全等于该主机名才命中 | 精确度最高、几乎不消耗性能 |
| **`DOMAIN-SUFFIX`** | `DOMAIN-SUFFIX,claude.ai,🤖 AI 专线` | 匹配域名及其所有子域名（如 `api.claude.ai`、`www.claude.ai`） | **日常自定义分流最常用**，安全无误伤 |
| **`DOMAIN-KEYWORD`** | `DOMAIN-KEYWORD,google,🚀 节点选择` | 只要域名中包含该词即命中 | **慎用！** 容易误伤包含相同字母的国内域名（例如写 `ai` 会误伤 `baidu`、`taobao` 的某些子域） |
| **`GEOSITE`** | `GEOSITE,openai,🤖 AI 专线` | 调用 Mihomo 内置的开源社区域名库分类整组匹配 | 极省心，一条规则即可覆盖某家大厂全套关联域名与 CDN |
| **`IP-CIDR` / `GEOIP`** | `GEOIP,CN,DIRECT` | 按目标 IP 段或国家归属数据库匹配 | 如果目标原本传入的是域名，**遇到 IP 规则会强制触发一次本地 DNS 解析** |
| **`IP-CIDR,...,no-resolve`** | `IP-CIDR,192.168.0.0/16,DIRECT,no-resolve` | 仅当请求一开始就是纯 IP 时才匹配，**不触发 DNS 查询** | 防止内网或直连规则把本来要走远端解析的域名提前在本地解析而发生 DNS 泄漏 |
| **`PROCESS-NAME`** | `PROCESS-NAME,git.exe,🚀 节点选择` | 按本机发起请求的程序文件名分流（需在桌面端或 TUN 模式下） | 适合精准指定 `Code.exe`、终端或特定游戏直连/代理 |
| **`MATCH`** | `MATCH,🚀 节点选择` | 永远放在**最后一行**，前面全没命中的漏网之鱼统一走这里 | 俗称“白名单模式（黑盒兜底代理）”或“黑名单模式（`MATCH,DIRECT`）” |

### 2.2 白名单模式 vs 黑名单模式：哪一种适合自己？

绝大多数商业机场默认下发的是 **“白名单兜底代理模式”**（即前面放行国内域名和 `GEOIP,CN,DIRECT`，最后一行 `MATCH,🚀 节点选择`）。它的优点是**只要没收录在库里的海外冷门小站都能自动翻过去**，开箱即用，几乎不会出现“某个新出来的海外网站打不开”的问题。

而少数对国内应用纯洁度要求极高的用户会使用“黑名单模式”（只让已知被墙域名走代理，最后一行 `MATCH,DIRECT`）。这种方式虽然最省流量，但极度依赖规则库维护时效——一旦某个新 AI 工具或海外开源镜像站未被及时收入 `gfw` 规则集，就会直接超时报错。因此，**95% 的日常用户应坚持使用机场默认的 `MATCH,代理` 白名单分流架构**。

---

## 三、国内网站变慢、微信转圈？四大高频诊断路径

明明开着 `Rule` 规则模式，为什么淘宝图片加载变慢、国内视频缓冲卡顿、甚至打开国内测速网站显示的是新加坡或香港 IP？按下面四个排查步骤逐一核对，几乎每次都能找到罪魁祸首。

### 3.1 排查一：规则顺序或 `RULE-SET` 更新失败导致国内站点命中了 `MATCH`

有些简化版或老旧订阅模板中，国内直连全靠一条远程下载的 `ChinaIP` 或 `Direct` 规则集（`rule-providers`）。如果你的本地网络在更新客户端启动时正好没能下载下来那份 `rule-provider` 文件，整个国内直连集合就会变成空集！结果所有国内网站统统顺着规则列表一路掉进最后的 **`MATCH,🚀 节点选择`**，被迫出国绕了一大圈。

**验证方法**：进入 Clash Verge Rev 左侧 **「日志（Logs）」** 或 **「连接（Connections）」**，如果发现 `jd.com`、`bilibili.com` 后面跟着的规则显示为 `Match`，立刻去检查 `rule-providers` 是否下载超时，或在全局扩展里显式加上内置的 `GEOSITE,cn,DIRECT` 与 `GEOIP,CN,DIRECT`。

### 3.2 排查二：DNS 污染与 CDN 调度错位（分流对了但解析错了）

这是一种极隐蔽的“假慢”现象：你的淘宝流量明明走了 `DIRECT` 直连，但因为本地配置的 DNS 服务器全是海外公共 DNS（例如 `8.8.8.8`）或开启了浏览器自己的海外 DoH，导致当你解析国内网站（例如阿里系、腾讯系视频 CDN）时，海外 DNS 以为你身处美国或新加坡，给你返回了一个**海外边缘节点 IP**。于是你的本地宽带直连跨洋去访问那个海外服务器，速度能不慢吗？

**解决方法**：确保遵循标准国内/海外 DNS 分流原则——国内域名交由 `223.5.5.5` / `119.29.29.29` 解析，海外域名才交由远程节点或可信 DoH 解析，具体 YAML 模板可直接参考 [Clash Meta（Mihomo）内核与 DNS 防泄漏详解](/articles/clash-meta-mihomo-dns-guide/)。

### 3.3 排查三：Windows / macOS 系统级“浏览器安全 DNS”冲突

Chrome 和 Edge 浏览器在更新后，往往默认开启了「使用安全 DNS（Secure DNS）」。当浏览器自己通过加密通道去连外置 DoH 时，会绕过 Clash 的系统代理或部分传统分流规则。如果它恰好没走本地代理核心，还可能干扰 Fake-IP 的映射表，造成网页打开时有时无、加载极慢。**建议在浏览器「隐私和安全」设置中关闭自带的安全 DNS，将解析权统一交回给 Clash Verge Rev 的 Mihomo 核心处理。**

### 3.4 排查四：企业内网 OA / 局域网 NAS 在 Fake-IP 模式下异常

如果在公司电脑开启了 TUN 模式且 DNS 为 `fake-ip`，访问公司内网域名（例如 `oa.corp.local`）时如果返回了一个 `198.18.x.x` 假 IP，内网网关往往无法识别导致页面白屏。此时需要将该内网域名加入 **`fake-ip-filter`** 白名单并添加 `DOMAIN-SUFFIX,corp.local,DIRECT`。

---

## 四、策略组类型精通：`select`、`url-test`、`fallback` 与 `load-balance`

在 Clash 的「代理（Proxies）」界面，每一个折叠卡片就是一个**策略组（Proxy Group）**。机场运维者往往会在默认配置里塞进五六个不同的分组，理解它们背后的调度算法，才能避免“明明买了专线，用起来却一顿一顿的”。

### 4.1 四大策略组调度机制与优缺点对照

| 策略组类型 (`type`) | 工作原理 | 优点 | 致命短板与避坑建议 |
| :--- | :--- | :--- | :--- |
| **`select`（手动选择）** | 完全由用户点击选定哪一个节点或子策略组 | **IP 绝对固定**，不会半途自己跳走导致账号风控 | 某个节点突然维护挂掉时不会自动切换，需手动点一下 |
| **`url-test`（自动测速）** | 定时对组内所有节点发起 HTTP 204 测速，自动选择延迟最低的那一个 | 能自动绕开失效或高拥堵节点，适合日常网页和 YouTube | **容差（`tolerance`）设太小会频繁跳 IP**，极其不适合 ChatGPT/Claude 登录与银行操作 |
| **`fallback`（故障转移）** | 按列表**从上到下**顺序测试，只要排第一的节点还能通（不超时），就死死咬住它；只有它完全挂掉才顺延切到第二个 | **兼具“IP 稳定不乱跳”和“节点挂了自动替补”的双重优势** | 若首节点没有彻底断网而是极度卡顿（但仍能返回 204），不会主动切走 |
| **`load-balance`（负载均衡）** | 按轮询（`round-robin`）或哈希（`consistent-hashing`）把请求分散给组内所有节点 | 理论上能把多台机器的带宽叠加用于多线程下载 | **普通上网与登录账号绝对禁止使用！** 同一网页的不同静态资源来自不同国家 IP，瞬间触发几乎所有网站的防盗链与安全风控踢下线 |

### 4.2 如何调优 `url-test` 避免“神经质切节点”？

很多默认订阅会把 `url-test` 策略组的 `interval` 设为 `60` 秒，把 `tolerance` 设为 `0` 或 `20`。这意味着每过一分钟，哪怕香港 01 延迟从 26ms 微调到 29ms，而香港 02 刚好测出 25ms，客户端就会瞬间切换底层节点！正在看 4K 视频或开远程会议时就会直接卡顿几秒。

如果你通过 Clash Verge Rev 的 **全局扩展配置（Global Merge）** 优化测速组参数，推荐按以下工程标准设置：
- `url: "https://www.gstatic.com/generate_204"`（轻量级 204 状态码探测，最省流量且准确）
- `interval: 300`（5 分钟探测一次即可，过频测速本身也会消耗电池和轻微后台流量）
- `tolerance: 80`（延迟差距在 80ms 以内绝不轻易切换当前健康节点，彻底消灭频繁跳 IP 抖动）
- `lazy: true`（仅当该策略组近期有真实流量经过时才在后台测速，避免电脑挂机待机时白跑测试）

---

## 五、实战模板：AI 工具与流媒体精准分流 YAML 扩展配置

结合本站品牌实测数据，单靠一个地区节点“包打天下”在 2026 年已经越来越不现实：
- 例如在 [光速云](/brands/guangsuyun/) 的 2026-08-19 MiaoKo 实测中，香港专线延迟极低（平均 22ms / 529Mbps），但 OpenAI 策略是“仅 APP 解锁”，且香港节点普遍不能用 Google Gemini；只有日、新、美节点才能顺畅网页解锁 ChatGPT，新加坡等节点支持 Gemini。
- 而像 [速界](/brands/sujie/) 虽然在 2026-08-11 测速中美国节点表现相当均衡（平均 35.51–51.70 MB/s）且主打 AI 办公，但日常刷 YouTube、看 GitHub 或拉取 Docker 镜像，依然还是香港或日本节点更快更跟手。
- 像 [星岛梦](/brands/xingdaomeng/) 这类覆盖港、台、日、美、新及韩国东南亚的全能型机场，最理想的用法也是**“日常走港日台低延迟，AI 锁死新美不乱跳，Netflix/Disney+ 独立分组选解锁节点”**。

### 5.1 Clash Verge Rev 全局扩展脚本（JavaScript）完整示范

在 Clash Verge Rev 左侧 **「订阅（Profiles）」→ 右侧「全局扩展脚本（Global Script）」** 中（注意：不要改原订阅文件，避免下次更新被覆盖），你可以贴入下面这段经过生产验证的脚本。它会自动识别机场已有节点，自动新增 **`🤖 AI 专用`** 和 **`🎬 流媒体`** 两个策略组，并把相关规则精准插入规则链最顶部：

```javascript
// Clash Verge Rev 全局扩展脚本：精准分离 AI 办公、流媒体与日常高速节点
function main(config) {
  if (!config || !Array.isArray(config.proxies)) return config;

  // 1. 从机场现有节点中按名称关键词自动筛出“非香港”节点（适合 OpenAI / Claude / Gemini）
  const nonHkNodes = config.proxies
    .map((p) => p.name)
    .filter((name) => /新加坡|日本|美国|台湾|SG|JP|US|TW|Singapore|Japan|America/i.test(name));

  // 兜底：若机场命名特殊未匹配到，则保留全部节点供手动选
  const aiCandidates = nonHkNodes.length > 0 ? nonHkNodes : config.proxies.map((p) => p.name);

  // 2. 筛出适合流媒体（含港/新/台/日/美）的节点
  const streamCandidates = config.proxies
    .map((p) => p.name)
    .filter((name) => /香港|新加坡|台湾|日本|美国|HK|SG|TW|JP|US/i.test(name));

  const streamList = streamCandidates.length > 0 ? streamCandidates : config.proxies.map((p) => p.name);

  // 3. 构建专属策略组（AI 组推荐 select 手动锁定，防止频繁跳 IP 触发封号风控）
  const customGroups = [
    {
      name: "🤖 AI 专用",
      type: "select",
      proxies: [...aiCandidates, "🚀 节点选择", "DIRECT"].filter((v, i, a) => a.indexOf(v) === i),
    },
    {
      name: "🎬 流媒体",
      type: "select",
      proxies: [...streamList, "🚀 节点选择", "DIRECT"].filter((v, i, a) => a.indexOf(v) === i),
    },
  ];

  config["proxy-groups"] = [...customGroups, ...(config["proxy-groups"] || [])];

  // 4. 在原规则最顶部（优先级最高）插入精确的 AI 与流媒体规则
  const prependRules = [
    // OpenAI / ChatGPT 全家桶
    "DOMAIN-SUFFIX,openai.com,🤖 AI 专用",
    "DOMAIN-SUFFIX,chatgpt.com,🤖 AI 专用",
    "DOMAIN-SUFFIX,oaistatic.com,🤖 AI 专用",
    "DOMAIN-SUFFIX,oaiusercontent.com,🤖 AI 专用",
    "DOMAIN-SUFFIX,auth0.com,🤖 AI 专用",
    // Anthropic Claude
    "DOMAIN-SUFFIX,anthropic.com,🤖 AI 专用",
    "DOMAIN-SUFFIX,claude.ai,🤖 AI 专用",
    "DOMAIN-SUFFIX,claudeusercontent.com,🤖 AI 专用",
    // Google Gemini（避开香港节点，防止地区不支持报错）
    "DOMAIN-SUFFIX,gemini.google.com,🤖 AI 专用",
    "DOMAIN-SUFFIX,generativelanguage.googleapis.com,🤖 AI 专用",
    "DOMAIN-SUFFIX,aistudio.google.com,🤖 AI 专用",
    "DOMAIN-SUFFIX,ai.google.dev,🤖 AI 专用",
    // Cursor / Copilot 等 AI 编程工具补充域名
    "DOMAIN-SUFFIX,cursor.sh,🤖 AI 专用",
    "DOMAIN-SUFFIX,cursor.com,🤖 AI 专用",
    // 主流流媒体分组
    "GEOSITE,netflix,🎬 流媒体",
    "GEOSITE,disney,🎬 流媒体",
    "DOMAIN-SUFFIX,nflxvideo.net,🎬 流媒体",
    "DOMAIN-SUFFIX,disneyplus.com,🎬 流媒体",
  ];

  config.rules = [...prependRules, ...(config.rules || [])];
  return config;
}
```

### 5.2 检查你的机场规则是否冲突

保存上述脚本并确保其处于激活状态后，切换回 **「代理（Proxies）」** 页面，你会立刻看到最上方多出了 **`🤖 AI 专用`** 和 **`🎬 流媒体`** 两个分组。
- 在 **`🤖 AI 专用`** 里，点选一个稳定的新加坡或美国节点（如遇光速云实测中提到的 Gemini 仅部分新/马/土节点解锁情况，可直接在 AI 分组里锁定对应的新加坡节点）；
- 在机场原本的 **`🚀 节点选择`** 里，保持选择延迟最低的香港节点看普通网页和 GitHub。
从此无需在每次打开 ChatGPT 时来回手动切换整个系统的总节点，两条通道互不打架。

如欲深入了解各服务商在 AI 与流媒体方面的具体解锁边界，建议延伸阅读 [AI 与流媒体解锁实测指南](/articles/ai-and-streaming-unlock-guide/)。

---

## 六、终极排错神器：`Connections` 实时连接监控面板实战用法

当某个网页打不开、某个桌面应用报错连不上网、或者怀疑某个后台软件在偷跑代理流量时，盲目重启软件是最浪费时间的做法。Clash Verge Rev 左侧的 **「连接（Connections）」** 页面是内核实时吐出的网络手术显微镜。

### 6.1 读懂 `Connections` 面板里的五大关键字段

打开 Connections 页面后，点击右上角的 **暂停图标** 可以冻结当前瞬间的所有连接列表，方便逐行核查：

| 字段列名称 | 展示内容示例 | 它能帮你确认什么关键真相？ |
| :--- | :--- | :--- |
| **`Host`（目标地址）** | `chatgpt.com:443` 或 `104.18.32.47:443` | 看软件到底在连接哪个域名或纯 IP；如果只看到纯 IP 而没有域名，说明请求绕过了系统 DNS 且 Sniffer 未嗅探到 |
| **`Rule`（命中规则）** | `DOMAIN-SUFFIX,chatgpt.com` 或 `GEOIP,CN` 或 `Match` | **100% 确定它触发了哪一条规则！** 如果你写了 AI 规则，这里却显示 `Match`，说明你的域名没被规则覆盖或规则顺序插错了位置 |
| **`Chains`（代理链）** | `🤖 AI 专用 -> 新加坡 03` 或 `DIRECT` | **100% 确定流量最终是从哪台服务器出去的！** 排查“香港节点看不了 Gemini”时，一眼就能看到是不是其实漏到了香港节点上 |
| **`Process`（发起进程）** | `chrome.exe` / `Cursor.exe` / `node.exe` | **（需开启 TUN 模式或本地直连识别）** 迅速揪出到底是哪个软件在疯狂跑流量，方便针对进程写 `PROCESS-NAME` 规则 |
| **`Upload / Download`（实时流量）** | `1.2 MB / 458 MB` | 发现流量莫名其妙飞快减少时，按 Download 降序排列，1 秒找出偷跑流量的云盘同步、系统更新或 P2P 下载进程 |

### 6.2 三个高频排查场景的 `Connections` 实操示范

#### 场景 A：修改了节点或刚把系统切回 Rule 模式，但 ChatGPT 还是报地区限制
- **原因**：浏览器已经和旧的香港节点建立了一条长连接（WebSocket / HTTP/3 QUIC Keep-Alive），哪怕你改了策略组，这条已建立的旧连接在超时前不会自动断开。
- **操作**：在 `Connections` 搜索框输入 `openai` 或 `chatgpt`，点击右侧的 **「✕」关闭该条残留连接**（或直接点击顶部「关闭所有连接 / Close All」），然后刷新网页，新请求立刻就会走更新后的新加坡/美国节点。

#### 场景 B：终端 `git clone` / `npm install` / `Claude Code` 在代理开启下依然超时
- **现象**：打开 Connections 搜索 `github`，发现列表里**根本没有任何记录**！
- **结论**：这说明终端命令行程序没有读取 Windows/macOS 的「系统代理（System Proxy）」，流量压根没进入 Clash 核心。此时要么在终端配置环境变量（`export https_proxy=http://127.0.0.1:7897`），要么直接在 Clash Verge Rev 开启 **服务模式 + TUN 虚拟网卡模式**，强制三层接管所有命令行进程流量。

#### 场景 C：开了代理后国内网盘或 Steam 下载把机场月流量瞬间跑干
- **操作**：在 Connections 面板按下载总量排序，如果看到 `steamcontent.com`、`baidupcs.com` 后面跟着 `Chains: 🚀 节点选择 -> 香港 01`，说明游戏 CDN 或网盘域名漏进了 `Match` 兜底代理！立刻关闭该连接，并在全局扩展规则顶部补上 `GEOSITE,steamcn,DIRECT` 或对应下载域名的 `DIRECT` 规则。

---

## 七、日常开机自启、系统代理残留与便携调优设置

除了模式和规则，日常顺手度还取决于几个容易被忽略的客户端基础开关：

1. **开机自启（Auto Launch）与静默启动（Silent Start）**：建议同时开启，让 Clash Verge Rev 开机自动躲进右下角系统托盘或 Mac 顶部状态栏，减少每次开机手点的步骤。
2. **退出软件前务必确认系统代理恢复**：如果电脑因为强制断电、蓝屏死机而异常关闭，Windows 注册表里的 `127.0.0.1:7897` 系统代理标记可能没有被清除，导致下次开机在没打开 Clash 前所有浏览器都显示“无网络连接”。遇到这种假断网时，只需重新启动一次 Clash Verge Rev（然后正常退出即可自动清理），或去系统网络代理设置里关闭“使用代理服务器”。
3. **关闭不必要的高危 `allow-lan` 共享**：如果你不需要把代理分享给同一 Wi-Fi 下的手机、Switch 或 PS5，建议保持关闭「允许局域网（Allow LAN）」，避免在咖啡厅、机场或公司公共 Wi-Fi 下将本地代理端口暴露给同网段陌生设备。
4. **多机场容灾切换**：在「订阅」界面同时保存一个主力月付机场（如 [光速云](/brands/guangsuyun/) 或 [速界](/brands/sujie/)）和一个永久不限时备用包（如 [星岛梦](/brands/xingdaomeng/) 100GB 不限时包）。遇到主力线路短时维护波动时，只需点一下备用配置卡片即可无缝接管，不必在工作正忙时临时满网找替代品。

---

## 八、Clash 模式与策略组日常操作核对清单（Checklist）

- [ ] **主模式**：除临时调试外，顶部模式永远保持在 **`Rule`（规则模式）**。
- [ ] **全局排错注意**：临时切到 `Global` 时，务必确认下方 `GLOBAL` 策略组选中的是海外节点而非 `DIRECT`。
- [ ] **防抖参数**：自定义或修改 `url-test` 时，确保 `interval >= 300`、`tolerance >= 50`，不要设成 0ms 容差。
- [ ] **AI 独立组**：已将 OpenAI、Claude、Gemini 域名从高速香港节点分离，固定指向高解锁率的新加坡、日本或美国节点，并优先采用 `select` 模式锁死 IP。
- [ ] **规则位序**：确认自定义规则是插入在机场原规则列表的**最顶部**（且全部写在全局扩展脚本里，而非直接改动订阅源文件）。
- [ ] **浏览器 DNS 冲突检查**：已在 Chrome / Edge 设置中关闭浏览器自带的独立“安全 DNS”，防止绕过 Mihomo 分流。
- [ ] **善用 Connections**：每次调整节点或规则后，到 Connections 搜索对应域名，必要时手动断开旧长连接强制按新路由重连。
- [ ] **多端对比**：如需对比更多支持 Mihomo 规则分流的稳定服务商，可随时查看 [机场横向对比工具](/compare/) 或 [Clash 客户端专题](/clash/)。
