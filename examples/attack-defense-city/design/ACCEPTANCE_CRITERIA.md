# Attack Defense City — Acceptance Criteria

Use this file to decide whether the example is ready for a Cocos MVP implementation story.

## Config acceptance

- `npm run validate:example` passes.
- `npm run export:example` produces runtime JSON.
- Every enabled level references an existing map, reward, wave group, and objective group.
- Every spawn references an existing wave, map point, and enemy group.
- Every enemy group references an existing enemy.

## Cocos integration acceptance

- The Cocos scene has a player/base node matching `player_spawn_city`.
- The scene has enemy spawn nodes matching `enemy_spawn_left` and `enemy_spawn_right`.
- Spawn points are registered through a map-point component or registry.
- Enemy prefab IDs in config map to real prefab references or placeholder prefabs.
- Level flow can call wave, spawn, objective, result, and reward systems without UI owning gameplay truth.

## Playtest acceptance

A test player can answer these questions after one run:

1. Where do enemies come from?
2. What is the goal?
3. What counts as success?
4. What counts as failure?
5. What reward is received?

## QA gate

The example is blocked if:

- config validation fails
- map points are not connected to scene nodes
- UI contains the only gameplay truth
- enemies spawn from hardcoded scene coordinates instead of map point data
- rewards are granted directly from UI instead of a reward pipeline or explicit result flow
