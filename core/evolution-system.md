# Controlled Skill Evolution System

## 1. Purpose

Use this file when a request asks to improve, evolve, upgrade, extend, restructure, or make the Skill smarter.

This system prevents the Skill from growing by reflex. It decides when evolution is needed, when it is not needed, how evidence is reviewed, how validation is scoped, and how rollback remains possible.

## 2. Core principle

The Skill should evolve from repeated real development evidence, not from theoretical completeness.

Evolution must improve real development usefulness without making normal development slower, heavier, or more verbose.

Evolution is controlled, evidence-driven, reviewed, validated, and reversible.

Evolution is not automatic self-modification.

## 3. What evolution is

Evolution is a reviewed change to Skill behavior, routing, commands, gates, templates, validation, or core capability that improves real development outcomes.

Good evolution:

- solves repeated real workflow failure
- protects runtime proof, preview proof, diff safety, or Fast Build execution
- improves routing across multiple game types or workflows
- clarifies a missing safety boundary
- preserves context budgets and normal implementation speed

## 4. What evolution is not

Evolution is not:

- automatic self-modification
- a reason to add every possible rule
- a response to one-off local mistakes
- a way to make Audit Mode the default
- a way to turn every small task into a gate review
- a demand that every new document become first-read context

## 5. Evolution levels

### E0: No Evolution

Use for:

- one-off issue
- user mistake
- temporary environment problem
- browser cache issue
- local Cocos path mistake
- non-repeatable workflow issue

Rules:

- do not modify Skill
- optionally mention as troubleshooting note only

### E1: Experience Record

Use for:

- real issue worth recording
- not yet repeated enough for rule change

Rules:

- record in docs / troubleshooting / success-case notes
- do not change core routing
- do not add new gate

### E2: Light Rule Patch

Use for:

- repeated small issue
- clear low-risk rule improvement

Rules:

- patch existing file
- avoid new module
- must not increase Fast Build interruption
- must include validation check only when necessary

### E3: Module Upgrade

Use for:

- repeated domain issue becomes core Skill capability
- example: map model system, context loading, operation modes

Rules:

- may add a dedicated file
- must update module index, command routing, validation script
- must include context impact check

### E4: Evolution Proposal Required

Use for:

- broad Skill architecture change
- new core system
- new gate family
- new command group
- large repository structure change

Rules:

- must create proposal before implementation
- must include approval decision
- must define rollback plan
- must pass validation

### E5: Automatic Self-Evolution

Rules:

- not allowed for this Skill at current stage
- AI must not automatically modify Skill based only on its own judgment
- human approval is required before Skill evolution implementation

## 6. Evidence requirement

A change is eligible for evolution only when at least one of these is true:

- the same issue appears in multiple real development sessions
- the issue blocked runtime proof, preview proof, git diff safety, or Fast Build execution
- the issue caused Codex to choose the wrong model, wrong scope, or wrong workflow
- the issue created repeated user friction
- the issue affects multiple game types or multiple workflows
- the issue exposes a missing safety boundary

If none of these are true, the Skill should not be upgraded.

## 7. Proposal requirement

Any E3 or E4 evolution requires an evolution proposal before implementation.

The proposal must include:

- problem
- evidence
- repeated or one-off
- proposed change
- affected files
- context impact
- Fast Build impact
- safety impact
- repository structure impact
- validation plan
- rollback plan
- decision

Use [templates/evolution-proposal-template.md](../templates/evolution-proposal-template.md).

## 8. Context impact check

Every evolution must answer:

- Will this increase default context loading?
- Will this make Fast Build Mode read more files?
- Can this be routed by trigger instead of loaded by default?
- Can this be added to an existing file instead of creating a new module?
- Does this preserve FAST_CONTEXT, GATE_CONTEXT, and AUDIT_CONTEXT boundaries?

Forbidden:

- making Audit Mode default
- making all new files first-read files
- adding new gates to every small implementation task
- adding repeated reports to Fast Build Mode

## 9. Fast Build impact check

