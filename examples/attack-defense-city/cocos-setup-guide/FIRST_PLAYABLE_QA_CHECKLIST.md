# First Playable QA Checklist

Use this checklist before saying the Cocos setup is ready for the next implementation step.

## Config checks

- [ ] `npm run validate:example` passes
- [ ] `npm run export:example` passes
- [ ] `npm run types:example` passes
- [ ] `npm run validate:runtime` passes
- [ ] `npm run check` passes

## Cocos scene checks

- [ ] `scene_city_battle` exists
- [ ] `GameRoot` exists
- [ ] `SpawnPoints` exists
- [ ] `EnemyRoot` exists
- [ ] `UIRoot` exists

## Point binding checks

- [ ] `player_spawn_city` is registered
- [ ] `enemy_spawn_left` is registered
- [ ] `enemy_spawn_right` is registered
- [ ] ID strings match config exactly

## Prefab binding checks

- [ ] `prefab_enemy_scout` placeholder exists
- [ ] `prefab_enemy_raider` placeholder exists
- [ ] Bootstrap has prefab references assigned

## Runtime checks

- [ ] `city_001` starts through runtime code
- [ ] Runtime state owns level progress
- [ ] UI does not own win/loss truth
- [ ] Reward flow is not triggered directly by a UI button

## Stop conditions

Stop and repair if:

- [ ] a point ID is missing
- [ ] a prefab reference is missing
- [ ] runtime state is skipped
- [ ] UI becomes the owner of gameplay rules
- [ ] extra non-MVP systems are added before the first loop is proven
