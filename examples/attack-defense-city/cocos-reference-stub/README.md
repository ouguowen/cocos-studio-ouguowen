# Cocos Reference Stub — Attack Defense City Example Pack

This folder provides a reference wiring shape for the modern city attack-defense example pack.

It is not a complete Cocos Creator project.

Use it as a bridge between:

```text
level config CSV
-> generated runtime config
-> Cocos scene nodes
-> runtime systems
-> UI presenters
```

## What this stub contains

- `MapPointComponent.ts`: attach to scene nodes that represent configured map points.
- `MapPointRegistry.ts`: collects scene point nodes by config ID.
- `EnemyPrefabRegistry.ts`: maps config prefab IDs to placeholder or real prefabs.
- `AttackDefenseCityBootstrap.ts`: shows the first wiring order for `city_001`.
- `LevelRuntimeFacade.ts`: shows the runtime-facing API that Cocos scene scripts should call.

## What this stub does not contain

- full Cocos Creator project settings
- real `.scene` files
- real `.prefab` files
- final animation, VFX, SFX, or UI art
- production enemy AI
- economy balance

## Intended Cocos scene nodes

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

## First wiring order

```text
1. Load or reference generated config.
2. Bind MapPointComponent nodes into MapPointRegistry.
3. Select level_id = city_001.
4. Build level runtime state.
5. Resolve spawn points and placeholder prefabs.
6. Start the first wave flow.
7. Report objective and result state to UI presenters.
```

## Safety rule

The UI may display state, but it must not own the gameplay truth.

The runtime flow owns level state, objective state, result state, and reward flow.
