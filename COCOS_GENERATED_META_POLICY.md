# Cocos Generated Meta Policy

Use this policy when Cocos Creator creates companion `.meta` files during approved implementation work.

## Proven case

During the Moonlight Delivery Chapter 1 Shell implementation, Cocos Creator generated:

```text
assets/scenes.meta
```

This is a folder companion meta for the newly created `assets/scenes/` folder. It is required for Cocos UUID and asset reference integrity.

## Allowed Cocos-generated meta examples

These examples are allowed only when directly tied to the approved new files or new folders for the current story:

```text
assets/scenes.meta
assets/scenes/chapter_01.scene.meta
assets/scripts.meta
assets/scripts/story.meta
assets/scripts/story/MoonlightDeliveryController.ts.meta
```

## Approval law

1. Only `.meta` files directly related to the approved new files or new folders can be approved.
2. If an unapproved `.meta` appears, Codex must stop and report it.
3. The user must explicitly confirm before the new `.meta` is added to the approved diff scope.
4. Unrelated `.meta` files must not be modified.
5. Codex must not raw text edit `.scene`, `.prefab`, or `.meta` files.
6. Codex must not use `git reset --hard` to roll back unless the user explicitly confirms.

## Stop-and-report format

When an unexpected generated meta appears, report:

- unexpected path
- why it may have been generated
- whether it is directly related to the approved story
- whether it is a folder companion meta or asset companion meta
- recommendation: request user approval or block commit

## Commit rule

Do not commit generated `.meta` files unless they are:

- directly tied to approved files/folders
- listed in the current approved diff scope
- reviewed with `git status`, `git diff --name-only`, and `git diff --stat`

## Forbidden meta behavior

Never:

- edit Cocos `.meta` contents by hand
- delete unrelated `.meta`
- stage all `.meta` files without path review
- treat all generated meta as automatically approved
- hide generated meta inside a broad `git add .` during implementation
