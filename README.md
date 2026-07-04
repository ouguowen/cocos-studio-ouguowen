# Cocos Studio Ouguowen

Cocos Studio Ouguowen is a production-control Skill for Cocos Creator 3.8.8 AI-assisted game development.

It helps Codex or other AI coding agents plan, scope, validate, implement, QA, and close small Cocos Creator MVPs without drifting into uncontrolled feature growth.

## What This Project Is

- A production-control Skill for Cocos Creator 3.8.8.
- A multi-game-type AI Game Studio workflow system.
- A command and gate registry for AI-assisted Cocos development.
- A safety layer for Codex or other AI coding agents.
- A provider-neutral workflow that can use a Cocos automation provider or MCP as a replaceable execution channel.
- A way to move from idea -> design -> first implementation story -> browser proof -> QA -> MVP acceptance.

## What This Project Is Not

- Not a single game template.
- Not a Cocos2d-x guide.
- Not a provider-specific MCP plugin.
- Not a full Cocos manual.
- Not a promise that AI can safely write scenes, prefabs, meta files, or runtime code without approval.
- Not locked to Moonlight Delivery, attack-defense, story games, or any one genre.

## Supported Use Cases

- Cocos Creator 3.8.8 project planning.
- Multi-game-type MVP production.
- Game classification before template selection.
- GDD, numerical design, economy design, animation/presentation design, asset policy, and architecture gating.
- First implementation story creation.
- Pre-write approval before Codex writes files.
- Browser preview proof through a Cocos automation provider, MCP, or manual execution path.
- QA and release review for small MVPs.

## Developer Experience / Operation Modes

The Skill has three operation modes:

- Fast Build Mode
- Safe Gate Mode
- Audit Mode

Normal game development defaults to Fast Build Mode to avoid unnecessary interruptions.

Safety gates are still enforced when risk appears. Stage transitions use Safe Gate Mode, and Skill self-tests or repository audits use Audit Mode.

## Quick Start

Use this prompt in Codex:

```text
Use $cocos-studio-ouguowen.
Run cocos-game-brief for my game idea, then recommend the next command.
```

The Skill should start with a brief and recommend the next controlled command. It should not jump directly into Cocos scene or script writing.

## Installation

Place this repository in your Codex skills directory:

```text
~/.codex/skills/cocos-studio-ouguowen
```

On Windows:

```text
C:\Users\<you>\.codex\skills\cocos-studio-ouguowen
```

Restart Codex after installing or updating the Skill so metadata reloads cleanly.

## First MVP Path

For the full first-MVP path, see [docs/quickstart-first-mvp.md](docs/quickstart-first-mvp.md) and [FIRST_MVP_SUCCESS_PIPELINE.md](FIRST_MVP_SUCCESS_PIPELINE.md).

