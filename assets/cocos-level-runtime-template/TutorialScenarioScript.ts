export interface TutorialScenarioAction {
  readonly actionId: string;
  readonly actionType: string;
  readonly payload: Readonly<Record<string, string | number | boolean | null>>;
}

export interface TutorialScenarioRecord {
  readonly scenarioId: string;
  readonly chapterId: string;
  readonly actions: readonly TutorialScenarioAction[];
}

export class TutorialScenarioScript {
  private readonly scenarios = new Map<string, TutorialScenarioRecord>();

  public register(record: TutorialScenarioRecord): TutorialScenarioRecord {
    this.scenarios.set(record.scenarioId, record);
    return {
      ...record,
      actions: record.actions.map((action) => ({ ...action, payload: { ...action.payload } })),
    };
  }

  public getScenario(scenarioId: string): TutorialScenarioRecord {
    const record = this.scenarios.get(scenarioId);
    if (!record) {
      throw new Error(`[TutorialScenarioScript] Missing tutorial scenario: ${scenarioId}`);
    }

    return {
      ...record,
      actions: record.actions.map((action) => ({ ...action, payload: { ...action.payload } })),
    };
  }
}
