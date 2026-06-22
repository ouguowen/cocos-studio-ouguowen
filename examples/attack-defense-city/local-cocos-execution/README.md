# Local Cocos Execution Package

This folder is for the human step that must happen inside a local Cocos Creator 3.8.8 project.

The repository can prepare guides, prompts, stubs, and QA templates.

The local user must still open Cocos Creator and verify the scene in the editor.

## Recommended order

1. `WINDOWS_LOCAL_STEPS.md`
2. `CREATE_COCOS_PROJECT_CHECKLIST.md`
3. `WHAT_TO_SEND_BACK_TO_AI.md`
4. `EDITOR_PROOF_REPORT_TEMPLATE.md`
5. `BLOCKER_TROUBLESHOOTING.md`

## Goal

Move from:

```text
repository reference skeleton
```

to:

```text
local Cocos project proof
```

## What counts as proof

- repository validation passes
- Cocos project opens
- scripts compile
- scene exists
- inspector bindings are set
- first editor run result is recorded
- screenshots or written proof are collected

## Important boundary

Do not claim the demo is verified runnable until the local Cocos Editor proof is filled in.
