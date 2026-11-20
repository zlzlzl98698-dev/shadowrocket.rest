---
title: "ChatGPT、Claude、Gemini 与 Netflix 解锁指南：为什么香港节点常受限？"
description: "结合光速云 2026-08-19（70节点）、无忧链接 2026-07-18（50节点）与灵动云 2026-07-20/21（60节点）MiaoKo 实测数据，深度解析香港节点为何限 AI、YouTube 送中与落地漂移，并附 Clash YAML proxy-groups 精准分流配置。"
slug: "ai-and-streaming-unlock-guide"
pubDate: "2026-11-09"
updatedDate: "2026-11-20"
category: "AI 与流媒体"
pillar: "vpn"
topicSlug: "jiasuqi"
clusterId: "vpn-jiasuqi-ai-streaming"
tags: ["ChatGPT解锁", "Gemini节点", "Claude", "Netflix", "YouTube送中"]
cover: "/images/covers/ai-streaming-unlock.svg"
coverAlt: "AI 与流媒体解锁原理与切区指南封面"
author: "小火箭评测组"
excerpt: "很多用户以为延迟最低的香港专线节点就是“全能神机”，但实测证明：香港 IP 普遍不在 Gemini 支持区且常被 OpenAI 限制为仅 App 访问。日常用 AI 工具请分流至新加坡、日本或美国节点，香港专留给极速网页与港剧。"
brandSlugs: ["guangsuyun", "sujie", "lingdongyun", "wuyou", "yifan"]
featured: true
primaryKeyword: "ChatGPT 节点解锁"
secondaryKeywords: ["Gemini 节点地区", "香港节点不支持 ChatGPT", "YouTube 送中怎么办", "AI 加速器"]
searchIntent: "Informational"
verifiedDate: "2026-11-19"
testDate: "2026-08-19"
reviewStatus: "verified"
relatedSlugs: ["guangsuyun-deep-review", "how-to-read-miaoko-speedtest", "clash-verge-rev-beginner-guide"]
sources:
  - "2026-08-19 光速云 MiaoKo 解锁实测截图（70/70节点）"
  - "2026-07-18 无忧链接 MiaoKo 测速与御三家解锁实测截图（50/50节点）"
  - "2026-07-20/21 灵动云 MiaoKo 测试摘要（60/60节点）"
  - "32家机场品牌清单.txt"
faq:
  - question: "为什么我挂着香港节点，手机 ChatGPT App 能用，电脑网页版却打不开？"
    answer: "这是最典型的平台区域策略差异。在 2026-08-19 光速云 70 节点 MiaoKo 实测中，20 个香港专线节点全部明确返回 OpenAI「仅 APP(HK)」状态，网页端会被区域拦截，切换到日本、新加坡或美国节点即可恢复。"
  - question: "为什么几乎所有机场都在文档里把 Gemini 标成“视节点而定”？"
    answer: "Google Gemini 对机房 IP 风控和地理库校验比 ChatGPT 更苛刻。光速云 2026-08-19 全量 70 节点实测显示，香港、日本、美国、台湾节点在当时普遍未通过 Gemini 检测，只有新加坡部分节点、马来西亚和土耳其节点解锁成功。"
  - question: "什么是 YouTube 送中（CN）？它和看不了 Gemini 有什么关系？"
    answer: "YouTube 送中（CN）指某台海外落地服务器的出口 IP 被 Google 地理数据库反向识别为中国大陆（CN）。这不仅会导致 YouTube 无广告分成、无法打开部分版权视频或 Premium 权益失效，通常也会同步导致该节点下的 Google 搜索跳转异常及 Gemini 彻底不可用。"
  - question: "灵动云测试中出现的“台湾落地被 NF/D+ 识别为 ES（欧洲）”是什么意思？"
    answer: "这是典型的跨境广播 IP 地理库未同步（落地漂移）。服务商虽然把节点命名为“台湾”，但该服务器所用的 IP 段原属于欧洲或刚做过跨区广播，导致 Netflix 和 Disney+ 把它判定为西班牙（ES）区片库，无法观看真正的台区内容。"
  - question: "有没有必要找那种宣传“全节点 100% 永久解锁所有 AI 和流媒体”的机场？"
    answer: "反而应该警惕这类绝对化宣传。连速界等专注 AI 场景的品牌都在资料中理性声明“AI 可用性受 IP、地区与平台风控规则动态影响”。靠谱的做法是用 Clash / 小火箭的 proxy-groups 把日常网页和 AI 流量分开路由。"
  - question: "在 Clash Verge Rev 里同时设置香港日常加速和新加坡/日本 AI 分流，会不会导致国内网站变慢？"
    answer: "不会。只要核心模式保持在 Rule（规则模式），国内域名和国内 IP 段会直接走 DIRECT 直连；普通海外网页走延迟只有 20–30ms 的香港组；只有命中 OpenAI、Claude、Cursor、Gemini 规则的域名才会自动分流到 SG/JP/US 策略组。"
  - question: "为什么同一个日本或美国节点，我能打开 ChatGPT 网页，却总被 Claude 封号或弹验证码？"
    answer: "Claude（Anthropic）对 IP 风险分（IPRisk）与高频跨国切换非常敏感。尽量固定使用 1–2 个 IPRisk 为 LOW（如实测中日本 LOW(9)、美国 LOW(1)）且不频繁变更国家的节点，避免十几分钟内在美、日、新之间来回切换登录。"
