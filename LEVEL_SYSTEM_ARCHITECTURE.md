# Level System Architecture

Use this file when implementing a Cocos Creator 3.x level runtime from level data, CSV-derived JSON, editor-exported points, or generated config.

## Core principle

Do not build one giant `LevelManager` that owns config loading, runtime state, wave flow, spawning, objectives, rewards, UI, scene nodes, and enemy creation.

The professional minimum is to separate:

- config reading
- level building
- runtime state
- flow control
- wave progression
- spawn scheduling
- objective evaluation
- reward calculation
- map point lookup
- actor creation

## Recommended minimum modules

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
      LevelRuntime.ts
      LevelBuilder.ts
      LevelFlowController.ts
      WaveSystem.ts
      SpawnSystem.ts
      ObjectiveSystem.ts
      RewardSystem.ts
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
```

## Ownership

- `ConfigTypes.ts`: Lead Programmer
- `ConfigIndex.ts`: Lead Programmer
- `ConfigManager.ts`: Lead Programmer
- `LevelTypes.ts`: Gameplay Programmer
- `LevelRuntime.ts`: Gameplay Programmer
- `LevelBuilder.ts`: Gameplay Programmer
- `LevelFlowController.ts`: Gameplay Programmer
- `WaveSystem.ts`: Gameplay Programmer
- `SpawnSystem.ts`: Gameplay Programmer
- `ObjectiveSystem.ts`: Gameplay Programmer
- `RewardSystem.ts`: Gameplay Programmer
- `MapPointRegistry.ts`: Lead Programmer
- `MapPointComponent.ts`: Lead Programmer and Level Designer
- `EnemyFactory.ts`: Lead Programmer and Gameplay Programmer
- `EnemyActor.ts`: Gameplay Programmer
- `ResourceManifest.ts`: Lead Programmer

## Config layer

## `ConfigTypes.ts`

Purpose:

- defines generated config interfaces
- owns `LevelConfig`, `WaveConfig`, `SpawnConfig`, `EnemyConfig`, `RewardConfig`, and related config types

Rules:

- config interfaces should be readonly
- config interfaces must not contain runtime progress
- config interfaces must not reference Cocos nodes

## `ConfigIndex.ts`

Purpose:

- builds lookup maps from generated JSON
- groups rows such as waves by group and spawns by wave

Rules:

- do not put gameplay decisions here
- do not reinterpret design intent here

## `ConfigManager.ts`

Purpose:

- provides read-only config queries
- centralizes missing-config errors

Allowed:

- `getLevel`
- `getTemplate`
- `getObjectives`
- `getWaves`
- `getSpawns`
- `getEnemy`
- `getEnemyGroup`
- `getMap`
- `getMapPoints`
- `getReward`

Forbidden:

- starting levels
- spawning enemies
- deciding victory or failure
- awarding rewards

## Runtime layer

## `LevelTypes.ts`

Purpose:

- defines runtime states, events, results, and common system interfaces

Contains:

- `LevelRunState`
- `WaveRunState`
- `SpawnRunState`
- `ObjectiveRunState`
- `LevelEvent`
- `RewardResult`
- `LevelSystem`

Rules:

- do not define CSV field schemas here
- do not put Cocos component logic here

## `LevelRuntime.ts`

Purpose:

- creates and owns the current run state for one level attempt
- separates mutable runtime state from static config

Rules:

- runtime can change
- config references remain readonly
- do not store UI node references here

## `LevelBuilder.ts`

Purpose:

- converts a `levelId` plus config lookups into a `LevelRuntime`

Allowed:

- load related config through `ConfigManager`
- create objective runtime entries
- create wave and spawn runtime entries

Forbidden:

- advancing waves
- spawning enemies
- awarding rewards
- directly touching UI

## `LevelFlowController.ts`

Purpose:

- coordinates level entry, start, pause, resume, complete, fail, and exit
- starts and stops systems

Allowed:

- call `LevelBuilder`
- start `WaveSystem`, `ObjectiveSystem`, and related systems
- respond to level completion or failure

Forbidden:

- parsing raw CSV
- generating enemies directly
- owning every gameplay rule
- manipulating detailed UI nodes

## Systems

## `WaveSystem.ts`

Purpose:

- owns wave order and wave progression rules

Allowed:

- start waves
- complete waves
- check next-wave rules
- notify spawn scheduling

Forbidden:

- creating enemy prefabs
- calculating rewards
- acting as final objective authority

## `SpawnSystem.ts`

Purpose:

- owns spawn scheduling and spawn execution timing

Allowed:

- schedule spawns for a wave
- resolve map points through `MapPointRegistry`
- call `EnemyFactory`
- apply formations

Forbidden:

- loading prefabs directly when a factory or resource layer exists
- deciding victory or failure
- calculating rewards

## `ObjectiveSystem.ts`

Purpose:

- owns objective progress, completion, and failure checks

Allowed:

- listen to level events
- update objective runtime state
- report complete or failed state

Forbidden:

- awarding rewards
- directly controlling UI
- spawning enemies

## `RewardSystem.ts`

Purpose:

- owns reward result calculation and reward commit handoff

Allowed:

- calculate `RewardResult`
- handle first-clear, repeat, star, and drop-group reward composition
- pass results to player data systems

Forbidden:

- deciding economy balance
- playing reward animations
- mutating `RewardConfig`

## Scene bridge

## `MapPointRegistry.ts`

Purpose:

- stores and queries runtime map points

Allowed:

- register points
- get point by id
- get points by tag
- clear map points on level exit

Forbidden:

- deciding spawn rules
- deciding level pacing
- owning objective logic

## `MapPointComponent.ts`

Purpose:

- attaches to Cocos nodes that represent logical map points
- exposes `pointId`, `pointType`, and tags
- registers into `MapPointRegistry`

Rules:

- this can be a Cocos Component
- it should not spawn enemies itself
- it should not own gameplay rules

## Actor creation

## `EnemyFactory.ts`

Purpose:

- creates enemies from enemy config and spawn context
- owns prefab lookup, pooling, and initialization handoff

Allowed:

- create enemy actors
- release enemy actors
- preload enemy prefab families

Forbidden:

- deciding when a wave spawns
- deciding objective completion
- awarding rewards

## `EnemyActor.ts`

Purpose:

- runtime component for an enemy instance

Allowed:

- initialize from runtime data
- receive damage
- die
- emit enemy events
- reset for pooling

Forbidden:

- reading the whole level table
- deciding global reward results
- controlling level flow

## Resource manifest

## `ResourceIds.ts`

Purpose:

- defines stable resource id types

Rules:

- keep ids stable
- do not spread raw paths into gameplay configs

## `ResourceManifest.ts`

Purpose:

- maps stable ids to bundles and resource paths

Rules:

- gameplay config references ids, not direct paths
- resource ownership remains explicit

## Recommended flow

```text
LevelFlowController.enterLevel(levelId)
  -> LevelBuilder.build(levelId)
    -> ConfigManager queries generated config
  -> MapPointRegistry registers scene points
  -> ObjectiveSystem.start(runtime)
  -> WaveSystem.start(runtime)
    -> SpawnSystem schedules spawns
      -> MapPointRegistry resolves points
      -> EnemyFactory creates actors
  -> ObjectiveSystem evaluates events
  -> RewardSystem calculates result
