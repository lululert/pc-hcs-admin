# 餐饮供应链分布式 HCS 管理控制台（静态版）

合同技术目标、技术内容、方法路线与体系成果的说明页，以及与节点、库存、调度、追溯、采购、预警、试点、模拟推演、知识沉淀、协同人员等业务模块的本地增删改查演示。

## 在线访问

- GitHub Pages：<https://lululert.github.io/pc-hcs-admin/>
- 建议入口：<https://lululert.github.io/pc-hcs-admin/index.html?v=20261029>
- 演示账号：`admin` / `123456`

## 本地运行

直接用浏览器打开 `index.html`（或通过任意静态 HTTP 服务托管本目录）。

## 数据说明

- 业务数据保存在浏览器 `localStorage`（键名 `hcs_admin_crud_v4`）。
- 「数据管理」支持 JSON 导出/导入与恢复演示数据。
- 「操作日志」记录本控制台内的增删改操作（最多 200 条）。

## 目录结构

| 路径 | 说明 |
|------|------|
| `index.html` | 登录页 |
| `console.html` | 主控制台 |
| `js/store.js` | 本地存储与演示种子数据 |
| `js/modules-config.js` | 各业务模块字段配置 |
| `js/project-docs.js` | 合同文档正文 |
| `js/crud.js` | 通用列表增删改查 |
| `js/dashboard.js` | 工作台图表与动态列表 |
| `js/settings.js` | 数据导入导出 |

## 部署

推送到 `main` 分支后，GitHub Actions 工作流 `.github/workflows/pages.yml` 会发布到 GitHub Pages。
