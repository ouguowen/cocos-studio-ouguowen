# Codex Write Approval Protocol

Use this file before Codex writes files in or near a Cocos workflow environment.

## Approval law

- The target repository must be named.
- The writable file classes must be named.
- The forbidden file classes must be named.
- The success proof must be named before writing.

## Minimum approval packet

- target repo
- allowed file types
- blocked file types
- required review commands
- commit message expectation if commit is requested

## Write checklist

- Confirm path scope.
- Confirm the task is documentation-only or implementation-capable.
- Confirm whether scripts are present before promising to run them.
- Confirm audit commands that must pass before commit.

## Cocos dev story pre-write rule

- `cocos-dev-story` must stop at `PRE_WRITE_APPROVAL_REQUIRED` before implementation.
- Apply [COCOS_DEV_STORY_PREWRITE_PROTOCOL.md](COCOS_DEV_STORY_PREWRITE_PROTOCOL.md) before creating scenes, scripts, prefabs, meta files, or runtime assets.
- The user must explicitly approve before Codex creates or modifies scene, script, prefab, `.meta`, runtime code, or asset files.
- The approval must name the expected git diff scope.
- The approval must name files and systems that must not be touched.
- Codex must not commit or push before the implementation diff has been reviewed.

## Generated meta approval rule

- Cocos-generated companion `.meta` files are not automatically approved.
- If generated `.meta` files appear outside the current approved scope, Codex must stop and report them.
- User confirmation is required before adding unexpected generated `.meta` files to the approved scope.
- Apply [COCOS_GENERATED_META_POLICY.md](COCOS_GENERATED_META_POLICY.md) before staging generated `.meta` files.
- Do not raw text edit `.scene`, `.prefab`, or `.meta` files.

## This task profile

- target repo: `C:\Users\欧国文\.codex\skills\cocos-studio-ouguowen`
- allowed file type: `.md`
- blocked classes: external Cocos project files, scenes, prefabs, meta, runtime code
- required review: `git status`, `git diff --name-only`, `git diff --stat`
