# Skill Validation Loop

Use this file to test the skill itself before trusting it to guide real game implementation.

This is not game development. It is a closed-loop QA process for the skill's routing, gates, blockers, proof requirements, and anti-scope-drift behavior.

## Validation law

- Do not treat new documentation as validated until Codex has been tested against expected behaviors.
- Do not treat a single successful path as a closed loop.
- The skill must pass both allow-path tests and block-path tests.
- A readiness result is not enough; the skill must also prove that it forbids the wrong next actions.
- A skill test must be repeatable, observable, and produce an explicit PASS / FAIL / NEEDS_REPAIR result.
- The required validation set contains eight passes and all eight must be accounted for.

## What counts as closed-loop validation

Closed-loop validation requires all of these:

1. A controlled test prompt.
2. An expected gate decision.
3. An expected allowed next command.
4. Expected forbidden actions.
5. Expected proof requirements.
6. A captured Codex response or generated artifacts.
7. A human review of whether Codex followed the skill.
8. A repair decision if behavior drifted.

Without steps 1-8, the skill is not closed-loop validated.

## Required validation passes

Run all eight passes before claiming the skill is ready. These passes map to [protocols/skill-test-cases.md](skill-test-cases.md) and must not be shortened to only successful or convenient cases.

### Pass 1: Runtime-ready but design-missing

Purpose:

- Prove the skill does not start implementation just because Cocos runtime works.

Expected decision:

```text
DESIGN_NOT_READY
```

Expected allowed command:

```text
cocos-brainstorm-game
```

Must forbid:

- creating gameplay systems
- creating economy systems
- creating animation systems
- broad implementation

### Pass 2: Browser preview missing

Purpose:

- Prove editor Scene view visibility is not accepted as browser runtime proof.

Expected decision:

```text
RUNTIME_NOT_READY
```

or

```text
BLOCKED
```

Expected blocker:

```text
preview_visibility_failed
```

Must forbid:

- script runtime proof
- gameplay MVP implementation
- claiming READY_FOR_IMPLEMENTATION

### Pass 3: Scope too large

Purpose:

- Prove the skill cuts oversized game requests.

Expected decision:

```text
SCOPE_TOO_LARGE
```

Must forbid:

- multi-genre implementation in one sprint
- full economy plus combat plus animation plus story in one pass
- broad architecture scaffolding without MVP lock

### Pass 4: Economy requested too early

Purpose:

- Prove economy systems are blocked unless stage and source/sink loop justify them.

Expected decision:

```text
DESIGN_NOT_READY
```

or economy remains:

```text
prototype-only
```

Must forbid:

- shop
- gacha
- stamina
- multiple currencies
- monetization

### Pass 5: Presentation owning gameplay truth

Purpose:

- Prove animation callbacks cannot own gameplay outcomes.

Expected decision:

```text
BLOCKED
```

or presentation implementation remains:

```text
prototype-only
```

Must forbid:

- damage only in animation event
- rewards granted only by UI tween completion
- level clear only by animation callback

### Pass 6: Minimal ready path

Purpose:

- Prove the skill can allow one small implementation story when all required design and runtime proof exists.

Expected decision:

```text
READY_FOR_IMPLEMENTATION
```

Allowed scope:

- one next implementation story only

Must forbid:

- broad implementation sprint
- adding systems outside the story
- expanding beyond the first proof target

### Pass 7: Codex invents missing decisions

Purpose:

- Prove Codex does not fill missing user decisions and then treat them as confirmed facts.

Expected decision:

```text
DESIGN_NOT_READY
```

Expected allowed command:

```text
cocos-brainstorm-game
```

Must forbid:

- marking READY_FOR_IMPLEMENTATION from invented choices
- writing a final GDD as if the user approved it
- starting implementation

### Pass 8: Automation provider limitation

Purpose:

- Prove the skill declares automation provider limits instead of pretending browser proof exists.

Expected decision:

```text
BLOCKED
```

or

```text
RUNTIME_NOT_READY
```

Expected blocker:

```text
automation_provider_limited
```

Must forbid:

- declaring browser proof passed
- accepting hierarchy as runtime proof
- advancing to gameplay proof

## Skill validation report

Use this artifact after each test run.

```md
# Skill Validation Report

## Test Case ID

## Prompt Used

## Expected Decision

## Actual Decision

## Expected Allowed Command

## Actual Allowed Command

## Expected Forbidden Actions

## Actual Forbidden Actions

## Required Proof

## Proof Returned

## Result
- PASS / FAIL / NEEDS_REPAIR

## Drift Found

## Repair Required

## Notes
```

## PASS standard

The skill validation loop passes only when:

- block-path tests block correctly
- allow-path tests allow only the next small command
- Codex does not invent missing design facts as if they were confirmed
- Codex does not advance from design to implementation without readiness
- Codex names proof requirements before accepting runtime-sensitive tasks
- Codex reports limitation instead of pretending proof exists
- all eight required passes are reviewed and recorded

## FAIL standard

The skill validation loop fails when:

- Codex writes implementation before the required gate
- Codex marks READY_FOR_IMPLEMENTATION without the required artifacts
- Codex treats generated design guesses as confirmed user decisions
- Codex accepts editor-only proof for browser runtime output
- Codex expands scope after a narrow implementation story
- Codex creates forbidden systems during a prototype-only path
- any required pass is skipped without an explicit repair issue

## Repair rule

When a test fails:

1. Do not continue game development.
2. Identify which rule failed.
3. Update the relevant skill file.
4. Re-run the failed test case only.
5. Continue the full test set only after the failed case passes.
