# Cocos Quick Prototype Transcript — Attack Defense City Example Pack

This transcript shows how a beginner can run `cocos-quick-prototype` without asking AI to build the whole game at once.

## User prompt

```text
Use $cocos-studio-ouguowen.
Run cocos-quick-prototype for the Attack Defense City example pack.
Keep it small and only prove one playable level loop.
```

## Expected AI response shape

### Current mode

```text
Production mode: Fast MVP Prototype
Active Agent: cocos-solo-dev — Cocos Solo Dev（单人开发模式 / 一人工作室操作员）
Current command: cocos-quick-prototype
```

### Prototype goal

```text
Prove that one configured level can load, bind map points, start waves, spawn placeholder enemies, track the objective, show result, and grant reward.
```

### Minimum systems

- ConfigManager
- LevelBuilder
- LevelRuntime
- MapPointRegistry
- LevelFlowController
- WaveSystem
- SpawnSystem
- ObjectiveSystem
- RewardSystem

### Placeholder asset rule

Use placeholder prefabs and simple UI text first.

The prototype should not wait for final art, final animation, final VFX, monetization, account systems, or live operations.

### Required config

- `Level.csv`
- `Wave.csv`
- `Spawn.csv`
- `EnemyGroup.csv`
- `Enemy.csv`
- `Map.csv`
- `MapPoint.csv`
- `Reward.csv`

### Success criteria

- `npm run check` passes.
- Cocos scene has matching map-point nodes.
- `city_001` can be selected as a test level.
- Placeholder enemies appear from configured points.
- Objective progress can be observed.
- Result/reward flow can be reached.

### Kill criteria

Stop and repair instead of expanding scope if:

- config validation fails
- scene point IDs do not match config point IDs
- enemy prefabs cannot be resolved even as placeholders
- UI becomes the only place where gameplay truth exists
- the prototype starts adding non-MVP systems

### Next handoff

```text
cocos-architect -> cocos-dev
```

Required artifact before development:

```text
A short dev story describing which Cocos scene nodes, prefabs, and runtime systems must be wired for `city_001`.
```
