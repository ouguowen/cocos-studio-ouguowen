# Story 003 — Wave, Spawn, Objective Loop

## Agent owner

- Designer: `cocos-game-designer` — Cocos Game Designer（游戏设计师 / 玩法策划）
- Architect: `cocos-architect` — Cocos Architect（技术架构师 / 技术总监）
- Developer: `cocos-dev` — Cocos Developer（Cocos 开发工程师）
- QA: `cocos-qa` — Cocos QA（测试 / 验收负责人）

## Player-facing purpose

The player should be able to enter `city_001`, see configured waves start, and observe objective progress.

## Scope

### In scope

- load `city_001`
- start configured waves
- create placeholder enemy actors from configured groups
- update objective progress
- detect when all required objectives are complete

### Out of scope

- final enemy behavior tuning
- final effects
- multiple maps
- extra unit types
- economy balancing

## Required runtime systems

- `LevelBuilder`
- `LevelRuntime`
- `LevelFlowController`
- `WaveSystem`
- `SpawnSystem`
- `EnemyFactory`
- `ObjectiveSystem`

## Required config groups

```text
level_id: city_001
wave_group_id: wg_city_001
objective_group_id: obj_city_001
```

## Acceptance criteria

- `city_001` can create a runtime instance.
- Wave 1 and Wave 2 are read from `Wave.csv`.
- Spawn rows are read from `Spawn.csv`.
- Enemy groups resolve through `EnemyGroup.csv` and `Enemy.csv`.
- Objective progress is reported outside the UI layer.
- The loop can reach a completed objective state.

## QA notes

QA should test both normal completion and a broken reference scenario.

A broken reference scenario should not silently pass.