---

## 直接结论：放弃“单节点全能幻想”，用策略组实现各司其职

刚购买机场订阅的新手，几乎都有过同一个误解：打开客户端测速，看到**香港节点延迟最低（通常 20–30ms）、下载速度最快**，于是随手选定一个香港节点“全局用到底”。结果没用两天就发现——看 4K YouTube 和 Netflix 飞快，可一旦在电脑浏览器打开 ChatGPT 就被拦截，打开 Gemini 直接提示地区不支持，刷 TikTok 一直黑屏转圈。

通过对本站留存的三组完整实测样本——**光速云（2026-08-19，70 节点全量检测）**、**无忧链接（2026-07-18，50 节点御三家流媒体检测）** 以及 **灵动云（2026-07-20/21，60 节点检测）**——进行逐项交叉比对，我们可以给出一条在 2026 年适用于绝大多数机场的实战铁律：

1. **没有任何一个单一地区能同时满足“超低延迟 + 全 AI + 全流媒体 + 原生本地片库”**。
2. **香港节点专司极速浏览与港剧**：延迟最低、4K 秒开、Netflix/Disney+ 多数稳健，但对 Gemini 基本不可用、对 OpenAI 网页版常受限、对 TikTok 经常失败。
3. **新加坡 / 日本 / 美国节点专司 AI 生产力**：延迟在 `40–170ms` 之间（对于文本对话、代码生成与 API 请求几乎无感），但 OpenAI 网页版与 Claude 解锁率高，且高纯净度节点（`IPRisk: LOW`）更容易保持账号稳定。
4. **解决问题的最佳工具不是“换十家机场”，而是在 Clash / Mihomo / Shadowrocket 里配置 `proxy-groups` 策略分流**——下文将直接给出可复制使用的 YAML 模板。

---

## 地理风控底层原理：为什么延迟最低的香港专线反而是 AI 重灾区？

想要从根本上会选节点、会写分流规则，必须先弄清下游大厂（OpenAI、Anthropic、Google、Netflix、TikTok）是怎么拦截你的流量的。当你访问这些平台时，对方并不是看你的国内入口在哪，而是死盯四重校验信号：

### 1. 平台官方支持地区清单（Hard Geo-Fence）

以 OpenAI、Anthropic（Claude）和 Google Gemini 为例，**香港地区长期不在部分 AI 产品的完整服务支持区内**。在策略演变过程中，OpenAI 对香港 IP 曾采取过更严格的差异化封控——手机端原生 App（走独立接口签名）有时允许放行，而网页端（`chatgpt.com`）与 API 出口直接按区域拦截。这就是为什么很多用户困惑“手机上明明能问问题，一到电脑浏览器就报不可用”。

### 2. IPType 与 IPRisk（出口 IP 属性与风控分）

