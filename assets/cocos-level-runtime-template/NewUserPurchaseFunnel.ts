export interface NewUserPurchaseStage {
  readonly stageId: string;
  readonly reachedAtMs: number;
}

export class NewUserPurchaseFunnel {
  private readonly stages = new Map<string, NewUserPurchaseStage>();

  public markReached(stageId: string, reachedAtMs: number): NewUserPurchaseStage {
    const stage: NewUserPurchaseStage = {
      stageId,
      reachedAtMs,
    };
    this.stages.set(stageId, stage);
    return { ...stage };
  }

  public hasReached(stageId: string): boolean {
    return this.stages.has(stageId);
  }

  public listReached(): readonly NewUserPurchaseStage[] {
    return Array.from(this.stages.values())
      .sort((left, right) => left.reachedAtMs - right.reachedAtMs)
      .map((stage) => ({ ...stage }));
  }
}
