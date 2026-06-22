# AI Game Studio System

Use this file when upgrading `cocos-studio-ouguowen` from a Cocos production-system skill into an AI-assisted game studio.

## Core idea

The studio is built from three layers:

```text
AI Agent + Workflow + Knowledge
```

- **AI Agent**: the role that performs or reviews work.
- **Workflow**: the controlled sequence that prevents chaotic execution.
- **Knowledge**: the project rules, Cocos constraints, memory, schemas, templates, and gates that keep work consistent.

## Studio law

- No Agent works without a named role.
- No task advances without a workflow step.
- No result is accepted without a review gate.
- No AI output becomes project truth without a human owner.
- No implementation begins before the required project knowledge is loaded.

## Default studio roles

| Agent | Studio role | Primary responsibility |
|---|---|---|
| `cocos-producer` | Producer / Project Owner | scope, milestone, priority, acceptance direction |
| `cocos-game-designer` | Game Designer | core loop, level intent, mechanic rules, MVP proof |
| `cocos-architect` | Technical Director | Cocos architecture, system boundaries, resource law |
| `cocos-dev` | Cocos Developer | TypeScript/Cocos implementation and integration |
| `cocos-qa` | QA Reviewer | tests, acceptance, risk, gate status |
| `cocos-solo-dev` | Solo Studio Operator | simplified one-person workflow with explicit hat switching |

## Default execution chain

```text
idea
-> game brief
-> classification
-> MVP
-> project memory
-> architecture
-> story/task
-> implementation
-> QA review
-> acceptance log
```

## What this adds to the existing skill

The current skill already has stage, production, ownership, Cocos architecture, config, quality gates, release, and AI collaboration rules.

This system adds:

- command-style entry points
- Agent role registry
- handoff message schema
- audit log discipline
- beginner-ready example project data
- NPM validation scripts
