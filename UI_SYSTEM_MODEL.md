# UI System Model

This document defines the Skill v2 semantic model for user interface work in Cocos Creator 3.8.8 projects.

## Purpose

The UI system model helps Codex and other AI agents reason about UI as a product-facing interaction layer, not as loose scene decoration.

## Core Layers

1. Screen: a complete user-facing view such as home, battle HUD, shop, inventory, result, or settings.
2. Panel: a bounded workflow region within a screen, such as reward summary, mission list, or upgrade detail.
3. Control: an interactive element such as button, toggle, slider, tab, input, or scroll item.
4. Feedback: visual or textual response to player action, validation failure, reward grant, loading, or blocked state.
5. Binding: the explicit relationship between UI state and gameplay, economy, progression, or navigation truth.

## Rules

- UI must reflect gameplay truth; it must not own gameplay truth.
- UI input is a request, not final truth.
- UI must not own gameplay truth, completion, rewards, combat results, economy changes, or story endings.
- Button callbacks must route into controller behavior methods.
- UI may display character response but must not own action result.
- UI must follow [UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md](UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md) for any character-related interaction.
- A UI change that affects navigation, rewards, economy, combat, or progression must name its source of truth.
- A visible UI proof must distinguish editor scene visibility from browser runtime visibility.
- Placeholder UI is allowed only when labeled as placeholder and tied to an acceptance gate.
- UI implementation must not bypass `cocos-dev-story-prewrite` or the Preview Visibility Gate.

## Required Output For UI Work

- screen or panel name
- player purpose
- state list
- input controls
- output feedback
- data bindings
- proof requirement
- forbidden scope
