export interface GuideRecord {
  readonly guideId: string;
  completed: boolean;
  dismissed: boolean;
  completedStepIds: readonly string[];
  lastUpdatedAtMs: number | null;
}

export interface GuideProgressSnapshot {
  readonly records: readonly GuideRecord[];
  readonly completedGuideIds: readonly string[];
  readonly dismissedGuideIds: readonly string[];
}

export class GuideProgressStore {
  private readonly records = new Map<string, GuideRecord>();

  public getRecord(guideId: string): GuideRecord | null {
    return this.records.get(guideId) ?? null;
  }

  public isGuideCompleted(guideId: string): boolean {
    return this.records.get(guideId)?.completed ?? false;
  }

  public isGuideDismissed(guideId: string): boolean {
    return this.records.get(guideId)?.dismissed ?? false;
  }

  public completeStep(guideId: string, stepId: string, nowMs: number): GuideRecord {
    const current = this.getRecord(guideId);
    const completedStepIds = new Set(current?.completedStepIds ?? []);
    completedStepIds.add(stepId);
    return this.upsert({
      guideId,
      completed: current?.completed ?? false,
      dismissed: current?.dismissed ?? false,
      completedStepIds: Array.from(completedStepIds),
      lastUpdatedAtMs: nowMs,
    });
  }

  public markGuideCompleted(guideId: string, nowMs: number): GuideRecord {
    const current = this.getRecord(guideId);
    return this.upsert({
      guideId,
      completed: true,
      dismissed: current?.dismissed ?? false,
      completedStepIds: current?.completedStepIds ?? [],
      lastUpdatedAtMs: nowMs,
    });
  }

  public dismissGuide(guideId: string, nowMs: number): GuideRecord {
    const current = this.getRecord(guideId);
    return this.upsert({
      guideId,
      completed: current?.completed ?? false,
      dismissed: true,
      completedStepIds: current?.completedStepIds ?? [],
      lastUpdatedAtMs: nowMs,
    });
  }

  public createSnapshot(): GuideProgressSnapshot {
    const records = Array.from(this.records.values());
    return {
      records,
      completedGuideIds: records.filter((record) => record.completed).map((record) => record.guideId),
      dismissedGuideIds: records.filter((record) => record.dismissed).map((record) => record.guideId),
    };
  }

  public restore(snapshot: GuideProgressSnapshot): void {
    this.records.clear();
    for (const record of snapshot.records) {
      this.records.set(record.guideId, {
        ...record,
        completedStepIds: [...record.completedStepIds],
      });
    }
  }

  public reset(): void {
    this.records.clear();
  }

  private upsert(record: GuideRecord): GuideRecord {
    this.records.set(record.guideId, record);
    return record;
  }
}
