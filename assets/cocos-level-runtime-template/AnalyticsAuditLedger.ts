export type AnalyticsAuditStatus = "queued" | "sent" | "acknowledged" | "dropped";

export interface AnalyticsAuditRecord {
  readonly auditId: string;
  readonly eventName: string;
  readonly eventId: string;
  readonly createdAtMs: number;
  status: AnalyticsAuditStatus;
  readonly payloadChecksum: string;
  acknowledgedAtMs: number | null;
}

export class AnalyticsAuditLedger {
  private readonly records = new Map<string, AnalyticsAuditRecord>();

  public append(record: AnalyticsAuditRecord): AnalyticsAuditRecord {
    this.records.set(record.auditId, record);
    return { ...record };
  }

  public markStatus(
    auditId: string,
    status: AnalyticsAuditStatus,
    acknowledgedAtMs: number | null = null
  ): AnalyticsAuditRecord {
    const record = this.requireRecord(auditId);
    record.status = status;
    record.acknowledgedAtMs = acknowledgedAtMs;
    return { ...record };
  }

  public listByEventName(eventName: string): readonly AnalyticsAuditRecord[] {
    return Array.from(this.records.values())
      .filter((record) => record.eventName === eventName)
      .map((record) => ({ ...record }));
  }

  private requireRecord(auditId: string): AnalyticsAuditRecord {
    const record = this.records.get(auditId);
    if (!record) {
      throw new Error(`[AnalyticsAuditLedger] Missing audit record: ${auditId}`);
    }
    return record;
  }
}
