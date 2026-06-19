# Level Data Models

Use this file before designing level CSVs, JSON files, spreadsheets, editor data, or procedural content rules.

## Core principle

There is no universal level CSV that fits every game.

The professional workflow is:

1. classify the game and content production pattern
2. choose a data model family
3. design tables around that model
4. define validation before mass content entry

CSV is only a carrier. The model matters more than the file format.

## Selection questions

Ask these before designing tables:

- Is the level hand-authored, template-authored, pool-generated, or procedural?
- Is the main content wave, room, puzzle, platform segment, quest, dialogue, economy, or world exploration?
- Does the player progress linearly, branch, loop, or roam?
- Does the designer tune enemies, timing, positions, objectives, mechanisms, rewards, or narrative states?
- Is randomness allowed, and if yes, must it be seedable and reproducible?
- Does the level need editor-authored scene data, spreadsheet-authored data, or both?

## Model families

## 1. Wave Spawn Model

Use for:

- survival games
- arena combat
- tower defense
- top-down shooters
- roguelite combat rooms
- casual combat stages

Core tables:

- `Level.csv`
- `LevelTemplate.csv`
- `LevelObjective.csv`
- `Wave.csv`
- `Spawn.csv`
- `EnemyGroup.csv`
- `Enemy.csv`
- `Map.csv`
- `MapPoint.csv`
- `Reward.csv`

Optional tables:

- `Formation.csv`
- `StarRule.csv`
- `DropGroup.csv`
- `LevelModifier.csv`

Main ownership:

- Lead Designer owns intent and balance.
- Level Designer owns wave and placement content.
- Gameplay Programmer owns runtime execution.
- Lead Programmer owns schema and validation pipeline.

Avoid when:

- the level is primarily puzzle state, branching quest logic, or authored traversal rhythm.

## 2. Puzzle Mechanism Model

Use for:

- puzzle games
- escape-room style games
- mechanism-heavy levels
- logic-grid levels
- state-machine interaction levels

Core tables:

- `PuzzleLevel.csv`
- `PuzzleObject.csv`
- `PuzzleState.csv`
- `PuzzleTrigger.csv`
- `PuzzleCondition.csv`
- `PuzzleAction.csv`
- `PuzzleHint.csv`
- `PuzzleReward.csv`

Key idea:

- A puzzle is not a wave sequence. It is a graph of objects, states, triggers, conditions, and actions.

Validation must check:

- unreachable states
- missing trigger targets
- circular state changes without exit
- hints pointing to missing objects
- solved condition exists

Avoid when:

- the content is mostly combat timing or enemy placement.

## 3. Platform Segment Model

Use for:

- platformers
- runners
- rhythm traversal games
- obstacle-course games

Core tables:

- `Level.csv`
- `Segment.csv`
- `SegmentSequence.csv`
- `Obstacle.csv`
- `Pickup.csv`
- `Checkpoint.csv`
- `CameraTrack.csv`
- `DifficultyCurve.csv`

Key idea:

- The level is a sequence of traversal segments with rhythm, obstacle density, pickup placement, and camera behavior.

Validation must check:

- impossible jumps
- checkpoint spacing
- obstacle density spikes
- camera occlusion risk
- pickup paths that pull the player into unfair danger

Avoid when:

- the level is mostly free-form exploration or room selection.

## 4. Roguelite Room Pool Model

Use for:

- roguelites
- dungeon crawlers
- room-based action games
- replayable small-run games

Core tables:

- `RunRule.csv`
- `RoomPool.csv`
- `Room.csv`
- `RoomTag.csv`
- `RoomConnection.csv`
- `EncounterPool.csv`
- `RewardPool.csv`
- `ModifierPool.csv`
- `SeedRule.csv`

Key idea:

- The designer authors rooms and pools, while runtime generation assembles a valid run.

Validation must check:

- room connection compatibility
- tag constraints
- required room counts
- reward economy limits
- seed reproducibility

Avoid when:

- the game depends on a fixed authored level order.

## 5. Quest Driven Model

Use for:

- RPGs
- narrative games
- NPC-driven adventure games
- games with branching objectives

Core tables:

