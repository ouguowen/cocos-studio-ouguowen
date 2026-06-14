# Project Structure

Use this file when defining or reviewing the default Cocos Creator 3.x project blueprint.

## Intent

The structure must make it obvious:

- where gameplay truth lives
- where UI lives
- where presentation lives
- where data lives
- who owns what
- what can scale during production without collapsing into chaos

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
    sprites/
    atlases/
    spine/
    particles/
    materials/
    shaders/

  audio/
    bgm/
    sfx/
    voice/

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
      app/
      bootstrap/
      constants/
      platform/
      event/
      utils/

    game/
      systems/
      rules/
      state/
      services/
      save/

    data/
      models/
      runtime/
      repositories/
      config/

    ui/
      framework/
      pages/
      panels/
      popups/
      hud/
      widgets/
      guide/

    view/
      actors/
      animation/
      effects/
      camera/
      audio/

    resource/
      loader/
      bundle/
      pool/
      manifest/

    input/
      bindings/
      commands/
      controllers/

    tools/
      debug/
      gm/
      validation/
      profiling/
```

## Layer ownership

## `scripts/core`

- Primary owner: Lead Programmer
- Purpose: app startup, shared constants, platform glue, global utility law, event infrastructure
- Do not put: gameplay rules, one-off feature logic, random page state

## `scripts/game`

- Primary owner: Gameplay Programmer
- Purpose: gameplay systems, rule execution, state transitions, save-facing game logic
- Do not put: UI-only concerns, scene-only hacks, visual-only state truth

## `scripts/data`

- Primary owner: Lead Programmer for structure, Gameplay Programmer for integration
- Purpose: config schema, runtime models, repositories, mutable state containers
- Do not put: view code, prefab access, page logic

## `scripts/ui`

- Primary owner: UI Programmer
- Purpose: page framework, HUD, modal flow, widgets, guides
- Do not put: deep gameplay rule truth, unmanaged direct writes into many systems

## `scripts/view`

- Primary owner: Lead Programmer for structure, Animation Lead and Technical Artist for content behavior requirements
- Purpose: rendering helpers, animation presenters, camera helpers, effect glue, audio presenters
- Do not put: core rule truth, economy decisions, quest progression decisions

## `scripts/resource`

- Primary owner: Lead Programmer
- Purpose: load, release, pooling, bundle boundaries, manifest rules
- Do not put: ad hoc feature-specific hacks with no release owner

## `scripts/input`

- Primary owner: Gameplay Programmer
- Purpose: convert raw input into game commands and interaction intents
- Do not put: direct mutation of unrelated runtime systems from raw device callbacks

## `scripts/tools`

- Primary owner: Lead Programmer
- Purpose: debug tools, GM, validation, profiling helpers
- Do not put: shipping-only gameplay truth

## Scene blueprint

## `boot`

- owns startup orchestration only
- may initialize services, load critical config, and route the next scene
- must not become a hidden permanent gameplay manager

## `login`

- owns entry flow, account or guest entry decisions, and lightweight setup
- must not contain broad game rule systems

## `lobby`

- owns hub navigation and top-level feature entry
- must not accumulate gameplay truth for every system

## `gameplay`

- owns the active play context
- scene shell should host the play context, not become the entire rules engine

## `result`

- owns summary and transition flow
- should not mutate deep gameplay truth without explicit service boundaries

## Prefab blueprint

## Character prefabs

- one root role per runtime actor
- clear named child hook points:
  - visual root
  - hit root
  - effect root
  - UI anchor
  - projectile or spawn anchor when needed
- keep actor structure stable across the same actor family

## Enemy prefabs

- align hook points and state needs with gameplay systems
- avoid one-off structure exceptions unless explicitly justified

## UI prefabs

- page root must map to page lifecycle rules
- do not mix full pages, reusable widgets, and modal internals in one prefab family without naming discipline

## FX prefabs

- must declare expected trigger path and reuse expectations
- must be compatible with pooling strategy when repeatedly spawned

## Config blueprint

## `configs/authored`

- human-authored source tables
- primary owner: Lead Designer

## `configs/generated`

- tool-emitted or transformed config artifacts
- primary owner: Lead Programmer for pipeline, Lead Designer for source intent

## `configs/localization`

- localized player-facing strings and keyed copy
- keep string ids stable and separate from gameplay rule logic

## Bundle blueprint

Use bundles to separate:

- always-needed common content
- gameplay-heavy content
- lobby-only or menu-heavy content
- exceptionally heavy UI or feature packages

Bundle law:

- every bundle must have a load owner
- every bundle must have an unload or retention rule
- avoid feature teams inventing new bundle logic casually

## UI blueprint

Recommended split:

- `framework/`: base page, modal, lifecycle, navigation rules
- `pages/`: full screens
- `panels/`: embedded larger sections
- `popups/`: modal overlays
- `hud/`: in-session always-visible surfaces
- `widgets/`: reusable controls
- `guide/`: tutorial overlays and guidance helpers

UI law:

- full page flow belongs in `pages/`
- reusable pieces belong in `widgets/`
- tutorial systems do not own gameplay truth

## Runtime state blueprint

Separate clearly:

- authored config values
- runtime mutable session state
- persisted save state
- presentation-only state

Never treat these as the same object by convenience.

## Naming discipline

- prefer feature and intent over vague names
- use stable, human-readable prefab and config ids
- avoid temporary words such as `test`, `new`, `final`, `temp` in long-lived asset names

## Review questions

Ask these when reviewing the structure:

1. Can a new programmer tell where gameplay truth belongs
2. Can a new UI feature be added without breaking framework law
3. Can a heavy asset be loaded and released with clear ownership
4. Can a prefab be reviewed without guessing its runtime purpose
5. Can the team scale content without multiplying exceptions

## Structure law

- A project structure exists to reduce decision chaos.
- If a directory repeatedly becomes a dumping ground, the structure is already failing.
- If a feature cannot fit naturally into the structure, the team must decide whether the structure or the feature design is wrong.
