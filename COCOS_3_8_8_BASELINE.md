# Cocos Creator 3.8.8 Baseline

Use this file when the request depends on engine-version-specific guidance.

## Baseline rule

This skill is primarily aligned to `Cocos Creator 3.8.8`.

When engine-specific advice matters:

- assume `3.8.8` as the default baseline
- name `3.8.8` explicitly in the response
- challenge advice copied from `2.x` or unrelated `3.x` assumptions

## Response rule

If the project clearly is not on `3.8.8`:

- call out the mismatch
- avoid pretending the same engine behavior is guaranteed
- re-check editor, runtime, packaging, and platform advice before applying it

## Practical guardrails

- Prefer guidance that fits `TypeScript + Cocos Creator 3.8.8` project structure.
- Keep scene, prefab, config, and runtime rules compatible with a normal `3.8.8` production workflow.
- Do not recommend `2.x`-style habits, naming, or mental models as if they were the default baseline here.
- Do not give version-ambiguous engine advice when the exact engine behavior could affect the result.

## Escalation rule

Pause and name the risk when:

- a request depends on version-specific editor behavior
- a plugin, build target, or packaging flow may differ by engine version
- old project patterns conflict with the `3.8.8` baseline
