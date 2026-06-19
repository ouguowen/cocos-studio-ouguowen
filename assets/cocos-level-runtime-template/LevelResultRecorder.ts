import type { LevelRunStatus, RewardResult } from "./LevelTypes";

export interface LevelResultRecord {
  readonly levelId: string;
  readonly status: Extract<LevelRunStatus, "completed" | "failed">;
  readonly startedAtMs: number | null;
  readonly finishedAtMs: number;
  readonly clearDurationMs: number | null;
  readonly waveReached: number;
  readonly activeEnemyCountAtEnd: number;
  readonly achievedStarCount: number;
  readonly rewardResult: RewardResult | null;
  readonly failureReason: string | null;
}

export interface LevelResultRepository {
  save(record: LevelResultRecord): Promise<void> | void;
  getRecent(limit: number): Promise<readonly LevelResultRecord[]> | readonly LevelResultRecord[];
}

export class InMemoryLevelResultRepository implements LevelResultRepository {
  private readonly records: LevelResultRecord[] = [];

  public save(record: LevelResultRecord): void {
    this.records.unshift(record);
  }

  public getRecent(limit: number): readonly LevelResultRecord[] {
    return this.records.slice(0, limit);
  }
}
