# Scene Assembly Checklist

Use this checklist when assembling the first Cocos scene.

## Scene file

- [ ] Create `scene_city_battle.scene`
- [ ] Save it under `assets/scenes/`

## Root nodes

- [ ] `Canvas`
- [ ] `GameRoot`
- [ ] `MapRoot`
- [ ] `SpawnPoints`
- [ ] `EnemyRoot`
- [ ] `UIRoot`

## Spawn point nodes

Create these under `SpawnPoints`:

- [ ] `player_spawn_city`
- [ ] `enemy_spawn_left`
- [ ] `enemy_spawn_right`

## Components

- [ ] Add `AttackDefenseCityBootstrap` to `GameRoot`
- [ ] Add `MapPointComponent` to `player_spawn_city`
- [ ] Add `MapPointComponent` to `enemy_spawn_left`
- [ ] Add `MapPointComponent` to `enemy_spawn_right`

## Inspector fields

`AttackDefenseCityBootstrap`:

- [ ] `mapPoints` includes all three map points
- [ ] `enemyScoutPrefab` assigned
- [ ] `enemyRaiderPrefab` assigned
- [ ] `enemyRoot` assigned

`MapPointComponent`:

- [ ] `player_spawn_city` pointId = `player_spawn_city`
- [ ] `enemy_spawn_left` pointId = `enemy_spawn_left`
- [ ] `enemy_spawn_right` pointId = `enemy_spawn_right`

## First run check

- [ ] No missing point error
- [ ] No missing prefab error
- [ ] Console logs that `city_001` started

## Do not advance if

- [ ] point IDs do not match config
- [ ] prefabs are missing
- [ ] bootstrap is attached to the wrong node
- [ ] UI owns gameplay truth