在 MiaoKo 实测报告中，除了速度外还有两列极其关键的参数：`IPType`（机房托管 IDC / 商业宽带 ISP / 住宅宽带）与 `IPRisk`（风险评分）。
- 机场香港节点往往为了扛住千兆级大带宽并发，大量采购的是高吞吐数据中心（Hosting / IDC）机房 IP。这类 IP 成千上万人共用，风控系统给它的 `IPRisk` 往往落在 `MEDIUM` 甚至 `HIGH`，极易触发 Cloudflare 人机验证或直接被 Gemini 拒之门外。
- 相比之下，日本和美国部分优质落地机房或原生商宽 IP 的 `IPRisk` 可以低至 `LOW(1)` 或 `LOW(9)`，在应对严苛风控时明显更从容。

### 3. 解锁方式：原生直连 vs DNS 解锁 vs 跨区广播

服务商为了降低成本或解决单区版权限制，有时会在后台采用“DNS 劫持流媒体解锁”或“跨区广播 IP”。这就会造成一种常见割裂现象：
- 某节点看 Netflix 没问题（通过解锁机转发了流媒体关键域名），但访问未在解锁列表里的 AI 域名时依然暴露原机房 IP 而失败；
- 某批 IP 虽然在路由表上挂在台湾节点名下，但 Whois 或 MaxMind 地理数据库尚未更新，结果被下游平台识别成其他国家甚至识别成中国大陆（`送中(CN)`）。

---

## 实测证据一：光速云 2026-08-19（70 节点全量解锁 + 三网 2Gbps/9Gbps 深度拆解）

在 31 家品牌库中，[光速云](/brands/guangsuyun/) 保留了最完整的 **2026-08-19 MiaoKo 实测截图组**（涵盖 70/70 节点解锁检测、珠海联通 9Gbps 单线程以及长沙电信/广西移动/河北联通 2Gbps 6 线程共 5 组实测）。这些真实数字非常典型地揭示了一家主流 IEPL 专线机场在各地区之间的能力分化（详见 [光速云深度评测](/reviews/guangsuyun-deep-review/)）：

### 1. 70/70 节点解锁实测真实结果

- **OpenAI / ChatGPT**：70 个节点整体解锁率很高，日本、新加坡、美国以及多数台湾节点均为**网页 + App 正常解锁**；但 **20 个香港专线节点全部明确返回「仅 APP(HK)」**，一旦用香港节点打开网页版就会受限。
- **Google Gemini**：70 节点全量测试中呈现出极强地区挑剔性——**仅部分新加坡节点、马来西亚节点以及土耳其节点解锁成功**；香港、日本、美国和台湾节点在该次检测中大面积失败。这也是为什么本站对绝大多数机场均严格标注“Gemini 视节点而定”。
- **Netflix 与 Disney+**：70 个节点中绝大多数稳定解锁对应地区片库（香港、日本、新加坡、美国均稳健）；但**台湾节点在实测中出现了 Disney+ 解锁失败**的局部情况。
- **YouTube**：香港、日本、美国节点正常解锁对应地区；但**部分新加坡节点与台湾节点在测试中出现 `送中(CN)` 标记**。
- **TikTok**：美国、新加坡、台湾及部分日本/香港节点解锁，少数节点失败。

### 2. 三网 2Gbps 与 9Gbps 速度及 IPRisk 关键细节

如果你打算按下面方案把香港和新加坡/日本分开分流，还需要参考三网接入表现与 IP 风险评分，避免切到一个“虽然解锁 AI 但你家宽带连上去很卡”的地区：

- **9Gbps 单线程（珠海联通，VLESS，FullCone UDP）**：香港均值 `375–424 MB/s`，新加坡均值 `220–315 MB/s`，美国均值 `313–370 MB/s`，台湾均值 `71–126 MB/s`。这说明底层专线吞吐冗余充沛，**美国和新加坡并不存在跑不动的问题**。
- **三网 2Gbps 6 线程交叉对比（62/62 节点）**：
  - **长沙电信**：日本 09 平均速度达 `49.38 MB/s`，香港专线 TLS RTT 仅 `20–31ms`；
  - **广西移动**：新加坡 01 平均速度达 `53.12 MB/s`（峰值 `56.53 MB/s`）；
  - **河北联通**：新加坡 01 平均速度达 `41.85 MB/s`，但**河北联通测部分香港节点的 HTTPS 延迟明显升高至 `1200ms+`**！这说明对北方联通用户而言，把主力从香港切到新加坡或日本，不仅解决 AI 解锁，连网页响应延迟都可能更稳。
