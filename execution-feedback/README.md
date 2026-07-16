# Execution Feedback Loop

Execution Feedback Loop evaluates simulated execution results and turns them
into safe routing feedback for future tasks.

It is metadata-only:

- `execution_enabled` stays `false`.
- It does not call Cocos, MCP, Providers, Runtime, or external APIs.
- It does not modify Planner, Task Graph, Scheduler, Runtime, or Cocos MCP.

## Flow

```text
Execution Result
-> Execution Score
-> Failure Memory / Success Pattern
-> Feedback Routing Context
-> Task Router confidence
```

Execution results are evaluated and used to improve future routing decisions.
Adaptive Execution Router still keeps the final safety decision.
