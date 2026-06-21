# Project Structure

Use this file when defining or reviewing the default Cocos Creator 3.8.8 project blueprint.

## Intent

The structure must make four things obvious:

- where gameplay truth lives
- where UI lives
- where data lives
- who owns each layer

## Baseline directory shape

```text
assets/
  scenes/
    boot/
    login/
    lobby/
    gameplay/
    result/

  prefabs/
    characters/
    enemies/
    world/
    ui/
    fx/
    common/

  art/
  audio/

  configs/
    authored/
    generated/
    localization/

  bundles/
    common/
    gameplay/
    lobby/
    ui-heavy/

  scripts/
    core/
    game/
    data/
    ui/
    view/
    resource/
    input/
    tools/
```

## Layer ownership

- `scripts/core`: app startup, platform glue, shared law. Owner: Lead Programmer.
- `scripts/game`: gameplay systems, rule execution, save-facing game logic. Owner: Gameplay Programmer.
- `scripts/data`: config schema, runtime models, repositories, mutable state containers. Owner: Lead Programmer for structure.
- `scripts/ui`: page flow, HUD, widgets, modal logic. Owner: UI Programmer.
- `scripts/view`: animation presenters, camera helpers, effect glue, audio presenters. Owner: Technical direction plus presentation roles.
- `scripts/resource`: loading, pooling, bundle boundaries, manifest rules. Owner: Lead Programmer.
- `scripts/input`: convert raw input into commands and intents. Owner: Gameplay Programmer.
- `scripts/tools`: debug, validation, profiling, GM helpers. Owner: Lead Programmer.

## Layer boundaries

- `core` must not become a gameplay dumping ground.
- `game` must not hide UI-only logic or scene hacks.
- `data` must not contain view code or prefab access.
- `ui` must not become the owner of deep gameplay truth.
- `view` must not become the owner of economy, quest, or progression rules.
- `resource` must not accept ad hoc feature hacks with no release owner.
- `input` must not directly mutate unrelated runtime systems from raw device callbacks.

## Scene blueprint

- `boot`: startup orchestration only
- `login`: entry flow only
- `lobby`: hub navigation and feature entry
- `gameplay`: active play context
- `result`: summary and transition flow

Scene shell scripts should stay thin. They host runtime flow; they do not become the whole rules engine.

## Prefab and config rules

- Character and enemy prefabs need stable hook points and predictable hierarchy.
- UI prefabs must separate pages, reusable widgets, and modal internals.
- FX prefabs must declare reuse and pooling expectations.
- `configs/authored` is human-authored source truth.
- `configs/generated` is derived runtime data.
- `configs/localization` must stay separate from gameplay-rule logic.

## Bundle and runtime rules

- Every bundle needs a load owner and a retention or unload rule.
- Separate authored config, runtime mutable state, persisted save state, and presentation-only state.
- Never treat config, runtime state, and save state as the same object by convenience.

## Naming discipline

- Prefer feature and intent over vague names.
- Use stable human-readable prefab and config ids.
- Avoid long-lived names such as `test`, `new`, `final`, or `temp`.

## Review questions

1. Can a new programmer tell where gameplay truth belongs?
2. Can a new UI feature be added without breaking framework law?
3. Can heavy assets be loaded and released with clear ownership?
4. Can prefabs be reviewed without guessing their runtime purpose?
5. Can the team scale content without multiplying exceptions?

## Structure law

- A project structure exists to reduce decision chaos.
- If a directory repeatedly becomes a dumping ground, the structure is already failing.
- If a feature cannot fit naturally into the structure, decide whether the structure or the feature design is wrong.
