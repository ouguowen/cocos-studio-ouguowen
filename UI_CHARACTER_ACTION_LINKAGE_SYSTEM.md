# UI Character Action Linkage System

## 1. Purpose

This document defines how UI input, character behavior, action state, animation state, skeleton presentation, assets, and controller-owned gameplay truth must connect in Cocos Creator 3.8.8 projects.

Use it when a request involves UI interaction, character response, animation state, skeleton presentation, or asset-driven visual feedback.

## 2. Core linkage principle

UI does not own gameplay truth.
UI requests behavior.
Behavior owns intent.
Character system maps behavior to action.
Action maps to animation state.
Animation only represents state.
Skeleton only displays animation.
Assets only provide structure or visuals.
Runtime controller owns final state.

Standard linkage:

```text
UI Input
-> Behavior Request
-> Character Intent
-> Action State
-> Animation State
-> Visual Output
-> UI Feedback
```

## 3. Ownership model

- UI owns input controls, visible labels, button enabled state, and player-facing feedback.
- Controller or domain logic owns validation, final state, story completion, result, reward, failure, and persistence decisions.
- Character system owns character identity, behavior meaning, and action state meaning.
- Animation model owns presentation state mapping and transition rules.
- Skeleton displays animation only.
- Assets provide visuals, structure, or placeholder presentation only.

## 4. Input-to-behavior flow

UI input is a request, not final truth.

Example flow:

```text
Button clicked
-> controller method called
-> controller validates current state
-> controller emits or applies behavior request
```

The button callback must not bypass controller-owned behavior.

## 5. Behavior-to-action flow

Behavior request maps to character intent, then to an action state.

Example:

```text
request choose_route
-> character intent: deliver_package
-> action state: INTERACT_CONFIRM
```

Character behavior maps to action state only after controller/domain validation.

## 6. Action-to-animation flow

Action state may map to animation state.

Example:

```text
action state: TALK
-> animation state: talk_loop optional
```

Animation state is downstream of character action state. No animation clip is required for first MVP unless approved.

## 7. Animation-to-feedback flow

Animation may produce presentation completion only.

Animation completion may notify controller that presentation ended, but it must not decide gameplay result, reward, inventory, currency, combat result, quest completion, or story ending.

## 8. UI feedback rules

- UI may display accepted, blocked, loading, result, ending, or next-step feedback.
- UI feedback must render controller-owned state.
- UI may display character response text or state.
- UI must not own action result.
- UI must not mark story, quest, reward, combat, or economy completion directly.

## 9. Character response rules

- Character response must be tied to character identity and behavior.
- Character system owns action meaning, not UI.
- Character intent should be named before action state is named.
- Optional action state strings are allowed for MVP.
- Optional animation state strings are allowed for MVP.
- Multi-character action systems require character design approval and production readiness.

## 10. Skeleton boundary

Skeleton only displays animation.

- Skeleton must not own gameplay result.
- Skeleton must not grant rewards.
- Skeleton must not complete quests, story endings, combat results, inventory, or currency changes.
- Skeleton or bone motion may represent an animation clip only after behavior and action semantics exist.

## 11. Asset boundary

Assets only provide structure or visuals.

- Imported character art, skeletons, animation clips, UI icons, and prefabs must not introduce gameplay systems by themselves.
- Asset binding must follow controller-owned behavior and character-owned action semantics.
- Asset import must not create behavior, action systems, combat systems, economy systems, or persistence systems.

## 12. Forbidden ownership

- UI must not set completion directly.
- Animation must not grant rewards.
- Skeleton must not own gameplay result.
- Prefab must not own final state.
- Asset import must not create gameplay systems.
- Button callback must not bypass controller-owned behavior.
- Animation event must not complete quest, reward, inventory, currency, combat result, or story ending directly.

## 13. Allowed MVP linkage

Allowed first-MVP linkage is limited to:

- button click requests one behavior
- controller validates behavior
- controller updates story state
- controller updates visible UI state
- optional character action state string
- optional animation state string
- no imported animation required
- no skeleton required for first MVP

## 14. Forbidden linkage patterns

- UI-owned gameplay truth
- animation-owned gameplay truth
- skeleton-owned gameplay truth
- asset-owned gameplay truth
- button directly grants reward
- button directly writes inventory
- animation event changes economy
- prefab callback changes story completion
- external asset import creates system behavior
- combat action without combat approval
- multi-character action system without character design approval
- state machine expansion without production readiness

## 15. Cocos Creator 3.8.8 implementation guidance

For MVP:

- Button event may call controller method.
- Controller owns behavior validation.
- Controller owns story/action/animation state strings.
- UI labels/buttons only render state.
- No animation clip is required unless approved.
- No skeleton runtime is required unless approved.
- No prefab is required unless approved.

For future character animation:

- Character action state may map to animation clip.
- Animation clip may map to skeleton/bone motion.
- Animation completion may notify controller only as presentation completion.
- Animation completion must not decide gameplay result.

Do not implement UI-character-action linkage before the first implementation story and production readiness approve the scope.

## 16. Validation requirements

Validation must confirm:

- UI Input is request-only.
- Behavior Request is validated by controller/domain logic.
- Character Intent is explicit.
- Action State is downstream of behavior.
- Animation State is downstream of action.
- Visual Output does not own gameplay truth.
- UI Feedback renders controller-owned state.
- controller owns final state.
- Forbidden linkage patterns are absent.

Documentation-only changes use diff proof. Runtime proof is not applicable unless a later approved implementation story requires Cocos preview validation.

## 17. Related models

- [CHARACTER_SYSTEM.md](CHARACTER_SYSTEM.md)
- [UI_SYSTEM_MODEL.md](UI_SYSTEM_MODEL.md)
- [CHARACTER_ANIMATION_MODEL.md](CHARACTER_ANIMATION_MODEL.md)
- [ASSET_SEMANTIC_MODEL.md](ASSET_SEMANTIC_MODEL.md)
- [QUALITY_GATES.md](QUALITY_GATES.md)
- [RUNTIME_PROOF_PROTOCOL.md](RUNTIME_PROOF_PROTOCOL.md)
