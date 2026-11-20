---
title: "Clash Verge Rev 下载、订阅导入、TUN 模式与分流规则完整入门教程（Win/Mac/Linux）"
description: "手把手教你从官方 GitHub 安全下载 Clash Verge Rev，区分 Windows/macOS/Linux 架构版本，导入机场订阅并开启规则分流、TUN 虚拟网卡模式与 AI 专属分流扩展配置。"
slug: "clash-verge-rev-beginner-guide"
pubDate: "2026-11-16"
updatedDate: "2026-11-20"
category: "Clash 客户端教程"
pillar: "clash"
topicSlug: "clash-verge"
clusterId: "clash-verge-setup"
tags: ["Clash Verge", "Clash Verge Rev下载", "Clash Verge订阅", "TUN模式", "Mihomo"]
cover: "/images/covers/clash-verge-guide.svg"
coverAlt: "Clash Verge Rev 完整入门教程封面"
author: "小火箭技术组"
excerpt: "在原版 Clash 停更后，基于 Mihomo 内核的 Clash Verge Rev 已成为 Windows、macOS 与 Linux 首选开源代理前端。核心四步：核对 GitHub 官方包 → 导入订阅链接 → 保持规则模式（Rule）→ 按需开启系统代理或 TUN 虚拟网卡，并用全局扩展脚本实现 AI 精准分流。"
brandSlugs: ["guangsuyun", "weifeng", "xingdaomeng", "yifan"]
platforms: ["Windows", "macOS", "Linux"]
difficulty: "入门"
featured: true
primaryKeyword: "Clash Verge"
secondaryKeywords: ["Clash Verge 下载", "Clash Verge 订阅", "Clash Verge 教程", "Clash 推荐"]
searchIntent: "Informational"
verifiedDate: "2026-11-19"
reviewStatus: "verified"
relatedSlugs: ["clash-verge-rev-vs-flclash-vs-v2rayn", "subscription-failed-troubleshooting", "node-timeout-dns-fix"]
sources:
  - "第三方代理客户端.txt"
faq:
  - question: "Clash Verge Rev 的系统代理（System Proxy）和 TUN 模式有什么区别？"
    answer: "系统代理仅接管遵守操作系统代理环境变量或接口的浏览器（Chrome/Edge/Safari）与常规桌面软件；TUN 模式会在系统中安装服务并创建一张虚拟网卡（如 Meta/Mihomo TUN），在三层网络栈接管几乎所有不走系统代理的程序流量（如终端命令行 git/curl/npm、Docker、部分游戏客户端、桌面开发 IDE）。日常网页浏览只开系统代理最省资源，遇到终端或桌面应用连不上外网时再开启服务模式与 TUN 模式。"
  - question: "苹果电脑 M1/M2/M3/M4 芯片该下载哪个版本？打开提示“已损坏”怎么办？"
    answer: "Apple Silicon（M1–M4 及后续 M 系列芯片）务必选择文件名包含 aarch64 或 arm64 的 .dmg 安装包；只有 2020 年前的老款 Intel 处理器 Mac 才选 x64 / x86_64 版本。若从 GitHub 下载安装后系统提示“已损坏”或“无法验证开发者”，是因为开源软件未经过 Apple 商业公证触发了 Gatekeeper 隔离机制，可在「系统设置 → 隐私与安全性」底部点击“仍要打开”放行，或在核实包体确来自官方 GitHub Release 后移除隔离属性。"
  - question: "为什么我买了机场套餐，却在后台找不到可以导入 Clash Verge Rev 的订阅链接？"
    answer: "先确认所购机场的客户端模式。兼容 Clash 第三方订阅的品牌包括光速云、星岛梦、微风网络、一翻云、梯子云、唯兔云、可信云、速界等；而飞猫云、SOGO 云、隐形人、Firefly（萤火虫）、灵猫网络、无忧链接、闪跃、全球云等采用专属客户端登录即用模式，不提供第三方订阅链接，直接下载对应品牌官方 App 登录即可。"
  - question: "导入订阅并激活后，为什么「代理」页还是空的或者很多节点不显示？"
    answer: "最常见有三种原因：第一，导入配置卡片后忘记鼠标左键点击选中使其高亮激活；第二，订阅链接在微信/QQ 内置浏览器中被截断或带入了空格、中文前缀；第三，粘贴了非 Clash YAML 格式的 Base64 节点串。此外，若仍在使用早已停更的老版 Clash for Windows，也会因为无法识别 VLESS-Reality 或 Hysteria 2 而跳过节点，升级到基于 Mihomo 内核的 Clash Verge Rev 即可解决。"
  - question: "打开 Clash Verge Rev 后，为什么看香港节点速度飞快，但打开 ChatGPT 网页或 Gemini 却提示不可用？"
    answer: "这是主流 AI 平台的地区风控差异所致。根据 2026-08-19 MiaoKo 实测样本，香港专线节点虽然延迟极低（20–31ms），但访问 OpenAI 常被限制为“仅 APP 解锁”，且大多数香港节点无法访问 Gemini。最稳妥的解法不是全程切到高延迟欧美节点，而是在 Clash Verge Rev 中通过「全局扩展脚本」或策略组将 OpenAI、Claude、Gemini 域名单独分流至新加坡、日本或美国节点，其余日常网页继续走香港专线。"
  - question: "Clash Verge Rev 的默认端口 7897 可以局域网共享给手机或 Switch/PS5 使用吗？"
    answer: "可以。在左侧「设置 → Clash 设置」中打开「允许局域网（Allow LAN）」，并将混合端口（Mixed Port）记下来（新版默认为 7897）。随后确保手机、电视盒子或游戏主机与电脑处于同一 Wi-Fi 路由器下，在手机 Wi-Fi 详情的 HTTP 代理中选择“手动”，服务器填电脑的局域网 IP（如 192.168.1.105），端口填 7897 即可共享电脑代理。"
  - question: "电脑没关软件就直接断电或强制关机，重启后浏览器全部打不开网页怎么办？"
    answer: "这是因为异常关机导致 Windows 或 macOS 的系统代理设置依然残留在 127.0.0.1:7897，而开机时 Clash Verge Rev 核心尚未启动。最快修复方法是重新打开一次 Clash Verge Rev，等启动后关闭再开启或直接手动关闭「系统代理」开关；也可以到 Windows「设置 → 网络和 Internet → 代理」关闭手动代理服务器。"
