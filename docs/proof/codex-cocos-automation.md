# Codex + Cocos Automation Proof Guide

Use this guide when Codex is running locally and can access a Cocos Creator automation provider, MCP server, or equivalent editor-control tool.

The goal is to reduce manual screenshot-driven validation while preserving the same proof discipline required by `provider-driven-local-cocos.md`.

## Current proof baseline

The first local manual proof for `examples/attack-defense-city` has already shown that the following chain is possible inside `Cocos Creator 3.8.8`:

```text
Cocos Creator 3.8.8 preview starts
-> CityBattleRuntime module loads
-> component lifecycle runs
-> RuntimeRoot scene bindings are available
-> Enemy_Placeholder prefab binding is available
-> resources.load() loads level-config
-> generated common-wave-spawn-v1 config is parsed
-> Config summary: levels=1, waves=2, spawns=2, objectives=1
```

This guide does not claim that the automation provider has already reproduced that proof. It defines how Codex should reproduce it automatically.

## When to use this guide

Use this guide when the user wants:

- Codex to operate Cocos Creator locally.
- fewer manual screenshots.
- automated scene, prefab, binding, preview, and console proof.
- repeatable local validation of an example pack.
- provider-neutral Cocos automation that can work with a current MCP provider or a future official Cocos provider.

Do not use this guide to pretend Cocos work happened when no editor proof exists.

## Required provider capabilities

A provider is sufficient only if it can do most of the following and report evidence:

| Capability | Required for automation? | Proof required |
|---|---:|---|
| Detect Cocos Creator version | Yes | `3.8.8` or explicit accepted version |
| Open or identify active project | Yes | project path |
| Open or create scene | Yes | scene name and hierarchy |
| Create nodes | Yes | hierarchy proof |
| Attach component | Yes | component name on target node |
| Bind inspector fields | Yes | property -> asset/node mapping |
| Create or locate prefab | Yes | prefab path |
| Save scene | Yes | save result |
| Run preview | Yes | preview URL or status |
| Read browser/editor console logs | Yes | relevant log lines |
| Capture screenshot | Preferred | screenshot path or attachment |
| Report failure step | Yes | blocker report |

If the provider cannot read console logs or return proof, it may assist with editor actions but cannot complete proof alone.

## Automation command contract

When Codex runs local Cocos proof, it must output:

```text
Status: PASS / FAIL / BLOCKED
Cocos Creator version:
Project path:
Active scene:
Scene hierarchy proof:
Component proof:
Prefab proof:
Binding proof:
Preview proof:
Console proof:
Config proof:
Screenshot proof:
Remaining blockers:
Allowed final claim:
```

## Golden target for attack-defense-city

For the first example pack, the automation target is:

```text
scene_city_battle
GameRoot/RuntimeRoot
CityBattleRuntime
assets/resources/config/attack-defense-city/level-config.json
assets/prefabs/enemies/Enemy_Placeholder.prefab
```

Required scene hierarchy:

```text
scene_city_battle
  Canvas
    Camera
    HUD_Root
    Result_Root
  GameRoot
    MapRoot
    SpawnPoints
    BasePoint
    EnemyRoot
    ProjectileRoot
    RuntimeRoot
```

Required component bindings:

```text
Node: GameRoot/RuntimeRoot
Component: CityBattleRuntime
Bindings:
- enemyRoot -> GameRoot/EnemyRoot
- spawnPoints -> GameRoot/SpawnPoints
- basePoint -> GameRoot/BasePoint
- enemyPrefab -> assets/prefabs/enemies/Enemy_Placeholder.prefab
- levelConfigPath -> config/attack-defense-city/level-config
```

Required runtime console proof:

```text
[CityBattleRuntime] module loaded
[CityBattleRuntime] onLoad
[CityBattleRuntime] onEnable
[CityBattleRuntime] start
[CityBattleRuntime] binding check
enemyRoot: EnemyRoot
spawnPoints: SpawnPoints
basePoint: BasePoint
enemyPrefab: Enemy_Placeholder
levelConfigPath: config/attack-defense-city/level-config
[CityBattleRuntime] Level config loaded
[CityBattleRuntime] Config summary: levels=1, waves=2, spawns=2, objectives=1
```

