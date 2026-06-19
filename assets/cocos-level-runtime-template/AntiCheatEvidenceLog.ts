export interface AntiCheatEvidenceRecord {
  readonly evidenceId: string;
  readonly playerId: string;
  readonly ruleId: string;
  readonly capturedAtMs: number;
  readonly severity: "low" | "medium" | "high" | "critical";
  readonly summary: string;
  readonly payload: Readonly<Record<string, string | number | boolean | null>>;
}

export class AntiCheatEvidenceLog {
  private readonly evidence = new Map<string, AntiCheatEvidenceRecord>();

  public append(record: AntiCheatEvidenceRecord): AntiCheatEvidenceRecord {
    this.evidence.set(record.evidenceId, record);
    return { ...record, payload: { ...record.payload } };
  }

  public listByPlayer(playerId: string): readonly AntiCheatEvidenceRecord[] {
    return Array.from(this.evidence.values())
      .filter((record) => record.playerId === playerId)
      .sort((left, right) => left.capturedAtMs - right.capturedAtMs)
      .map((record) => ({ ...record, payload: { ...record.payload } }));
  }

  public listByRule(ruleId: string): readonly AntiCheatEvidenceRecord[] {
    return Array.from(this.evidence.values())
      .filter((record) => record.ruleId === ruleId)
      .map((record) => ({ ...record, payload: { ...record.payload } }));
  }
}
