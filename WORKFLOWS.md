# Workflows

Use these execution patterns when the skill is active.

## Starting a new Cocos game

1. Identify the stage. Default to Project Framing if unclear.
2. Name the producer, lead designer, and technical director concerns first.
3. Start the framing documents using [TEMPLATES.md](TEMPLATES.md).
4. Define the first-version scope and explicit non-goals.
5. If the game is level-based or content-heavy, choose the first level data model using [LEVEL_DATA_MODELS.md](LEVEL_DATA_MODELS.md).
6. Identify the first gameplay prototype target.
7. Refuse to jump straight into broad production without gates.

## Building the project structure

1. Confirm the project is at least in Vertical Slice preparation or earlier planning with architecture authority.
2. Apply [COCOS_RULES.md](COCOS_RULES.md).
3. Apply the baseline blueprint in [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).
4. Name the owner for scene shell, UI framework, config schema, and resource loading.
5. Use the current-stage templates where needed. See [TEMPLATES.md](TEMPLATES.md).
6. Create only the structure justified by the current stage.

## Fixing a messy project

1. Identify the current stage.
2. Audit role confusion using [ROLES.md](ROLES.md).
3. Audit asset confusion using [OWNERSHIP.md](OWNERSHIP.md).
4. Audit architecture drift using [COCOS_RULES.md](COCOS_RULES.md).
5. Audit missing gate discipline using [QUALITY_GATES.md](QUALITY_GATES.md).
6. Recommend repairs in this order:
   - ownership clarity
   - architecture containment
   - stage clarity
   - quality gates
   - feature cleanup

## Answering "who should own this?"

1. Find the asset class in [OWNERSHIP.md](OWNERSHIP.md).
2. Name the primary owner, collaborators, and approver.
3. Explain what the owner actually owns.
4. State what should not be changed casually by collaborators.

## Answering "can we ship this?"

1. Identify the current stage and intended build target.
2. Check release-candidate and launch gates in [QUALITY_GATES.md](QUALITY_GATES.md).
3. Run the release and launch checklists in [CHECKLISTS.md](CHECKLISTS.md).
4. Name unresolved blockers explicitly.
5. Do not hide uncertainty behind optimism.

## Producing project artifacts

1. Pick the current stage.
2. Open the matching template in [TEMPLATES.md](TEMPLATES.md).
3. Fill owner, scope, gate, and acceptance sections before details.
4. Reject document drafts that skip ownership or exit criteria.

## Designing level data

1. Identify the gameplay family before naming tables.
2. Select the closest level data model in [LEVEL_DATA_MODELS.md](LEVEL_DATA_MODELS.md).
3. Decide whether content is fixed-authored, template-authored, pool-generated, or runtime-procedural.
4. Define table ownership before field design.
5. Define validation rules before production-scale content entry.
6. Avoid forcing wave-spawn CSVs onto puzzle, quest, exploration, or narrative-heavy designs.

## Implementing the level runtime

1. Choose the level data model first. See [LEVEL_DATA_MODELS.md](LEVEL_DATA_MODELS.md).
2. Apply the runtime boundaries in [LEVEL_SYSTEM_ARCHITECTURE.md](LEVEL_SYSTEM_ARCHITECTURE.md).
3. Keep config, runtime state, result data, managers, systems, and factories separate.
4. Use ordinary TypeScript classes unless the object truly needs Cocos node lifecycle.
5. Reject designs where one `LevelManager` owns the whole level stack.

## Running operational reviews

1. Select the current stage.
2. Open the matching checklist in [CHECKLISTS.md](CHECKLISTS.md).
3. Mark any unanswered item as unresolved risk, not as pass.
4. Escalate blockers before allowing the next stage or release decision.

## Solo studio mode

- Treat one person as many roles with explicit hat switching.
- Before each task, identify the current hat:
  - Producer
  - Lead Designer
  - Technical Director
  - Lead Programmer
  - Gameplay Programmer
  - UI Programmer
  - Art Director
  - Animation Lead
  - Technical Artist
  - Level Designer
  - QA Lead
  - Release / Operations Lead
- Do not let one hat silently bypass another hat's gate.
