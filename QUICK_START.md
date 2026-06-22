# Quick Start

This guide is for a beginner using `cocos-studio-ouguowen` with Codex and Cocos Creator 3.8.8.

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

## Step 3: Try AI Game Studio mode

Ask Codex:

```text
Use $cocos-studio-ouguowen.
Run cocos-game-brief for the modern city attack-defense example pack.
```

Expected result:

- example pack brief
- MVP proof
- explicit non-goals
- next recommended command

## Step 4: Install Node dependencies

From the repository root:

```bash
npm install
```

## Step 5: Validate the example config

```bash
npm run validate:example
```

## Step 6: Export the example config

```bash
npm run export:example
```

## Step 7: Export TypeScript config types

```bash
npm run types:example
```

## Step 8: Validate runtime templates

```bash
npm run validate:runtime
```

## Step 9: Run the full check

```bash
npm run check
```

## Step 10: Recommended first real workflow

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-gdd
-> cocos-project-context
-> cocos-game-architecture
-> cocos-create-story
-> cocos-dev-story
-> cocos-code-review
```

## Beginner warning

Do not start by asking AI to build the whole game.

Start with:

- one game type or one example pack
- one map
- one player/base point
- one or two enemy types
- one win rule
- one fail rule
- one playable loop
