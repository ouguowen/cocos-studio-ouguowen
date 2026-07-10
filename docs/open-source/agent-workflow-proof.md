# Agent Workflow Proof

This document defines how future Agent workflow proof should be described,
reviewed, and audited. It is documentation only. It does not create Agents,
implement Agent behavior, create files under `agents/`, add runtime behavior,
integrate Cocos/MCP, run browser preview, or authorize autonomous execution.

## Purpose

Agent workflow proof exists to show that an Agent-assisted process can move from
one controlled step to the next without losing scope, approval, auditability, or
rollback discipline. It is a governance proof, not a runtime proof and not a
claim that Agents can execute independently.

## Agent Workflow Lifecycle

A controlled Agent workflow follows this lifecycle:

1. Request: a user asks for Agent-assisted planning, review, QA, release, or
   other workflow support.
2. Scope: the active repository or project path, allowed files, forbidden files,
   expected output, and stop conditions are declared.
3. Approval: the human approves the workflow boundary before any write,
   project-specific read, Cocos/MCP access, or memory access.
4. Activation: the Agent workflow is activated only for the approved task.
5. Handoff: each transition records source, target, input, output, and approval
   status.
6. Verification: validation, diff review, or audit checks confirm the result.
7. Close: the workflow stops after the approved task and does not continue
   automatically.
8. Archive: proof records are kept only as approved documentation or audit
   history.

## Agent Handoff Rules

Agent handoff must be explicit and reviewable.

Controlled non-runtime validation example:

```text
Planner -> Designer -> Coder -> QA
```

This example is a documentation-only workflow proof. It does not create Agents,
execute tasks, modify runtime files, connect Cocos/MCP, or authorize autonomous
handoff.

Example handoff chain:

1. Planner defines the goal, approved scope, forbidden scope, and stop
   conditions.
2. Designer converts the scoped goal into design intent and acceptance criteria.
3. Coder prepares or performs only the explicitly approved documentation or code
   task.
4. QA reviews scope, validation output, diff status, blockers, and proof
   honesty.

Each handoff should state:

- source Agent or role
- target Agent or role
- task summary
- approved scope
- input artifacts
- expected output
- stop conditions
- validation or review requirement
- human approval status

Suggested message format:

```text
from:
to:
workflow_step:
approved_scope:
forbidden_scope:
input:
expected_output:
permission_checkpoint:
stop_conditions:
validation_required:
audit_note:
```

A handoff does not grant new permissions. The target Agent inherits only the
approved scope for that handoff and must stop if the task requires new files,
new project paths, Cocos/MCP access, runtime proof, or memory writes.

## Human Approval Checkpoints

Human approval is required before:

- starting an Agent workflow that writes files
- reading or storing project-specific information
- changing approved scope
- handing off to another Agent with broader authority
- using Cocos Creator, Cocos MCP, browser preview, or runtime console state
- modifying runtime, Cocos project, generated, package, release, or CI files
- staging, committing, pushing, tagging, or releasing
- treating a proof workflow as complete

Approval is task-local. Prior approval does not authorize future Agent
execution.

## Trigger-Only Activation Model

Agent workflow proof is trigger-only.

Do not load this document by default. Load it only when the user explicitly asks
for Agent workflow proof, Agent handoff review, Agent governance validation, or
multi-Agent process audit.

Trigger-only activation means:

- no default Agent execution
- no default Agent registry loading
- no default project memory access
- no default proof or example loading
- no default Cocos/MCP or browser preview use
- no automatic continuation from `next recommended command`

## Failure Handling

If an Agent workflow fails, stop and report the blocker.

Failure conditions include:

- missing approval
- unclear active project path
- unexpected files
- forbidden file changes
- validation failure
- broken handoff record
- scope expansion
- Cocos/MCP access request without approval
- project memory access request without approval
- inability to verify proof honestly

Repair must be narrow, explicitly approved, and limited to the failing workflow
boundary. Do not proceed to the next workflow step until the failure is resolved
or the user approves a new direction.

## Audit Trail Requirements

An Agent workflow proof record should include:

- workflow name
- date or version marker when available
- active repository or project path, if approved
- participating Agent roles
- approved scope
- forbidden scope
- handoff steps
- validation checks
- failure or blocker notes
- final result
- next recommended command, if any

`next recommended command` is optional advice only. It is not approval, not a
handoff trigger, and not automatic continuation.

## Fast Build Mode Preservation

Fast Build Mode must remain lightweight:

- do not load Agent workflow proof by default
- do not load Agent, proof, archive, memory, example, or runtime context unless
  directly triggered
- keep workflow proof reports compact
- stop at approval boundaries and failure conditions
- preserve validation and proof honesty even when output is compact

## Non-Implementation Boundary

This document creates no Agents.
It authorizes no autonomous execution.
It creates no runtime behavior.
It creates no Cocos/MCP integration.
It creates no browser preview workflow.
It stores no project-specific memory.
