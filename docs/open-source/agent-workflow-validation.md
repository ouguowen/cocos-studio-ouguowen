# Agent Workflow Validation

This document defines a documentation-only validation design for future
multi-Agent workflow checks. It does not create Agents, create `agents/*` files,
modify protocols, implement runtime behavior, connect Cocos/MCP, run browser
preview, or create example projects.

## Purpose

Agent workflow validation proves that a multi-Agent process can preserve scope,
approval, handoff clarity, failure handling, and audit logging. It is a process
validation design, not an Agent implementation and not autonomous execution.

## Trigger-Only Activation

Do not load this document by default.

Load it only when the user explicitly asks for:

- Agent workflow validation
- multi-Agent handoff proof
- Agent process audit
- approval checkpoint review
- failure recovery review

Trigger-only activation preserves Fast Build Mode and prevents Agent validation
from becoming default context.

## Controlled Workflow Example

Example workflow:

```text
Planner -> Designer -> Coder -> QA
```

This example is a validation structure only. It does not create real Agents and
does not authorize file writes.

Planner:

- clarifies goal, scope, forbidden files, and stop conditions
- outputs a scoped task brief
- stops before implementation or project inspection unless approved

Designer:

- reviews design intent and acceptance criteria
- outputs design constraints and expected user-facing result
- stops if the task expands into unapproved systems

Coder:

- proposes or applies implementation only after explicit pre-write approval
- outputs changed files and validation commands
- stops on unexpected files, forbidden paths, or runtime uncertainty

QA:

- reviews proof, validation output, diff scope, and blockers
- outputs PASS, NEEDS_REPAIR, or BLOCKED
- does not approve new scope by itself

## Message Format

Each handoff message should include:

```text
from:
to:
task:
approved_scope:
forbidden_scope:
inputs:
expected_output:
approval_status:
stop_conditions:
validation_required:
audit_notes:
```

Messages should be short, explicit, and tied to the current task only.

## Approval Checkpoints

Human approval is required before:

- starting a write step
- reading real project files
- accessing project memory
- using Cocos Creator, Cocos MCP, browser preview, or runtime console state
- changing approved file scope
- handing off to a role with broader authority
- staging, committing, pushing, tagging, or releasing
- claiming runtime proof or workflow completion

Approval does not carry forward automatically between steps.

## Failure Recovery

If validation fails, stop the workflow and report:

- failing step
- expected result
- actual result
- changed files, if any
- unexpected files, if any
- suspected cause
- smallest repair scope
- whether human approval is required before repair

Do not continue to the next Agent role until the failure is repaired or the user
explicitly approves a new direction.

## Audit Logging

An audit log for the workflow should record:

- workflow name
- participating roles
- handoff messages
- approvals
- validation commands
- validation results
- blockers
- repairs
- final result
- optional next recommended command

`next recommended command` is optional advice only. It is not approval and must
not trigger automatic continuation.

## Fast Build Mode Preservation

Fast Build Mode is preserved by these rules:

- do not load this validation design by default
- keep the example workflow documentation-only
- avoid loading Agent, proof, archive, memory, runtime, or example context unless
  directly triggered
- keep validation output compact
- stop after each approved workflow slice
- safety completeness wins over compact output

## Non-Implementation Boundary

This document creates no Agents.
It creates no `agents/*` files.
It modifies no protocols.
It adds no runtime behavior.
It connects no Cocos/MCP provider.
It creates no example project.
It authorizes no autonomous execution.
