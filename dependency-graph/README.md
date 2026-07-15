# Game Dependency Graph Engine

The Dependency Graph Engine maps Blueprint changes to affected Agents, files,
systems, assets, and validation nodes.

It is metadata-only:

- `execution_enabled` is always `false`.
- It does not call Cocos, MCP, Providers, or external APIs.
- It does not modify game files.

## Core Flow

```text
Blueprint change
-> Dependency Graph
-> Affected nodes
-> Affected Agents
-> Agent Router
```

## Public API

- `registerDependency(graph, from, to)` records a directed dependency.
- `findAffectedNodes(graph, changedNodes)` returns transitive impact.
- `getAffectedAgents(graph, changedNodes)` returns only impacted Agents.

## Example

```text
blueprint:visual.theme
-> agent:artist
-> asset:ui
-> file:ui
-> agent:qa
```

```text
blueprint:combat.enemy
-> agent:game-designer
-> system:combat
-> agent:cocos-programmer
-> file:code/combat
-> agent:qa
```
