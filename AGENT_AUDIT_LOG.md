# Agent Audit Log

Use this file as a template for recording Agent work.

## Audit law

- Every important Agent action should leave a short trace.
- Record decisions, not just outputs.
- Record rejected paths when they matter.
- Do not mark suggested tests as executed tests.

## Log template

```md
# Agent Audit Entry

## entry_id

## date

## project

## agent

## role

## command_used

## input_artifacts

## output_artifacts

## decisions_made

## assumptions_used

## risks_found

## validation_done

## validation_not_done

## handoff_target

## next_required_action

## status
- accepted
- accepted_with_changes
- blocked
- rejected
```

## Example

```md
# Agent Audit Entry

## entry_id
audit-0001

## date
2026-06-22

## project
Attack Defense City

## agent
cocos-game-designer

## role
Game Designer

## command_used
cocos-game-brief

## output_artifacts
- first game brief
- MVP proof
- explicit non-goals

## decisions_made
- MVP is one map, one enemy family, one victory rule, one fail rule.

## assumptions_used
- Single-player first version.
- No ads or IAP in MVP.

## risks_found
- Could overbuild unit types too early.

## validation_done
- Checked against MVP Scope Gate.

## validation_not_done
- No playtest yet.

## handoff_target
cocos-architect

## next_required_action
Define Cocos runtime architecture for the MVP battle loop.

## status
accepted_with_changes
```
