# Attack Defense City Example Pack

This is a modern city attack-defense example pack for proving the AI Game Studio workflow.

It is not the user's final game project. It exists to show how design intent, level config, Cocos integration notes, Agent handoff examples, and validation expectations fit together.

## Purpose

Use this example pack to test the level config validation and export pipeline, then map the validated data into a Cocos Creator 3.8.8 MVP loop.

## Recommended reading order

1. `design/GAME_BRIEF.md`
2. `design/MINI_GDD.md`
3. `design/ACCEPTANCE_CRITERIA.md`
4. `quick-prototype/COCOS_QUICK_PROTOTYPE_TRANSCRIPT.md`
5. `level-config/*.csv`
6. `cocos-integration/CONFIG_TO_RUNTIME_MAPPING.md`
7. `cocos-integration/SCENE_PREFAB_BINDING_GUIDE.md`
8. `agent-handoff/FULL_HANDOFF_CHAIN.md`
9. `validation/EXPECTED_OUTPUTS.md`
10. `validation/PASS_FAIL_EXAMPLES.md`

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
- One player/base spawn point
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
