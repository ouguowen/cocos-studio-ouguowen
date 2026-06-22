# Attack Defense City — Mini GDD

## Example pack type

Dominant template:

```text
Tower Defense / Lane Strategy / Attack-Defense
```

This is not a full tower-defense game and not the user's fixed final project. It is a small attack-defense example pack that proves wave, spawn, objective, result, and reward flow.

## Player goal inside the example

Protect the city gate by surviving and clearing the incoming waves.

## Level goal

Complete `city_001` by clearing all configured enemy waves.

## Lose condition

The example data currently declares the lose condition as:

```text
base_destroyed
```

The runtime example should treat this as a future hook unless the Cocos project already implements base HP.

## Win condition

The level is won when:

- all enabled waves are completed
- required objectives are completed
- no unresolved failure state is active

## Core systems needed

- config loading
- level runtime state
- map point registry
- wave system
- spawn system
- enemy factory
- objective system
- result recorder
- reward grant pipeline

## UI needed for MVP

Minimum UI:

- start level button or auto-start hook
- wave indicator
- enemy/objective progress text
- victory/failure result panel
- reward display

## Content data needed

Existing tables:

- `Level.csv`
- `LevelTemplate.csv`
- `LevelObjective.csv`
- `Wave.csv`
- `Spawn.csv`
- `EnemyGroup.csv`
- `Enemy.csv`
- `Map.csv`
- `MapPoint.csv`
- `Reward.csv`

## MVP acceptance

The example pack is acceptable when:

1. Config validates.
2. Runtime config exports.
3. The example can be mapped to Cocos scene objects.
4. A developer knows which runtime system consumes each table.
5. QA can test one full level loop from start to result.
