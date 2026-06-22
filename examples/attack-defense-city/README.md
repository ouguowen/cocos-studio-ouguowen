# Attack Defense City Example Pack

This is a modern city attack-defense example pack for proving the AI Game Studio workflow.

It is not the user's final game project. It is a reference example that connects design intent, config data, Cocos integration notes, reference stubs, setup guides, demo skeleton docs, and local execution proof.

## Purpose

Use this example pack to test the config validation/export pipeline, then map the validated data into a Cocos Creator 3.8.8 MVP loop.

## Recommended reading groups

### 1. Design

- `design/GAME_BRIEF.md`
- `design/MINI_GDD.md`
- `design/ACCEPTANCE_CRITERIA.md`
- `quick-prototype/COCOS_QUICK_PROTOTYPE_TRANSCRIPT.md`

### 2. Config and validation

- `level-config/*.csv`
- `validation/EXPECTED_OUTPUTS.md`
- `validation/PASS_FAIL_EXAMPLES.md`

### 3. Cocos integration

- `cocos-integration/CONFIG_TO_RUNTIME_MAPPING.md`
- `cocos-integration/SCENE_PREFAB_BINDING_GUIDE.md`
- `cocos-reference-stub/README.md`
- `cocos-setup-guide/COCOS_CREATOR_SETUP_GUIDE.md`
- `cocos-demo-skeleton/README.md`
- `cocos-demo-productionization/CODEX_HANDOFF_PROMPT.md`
- `local-cocos-execution/README.md`

### 4. Agent workflow

- `agent-handoff/FULL_HANDOFF_CHAIN.md`
- `dev-stories/STORY_001_CONFIG_PIPELINE.md`
- `dev-stories/STORY_002_SCENE_POINT_BINDING.md`
- `dev-stories/STORY_003_WAVE_SPAWN_OBJECTIVE_LOOP.md`
- `dev-stories/STORY_004_RESULT_REWARD_FLOW.md`

## Run validation

From the repository root:

```bash
npm run validate:example
npm run export:example
npm run types:example
npm run check
```

## First Cocos target

```text
Load city_001
-> bind configured map points
-> create configured placeholder actors
-> update objective state
-> show result path
-> grant configured reward
```

## Current status

This example pack provides references, guides, checklists, and local execution templates.

It is not yet a verified Cocos Creator project with real `.scene` and `.prefab` assets.
