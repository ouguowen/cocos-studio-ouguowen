# Asset Policy

Use this file when a request touches placeholders, imported art, audio, fonts, prefabs, third-party assets, generated assets, or asset ownership.

## Purpose

Asset decisions must support the current game stage without smuggling gameplay scope, legal risk, or production ownership gaps into the project.

This policy keeps assets separate from behavior, economy, level truth, and runtime ownership.

## Core rules

- Assets do not create behavior.
- Assets must not own gameplay truth.
- Assets must not introduce gameplay systems, economy systems, monetization systems, or progression rules.
- Placeholder assets are allowed for MVP proof when they are clearly labeled as placeholders.
- External assets require source, license, owner, approver, and import scope before production use.
- Generated assets require the same ownership, approval, and scope rules as imported assets.
- Cocos `.scene`, `.prefab`, `.anim`, and `.meta` files must not be raw text edited.
- Cocos-generated `.meta` files must follow [protocols/cocos-generated-meta.md](protocols/cocos-generated-meta.md).

## MVP placeholder policy

For Fast Build Mode and first-MVP work, prefer placeholders when the project only needs runtime proof.

Placeholder assets must state:

1. purpose
2. temporary status
3. replacement owner
4. acceptance limit
5. removal or replacement trigger

Do not block an MVP only because final art is missing when placeholders can prove the loop safely.

Do block production acceptance when placeholder assets hide missing gameplay truth, unreadable UI, unclear feedback, or unapproved external sourcing.

## External asset policy

Before an external asset enters production scope, record:

- source URL or supplier
- license or usage rights
- asset owner
- approver
- target folder
- import format
- whether companion `.meta` files are expected
- replacement or removal plan if rights are rejected

Do not import external assets when ownership, license, or approval is unclear.

## Generated asset policy

AI-generated or tool-generated bitmap, audio, animation, or template assets must be treated as real assets.

They require:

- generation source or tool
- prompt or source note when relevant
- intended use
- owner
- approver
- scope
- replacement rule

Generated assets do not bypass approval, `.meta` policy, or runtime proof.

## Asset behavior boundary

Allowed:

- sprite frames
- audio clips
- fonts
- icons
- placeholders
- animation presentation resources
- prefab references after approved Cocos workflow

Forbidden:

- gameplay rules encoded only in asset names
- reward logic hidden in animation events
- enemy behavior defined by prefab-only callbacks
- economy value created by asset import
- UI state treated as final gameplay state
- unapproved scene, prefab, or `.meta` changes

## Routing

- Use [ASSET_SEMANTIC_MODEL.md](ASSET_SEMANTIC_MODEL.md) for asset meaning and behavior-free semantics.
- Use [COCOS_RESOURCE_RISK_MATRIX.md](COCOS_RESOURCE_RISK_MATRIX.md) for resource risk classification.
- Use [COCOS_PATH_SCOPED_RULES.md](COCOS_PATH_SCOPED_RULES.md) for path boundaries.
- Use [protocols/cocos-generated-meta.md](protocols/cocos-generated-meta.md) when generated `.meta` files appear.
- Use [RUNTIME_PROOF_PROTOCOL.md](RUNTIME_PROOF_PROTOCOL.md) when asset visibility or presentation must be proven in browser preview.

## Stop conditions

Stop and report when:

- an asset source or license is unclear
- external assets would be imported without approval
- generated `.meta` appears outside approved scope
- scene, prefab, animation, or `.meta` raw text editing would be required
- an asset change adds behavior, economy, progression, or monetization scope
- placeholder quality prevents runtime proof or user understanding

## Decision vocabulary

- `PLACEHOLDER_ALLOWED`: placeholder asset is acceptable for the current MVP proof.
- `ASSET_APPROVAL_REQUIRED`: owner, source, license, approver, or import scope is missing.
- `ASSET_SCOPE_BLOCKED`: requested asset work expands the approved scope.
- `ASSET_RUNTIME_PROOF_REQUIRED`: browser preview or runtime proof is needed before acceptance.
