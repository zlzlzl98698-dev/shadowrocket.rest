---
title: "iOS Shadowrocket（小火箭）使用教程：外区获取、订阅导入、延迟测速与规则分流"
description: "详解 iPhone/iPad 使用 Shadowrocket（小火箭）的完整步骤：海外 Apple ID 安全准则与锁机防范、付费与免费替代客户端对比、订阅自动更新、配置/代理/直连路由模式、按需连接防断流及 VLESS/Hysteria 2 版本要求。"
slug: "shadowrocket-ios-setup"
pubDate: "2026-11-15"
updatedDate: "2026-11-20"
category: "iOS 客户端教程"
pillar: "vpn"
topicSlug: "shouji-vpn"
clusterId: "vpn-shouji-ios"
tags: ["Shadowrocket", "小火箭教程", "手机VPN", "iOS代理"]
cover: "/images/covers/shadowrocket-ios.svg"
coverAlt: "Shadowrocket 小火箭 iOS 完整使用教程封面"
author: "小火箭技术组"
excerpt: "Shadowrocket（小火箭）是 iOS/iPadOS 上口碑最稳定的规则代理客户端之一，在美区等外区 App Store 属于一次性付费应用。严守“只登录 App Store、绝不登录手机 iCloud”的账号安全红线，导入订阅后将全局路由设为「配置（Config）」，即可实现国内直连、海外分流、Wi-Fi/5G 无缝防断流。"
brandSlugs: ["guangsuyun", "weifeng", "xingdaomeng", "ermao"]
platforms: ["iOS", "iPadOS"]
difficulty: "入门"
featured: false
primaryKeyword: "手机 VPN"
secondaryKeywords: ["Shadowrocket 使用教程", "小火箭怎么用", "iOS 代理软件推荐"]
searchIntent: "Informational"
verifiedDate: "2026-11-19"
reviewStatus: "verified"
relatedSlugs: ["ai-and-streaming-unlock-guide", "subscription-failed-troubleshooting", "2026-airport-selection-guide"]
sources:
  - "第三方代理客户端.txt"
faq:
  - question: "Shadowrocket 小火箭是免费的吗？为什么国区 App Store 搜不到？"
    answer: "不是免费应用。Shadowrocket 在中国大陆区 App Store 未上架，在美国、香港、日本、新加坡等海外区 App Store 均属于一次性付费买断应用（具体售价以所属地区商店实时标价为准）。切勿下载国区名字相似、图标近似的免费山寨应用，避免遭遇内购套路或隐私窃取。"
  - question: "借用或购买别人共享的外区 Apple ID 下载小火箭有什么风险？"
    answer: "最大风险在于“误登 iCloud 导致远程锁机勒索”。如果你必须在他人协助下使用外区账号，绝对不能在「手机设置 → 顶部 Apple ID / iCloud」中登录，仅可在「App Store → 右上角头像」内切换账号。更安全的做法是自己注册一个专属海外 Apple ID，通过合规外区礼品卡充值购买，彻底消除锁机与密码泄露隐患。"
  - question: "不想花钱买小火箭，iOS 还有哪些免费或开源替代客户端？"
    answer: "根据第三方客户端资料整理，iOS 端可以在外区 App Store 免费下载 Karing、Clash Mi、Hiddify 或官方 sing-box (SFI) 作为替代。其中 Karing 对多种订阅格式兼容很好，Clash Mi 原生支持 Clash YAML，基础订阅导入和节点切换均可免费使用。"
  - question: "Shadowrocket、Stash 和 Quantumult X（圈 X）三款付费软件该怎么选？"
    answer: "三者均属于外区 App Store 一次性付费买断应用。普通用户和新手首选 Shadowrocket（小火箭），协议支持最全、省电稳定；如果你在电脑上习惯了 Clash Verge Rev 的 YAML 规则与策略组，希望 iCloud 多端同步配置，选 Stash；如果你热衷于 HTTP 请求重写、脚本去广告与深度抓包调试，选 Quantumult X。"
  - question: "小火箭首页的「全局路由」应该选「配置」还是「代理」？"
    answer: "95% 的日常时间必须选择「配置（Config）」。在「配置」模式下，小火箭会依据规则文件让微信、支付宝、淘宝、国内银行 App 自动直连（Direct），只把 Google、YouTube、ChatGPT 等海外域名送去代理；如果误选了「代理（Proxy）」，所有国内流量也会绕道海外节点，导致国内软件变卡并白白消耗机场流量。"
  - question: "为什么小火箭做「连通性测试」延迟只有 30ms，但看视频依然很卡或打不开 ChatGPT？"
    answer: "小火箭首页的「连通性测试」默认只测量到节点的 TCP/URL 握手延迟，不能反映该节点的真实下载带宽和出口 IP 风控状态。比如香港节点握手延迟通常只有 20–40ms，但很多机场的香港 IP 访问 OpenAI 仅限 App 端或不支持网页版，且不支持 Gemini；遇到 AI 不可用时需切至新加坡、日本或美国节点。"
  - question: "导入一翻云等含 VLESS-Reality 或 Hysteria 2 的新订阅后全部节点超时怎么办？"
    answer: "这多半是因为你的 Shadowrocket 版本过旧，或者节点需要较新的握手参数支持。请切回购买该 App 时的外区 Apple ID，打开 App Store 更新 Shadowrocket 至最新版本即可支持 VLESS-Reality、Hysteria 2 与 AnyTLS 等协议。如果用的是共享账号导致无法更新，建议彻底更换为自己名下的外区账号重新购买。"
  - question: "手机锁屏或从 Wi-Fi 切换到 5G 时经常断网，小火箭怎么设置保活？"
    answer: "打开小火箭底部「设置 → 按需连接（On Demand）」，开启「按需连接」并添加「总是开启」规则；同时可在「设置 → 隧道」中适当检查内存与连接模式。如果你家里有 OpenWrt 软路由已经跑了全屋透明代理，还可以把家里 Wi-Fi 名称（SSID）加入按需连接的排除断开规则，实现回家自动断小火箭、出门自动秒连。"