---

## 核心结论：新手上手 Clash Verge Rev 的标准路径

在原版 Clash for Windows 停止维护之后，基于 **Mihomo（原 Clash.Meta）** 内核构建的 **Clash Verge Rev** 已经成为 Windows、macOS 与 Linux 桌面端生态中最主流的开源代理客户端。它原生支持 `VLESS`、`VLESS-Reality`、`Hysteria 2`、`Trojan`、`Shadowsocks` 与 `AnyTLS` 等现代协议，同时具备图形化的 **TUN 虚拟网卡**、**全局扩展配置（Merge / Script）** 以及完善的 **Fake-IP / Redir-Host DNS 引擎**。

如果你只想在最短时间内安全跑通日常浏览、开发终端代理与 AI 分流，请严格按以下五步推进：

1. **安全验真安装**：只从开源社区官方 GitHub Releases 下载对应 CPU 架构的安装包，彻底避开中文搜索引擎里的仿冒推广站与“高速下载器”。
2. **确认机场支持第三方订阅**：在 [机场品牌数据库](/brands/) 核对服务商是否开放 Clash 订阅（如光速云、微风网络、星岛梦、一翻云、梯子云均支持；仅提供专属客户端的品牌则直接用官方 App）。
3. **导入并激活订阅**：粘贴订阅链接导入后，**务必点击一次配置卡片使其处于高亮激活状态**，并把自动更新周期设为 `1440` 分钟（24 小时）。
4. **选对模式与开关**：`代理（Proxies）` 页面顶部 95% 时间保持 **规则（Rule）**；仅看网页打开 **系统代理（System Proxy）**，若需要终端（`git`、`curl`、`npm`、`Claude Code`）、Docker 或开发工具走代理，再安装服务模式并开启 **TUN 模式**。
5. **配置 AI 独立分流**：利用 Clash Verge Rev 的全局扩展脚本，让日常网页走低延迟香港专线，同时把 ChatGPT、Claude、Gemini 自动分流到新加坡、日本或美国节点。

---

## 第一步：防假冒核验与全平台下载安装（Win / Mac / Linux）

代理软件拥有接管系统网络流量的极高权限，一旦下载到被第三方二次打包的恶意安装包，极易导致机场订阅被盗、Cookie 劫持甚至本地文件泄露。有关安全验真的详细准则可配合 [Clash Verge 下载安全核验指南](/articles/clash-verge-download-and-verify/) 一同查阅。

### 1.1 识别唯一可信渠道与假冒陷阱

- **唯一可信分发源**：GitHub 官方开源仓库 `clash-verge-rev/clash-verge-rev` 的 `Releases` 页面。
- **高危仿冒特征**：在中文搜索引擎搜索“Clash Verge 官网”时，排名靠前的商业域名（如带 `cn`、`vip`、中文门户介绍且右下角弹窗提示“点击下载高速下载器”）**全部不是官方项目**。正版桌面端安装包体积通常在 **20 MB 至 45 MB** 之间，绝不存在几百 KB 的“在线安装引导器”。

### 1.2 三大桌面系统与 CPU 架构选型对照表

在 GitHub Releases 的 `Assets` 列表中会列出十余个文件，请按你的设备和芯片架构精确匹配：

