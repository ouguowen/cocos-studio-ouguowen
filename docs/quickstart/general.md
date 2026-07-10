# Quick Start

This guide is for a beginner using `cocos-studio-ouguowen` with Codex, Cocos Creator 3.8.8, and an optional Cocos automation tool/MCP provider.

## Step 1: Put the skill in the Codex skills folder

Windows path:

```text
C:\Users\<your-user-name>\.codex\skills\cocos-studio-ouguowen
```

macOS/Linux path:

```text
~/.codex/skills/cocos-studio-ouguowen
```

Restart Codex after copying or updating the skill.

## Step 2: Test the skill is loaded

Ask Codex:

```text
Use $cocos-studio-ouguowen. Classify this game by dominant loop and content unit.
```

Expected result:

- Codex should mention game classification
- Codex should ask or infer dominant loop
- Codex should not jump directly into random code
- Codex should not open Cocos Creator, call Cocos/MCP, inspect a real Cocos project, or run browser preview by default

## Step 3: Confirm the multi-game-type stance

Ask Codex:

```text
Use $cocos-studio-ouguowen.
Explain the difference between the reusable multi-game-type Skill and the currently selected game type.
```

Expected result:

- Codex should say the Skill is not a single-game template
- Codex should say one selected game type is used per MVP or sprint
- Codex should not treat the modern city attack-defense example pack as the only game direction

## Step 4: Try AI Game Studio mode with the current Cocos automation provider

Ask Codex:

```text
Use $cocos-studio-ouguowen.
Run cocos-game-brief for a selected Cocos Creator 3.8.8 game type.
Current validation sample: modern city attack-defense MVP.
Execution channel: when local Cocos Creator work is required, use the currently available Cocos Creator 3.8.8 automation tool or MCP provider.
Do not bind the plan to one commercial MCP provider or one future official MCP provider.
Return provider proof only when local engine work is performed: scene hierarchy, component bindings, Console logs, preview result, screenshot, or PASS / FAIL notes.
```

Expected result:

- selected game type and MVP scope
- reusable Skill scope separated from current example scope
- automation provider treated as an execution channel
- explicit non-goals
- next recommended command
- next recommended command treated as optional advice only, not automatic approval

Default boundary:

- Normal Skill discussion is planning, review, or documentation unless you explicitly ask for real project work.
- Real Cocos project work requires your explicit request, the approved active project path, and an approved write scope.
- Runtime proof and proof-chain work are validation sandbox work, not default product development.

## Step 5: Install Node dependencies

From the repository root:

```bash
npm install
```

## Step 6: Validate the example config

```bash
npm run validate:example
```

## Step 7: Export the example config

```bash
npm run export:example
```

## Step 8: Export TypeScript config types

```bash
npm run types:example
```

## Step 9: Validate runtime templates

```bash
npm run validate:runtime
```

## Step 10: Run the full check

```bash
npm run check
```

## Step 11: Recommended first real workflow

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-gdd
-> cocos-project-context
-> cocos-game-architecture
-> cocos-create-story
-> cocos-dev-story-prewrite
-> explicit user approval
-> cocos-dev-story
-> cocos-code-review
```

## Step 12: Provider-driven proof workflow

Use this only after a selected game type and MVP scope exist.

```text
cocos-game-architecture
-> cocos-create-story
-> cocos-dev-story-prewrite
-> explicit user approval
-> cocos-dev-story using current Cocos automation provider when authorized
-> provider returns hierarchy / bindings / Console / preview proof
-> cocos-code-review
```

If the provider is unavailable, unsupported, or fails, Codex should stop with a blocker report or fall back to manual Cocos Creator steps.

## Beginner warning

Do not start by asking AI to build the whole game.

Start with:

- one selected game type or one example pack
- one map
- one player/base point
- one or two enemy types
- one win rule
- one fail rule
- one playable loop

Do not add unrelated engines, Cocos2d-x, provider-specific MCP protocols, or every game type at once.