Canonical chain:

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-gdd
-> cocos-numerical-design
-> cocos-economy-design
-> cocos-animation-design
-> cocos-asset-policy
-> cocos-game-architecture
-> cocos-first-implementation-story
-> cocos-production-readiness
-> cocos-dev-story-prewrite
-> cocos-dev-story
-> Preview Visibility Gate
-> cocos-qa-review
-> cocos-release-review
-> FIRST_MVP_ACCEPTED
```

Important boundaries:

- Documentation stages do not open Cocos Creator.
- Implementation requires `FIRST_IMPLEMENTATION_STORY.md`.
- `READY_FOR_IMPLEMENTATION` authorizes one story only.
- `cocos-dev-story` must stop at pre-write approval before writing files.
- Browser preview proof must show real visible runtime output.
- `FIRST_MVP_ACCEPTED` means the current MVP is accepted, not that the full game is complete.

## Core Commands

- `cocos-game-brief`: define the game idea, target player, core fantasy, MVP promise, and non-goals.
- `cocos-classify-game`: classify the game type by dominant action and content unit.
- `cocos-gdd`: produce the Game Design Document.
- `cocos-numerical-design`: decide whether gameplay numbers or balance systems are needed.
- `cocos-economy-design`: decide whether currency, shop, inventory, rewards, ads, gacha, or monetization exist.
- `cocos-animation-design`: decide presentation, animation, VFX, UI motion, and gameplay-truth boundaries.
- `cocos-asset-policy`: decide placeholder/final art, audio, font, import, and external-asset boundaries.
- `cocos-game-architecture`: define scene, script, data, asset, and runtime proof boundaries.
- `cocos-first-implementation-story`: write the smallest dev-ready first story.
- `cocos-production-readiness`: decide whether exactly one implementation story may start.
- `cocos-dev-story-prewrite`: output the pre-write approval checklist and stop.
- `cocos-dev-story`: implement only the approved story after explicit user approval.
- `cocos-qa-review`: verify acceptance criteria and forbidden scope.
- `cocos-release-review`: decide `FIRST_MVP_ACCEPTED`, `FIRST_MVP_NOT_ACCEPTED`, or `RELEASE_BLOCKED`.

See [COMMANDS.md](COMMANDS.md) for the full command registry.

## How It Prevents Unsafe AI Writes

The Skill uses multiple guardrails:

- [AI_COMMAND_PERMISSION_RULES.md](AI_COMMAND_PERMISSION_RULES.md): AI command permission boundaries.
- [COCOS_PATH_SCOPED_RULES.md](COCOS_PATH_SCOPED_RULES.md): path-scope rules for Cocos projects and Skill maintenance.
- [CODEX_WRITE_APPROVAL_PROTOCOL.md](CODEX_WRITE_APPROVAL_PROTOCOL.md): write approval before file changes.
- [COCOS_DEV_STORY_PREWRITE_PROTOCOL.md](COCOS_DEV_STORY_PREWRITE_PROTOCOL.md): mandatory pre-write checklist before `cocos-dev-story`.
- [COCOS_GENERATED_META_POLICY.md](COCOS_GENERATED_META_POLICY.md): stop-and-confirm policy for Cocos-generated `.meta` files.
- [RUNTIME_PROOF_PROTOCOL.md](RUNTIME_PROOF_PROTOCOL.md): proof rules for browser preview and runtime claims.
- [GIT_DIFF_REVIEW_PROTOCOL.md](GIT_DIFF_REVIEW_PROTOCOL.md): required diff review before commit.

The Skill should stop when unexpected files appear, especially Cocos `.scene`, `.prefab`, `.meta`, runtime code, or unrelated assets.

## Automation Validation

This repository uses GitHub Actions to validate required docs, command routing, safety protocols, relative Markdown links, and dangerous rule regressions.

The workflow runs on `push` and `pull_request`:

```text
python scripts/validate_skill_docs.py
```

See [docs/automation-validation.md](docs/automation-validation.md) for the full validation policy and local run instructions.

## Collaboration and Release

Open-source collaboration is routed through GitHub issue templates and the pull request template:

- Bug reports: [bug_report.yml](.github/ISSUE_TEMPLATE/bug_report.yml)
- Feature requests: [feature_request.yml](.github/ISSUE_TEMPLATE/feature_request.yml)
- Safety reports: [safety_report.yml](.github/ISSUE_TEMPLATE/safety_report.yml)
- Documentation requests: [documentation.yml](.github/ISSUE_TEMPLATE/documentation.yml)
- Pull requests: [pull_request_template.md](.github/pull_request_template.md)

Release planning uses [docs/release-strategy.md](docs/release-strategy.md) and [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md). A release must keep changes inside the Skill repository, pass `python scripts/validate_skill_docs.py`, update [CHANGELOG.md](CHANGELOG.md), and preserve the safety model around Cocos `.scene`, `.prefab`, `.anim`, `.meta`, browser proof, and pre-write approval.

## Automation Provider / MCP Position

This project is not an MCP plugin.

It can use a Cocos automation provider or MCP when local Cocos work is authorized, but that provider is only an execution channel. The workflow should stay provider-neutral and describe capabilities such as:

- open project
- inspect hierarchy
- create scene
- create nodes
- bind components
- save scene
- run browser preview
- read console
- return screenshot or PASS/FAIL proof

A current commercial MCP provider and a future official Cocos MCP should be replaceable without changing the Skill's core identity.

## Example Case: Moonlight Delivery

Moonlight Delivery - Chapter 1 Shell is a successful first-MVP case:

- game type: `story-clear / light-interaction / narrative micro-game`
- result: `FIRST_MVP_ACCEPTED`
- QA result: `QA_PASS`
- Preview Visibility Gate: `PASS`

Read the case:

- [SUCCESS_CASE_MOONLIGHT_DELIVERY.md](SUCCESS_CASE_MOONLIGHT_DELIVERY.md)
- [examples/moonlight-delivery/README.md](examples/moonlight-delivery/README.md)

This case proves the pipeline, not the only game genre. It should improve workflow control, not lock the Skill to story games.

## Repository Map

- [SKILL.md](SKILL.md): Skill entrypoint and routing law.
- [COMMANDS.md](COMMANDS.md): command registry.
- [MODULE_INDEX.md](MODULE_INDEX.md): module map.
- [QUALITY_GATES.md](QUALITY_GATES.md): promotion and approval gates.
- [FIRST_MVP_SUCCESS_PIPELINE.md](FIRST_MVP_SUCCESS_PIPELINE.md): proven first-MVP pipeline.
- [COCOS_DEV_STORY_PREWRITE_PROTOCOL.md](COCOS_DEV_STORY_PREWRITE_PROTOCOL.md): pre-write approval protocol.
- [COCOS_GENERATED_META_POLICY.md](COCOS_GENERATED_META_POLICY.md): generated meta policy.
- [MVP_ACCEPTANCE_REPORT_TEMPLATE.md](MVP_ACCEPTANCE_REPORT_TEMPLATE.md): MVP acceptance report template.
- [CONTRIBUTING.md](CONTRIBUTING.md): contribution guide.
- [SECURITY.md](SECURITY.md): security reporting and safety policy.
- [docs/open-source-roadmap.md](docs/open-source-roadmap.md): open-source polish roadmap.
- [docs/automation-validation.md](docs/automation-validation.md): automated docs and safety validation.

## Contributing

Contributions are welcome when they preserve the Skill's safety model.

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Do not submit changes that encourage agents to bypass pre-write approval, raw-edit Cocos `.scene` / `.prefab` / `.meta` files, or treat browser proof as optional for playable MVPs.

## License

See [LICENSE](LICENSE).
