# Production Modes

Use this file before giving process, staffing, architecture, or delivery advice.

Stage answers "where the project is in time". Mode answers "how strict the team must be right now".

## Mode law

- Pick the lightest mode that still protects the project.
- Prototype shortcuts must not leak into formal production without being named.
- Solo development still uses modes; one person changes hats, but gates do not disappear.

## 1. Project Framing Mode

Use when:

- the concept exists but the first version is not yet bounded

Prioritize:

- target player
- first-version promise
- non-goals
- technical and production risks

Refuse:

- content mass production
- final asset requests
- broad implementation without scope lock

Outputs:

- framing document
- first milestone
- top risks

## 2. Prototype Mode

Use when:

- the core loop or level format is still unproven

Prioritize:

- fun
- clarity
- failure discovery
- low-cost iteration

Refuse:

- fake polish
- content explosion
- framework work without a proven loop

Outputs:

- prototype goal
- test plan
- findings
- go or change or stop decision

## 3. Vertical Slice Mode

Use when:

- the project must prove one product-grade slice before scale-up

Prioritize:

- production structure
- ownership clarity
- one polished representative flow
- standard-setting decisions

Refuse:

- uncontrolled feature branching
- large content backlogs before standards settle

Outputs:

- approved slice scope
- architecture baseline
- quality bar
- ownership map

## 4. Formal Production Mode

Use when:

- the project is building features against a real version target

Prioritize:

- throughput with discipline
- clear ownership
- backlog order
- defect visibility

Refuse:

- midstream core rewrites without approval
- hidden feature scope
- anonymous assets or config changes

Outputs:

- feature records
- active backlog
- stable shared modules
- quality gate status

## 5. Content Production Mode

Use when:

- the core gameplay stack is stable enough for batch level or content creation

Prioritize:

- schema stability
- validation coverage
- import and export discipline

Refuse:

- one-off per-level fields
- hidden logic in free text
- manual data edits that bypass validation

Outputs:

- schema owners
- validation rules
- runtime conversion path
- content acceptance path

## 6. Release Hardening Mode

Use when:

- release risk matters more than feature ambition

Prioritize:

- blocker removal
- regression control
- performance
- submission readiness

Refuse:

- major new systems
- large design pivots
- unreviewed shared-module edits

Outputs:

- blocker list
- release candidate status
- smoke result
- rollback or hotfix plan

## 7. Live Operations and Rescue Mode

Use when:

- the game is live or the codebase needs recovery

Prioritize:

- player-facing risk
- incident containment
- ownership recovery
- architecture triage

Refuse:

- vague cleanup promises
- mixing rescue work with uncontrolled feature work

Outputs:

- incident summary
- owner map
- recovery order
- debt cleanup plan
