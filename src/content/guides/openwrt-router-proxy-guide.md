---
title: "OpenWrt 软路由透明代理指南：OpenClash、PassWall2、Nikki 与 HomeProxy 环境核对"
seoTitle: "OpenWrt 软路由代理指南：OpenClash、PassWall2 与 Nikki 对比"
description: "安装 OpenWrt 软路由代理插件前必读：通过 SSH 核对 OpenWrt 版本、CPU 架构、opkg/apk 包管理器、内核 TUN/TPROXY 模块与 firewall4 nftables 依赖；全面对比 OpenClash、PassWall2、Nikki（24.10+ 硬性要求）、HomeProxy 与 v2rayA，附带硬件加解密性能瓶颈分析与电视盒子/游戏机分流绕过配置。"
slug: "openwrt-router-proxy-guide"
pubDate: "2026-11-13"
updatedDate: "2026-11-20"
category: "软路由教程"
pillar: "clash"
topicSlug: "tuijian"
clusterId: "clash-tuijian-router"
tags: ["OpenWrt", "OpenClash", "PassWall2", "Nikki", "HomeProxy"]
cover: "/images/covers/clash-verge-guide.svg"
coverAlt: "OpenWrt 软路由透明代理方案封面"
author: "小火箭技术组"
excerpt: "在 OpenWrt 软路由上配置透明代理，能让电视盒子、PS5/Switch 游戏主机和全家手机免装软件直接跨境联网。但路由器固件环境极其敏感，安装 OpenClash、PassWall2、Nikki 或 HomeProxy 前必须通过 SSH 先查清 OpenWrt 版本、CPU 架构、opkg/apk 包管理器、TUN/TPROXY 内核模块与 firewall4 nftables 防火墙后端（例如 Nikki 明确要求 OpenWrt 24.10 及以上），并避开百元弱 CPU 加解密瓶颈与 PT 下载误走代理坑。"
brandSlugs: ["guangsuyun", "xingdaomeng", "weitu", "sogo"]
platforms: ["OpenWrt", "Linux"]
difficulty: "进阶"
featured: false
primaryKeyword: "软路由 Clash 插件"
secondaryKeywords: ["OpenClash 教程", "PassWall2", "Nikki OpenWrt", "HomeProxy"]
searchIntent: "Informational"
verifiedDate: "2026-11-19"
reviewStatus: "verified"
relatedSlugs: ["clash-verge-rev-beginner-guide", "vless-vs-trojan-vs-hy2", "node-timeout-dns-fix"]
sources:
  - "第三方代理客户端.txt"
