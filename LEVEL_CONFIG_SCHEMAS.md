# Level Config Schemas

Use this file when designing concrete CSV, spreadsheet, or generated JSON schemas for the common wave-spawn or stage-based small-game model.

Open [LEVEL_CONFIG_SCHEMA_EXTENSIONS.md](LEVEL_CONFIG_SCHEMA_EXTENSIONS.md) only when the project needs optional support tables beyond the core combat-stage path.

## Schema law

- CSV is an authoring format, not the preferred runtime format.
- Runtime data should be validated and exported into normalized JSON.
- Table fields are cross-role contracts.
- Every production table needs ownership, required fields, and validation rules.
- Do not add one-off exception fields unless the field is truly reusable.

## Common field conventions

- ids use lowercase ASCII, digits, and underscores
- booleans use `0` or `1`
- list fields use `|` only when the parser validates them
- generated TypeScript should convert snake_case authoring fields into camelCase runtime fields
- do not put raw Cocos asset paths into production tables

## Core tables

### 1. `Level.csv`

Purpose:

- main stage entry table

Required fields:

- `level_id`
- `chapter_id`
- `level_index`
- `map_id`
- `wave_group_id`
- `objective_group_id`
- `reward_id`
- `difficulty`
- `enabled`

Validation:

- `level_id` unique
- required references exist
- enabled levels do not reference disabled required data
- unlock chains do not loop

### 2. `LevelObjective.csv`

Purpose:

- defines win, fail, and optional objective rules

Required fields:

- `objective_group_id`
- `objective_id`
- `objective_type`
- `required`
- `enabled`

Validation:

- every enabled level has at least one enabled required objective
- objective groups are not empty
- type-specific fields are valid

### 3. `Wave.csv`

Purpose:

- defines wave order and transition rules

Required fields:

- `wave_group_id`
- `wave_id`
- `order_index`
- `next_wave_rule`
- `enabled`

Validation:

- each group has at least one enabled wave
- order indexes do not duplicate inside one group
- `time_pass` rules carry numeric timing

### 4. `Spawn.csv`

Purpose:

- defines enemy spawn timing inside waves

Required fields:

- `wave_id`
- `spawn_id`
- `spawn_time`
- `map_point_id`
- `enemy_group_id`
- `count`
- `spawn_rule`
- `enabled`

Validation:

- `spawn_time >= 0`
- `count > 0`
- referenced wave, point, and enemy group exist
- formation or rule constraints match the spawn count

### 5. `EnemyGroup.csv`

Purpose:

- defines reusable enemy-group entries for spawns

Required fields:

- `enemy_group_id`
- `entry_index`
- `enemy_id`
- `enabled`

Validation:

- referenced enemies exist and are enabled
- groups referenced by spawn data are not empty
- weights and multipliers stay inside project-defined limits

### 6. `Enemy.csv`

Purpose:

- defines base enemy data and resource ids

Required fields:

- `enemy_id`
- `prefab_id`
- `enemy_type`
- `base_hp`
- `base_atk`
- `move_speed`
- `ai_type`
- `enabled`

Validation:

- resource ids exist in the resource manifest
- disabled enemies do not appear in enabled groups
- boss objectives reference boss-capable enemies when required

### 7. `Map.csv`

Purpose:

- defines map identity and scene-level references

Required fields:

- `map_id`
- `scene_id`
- `player_spawn_point`
- `camera_rule`
- `enabled`

Validation:

- scene id exists
- required points exist for the selected map
- enabled levels do not reference disabled maps

### 8. `MapPoint.csv`

Purpose:

- defines logical scene markers for spawn, player start, triggers, and camera helpers

Required fields:

- `point_id`
- `map_id`
- `point_type`
- `enabled`

Validation:

- point ids are unique inside project rules
- maps reference only valid points
- runtime-required point types exist for the chosen template

## Optional support tables

Move these into the project only when the game actually needs them:

- `LevelTemplate.csv`
- `Formation.csv`
- `Reward.csv`
- `StarRule.csv`
- `DropGroup.csv`
- `LevelModifier.csv`

See [LEVEL_CONFIG_SCHEMA_EXTENSIONS.md](LEVEL_CONFIG_SCHEMA_EXTENSIONS.md).

## Required validation categories

- schema validation
- reference validation
- progression validation
- balance-range validation
- runtime-export validation

## Field change process

1. Name the owner.
2. State why the new field is reusable.
3. Define validation and default value.
4. Assess runtime, tooling, and migration impact.
5. Regenerate types and exported runtime data.

## Runtime conversion

- validate source tables first
- export normalized JSON second
- generate TypeScript types third
- treat runtime JSON and generated types as derived artifacts, not authoring truth
