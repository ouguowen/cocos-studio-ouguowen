export interface FunnelDefinition {
  readonly funnelId: string;
  readonly stepIds: readonly string[];
}

export interface FunnelProgressSnapshot {
  readonly funnelId: string;
  readonly completedStepIds: readonly string[];
  readonly completed: boolean;
}

export class FunnelTracker {
  private readonly progress = new Map<string, Set<string>>();

  public completeStep(funnel: FunnelDefinition, stepId: string): FunnelProgressSnapshot {
    if (!funnel.stepIds.includes(stepId)) {
      throw new Error(`[FunnelTracker] Unknown step ${stepId} in ${funnel.funnelId}.`);
    }

    const completed = this.progress.get(funnel.funnelId) ?? new Set<string>();
    completed.add(stepId);
    this.progress.set(funnel.funnelId, completed);
    return this.getSnapshot(funnel);
  }

  public getSnapshot(funnel: FunnelDefinition): FunnelProgressSnapshot {
    const completed = this.progress.get(funnel.funnelId) ?? new Set<string>();
    return {
      funnelId: funnel.funnelId,
      completedStepIds: Array.from(completed),
      completed: funnel.stepIds.every((stepId) => completed.has(stepId)),
    };
  }
}
