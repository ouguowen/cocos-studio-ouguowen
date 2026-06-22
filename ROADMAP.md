# Roadmap

This roadmap keeps `cocos-studio-ouguowen` moving from a Cocos production-system skill toward a practical AI Game Studio for solo developers and small teams.

## Current stable direction: v0.3.x

Goal:

- Make AI Game Studio mode clear, callable, reviewable, and example-driven.
- Keep the system useful for Cocos Creator 3.8.8 projects.
- Preserve production discipline while making it easier for beginners to start.

Current capabilities:

- Agent roles
- workflow commands
- handoff protocol
- audit logs
- quick start
- example level config
- npm validation scripts
- GitHub Actions validation
- modern city attack-defense example pack
- quick prototype transcript
- Cocos Dev Story task cards
- PASS / FAIL validation examples
- Cocos reference stubs for first wiring shape
- Cocos Creator setup guide and first playable checklist
- Cocos demo skeleton documentation and placeholder folders
- local Codex handoff prompt and Cocos editor validation log template
- local Windows execution steps and proof-report templates

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

## v0.3.x next target: Real Local Editor Proof

Primary goal:

The user opens Cocos Creator 3.8.8 locally, follows the local execution package, and sends proof back for AI review.

Planned work:

1. Run `npm run check` locally.
2. Create or open the local Cocos Creator 3.8.8 project.
3. Copy/adapt reference stubs into `assets/scripts/attack-defense-city/`.
4. Create placeholder prefabs in `assets/prefabs/enemies/`.
5. Create `scene_city_battle` and bind inspector fields.
6. Fill the editor proof report.
7. Send errors, screenshots, or proof text back to AI.

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

The long-term direction is not to become a single-game template.

The goal is to become:

```text
Cocos AI Game Studio
= reusable production brain
+ Cocos runtime discipline
+ multi-game-type workflow
+ AI Agent collaboration protocol
+ beginner-friendly execution path
```
