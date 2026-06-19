import type { CurrencyWallet } from "./CurrencyWallet";
import type { InventoryStore } from "./InventoryStore";
import type { DropResult } from "./DropTableResolver";
import { DropTableResolver } from "./DropTableResolver";
import type { GachaEntry, GachaPoolStore } from "./GachaPool";

export interface GachaDrawResult {
  readonly poolId: string;
  readonly rewards: readonly DropResult[];
  readonly paidCurrencyId: string;
  readonly paidAmount: number;
}

export class GachaPipeline {
  private readonly dropResolver: DropTableResolver;

  public constructor(
    private readonly poolStore: GachaPoolStore,
    private readonly wallet: CurrencyWallet,
    private readonly inventoryStore: InventoryStore,
    dropResolver?: DropTableResolver
  ) {
    this.dropResolver = dropResolver ?? new DropTableResolver();
  }

  public draw(poolId: string, nowMs: number): GachaDrawResult {
    const definition = this.poolStore.requireDefinition(poolId);
    this.wallet.debit(
      definition.costCurrencyId,
      definition.costAmount,
      `gacha:${poolId}`,
      nowMs
    );

    const rewards: DropResult[] = [];
    for (let index = 0; index < definition.drawCount; index += 1) {
      const reward = this.drawOne(poolId, definition.entries);
      this.inventoryStore.add(reward.rewardId, reward.count);
      rewards.push(reward);
    }

    return {
      poolId,
      rewards,
      paidCurrencyId: definition.costCurrencyId,
      paidAmount: definition.costAmount,
    };
  }

  private drawOne(poolId: string, entries: readonly GachaEntry[]): DropResult {
    const definition = this.poolStore.requireDefinition(poolId);
    const state = this.poolStore.getState(poolId);

    if (
      definition.pityThreshold &&
      definition.pityRewardId &&
      state.drawCountSinceTopReward + 1 >= definition.pityThreshold
    ) {
      this.poolStore.markDraw(poolId, true);
      return {
        rewardId: definition.pityRewardId,
        count: 1,
      };
    }

    const reward = this.dropResolver.rollOne(
      entries.map((entry) => ({
        rewardId: entry.rewardId,
        weight: entry.weight,
        minCount: 1,
        maxCount: 1,
      }))
    );
    const hitTopReward = reward.rewardId === definition.pityRewardId;
    this.poolStore.markDraw(poolId, hitTopReward);
    return reward;
  }
}