```

## Event flow

Common events:

- `level_started`
- `wave_started`
- `enemy_spawned`
- `enemy_dead`
- `objective_updated`
- `level_completed`
- `level_failed`
- `reward_calculated`

Event rules:

- events should aid decoupling, not hide ownership
- do not turn the event bus into an untraceable rule engine
- important events should include `levelId`, time, and typed payload when practical

## Component rules

Use Cocos Components for:

- scene entry components
- actor components
- map point components
- visual presenters that need node lifecycle

Use ordinary TypeScript classes for:

- config queries
- builders
- wave logic
- spawn logic
- objective logic
- reward calculation

Rule:

- only classes that need node lifecycle or node references should be Cocos Components

## Forbidden patterns

- `LevelManager.ts` owns everything
- each level has a custom script with unique rules
- UI pages read CSV or generate enemies
- scene scripts become the actual level system
- enemy components read global level config directly
- runtime state is written back into config objects
- resource paths are scattered across level tables and gameplay code

## Review questions

Ask these before approving implementation:

1. Can config be loaded without starting a level?
2. Can a level be built without touching UI?
3. Can waves advance without knowing prefab paths?
4. Can objectives be tested without a full scene?
5. Can rewards be calculated without playing result UI?
6. Can map points be cleared and re-registered safely?
7. Is there any class that owns too many responsibilities?

## Architecture law

ConfigManager reads. LevelBuilder assembles. LevelFlowController coordinates. WaveSystem progresses. SpawnSystem schedules. ObjectiveSystem judges. RewardSystem calculates. MapPointRegistry locates. EnemyFactory creates.

No single class should replace this separation.
