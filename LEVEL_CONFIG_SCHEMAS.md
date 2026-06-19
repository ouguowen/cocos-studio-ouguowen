# Level Config Schemas

Use this file when designing concrete CSV, spreadsheet, or generated JSON schemas for Cocos Creator 3.x level production.

This file focuses on the common wave-spawn / stage-based small-game model. For other game families, choose the model first in [LEVEL_DATA_MODELS.md](LEVEL_DATA_MODELS.md), then adapt the same ownership and validation discipline.

## Schema law

- CSV is an authoring format, not the preferred runtime format.
- Runtime data should be validated and generated into normalized JSON.
- Table fields are cross-role contracts.
- Every production table should have ownership, required fields, validation rules, and notes.
- Do not add fields for one-off level exceptions unless the field is truly reusable.

## Common field conventions

- ids use lowercase ASCII, digits, and underscores
- ids must not contain spaces or direct Cocos asset paths
- booleans use `0` or `1`
- list fields use `|` only when the list is simple and validated
- production-facing tables should include `enabled` and `notes` when useful
- generated TypeScript should convert snake_case CSV fields into camelCase runtime fields

## 1. `Level.csv`

Purpose:

- main level entry table
- decides which template, map, wave group, objective group, reward, and modifiers a level uses

Primary owner:

- Lead Designer

Collaborators:

- Level Designer
- Producer
- Lead Programmer

Approver:

- Producer and Lead Designer

Fields:

```csv
level_id,chapter_id,level_index,level_name,template_id,map_id,wave_group_id,objective_group_id,reward_id,star_rule_id,modifier_id,difficulty,unlock_level_id,enabled,notes
1001,1,1,Forest Start,normal_battle,map_forest_01,wg_1001,obj_1001,reward_1001,star_basic,mod_easy,1.0,,1,first tutorial battle
```

Field rules:

- `level_id`: string, required, unique, stable after release
- `chapter_id`: int, required
- `level_index`: int, required, order inside chapter
- `level_name`: string, optional for internal display
- `template_id`: ref `LevelTemplate.template_id`, required
- `map_id`: ref `Map.map_id`, required
- `wave_group_id`: ref `Wave.wave_group_id`, required for wave-based levels
- `objective_group_id`: ref `LevelObjective.objective_group_id`, required
- `reward_id`: ref `Reward.reward_id`, required
- `star_rule_id`: ref `StarRule.star_rule_id`, optional
- `modifier_id`: ref `LevelModifier.modifier_id`, optional
- `difficulty`: number, required, default `1.0`
- `unlock_level_id`: ref `Level.level_id`, optional
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Validation:

- `level_id` unique
- referenced template, map, objective, reward, modifier, and star rule must exist
- enabled levels must not reference disabled required data
- unlock chain must not be circular

Do not:

- put spawn timing here
- put raw reward item lists here
- put Cocos asset paths here

## 2. `LevelTemplate.csv`

Purpose:

- defines reusable level flow families

Primary owner:

- Lead Designer

Collaborators:

- Technical Director
- Lead Programmer

Approver:

- Lead Designer and Technical Director

Fields:

```csv
template_id,template_type,default_ui_rule,default_camera_rule,default_spawn_rule,default_lose_condition,time_limit,enabled,notes
normal_battle,battle,battle_hud,follow_player,standard,player_dead,0,1,clear all enemies
```

Field rules:

- `template_id`: string, required, unique
- `template_type`: enum, required
- `default_ui_rule`: enum/id, required
- `default_camera_rule`: enum/id, required
- `default_spawn_rule`: enum, required
- `default_lose_condition`: enum, required
- `time_limit`: number, default `0`, where `0` means no template time limit
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Recommended `template_type` values:

- `battle`
- `survival`
- `boss`
- `puzzle`
- `platform`
- `roguelite_room`
- `quest`
- `endless`

Validation:

- template ids referenced by `Level.csv` must exist and be enabled
- template count should stay small and intentional

Do not:

- create a new template for one special level before checking modifiers or objectives

## 3. `LevelObjective.csv`

Purpose:

- defines victory, failure, and optional level objectives

Primary owner:

- Lead Designer

Collaborators:

- Gameplay Programmer
- QA Lead

Approver:

- Lead Designer and QA Lead

Fields:

```csv
objective_group_id,objective_id,objective_type,target_id,target_count,time_limit,required,enabled,notes
obj_1001,obj_1001_1,kill_all,,0,0,1,1,kill all spawned enemies
```

