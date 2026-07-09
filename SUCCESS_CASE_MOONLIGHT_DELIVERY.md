# Success Case: Moonlight Delivery

## 1. Case name

Moonlight Delivery - Chapter 1 Shell

## 2. Game project repo

```text
ouguowen/AIGameStudioFirstGame
```

## 3. Skill repo

```text
ouguowen/cocos-studio-ouguowen
```

## 4. Game type

```text
story-clear / light-interaction / narrative micro-game
```

## 5. MVP scope

- one chapter shell
- one Cocos scene
- one delivery objective
- one short story prompt
- two route choice buttons
- one completion ending
- default Cocos UI
- placeholder visuals only
- no final art
- no audio
- no save/load
- no second chapter
- no combat, economy, inventory, shop, bag, gacha, or upgrade systems

## 6. Implementation files

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

## 7. Runtime proof result

```text
Preview Visibility Gate: PASS
```

Browser preview showed:

- Moonlight Delivery title
- delivery objective
- route choice buttons
- ending text after click

Ending text:

```text
Delivery completed before the night ends.
```

## 8. QA result

```text
QA_PASS
```

QA confirmed:

- scene exists
- controller exists
- browser preview shows required UI
- click completes the delivery ending
- forbidden systems were not introduced
- git diff was clean before QA report generation

## 9. Release result

```text
FIRST_MVP_ACCEPTED
```

Acceptance applies to Chapter 1 Shell only.

## 10. Lessons learned

1. A full design-to-release loop can stay small when each command produces one artifact and one next command.
2. `READY_FOR_IMPLEMENTATION` must be interpreted as permission for one story only.
3. Pre-write approval prevents accidental broad writes before Cocos files are created.
4. Browser preview proof is necessary because editor hierarchy alone cannot prove runtime visibility.
5. Cocos may generate folder companion meta such as `assets/scenes.meta`.
6. When unexpected generated meta appears, Codex should stop and request explicit user approval.
7. QA and release review should be separate gates.
8. MVP acceptance must explicitly say what it does not mean.

## 11. Rules added back to Skill

- [FIRST_MVP_SUCCESS_PIPELINE.md](FIRST_MVP_SUCCESS_PIPELINE.md)
- [COCOS_DEV_STORY_PREWRITE_PROTOCOL.md](COCOS_DEV_STORY_PREWRITE_PROTOCOL.md)
- [COCOS_GENERATED_META_POLICY.md](COCOS_GENERATED_META_POLICY.md)
- [templates/reports/mvp-acceptance.md](templates/reports/mvp-acceptance.md)
- command routing for `cocos-dev-story-prewrite`, `cocos-qa-review`, and `cocos-release-review`
- gates for pre-write approval, Cocos-generated meta, QA review, and first MVP acceptance

## 12. What should not be generalized

This case proves the pipeline, not the only game genre.

This case should improve workflow control, not lock the Skill to story games.

Do not generalize these as universal requirements:

- all games must be narrative micro-games
- all MVPs must use two route buttons
- all games must use the Moonlight Delivery scene structure
- all future game repos must be named AIGameStudioFirstGame
- all first stories must be Chapter 1 Shell

Generalize only the production controls:

- narrow MVP scope
- explicit story files
- pre-write approval
- generated meta review
- browser preview proof
- QA gate
- release acceptance report
