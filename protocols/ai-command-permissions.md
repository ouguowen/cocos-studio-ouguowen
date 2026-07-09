# AI Command Permission Rules

Use this file to control which AI-issued commands are allowed, blocked, or escalation-only.

## Permission law

- Every command must state target repo, target path, intended artifact, and proof required.
- AI may modify this Skill repository documentation by default.
- AI may not modify a live Cocos game project unless the user explicitly scopes that project and the current command allows it.
- AI may not treat "local access exists" as permission to edit everything reachable on disk.
- If the request mixes Skill-repo work and game-project work, stop and split the scopes first.

## Allowed by default

- Markdown documentation in this Skill repository
- internal audit reports
- self-test records
- command, gate, and workflow rule updates
- Agent registry and handoff protocol updates

## Escalation required

- repository-wide renames
- deleting tracked files
- changing automation-provider assumptions
- changing approval or gate semantics that affect other modules

## Blocked by default

- `D:\CocosProjects\AI_Game_Studio_FirstGame`
- `assets/scenes/**`
- `assets/prefabs/**`
- `assets/**/*.meta`
- runtime TypeScript or JavaScript in any actual game project
- gameplay logic, economy logic, balance data, or scene content in any actual game project

## Required proof

- `git status`
- `git diff --name-only`
- `git diff --stat`
- explicit confirmation that changed paths remain inside this Skill repository
