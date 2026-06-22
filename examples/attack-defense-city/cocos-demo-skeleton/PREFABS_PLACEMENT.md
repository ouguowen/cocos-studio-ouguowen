# Prefabs Placement Guide

Use this guide when creating placeholder prefabs for the first Cocos demo skeleton.

## Target folder

```text
assets/prefabs/enemies/
```

## Required placeholder prefabs

```text
prefab_enemy_scout.prefab
prefab_enemy_raider.prefab
```

## Naming rule

The prefab file name should match the config prefab ID.

Config IDs:

```text
prefab_enemy_scout
prefab_enemy_raider
```

Prefab files:

```text
prefab_enemy_scout.prefab
prefab_enemy_raider.prefab
```

## First placeholder rule

A placeholder prefab can be simple.

It only needs:

- visible sprite or block
- readable size
- different appearance for each enemy type
- no final animation required
- no final VFX required

## Binding rule

Assign prefabs in `AttackDefenseCityBootstrap` inspector fields:

```text
enemyScoutPrefab -> prefab_enemy_scout
enemyRaiderPrefab -> prefab_enemy_raider
```

## QA rule

The first demo is blocked if a prefab exists in the project but is not assigned to the bootstrap component.
