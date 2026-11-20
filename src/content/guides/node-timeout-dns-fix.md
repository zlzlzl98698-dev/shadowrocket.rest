---
title: "Clash 故障排查：节点全部 Timeout 超时、系统时间偏差与关掉代理后断网修复"
description: "全平台代理网络急救手册：排查并解决所有节点全部 Timeout（系统时间偏差超 60 秒的 Win/Mac/Linux NTP 同步命令）、退出 Clash 后浏览器彻底断网（127.0.0.1:7890/7897 代理残留注册表、PowerShell 与 networksetup 清理）、多 VPN/游戏加速器 TUN 冲突、Fake-IP 198.18.0.0/16 与内网/NAS 冲突及 SwitchyOmega 浏览器插件排查。"
slug: "node-timeout-dns-fix"
pubDate: "2026-11-10"
updatedDate: "2026-11-20"
category: "故障排查"
pillar: "clash"
topicSlug: "clash-troubleshooting"
clusterId: "clash-trouble-timeout"
tags: ["Clash故障排查", "节点超时", "关闭Clash断网", "DNS配置", "Timeout"]
cover: "/images/covers/troubleshooting-ops.svg"
coverAlt: "Clash 节点超时与断网修复指南封面"
author: "小火箭技术组"
excerpt: "节点全部显示 Timeout 不一定是机场跑路——系统时钟误差超过 60 秒就会直接导致 VLESS/Trojan/VMess TLS 握手全军覆没；而关闭 Clash 后电脑彻底断网，99% 是异常退出残留了 127.0.0.1:7890 或 7897 系统代理。掌握本文的时间同步、PowerShell/networksetup 代理清理、TUN 冲突与 Fake-IP 198.18.0.0/16 排错流程，绝大多数故障都能在 2 分钟内自愈。"
brandSlugs: ["guangsuyun", "muguang", "weifeng"]
platforms: ["Windows", "macOS", "iOS", "Android"]
difficulty: "排查"
featured: false
primaryKeyword: "Clash 故障排查"
secondaryKeywords: ["节点全部超时", "关闭 Clash 无法上网", "Clash 系统时间同步", "Fake-IP"]
searchIntent: "Informational"
verifiedDate: "2026-11-19"
reviewStatus: "verified"
relatedSlugs: ["subscription-failed-troubleshooting", "clash-verge-rev-beginner-guide", "how-to-read-miaoko-speedtest"]
sources:
  - "第三方代理客户端.txt"
