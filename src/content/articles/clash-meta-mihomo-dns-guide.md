---
title: "Clash Meta（Mihomo）内核科普：VLESS/HY2 支持、Fake-IP 与 DNS 防泄漏详解"
description: "深度解析 Clash Meta（现名 Mihomo）内核演进、VLESS/Reality/Hysteria 2/AnyTLS/Trojan/SS 全协议矩阵、Fake-IP 与 Redir-Host 架构差异，并提供生产级 Mihomo YAML dns 与 sniffer 配置实战与排错清单。"
slug: "clash-meta-mihomo-dns-guide"
pubDate: "2026-11-20"
updatedDate: "2026-11-20"
category: "核心技术科普"
pillar: "clash"
topicSlug: "clash-meta"
clusterId: "clash-meta-mihomo"
tags: ["Clash Meta", "Mihomo", "Fake-IP", "DNS配置", "VLESS", "Sniffer"]
cover: "/images/covers/clash-verge-guide.svg"
coverAlt: "Clash Meta Mihomo 内核与 DNS 解析机制封面"
author: "小火箭技术组"
excerpt: "直接结论：原 Clash.Meta 内核已更名为 Mihomo，是 Clash Verge Rev、FlClash、Clash Mi 与 OpenClash 等现代客户端的核心引擎。相比停更的原版 Clash，Mihomo 完整支持 VLESS-Reality、Hysteria 2 与 AnyTLS 等新协议，并通过 Fake-IP、nameserver-policy 策略分流与 Sniffer 域名嗅探彻底解决跨国访问中的 DNS 污染与泄漏问题。"
brandSlugs: ["yifan", "guangsuyun", "weifeng", "xingdaomeng", "sujie"]
featured: false
primaryKeyword: "Clash Meta"
secondaryKeywords: ["Mihomo 内核", "Fake-IP 与 Redir-Host", "Clash DNS 配置", "Mihomo Sniffer"]
searchIntent: "Informational"
verifiedDate: "2026-11-20"
reviewStatus: "verified"
relatedSlugs: ["vless-vs-trojan-vs-hy2", "node-timeout-dns-fix", "clash-verge-rev-beginner-guide", "clash-verge-download-and-verify"]
sources:
  - "第三方代理客户端.txt"
  - "32家机场品牌清单.txt"
