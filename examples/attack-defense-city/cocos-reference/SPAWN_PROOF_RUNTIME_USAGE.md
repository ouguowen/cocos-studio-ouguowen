# Spawn Proof Runtime Usage

This guide explains how to use `CityBattleSpawnProofRuntime.ts` inside a real Cocos Creator 3.8.8 project.

It proves only first-wave placeholder spawning. It does not prove movement, combat, objective updates, result screens, or first playable completion.

## Prerequisites

The previous proof must already pass:

```text
Local Cocos preview + runtime config load + generated config parsing proof passed.
```

Expected previous console result:

```text
[CityBattleRuntime] Config summary: levels=1, waves=2, spawns=2, objectives=1
```

## Copy target

Copy:

```text
examples/attack-defense-city/cocos-reference/CityBattleSpawnProofRuntime.ts
```

into the local Cocos project:

```text
assets/scripts/attack-defense-city/CityBattleSpawnProofRuntime.ts
```

## Scene target

Use the existing proof scene:

```text
scene_city_battle
```

Required hierarchy:

```text
scene_city_battle
  Canvas
    Camera
    HUD_Root
    Result_Root
  GameRoot
    MapRoot
    SpawnPoints
    BasePoint
    EnemyRoot
    ProjectileRoot
    RuntimeRoot
```

## Component target

Use either approach:

### Option A: Replace current runtime component

Remove the previous `CityBattleRuntime` component from:

```text
GameRoot/RuntimeRoot
```

Then add:

```text
CityBattleSpawnProofRuntime
```

### Option B: Use a separate proof node

Create:

```text
GameRoot/RuntimeRoot/SpawnProofRuntime
```

Attach:

```text
CityBattleSpawnProofRuntime
```

Keep the old runtime disabled while testing this proof to avoid duplicate logs.

## Required bindings

Bind these fields:

```text
enemyRoot -> GameRoot/EnemyRoot
spawnPoints -> GameRoot/SpawnPoints
basePoint -> GameRoot/BasePoint
enemyPrefab -> assets/prefabs/enemies/Enemy_Placeholder.prefab
levelConfigPath -> config/attack-defense-city/level-config
spawnOnlyProof -> true
```

## Expected console proof

A successful run should show:

```text
[CityBattleSpawnProofRuntime] module loaded
[CityBattleSpawnProofRuntime] onLoad
[CityBattleSpawnProofRuntime] onEnable
[CityBattleSpawnProofRuntime] start
[CityBattleSpawnProofRuntime] binding check
enemyRoot: EnemyRoot
spawnPoints: SpawnPoints
basePoint: BasePoint
enemyPrefab: Enemy_Placeholder
levelConfigPath: config/attack-defense-city/level-config
[CityBattleSpawnProofRuntime] Level config loaded
[CityBattleSpawnProofRuntime] Config summary: levels=1, waves=2, spawns=2, objectives=1
[CityBattleSpawnProofRuntime] Spawn table count: 2
[CityBattleSpawnProofRuntime] Spawned SpawnedEnemy_001 at x=-120, y=0
[CityBattleSpawnProofRuntime] Spawned SpawnedEnemy_002 at x=-60, y=0
[CityBattleSpawnProofRuntime] Spawned enemy count: 2
[CityBattleSpawnProofRuntime] Spawn-only proof complete. Movement, combat, objective state, and result path are intentionally not implemented here.
```

## Expected hierarchy proof

After preview starts, the runtime hierarchy or provider dump should show:

```text
GameRoot
  EnemyRoot
    SpawnedEnemy_001
    SpawnedEnemy_002
```

If only console proof is available and no hierarchy or screenshot proof is captured, mark the result as `PARTIAL PASS`.

## Allowed claim

```text
First wave spawn proof passed.
```

Only use this claim after console plus hierarchy or visual proof exists.

## Forbidden claims

Do not claim:

```text
Enemies move correctly.
Combat works.
Objective state updates.
The result screen works.
First playable is complete.
```
