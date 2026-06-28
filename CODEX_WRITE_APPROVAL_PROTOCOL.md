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

## This task profile

- target repo: `C:\Users\欧国文\.codex\skills\cocos-studio-ouguowen`
- allowed file type: `.md`
- blocked classes: external Cocos project files, scenes, prefabs, meta, runtime code
- required review: `git status`, `git diff --name-only`, `git diff --stat`
