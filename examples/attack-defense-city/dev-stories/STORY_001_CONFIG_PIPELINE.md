# Story 001 — Config Pipeline Proof

## Agent owner

- Producer: `cocos-producer` — Cocos Producer（制作人 / 项目负责人）
- Architect: `cocos-architect` — Cocos Architect（技术架构师 / 技术总监）
- Developer: `cocos-dev` — Cocos Developer（Cocos 开发工程师）
- QA: `cocos-qa` — Cocos QA（测试 / 验收负责人）

## Player-facing purpose

No direct player-facing feature yet.

This story proves that the example pack has valid source data before Cocos scene work starts.

## Scope

### In scope

- validate level config
- export runtime JSON
- export TypeScript config types
- confirm runtime template validation

### Out of scope

- Cocos scene work
- prefab binding
- final art
- combat feel
- monetization

## Required source truth

- `examples/attack-defense-city/level-config/*.csv`
- `architecture/level-config-schemas.md`
- `scripts/validate-level-config.js`
- `scripts/export-level-config.js`
- `scripts/export-level-types.js`

## Expected commands

```bash
npm run validate:example
npm run export:example
npm run types:example
npm run validate:runtime
npm run check
```

## Acceptance criteria

- `npm run validate:example` passes.
- `npm run export:example` produces runtime config JSON.
- `npm run types:example` produces TypeScript config types.
- `npm run validate:runtime` passes.
- `npm run check` passes.

## QA notes

Suggested QA should verify that generated files are treated as derived runtime artifacts, while CSV remains the authoring source.
