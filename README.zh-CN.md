# Cocos Studio Ouguowen 中文入门

`cocos-studio-ouguowen` 是一个面向 `Cocos Creator 3.8.8` 的多游戏类型 AI Game Studio Skill。

它的目标不是一次性生成一个完整商业游戏，也不是某一个固定玩法模板，而是把一个 Cocos 游戏项目拆成可判断、可执行、可验收的工作流程：

```text
AI Game Studio = AI Agent + Workflow + Knowledge
```

## 这个 Skill 解决什么问题

适合以下情况：

- 你是一个人开发，但希望按小型游戏工作室的方式推进。
- 你使用 Codex、ChatGPT 或其他 AI 工具辅助开发 Cocos Creator 游戏。
- 你不想让 AI 直接乱写代码、乱建脚本、乱扩展功能。
- 你的游戏可能是攻防、塔防、卡牌、剧情通关、放置、合成等不同类型。
- 你希望每一步都有明确产物、负责人、验收标准和下一步命令。

## 这个 Skill 不是什么

它不是：

- Cocos2d-x C++ 教程。
- 多引擎通用开发框架。
- 单一游戏模板。
- 某个商业 MCP 的专属插件。
- 未来官方 Cocos MCP 的硬编码协议。
- 已经包含真实 `.scene`、`.prefab`、美术资源和完整可运行游戏的成品项目。

## 初学者正确使用方式

不要一开始就说：

```text
帮我做一个完整游戏。
```

更推荐从下面这句话开始：

```text
Use $cocos-studio-ouguowen.
Run cocos-game-brief for my game idea, then recommend the next command.
```

中文表达也可以是：

```text
使用 $cocos-studio-ouguowen。
请先帮我把游戏想法整理成 cocos-game-brief，然后推荐下一步命令。
```

## 推荐执行顺序

第一阶段先确定方向，不写代码：

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-gdd
-> cocos-project-context
```

第二阶段确定能不能开工：

```text
cocos-numerical-design       # 如果涉及血量、攻击、速度、奖励、难度
cocos-economy-design         # 如果涉及金币、升级、商店、广告、抽卡、体力
cocos-animation-design       # 如果涉及动作、受击反馈、UI 动效、VFX、音效节奏
-> cocos-game-architecture
-> cocos-production-readiness
```

第三阶段才允许进入实现：

```text
cocos-create-story
-> cocos-dev-story
-> cocos-code-review
```

## Cocos Creator 3.8.8 基线

本 Skill 默认以 `Cocos Creator 3.8.8` 为基线。

当涉及编辑器行为、组件绑定、预览、打包、资源加载、prefab、scene、TypeScript 脚本结构时，回答必须明确符合 `3.8.8`，不能把 Cocos 2.x 或其他 3.x 版本经验直接当作默认答案。

## 多游戏类型原则

这个 Skill 支持多游戏类型，但每次 MVP 或每个 sprint 只能选择一个主类型。

正确逻辑是：

```text
先分类 -> 再选模板 -> 再定 MVP -> 再设计架构 -> 再实现
```

错误逻辑是：

```text
一次把攻防、卡牌、剧情、放置、抽卡、商城、背包、联网全部做完
```

## 当前示例包状态

当前主要示例包是：

```text
examples/attack-defense-city
```

它用于证明现代城市攻防类 MVP 的设计、配置、验证和 Cocos 集成路径。

注意：它是第一个示例包，不是唯一游戏方向，也不是最终游戏项目。当前示例包主要提供文档、配置表、验证脚本、Cocos 接入说明、参考 stub 和本地执行证明模板；只有在真实 Cocos Creator 3.8.8 项目里创建并验证 `.scene`、`.prefab`、组件绑定、浏览器预览后，才能声称它是已验证可运行项目。

## 本地验证命令

从仓库根目录运行：

```bash
npm install
npm run validate:example
npm run export:example
npm run types:example
npm run validate:runtime
npm run check
```

这些命令验证的是 Skill 的示例配置、导出流程、类型生成和 runtime template 基线，不等同于真实 Cocos 编辑器运行证明。

## 真实 Cocos 执行证明

当 AI 或 Codex 声称已经在 Cocos 中完成某个功能时，必须返回至少一种证明：

- scene hierarchy
- prefab/component bindings
- Console logs
- browser preview result
- screenshot
- PASS / FAIL notes
- filled editor proof report

没有这些证明时，只能说“设计已准备”或“代码/文档已准备”，不能说“游戏已经跑通”。

## 推荐给新手的第一条完整提示词

```text
使用 $cocos-studio-ouguowen。
我的引擎是 Cocos Creator 3.8.8。
我想做一个现代城市攻防类游戏 MVP。
请按顺序执行：cocos-game-brief -> cocos-classify-game -> cocos-gdd。
不要开始写 Cocos 代码。
输出游戏定位、核心循环、MVP 范围、明确不做的内容，以及下一步需要的命令。
```

## 核心原则

- 先判断，再设计，再实现。
- 先 MVP，再扩展。
- 先证明能跑，再说已完成。
- 一个 sprint 只服务一个主游戏类型。
- AI 可以加速产出，但不能替代负责人做最终验收。
