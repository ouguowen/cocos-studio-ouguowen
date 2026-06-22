# Attack Defense City Example Pack

This is a modern city attack-defense example pack for proving the AI Game Studio workflow.

It is not the user's final game project. It exists to show how design intent, level config, Cocos integration notes, Agent handoff examples, validation expectations, scoped Cocos Dev Stories, Cocos reference stubs, and Cocos setup checklists fit together.

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
8. `cocos-reference-stub/README.md`
9. `cocos-setup-guide/COCOS_CREATOR_SETUP_GUIDE.md`
10. `cocos-setup-guide/SCENE_NODE_CHECKLIST.md`
11. `cocos-setup-guide/PLACEHOLDER_PREFAB_RULES.md`
12. `cocos-setup-guide/FIRST_PLAYABLE_QA_CHECKLIST.md`
13. `agent-handoff/FULL_HANDOFF_CHAIN.md`
14. `dev-stories/STORY_001_CONFIG_PIPELINE.md`
15. `dev-stories/STORY_002_SCENE_POINT_BINDING.md`
16. `dev-stories/STORY_003_WAVE_SPAWN_OBJECTIVE_LOOP.md`
17. `dev-stories/STORY_004_RESULT_REWARD_FLOW.md`
18. `validation/EXPECTED_OUTPUTS.md`
19. `validation/PASS_FAIL_EXAMPLES.md`

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

## Dev Story order

```text
Story 001: Config pipeline proof
Story 002: Scene point binding
Story 003: Wave, spawn, objective loop
Story 004: Result and reward flow
```

## Reference stub

The `cocos-reference-stub/` folder shows a first Cocos wiring shape:

```text
MapPointComponent
MapPointRegistry
EnemyPrefabRegistry
LevelRuntimeFacade
AttackDefenseCityBootstrap
```

These files are reference stubs, not a complete Cocos Creator project.

## Cocos setup guide

The `cocos-setup-guide/` folder explains how to reproduce the reference wiring inside Cocos Creator 3.8.8 with beginner-friendly setup steps, scene-node checklist, placeholder prefab rules, and first playable QA checks.
