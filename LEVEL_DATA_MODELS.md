# Level Data Models

Use this file before designing level CSVs, JSON files, spreadsheets, editor data, or procedural content rules.

## Core principle

There is no universal level CSV that fits every game.

The correct order is:

1. classify the game and the main content unit
2. choose the data model family
3. design tables around that family
4. define validation before mass content entry

CSV is only a carrier. The model matters more than the file format.

## Quick selection questions

- Is the content mainly combat waves, puzzle states, platform segments, room pools, quests, regions, endless generation, or economy scenarios?
- Is progression linear, branching, run-based, open exploration, or endless?
- Is the content hand-authored, template-authored, pool-generated, or procedural?
- Does the designer mainly tune timing, placement, state logic, traversal rhythm, objective chains, or economy variables?
- Does the runtime need spreadsheet data only, editor markers only, or both?

## Model matrix

### 1. Wave Spawn Model

Use for:

- survival games
- arena combat
- tower defense
- top-down shooters
- casual combat stages

Start with:

- `Level.csv`
- `LevelObjective.csv`
- `Wave.csv`
- `Spawn.csv`
- `EnemyGroup.csv`
- `Enemy.csv`
- `Map.csv`
- `MapPoint.csv`

Avoid when:

- the real content is puzzle state, traversal rhythm, or branching quest logic

### 2. Puzzle Mechanism Model

Use for:

- puzzle games
- escape-room style games
- mechanism-heavy levels
- state-machine interaction levels

Start with:

- `PuzzleLevel.csv`
- `PuzzleObject.csv`
- `PuzzleState.csv`
- `PuzzleTrigger.csv`
- `PuzzleCondition.csv`
- `PuzzleAction.csv`

Avoid when:

- the content is mostly combat timing or enemy placement

### 3. Platform Segment Model

Use for:

- platformers
- runners
- rhythm traversal games
- obstacle-course games

Start with:

- `Level.csv`
- `Segment.csv`
- `SegmentSequence.csv`
- `Obstacle.csv`
- `Pickup.csv`
- `Checkpoint.csv`

Avoid when:

- the game is mainly free-form exploration or room generation

### 4. Roguelite Room Pool Model

Use for:

- roguelites
- dungeon crawlers
- room-based action games
- replayable run-based games

Start with:

- `RunRule.csv`
- `RoomPool.csv`
- `Room.csv`
- `RoomConnection.csv`
- `EncounterPool.csv`
- `RewardPool.csv`
- `SeedRule.csv`

Avoid when:

- the game depends on fixed authored level order

### 5. Quest Driven Model

Use for:

- RPGs
- narrative games
- NPC-driven adventure games
- branching objective games

Start with:

- `Quest.csv`
- `QuestStep.csv`
- `Objective.csv`
- `Dialogue.csv`
- `NPC.csv`
- `Condition.csv`
- `WorldState.csv`

Avoid when:

- the content is only waves and rewards

### 6. Exploration Region Model

Use for:

- metroidvania-style maps
- exploration games
- large authored maps
- non-linear progression games

Start with:

- `Region.csv`
- `Area.csv`
- `Gate.csv`
- `AbilityGate.csv`
- `RouteHint.csv`
- `MapReveal.csv`

Avoid when:

- the content is mainly isolated short stages

### 7. Endless Generator Model

Use for:

- endless runners
- score-chasing arcade games
- endless survival loops

Start with:

- `GeneratorRule.csv`
- `ChunkPool.csv`
- `SpawnPattern.csv`
- `DifficultyCurve.csv`
- `RewardCurve.csv`

Avoid when:

- the game depends on stable hand-authored stage identity

### 8. Economy Challenge Model

Use for:

- idle games
- merge games
- management challenge stages
- economy-driven progression loops

Start with:

- `Scenario.csv`
- `ResourceRule.csv`
- `UpgradeRule.csv`
- `GoalRule.csv`
- `RewardRule.csv`

Avoid when:

- the primary challenge is movement, combat, or traversal

## Hybrid rule

Use one primary model and at most one secondary model.

Examples:

- combat exploration game: primary `Exploration Region`, secondary `Wave Spawn`
- puzzle RPG: primary `Quest Driven`, secondary `Puzzle Mechanism`
- action roguelite: primary `Roguelite Room Pool`, secondary `Wave Spawn`

Do not merge three or four model families into one first-version content pipeline.

## Ownership baseline

- Lead Designer: gameplay intent and tuning truth
- Level Designer: authored content and pacing
- Gameplay Programmer: runtime execution
- Lead Programmer: schema boundaries, validation, export pipeline
- QA Lead: content correctness and progression safety

## Validation baseline

Every chosen model must validate:

- required references exist
- progression cannot dead-end unintentionally
- disabled content is not referenced by enabled content
- randomness is reproducible when the game design requires it
- runtime-critical values stay inside project-defined limits

## Decision output format

When choosing a model, answer in this shape:

```md
# Level Data Model Decision

## Game Type
## Main Content Unit
## Progression Structure
## Primary Data Model
## Secondary Data Model
## Tables To Start With
## Tables To Avoid For Now
## Runtime Owner
## Content Owner
## Main Validation Risks
```

## Professional warning

- Do not start table design before model choice.
- Do not force wave-spawn tables onto puzzle, quest, or exploration-heavy games.
- Do not let one-off exceptions dictate the whole schema.
