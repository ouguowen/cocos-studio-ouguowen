export interface ExperimentOverrideRecord {
  readonly experimentId: string;
  readonly subjectId: string;
  readonly variantId: string;
  readonly reason: string;
  readonly updatedAtMs: number;
}

export class ExperimentControlPanel {
  private readonly overrides = new Map<string, ExperimentOverrideRecord>();

  public setOverride(record: ExperimentOverrideRecord): ExperimentOverrideRecord {
    this.overrides.set(this.buildMapKey(record.experimentId, record.subjectId), record);
    return { ...record };
  }

  public clearOverride(experimentId: string, subjectId: string): void {
    this.overrides.delete(this.buildMapKey(experimentId, subjectId));
  }

  public getVariant(experimentId: string, subjectId: string): string | null {
    const record = this.overrides.get(this.buildMapKey(experimentId, subjectId));
    return record ? record.variantId : null;
  }

  public listOverrides(experimentId: string): readonly ExperimentOverrideRecord[] {
    return Array.from(this.overrides.values())
      .filter((record) => record.experimentId === experimentId)
      .map((record) => ({ ...record }));
  }

  private buildMapKey(experimentId: string, subjectId: string): string {
    return `${experimentId}::${subjectId}`;
  }
}
