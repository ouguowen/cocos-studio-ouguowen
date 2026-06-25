# Animation Presentation Rules

Use this file before Codex creates or changes animation states, UI motion, tween effects, combat feedback, hit reactions, death flows, skill VFX, audio-visual timing, Spine usage, AnimationClip usage, or presentation-sensitive Cocos scene/prefab wiring.

This file is not an art bible. It defines the implementation and review rules that prevent presentation from becoming chaotic or from secretly owning gameplay logic.

## Presentation law

- Animation and VFX must express gameplay state; they must not become the source of gameplay truth.
- A visual effect can support a rule, but the rule must live in gameplay/runtime logic.
- Readability beats decoration during prototype and MVP.
- Every repeated animation needs a named state, owner, trigger, and exit rule.
- UI animation must clarify navigation and feedback, not delay the player or hide state changes.
- Prototype presentation may use placeholders, but the placeholder status must be explicit.
- Do not create heavy animation systems before the browser preview and core loop are proven.

## Required inputs before animation work

Before generating animation or presentation implementation, require:

1. selected game type
2. current production stage
3. gameplay state being represented
4. actor or UI element being animated
5. player-facing purpose
6. trigger event
7. exit condition
8. whether gameplay timing depends on animation timing
9. target platform or performance concern
10. placeholder or production status

If these are missing, return a blocker instead of creating animation logic.

## MVP presentation scope

For an MVP, keep presentation small:

- one readable idle or normal state
- one action state
- one feedback state
- one fail or death state if needed
- one result or reward reveal
- one or two UI transitions only when they improve clarity
- placeholder VFX only when they help the player understand cause and effect

Do not add full character animation trees, cinematic systems, complex shader effects, global transition frameworks, or polished UI motion packs before the first playable proves the loop.

## Actor animation states

Common actor states:

- `idle`
- `move`
- `attack`
- `cast`
- `hit`
- `stun`
- `die`
- `spawn`
- `despawn`
- `victory`

For each state, define:

- state id
- owning component
- trigger event
- allowed transitions
- exit rule
- interrupt rule
- gameplay lock or no-lock
- animation asset or placeholder asset
- fallback behavior if asset is missing

Do not let every actor invent its own state names.

## Gameplay-to-animation boundary

Recommended boundary:

```text
gameplay state/event -> presentation adapter -> animation/VFX/audio execution
```

The gameplay system should emit a clear event such as:

- `ACTOR_SPAWNED`
- `ACTOR_MOVED`
- `ATTACK_STARTED`
- `DAMAGE_APPLIED`
- `ACTOR_DIED`
- `SKILL_CAST`
- `LEVEL_CLEARED`
- `REWARD_READY`

The presentation layer may play animations, tweens, effects, and sounds in response.

Do not let animation callbacks decide whether damage happened, whether the enemy died, whether reward was granted, or whether the level was cleared.

## Animation timing and gameplay timing

If gameplay timing depends on animation timing, document the dependency explicitly.

Allowed:

- attack visual waits for gameplay event
- hit frame marker triggers a presentation effect
- animation completion unlocks UI interaction
- result animation completion reveals a button

Forbidden without explicit approval:

- damage exists only because an animation event fired
- death exists only because an animation finished
- rewards are granted by UI animation completion
- enemy AI depends on raw clip length with no gameplay state owner

## Cocos implementation boundaries

### AnimationClip

Use for:

- authored node property animation
- simple character state clips
- UI reveal clips that are asset-authored
- repeated clip playback through Cocos animation component

Avoid when:

- the motion is one-off layout polish
- gameplay rules depend on the clip timeline
- a simple tween would be clearer

### Tween

Use for:

- simple UI scale, fade, move, pulse, shake
- short feedback motions
- prototype-only readable effects
- simple result panel reveal

Avoid when:

- many states need centralized transition control
- timing must be shared across many actor types
- designers need editable clip assets

### Spine or skeletal animation

Use when:

- characters require multiple authored body states
- attack/cast/hit/death need reusable skeletal animation
- visual quality justifies external asset workflow

Avoid when:

- placeholder prototype can use sprite/tween feedback
- animation assets are not ready
- runtime integration would block core loop validation

### Particle / VFX

Use when:

- effect improves cause-and-effect readability
- hit, skill, reward, or environmental feedback needs a clear visual cue

Avoid when:

- effect density harms performance
- effect hides gameplay readability
- effect becomes a substitute for missing gameplay feedback

## UI presentation rules

For each UI motion, define:

- UI element
- purpose
- trigger
- duration
- skip or fast-forward rule
- input lock or no-lock
- resulting UI state

Common UI motions:

- button press feedback
- panel enter
- panel exit
- reward reveal
- warning pulse
- damage flash
- objective update
- result screen reveal

Do not make UI animation the only place where state changes are recorded.

## Feedback priority

Readable feedback order:

1. player input confirmation
2. gameplay consequence
3. objective or progress change
4. reward or loss result
5. polish effect

If polish hides steps 1-4, reduce the effect.

## Naming rules

Use consistent naming:

```text
actor_state_action
ui_panel_action
vfx_context_action
sfx_context_action
```

Examples:

- `enemy_walk_loop`
- `enemy_hit_flash`
- `enemy_die_fade`
- `hero_attack_slash`
- `ui_result_panel_enter`
- `ui_reward_count_up`
- `vfx_hit_spark_small`
- `sfx_button_click`

Do not use names like `New Animation`, `ani1`, `effect_final`, or `test2` in production assets.

## Presentation ownership

Every presentation-sensitive asset or system must name:

- gameplay owner
- presentation owner
- reviewer
- asset status
- trigger source
- fallback behavior
- performance concern
- placeholder or production status

## Validation categories

Presentation validation must include:

- state name validation
- transition validation
- trigger validation
- fallback validation
- gameplay boundary validation
- UI input-lock validation
- performance budget validation
- browser preview visibility validation when runtime output matters

## Red flags

Stop and review if:

- animation is deciding gameplay outcomes
- UI tween is granting rewards
- an actor has many unnamed states
- a hit reaction plays but damage state is not updated elsewhere
- VFX hides enemies, objectives, or player choices
- animation polish blocks core loop validation
- Codex creates animation systems before the first playable marker is visible in browser preview
- every prefab owns a separate animation convention
- placeholder animation is treated as final art
- performance is ignored because effects look good in editor view

## Animation presentation record

Use this artifact before animation or presentation implementation.

```md
# Animation Presentation Record

## Game Type

## Current Stage

## Actor / UI Element

## Gameplay State Represented

## Player-Facing Purpose

## Trigger Event

## Exit Condition

## Animation / VFX / UI Motion Type

## Implementation Method
- AnimationClip / Tween / Spine / Particle / SFX / Placeholder

## Gameplay Timing Dependency

## Input Lock Rule

## Fallback Behavior

## Asset Naming

## Performance Risk

## Placeholder Status

## Validation Rules

## Gate Decision
- PASS / FAIL / BLOCKED
```

## Gate decision

Animation presentation passes only when:

- the gameplay state being represented is explicit
- trigger and exit conditions are defined
- presentation does not own gameplay truth
- placeholder status is clear
- naming and fallback behavior are defined
- browser/runtime proof is required when the effect must be seen in preview
- performance risk is considered for repeated or dense effects

If these are not true, do not proceed to presentation implementation.
