# What To Send Back To AI

After you try the local Cocos execution step, send AI the smallest useful proof package.

## Send this first

```text
1. Cocos Creator version
2. Whether npm run check passed
3. Whether scripts compiled in Cocos
4. Whether scene_city_battle opens
5. Console error text, if any
6. Screenshot or description of Inspector bindings
7. The filled editor proof report
```

## Good message example

```text
I opened Cocos Creator 3.8.8.
npm run check passed.
Scripts compiled, but AttackDefenseCityBootstrap does not appear in the Inspector.
Here is the console error:
<error text>
Here is my scene hierarchy:
<description or screenshot>
```

## Avoid vague messages

Avoid:

```text
It does not work.
```

Better:

```text
The scene opens, but Play fails with this console error: <paste exact error>.
```

## Best screenshot proof

- scene hierarchy
- script compile error console
- `GameRoot` Inspector
- point node Inspector
- prefab folder
- first run console
