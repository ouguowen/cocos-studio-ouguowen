# Cocos Creator 3.8.8 Setup Guide

This guide explains how a beginner can reproduce the Attack Defense City example pack inside Cocos Creator 3.8.8.

This is a setup guide, not a complete Cocos project.

## Step 1: Create or open a Cocos Creator 3.8.8 project

Recommended project type:

```text
2D game project
```

Keep the first test simple. Do not add final art, monetization, login, cloud save, or live operations during setup.

## Step 2: Create the first gameplay scene

Recommended scene name:

```text
scene_city_battle
```

This should match the example pack map data.

## Step 3: Create the minimum node tree

Create this node structure:

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

## Step 4: Add map point components

Attach `MapPointComponent` to these nodes:

| Node | pointId | pointType |
|---|---|---|
| `player_spawn_city` | `player_spawn_city` | `player_spawn` |
| `enemy_spawn_left` | `enemy_spawn_left` | `enemy_spawn` |
| `enemy_spawn_right` | `enemy_spawn_right` | `enemy_spawn` |

## Step 5: Create placeholder enemy prefabs

Create two placeholder prefabs:

```text
prefab_enemy_scout
prefab_enemy_raider
```

They can be simple colored blocks or temporary sprites.

## Step 6: Add the bootstrap component

Attach `AttackDefenseCityBootstrap` to `GameRoot`.

Bind these properties:

- `mapPoints`: the three map point components
- `enemyScoutPrefab`: `prefab_enemy_scout`
- `enemyRaiderPrefab`: `prefab_enemy_raider`
- `enemyRoot`: `EnemyRoot`

## Step 7: Run the first scene check

Start the scene and confirm:

- no missing map point error
- no missing placeholder prefab error
- console reports that `city_001` started

## Step 8: Stop before expanding scope

Do not add extra maps, extra enemy families, monetization, inventory, shop, login, or cloud save until the first wiring check passes.
