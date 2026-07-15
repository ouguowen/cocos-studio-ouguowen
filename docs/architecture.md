# AI Game Studio Architecture

AI Game Studio is a provider-neutral, safety-gated framework for turning a game request into a traceable development plan and simulated execution loop. Cocos Creator 3.8.8 is the current engine target, while Providers, Adapters, Runtime, and Integration remain replaceable boundaries.

The repository currently ships architecture documents, schemas, registries, deterministic prototypes, and mock-only acceptance tests. It does not enable autonomous production execution.

## System Overview

```text
Natural-language request
  -> Capability Loader
  -> Game Planner
  -> Task Graph
  -> Agent Scheduler
  -> Capability Binding
  -> Provider Selection
  -> Agent Executor
  -> Runtime
  -> Integration
  -> Validation
  -> Feedback / Memory / Project Intelligence
  -> Decision Engine
  -> Development Loop
```

Every execution-facing layer defaults to:

```json
{
  "runtime_mode": "mock",
  "execution_enabled": false
}
```

## Skill Architecture

The Skill layer is the policy and operating-system surface used by Codex and other compatible agents.

- `SKILL.md` is the root routing contract.
- `core/` contains context loading, commands, permissions, operation modes, and module routing.
- `architecture/`, `design/`, and `production/` contain reusable production knowledge.
- `protocols/` contains approval, safety, validation, proof, and release gates.
- `templates/` contains reusable workflows, reports, checklists, and prompts.
- `examples/` contains controlled examples, not runtime output or universal templates.

The Skill governs work. It does not execute Cocos, Providers, or external APIs by itself.

## Agent Architecture

Agent definitions are split between production guidance and prototype metadata:

- `agents/registry.md` and related Markdown files describe studio roles and handoff rules.
- `agents/registry.json` indexes prototype Agent records.
- `agents/*.json` declares identity, capabilities, Tool bindings, and disabled execution state.
- `scheduler/agent-registry.js` validates Agent records.
- `scheduler/task-scheduler.js` resolves Task Graph roles and dependency order.
- `scheduler/capability-matcher.js` binds Agent capabilities to Tool metadata.

Agents do not execute themselves. The Executor owns task lifecycle simulation, and Runtime owns execution-mode and permission boundaries.

## Runtime Architecture

The Runtime boundary converts an Executor request into an engine, asset, code, or Git runtime route.

- `executor/` validates bound tasks and selects a mock or disabled real Adapter.
- `runtime/runtime-manager.js` owns `mock` versus `production` mode.
- `runtime/*-runtime.js` maps capabilities to Integration operations.
- Production execution is blocked while `execution_enabled` remains `false`.

The required direction is:

```text
Executor -> Runtime Manager -> Runtime -> Integration Manager -> Integration
```

Integration must not be used as a project-level scheduler or as a bypass around Runtime authorization.

## Provider Architecture

Providers describe who can supply a capability. They do not own task execution or project scheduling.

- `providers/registry.json` indexes Provider definitions.
- `providers/image/` and `providers/engine/` contain replaceable Provider metadata.
- `providers/provider-selector.js` filters and ranks Providers by capability and requirements.
- `feedback/provider-ranking.js` adds historical performance signals.

ComfyUI, GPT Image, Qwen Image, Cocos, and future systems are optional Providers. None is a core dependency, and no Provider is connected to an external service in the current release candidate.

## Adapter Architecture

Adapters normalize Tool or Provider interfaces for the Executor.

- `executor/adapters/base-adapter.js` defines the shared lifecycle contract.
- `executor/adapters/provider-adapter.js` is the provider-neutral asset boundary.
- Cocos, code, and optional Provider-specific adapters remain disabled interface implementations.
- `executor/execution-adapter.js` provides deterministic mock execution for tests.

Adapters do not select project priorities, schedule Agents, or bypass Runtime.

## Integration Architecture

Integration is the outermost boundary to a concrete environment.

- `integration/integration-manager.js` registers Integration interfaces.
- Cocos Integration exposes future project, scene, and build operations.
- Asset Integration accepts a selected image Provider without choosing one as a core dependency.
- Code Integration exposes future create/update operations.
- Git Integration exposes future commit/rollback operations.

All Integrations default to mock mode and disabled production execution. The repository does not call Cocos, Git, MCP, image systems, code services, or external APIs.

## Memory, Feedback, and Loop Architecture

The stateful intelligence layers remain separate from execution:

- `memory/` stores project rules, style, assets, and append-only decisions.
- `feedback/` normalizes execution outcomes and Provider performance history.
- `project-scanner/` reads project structure without modifying it.
- `project-intelligence/` combines state, scan, validation, and memory context.
- `decision-engine/` ranks candidate actions and records the selected next action.
- `validation-agent/` produces `PASS`, `WARNING`, or `FAILED` from explicit rules.
- `loop-engine/` connects decision, task generation, mock execution, validation, and feedback.

The v10.1 Orchestrator validates the complete in-memory path using a temporary project fixture. A failed stage stops the pipeline and cannot synthesize downstream success.

## Capability and Planning Data

- `capabilities/` contains capability and Tool registries.
- `planner/` converts a matched capability and request into a Game Blueprint.
- `task-graph/` converts the Blueprint into an Agent-oriented dependency graph.
- `generated/` is reserved for ignored, reproducible runtime and test output.
- Canonical schemas, registries, policies, and templates remain beside their owning modules and are tracked by Git.

## Validation

Run the same commands used by CI:

```bash
pnpm install --frozen-lockfile
pnpm run validate:docs
pnpm run check
pnpm test
```

`pnpm test` verifies all prototype and end-to-end test paths, removes stale generated JSON before execution, restores canonical Store files byte-for-byte, and cleans successful test output afterward.

## Current Release Boundary

The current architecture proves deterministic orchestration in mock mode. It does not prove real Cocos execution, external Provider behavior, production writes, authentication, rollback, or release automation. Those capabilities must remain blocked until their execution contracts, approval model, and environment-specific tests are complete.

The v10.1 audit evidence is archived at [audits/v10.1-release-candidate-audit.json](audits/v10.1-release-candidate-audit.json).
