# Cocos Studio Ouguowen

`Cocos Studio Ouguowen` is a senior-level production-system skill for Cocos Creator 3.x game development.

It is designed for solo developers or small teams that want strong role boundaries, stage discipline, asset ownership, architecture rules, and release gates instead of ad hoc production.

## What this skill is

This is not only a coding skill.

It acts more like a studio operating system for a Cocos Creator 3.x project:

- stage planning
- role ownership
- asset ownership
- Cocos architecture rules
- level data model selection
- quality gates
- release readiness
- templates and checklists

## Who it is for

- solo developers wearing multiple hats
- small game teams using Cocos Creator 3.x
- projects that keep getting messy during prototype or production
- developers who want a senior workflow instead of "build first, clean later"

## Repository contents

- `SKILL.md`: entry point, routing rules, and non-negotiable principles
- `ROLES.md`: studio roles and role boundaries
- `ROLE_STAGE_MATRIX.md`: what each role does in each stage
- `STAGES.md`: phase system from framing to release
- `OWNERSHIP.md`: asset ownership and approval rules
- `COCOS_RULES.md`: anti-chaos rules for Cocos Creator 3.x
- `PROJECT_STRUCTURE.md`: recommended project blueprint
- `LEVEL_DATA_MODELS.md`: level and content data model selection
- `QUALITY_GATES.md`: feature, slice, QA, and release gates
- `CHECKLISTS.md`: operational review checklists
- `WORKFLOWS.md`: execution patterns for common situations
- `EXAMPLES.md`: applied usage examples
- `TEMPLATES.md`: reusable project document templates

## Recommended usage

Use this skill when you need help with any of the following:

- "How should I start this Cocos game?"
- "Which stage is my project in?"
- "Who should own this prefab, UI, or config?"
- "Which level configuration model should this game use?"
- "Should these levels use CSV, room pools, quest graphs, puzzle states, or procedural rules?"
- "My project is getting messy. What is wrong?"
- "Can this build enter the next stage?"
- "Can we ship this?"

## Default operating order

1. Identify the current stage.
2. Identify the responsible role.
3. Identify the affected assets and ownership rules.
4. Apply the Cocos architecture and structure rules.
5. Select the right level data model when content or level data is involved.
6. Check gates and checklists.
7. Produce or review the needed artifacts.

## Installation

Place the skill folder inside your local Codex skills directory:

```text
~/.codex/skills/cocos-studio-ouguowen
```

On Windows, the local path usually looks like:

```text
C:\Users\<you>\.codex\skills\cocos-studio-ouguowen
```

After copying or updating the skill, restart Codex so the new skill name and description are picked up reliably.

## Philosophy

- senior-team standard only
- no undefined ownership
- no vague stage state
- no uncontrolled architecture drift
- no giant god scripts as the default answer
- no pushing to production without gates

## Good fit

- serious 2D Cocos projects
- solo-dev studio workflows
- projects that need clearer boundaries between design, programming, art, QA, and release work

## Not the main goal

- generic Unity or Godot workflows
- lightweight "just give me one script" workflows
- editor-plugin automation for every task

## Status

This repository currently packages the first practical version of the skill, including stage logic, roles, ownership, structure rules, level data model selection, templates, examples, and checklists.
