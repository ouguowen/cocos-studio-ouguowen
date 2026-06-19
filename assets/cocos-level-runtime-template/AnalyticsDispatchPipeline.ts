import type { AnalyticsEventQueue, AnalyticsEventRecord } from "./AnalyticsEventQueue";
import type { AnalyticsSchemaRegistry, AnalyticsValue } from "./AnalyticsSchemaRegistry";
import type { SessionTracker } from "./SessionTracker";

export interface AnalyticsDispatchTarget {
  send(events: readonly AnalyticsEventRecord[]): Promise<void> | void;
}

export class AnalyticsDispatchPipeline {
  private nextEventIndex = 1;

  public constructor(
    private readonly schemaRegistry: AnalyticsSchemaRegistry,
    private readonly sessionTracker: SessionTracker,
    private readonly eventQueue: AnalyticsEventQueue,
    private readonly dispatchTarget: AnalyticsDispatchTarget
  ) {}

  public track(
    eventName: string,
    payload: Readonly<Record<string, AnalyticsValue>>,
    occurredAtMs: number
  ): AnalyticsEventRecord {
    this.schemaRegistry.validate(eventName, payload);

    const session = this.sessionTracker.getSession();
    const event: AnalyticsEventRecord = {
      eventId: `evt-${this.nextEventIndex++}`,
      eventName,
      payload,
      occurredAtMs,
      sessionId: session?.sessionId ?? null,
      userId: session?.userId ?? null,
    };
    this.eventQueue.enqueue(event);
    if (session) {
      this.sessionTracker.touch(occurredAtMs);
    }
    return event;
  }

  public async flush(limit = 50): Promise<number> {
    const batch = this.eventQueue.drain(limit);
    if (batch.length === 0) {
      return 0;
    }

    await this.dispatchTarget.send(batch);
    return batch.length;
  }
}