| 操作系统 | 如何确认本机架构 | 应选择的安装包文件名特征 | 安装方式与首次启动重点 |
| :--- | :--- | :--- | :--- |
| **Windows 10 / 11（主流 PC）** | `设置 → 系统 → 系统信息 → 系统类型` 显示“基于 x64 的处理器” | `Clash.Verge_x.x.x_x64-setup.exe` | 推荐用 `setup.exe` 安装版，后续安装 Service Mode 服务模式更稳定；便携版 `.zip` 需解压到固定非系统盘目录 |
| **Windows ARM（骁龙/Surface）** | 系统类型显示“基于 ARM 的处理器” | `Clash.Verge_x.x.x_arm64-setup.exe` | 切勿混用 x64 安装包，否则无法调用原生内核性能 |
| **macOS（M1 / M2 / M3 / M4）** | 点击屏幕左上角 ` → 关于本机`，芯片栏显示 `Apple M1/M2/M3/M4` | `Clash.Verge_x.x.x_aarch64.dmg`（或标 `arm64`） | 双击 `.dmg` 将图标拖入 `Applications`（应用程序）文件夹 |
| **macOS（老款 Intel Mac）** | ` → 关于本机`，处理器栏显示 `Intel Core ...` | `Clash.Verge_x.x.x_x64.dmg` | 仅 2020 年前旧款 Intel Mac 使用；M 系列芯片勿下此包 |
| **Linux（Ubuntu / Debian 系）** | 终端执行 `uname -m`（`x86_64` 对应 `amd64`，`aarch64` 对应 `arm64`） | `.deb` 包（如 `_amd64.deb`） | 终端执行 `sudo apt install ./Clash.Verge_*.deb` 自动补全系统依赖 |
| **Linux（Fedora / RHEL / Arch）** | `uname -m` 确认 `x86_64` 或 `aarch64` | `.rpm` 包或通用 `.AppImage` | `.rpm` 用 `sudo dnf install`；`.AppImage` 需先执行 `chmod +x` 再运行 |

### 1.3 Windows、macOS、Linux 安装后的系统初始化细节

#### Windows 端：权限、SmartScreen 与防火墙放行
1. 运行 `x64-setup.exe` 时，若弹出 Microsoft Defender SmartScreen“Windows 已保护你的电脑”蓝窗，点击 **「更多信息」→「仍要运行」**（前提是核实文件来自官方 GitHub Releases）。
2. 安装路径建议保持默认或纯英文目录，避免路径中包含特殊符号导致 Mihomo 内核启动失败。
3. 首次开启代理或局域网共享时，Windows 防火墙会询问是否允许 `mihomo` / `clash-verge` 访问网络，**务必勾选“专用网络”和“公用网络”并点击「允许访问」**。

#### macOS 端：解决 Gatekeeper“已损坏”或“来自身份不明开发者”
由于开源项目通常没有购买 Apple 商业签名公证，首次在「应用程序」中双击打开 Clash Verge Rev 时经常被 macOS 拦截：
1. **常规放行路径**：打开苹果 `系统设置 → 隐私与安全性`，向下滚动到“安全性”区域，你会看到“已阻止使用 Clash Verge，因为无法验证开发者”，点击旁边的 **「仍要打开」** 并输入开机密码即可。
2. **若直接提示“已损坏，无法打开，应移到废纸篓”**：这是 macOS 对网络下载文件的隔离属性（`com.apple.quarantine`）所致。确认安装包绝对来自官方 GitHub 后，打开「终端（Terminal）」执行以下命令清除隔离标记，随后即可正常双击启动：

```bash
# 仅在确认安装包来自官方 GitHub Releases 时执行
xattr -dr com.apple.quarantine "/Applications/Clash Verge.app"
```

#### Linux 端：桌面端与无桌面服务器区分
- 在带 GNOME/KDE 桌面的 Ubuntu、Linux Mint、Fedora 上，安装 `.deb` 或 `.rpm` 后可直接使用图形界面及系统代理（GSettings）；部分发行版托盘图标不显示时，确认已安装 `libayatana-appindicator` 或在 GNOME 扩展中开启 AppIndicator 支持。
- 如果你是无图形桌面的 Linux 服务器、NAS 或纯命令行工作站，不建议硬装桌面版，改用 [客户端总览](/clients/) 中提到的 **`v2rayA`**（Web 浏览器控制端）或直接部署 `mihomo` systemd 服务会更轻量稳定。

---

## 第二步：机场订阅获取、导入激活与定时更新设置

### 2.1 先确认你的机场是否支持 Clash 订阅

在打开订阅栏前，必须先区分品牌交付模式，否则你会发现后台根本找不到订阅地址：

- **支持 Clash / Mihomo 第三方订阅的品牌**：光速云、星岛梦、微风网络、一翻云、梯子云、唯兔云、暮光加速（详情待核实但支持多端）、二猫云、可信云、速界、极连云、光年梯、神行加速等。这些品牌通常同时兼容通用订阅或直接提供 Clash 专用 YAML 链接。
- **仅提供专属客户端（无第三方订阅链接）的品牌**：飞猫云、SOGO 云、隐形人、Firefly（萤火虫）、灵猫网络（2026-10 起）、无忧链接（2026-10 起）、闪跃（2026-10 起）、全球云。如果你使用的是这类品牌，请直接从品牌官网下载其官方客户端登录使用，**不要强行寻找 Clash 订阅**。