---

## 核心结论：iPhone / iPad 安全使用小火箭的四条铁律

**Shadowrocket（俗称“小火箭”）** 是 iOS 与 iPadOS 平台上生态最成熟、协议兼容度最高且最省电的规则代理客户端之一。它采用自研多协议引擎，原生支持 Shadowsocks、Trojan、VMess、VLESS（含 Vision / Reality）、Hysteria 2 等主流协议，且支持订阅管理、规则分流、按需自动连接以及场景路由切换。

在正式配置前，请先把以下四条核心原则记在心里：

1. **账号安全红线**：购买与下载仅在 **App Store 应用商店内** 切换你自己的海外区 Apple ID，**绝对不要在 iPhone「设置」最顶部的 Apple ID（iCloud）处登录任何陌生人或网购共享账号**。
2. **确认机场支持订阅**：先核对你的机场是否开放第三方通用订阅（如光速云、星岛梦、微风网络、一翻云、二猫云、唯兔云、梯子云均支持）；如果买的是飞猫云、SOGO 云、隐形人、Firefly 等专属客户端品牌，直接按其官网 iOS 指引下载官方 App 即可，无法导入小火箭。
3. **全局路由选「配置」**：首页下方「全局路由」日常务必保持 **`配置（Config）`**，不要选「代理（Proxy）」，以免国内微信、支付宝和网盘流量白白绕路。
4. **保持最新版**：VLESS-Reality 与 Hysteria 2 协议对客户端版本有要求，务必使用可随时在 App Store 正常更新的正版账号。

---

## 第一步：App Store 地区获取与 Apple ID 安全防锁机指南

由于中国大陆区 App Store 未上架任何合规第三方规则代理工具，iPhone 和 iPad 用户需要通过美国、香港、日本、新加坡等海外地区 App Store 获取客户端。

### 1.1 为什么绝不能在手机「设置 → iCloud」登录陌生共享账号？

网络上常有人售卖“几块钱一次的共享外区 ID 下载小火箭”，一旦操作不慎把该账号登进了系统级 iCloud：
- **远程抹除与锁机勒索风险**：账号控制者只要在网页端开启「查找我的 iPhone（Find My）」并将设备标记为丢失，你的整台 iPhone 就会瞬间变成无法激活的砖头，对方借此索要高额解锁费。
- **通讯录与照片同步泄漏**：登录 iCloud 会自动双向同步你的相册、备忘录和通讯录至陌生人的云端空间。
- **无法后续升级与丢节点**：共享账号经常因多人异地登录被 Apple 风控锁定，后续软件更新支持 VLESS / Hysteria 2 时你会完全无法更新，只能卸载重买。

