# AI Game Studio System

Use this file when upgrading `cocos-studio-ouguowen` from a Cocos production-system skill into an AI-assisted game studio.

## Core idea

The studio is built from three reusable layers:

```text
AI Agent + Workflow + Knowledge
```

- **AI Agent**: the role that performs or reviews work.
- **Workflow**: the controlled sequence that prevents chaotic execution.
- **Knowledge**: the project rules, Cocos constraints, memory, schemas, templates, and gates that keep work consistent.

When local Cocos Creator work must be executed, the current Cocos automation tool or MCP provider may be used as an execution channel. It is not a fourth identity layer and it must not hard-code this skill to one commercial provider, one future official provider, or one command dialect.

## Studio law

- No Agent works without a named role.
- No task advances without a workflow step.
- No result is accepted without a review gate.
- No AI output becomes project truth without a human owner.
- No implementation begins before the required project knowledge is loaded.
- No automation result is accepted without task-appropriate proof: scene hierarchy, component bindings, Console output, preview evidence, generated files, or PASS/FAIL notes.
- No single example game type becomes the whole skill's identity.
- Agent expansion must serve Cocos production closure, not role inflation.

## Game-type stance

`cocos-studio-ouguowen` is a multi-game-type production brain for Cocos Creator 3.8.8.

- The modern city attack-defense pack is the first example pack and validation sample.
- Future game types should be added as selected templates or example packs, not as one universal architecture.
- Use classification before choosing architecture, data shape, and MVP proof.
- Keep each implementation sprint focused on one selected game type and one MVP goal.

## Automation provider stance

Use automation only when it is available, authorized, and useful.

- Prefer provider-neutral intents such as create scene, create node, add component, bind prefab, save, preview, read Console, and return proof.
- If the current commercial MCP can perform the operation, Codex may use it.
- If a Cocos official MCP becomes available later, Codex may use it instead.
- If no provider is available or a provider fails, fall back to manual Cocos Creator steps or stop with a blocker report.
- Do not add provider-specific files, protocol layers, or command names unless the user explicitly asks for that provider to be formalized in the repository.

## 12-Agent Cocos Studio structure

This is a Cocos Creator 3.8.8 focused 12-Agent Studio.

It is not a 49-Agent generic Claude Code template. Agent count must serve Cocos production closure, not role inflation.

### Director / Control Layer

- `cocos-producer`
- `cocos-solo-dev`

### Design / Architecture / Audit Layer

- `cocos-game-designer`
- `cocos-architect`
- `cocos-skill-auditor`
- `cocos-config-designer`

### Implementation / Validation Layer

- `cocos-dev`
- `cocos-ui-programmer`
- `cocos-scene-builder`
- `cocos-runtime-validator`
- `cocos-qa`
- `cocos-release-reviewer`

## Agent role map

| Agent | Studio role | Primary responsibility |
|---|---|---|
| `cocos-producer` | Producer / Project Owner | scope, milestone, priority, acceptance direction |
| `cocos-game-designer` | Game Designer | core loop, level intent, mechanic rules, MVP proof |
| `cocos-architect` | Technical Director | Cocos architecture, system boundaries, resource law |
| `cocos-dev` | Cocos Developer | TypeScript/Cocos implementation and integration |
| `cocos-qa` | QA Reviewer | tests, acceptance, risk, gate status |
| `cocos-solo-dev` | Solo Studio Operator | simplified one-person workflow with explicit hat switching |
| `cocos-skill-auditor` | Skill Auditor / Process QA | rule conflicts, command routing, gate coverage, self-test status |
| `cocos-runtime-validator` | Runtime Validator | Editor, browser preview, Console, marker, Preview Visibility Gate |
| `cocos-ui-programmer` | UI Programmer | UI structure, HUD, buttons, panels, Labels, UI interactions |
| `cocos-config-designer` | Config / Numerical Designer | config schema, placeholder values, legal ranges, validation rules |
| `cocos-scene-builder` | Scene Builder / Prefab Integrator | scene nodes, prefab assembly, component binding, resource references |
| `cocos-release-reviewer` | Release Reviewer / Final Gate Owner | release readiness, blocker summary, go/no-go recommendation |

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
-> automation/manual Cocos execution when required
-> runtime validation when required
-> QA review
-> release review when required
-> acceptance log
```

## What this adds to the existing skill

The current skill already has stage, production, ownership, Cocos architecture, config, quality gates, release, and AI collaboration rules.

This system adds:

- command-style entry points
- 12-Agent Cocos Studio role registry
- handoff message schema
- audit log discipline
- safety and path-scope guardrails
- extended self-test modes
- beginner-ready example project data
- NPM validation scripts
- multi-game-type stance
- automation-provider-neutral execution rules
