# Attack Defense City — Example Pack Brief

## Purpose

This example pack shows how `cocos-studio-ouguowen` turns an AI Game Studio workflow into a small Cocos Creator 3.8.8 MVP reference.

It is a modern city attack-defense example pack, not a fixed final game direction.

## Example concept

A modern city attack-defense scenario where the player protects a city gate from incoming enemy waves.

## Target player promise

In the first playable reference, the player should understand:

- where enemies enter
- what they are trying to destroy
- when a wave begins
- when the level is won or lost
- what reward is granted after victory

## Dominant player loop

```text
prepare defense
-> enemy wave enters
-> player/defense defeats enemies
-> objective updates
-> wave advances
-> level result
-> reward granted
```

## MVP scope

The example MVP is intentionally small:

- one map
- one player/base position
- two enemy spawn points
- two enemy types
- two waves
- one objective: clear all enemies
- one reward

## Explicit non-goals

Do not treat these as part of the example pack:

- full unit collection
- gacha
- ads
- IAP
- guilds
- leaderboard
- cloud save
- live events
- advanced equipment
- full story campaign

## First proof obligation

The first proof is not art quality or monetization.

The first proof is:

```text
Can the player enter one level, see enemies spawn from map points, clear waves, satisfy the objective, and receive a result/reward?
```
