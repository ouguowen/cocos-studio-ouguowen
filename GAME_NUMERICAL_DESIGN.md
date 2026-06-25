# Game Numerical Design

Use this file before Codex writes gameplay values, enemy stats, wave difficulty, unit costs, upgrade numbers, rewards, or balance-sensitive config.

This file is not a spreadsheet replacement. It defines the rules that must exist before a spreadsheet, CSV, JSON, or Cocos runtime config can be trusted.

## Numerical design law

- Do not let Codex invent final numbers without a named design intent.
- Do not balance by random constants such as `hp = 100`, `atk = 10`, or `reward = 50` unless they are explicitly marked as prototype placeholders.
- Every number must answer one of these questions: difficulty, pacing, decision pressure, reward, progression, readability, or production feasibility.
- Keep prototype numbers simple, but still explain why they were chosen.
- Separate design numbers from runtime state and UI text.
- Treat numeric tables as design contracts, not filler data.

## Required inputs before number generation

Before generating or changing numbers, require:

1. selected game type
2. target session length
3. target player skill level
4. core loop being tested
5. success condition
6. fail condition
7. available player actions
8. enemy or obstacle families
9. reward purpose
10. current production stage

If these are missing, return a blocker instead of generating a full balance table.

## MVP numerical scope

For an MVP, keep numerical scope deliberately small:

- one player baseline
- one or two enemy families
- one level or one short sequence
- one primary difficulty curve
- one reward source
- one main spend or progression target if progression is required
- no multi-currency economy unless the selected loop absolutely requires it

Do not add full economy, shop, gacha, gear, stamina, ads, or live-ops values during early prototype unless they are the thing being tested.

## Core numeric families

### 1. Player baseline

Define only the values needed for the tested loop:

- health or lives
- attack or action strength
- action cooldown or fire rate
- movement speed or placement speed
- range or interaction radius
- resource income if the loop requires spending

Required design note:

```text
The player should feel: weak / stable / powerful / pressured / tactical.
```

### 2. Enemy or obstacle baseline

For each enemy or obstacle family, define:

- role
- hp or durability
- damage or threat
- movement speed or delay
- attack interval or pressure rate
- reward or progress value
- special trait if needed

Required design note:

```text
This enemy exists to test: timing / target priority / positioning / resource pressure / reading clarity.
```

### 3. Level difficulty

For each level or test wave, define:

- expected duration
- enemy count or event count
- threat ramp
- pressure spike
- recovery window
- win margin
- fail margin

Use words before numbers:

```text
easy intro -> readable pressure -> clear spike -> short recovery -> final check
```

Then map those beats into numbers.

### 4. Cost and resource pressure

Use only when the loop includes spending or deployment.

Define:

- starting resource
- income rate
- unit or action cost
- refund or no-refund rule
- intended first purchase timing
- intended mistake cost

Do not create a cost table until the first decision has a clear purpose.

### 5. Rewards

Define reward purpose before amount:

- unlock next level
- upgrade one thing
- teach a currency
- create return motivation
- test result screen clarity

Prototype rewards may be fake or temporary, but must be labeled as such.

## Common formulas

Use simple formulas first.

### Enemy effective threat

```text
effective_threat = hp_pressure + damage_pressure + speed_pressure + special_pressure
```

This does not need to be a final mathematical formula in early prototype. It is a review checklist to prevent one enemy from being accidentally strong in every dimension.

### Time to defeat

```text
time_to_defeat = enemy_hp / expected_player_dps
```

Use this to prevent invisible difficulty spikes.

### Incoming pressure

```text
incoming_pressure_per_second = enemy_count * average_enemy_threat / wave_duration
```

Use this to compare waves.

### Reward sanity

```text
reward_value <= next_meaningful_cost
```

Unless the goal is a deliberate windfall, one level reward should not accidentally skip multiple planned decisions.

## Balance range guidance

Use ranges before final values.

Example:

| Value type | Prototype range guidance |
|---|---|
| enemy hp | low enough to show feedback quickly |
| enemy damage | high enough to create risk, not one-shot unless intended |
| move speed | readable by the target player |
| wave duration | short enough for repeated testing |
| reward | enough to show result meaning, not enough to skip progression |
| cost | forces one visible decision, not a spreadsheet puzzle |

## Numeric table ownership

Every number table must name:

- owner
- reviewer
- intended player feeling
- field meaning
- legal range
- default value
- validation rule
- current placeholder status

No number should enter a production config without a legal range.

## Required validation categories

Use these categories in addition to schema validation:

- legal range validation
- reference validation
- progression validation
- difficulty spike validation
- reward inflation validation
- player readability validation
- runtime export validation

## Red flags

Stop and review if:

- one enemy has the best hp, damage, speed, and reward at the same time
- difficulty only increases by adding more enemies
- rewards increase faster than meaningful costs
- costs increase without a player-facing reason
- the first playable needs more than one economy to be understandable
- UI values are treated as the source of numeric truth
- animation timing changes gameplay result without being owned by design/runtime logic
- Codex generates many tables before the first loop is playable

## Numerical design record

Use this artifact before generating config values.

```md
# Numerical Design Record

## Game Type

## Current Stage

## Loop Being Tested

## Target Session Length

## Target Player Skill

## Intended Player Feeling

## Player Baseline

## Enemy / Obstacle Families

## Difficulty Beats

## Resource / Cost Model

## Reward Purpose

## Prototype Placeholder Values

## Legal Ranges

## Validation Rules

## Known Risks

## Gate Decision
- PASS / FAIL / BLOCKED
```

## Gate decision

Numerical design passes only when:

- the selected game type is known
- the loop being tested is known
- every major number has a purpose
- legal ranges exist for generated config fields
- prototype placeholders are labeled
- the next implementation task cannot accidentally treat fake balance as final balance

If these are not true, do not proceed to full gameplay implementation.
