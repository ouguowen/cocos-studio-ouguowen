# Architecture Template System

Use this file when the team needs a starting code or runtime blueprint matched to the classified game type instead of inventing architecture from zero.

## Template law

- Architecture templates are families, not one universal skeleton.
- Pick the lightest template that protects the real loop.
- If the game class changes, re-check the template before scaling production.

## Template families

- Level action template:
  - config-driven stages
  - runtime state
  - spawn and objective systems
  - reward settlement
- Puzzle template:
  - board state
  - mechanic rules
  - move validation
  - clear conditions
- Roguelite template:
  - room graph
  - run state
  - encounter pool
  - reward choice
- Idle or economy template:
  - production formulas
  - timers
  - sink and faucet tracking
  - claim flow
- Hybrid template:
  - one primary runtime spine
  - supportive loop isolation

## Template routing

- Pair this with [design/game-classifier.md](design/game-classifier.md) first.
- Pair this with [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for folder layout.
- Pair this with [LEVEL_SYSTEM_ARCHITECTURE.md](LEVEL_SYSTEM_ARCHITECTURE.md) when level runtime is primary.

## Architecture template record

```md
# Architecture Template Record

## Product

## Classified Game Type

## Selected Template Family

## Primary Runtime Spine

## Supporting Systems

## Systems Explicitly Delayed

## Owner

## Reviewer
```