faq:
  - question: "为什么我在老版本 OpenWrt 上安装 Nikki 一直报依赖错误或找不到安装包？"
    answer: "根据第三方代理客户端资料核实，Nikki 是专为新版 OpenWrt 架构设计的精简 Mihomo 透明代理插件，明确要求 OpenWrt 24.10 及以上版本及对应的 firewall4 / nftables 环境。如果你正在运行 21.02、22.03 或 23.05 等旧版本固件，请改用 OpenClash 或 PassWall2，不要强行安装 Nikki。"
  - question: "软路由方案对机场订阅有什么硬性要求？买错机场会怎样？"
    answer: "路由器插件必须使用明确提供第三方通用订阅（Clash YAML 或 sing-box/Xray 节点）的机场，如光速云、星岛梦、唯兔云、微风网络、一翻云等；同时由于全家多设备共享，建议优先选不限设备数或高并发容忍的品牌。仅提供专属客户端的品牌（如飞猫云、隐形人、Firefly、灵猫网络、无忧链接、闪跃、全球云）没有开放第三方订阅，无法写入 OpenClash 或 PassWall2；SOGO 云虽提及软路由方向，但也依赖其官方方案而非直接导入通用 YAML。"
  - question: "为什么家里拉了千兆宽带，软路由一开代理看 4K 视频却只能跑几十兆？"
    answer: "绝大多数情况下瓶颈不在机场节点，而在路由器的 CPU 加解密算力。百元级入门硬路由（如旧款 MIPS MT7621 或无硬件 AES 加速的低频 ARM 芯片）跑 Shadowsocks/VLESS/Trojan 加密转发时单核 CPU 会瞬间满载 100%。想稳定跑满 500M–1000M 代理带宽，建议使用 x86 架构工控软路由（如 N100 / J4125）或带高性能 ARMv8 加密指令的设备（如 RK3568 / Filogic 830 平台）。"
  - question: "怎么防止家里的 NAS 下载 PT、国内电视盒子或网盘跑流量把机场套餐瞬间烧光？"
    answer: "在透明代理插件的「访问控制（Access Control）」中将 NAS、PT 下载机、国内电视机或监控摄像头的局域网固定 IP（或 MAC 地址）加入“不走代理列表（Bypass / 黑名单模式放行直连）”；同时务必检查国内直连规则集（GeoIP CN / China List）和 BT 端口屏蔽，避免任何 P2P 下载流量误入节点隧道。"
  - question: "OpenWrt 固件里有的用 opkg，有的用 apk，安装包后缀不对装不上怎么办？"
    answer: "OpenWrt 23.05 及更早版本默认使用 opkg 包管理器（安装包后缀为 .ipk）；从 OpenWrt 24.10 Snapshot 及向 25.x 演进的新版体系开始逐步引入 apk 包管理器（安装包后缀为 .apk）。下载 GitHub 插件前，务必在 SSH 终端输入 opkg --version 或 apk --version 确认当前系统包格式，两者不能混装。"
  - question: "OpenClash、PassWall2、Nikki 和 HomeProxy 四款插件应该怎么选？"
    answer: "OpenWrt 24.10+ 且偏好 Clash YAML 与极简内存占用的玩家选 Nikki；想要在 22.03/23.05/24.10 上用最丰富的策略组图形界面和覆盖脚本选 OpenClash（建议路由器内存 ≥ 256MB，最好 512MB+）；喜欢 Xray/sing-box 多核心、独立节点分流与细粒度访问控制选 PassWall2；完全基于新版 OpenWrt 原生 sing-box 生态与轻量化设计则选 HomeProxy。"
  - question: "PS5 / Nintendo Switch 连上软路由后，为什么联机匹配显示 NAT 类型受限或语音掉线？"
    answer: "游戏主机联机高度依赖 UDP 转发与 FullCone NAT。首先在软路由插件中开启「UDP 转发」并确认所选机场节点本身支持 FullCone UDP（例如 2026-08-19 实测中光速云多数节点为 FullCone）；其次在插件分流里不要把主机和国内联机认证域名绕远路，或者在「访问控制」中仅代理商店/更新下载而让特定游戏服务器按需走低延迟专线。"
---

## 核心结论：装软路由代理插件前的“五步环境体检”

把代理部署在 **OpenWrt 软路由（主路由或旁路由）** 上，最大的魅力在于“**全屋零配置**”——家里的 Apple TV、小米/索尼电视、PS5、Xbox、Nintendo Switch 以及来访客人的手机，只要连上家里 Wi-Fi，就能按照预设规则实现“国内直连、海外自动走专线”，无需在每台设备上分别安装和开关客户端。

但路由器是嵌入式 Linux 系统，不像 Windows/macOS 那样有一个万能安装包。**盲目往路由器里传一个 `.ipk` 包强行安装，轻则报错依赖缺失，重则直接把 `dnsmasq` 或防火墙搞崩导致全屋断网！**

动手指安装 OpenClash、PassWall2、Nikki 或 HomeProxy 之前，务必记住这三条黄金原则：
1. **先做 SSH 五项体检**：核对 OpenWrt 版本、CPU 架构、`opkg/apk` 包管理器、TUN/TPROXY 内核模块以及 `iptables/nftables` 防火墙后端。
2. **选对插件与版本的硬门槛**：例如 **Nikki 明确要求 OpenWrt 24.10 及以上版本**；而 **OpenClash** 对内存要求较高（建议 ≥ 256MB，理想 512MB+）。
3. **核对机场是否允许软路由**：必须使用提供第三方订阅（Clash YAML 或 sing-box/Xray）且不限制多设备共享的机场，做好局域网大流量设备（NAS/PT）的绕过隔离。

---

## 第一步：安装前必做的 5 项 SSH 系统检查（附直接可复制命令）

用电脑终端（Windows PowerShell / macOS Terminal）执行 `ssh root@192.168.1.1`（替换为你的 OpenWrt 管理 IP）登录后，依次运行以下五组检查命令，把结果记在记事本里：

