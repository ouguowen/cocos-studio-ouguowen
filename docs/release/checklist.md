# Release Checklist

Use this checklist before tagging or announcing a Cocos Studio Ouguowen Skill release.

## Scope

- [ ] Release scope is limited to the Skill repository.
- [ ] No live Cocos game project files are modified.
- [ ] No `.scene`, `.prefab`, `.anim`, or `.meta` files are added or raw-edited.
- [ ] No unapproved game-type example is added.
- [ ] Provider language remains capability-based and provider-neutral.

## Documentation

- [ ] README.md reflects new public entry points or release behavior.
- [ ] README.zh-CN.md reflects matching contributor-facing guidance.
- [ ] CONTRIBUTING.md explains required review and validation for the change type.
- [ ] core/module-index.md links new release, collaboration, or validation docs.
- [ ] CHANGELOG.md has an Unreleased entry for the release contents.
- [ ] docs/validation/automation.md explains validator coverage for new required files.
- [ ] strategy.md reflects current release gates.

## Collaboration Templates

- [ ] Bug report issue template is present.
- [ ] Feature request issue template is present.
- [ ] Safety report issue template is present.
- [ ] Documentation issue template is present.
- [ ] Issue template config is present.
- [ ] Pull request template is present.

## Validation

- [ ] `python scripts/validate_skill_docs.py` passes locally.
- [ ] `git status` has no unrelated changes.
- [ ] `git diff --name-only` contains only approved Skill repository paths.
- [ ] `git diff --stat` has been reviewed.

## Release Decision

- [ ] Release notes describe user-facing changes.
- [ ] Safety-impacting changes are explicitly called out.
- [ ] Known limitations are documented.
- [ ] Release is approved to tag or push.
