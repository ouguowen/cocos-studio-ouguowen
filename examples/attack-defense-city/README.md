# Attack Defense City Example

This example is a tiny MVP seed for a modern city attack-defense game.

It now includes design intent, level config, Cocos integration notes, Agent handoff examples, and validation expectations.

## Purpose

Use it to test the level config validation and export pipeline, then map the validated data into a Cocos Creator 3.8.8 MVP loop.

## Recommended reading order

1. `design/GAME_BRIEF.md`
2. `design/MINI_GDD.md`
3. `design/ACCEPTANCE_CRITERIA.md`
4. `level-config/*.csv`
5. `cocos-integration/CONFIG_TO_RUNTIME_MAPPING.md`
6. `cocos-integration/SCENE_PREFAB_BINDING_GUIDE.md`
7. `agent-handoff/FULL_HANDOFF_CHAIN.md`
8. `validation/EXPECTED_OUTPUTS.md`

## Run validation

From the repository root:

```bash
npm run validate:example
```

## Export runtime JSON

```bash
npm run export:example
```

## Export TypeScript types

```bash
npm run types:example
```

## Run full check

```bash
npm run check
```

## MVP design

- One city map
- One player spawn point
- Two enemy spawn points
- Two enemy types
- Two waves
- One required objective: kill all enemies
- One reward

## First Cocos target

The first playable target is:

```text
Load city_001
-> bind map points
-> spawn enemy waves
-> update objective
-> show result
-> grant reward
```
