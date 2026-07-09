# Cocos Dev Story Pre-write Protocol

Use this protocol before `cocos-dev-story` writes any implementation files.

The purpose is to force Codex to name the exact write boundary before touching a Cocos project.

## Required Pre-write Approval Checklist

Codex must output all of these before implementation begins:

1. exact files to create or modify
2. why each file is needed
3. files that must not be touched
4. runtime validation plan
5. rollback plan
6. expected git diff scope
7. Cocos Creator / MCP usage plan
8. browser preview proof plan
9. final pre-write decision

## Compact pre-write output

Compact output is allowed for normal small implementation stories, but it reduces wording only. It must still include every required safety boundary.

Minimum compact packet:

```text
Project:
Files to change:
Forbidden files:
Cocos/meta allowance:
Runtime/browser proof:
Rollback:
Expected diff:
Decision: PRE_WRITE_APPROVAL_REQUIRED or PRE_WRITE_BLOCKED
```

Use the full checklist instead of compact output when:

- the writable scope is broad or unclear
- scene, prefab, generated `.meta`, or runtime ownership is ambiguous
- external assets, settings, package files, build settings, or multiple systems may be touched
- browser preview proof is required but the proof channel is uncertain
- the user asks for full gate, audit, release review, or first MVP acceptance

Compact pre-write output must never skip:

- pre-write approval before scene, prefab, `.meta`, or runtime writes
- approved diff scope
- generated meta review
- browser proof when runtime visibility matters
- no fake proof
- stop on unexpected files
- no `git add .`
- no force push

## Final pre-write decision

Allowed decisions:

```text
PRE_WRITE_APPROVAL_REQUIRED
PRE_WRITE_BLOCKED
```

Do not use vague decisions such as "ready enough" or "approved by implication".

## Stop rule

Before explicit user confirmation, Codex must not:

- create files
- modify scene files
- modify scripts
- modify `.meta` files
- commit
- push
- open implementation scope beyond the single approved story

## Approval packet

The pre-write packet must include:

- active project path
- current implementation story name
- production readiness decision
- allowed file list
- allowed Cocos-generated companion meta list
- blocked paths
- blocked systems
- browser preview proof requirements
- rollback path that does not use `git reset --hard` unless the user explicitly confirms

## Runtime validation plan

For a first playable MVP, the plan must include:

1. Open or confirm the Cocos Creator project through the approved provider or manual path.
2. Create or confirm the approved scene only.
3. Create or confirm the approved script only.
4. Bind only the approved scene/script/UI references.
5. Save the approved scene.
6. Launch browser preview.
7. Verify the visible title or baseline marker.
8. Verify the objective or primary instruction.
9. Verify at least one player action control.
10. Verify the result or ending after player action.
11. Record Preview Visibility Gate result.
12. Review git diff against the approved scope.

## Rollback plan

The rollback plan must say:

1. Use `git status` to identify only this story's changes.
2. Remove or revert only newly added approved files if the implementation fails.
3. Do not revert user-owned unrelated work.
4. Do not delete unrelated assets.
5. Do not use `git reset --hard` unless the user explicitly confirms.

## User approval rule

Only a direct user confirmation after the checklist allows implementation to begin.

If the user changes the allowed diff scope, Codex must use the newest user instruction as the active approval boundary.

After `PRE_WRITE_APPROVAL_REQUIRED` is approved by the user, the implementation phase should run in Fast Build Mode.

During implementation:

- do not stop after every node creation
- do not stop after every script edit
- do not stop after every internal check
- continue until implementation result, preview blocker, unexpected diff, or stop condition
- keep successful implementation reports compact unless a stop condition, preview failure, dirty diff, or unexpected file appears
