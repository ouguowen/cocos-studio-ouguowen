import type { AdPlacementRegistry } from "./AdPlacementRegistry";
import type { CurrencyWallet } from "./CurrencyWallet";
import type { InventoryStore } from "./InventoryStore";

export interface RewardedAdGrantResult {
  readonly placementId: string;
  readonly grantedCurrencyIds: readonly string[];
  readonly grantedItemIds: readonly string[];
  readonly viewedAtMs: number;
}

export class RewardedAdPipeline {
  public constructor(
    private readonly placementRegistry: AdPlacementRegistry,
    private readonly wallet: CurrencyWallet,
    private readonly inventoryStore: InventoryStore
  ) {}

  public grantReward(placementId: string, viewedAtMs: number): RewardedAdGrantResult {
    if (!this.placementRegistry.canView(placementId, viewedAtMs)) {
      throw new Error(`[RewardedAdPipeline] Placement is not available: ${placementId}`);
    }

    const definition = this.placementRegistry.requireDefinition(placementId);
    const grantedCurrencyIds: string[] = [];
    const grantedItemIds: string[] = [];

    for (const reward of definition.rewards) {
      if (reward.currencyId && reward.currencyAmount) {
        this.wallet.credit(
          reward.currencyId,
          reward.currencyAmount,
          `rewarded-ad:${placementId}`,
          viewedAtMs
        );
        grantedCurrencyIds.push(reward.currencyId);
      }

      if (reward.itemId && reward.itemCount) {
        this.inventoryStore.add(reward.itemId, reward.itemCount);
        grantedItemIds.push(reward.itemId);
      }
    }

    this.placementRegistry.markViewed(placementId, viewedAtMs);
    return {
      placementId,
      grantedCurrencyIds,
      grantedItemIds,
      viewedAtMs,
    };
  }
}
