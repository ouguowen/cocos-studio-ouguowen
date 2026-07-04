# Cocos Studio Ouguowen 中文入门

`cocos-studio-ouguowen` 是一个面向 Cocos Creator 3.8.8 的 AI 辅助游戏开发生产控制 Skill。

它帮助 Codex 或其他 AI 编程代理，把一个 Cocos 游戏从想法推进到 MVP：先明确类型和范围，再生成设计文档，再写第一条实现 story，再经过浏览器预览证明、QA 和 release review。

## 这个 Skill 是什么

- Cocos Creator 3.8.8 的生产流程控制系统。
- 多游戏类型 AI Game Studio 工作流。
- 面向 Codex 或其他 AI coding agent 的安全协作规范。
- 可以使用 Cocos automation provider / MCP，但只把它当作可替换的执行通道。
- 支持从游戏想法到第一个可验收 MVP 的小步闭环。

## 这个 Skill 不是什么

- 不是单一游戏模板。
- 不是 Cocos2d-x 教程。
- 不是某个 MCP 插件。
- 不是完整 Cocos 手册。
- 不是允许 AI 不经审批就乱改 `.scene`、`.prefab`、`.meta` 或游戏运行时代码的工具。
- 不是 Moonlight Delivery、攻防、剧情游戏或任何单一类型的专属模板。

## 快速开始

在 Codex 中输入：

```text
Use $cocos-studio-ouguowen.
Run cocos-game-brief for my game idea, then recommend the next command.
```

中文也可以这样说：

```text
使用 $cocos-studio-ouguowen。
请先把我的游戏想法整理成 cocos-game-brief，然后推荐下一步命令。
```

正确行为是：先做简报和下一步建议，不直接写 Cocos 代码，不创建 scene，不修改 meta。

## 安装

把仓库放到 Codex skills 目录：

```text
~/.codex/skills/cocos-studio-ouguowen
```

Windows：

```text
C:\Users\<you>\.codex\skills\cocos-studio-ouguowen
```

安装或更新后重启 Codex，让 Skill metadata 重新加载。

## 第一个 MVP 推荐流程

