import type { AnalyticsValue } from "./AnalyticsSchemaRegistry";

export interface AnalyticsEventRecord {
  readonly eventId: string;
  readonly eventName: string;
  readonly payload: Readonly<Record<string, AnalyticsValue>>;
  readonly occurredAtMs: number;
  readonly sessionId: string | null;
  readonly userId: string | null;
}

export class AnalyticsEventQueue {
  private readonly queue: AnalyticsEventRecord[] = [];

  public enqueue(event: AnalyticsEventRecord): void {
    this.queue.push(event);
  }

  public peek(limit: number): readonly AnalyticsEventRecord[] {
    return this.queue.slice(0, limit);
  }

  public drain(limit: number): readonly AnalyticsEventRecord[] {
    return this.queue.splice(0, limit);
  }

  public size(): number {
    return this.queue.length;
  }

  public clear(): void {
    this.queue.length = 0;
  }
}
