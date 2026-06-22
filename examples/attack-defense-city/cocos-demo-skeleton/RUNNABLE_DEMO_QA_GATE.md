# Runnable Demo QA Gate

Use this gate before claiming that the example pack has a runnable Cocos demo.

## Repository validation

- [ ] `npm run validate:example` passes
- [ ] `npm run export:example` passes
- [ ] `npm run types:example` passes
- [ ] `npm run validate:runtime` passes
- [ ] `npm run check` passes

## Cocos import validation

- [ ] Scripts copied into `assets/scripts/attack-defense-city/`
- [ ] Scripts compile in Cocos Creator 3.8.8
- [ ] Components appear in the Inspector
- [ ] Scene opens without missing script errors

## Scene validation

- [ ] `scene_city_battle.scene` exists
- [ ] Required nodes exist
- [ ] Required map point components exist
- [ ] IDs match config exactly
- [ ] Prefabs are assigned

## Runtime validation

- [ ] `city_001` starts from runtime code
- [ ] Map point registry resolves all required points
- [ ] Prefab registry resolves all required prefabs
- [ ] Runtime state is created
- [ ] UI only displays state

## Claim rule

Only say the demo is runnable after both conditions are true:

```text
repository validation passes
Cocos scene validation passes inside Cocos Creator
```

If only repository validation passes, call it a reference skeleton, not a runnable demo.
