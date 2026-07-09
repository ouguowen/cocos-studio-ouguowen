# Roadmap

This roadmap keeps `cocos-studio-ouguowen` moving from a Cocos production-system skill toward a practical multi-game-type AI Game Studio for solo developers and small teams.

## Current stable direction: v0.3.x

Goal:

- Make AI Game Studio mode clear, callable, reviewable, and example-driven.
- Keep the system useful for Cocos Creator 3.8.8 projects.
- Preserve production discipline while making it easier for beginners to start.
- Support multiple game types through classification and selected templates, not through one bloated universal flow.
- Treat Cocos automation tools/MCP providers as replaceable execution channels, not as the identity of the skill.

Current capabilities:

- Agent roles
- workflow commands
- handoff protocol
- audit logs
- quick start
- Chinese beginner entry
- example level config
- npm validation scripts
- GitHub Actions validation
- modern city attack-defense example pack
- multi-game-type example pack expansion plan
- one-shot MVP chain with gate discipline
- quick prototype transcript
- Cocos Dev Story task cards
- PASS / FAIL validation examples
- Cocos reference stubs for first wiring shape
- Cocos Creator setup guide and first playable checklist
- Cocos demo skeleton documentation and placeholder folders
- local Codex handoff prompt and Cocos editor validation log template
- local Windows execution steps and proof-report templates
- provider-driven local Cocos proof runbook
- Codex + Cocos automation proof guide
- first wave spawn proof guide
- first wave spawn runtime template
- manual local Cocos preview/config parsing proof baseline for attack-defense-city
- multi-game-type scope clarification
- provider-neutral Cocos automation execution policy

## v0.3.0-alpha.1 status: Example Pack Foundation

Primary goal:

Turn the documentation + config example into a more executable Cocos Creator MVP reference.

Completed work:

1. Added `examples/attack-defense-city/design/` with a mini GDD, loop brief, and acceptance criteria.
2. Added `examples/attack-defense-city/cocos-integration/` with a beginner-friendly mapping from config tables to Cocos runtime files.
3. Added a minimal scene/prefab binding guide for Cocos Creator 3.8.8.
4. Added a `cocos-quick-prototype` example transcript.
5. Added one full Agent handoff chain: Producer -> Designer -> Architect -> Dev -> QA.
6. Added validation examples showing expected pass/fail output.
7. Added a new issue/story template for scoped Cocos implementation tasks.
8. Added Cocos Dev Story task cards for the first MVP loop.

## v0.3.0-alpha.2 status: Cocos Reference Stub

Completed work:

1. Added Cocos reference stub folder.
2. Added map point component stub.
3. Added map point registry stub.
4. Added enemy prefab registry stub.
5. Added level runtime facade stub.
6. Added example bootstrap stub for `city_001`.

## v0.3.0-alpha.3 status: Cocos Setup Guide

Completed work:

1. Added beginner Cocos Creator 3.8.8 setup guide.
2. Added scene-node checklist.
3. Added placeholder prefab naming rules.
4. Added first playable QA checklist.
5. Added notes that reference stubs are not a complete Cocos Creator project.

## v0.3.0-alpha.4 status: Demo Skeleton

Completed work:

1. Added recommended Cocos project folder skeleton.
2. Added script placement guide for `assets/scripts`.
3. Added prefab placement guide for `assets/prefabs`.
4. Added scene assembly checklist.
5. Added QA gate before claiming the demo is runnable.
6. Added placeholder folders for scenes, scripts, prefabs, and config.

## v0.3.0-alpha.5 status: Demo Productionization Handoff

Completed work:

1. Added Codex handoff prompt for creating the Cocos demo in a local Cocos Creator project.
2. Added copy checklist for moving reference stubs into `assets/scripts`.
3. Added manual verification log template for the first editor run.
4. Added screenshot placeholder list for scene assembly proof.
5. Added limitation notes to prevent overclaiming demo readiness.

## v0.3.0-alpha.6 status: Local Cocos Execution Package

Primary goal:

Prepare the user-facing local execution package for work that must happen inside a real Cocos Creator 3.8.8 project.

Completed work:

1. Added local Cocos execution package.
2. Added Windows local execution steps.
3. Added local Cocos project creation checklist.
4. Added guide for what evidence to send back to AI.
5. Added editor proof report template.
6. Added blocker troubleshooting guide.

Still not included:

- Actual local Cocos Creator execution by the assistant.
- Verified editor screenshots.
- Filled proof report from a real local editor run.

## v0.3.0-alpha.7 status: Scope and Automation Provider Alignment

Primary goal:

Lock the skill's current direction without expanding into a large provider-specific MCP module.

Completed work:

