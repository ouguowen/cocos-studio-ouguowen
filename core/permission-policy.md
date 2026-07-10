# Permission Policy

This policy defines controlled Agent permissions for Skill-guided work. It is
policy documentation only. It does not implement Agents, create runtime behavior,
store real project data, or store project-specific memory.

## Purpose

The Permission Layer keeps AI-assisted work explicit, scoped, and reversible.
It preserves Fast Build Mode by staying trigger-controlled and out of the
default context path unless a task directly asks for permission review, Agent
authority, project memory access, or high-impact change control.

## Agent Identity Model

Each Agent must have a declared identity before it acts:

- role: the job the Agent is performing, such as planner, implementer, reviewer,
  QA, release helper, or documentation maintainer
- authority: what the Agent may read, suggest, edit, validate, stage, or report
- scope: the approved repository, project path, file set, and task boundary
- output: the expected artifact or decision
- stop conditions: events that require the Agent to stop and ask for human
  approval

Agents do not receive default write access. A named Agent role is not permission
to modify files, inspect real projects, run Cocos/MCP, or continue work outside
the approved task.

## Read Permissions

Read access is trigger-controlled.

Allowed by default:

- lightweight Skill routing files required by the current task
- files explicitly named by the user
- files needed to verify the approved scope, such as `git status` and narrow
  diffs

Requires explicit approval:

- real Cocos project files
- project-specific memory
- private or user-provided project paths
- Cocos Creator, Cocos MCP, browser preview, or runtime console inspection
- large proof, example, archive, Agent, or extension indexes outside the current
  trigger

Project-specific information requires explicit project path and scope approval
before it is read, summarized, stored, or reused.

## Write Permissions

Write access is never default.

An Agent may write only when all of these are true:

- the user explicitly approved the write
- the active repository or project path is known
- the allowed file list or file pattern is declared
- forbidden files are declared
- rollback is possible without dangerous Git commands
- the Agent can verify the resulting diff

Agents must not write:

- outside the approved scope
- to real Cocos project files without explicit project work approval
- to `.scene`, `.prefab`, `.anim`, `.meta`, runtime files, or generated assets
  unless explicitly approved for that task
- to project memory unless memory access is directly triggered and approved
- to package, settings, build, CI, release, or core safety files unless the task
  specifically approves them

## Human Approval Gates

Human approval remains required before high-impact changes, including:

- real Cocos project modification
- runtime behavior changes
- generated asset or companion metadata changes
- package, build, CI, settings, or release changes
- broad cleanup or deletion
- Agent permission expansion
- project memory write or retention
- staging, committing, pushing, tagging, or releasing when not already approved

`next recommended command` is optional advice only. It does not grant approval,
extend scope, or authorize automatic continuation.

## Memory Access

Memory access is trigger-controlled and not loaded by default.

Agents may read or write memory only when the user explicitly asks for memory
work or approves a workflow that names memory as an input or output. Memory must
not contain real project facts, project-specific decisions, or validation
history unless the active project path and memory write scope are approved.

Memory updates must record:

- source
- scope
- owner or approving human
- timestamp or version marker when available
- reason for retention
- rollback or retirement path

## Cocos and MCP Access

Cocos Creator, Cocos MCP, browser preview, and real project inspection are not
default permissions.

They require:

- explicit user request for project or engine work
- approved active project path
- approved read/write scope
- clear proof target
- declared stop conditions

Provider availability must not bypass approval gates, path scope, runtime proof
honesty, or rollback discipline.

## Lifecycle

Permission state moves through these stages:

1. Requested: a user asks for work that may need Agent authority.
2. Scoped: allowed files, forbidden files, project path, and outputs are named.
3. Approved: the human approves the specific read or write boundary.
4. Executed: the Agent acts only inside the approved boundary.
5. Verified: validation, diff review, and status checks confirm the result.
6. Closed: the Agent reports the outcome and stops unless the user explicitly
   approves another task.
7. Retired: temporary permissions expire after the task and do not carry forward
   automatically.

Permissions are task-local. Prior approval does not authorize future work.

## Fast Build Mode

Fast Build Mode remains lightweight:

- do not load this policy unless permission rules are directly relevant
- do not load Agent, memory, proof, archive, or extension context by default
- keep reports compact unless a stop condition or audit request requires detail
- safety completeness still wins over compact output