faq:
  - question: "Clash Meta 和 Mihomo 是同一个内核吗？为什么软件里有时候看到两个名字？"
    answer: "是的，两者指代同一条开源技术演进线。原版 Clash 在 2023 年底停更后，由社区主导开发的增强分支 Clash.Meta 接过了主流维护接力棒，并随后在社区生态中正式统一更名为 Mihomo。目前 Clash Verge Rev、FlClash、Clash Mi、Clash Nyanpasu 以及路由端的 OpenClash、Nikki 均内置或调用 Mihomo 内核。"
  - question: "为什么把机场订阅导入老旧版 Clash 后节点列表是空的，换成 Mihomo 内核的软件立刻就显示了？"
    answer: "因为原版 Clash 内核早已冻结开发，无法识别 VLESS、XTLS-Reality、Hysteria 2 与 AnyTLS 等现代协议。如本站数据库中的光速云、微风网络、一翻云、速界、可信云、光年梯均已广泛部署 VLESS 或 HY2/AnyTLS，必须由支持 Mihomo（或 sing-box/Xray）的客户端才能解析。"
  - question: "DNS 增强模式选 Fake-IP 还是 Redir-Host？"
    answer: "90% 的个人网页浏览、4K 流媒体与 AI 办公场景建议保持默认的 Fake-IP，它能把本地首屏 DNS 等待延迟压到 1ms 以内，并从根本上避免海外域名在本地触发 DNS 污染。只有当你同时连接公司内网 VPN/OA、局域网 NAS 或某些校验真实 IP 的网游反作弊系统时，才需要通过 fake-ip-filter 放行特定域名或切换为 Redir-Host。"
  - question: "Mihomo 配置里 default-nameserver、nameserver、fallback 和 nameserver-policy 各自负责什么？"
    answer: "default-nameserver 必须是纯 IP DNS（如 223.5.5.5），专门用来解析 nameserver 里 DoH/DoT 服务器自身的域名，防止“鸡生蛋”死锁；nameserver 负责主解析；fallback 配合 fallback-filter 在主解析返回海外或污染 IP 时兜底重查；nameserver-policy 则按域名或 geosite 规则直接指定走国内还是海外上游，是现代防泄漏配置的核心。"
  - question: "我已经开启了 Fake-IP，为什么浏览器打开某些网站还是走不到代理规则里？"
    answer: "很大可能是浏览器（如 Chrome/Edge）默认开启了内置的“使用安全 DNS（DoH）”，或者某些客户端软件直接向硬编码的 8.8.8.8 发起 IP 连接，完全绕过了系统 DNS 与 Mihomo 的 1053 劫持端口。此时要么关闭浏览器的内置安全 DNS，要么在 Mihomo 配置中开启 sniffer 域名嗅探。"
  - question: "在开启 Mihomo DNS 的情况下，如何判断自己到底有没有发生 DNS 泄漏（DNS Leak）？"
    answer: "挂上代理后访问 ipleak.net 或 browserleaks.com/dns，观察页面检测到的 DNS 服务器列表：如果结果里出现了你国内本地电信/联通/移动的 ISP 省市 DNS IP，说明发生了 DNS 泄漏；如果只显示代理节点所在地区或可信海外 DoH（如 Cloudflare/Google）地址，则防泄漏配置生效。"
  - question: "为什么配置好复杂的 DNS 后，机场节点域名本身突然全部解析失败、节点全红？"
    answer: "这通常是因为机场节点列表里写的是域名（例如 node01.example.com），而内核尝试去查询这个节点域名时却因为缺少 proxy-server-nameserver 导致死循环或走错了被阻断的上游。在 dns: 块中显式配置 proxy-server-nameserver 指向可靠的国内 DoH（如阿里/腾讯 DoH），即可彻底避免节点自身解析失败。"
---

## 直接结论：Mihomo 为什么成为 2026 年桌面与路由代理的事实标准？

很多新手在折腾代理软件时，容易把 **客户端外壳（GUI）** 和 **代理内核（Core）** 混为一谈：Clash Verge Rev、FlClash、Clash Mi、Clash Nyanpasu、OpenClash 其实是不同的“图形外壳”，而它们底层真正负责协议加密、路由分流、DNS 劫持与虚拟网卡转发的大脑，绝大多数都是同一个开源引擎——**Mihomo（前身为 Clash.Meta）**。

自原版 Clash 在 2023 年底停止更新后，Mihomo 之所以迅速完成生态统一，核心原因在于它彻底解决了老版本内核的两大致命瓶颈：

1. **全协议栈现代化**：完整支持 `VLESS + XTLS-Reality`、`Hysteria 2 (HY2)`、`AnyTLS`、`Trojan`、`Shadowsocks (AEAD/2022)` 与 `VMess`，完美适配 2026 年绝大多数商业机场的新建专线节点。
2. **工业级 DNS 分流与防泄漏架构**：在传统 `Redir-Host` 之外全面强化了 `Fake-IP`、`respect-rules`、`nameserver-policy`、`proxy-server-nameserver` 与 `sniffer` 域名嗅探机制，使国内直连延迟与海外抗污染能力同时达到可用极值。

如果你尚未完成客户端安装与哈希校验，可先回到 [Clash Verge 下载安全核验指南](/articles/clash-verge-download-and-verify/) 备好软件，再结合本文完成核心原理与配置进阶。

---

## 一、从原版 Clash 到 Clash.Meta 再到 Mihomo：内核演进脉络

理解内核演变，就能一眼看懂网上五花八门的旧教程为什么现在会报错：

