# Ownership

Each asset class needs one primary owner, plus collaborators and an approver.

## Character Prefabs

- Primary owner: Lead Programmer
- Collaborators: Gameplay Programmer, Animation Lead, Art Director, Technical Artist
- Approver: Technical Director
- Notes: owns structure, components, hook points, pooling readiness, naming, integration rules.

## Enemy Prefabs

- Primary owner: Gameplay Programmer
- Collaborators: Lead Programmer, Animation Lead, Level Designer, Technical Artist
- Approver: Lead Programmer
- Notes: owns enemy state wiring, hit points, behavior hooks, drop wiring, gameplay-facing structure.

## UI Prefabs

- Primary owner: UI Programmer
- Collaborators: Art Director, Lead Designer
- Approver: Lead Programmer
- Notes: owns hierarchy, bindings, modal behavior, page lifecycle, reusable controls.

## Interactive World Prefabs

- Primary owner: Gameplay Programmer
- Collaborators: Level Designer, Art Director, Animation Lead
- Approver: Lead Programmer
- Notes: owns triggers, interaction logic, state changes, event hooks.

## Decorative World Prefabs

- Primary owner: Art Director
- Collaborators: Level Designer, Technical Artist
- Approver: Art Director
- Notes: owns visual construction and visual-only reuse rules.

## Animation Assets

- Primary owner: Animation Lead
- Collaborators: Art Director, Lead Designer
- Approver: Art Director
- Notes: owns the motion asset itself, export quality, and animation package completeness.

## Animation State Wiring

- Primary owner: Gameplay Programmer
- Collaborators: Lead Programmer, Animation Lead
- Approver: Lead Programmer
- Notes: owns state transitions, animation playback conditions, animation-driven logic connections.

## Animation Event Points

- Primary owner: Gameplay Programmer
- Collaborators: Animation Lead, Technical Artist
- Approver: Lead Programmer
- Notes: owns hit timing, effect timing, audio timing, and event routing.

## Scene Shell Structure

- Primary owner: Lead Programmer
- Collaborators: Technical Director, UI Programmer
- Approver: Technical Director
- Notes: owns scene entry, scene-level services, persistent nodes, UI root wiring.

## Scene Content Placement

- Primary owner: Level Designer
- Collaborators: Gameplay Programmer, Art Director
- Approver: Lead Designer
- Notes: owns enemy placement, reward placement, trigger placement, pacing segments.

## Scene Visual Composition

- Primary owner: Art Director
- Collaborators: Level Designer, Technical Artist
- Approver: Art Director
- Notes: owns composition, atmosphere, visual density, readability balance.

## UI Flow

- Primary owner: Lead Designer
- Collaborators: UI Programmer, Producer
- Approver: Producer
- Notes: owns page order, route logic, entry logic, player-facing flow goals.

## UI Implementation

- Primary owner: UI Programmer
- Collaborators: Art Director, Gameplay Programmer
- Approver: Lead Programmer
- Notes: owns page scripts, runtime state mapping, modal behavior, HUD updates.

## Config Content

- Primary owner: Lead Designer
- Collaborators: Level Designer, Producer
- Approver: Lead Designer
- Notes: owns numeric intent, drop values, enemy values, reward values, progression values.

## Config Schema and Loading

- Primary owner: Lead Programmer
- Collaborators: Gameplay Programmer, Technical Director
- Approver: Technical Director
- Notes: owns schema shape, parser rules, validation, defaults, compatibility.

## Config Wiring

- Primary owner: Gameplay Programmer
- Collaborators: Lead Designer
- Approver: Lead Programmer
- Notes: owns how config actually drives runtime behavior.

## Audio Assets

- Primary owner: Art Director
- Collaborators: Lead Designer, Animation Lead
- Approver: Art Director
- Notes: owns BGM, SFX, voice asset quality and consistency.

## Audio Trigger Wiring

- Primary owner: Gameplay Programmer
- Collaborators: UI Programmer, Animation Lead
- Approver: Lead Programmer
- Notes: owns the when and why of sound triggers.

## Audio Systems

- Primary owner: Lead Programmer
- Collaborators: Gameplay Programmer, UI Programmer
- Approver: Technical Director
- Notes: owns global audio control, pooling, cross-scene persistence, settings integration.

## VFX Assets

- Primary owner: Technical Artist / VFX Lead
- Collaborators: Animation Lead, Art Director
- Approver: Art Director
- Notes: owns the effect asset, visual quality, and effect-family consistency.

## VFX Trigger Wiring

- Primary owner: Gameplay Programmer
- Collaborators: Technical Artist, Animation Lead
- Approver: Lead Programmer
- Notes: owns trigger timing and gameplay connection.

## VFX Cost Rules

- Primary owner: Technical Artist / VFX Lead
- Collaborators: Technical Director, Lead Programmer
- Approver: Technical Director
- Notes: owns particle, material, and shader cost boundaries.

## Level Logic Data

- Primary owner: Level Designer
- Collaborators: Lead Designer, Gameplay Programmer
- Approver: Lead Designer
- Notes: owns encounters, wave logic, reward placement, route logic, pacing data.

## Build Configuration

- Primary owner: Release / Operations Lead
- Collaborators: Technical Director, Lead Programmer
- Approver: Technical Director
- Notes: owns version numbers, channel identifiers, build variants, environment selection.

## Hot Update Strategy

- Primary owner: Technical Director
- Collaborators: Lead Programmer, Release / Operations Lead
- Approver: Technical Director
- Notes: owns update plan, rollback strategy, and update-risk approval.

## Store Materials

- Primary owner: Release / Operations Lead
- Collaborators: Art Director, Producer
- Approver: Producer
- Notes: owns packaging for the outside world, not internal feature logic.

## Debug Tools and GM Tools

- Primary owner: Lead Programmer
- Collaborators: Gameplay Programmer, QA Lead, Lead Designer
- Approver: Technical Director
- Notes: owns debug safety, utility structure, and test acceleration tools.

## Ownership law

- Collaborators can contribute, but they do not silently rewrite the owner's structure.
- Approvers decide whether the asset can move forward.
- Unowned assets do not enter formal production.