- `Quest.csv`
- `QuestStep.csv`
- `Objective.csv`
- `Dialogue.csv`
- `NPC.csv`
- `Trigger.csv`
- `Condition.csv`
- `Reward.csv`
- `WorldState.csv`

Key idea:

- The level is not only a map. It is a chain or graph of objectives, world states, NPC interactions, and narrative gates.

Validation must check:

- unreachable quest steps
- missing dialogue ids
- broken condition references
- reward duplication
- blocked progression states

Avoid when:

- the content is only enemy waves and rewards.

## 6. Exploration Region Model

Use for:

- metroidvania-style maps
- exploration games
- large authored maps
- non-linear progression games

Core tables:

- `Region.csv`
- `Area.csv`
- `Gate.csv`
- `AbilityGate.csv`
- `Pickup.csv`
- `RouteHint.csv`
- `Checkpoint.csv`
- `Encounter.csv`
- `MapReveal.csv`

Key idea:

- Progress is controlled by spatial gates, abilities, route discovery, and backtracking.

Validation must check:

- hard progression locks
- required ability availability
- unreachable pickups
- missing checkpoints after difficulty spikes
- map reveal consistency

Avoid when:

- content is short, linear, and parameter-driven.

## 7. Endless Generator Model

Use for:

- endless runners
- endless survival
- endless merge or casual games
- procedural arcade loops

Core tables:

- `GeneratorRule.csv`
- `SegmentPool.csv`
- `SpawnRule.csv`
- `DifficultyCurve.csv`
- `RewardCurve.csv`
- `EventPool.csv`
- `SafetyRule.csv`

Key idea:

- The designer defines generation grammar, pools, curves, and safety constraints, not a fixed sequence of levels.

Validation must check:

- impossible generated states
- curve spikes
- incompatible segment joins
- reward inflation
- seed replay support when needed

Avoid when:

- every level must be fixed and handcrafted.

## 8. Economy Challenge Model

Use for:

- management games
- idle games
- tycoon loops
- resource puzzle stages

Core tables:

- `Challenge.csv`
- `ResourceRule.csv`
- `ProductionRule.csv`
- `CostCurve.csv`
- `UpgradeRule.csv`
- `Objective.csv`
- `Reward.csv`

Key idea:

- The level is a resource and progression scenario, not a spatial or wave layout.

Validation must check:

- impossible cost curves
- runaway economy loops
- no-win states
- reward inflation
- payback time targets

Avoid when:

- the game is mostly action placement and timing.

## Hybrid models

Many commercial games use hybrids.

Examples:

- roguelite room pool + wave spawn model
- quest driven model + exploration region model
- platform segment model + endless generator model
- puzzle mechanism model + reward economy model

Hybrid rule:

- choose one primary model and one secondary model
- do not blend table families casually
- define which model owns progression, which owns moment-to-moment content

## Cocos implementation guidance

Recommended runtime layers:

- config loading owned by Lead Programmer
- schema validation owned by Lead Programmer
- gameplay interpretation owned by Gameplay Programmer
- authored content owned by Lead Designer and Level Designer
- editor placement bridge owned by Lead Programmer and Level Designer together

Recommended data flow:

```text
authored table or editor data
  -> validation
  -> normalized runtime config
  -> level builder
  -> gameplay systems
  -> view, UI, animation, VFX
```

Do not let UI, scene shell scripts, or animation assets become the primary interpreter of level rules.

## Field design rules

- Use stable ids, not direct Cocos resource paths.
- Separate config schema from config content.
- Separate authored data from runtime state.
- Prefer enums over free text.
- Add `enabled` and `notes` to production-facing tables.
- Add validation for missing ids, invalid references, circular dependencies, and impossible states.
- Keep designer-facing tables readable.
- Keep runtime-normalized data strict.

## Decision output format

When asked to design level data, respond with:

```md
## Recommended Model

## Why This Model Fits

## Tables To Start With

## Tables To Avoid For Now

## Ownership

## Validation Rules

## Cocos Runtime Flow

## Risks
```

## Professional warning

If the game type is unclear, do not design fields first. Ask or infer the content model first.
