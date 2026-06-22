# Blocker Troubleshooting

Use this when local Cocos execution is blocked.

## Blocker: npm run check fails

Do not open Cocos first.

Repair repository validation first.

Send AI:

```text
npm run check failed.
Here is the terminal output:
<output>
```

## Blocker: scripts do not compile in Cocos

Send AI:

```text
Cocos script compile failed.
Here is the console error:
<error>
```

Also include:

- Cocos Creator version
- script file path
- changed files

## Blocker: component does not appear in Inspector

Check:

- class name matches file name
- `@ccclass` exists
- script compiled without errors
- script is inside `assets/scripts`

## Blocker: map point missing

Check:

- node exists
- `MapPointComponent` is attached
- `pointId` is not empty
- `pointId` exactly matches config

## Blocker: prefab missing

Check:

- prefab exists under `assets/prefabs/enemies/`
- prefab is assigned to bootstrap
- config prefab ID matches assignment

## Blocker: scene runs but nothing happens

Check:

- `AttackDefenseCityBootstrap` is attached to `GameRoot`
- `GameRoot` is active
- scene is the active scene
- console output is visible
- errors are not hidden by collapsed logs

## Repair order

Use this order:

```text
repository validation
-> Cocos script compile
-> scene hierarchy
-> inspector binding
-> first run console
```