1. Clarified that `cocos-studio-ouguowen` is a multi-game-type Cocos Creator 3.8.8 AI Game Studio skill.
2. Clarified that modern city attack-defense is the first example pack, not the only game type.
3. Added provider-neutral Cocos automation policy.
4. Clarified that a current commercial MCP and a future official Cocos MCP are interchangeable execution providers when their capabilities fit.
5. Kept local Cocos validation as a result gate, while allowing it to be automation-provider-driven rather than manually clicked.
6. Avoided adding a provider-specific protocol folder or hard dependency.

Still not included:

- Provider-specific MCP command dialects.
- A hard-coded commercial MCP implementation.
- A hard-coded future official MCP implementation.
- Cocos2d-x guidance.
- Multi-engine support.

## v0.3.0-alpha.8 status: Logical Beginner Execution Layer

Primary goal:

Make beginner usage and one-shot execution clearer without weakening production gates or inventing Cocos runtime proof.

Completed work:

1. Added `README.zh-CN.md` as a Chinese beginner entry.
2. Added `ONE_SHOT_GAME_BUILD.md` to define one-shot as a gated MVP chain, not a full-game shortcut.
3. Added `EXAMPLE_PACK_EXPANSION_PLAN.md` to guide card battle, story level clear, tower defense, merge/collection, and idle growth example packs.
4. Linked the new guides from `README.md`.
5. Routed the new guides through `MODULE_INDEX.md`.
6. Added `cocos-one-shot-mvp` to `COMMANDS.md`.

Still not included:

- Real Cocos Creator `.scene` or `.prefab` proof generated by this update.
- New completed example packs beyond `attack-defense-city`.
- Provider-specific MCP command dialects.

## v0.3.0-alpha.9 status: Provider-Driven Proof Runbook

Primary goal:

Turn the next local Cocos proof step into a strict evidence checklist that can be used by manual editor work or an authorized automation provider.

Completed work:

1. Added `docs/proof/provider-driven-local-cocos.md`.
2. Defined provider capability requirements for project creation/opening, scene creation, node creation, component attachment, inspector binding, prefab creation, preview, screenshots, and failure reporting.
3. Defined a step-by-step local execution sequence for `examples/attack-defense-city`.
4. Defined PASS, FAIL, and BLOCKED criteria.
5. Added proof and blocker report templates.
6. Linked the runbook from `README.md` and `MODULE_INDEX.md`.

Still not included:

- Actual local Cocos Creator execution by the assistant.
- Verified editor screenshots.
- Verified `.scene` or `.prefab` assets committed to the repository.
- A provider-specific MCP command dialect.

## v0.3.0-alpha.10 status: Manual Local Cocos Proof Baseline

Primary goal:

Use real Cocos Creator 3.8.8 manual validation to prove that the first example pack can reach preview, component lifecycle, config load, and generated config parsing.

Completed proof baseline:

1. `npm run check` passed locally.
2. Cocos Creator 3.8.8 project opened without blocking import errors.
3. `scene_city_battle` was created and opened as the active scene.
4. Minimum hierarchy was created: `Canvas`, `GameRoot`, `MapRoot`, `SpawnPoints`, `BasePoint`, `EnemyRoot`, `ProjectileRoot`, and `RuntimeRoot`.
5. Local project folders were created under `assets/scripts`, `assets/resources/config`, and `assets/prefabs`.
6. `level-config.json` and `generated-config-types.ts` were imported.
7. `CityBattleRuntime` was attached to `GameRoot/RuntimeRoot`.
8. `EnemyRoot`, `SpawnPoints`, `BasePoint`, and `Enemy_Placeholder.prefab` bindings were verified.
9. Browser preview opened.
10. Runtime lifecycle proof passed: `module loaded`, `onLoad`, `onEnable`, and `start`.
11. Runtime config load proof passed: `Level config loaded`.
12. Generated config parsing proof passed: `levels=1, waves=2, spawns=2, objectives=1`.

Allowed claim:

```text
Local Cocos preview + runtime config load + generated config parsing proof passed.
```

Still not included:

- First wave enemy spawn proof.
- Enemy movement proof.
- Objective state update proof.
- Result path proof.
- A complete first playable gameplay loop.

## v0.3.0-alpha.11 status: Codex Automation Proof Guide

Primary goal:

Turn the manual local proof baseline into a Codex-ready automation guide so future local Cocos proof can be reproduced with fewer manual screenshots.

Completed work:

1. Added `docs/proof/codex-cocos-automation.md`.
2. Defined required Cocos provider capabilities: version detection, project/scene access, hierarchy proof, component attachment, inspector binding, prefab proof, preview, console logs, screenshots, and failure reporting.
3. Added the golden target for `attack-defense-city`: `scene_city_battle`, `CityBattleRuntime`, `Enemy_Placeholder.prefab`, and `level-config.json`.
4. Added the exact required runtime console proof, including `Config summary: levels=1, waves=2, spawns=2, objectives=1`.
5. Added a local Codex prompt for provider-driven Cocos automation.
6. Defined PASS, FAIL, and BLOCKED criteria.
7. Linked the guide from `README.md` and `MODULE_INDEX.md`.