### 1.1 检查 OpenWrt 主版本号与固件分支

```sh
cat /etc/openwrt_release
```

重点观察输出中的 **`DISTRIB_RELEASE`** 和 **`DISTRIB_TARGET`**：
- `DISTRIB_RELEASE="24.10.x"`：最新主流正式版，全面使用 `firewall4 (nftables)`，**满足 Nikki 的最低版本要求**。
- `DISTRIB_RELEASE="23.05.x"` 或 `22.03.x`：使用 `firewall4 (nftables)`，适合 **OpenClash**、**PassWall2**、**HomeProxy**，但无法直接安装要求 24.10+ 的 Nikki。
- `DISTRIB_RELEASE="21.02.x"` 或更老的魔改固件（基于 `iptables` / `fw3`）：只能用老版本兼容的 `OpenClash` 或 `PassWall2`（带 `iptables` 依赖包），无法使用仅支持 `nftables` 的新插件。

### 1.2 检查 CPU 指令集架构与包架构标识

```sh
uname -m && opkg print-architecture 2>/dev/null || apk --print-arch 2>/dev/null
```

不要只看路由器机身外壳宣传的“四核处理器”，必须以系统返回的精准架构为准：
- **x86 软路由（J4125 / N5105 / N100 等）**：通常显示 `x86_64`。
- **高性能 ARM 软路由 / 硬路由（R4S / R5S / 红米 AX6000 / 小米 AX3600 / 华硕等）**：通常显示 `aarch64_cortex-a53`、`aarch64_cortex-a72` 或 `aarch64_generic`（内核层面 `uname -m` 为 `aarch64`）。
- **老式 32 位 ARM / MIPS 路由器（如 K2P、极路由等 MT7621）**：显示 `mipsel_24kc` 或 `arm_cortex-a7_neon-vfpv4`。下载插件界面包（`luci-app-*` 通常是 `all` / `noarch` 架构）时影响不大，但**下载 Mihomo / Xray / sing-box 核心二进制文件时必须严丝合缝匹配此架构**！

### 1.3 检查包管理器类型：`opkg`（`.ipk`）还是 `apk`（`.apk`）

```sh
which opkg apk
```

OpenWrt 官方正在从传统 **`opkg`** 向新版 **`apk`** 过渡：
- 如果返回 `/bin/opkg`（23.05 及以下以及多数 24.10 稳定版）：下载扩展名为 **`.ipk`** 的插件包，使用 `opkg install` 安装。
- 如果返回 `/usr/bin/apk`（部分新版 Snapshot 或未来 25.x 体系）：下载扩展名为 **`.apk`** 的包，使用 `apk add --allow-untrusted` 安装。两者格式完全不互通。

### 1.4 检查防火墙后端：`firewall4 (nftables)` 还是 `firewall3 (iptables)`

```sh
which fw4 fw3; nft --version 2>/dev/null; iptables --version 2>/dev/null
```

- 返回 `fw4` 与 `nftables v1.x.x`：代表系统采用现代 **nftables** 架构。安装插件依赖时，**务必安装带 `nft` / `kmod-nft-tproxy` 后缀的依赖**，切勿乱装老式 `iptables` 规则链引发双防火墙打架。
- 返回 `fw3` 与 `iptables`：老固件，需配套 `iptables-mod-tproxy`、`ipset` 等经典模块。

### 1.5 检查内核 TUN 与 TPROXY 模块 + 剩余空间/内存

```sh
lsmod | grep -E "tun|tproxy|nft_tproxy|nf_tproxy"
df -h /overlay
free -m
```

- **存储空间（`/overlay` 可用空间）**：硬路由往往只有 16MB–128MB 闪存！OpenClash 连同 Mihomo 内核、GeoIP/GeoSite 数据库通常需要 **25MB–40MB** 空间；如果 `/overlay` 剩余不足 15MB，硬装必然报错 `No space left on device` 并导致系统无法保存配置。
- **运行内存（`free -m`）**：OpenClash + 完整规则集常驻内存约 80MB–150MB，**路由器总内存建议 ≥ 256MB（运行内存 ≥ 512MB 更稳妥）**；128MB 内存的老路由如果硬跑带全量规则的 Mihomo 极易触发 OOM 崩溃重启。

---

