# Character Animation Model

This document defines the Skill v2 semantic model for character animation and presentation behavior in Cocos Creator 3.8.8 projects.

## Purpose

The character animation model keeps actor presentation aligned with gameplay state while preventing animation clips, tweens, or callbacks from becoming hidden gameplay logic.

## Core Layers

1. Actor Identity: the player, enemy, NPC, summon, projectile owner, or interactable object being represented.
2. Gameplay State: idle, move, attack, cast, hit, stun, die, revive, interact, celebrate, or fail.
3. Animation State: the named clip, tween, Spine track, particle state, or presentation sequence.
4. Transition Rule: when an animation may enter, interrupt, blend, loop, or exit.
5. Event Boundary: which events are presentation-only and which must be driven by gameplay systems.

## Rules

- Animation expresses state; it does not create authoritative gameplay state.
- Animation state is downstream of character action state.
- Animation must not own gameplay result.
- Animation events may report presentation completion only.
- Any behavior-to-animation mapping must follow [design/ui-character-action-linkage.md](ui-character-action-linkage.md) and [design/character-system.md](character-system.md).
- Damage, death, reward grant, objective completion, and economy changes must not exist only in animation callbacks.
- Every repeated animation needs a fallback if the clip, skeleton, particle, or asset binding is missing.
- Placeholder animation must be labeled as placeholder and must not be mistaken for final art.
- Runtime animation proof must use browser preview evidence when visibility matters.

## Required Output For Character Animation Work

- actor type
- gameplay states
- animation states
- transition rules
- interrupt rules
- event ownership
- fallback behavior
- proof requirement
