# Project Structure Guide

Use this guide when turning the example pack into a real Cocos Creator 3.8.8 project.

## Recommended Cocos folders

```text
assets/
  scenes/
  scripts/
  prefabs/
  resources/
```

## Example pack folders inside Cocos

```text
assets/scripts/attack-defense-city/
assets/prefabs/enemies/
assets/resources/config/
assets/scenes/
```

## Script folder rule

Keep example-pack scripts together:

```text
assets/scripts/attack-defense-city/
```

Do not scatter first-loop scripts across random scene folders.

## Prefab folder rule

Keep placeholder enemy prefabs together:

```text
assets/prefabs/enemies/
```

## Config folder rule

Generated runtime config should be copied to:

```text
assets/resources/config/generated-level-config.json
```

The CSV files remain authoring data in this repository.

## Scene folder rule

The first test scene should live in:

```text
assets/scenes/scene_city_battle.scene
```

## Skeleton status

This guide defines a target structure.

It does not replace real Cocos Creator scene creation.
