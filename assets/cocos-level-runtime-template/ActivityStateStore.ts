export interface ActivityRecord {
  readonly activityId: string;
  opened: boolean;
  closed: boolean;
  claimedRewardIds: readonly string[];
  lastUpdatedAtMs: number | null;
}

export class ActivityStateStore {
  private readonly records = new Map<string, ActivityRecord>();

  public getRecord(activityId: string): ActivityRecord | null {
    return this.records.get(activityId) ?? null;
  }

  public openActivity(activityId: string, nowMs: number): ActivityRecord {
    const current = this.getRecord(activityId);
    return this.upsert({
      activityId,
      opened: true,
      closed: false,
      claimedRewardIds: current?.claimedRewardIds ?? [],
      lastUpdatedAtMs: nowMs,
    });
  }

  public closeActivity(activityId: string, nowMs: number): ActivityRecord {
    const current = this.getRecord(activityId);
    return this.upsert({
      activityId,
      opened: current?.opened ?? false,
      closed: true,
      claimedRewardIds: current?.claimedRewardIds ?? [],
      lastUpdatedAtMs: nowMs,
    });
  }

  public markRewardClaimed(activityId: string, rewardId: string, nowMs: number): ActivityRecord {
    const current = this.getRecord(activityId);
    const claimedRewardIds = new Set(current?.claimedRewardIds ?? []);
    claimedRewardIds.add(rewardId);
    return this.upsert({
      activityId,
      opened: current?.opened ?? true,
      closed: current?.closed ?? false,
      claimedRewardIds: Array.from(claimedRewardIds),
      lastUpdatedAtMs: nowMs,
    });
  }

  public createSnapshot(): readonly ActivityRecord[] {
    return Array.from(this.records.values()).map((record) => ({
      ...record,
      claimedRewardIds: [...record.claimedRewardIds],
    }));
  }

  private upsert(record: ActivityRecord): ActivityRecord {
    this.records.set(record.activityId, record);
    return record;
  }
}
