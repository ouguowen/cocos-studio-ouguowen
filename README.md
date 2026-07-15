# AI Game Studio

Provider-neutral game planning, orchestration, validation, and production-control architecture for AI-assisted development.

AI Game Studio evolved from **Cocos Studio Ouguowen**, a Codex Skill for safe Cocos Creator 3.8.8 production workflows, into a broader AI game development framework. It keeps the original safety model while expanding toward game intelligence, production orchestration, code generation, validation, and release management.

The repository combines a production-control Skill with executable, mock-only architecture prototypes. Cocos Creator 3.8.8 is the current engine target, not a hard dependency or the identity of the core architecture.

## Project Overview

AI Game Studio is a game development framework for the AI era.

Its goal is to help developers use AI to manage the full game production lifecycle:

- Game design
- Gameplay planning
- Code development
- Asset management
- Testing and validation
- Release workflow

The project is architecture-first and safety-first. It includes schemas, registries, deterministic prototypes, validation tools, and an end-to-end acceptance path while keeping real execution disabled.

AI Game Studio is not a complete game, not a single game template, not a Cocos manual, and not an autonomous game company. Human approval remains required before real project modification, MCP execution, runtime automation, or release actions.

Current prototype flow:

```text
Natural-language request
  -> Capability Loader
  -> Game Planner
  -> Task Graph
  -> Agent Scheduler
  -> Capability Binding
  -> Provider Selection
  -> Mock Executor
  -> Runtime
  -> Integration
  -> Validation / Feedback / Memory
  -> Project Intelligence / Decision
  -> Development Loop
```

See [docs/architecture.md](docs/architecture.md) for module ownership and dependency boundaries.

## Core Capabilities

### Game Intelligence

Game Intelligence turns player intent, genre expectations, gameplay rules, and design constraints into a scoped production plan.

Reference:

- [v3.7 Game Design Intelligence Engine](docs/open-source/v3.7-game-design-intelligence-engine.md)

### Production Pipeline

Production Pipeline coordinates the lifecycle from idea to release, including stage inputs, outputs, Agent responsibilities, Quality Gates, and Project Memory records.

Reference:

- [v3.8 Game Production Pipeline Orchestrator](docs/open-source/v3.8-game-production-pipeline-orchestrator.md)

### Code Generation

Code Generation defines how approved development tasks are converted into Codex-ready implementation work with dependencies, target files, validation requirements, and feedback loops.

Reference:

- [v3.0 Code Generation Orchestration](docs/open-source/v3.0-code-generation-orchestration.md)

### Code Review

Code Review defines how generated code is checked for quality, Cocos Creator 3.8.8 usage, performance risks, architecture boundaries, and gameplay consistency.

Reference:

- [v3.1 Code Review Agent Architecture](docs/open-source/v3.1-code-review-agent-architecture.md)

### Asset Pipeline

Asset Pipeline defines the workflow from gameplay requirements to production-ready assets, including naming, consistency, Cocos import rules, validation, and future AI asset generation integration.

Reference:

- [v2.9 Asset Pipeline Engine](docs/open-source/v2.9-asset-pipeline-engine.md)

### Runtime Validation

Runtime Validation defines how AI Game Studio can verify scene loading, gameplay flow, UI visibility, performance signals, and error logs after approved implementation.

Reference:

- [v3.9 Runtime Validation & Playtest System](docs/open-source/v3.9-runtime-validation-playtest-system.md)

### Release Automation

Release Automation defines build target planning, version management, release checklists, store material preparation, and human approval flow.

Reference:

- [v4.0 Release Automation System](docs/open-source/v4.0-release-automation-system.md)

### Integration Boundary

Integration defines how AI Game Studio may eventually connect to Cocos Creator, asset Providers, code systems, and Git after Runtime permission checks and human approval. MCP is one possible transport, not a core dependency.

References:

- [v2.1 Cocos MCP Adapter Architecture](docs/open-source/v2.1-cocos-mcp-adapter-architecture.md)
- [v2.2 MCP Adapter Prototype Design](docs/open-source/v2.2-mcp-adapter-prototype-design.md)
- [v2.5 Cocos MCP Capability Mapping](docs/open-source/v2.5-cocos-mcp-capability-mapping.md)

## Architecture

AI Game Studio separates planning, Agent coordination, capability supply, execution lifecycle, external integration, and project intelligence.

```text
AI Game Studio Skill
  -> Capability / Planner / Task Graph
  -> Agent Registry / Scheduler
  -> Capability Binding / Provider Selection
  -> Adapter / Executor
  -> Runtime
  -> Integration
  -> External environment (disabled)

Validation / Feedback / Memory
  -> Project Intelligence
  -> Decision Engine
  -> Development Loop
```

Layer summary:

- Skill: policies, commands, context routing, production rules, and safety gates.
- Agent: identity, capability, task ownership, dependency order, and handoff metadata.
- Provider: describes who can supply a capability; it does not own execution lifecycle.
- Adapter: normalizes Tool and Provider interfaces; it does not schedule projects.
- Runtime: owns mode, permission gates, execution lifecycle, and safety blocking.
- Integration: represents concrete external environments and remains disabled by default.
- Intelligence loop: combines validation, feedback, memory, project state, and decisions.

For the current architecture, see [docs/architecture.md](docs/architecture.md). Historical design evolution remains under [docs/open-source/](docs/open-source/).

## MCP Position

AI Game Studio is not MCP.

AI Game Studio is the intelligent workflow layer:

- It plans work.
- It selects capabilities.
- It checks permissions.
- It requires human approval.
- It validates results.
- It records approved project knowledge.

Cocos MCP can be an engine-control transport:

- It exposes tools.
- It performs approved operations.
- It returns execution results.
- It reports errors and logs.

When explicitly enabled in a future production environment, the relationship is:

```text
AI Game Studio
  -> Runtime permission check
  -> Integration
  -> optional MCP transport
  -> Cocos Creator
```

MCP availability must never bypass pre-write approval, project path approval, rollback discipline, or runtime proof honesty.

## Codex Position

Codex is the code generation and reasoning executor inside AI Game Studio workflows.

Codex can help with:

- Code implementation
- Refactoring
- Documentation updates
- Validation checks
- Diff review
- Commit preparation when explicitly requested

Codex must not:

- Modify real project files without approved scope.
- Use Cocos/MCP by default.
- Treat a recommended next command as approval.
- Claim runtime success without proof.
- Continue into autonomous game development.

## Features Matrix

| Feature | Status |
|---|---|
| Capability, Planner, and Task Graph | Prototype validated |
| Agent Registry and Scheduler | Prototype validated |
| Provider and Adapter abstraction | Prototype validated, execution disabled |
| Runtime and Integration | Mock validated, production disabled |
| Memory, Feedback, and Project Intelligence | Prototype validated |
| Decision, Validation, and Loop | Prototype validated |
| End-to-end orchestration | Tower-defense mock acceptance passed |
| Real Cocos, Provider, or external execution | Not enabled |

## Documentation

Start with:

- [Current Architecture](docs/architecture.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [AI Game Studio Architecture](docs/open-source/v4.1-ai-game-studio-architecture.md)
- [Architecture Convergence Report](docs/open-source/v1.0-architecture-convergence-report.md)
- [Cocos MCP Adapter Architecture](docs/open-source/v2.1-cocos-mcp-adapter-architecture.md)
- [Cocos MCP Capability Mapping](docs/open-source/v2.5-cocos-mcp-capability-mapping.md)
- [Agent Registry Architecture](docs/open-source/v3.4-agent-registry-architecture.md)
- [Multi-Agent Collaboration Protocol](docs/open-source/v3.3-multi-agent-collaboration-protocol.md)
- [Game Production Workflow](docs/open-source/v3.0.5-game-production-workflow.md)
- [Game Production Pipeline Orchestrator](docs/open-source/v3.8-game-production-pipeline-orchestrator.md)
- [Runtime Validation & Playtest System](docs/open-source/v3.9-runtime-validation-playtest-system.md)
- [Release Automation System](docs/open-source/v4.0-release-automation-system.md)

Documentation groups:

- Architecture: [docs/open-source/](docs/open-source/)
- MCP: v2.x MCP architecture documents in [docs/open-source/](docs/open-source/)
- Agent: v1.x and v3.x Agent architecture documents in [docs/open-source/](docs/open-source/)
- Production: v3.x production workflow documents in [docs/open-source/](docs/open-source/)

## Roadmap

### Completed

- v2.x MCP Integration architecture
- v3.x AI Production Architecture
- v4.x AI Game Studio architecture
- v6.x Capability, Planner, Task Graph, Agent, Provider, Feedback, and Memory prototypes
- v7.x Project Intelligence, Decision, Scanner, and Validation prototypes
- v8 Autonomous Development Loop prototype
- v9 Runtime and v10 Integration interfaces
- v10.1 mock end-to-end acceptance and architecture audit

### Future

- Provider-to-Runtime execution contract hardening
- Authenticated Runtime approval boundary
- Real environment validation after explicit approval
- Community Extensions

Future implementation must stay behind explicit approval gates. Runtime code, Agent implementations, MCP execution, and real Cocos project automation are not enabled by this README.

## Quick Start

Use this prompt in Codex:

```text
Use $cocos-studio-ouguowen.
Run cocos-game-brief for my game idea, then recommend the next command.
```

The Skill should start with a brief and recommend the next controlled command. It should not jump directly into Cocos scene or script writing.

Treat every `next recommended command` as optional advice only. Run the next command only when you explicitly ask for it.

## Developer Experience / Operation Modes

AI Game Studio keeps the original Skill operation modes:

- Fast Build Mode: focused implementation or documentation work inside approved scope.
- Safe Gate Mode: pre-write approval, stage transition, QA, release, and proof boundaries.
- Audit Mode: Skill validation, repository review, release governance, and safety checks.

Normal Skill discussion does not use Cocos/MCP, inspect real Cocos project files, or run browser preview by default. Fast Build Mode stays lightweight, Safe Gate Mode protects stage boundaries, and Audit Mode is reserved for review work.

## First MVP Path

For the original Cocos Skill first-MVP workflow, see [production/first-mvp-success-pipeline.md](production/first-mvp-success-pipeline.md).

Canonical controlled path:

```text
cocos-game-brief
-> cocos-classify-game
-> cocos-gdd
-> cocos-numerical-design
-> cocos-economy-design
-> cocos-animation-design
-> cocos-asset-policy
-> cocos-game-architecture
-> cocos-first-implementation-story
-> cocos-production-readiness
-> cocos-dev-story-prewrite
-> explicit user approval
-> cocos-dev-story
-> Preview Visibility Gate
-> cocos-qa-review
-> cocos-release-review
-> FIRST_MVP_ACCEPTED
```

`FIRST_MVP_ACCEPTED` means the current MVP slice is accepted. It does not mean the full game is complete, and it does not authorize automatic scope expansion.

## Safety Model

AI Game Studio preserves the original Cocos Studio Skill safety model:

- Normal Skill discussion does not open Cocos Creator, call Cocos/MCP, inspect real Cocos project files, or run browser preview by default.
- Real Cocos project work requires an explicit user request, approved active project path, and approved write scope.
- Runtime proof and proof-chain work are validation sandbox work, not default product development.
- Pre-write approval is required before scene, prefab, meta, runtime, or project file changes.
- Human approval remains required before high-impact changes.
- Safety completeness wins over compact output.

Key safety protocols:

- [protocols/write-approval.md](protocols/write-approval.md): write approval before file changes.
- [protocols/cocos-dev-story-prewrite.md](protocols/cocos-dev-story-prewrite.md): mandatory pre-write checklist before `cocos-dev-story`.
- [protocols/cocos-generated-meta.md](protocols/cocos-generated-meta.md): stop-and-confirm policy for Cocos-generated `.meta` files.
- [protocols/runtime-proof.md](protocols/runtime-proof.md): browser preview and runtime claim proof rules.
- [protocols/git-diff-review.md](protocols/git-diff-review.md): diff review before commit.

## Validation Case

Moonlight Delivery is a historical validation case for the original Skill pipeline:

- [docs/success-cases/moonlight-delivery.md](docs/success-cases/moonlight-delivery.md)
- [examples/moonlight-delivery/README.md](examples/moonlight-delivery/README.md)

This case proves workflow control, not the only supported game genre.

## Collaboration and Release

Open-source collaboration uses GitHub issue templates and pull request review:

- Bug reports: [.github/ISSUE_TEMPLATE/bug_report.yml](.github/ISSUE_TEMPLATE/bug_report.yml)
- Feature requests: [.github/ISSUE_TEMPLATE/feature_request.yml](.github/ISSUE_TEMPLATE/feature_request.yml)
- Safety reports: [.github/ISSUE_TEMPLATE/safety_report.yml](.github/ISSUE_TEMPLATE/safety_report.yml)
- Documentation requests: [.github/ISSUE_TEMPLATE/documentation.yml](.github/ISSUE_TEMPLATE/documentation.yml)
- Pull requests: [.github/pull_request_template.md](.github/pull_request_template.md)

Release planning uses [docs/release/strategy.md](docs/release/strategy.md) and [docs/release/checklist.md](docs/release/checklist.md). A release must preserve the safety model around Cocos `.scene`, `.prefab`, `.anim`, `.meta`, browser proof, and pre-write approval.

## Automation Validation

This repository validates required documentation, command routing, Markdown links, and safety rules with:

```text
python scripts/validate_skill_docs.py
pnpm run check
pnpm test
```

## Installation

Place this repository in your Codex skills directory:

```text
~/.codex/skills/cocos-studio-ouguowen
```

On Windows:

```text
C:\Users\<you>\.codex\skills\cocos-studio-ouguowen
```

Restart Codex after installing or updating the Skill so metadata reloads cleanly.

## Contributing

Contributions are welcome when they preserve the project's safety model.

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Do not submit changes that encourage agents to bypass pre-write approval, raw-edit Cocos `.scene` / `.prefab` / `.meta` files, treat browser proof as optional for playable runtime claims, or turn architecture documents into hidden runtime automation.

## License

See [LICENSE](LICENSE).