- **IPRisk 分布差异**：在该批实测截图中，日本节点出现 `LOW(9)`、美国节点低至 `LOW(1)`，而新加坡与香港节点多为 `MEDIUM(30)`。因此如果你使用风控最敏感的 Claude 网页版或高权重海外账号，**优先把美/日低风险分节点放在首位**。

---

## 实测证据二：无忧链接 2026-07-18 与灵动云 2026-07-20/21 对比洞察

仅看一家样本容易陷入个案偏差。我们把 **无忧链接（2026-07-18）** 与 **灵动云（2026-07-20/21）** 的独立实测数据摆在一起对照，就能看清“流媒体专精型”与“AI 专精型”各自的长板和短板：

### 1. 无忧链接 2026-07-18（50/50 节点御三家流媒体实测）

在 `2026-07-18 21:40`（测速）与 `21:47`（解锁）珠海联通 `9Gbps 32线程` VLESS 实测中（详见 [无忧链接深度评测](/reviews/wuyou-deep-review/)）：
- **御三家流媒体极强**：全部 **50/50 节点成功解锁对应地区的 Netflix 与 Disney+**；YouTube 达到 `49/50` 正常解锁，唯一的瑕疵是 `香港HKG - 01` 在 YouTube 检测中被识别为 `送中(CN)`。
- **速度与局部故障节点并存**：晚间时段香港均值高达 `392.62–554.59 MB/s`（多为 FullCone UDP），新加坡多数在 `94.83–352.70 MB/s`（但 `新加坡SIN - 02` 掉至 `17.59KB`），日本 `60.17–198.31 MB/s`，台湾 `65.74–94.72 MB/s`，美国相对偏温和（`12.13–18.13 MB/s`）。
- **数据边界提醒**：该次 `07-18` 截图检测的是御三家流媒体（YouTube/Netflix/Disney+），并没有覆盖 ChatGPT/Gemini 逐项检测，且无忧链接自 2026 年 10 月起已改为主推官方专属客户端（不支持第三方 YAML 分流）。

### 2. 灵动云 2026-07-20/21（60 节点实测：OpenAI 强但 TikTok/落地偏科）

在 `2026-07-20/21` 珠海联通 `9Gbps` 60 节点测速与解锁测试摘要中（归档于 `2026-08-09` 历史记录，详见 [灵动云档案](/brands/lingdongyun/)）：
- **OpenAI 解锁极其强悍**：在 60 个节点样本中，**OpenAI 各地区基本实现全解锁**，属于少见的在单次全量测试中 OpenAI 覆盖面拉满的样本；
- **但短板同样非常典型**：
  1. 速度处于“够用级”（`20–80 MB/s`），且 **HTTPS 延迟整体偏高**；
  2. **TikTok 大面积测试失败**，不适合 TikTok 运营需求；
  3. 新加坡与台湾部分节点出现 **YouTube 送中**，美国 01 出现整节点失效；
  4. **台湾落地被 Netflix / Disney+ 识别为 `ES`（西班牙/欧洲区）**——也就是说你想用台湾节点看港澳台限定番剧或台剧，结果刷出来的却是欧洲片库。

**三组真实样本对比结论**：
- 光速云：**高带宽与全量透明标杆**，Netflix 强、三网数据明确，AI 需用分流避开香港且 Gemini 仅新/马/土部分节点有效；
- 无忧链接：**御三家流媒体 50/50 极稳**，美国带宽偏低且未附带 AI 实测图，更偏向轻量追剧与专属 App 用户；
- 灵动云：**历史样本显示 OpenAI 强**，但 TikTok 失败率高且存在台湾 IP 识别成 `ES` 及 HTTPS 延迟偏高问题（且属历史档案，现况需核实）。

---

## 五大热门落地地区实测解锁规律总表（HK / SG / JP / US / TW）

综合 2026-08-19、07-18、07-20/21 实测及 31 家品牌数据库资料，下面这张地区特性表可以作为你日常配置分流策略组的基准参考：

