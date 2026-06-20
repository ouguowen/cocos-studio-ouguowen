# Advancement Chain Map

Use this file with [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md) when the team needs a direct prerequisite chain instead of general guidance.

## 1. New project chain

Follow this order:

1. provisional stage and production mode
2. game classification
3. MVP and explicit non-goals
4. locked stage and production mode
5. version purpose and milestone proof
6. first project memory record
7. architecture baseline
8. first module or prototype implementation

Do not:

- build final modules before classification and MVP are stable
- open large content production before architecture and stage are locked

## 2. Concrete module chain

Follow this order:

1. module goal
2. current stage and mode
3. module owner and approver
4. chosen direction
5. module boundaries
6. required runtime data
7. required button destinations and actions
8. layout and interaction flow
9. runtime wiring
10. completion check

Do not:

- design final layout before the module goal is explicit
- wire buttons before their destinations are defined
- let the page own gameplay rules because runtime boundaries were skipped

## 3. Level system chain

Follow this order:

1. game type classification
2. level data model choice
3. schema owner and validation rules
4. core table design
5. runtime architecture boundaries
6. config export and generated types
7. runtime implementation
8. content-scale authoring

Do not:

- start mass CSV authoring before validation exists
- write one giant level manager before runtime boundaries are set

## 4. Feature delivery chain

Follow this order:

1. feature goal
2. owner and approver
3. touched systems and assets
4. acceptance criteria
5. implementation
6. self-check
7. QA entry
8. review or gate decision

Do not:

- implement a feature before ownership and acceptance are explicit
- send work to QA before scope and acceptance are clear

## 5. Release chain

Follow this order:

1. release target and build lane
2. blocker status
3. key-flow regression
4. build and channel verification
5. rollback or hotfix path
6. launch approval
7. first-week watch ownership
8. first-week triage and hotfix priorities
9. post-launch review note and stabilization handoff

Do not:

- call a build release-ready before rollback exists
- start launch without named post-launch watch ownership

## 6. First-week support chain

Follow this order:

1. live blocker triage
2. hotfix candidate review
3. compensation or player-support decision
4. focused regression and rollout safety check
5. updated watch ownership and next-day priorities
6. post-launch review note

Do not:

- mix normal feature backlog with urgent live triage
- ship a first-week hotfix without regression and owner clarity

## 7. Recovery chain

Follow this order:

1. identify the real stage
2. identify the broken prerequisite
3. freeze unsafe advancement
4. restore ownership and boundaries
5. restore missing gate or missing data truth
6. resume normal advancement

Do not:

- add new work on top of a broken sequence
- call a rescue successful before the prerequisite gap is closed

## Quick response pattern

Use short answers such as:

- `Current chain: concrete module chain.`
- `Current step: required runtime data.`
- `Blocked next step: layout implementation.`
- `Next allowed action: define button destinations and runtime data first.`
