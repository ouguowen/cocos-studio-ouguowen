# Windows Local Steps

Use this guide on a Windows machine when preparing the local Cocos Creator 3.8.8 project.

## Step 1: Update the repository

Open PowerShell or Git Bash in your local repository folder:

```bash
git pull
npm install
npm run check
```

Do not continue if `npm run check` fails.

## Step 2: Open Cocos Creator 3.8.8

Open or create a 2D Cocos Creator 3.8.8 project.

Recommended local project name:

```text
attack-defense-city-demo
```

## Step 3: Create target folders in Cocos

Inside the Cocos project, prepare:

```text
assets/scenes/
assets/scripts/attack-defense-city/
assets/prefabs/enemies/
assets/resources/config/
```

## Step 4: Copy scripts

Copy or adapt files from:

```text
examples/attack-defense-city/cocos-reference-stub/
```

into:

```text
assets/scripts/attack-defense-city/
```

## Step 5: Copy generated config

Run:

```bash
npm run export:example
```

Then copy:

```text
examples/attack-defense-city/generated-level-config.json
```

into:

```text
assets/resources/config/generated-level-config.json
```

## Step 6: Create placeholder prefabs

Create:

```text
prefab_enemy_scout.prefab
prefab_enemy_raider.prefab
```

Put them under:

```text
assets/prefabs/enemies/
```

## Step 7: Create scene

Create:

```text
scene_city_battle.scene
```

Put it under:

```text
assets/scenes/
```

## Step 8: Bind scene nodes

Follow:

```text
examples/attack-defense-city/cocos-demo-skeleton/SCENE_ASSEMBLY_CHECKLIST.md
```

## Step 9: Fill proof report

After the first editor run, fill:

```text
examples/attack-defense-city/local-cocos-execution/EDITOR_PROOF_REPORT_TEMPLATE.md
```
