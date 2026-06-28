# Agent Handoff Protocol

Use this file to control Agent-to-Agent collaboration.

## Handoff law

- A handoff must be explicit.
- A handoff must name source and target Agent.
- A handoff must include the required output.
- A handoff must include acceptance criteria.
- A handoff must be recorded in the audit log.
- Every handoff must produce a reviewable artifact.
- Runtime validation cannot skip preview proof when runtime proof is required.
- Release review cannot bypass QA.
- Skill audit cannot approve game implementation; it can only recommend Skill repairs.

## Standard sequence

```text
cocos-producer
-> cocos-game-designer
-> cocos-architect
-> cocos-dev
-> cocos-qa
-> cocos-producer acceptance
```

## 12-Agent Cocos Studio handoff map

| Source Agent | Target Agent | Required artifact |
|---|---|---|
| `cocos-producer` | `cocos-skill-auditor` | Skill audit request |
| `cocos-skill-auditor` | `cocos-producer` | Skill audit report and repair recommendation |
| `cocos-game-designer` | `cocos-config-designer` | design intent and config need |
| `cocos-config-designer` | `cocos-architect` | config design brief and validation rules |
| `cocos-game-designer` | `cocos-architect` | design brief and system boundary need |
| `cocos-architect` | `cocos-dev` | architecture brief and implementation constraints |
| `cocos-architect` | `cocos-scene-builder` | scene/prefab integration constraints |
| `cocos-scene-builder` | `cocos-runtime-validator` | scene build plan, bindings, and proof requirement |
| `cocos-architect` | `cocos-runtime-validator` | runtime proof requirement and expected marker |
| `cocos-runtime-validator` | `cocos-qa` | runtime validation report and blockers |
| `cocos-dev` | `cocos-ui-programmer` | UI implementation boundary and state source |
| `cocos-ui-programmer` | `cocos-qa` | UI changed files, binding notes, validation result |
| `cocos-dev` | `cocos-qa` | implementation summary and validation notes |
| `cocos-qa` | `cocos-release-reviewer` | QA review and blocker list |
| `cocos-release-reviewer` | `cocos-producer` | release review report and go/no-go recommendation |

## When to hand off

### Producer to Designer

When:

- game idea needs definition
- MVP needs scope lock
- level or mechanic intent is missing

Required artifact:

- game brief
- GDD section
- MVP proof

### Designer to Architect

When:

- core loop is clear
- mechanic rules need runtime boundaries
- config/data model needs technical shape

Required artifact:

- architecture brief
- config schema recommendation
- system boundary plan

### Architect to Developer

When:

- implementation boundaries are approved
- files and systems are named
- data inputs are known

Required artifact:

- dev story
- implementation steps
- validation command

### Developer to QA

When:

- implementation is complete enough to review
- known blockers are declared
- validation has been attempted

Required artifact:

- implementation summary
- changed files
- test notes
- unresolved risks

### QA to Producer

When:

- review is complete
- pass/block status is known
- residual risk is clear

Required artifact:

- QA decision
- blocker list
- acceptance recommendation

## Stop conditions

Stop handoff when:

- target Agent is unclear
- acceptance criteria are missing
- required source truth is missing
- previous gate failed
- the task would expand scope without producer approval
- handoff artifact is missing
- runtime proof is required but unavailable and no blocker is declared
