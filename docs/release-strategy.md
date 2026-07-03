# Release Strategy

Cocos Studio Ouguowen releases are documentation-first Skill releases. A release must improve workflow clarity, safety boundaries, validation coverage, or proven first-MVP production discipline without turning the Skill into a single game template.

## Release Goals

- Keep the Skill usable by new contributors.
- Preserve Cocos Creator 3.8.8 scope and provider-neutral automation language.
- Preserve Cocos `.scene`, `.prefab`, `.anim`, `.meta` safety boundaries.
- Prevent regressions in pre-write approval, generated `.meta` review, browser proof, and release gates.
- Keep README, README.zh-CN, CONTRIBUTING, MODULE_INDEX, automation validation, and CHANGELOG aligned.
- Ship only changes that pass local Skill docs validation.

## Version Lanes

- Patch: documentation corrections, link fixes, wording improvements, issue/PR template changes, and validation coverage for existing rules.
- Minor: new commands, gates, workflow documents, release process changes, or example documentation that expands supported production paths.
- Major: breaking changes to command vocabulary, gate semantics, repository structure, or contributor safety policy.

Pre-1.0 releases may use alpha tags, but the release note must still describe safety impact and migration expectations.

## Required Gates

Before a release candidate is accepted:

1. Scope must be limited to the Skill repository.
2. `python scripts/validate_skill_docs.py` must pass locally.
3. `git diff --name-only` must be reviewed for forbidden paths.
4. `RELEASE_CHECKLIST.md` must be completed or explicitly marked not applicable for the release.
5. `CHANGELOG.md` must describe added, changed, fixed, or safety-impacting work.
6. New public collaboration surfaces must be linked from README, CONTRIBUTING, MODULE_INDEX, and automation validation docs when relevant.

## Blockers

A release is blocked if it:

- modifies a live Cocos game project without explicit scope approval
- adds or raw-edits `.scene`, `.prefab`, `.anim`, or `.meta` files
- adds a new game-type example when the release scope does not approve it
- removes pre-write approval, generated `.meta` review, browser proof, or first-MVP acceptance safeguards
- makes one Cocos automation provider or MCP dialect part of the core Skill identity
- fails local Skill docs validation

## Release Notes

Release notes should include:

- version or release candidate name
- user-facing changes
- safety and validation changes
- migration notes, if command names or gate semantics changed
- local validation command and PASS result
- known limitations

## Post-Release Review

After release:

- Confirm GitHub Actions validation passes on the pushed branch.
- Confirm issue templates and PR template render on GitHub.
- Confirm README and README.zh-CN still point contributors to the correct safe entry points.
- File follow-up issues for known gaps instead of expanding release scope late.
