# Contributing

Thanks for improving Cocos Studio Ouguowen.

This repository is a production-control Skill for Cocos Creator 3.8.8 AI-assisted game development. Contributions should strengthen workflow safety, command clarity, multi-game-type support, and proof discipline.

## Project boundaries

This project is:

- a Codex Skill / AI-assisted workflow system
- Cocos Creator 3.8.8 focused
- multi-game-type
- provider-neutral
- safety-first around Cocos scene, prefab, meta, and runtime code writes

This project is not:

- a single game template
- a Cocos2d-x guide
- a provider-specific MCP plugin
- a place to store full game projects
- a place to import final art, paid assets, audio packs, or external game assets

## Contribution types

Good contributions include:

- clearer command definitions
- safer quality gates
- better first-MVP documentation
- new game-type template guidance
- self-test cases for unsafe agent behavior
- examples that prove workflow control without becoming the only template
- documentation fixes and translation improvements
- collaboration template improvements
- release checklist and release strategy improvements

Avoid contributions that. Do not:

- encourage agents to skip pre-write approval
- raw-edit `.scene`, `.prefab`, `.anim`, or `.meta` files
- treat editor hierarchy as browser runtime proof
- make one example game type the whole Skill
- bind the Skill to one MCP provider
- add broad implementation before design and readiness gates

## Before changing files

Read:

- [SKILL.md](SKILL.md)
- [COMMANDS.md](COMMANDS.md)
- [MODULE_INDEX.md](MODULE_INDEX.md)
- [AI_COMMAND_PERMISSION_RULES.md](AI_COMMAND_PERMISSION_RULES.md)
- [COCOS_PATH_SCOPED_RULES.md](COCOS_PATH_SCOPED_RULES.md)
- [CODEX_WRITE_APPROVAL_PROTOCOL.md](CODEX_WRITE_APPROVAL_PROTOCOL.md)
- [GIT_DIFF_REVIEW_PROTOCOL.md](GIT_DIFF_REVIEW_PROTOCOL.md)
- [SKILL_CHANGE_REVIEW_PROTOCOL.md](SKILL_CHANGE_REVIEW_PROTOCOL.md)
- [docs/release-strategy.md](docs/release-strategy.md)
- [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md)

## Issue and pull request templates

Use the GitHub templates for public collaboration:

- [bug_report.yml](.github/ISSUE_TEMPLATE/bug_report.yml) for Skill defects.
- [feature_request.yml](.github/ISSUE_TEMPLATE/feature_request.yml) for new commands, gates, docs, validation, or release process proposals.
- [safety_report.yml](.github/ISSUE_TEMPLATE/safety_report.yml) for public AI safety and Cocos path-scope issues.
- [documentation.yml](.github/ISSUE_TEMPLATE/documentation.yml) for missing or unclear docs.
- [pull_request_template.md](.github/pull_request_template.md) for required PR scope, safety, validation, and release-impact checks.

Private vulnerabilities or sensitive safety reports should follow [SECURITY.md](SECURITY.md), not a public issue.

## Safety rules for contributors

1. Do not modify a live Cocos game project as part of a Skill documentation PR.
2. Do not include Cocos `.scene`, `.prefab`, `.anim`, or `.meta` edits unless the change explicitly belongs to an example asset policy and has been approved.
3. Do not add game runtime TypeScript or JavaScript to this Skill unless it is clearly marked as an example template or reference stub.
4. Do not add final art, paid assets, audio, fonts, Spine, VFX, or third-party game assets.
5. Do not remove safety gates to make workflows shorter.
6. Do not present `FIRST_MVP_ACCEPTED` as full-game completion.

## Documentation style

- Prefer short, explicit rules over motivational prose.
- Use stable command names in backticks.
- Keep provider language capability-based: open project, inspect hierarchy, save scene, run browser preview.
- Avoid vendor-specific MCP dialect unless the file is explicitly about that provider.
- When adding a new workflow, state what is in scope, what is out of scope, proof required, and next command.

## Adding commands or gates

When adding or changing a command:

1. Update [COMMANDS.md](COMMANDS.md).
2. Update [SKILL.md](SKILL.md) routing if the command is a common route.
3. Update [MODULE_INDEX.md](MODULE_INDEX.md) if a new file is introduced.
4. Update [QUALITY_GATES.md](QUALITY_GATES.md) if the command advances a gate.
5. Update [SKILL_TEST_CASES.md](SKILL_TEST_CASES.md) if the command changes behavior.
6. Update [CHANGELOG.md](CHANGELOG.md).

## Adding examples

Examples must say:

- what pipeline behavior they prove
- what game type they represent
- what should not be generalized
- whether they include runtime code or are documentation-only
- what proof would be required before claiming they run in Cocos

Moonlight Delivery is a success case, not the only supported game type.

## Review checklist

Before submitting:

```bash
git status
git diff --name-only
git diff --stat
```

Confirm:

- changed files are inside this repository
- changed files are Markdown/docs unless explicitly approved
- no live game project files changed
- no Cocos `.scene`, `.prefab`, `.meta`, runtime code, or external assets were added accidentally
- relevant README / MODULE_INDEX / CHANGELOG links are updated
- I ran `python scripts/validate_skill_docs.py` locally.
- The GitHub Actions Skill Docs Validation check passes.
- I did not introduce dangerous commands as positive instructions.

For release-impacting changes, also confirm:

- [docs/release-strategy.md](docs/release-strategy.md) still matches the release gate.
- [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) covers any new release requirement.
- [CHANGELOG.md](CHANGELOG.md) describes the change.

## Commit messages

Use direct, scope-focused messages, for example:

```text
Document first MVP success pipeline
Add open source contribution guide
Clarify generated meta approval policy
```

## Reporting security or safety issues

Use [SECURITY.md](SECURITY.md) for security and safety-sensitive reports.
