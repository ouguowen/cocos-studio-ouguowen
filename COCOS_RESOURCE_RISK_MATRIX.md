# Cocos Resource Risk Matrix

Use this file to classify blast radius before AI or automation changes are accepted.

| Resource class | Example | Risk | Default decision |
|---|---|---|---|
| Skill documentation | rule docs, command docs, audit docs | low | allow with diff review |
| Skill registry | Agent registry, module index, quality gates | medium | allow with change review |
| Skill scripts | repo maintenance scripts | medium | allow only when explicitly requested |
| Game scenes | `assets/scenes/**` | critical | block |
| Game prefabs | `assets/prefabs/**` | critical | block |
| Game meta files | `assets/**/*.meta` | critical | block |
| Game runtime code | gameplay scripts, system code | critical | block |

## Law

- Higher-risk classes need stronger proof and narrower scope.
- Critical classes are blocked during Skill-doc maintenance tasks.
