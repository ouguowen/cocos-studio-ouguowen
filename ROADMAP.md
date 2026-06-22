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

Primary goal:

Move from example-pack documentation toward a small reference implementation shape that can guide real Cocos Creator integration.

Completed work:

1. Added Cocos reference stub folder.
2. Added map point component stub.
3. Added map point registry stub.
4. Added enemy prefab registry stub.
5. Added level runtime facade stub.
6. Added example bootstrap stub for `city_001`.

## v0.3.0-alpha.3 status: Cocos Setup Guide

Primary goal:

Make it easier for a beginner to reproduce the reference wiring inside Cocos Creator 3.8.8.

Completed work:

1. Added beginner Cocos Creator 3.8.8 setup guide.
2. Added scene-node checklist.
3. Added placeholder prefab naming rules.
4. Added first playable QA checklist.
5. Added notes that reference stubs are not a complete Cocos Creator project.

Still not included:

- A directly importable Cocos Creator project.
- Real Cocos scene and prefab files.
- Production-ready runtime implementation.

## v0.3.x next target: Real Importable Cocos Demo Skeleton

Primary goal:

Move from reference documentation and stubs toward a minimal Cocos Creator project skeleton that a developer can import and adapt.

Planned work:

1. Add a recommended Cocos project folder skeleton.
2. Add script placement guide for `assets/scripts`.
3. Add prefab placement guide for `assets/prefabs`.
4. Add scene assembly checklist with screenshot placeholders.
5. Add QA gate before claiming the demo is runnable.

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
