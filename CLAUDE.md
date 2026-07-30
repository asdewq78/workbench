# CLAUDE.md — 项目 AI 助手指引

## 项目简介

「我的工作台」— 手机优先的个人工作空间 PWA 应用。Vue.js 3 CDN + 纯 CSS + localStorage，无构建工具，单文件架构。

## 文档索引

所有项目标准文件位于 `docs/` 目录下。**在修改任何代码前，必须先阅读对应的规范文档：**

| 文档 | 路径 | 用途 | 何时阅读 |
|------|------|------|---------|
| 需求文档 | [docs/需求文档.md](docs/需求文档.md) | 全部功能需求和非功能需求 | 新增功能前必读 |
| 技术规范 | [docs/技术规范.md](docs/技术规范.md) | 技术栈、架构、数据流 | 修改架构或引入新依赖前必读 |
| 设计规范 | [docs/设计规范.md](docs/设计规范.md) | 色彩、玻璃拟态、排版、组件 | **修改任何 UI 前必读** |
| 数据模型 | [docs/数据模型.md](docs/数据模型.md) | 全部 localStorage 数据表结构 | 新增/修改数据字段前必读 |
| 导航架构 | [docs/导航架构.md](docs/导航架构.md) | 页面路由、Tab 结构、响应式导航 | 新增页面或修改导航前必读 |
| 开发路线图 | [docs/开发路线图.md](docs/开发路线图.md) | 分阶段开发计划和进度 | 规划新阶段工作前必读 |

## 工作约定

### 每次对话开始
1. 检查 `开发日志/` 目录下是否存在今日日志（`YYYY-MM-DD.md`）
2. 如不存在，从 `开发日志/模板.md` 复制创建
3. 如存在，阅读今日日志了解上下文和待办事项

### 每次修改代码前
1. 涉及 UI 修改 → 必须先读 [docs/设计规范.md](docs/设计规范.md)
2. 涉及数据修改 → 必须先读 [docs/数据模型.md](docs/数据模型.md)
3. 涉及新增模块/页面 → 必须先读 [docs/需求文档.md](docs/需求文档.md) + [docs/导航架构.md](docs/导航架构.md)
4. 修改后要更新对应的规范文档（需求变了更新需求文档，数据模型变了更新数据模型文档）

### 每次对话结束
1. 更新今日开发日志，记录完成事项
2. 如有新的待办事项，添加到日志的「明日计划」部分
3. 如开发路线图有进展，更新 [docs/开发路线图.md](docs/开发路线图.md)

## 代码规范

### CSS 规则（强制）
- **所有色值必须使用 CSS 变量**，禁止硬编码颜色。参考 [docs/设计规范.md](docs/设计规范.md) 中的完整变量表
- **所有卡片、弹窗、面板必须使用 `.glass` 类**（或 `.glass--strong` / `.glass--subtle`），不要自己写背景/阴影
- 新增 CSS 变量需同步更新设计规范文档
- 间距使用 4px 倍数的 CSS 变量体系

### Vue / JavaScript 规则
- 新模块遵循现有 Vue Options API 模式（`data()`, `computed`, `methods`, `mounted()`）
- localStorage key 使用 `db_` 前缀，通过 `load()`/`save()`/`persist()` 方法访问
- ID 生成统一使用 `uid()` 函数（时间戳+随机字符串）
- Toast 通知统一使用 `this.showToast(message, type)` 方法
- 删除操作必须有确认弹窗，使用 `this.showConfirm()` 方法

### 模块注册规则
- 新页面需在底部导航和侧边栏中注册
- 子页面使用 `currentSubTab` 切换，模板用 `v-show` 控制
- 弹窗表单使用统一的 `modal` 数据结构和 `openModal()`/`closeModal()`/`saveModal()` 方法

## 禁止事项

1. ❌ **不要引入新的 CDN 依赖**（除非用户明确要求，且需更新技术规范文档）
2. ❌ **不要修改 `:root` 中的 CSS 变量定义**（除非同步更新设计规范文档）
3. ❌ **不要删除或重命名 localStorage 已有的数据字段**（会破坏用户数据的向后兼容性）
4. ❌ **不要改变 `.glass` 类的核心样式**（backdrop-filter、border-radius、box-shadow）
5. ❌ **不要破坏移动端布局**（所有修改需在 375px 宽度下测试）
6. ❌ **不要添加服务器端依赖**（项目定位是纯前端静态应用）

## 快速参考

### 常用命令
- 启动本地服务器：双击 `启动.bat`
- 直接打开：双击 `index.html`

### 当前技术栈
- Vue.js 3.4.0 (CDN: jsdelivr)
- 纯 CSS (CSS Custom Properties + Glassmorphism)
- localStorage (key 前缀: `db_`)
- PWA (manifest.json + sw.js)
- Notification API (桌面通知)
- 响应式设计 (breakpoint: 768px)