### 2.2 导入订阅的标准操作流

1. 使用 **Chrome、Edge 或 Safari 等独立浏览器** 登录机场官网面板（尽量不要在微信或 QQ 内置浏览器中打开并复制链接，内置浏览器偶尔会截断参数或吞掉符号）。
2. 在面板首页找到「一键导入 Clash」或「复制 Clash 订阅链接」。
   - **提示**：推荐优先使用“复制订阅链接 → 手动粘贴导入”，因为部分国产浏览器会拦截 `clash://` 自定义协议唤醒，导致点击一键导入无反应。
3. 打开 Clash Verge Rev，点击左侧菜单栏 **「订阅（Profiles）」**。
4. 将复制的 `https://...` 链接粘贴到页面顶部的 **「订阅文件链接（Profile URL）」** 输入框，点击右侧 **「导入（Import）」**。
5. **关键动作（新手最易遗漏）**：导入完成后，界面下方会出现一张带有套餐名称、已用流量和到期时间的卡片。**你必须用鼠标左键单击这张卡片，直到卡片边框高亮或显示选中标记**，此时核心才会真正加载这份配置。

### 2.3 配置自动更新间隔与 User-Agent

机场节点 IP、中转端口和入口域名会随网络环境定期维护更新。如果几个月不刷新订阅，某天突然全节点超时往往只是因为本地配置文件太旧。

1. 在已激活的订阅卡片右上角，点击 **三点菜单（或右键卡片）→「设置 / 编辑信息（Settings）」**。
2. 将 **「更新间隔（Update Interval）」** 设为 **`1440`**（单位为分钟，即每 24 小时自动静默更新一次；若经常遇到节点变动，也可设为 `720` 分钟即 12 小时）。
3. 勾选 **「启动时更新」**（视客户端版本选项而定，可在主设置或订阅设置中开启），确保长期关机后重新开机也能拿到最新节点表。
4. **User-Agent 检查**：保持默认即可（Clash Verge Rev 默认携带 `clash-verge` / `Mihomo` 标识，绝大多数机场面板会据此下发带 VLESS / Hysteria 2 的完整 Clash Meta YAML 配置）。只有极少数老面板拦截陌生 UA 时，才在订阅设置中尝试把 `User-Agent` 改为 `Clash.Meta` 或 `clash-verge/v2.0.0`。

---

## 第三步：运行模式（Rule / Global / Direct）与节点测速选线

导入并激活配置后，切换到左侧 **「代理（Proxies）」** 面板，顶部有三个运行模式标签，很多新手误点错模式导致网速极慢或无法访问国内网站：

| 运行模式 | 流量路由逻辑 | 适用场景 | 新手避坑警告 |
| :--- | :--- | :--- | :--- |
| **规则（Rule）** | 严格按照订阅内的规则集（GeoIP / Geosite / Rule-Provider）判断：国内域名与大陆 IP `DIRECT` 直连，海外目标走代理，广告规则 `REJECT` 拦截 | **日常 95% 以上时间唯一推荐模式** | 若订阅未自带规则集，可切到「连接」页观察国内网站是否误走了代理节点 |
| **全局（Global）** | 几乎所有网络请求（除私有内网段外）全部强行经过顶部 `GLOBAL` 策略组选定的单个海外节点 | 1. 临时测试某个特定冷门网站是否只是分流规则漏掉了；2. 在订阅域名被本地干扰时**挂备用节点更新订阅** | **绝对不要长期挂在 Global 模式**！否则微信传文件、看 B站、淘宝、网易云音乐全部绕道海外节点，既慢又白白烧光套餐流量 |
| **直连（Direct）** | 不经任何代理节点，全部流量直接走本地宽带出口 | 排查“到底是本地宽带断网还是节点坏了”的对照测试 | 开着直连时软件界面仍亮着运行，容易让人误以为代理失效，测完请立刻切回 `Rule` |

### 3.1 节点测速与地区选择策略

在 `代理（Proxies）` 页面中，主策略组（通常名为 `Proxy`、`节点选择` 或机场品牌名）右侧有一个 **闪电图标（延迟测试）**。点击它会向每个节点发起一次 URL-Test（默认向 `http://www.gstatic.com/generate_204` 发送轻量探测请求）：

- **如何读懂延迟数字**：
  - `20ms – 90ms`（绿色）：物理距离极近的专线节点（常见为香港、台湾、部分日本/新加坡），网页加载几乎零等待。
  - `100ms – 250ms`（黄绿色）：日本、新加坡常规线或美西节点，看 4K 视频、调用 AI API 依然流畅。
  - `Timeout / Error`（红色）：当前网络下无法连通该节点，**可能是节点临时维护、本地时间不准，或客户端版本过旧不支持该节点协议**。
  - **注意**：Clash 里的闪电测速测的是“单次 HTTP 204 握手延迟”，**不等同于实际下载带宽**；想看真实吞吐表现，仍需结合 [MiaoKo 测速图解教程](/guides/how-to-read-miaoko-speedtest/) 观察多线程与单线程速度。

