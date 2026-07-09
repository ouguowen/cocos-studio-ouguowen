# Level System Architecture

Use this file when implementing a Cocos Creator 3.8.8 level runtime from level data, CSV-derived JSON, editor-exported points, or generated config.

Open [architecture/level-system-extensions.md](level-system-extensions.md) only when the game truly needs monetization, live ops, sync, social, compliance, or online-service layers.

## Core principle

Do not build one giant `LevelManager` that owns config loading, runtime state, flow control, spawning, objectives, rewards, scene nodes, UI, save writes, and enemy creation.

The professional minimum is to separate:

- config reading
- level building
- mutable runtime state
- flow control
- wave progression
- spawn scheduling
- objective evaluation
- reward calculation
- map point lookup
- actor creation
- resource loading
- object reuse
- result recording
- progression save handoff

## Recommended core layout

```text
assets/scripts/
  data/
    config/
      ConfigTypes.ts
      ConfigIndex.ts
      ConfigManager.ts

  game/
    level/
      LevelTypes.ts
      EventBus.ts
      LevelRuntime.ts
      LevelBuilder.ts
      LevelFlowController.ts
      WaveSystem.ts
      SpawnSystem.ts
      ObjectiveSystem.ts
      RewardSystem.ts
      LevelResultRecorder.ts
      RewardGrantPipeline.ts
      ProgressionSaveRepository.ts
      ProgressionSnapshotCodec.ts
      ChapterUnlockPolicy.ts
      GuideProgressStore.ts
      MapPointRegistry.ts
      MapPointComponent.ts

    enemy/
      EnemyTypes.ts
      EnemyFactory.ts
      EnemyActor.ts

  resource/
    manifest/
      ResourceIds.ts
      ResourceManifest.ts
    loader/
      ResourceLoader.ts

  core/
    pool/
      ObjectPool.ts
```

## Ownership

- `ConfigTypes.ts`, `ConfigIndex.ts`, `ConfigManager.ts`: Lead Programmer
- `LevelTypes.ts`, `LevelRuntime.ts`, `LevelBuilder.ts`, `LevelFlowController.ts`: Gameplay Programmer under Lead Programmer review
- `WaveSystem.ts`, `SpawnSystem.ts`, `ObjectiveSystem.ts`, `RewardSystem.ts`: Gameplay Programmer with Lead Designer input
- `LevelResultRecorder.ts`, `RewardGrantPipeline.ts`, `ProgressionSaveRepository.ts`, `ProgressionSnapshotCodec.ts`: Lead Programmer or Meta Systems owner
- `ChapterUnlockPolicy.ts`, `GuideProgressStore.ts`: Lead Designer plus Gameplay Programmer
- `MapPointRegistry.ts`, `MapPointComponent.ts`: Gameplay Programmer and Technical Artist
- `EnemyFactory.ts`, `EnemyActor.ts`: Gameplay Programmer with Animation and Tech Art integration review
- `ResourceIds.ts`, `ResourceManifest.ts`, `ResourceLoader.ts`, `ObjectPool.ts`: Lead Programmer

## Core responsibilities

### Config layer

- `ConfigTypes.ts`: generated types from validated source tables
- `ConfigIndex.ts`: normalized lookup maps
- `ConfigManager.ts`: read-only access to config data

### Runtime layer

- `LevelTypes.ts`: runtime contracts
- `EventBus.ts`: local gameplay event dispatch
- `LevelRuntime.ts`: mutable state for the active level
- `LevelBuilder.ts`: convert config into runtime-ready structures
- `LevelFlowController.ts`: start, pause, resume, fail, clear

### Systems

- `WaveSystem.ts`: wave order and transition
- `SpawnSystem.ts`: spawn timing and spawn rules
- `ObjectiveSystem.ts`: win and fail evaluation
- `RewardSystem.ts`: reward calculation only

### Result and progression

- `LevelResultRecorder.ts`: summarize what happened in the run
- `RewardGrantPipeline.ts`: turn results into grant intents
- `ProgressionSaveRepository.ts`: persistence boundary
- `ProgressionSnapshotCodec.ts`: save serialization
- `ChapterUnlockPolicy.ts`: unlock rules
- `GuideProgressStore.ts`: tutorial and onboarding state

### Scene bridge and actor creation

- `MapPointRegistry.ts` and `MapPointComponent.ts`: bind editor markers to runtime ids
- `EnemyFactory.ts`: create enemies from config and resources
- `EnemyActor.ts`: enemy runtime behavior

### Resources and reuse

- `ResourceIds.ts` and `ResourceManifest.ts`: ids and resource mapping
- `ResourceLoader.ts`: async loading boundary
- `ObjectPool.ts`: reusable instance lifecycle

## Recommended flow

1. Load normalized config through `ConfigManager`.
2. Build runtime-ready data with `LevelBuilder`.
3. Create `LevelRuntime` for the active session.
4. Initialize scene points through `MapPointRegistry`.
5. Start orchestration in `LevelFlowController`.
6. Let `WaveSystem`, `SpawnSystem`, and `ObjectiveSystem` drive gameplay events.
7. Resolve result data in `LevelResultRecorder`.
8. Send grant and save handoff through `RewardGrantPipeline` and `ProgressionSaveRepository`.

## Event flow

Use local events such as:

- `LEVEL_STARTED`
- `WAVE_STARTED`
- `ENEMY_SPAWNED`
- `OBJECTIVE_UPDATED`
- `LEVEL_FAILED`
- `LEVEL_CLEARED`
- `REWARD_READY`

Keep the event bus local to gameplay runtime boundaries. Do not turn it into a global dumping ground.

## Extension trigger

Open [architecture/level-system-extensions.md](level-system-extensions.md) only when one of these is true:

- the game has ads, IAP, gacha, or economy persistence
- the game has remote config, experiments, or hotfix switches
- the game has account sync, cloud save, or offline retry flows
- the game has guild, leaderboard, mail, or social graph state
- the game has moderation, compliance, anti-cheat, or operations tooling

## Forbidden patterns

- One `LevelManager` owning the whole stack
- `ConfigManager` starting levels or owning UI
- `LevelFlowController` mutating save data directly
- `RewardSystem` granting items directly into UI panels
- Spawn points identified only by scene path strings
- Raw prefab paths scattered across gameplay scripts
- Save logic hard-coded into page controllers
- Business or live-ops logic mixed into prototype-level runtime too early

## Review questions

- Is the level data model already correct for this game type?
- Is config read-only and validated before runtime use?
- Is runtime state separate from scene nodes and UI?
- Can reward, save, and unlock logic evolve without rewriting combat flow?
- Are advanced online or monetization concerns being introduced too early?
