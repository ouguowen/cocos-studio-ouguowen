# Cocos Creator 3.8.8 Rules

This file defines the non-chaotic implementation rules for a `Cocos Creator 3.8.8` project.

If a request may depend on another engine version, check [COCOS_3_8_8_BASELINE.md](COCOS_3_8_8_BASELINE.md) first and call out the mismatch before giving version-sensitive advice.

## Recommended project shape

```text
assets/
  scenes/
  prefabs/
  art/
  audio/
  configs/
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

## Core architectural rules

- Gameplay truth must live outside UI pages and visual-only components.
- Scene scripts should orchestrate, not own all game rules.
- UI code should present and route, not become the source of gameplay truth.
- Animation and VFX are presentation helpers, not the primary source of rule decisions.
- Config content and config schema ownership must be separated.

## Component discipline

- One component should own one clear job.
- Do not create giant all-purpose controller components.
- Avoid putting unrelated responsibilities in the same node script.
- Prefer explicit composition over magic cross-node reach.

## `update()` discipline

- Do not place major rule systems in uncontrolled `update()` flows.
- Use `update()` only when frame-driven behavior is truly necessary.
- If something can be event-driven, state-driven, or timer-driven, prefer that over continuous polling.

## Scene discipline

- Keep scene shell logic thin.
- Use scenes as containers for flow, loading, and major context transitions.
- Do not let every scene invent its own architecture.

## Prefab discipline

- Treat prefabs as structured assets, not random node dumps.
- Define hook points, naming, and intended runtime role.
- Avoid embedding project-wide assumptions directly into a single prefab's ad hoc script.

## UI discipline

- Keep page lifecycle consistent.
- Centralize modal and page flow rules.
- Do not make UI buttons mutate multiple systems directly without a clear interface boundary.
- Keep HUD updates predictable and data-driven.

## Resource discipline

- Every dynamically loaded asset needs a loading owner and a release owner.
- Bundle boundaries must be intentional.
- Reuse should be planned for common prefabs, effects, and audio cues.
- Do not scatter direct asset-path dependencies through gameplay code.

## Config discipline

- Prefer config-driven content over hardcoded branches.
- Validate config shape early.
- Keep authored values separate from runtime mutable state.

## Presentation discipline

- Animation state should be derived from gameplay state, not invented independently.
- VFX timing should support readability, not obscure it.
- Effects, shaders, and materials must stay within performance budgets.
- For animation states, UI motion, combat feedback, VFX, Spine, Tween, AnimationClip, particles, or audio-visual timing, apply [ANIMATION_PRESENTATION_RULES.md](ANIMATION_PRESENTATION_RULES.md) before implementation.

## Performance discipline

- Define target budgets early for:
  - load time
  - memory growth
  - scene transition cost
  - effect density
  - update-heavy systems
- Do not postpone all performance thinking until late polish.

## Forbidden patterns

- giant god managers with mixed responsibilities
- gameplay truth stored only in UI state
- critical rule logic hidden only inside animation resources
- uncontrolled singleton sprawl
- random direct cross-module mutation
- ad hoc dynamic loading with no release strategy
- copy-paste systems that fork rule behavior silently

## Default rescue advice

If the project is messy, start by checking:

1. current stage clarity
2. role ownership clarity
3. asset ownership clarity
4. shared framework violations
5. `update()` abuse
6. config versus runtime-state confusion
7. scene and UI overreach
8. presentation owning gameplay truth
