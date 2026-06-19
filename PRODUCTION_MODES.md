# Production Modes

Use this file before giving process, staffing, architecture, or delivery advice.

Stage answers "where the project is in time". Mode answers "how strict the team must be right now". One stage may use more than one mode for different workstreams.

## Mode law

- Pick the lightest mode that still protects the project.
- Do not apply release-grade process to a one-day fun test.
- Do not use prototype shortcuts inside formal production without naming the exception.
- If the project is solo, mode still applies. One person changes hats; the gates do not disappear.

## 1. Project Framing Mode

Use when:

- the game concept exists but the first version is not yet bounded
- scope drift is more dangerous than delivery speed

Prioritize:

- target player
- first-version promise
- non-goals
- technical and production risks

Allow:

- rough documents
- benchmark examples
- high-level architecture options

Refuse:

- content mass production
- final asset requests
- broad system implementation without scope lock

Required outputs:

- framing document
- first milestone
- top risks

## 2. Prototype Mode

Use when:

- the core loop must prove fun, clarity, and feasibility fast
- a mechanic or level format is still unproven

Prioritize:

- playable loop
- readable feedback
- failure discovery
- low-cost iteration

Allow:

- placeholder art
- narrow one-off scenes
- temporary code inside explicit prototype boundaries

Refuse:

- fake polish that hides weak gameplay
- content explosion
- reusable framework work with no proven loop

Required outputs:

- prototype goal
- test plan
- findings
- go or change or stop decision

## 3. Vertical Slice Mode

Use when:

- the project must prove product-grade execution on one small slice
- the team needs real standards before scale-up

Prioritize:

- production structure
- ownership clarity
- one polished representative flow
- standard-setting decisions

Allow:

- selected polished assets
- production-grade UI and scene flow
- baseline content pipeline

Refuse:

- uncontrolled feature branching
- large content backlogs before standards settle

Required outputs:

- approved slice scope
- architecture baseline
- quality bar
- asset and system ownership

## 4. Formal Production Mode

Use when:

- the project is feature-building against a real version target
- shared systems and pipelines are already approved

Prioritize:

- throughput with discipline
- clear ownership
- backlog order
- defect visibility

Allow:

- parallel feature work
- production asset flow
- table-driven level/content authoring

Refuse:

- midstream core rewrites without formal approval
- hidden feature scope
- anonymous assets or config changes

Required outputs:

- feature records
- active backlog
- stable shared modules
- quality gate status

## 5. Content Production Mode

Use when:

- the core gameplay stack is stable enough for many levels, enemies, maps, or reward sets
- level designers or content authors must work at scale

Prioritize:

- schema stability
- batch authoring rules
- validation coverage
- import/export discipline

Allow:

- CSV or sheet authoring
- generated JSON
- editor-exported map points and registries

Refuse:

- per-level one-off fields
- hidden logic in free text
- manual data edits that bypass validation

Required outputs:

- approved schema owners
- validation rules
- runtime conversion path
- content acceptance checklist

## 6. Release Hardening Mode

Use when:

- the build is near release and risk control is more important than feature ambition

Prioritize:

- blocker removal
- regression control
- performance
- store and submission readiness

Allow:

- bug fixes
- optimization
- low-risk content corrections

Refuse:

- major new systems
- large design pivots
- unreviewed shared-module edits

Required outputs:

- blocker list
- release candidate status
- smoke result
- rollback or hotfix plan

## 7. Live Operations and Rescue Mode

Use when:

- the game is live
- the codebase is drifting or a recovery effort is needed

Prioritize:

- player-facing risk
- incident containment
- ownership recovery
- architecture triage

Allow:

- emergency hotfixes
- targeted rollback
- temporary containment actions with explicit cleanup ownership

Refuse:

- vague "we will clean it later" promises
- mixing rescue work with uncontrolled feature work

Required outputs:

- incident summary
- owner map
- recovery order
- debt cleanup plan
