# Cocos Path Scoped Rules

Use this file when a request touches Cocos-adjacent repositories, automation tools, or local workspace paths.

## Scope law

- The writable scope must be named before execution.
- If the writable scope is a Skill repository, game-project paths are read-only by default.
- A path outside the named writable scope is blocked unless the user expands scope explicitly.
- Similar folder names do not create implied permission.

## Path classes

- Skill repo docs: allowed for this maintenance task
- Skill repo scripts and automation helpers: allowed only when explicitly requested
- external game project runtime code: blocked
- external scene, prefab, and meta assets: blocked

## Path guard

- Review `git diff --name-only` before commit.
- Review absolute paths for every newly added file.
- If any changed path is not a Markdown doc in this repository, stop and audit.

## Cocos-generated folder meta policy

When working inside an actual Cocos game project, Cocos Creator may generate folder companion `.meta` files for newly created folders.

Allowed only when directly related to the approved implementation scope:

- folder companion `.meta` for a newly approved folder
- asset companion `.meta` for a newly approved scene, script, prefab, or asset

Examples from a valid first-MVP story:

```text
assets/scenes.meta
assets/scenes/chapter_01.scene.meta
assets/scripts.meta
assets/scripts/story.meta
assets/scripts/story/MoonlightDeliveryController.ts.meta
```

Rules:

1. The `.meta` file must be directly related to a user-approved new file or folder.
2. The `.meta` file must be listed in the approved diff scope before staging.
3. Unexpected `.meta` files require a stop-and-report step.
4. User confirmation is required before an unexpected generated `.meta` enters the approved scope.
5. Unrelated `.meta` files remain forbidden.
6. `.scene`, `.prefab`, and `.meta` files must not be raw text edited.

See [protocols/cocos-generated-meta.md](cocos-generated-meta.md).

## Block list for this repository update

- `D:\CocosProjects\AI_Game_Studio_FirstGame`
- `assets/scenes/**`
- `assets/prefabs/**`
- `assets/**/*.meta`
- any runtime gameplay code outside this Skill repository