- **2018–2023 年（原版 Clash / Clash Premium 时代）**：奠定了以 YAML 为配置载体的规则分流体系，确立了 `Proxy` / `Rule` / `Direct` 策略组逻辑与 `Fake-IP` 基础概念，但闭源 Premium 版始终未原生支持 VLESS 与 Hysteria 2，且于 2023 年 11 月彻底删库停更。
- **2022–2023 年（Clash.Meta 社区分支时代）**：开源社区基于原版 Clash 独立重构并补齐了 VLESS、Reality、Hysteria、Sniffer 嗅探、Geosite 规则集与多线程并发拨号等缺失拼图，成为实际功能超集。
- **2024–2026 年（Mihomo 统一品牌时代）**：Clash.Meta 团队正式将内核项目更名为 **Mihomo**（与原名称做品牌切割并持续高频迭代），向上对接 Clash Verge Rev、FlClash、Clash Mi、OpenClash、Nikki 等跨平台外壳，与 `sing-box`、`Xray-core` 共同构成当前主流代理生态的三足鼎立格局。

---

## 二、Mihomo 支持的核心传输协议矩阵与机场生态适配

根据本站 [31 家品牌数据库](/brands/) 的协议统计，当前主流商业机场采用的底层协议已经高度集中于以下六类，而 **Mihomo 对它们全部提供原生支持**：