- **按使用场景挑节点地区（结合实测规律）**：
  - **日常极速浏览 / 港台流媒体**：首选 **香港专线**，延迟最低。
  - **ChatGPT / Claude / Cursor / 科研文献**：优先选择 **新加坡、日本或美国节点**。我们在 [AI 与流媒体解锁指南](/articles/ai-and-streaming-unlock-guide/) 的实测分析中提到，许多机场的香港节点访问 OpenAI 会受限于“仅 App 解锁”且不支持网页端与 Gemini。
  - **自动选优策略组**：如果主分组下有 `自动选择（url-test）` 或 `故障转移（fallback）`，日常刷网页可以用它免去手动换线，但**登录银行、支付或重要 AI 账号时建议手动固定一个稳定地区的节点**，避免 IP 在港/新/日/美之间频繁跳变触发账号风控。

---

## 第四步：系统代理（System Proxy）与 TUN 虚拟网卡模式深度对比

来到最核心的开关层。打开左侧 **「设置（Settings）」**，最上方有两个最关键的开关：**系统代理（System Proxy）** 与 **TUN 模式（Tun Mode）**。

```text
应用发起网络请求
   │
   ├── 浏览器 (Chrome/Edge/Safari) & 支持系统代理的软件
   │        └── 读取操作系统 HTTP/SOCKS 代理 (127.0.0.1:7897) ──▶ [系统代理即可接管]
   │
   └── 终端 (git / curl / npm / pip / Claude Code)、Docker、游戏、UWP应用
            ├── 默认不读取系统 HTTP 代理变量 ──▶ 绕过系统代理直连超时
            └── 开启 [服务模式 + TUN 虚拟网卡] ──▶ 在三层虚拟网卡统一截获并按规则分流
```

### 4.1 两者的技术差异与取舍

| 对比维度 | 系统代理（System Proxy） | TUN 虚拟网卡模式（TUN Mode） |
| :--- | :--- | :--- |
| **工作层级** | 应用层（修改 OS 注册表 / 网络设置的 HTTP/HTTPS/SOCKS5 代理地址为 `127.0.0.1:7897`） | 网络层（创建系统级虚拟网卡 `Meta` / `utun`，配合内核路由表与 DNS 劫持接管全部 IP 包） |
| **接管范围** | Chrome、Edge、Safari、Firefox（选使用系统代理）、部分桌面端 | **几乎全系统所有进程**（包括 PowerShell、CMD、Terminal、Git、NPM、Python、Go、Docker、部分不遵循系统代理的游戏或客户端） |
| **系统权限要求** | 无需管理员提权，普通用户直接开关 | **必须先安装并激活服务模式（Service Mode）**（Windows 需管理员 UAC 授权；macOS 需输入开机密码授权系统级核心） |
| **资源占用与兼容风险** | 极低，不修改网卡路由表，几乎不与内网/加速器冲突 | 略增加 CPU/内存开销；与 UU/雷神游戏加速器、公司企业 VPN 同时开启容易抢占路由与 DNS |
| **日常推荐策略** | **轻度浏览、纯网页办公用户首选** | **程序员、AI CLI 工具使用者、部分客户端无法联网时开启** |

### 4.2 正确开启 TUN 模式的步骤（Windows / macOS / Linux）

如果你发现浏览器能上 Google，但命令行里 `git clone` 或 `curl` 依然超时，请按以下步骤启用 TUN 模式：

1. 进入 Clash Verge Rev 左侧 **「设置（Settings）」**。
2. 找到 **「服务模式（Service Mode）」** 一栏，点击右侧的小盾牌（或安装按钮）。
   - **Windows**：会弹出用户账户控制（UAC）确认窗口，点击 **「是」**，安装完成后盾牌图标通常会变为绿色或显示“已安装 / 运行中”。如果提示需要重启核心，点击重启服务。
   - **macOS**：会弹出系统授权窗口提示安装提权辅助工具（`clash-verge-service`），输入你的 Mac 开机锁屏密码并确认。
   - **Linux**：若服务模式不可用，可在界面开启权限授权或按发行版说明为 `mihomo` 二进制赋予 `CAP_NET_ADMIN` 能力（`sudo setcap cap_net_admin,cap_net_bind_service=+eip /path/to/mihomo`）。
3. 服务模式状态变为正常后，打开 **「TUN 模式（Tun Mode）」** 开关。
4. **重要习惯**：如果你开启了 TUN 模式，一般可以**同时保留系统代理，或者关闭系统代理仅靠 TUN 接管**；两者并存时，支持系统代理的浏览器会走 `127.0.0.1:7897`（少一次虚拟网卡封包开销），不走系统代理的软件则自动走 TUN 兜底。但如果你电脑上同时运行企业 VPN 或国内网游加速器，请务必先关掉 TUN 模式，详见 [节点超时与断网修复指南](/guides/node-timeout-dns-fix/)。