## Recommended Codex prompt

Use this prompt in a local Codex session that can access the Cocos project and Cocos automation provider:

```text
Use $cocos-studio-ouguowen.
Engine baseline: Cocos Creator 3.8.8.
Task: run provider-driven local Cocos proof for examples/attack-defense-city.

Use the available Cocos automation provider when possible.
Do not fake proof.
Do not claim first playable gameplay.
Only prove scene, component, prefab, config load, config parsing, and preview lifecycle.

Target scene: scene_city_battle.
Target component: CityBattleRuntime on GameRoot/RuntimeRoot.
Target config: assets/resources/config/attack-defense-city/level-config.json.
Target prefab: assets/prefabs/enemies/Enemy_Placeholder.prefab.

Required console result:
[CityBattleRuntime] Config summary: levels=1, waves=2, spawns=2, objectives=1

Return PASS / FAIL / BLOCKED with exact evidence.
```

## Recommended automation sequence

Codex should follow this sequence:

1. Check repository-side validation.

```bash
npm run check
```

2. Confirm Cocos project path and engine version.
3. Open or create `scene_city_battle`.
4. Verify minimum hierarchy.
5. Create missing folders if needed:

```text
assets/scripts/attack-defense-city
assets/resources/config/attack-defense-city
assets/prefabs/enemies
assets/prefabs/projectiles
```

6. Copy/import:

```text
examples/attack-defense-city/generated-level-config.json
-> assets/resources/config/attack-defense-city/level-config.json
```

7. Create or update `CityBattleRuntime.ts` with config parsing that reads:

```ts
config.tables.level
config.tables.wave
config.tables.spawn
config.tables.levelObjective
```

8. Attach `CityBattleRuntime` to `GameRoot/RuntimeRoot`.
9. Bind required fields.
10. Create or locate `Enemy_Placeholder.prefab`.
11. Save scene.
12. Run browser preview.
13. Read console logs.
14. Return a proof report.

## PASS criteria

Return `PASS` only when all are true:

- Cocos Creator version is confirmed.
- Active scene is `scene_city_battle`.
- Required hierarchy exists.
- `CityBattleRuntime` is attached to `GameRoot/RuntimeRoot`.
- All required bindings exist.
- Browser preview starts.
- Console shows lifecycle logs.
- Console shows config load success.
- Console shows:

```text
Config summary: levels=1, waves=2, spawns=2, objectives=1
```

## FAIL criteria

Return `FAIL` when:

- Cocos cannot open the project.
- The active scene is wrong and cannot be corrected.
- Script compile/import fails.
- Component cannot be attached.
- Required bindings cannot be created.
- Preview crashes.
- Config load fails.
- Generated config counts are not parsed correctly.

## BLOCKED criteria

Return `BLOCKED` when:

- No Cocos automation provider is available.
- The provider can click or create assets but cannot return proof.
- Console logs cannot be read.
- Cocos Creator is not accessible from the local Codex environment.
- User confirmation is required for local filesystem or editor access.

## Forbidden claims

Do not claim:

```text
First playable is complete.
Enemies spawn correctly.
Enemies move along the route.
Objective state updates.
Win/loss result path is proven.
The game is complete.
```

Those belong to the next gameplay proof stage.

Allowed claim after this proof passes:

```text
Local Cocos preview + runtime config load + generated config parsing proof passed.
```

## Next proof stage

After this guide passes, the next stage may be:

```text
First wave spawn proof
```

That stage should prove only:

```text
read config.tables.spawn
instantiate one or more Enemy_Placeholder nodes
parent them under GameRoot/EnemyRoot
log spawned enemy count
show visible placeholder nodes in preview
```

It should not expand into full combat, pathfinding, economy, UI, or win/loss unless a new dev-ready story is created.
