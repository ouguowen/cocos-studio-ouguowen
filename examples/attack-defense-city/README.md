# Attack Defense City Example Pack

This is a modern city attack-defense example pack for proving the AI Game Studio workflow.

It is not the user's final game project. It exists to show how design intent, level config, Cocos integration notes, Agent handoff examples, validation expectations, scoped Cocos Dev Stories, Cocos reference stubs, Cocos setup checklists, and a demo skeleton fit together.

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
13. `cocos-demo-skeleton/README.md`
14. `cocos-demo-skeleton/PROJECT_STRUCTURE.md`
15. `cocos-demo-skeleton/SCRIPTS_PLACEMENT.md`
16. `cocos-demo-skeleton/PREFABS_PLACEMENT.md`
17. `cocos-demo-skeleton/SCENE_ASSEMBLY_CHECKLIST.md`
18. `cocos-demo-skeleton/RUNNABLE_DEMO_QA_GATE.md`
19. `agent-handoff/FULL_HANDOFF_CHAIN.md`
20. `dev-stories/STORY_001_CONFIG_PIPELINE.md`
21. `dev-stories/STORY_002_SCENE_POINT_BINDING.md`
22. `dev-stories/STORY_003_WAVE_SPAWN_OBJECTIVE_LOOP.md`
23. `dev-stories/STORY_004_RESULT_REWARD_FLOW.md`
24. `validation/EXPECTED_OUTPUTS.md`
25. `validation/PASS_FAIL_EXAMPLES.md`

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

## Demo skeleton

The `cocos-demo-skeleton/` folder provides a target Cocos project structure and QA gate for turning the example pack into a real importable demo skeleton.
