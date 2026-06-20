# Sequential Gate Protocol

Use this file when the user wants the project to move smoothly, avoid logic conflicts, and forbid step-skipping.

Open [ADVANCEMENT_CHAIN_MAP.md](ADVANCEMENT_CHAIN_MAP.md) when the team needs a direct prerequisite chain for project setup, modules, level systems, feature delivery, release, or rescue work.

## Core law

Do not start step two when step one is not actually complete.

Every meaningful task must answer:

1. What step are we in now?
2. What are the required prerequisites for this step?
3. Which prerequisites are already satisfied?
4. What is still missing?
5. Are we allowed to advance?

If prerequisites are missing:

- stop advancement
- name the missing prerequisite
- complete or restore the prerequisite first

## Default sequence rule

Use this default order unless the project has an approved special case:

1. classify the game
2. define the MVP and explicit non-goals
3. lock stage and production mode
4. define architecture or module boundaries
5. define required data and ownership
6. build the module or feature
7. verify acceptance and gate status

Do not reorder this casually.

If the task fits a known chain, prefer the exact order in [ADVANCEMENT_CHAIN_MAP.md](ADVANCEMENT_CHAIN_MAP.md).

## Module build sequence

When building one concrete module such as home page, shop page, bag page, HUD, or result page:

1. confirm the module goal
2. confirm the current stage and production mode
3. choose the direction or option
4. define module boundaries and must-have blocks
5. define required runtime data and button actions
6. implement layout and interaction flow
7. wire runtime data and navigation
8. check completion standard

Do not jump from direction choice straight into final layout if runtime data, actions, or module boundaries are still undefined.

## Stop conditions

Stop advancement when:

- stage is unclear
- module goal is unclear
- previous gate has not passed
- ownership is unclear
- data source is unknown
- the task conflicts with an earlier locked decision

## Repair rule

When blocked by missing prerequisites:

- do not improvise around the gap
- repair the sequence first
- keep the missing item as the next required deliverable

## Response pattern

Use short gating language such as:

- `Current step: define module boundaries.`
- `Missing prerequisite: required runtime data is not defined yet.`
- `Next allowed action: define data and button actions before layout implementation.`

## Common violations

- designing the full page before the player goal is locked
- wiring buttons before button destinations are defined
- writing gameplay rules inside UI because runtime boundaries were skipped
- mass-producing content before schema and validation are stable
- entering release work while blocker ownership is still unclear

## Protocol law

- Smooth delivery is more important than fake speed.
- A blocked prerequisite is a real blocker, not a detail to ignore.
- If the order is broken, fix the order before adding more work on top.
