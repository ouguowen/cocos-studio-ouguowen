# Workflows

Use these high-frequency execution patterns first. Open [WORKFLOW_EXTENSIONS.md](WORKFLOW_EXTENSIONS.md) only when the request is specialist or release-heavy.

## 1. Starting a new Cocos game

1. Set the provisional stage and mode to `Project Framing` and `Project Framing Mode` unless strong evidence says otherwise.
2. Classify the game before choosing architecture.
3. Lock first-version promise and explicit non-goals.
4. Lock the actual stage and production mode after classification and MVP intent are clear.
5. Choose the first game-type template.
6. If the game is level-heavy, choose the first level data model.
7. Create the first project memory record.
8. Start the first-session and project-framing artifacts.
9. Refuse to jump into broad production without gates.

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

1. Apply [architecture/cocos-rules.md](architecture/cocos-rules.md) and [architecture/project-structure.md](architecture/project-structure.md).
2. Create only the structure justified by the current mode and stage.
3. Name the owner for scene shell, UI framework, config schema, and resource loading.

## 6. Designing level data

1. Choose the correct level data model before naming CSV fields.
2. Decide whether content is fixed-authored, template-authored, pool-generated, or runtime-procedural.
3. Define table ownership and validation rules before production-scale data entry.
4. Do not force one universal level CSV onto every game type.

## 7. Implementing the level runtime

1. Start from [architecture/level-system.md](architecture/level-system.md).
2. Keep config, runtime state, systems, factories, and scene bridge separate.
3. Open [architecture/level-system-extensions.md](architecture/level-system-extensions.md) only when the game truly needs monetization, live ops, sync, social, or compliance layers.
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
3. Confirm module owner and approver before implementation depth increases.
4. Confirm module goal, boundaries, data, and actions in order.
5. Give `2` to `4` options only.
6. Describe each option in one short sentence.
7. After the user chooses, execute continuously until the module reaches a usable completed state.
8. Pause only for real blockers, missing source truth, ownership gaps, or architecture-level conflicts.

## 13. Preventing step-skipping

1. Apply [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md).
2. Open [ADVANCEMENT_CHAIN_MAP.md](ADVANCEMENT_CHAIN_MAP.md) if the task fits a known chain.
3. Name the current step before naming the next step.
4. Check whether prerequisites are actually complete.
5. If prerequisites are missing, stop advancement and repair the sequence first.
6. Do not treat "we will fix it later" as a pass condition.

## 14. Running first-week support

1. Confirm the project is in `First-Week Support` or is using `Live Operations and Rescue Mode`.
2. Review live blockers, player-facing risk, and hotfix candidates first.
3. Separate emergency fixes from normal backlog work.
4. Route compensation, moderation, and rollout decisions through named owners.
5. End each cycle with updated hotfix priorities, watch ownership, and a post-launch review note.