### 4.3 系统代理绕过列表（System Proxy Bypass）

开启系统代理后，为了防止内网地址、本地开发服务 `localhost:3000` 或路由器后台 `192.168.1.1` 误经过代理，可以在「设置 → 系统代理设置 → 绕过列表（Bypass）」中确认以下网段已存在：

```text
localhost;127.*;10.*;172.16.*;172.17.*;172.18.*;172.19.*;172.2*;172.30.*;172.31.*;192.168.*;<local>
```

---

## 第五步：端口与 DNS 核心设置（Mixed Port、局域网共享与 Fake-IP）

打开 Clash Verge Rev 的 **「设置 → Clash 设置」**，理解下面几个关键参数能帮你解决 80% 的疑难杂症：

### 5.1 核心网络端口与局域网共享

1. **混合端口（Mixed Port）**：新版 Clash Verge Rev 默认设置为 **`7897`**（早期 Clash 习惯为 `7890`）。“混合”意味着这一个端口**同时支持 HTTP、HTTPS 与 SOCKS5 三种协议**。
   - 终端命令行临时走代理（不开启 TUN 时非常实用）：
     - **PowerShell**：
       ```powershell
       $env:HTTP_PROXY="http://127.0.0.1:7897"
       $env:HTTPS_PROXY="http://127.0.0.1:7897"
       ```
     - **macOS / Linux zsh/bash**：
       ```bash
       export http_proxy="http://127.0.0.1:7897"
       export https_proxy="http://127.0.0.1:7897"
       export all_proxy="socks5://127.0.0.1:7897"
       ```
2. **允许局域网（Allow LAN）**：默认关闭。只有当你需要把电脑当成局域网网关，让同一 Wi-Fi 下的 iPhone、iPad、Nintendo Switch 或 PS5 通过 HTTP 代理上网时才打开。打开后请注意本地防火墙放行 `7897` 端口。
3. **IPv6 开关**：如果你的家庭宽带没有完整稳定的海外 IPv6 路由，建议保持 **IPv6 关闭**，避免 DNS 返回 AAAA 记录后出现部分海外网站半天加载不出图片的问题。

### 5.2 Mihomo DNS 设置：Fake-IP 与 Redir-Host 怎么选？

在开启 TUN 模式时，DNS 引擎是分流成败的关键。想深入了解底层机制可阅读 [Clash Meta（Mihomo）内核与 DNS 科普](/articles/clash-meta-mihomo-dns-guide/)。

| DNS 参数 | 常见默认 / 推荐值 | 作用说明 |
| :--- | :--- | :--- |
| **enhanced-mode** | **`fake-ip`**（默认） | 向本地应用返回 `198.18.0.0/16` 虚拟 IP，由 Mihomo 保留域名映射并在远端解析，**首屏打开速度最快、防 DNS 污染能力最强** |
| **Redir-Host 模式** | `redir-host`（备选） | 当公司内网 VPN、局域网 NAS 或某些游戏反作弊程序无法识别 `198.18.0.0/16` 虚拟 IP 时，切换为此模式 |
| **fake-ip-range** | `198.18.0.1/16` | Fake-IP 分配地址池，保持默认即可 |
| **fake-ip-filter** | `*.lan`, `*.local`, `time.*.com`, `*.ntp.org` 等 | 必须绕过 Fake-IP 的域名列表，防止系统校时（NTP）、局域网发现（mDNS）或登录认证失败 |
| **nameserver / fallback** | 国内 DoH（如 `223.5.5.5`）+ 海外 DoH | 确保国内域名不走海外 DNS（防止看国内视频调度到海外 CDN），海外域名不受本地污染 |

---

## 第六步：进阶实战——用全局扩展配置/脚本实现“香港日常 + AI 自动切区”

很多用户在看完实测报告后都有同一个需求：**机场订阅里自带的规则组不一定把 Claude、Gemini、Cursor 或特定工具分出来，而我又不想每次更新订阅都被覆盖掉自己的修改！**

Clash Verge Rev 专门提供了 **「全局扩展配置（Global Extend Config，YAML Merge）」** 与 **「全局扩展脚本（Global Extend Script，JavaScript）」**，它们会在每次加载或自动更新机场订阅时**动态叠加生效**，不会破坏原订阅结构。

### 6.1 方案 A：使用「全局扩展配置（YAML Merge）」追加规则与自定义策略

进入左侧 **「订阅（Profiles）」**，向下滚动到页面底部的 **「全局扩展配置」**（或右键当前配置选择独立扩展），填入以下标准的 YAML Merge 片段，即可强制把国内 NTP 时间同步设为直连，并把主流 AI 域名固定路由到你指定的策略组：