### 1.2 唯一安全的操作路径：只切换 App Store 商店账号

建议自行注册一个归属地为美国（或港区/日区）的个人 Apple ID，通过合规外区礼品卡充值购买 Shadowrocket：

1. 打开 iPhone 主屏幕的 **「App Store」**（蓝色 A 字图标，**不是系统齿轮「设置」图标**）。
2. 点击右上角个人头像，滑到页面最底部，点击 **「退出登录（Sign Out）」**。
3. 滑回顶部，输入你自己的外区 Apple ID 账号与密码登录。
4. 此时 App Store 页面语言与货币会自动切换为对应地区。在搜索框输入 **`Shadowrocket`**，核对开发者名称（`Shadow Launch Technology Limited`）与价格标签后购买下载。
5. 下载安装完成后，可以再次在 App Store 右上角头像退出，换回你日常使用的国区 Apple ID（不影响已安装 App 的正常使用；仅在需要更新小火箭版本时再临时切回外区登录更新即可）。

> **防假冒警告**：国区商店里经常出现名字叫“Shadowrocket Proxy”“小火箭加速”的图标高仿软件，它们往往带有高额周订阅陷阱且无法导入标准机场订阅。记住：**大陆区 App Store 没有任何正版 Shadowrocket**。

---

## 第二步：iOS 端付费与免费替代客户端横评（按预算与习惯选择）

如果你还没决定买哪一款 iOS 代理工具，或者想先找免费工具体验，可以根据 [客户端全平台数据库](/clients/) 整理如下对比表：

| 客户端名称 | 获取渠道与付费方式 | 底层核心与配置格式 | 核心优势 | 最适合哪类 iOS 用户 |
| :--- | :--- | :--- | :--- | :--- |
| **Shadowrocket（小火箭）** | 外区 App Store / **一次性付费买断** | 自研多协议引擎；支持 Base64 / SS / VLESS / Clash / 独立 `.conf` | **行业通用标准**，极度省电、协议覆盖最全、几乎所有机场都有专属一键导入 | **90% iPhone/iPad 用户的默认首选** |
| **Stash** | 外区 App Store / **一次性付费买断** | Clash 规则兼容内核；原生 Clash YAML | 策略组界面与桌面 Clash Verge Rev 高度一致，支持 iCloud 同步配置与覆写 | 电脑重度使用 Clash Verge Rev、习惯 YAML 规则链的进阶用户 |
| **Quantumult X（圈 X）** | 外区 App Store / **一次性付费买断** | 自研规则引擎；专用分流与重写语法 | 支持精细 HTTP 请求重写（Rewrite）、Task 定时任务与去广告脚本 | 喜欢折腾脚本扩展、分流规则极度定制化的资深玩家 |
| **Surge 5** | 外区 App Store / **免费下载 + 高级功能订阅/买断** | 企业级网络调试内核 | 顶级的 MITM 抓包、HTTP 解密调试、Ponte 跨设备远程回家与模块生态 | 移动端开发者、网络工程师与多苹果设备联动的高预算用户 |
| **Karing** | 外区 App Store / **免费基础版（含内购）** | sing-box 系 | 支持多订阅自动合并、Clash 与通用链接混导、规则集一键管理 | **不想花钱买付费软件的入门新手首选** |
| **Clash Mi** | 外区 App Store / **免费下载** | Mihomo 内核 | 原生直接加载标准 Clash YAML 配置，界面轻量直观 | 免费体验 Mihomo 生态与 Clash 订阅的轻度用户 |
| **sing-box (SFI) / Hiddify** | 外区 App Store / **开源免费** | sing-box 官方核心 | 对 VLESS-Reality、Hysteria 2 等新型抗干扰协议支持极佳 | 使用原生 sing-box JSON 配置或极简纯连场景的用户 |

---

## 第三步：订阅导入、配置文件结构与自动后台更新

安装好 Shadowrocket 并准备就绪后，我们需要把机场节点的订阅地址写入小火箭。

### 3.1 导入订阅的两种规范方式

