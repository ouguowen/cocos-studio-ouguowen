# Codex Handoff Prompt

Use this prompt when asking Codex to create or update a local Cocos Creator 3.8.8 project from the Attack Defense City example pack.

## Prompt

```text
Use $cocos-studio-ouguowen.
Work in Cocos Creator 3.8.8 project mode.

Goal:
Create the first local Cocos demo skeleton for the Attack Defense City example pack.

Use these source files as truth:
- examples/attack-defense-city/level-config/*.csv
- examples/attack-defense-city/cocos-reference-stub/
- examples/attack-defense-city/cocos-setup-guide/
- examples/attack-defense-city/cocos-demo-skeleton/

Do not build the full game.
Do not add monetization, login, cloud save, shop, inventory, or extra maps.

First task:
Copy or adapt the reference stubs into assets/scripts/attack-defense-city/.
Then create a scene assembly plan for scene_city_battle.

Required output:
- changed or proposed files
- Cocos editor steps
- inspector binding checklist
- validation commands
- risks and blockers
```

## Expected behavior

Codex should not jump directly into a full game.

Codex should produce a small, reviewable implementation plan first.

## Stop condition

Stop if Codex starts adding systems outside the first playable loop.
