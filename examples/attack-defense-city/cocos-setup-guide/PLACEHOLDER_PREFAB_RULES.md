# Placeholder Prefab Rules

Use placeholder prefabs to prove the first playable loop before final art.

## Required placeholder prefabs

```text
prefab_enemy_scout
prefab_enemy_raider
```

## Folder recommendation

```text
assets/prefabs/enemies/prefab_enemy_scout.prefab
assets/prefabs/enemies/prefab_enemy_raider.prefab
```

## Visual rule

A placeholder prefab only needs to be readable.

Recommended first version:

- simple sprite
- clear size
- clear color difference
- no final animation required
- no final VFX required

## Naming rule

The prefab asset name should match the config prefab ID.

Good:

```text
prefab_enemy_scout
```

Avoid:

```text
EnemyScout
ScoutPrefab
enemy_scout_final_v3
```

## Binding rule

The Cocos Bootstrap should bind config IDs to prefab references:

```text
prefab_enemy_scout -> enemyScoutPrefab
prefab_enemy_raider -> enemyRaiderPrefab
```

## Scope rule

Do not create more placeholder prefabs until the first level loop passes.

First prove:

```text
load level
-> bind points
-> resolve prefabs
-> start runtime state
-> show result path
```