## 第二步：五大 OpenWrt 透明代理插件深度对比与选型

对照 [客户端全平台数据库](/clients/) 的 OpenWrt 栏目，目前生态最活跃、资料最清晰的五款方案对比如下：

| 插件名称 | 底层代理核心 | 固件与环境硬性要求 | 内存与闪存开销 | 核心优势 | 局限与避坑注意 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClash** | **Mihomo** (Clash.Meta) | 兼容 OpenWrt 21.02–24.10+（同时适配 iptables 与 nftables） | **偏高**（建议 RAM ≥ 256MB，Flash 可用 ≥ 35MB） | **图形界面最完善**：直接导入机场 Clash YAML 订阅、自动更新规则集、可视化策略面板（Yacd/Metacubexd）与覆写脚本 | 功能项极多导致新手易点乱；在低内存硬路由上加载过大 GeoSite 库易崩溃；需手动下载匹配架构的 Mihomo 内核 |
| **PassWall2** | **Xray / sing-box** 等多核心 | 广泛兼容老旧与新版 OpenWrt（支持 iptables 与 nftables） | **中等**（RAM 128–256MB 也能跑得较稳） | **节点与分流逻辑极清晰**：支持按端口/IP/域名列表独立分流、多协议节点混用、支持细粒度访问控制与负载均衡 | 默认不直接照搬机场 Clash 复杂策略组界面（偏节点列表与分流规则列表思维），需自行理解分流规则条目 |
| **Nikki** | **Mihomo** 透明代理 | **明确硬性要求 OpenWrt 24.10 及以上版本**（原生 `firewall4` nftables + 新内核） | **较低–中等**（结构精简，无历史包袱） | 专为现代 OpenWrt 24.10+ 打造，代码极干净，原汁原味利用 `nftables` 实现高效透明代理与配置文件管理 | **老固件（23.05/22.03/21.02）绝对装不上！** 不适合还没升级系统的老路由器 |
| **HomeProxy** | **sing-box** | 适合现代 `firewall4 / nftables` 架构（推荐 23.05 / 24.10+） | **轻量**（sing-box 单二进制结构紧凑） | 与原生 OpenWrt LuCI 契合度极高，纯正 sing-box 路由与规则集引擎，TPROXY/TUN 效率高 | 传统机场大多下发 Clash YAML，不直接提供原生 sing-box JSON 订阅，往往需要机场端支持或转换规则 |
| **v2rayA** | **Xray** / v2ray | 通用 Linux 软路由、Docker、Ubuntu 网关或特定 OpenWrt 环境 | **轻量–中等** | 自带独立的现代 Web 管理页面（2017 端口），不完全依赖 LuCI 界面，支持通用订阅直接导入 | 在部分精简 OpenWrt 固件上依赖和透明代理兼容性不如原生 LuCI 插件（PassWall2/OpenClash）直接 |

### 2.1 一句话选型决策树

```text
选择最适合你当前设备的 OpenWrt 插件
   │
   ├── 设备是 OpenWrt 24.10+，习惯 Clash 订阅且追求干净现代的 nftables 架构 ──▶ 首选 Nikki
   │
   ├── 设备是 22.03 / 23.05 / 24.10，内存 ≥ 512MB，需要机场 Clash 策略组与复杂可视化控制 ──▶ 首选 OpenClash
   │
   ├── 路由器内存紧张（128–256MB），或机场主要给 Xray/通用节点、需要细粒度按设备分流 ──▶ 首选 PassWall2
   │
   ├── 路由器使用官方纯净 23.05/24.10 固件，且自己习惯写 sing-box 原生配置 ──▶ 首选 HomeProxy
   │
   └── 跑在标准 Linux 服务器 / Debian 旁路由 / Docker 网关上 ──▶ 推荐 v2rayA
```

---

## 第三步：硬件 CPU 加解密瓶颈与千兆宽带性能真相

很多玩家买了一台标称“千兆双频 Wi-Fi 6”的百元路由器刷了 OpenWrt，兴冲冲买了高端 IEPL 专线机场，结果测速却怎么也跑不过 80–120Mbps，甚至看 4K 视频还会卡顿掉线。**问题十有八九出在路由器 CPU 上！**

### 3.1 为什么路由器跑代理这么吃 CPU？

