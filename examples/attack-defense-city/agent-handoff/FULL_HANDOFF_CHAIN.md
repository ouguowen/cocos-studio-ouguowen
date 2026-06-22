# Full Agent Handoff Chain — Attack Defense City

This file shows one complete AI Game Studio handoff chain for the example.

## 1. Producer to Game Designer

Source Agent:

```text
cocos-producer — Cocos Producer（制作人 / 项目负责人）
```

Target Agent:

```text
cocos-game-designer — Cocos Game Designer（游戏设计师 / 玩法策划）
```

Requested action:

Create a small MVP design for a modern city attack-defense game.

Required output:

- game brief
- dominant loop
- MVP scope
- explicit non-goals
- first proof obligation

Acceptance criteria:

- one clear player loop
- one map
- one objective model
- no monetization or live-ops scope

## 2. Game Designer to Architect

Source Agent:

```text
cocos-game-designer
```

Target Agent:

```text
cocos-architect — Cocos Architect（技术架构师 / 技术总监）
```

Requested action:

Turn the MVP design into Cocos runtime boundaries and config ownership.

Required output:

- runtime system map
- config table ownership
- scene binding requirements
- forbidden shortcuts

Acceptance criteria:

- UI does not own gameplay truth
- wave, spawn, objective, result, and reward responsibilities are separated
- map points are data-driven

## 3. Architect to Developer

Source Agent:

```text
cocos-architect
```

Target Agent:

```text
cocos-dev — Cocos Developer（Cocos 开发工程师）
```

Requested action:

Implement the first playable loop using the existing runtime template and attack-defense config.

Required output:

- changed files
- scene/prefab binding notes
- validation command used
- unresolved blockers

Acceptance criteria:

- `city_001` can be selected
- map points are registered
- waves spawn enemies through the spawn system
- objective progress updates
- result/reward flow is called

## 4. Developer to QA

Source Agent:

```text
cocos-dev
```

Target Agent:

```text
cocos-qa — Cocos QA（测试 / 验收负责人）
```

Requested action:

Review the first playable loop against MVP acceptance criteria.

Required output:

- test checklist
- blocker issues
- pass/block decision
- regression notes

Acceptance criteria:

- config validation passes
- runtime export succeeds
- scene nodes match map point IDs
- the player can complete one level loop

## 5. QA to Producer

Source Agent:

```text
cocos-qa
```

Target Agent:

```text
cocos-producer
```

Requested action:

Report whether the MVP proof is accepted, accepted with changes, or blocked.

Required output:

- final QA status
- risk summary
- next milestone recommendation

Acceptance criteria:

- no blocker remains hidden
- suggested tests and executed tests are clearly separated
- producer can decide whether to continue to v0.3.0 implementation work
