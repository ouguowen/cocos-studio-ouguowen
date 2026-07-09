# Provider-Driven Local Cocos Proof Runbook

Use this runbook when a task must prove that work has actually run inside a real `Cocos Creator 3.8.8` project.

This file is intentionally a proof runbook, not a claim that the repository already contains verified `.scene` or `.prefab` files.

## Goal

Produce repeatable local proof for the first example pack:

```text
examples/attack-defense-city
```

The proof target is:

```text
scene_city_battle
-> configured placeholder actors
-> configured map points
-> one wave path
-> objective state update
-> result path
```

## Required inputs

Before local execution starts, confirm:

- Cocos Creator version is `3.8.8`.
- A local Cocos Creator project exists or can be created.
- The project can open in the editor without import errors.
- The available execution channel is one of:
  - manual Cocos Creator editor work
  - authorized Cocos automation provider
  - authorized MCP provider with equivalent Cocos capabilities
- The provider can return proof, not only text.

## Provider capability checklist

An automation provider is acceptable only if it can perform or report the required parts of the task.

| Capability | Required? | Acceptable proof |
|---|---:|---|
| Create or open Cocos Creator 3.8.8 project | Yes | project path and editor version |
| Create scene | Yes | scene name and hierarchy |
| Create nodes | Yes | hierarchy list |
| Attach components | Yes | component list per node |
| Bind inspector fields | Yes | bound property list |
| Create placeholder prefabs | Yes for playable proof | prefab names and component bindings |
| Run preview | Yes for playable proof | browser preview result or Console output |
| Capture screenshot | Preferred | screenshot path or attached image |
| Report failures | Yes | blocker and failing step |

If the provider cannot prove a capability, it must not be treated as completed.

## Local execution sequence

### Step 1: Validate repository-side data

From the skill repository root:

```bash
npm install
npm run check
```

Expected result:

```text
PASS
```

This validates skill-side config and templates. It does not prove Cocos editor execution.

### Step 2: Create or open local Cocos project

Create or open a Cocos Creator `3.8.8` project.

Recommended local name:

```text
cocos-ai-game-studio-proof
```

Required proof:

```text
Cocos Creator version: 3.8.8
Project path: <local path>
Project opens without import errors: PASS / FAIL
```

### Step 3: Copy reference stubs

Copy or adapt the attack-defense reference stubs into:

```text
assets/scripts/attack-defense-city/
```

Do not claim exact file placement unless the files are actually created in the local project.

Required proof:

```text
assets/scripts/attack-defense-city/<file>.ts exists: PASS / FAIL
TypeScript compile/import status: PASS / FAIL
```

### Step 4: Add runtime config

Copy or generate runtime config under a project-appropriate folder, for example:

```text
assets/resources/config/attack-defense-city/
```

Required proof:

```text
Config asset path: <path>
Config load method: resources.load / asset reference / other
Config load result: PASS / FAIL
```

### Step 5: Create scene hierarchy

Create:

```text
scene_city_battle
```

Minimum hierarchy:

```text
Canvas
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

Required proof:

```text
Scene: scene_city_battle
Hierarchy:
- Canvas
- GameRoot
- GameRoot/MapRoot
- GameRoot/SpawnPoints
- GameRoot/BasePoint
- GameRoot/EnemyRoot
- GameRoot/ProjectileRoot
- GameRoot/RuntimeRoot
```

### Step 6: Create placeholder prefabs

Create only placeholder prefabs needed for the MVP proof.

Recommended minimum:

```text
assets/prefabs/enemies/Enemy_Placeholder.prefab
assets/prefabs/projectiles/Projectile_Placeholder.prefab
```

Required proof:

```text
Prefab path: <path>
Components: <component list>
Bound fields: <bound fields>
```

### Step 7: Bind runtime components

Attach runtime script components to scene nodes.

Required proof format:

```text
Node: GameRoot/RuntimeRoot
Component: <component name>
Bindings:
- enemyRoot -> GameRoot/EnemyRoot
- spawnPoints -> GameRoot/SpawnPoints
- basePoint -> GameRoot/BasePoint
- enemyPrefab -> assets/prefabs/enemies/Enemy_Placeholder.prefab
```

If a component or field does not exist yet, report it as a blocker instead of inventing a binding.

### Step 8: Run preview

Run the Cocos browser preview.

Required proof:

```text
Preview target: Browser
Console errors: none / list errors
First wave spawned: PASS / FAIL
Objective updated: PASS / FAIL
Result path triggered: PASS / FAIL
```

A screenshot is preferred but not required if the provider can return structured scene, binding, and Console proof.

## PASS criteria

The local proof is `PASS` only when all are true:

- Cocos Creator version is confirmed as `3.8.8`.
- Scene exists.
- Required nodes exist.
- Required components exist.
- Required inspector bindings are present.
- Config loads successfully.
- Browser preview runs.
- Console has no blocking errors.
- The first MVP loop shows observable behavior.

## FAIL criteria

Return `FAIL` when any of these are true:

- Cocos version is not `3.8.8` and the difference is not explicitly accepted.
- Scene or prefab proof is missing.
- Component bindings are unverified.
- Config path is guessed.
- Preview was not run.
- Console errors block the loop.
- The provider returns only a summary without evidence.

## Blocker report template

```text
Status: BLOCKED
Stage: Local Cocos Proof
Responsible role: cocos-dev / cocos-qa
Blocked step: <step number and name>
Reason: <specific reason>
Evidence available: <what was verified>
Evidence missing: <what is still missing>
Allowed next action: <manual fix or provider capability needed>
Forbidden claim: Do not claim playable Cocos proof yet.
```

## Proof report template

```text
Status: PASS / FAIL / BLOCKED
Cocos Creator version:
Project path:
Scene name:
Scene hierarchy proof:
Prefab proof:
Component binding proof:
Config load proof:
Preview result:
Console result:
Screenshot or visual proof:
Remaining blockers:
Final claim allowed:
```

## Final claim rules

Allowed claims:

```text
Repository-side config validation passed.
Local Cocos scene proof passed.
Local Cocos preview proof passed.
```

Forbidden claims without evidence:

```text
The game is complete.
The Cocos demo is runnable.
The scene and prefabs are verified.
The provider executed the editor successfully.
```

Only say these after the matching proof has been returned.