Still not included:

- Automatic execution by ChatGPT in this conversation.
- Provider-specific command dialects.
- First wave spawn proof.
- Full first playable proof.

## v0.3.0-alpha.12 status: First Wave Spawn Proof Planning

Primary goal:

Define the first narrow gameplay proof after config parsing without expanding into movement, combat, objective, result, economy, UI, or first playable claims.

Completed work:

1. Added `docs/proof/first-wave-spawn.md`.
2. Defined prerequisite proof: local preview, lifecycle, config load, and generated config parsing must already pass.
3. Defined allowed scope: read `config.tables.spawn`, instantiate `Enemy_Placeholder`, parent enemies under `EnemyRoot`, log spawned count, and show visible placeholder nodes.
4. Defined forbidden scope: pathfinding, movement, combat, objective update, win/loss, rewards, economy, UI production, and first playable claims.
5. Defined PASS, PARTIAL PASS, FAIL, and BLOCKED criteria.
6. Linked the guide from `README.md` and `MODULE_INDEX.md`.

Still not included:

- Runtime implementation of enemy spawning.
- Browser preview proof showing spawned enemy nodes.
- Enemy movement proof.
- Objective state proof.
- Result path proof.

## v0.3.0-alpha.13 status: First Wave Spawn Runtime Template

Primary goal:

Provide a copyable Cocos Creator 3.8.8 runtime template that performs spawn-only proof without claiming full gameplay.

Completed work:

1. Added `examples/attack-defense-city/cocos-reference/CityBattleSpawnProofRuntime.ts`.
2. Added `examples/attack-defense-city/cocos-reference/SPAWN_PROOF_RUNTIME_USAGE.md`.
3. Implemented spawn-only runtime behavior: load config, read `config.tables.spawn`, instantiate `Enemy_Placeholder`, parent enemies under `EnemyRoot`, assign proof positions, and log spawned count.
4. Linked the runtime template from `docs/proof/first-wave-spawn.md` and `README.md`.
5. Preserved scope boundaries: no movement, combat, objective state, result path, economy, UI, or first playable claim.

Still not included:

- Actual local Cocos Creator execution of the spawn runtime template by ChatGPT.
- Browser preview proof showing spawned enemy nodes.
- Enemy movement proof.
- Objective state proof.
- Result path proof.

## v0.3.x next target: First Wave Spawn Local Runtime Proof

Primary goal:

Run the spawn-only runtime template in a real Cocos Creator 3.8.8 preview and collect proof.

Planned work:

1. Copy `CityBattleSpawnProofRuntime.ts` into the local Cocos project.
2. Attach it to `GameRoot/RuntimeRoot` or a dedicated proof node.
3. Bind `EnemyRoot`, `SpawnPoints`, `BasePoint`, and `Enemy_Placeholder.prefab`.
4. Run browser preview.
5. Prove console output includes `Spawn table count: 2` and `Spawned enemy count: 2`.
6. Prove hierarchy or visual output includes `SpawnedEnemy_001` and `SpawnedEnemy_002` under `GameRoot/EnemyRoot`.
7. Return PASS / PARTIAL PASS / FAIL / BLOCKED proof.

Forbidden expansion:

- Do not add full pathfinding yet.
- Do not add economy, UI, combat, win/loss, shop, ads, or live ops.
- Do not claim first playable until objective and result path proof exist.

## v0.4.0 target: Stronger Agent Operations

Primary goal:

Make multi-Agent work more operational and less conceptual.

Planned work:

1. Add structured task cards for each command.
2. Add `AGENT_MEMORY.md` or equivalent project-memory handoff format.
3. Add escalation rules when agents disagree.
4. Add reviewer checklists per Agent role.
5. Add command examples for common modules: home page, battle HUD, shop, bag, result page.
6. Add anti-scope-creep rules for AI-generated features.

## v0.5.0 target: Real Game Production Kit

Primary goal:

Move closer to a practical AI-assisted Cocos game production kit.

Planned work:

1. Add more game-type example packs: card battle, story level clear, tower defense, merge/collection, idle growth.
2. Add Cocos Creator import/setup guide for each example pack.
3. Add performance budget examples for mobile.
4. Add release-readiness examples.
5. Add rollback and config hotfix examples.

## Long-term direction

The long-term direction is not to become a single-game template or a provider-specific automation plugin.

The goal is to become:

```text
Cocos AI Game Studio
= reusable production brain
+ Cocos Creator 3.8.8 runtime discipline
+ multi-game-type workflow
+ AI Agent collaboration protocol
+ beginner-friendly execution path
+ replaceable Cocos automation provider channel
```
