# Agent Message Schema

Use this file whenever one Agent hands work to another Agent.

## Message law

- A handoff message is not casual chat.
- It must contain enough context for the receiving Agent to act without guessing.
- It must separate facts, assumptions, and decisions.
- It must include acceptance criteria.

## Schema

```md
# Agent Handoff Message

## message_id

## created_at

## source_agent

## target_agent

## project_name

## project_stage

## production_mode

## task_id

## task_title

## current_step

## requested_action

## input_artifacts

## confirmed_facts

## active_assumptions

## locked_decisions

## constraints

## forbidden_scope

## required_output

## acceptance_criteria

## validation_required

## risks_to_watch

## next_agent_after_completion

## audit_log_entry_required
```

## Minimal example

```md
# Agent Handoff Message

## message_id
handoff-0001

## source_agent
cocos-producer

## target_agent
cocos-game-designer

## project_name
Attack Defense City

## project_stage
Project Framing

## task_id
story-brief-001

## task_title
Define MVP battle loop

## requested_action
Create a short game brief and MVP proof for a modern city attack-defense game.

## confirmed_facts
- Engine: Cocos Creator 3.8.8
- User is a solo developer
- Target scene size: 1280x720
- Main style: modern city deployment

## active_assumptions
- First version is single-player
- No monetization in MVP

## constraints
- Keep scope small
- Do not design advanced live-ops systems
- Do not create final art direction yet

## required_output
- game brief
- dominant loop
- MVP must-prove list
- explicit non-goals

## acceptance_criteria
- One repeated player loop is clear
- One victory rule and one fail rule are clear
- Out-of-scope items are explicit

## next_agent_after_completion
cocos-architect
```