#### 方式一：Safari 浏览器复制订阅 URL 手动添加（最稳定、推荐）
1. 在 iPhone 上打开 **Safari 浏览器**（不要用微信内置浏览器打开机场面板，以免链接被截断或拦截），登录你的机场控制面板。
2. 在面板首页找到 **「订阅中心 / 复制订阅地址」**，点击复制通用订阅链接或 Shadowrocket 专用链接。
3. 打开 **Shadowrocket**，点击右上角的 **`+`** 号。
4. 在弹出的「添加节点」页面中：
   - **类型（Type）**：点击切换为 **`Subscribe`**（不要选成 Shadowsocks 或 Trojan，否则只能填单个节点 IP）。
   - **URL**：长按粘贴刚才复制的 `https://...` 订阅链接，检查开头与结尾没有多余空格或换行符。
   - **备注（Remarks）**：填写容易辨认的名称（例如“光速云”或“一翻云”），方便以后同时挂多个备用机场时区分。
5. 点击右上角 **「完成」**。小火箭会自动请求订阅网址并把几十个地区节点拉取到首页列表中。

#### 方式二：电脑端扫码导入（适合懒得在手机打字登录面板）
1. 在电脑浏览器登录机场后台，点开订阅二维码弹窗。
2. 打开手机上的 Shadowrocket，点击左上角的 **扫一扫图标 `[-]`**。
3. 对准电脑屏幕上的订阅二维码扫描，小火箭会自动识别并弹出保存或更新提示，确认即可完成节点导入。

### 3.2 开启自动后台更新与节点有效期查看

机场节点域名和端口会不定期维护调整，开启自动更新能大幅减少“突然连不上”的概率：

1. 点击底部导航栏最右侧的 **「设置（Settings）」**。
2. 找到并进入 **「订阅（Subscribe）」** 菜单。
3. 开启以下两个关键开关：
   - **「打开时更新（Update on Open）」**：每次你手动打开小火箭 App 时，顺带检查拉取一次最新节点列表。
   - **「自动后台更新（Auto Background Update）」**：由 iOS 系统后台定时刷新订阅，并可在下方设置更新间隔（通常按默认 `24` 小时即可）。
4. **查看剩余流量与到期时间**：回到首页，很多机场会在节点列表最顶部或底部生成两行信息节点（例如“剩余流量：150GB”“套餐到期：2026-12-20”），也可以在「首页 → 向左滑动订阅分组标题 → 更新」旁查看状态，**注意不要选中这两行信息节点去连接，它们不是真实代理服务器**。

---

## 第四步：全局路由模式详解（配置 vs 代理 vs 直连 vs 场景）

小火箭首页中部有一个极为重要的选项：**「全局路由（Global Routing）」**。很多用户反映“开了小火箭以后微信传图巨慢、淘宝加载不出图片、甚至每个月流量两天就用光了”，99% 是因为把全局路由错选成了「代理」。

| 路由选项 | 流量放行策略 | 真实应用场景 | 误用后果与建议 |
| :--- | :--- | :--- | :--- |
| **配置（Config）** | **按底部「配置」选中的规则文件自动分流**：匹配海外规则的走节点，匹配 `GEOIP,CN` 与国内域名的走 `DIRECT` 直连，广告规则走 `REJECT` | **日常 95% 以上时间必须使用此模式** | 确保你的「配置」栏里已经启用了带完整大陆白名单规则的配置文件 |
| **代理（Proxy）** | 强制手机上几乎所有 App 请求都经过当前选中的海外节点（相当于桌面端的 Global 全局模式） | 1. 临时测试某款冷门海外 App 是否因为规则漏掉而加载失败；2. 应急下载某个规则未覆盖的外区服务 | **切勿长期使用**！国内 App 全部绕道海外会造成延迟飙升和双倍流量消耗 |
| **直连（Direct）** | 仅开启本地 VPN 虚拟接口但所有请求直接走本地 Wi-Fi / 5G 出口，不经过节点 | 需要利用小火箭的本地 DNS 映射、去广告拦截或抓包日志，但不需要翻墙出国时 | 平时很少单独使用，排查故障时用于确认是不是代理服务器的问题 |
| **场景（Scene）** | 根据当前所连 Wi-Fi 名称（SSID）或蜂窝网络状态，自动切换不同的节点与路由模式 | 经常在公司 Wi-Fi、家里软路由 Wi-Fi 和户外 5G 之间频繁切换的多网络用户 | 配合按需连接规则使用非常顺手，入门后强烈建议探索 |

---

