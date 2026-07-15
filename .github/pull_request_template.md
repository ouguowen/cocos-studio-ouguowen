# Pull Request

## Summary

- 

## Scope

- [ ] Skill documentation
- [ ] Architecture or production documentation
- [ ] Schema, registry, policy, or template
- [ ] Mock-only prototype or test
- [ ] Validation script
- [ ] GitHub workflow or template
- [ ] Controlled example
- [ ] Other repository file

## Safety boundaries

- [ ] I did not modify a live Cocos game project.
- [ ] I did not add or raw-edit `.scene`, `.prefab`, `.anim`, or `.meta` files.
- [ ] I did not add game runtime code outside approved Skill reference/template scope.
- [ ] I did not bypass pre-write approval, generated `.meta` review, browser proof, or release gates.
- [ ] I kept provider language capability-based and provider-neutral.
- [ ] I did not enable production Runtime, Integration, Agent, Adapter, or Provider execution.
- [ ] I did not commit reproducible files from `generated/`.

## Required validation

- [ ] `python scripts/validate_skill_docs.py` passes locally.
- [ ] `pnpm run check` passes locally.
- [ ] `pnpm test` passes locally.
- [ ] `pnpm run ci` passes locally.
- [ ] `git diff --name-only` contains only approved Skill repository paths.
- [ ] README / README.zh-CN / CONTRIBUTING / MODULE_INDEX / CHANGELOG links are updated when relevant.

## Release impact

- [ ] No release-note impact
- [ ] Changelog updated
- [ ] Release checklist updated or referenced

## Notes for reviewers

- 
