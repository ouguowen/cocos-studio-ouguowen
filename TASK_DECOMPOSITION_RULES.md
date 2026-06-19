# Task Decomposition Rules

Use this file when turning a feature, PRD, or milestone into executable work.

## Task law

- One task should have one primary owner.
- One task should produce one reviewable outcome.
- One task should end with a clear pass or fail statement.
- One task should not mix unrelated domains just because one person can do both.

## Good task boundaries

Split by:

- gameplay rule implementation
- config or schema change
- UI flow
- asset production package
- analytics or telemetry
- QA verification pack
- release or rollout operation

Do not split only by file count or folder count.

## Bad task smells

- "Finish feature" is too large.
- "UI plus backend plus config plus QA" is too mixed.
- "Refactor while adding feature" needs separate ownership unless the refactor is unavoidable.
- "Polish" without target screens or goals is not decomposed.
- "Fix bugs" without defect ids or symptom grouping is not decomposed.

## Required fields per task

- task name
- owner
- collaborators
- dependency
- output artifact
- acceptance condition
- blocked-by risk

## Task card template

```md
# Task Card

## Task Name

## Owner

## Collaborators

## Depends On

## Scope

## Output Artifact

## Acceptance Condition

## Risks

## Not In Scope
```

## Sequencing rule

Preferred order:

1. product or design decision
2. schema or config decision
3. runtime implementation
4. content entry
5. QA verification
6. rollout or release operation

If the order is different, explain why.
