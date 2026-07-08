# Open Source Roadmap

This roadmap tracks how Cocos Studio Ouguowen can grow from a strong personal Skill into a clearer open-source project.

The project should remain a multi-game-type Cocos Creator 3.8.8 production-control Skill, not a single game template and not a provider-specific MCP plugin.

## Current focus

- Make the repository understandable to new users.
- Preserve strict safety boundaries around Cocos files.
- Provide a repeatable first-MVP path.
- Document success cases without locking the Skill to one genre.
- Make contribution and security expectations explicit.

## Near-term improvements

### Documentation

- Keep README and README.zh-CN aligned.
- Add more quickstart paths by user type: solo dev, small team, contributor, auditor.
- Add a glossary for command decisions such as `READY_FOR_IMPLEMENTATION`, `QA_PASS`, and `FIRST_MVP_ACCEPTED`.
- Add more examples that are documentation-first and scope-safe.

### Workflow

- Expand first-MVP examples beyond story-clear games.
- Add one tower-defense or attack-defense first-MVP success case.
- Add one idle/merge/collection first-MVP success case.
- Add one card or tactical first-MVP success case.
- Keep each example clear about what should not be generalized.

### Validation

- Make `cocos-skill-self-test --pipeline` easier to run manually.
- Add static checks for required command/index/gate links.
- Add link-checking for Markdown references.
- Add examples of PASS/FAIL/BLOCKED reports.

### Cocos integration

- Keep automation provider language provider-neutral.
- Add provider capability checklist examples.
- Avoid binding core Skill behavior to one MCP dialect.
- Continue to require browser preview proof when runtime visibility matters.

## Non-goals

- Do not become a full Cocos manual.
- Do not become a Cocos2d-x guide.
- Do not become a single genre template.
- Do not bundle commercial assets.
- Do not make MCP provider behavior the identity of the Skill.
- Do not encourage agents to write Cocos serialized assets by hand.

## Contribution priorities

High-value contributions:

- clearer gates
- safer command routing
- better examples
- translation fixes
- link consistency
- self-test cases
- proof templates
- provider-neutral validation notes

Lower-priority contributions:

- large theoretical frameworks without examples
- broad genre templates that cannot produce a first MVP
- provider-specific command dialects in core docs
- visual polish unrelated to workflow safety

## Success criteria

The project becomes more open-source ready when a new user can answer:

1. What is this Skill?
2. What is it not?
3. How do I install it?
4. How do I run the first safe MVP flow?
5. Which commands matter first?
6. How does it stop AI from writing unsafe Cocos files?
7. What proof is required before QA and release?
8. How do I contribute safely?
9. How do I report security or safety issues?
