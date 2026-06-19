export interface RecallCampaignRecord {
  readonly campaignId: string;
  readonly playerId: string;
  readonly eligibleAtMs: number;
  readonly expiresAtMs: number;
  enteredAtMs: number | null;
  rewardClaimed: boolean;
}

export class RecallCampaignTracker {
  private readonly records = new Map<string, RecallCampaignRecord>();

  public upsert(record: RecallCampaignRecord): RecallCampaignRecord {
    this.records.set(this.buildKey(record.campaignId, record.playerId), record);
    return { ...record };
  }

  public enter(campaignId: string, playerId: string, enteredAtMs: number): RecallCampaignRecord {
    const record = this.requireRecord(campaignId, playerId);
    record.enteredAtMs = enteredAtMs;
    return { ...record };
  }

  public markRewardClaimed(campaignId: string, playerId: string): RecallCampaignRecord {
    const record = this.requireRecord(campaignId, playerId);
    record.rewardClaimed = true;
    return { ...record };
  }

  private requireRecord(campaignId: string, playerId: string): RecallCampaignRecord {
    const record = this.records.get(this.buildKey(campaignId, playerId));
    if (!record) {
      throw new Error(`[RecallCampaignTracker] Missing recall campaign: ${campaignId}/${playerId}`);
    }
    return record;
  }

  private buildKey(campaignId: string, playerId: string): string {
    return `${campaignId}:${playerId}`;
  }
}