Field rules:

- `objective_group_id`: string, required
- `objective_id`: string, required, unique
- `objective_type`: enum, required
- `target_id`: string/ref, optional based on objective type
- `target_count`: int, default `0`
- `time_limit`: number, default `0`
- `required`: bool `0/1`, required
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Recommended `objective_type` values:

- `kill_all`
- `kill_enemy`
- `survive_time`
- `protect_target`
- `collect_item`
- `reach_point`

Validation:

- every enabled level must have at least one enabled required objective
- `kill_enemy` must reference an enemy that can appear in the level
- `survive_time` must have `time_limit > 0`
- objective group must not be empty

Do not:

- encode complex objective logic in free text

## 4. `Wave.csv`

Purpose:

- defines wave order and wave transition rules

Primary owner:

- Level Designer

Collaborators:

- Lead Designer
- Gameplay Programmer

Approver:

- Lead Designer

Fields:

```csv
wave_group_id,wave_id,order_index,start_delay,next_wave_rule,next_wave_param,enabled,notes
wg_1001,wave_1001_1,1,0,kill_all,,1,first wave
```

Field rules:

- `wave_group_id`: string, required
- `wave_id`: string, required, unique
- `order_index`: int, required, starts at `1`
- `start_delay`: number, default `0`
- `next_wave_rule`: enum, required
- `next_wave_param`: string, optional based on rule
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Recommended `next_wave_rule` values:

- `kill_all`
- `time_pass`
- `manual_trigger`
- `boss_dead`
- `none`

Validation:

- each referenced wave group must have at least one enabled wave
- order indexes inside one group should not duplicate
- `time_pass` requires numeric `next_wave_param`

Do not:

- use wave order to hide objective logic

## 5. `Spawn.csv`

Purpose:

- defines enemy spawning inside waves

Primary owner:

- Level Designer

Collaborators:

- Gameplay Programmer
- QA Lead

Approver:

- Lead Designer and QA Lead

Fields:

```csv
wave_id,spawn_id,spawn_time,map_point_id,enemy_group_id,count,interval,formation_id,spawn_rule,enabled,notes
wave_1001_1,sp_001,0,p_left_01,eg_slime_small,3,0.5,line_3,fixed,1,left side spawn
```

Field rules:

- `wave_id`: ref `Wave.wave_id`, required
- `spawn_id`: string, required, unique
- `spawn_time`: number, required, relative to wave start
- `map_point_id`: ref `MapPoint.point_id`, required unless the spawn rule says otherwise
- `enemy_group_id`: ref `EnemyGroup.enemy_group_id`, required
- `count`: int, required, must be greater than `0`
- `interval`: number, default `0`
- `formation_id`: ref `Formation.formation_id`, optional
- `spawn_rule`: enum, required
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Recommended `spawn_rule` values:

- `fixed`
- `weighted`
- `random_point`
- `loop`
- `burst`

Validation:

- `spawn_time >= 0`
- `count > 0`
- `interval >= 0`
- referenced wave, map point, enemy group, and formation must exist
- formation capacity should match or support `count`
- total spawn duration should fit the intended wave window unless explicitly allowed

Do not:

- write raw coordinates here for production data
- write enemy prefab paths here

## 6. `EnemyGroup.csv`

Purpose:

- defines reusable enemy group entries for spawns

Primary owner:

- Level Designer

Collaborators:

- Lead Designer
- Gameplay Programmer

Approver:

- Lead Designer

Fields:

```csv
enemy_group_id,entry_index,enemy_id,weight,level_multiplier,hp_multiplier,atk_multiplier,enabled,notes
eg_slime_small,1,slime_green,70,1.0,1.0,1.0,1,green slime
```

Field rules:

- `enemy_group_id`: string, required
- `entry_index`: int, required inside group
- `enemy_id`: ref `Enemy.enemy_id`, required
- `weight`: number, default `1`
- `level_multiplier`: number, default `1.0`
- `hp_multiplier`: number, default `1.0`
- `atk_multiplier`: number, default `1.0`
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Validation:

- each enemy group referenced by Spawn must have enabled entries
- referenced enemies must exist and be enabled
- weights must be non-negative
- multipliers must stay within project-defined limits

Do not:

- use multipliers to patch every balance issue

## 7. `Enemy.csv`

Purpose:

- defines base enemy data and resource id references

Primary owner:

- Lead Designer

Collaborators:

- Gameplay Programmer
- Art Director
- Animation Lead