faq:
  - question: "电脑没开 Clash，但打开浏览器一直提示“代理服务器没有响应”或彻底打不开任何国内网站怎么办？"
    answer: "这是因为上次软件崩溃、强制关机或重启，在操作系统中残留了 127.0.0.1:7897（或 7890）的全局 HTTP 代理设置。最快修复方法是打开 Windows「设置 → 网络和 Internet → 代理」，把「使用代理服务器」拨至关闭；或重新打开一次 Clash Verge Rev 再手动关闭「系统代理」并正常退出；高级用户也可用 PowerShell 清理注册表和 netsh winhttp reset proxy，macOS 可用 networksetup 命令关闭代理。"
  - question: "电脑时间只是慢了或快了 2 分钟，真的会让所有机场节点集体超时吗？"
    answer: "是的，非常普遍。现代代理协议（VLESS、Trojan、VMess 以及底层 TLS 1.3 握手与时间戳防重放校验）对本地设备与服务器之间的时间差极度敏感，通常允许误差窗口在 60–90 秒以内。一旦电脑主板电池老化、双系统切换或路由器断电重置导致系统时间偏差超过 1–2 分钟，服务端会直接静默丢弃握手包，表现为所有节点全部红色 Timeout。在系统设置里点一次「立即同步」即可瞬间恢复。"
  - question: "为什么我开了游戏加速器（如 UU/雷神）或公司 VPN 后，Clash Verge Rev 就上不了网了？"
    answer: "游戏加速器、公司远程 VPN（如 Cisco AnyConnect、EasyConnect、WireGuard）以及 Clash 的 TUN 模式，三者都需要往系统里写入虚拟网卡和默认路由规则（0.0.0.0/1）并劫持 DNS（53 端口）。同时开启两个以上同类工具必然发生网卡和路由表抢占，导致全部断流。请同一时间只保留一个代理工具运行，不要把 TUN 模式与游戏加速器或公司 VPN 并开。"
  - question: "开启 TUN 模式后，为什么外网很流畅，公司的内网 OA、NAS 或打印机却连不上了？"
    answer: "这多半是 Mihomo 内核默认的 Fake-IP 模式（返回 198.18.0.0/16 虚拟地址池）或 TUN 路由接管与内网设备不兼容所致。解决方法有二：一是在配置里把内网域名、*.lan、*.local 及公司域名加入 fake-ip-filter，并确认 192.168.0.0/16、10.0.0.0/8 等内网网段走 DIRECT；二是直接在设置中把 DNS 增强模式从 Fake-IP 切换为 Redir-Host，随后清理本地 DNS 缓存即可。"
  - question: "为什么我已经关掉 Clash 或把 DNS 切回 Redir-Host，浏览器访问某些网站还是解析出 198.18.x.x 打不开？"
    answer: "因为操作系统和浏览器（Chrome/Edge）内部缓存了之前 Fake-IP 阶段返回的 198.18.x.x 记录，且在没有代理内核接管时，系统根本无法路由这个虚拟网段。在 Windows 下打开终端执行 ipconfig /flushdns，在 macOS 执行 sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder，并重启一次浏览器即可清除旧缓存。"
  - question: "Chrome / Edge 浏览器装了 SwitchyOmega（或 ZeroOmega）插件后总是连接失败怎么处理？"
    answer: "常见原因是老版本 SwitchyOmega 情景模式里写死了早期的 127.0.0.1:7890 端口，而现在用的 Clash Verge Rev 默认混合端口是 7897；或者你同时打开了软件的「系统代理」和 SwitchyOmega 的自定义代理导致端口打架。如果不做按域名单独切端口的特殊需求，强烈建议把 SwitchyOmega 切换为「[系统代理]」或直接停用该扩展，把分流全部交给 Clash 的 Rule 模式。"
  - question: "为什么微信和国内网页能打开，但浏览器开了系统代理后特定 HTTPS 网站一直卡在安全连接？"
    answer: "先检查浏览器自身是否开启了「使用安全 DNS（DoH）」（例如 Chrome/Edge 设置 → 隐私与安全 → 安全 → 使用安全 DNS），或者本地宽带强行分配了无法出境的 IPv6 地址。在浏览器关闭自定义 DoH（改回使用当前系统默认 DNS），并在代理客户端内关闭 IPv6，通常能立刻消除加载卡顿。"
---

## 核心结论：先区分“软件没通”还是“电脑断网”，2 分钟内定位根因

日常使用 **Clash Verge Rev**、**FlClash**、**v2rayN** 或 **Shadowrocket** 时，最令人慌张的莫过于两种极端情况：**一种是所有几十个节点突然集体红字 `Timeout`（以为机场跑路了）**；**另一种是刚关掉代理软件，连百度、微信和局域网路由器都打不开了（以为电脑网卡坏了）**。

其实，95% 的这类连接事故根本不需要重装系统，也无需折腾软件卸载重装。下表先帮你用 10 秒完成第一层故障分流：