## 第五步：构建高可用分流配置（国内直连 + AI 专项分流示例）

如果你导入订阅后，发现「配置」选项卡里还是默认自带的极简规则，或者遇到“开了香港节点看网页很快，但打开 ChatGPT 网页版/App 或 Gemini 却提示地区不可用”，可以通过修改或引用带 AI 分流的配置文件来一次解决。

### 5.1 为什么不能只靠“一个香港节点”打天下？

结合我们在 [AI 与流媒体解锁指南](/articles/ai-and-streaming-unlock-guide/) 中引用的 **2026-08-19 70 节点全量实测**：
- **香港节点** 握手延迟最低（20–30ms）、看 4K YouTube/Netflix 极快，但 OpenAI 常被限制为“仅 APP 解锁”，且绝大多数香港节点不支持 Gemini。
- **新加坡、日本、美国节点** 对 ChatGPT、Claude 网页与 API 解锁率显著更高；Gemini 则更挑剔，往往需要特定的新加坡、马来西亚或美国原生节点。

### 5.2 Shadowrocket 实用分流规则片段（`.conf` 核心段示例）

在小火箭底部的 **「配置（Config）」** 页面，点击当前生效的 `.conf` 文件选择 **「编辑配置」**（或「编辑纯文本」），在 `[Rule]` 段落的最顶部插入以下精准分流规则，就能确保国内流量、iOS 系统时间校时直连，同时把 AI 与流媒体流量送到最匹配的分组或节点：

```ini
[General]
bypass-system = true
skip-proxy = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, localhost, *.local, captive.apple.com
bypass-tun = 10.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.168.0.0/16, 224.0.0.0/4
dns-server = system, 223.5.5.5, 119.29.29.29
ipv6 = false

[Rule]
# 1. 苹果推送与系统 NTP 时间同步强制直连，防止时间偏差引发 TLS 握手失败
DOMAIN-SUFFIX,push.apple.com,DIRECT
DOMAIN-SUFFIX,time.apple.com,DIRECT
DOMAIN-SUFFIX,ntp.org,DIRECT

# 2. 主流 AI 平台规则（若未建策略组，可将 AI-Group 改为你订阅中具体的新加坡/日本节点名或 PROXY）
DOMAIN-SUFFIX,openai.com,PROXY
DOMAIN-SUFFIX,chatgpt.com,PROXY
DOMAIN-SUFFIX,oaistatic.com,PROXY
DOMAIN-SUFFIX,oaiusercontent.com,PROXY
DOMAIN-SUFFIX,anthropic.com,PROXY
DOMAIN-SUFFIX,claude.ai,PROXY
DOMAIN-SUFFIX,gemini.google.com,PROXY
DOMAIN-SUFFIX,generativelanguage.googleapis.com,PROXY
DOMAIN-SUFFIX,aistudio.google.com,PROXY
DOMAIN-SUFFIX,perplexity.ai,PROXY

# 3. 常见国内高速直连补漏与局域网直连
IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
DOMAIN-SUFFIX,cn,DIRECT
GEOIP,CN,DIRECT
FINAL,PROXY
```

> **进阶玩法（URL-Test / 策略组）**：如果你想实现“平时主页选香港，一打开 ChatGPT 自动切到新加坡/日本”，可以在小火箭配置里新建一个 `[Proxy Group]`（类型为 `select` 或 `url-test`），或者直接使用支持在线策略组的 **Stash** / **Shadowrocket 远程多策略配置模板**，将上面第 2 部分的 `PROXY` 替换为自定义分组名（如 `AI`），从而彻底告别手动切节点。

---

## 第六步：连通性测试 vs 真实速度，以及选节点实战技巧

回到小火箭首页，点击 **「连通性测试（Connectivity Test）」**，所有节点右侧都会出现一个毫秒数字（如 `42 ms`）或红色的 **`Timeout`（超时）**。

### 6.1 正确理解“连通性测试”的局限性

