import type { RewardResult } from "./LevelTypes";

export interface LevelProgressRecord {
  readonly levelId: string;
  cleared: boolean;
  bestStarCount: number;
  clearCount: number;
  lastCompletedAtMs: number | null;
  lastRewardResult: RewardResult | null;
}

export interface MetaProgressSnapshot {
  readonly unlockedLevelIds: readonly string[];
  readonly clearedLevelIds: readonly string[];
  readonly levelRecords: readonly LevelProgressRecord[];
}

export class MetaProgressionStore {
  private readonly unlockedLevelIds = new Set<string>();
  private readonly levelRecords = new Map<string, LevelProgressRecord>();

  public unlockLevel(levelId: string): void {
    this.unlockedLevelIds.add(levelId);
  }

  public isLevelUnlocked(levelId: string): boolean {
    return this.unlockedLevelIds.has(levelId);
  }

  public getLevelRecord(levelId: string): LevelProgressRecord | null {
    return this.levelRecords.get(levelId) ?? null;
  }

  public hasClearedLevel(levelId: string): boolean {
    return this.levelRecords.get(levelId)?.cleared ?? false;
  }

  public markLevelCompleted(
    levelId: string,
    completedAtMs: number,
    rewardResult: RewardResult,
    achievedStarCount: number
  ): LevelProgressRecord {
    const previous = this.levelRecords.get(levelId);
    const next: LevelProgressRecord = {
      levelId,
      cleared: true,
      bestStarCount: Math.max(previous?.bestStarCount ?? 0, achievedStarCount),
      clearCount: (previous?.clearCount ?? 0) + 1,
      lastCompletedAtMs: completedAtMs,
      lastRewardResult: rewardResult,
    };
    this.unlockedLevelIds.add(levelId);
    this.levelRecords.set(levelId, next);
    return next;
  }

  public createSnapshot(): MetaProgressSnapshot {
    const levelRecords = Array.from(this.levelRecords.values());
    return {
      unlockedLevelIds: Array.from(this.unlockedLevelIds.values()),
      clearedLevelIds: levelRecords.filter((record) => record.cleared).map((record) => record.levelId),
      levelRecords,
    };
  }

  public restore(snapshot: MetaProgressSnapshot): void {
    this.unlockedLevelIds.clear();
    this.levelRecords.clear();

    for (const levelId of snapshot.unlockedLevelIds) {
      this.unlockedLevelIds.add(levelId);
    }

    for (const record of snapshot.levelRecords) {
      this.levelRecords.set(record.levelId, { ...record });
    }
  }

  public reset(): void {
    this.unlockedLevelIds.clear();
    this.levelRecords.clear();
  }
}
