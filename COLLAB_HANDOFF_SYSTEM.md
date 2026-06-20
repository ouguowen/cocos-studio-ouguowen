# Collaboration Handoff System

Use this file when work passes between internal roles, external vendors, temporary contributors, or AI-assisted contributors and must remain production-safe.

## Handoff law

- A handoff is a deliverable transfer, not a vague status message.
- If the receiver cannot review, integrate, and verify the output, the handoff is incomplete.
- Internal handoffs deserve the same discipline as external outsourcing handoffs.

## Handoff types

- Internal same-discipline handoff:
  - Example: one programmer hands a system to another programmer.
- Internal cross-discipline handoff:
  - Example: design passes config intent to programming, art passes assets to UI, level design passes placement data to gameplay.
- External vendor handoff:
  - Example: outsourced animation, art, QA, content, or engineering package.
- AI-assisted handoff:
  - Example: draft code, config, documents, or test suggestions generated with AI and adopted by a human owner.

## Required handoff fields

- deliverable name
- source owner
- receiving owner
- review owner
- approver when needed
- exact files or artifacts included
- required format and naming rules
- dependency assumptions
- integration steps
- acceptance criteria
- rejection conditions
- follow-up owner after acceptance

## Minimum handoff package

- Scope summary:
  - what this includes
  - what this does not include
- Artifact list:
  - files
  - prefabs
  - configs
  - scenes
  - reference docs
- Integration notes:
  - import path
  - setup steps
  - dependency version assumptions
  - feature flags or remote-config assumptions
- Validation evidence:
  - preview
  - local test result
  - screenshot or video when relevant
  - known limitations

## Review authority rules

- The receiver does not silently become the owner of upstream intent.
- The review owner decides whether the handoff is complete enough to integrate.
- The approver decides whether the integrated result may advance to the next stage.
- If ownership or authority is unclear, use [TEAM_SENIORITY_SYSTEM.md](TEAM_SENIORITY_SYSTEM.md) before accepting the handoff.

## Rework rules

- Reject when files do not match naming or format rules.
- Reject when integration assumptions are hidden.
- Reject when acceptance criteria are not testable.
- Reject when the handoff shifts unresolved design, architecture, or release risk downstream without agreement.
- Reject when "final" really means "still needs major cleanup by the receiver".

## Internal handoff discipline

- A programmer handing to QA must name scope, known risks, and expected pass criteria.
- A designer handing to programming must separate intent, values, and open questions.
- Art handing to integration must name source files, export settings, naming, and runtime constraints.
- Level or content handing to gameplay must name table version, validation status, and unsupported edge cases.

## External handoff discipline

- External contributors may prepare deliverables, but internal owners preserve product law and integration law.
- Never let a vendor become the hidden owner of config schema, shared framework, build pipeline, release decision, or business metrics.
- Revision rounds must be agreed before delivery starts.
- Payment or milestone acceptance should map to acceptance evidence, not only to elapsed time.

## AI-assisted handoff discipline

- AI output must name a human source owner before entering team flow.
- AI-generated artifacts must clearly separate generated draft from human-reviewed final.
- Suggested tests are not executed evidence.
- AI can accelerate draft preparation; it cannot sign off on readiness.

## Red flags

- "It should be obvious how to integrate this."
- "The next person can rename and clean it."
- "The vendor delivered all files, so the handoff is complete."
- "QA can figure out what changed from the build."
- "AI wrote the first version, so we skipped the handoff notes."

## Handoff record

```md
# Handoff Record

## Deliverable Name

## Handoff Type
- internal same-discipline
- internal cross-discipline
- external vendor
- AI-assisted

## Source Owner

## Receiving Owner

## Review Owner

## Approver

## Included Artifacts

## Explicitly Excluded Artifacts

## Dependency Assumptions

## Integration Steps

## Validation Evidence

## Acceptance Criteria

## Rejection Conditions

## Follow-Up Owner After Acceptance

## Notes
```
