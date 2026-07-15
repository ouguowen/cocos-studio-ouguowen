# Agent Router

The Agent Router is a lightweight activation layer that runs after the Task
Router and before execution.

It prevents every request from loading or activating the full Agent chain.

## Flow

```text
Request
-> Task Router
-> Agent Router
-> Selected Agents
-> Executor or existing Studio Pipeline
```

## Rules

- UI and visual changes activate `artist` and `cocos-programmer`.
- Code fixes activate `cocos-programmer`.
- Battle-system work activates `game-designer` and `cocos-programmer`.
- Testing and validation work activates `qa`.
- Complete production, release, and L3 requests keep the full Agent chain.

The router is metadata-only. It does not execute Agents, call MCP, call Cocos,
or change Runtime permissions. `execution_enabled` remains `false`.