| 落地地区 | 物理延迟参考 | OpenAI / ChatGPT | Claude | Gemini | Netflix / Disney+ | YouTube & TikTok 常见状况 | 实战分工建议 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **香港 (HK)** | `20–35ms`（极低） | 多为**仅 APP** 或网页受限 | 多数不可用或风控极严 | **普遍失败** | 绝大多数稳定解锁 HK 区 | YT 多数正常（偶发个别节点如 HK01 送中）；TikTok 常失败 | **日常主力极速区**：Google、GitHub、网页浏览、港剧 |
| **新加坡 (SG)** | `40–70ms`（较低） | **网页与 App 解锁率高** | 视节点 IP 风险分而定 | **部分节点成功解锁（主力区）** | 稳定解锁 SG 区 | 少数节点偶发 YT 送中(CN)；TikTok 多数可用 | **AI 综合优先区**：兼顾低延迟、ChatGPT 与 Gemini 备选 |
| **日本 (JP)** | `50–85ms`（较低） | **解锁率极高** | 较稳（实测可见 `LOW` 风险 IP） | 多数节点测试失败 | 稳定解锁 JP 区（动漫丰富） | YT 正常；TikTok 部分可用 | **AI 编程 + 日漫主力区**：ChatGPT、Cursor、日区流媒体 |
| **美国 (US)** | `130–180ms`（较高） | **解锁率极高** | **官方原生支持最佳区** | 视机房 IP 纯净度而定 | 稳定解锁 US 最全片库 | YT 正常；TikTok 美区主力 | **Claude / Cursor / 美区科研与美剧主力区** |
| **台湾 (TW)** | `35–60ms`（较低） | 多数解锁 | 可用性中等 | 多数失败 | NF 较稳；D+ 偶发失败或**被误识为 ES** | **最易出现 YouTube 送中(CN)** | **专看台区内容（如巴哈姆特/港澳台 B 站）**，不建议做 AI 主力 |
| **马来 / 土耳其等冷门区** | `80–260ms` | 多数解锁 | 视具体地区支持名单 | **在 08-19 实测中部分通过 Gemini** | 视本地版权情况 | 部分冷门节点带宽较低或偶发 `0B` 故障 | **Gemini / 低价区会员补充节点**，非必要不作日常主力 |

同时提醒注意**品牌文档透明度**：在 31 家品牌中，像 [速界](/brands/sujie/)（¥25/月 150GB，主打 AI 工具且 `2026-08-11` 实测美国均值达 `35.51–51.70 MB/s`）主动在资料里提醒“AI 可用性受 IP、地区和平台规则影响，不应承诺永久稳定”；[可信云](/brands/kexin/) 也坦诚“AI 与流媒体目前缺乏统一实测数据”；[二猫云](/brands/ermao/) 明确指出缺少新加坡（或历史时期偏弱）且 Claude/Gemini 视节点而定。**越是敢于写明局限的品牌，实际使用落差越小。**

---

## 专项疑难解析：YouTube“送中(CN)”、落地漂移（识别为 ES）与 Gemini 风控

### 1. YouTube “送中(CN)” 是怎么回事？怎么肉眼识别？

所谓“送中(CN)”，并不是说你的流量真的没翻出去，而是**机场海外落地机房的 IP 地址被 Google 的位置服务数据库判定为中国大陆（Country Code: CN）**。常见诱因是大量国内用户开着手机 Google 地图、Chrome 定位或 Android GMS 后台定位持续访问该落地 IP，导致 Google 算法把该 IP 的地理坐标重新学习并修正回中国大陆。

**症状排查**：
- 打开 YouTube 网页版，左上角 Logo 旁边没有出现 `HK`、`SG`、`JP` 或 `TW` 地区字母；
- 原本购买的 YouTube Premium 无法后台播放或提示“此国家/地区尚未推出”；
- 在同一个节点下打开 Google 搜索，底部定位显示未知或异常，访问 Gemini 直接报错“Gemini isn't currently supported in your country”。

**解决办法**：一旦发现某个新加坡或台湾节点出现上述症状，不要浪费时间清缓存，直接在客户端里把它拉黑或切到同一机场的其他正常节点（例如在无忧链接 07-18 实测中，HK01 送中但 HK02–HK15 全部正常）。

### 2. 台湾节点被 Netflix/Disney+ 识别为 `ES` 怎么办？

如灵动云 2026-07-20/21 实测发现，部分服务商为了省去昂贵的台湾原生宽带 IP 成本，会买欧美服务商广播到台湾机房的便宜 IP 段。如果下游流媒体只读旧版 IP 归属库，就会把你当成西班牙（`ES`）观众。如果你刚需台区片库或台湾本地服务，购买后第一件事就是用支持地区检测的节点确认 Netflix 首页片库和左上角标识，避免被广播 IP 误导。

