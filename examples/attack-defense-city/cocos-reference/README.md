# Cocos Reference Assets

This folder contains copyable Cocos Creator 3.8.8 reference scripts and usage notes for the `attack-defense-city` example pack.

These files are not a complete Cocos project. They must be copied or adapted into a real local Cocos Creator project before runtime proof can be claimed.

## Files

- `CityBattleSpawnProofRuntime.ts`: spawn-only proof runtime. It loads the generated config, reads `config.tables.spawn`, instantiates `Enemy_Placeholder`, parents spawned nodes under `EnemyRoot`, and logs spawned count.
- `SPAWN_PROOF_RUNTIME_USAGE.md`: local usage guide for attaching and validating the spawn-only runtime.

## Allowed claim after local proof

```text
First wave spawn proof passed.
```

Only use this claim after browser preview plus console and hierarchy or visual proof exist.

## Forbidden claims

Do not claim:

```text
Enemies move correctly.
Combat works.
Objective state updates.
The battle loop is playable.
First playable is complete.
```