平时家里用普通光猫路由器跑满 1000Mbps 宽带，靠的是硬件 **NAT / HWNAT 转发芯片**——数据包原封不动走硬件通路，CPU 占用率甚至不到 5%。
但开启透明代理后，路由器必须把局域网所有海外数据包的 **明文 TLS/TCP 载荷拆开，用 Shadowsocks (AEAD)、VLESS 或 Trojan 算法重新加密封装** 再发往机场，这一步 **完全无法走普通硬路由的 NAT 硬件加速，必须由 CPU 软算力硬扛**！

### 3.2 常见路由器硬件平台透明代理吞吐参考

| 硬件平台类型 | 代表设备举例 | 是否具备硬件 AES 加速指令 | 透明代理实测大致上限参考 | 适用宽带与建议 |
| :--- | :--- | :--- | :--- | :--- |
| **入门级 MIPS / 老旧双核 ARM** | 红米 AC2100、K2P (MT7621)、早期单核路由 | 无硬件加密加速 | 约 **40 – 100 Mbps**（CPU 单核满载 100%） | 仅够日常网页与单台电视看 1080P/轻量 4K，千万别指望跑满千兆 |
| **中端现代四核 ARM 路由器** | 红米 AX6000 (Filogic 830)、NanoPi R2S / R4S、小米 AX3600 | 部分具备 ARMv8 Crypto 指令集 | 约 **300 – 800 Mbps**（视协议与散热而定） | 家庭 300M–500M 主力足够；R4S 可接近千兆 |
| **x86_64 低功耗软路由** | Intel N100 / N5105 / J4125 小主机 | **完整支持 AES-NI 硬件指令集** | **1000 Mbps+（轻松跑满千兆甚至 2.5G）** | 重度多设备家庭、NAS 用户及千兆宽带跑满测速的最优解 |

### 3.3 弱 CPU 路由器如何通过“挑协议”挽救一半速度？

如果你的路由器是百元级 ARM/MIPS 设备，算力吃紧，可以通过切换机场节点的底层协议显著降低 CPU 压力：
- **优先使用 Shadowsocks（搭配 IEPL 专线）或常规 VLESS**：运算开销相对较低；在部分没有 AES-NI 指令集的 ARM 路由器上，SS 使用 `chacha20-ietf-poly1305` 算法通常比 `aes-256-gcm` 更快（在有 AES-NI 的 x86 上则相反，`aes-gcm` 更快）。
- **避开高开销套娃协议**：尽量不要在弱 CPU 路由器上开着复杂的本地多层加密与并发测速；同时避免在路由器上同时开启大量无关后台插件（如广告过滤规则集过大导致正则匹配吃光 CPU）。

---

## 第四步：主路由 vs 旁路由（单臂网关）架构选择与核心网络配置

在家庭网络里部署 OpenWrt 透明代理，有“主路由直出”和“旁路由接管”两种经典拓扑：

```text
【模式 A：主路由模式】（稳定性最高，推荐给会折腾网络的新手或独立软路由家庭）
光猫（桥接） ──▶ OpenWrt 软路由（拨号 + DHCP + 透明代理） ──▶ 无线 AP（纯交换模式） ──▶ 全屋设备

【模式 B：旁路由模式】（零风险改造现有网络，光猫/硬路由拔掉网线即可恢复）
光猫 / 现有主路由（192.168.1.1，负责拨号与默认上网）
    │
    ├── 普通不需代理的设备：网关 192.168.1.1（直接走主路由）
    └── 需要代理的设备（或主路由 DHCP 统一下发）：
            网关 & DNS 指向 OpenWrt 旁路由（如 192.168.1.2） ──▶ 旁路由处理分流后回传主路由出海
```

### 4.1 旁路由必改的两个防断网网络参数

如果你选择把 OpenWrt 当作 **旁路由** 接入现有网络（比如局域网网关设为 `192.168.1.2`，主路由是 `192.168.1.1`），在配置界面 **`网络 → 接口 → LAN → 修改`** 时必须做以下两项检查，否则极易出现“能 ping 通但网页打不开”或内网环路：