### 3. Gemini 为什么比 ChatGPT 难解锁这么多？

Gemini 绑定了 Google 整套风控体系（IP 历史声誉 + Google 账号注册/账单归属区 + 浏览器语言与时区）。
- **第一步**：你的节点 IP 必须不被 Google 判定为 `CN` 或高危滥用数据中心；
- **第二步**：即便节点本身在 2026-08-19 实测中通过了（如新加坡特定节点、马来或土耳其节点），如果你的 Google 账号本身风控等级高，或客户端没有把 `gemini.google.com`、`aisuite`/`bard` 相关 API 域名全部路由到同一个纯净节点（导致一半请求走香港、一半走新加坡），同样会报地区错误！

---

## 实操配置：Clash / Mihomo YAML `proxy-groups` 精细分流模板

不要再每次用 ChatGPT 或看 Netflix 就手动点一次全局切换！只要你的机场支持第三方订阅（如光速云、星岛梦、微风网络、一翻云、速界、唯兔云、极连云、光年梯等），在 **Clash Verge Rev**、**FlClash**、**Stash** 或 **OpenClash** 中使用 **Mihomo（Clash Meta）** 内核的覆写（Override / Script）或自定义 `proxy-groups`，就能把**香港日常极速流量**与**新加坡/日本/美国 AI 流量**彻底分离。

下面是一套经过实战逻辑梳理的 **Clash / Mihomo YAML 配置片段**（你可以直接作为参考模板，按你订阅里实际的节点命名正则调整 `filter` 字段）：

