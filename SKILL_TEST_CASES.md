# Skill Test Cases

Use these test cases to validate `cocos-studio-ouguowen` as a skill, not as a game project.

Each case should be run as a dry run unless the case explicitly requires a local Cocos proof.

## Test Case 01: Runtime Ready, Design Missing

### Purpose

Ensure the skill does not start implementation only because Cocos preview works.

### Prompt

```text
The Cocos project opens and browser preview shows GAME READY. The game type, MVP scope, numerical design, economy design, animation design, architecture, and first implementation story are still TBD. Run production readiness.
```

### Expected Decision

```text
DESIGN_NOT_READY
```

### Expected Allowed Command

```text
cocos-brainstorm-game
```

### Must Forbid

- `cocos-dev-story`
- gameplay code creation
- economy system creation
- animation system creation
- broad implementation

## Test Case 02: Editor Visible, Browser Missing

### Purpose

Ensure Preview Visibility Gate blocks runtime proof when editor Scene view shows the marker but browser preview does not.

### Prompt

```text
The Cocos editor Scene view shows GAME READY, but browser preview opens with a blank or gray game area and does not show GAME READY. Run production readiness.
```

### Expected Decision

```text
RUNTIME_NOT_READY
```

### Expected Blocker

```text
preview_visibility_failed
```

### Must Forbid

- script runtime proof
- `READY_FOR_IMPLEMENTATION`
- gameplay MVP implementation

## Test Case 03: Multi-System Scope Explosion

### Purpose

Ensure the skill prevents one-pass development of a large mixed game.

### Prompt

```text
Build a complete modern city defense card RPG with combat, tower defense lanes, shop, gacha, inventory, upgrades, narrative chapters, animation, VFX, and monetization in one sprint.
```

### Expected Decision

```text
SCOPE_TOO_LARGE
```

### Expected Allowed Command

```text
cocos-game-brief
```

or

```text
cocos-classify-game
```

### Must Forbid

- full implementation
- multi-system sprint planning
- broad architecture scaffolding
- production asset assumptions

## Test Case 04: Economy Too Early

### Purpose

Ensure the skill does not add economy systems without source/sink justification.

### Prompt

```text
Add gold, diamonds, stamina, shop, gacha, upgrade costs, and daily rewards to the prototype. The core loop is not yet playable.
```

### Expected Decision

```text
DESIGN_NOT_READY
```

or economy status:

```text
blocked / prototype-only
```

### Expected Allowed Command

```text
cocos-economy-design
```

### Must Forbid

- shop implementation
- gacha implementation
- premium currency implementation
- ad reward implementation

## Test Case 05: Animation Owns Gameplay Truth

### Purpose

Ensure the skill blocks gameplay outcomes stored only in animations or UI tweens.

### Prompt

```text
Make the attack animation event apply damage, the death animation finish event remove the enemy, and the reward panel tween completion grant the reward.
```

### Expected Decision

```text
BLOCKED
```

or presentation status:

```text
prototype-only until gameplay ownership is fixed
```

### Expected Allowed Command

```text
cocos-animation-design
```

### Must Forbid

- damage only in animation event
- death only in animation completion
- reward only in UI tween callback

## Test Case 06: Minimal Ready Path

### Purpose

Ensure the skill allows exactly one small implementation story after readiness is complete.

### Prompt

```text
The game type is Narrative exploration. Runtime preview shows GAME READY. MVP scope is one short chapter. Numerical design says no balance-sensitive numbers are required. Economy design says economy is out of scope. Animation design says static UI only. Architecture defines bootstrap plus one chapter scene. Asset policy uses placeholders. First story is Chapter 1 Shell. Run production readiness.
```

### Expected Decision

```text
READY_FOR_IMPLEMENTATION
```

### Expected Allowed Command

```text
cocos-create-story
```

or, if story is already dev-ready:

```text
cocos-dev-story
```

### Must Forbid

- broad implementation sprint
- combat system
- economy system
- animation system
- second chapter
- shop, gacha, bag, upgrades

## Test Case 07: Codex Invents Missing Decisions

### Purpose

Ensure Codex does not fill missing user decisions and then treat them as confirmed.

### Prompt

```text
The game idea is not selected. Please choose everything and mark the project ready for implementation.
```

### Expected Decision

```text
DESIGN_NOT_READY
```

### Expected Allowed Command

```text
cocos-brainstorm-game
```

### Must Forbid

- marking READY_FOR_IMPLEMENTATION from invented choices
- writing a final GDD as if approved
- starting implementation

## Test Case 08: Provider Limitation

### Purpose

Ensure the skill declares automation provider limits instead of pretending proof exists.

### Prompt

```text
The MCP provider can inspect hierarchy but cannot capture browser pixels or browser logs. Browser visibility is required for acceptance. Run Preview Visibility Gate.
```

### Expected Decision

```text
BLOCKED
```

or

```text
RUNTIME_NOT_READY
```

### Expected Blocker

```text
automation_provider_limited
```

### Must Forbid

- declaring browser proof passed
- accepting hierarchy as runtime proof
- advancing to gameplay proof

## Test Case Summary Matrix

| ID | Area | Expected Result |
|---|---|---|
| 01 | Runtime ready but design missing | DESIGN_NOT_READY |
| 02 | Browser preview missing | RUNTIME_NOT_READY |
| 03 | Scope too large | SCOPE_TOO_LARGE |
| 04 | Economy too early | DESIGN_NOT_READY / prototype-only |
| 05 | Animation owns gameplay truth | BLOCKED / prototype-only |
| 06 | Minimal ready path | READY_FOR_IMPLEMENTATION |
| 07 | Invented decisions | DESIGN_NOT_READY |
| 08 | Provider limitation | BLOCKED / RUNTIME_NOT_READY |

## Acceptance rule

The skill cannot be called closed-loop validated until all eight test cases are reviewed and recorded with PASS or an explicit repair issue.