```yaml
# Clash Verge Rev 全局扩展配置（YAML Merge）示例
# 注意：这里的 prepend-rules 会插入到原订阅规则的最顶部，优先级最高

prepend-rules:
  # 1. 确保操作系统 NTP 校时与局域网直连，防止时间偏差引发 TLS 握手超时
  - DOMAIN-SUFFIX,ntp.org,DIRECT
  - DOMAIN-KEYWORD,time.windows,DIRECT
  - DOMAIN-KEYWORD,time.apple,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve

  # 2. 将主流 AI 服务精准分流到名为 AI-Zone 的策略组（需确保下方或原订阅存在该分组）
  - DOMAIN-SUFFIX,openai.com,AI-Zone
  - DOMAIN-SUFFIX,chatgpt.com,AI-Zone
  - DOMAIN-SUFFIX,oaistatic.com,AI-Zone
  - DOMAIN-SUFFIX,oaiusercontent.com,AI-Zone
  - DOMAIN-SUFFIX,anthropic.com,AI-Zone
  - DOMAIN-SUFFIX,claude.ai,AI-Zone
  - DOMAIN-SUFFIX,gemini.google.com,AI-Zone
  - DOMAIN-SUFFIX,generativelanguage.googleapis.com,AI-Zone
  - DOMAIN-SUFFIX,aistudio.google.com,AI-Zone
  - DOMAIN-SUFFIX,cursor.sh,AI-Zone
  - DOMAIN-SUFFIX,cursor.com,AI-Zone
```

> **提示**：如果你的机场订阅里原本没有叫 `AI-Zone` 的策略组（有的叫 `OpenAI`、有的叫 `ChatGPT`、有的干脆没有独立 AI 分组），直接写 YAML `prepend-rules` 可能会报“策略组不存在”。此时，更通用的办法是使用下方的 **全局扩展脚本（JavaScript）**，它能自动从你的节点列表里筛选出新加坡、日本、美国节点，**自动创建一个 `AI-Zone` 策略组**！

### 6.2 方案 B：使用「全局扩展脚本（JS Script）」自动筛选非香港节点组建 AI 专属分流

打开 **「订阅（Profiles）」→ 底部的「全局扩展脚本」**，点击编辑并粘贴以下通用脚本，保存后确保左侧启用了该脚本并刷新生效：

```javascript
// Clash Verge Rev 全局扩展脚本示例：自动生成「AI-Zone」策略组
// 逻辑：保留主代理日常使用低延迟香港节点，自动筛选狮城/日本/美国节点用于 ChatGPT / Claude / Gemini
function main(config) {
  const proxies = config.proxies || [];
  if (proxies.length === 0) return config;

  // 正则匹配：优先挑选新加坡、日本、美国节点，排除香港、台湾及信息提示节点
  const aiNodeRegex = /(新加坡|狮城|SG|Singapore|日本|JP|Japan|美国|US|America|States)/i;
  const excludeRegex = /(剩余流量|过期时间|官网|重置|套餐|香港|HK|Hong)/i;

  const aiNodes = proxies
    .map((p) => p.name)
    .filter((name) => aiNodeRegex.test(name) && !excludeRegex.test(name));

  // 如果订阅里有符合条件的节点，则新建 AI-Zone 策略组并插入规则到最前
  if (aiNodes.length > 0) {
    config["proxy-groups"] = config["proxy-groups"] || [];
    config["proxy-groups"].unshift({
      name: "AI-Zone",
      type: "select",
      proxies: aiNodes,
    });

    const aiRules = [
      "DOMAIN-SUFFIX,openai.com,AI-Zone",
      "DOMAIN-SUFFIX,chatgpt.com,AI-Zone",
      "DOMAIN-SUFFIX,oaistatic.com,AI-Zone",
      "DOMAIN-SUFFIX,oaiusercontent.com,AI-Zone",
      "DOMAIN-SUFFIX,anthropic.com,AI-Zone",
      "DOMAIN-SUFFIX,claude.ai,AI-Zone",
      "DOMAIN-SUFFIX,gemini.google.com,AI-Zone",
      "DOMAIN-SUFFIX,generativelanguage.googleapis.com,AI-Zone",
      "DOMAIN-SUFFIX,aistudio.google.com,AI-Zone",
      "DOMAIN-SUFFIX,perplexity.ai,AI-Zone",
      "DOMAIN-SUFFIX,cursor.sh,AI-Zone",
      "DOMAIN-SUFFIX,cursor.com,AI-Zone",
    ];

    config.rules = [...aiRules, ...(config.rules || [])];
  }

  return config;
}
```

保存并点击顶部提示的生效按钮后，切回 **「代理（Proxies）」** 页面，你会看到最上方多了一个 **`AI-Zone`** 分组，里面整齐列出了所有新加坡、日本与美国节点。从此以后，主策略组选香港专线跑满本地高速，而 `AI-Zone` 选新加坡或日本节点专攻 AI 工具，互不干扰！

