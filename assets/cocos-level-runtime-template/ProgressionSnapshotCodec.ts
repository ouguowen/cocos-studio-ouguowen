import type { GuideProgressSnapshot } from "./GuideProgressStore";
import type { MetaProgressSnapshot } from "./MetaProgressionStore";
import type { ProgressionSaveState } from "./ProgressionSaveRepository";

export class ProgressionSnapshotCodec {
  public encode(state: ProgressionSaveState): string {
    return JSON.stringify(state, null, 2);
  }

  public decode(json: string): ProgressionSaveState {
    const parsed = JSON.parse(json) as Partial<ProgressionSaveState>;
    return {
      version: typeof parsed.version === "number" ? parsed.version : 1,
      savedAtMs: typeof parsed.savedAtMs === "number" ? parsed.savedAtMs : Date.now(),
      metaProgress: this.normalizeMetaProgress(parsed.metaProgress),
      guideProgress: this.normalizeGuideProgress(parsed.guideProgress),
    };
  }

  private normalizeMetaProgress(value: Partial<MetaProgressSnapshot> | undefined): MetaProgressSnapshot {
    return {
      unlockedLevelIds: Array.isArray(value?.unlockedLevelIds) ? value.unlockedLevelIds : [],
      clearedLevelIds: Array.isArray(value?.clearedLevelIds) ? value.clearedLevelIds : [],
      levelRecords: Array.isArray(value?.levelRecords) ? value.levelRecords : [],
    };
  }

  private normalizeGuideProgress(
    value: Partial<GuideProgressSnapshot> | undefined
  ): GuideProgressSnapshot {
    return {
      records: Array.isArray(value?.records) ? value.records : [],
      completedGuideIds: Array.isArray(value?.completedGuideIds) ? value.completedGuideIds : [],
      dismissedGuideIds: Array.isArray(value?.dismissedGuideIds) ? value.dismissedGuideIds : [],
    };
  }
}
