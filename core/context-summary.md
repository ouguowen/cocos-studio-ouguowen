# Skill Context Summary

## Purpose

This is the lightweight first-read memory for `cocos-studio-ouguowen`.

Read this before loading detailed protocol files.

The goal is to preserve the Skill's production safety while avoiding unnecessary context overload during normal game development.

## What this Skill is

`cocos-studio-ouguowen` is a Cocos Creator 3.8.8 production-control Skill for AI-assisted game development.

It helps Codex or other AI agents plan, scope, implement, validate, QA, release, and safely evolve small Cocos game projects.

It is not a single game template, not a Cocos2d-x guide, and not a hard dependency on one MCP provider.

## Current operating priority

Default priority:

1. Keep development fast and result-focused.
2. Preserve safety boundaries.
3. Load only the smallest useful context.
4. Validate at meaningful milestones.
5. Avoid repeated user interruption.

## Operation modes

Use `core/operation-modes.md` for details.

- Fast Build Mode: normal implementation, small feature, bug fix, approved dev story.
- Safe Gate Mode: stage transition, pre-write approval, QA, release, preview proof.
- Audit Mode: Skill self-test, repo audit, release governance, security review.

Normal game development should default to Fast Build Mode.

Audit Mode must not be the default for normal implementation.

## Context loading rule

Use `core/context-loading-policy.md` for details.

Default loading should be:

1. `core/context-summary.md`
2. `core/operation-modes.md`
3. the relevant command section from `core/commands.md`
4. only the directly triggered protocol files

Do not load the whole repository unless the task is an Audit Mode task.

## Map work summary

Map work should route through universal map model selection first.

Maps are not only background art.

Map model must be selected by game type and gameplay space.

Use `architecture/map-model-router.md` before concrete map design, then load `architecture/map-space-model.md`, `architecture/minimap-navigation-model.md`, `architecture/level-data-models.md`, `architecture/level-config-schemas.md`, or `architecture/level-system.md` only when needed.

## Evolution summary

Skill evolution is controlled and evidence-driven.

Do not upgrade Skill just because a new rule is theoretically possible.

Use `core/evolution-system.md` before broad Skill upgrades.

## Fast Build behavior

In Fast Build Mode:

- do not ask for confirmation after every small step
- do not generate long reports after every micro-action
- do not stop after ordinary internal checks pass
- continue automatically while inside approved scope
- summarize validation once at the end unless blocked
- use compact successful reports by default

Stop only when a stop condition appears.

## Compact output summary

Compact output is a presentation optimization only.

It must not remove, weaken, rename, bypass, or make optional any safety gate, protocol, command, proof requirement, or stop condition.

Normal successful Fast Build output should be short:

- result
- changed files
- proof / validation
- diff / git status
- commit hash if relevant
- next command

Compact pre-write must still include project, files to change, forbidden files, Cocos/meta allowance, runtime/browser proof, rollback, expected diff, and `PRE_WRITE_APPROVAL_REQUIRED` or `PRE_WRITE_BLOCKED`.

Compact QA must still include `QA_PASS`, `QA_FAIL`, or `QA_BLOCKED`, scope result, forbidden files result, runtime proof result, git status result, and notes.

## Stop conditions

Stop and ask for approval when:

- approved scope is unclear
- unapproved scene, prefab, `.meta`, or runtime code appears
- external asset import appears
- package/project/settings/tsconfig changes appear
- combat/economy/inventory/shop/gacha/save-load/second chapter appears without approval
- preview proof fails and cannot be repaired inside scope
- git diff contains unexpected files
- dangerous Git command would be needed
- scope expansion is detected

## Normal command path

For a real first MVP:

1. `cocos-game-brief`
2. `cocos-classify-game`
3. `cocos-gdd`
4. `cocos-numerical-design`
5. `cocos-economy-design`
6. `cocos-animation-design`
7. `cocos-asset-policy`
8. `cocos-game-architecture`
9. `cocos-first-implementation-story`
10. `cocos-production-readiness`
11. `cocos-dev-story-prewrite`
12. user approves scope
13. `cocos-dev-story` in Fast Build Mode
14. `cocos-qa-review`
15. `cocos-release-review`

Do not repeat every gate during implementation after the scope is approved.

## Key safety rules

- UI does not own gameplay truth.
- Animation does not own gameplay result.
- Skeleton only presents animation.
- Assets do not create behavior.
- Runtime controller/domain logic owns final state.
- Generated `.meta` must stay inside approved diff scope.
- Browser preview proof is required when runtime visibility matters.
- Compact output must never skip pre-write approval, approved diff scope, generated meta review, required browser proof, no-fake-proof rules, unexpected-file stops, `git add .` bans, or force-push bans.

## Context anti-patterns

Avoid:

- loading all gates for every small task
- loading all workflows for every answer
- loading all Agent files unless multi-Agent work is requested
- using Audit Mode for normal game implementation
- repeating full Skill philosophy during Fast Build Mode
- treating every validation check as a user-facing checkpoint
- using compact output to hide missing proof, unexpected files, dirty diffs, or missing approval

## Success definition

The Skill meets its standard when it can:

- move quickly in normal development
- stop reliably on real risk
- use concise final reports
- preserve proof and diff discipline
- avoid context overload
- remain understandable to a beginner developer