```yaml
# ==========================================
# Clash / Mihomo 精细分流策略组模板 (2026 实战版)
# 目标：香港日常极速 + 新/日/美 AI 专流 + 流媒体/Gemini 独立选点
# ==========================================

proxy-groups:
  # 1. 日常海外总出口：默认自动选香港低延迟专线，兼顾手动切换
  - name: "🚀 日常极速"
    type: select
    proxies:
      - "🇭🇰 香港自动"
      - "🇸🇬 新加坡自动"
      - "🇯🇵 日本自动"
      - "🇺🇸 美国节点"
      - DIRECT

  # 2. OpenAI / ChatGPT / Claude / Cursor 专用组（严禁混入香港节点！）
  - name: "🤖 AI 生产力"
    type: select
    proxies:
      - "🇸🇬 新加坡自动"
      - "🇯🇵 日本自动"
      - "🇺🇸 美国节点"
      - "🤖 AI 自动容灾"

  # 3. Google Gemini 专项组（结合 2026-08-19 实测：优选新/马/土手动核实节点）
  - name: "✨ Gemini 专线"
    type: select
    include-all: true
    filter: "(?i)(新加坡|狮城|SG|马来|MY|土耳其|TR|美国|US)"
    exclude-filter: "(?i)(香港|HK|台湾|TW|官网|流量|到期|剩余)"

  # 4. 流媒体专项组（Netflix / Disney+ / YouTube，可按需切港/新/日/台/美）
  - name: "🎬 流媒体解锁"
    type: select
    proxies:
      - "🇭🇰 香港自动"
      - "🇸🇬 新加坡自动"
      - "🇯🇵 日本自动"
      - "🇺🇸 美国节点"
      - "🇹🇼 台湾节点"

  # 5. 漏网之鱼（未命中内置规则的未知海外站点）
  - name: "🐟 漏网之鱼"
    type: select
    proxies:
      - "🚀 日常极速"
      - "🤖 AI 生产力"
      - DIRECT

  # -------- 底层自动测速与地区分组（使用正则从订阅自动筛选） --------

  - name: "🇭🇰 香港自动"
    type: url-test
    include-all: true
    filter: "(?i)(香港|HK|Hong Kong)"
    exclude-filter: "(?i)(家宽|倍率|0\\.5|到期|剩余)"
    url: "https://cp.cloudflare.com/generate_204"
    interval: 300
    tolerance: 30

  - name: "🇸🇬 新加坡自动"
    type: url-test
    include-all: true
    filter: "(?i)(新加坡|狮城|SG|Singapore)"
    url: "https://cp.cloudflare.com/generate_204"
    interval: 300
    tolerance: 40

  - name: "🇯🇵 日本自动"
    type: url-test
    include-all: true
    filter: "(?i)(日本|东京|大阪|JP|Japan)"
    url: "https://cp.cloudflare.com/generate_204"
    interval: 300
    tolerance: 40

  - name: "🇺🇸 美国节点"
    type: select
    include-all: true
    filter: "(?i)(美国|洛杉矶|圣何塞|纽约|US|USA)"

  - name: "🇹🇼 台湾节点"
    type: select
    include-all: true
    filter: "(?i)(台湾|台北|TW|Taiwan)"

  # AI 容灾组：如果新加坡临时波动，自动按顺序 fallback 到日本或美国，绝不回落到香港
  - name: "🤖 AI 自动容灾"
    type: fallback
    proxies:
      - "🇸🇬 新加坡自动"
      - "🇯🇵 日本自动"
      - "🇺🇸 美国节点"
    url: "https://api.openai.com"
    interval: 300

# ==========================================
# 配合使用的核心分流规则（规则优先级从上到下匹配）
# ==========================================
rule-providers:
  openai:
    type: http
    behavior: domain
    url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/openai.mrs"
    path: ./ruleset/openai.mrs
    format: mrs
    interval: 86400

  anthropic:
    type: http
    behavior: domain
    url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/anthropic.mrs"
    path: ./ruleset/anthropic.mrs
    format: mrs
    interval: 86400

  google-gemini:
    type: http
    behavior: domain
    url: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google-gemini.mrs"
    path: ./ruleset/google-gemini.mrs
    format: mrs
    interval: 86400

rules:
  # 1. Gemini 与 Google AI Studio 优先匹配专属组（避免被通用 Google 规则抢走）
  - DOMAIN-SUFFIX,gemini.google.com,✨ Gemini 专线
  - DOMAIN-SUFFIX,aistudio.google.com,✨ Gemini 专线
  - DOMAIN-SUFFIX,generativelanguage.googleapis.com,✨ Gemini 专线
  - RULE-SET,google-gemini,✨ Gemini 专线

  # 2. OpenAI / ChatGPT / Claude / Cursor 统一走 AI 生产力组（彻底隔离香港节点）
  - RULE-SET,openai,🤖 AI 生产力
  - RULE-SET,anthropic,🤖 AI 生产力
  - DOMAIN-SUFFIX,cursor.sh,🤖 AI 生产力
  - DOMAIN-SUFFIX,cursor.com,🤖 AI 生产力
  - DOMAIN-SUFFIX,perplexity.ai,🤖 AI 生产力

  # 3. 流媒体匹配（确保与日常浏览解耦）
  - DOMAIN-SUFFIX,netflix.com,🎬 流媒体解锁
  - DOMAIN-SUFFIX,nflxvideo.net,🎬 流媒体解锁
  - DOMAIN-SUFFIX,disneyplus.com,🎬 流媒体解锁
  - DOMAIN-SUFFIX,youtube.com,🎬 流媒体解锁
  - DOMAIN-SUFFIX,googlevideo.com,🎬 流媒体解锁

  # 4. 国内域名与局域网直连（确保微信/支付宝/国内开发库不绕路）
  - GEOIP,LAN,DIRECT,no-resolve
  - GEOIP,CN,DIRECT
  - MATCH,🐟 漏网之鱼
```

### 这套 YAML 配置的核心技巧说明：
1. **为什么把 `gemini.google.com` 放在最前面？** 因为很多机场自带规则会把所有 `*.google.com` 全部扔进日常默认组（默认连着香港）。一旦没有把 Gemini 单独拆出来并放在更靠前的位置，访问 Gemini 就会被香港节点抢走而报错。
2. **为什么 `🤖 AI 生产力` 用 `select` 嵌套 `url-test`？** 用 `url-test` 只在**同一国家内部**自动选延迟最低的那台（比如从 `SG01–SG10` 中自动挑最快的），而不建议把“新加坡、日本、美国”混进同一个 `url-test` 里——因为跨国自动切换会导致你的登录会话 IP 在几分钟内反复跳国家，非常容易触发 Claude 或 OpenAI 封号！
3. **iPhone Shadowrocket（小火箭）用户怎么实现同款分流？** 在小火箭的「配置」编辑页面，添加 `RULE-SET` 或 `DOMAIN-SUFFIX` 规则，将上述 AI 域名新建一个策略组（比如命名为 `AI-Node`）并指向某一个固定新加坡/日本/美国节点即可，操作思路完全一致。

