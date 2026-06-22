# Story 004 — Result And Reward Flow

## Agent owner

- Producer: `cocos-producer` — Cocos Producer（制作人 / 项目负责人）
- Architect: `cocos-architect` — Cocos Architect（技术架构师 / 技术总监）
- Developer: `cocos-dev` — Cocos Developer（Cocos 开发工程师）
- QA: `cocos-qa` — Cocos QA（测试 / 验收负责人）

## Player-facing purpose

After completing the example level, the player should see a result and a clearly defined reward.

## Scope

### In scope

- record level result
- resolve reward config
- call explicit reward flow
- show reward text in UI

### Out of scope

- long-term economy balance
- inventory system
- account sync
- cloud save
- shop
- monetization

## Required config

```text
reward_id: reward_city_001
```

## Required runtime systems

- `LevelResultRecorder`
- `RewardSystem`
- `RewardGrantPipeline`
- result UI presenter

## Acceptance criteria

- Result is derived from runtime level state, not from a UI-only flag.
- Reward is read from `Reward.csv`.
- Reward flow is explicit and reviewable.
- UI displays reward information but does not own reward truth.
- QA can distinguish executed validation from suggested validation.

## QA notes

The result flow is blocked if a UI button directly grants reward without passing through a result or reward system.
