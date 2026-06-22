# Pass / Fail Validation Examples

Use this file to understand what counts as acceptable or blocked in the Attack Defense City example pack.

## PASS example: config pipeline

Status:

```text
PASS
```

Evidence:

```bash
npm run validate:example
npm run export:example
npm run validate:runtime
npm run check
```

Reason:

- config tables validate
- runtime config exports
- runtime template compiles
- GitHub Actions can run the same high-level check

## PASS example: map point binding

Status:

```text
PASS
```

Evidence:

- scene has `player_spawn_city`
- scene has `enemy_spawn_left`
- scene has `enemy_spawn_right`
- each node is registered by a map-point component or registry

Reason:

The scene can be driven by config IDs instead of hardcoded coordinates.

## FAIL example: missing map point

Status:

```text
FAIL
```

Problem:

```text
Spawn.csv references enemy_spawn_left, but the scene has no matching node or registered point.
```

Why it fails:

The spawn system cannot place enemies through the data-driven map point flow.

Repair:

- add the missing scene node, or
- correct the `map_point_id` in `Spawn.csv`, and
- re-run validation and scene binding review

## FAIL example: UI owns gameplay truth

Status:

```text
FAIL
```

Problem:

```text
The result panel decides whether the level is won.
```

Why it fails:

UI may display level state, but it should not own objective completion or reward logic.

Repair:

- move completion truth to `LevelRuntime` and `ObjectiveSystem`
- let UI read and present the result

## FAIL example: reward granted directly from button

Status:

```text
FAIL
```

Problem:

```text
A UI button directly adds gold after victory.
```

Why it fails:

Reward flow should pass through an explicit result or reward pipeline.

Repair:

- use `RewardSystem` or `RewardGrantPipeline`
- keep reward data tied to `Reward.csv`

## FAIL example: scope creep

Status:

```text
FAIL
```

Problem:

```text
The prototype starts adding ads, IAP, gacha, leaderboard, guild, cloud save, or live events.
```

Why it fails:

The example pack exists to prove one Cocos MVP loop, not to build a full commercial game stack.

Repair:

- return to one level
- use placeholders
- prove the loop first