---

## 账号防封与日常习惯：避免“秒切十国 IP”触发连坐风控

很多用户以为“节点能打开页面就万事大吉”，结果用了一个月突然收到 Claude 封号邮件或 ChatGPT 账号被限制。除了节点本身的 `IPRisk` 外，**日常使用习惯往往才是压垮账号的最后一根稻草**：

1. **同一会话期间严禁跨国秒切节点**：登录 Claude 或 OpenAI 账号后，尽量长期固定使用同一个地区（例如固定日本或美国节点）。不要上午用日本、中午切新加坡、下午切土耳其、晚上又用美国，这种瞬移行为在风控模型里等同于账号被盗或共享黑产。
2. **排查浏览器 WebRTC 与 DNS 泄漏**：即使你的代理开了新加坡，如果浏览器开启了 WebRTC 真实本地 IP 暴露，或者本地 DNS 没走代理的 `Fake-IP` / 加密 DoH 解析（详见 [Mihomo DNS 防泄漏指南](/articles/clash-meta-mihomo-dns-guide/)），目标站点仍可能发现你的真实网络特征。
3. **关键账号与高风险浏览隔离**：日常登录 GitHub、Claude、ChatGPT Plus 付费账号的浏览器配置（Profile），尽量固定走 `IPRisk: LOW` 的稳定节点；测试未知免费节点或冷门节点时，千万不要在同一个浏览器环境下登录主力付费 AI 账号。

---

## AI 与流媒体选节点/排错检查清单（Checklist）

遇到 AI 报错或流媒体打不开时，按下面四个场景清单依次自查，无需盲目重装软件或换机场：

### 场景 A：ChatGPT 提示 Access Denied / 地区不可用
- [ ] 检查当前策略组是不是不小心走到了 **香港 (HK)** 或 **澳门** 节点（光速云 08-19 实测香港全为仅 APP）。
- [ ] 切换至 **新加坡 / 日本 / 美国** 节点后，**完全退出并重启浏览器**（或清理 `chatgpt.com` 的 Cookie），避免旧会话缓存的拦截状态残留。
- [ ] 如果使用命令行工具或 IDE 插件（如 Cursor / Claude Code），确认终端或 IDE 已经正确配置 `HTTP_PROXY` / `HTTPS_PROXY` 端口，或者客户端已开启 **TUN 虚拟网卡模式**。

### 场景 B：Gemini 提示当前国家不支持
- [ ] 检查 Clash 规则顺序：`gemini.google.com` 与 `aistudio.google.com` 是否排在通用 `Google` 规则之上。
- [ ] 切到实测通过概率更高的 **新加坡（逐个测试 SG 节点）、马来西亚或美国原生节点**（参考光速云 08-19 实测经验）。
- [ ] 检查当前节点是不是已经触发 **YouTube 送中(CN)**；如果连 YouTube 都变成无地区标识，说明该节点 IP 已被 Google 标为 CN，必须换节点。

### 场景 C：Netflix 只显示自制剧 / Disney+ 无限转圈 / 台区变成西班牙语
- [ ] 确认流媒体策略组指向了对应地区的有效解锁节点，而非直连 `DIRECT`。
- [ ] 如果怀疑出现类似灵动云实测中的“台湾节点落地识别为 ES”，切到香港、新加坡或日本主流节点测试片库是否恢复正常。
- [ ] 手机 App 观看时，彻底关闭 App 后台进程重新打开，否则视频软件会沿用上一次启动时缓存的 CDN 路由。

### 场景 D：如何验证新买的机场到底值不值得续费？
- [ ] 阅读 [手把手看懂 MiaoKo 测速图](/guides/how-to-read-miaoko-speedtest/)，不要只看最高速度，重点核对 `TLS RTT`、`HTTPS 延迟`、`IPRisk` 以及是否出现 `送中(CN)` 与 `仅 APP`。
- [ ] 结合 [2026 机场推荐与选型指南](/articles/2026-airport-selection-guide/)，在本地晚高峰（20:30–22:30）用月付小额亲测一周，确认自家电信/联通/移动宽带连 SG/JP/US 的实际体感后再决定是否长期续费。
