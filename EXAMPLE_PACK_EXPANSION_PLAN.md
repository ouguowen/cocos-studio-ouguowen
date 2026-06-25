# Example Pack Expansion Plan

Use this file to expand `cocos-studio-ouguowen` from one reference example into a practical multi-game-type AI Game Studio kit without turning the skill into a bloated universal game template.

## Core principle

The skill is reusable. The selected game type is temporary.

Each MVP or sprint must choose one dominant game type. Example packs prove selected workflows; they do not redefine the identity of the whole skill.

```text
Reusable Skill
-> selected game type
-> narrow MVP
-> example pack
-> Cocos Creator 3.8.8 proof
```

## Current baseline

The current first example pack is:

```text
examples/attack-defense-city
```

Its purpose is to prove a modern city attack-defense MVP path:

```text
load city_001
-> bind configured map points
-> create configured placeholder actors
-> update objective state
-> show result path
-> grant configured reward
```

This pack is a reference example, not the user's final game and not the only game direction.

## Expansion rule

Every new example pack must include the same minimum structure:

```text
examples/<game-type-example>/
  README.md
  design/
    GAME_BRIEF.md
    MINI_GDD.md
    ACCEPTANCE_CRITERIA.md
  level-config/ or content-config/
    *.csv
  validation/
    EXPECTED_OUTPUTS.md
    PASS_FAIL_EXAMPLES.md
  cocos-integration/
    CONFIG_TO_RUNTIME_MAPPING.md
    SCENE_PREFAB_BINDING_GUIDE.md
  cocos-reference-stub/
    README.md
  cocos-demo-skeleton/
    README.md
  dev-stories/
    STORY_001_*.md
  agent-handoff/
    FULL_HANDOFF_CHAIN.md
  local-cocos-execution/
    README.md
```

If a game type does not use level-config tables, it should use `content-config/` instead of forcing every game into one universal level CSV model.

## Priority order

### P0: Finish current attack-defense proof path

Target folder:

```text
examples/attack-defense-city
```

Required next proof:

1. Run `npm run check` locally or in CI.
2. Create or open a real Cocos Creator 3.8.8 project.
3. Copy/adapt reference stubs into `assets/scripts/attack-defense-city/`.
4. Create `scene_city_battle`.
5. Create placeholder enemy/base/path prefabs.
6. Bind inspector fields.
7. Run browser preview.
8. Save proof: hierarchy, bindings, Console, preview result, screenshot, or filled proof report.

Do not call this pack runnable until the proof exists.

### P1: Card Battle Example Pack

Target folder:

```text
examples/card-battle-basic
```

MVP loop:

```text
draw small hand
-> select one card
-> resolve effect
-> enemy responds
-> check win/fail
```

Core tables or content config:

- `Card.csv`
- `Enemy.csv`
- `Encounter.csv`
- `Effect.csv`

Important boundaries:

- no gacha in MVP
- no large collection system in MVP
- no live economy before first battle loop works
- card effects must not be hidden inside UI button callbacks

### P1: Story Level Clear Example Pack

Target folder:

```text
examples/story-level-clear
```

MVP loop:

```text
enter scene
-> read objective
-> interact with one object or NPC
-> trigger story beat
-> clear or fail level
```

Core tables or content config:

- `Stage.csv`
- `Dialogue.csv`
- `Interactable.csv`
- `Objective.csv`

Important boundaries:

- no branching mega-story in MVP
- no full inventory unless required by the single objective
- story state must be separated from UI text display
- clear condition must be testable

### P1: Tower Defense Route Example Pack

Target folder:

```text
examples/tower-defense-route
```

MVP loop:

```text
place one tower
-> spawn one wave
-> enemies follow route
-> tower attacks
-> base loses hp or wave clears
```

Core tables or content config:

- `Tower.csv`
- `Enemy.csv`
- `Wave.csv`
- `Route.csv`
- `Level.csv`

Important boundaries:

- no tower upgrade tree in the first proof
- no large map editor in MVP
- route/path data must not be hard-coded in one scene script
- combat timing must have numerical validation

### P2: Merge / Collection Example Pack

Target folder:

```text
examples/merge-collection-basic
```

MVP loop:

```text
spawn item
-> merge two same-level items
-> create higher-level item
-> grant simple progress reward
```

Important boundaries:

- no full monetization economy in MVP
- no complex inventory backend
- item rules must be data-driven and validated

### P2: Idle Growth Example Pack

Target folder:

```text
examples/idle-growth-basic
```

MVP loop:

```text
generate resource
-> spend resource on one upgrade
-> increase generation
-> show progress
```

Important boundaries:

- no offline rewards until the online loop is proven
- no ad/revenue tuning before economy record exists
- numbers require legal ranges and growth curve explanation

## Acceptance gate for any new example pack

A new example pack is acceptable only when it has:

- selected game type
- one MVP loop
- explicit non-goals
- minimum config or content data
- Cocos integration mapping
- first dev story
- QA acceptance criteria
- local execution proof template
- clear statement whether real Cocos `.scene` and `.prefab` proof exists

## Forbidden expansion

Do not expand the repository by:

- creating one universal example that tries to cover every game type
- copying the attack-defense table model into games that do not fit wave-spawn logic
- adding full commercial systems before a first playable loop exists
- claiming a sample is a runnable Cocos project without editor proof
- adding provider-specific MCP commands as hard requirements
- treating generated documentation as equivalent to Cocos runtime validation

## Recommended next version sequence

```text
v0.3.x
-> finish provider-driven local Cocos proof for attack-defense-city

v0.4.x
-> strengthen agent operations and command task cards

v0.5.x
-> add card battle, story level clear, tower defense route packs

v0.6.x
-> add merge/collection and idle growth packs after the first three packs prove the pattern
```

## Success definition

This expansion succeeds only if a beginner can choose one game type, follow one example pack, and reach one Cocos Creator 3.8.8 proof path without being pushed into every possible system at once.
