export interface PurchaseRecoveryRecord {
  readonly orderId: string;
  readonly productId: string;
  readonly providerOrderId: string | null;
  readonly createdAtMs: number;
  recovered: boolean;
  lastCheckedAtMs: number | null;
}

export class PurchaseRecoveryQueue {
  private readonly records = new Map<string, PurchaseRecoveryRecord>();

  public enqueue(record: PurchaseRecoveryRecord): PurchaseRecoveryRecord {
    this.records.set(record.orderId, record);
    return { ...record };
  }

  public markChecked(orderId: string, checkedAtMs: number): PurchaseRecoveryRecord {
    const record = this.requireRecord(orderId);
    record.lastCheckedAtMs = checkedAtMs;
    return { ...record };
  }

  public markRecovered(orderId: string, checkedAtMs: number): PurchaseRecoveryRecord {
    const record = this.requireRecord(orderId);
    record.recovered = true;
    record.lastCheckedAtMs = checkedAtMs;
    return { ...record };
  }

  public listPending(): readonly PurchaseRecoveryRecord[] {
    return Array.from(this.records.values())
      .filter((record) => !record.recovered)
      .map((record) => ({ ...record }));
  }

  public createSnapshot(): readonly PurchaseRecoveryRecord[] {
    return Array.from(this.records.values()).map((record) => ({ ...record }));
  }

  private requireRecord(orderId: string): PurchaseRecoveryRecord {
    const record = this.records.get(orderId);
    if (!record) {
      throw new Error(`[PurchaseRecoveryQueue] Missing order recovery record: ${orderId}`);
    }
    return record;
  }
}
