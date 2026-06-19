export interface RiskFlagRecord {
  readonly userId: string;
  readonly flagKey: string;
  readonly severity: "low" | "medium" | "high";
  readonly reason: string;
  readonly createdAtMs: number;
  clearedAtMs: number | null;
}

export class RiskFlagRegistry {
  private readonly flags = new Map<string, RiskFlagRecord[]>();

  public add(record: RiskFlagRecord): RiskFlagRecord {
    const list = this.flags.get(record.userId) ?? [];
    list.push(record);
    this.flags.set(record.userId, list);
    return { ...record };
  }

  public clear(userId: string, flagKey: string, clearedAtMs: number): readonly RiskFlagRecord[] {
    const list = this.flags.get(userId) ?? [];
    for (const record of list) {
      if (record.flagKey === flagKey && record.clearedAtMs === null) {
        record.clearedAtMs = clearedAtMs;
      }
    }
    return list.map((record) => ({ ...record }));
  }

  public getActive(userId: string): readonly RiskFlagRecord[] {
    return (this.flags.get(userId) ?? [])
      .filter((record) => record.clearedAtMs === null)
      .map((record) => ({ ...record }));
  }

  public createSnapshot(): readonly RiskFlagRecord[] {
    return Array.from(this.flags.values()).flat().map((record) => ({ ...record }));
  }
}
