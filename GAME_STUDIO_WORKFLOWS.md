# Game Studio Workflows

Use this file for command-level workflows.

## Workflow 1: New Cocos Game

```text
cocos-brainstorm-game
-> cocos-game-brief
-> cocos-classify-game
-> cocos-gdd
-> cocos-project-context
-> cocos-game-architecture
-> cocos-sprint-planning
-> cocos-create-story
-> cocos-dev-story
-> cocos-code-review
```

Required gates:

- Game Classification Gate
- MVP Scope Gate
- Project Memory Gate
- Architecture Gate
- QA Gate

## Workflow 2: Fast MVP Prototype

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-quick-prototype
-> cocos-playtest-plan
-> cocos-code-review
```

Rules:

- Do not add monetization.
- Do not add live operations.
- Do not build full inventory unless required by the prototype.
- Use placeholder assets unless visual readability blocks testing.

## Workflow 3: One Concrete Module

```text
cocos-create-story
-> cocos-dev-story
-> cocos-code-review
```

Required facts before implementation:

- module goal
- owner
- approver
- required runtime data
- required buttons/actions
- completion standard

## Workflow 4: Existing Messy Project Rescue

```text
cocos-document-project
-> cocos-project-context
-> cocos-game-architecture
-> cocos-sprint-planning
-> cocos-code-review
```

Repair order:

1. ownership
2. architecture boundaries
3. project memory
4. config validation
5. QA gate
6. feature cleanup

## Workflow 5: Solo Developer Mode

```text
cocos-solo-dev
-> current hat
-> current command
-> required artifact
-> gate check
-> next hat
```

Solo rule:

One person may wear many hats, but one response must not silently bypass another hat's gate.
