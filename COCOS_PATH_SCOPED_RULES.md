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

## Block list for this repository update

- `D:\CocosProjects\AI_Game_Studio_FirstGame`
- `assets/scenes/**`
- `assets/prefabs/**`
- `assets/**/*.meta`
- any runtime gameplay code outside this Skill repository
