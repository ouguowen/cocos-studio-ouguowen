# Execution Cache Layer

Execution Cache stores safe routing metadata for repeated AI Game Studio tasks.

It is metadata-only:

- `execution_enabled` stays `false`.
- It does not call Cocos, MCP, Providers, Runtime, or external APIs.
- It does not modify Planner, Task Graph, Scheduler, Runtime, or Cocos MCP.

## Flow

```text
User Request
-> Task Fingerprint
-> Execution Cache lookup
-> cache hit or cache miss
-> Task Router / Adaptive Execution Router
-> Agent Router
```

On cache hit, the cache can suggest:

```json
{
  "mode": "fast",
  "agents": []
}
```

Adaptive Execution Router still keeps the final safety decision.

## Route Score

Route Score records:

- `success`
- `fail`
- `execution_time`

It is for future route quality selection, not real execution.
