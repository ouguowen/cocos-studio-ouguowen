export interface SquadSeasonRecord {
  readonly seasonId: string;
  readonly squadId: string;
  readonly startedAtMs: number;
  readonly endsAtMs: number;
  score: number;
  rank: number | null;
  rewardsClaimed: boolean;
}

export class SquadSeasonTracker {
  private readonly records = new Map<string, SquadSeasonRecord>();

  public upsert(record: SquadSeasonRecord): SquadSeasonRecord {
    this.records.set(this.buildKey(record.seasonId, record.squadId), record);
    return { ...record };
  }

  public addScore(seasonId: string, squadId: string, scoreDelta: number): SquadSeasonRecord {
    const record = this.requireRecord(seasonId, squadId);
    record.score += scoreDelta;
    return { ...record };
  }

  public markRewardsClaimed(seasonId: string, squadId: string): SquadSeasonRecord {
    const record = this.requireRecord(seasonId, squadId);
    record.rewardsClaimed = true;
    return { ...record };
  }

  private requireRecord(seasonId: string, squadId: string): SquadSeasonRecord {
    const record = this.records.get(this.buildKey(seasonId, squadId));
    if (!record) {
      throw new Error(`[SquadSeasonTracker] Missing squad season record: ${seasonId}/${squadId}`);
    }
    return record;
  }

  private buildKey(seasonId: string, squadId: string): string {
    return `${seasonId}:${squadId}`;
  }
}
