# Reference Stub Copy Checklist

Use this checklist when moving reference stubs into a local Cocos Creator project.

## Source folder

```text
examples/attack-defense-city/cocos-reference-stub/
```

## Target folder

```text
assets/scripts/attack-defense-city/
```

## Files to copy or adapt

- [ ] `AttackDefenseCityBootstrap.ts`
- [ ] `MapPointComponent.ts`
- [ ] `MapPointRegistry.ts`
- [ ] `EnemyPrefabRegistry.ts`
- [ ] `LevelRuntimeFacade.ts`

## After copy

- [ ] Cocos Creator recompiles scripts
- [ ] no import errors
- [ ] `AttackDefenseCityBootstrap` appears in Inspector
- [ ] `MapPointComponent` appears in Inspector
- [ ] helper classes are not attached as components

## Required manual review

- [ ] file paths match Cocos project folder structure
- [ ] class names match file names
- [ ] component decorators are preserved
- [ ] inspector fields are visible
- [ ] generated config is still treated as data, not hardcoded into scripts
