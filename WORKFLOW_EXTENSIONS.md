# Workflow Extensions

Use this file only when the request is not covered by [WORKFLOWS.md](WORKFLOWS.md).

## Strategy and planning

- Classify a game: open [GAME_CLASSIFIER_SYSTEM.md](GAME_CLASSIFIER_SYSTEM.md) before template or architecture choice.
- Choose an architecture template: open [ARCHITECTURE_TEMPLATE_SYSTEM.md](ARCHITECTURE_TEMPLATE_SYSTEM.md) after classification is stable.
- Write a PRD: open [PRD_CONSTRAINTS.md](PRD_CONSTRAINTS.md) before drafting.
- Break work into tasks: open [TASK_DECOMPOSITION_RULES.md](TASK_DECOMPOSITION_RULES.md) and split by ownership and reviewable output.
- Plan the version roadmap: open [VERSION_ROADMAP_SYSTEM.md](VERSION_ROADMAP_SYSTEM.md) and define proof obligation before features.

## Ownership and collaboration

- Answer "who should own this?": open [OWNERSHIP.md](OWNERSHIP.md) and name primary owner, collaborators, and approver.
- Assign authority: open [TEAM_SENIORITY_SYSTEM.md](TEAM_SENIORITY_SYSTEM.md) before assigning core ownership.
- Run a handoff: open [COLLAB_HANDOFF_SYSTEM.md](COLLAB_HANDOFF_SYSTEM.md) and record included artifacts, assumptions, and validation evidence.
- Manage outsourcing: open [OUTSOURCING_COLLAB_RULES.md](OUTSOURCING_COLLAB_RULES.md) before vendor kickoff.
- Work with AI collaborators: open [AI_COLLAB_RULES.md](AI_COLLAB_RULES.md) before delegating any design or code decision.
- Revise a concrete module: apply [CHOICE_EXECUTION_PROTOCOL.md](CHOICE_EXECUTION_PROTOCOL.md), but offer upgrade directions instead of fresh module directions.

## Release and operations

- Prepare acceptance review: open [ACCEPTANCE_ARTIFACTS.md](ACCEPTANCE_ARTIFACTS.md) and match criteria to evidence.
- Plan QA coverage: open [TEST_MATRIX.md](TEST_MATRIX.md) and make deferred coverage explicit.
- Plan a release pipeline: open [RELEASE_PIPELINE_SYSTEM.md](RELEASE_PIPELINE_SYSTEM.md) before package, rollout, or hotfix decisions.
- Plan platform targets: open [PLATFORM_TARGET_RULES.md](PLATFORM_TARGET_RULES.md) before export or SDK commitments.
- Plan rollback: open [RELEASE_ROLLBACK_PLAYBOOK.md](RELEASE_ROLLBACK_PLAYBOOK.md) before launch approval.
- Review operations data: open [OPERATIONS_DATA_SYSTEM.md](OPERATIONS_DATA_SYSTEM.md) and separate short uplift from healthy behavior.
- Run first-week support: apply [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md) and [OPERATIONS_DATA_SYSTEM.md](OPERATIONS_DATA_SYSTEM.md) before normal feature work resumes.

## Governance and rescue

- Escalate risk: open [RISK_ESCALATION_SYSTEM.md](RISK_ESCALATION_SYSTEM.md) and name severity before optimism.
- Track technical debt: open [TECH_DEBT_REGISTER.md](TECH_DEBT_REGISTER.md) and require owner plus repayment trigger.
- Run a postmortem: open [INCIDENT_POSTMORTEM_TEMPLATE.md](INCIDENT_POSTMORTEM_TEMPLATE.md) and finish with action owners.
- Budget scope: open [COST_BUDGET_MODEL.md](COST_BUDGET_MODEL.md) before commitment.
- Track milestone burn: open [MILESTONE_BURNDOWN_RULES.md](MILESTONE_BURNDOWN_RULES.md) and call out scope growth directly.

## Level-data tooling

- Validate level config tables: run `node scripts/validate-level-config.js <level-data-directory>` and report schema errors first.
- Export runtime level JSON: run `node scripts/export-level-config.js <level-data-directory> [output-file]` after validation passes.
- Generate TypeScript config types: run `node scripts/export-level-types.js [output-file]` and treat the generated file as readonly.
- Wire runtime templates into Cocos: open [RUNTIME_TEMPLATE_ROUTER.md](RUNTIME_TEMPLATE_ROUTER.md) and reuse the provided baseline assets before inventing one-off systems.
