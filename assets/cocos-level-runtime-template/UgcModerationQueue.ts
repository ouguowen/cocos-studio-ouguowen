export type UgcModerationStatus = "pending" | "approved" | "rejected" | "escalated";

export interface UgcModerationRecord {
  readonly itemId: string;
  readonly itemType: string;
  readonly submittedByPlayerId: string;
  readonly submittedAtMs: number;
  readonly evidenceRef: string | null;
  status: UgcModerationStatus;
  resolutionNote: string | null;
}

export class UgcModerationQueue {
  private readonly records = new Map<string, UgcModerationRecord>();

  public enqueue(record: UgcModerationRecord): UgcModerationRecord {
    this.records.set(record.itemId, record);
    return { ...record };
  }

  public resolve(itemId: string, status: "approved" | "rejected" | "escalated", note: string | null): UgcModerationRecord {
    const record = this.requireRecord(itemId);
    record.status = status;
    record.resolutionNote = note;
    return { ...record };
  }

  public listPending(): readonly UgcModerationRecord[] {
    return Array.from(this.records.values())
      .filter((record) => record.status === "pending")
      .map((record) => ({ ...record }));
  }

  private requireRecord(itemId: string): UgcModerationRecord {
    const record = this.records.get(itemId);
    if (!record) {
      throw new Error(`[UgcModerationQueue] Missing UGC moderation item: ${itemId}`);
    }
    return record;
  }
}
