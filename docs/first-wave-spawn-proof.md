# First Wave Spawn Proof Guide

Use this guide after local Cocos preview, component lifecycle, config load, and generated config parsing have already passed.

This guide proves only one narrow gameplay behavior:

```text
read config.tables.spawn
-> instantiate Enemy_Placeholder
-> parent spawned enemies under GameRoot/EnemyRoot
-> log spawned enemy count
-> show visible placeholder nodes in browser preview
```

It does not prove a full first playable game loop.

## Prerequisite proof

Do not start this guide until the previous local proof has passed:

```text
Local Cocos preview + runtime config load + generated config parsing proof passed.
```

Required previous console proof:

```text
[CityBattleRuntime] Config summary: levels=1, waves=2, spawns=2, objectives=1
```

Required previous scene bindings:

```text
Node: GameRoot/RuntimeRoot
Component: CityBattleRuntime
Bindings:
- enemyRoot -> GameRoot/EnemyRoot
- spawnPoints -> GameRoot/SpawnPoints
- basePoint -> GameRoot/BasePoint
- enemyPrefab -> assets/prefabs/enemies/Enemy_Placeholder.prefab
- levelConfigPath -> config/attack-defense-city/level-config
```

## Scope

Allowed in this proof:

- parse `config.tables.spawn`
- instantiate one or more enemy placeholder prefabs
- parent enemies under `EnemyRoot`
- set simple placeholder positions
- log exact spawn count
- show visible placeholder nodes in browser preview
- return PASS / FAIL / BLOCKED proof

Forbidden in this proof:

- full pathfinding
- enemy movement
- combat damage
- base HP deduction
- win/loss result screen
- economy rewards
- UI production
- animation/VFX polish
- mobile packaging
- claiming first playable completion

## Expected data shape

The generated config has the `common-wave-spawn-v1` shape:

```text
config.tables.level
config.tables.wave
config.tables.spawn
config.tables.levelObjective
```

For the current `attack-defense-city` baseline, expected counts are:

```text
levels=1
waves=2
spawns=2
objectives=1
```

## Minimal runtime behavior

The proof may use simple positions if map-point resolution is not implemented yet.

Acceptable placeholder rule:

```text
spawn index 0 -> x = -120, y = 0
spawn index 1 -> x = -60, y = 0
spawn index N -> x = -120 + N * 60, y = 0
```

This is not final gameplay positioning. It is only a visual proof that prefab instantiation works.

## Required code behavior

`CityBattleRuntime` or a dedicated proof script must:

1. Load `level-config` through `resources.load()`.
2. Read `config.tables.spawn`.
3. Validate that the value is an array.
4. Instantiate `enemyPrefab` once per spawn record, or instantiate only the first spawn if the proof is intentionally limited.
5. Parent spawned nodes under `enemyRoot`.
6. Name spawned nodes with a visible index, for example:

```text
SpawnedEnemy_001
SpawnedEnemy_002
```

7. Log:

```text
[CityBattleRuntime] Spawn table count: 2
[CityBattleRuntime] Spawned enemy count: 2
```

8. If no enemy is spawned, return a clear blocker or fail message.

## Required browser console proof

A PASS requires console output equivalent to:

```text
[CityBattleRuntime] module loaded
[CityBattleRuntime] onLoad
[CityBattleRuntime] onEnable
[CityBattleRuntime] start
[CityBattleRuntime] Level config loaded
[CityBattleRuntime] Config summary: levels=1, waves=2, spawns=2, objectives=1
[CityBattleRuntime] Spawn table count: 2
[CityBattleRuntime] Spawned enemy count: 2
```

## Required scene or visual proof

A PASS should include at least one of:

```text
Browser preview screenshot showing placeholder enemies
Cocos hierarchy showing SpawnedEnemy_001 under GameRoot/EnemyRoot
Provider screenshot or hierarchy dump showing spawned enemy nodes
Console proof plus hierarchy proof from automation provider
```

If no visual proof is possible, console-only proof may be marked `PARTIAL PASS`, not full PASS.

## PASS criteria

Return `PASS` only when all are true:

- Previous config proof passed.
- `enemyPrefab` binding exists.
- `config.tables.spawn` is read correctly.
- At least one placeholder enemy is instantiated.
- Spawned enemy count is logged.
- Spawned enemy is parented under `EnemyRoot`.
- Preview does not crash.
- Visual or hierarchy proof is available.

## FAIL criteria

Return `FAIL` when:

- `enemyPrefab` is missing.
- `enemyRoot` is missing.
- `config.tables.spawn` is missing or not an array.
- Instantiate fails.
- Preview crashes.
- Console has blocking runtime errors.

## BLOCKED criteria

Return `BLOCKED` when:

- The user has not completed the previous config proof.
- Local Cocos Creator is not available.
- Automation provider cannot edit the scene or run preview.
- Proof cannot be collected.
- The required prefab cannot be located or created.

## Proof report template

```text
Status: PASS / PARTIAL PASS / FAIL / BLOCKED
Cocos Creator version:
Scene:
Runtime component:
Config summary:
Spawn table count:
Spawned enemy count:
EnemyRoot hierarchy proof:
Browser preview proof:
Console errors:
Remaining blockers:
Allowed final claim:
Forbidden claims:
```

## Allowed final claim

After this proof passes, the allowed claim is:

```text
First wave spawn proof passed.
```

Do not claim:

```text
Enemies move correctly.
Combat works.
Objective state updates.
The battle loop is playable.
First playable is complete.
```

## Recommended next stage

After this proof passes, the next proof stage should be:

```text
Enemy route movement proof
```

That stage must be created as its own dev-ready story before implementation.
