# Agent Handoff Protocol

Use this file to control Agent-to-Agent collaboration.

## Handoff law

- A handoff must be explicit.
- A handoff must name source and target Agent.
- A handoff must include the required output.
- A handoff must include acceptance criteria.
- A handoff must be recorded in the audit log.

## Standard sequence

```text
Producer
-> Game Designer
-> Architect
-> Developer
-> QA
-> Producer acceptance
```

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