1. **关闭旁路由的 DHCP 服务器**：勾选 `DHCP 服务器 → 基本设置 → 忽略此接口`，让全屋仍由主路由统一分配 IP（或者由主路由在 DHCP 高级设置里把下发的“网关”和“DNS”指向 `192.168.1.2`，确保全网只有一个 DHCP 服务器）。
2. **关闭旁路由 LAN 口的 IPv6 干扰与开启动态伪装（视架构而定）**：
   - 在 `网络 → 防火墙` 中若旁路由走单臂出入，通常需要在 LAN 区域开启 **IP 动态伪装（Masquerading）**，或关闭“SYN-flood 防御”并解决非对称路由丢包问题。
   - **测试建议**：先在自己手机的 Wi-Fi 设置里把“IP 配置”改成静态，单独把 **路由器（网关）和 DNS 填成旁路由 IP（`192.168.1.2`）** 测试全套代理正常后，再去主路由批量切换，避免一次改坏让家人全部断网。

---

## 第五步：安装与最小化可用配置实战（以 OpenClash & Nikki 为例）

### 5.1 准备机场订阅（兼容性前置核查）

在写入配置前，再次核对 [31 家机场品牌库](/brands/) 中的客户端交付模式：
- **可直接导入 OpenClash / Nikki / PassWall2 的品牌**：**光速云、星岛梦、微风网络、一翻云、唯兔云、二猫云、梯子云、可信云、速界** 等（其中光速云、星岛梦、一翻云、唯兔云等明确标注不限设备数，最适合全屋路由器多设备共享）。
- **无法导入第三方开源软路由插件的品牌**：**飞猫云、SOGO 云、隐形人、Firefly（萤火虫）、灵猫网络、无忧链接、闪跃、全球云**（这些品牌不提供通用 Clash/Xray 订阅链接，依赖官方专属客户端）。

### 5.2 OpenClash 最小化安全部署清单

1. **安装必要依赖与内核**：确保系统已安装 `bash`、`curl`、`ca-bundle`、`kmod-tun`（或 `kmod-nft-tproxy`），再安装 `luci-app-openclash`。进入 `服务 → OpenClash → 插件设置 → 版本更新`，下载或手动上传对应架构的 **Mihomo（Meta）内核** 到 `/etc/openclash/core/clash_meta`。
2. **选择运行模式**：
   - 在 `插件设置 → 模式设置` 中，选择 **「Fake-IP（增强）模式」** 搭配 **「TUN 混合模式」** 或 **「Redir-Host」**：
   - 日常家庭看视频、打网页优先用 **Fake-IP（增强）**，响应速度最快、DNS 污染免疫率最高；如果家里有极其挑剔的设备（如特定公司 VPN 客户端或老式游戏机）识别 `198.18.0.0/16` 异常，再切换为 **Redir-Host**。
3. **导入与覆写订阅**：在 `配置订阅` 填入机场 Clash 订阅链接，开启 **自动更新**（每 `24` 小时更新一次），保存并应用配置。
4. **切记开启「绕过中国大陆 IP」与勾选「仅允许常用端口流量」视需要调整**：OpenClash 默认界面内提供了“绕过中国大陆 IP”选项，**建议务必开启**，防止海量国内视频和下载请求消耗 Mihomo 宝贵的 CPU 算力。

### 5.3 Nikki（OpenWrt 24.10+）核心配置要点

1. 确认 `cat /etc/openwrt_release` 为 `24.10` 或更高版本，从 Nikki 官方 GitHub Release 下载匹配 `apk` 或 `ipk` 的主程序包与中文语言包安装。
2. 打开 LuCI 菜单 `服务 → Nikki`，进入 **「配置文件（Profiles）」** 填入机场 Clash 订阅链接并更新。
3. 在 **「基本设置」** 中：
   - 确认运行核心与 `nftables` 透明代理（TPROXY / Redirect / TUN）就绪；
   - **TCP 透明代理与 UDP 透明代理** 按需开启（如果不玩外服游戏且发现部分局域网设备异常，可按需调整 UDP 代理范围）；
   - 开启 **绕过中国大陆 IP（Bypass China IP）** 与 **自定义绕过列表**。
4. 点击启动后，可在面板直接打开内置的 **Metacubexd / Yacd** 控制台实时监控全屋连接。

---

## 第六步：电视盒子、NAS 与游戏主机（PS5/Switch）分流与绕过实战