| 协议名称 | 底层传输与安全特性 | 核心优势与适用场景 | 本站品牌库典型示例 | 客户端兼容性注意 |
| :--- | :--- | :--- | :--- | :--- |
| **VLESS + Reality** | TCP/XTLS，免服务端自签证书，伪装为目标大站真实 TLS 指纹 | 抗主动探测能力强、无多余加密头开销，是 2026 年机场最主流协议 | [光速云](/brands/guangsuyun/)、[一翻云](/brands/yifan/)、[微风网络](/brands/weifeng/)、[速界](/brands/sujie/)、[光年梯](/brands/guangnian/)、[可信云](/brands/kexin/) | **老旧原版 Clash 不支持**，必须用 Mihomo / sing-box / Xray |
| **Hysteria 2 (HY2)** | 基于 QUIC (UDP) + Brutal 主动拥塞控制算法 | 在高丢包率跨国线路或晚高峰突发下抗抖动能力极强，单线程吞吐高 | [一翻云](/brands/yifan/)（三协议支持） | 若所在校园网/运营商严格限制 UDP QoS，需在机场切换回 TCP 系协议 |
| **AnyTLS** | 新兴轻量级 TLS 隧道协议，旨在规避固定 TLS-in-TLS 特征指纹 | 连接建立开销低、针对现代深度包检测做了时序与特征缓解 | [光速云](/brands/guangsuyun/) | 需要较新版本的 Mihomo 内核（Clash Verge Rev 保持最新即可） |
| **Trojan** | 标准 TLS 1.3 模拟正常 HTTPS 网站通信 | 生态最成熟、穿透企业防火墙能力稳健、几乎零兼容盲区 | [星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[全球云](/brands/quanqiu/) | 全世代客户端几乎通吃，但仍强烈建议使用 Mihomo 保障安全更新 |
| **Shadowsocks (AEAD / 2022)** | 轻量对称流密码封装 | 加解密 CPU 开销极低，常见于 IEPL/IPLC 内网专线后端转发与高速测速基准 | 多家专线后端与测速渠道 | 2022 新版密码学规范需本地系统时间同步且使用现代内核 |
| **VMess** | 经典动态 ID 加密协议（现多强制 AEAD） | 历史存量教程极多，稳定性尚可 | 部分存量/多协议兼容后端 | **极度依赖本地系统时间同步**（误差超 90 秒即全面超时） |

如需深入了解三大核心协议在速度、防封锁与功耗上的底层取舍，可延伸阅读 [VLESS、Trojan 与 Hysteria 2 协议深度对比](/articles/vless-vs-trojan-vs-hy2/)。

---

## 三、DNS 污染、DNS 泄漏与分流错乱的底层因果链

许多用户以为“代理软件只要把节点连上就行了”，其实在一次正常的网页访问中，**DNS 解析的归属权直接决定了网速快慢、分流准不准以及隐私安不安全**：

```text
[浏览器/App 发起请求: 访问 chatgpt.com 或 taobao.com]
        │
        ▼
[第 1 步：DNS 域名解析] ──▶ 若直接走本地运营商明文 UDP 53：
        │                      ├─ 国内网站：正常返回本地最优 CDN IP
        │                      └─ 海外网站：遭 DNS 污染返回假 IP，且本地 ISP 记录你访问了该域名（DNS 泄漏）
        ▼
[第 2 步：Mihomo 规则引擎匹配]
        ├─ 命中 DOMAIN / GEOSITE 规则 ──▶ 直接按域名决定「直连」还是「走代理」
        └─ 仅命中 GEOIP / IP-CIDR 规则 ──▶ 必须依赖第 1 步拿到的 IP 地址来判断归属地（若第 1 步被污染则分流全错）
        │
        ▼
[第 3 步：建立真实 TCP/UDP 隧道传输数据]
```

由此引出两个必须分清的工程概念：
- **DNS 污染（DNS Poisoning）**：向海外域名发起未加密的明文查询时，链路中间设备抢先返回一个虚假的境外/错误 IP，导致后续哪怕节点本身畅通，本地算出来的目标 IP 也是错的。
- **DNS 泄漏（DNS Leak）**：开着代理访问海外网站时，网页内容虽然加密走了海外节点，但“查询这个域名对应哪个 IP”的 DNS 请求却偷偷从本地家宽直连发了出去——不仅暴露浏览清单，还常常因为跨国 CDN 把你调度到距离节点极远的机房。

---

## 四、Fake-IP vs Redir-Host 深度架构对比

为了解决“先有 IP 还是先分流”以及本地 DNS 阻塞问题，Mihomo 提供了两种核心增强解析模式：`fake-ip` 与 `redir-host`。理解它们的工作流差异，是看懂一切 Clash 配置的关键。

### 4.1 Redir-Host 模式工作流（传统真实 IP 路径）

1. 应用向系统询问 `www.google.com` 的 IP；
2. Mihomo 截获该 DNS 请求，**在本地向配置的上游加密 DNS（DoH/DoT）发起真实查询并等待结果返回**；
3. 拿到真实的 Google IP 后，将其返回给浏览器，同时在内存中记录“该 IP ↔ `www.google.com`”的映射表；
4. 浏览器拿着真实 IP 发起连接，Mihomo 再结合域名映射与 `GEOIP` 规则决定走直连还是发往机场节点。

**关键特点**：由于操作系统和应用拿到的永远是货真价实的公网/内网 IP，兼容性极佳；缺点是**每次访问新域名都必须等待一次本地到可信 DNS 服务器的真实查询往返（RTT）**，且若 `fallback` 触发远端复核，首屏会感到明显停顿。

### 4.2 Fake-IP 模式工作流（零等待虚拟 IP 路径，Mihomo 推荐默认）

1. 应用向系统询问 `www.google.com` 的 IP；
2. Mihomo 截获请求后，**根本不等上游真实解析结果**，立刻从保留的私网测试地址段 `198.18.0.0/16` 中顺手抽取一个空闲虚拟 IP（例如 `198.18.0.12`）秒速回传给浏览器，并记下 `198.18.0.12 ↔ www.google.com`；
3. 浏览器在 **1 毫秒内** 立刻用 `198.18.0.12` 发起 TCP 连接；
4. Mihomo 收到发往 `198.18.0.12` 的流量后，查表还原出真实目标域名 `www.google.com` 并进行规则判断：
   - **如果命中直连（如淘宝/微信）**：Mihomo 才在本地发起国内加密 DNS 查询真实 IP 并直连（除非该域名本身已被列入 `fake-ip-filter` 直接返回真 IP）；
   - **如果命中代理（如 Google/ChatGPT）**：Mihomo **直接把域名字符串 `www.google.com` 封装进 VLESS/Trojan/HY2 隧道发给远端机场服务器**，由远端机场节点在海外当地进行零污染、最近 CDN 的 DNS 解析！

### 4.3 架构级全方位对比表

| 比较维度 | Fake-IP 模式（`enhanced-mode: fake-ip`） | Redir-Host 模式（`enhanced-mode: redir-host`） |
| :--- | :--- | :--- |
| **首屏连接建立耗时** | **极快（本地返回虚拟 IP 几乎 <1ms，省去本地等待解析往返）** | 偏慢（每次新域必须等待本地上游 DNS 返回真实 IP） |
| **防 DNS 污染能力** | **极强（海外域名解析权彻底交给远端节点，本地零暴露）** | 较强（高度依赖本地正确配置海外 DoH/DoT 与 Fallback） |
| **DNS 泄漏概率** | **极低**（配置 `fake-ip-filter` 与 `nameserver-policy` 后几乎为零） | 中等（配置不当极易导致规则里的 `GEOIP` 触发本地漏查） |
| **海外 CDN 地理就近性** | **最优**（日本节点解析出日本就近 CDN IP，美国节点解析出美国 IP） | 易出现本地加密 DNS 解析出与当前代理节点不同洲的次优 CDN IP |
| **本地网络 / 内网兼容** | 少数内网 OA、NAS、网游反作弊或校验真实 IP 的软件可能异常 | **极高（应用程序永远看到真实的公网或局域网 IP）** |
| **与 `GEOIP` 规则交互** | 若某域名未命中前段域名规则而落入 `GEOIP,CN`，Fake-IP 仍需在本地补充解析真实 IP，因此需尽量完善前置 `GEOSITE` 规则 | 所有请求均已具备真实 IP，天然可直接匹配 `GEOIP` |

### 4.4 系统代理模式 vs TUN 虚拟网卡模式下的 DNS 接管差异

很多新手困惑：“为什么我已经在 YAML 里写了全套 `dns:` 配置，可有时候有效、有时候根本没进 Clash 的 DNS 日志？”这往往取决于你开启的是 **系统代理（System Proxy）** 还是 **TUN 模式**：

- **仅开启「系统代理」时**：操作系统只是通知浏览器等支持代理协议的应用“把 HTTP/HTTPS 请求先发给 `127.0.0.1:7897`”。对于海外请求，浏览器连域名带路径打包发给 Clash 后，**根本不会在本地触发 Mihomo 的 `dns.listen`（1053 端口）**，而是由 Clash 内核或远端机场服务器直接处理域名；而对于不走系统代理的软件（比如某些直连脚本、游戏、老牌桌面客户端），其 DNS 请求仍然直接走本地宽带路由器的 UDP 53 端口，完全绕开了你的 `dns:` 模块。
- **开启「TUN 模式」后**：Mihomo 在操作系统底层创建一张虚拟网卡并接管全部三层 IP 流量与系统默认 DNS 出口（通常配合 `dns.listen` 与 `auto-route` / `dns-hijack` 自动截获全机 UDP/TCP 53 端口查询）。此时无论是浏览器、终端 `curl`、`git` 还是后台进程，**所有域名查询都必须经过 Mihomo 的 DNS 引擎与 Fake-IP 分配器**。因此，本文所述的完整防 DNS 泄漏架构与 `nameserver-policy`，在开启 **TUN 模式** 时才能发挥出 100% 的全局保护威力。

---

## 五、生产级 Mihomo YAML `dns:` 与 `sniffer:` 完整配置实战

许多机场默认下发的订阅配置文件中，DNS 模块非常简陋，甚至没有区分节点域名解析与规则策略分流。下面是一份**经过实战检验、可直接用于 Clash Verge Rev「全局扩展配置（Merge / Override）」的标准 Mihomo YAML 示例**，每一项均附有工程注释：

```yaml
# ==========================================
# Mihomo (Clash.Meta) 生产级 DNS 与嗅探参考模板
# ==========================================

dns:
  enable: true
  listen: 0.0.0.0:1053
  # 若本地宽带无稳定 IPv6 或经常因此导致境外加载转圈，建议保持 false
  ipv6: false
  # 优先使用 fake-ip；若兼容内网需求大，可改为 redir-host
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16

  # 强制让 DNS 上游服务器出站遵循 rules: 规则（避免直连 DNS 走代理、或代理 DNS 直连超时）
  respect-rules: true

  # 1. default-nameserver：必须填纯 IP！专用于解析下面 DoH/DoT 域名（如 dns.alidns.com）自身
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29

  # 2. proxy-server-nameserver：专门用于解析机场节点域名，防止节点自身解析陷入死循环
  proxy-server-nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query

  # 3. nameserver：默认主解析池（建议国内高可用 DoH，负责快速并发）
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query

  # 4. direct-nameserver：供直连出站规则使用的专用国内 DNS
  direct-nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query

  # 5. nameserver-policy：按域名集合强制指定上游，彻底消除国内绕外与海外泄漏
  nameserver-policy:
    "geosite:private,cn":
      - https://dns.alidns.com/dns-query
      - https://doh.pub/dns-query
    "geosite:geolocation-!cn":
      - "https://dns.cloudflare.com/dns-query#PROXY"
      - "https://dns.google/dns-query#PROXY"

  # 6. fallback 与 fallback-filter：当主查询未命中 policy 且疑似返回污染/非 CN IP 时兜底
  fallback:
    - "https://dns.cloudflare.com/dns-query#PROXY"
    - "https://dns.google/dns-query#PROXY"
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4
      - 0.0.0.0/32

  # 7. fake-ip-filter：以下域名必须跳过 Fake-IP，直接返回真实 IP，保证系统与局域网服务不崩溃
  fake-ip-filter:
    # 本地与局域网域
    - "*.lan"
    - "*.local"
    - "*.internal"
    - "localhost.ptlogin2.qq.com"
    # 系统时间同步（极其重要！防止 VLESS/Trojan 时间校验失败）
    - "time.*.com"
    - "time.*.gov"
    - "time.*.edu.cn"
    - "time.*.apple.com"
    - "ntp.*.com"
    - "+.pool.ntp.org"
    # 操作系统联网检测（防止 Windows/macOS 图标显示“无 Internet 访问”）
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
    - "connectivitycheck.gstatic.com"
    - "captive.apple.com"
    # P2P / 音视频通话 STUN 打洞与常见国内游戏平台
    - "+.stun.*.*"
    - "+.stun.*.*.*"
    - "+.battlenet.com.cn"
    - "+.wotgame.cn"
    - "+.wggames.cn"
    - "+.wowsgame.cn"
    - "+.yggdrasil.cn"
    # 常见局域网设备与企业内网补充（按需添加）
    - "+.synology.com"
    - "+.quickconnect.to"

# ==========================================
# Sniffer 域名嗅探配置（解决绕过系统 DNS 的流量分流失效）
# ==========================================
sniffer:
  enable: true
  # 对未能通过 Fake-IP 还原出域名的纯 IP 连接，强制嗅探 TLS SNI 与 HTTP Host
  parse-pure-ip: true
  # 用嗅探还原出的真实域名覆盖连接目标，以便二次精准匹配 DOMAIN/GEOSITE 规则
  override-destination: true
  sniff:
    HTTP:
      ports: [80, 8080-8880]
      override-destination: true
    TLS:
      ports: [443, 8443]
    QUIC:
      ports: [443, 8443]
  # 强制对某些常走纯 IP 的特殊场景嗅探
  force-domain:
    - "+.v2ex.com"
  # 跳过容易因嗅探导致握手异常的国内特定推送或物联网域
  skip-domain:
    - "Mijia Cloud"
    - "+.push.apple.com"
```

### 5.1 重点参数拆解：为什么这几行配置不可或缺？

1. **为什么 `nameserver-policy` 中的海外 DoH 后面要带 `#PROXY`（或策略组名）？**
   在国内网络环境下，`dns.google` 和 `dns.cloudflare.com` 本身大多处于直连被阻断状态。如果在 Mihomo 中设置了 `respect-rules: true` 并在 DoH 地址后附加 `#PROXY`（请将 `PROXY` 替换为你机场订阅里实际的主策略组名称，如 `节点选择`），Mihomo 就会通过**已连通的代理节点**去查询海外加密 DNS，既防泄漏又不会因为直连超时而卡死。
2. **为什么必须配置 `proxy-server-nameserver`？**
   假设你的机场节点地址是 `hk01.example-airport.com`，如果 Mihomo 在启动瞬间没有单独告诉它“节点自己的域名去哪查”，又开启了 `respect-rules`，就可能出现“连节点要先查节点域名 → 查域名想走代理 → 代理还没连上节点”的死锁。单独指定阿里/腾讯 DoH 给 `proxy-server-nameserver`，就能秒速解开这个死结。
3. **为什么 `fake-ip-filter` 里一定要放 `msftconnecttest` 和 `time.*.com`？**
   如果 Windows 的联网探针域名或 NTP 对时服务器拿到的是 `198.18.x.x` 假 IP，就可能出现系统右下角网络图标突然变成“小地球（无 Internet 连接）”，或者电脑系统时间同步失败进而导致全线节点 TLS 超时。

### 5.2 GeoSite 与 GeoIP 规则数据库自动更新机制

你可能注意到了上文配置中的 `"geosite:private,cn"` 与 `geoip-code: CN`。Mihomo 之所以能用短短两行就精准区分数十万个国内外域名与 IP 段，依靠的是内核内置加载的 **`GeoSite.dat`（域名集合库）** 与 **`GeoIP.dat` / `Country.mmdb`（IP 归属地数据库）**，以及现代推荐的 `MetaCubeX` 二进制规则集格式（`.mrs`）。

- **定期更新的必要性**：国内云厂商、CDN 节点与海外 AI 平台新域名每月都在动态变化，如果几个月不更新地理数据库，新上线的国内服务可能被误判走海外代理消耗流量，而新注册的海外 AI 域名也可能漏掉防泄漏策略。
- **配置方法**：在 Clash Verge Rev 的「设置 → Mihomo 内核设置」或覆写配置中开启 `geodata-mode: true` 与 `geo-auto-update: true`（更新间隔 `geo-update-interval: 24` 小时），即可让内核在后台定期拉取最新规则库。若国内网络直接拉取默认 GitHub GeoData 源经常超时，可通过代理或使用社区定期镜像规则集避免初始化失败。

---

## 六、`sniffer`（域名嗅探）为什么是现代代理不可缺少的半壁江山？

很多用户问：“我明明已经开启了 `Fake-IP`，按理说所有请求都会经过 Mihomo 的 DNS，为什么在客户端「连接（Connections）」日志里还是经常看到光秃秃的目标 IP（如 `104.18.x.x:443`）？”

原因有三类：
1. **浏览器内置安全 DNS（Secure DNS / DoH）**：现代 Chrome、Edge、Firefox 默认往往悄悄开启了自己的加密 DNS，浏览器的域名查询直接走 HTTPS 绕开了操作系统 DNS 设置，等它真正发起连接时，交给 Mihomo TUN 网卡的已经是一个现成的真实 IP 了；
2. **硬编码 DNS 的客户端或容器**：许多手机 App、命令行工具或 Docker 容器无视系统 DNS，直接向内置的 `8.8.8.8` 或 `1.1.1.1` 发包；
3. **跨设备旁路由转发缓存**：局域网里其他设备缓存了旧 DNS 记录直接发 IP。

此时如果不开 `sniffer`，Mihomo 只能看到冰冷的 IP 地址，无法命中 `DOMAIN-SUFFIX,openai.com` 或 `GEOSITE,cn` 等域名规则。启用上文配置中的 `sniffer:` 模块后，Mihomo 会在建立连接的第一个数据包阶段（TLS `ClientHello` 的 SNI 字段、HTTP 的 `Host` 头或 QUIC 初始握手包）**无损读取出真实目标域名**，瞬间把纯 IP 请求还原为域名规则路由，大幅提升分流准确率与防误杀能力。

---

## 七、五大高频 DNS 与内核排错清单（对照表）

在实际使用 Clash Verge Rev 或 OpenClash 遇到诡异网络故障时，请按以下五步排查表精准定位：

| 异常现象 | 底层根本原因 | 最快验证与修复方法 |
| :--- | :--- | :--- |
| **1. 开启 TUN 后，公司内网 OA、局域网 NAS 或游戏联机平台打不开** | 这些内网或私有协议客户端直接校验返回的 IP 网段，无法识别 `198.18.0.0/16` 虚拟 IP | 将公司内网后缀（如 `*.corp.internal`）或 NAS 域名加入 `fake-ip-filter`；若仍无效，在客户端 DNS 设置里暂时切换为 `redir-host` 模式 |
| **2. 刚导入订阅时节点域名全部报错无法连接，日志提示 `lookup xxx failed`** | 缺少 `proxy-server-nameserver`，或者本地 DNS 劫持与节点解析产生死锁 | 在配置中添加 `proxy-server-nameserver: [223.5.5.5, https://dns.alidns.com/dns-query]`，并检查本地系统时间是否准确 |
| **3. 访问网站时规则明明写了直连，但流量依然跑进了海外节点（或相反）** | 浏览器开启了内置“使用安全 DNS”，彻底架空了客户端分流逻辑 | 进入 Chrome/Edge 设置 → 隐私与安全 → 安全 → **关闭「使用安全 DNS」**，同时在 Mihomo 中启用 `sniffer: enable: true` |
| **4. 挂代理打开网页偶尔转圈 10 秒才出来，或 `ipleak.net` 出现本地运营商 IP** | 本地网卡启用了优先级更高的 IPv6 DNS（运营商下发），或者发生了 `respect-rules` 缺失导致的兜底泄漏 | 在 Mihomo DNS 配置中设为 `ipv6: false`，完善 `nameserver-policy` 中 `!cn` 的 `#PROXY` 路由，并核对客户端系统代理绕过列表 |
| **5. 客户端报错 `YAML parse error` 或节点全部消失** | 机场提供的订阅包含了 VLESS/HY2 节点，但用户误用旧内核版本，或手动粘贴覆写 YAML 时缩进空格（2 空格）错位 | 确认客户端内核为 Mihomo 最新版；在 Clash Verge Rev 中点击配置右键「校验/测试」或用 YAML 缩进检查，注意 YAML 中禁止使用 `Tab` 键缩进 |

---

## 八、如何在 Clash Verge Rev 中安全落地配置（避免每次更新订阅被覆盖）

新手最常犯的错误是直接点击机场订阅配置文件的「编辑（Edit）」修改 `dns:` 块——结果第二天点一下「更新订阅」，昨晚辛苦改好的配置全被服务器新下发的文件冲掉了。

**正确的工程化做法是使用 Clash Verge Rev 的「全局扩展覆写（Global Override / Merge）」功能**：
1. 打开 Clash Verge Rev 左侧 **「订阅（Profiles）」** 界面；
2. 鼠标移到右上角或底部的 **「全局扩展覆写配置（Merge）」**（图标通常为代码文档样式），新建或编辑一份独立的覆写 YAML，只写入上面 `dns:` 与 `sniffer:` 部分（**注意**：不要把机场的 `proxies:` 节点列表写进去，也不要照抄网上来路不明的远程 JS 覆写脚本）；
3. 核对 `#PROXY` 后的策略组名字是否与你的机场订阅一致（部分机场主策略组叫 `节点选择` 或 `Proxy`，若名字不匹配会导致海外 DoH 找不到出口，可以在「代理」页直接看顶部大组名并替换）；
4. 右键勾选启用这份 Merge 覆写文件，再点击左侧「日志（Logs）」观察几秒确认没有 YAML 解析报错。此后每次更新机场订阅节点时，Clash Verge Rev 都会自动把干净的 `dns:` 与 `sniffer:` 注入覆盖到最新节点之上，实现一劳永逸的防泄漏与高可用体验。

如果你在实际运行中仍遇到节点全部超时或关闭软件后电脑彻底断网等突发状况，请结合 [节点 Timeout 与断网修复指南](/guides/node-timeout-dns-fix/) 与 [订阅拉取失败排查指南](/guides/subscription-failed-troubleshooting/) 完成最后闭环排查。
