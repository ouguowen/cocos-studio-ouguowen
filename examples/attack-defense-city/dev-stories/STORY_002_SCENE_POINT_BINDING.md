# Story 002 — Scene Point Binding

## Agent owner

- Architect: `cocos-architect` — Cocos Architect（技术架构师 / 技术总监）
- Developer: `cocos-dev` — Cocos Developer（Cocos 开发工程师）
- QA: `cocos-qa` — Cocos QA（测试 / 验收负责人）

## Player-facing purpose

The player should see the level start from a stable scene structure instead of invisible hardcoded positions.

## Scope

### In scope

- create or identify the Cocos gameplay scene
- create point nodes for the example pack
- bind point IDs to scene nodes
- confirm IDs match `MapPoint.csv`

### Out of scope

- enemy AI polish
- final camera work
- final UI layout
- advanced map system

## Required map points

```text
player_spawn_city
enemy_spawn_left
enemy_spawn_right
```

## Suggested scene structure

```text
GameRoot
MapRoot
SpawnPoints
  player_spawn_city
  enemy_spawn_left
  enemy_spawn_right
EnemyRoot
UIRoot
```

## Acceptance criteria

- Every required map point has a matching scene node or component binding.
- Map point IDs match `MapPoint.csv` exactly.
- Spawn systems can request positions through the registry.
- No spawn rule depends only on raw hardcoded scene coordinates.

## QA notes

QA should deliberately check for typos such as:

```text
enemy_spawn_left
enemy-spawn-left
enemySpawnLeft
```

Only the configured ID should pass.
