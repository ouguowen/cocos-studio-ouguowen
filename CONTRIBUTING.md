# Contributing to AI Game Studio

AI Game Studio welcomes focused contributions to its Skill policies, architecture, schemas, registries, deterministic prototypes, tests, and documentation.

## Project Principles

- Provider-neutral: no external tool or vendor is a core dependency.
- Safety-gated: real writes and external execution require explicit approval.
- Architecture-first: responsibilities and data contracts precede automation.
- Deterministic by default: tests run locally without Cocos, MCP, network access, or external Providers.
- Multi-game-type: examples demonstrate a pattern and never define the whole product.

## Repository Boundaries

Contributions may update:

- Skill routing and policies in `SKILL.md`, `core/`, and `protocols/`
- architecture, production, and design documentation
- canonical schemas, registries, policies, and templates
- mock-only prototype modules and their tests
- validation scripts and CI configuration
- controlled examples and reference templates

Do not include:

- live Cocos projects or private project assets
- raw-edited `.scene`, `.prefab`, `.anim`, or `.meta` files
- credentials, endpoints, tokens, or private Provider configuration
- external API calls in deterministic tests
- enabled production execution or bypasses around Runtime approval
- generated test output committed from `generated/`

## Development Setup

Requirements:

- Node.js 20 or newer
- pnpm 9 or newer; the repository declares its expected pnpm version in `package.json`
- Python 3.11 or newer for documentation validation

Install dependencies:

```bash
pnpm install --frozen-lockfile
```

Run the complete local validation suite:

```bash
pnpm run ci
```

The equivalent individual commands are:

```bash
pnpm run validate:docs
pnpm run check
pnpm test
```

## Architecture Rules

Read [docs/architecture.md](docs/architecture.md) before changing executable prototypes.

- Provider describes capability supply and selection metadata.
- Adapter normalizes Provider or Tool interfaces.
- Runtime owns execution mode, permissions, lifecycle, and blocking.
- Integration is the concrete environment boundary.
- Executor must not call a concrete Provider, external tool, or Integration directly.
- Integration must not bypass Runtime in an executable workflow.
- `runtime_mode` defaults to `mock`.
- `execution_enabled` remains `false` unless a separately reviewed production milestone explicitly changes that boundary.

Changes that cross these responsibilities require an architecture issue or proposal before implementation.

## Testing Rules

Add or update a deterministic test for every prototype behavior change.

- Test files live under `scripts/test-*.js`.
- Register every test in `scripts/run-tests.js`.
- Tests must not require execution order unless the runner explicitly establishes that order.
- Tests must not depend on committed files under `generated/`.
- Temporary project fixtures must use the operating-system temporary directory and be removed safely.
- Failure-path tests must prove that downstream success is not fabricated.
- External calls, Cocos execution, MCP calls, and Provider calls are forbidden in CI.

`pnpm test` validates all registered test paths, removes stale generated JSON before running, restores canonical Store files byte-for-byte, and cleans successful output afterward.

## Generated Files

`generated/` contains reproducible runtime and test output and is ignored by Git.

- Temporary outputs belong in `generated/`.
- Reusable deterministic inputs belong in `tests/fixtures/` when such fixtures are needed.
- Curated, user-facing examples belong in `examples/`.
- Release audit evidence belongs in `docs/audits/`.
- Canonical schemas, registries, retry policies, templates, and baseline stores remain beside their owning modules.

Do not solve a failing test by committing its generated output.

## Documentation

- Keep README claims aligned with executable evidence.
- Distinguish architecture, prototype, mock validation, and real production execution.
- Use relative links for repository documents.
- Update `CHANGELOG.md` for behavior, architecture, safety, CI, or release-impacting changes.
- Keep provider names in optional Provider metadata, not in core architecture claims.

## Pull Requests

Keep pull requests small enough to review as one coherent change. Include:

- problem and scope
- architecture layers affected
- files intentionally changed
- tests and validation commands run
- safety boundaries confirmed
- generated-output impact
- known limitations or follow-up work

Use the repository collaboration templates:

- [Bug report](.github/ISSUE_TEMPLATE/bug_report.yml)
- [Feature request](.github/ISSUE_TEMPLATE/feature_request.yml)
- [Safety report](.github/ISSUE_TEMPLATE/safety_report.yml)
- [Documentation request](.github/ISSUE_TEMPLATE/documentation.yml)
- [Pull request template](.github/pull_request_template.md)

Release-impacting changes must also follow [the release strategy](docs/release/strategy.md) and [release checklist](docs/release/checklist.md).

Before opening a pull request, review:

```bash
git status
git diff --name-only
git diff --stat
```

Do not use broad staging commands when unrelated work is present. Do not commit, push, rollback, or rewrite history on another contributor's behalf without explicit authorization.

## Commit Messages

Use an imperative, scope-focused subject, for example:

```text
Document runtime integration boundaries
Add capability scheduler regression test
Standardize repository validation on pnpm
```

## Security and Safety Reports

Use [SECURITY.md](SECURITY.md) for vulnerabilities, credentials, unsafe execution paths, or sensitive project information. Public workflow and path-scope issues may use the repository safety issue template.
