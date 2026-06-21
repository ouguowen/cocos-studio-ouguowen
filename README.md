# Cocos Studio Ouguowen

Senior production-system skill for `Cocos Creator 3.8.8`.

This skill is for solo developers and small teams who want to build games with studio-grade structure instead of ad hoc decisions.

## What it covers

- game classification and MVP scope
- production modes and stage control
- role ownership and approval boundaries
- Cocos project structure and runtime architecture
- level data models and config-table discipline
- release, rollback, and operations review
- risk escalation and formal review

## Best fit

- serious Cocos Creator 3.8.8 projects
- solo developers wearing many hats
- small teams that want senior-level workflow control
- level-heavy or content-heavy games
- projects that are getting messy during prototype, production, or release

## Recommended starting prompts

1. `Use $cocos-studio-ouguowen. Classify this game by dominant loop and content unit.`
2. `Use $cocos-studio-ouguowen. Define the MVP and explicit non-goals.`
3. `Use $cocos-studio-ouguowen. Create the first project memory record.`
4. `Use $cocos-studio-ouguowen. Build the version roadmap and next milestone proof obligation.`

## Core files

- `SKILL.md`: entrypoint and routing
- `MODULE_INDEX.md`: module map
- `WORKFLOWS.md`: high-frequency execution
- `TEMPLATES.md`: high-frequency artifacts
- `LEVEL_SYSTEM_ARCHITECTURE.md`: core level runtime boundaries

## Installation

Place the folder in your Codex skills directory:

```text
~/.codex/skills/cocos-studio-ouguowen
```

On Windows:

```text
C:\Users\<you>\.codex\skills\cocos-studio-ouguowen
```

Restart Codex after updating the skill so the metadata reloads cleanly.
