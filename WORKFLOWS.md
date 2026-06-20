# Workflows

Use these high-frequency execution patterns first. Open [WORKFLOW_EXTENSIONS.md](WORKFLOW_EXTENSIONS.md) only when the request is specialist or release-heavy.

## 1. Starting a new Cocos game

1. Identify production mode and stage.
2. Classify the game before choosing architecture.
3. Lock first-version promise and explicit non-goals.
4. Choose the first game-type template.
5. If the game is level-heavy, choose the first level data model.
6. Start the first-session and project-framing artifacts.
7. Refuse to jump into broad production without gates.

## 2. Updating project memory

1. Record confirmed facts, locked decisions, active assumptions, and open questions separately.
2. Update memory after scope, stage, platform, risk, or milestone changes.
3. Remove stale assumptions instead of letting them pretend to be truth.

## 3. Defining the MVP

1. Name the one-sentence fantasy and the repeated loop.
2. Name what must be proven before discussing polish or scale.
3. Cut supporting systems until one trustworthy first-version loop remains.
4. Record kill conditions before approving expansion.

## 4. Choosing a game-type template

1. Choose by dominant player action, not by visual theme.
2. Name the main content unit and progression structure.
3. Start config and runtime planning only after the template is stable.

## 5. Building the project structure

1. Apply [COCOS_RULES.md](COCOS_RULES.md) and [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).
2. Create only the structure justified by the current mode and stage.
3. Name the owner for scene shell, UI framework, config schema, and resource loading.

## 6. Designing level data

1. Choose the correct level data model before naming CSV fields.
2. Decide whether content is fixed-authored, template-authored, pool-generated, or runtime-procedural.
3. Define table ownership and validation rules before production-scale data entry.
4. Do not force one universal level CSV onto every game type.

## 7. Implementing the level runtime

1. Start from [LEVEL_SYSTEM_ARCHITECTURE.md](LEVEL_SYSTEM_ARCHITECTURE.md).
2. Keep config, runtime state, systems, factories, and scene bridge separate.
3. Open [LEVEL_SYSTEM_EXTENSIONS.md](LEVEL_SYSTEM_EXTENSIONS.md) only when the game truly needs monetization, live ops, sync, social, or compliance layers.
4. Reject designs where one `LevelManager` owns the whole level stack.

## 8. Fixing a messy project

1. Audit ownership confusion.
2. Audit architecture drift.
3. Audit missing stage or gate discipline.
4. Repair in this order: ownership, architecture, stage clarity, gates, then feature cleanup.

## 9. Running a formal review

1. Review against stage, ownership, classification, MVP, architecture, release, and operations fit.
2. Report findings first.
3. Separate blockers from improvements.
4. Do not approve work that still fails a named gate.

## 10. Answering "can we ship this?"

1. Confirm target platform, stage, and release lane.
2. Run quality gates and release checklists.
3. Name unresolved blockers explicitly.
4. Do not hide uncertainty behind optimism.

## 11. Solo studio mode

1. Treat one person as many roles with explicit hat switching.
2. Before each task, name the current hat and the current deliverable.
3. Do not let one hat silently bypass another hat's gate.

## 12. Building one concrete module

1. Apply [CHOICE_EXECUTION_PROTOCOL.md](CHOICE_EXECUTION_PROTOCOL.md).
2. Apply [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md).
3. Confirm module goal, boundaries, data, and actions in order.
4. Give `2` to `4` options only.
5. Describe each option in one short sentence.
6. After the user chooses, execute continuously until the module reaches a usable completed state.
7. Pause only for real blockers, missing source truth, or architecture-level conflicts.

## 13. Preventing step-skipping

1. Apply [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md).
2. Open [ADVANCEMENT_CHAIN_MAP.md](ADVANCEMENT_CHAIN_MAP.md) if the task fits a known chain.
3. Name the current step before naming the next step.
4. Check whether prerequisites are actually complete.
5. If prerequisites are missing, stop advancement and repair the sequence first.
6. Do not treat "we will fix it later" as a pass condition.
