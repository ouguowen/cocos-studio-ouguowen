# One-Shot MVP Build Chain

Use this file when the user wants AI to continue from one broad request into a controlled Cocos Creator 3.8.8 MVP workflow.

## Definition

`one-shot` does not mean "build a complete commercial game from one sentence".

In this skill, `one-shot` means:

```text
one user request
-> one controlled chain of commands
-> one narrow MVP target
-> one implementation story at a time
-> proof before completion claims
```

The chain may continue across planning, design, architecture, story creation, implementation, and review, but it must not skip gates.

## Use when

Use this chain when the user says things like:

- "继续执行"
- "直接帮我做"
- "一条命令完成 MVP"
- "按照你的计划继续"
- "不要乱写，逻辑要符合"
- "让 Codex 从想法推进到 Cocos 可执行任务"

## Do not use when

Do not use this chain when:

- the user is only asking for a quick explanation
- the game type is unknown and the user only wants brainstorming
- the request is for a full commercial release in one pass
- the user asks to bypass review, proof, or Cocos runtime validation
- the task requires local Cocos Creator execution but no editor, automation provider, or manual proof path is available

## Chain law

A one-shot chain must obey these rules:

1. It must name the current production stage.
2. It must name the responsible role.
3. It must choose one dominant game type for the current MVP or sprint.
4. It must define explicit non-goals before implementation.
5. It must run readiness checks before real Cocos implementation.
6. It must produce named artifacts, not vague advice.
7. It must stop at the first blocker instead of inventing missing proof.
8. It must never claim real Cocos completion without local proof.

## Default command chain

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-gdd
-> cocos-project-context
-> cocos-numerical-design        # only if values affect gameplay
-> cocos-economy-design          # only if rewards, currencies, shops, ads, gacha, upgrades, or sinks exist
-> cocos-animation-design        # only if feedback, UI motion, VFX, actor state, Tween, Spine, particles, or audio timing exists
-> cocos-game-architecture
-> cocos-production-readiness
-> cocos-create-story
-> cocos-dev-story               # only when the story is dev-ready and execution is authorized
-> cocos-code-review
```

## Shortcut chain for early prototype

Use this only when the goal is to test one mechanic quickly, not to start formal production.

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-quick-prototype
-> cocos-create-story
-> cocos-dev-story
-> cocos-code-review
```

The shortcut must still state:

- prototype goal
- selected game type
- placeholder asset policy
- success criteria
- kill criteria
- proof required

## Required artifact after each phase

| Phase | Required artifact | Pass condition |
|---|---|---|
| Brief | Game Brief | Game identity and first-version promise are clear |
| Classification | Game Classification Report | One dominant type and content unit are selected |
| GDD | Mini GDD or GDD | Core loop, fail state, reward loop, level/content shape are clear |
| Project memory | Project Memory Record | Confirmed facts and assumptions are separated |
| Numerical design | Numerical Design Record | Gameplay values have purpose, legal ranges, and validation rules |
| Economy design | Economy Design Record | Sources, sinks, rewards, and monetization boundaries are explicit |
| Animation design | Animation Presentation Record | Feedback represents gameplay state but does not own gameplay truth |
| Architecture | Cocos Architecture Report | Scene, scripts, config, prefab, resource loading boundaries are clear |
| Readiness | Game Production Readiness Report | Decision is one of READY_FOR_IMPLEMENTATION, DESIGN_NOT_READY, RUNTIME_NOT_READY, SCOPE_TOO_LARGE, BLOCKED |
| Story | Dev-ready Story | Files, data, steps, acceptance, QA notes, proof are clear |
| Implementation | Dev Story Handoff | Changed files, assumptions, tests, proof, blockers are reported |
| Review | Code Review Report | Acceptance decision is explicit |

## Mandatory stop conditions

Stop and report a blocker when any of these are true:

- game type is not selected
- MVP scope needs many systems to explain itself
- balance-sensitive numbers are being guessed without a numerical record
- currencies, upgrades, rewards, shops, ads, stamina, or gacha are being added without an economy record
- animation or presentation is being used as hidden gameplay logic
- architecture depends on one giant manager owning everything
- Cocos Creator 3.8.8 runtime proof is required but missing
- the automation provider cannot create, bind, preview, or report the needed evidence
- no scene hierarchy, component bindings, Console logs, preview result, screenshot, or proof notes are returned for local engine work

## Forbidden one-shot behavior

A one-shot chain must not:

- turn one idea into every possible game type
- add shop, gacha, inventory, social, ads, login, cloud save, achievements, and live ops before the MVP loop works
- write all gameplay inside UI callbacks
- create a universal `LevelManager` that owns config loading, spawning, objectives, rewards, UI, and scene logic
- treat the attack-defense example as the user's only possible game direction
- claim `.scene` or `.prefab` files exist unless they are actually created or verified
- bind the skill to one commercial MCP or one future official Cocos MCP

## User-facing one-shot prompt

```text
Use $cocos-studio-ouguowen.
My engine is Cocos Creator 3.8.8.
Run the one-shot MVP build chain for this game idea, but do not skip gates.
First choose one dominant game type, define a narrow MVP, list non-goals, create the architecture, run production readiness, then create only the first dev-ready story.
If local Cocos execution is required, use the available Cocos automation provider or manual fallback and return proof.
If proof is missing, stop with a blocker report instead of claiming completion.
```

## Output contract

The final response from a one-shot chain must include:

- current stage
- responsible role
- selected game type
- MVP scope
- explicit non-goals
- artifacts produced
- readiness decision
- allowed next command
- forbidden next actions
- proof returned or blocker reason

## Correct mindset

The purpose of one-shot is not speed at any cost.

The purpose is to reduce repeated prompting while preserving production logic.
