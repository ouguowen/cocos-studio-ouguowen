# Runtime Proof Protocol

Use this file when a request claims runtime safety, preview proof, or execution validation.

## Runtime proof law

- Editor visibility is not browser proof.
- A command that requires runtime proof must say what proof channel is valid.
- Skill-repo documentation work normally requires diff proof, not game runtime proof.
- If runtime proof is unavailable, declare `BLOCKED` or `NOT_APPLICABLE` instead of faking evidence.
- For playable MVP acceptance, editor hierarchy, scene snapshot, or inspector state is never enough.
- Preview Visibility Gate `PASS` is required before `QA_PASS` for a playable MVP.
- Runtime proof should be summarized once at the end of Fast Build Mode unless preview fails.
- Do not repeatedly report browser proof after every minor UI/node change.
- Preview Visibility Gate remains required, but its result should be reported as concise `PASS` / `FAIL` during Fast Build implementation.

## Proof channels

- diff proof
- audit artifact proof
- local Cocos hierarchy proof
- Console proof
- browser preview proof

## Browser preview proof for first MVP UI

For a first playable MVP that uses simple UI, browser preview proof must show:

1. title or baseline marker visible
2. objective or primary instruction visible
3. at least one player action button/control visible
4. player action can be performed
5. ending, result, or completion state visible after the action
6. Preview Visibility Gate result recorded as `PASS`, `FAIL`, or `BLOCKED`

For story-clear or light-interaction MVPs, this usually means visible title, objective, route/choice button, and ending text after click.

Do not accept:

- editor hierarchy alone
- scene snapshot alone
- component binding proof alone
- script `start()` or `onLoad()` proof alone
- browser opened without visible marker verification

## This repository rule

- For documentation-only maintenance, runtime proof is `NOT_APPLICABLE`.
- Do not open or modify a game project just to fabricate runtime evidence for a docs-only task.
