# Cocos Studio Ouguowen

`Cocos Studio Ouguowen` is a senior-level production-system skill for `Cocos Creator 3.x`.

It is designed for solo developers and small teams who want to run a game project like a disciplined studio instead of drifting through ad hoc decisions.

## What it does

This repository is not just a coding helper. It is a production operating system for:

- game classification
- MVP scoping
- role and authority boundaries
- architecture and level-system planning
- config-table design
- release and platform control
- live-operations and business-metrics review
- risk escalation and formal review

## Module groups

The skill is organized into a few major families:

- Foundation and routing
  - `SKILL.md`
  - `MODULE_INDEX.md`
  - `WORKFLOWS.md`
- Roles, authority, and ownership
  - `ROLES.md`
  - `ROLE_STAGE_MATRIX.md`
  - `OWNERSHIP.md`
  - `TEAM_SENIORITY_SYSTEM.md`
  - `COLLAB_HANDOFF_SYSTEM.md`
- Scope and product definition
  - `GAME_CLASSIFIER_SYSTEM.md`
  - `GAME_TYPE_TEMPLATES.md`
  - `MVP_PROTOTYPE_RULES.md`
  - `VERSION_ROADMAP_SYSTEM.md`
  - `PLAYBOOK_SYSTEM.md`
- Architecture and content runtime
  - `COCOS_RULES.md`
  - `PROJECT_STRUCTURE.md`
  - `ARCHITECTURE_TEMPLATE_SYSTEM.md`
  - `LEVEL_DATA_MODELS.md`
  - `LEVEL_CONFIG_SCHEMAS.md`
  - `LEVEL_SYSTEM_ARCHITECTURE.md`
  - `RUNTIME_TEMPLATE_ROUTER.md`
- Delivery and operations
  - `RELEASE_PIPELINE_SYSTEM.md`
  - `PLATFORM_TARGET_RULES.md`
  - `RELEASE_ROLLBACK_PLAYBOOK.md`
  - `OPERATIONS_DATA_SYSTEM.md`
- Governance and review
  - `QUALITY_GATES.md`
  - `CHECKLISTS.md`
  - `RISK_ESCALATION_SYSTEM.md`
  - `REVIEW_SYSTEM.md`
  - `TECH_DEBT_REGISTER.md`
  - `INCIDENT_POSTMORTEM_TEMPLATE.md`

## Good fit

- serious Cocos Creator 3.x projects
- solo developers wearing many hats
- small teams that want senior-level structure
- level-heavy games
- projects that keep getting messy during prototype, production, or release

## Not the main goal

- generic Unity or Godot workflows
- one-off lightweight "just write one script" requests
- engine plugin automation for every possible editor task

## Recommended usage

Good entry prompts include:

- `What kind of game is this really?`
- `What should this next version actually prove?`
- `Which architecture template fits this game?`
- `How should levels be configured?`
- `Can we ship this?`
- `Review this professionally.`

The skill's operating order is:

1. identify mode and stage
2. identify role, authority, and ownership
3. classify the game and lock version purpose
4. choose the right architecture and content model
5. apply delivery, operations, and review gates

## First session quick start

If you are opening a brand-new game idea, a good first sequence is:

1. `Use $cocos-studio-ouguowen. Classify this game by dominant loop and content unit.`
2. `Use $cocos-studio-ouguowen. Define the MVP and explicit non-goals.`
3. `Use $cocos-studio-ouguowen. Create the first project memory record.`
4. `Use $cocos-studio-ouguowen. Build the version roadmap and next milestone proof obligation.`

That sequence will usually produce:

- game classification
- MVP scope
- stable project memory
- milestone and version direction

## Installation

Place the folder inside your Codex skills directory:

```text
~/.codex/skills/cocos-studio-ouguowen
```

On Windows this is usually:

```text
C:\Users\<you>\.codex\skills\cocos-studio-ouguowen
```

Restart Codex after installing or updating the skill so the metadata reloads cleanly.

## Philosophy

- senior-team standard only
- no undefined ownership
- no vague stage state
- no uncontrolled architecture drift
- no fake milestone claims
- no production advancement without real gates