完整流程见 [docs/quickstart-first-mvp.md](docs/quickstart-first-mvp.md) 和 [FIRST_MVP_SUCCESS_PIPELINE.md](FIRST_MVP_SUCCESS_PIPELINE.md)。

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-gdd
-> cocos-numerical-design
-> cocos-economy-design
-> cocos-animation-design
-> cocos-asset-policy
-> cocos-game-architecture
-> cocos-first-implementation-story
-> cocos-production-readiness
-> cocos-dev-story-prewrite
-> cocos-dev-story
-> Preview Visibility Gate
-> cocos-qa-review
-> cocos-release-review
-> FIRST_MVP_ACCEPTED
```

关键限制：

- 文档阶段不打开 Cocos。
- 真正实现前必须有 `FIRST_IMPLEMENTATION_STORY.md`。
- `READY_FOR_IMPLEMENTATION` 只允许执行一条已批准 story，不代表游戏完成。
- `cocos-dev-story` 写文件前必须先输出 Pre-write Approval Checklist 并等待用户确认。
- 浏览器预览证明必须看到真实运行画面，不能只看编辑器层级。
- `FIRST_MVP_ACCEPTED` 只代表当前 MVP 被接受，不代表完整游戏完成。

## 核心命令

- `cocos-game-brief`：整理游戏想法、目标玩家、核心幻想、MVP 承诺和不做内容。
- `cocos-classify-game`：按主要玩家动作和内容单元分类游戏类型。
- `cocos-gdd`：生成游戏设计文档。
- `cocos-numerical-design`：确认是否需要数值或平衡系统。
- `cocos-economy-design`：确认是否需要货币、商店、背包、奖励、广告、抽卡或商业化系统。
- `cocos-animation-design`：确认动画、表现、UI motion、VFX 和 gameplay truth 边界。
- `cocos-asset-policy`：确认占位资源、最终美术、音频、字体、外部资源和导入边界。
- `cocos-game-architecture`：设计 scene、script、data、asset、runtime proof 边界。
- `cocos-first-implementation-story`：写第一条最小可实现 story。
- `cocos-production-readiness`：判断是否允许开始一条实现 story。
- `cocos-dev-story-prewrite`：输出写入前审批清单并停止。
- `cocos-dev-story`：在用户明确批准后，只实现已批准 story。
- `cocos-qa-review`：验收实现结果和 forbidden scope。
- `cocos-release-review`：判断当前 MVP 是否 `FIRST_MVP_ACCEPTED`。

## 它如何防止 Codex 乱写代码

主要防线：

- [AI_COMMAND_PERMISSION_RULES.md](AI_COMMAND_PERMISSION_RULES.md)：AI 命令权限边界。
- [COCOS_PATH_SCOPED_RULES.md](COCOS_PATH_SCOPED_RULES.md)：Cocos 路径和写入范围规则。
- [CODEX_WRITE_APPROVAL_PROTOCOL.md](CODEX_WRITE_APPROVAL_PROTOCOL.md)：写文件前审批。
- [COCOS_DEV_STORY_PREWRITE_PROTOCOL.md](COCOS_DEV_STORY_PREWRITE_PROTOCOL.md)：`cocos-dev-story` 写入前必须停止等待确认。
- [COCOS_GENERATED_META_POLICY.md](COCOS_GENERATED_META_POLICY.md)：Cocos 自动生成 `.meta` 时必须审查和确认。
- [RUNTIME_PROOF_PROTOCOL.md](RUNTIME_PROOF_PROTOCOL.md)：浏览器预览和运行证明规则。
- [GIT_DIFF_REVIEW_PROTOCOL.md](GIT_DIFF_REVIEW_PROTOCOL.md)：提交前必须检查 diff。

如果出现未批准文件，尤其是 `.scene`、`.prefab`、`.meta`、运行时代码或外部资源，Codex 应该停止并报告。

## 自动化验证

仓库会通过 GitHub Actions 自动检查必需文档、链接、命令路由、安全协议和危险规则退化。

每次 `push` 和 `pull_request` 会运行：

```text
python scripts/validate_skill_docs.py
```

本验证不会打开 Cocos，不会修改游戏项目，也不会验证真实浏览器预览。它只验证 Skill 文档和安全规则是否完整。

详细说明见 [docs/automation-validation.md](docs/automation-validation.md)。

## Moonlight Delivery 案例

Moonlight Delivery - Chapter 1 Shell 是一个成功闭环案例：

- 游戏类型：`story-clear / light-interaction / narrative micro-game`
- release 结果：`FIRST_MVP_ACCEPTED`
- QA 结果：`QA_PASS`
- Preview Visibility Gate：`PASS`

阅读：

- [SUCCESS_CASE_MOONLIGHT_DELIVERY.md](SUCCESS_CASE_MOONLIGHT_DELIVERY.md)
- [examples/moonlight-delivery/README.md](examples/moonlight-delivery/README.md)

注意：这个案例证明的是流程，不是唯一游戏类型。它用于改进工作流控制，不会把 Skill 锁定成剧情游戏模板。

## 贡献与安全

- 贡献指南：[CONTRIBUTING.md](CONTRIBUTING.md)
- 安全报告：[SECURITY.md](SECURITY.md)
- 开源路线图：[docs/open-source-roadmap.md](docs/open-source-roadmap.md)
## 协作与发布

公开协作请使用 GitHub 模板：

- Bug 报告：[bug_report.yml](.github/ISSUE_TEMPLATE/bug_report.yml)
- 功能请求：[feature_request.yml](.github/ISSUE_TEMPLATE/feature_request.yml)
- 安全边界报告：[safety_report.yml](.github/ISSUE_TEMPLATE/safety_report.yml)
- 文档请求：[documentation.yml](.github/ISSUE_TEMPLATE/documentation.yml)
- Pull Request：[pull_request_template.md](.github/pull_request_template.md)

发布计划请阅读 [docs/release-strategy.md](docs/release-strategy.md)，发布前请完成 [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md)。提交前必须本地运行 `python scripts/validate_skill_docs.py` 并 PASS；发布变更也必须更新 [CHANGELOG.md](CHANGELOG.md)。

## 开发体验与运行模式

Skill 有三种运行模式：

- Fast Build Mode
- Safe Gate Mode
- Audit Mode

日常开发默认快速构建模式，避免不必要的频繁打断。

危险操作才停止。阶段切换才走严格 Gate。Skill 自测和仓库审计才用完整审计模式。