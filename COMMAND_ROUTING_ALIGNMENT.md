# Command Routing Alignment

Use this file as the canonical alignment checklist for safety, audit, runtime proof, diff review, and Agent-routing commands. `COMMANDS.md` should stay consistent with this file.

## Safety and integration command routing

| Command | Required files |
|---|---|
| `cocos-command-safety` | `AI_COMMAND_PERMISSION_RULES.md`, `QUALITY_GATES.md` |
| `cocos-write-approval` | `CODEX_WRITE_APPROVAL_PROTOCOL.md`, `QUALITY_GATES.md` |
| `cocos-path-rules` | `COCOS_PATH_SCOPED_RULES.md`, `COCOS_RESOURCE_RISK_MATRIX.md`, `QUALITY_GATES.md` |
| `cocos-hook-plan` | `COCOS_HOOK_VALIDATION_PLAN.md`, `COCOS_AUTOMATED_CHECKS.md` |
| `cocos-auto-checks` | `COCOS_AUTOMATED_CHECKS.md`, `CHECKLISTS.md` |
| `cocos-risk-matrix` | `COCOS_RESOURCE_RISK_MATRIX.md`, `QUALITY_GATES.md` |
| `cocos-diff-review` | `GIT_DIFF_REVIEW_PROTOCOL.md`, `QUALITY_GATES.md` |
| `cocos-runtime-proof` | `RUNTIME_PROOF_PROTOCOL.md`, `QUALITY_GATES.md` |
| `cocos-skill-change-review` | `SKILL_CHANGE_REVIEW_PROTOCOL.md`, `SKILL_SELF_TEST_MODES.md`, `QUALITY_GATES.md` |
| `cocos-agent-registry` | `AGENT_REGISTRY.md` |
| `cocos-agent-handoff` | `AGENT_HANDOFF_PROTOCOL.md`, `AGENT_MESSAGE_SCHEMA.md` |
| `cocos-agent-audit` | `AGENT_REGISTRY.md`, `AGENT_HANDOFF_PROTOCOL.md`, `AI_GAME_STUDIO_SYSTEM.md`, `SKILL_CHANGE_REVIEW_PROTOCOL.md` |
| `cocos-skill-self-test` | `SKILL_VALIDATION_LOOP.md`, `SKILL_TEST_CASES.md`, `SKILL_EXTENDED_SAFETY_TEST_CASES.md`, `SKILL_SELF_TEST_MODES.md`, `QUALITY_GATES.md` |

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

A routing change is complete only when these references are consistent across `SKILL.md`, `COMMANDS.md`, `MODULE_INDEX.md`, and `QUALITY_GATES.md`, or when this file is used as the explicit alignment artifact until the primary registries are updated.
