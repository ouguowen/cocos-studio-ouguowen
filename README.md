# Cocos Studio Ouguowen

Senior multi-game-type AI Game Studio skill for `Cocos Creator 3.8.8`.

This skill is for solo developers and small teams who want to build Cocos Creator games with studio-grade structure instead of ad hoc decisions.

It is not a single-game template, not a Cocos2d-x skill, and not a provider-specific MCP plugin. It can use the currently available Cocos automation tool or MCP provider as an execution channel when local Cocos engine work is required.

For a Chinese beginner entry, see [README.zh-CN.md](README.zh-CN.md).

## What it covers

- game classification and MVP scope
- multi-game-type template selection
- production modes and stage control
- role ownership and approval boundaries
- Cocos Creator 3.8.8 project structure and runtime architecture
- level data models and config-table discipline
- provider-neutral Cocos automation proof when local engine work is required
- local Cocos proof runbook for scene, prefab, binding, Console, and preview evidence
- Codex + Cocos automation proof flow to reduce manual screenshot-driven validation
- first wave spawn proof boundary before full gameplay claims
- one-shot MVP chain control without skipping gates
- release, rollback, and operations review
- risk escalation and formal review

## What it does not cover

- Cocos2d-x C++ engine guidance
- multi-engine development
- one fixed final game template
- hard-coded commercial MCP commands
- hard-coded future official MCP commands
- importing the full Cocos manual into the skill
- claiming a Cocos scene or prefab is verified without local editor proof
- pretending automation proof exists when the provider cannot return evidence
- claiming first playable before spawn, movement, objective, and result path proof exist

## AI Game Studio Mode

This skill can be used as a lightweight AI Game Studio for Cocos Creator 3.8.8 projects.

The studio is built from:

```text
AI Agent + Workflow + Knowledge
```

When a task requires local Cocos Creator execution, Codex may use the current Cocos automation tool or MCP provider. The provider is replaceable: a current commercial MCP and a future official Cocos MCP should be treated as execution providers with capabilities, not as the identity of this skill.

### Main commands

- `cocos-game-brief`: define concept, loop, MVP promise, and non-goals
- `cocos-classify-game`: classify the dominant game type and content unit
- `cocos-gdd`: create a structured Game Design Document
- `cocos-project-context`: create or update project memory
- `cocos-game-architecture`: design Cocos runtime architecture
- `cocos-production-readiness`: decide if real implementation may start
- `cocos-one-shot-mvp`: run a controlled MVP chain without skipping gates
- `cocos-create-story`: create a dev-ready implementation story
- `cocos-dev-story`: implement a scoped story
- `cocos-code-review`: review implementation against gates
- `cocos-quick-prototype`: validate one mechanic quickly

### Main Agents

- `cocos-producer` — Cocos Producer（制作人 / 项目负责人）
- `cocos-game-designer` — Cocos Game Designer（游戏设计师 / 玩法策划）
- `cocos-architect` — Cocos Architect（技术架构师 / 技术总监）
- `cocos-dev` — Cocos Developer（Cocos 开发工程师）
- `cocos-qa` — Cocos QA（测试 / 验收负责人）
- `cocos-solo-dev` — Cocos Solo Dev（单人开发模式 / 一人工作室操作员）

### Beginner start

```text
Use $cocos-studio-ouguowen.
Run cocos-game-brief for my game idea, then recommend the next command.
```

### One-shot MVP start

Use this when the user wants continuous execution from one broad request, but still wants production logic and proof discipline.

```text
Use $cocos-studio-ouguowen.
Run cocos-one-shot-mvp for my game idea.
Do not skip gates.
Stop with a blocker report if game type, MVP scope, Cocos runtime proof, or acceptance evidence is missing.
```

### Provider-driven start

Use this only when a Cocos automation tool or MCP provider is available and authorized.

