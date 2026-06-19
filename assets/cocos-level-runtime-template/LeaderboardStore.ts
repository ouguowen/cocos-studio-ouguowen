export interface LeaderboardEntry {
  readonly userId: string;
  score: number;
  updatedAtMs: number;
}

export interface LeaderboardSnapshot {
  readonly leaderboardId: string;
  readonly entries: readonly LeaderboardEntry[];
}

export class LeaderboardStore {
  private readonly boards = new Map<string, LeaderboardEntry[]>();

  public submitScore(
    leaderboardId: string,
    userId: string,
    score: number,
    updatedAtMs: number
  ): LeaderboardSnapshot {
    const entries = this.boards.get(leaderboardId) ?? [];
    const existing = entries.find((entry) => entry.userId === userId);
    if (existing) {
      if (score > existing.score) {
        existing.score = score;
        existing.updatedAtMs = updatedAtMs;
      }
    } else {
      entries.push({ userId, score, updatedAtMs });
    }

    entries.sort((left, right) => right.score - left.score || left.updatedAtMs - right.updatedAtMs);
    this.boards.set(leaderboardId, entries);
    return this.getSnapshot(leaderboardId);
  }

  public getTop(leaderboardId: string, limit: number): readonly LeaderboardEntry[] {
    return (this.boards.get(leaderboardId) ?? []).slice(0, limit).map((entry) => ({ ...entry }));
  }

  public getSnapshot(leaderboardId: string): LeaderboardSnapshot {
    return {
      leaderboardId,
      entries: (this.boards.get(leaderboardId) ?? []).map((entry) => ({ ...entry })),
    };
  }
}
