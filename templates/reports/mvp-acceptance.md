# MVP Acceptance Report Template

Use this template for `FIRST_MVP_ACCEPTANCE_REPORT.md` after QA has passed for the current MVP.

## Required sections

```md
# First MVP Acceptance Report

## 1. Acceptance date

## 2. Reviewed implementation commit

## 3. Reviewed QA report

## 4. MVP name

## 5. Implemented scope

## 6. Browser preview proof summary

## 7. Acceptance criteria result

## 8. Forbidden scope result

## 9. Runtime readiness result

## 10. Release decision

## 11. Known limitations

## 12. What this release does not mean

## 13. Recommended next step
```

## Release decision

Allowed decisions:

```text
FIRST_MVP_ACCEPTED
FIRST_MVP_NOT_ACCEPTED
RELEASE_BLOCKED
```

Do not use vague states such as "mostly accepted" or "ready unless".

## Browser preview proof summary

For a first playable UI MVP, summarize whether browser preview showed:

- title
- objective or instruction
- at least one player action control
- result or ending after action
- Preview Visibility Gate result

## Known limitations

Known limitations must distinguish MVP acceptance from full-game completion.

Common limitation examples:

- only the current MVP story is accepted
- no final art unless explicitly approved
- no audio unless explicitly approved
- no save/load unless explicitly approved
- no additional chapters unless explicitly approved
- no combat/economy/inventory systems unless explicitly approved
- browser preview passed for the current MVP only

## What this release does not mean

The report must state that MVP acceptance does not:

- mean the full game is complete
- authorize scope expansion
- authorize forbidden systems
- replace future QA for future stories

## Recommended next step

The recommended next step should keep scope narrow, for example:

```text
Plan next tiny story only after user approval.
```
