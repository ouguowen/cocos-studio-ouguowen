# Config To Runtime Mapping

This file explains which runtime system should consume each example config table.

## Mapping table

| Config table | Runtime consumer | Purpose |
|---|---|---|
| `Level.csv` | `LevelBuilder`, `LevelRuntime` | Selects template, map, wave group, objective group, reward, difficulty, and enabled state. |
| `LevelTemplate.csv` | `LevelBuilder`, `LevelFlowController` | Provides default UI, camera, spawn, lose-condition, and time-limit rules. |
| `LevelObjective.csv` | `ObjectiveSystem` | Defines required level objectives. |
| `Wave.csv` | `WaveSystem` | Defines wave order, delay, and next-wave rule. |
| `Spawn.csv` | `SpawnSystem` | Defines spawn time, map point, enemy group, count, interval, and spawn rule. |
| `EnemyGroup.csv` | `SpawnSystem`, `EnemyFactory` | Resolves which enemy entries are spawned by a spawn row. |
| `Enemy.csv` | `EnemyFactory`, `EnemyActor` | Defines enemy prefab ID, HP, attack, speed, AI type, and drop hook. |
| `Map.csv` | `MapPointRegistry`, scene loader | Selects scene ID, player spawn point, camera rule, BGM, and boundary. |
| `MapPoint.csv` | `MapPointRegistry`, `MapPointComponent` | Connects config point IDs to scene coordinates or scene nodes. |
| `Reward.csv` | `RewardSystem`, `RewardGrantPipeline` | Defines gold, exp, drop group, and first-clear hook. |

## Runtime order

Recommended flow:

```text
ConfigManager loads generated config
-> LevelBuilder builds runtime bundle
-> LevelRuntime stores active state
-> MapPointRegistry binds scene points
-> LevelFlowController starts level
-> WaveSystem starts waves
-> SpawnSystem creates enemies via EnemyFactory
-> ObjectiveSystem tracks required objectives
-> LevelResultRecorder records result
-> RewardGrantPipeline grants reward
```

## Cocos rule

Do not let scene nodes or UI own the core gameplay truth.

Scene nodes can present, route, and bind data.
Runtime systems own level state, wave state, objective state, and reward flow.

## Example point IDs

The example uses these map points:

- `player_spawn_city`
- `enemy_spawn_left`
- `enemy_spawn_right`

The scene should contain matching nodes or components.
