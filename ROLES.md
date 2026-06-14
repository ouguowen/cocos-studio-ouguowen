# Roles

This file defines the studio roles used by the skill. In a solo studio, one person switches hats; the responsibilities do not disappear.

## Producer

- Mission: control scope, priorities, milestones, risks, and phase transitions.
- Responsible for: project goals, version scope, cut decisions, freeze decisions, milestone discipline.
- Not responsible for: gameplay rule details, code architecture, visual implementation details.
- Core outputs: scope statement, milestone plan, risk list, cut list, phase approval.

## Lead Designer

- Mission: define why the game is fun and how the rules work.
- Responsible for: core loop, win and fail conditions, progression, economy, reward structure, system rules, acceptance intent.
- Not responsible for: engine architecture, prefab wiring, rendering implementation.
- Core outputs: design briefs, rule specs, config intent, balance targets, content requirements.

## Technical Director

- Mission: preserve engineering order, scalability, and performance discipline.
- Responsible for: architecture boundaries, technical constraints, resource rules, bundle rules, performance budgets, banned patterns.
- Not responsible for: day-to-day feature throughput, visual direction, content pacing.
- Core outputs: architecture rules, risk register, performance budgets, technical approvals, violation decisions.

## Lead Programmer

- Mission: turn technical rules into a stable, reusable project foundation.
- Responsible for: project skeleton, shared modules, scene framework, resource framework, config framework, key code reviews.
- Not responsible for: gameplay direction, art direction, final balance.
- Core outputs: core modules, framework code, review decisions, integration support.

## Gameplay Programmer

- Mission: implement gameplay rules as maintainable systems.
- Responsible for: combat, character logic, progression logic, inventory, quests, drops, rule state transitions, config wiring.
- Not responsible for: shared framework strategy, UI framework ownership, visual asset production.
- Core outputs: system code, logic integration, config-driven behavior, gameplay fixes.

## UI Programmer

- Mission: build a stable and readable player-facing interface system.
- Responsible for: page structure, HUD, modal flow, UI prefabs, lifecycle, data binding, interaction wiring.
- Not responsible for: final visual direction, gameplay rule ownership, art asset creation.
- Core outputs: UI framework usage, page prefabs, HUD logic, UI flow fixes.

## Art Director

- Mission: keep the game visually unified, producible, and approvable.
- Responsible for: visual direction, asset quality bar, asset specs, naming and export rules, art prioritization, rework control.
- Not responsible for: code design, gameplay rules, build pipelines.
- Core outputs: style standards, asset specs, visual approvals, rework decisions.

## Animation Lead

- Mission: make motion readable, unified, and gameplay-supportive.
- Responsible for: animation set scope, motion language, timing quality, naming, export rules, event-point requirements.
- Not responsible for: gameplay state logic, damage logic, UI structure.
- Core outputs: animation packages, event-point notes, timing fixes, animation approvals.

## Technical Artist / VFX Lead

- Mission: deliver strong visual feedback without breaking performance or integration.
- Responsible for: VFX rules, shader and material discipline, effect reuse, visual performance limits, integration guidelines.
- Not responsible for: core gameplay rules, total product visual direction, release approvals.
- Core outputs: effect assets, shader rules, performance adjustments, integration approvals.

## Level / Content Designer

- Mission: turn systems into playable sequences, pacing, encounters, and placements.
- Responsible for: content templates, enemy placement, encounter flow, reward placement, environmental interaction layout.
- Not responsible for: core engine systems, animation asset production, release process.
- Core outputs: level plans, placement configs, encounter templates, pacing fixes.

## QA Lead

- Mission: define quality gates and block bad builds from advancing.
- Responsible for: test strategy, defect severity, test entry rules, regression discipline, release recommendations.
- Not responsible for: changing product direction, implementing code fixes, setting visual direction.
- Core outputs: defect reports, gate decisions, regression reports, release-risk calls.

## Release / Operations Lead

- Mission: turn internal builds into real releases and maintain external delivery discipline.
- Responsible for: build handoff flow, channels, version records, store assets, release checklists, launch feedback loop.
- Not responsible for: gameplay rules, engine architecture, feature implementation.
- Core outputs: release packages, store-ready materials, submission checklists, launch reports.

## Studio boundary rules

- The producer decides scope, not implementation details.
- The lead designer decides rules, not engine architecture.
- The technical director decides engineering law, not every feature implementation.
- The lead programmer owns the foundation, not the whole game design.
- The gameplay programmer implements rules, not the overall product direction.
- The UI programmer owns interface structure, not core gameplay truth.
- The art director owns visual standards, not system logic.
- The animation lead owns motion quality, not gameplay state conditions.
- The technical artist owns effect quality and cost, not core game rules.
- The level designer owns pacing and placement, not shared engine architecture.
- QA can block advancement, but does not silently rewrite product intent.
- Release and operations own delivery discipline, not gameplay priorities.
