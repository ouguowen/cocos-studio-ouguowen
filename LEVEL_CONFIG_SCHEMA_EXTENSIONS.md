# Level Config Schema Extensions

Use this file only when the core tables in [LEVEL_CONFIG_SCHEMAS.md](LEVEL_CONFIG_SCHEMAS.md) are not enough for the chosen wave-spawn game.

## 1. `LevelTemplate.csv`

Use when multiple levels share the same UI, camera, spawn, or lose-condition family.

Keep it small. Do not create a new template for every slightly unusual level.

## 2. `Formation.csv`

Use when spawn layout itself is reusable design data.

Do not introduce this table if simple point-based spawn rules are enough.

## 3. `Reward.csv`

Use when settlement rewards need a reusable source of truth.

Keep reward definitions abstract. Do not duplicate raw item-list logic inside `Level.csv`.

## 4. `StarRule.csv`

Use when stage rating or extra medal conditions are part of the product loop.

Do not add it for prototype-only “nice to have” grading.

## 5. `DropGroup.csv`

Use when enemies or reward nodes need reusable weighted drop definitions.

Do not turn this into a hidden economy balancing dump with no owner.

## 6. `LevelModifier.csv`

Use when levels share reusable rule modifiers such as enemy buffs, timers, fog, or challenge flags.

Do not use modifiers to patch poor baseline level design.

## Extension law

- Optional tables are not mandatory signs of professionalism.
- Add an extension table only when at least three pieces of content can reuse it.
- Every extension table still needs clear ownership, validation, and export rules.
