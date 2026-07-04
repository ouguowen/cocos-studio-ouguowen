# Asset Semantic Model

This document defines the Skill v2 semantic model for asset meaning, ownership, and safety in Cocos Creator 3.8.8 projects.

## Purpose

The asset semantic model helps agents distinguish source assets, imported Cocos assets, placeholder materials, final production assets, generated files, and runtime references before changing a project.

## Core Layers

1. Asset Intent: why the asset exists and what player-facing or production role it serves.
2. Asset Class: image, audio, font, Spine, prefab, scene, animation, script, config, data table, or documentation.
3. Production Status: placeholder, prototype, review-ready, final, deprecated, generated, or blocked.
4. Ownership: creator, integrator, reviewer, approver, and maintenance owner.
5. Import Boundary: whether Cocos Creator may generate companion files such as `.meta`.
6. Runtime Reference: how the asset is loaded, bound, referenced, or validated at runtime.

## Rules

- No asset enters formal production without owner, reviewer, and approver.
- Assets do not create behavior.
- Imported character art, skeleton, animation clips, UI icons, and prefabs must not introduce gameplay systems by themselves.
- Asset binding must follow controller-owned behavior and character-owned action semantics.
- `.scene`, `.prefab`, `.anim`, and `.meta` files must not be raw text edited.
- Generated `.meta` files require explicit diff review before staging.
- Placeholder assets must be named and documented as placeholders.
- External assets require source, license, usage permission, and replacement plan.
- Asset changes that affect runtime visibility need proof appropriate to the task.

## Required Output For Asset Work

- asset name
- asset class
- production status
- owner and approver
- source and license
- import behavior
- generated-file risk
- runtime reference path
- validation proof