Approver:

- Lead Designer and Lead Programmer

Fields:

```csv
enemy_id,prefab_id,enemy_type,base_hp,base_atk,move_speed,ai_type,drop_group_id,enabled,notes
slime_green,prefab_slime_green,normal,100,10,120,melee,drop_slime_basic,1,basic melee enemy
```

Field rules:

- `enemy_id`: string, required, unique
- `prefab_id`: ref resource manifest, required
- `enemy_type`: enum, required
- `base_hp`: number, required
- `base_atk`: number, required
- `move_speed`: number, required
- `ai_type`: enum, required
- `drop_group_id`: ref `DropGroup.drop_group_id`, optional
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Recommended `enemy_type` values:

- `normal`
- `elite`
- `boss`
- `summon`

Validation:

- prefab id must exist in resource manifest
- boss objectives must reference boss-capable enemy ids
- disabled enemies must not appear in enabled enemy groups

Do not:

- put direct prefab paths in this table

## 8. `Map.csv`

Purpose:

- defines map identity, scene id, player spawn, camera, audio, and boundary references

Primary owner:

- Level Designer

Collaborators:

- Art Director
- Lead Programmer

Approver:

- Lead Designer and Art Director

Fields:

```csv
map_id,scene_id,player_spawn_point,camera_rule,bgm_id,boundary_id,enabled,notes
map_forest_01,scene_forest_01,player_01,follow_player,bgm_forest,boundary_forest_01,1,basic forest map
```

Field rules:

- `map_id`: string, required, unique
- `scene_id`: ref resource manifest or scene registry, required
- `player_spawn_point`: ref `MapPoint.point_id`, required
- `camera_rule`: enum/id, required
- `bgm_id`: ref resource manifest, optional
- `boundary_id`: string/id, optional
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Validation:

- scene id must exist
- player spawn point must exist for this map
- enabled levels must not reference disabled maps

Do not:

- store large point lists here

## 9. `MapPoint.csv`

Purpose:

- defines logical points for spawn, player start, triggers, rewards, NPCs, and camera markers

Primary owner:

- Level Designer

Collaborators:

- Lead Programmer
- Art Director

Approver:

- Lead Designer and Lead Programmer

Fields:

```csv
map_id,point_id,point_type,x,y,rotation,tags,enabled,notes
map_forest_01,p_left_01,enemy_spawn,-300,80,0,enemy|left,1,left spawn point
```

Field rules:

- `map_id`: ref `Map.map_id`, required
- `point_id`: string, required, globally unique because other tables reference `MapPoint.point_id` directly
- `point_type`: enum, required
- `x`: number, required
- `y`: number, required
- `rotation`: number, default `0`
- `tags`: simple list, optional
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Recommended `point_type` values:

- `player_spawn`
- `enemy_spawn`
- `trigger`
- `reward`
- `npc`
- `camera`

Validation:

- spawn references must point to enabled map points
- point ids should be globally unique across the project
- point coordinates should be inside map boundaries when boundary data exists
- point ids exported from Cocos scenes must match table ids

Do not:

- let art-only node movement silently change gameplay points

## 10. `Formation.csv`

Purpose:

- defines reusable relative positions for spawning multiple actors

Primary owner:

- Level Designer

Collaborators:

- Gameplay Programmer

Approver:

- Lead Designer

Fields:

```csv
formation_id,slot_index,offset_x,offset_y,rotation,enabled,notes
line_3,1,-80,0,0,1,left slot
```

Field rules:

- `formation_id`: string, required
- `slot_index`: int, required inside formation
- `offset_x`: number, required
- `offset_y`: number, required
- `rotation`: number, default `0`
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Validation:

- referenced formations must have enough enabled slots for intended spawn counts or define repeat behavior
- formation offsets should not push enemies outside map bounds when combined with map points

Do not:

- define one new formation per level without reuse reason

## 11. `Reward.csv`

Purpose:

- defines level completion reward entry points

Primary owner:

- Lead Designer

Collaborators:

- Level Designer
- QA Lead

Approver:

- Lead Designer and Producer

Fields:

```csv
reward_id,gold,exp,drop_group_id,first_clear_reward_id,enabled,notes
reward_1001,100,10,drop_level_1001,first_1001,1,first level reward
```

Field rules:

- `reward_id`: string, required, unique
- `gold`: int, default `0`
- `exp`: int, default `0`
- `drop_group_id`: ref `DropGroup.drop_group_id`, optional
- `first_clear_reward_id`: ref reward/drop table, optional
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Validation:

