# Moonlight Delivery Example

Moonlight Delivery - Chapter 1 Shell is a successful first-MVP pipeline case for Cocos Studio Ouguowen.

It is an example of workflow closure, not the only game type this Skill supports.

## Case summary

- Game project repo: `ouguowen/AIGameStudioFirstGame`
- Skill repo: `ouguowen/cocos-studio-ouguowen`
- Game type: `story-clear / light-interaction / narrative micro-game`
- MVP result: `FIRST_MVP_ACCEPTED`
- QA result: `QA_PASS`
- Preview Visibility Gate: `PASS`

## MVP scope

The accepted MVP was intentionally tiny:

- one chapter shell
- one Cocos scene
- one delivery objective
- one short story prompt
- two route choice buttons
- one completion ending
- default Cocos UI
- placeholder visuals only

Explicitly out of scope:

- combat
- enemies
- damage
- economy
- currency
- shop
- bag
- inventory
- gacha
- upgrade
- save/load
- second chapter
- final art
- audio
- external assets

## Implementation files

Approved implementation files:

```text
assets/scenes/chapter_01.scene
assets/scripts/story/MoonlightDeliveryController.ts
```

Approved Cocos-generated companion meta:

```text
assets/scenes.meta
assets/scenes/chapter_01.scene.meta
assets/scripts.meta
assets/scripts/story.meta
assets/scripts/story/MoonlightDeliveryController.ts.meta
```

## Runtime proof

Browser preview showed:

- `Moonlight Delivery` title
- delivery objective
- at least one route choice button
- ending text after clicking a choice

Ending text:

```text
Delivery completed before the night ends.
```

## Why this case matters

This case proved:

1. The command chain can move from brief to accepted MVP.
2. Documentation stages can stay separate from implementation.
3. `READY_FOR_IMPLEMENTATION` can be limited to one story.
4. Pre-write approval can stop Codex before file writes.
5. Cocos-generated folder meta such as `assets/scenes.meta` can be handled safely.
6. Browser preview proof can catch runtime visibility issues that editor hierarchy cannot prove.
7. QA and release review can close the loop without expanding scope.

## What should not be generalized

Do not assume:

- every game should be a story-clear game
- every MVP should have route buttons
- every first story should be named Chapter 1 Shell
- every project should use the Moonlight Delivery scene structure
- accepted MVP means full game complete

Generalize only the controls:

- narrow MVP
- explicit first story
- pre-write approval
- generated meta review
- browser preview proof
- QA review
- release acceptance report

## Related docs

- [../../SUCCESS_CASE_MOONLIGHT_DELIVERY.md](../../SUCCESS_CASE_MOONLIGHT_DELIVERY.md)
- [../../FIRST_MVP_SUCCESS_PIPELINE.md](../../FIRST_MVP_SUCCESS_PIPELINE.md)
- [../../COCOS_DEV_STORY_PREWRITE_PROTOCOL.md](../../COCOS_DEV_STORY_PREWRITE_PROTOCOL.md)
- [../../COCOS_GENERATED_META_POLICY.md](../../COCOS_GENERATED_META_POLICY.md)
