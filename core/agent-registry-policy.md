# Agent Registry Policy

This policy defines the foundation for future Agent registration. It is policy
documentation only. It does not create Agents, implement Agent execution, add
runtime behavior, integrate Cocos/MCP, or store project-specific memory.

## Purpose

The Agent Registry gives future Agent work a controlled identity and lifecycle
model. It preserves Fast Build Mode by staying trigger-controlled and unloaded
by default unless a task directly asks for Agent registration, Agent governance,
or Agent lifecycle review.

## Agent Identity Model

Every registered Agent must have a stable identity record:

- agent id: a unique, stable identifier for references and audit logs
- agent name: a human-readable name
- agent role: the production role the Agent supports
- agent responsibility: the bounded work the Agent may help with
- agent lifecycle status: the current lifecycle state

An Agent identity is not permission to act. Read access, write access, project
access, and Cocos/MCP access are controlled by the Permission Policy and require
the appropriate human approval.

## Agent Registration Rules

An Agent becomes registered only when a human-approved registry entry exists.

Required metadata:

- agent id
- agent name
- role category
- responsibility statement
- owner or approving human
- version
- lifecycle status
- allowed inputs
- expected outputs
- stop conditions
- related permission boundary

Registration must not grant default write access, default project inspection,
default memory access, or default Cocos/MCP access.

## Agent Role Categories

Allowed role categories may include:

- Planning Agent: helps scope goals, milestones, and task breakdowns
- Design Agent: helps with game design, systems, UX, balance, or content shape
- Art Agent: helps with asset planning, art direction, naming, and review
- Engineering Agent: helps with architecture, implementation planning, and code
  review inside approved scope
- QA Agent: helps with acceptance criteria, test planning, and proof review
- Release Agent: helps with release checklist, changelog, versioning, and CI
  status review

New categories must be introduced through explicit review. A category does not
authorize autonomous execution.

## Agent Scope Boundary

Agents may access only the material approved for the current task.

Agents can access:

- lightweight Skill routing context when directly relevant
- explicitly named files
- approved Agent registry metadata
- approved project memory inputs, when memory access is triggered and scoped
- approved diffs, validation output, and status checks

Agents cannot access by default:

- real Cocos project files
- project-specific memory
- private project paths
- Cocos Creator, Cocos MCP, browser preview, or runtime console state
- proof, example, archive, or extension docs outside the current trigger
- files outside the approved read/write scope

The Permission Policy owns final authority for read/write access, high-impact
changes, memory access, Cocos/MCP access, and human approval gates. This Agent
Registry Policy defines identity and lifecycle only.

## Agent Lifecycle

Agent lifecycle states:

1. create: a proposed Agent identity is drafted, but not trusted or active.
2. register: required metadata is reviewed and approved.
3. active: the Agent may be selected for explicitly approved tasks inside its
   scope.
4. suspended: the Agent remains documented but must not be used until reviewed.
5. retired: the Agent is preserved for history but must not be used for new
   work.

Lifecycle changes require human approval and must not happen automatically.

## Fast Build Mode Preservation

The Agent Registry must preserve Fast Build Mode:

- do not load Agent registry policy by default
- do not load Agent metadata unless an Agent task is directly triggered
- do not create runtime behavior
- do not execute tasks automatically
- do not continue from one Agent task to another without explicit user approval
- keep Agent registry review compact unless an audit requests detail

## Human Approval

Human approval remains required before:

- registering a new Agent
- changing an Agent role, responsibility, owner, version, or lifecycle status
- giving an Agent access to project memory
- giving an Agent access to real Cocos project files
- allowing Cocos/MCP/browser preview use
- allowing file writes, staging, commits, pushes, tags, or releases
- promoting any Agent behavior into core workflow

No Agent may execute autonomously. An Agent can support an approved task, but it
does not own approval, scope expansion, runtime proof, rollback, or release.