很多新手误以为“数字越小代表下载速度越快”，其实这是两个完全不同的维度：
1. **连通性测试测的是握手延迟（RTT）**：小火箭在默认设置下向 `http://www.gstatic.com/generate_204` 发送一个极小的 HTTP 请求并计算耗时（可在「设置 → 测试」中查看测试方法 `TCP` 或 `CONNECT`）。数字越小，说明网页点击后的“首屏反应”越快。
2. **延迟低 ≠ 带宽高**：一个节点可能延迟只有 25ms，但晚高峰母鸡拥堵时只能跑出 2Mbps，看 4K 视频一样卡顿；反之，一个日本或美国节点延迟 140ms，但带宽充足，打开高清视频和 AI 流式输出依然如丝般顺滑。
3. **看到 `Timeout` 怎么办？**：如果只是个别节点超时，属于单台服务器维护，换一个绿色延迟的节点即可；如果**整排全部几十个节点同时显示 `Timeout`**，请立刻检查：
   - 手机系统时间是不是手动调慢/调快了（需去 `设置 → 通用 → 日期与时间` 打开 **自动设置**）；
   - 是否该更新一下订阅了；
   - 机场套餐是否已过期或本月流量已耗尽；
   - 客户端版本是否太旧无法支持 VLESS / Hysteria 2。

### 6.2 协议版本要求：为什么 VLESS / HY2 必须升级最新版小火箭？

在 2026 年主流机场（如光速云、微风网络、一翻云、速界、梯子云）中，越来越多节点采用了 **VLESS-Reality**、**Hysteria 2** 或 **AnyTLS** 协议来对抗运营商干扰。
- 如果你手机上装的是几年前流传的旧版 Shadowrocket，它在解析 Hysteria 2 或 VLESS-Reality 参数时会直接静默失败，表现就是**节点在列表里看得到，但一连就超时或根本没流量**。
- **验证方法**：点击节点右侧的感叹号 **`ⓘ`** 查看协议类型。若看到 `VLESS`、`Reality` 或 `Hysteria2`，请务必确保你的 Shadowrocket 已在 App Store 更新到最新版本。

---

## 第七步：按需连接（On-Demand）与 Wi-Fi / 5G 切换防断流优化

iPhone 用户最头疼的问题之一是：**明明昨晚开了小火箭，早上出门从家里 Wi-Fi 切换到 5G 时，或者手机息屏十几分钟后，突然刷不出外网了，必须重新打开 App 再点一下开关。** 这可以通过小火箭的「按需连接」完美解决。

### 7.1 开启「总是开启」实现断网自动重连

1. 打开 Shadowrocket 底部 **「设置（Settings）」**。
2. 点击进入 **「按需连接（On Demand）」**。
3. 打开顶部的 **「按需连接」** 总开关。
4. 打开 **「总是开启（Always On）」**（不同版本中文译名可能为“按需开启”或直接提供规则列表）：
   - 开启后，只要发生 Wi-Fi 断线重连、蜂窝数据基站切换、或者系统回收内存后网络激活，iOS 系统级的 Network Extension 会自动重新拉起小火箭 VPN 隧道，**极大缓解锁屏和切网断流**。

### 7.2 家里有 OpenWrt 软路由时的“无感排除”技巧

如果你的家里已经按 [OpenWrt 软路由指南](/guides/openwrt-router-proxy-guide/) 配置好了全屋透明代理，手机回到家连上自家 Wi-Fi 时如果还开着小火箭，就会形成“手机加密一次 + 软路由再转发一次”的套娃，既费电又可能减速。

通过「按需连接」中的 **「断开连接（Disconnect）」** 规则即可实现全自动切换：
1. 在「按需连接」设置里，找到 **「规则」→「添加规则」**。
2. 动作选择 **「断开连接（Disconnect）」**。
3. 网络类型选择 **「仅 Wi-Fi（Wi-Fi Only）」**，在 **SSID** 栏准确填入你家里的 Wi-Fi 名称（注意区分大小写）。
4. 随后确保通用兜底规则为 **「连接（Connect）」**（在蜂窝网络及其他陌生 Wi-Fi 下自动连接）。
5. 配置完成后：你一走进家门连上自家 Wi-Fi，小火箭会自动断开把流量交给软路由；一出门离开家连上 5G 或咖啡馆 Wi-Fi，小火箭会在 1 秒内自动无感启动！

### 7.3 局域网共享与代理共享（给家里 Switch / 电视用）

