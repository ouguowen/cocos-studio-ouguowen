# Character System

This document defines the lightweight character behavior, action, animation, skeleton, and asset-binding boundary for Cocos Creator 3.8.8 projects.

## 1. Character identity

Character identity names who or what is responding: player, NPC, enemy, guide, companion, interactable actor, or story object.

Every character-facing interaction must name the identity before adding behavior, action state, animation state, skeleton presentation, or asset binding.

## 2. Character behavior

Character behavior describes intent such as speak, deliver_package, choose_route, inspect, react, celebrate, fail, wait, or leave.

Character system owns action meaning, not UI.
UI may request behavior, but controller/domain logic validates the request before the character behavior becomes accepted state.

## 3. Character action state

Character behavior maps to action state.

Action state is a named semantic state such as IDLE, TALK, INTERACT_CONFIRM, REACT, MOVE_HINT, SUCCESS, or FAIL.

Action state must not grant rewards, complete quests, write inventory, decide combat, or mark final story completion by itself.

## 4. Animation state

Action state may map to animation state.

Animation state is downstream of character action state. It may be a string, placeholder, Tween, AnimationClip, Spine track, or no-op state.

Animation state may map to skeleton presentation, but gameplay truth remains in controller/domain logic.

## 5. Skeleton boundary

Skeleton only presents animation.

Skeleton must not own gameplay result, final state, reward, inventory, currency, combat result, or story ending.

No skeleton runtime is required for first MVP unless production readiness and animation design approve it.

## 6. Asset binding boundary

Imported character art, skeletons, animation clips, UI icons, and prefabs must not introduce gameplay systems by themselves.

Asset binding must follow controller-owned behavior and character-owned action semantics.

Asset binding may provide visuals or structure only.

## 7. Linkage with UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md

Any character-related UI interaction must follow [UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md](UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md).

Required chain:

```text
UI Input
-> Behavior Request
-> Character Intent
-> Action State
-> Animation State
-> Visual Output
-> UI Feedback
```

Gameplay truth remains in controller/domain logic.
