# Examples

Use these examples when the user wants a concrete applied pattern instead of an abstract rule.

## Example 1: Solo studio starting a new Cocos project

Situation:

- one developer
- no existing project structure
- wants a serious workflow, not improvisation

Recommended sequence:

1. Put on the Producer hat and write:
   - first-version scope
   - non-goals
   - milestone outline
2. Put on the Lead Designer hat and write:
   - core loop
   - fail state
   - reward loop
3. Put on the Technical Director hat and decide:
   - target platform
   - performance risk
   - Cocos architecture constraints
4. Put on the Lead Programmer hat and build:
   - scene shell
   - config base
   - resource rules
   - UI root
5. Put on the Gameplay Programmer hat and implement:
   - the smallest playable loop
6. Put on the QA Lead hat and ask:
   - can the loop be played end to end
   - where does it break
   - what is not fun yet

Do not:

- start with final UI
- create many polished assets before proving the loop
- mix all hats at the same time without naming the current role

## Example 2: "Our Cocos project is getting messy"

Symptoms:

- giant scripts
- random `update()` logic
- prefab changes done by whoever touched them last
- no one knows whether the project is still prototyping or already in production

Recovery order:

1. identify the actual stage
2. freeze new features briefly if needed
3. list asset ownership violations
4. list shared-framework violations
5. separate gameplay truth from UI and scene scripts
6. define what must be fixed before production continues

Primary roles:

- Technical Director
- Lead Programmer
- Producer
- QA Lead

## Example 3: Building a vertical slice correctly

Required outcome:

- one small piece that feels like a real game

Producer focus:

- keep slice scope narrow

Lead Designer focus:

- define one real gameplay flow

Technical Director focus:

- freeze architecture rules for scale-up

Lead Programmer focus:

- build the real project skeleton

Art and Animation focus:

- set the true quality bar

QA focus:

- test the slice as a product segment, not just a demo

Do not:

- build half the whole game
- keep changing the core loop during the slice
- skip standards and pretend production can absorb that later

## Example 4: Deciding who owns a new boss prefab

Primary owner:

- Gameplay Programmer

Collaborators:

- Lead Programmer
- Animation Lead
- Art Director
- Technical Artist
- Level Designer

Approver:

- Lead Programmer

Reason:

- the boss prefab is gameplay-active content with complex state, behavior, and integration needs
- it depends on structure law from shared engineering, but its runtime truth belongs to gameplay systems

## Example 5: Checking whether a build is ready to ship

Ask in this order:

1. What stage are we actually in
2. Has the release candidate gate passed
3. Are blocker bugs closed or formally accepted
4. Has smoke coverage been run on first-session and key flows
5. Are store materials, build records, and release settings correct
6. Is there a rollback or hotfix path

If any answer is unclear:

- do not call it release-ready

## Example 6: First real session on a new project

Goal:

- open a brand-new idea without drifting into random implementation

Recommended first prompts:

1. `Use $cocos-studio-ouguowen. Classify this game by dominant loop, content unit, progression shape, and monetization pressure point.`
2. `Use $cocos-studio-ouguowen. Define the MVP for this game. Name the one-sentence fantasy, repeated loop, must-prove items, explicit non-goals, and kill conditions.`
3. `Use $cocos-studio-ouguowen. Create a first project memory record with confirmed facts, assumptions, open questions, accepted risks, and current milestone truth.`
4. `Use $cocos-studio-ouguowen. Build the version roadmap from idea framing to soft launch and name what the next milestone must prove.`

Expected outputs:

- classification record
- MVP record
- first project memory
- version roadmap record

Do not:

- jump straight into folder creation before classification and MVP truth exist
- start writing final gameplay systems before the first memory record exists

## Example 7: Updating project memory after a milestone decision

Situation:

- the prototype validated the loop
- the team is moving toward vertical slice

Update order:

1. move current stage from prototype to slice preparation only if the proof obligation is actually met
2. convert old assumptions into confirmed facts or delete them
3. add new accepted risks
4. update current milestone truth and next review date

Good prompt:

`Use $cocos-studio-ouguowen. Update the project memory after prototype review. Separate confirmed facts from expired assumptions, then rewrite current milestone truth for vertical slice preparation.`

## Example 8: Requesting a formal review

Situation:

- a feature plan looks detailed
- the team wants to know if it is truly ready

Good prompt:

`Use $cocos-studio-ouguowen. Review this feature plan against stage fit, ownership fit, MVP fit, architecture fit, release risk, and quality gates. Findings first. Name blockers explicitly.`

Expected review style:

- findings first
- blockers explicit
- residual risks explicit
- no fake approval language

## Example 9: Building a home page with short-option selection

Situation:

- the team is ready to build the game home page
- the user does not want a long discussion first
- the user wants to choose one direction and have the work continue to completion

Good first response shape:

- `A. Fast utility home: prioritize clear navigation and low art dependency.`
- `B. Progression home: prioritize chapter entry, rewards, and return motivation.`
- `C. Event home: prioritize banners, timed activities, and monetization exposure.`

After the user chooses:

1. restate the chosen direction in one short line
2. build the information structure
3. build the layout and interaction flow
4. wire the required runtime data and button actions
5. continue until the home page reaches a usable completed state

Pause only if:

- the chosen option conflicts with a locked product direction
- required assets or product truth are missing
- the next step would force a major architecture change

Do not:

- answer with long paragraphs before the options
- offer too many choices
- stop after one small implementation step and ask again

## Example 10: Stopping a step-skipping mistake

Situation:

- the team wants to build the final home page layout
- current button destinations and runtime data are not defined yet

Correct response:

1. name the current step as `define module boundaries and required data`
2. mark `final layout implementation` as not yet allowed
3. list the missing prerequisites:
   - required runtime data
   - button destinations
   - completion standard
4. continue by repairing those prerequisites first

Good response shape:

- `Current step: define module boundaries and data requirements.`
- `Missing prerequisite: button actions are not defined yet.`
- `Next allowed action: define required actions and runtime data before layout implementation.`

Do not:

- jump into polishing the page because the mockup is already visible
- wire temporary logic into UI just to make the screen look complete

## Example 11: Checking whether a module is allowed to advance

Situation:

- the team says the home page is ready for layout polish
- reward data source and two button destinations are still undefined

Correct chain check:

1. identify the chain as `concrete module chain`
2. identify the current step as `required runtime data and button actions`
3. mark `layout polish` as blocked
4. continue only after the missing data source and destinations are defined

Good response shape:

- `Current chain: concrete module chain.`
- `Current step: required runtime data and button actions.`
- `Blocked next step: layout polish.`
- `Next allowed action: define reward data source and missing button destinations first.`
