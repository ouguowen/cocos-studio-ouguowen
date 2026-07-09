# Choice Execution Protocol

Use this file when the user asks to build or revise one concrete module such as home page, level page, battle page, shop page, bag page, login flow, HUD, or result page.

## Core rule

Do not begin with a long explanation.

Start by giving `2` to `4` options only.

Each option must:

- be described in one short sentence
- state the real tradeoff clearly
- stay easy to compare at a glance

## Execution sequence

1. Name the target module.
2. Offer `A/B/C` style options.
3. Keep each option to one short sentence.
4. Wait for the user's choice.
5. After the user chooses, execute continuously until the module reaches a usable completed state.
6. Do not interrupt for minor implementation choices.
7. If useful, create a short module brief with [templates/core.md](templates/core.md) before or during execution, but do not let the brief delay delivery.

## When to pause

Pause only when:

- the next step changes core architecture
- required assets, source truth, or constraints are missing
- the chosen option conflicts with a locked earlier decision
- the user must approve a visible product-direction tradeoff

## Default completion rule

- Default to finishing the chosen module, not drifting back into discussion.
- Resolve small implementation details internally when they do not change product direction.
- Keep all later choices consistent with the selected option unless a real conflict appears.

## Response shape

Good pattern:

- `A. Fast utility home: prioritize clear buttons and low art dependency.`
- `B. Progression home: prioritize chapter entry, rewards, and daily return motivation.`
- `C. Event-driven home: prioritize banners, activities, and monetization exposure.`

After the user chooses:

- restate the selected option in one short line
- name the module completion standard in one short line
- execute the module to completion
- report blockers only if they are real blockers

## Forbidden behavior

- Do not give seven or eight options.
- Do not explain each option with long paragraphs.
- Do not ask for confirmation again on every small detail.
- Do not stop midway just because a small local choice appears.
