# Blueprint Manager

The Blueprint Manager creates a shared, versioned game context before Task
Router and Agent Router run.

It prevents each Agent from rereading the full user request by giving each role
only the sections it needs:

- `artist`: `visual`, `assets`, `ui`
- `cocos-programmer`: `systems`, `code`, `components`
- `game-designer`: `design`, `gameplay`
- `qa`: `validation`, `test`

Phase 5 adds dependency impact metadata. When a Blueprint request or update
changes a node, Blueprint Manager can ask the Game Dependency Graph which nodes
and Agents are affected. Agent Router then uses that impact list to avoid
activating unrelated Agents.

```text
Blueprint change
-> Dependency Graph
-> affected_agents
-> Agent Router
```

This module is metadata-only. It does not call Cocos, MCP, Providers, external
APIs, Runtime, Planner, Task Graph, or Scheduler. `execution_enabled` remains
`false`.
