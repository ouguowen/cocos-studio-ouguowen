export type EventVisibility = "hidden" | "preview" | "active" | "ended";

export interface EventCalendarRecord {
  readonly eventId: string;
  readonly eventType: string;
  readonly title: string;
  readonly previewStartsAtMs: number | null;
  readonly activeStartsAtMs: number;
  readonly activeEndsAtMs: number;
  readonly rewardGroupId: string | null;
}

export class EventCalendarStore {
  private readonly events = new Map<string, EventCalendarRecord>();

  public upsert(record: EventCalendarRecord): EventCalendarRecord {
    this.events.set(record.eventId, record);
    return { ...record };
  }

  public getVisibility(eventId: string, nowMs: number): EventVisibility {
    const record = this.requireRecord(eventId);
    if (nowMs > record.activeEndsAtMs) {
      return "ended";
    }

    if (nowMs >= record.activeStartsAtMs) {
      return "active";
    }

    if (record.previewStartsAtMs !== null && nowMs >= record.previewStartsAtMs) {
      return "preview";
    }

    return "hidden";
  }

  public listActive(nowMs: number): readonly EventCalendarRecord[] {
    return Array.from(this.events.values())
      .filter((record) => this.getVisibility(record.eventId, nowMs) === "active")
      .map((record) => ({ ...record }));
  }

  private requireRecord(eventId: string): EventCalendarRecord {
    const record = this.events.get(eventId);
    if (!record) {
      throw new Error(`[EventCalendarStore] Missing event: ${eventId}`);
    }
    return record;
  }
}
