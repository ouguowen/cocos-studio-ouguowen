# Scripts Placement Guide

Use this guide when copying reference stubs into a Cocos Creator 3.8.8 project.

## Target folder

```text
assets/scripts/attack-defense-city/
```

## Files to place

```text
AttackDefenseCityBootstrap.ts
MapPointComponent.ts
MapPointRegistry.ts
EnemyPrefabRegistry.ts
LevelRuntimeFacade.ts
```

## Source reference folder

```text
examples/attack-defense-city/cocos-reference-stub/
```

## Placement rule

Copy or adapt the reference stubs into the target folder.

Do not treat the reference stubs as production-ready code.

## Inspector binding rule

Only `Component` scripts need to be attached in the Cocos editor.

Attach:

```text
AttackDefenseCityBootstrap
MapPointComponent
```

Do not attach plain helper classes:

```text
MapPointRegistry
EnemyPrefabRegistry
LevelRuntimeFacade
```

## First compile check

After copying scripts into Cocos Creator:

- wait for Cocos to compile scripts
- fix import path errors
- confirm the components appear in the inspector
