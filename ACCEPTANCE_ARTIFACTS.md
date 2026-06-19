# Acceptance Artifacts

Use this file when a feature, event, slice, or release candidate needs formal acceptance evidence.

## Acceptance pack minimum

Every acceptance review should collect:

- build id
- scope under review
- owner
- acceptance criteria list
- evidence for each criterion
- unresolved issues
- approved risks
- reviewer name
- final decision

## Evidence types

Prefer:

- video or screenshot proof
- config diff or schema proof
- log or telemetry proof
- replay or reproduction proof
- test-case pass sheet

Do not rely only on a verbal claim that something was tested.

## Acceptance pack template

```md
# Acceptance Pack

## Build Id

## Scope

## Owner

## Reviewer

## Acceptance Criteria
- Criterion:
  Evidence:
  Result:

## Regressions Checked

## Unresolved Issues

## Accepted Risks

## Final Decision
- pass
- pass with accepted risk
- block
```

## Acceptance rules

- If one acceptance criterion has no evidence, the review is incomplete.
- If the owner and reviewer are the same person, call that out explicitly.
- If risks are accepted, name who accepted them.
