# Stages

Every project must be in one clear stage. Do not advance on vibes.

## 1. Project Framing

- Goal: define why the game exists, what the first version includes, and what it explicitly excludes.
- Entry: concept exists but scope is not yet locked.
- Required outputs:
  - project goal
  - target player statement
  - first-version scope
  - non-goals list
  - top technical risks
  - visual complexity direction
- Exit criteria:
  - core loop can be stated clearly
  - first-version boundaries are explicit
  - major technical and production risks are visible
- Do not:
  - start broad production
  - treat every idea as in scope

## 2. Gameplay Prototype

- Goal: prove whether the core loop is actually fun and technically viable.
- Entry: project framing outputs are approved.
- Required outputs:
  - playable core loop
  - minimum HUD or debug UI
  - prototype rule notes
  - prototype findings and risks
- Exit criteria:
  - the loop can be played end to end
  - key feedback and failure states exist
  - the team can name what feels good and what fails
- Do not:
  - build full production UI
  - mass-produce polished assets
  - hide design weakness behind presentation

## 3. Vertical Slice

- Goal: build one small piece that feels close to a real product.
- Entry: prototype shows a viable direction.
- Required outputs:
  - approved slice scope
  - production architecture baseline
  - approved visual standard
  - first production-grade scene, UI, and gameplay flow
  - ownership and pipeline rules
- Exit criteria:
  - the slice feels like a real game segment, not a toy
  - architecture and standards are stable enough for scale-up
  - quality expectations are visible to every role
- Do not:
  - keep rewriting the core direction
  - scale content before standards exist

## 4. Formal Production

- Goal: produce features and content in volume without losing structure.
- Entry: vertical slice standards are approved.
- Required outputs:
  - production backlog with priorities
  - repeatable feature and content pipeline
  - approved shared modules
  - active defect tracking
- Exit criteria:
  - version goals are mostly feature-complete
  - content and systems obey production rules
  - technical and quality debt is visible and managed
- Do not:
  - rebuild core architecture midstream
  - allow undefined assets into the main branch

## 5. Polish and Stabilization

- Goal: convert "built" into "shippable".
- Entry: the target release scope is substantially present.
- Required outputs:
  - blocking bug list
  - optimization actions
  - cut list and defer list
  - release candidate plan
- Exit criteria:
  - blocking issues are resolved or formally accepted
  - performance is within target range
  - key flows are stable
- Do not:
  - add major new features
  - allow polish work to become infinite scope creep

## 6. Release

- Goal: ship a stable version with controlled risk.
- Entry: release candidate is under control.
- Required outputs:
  - final build candidate
  - smoke-test result
  - release checklist
  - store and channel materials
  - rollback or hotfix plan
- Exit criteria:
  - release build is approved
  - launch dependencies are complete
  - first-week watchlist exists
- Do not:
  - keep merging uncontrolled core changes
  - ship without smoke coverage on key flows

## 7. First-Week Support

- Goal: catch launch failures quickly and protect the live product.
- Entry: the game is public.
- Required outputs:
  - bug triage stream
  - first-week hotfix priorities
  - launch feedback summary
  - post-launch review notes
- Exit criteria:
  - critical launch issues are under control
  - first maintenance priorities are set

## Stage law

- Every stage needs entry conditions, outputs, and exit conditions.
- If the current stage is unclear, the project is already drifting.
- If outputs from an earlier stage do not exist, later-stage work should be challenged.