---

## 第七步：日常运维排错流程与验证工具

遇到连不上网或部分网站异常时，不要盲目重启电脑或重装软件，利用 Clash Verge Rev 自带的三个观测面板按以下决策树排查：

```text
发现无法访问目标网站 / 代理不生效
   │
   ├── 1. 先看「代理 (Proxies)」页
   │        ├── 页面完全空白 ──▶ 回「订阅」页点击高亮选中配置文件
   │        └── 测速全部红色 Timeout ──▶ 检查系统时间是否同步 / 更新订阅 / 核对套餐剩余流量
   │
   ├── 2. 再看「连接 (Connections)」页（最直观的分流诊断）
   │        ├── 搜索目标域名无任何记录 ──▶ 流量根本没进 Clash（浏览器未开系统代理 / 终端需开 TUN 模式）
   │        ├── 规则命中 DIRECT ──▶ 订阅规则把该站判为直连（可改全局测试或加扩展规则）
   │        └── 规则命中香港节点且目标为 ChatGPT/Gemini ──▶ 切区或启用第六步 AI-Zone 分流
   │
   └── 3. 最后看「日志 (Logs)」页（级别调至 Info 或 Debug）
            ├── 报错 tls handshake / i/o timeout ──▶ 核对系统时钟误差或切换其他地区节点
            └── 报错 dial tcp 127.0.0.1:... connection refused ──▶ 核心未启动，重启 Mihomo 内核或重装服务模式
```

### 7.1 四大高频症状速查表

| 异常现象 | 最可能原因 | 立即处理方案 |
| :--- | :--- | :--- |
| **浏览器正常，终端 `git` / `pip` / `curl` 失败** | 命令行工具默认不读取 Windows/macOS 系统代理 | 安装服务模式并打开 **TUN 模式**，或在终端临时 `export` 指向 `127.0.0.1:7897` |
| **正常退出软件后，电脑所有网页彻底打不开** | 上次异常关机/崩溃残留了系统 HTTP 代理配置 | 再次打开 Clash Verge Rev 后手动关掉「系统代理」开关，或参考 [断网修复教程](/guides/node-timeout-dns-fix/) |
| **导入新订阅报错 `Invalid YAML` 或 `Network Error`** | 格式不对（如贴了 Base64 节点串）或订阅域名被本地干扰 | 参考 [订阅导入失败排查手册](/guides/subscription-failed-troubleshooting/) 核对格式与备用域名 |
| **开启 TUN 后公司内网 OA / NAS 突然失联** | `Fake-IP (198.18.0.0/16)` 与内网或企业 VPN 路由冲突 | 将内网域名/IP 段加入 `fake-ip-filter` 与绕过列表，或在设置里将 DNS 模式切换为 `Redir-Host` |

---

## 第八步：客户端横向对比与进阶选择建议

虽然 Clash Verge Rev 是当前桌面端的全能首选，但不同用户的硬件配置与多端习惯各不相同。如果你希望在桌面端或全平台之间统一体验，可以按以下定位选择，或阅读 [Clash Verge Rev vs FlClash vs v2rayN 深度对比](/comparisons/clash-verge-rev-vs-flclash-vs-v2rayn/)：

- **追求扩展脚本、精细规则与成熟生态**：继续使用 **Clash Verge Rev**（Mihomo 内核）。
- **追求界面极简、手机与电脑外观高度统一**：尝试 **FlClash**（同样基于 Mihomo 内核，Flutter 跨端界面）。
- **需要单独导入大量零散 `vless://` / `vmess://` 链接或习惯 Xray 原生调试**：选用 **v2rayN**（Windows/macOS/Linux 多核心支持）。
- **不想区分 Clash 还是 Base64 订阅格式的新手**：尝试基于 sing-box 的 **Hiddify** 或 **Karing**，对混合格式兼容性很强。
- **使用专属客户端机场（飞猫云、SOGO 云、隐形人、Firefly 等）**：无需在第三方客户端间折腾，直接下载官网提供的专属客户端即可。

---

## 总结检查清单（Checklist）

在正式把 Clash Verge Rev 作为主力工具前，对照以下 6 项逐一打钩即可确保长期省心：

- [ ] 安装包来自官方 GitHub Releases，且芯片架构与系统（`x64` / `aarch64` / `.deb`）完全匹配。
- [ ] 订阅已成功导入、点击高亮激活，且自动更新间隔已设为 `1440` 分钟。
- [ ] 「代理」模式保持在 **规则（Rule）**，未误留「全局（Global）」。
- [ ] 根据需求决定仅开「系统代理」，或安装服务模式后开启「TUN 模式」。
- [ ] 已为 ChatGPT / Claude / Gemini 配置 **新加坡、日本或美国节点** 分流（或通过第六步 JS 扩展脚本实现）。
- [ ] 知晓异常退出的急救口诀：打不开国内网页时先去系统设置关闭残留代理 `127.0.0.1:7897`。