如果你手头只有 iPhone 装了小火箭，想临时让旁边的电脑、Switch 或电视盒子走代理（不常用但应急极佳）：
1. 进入小火箭底部 **「设置 → 代理 → 代理共享」**。
2. 打开 **「启用共享」**，记下界面上显示的 **本机局域网 IP**（如 `192.168.1.88`）和 **端口**（默认多为 `1082` 或可自定义）。
3. 在同一 Wi-Fi 下的 Switch/电脑网络设置里，将 HTTP 代理设为手动，填上该 IP 和端口即可（注意共享期间 iPhone 需保持亮屏或前后台保活，不要断开连接）。

---

## 第八步：iOS 小火箭高频故障排查流程图与速查表

当你点击开关后发现依然上不了网时，按下面这棵决策树只需 1 分钟就能定位症结：

```text
iPhone 打开 Shadowrocket 开关后依然无法访问海外网站
   │
   ├── 1. 状态栏右上角 / 控制中心根本没有出现「VPN」图标
   │        └── 可能原因：首次授权被拒 / 与手机里其他加速器冲突
   │            解决：去 iPhone「设置 → 通用 → VPN与设备管理」删除残留配置，重启小火箭重新授权
   │
   ├── 2. 有「VPN」图标，但国内网站正常、所有海外网站打不开
   │        ├── 检查首页选中节点是否为「剩余流量 / 到期时间」信息节点 ──▶ 切回香港/日本/新加坡真实节点
   │        ├── 点「连通性测试」全部红色 Timeout ──▶ 更新订阅 / 确认套餐没过期 / 检查系统日期自动设置 / 升级新版 App
   │        └── 单个节点通但特定网站（如 ChatGPT/Gemini）打不开 ──▶ 切到新加坡或日本节点
   │
   └── 3. 连海外正常，但微信/支付宝/淘宝打不开或转圈
            ├── 检查「全局路由」是否误选了「代理（Proxy）」 ──▶ 立刻改回「配置（Config）」
            └── 检查「配置」tab 里当前使用的 `.conf` 是否为空白或失效规则 ──▶ 恢复默认配置或重新下载带 CN 直连规则的配置文件
```

### 8.1 iOS 日常常见报错与对应解法速查

| 故障表现 | 根因排查 | 一句话解决方案 |
| :--- | :--- | :--- |
| **添加订阅弹出 `403` 或无法连接服务器** | 订阅域名在当前网络受阻或短时间请求太频繁 | 切 5G 流量试一次，或在机场面板换用备用订阅域名，详见 [订阅失败排查手册](/guides/subscription-failed-troubleshooting/) |
| **连通性测试有延迟，但 Safari 一直空白加载** | 本地 DNS 污染、IPv6 路由黑洞或选到了假通节点 | 在「配置 → 编辑配置」关闭 `ipv6 = false`，切换另一个地区节点并重置网络测试 |
| **一开小火箭就弹窗要求输入面容 ID / 死循环断连** | 手机里同时装了两个以上 VPN 类软件互相抢占 TUN 隧道 | 去 `系统设置 → 通用 → VPN与设备管理`，删除不用的加速器 VPN 描述文件，只留 Shadowrocket |
| **Apple App Store 下载软件极慢** | `配置` 规则把 App Store 的 CDN 域名送去了较慢的海外节点 | 在规则中检查 App Store 相关域名是否已走 `DIRECT`，或临时切换为高带宽香港专线节点 |
| **提示“未能添加到 VPN 配置”** | iOS 系统网络扩展进程卡死或描述文件冲突 | 重启一次 iPhone，进入 `设置 → 通用 → VPN与设备管理` 清理旧条目后重新连接授权 |

---

## 总结检查清单（Checklist）

在结束配置开始日常使用前，请核对以下 6 项是否全部就位：

- [ ] Shadowrocket 是通过 **App Store 内个人外区账号** 购买下载的，**系统 iCloud 保持为自己的个人账号**。
- [ ] 已在「设置 → 订阅」开启 **打开时更新** 与 **自动后台更新**。
- [ ] 首页「全局路由」已设置为 **配置（Config）**，且选中的是真实地区节点（非顶部流量信息行）。
- [ ] 需要使用 ChatGPT / Claude / Gemini 时，已切换到新加坡、日本或美国等适配地区节点，而非硬连受限的香港节点。
- [ ] 已在「设置 → 按需连接」配置保活规则，解决切换 Wi-Fi / 5G 时的断流烦恼。
- [ ] 若连接支持 VLESS-Reality / Hysteria 2 的订阅出现异常，已确认 App Store 中的小火箭处于最新版本。
