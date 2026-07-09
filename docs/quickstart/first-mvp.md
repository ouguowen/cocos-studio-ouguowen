# Quickstart: First MVP

This guide shows how to use Cocos Studio Ouguowen to move from a game idea to one accepted Cocos Creator 3.8.8 MVP.

It is intentionally conservative. The goal is not to build a full game in one pass. The goal is to produce one small, reviewable, browser-proven MVP.

## Start prompt

```text
Use $cocos-studio-ouguowen.
Run cocos-game-brief for my game idea, then recommend the next command.
```

## Command chain

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
```

## What each phase proves

### 1. Brief and classification

Commands:

- `cocos-game-brief`
- `cocos-classify-game`

Proves:

- game identity is explicit
- dominant player action is known
- correct template family is selected
- wrong templates are avoided

No Cocos files should be written.

### 2. Design gates

Commands:

- `cocos-gdd`
- `cocos-numerical-design`
- `cocos-economy-design`
- `cocos-animation-design`
- `cocos-asset-policy`

Proves:

- MVP scope is narrow
- balance-heavy numbers are allowed or excluded
- economy systems are allowed or excluded
- animation/presentation cannot own gameplay truth
- assets are placeholder/final/imported according to policy

No Cocos files should be written.

### 3. Architecture and first story

Commands:

- `cocos-game-architecture`
- `cocos-first-implementation-story`

Proves:

- one-scene/script/data boundary is known
- exact first story is written
- acceptance criteria are clear
- out-of-scope systems are explicit

No Cocos files should be written.

### 4. Production readiness

Command:

- `cocos-production-readiness`

Decision states:

```text
READY_FOR_IMPLEMENTATION
DESIGN_NOT_READY
RUNTIME_NOT_READY
SCOPE_TOO_LARGE
BLOCKED
```

`READY_FOR_IMPLEMENTATION` means only:

```text
Codex may start the next approved implementation story.
```

It does not mean:

- the game is complete
- browser proof has passed
- release is accepted
- scope can expand

### 5. Pre-write approval

Command:

- `cocos-dev-story-prewrite`

The agent must output:

1. exact files to create or modify
2. why each file is needed
3. files that must not be touched
4. runtime validation plan
5. rollback plan
6. expected git diff scope
7. Cocos Creator / MCP usage plan
8. browser preview proof plan
9. final pre-write decision

Allowed decisions:

```text
PRE_WRITE_APPROVAL_REQUIRED
PRE_WRITE_BLOCKED
```

Before the user approves, Codex must not create files, modify scenes, modify scripts, modify `.meta`, commit, or push.

### 6. Implementation

Command:

- `cocos-dev-story`

Rules:

- implement only the approved story
- use Cocos-safe workflows for scene/prefab/meta changes
- do not raw text edit Cocos serialized assets
- stop if unapproved files appear
- request approval for unexpected generated `.meta`
- run browser preview proof when UI/gameplay is expected

### 7. Preview Visibility Gate

For a first playable UI MVP, browser preview proof should show:

- title visible
- objective or instruction visible
- at least one action button visible
- action works
- ending/result visible after action

Editor hierarchy is not enough.

### 8. QA review

Command:

- `cocos-qa-review`

QA must verify:

- scene exists
- script exists
- browser preview proof exists
- acceptance criteria pass
- forbidden systems are absent
- git status/diff is clean except approved QA docs

Decision states:

```text
QA_PASS
QA_FAIL
QA_BLOCKED
```

### 9. Release review

Command:

- `cocos-release-review`

Decision states:

```text
FIRST_MVP_ACCEPTED
FIRST_MVP_NOT_ACCEPTED
RELEASE_BLOCKED
```

`FIRST_MVP_ACCEPTED` accepts the current MVP only. It does not authorize scope expansion.

## Example

See [../../examples/moonlight-delivery/README.md](../../examples/moonlight-delivery/README.md) and [../../docs/success-cases/moonlight-delivery.md](../../docs/success-cases/moonlight-delivery.md).
