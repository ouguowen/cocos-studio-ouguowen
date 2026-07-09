# Tech Debt Register

Use this file when technical debt needs to be recorded, prioritized, owned, and retired deliberately.

## Debt law

- A debt item without an owner is not being managed.
- A debt item without impact is only a complaint.
- A debt item without a trigger condition will never be repaid on time.

## Required fields

- debt id
- title
- owner
- affected systems
- origin
- player or team impact
- severity
- repayment trigger
- target stage
- current workaround

## Severity guidance

- critical: threatens release, player data, monetization, or core stability
- major: significantly slows development or causes repeated regressions
- moderate: meaningful cost but temporarily tolerable
- minor: useful cleanup, not urgent

## Register template

```md
# Tech Debt Item

## Debt Id

## Title

## Owner

## Affected Systems

## Origin

## Player Or Team Impact

## Severity

## Current Workaround

## Repayment Trigger

## Target Stage

## Exit Condition
```
