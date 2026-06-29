# Security Policy

This repository is an AI workflow Skill for Cocos Creator 3.8.8 projects. Security here includes both conventional repository security and AI-assisted development safety.

## Supported scope

Please report issues that could cause:

- unsafe AI writes to a live Cocos project
- raw text edits to `.scene`, `.prefab`, `.anim`, or `.meta` files
- unauthorized modification of runtime TypeScript or JavaScript
- bypassing pre-write approval
- bypassing generated `.meta` review
- claiming browser preview proof without real browser-visible evidence
- accidental inclusion of credentials, private paths, paid assets, or proprietary game assets
- provider-specific automation behavior that hides dangerous file writes

## Out of scope

The following are not security issues for this repository:

- general Cocos Creator engine bugs
- game design disagreements
- requests to add unsupported game genres
- unsupported Cocos2d-x workflows
- MCP provider feature requests unless they create an unsafe workflow assumption

## How to report

If the issue is public and low risk, open a GitHub issue in:

```text
https://github.com/ouguowen/cocos-studio-ouguowen
```

If the issue includes sensitive information, credentials, private repository details, or a reproducible unsafe write path, do not post the details publicly. Contact the maintainer privately through the GitHub profile or repository contact channel.

## What to include

Please include:

- affected file or command
- expected safe behavior
- observed unsafe behavior
- minimal reproduction prompt or scenario
- whether a live Cocos project could be modified
- whether `.scene`, `.prefab`, `.meta`, runtime code, external assets, or credentials are involved
- suggested mitigation if known

## Safety response goals

High-risk reports should be triaged for:

1. whether AI can write outside the approved scope
2. whether Cocos serialized assets can be corrupted
3. whether browser/runtime proof can be falsely claimed
4. whether an MCP/provider assumption hides unsafe behavior
5. whether documentation encourages users to skip approval gates

## Non-negotiable safety rules

- Do not raw text edit Cocos `.scene`, `.prefab`, `.anim`, or `.meta` files.
- Do not treat local filesystem access as permission.
- Do not write game runtime code without explicit scope.
- Do not bypass `cocos-dev-story-prewrite` for implementation.
- Do not stage unexpected Cocos-generated `.meta` files without review and approval.
- Do not claim playable proof from editor hierarchy alone.

## Dependency and provider security

This Skill is provider-neutral. A Cocos automation provider or MCP can be used as an execution channel, but it must not become an implicit trust boundary.

Provider integrations should:

- disclose file writes
- return proof appropriate to the task
- fail closed when browser proof is unavailable
- not bypass path-scope or write-approval rules
