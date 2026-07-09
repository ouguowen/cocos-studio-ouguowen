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
-> cocos-production-readiness
-> cocos-sprint-planning
-> cocos-create-story
-> cocos-dev-story
-> cocos-code-review
```

Required gates:

- Game Classification Gate
- MVP Scope Gate
- Numerical Design Gate when values matter
- Economy Design Gate when rewards, sources, sinks, currencies, upgrades, ads, shops, or gacha matter
- Animation Presentation Gate when feedback, UI motion, animation, VFX, Spine, Tween, or AnimationClip matter
- Game Production Readiness Gate before broad implementation
- Project Memory Gate
- Architecture Gate
- Preview Visibility Gate when browser proof matters
- QA Gate

## Workflow 2: Fast MVP Prototype

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-quick-prototype
-> cocos-production-readiness when the prototype enters Cocos implementation
-> cocos-playtest-plan
-> cocos-code-review
```

Rules:

- Do not add monetization.
- Do not add live operations.
- Do not build full inventory unless required by the prototype.
- Use placeholder assets unless visual readability blocks testing.
- Production readiness may be a shortcut decision for a tiny prototype, but it must still name skipped gates and allowed scope.

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
- production readiness status if this module starts the first playable or broad game implementation

## Workflow 4: Existing Messy Project Rescue

```text
cocos-document-project
-> cocos-project-context
-> cocos-game-architecture
-> cocos-production-readiness when implementation direction is unclear
-> cocos-sprint-planning
-> cocos-code-review
```

Repair order:

1. ownership
2. architecture boundaries
3. project memory
4. config validation
5. runtime visibility and proof gates
6. QA gate
7. feature cleanup

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
