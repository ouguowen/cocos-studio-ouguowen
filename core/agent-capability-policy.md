# Agent Capability Policy

This policy defines how future Agent capabilities are described and governed. It
is policy documentation only. It does not implement Agents, create runtime
behavior, integrate Cocos/MCP, load by default, or grant permission to act.

## Purpose

Capabilities describe what an Agent may help with after a human explicitly
selects that Agent and approves the task scope. A capability is not an action,
not a permission grant, and not approval to inspect or modify any project.

## Capability Model

Each capability must be described with stable metadata:

- capability_id: a unique identifier for audit and registry references
- capability_name: a short human-readable name
- capability_description: the bounded work the capability can support
- capability_owner: the human or team responsible for maintaining the
  capability definition
- capability_status: the lifecycle state of the capability

Capability status values may include:

- proposed
- active
- suspended
- retired

Status changes require human review and must not happen automatically.

## Capability Categories

Capabilities may be grouped into broad production categories:

- Planning: scoping, milestone shaping, task breakdown, and readiness checks
- Design: game design, system design, UX, balance, and content structure
- Art: asset planning, art direction, naming, review, and placeholder policy
- Engineering: architecture, implementation planning, code review, and
  approved-scope technical execution support
- QA: acceptance criteria, validation planning, proof review, and regression
  checks
- Release: versioning, changelog review, CI status review, tag/release
  preparation, and rollout checklist support

Categories organize capability discovery. They do not grant execution authority.

## Capability Boundary

A capability allows an Agent to help reason about an approved task inside its
declared category and scope.

A capability can allow:

- reading explicitly approved context
- proposing plans, checks, or acceptance criteria
- preparing bounded documentation or code changes after approval
- reviewing diffs and validation output inside approved scope
- reporting blockers and stop conditions

A capability cannot:

- execute tasks autonomously
- grant write access
- bypass human approval
- inspect real Cocos project files by default
- use Cocos Creator, Cocos MCP, browser preview, or runtime console by default
- read or write project memory by default
- expand task scope
- stage, commit, push, tag, or release without explicit approval
- claim runtime proof without actual approved proof or a declared blocker

## Capability and Permission Relationship

Capability sits between Agent identity and permission. The control chain is:

```text
Agent Identity
        |
        v
Capability
        |
        v
Permission
        |
        v
Action
```

- Agent Identity defines who or what is acting.
- Capability defines what kind of help the Agent may provide.
- Permission defines what the Agent may read, write, run, or verify for the
  current task.
- Action happens only after permission and human approval are in place.

Capability never replaces the Permission Policy. If capability and permission
conflict, the stricter boundary wins.

## Human Approval Gates

Human approval remains required before:

- activating or retiring a capability
- expanding capability scope
- applying a capability to a real project
- reading project-specific information
- writing files
- using Cocos Creator, Cocos MCP, browser preview, or runtime proof channels
- accessing project memory
- staging, committing, pushing, tagging, or releasing
- promoting a capability into default or core workflow

No capability authorizes autonomous Agent execution.

## Fast Build Mode Preservation

Fast Build Mode must remain lightweight:

- do not load this policy by default
- do not load capability catalogs unless directly triggered
- do not load Agent, memory, proof, archive, or extension context by default
- keep capability review compact unless an audit requests detail
- stop after the approved capability task unless the user explicitly approves
  continuation

Safety completeness still wins over compact output.
