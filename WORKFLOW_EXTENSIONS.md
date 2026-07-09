# Workflow Extensions

Use this file only when the request is not covered by [WORKFLOWS.md](WORKFLOWS.md).

## Strategy and planning

- Classify a game: open [design/game-classifier.md](design/game-classifier.md) before template or architecture choice.
- Choose an architecture template: open [ARCHITECTURE_TEMPLATE_SYSTEM.md](ARCHITECTURE_TEMPLATE_SYSTEM.md) after classification is stable.
- Write a PRD: open [production/prd-constraints.md](production/prd-constraints.md) before drafting.
- Break work into tasks: open [production/task-decomposition.md](production/task-decomposition.md) and split by ownership and reviewable output.
- Plan the version roadmap: open [VERSION_ROADMAP_SYSTEM.md](VERSION_ROADMAP_SYSTEM.md) and define proof obligation before features.

## Ownership and collaboration

- Answer "who should own this?": open [production/ownership.md](production/ownership.md) and name primary owner, collaborators, and approver.
- Assign authority: open [production/team-seniority.md](production/team-seniority.md) before assigning core ownership.
- Run a handoff: open [production/collab-handoff-system.md](production/collab-handoff-system.md) and record included artifacts, assumptions, and validation evidence.
- Manage outsourcing: open [production/outsourcing-collab-rules.md](production/outsourcing-collab-rules.md) before vendor kickoff.
- Work with AI collaborators: open [AI_COLLAB_RULES.md](AI_COLLAB_RULES.md) before delegating any design or code decision.
- Revise a concrete module: apply [CHOICE_EXECUTION_PROTOCOL.md](CHOICE_EXECUTION_PROTOCOL.md), but offer upgrade directions instead of fresh module directions.

## Release and operations

- Prepare acceptance review: open [production/acceptance-artifacts.md](production/acceptance-artifacts.md) and match criteria to evidence.
- Plan QA coverage: open [TEST_MATRIX.md](TEST_MATRIX.md) and make deferred coverage explicit.
- Plan a release pipeline: open [production/release-pipeline.md](production/release-pipeline.md) before package, rollout, or hotfix decisions.
- Plan platform targets: open [production/platform-targets.md](production/platform-targets.md) before export or SDK commitments.
- Plan rollback: open [production/release-rollback.md](production/release-rollback.md) before launch approval.
- Review operations data: open [production/operations-data.md](production/operations-data.md) and separate short uplift from healthy behavior.
- Run first-week support: apply [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md) and [production/operations-data.md](production/operations-data.md) before normal feature work resumes.

## Governance and rescue

- Escalate risk: open [production/risk-escalation.md](production/risk-escalation.md) and name severity before optimism.
- Track technical debt: open [production/tech-debt-register.md](production/tech-debt-register.md) and require owner plus repayment trigger.
- Run a postmortem: open [templates/reports/incident-postmortem.md](templates/reports/incident-postmortem.md) and finish with action owners.
- Budget scope: open [production/cost-budget.md](production/cost-budget.md) before commitment.
- Track milestone burn: open [production/milestone-burndown.md](production/milestone-burndown.md) and call out scope growth directly.

## Level-data tooling

- Validate level config tables: run `node scripts/validate-level-config.js <level-data-directory>` and report schema errors first.
- Export runtime level JSON: run `node scripts/export-level-config.js <level-data-directory> [output-file]` after validation passes.
- Generate TypeScript config types: run `node scripts/export-level-types.js [output-file]` and treat the generated file as readonly.
- Wire runtime templates into Cocos: open [RUNTIME_TEMPLATE_ROUTER.md](RUNTIME_TEMPLATE_ROUTER.md) and reuse the provided baseline assets before inventing one-off systems.