路由器做透明代理最容易翻车的场景，不是打不开 Google，而是**“家里人看爱奇艺卡顿”“NAS 挂机下载 PT 把机场 200GB 流量一夜吸干”“Switch 联机喷射战士掉线”**。下面三招彻底解决家庭设备混杂问题：

### 6.1 绝对隔离 NAS / PT 下载机与国内电视机（局域网访问控制）

千万不要把整个 `192.168.1.0/24` 网段无脑全部扔进代理内核！即便规则写了 `GEOIP,CN,DIRECT`，P2P 下载（BT/PT）会并发建立成百上千个连向海外做种 IP 的连接，瞬间就会命中代理规则，轻则拖死路由器 CPU，重则一夜跑光机场全部流量并触发机场风控封号！

**标准隔离配置步骤（推荐给所有软路由用户）**：
1. 先在 `网络 → DHCP/DNS → 静态地址分配` 中，给家里的 **NAS、下载机、智能监控、国内电视** 绑定固定的局域网 IP（例如 `192.168.1.10` 为 NAS，`192.168.1.50` 为国内客厅电视）。
2. 进入透明代理插件的 **「访问控制（Access Control）」** 页面：
   - **OpenClash**：`插件设置 → 访问控制 → 不走代理的局域网设备（IP/MAC）`；
   - **PassWall2**：`访问控制 → 添加设备 → 代理模式选「不代理（Direct）」`；
   - **Nikki**：`访问控制 → 黑名单/绕过列表` 中填入对应 MAC 或 IP。
3. 将 `192.168.1.10`（NAS）和监控设备加入 **不走代理列表**。从此这些设备的数据包连代理内核都不会进，直接走硬件 NAT 直连满速下载！

### 6.2 电视盒子（Apple TV / Android TV）看 Netflix 4K 避坑

- **只给需要跨境追剧的盒子开代理**：Apple TV 或刷了外区系统的盒子，确保其 IP **不在绕过列表内**。
- **节点选择**：电视端追求高码率持续吞吐，在策略面板把主节点固定在 **香港专线或新加坡高带宽节点**；注意避开实测中偶发出现 YouTube `送中(CN)` 或 Disney+ 失败的节点地区（例如在 2026-08-19 实测样本中部分台湾节点出现 Disney+ 失败与送中提示，港/新/日表现更稳）。

### 6.3 PS5 / Xbox / Nintendo Switch 游戏主机联机配置

主机玩家常常面临两大需求：**下载游戏要满速（直连或走 CDN 优化）、联机匹配要 NAT A / Type 2 且低延迟**。

```yaml
# 软路由 Mihomo (OpenClash / Nikki) 针对主机与国内大流量的经典覆写规则片段示例
rules:
  # 1. 强制让主机商店大文件下载（部分国内 CDN 直连极快）按需直连，避免白烧机场流量
  - DOMAIN-SUFFIX,dl.playstation.net,DIRECT
  - DOMAIN-SUFFIX,gs2.ww.prod.dl.playstation.net,DIRECT
  - DOMAIN-SUFFIX,assets1.xboxlive.com,DIRECT
  - DOMAIN-SUFFIX,nintendo.net,Proxy # Switch Eshop 商店与联机建议走低延迟专线

  # 2. 强制拦截常见 BT/PT 协议特征端口或避免 P2P 流量误走节点（配合访问控制更稳）
  - DST-PORT,6881-6889,DIRECT
```

- **开启 UDP 透明代理**：主机联机（如马里奥赛车、喷射战士、APEX）全走 UDP，务必在插件中开启 **UDP 转发**，并在机场后台或测速图里确认所选节点支持 **`FullCone` UDP**（如 2026-08-19 实测中光速云 9Gbps 样本多数节点为 FullCone）。
- **为什么游戏机不推荐全局 Fake-IP？** 部分联机游戏反作弊或主机网络诊断对 `198.18.0.0/16` 虚拟 IP 不兼容，如果遇到 Switch 无法进房间或报错 DNS 异常，可在插件里把主机单独设为 **Redir-Host** 模式或通过插件的 `fake-ip-filter` 把 `*.nintendo.net`、`*.playstation.net`、`*.xboxlive.com` 加入过滤列表，使其始终获得真实 IP 解析。

---

## 第七步：OpenWrt 软路由故障排查流程图与急救措施

