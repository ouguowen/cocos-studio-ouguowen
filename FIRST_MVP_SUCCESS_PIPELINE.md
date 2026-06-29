# First MVP Success Pipeline

Use this pipeline when a Cocos Creator 3.8.8 project moves from first idea to one accepted playable MVP.

This file records a reusable workflow proven by the Moonlight Delivery Chapter 1 Shell case. It proves the pipeline, not a single required game genre.

## Standard command chain

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-gdd
-> cocos-numerical-design
-> cocos-economy-design
-> cocos-animation-design
-> cocos-asset-policy
-> cocos-game-architecture
-> cocos-first-implementation-story
-> cocos-production-readiness
-> cocos-dev-story-prewrite
-> cocos-dev-story
-> Preview Visibility Gate
-> cocos-qa-review
-> cocos-release-review
-> FIRST_MVP_ACCEPTED
```

## Pipeline rules

1. Documentation stages do not open Cocos Creator.
2. Real implementation requires `FIRST_IMPLEMENTATION_STORY.md`.
3. `READY_FOR_IMPLEMENTATION` only allows one approved implementation story. It does not mean the game is complete.
4. `cocos-dev-story` must first output the Pre-write Approval Checklist from [COCOS_DEV_STORY_PREWRITE_PROTOCOL.md](COCOS_DEV_STORY_PREWRITE_PROTOCOL.md).
5. Cocos-generated companion meta can be approved, but it must be listed in the expected diff scope. See [COCOS_GENERATED_META_POLICY.md](COCOS_GENERATED_META_POLICY.md).
6. Browser preview proof must verify visible runtime output in the real browser. Editor hierarchy, scene snapshot, or inspector state is supporting evidence only.
7. `QA_PASS` is required before `cocos-release-review`.
8. `FIRST_MVP_ACCEPTED` only means the current MVP is accepted. It does not mean the full game is complete.

## Documentation-stage boundary

The following commands are documentation-only unless the user explicitly authorizes implementation:

- `cocos-game-brief`
- `cocos-classify-game`
- `cocos-gdd`
- `cocos-numerical-design`
- `cocos-economy-design`
- `cocos-animation-design`
- `cocos-asset-policy`
- `cocos-game-architecture`
- `cocos-first-implementation-story`
- `cocos-production-readiness`

These stages may read project documents and repository status. They must not create scenes, prefabs, meta files, runtime code, assets, or browser-preview claims unless the command explicitly requires local runtime proof.

## Implementation-stage boundary

`cocos-dev-story` is the first command that may create or modify Cocos project files, and only after:

1. Production readiness is `READY_FOR_IMPLEMENTATION`.
2. A single dev-ready story exists.
3. Pre-write approval has been shown.
4. The user explicitly confirms the write scope.
5. The expected git diff scope is named.

## Runtime proof boundary

For a first playable MVP with simple UI, browser preview proof should show:

- title visible
- objective visible
- at least one player action button visible
- player action can be performed
- ending or result state visible after action

If the browser preview cannot prove the visible result, the MVP cannot pass QA or release review.

## Acceptance boundary

`FIRST_MVP_ACCEPTED` means:

- the current approved MVP story passed QA
- browser preview proof passed for that story
- forbidden scope was not introduced
- the release reviewer accepted that MVP artifact

It does not mean:

- the full game is complete
- future stories are pre-approved
- combat, economy, shop, inventory, gacha, save/load, or extra chapters are authorized
- future QA can be skipped
