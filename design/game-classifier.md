# Game Classifier System

Use this file when a new game idea, feature set, or project direction must be classified before choosing MVP scope, config model, architecture template, or live-ops strategy.

## Classifier law

- Classify by dominant repeatable player behavior, not by theme or art style.
- One wrong classification early can poison config, architecture, pacing, and monetization later.
- If the loop is hybrid, name the primary loop first and the secondary loop second.

## Classification order

1. Name the dominant player action.
2. Name the main content unit.
3. Name the session shape.
4. Name the progression structure.
5. Name the monetization pressure point.
6. Pick the closest primary class.

## Core classes

- Level-based action
- Puzzle or mechanic-clear
- Roguelite run-based
- Tower defense or lane strategy
- Narrative exploration
- Idle or economy growth
- Merge or collection loop
- Hybrid

## Routing rules

- If classified as level-based action, route to level data model selection and runtime architecture.
- If classified as puzzle, route to puzzle-style board and rule data planning instead of wave-spawn defaults.
- If classified as roguelite, route to room pool, seed, reward choice, and run-state architecture.
- If classified as idle or economy, route to operations-data and economy validation early.
- If classified as hybrid, explicitly name what is primary and what is supportive.

## Classifier record

```md
# Game Classification Record

## Product

## Dominant Player Action

## Main Content Unit

## Session Shape

## Progression Structure

## Primary Class

## Secondary Class

## Why This Classification Fits

## Wrong Templates To Avoid

## Next Routed Systems
```
