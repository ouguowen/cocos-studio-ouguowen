# Extension Boundary

This document defines how the Skill can grow without bloating the v1.0 core,
weakening Fast Build Mode, or mixing future engine families into the Cocos Skill
core.

## v1.0 Core

The v1.0 core is the small default operating system that should be safe to load
for normal Skill use. Core material includes:

- default routing and context loading policy
- operation modes
- pre-write approval before real project modification
- runtime proof honesty
- QA and release review
- validation and CI protection
- Cocos Creator 3.8.8 architecture guidance
- game idea to scoped MVP planning

Core documents must stay lightweight, stable, and directly useful for ordinary
planning, review, implementation approval, and release decisions.

## Extension Scope

Extensions are non-default capability packs. They may add depth, examples, or
specialist workflows, but they do not become the default path just because they
exist. Extension material includes:

- `agents/*`
- proof sandbox docs
- example packs
- advanced runtime templates
- semantic model deep docs
- asset generation workflows
- extra game-type packs
- evolution and governance extras
- future engine families

Extensions can be useful and still remain outside the v1.0 core.

## Extension Rules

- Extensions are trigger-only by default.
- Fast Build Mode must not load extension docs unless the user explicitly asks
  for that extension, example, proof history, Agent workflow, or deep topic.
- Extensions must not modify real Cocos projects without pre-write approval,
  approved active project path, and approved write scope.
- Extensions must not claim core status unless promoted through audit.
- Each extension must define clear inputs, outputs, and stop conditions before
  it is used for implementation.
- Extensions must preserve rollback discipline.
- Extensions must not bypass safety gates, explicit project path approval, or
  runtime proof honesty.

## Promotion Rules

An extension can move toward core only after:

- repeated real use shows it is broadly needed
- validation covers its critical rules
- CI protects its required files and links
- an audit confirms v1.0 alignment
- the change preserves Fast Build Mode and default context boundaries

Promotion must be explicit. A successful example, proof slice, or one-off
workflow does not automatically promote an extension into core.

## Multi-Engine Boundary

Godot must not enter the Cocos Skill core.

Future Godot work should become a separate Skill or a clearly separate extension
family with its own engine-specific files, rules, validation, proof paths, and
runtime assumptions. Engine-specific guidance must stay separated so Cocos
Creator 3.8.8 decisions do not inherit Godot rules, and Godot decisions do not
inherit Cocos rules.

## What Must Not Be Optimized Away

Do not optimize away:

- safety
- pre-write approval
- explicit project path approval
- runtime proof honesty
- rollback discipline
- validation and CI protection

Fast context is valuable only when it remains truthful and safe.
