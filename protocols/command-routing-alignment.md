# Command Routing Alignment

Use this file as the canonical alignment checklist for safety, audit, runtime proof, diff review, and Agent-routing commands. `core/commands.md` should stay consistent with this file.

## Safety and integration command routing

| Command | Required files |
|---|---|
| `cocos-command-safety` | `protocols/ai-command-permissions.md`, `protocols/quality-gates.md` |
| `cocos-write-approval` | `protocols/write-approval.md`, `protocols/quality-gates.md` |
| `cocos-path-rules` | `protocols/cocos-path-scope.md`, `protocols/cocos-resource-risk-matrix.md`, `protocols/quality-gates.md` |
| `cocos-hook-plan` | `protocols/cocos-hook-validation-plan.md`, `protocols/cocos-automated-checks.md` |
| `cocos-auto-checks` | `protocols/cocos-automated-checks.md`, `templates/checklists/core.md` |
| `cocos-risk-matrix` | `protocols/cocos-resource-risk-matrix.md`, `protocols/quality-gates.md` |
| `cocos-diff-review` | `protocols/git-diff-review.md`, `protocols/quality-gates.md` |
| `cocos-runtime-proof` | `protocols/runtime-proof.md`, `protocols/quality-gates.md` |
| `cocos-skill-change-review` | `protocols/skill-change-review.md`, `protocols/skill-self-test-modes.md`, `protocols/quality-gates.md` |
| `cocos-agent-registry` | `AGENT_REGISTRY.md` |
| `cocos-agent-handoff` | `AGENT_HANDOFF_PROTOCOL.md`, `AGENT_MESSAGE_SCHEMA.md` |
| `cocos-agent-audit` | `AGENT_REGISTRY.md`, `AGENT_HANDOFF_PROTOCOL.md`, `AI_GAME_STUDIO_SYSTEM.md`, `protocols/skill-change-review.md` |
| `cocos-skill-self-test` | `protocols/skill-validation-loop.md`, `protocols/skill-test-cases.md`, `protocols/skill-extended-safety-test-cases.md`, `protocols/skill-self-test-modes.md`, `protocols/quality-gates.md` |

## Required self-test command forms

```text
cocos-skill-self-test --core
cocos-skill-self-test --safety
cocos-skill-self-test --runtime
cocos-skill-self-test --diff
cocos-skill-self-test --agent
cocos-skill-self-test --all
```

## Completion rule

A routing change is complete only when these references are consistent across `SKILL.md`, `core/commands.md`, `core/module-index.md`, and `protocols/quality-gates.md`, or when this file is used as the explicit alignment artifact until the primary registries are updated.
