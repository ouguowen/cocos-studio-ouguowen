# Role Stage Matrix

Use this file when the project needs concrete "who does what now" guidance.

## Producer

### Project Framing

- define first-version scope and explicit non-goals
- define milestone shape and risk list
- stop uncontrolled idea expansion

### Gameplay Prototype

- keep the team focused on validating fun, not polishing everything
- decide what the prototype must prove
- force a go, change, or stop decision

### Vertical Slice

- lock slice scope
- define what "near-production quality" means for the slice
- stop the slice from becoming half the full game

### Formal Production

- control backlog priority
- approve cuts, deferments, and milestone reshaping
- stop low-value feature creep

### Polish and Stabilization

- define must-fix versus defer
- stop infinite polish loops
- prepare the release scope freeze

### Release

- issue final go or delay call
- freeze change scope
- align launch watchlist across the team

### First-Week Support

- review launch signals and player-facing risk daily
- approve emergency scope cuts or hotfix priorities
- stop random post-launch feature drift

## Lead Designer

### Project Framing

- define the core loop, failure condition, and reason to replay
- decide the minimum viable system set

### Gameplay Prototype

- translate the loop into a minimum playable rule set
- identify what feels good, flat, confusing, or unfair

### Vertical Slice

- define the full rule package for one real slice
- specify pacing, rewards, flow, and acceptance intent

### Formal Production

- produce detailed feature, content, and config requirements
- keep system growth aligned with the core loop

### Polish and Stabilization

- tune pacing, difficulty, rewards, and player guidance
- fix the biggest experience breaks first

### Release

- confirm first-session experience and starting economy
- prepare the first-week tuning watchlist

### First-Week Support

- review first-week progression, economy, and tutorial pain
- prioritize the highest-value tuning actions

## Technical Director

### Project Framing

- decide whether Cocos Creator 3.x is the right route
- identify major technical and performance risks

### Gameplay Prototype

- define prototype technical limits
- stop premature heavy architecture

### Vertical Slice

- freeze architectural law
- freeze resource, prefab, bundle, and performance rules

### Formal Production

- review violations in shared modules and performance budgets
- keep technical debt visible and prioritized

### Polish and Stabilization

- focus on load, memory, crash, and frame-budget risks
- decide which technical issues block release

### Release

- confirm build safety, update safety, and rollback safety
- stop late core changes

### First-Week Support

- review hotfix safety and rollback safety for live changes
- stop unstable rescue changes from entering the live branch

## Lead Programmer

### Project Framing

- sketch the initial module map
- identify the first technical proofs needed

### Gameplay Prototype

- build the smallest stable project skeleton
- support core loop validation with minimal framework

### Vertical Slice

- build the real project foundation
- establish scene, config, resource, and shared service structure

### Formal Production

- maintain the foundation
- review critical code
- solve high-risk cross-system problems

### Polish and Stabilization

- fix structure-level failures and risky technical chains
- protect the project from destabilizing refactors

### Release

- lock the release candidate code path
- support final fixes and hotfix readiness

### First-Week Support

- support emergency fixes without breaking the live baseline
- review service and client hotfix integration risk

## Gameplay Programmer

### Project Framing

- flag rule-implementation risks
- identify what should be proven first

### Gameplay Prototype

- implement the smallest fun loop
- expose state, control, and rule problems early

### Vertical Slice

- upgrade prototype logic into real systems
- connect config, state, and runtime rules properly

### Formal Production

- build features and content logic in volume
- keep new systems consistent with existing boundaries

### Polish and Stabilization

- fix logic bugs, state bugs, and rule-edge failures
- support tuning without destabilizing the system

### Release

- protect the first-session gameplay loop
- resolve release-blocking gameplay defects

### First-Week Support

- fix live gameplay blockers and progression dead-ends first
- support safe tuning changes without destabilizing core systems

## UI Programmer

### Project Framing

- identify the minimum UI and HUD surface
- flag risky interface flows early

### Gameplay Prototype

- build only the UI needed to operate and read the prototype

### Vertical Slice

- establish page, modal, HUD, and lifecycle rules
- create reusable UI structure

### Formal Production

- implement pages and flows at scale
- keep UI logic from becoming rule chaos

### Polish and Stabilization

- fix state mismatch, bad flow, bad readability, and bad adaptation

### Release

- confirm the first-session UI chain and all key entry points

### First-Week Support

- fix live UI blockers, dead-end flows, and unreadable states
- confirm hotfix UI changes do not break key entry chains

## Art Director

### Project Framing

- define a visual direction the team can actually afford

### Gameplay Prototype

- provide readable placeholders and minimal feedback quality

### Vertical Slice

- lock the art quality bar and asset specification rules

### Formal Production

- review asset consistency and rework
- control production priorities

### Polish and Stabilization

- remove the most visible visual inconsistency and missing pieces

### Release

- confirm in-game and store-facing visual consistency

### First-Week Support

- review the most visible live-facing visual defects
- support fast correction of misleading or broken store assets when needed

## Animation Lead

### Project Framing

- define animation scope and complexity

### Gameplay Prototype

- provide critical motion for readability and feel

### Vertical Slice

- define animation package, naming, export rules, and event-point needs

### Formal Production

- deliver animation assets in volume with consistent timing quality

### Polish and Stabilization

- fix timing, readability, and broken motion transitions

### Release

- confirm key first-session motion coverage and correctness

### First-Week Support

- fix live motion bugs that break readability or trust
- support emergency timing corrections for core actions

## Technical Artist / VFX Lead

### Project Framing

- define effect ambition against performance reality

### Gameplay Prototype

- validate essential hit, action, and response effects

### Vertical Slice

- establish VFX, material, and shader rules

### Formal Production

- deliver reusable effects and hold the cost line

### Polish and Stabilization

- reduce visual noise and heavy-cost effect problems

### Release

- confirm critical effect correctness and effect-budget safety

### First-Week Support

- reduce broken, noisy, or over-budget live effects quickly
- protect performance during hotfix effect changes

## Level / Content Designer

### Project Framing

- define the content structure model

### Gameplay Prototype

- create minimal placements to test pacing and clarity

### Vertical Slice

- create one production-grade pacing segment

### Formal Production

- produce content templates, placements, and encounter structure in volume

### Polish and Stabilization

- fix dead space, spikes, confusion, and reward pacing

### Release

- confirm first-session and first-content-chain pacing safety

### First-Week Support

- review first-week drop-off points in content progression
- fix dead space, spikes, and blocked advancement in live content

## QA Lead

### Project Framing

- define likely quality-risk areas

### Gameplay Prototype

- validate that the loop actually works and does not dead-end

### Vertical Slice

- establish formal test language, defect levels, and slice acceptance

### Formal Production

- run functional and regression control
- keep the defect pool honest

### Polish and Stabilization

- focus on blocker identification and release confidence

### Release

- run smoke validation and issue a clear release recommendation

### First-Week Support

- run focused regression on hotfix builds and live-critical flows
- keep blocker severity honest during launch pressure

## Release / Operations Lead

### Project Framing

- identify platform and channel constraints

### Gameplay Prototype

- lightly track future release risks without derailing validation

### Vertical Slice

- begin external-delivery planning and store-material awareness

### Formal Production

- manage version flow, channel details, and release material tracking

### Polish and Stabilization

- prepare release candidate packages and submission materials

### Release

- execute launch delivery, record release state, and feed first-week signals back to the team

### First-Week Support

- run the first-week triage rhythm
- coordinate hotfix handoff, compensation decisions, and player-feedback routing