路由器一旦配错，影响的是全家所有终端。记住一条急救底线：**永远保留通过有线网口直接登录 `192.168.1.1` 管理页面的能力**，遇到全屋断网先在插件界面点击 **「停止运行」**，恢复正常后再看日志排错。

```text
OpenWrt 启动代理插件后全屋无法上网 / 部分设备异常
   │
   ├── 1. 全屋连百度、微信都打不开（DNS 崩溃或防火墙冲突）
   │        ├── 检查是否同时开启了两个透明代理插件（如 OpenClash + PassWall2 并存） ──▶ 必须卸载或彻底禁用其中一个！
   │        ├── SSH 执行 `logread | tail -n 50` 看 dnsmasq 是否启动失败 ──▶ 清理冲突的端口占用（53 / 7874 / 5353）
   │        └── 旁路由模式检查网关与 DHCP ──▶ 确认旁路由已关闭 DHCP 且 LAN 网关指向正确的主路由 IP
   │
   ├── 2. 国内网站秒开，但全屋所有设备海外网站打不开
   │        ├── 插件内「节点测速」全部超时 ──▶ 检查路由器系统时间！执行 `date`（OpenWrt 无电池常在断电后时间回到出厂年份，必须开启 NTP 同步）
   │        ├── 内核未启动成功 ──▶ 检查 `/overlay` 剩余空间是否已满 100%，以及下载的 Mihomo/Xray 核心架构是否与 `uname -m` 一致
   │        └── 机场套餐流量耗尽或订阅过期 ──▶ 更新订阅并检查节点状态
   │
   └── 3. 测速很慢或偶发断流重启
            ├── SSH 执行 `top` 查看 CPU `idle` 与 `sirq` ──▶ 若 Mihomo/Xray 占满单核 100%，说明遇到硬件加解密瓶颈
            └── 执行 `free -m` ──▶ 若可用内存接近 0，停用冗余大规则集（如 GeoSite 全量库）或改用更轻量的 PassWall2 / HomeProxy
```

### 7.1 路由器断电重启后“时间归零”导致的集体 TLS 失败（高频隐蔽坑）

大多数百元 ARM 软路由与家用硬路由**主板上没有 CMOS 纽扣电池**！每次家里停电或拔插头重启后，路由器系统时间会瞬间重置回固件编译日期（例如 `2025-01-01`），结果就是**重启后全屋所有 VLESS / Trojan 节点因为 TLS 证书时间校验失败而全部无法握手，且连接外网的 NTP 又因为代理没连上而死锁**！

**预防做法（一劳永逸）**：
1. 在 OpenWrt **`系统 → 系统 → 时间同步`** 中勾选启用 NTP 客户端，并确保上方的 NTP 服务器池全部填入**国内直连稳定的阿里云或国家授时中心服务器**（如 `ntp.aliyun.com`、`cn.ntp.org.cn`、`ntp.tencent.com`）。
2. 在透明代理插件的直连规则或 `fake-ip-filter` 中确保上述 NTP 域名全部强制 **`DIRECT` 直连**，保证路由器每次开机在代理启动前就能在 2 秒内完成对时！

---

## 总结检查清单（Checklist）

在让 OpenWrt 软路由正式 7×24 小时接管全家网络前，逐项核对以下 7 项：

- [ ] 已通过 SSH 核清固件版本（24.10+ 才装 Nikki）、CPU 架构、`opkg/apk` 格式、`/overlay` 剩余空间及内存容量。
- [ ] 全路由器**仅安装并运行唯一一个**透明代理插件（绝不让 OpenClash 和 PassWall2 同时启用）。
- [ ] 已确认所选机场支持第三方订阅（光速云、星岛梦、微风网络、一翻云、唯兔云等），且适配家庭多设备并发。
- [ ] 旁路由模式下已关闭旁路由自带 DHCP 服务，避免局域网出现双 DHCP 抢地址。
- [ ] 已在「访问控制」中把 NAS、PT 下载机、智能监控和不需要代理的设备加入**不走代理（绕过）**列表。
- [ ] 已在系统时间设置里配置国内 NTP 服务器（如 `ntp.aliyun.com`）并放行直连，防止断电重启后时间归零引起全部节点失效。
- [ ] 已为电视、游戏主机（PS5/Switch）及 AI 终端做好节点地区分流（如港新看 4K、新日美走 AI、FullCone 节点给游戏）。
