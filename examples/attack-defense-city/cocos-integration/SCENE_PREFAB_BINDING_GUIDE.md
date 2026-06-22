# Cocos Creator 3.8.8 Scene And Prefab Binding Guide

This guide explains how to connect the attack-defense city config to a Cocos Creator scene.

## Scene target

Recommended scene name:

```text
scene_city_battle
```

The example `Map.csv` references:

```text
scene_id = scene_city_battle
```

## Minimum scene nodes

Create these nodes in the gameplay scene:

```text
Canvas
GameRoot
MapRoot
SpawnPoints
  player_spawn_city
  enemy_spawn_left
  enemy_spawn_right
EnemyRoot
UIRoot
```

## Map point binding

Each spawn point should be connected to config by ID.

Recommended component:

```ts
MapPointComponent
```

Suggested fields:

```ts
pointId: string
pointType: string
```

Example node bindings:

| Node name | Config point ID | Type |
|---|---|---|
| `player_spawn_city` | `player_spawn_city` | `player_spawn` |
| `enemy_spawn_left` | `enemy_spawn_left` | `enemy_spawn` |
| `enemy_spawn_right` | `enemy_spawn_right` | `enemy_spawn` |

## Prefab binding

Enemy config uses prefab IDs:

- `prefab_enemy_scout`
- `prefab_enemy_raider`

During MVP, these may point to placeholder prefabs.

Recommended prefab folders:

```text
assets/prefabs/enemies/prefab_enemy_scout.prefab
assets/prefabs/enemies/prefab_enemy_raider.prefab
```

## UI binding

Minimum UI elements:

- wave text
- objective text
- result panel
- reward text

The UI should read runtime state and display it.
The UI should not be the owner of wave rules, objective rules, or reward rules.

## First playable wiring checklist

- Scene ID matches `Map.csv`.
- Map point node names or component IDs match `MapPoint.csv`.
- Enemy prefab IDs resolve through a resource manifest or temporary prefab map.
- Level flow starts from `city_001`.
- Wave system reads `wg_city_001`.
- Spawn system uses map points, not hardcoded coordinates.
- Objective system tracks `obj_city_001`.
- Result flow grants `reward_city_001`.