| 你遇到的症状 | 第一嫌疑根因 | 最快自愈动作 | 对应跳转章节 |
| :--- | :--- | :--- | :--- |
| **所有节点测速全部红色 `Timeout` / `Error`** | 系统时间误差 `>60 秒`、订阅域名过期未更新、套餐耗尽，或双 VPN 抢占 | 先校准系统时间（立即同步 NTP）→ 更新一次订阅 → 退出其他加速器 | [第一、三章](#第一章节点全部-timeout-的四大真相与系统时间校准) |
| **关闭软件后，浏览器打不开任何网站（提示代理服务器无响应）** | 异常关机或崩溃在系统残留了 `127.0.0.1:7890` 或 `7897` HTTP 代理 | 重新打开客户端关一次系统代理，或按系统清理命令清除代理设置 | [第二章](#第二章彻底清除残留的-12700178907897-系统代理解决关闭后断网) |
| **开了代理外网飞快，但公司 OA / NAS / 内网打不开** | `Fake-IP (198.18.0.0/16)` 虚拟段冲突，或公司域名没加进跳过列表 | 加 `fake-ip-filter` / 切 `Redir-Host` 模式，并清理系统 DNS 缓存 | [第四章](#第四章fake-ip-198180016-与公司内网nas企业-vpn-冲突全解) |
| **只开 Chrome 报错、其他软件正常，或部分网页死活打不开** | `SwitchyOmega` 端口写死 `7890` 冲突，或浏览器自带安全 DNS 绕过分流 | 切回扩展「系统代理」或停用扩展，关掉浏览器自带 DoH 并禁 IPv6 | [第五章](#第五章浏览器-switchyomega-插件安全-dns-与-ipv6-黑洞排查) |

---

## 第一章：节点全部 `Timeout` 的四大真相与系统时间校准

当你点击闪电测速，看到港/台/新/日/美几十个节点全军覆没、无一幸免全部显示 `Timeout` 时，先按下面 4 步顺查：

### 1.1 隐形头号杀手：操作系统时钟偏差超过 60 秒

现代代理协议（**VLESS、Trojan、VMess** 以及底层 **TLS 1.3** 加密通道）都在握手包中内嵌了精确的 UNIX 时间戳，用来防止重放攻击。**绝大多数机场服务端允许的本地与服务器时间误差只有 60–90 秒**！

很多用户遇到全部节点超时，折腾半天重装软件换节点都没用，最后才发现是以下常见原因让电脑慢了几分钟：
- 笔记本电脑长期断电导致主板 CMOS 时钟漂移；
- Windows 与 macOS / Linux 双系统切换造成的 UTC 时区差 8 小时问题；
- 虚拟机快照恢复后时间停留在几天前；
- 无纽扣电池的 OpenWrt 软路由断电重启后时间归零。

#### 各操作系统精确校准命令与菜单路径

**1. Windows 10 / 11（图形路径 + PowerShell 强行校时）**
- **图形路径**：`设置 → 时间和语言 → 日期和时间` → 确保开启 **「自动设置时间」** 与 **「自动设置时区」** → 点击下方 **「立即同步」**。
- **PowerShell 管理员命令行（当界面点“立即同步”转圈失败时极有效）**：

```powershell
# 启动 Windows 时间服务并切换为阿里云直连 NTP，随后强制立即同步
net start w32time
w32tm /config /manualpeerlist:"ntp.aliyun.com" /syncfromflags:manual /reliable:yes /update
w32tm /resync /force
w32tm /query /status
```

**2. macOS（图形路径 + 终端命令）**
- **图形路径**：`系统设置 → 通用 → 日期与时间` → 打开 **「自动设定日期与时间」** 与 **「自动设定时区」**。
- **终端命令行强制校准**：

```bash
# 使用国内稳定授时服务器瞬间校对（需输入 Mac 开机密码）
sudo sntp -sS ntp.aliyun.com
```

**3. Linux（Ubuntu / Debian / Fedora）**

```bash
# 查看时间与 NTP 同步状态
timedatectl status
# 启用 systemd-timesyncd 自动对时
sudo timedatectl set-ntp true
# 若使用 chrony，可手动触发步进校时
sudo chronyc makestep 2>/dev/null || true
```

**4. iOS / Android**：分别前往 `设置 → 通用 → 日期与时间`（iOS）或 `设置 → 系统/更多设置 → 日期和时间`（Android），务必确认 **自动设置** 开关处于开启状态。

### 1.2 订阅长期未更新导致入口域名/端口全面失效

如果电脑时间分秒不差，第二件事就是去 Clash Verge Rev 的「订阅（Profiles）」或小火箭首页**刷新一次订阅**。机场为了规避周期性阻断，每隔数周或数月会更换中转入口 IP 或端口。如果你把 `自动更新间隔` 设为了关闭（`0`），本地配置文件里存的还是三个月前的旧端口，自然全部显示超时。

### 1.3 机场套餐到期或当月流量已清零

很多机场面板在流量耗尽或套餐到期后，**仍然能让你正常更新下发订阅（或者延迟下发失效状态）**，但中转网关已经自动切断你的认证凭证，表现就是能看见节点名字却一个也连不通。登录官网后台确认账户有效性与剩余流量。

### 1.4 正在运行旧版核心导致协议不兼容

如果你的机场最近全面升级了 **VLESS-Reality** 或 **Hysteria 2**（如一翻云、光速云等新锐/升级线路），而你还在用早已停更的 **Clash for Windows** 或好几年没更新的旧版手机客户端，就会出现无法完成握手。务必升级到基于 **Mihomo / sing-box** 的现代客户端或最新版 App。

---

## 第二章：彻底清除残留的 `127.0.0.1:7890` / `7897` 系统代理（解决关闭后断网）

**症状描述**：原本开着 Clash 上网一切正常，结果软件闪退、任务管理器强杀进程，或者笔记本直接合盖/长按电源强制关机重启后，**不开 Clash 就彻底上不了网——Chrome/Edge 提示 `ERR_PROXY_CONNECTION_FAILED`（“代理服务器没有响应”），微信也转圈断连；但奇怪的是只要一重新打开 Clash 就又能上网了！**

**原理解析**：Clash / Clash Verge Rev / v2rayN 在打开「系统代理」时，会把操作系统的全局 HTTP/HTTPS 代理注册为 `127.0.0.1:7897`（老版为 `7890`，v2rayN 默认为 `10809`）。正常右键「退出」软件时，客户端会自动把系统代理清零还原；但**非正常退出**来不及清理，操作系统就傻傻地一直把所有网页请求发往已经关闭的 `7897` 端口！

### 2.1 最懒人急救法（3 秒恢复）

重新双击打开你的代理客户端（如 Clash Verge Rev）→ 进入「设置」→ 找到「系统代理」开关，**先点开再手动点关**（或者在托盘图标右键选择正式「退出」）→ 即可瞬间恢复直连网络。

### 2.2 Windows 10 / 11 手动清理（图形界面 + 注册表 + PowerShell）

如果软件已经卸载或者根本打不开了，按以下任意一种方式强行重置：

#### 方式 A：Windows 系统设置图形开关
1. 按键盘 `Win + I` 打开系统 **「设置」**。
2. 左侧进入 **「网络和 Internet」** → 点击右侧 **「代理（Proxy）」**。
3. 找到 **「手动设置代理 → 使用代理服务器」** 这一行，点击 **「编辑」**，把开关拨至 **「关」** 并点击保存。
4. 同时确认上方的「自动设置代理 → 使用设置脚本（PAC）」也处于关闭状态。

#### 方式 B：PowerShell + 注册表 + WinHTTP 一键彻底重置（最彻底）
有时某些软件（如终端、UWP 商店、系统更新、Office）读取的是 Windows 底层 `WinHTTP` 代理或残留的注册表键值。用**管理员身份打开 PowerShell**，直接执行以下四行命令：

```powershell
# 1. 关闭当前用户 Internet Settings 注册表里的 HTTP 系统代理开关并清空代理服务器地址
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 0
Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyServer -ErrorAction SilentlyContinue
Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name AutoConfigURL -ErrorAction SilentlyContinue

# 2. 重置系统底层 WinHTTP 代理（修复系统更新、PowerShell、商店断网）
netsh winhttp reset proxy
```

执行完后再检查一次 `netsh winhttp show proxy`，输出 `直接访问(没有代理服务器)` 即彻底干净。

### 2.3 macOS 手动清理（系统设置 + `networksetup` 终端命令）

#### 方式 A：图形路径
打开苹果 **`系统设置 → 网络`** → 点击当前正在用的蓝色已连接网络（如 `Wi-Fi` 或 `以太网`）→ 点击右下角 **「详细信息...」** → 左侧切到 **「代理（Proxies）」** → 把里面的 **「网页代理 (HTTP)」「安全网页代理 (HTTPS)」「SOCKS 代理」「自动代理配置」** 全部取消勾选，点「好」保存。

#### 方式 B：macOS 终端命令行一键清理
如果你在开发工作流里想一键清除残留（假设你的网络接口名字叫 `Wi-Fi`，可通过 `networksetup -listallnetworkservices` 查看所有网卡名）：

```bash
# 关闭 Wi-Fi 网卡残留的 HTTP / HTTPS / SOCKS / PAC 代理
networksetup -setwebproxystate "Wi-Fi" off
networksetup -setsecurewebproxystate "Wi-Fi" off
networksetup -setsocksfirewallproxystate "Wi-Fi" off
networksetup -setautoproxystate "Wi-Fi" off
```

---

## 第三章：多 VPN、游戏加速器与 TUN 虚拟网卡冲突排查

“**我既想用 Clash 查资料，又想开 UU/雷神加速器打游戏，或者公司强制要求连 EasyConnect / Cisco AnyConnect 办公 VPN，怎么一同时开就全断网？**”

### 3.1 为什么它们天生互斥？

因为 **Clash TUN 模式**、**游戏加速器（进程/路由模式）** 与 **企业 VPN** 干的是同一件底层脏活：
1. 往操作系统安装一块虚拟网卡（WinTUN / TAP / utun）；
2. 强行改写操作系统的路由表（接管 `0.0.0.0/1` 与 `128.0.0.0/1` 全局路由）；
3. 劫持 UDP `53` 端口把 DNS 解析收归己有。

当两款需要 TUN 接管的软件同时运行，数据包会在两张虚拟网卡之间陷入**死循环路由或被其中一方的 DNS 丢弃**，最终结果就是两边同时彻底断网，甚至退出后需要重启电脑网卡才能恢复！

### 3.2 正确共存策略与实操技巧

| 叠加场景 | 错误做法 | 推荐正确方案 |
| :--- | :--- | :--- |
| **Clash + 游戏加速器（UU / 雷神 / 奇游）** | 同时开启 Clash TUN 模式和游戏加速器路由模式 | **打游戏时关闭 Clash（尤其必关 TUN 模式）**；若只想一边挂网页文字查攻略一边加速游戏，可在加速器选“仅针对游戏进程加速”模式，且 Clash **只开系统代理（不开 TUN）**，两者互不抢网卡 |
| **Clash + 公司企业 VPN（AnyConnect / FortiClient / WireGuard / Tailscale）** | 全局代理和公司 VPN 一块开，结果进不去内网 | **先关 Clash TUN 模式**；若需同时查资料和连内网，将 Clash 维持在仅「系统代理」，并把公司内网域名/IP 段加入系统代理绕过列表（Bypass），或者在必须走 VPN 全路由时暂退 Clash |
| **电脑里同时装了 Clash Verge Rev、FlClash、v2rayN** | 同时打开两个客户端监听同一个端口或双开 TUN | **同一时刻只运行唯一一个代理客户端**，切勿多开 |

---

## 第四章：`Fake-IP (198.18.0.0/16)` 与公司内网、NAS、企业 VPN 冲突全解

很多开发者与办公族遇到过这个经典怪现象：**浏览器上 Google 和 YouTube 飞快，但打开本地 NAS 管理后台、公司内网域名（如 `oa.corp.local`）、某些网银安全控件或虚拟机时，画面一直转圈，甚至 ping 域名返回了一个陌生的 `198.18.0.x` IP 地址！**

### 4.1 什么是 `198.18.0.0/16`？为什么会引发冲突？

Mihomo（Clash Meta）开启 TUN 模式时，默认采用 **`Fake-IP`** 增强模式。为了省去本地等待 DNS 解析的时间并杜绝污染，它会在本机建立一个 `198.18.0.0/16` 保留网段虚拟 IP 池：无论应用查询什么域名，Clash 先瞬间吐回一个假的 `198.18.0.15` 给应用，然后在后台记住这个映射并由远端服务器解析。

但在下面三种场景中，Fake-IP 会直接水土不服：
1. **公司内网 SSO / OA / GitLab**：内部系统经常校验客户端请求的目标真实内网 IP，或者在通过企业 VPN 后由内网 DNS 解析，遇到 `198.18.x.x` 会直接报错拒绝。
2. **局域网服务发现 / NAS / 智能家居**：某些应用拿到 `198.18.x.x` 后，内部直连逻辑失效。
3. **部分游戏客户端 / 反作弊器**：发现所有域名都被解析成 `198.18.x.x` 会判定网络异常拒绝进入房间。

### 4.2 三步彻底修复 Fake-IP 冲突（两种方案任选）

#### 方案一（精细推荐）：保留 Fake-IP 高性能，把冲突域名加进 `fake-ip-filter`
在 Clash Verge Rev 的「订阅 → 全局扩展配置（YAML Merge）」或插件 `dns` 配置段中，把公司内网域名后缀、NTP 时间同步域名及局域网域名全部加入 `fake-ip-filter`，让这些域名跳过虚拟 IP、始终拿真实 DNS 返回值：

```yaml
# Clash Verge Rev / Mihomo 全局扩展配置示例：补充 fake-ip-filter 跳过内网与关键服务
dns:
  fake-ip-filter:
    - "*.lan"
    - "*.local"
    - "*.internal"
    - "*.corp"          # 替换为你的公司内网域名后缀，例如 *.company.cn
    - "localhost.ptlogin2.qq.com"
    - "+.stun.*.*"
    - "+.stun.*.*.*"
    - "time.*.com"
    - "time.*.gov"
    - "time.*.apple.com"
    - "ntp.*.com"
    - "*.ntp.org.cn"
    - "+.pool.ntp.org"
    - "msftconnecttest.com"
    - "msftncsi.com"
```

#### 方案二（一步到位）：切回 `Redir-Host` 模式 + 清空残留 DNS 缓存
如果你不熟悉编辑 YAML，可以直接在客户端的 DNS 设置中，将 `enhanced-mode` 从 **`fake-ip`** 切换为 **`redir-host`**（在需要高内网兼容性的办公环境尤为推荐，详细原理见 [Clash Meta / Mihomo DNS 科普](/articles/clash-meta-mihomo-dns-guide/)）。

**极易遗漏的收尾动作——清理操作系统残留的 `198.18.x.x` DNS 缓存！**
切完模式或关掉 TUN 后，系统里还缓存着刚才没过期的 `198.18.0.x` 记录，必须手动刷新一次 DNS 缓存：

- **Windows（CMD / PowerShell）**：
  ```powershell
  ipconfig /flushdns
  ```
- **macOS（Terminal）**：
  ```bash
  sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
  ```
- **Linux（systemd-resolved）**：
  ```bash
  sudo resolvectl flush-caches
  ```

---

## 第五章：浏览器 `SwitchyOmega` 插件、安全 DNS 与 IPv6 黑洞排查

有些时候系统里明明一切正常，终端 `curl` 也通了，偏偏只有 Chrome 或 Edge 浏览器一直报错或加载不出图片，这往往是浏览器自身的三个“隐形设置”在搞鬼。

### 5.1 `SwitchyOmega` / `ZeroOmega` 端口打架与过期配置

几年前的教程都会教人在 Chrome 装 `Proxy SwitchyOmega` 并新建一个情景模式指向 `127.0.0.1:7890`。但在 2026 年的环境下，这恰恰是最容易造成断网的累赘：
1. **端口号错配**：**Clash Verge Rev 默认混合端口是 `7897`**（不再是老版的 `7890`），v2rayN 默认端口是 `10808 / 10809`。SwitchyOmega 如果还死盯着 `7890`，浏览器当然直接提示 `ERR_PROXY_CONNECTION_FAILED`。
2. **建议做法**：Clash Verge Rev、FlClash 和 Shadowrocket 的 `Rule` 规则集已经极度成熟，**日常浏览完全不需要再靠浏览器插件做二次分流**！请将 SwitchyOmega 切换到 **`[系统代理]`**，或者直接关闭/卸载该扩展，由客户端统一接管。如果你确实需要仅让某一个 Chrome 独立用户配置走代理而其他浏览器完全直连，才需要在 SwitchyOmega 中新建情景模式，协议选 `HTTP`（或 `SOCKS5`）、服务器 `127.0.0.1`、端口精确核对当前客户端的 `Mixed Port`（如 `7897`）。

### 5.2 关闭浏览器自带的「安全 DNS（DoH）」

Chrome 和 Edge 浏览器在 **`设置 → 隐私与安全 → 安全 → 高级`** 中有一个默认或用户误开的开关：**「使用安全 DNS」**（DoH）。
- 当浏览器绕过操作系统，自己拿着加密 HTTPS 请求去查公共 DNS（如 Cloudflare `1.1.1.1` 或 Google `8.8.8.8`）时，在系统代理模式下可能导致 Clash 拿不到真实域名或者 DNS 解析卡死在被屏蔽的 DoH 服务器上！
- **建议**：在浏览器内将「使用安全 DNS」设为 **「使用当前服务提供商」** 或直接关闭，让 DNS 解析统一下沉给代理客户端内部处理。

### 5.3 关闭本地和代理中的 IPv6 解决“网页半天转圈”

如果你发现某些网站（如 Google 搜索、GitHub 或 YouTube 缩略图）文字瞬间加载出来，但总要等 10–15 秒才开始显示图片，检查是否遇到了 **IPv6 黑洞**：本地宽带分配了 IPv6，但所选机场节点出口对 IPv6 转发支持不完整，导致浏览器死等 IPv6 连接超时后才回落到 IPv4。
- **在 Clash Verge Rev 中**：进入 `设置 → Clash 设置`，关闭 **`IPv6`** 开关。
- **在 Shadowrocket 中**：配置编辑页确认 `ipv6 = false`。

---

## 第六章：全流程终极排错决策树（保存收藏版）

下一次无论电脑还是手机出现连接异常，不要慌乱卸载重装，严格按照下面这棵决策树从上往下查一遍，绝大多数故障 2 分钟内必出结果：

```text
代理连接异常 / 无法上网诊断树
   │
   ├── 【症状 A：开着没问题，关掉 Clash 后国内网也彻底断了】
   │        └── 99% 是异常退出残留系统代理 ──▶ 重开一次 Clash 手动关闭系统代理，或执行第二章 PowerShell / networksetup 清理
   │
   ├── 【症状 B：全节点测速全部红色 Timeout】
   │        ├── 1. 先查系统时间（误差 > 60秒必死） ──▶ 立即强制同步 NTP 时间
   │        ├── 2. 再刷一次订阅 & 查官网套餐余量 ──▶ 拉取新入口 IP，确认流量未耗尽
   │        ├── 3. 检查是否双开加速器/公司 VPN ──▶ 全部关闭只留一个代理，尤其关掉抢网卡的 TUN
   │        └── 4. 核对客户端版本 ──▶ 老版 Clash 不认 VLESS-Reality / HY2，升级 Clash Verge Rev / 新版小火箭
   │
   ├── 【症状 C：节点能测出绿色延迟，但网页就是打不开】
   │        ├── 1. 开了「系统代理」但用的是终端 / 开发工具 ──▶ 安装服务模式并开启「TUN 模式」
   │        ├── 2. 查浏览器扩展 SwitchyOmega ──▶ 切回「系统代理」或核对端口是否已从 7890 变为 7897
   │        ├── 3. 关掉浏览器内置安全 DNS（DoH）与客户端 IPv6 ──▶ 排除 DNS/IPv6 黑洞等待
   │        └── 4. 切换节点地区 ──▶ 避开个别假通节点或被目标站（如 ChatGPT/Gemini）拉黑的地区（改用 SG/JP/US）
   │
   └── 【症状 D：外网正常，但公司内网 / NAS / 国内网速极慢】
            ├── 1. 检查运行模式是否误点成了「Global 全局」 ──▶ 立刻切回「Rule 规则」
            └── 2. 内网 OA / NAS 打不开或出现 198.18.x.x ──▶ 补全 fake-ip-filter 或切 Redir-Host，再执行 ipconfig /flushdns
```

---

## 总结检查清单（Checklist）

建议把这 6 条日常防踩坑习惯养成肌肉记忆，能避开 90% 的代理故障：

- [ ] 保持 Windows / macOS / 路由器开启**自动 NTP 时间同步**（路由器断电后重点核查时间）。
- [ ] 退出电脑桌面客户端前，习惯先点托盘菜单**正常退出**，而不是在任务管理器强杀或直接按主机电源键强制关机。
- [ ] 需要使用 `git` / `curl` / `Claude Code` 等命令行时，用 **TUN 模式**（记得先装 Service Mode）；打国内游戏开加速器或连公司 VPN 时，**先关掉 TUN 模式**。
- [ ] 遇到浏览器 `ERR_PROXY_CONNECTION_FAILED`，立刻去系统代理设置关闭残余的 `127.0.0.1:7897`（或 `7890`），并检查浏览器 SwitchyOmega 是否冲突。
- [ ] 遇到公司内网或 NAS 失联，将内网域加入 `fake-ip-filter` 或切为 `Redir-Host` 模式，并随手刷新一次系统 DNS 缓存。
- [ ] 遇到节点突然全部报错，先结合 [订阅失败排查手册](/guides/subscription-failed-troubleshooting/) 更新最新配置，别盲目重装系统。

---

## 第七章：三行命令行测试法——彻底分清“本地断网”“DNS 故障”还是“节点失效”

面对复杂的网络故障，盲目猜测“是不是电脑坏了”或者“是不是机场跑路了”最浪费时间。只要打开 Windows PowerShell 或 macOS/Linux 终端，依次敲入下面三组极简测试命令，30 秒内就能拿出铁证定位故障到底卡在网络链路的哪一截：

### 7.1 第一测：排查本地物理网络与国内直连是否健康

```bash
# 直接向国内公共 IP 发包，跳过域名解析和所有 HTTP 代理端口
ping -n 4 223.5.5.5        # Windows 用法
# ping -c 4 223.5.5.5      # macOS / Linux 用法
```

- **如果这里都显示 `请求超时` 或 `100% 丢包`**：说明问题根本不在 Clash！请检查网线、光猫拨号、Wi-Fi 密码，或者看看是不是开了“阻止无 VPN 连接”的系统级防火墙开关，先让本地裸网恢复通信。
- **如果能稳定 `ping` 通且延迟在 `10–40ms`**：说明本地宽带完全正常。接着跑第二测。

### 7.2 第二测：排查是不是操作系统 DNS 或 `198.18.x.x` 缓存污染

```bash
# 查看常用域名和海外域名在本机被解析成了什么 IP
nslookup www.baidu.com
nslookup openai.com
```

- **正常（未开 TUN/Fake-IP 时）**：`www.baidu.com` 应返回真实的国内阿里云/百度机房 IP；如果你在**已经彻底关闭 Clash** 的情况下，发现 `nslookup` 依然返回 `198.18.0.x` 网段，或者返回 `127.0.0.1` / 超时，说明本地 DNS 缓存还没清干净，或者上一轮残留的第三方虚拟网卡还抢占着网卡 DNS 设置（必须去网卡 IPv4 属性里把 DNS 改回“自动获得 DNS 服务器地址”，并执行 `ipconfig /flushdns`）。

### 7.3 第三测：绕过系统代理与浏览器，直连验证 Clash 核心通道

```bash
# 强制命令走 Clash Verge Rev 默认本地监听端口 7897 请求 Google 204 探测点
curl -x http://127.0.0.1:7897 -I --connect-timeout 8 http://www.gstatic.com/generate_204
```

- **如果返回 `HTTP/1.1 204 No Content`**：**铁证如山！说明你的机场节点、Clash 核心、代理隧道全部 100% 正常！** 此时如果浏览器还是打不开网页，问题 100% 出在“系统代理开关没打开”、“浏览器装了冲突的 SwitchyOmega 插件”或者“浏览器自己开了安全 DNS / IPv6 黑洞”，只查第五章即可。
- **如果这里报 `Connection refused`**：说明 Clash Verge Rev 核心压根没启动起来（或者端口号改成了 `7890` 等其他数值），去软件设置页确认 Mixed Port 并重启核心。
- **如果这里卡住 8 秒报 `Operation timed out` 或 `TLS handshake error`**：说明问题出在节点链路或本地时间校验，回头对照第一章立即校准系统时间并切换其他地区节点。

### 7.4 企业内网办公电脑的隐藏坑：HTTPS 审计根证书冲突

补充一条仅发生在**公司配发办公电脑**上的特殊故障：部分企业在内网安装了网络行为监控或零信任安全客户端（例如深信服、奇安信等），会在终端强制下发企业自签 HTTPS 根证书进行流量审计。当这些安全软件和代理客户端同时工作时，极易引发 TLS 握手阻断或终端工具报错证书不受信任。遇到这类公司受控设备，建议**严守企业网络安全规范，切勿私自破解或绕过公司安全边界**，个人跨境学习与 AI 需求应使用私人设备及个人宽带完成。
