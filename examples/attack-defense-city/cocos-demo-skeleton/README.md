# Cocos Demo Skeleton

This folder describes a minimal Cocos Creator 3.8.8 demo skeleton for the Attack Defense City example pack.

It is still not a complete Cocos project.

Use it as a target folder layout when creating a real Cocos Creator project.

## Goal

Create a clean place for:

- scripts
- prefabs
- scenes
- generated config
- placeholder assets
- QA notes

## Recommended skeleton

```text
assets/
  scenes/
    scene_city_battle.scene
  scripts/
    attack-defense-city/
      AttackDefenseCityBootstrap.ts
      MapPointComponent.ts
      MapPointRegistry.ts
      EnemyPrefabRegistry.ts
      LevelRuntimeFacade.ts
  prefabs/
    enemies/
      prefab_enemy_scout.prefab
      prefab_enemy_raider.prefab
  resources/
    config/
      generated-level-config.json
```

## What to copy from this repository

Reference stubs live in:

```text
examples/attack-defense-city/cocos-reference-stub/
```

Copy or adapt those files into:

```text
assets/scripts/attack-defense-city/
```

## What must be created inside Cocos Creator

- `scene_city_battle.scene`
- placeholder enemy prefabs
- GameRoot node
- SpawnPoints node
- point nodes
- EnemyRoot node
- UIRoot node

## Do not claim the demo is runnable until

- the scene exists in Cocos Creator
- the scripts are copied into `assets/scripts`
- prefabs are assigned in the inspector
- map point IDs match config
- the first playable QA checklist passes
