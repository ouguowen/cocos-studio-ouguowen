# Scene Node Checklist

Use this checklist when creating the first Cocos scene for the Attack Defense City example pack.

## Required scene

- [ ] Scene exists: `scene_city_battle`
- [ ] Scene is saved in the project
- [ ] Scene can run without missing asset errors

## Required root nodes

- [ ] `Canvas`
- [ ] `GameRoot`
- [ ] `MapRoot`
- [ ] `SpawnPoints`
- [ ] `EnemyRoot`
- [ ] `UIRoot`

## Required point nodes

- [ ] `player_spawn_city`
- [ ] `enemy_spawn_left`
- [ ] `enemy_spawn_right`

## Required components

- [ ] `MapPointComponent` is attached to `player_spawn_city`
- [ ] `MapPointComponent` is attached to `enemy_spawn_left`
- [ ] `MapPointComponent` is attached to `enemy_spawn_right`
- [ ] `AttackDefenseCityBootstrap` is attached to `GameRoot`

## Required script bindings

- [ ] `mapPoints` contains all three point components
- [ ] `enemyScoutPrefab` is assigned
- [ ] `enemyRaiderPrefab` is assigned
- [ ] `enemyRoot` is assigned

## Required ID match

- [ ] `player_spawn_city` exactly matches config
- [ ] `enemy_spawn_left` exactly matches config
- [ ] `enemy_spawn_right` exactly matches config

## Common failure cases

- [ ] Node exists but point ID is empty
- [ ] Node name is correct but point ID is different
- [ ] Prefab is created but not assigned to bootstrap
- [ ] Bootstrap is attached to the wrong node
- [ ] UI tries to own gameplay truth instead of displaying runtime state