```text
Use $cocos-studio-ouguowen.
Run cocos-game-brief for a selected Cocos Creator 3.8.8 game type.
Execution channel: when local Cocos Creator work is required, use the currently available Cocos Creator 3.8.8 automation tool or MCP provider.
Do not bind the plan to one commercial MCP provider or one future official Cocos MCP provider.
Return provider proof only when local engine work is performed: scene hierarchy, component bindings, Console logs, preview result, screenshot, or PASS / FAIL notes.
```

For the detailed local proof standard, see [docs/provider-driven-local-cocos-proof.md](docs/provider-driven-local-cocos-proof.md).

For the Codex local automation proof flow, see [docs/codex-cocos-automation-proof.md](docs/codex-cocos-automation-proof.md).

For the first narrow gameplay proof after config parsing, see [docs/first-wave-spawn-proof.md](docs/first-wave-spawn-proof.md).

## Best fit

- serious Cocos Creator 3.8.8 projects
- solo developers wearing many hats
- small teams that want senior-level workflow control
- level-heavy or content-heavy games
- multi-type game planning where one selected game type is developed per MVP or sprint
- projects that are getting messy during prototype, production, or release
- projects using a Cocos automation provider as a replaceable execution channel

## Recommended starting prompts

1. `Use $cocos-studio-ouguowen. Classify this game by dominant loop and content unit.`
2. `Use $cocos-studio-ouguowen. Define the MVP and explicit non-goals.`
3. `Use $cocos-studio-ouguowen. Create the first project memory record.`
4. `Use $cocos-studio-ouguowen. Build the version roadmap and next milestone proof obligation.`
5. `Use $cocos-studio-ouguowen. Run cocos-game-brief for my game idea, then recommend the next command.`
6. `Use $cocos-studio-ouguowen. Run cocos-one-shot-mvp for my game idea without skipping gates.`
7. `Use $cocos-studio-ouguowen. Explain which Cocos automation provider capabilities are needed before local engine execution.`
8. `Use $cocos-studio-ouguowen. Apply the provider-driven local Cocos proof runbook before claiming the scene is playable.`
9. `Use $cocos-studio-ouguowen. Run Codex + Cocos automation proof for attack-defense-city and return PASS / FAIL / BLOCKED evidence.`
10. `Use $cocos-studio-ouguowen. Run first wave spawn proof only; do not add movement, combat, objective, economy, or result path yet.`

## Core files

- `SKILL.md`: entrypoint and routing
- `README.zh-CN.md`: Chinese beginner entry and safe first prompts
- `MODULE_INDEX.md`: module map
- `WORKFLOWS.md`: high-frequency execution
- `TEMPLATES.md`: high-frequency artifacts
- `AI_GAME_STUDIO_SYSTEM.md`: AI Game Studio system model
- `COMMANDS.md`: command registry
- `ONE_SHOT_GAME_BUILD.md`: controlled one-shot MVP chain law
- `EXAMPLE_PACK_EXPANSION_PLAN.md`: multi-game-type example pack expansion plan
- `docs/provider-driven-local-cocos-proof.md`: local Cocos proof runbook for provider or manual execution
- `docs/codex-cocos-automation-proof.md`: Codex local automation proof flow for Cocos providers
- `docs/first-wave-spawn-proof.md`: first narrow gameplay proof after config parsing
- `AGENT_REGISTRY.md`: Agent roles and boundaries
- `AGENT_HANDOFF_PROTOCOL.md`: Agent-to-Agent handoff rules
- `LEVEL_SYSTEM_ARCHITECTURE.md`: core level runtime boundaries
- `QUICK_START.md`: beginner installation, validation, and provider-driven start guide

## Installation

Place the folder in your Codex skills directory:

```text
~/.codex/skills/cocos-studio-ouguowen
```

On Windows:

```text
C:\Users\<you>\.codex\skills\cocos-studio-ouguowen
```

Restart Codex after updating the skill so the metadata reloads cleanly.
