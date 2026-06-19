import type { GuideProgressSnapshot } from "./GuideProgressStore";
import type { MetaProgressSnapshot } from "./MetaProgressionStore";

export interface ProgressionSaveState {
  readonly version: number;
  readonly savedAtMs: number;
  readonly metaProgress: MetaProgressSnapshot;
  readonly guideProgress: GuideProgressSnapshot;
}

export interface ProgressionSaveRepository {
  load(): Promise<ProgressionSaveState | null> | ProgressionSaveState | null;
  save(state: ProgressionSaveState): Promise<void> | void;
  clear(): Promise<void> | void;
}

export class InMemoryProgressionSaveRepository implements ProgressionSaveRepository {
  private state: ProgressionSaveState | null = null;

  public load(): ProgressionSaveState | null {
    return this.state;
  }

  public save(state: ProgressionSaveState): void {
    this.state = cloneState(state);
  }

  public clear(): void {
    this.state = null;
  }
}

function cloneState(state: ProgressionSaveState): ProgressionSaveState {
  return {
    version: state.version,
    savedAtMs: state.savedAtMs,
    metaProgress: {
      unlockedLevelIds: [...state.metaProgress.unlockedLevelIds],
      clearedLevelIds: [...state.metaProgress.clearedLevelIds],
      levelRecords: state.metaProgress.levelRecords.map((record) => ({
        ...record,
      })),
    },
    guideProgress: {
      completedGuideIds: [...state.guideProgress.completedGuideIds],
      dismissedGuideIds: [...state.guideProgress.dismissedGuideIds],
      records: state.guideProgress.records.map((record) => ({
        ...record,
        completedStepIds: [...record.completedStepIds],
      })),
    },
  };
}