- enabled levels must reference enabled rewards
- reward values should stay within reward curve limits
- first-clear and repeat rewards must be distinguishable

Do not:

- mix ad reward, first-clear reward, and repeat reward into one unclear field

## 12. `StarRule.csv`

Purpose:

- defines scoring, stars, and optional achievement-like clear conditions

Primary owner:

- Lead Designer

Collaborators:

- Gameplay Programmer
- QA Lead

Approver:

- Lead Designer

Fields:

```csv
star_rule_id,star_index,condition_type,condition_param,reward_id,enabled,notes
star_basic,1,clear_level,,reward_star_1,1,clear the level
```

Field rules:

- `star_rule_id`: string, required
- `star_index`: int, required
- `condition_type`: enum, required
- `condition_param`: string, optional based on condition
- `reward_id`: ref `Reward.reward_id`, optional
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Validation:

- star indexes should be unique inside one rule
- conditions must be measurable by runtime systems and QA
- reward refs must exist when present

Do not:

- use vague conditions such as "good performance"

## 13. `DropGroup.csv`

Purpose:

- defines weighted or fixed drop entries

Primary owner:

- Lead Designer

Collaborators:

- Gameplay Programmer
- QA Lead

Approver:

- Lead Designer

Fields:

```csv
drop_group_id,entry_index,item_id,count,weight,enabled,notes
drop_slime_basic,1,item_coin,10,100,1,basic coin drop
```

Field rules:

- `drop_group_id`: string, required
- `entry_index`: int, required inside group
- `item_id`: ref item table, required
- `count`: int, required
- `weight`: number, default `1`
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Validation:

- item ids must exist
- weights must be non-negative
- counts must be positive
- referenced drop groups must have enabled entries

Do not:

- duplicate full drop definitions directly in Enemy or Reward tables

## 14. `LevelModifier.csv`

Purpose:

- defines reusable difficulty or rule modifiers

Primary owner:

- Lead Designer

Collaborators:

- Technical Director
- Gameplay Programmer

Approver:

- Lead Designer and Technical Director

Fields:

```csv
modifier_id,enemy_hp_ratio,enemy_atk_ratio,spawn_speed_ratio,time_limit_delta,player_buff_id,special_rule,enabled,notes
mod_easy,1.0,1.0,1.0,0,,none,1,baseline modifier
```

Field rules:

- `modifier_id`: string, required, unique
- `enemy_hp_ratio`: number, default `1.0`
- `enemy_atk_ratio`: number, default `1.0`
- `spawn_speed_ratio`: number, default `1.0`
- `time_limit_delta`: number, default `0`
- `player_buff_id`: ref buff table, optional
- `special_rule`: enum, default `none`
- `enabled`: bool `0/1`, required
- `notes`: string, optional

Validation:

- ratios must stay within project-defined limits
- special rules must be enum values
- modifiers should not become one-off bug patches

Do not:

- use modifiers to override every broken level design decision

## Required validation categories

Every production schema should support:

- file presence checks
- header checks
- type checks
- enum checks
- reference checks
- range checks
- combination checks
- level completion checks
- production risk warnings

Error messages must include:

- severity
- table
- row
- field
- value
- reason
- suggested fix
- suggested owner

Recommended format:

```text
[ERROR] Spawn.csv row=12 field=enemy_group_id value=eg_slime_big
Reason: referenced EnemyGroup does not exist.
Fix: add eg_slime_big to EnemyGroup.csv or change the field to an existing enemy_group_id.
Owner: Level Designer
```

## Field change process

Field changes require:

- reason
- owner
- data type
- default value
- validation rule
- runtime interpretation
- migration plan
- QA impact
- approval from Lead Designer and Lead Programmer

Forbidden:

- silent field meaning changes
- fields with no default value
- fields with no validation
- free-text fields that control gameplay rules

## Runtime conversion

Recommended pipeline:

```text
CSV or Sheet
  -> schema validation
  -> reference validation
  -> normalized JSON
  -> generated TypeScript types
  -> ConfigManager
  -> LevelBuilder
  -> WaveSystem, SpawnSystem, ObjectiveSystem, RewardSystem
```

Runtime should read generated JSON, not raw CSV.

Recommended commands:

```text
node scripts/validate-level-config.js <level-data-directory>
node scripts/export-level-config.js <level-data-directory> [output-file]
node scripts/export-level-types.js [output-file]
```