Evolution must not make normal development slower.

PASS:

- Fast Build still continues automatically inside approved scope
- no new confirmation is required for ordinary internal checks
- new rules trigger only when relevant
- final report stays concise

FAIL:

- Codex asks for confirmation after every minor step
- normal implementation turns into audit
- new rule adds repeated validation reports
- new rule requires loading broad modules for small tasks

## 10. Repository structure impact check

No root-level support docs are allowed.

New support docs must go into approved directories:

- core/
- protocols/
- production/
- design/
- architecture/
- templates/
- agents/
- docs/
- examples/
- assets/
- scripts/

## 11. Validation requirement

Every evolution must define the smallest necessary validation.

E0 / E1:

- may not require validation script change

E2:

- update validation only when regression risk exists

E3 / E4:

- update `scripts/validate_skill_docs.py`
- update module index
- update commands or quality gates when relevant
- run `python scripts/validate_skill_docs.py`
- run `npm run check` when package validation is relevant

## 12. Real project proof requirement

Real project proof is required only when the evolution changes game-development behavior, runtime proof behavior, Cocos project workflows, or implementation gates.

Documentation-only governance changes may use docs validation and diff review, but they must not claim browser preview, Cocos runtime proof, or game-project proof.

## 13. Rollback requirement

Every E3 / E4 evolution must include rollback plan:

- files to revert
- commands to remove
- validation checks to remove
- docs to restore
- risk if rollback is not performed

## 14. Promotion rule

Promote evolution only when:

- evidence meets the requirement
- evolution level is classified
- context impact is acceptable
- Fast Build impact is acceptable
- repository structure stays valid
- validation plan is sufficient
- rollback plan exists for E3 / E4
- human approval exists when required

## 15. Rejection rule

Reject or downgrade evolution when:

- the issue is one-off
- the change is based only on theoretical completeness
- it increases default context loading
- it slows normal Fast Build work
- it adds root-level support docs
- it creates broad gates for tiny implementation tasks
- it asks AI to self-modify without approval

## 16. Decision vocabulary

- `EVOLUTION_NOT_NEEDED`
- `EVOLUTION_RECORD_ONLY`
- `EVOLUTION_LIGHT_PATCH`
- `EVOLUTION_MODULE_UPGRADE`
- `EVOLUTION_PROPOSAL_REQUIRED`
- `EVOLUTION_REJECTED`
- `EVOLUTION_APPROVED`
- `EVOLUTION_ROLLBACK_REQUIRED`
- `EVOLUTION_BLOCKED_BY_CONTEXT_COST`
- `EVOLUTION_BLOCKED_BY_FAST_BUILD_IMPACT`
- `EVOLUTION_BLOCKED_BY_STRUCTURE_RULE`

## 17. Forbidden evolution patterns

- AI automatically edits Skill without user-approved proposal
- every issue becomes a new document
- one-off local mistake becomes permanent global rule
- normal Fast Build Mode becomes Audit Mode
- all evolution files become default first-read context
- root-level support docs are added
- new gate applies to every tiny implementation task
- validation script becomes a reason to overload context
- theoretical completeness overrides real development evidence
- map / UI / character / runtime systems expand without repeated evidence

## 18. Related files

- [core/context-summary.md](context-summary.md)
- [core/context-loading-policy.md](context-loading-policy.md)
- [core/operation-modes.md](operation-modes.md)
- [core/commands.md](commands.md)
- [core/module-index.md](module-index.md)
- [protocols/quality-gates.md](../protocols/quality-gates.md)
- [protocols/skill-change-review.md](../protocols/skill-change-review.md)
- [protocols/skill-self-test-modes.md](../protocols/skill-self-test-modes.md)
- [protocols/skill-extended-safety-test-cases.md](../protocols/skill-extended-safety-test-cases.md)
- [templates/evolution-proposal-template.md](../templates/evolution-proposal-template.md)
- [docs/structure/repository-structure-plan.md](../docs/structure/repository-structure-plan.md)
