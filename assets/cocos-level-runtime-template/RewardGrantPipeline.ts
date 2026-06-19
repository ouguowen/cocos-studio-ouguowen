import type { LevelProgressRecord, MetaProgressionStore } from "./MetaProgressionStore";
import type { RewardResult } from "./LevelTypes";

export interface RewardGrantContext {
  readonly levelId: string;
  readonly completedAtMs: number;
  readonly achievedStarCount: number;
}

export interface GrantedRewardSummary {
  readonly levelId: string;
  readonly grantedGold: number;
  readonly grantedExp: number;
  readonly grantedDropGroupId: string | null;
  readonly grantedRewardIds: readonly string[];
  readonly levelRecord: LevelProgressRecord;
}

export interface RewardGrantTarget {
  addGold(value: number): Promise<void> | void;
  addExp(value: number): Promise<void> | void;
  grantRewardById(rewardId: string): Promise<void> | void;
  grantDropGroup(dropGroupId: string): Promise<void> | void;
}

export class RewardGrantPipeline {
  public constructor(
    private readonly metaProgressionStore: MetaProgressionStore,
    private readonly rewardGrantTarget: RewardGrantTarget
  ) {}

  public async grantLevelCompletionRewards(
    rewardResult: RewardResult,
    context: RewardGrantContext
  ): Promise<GrantedRewardSummary> {
    await this.rewardGrantTarget.addGold(rewardResult.gold);
    await this.rewardGrantTarget.addExp(rewardResult.exp);

    const grantedRewardIds: string[] = [];
    if (rewardResult.firstClearRewardId) {
      await this.rewardGrantTarget.grantRewardById(rewardResult.firstClearRewardId);
      grantedRewardIds.push(rewardResult.firstClearRewardId);
    }

    for (const rewardId of rewardResult.starRewardIds) {
      await this.rewardGrantTarget.grantRewardById(rewardId);
      grantedRewardIds.push(rewardId);
    }

    if (rewardResult.dropGroupId) {
      await this.rewardGrantTarget.grantDropGroup(rewardResult.dropGroupId);
    }

    const levelRecord = this.metaProgressionStore.markLevelCompleted(
      context.levelId,
      context.completedAtMs,
      rewardResult,
      context.achievedStarCount
    );

    return {
      levelId: context.levelId,
      grantedGold: rewardResult.gold,
      grantedExp: rewardResult.exp,
      grantedDropGroupId: rewardResult.dropGroupId,
      grantedRewardIds,
      levelRecord,
    };
  }
}
