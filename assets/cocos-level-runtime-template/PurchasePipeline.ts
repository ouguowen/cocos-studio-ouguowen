import type { CurrencyWallet } from "./CurrencyWallet";
import type { InventoryStore } from "./InventoryStore";
import type { ShopCatalog } from "./ShopCatalog";

export interface PurchaseRecord {
  readonly productId: string;
  readonly purchaseCount: number;
}

export interface PurchaseResult {
  readonly productId: string;
  readonly purchasedAtMs: number;
  readonly grantedItemIds: readonly string[];
}

export class PurchasePipeline {
  private readonly purchaseCounts = new Map<string, number>();

  public constructor(
    private readonly shopCatalog: ShopCatalog,
    private readonly wallet: CurrencyWallet,
    private readonly inventoryStore: InventoryStore
  ) {}

  public getPurchaseCount(productId: string): number {
    return this.purchaseCounts.get(productId) ?? 0;
  }

  public purchase(productId: string, nowMs: number): PurchaseResult {
    const product = this.shopCatalog.requireProduct(productId);
    const purchasedCount = this.getPurchaseCount(productId);

    if (product.purchaseLimit !== undefined && product.purchaseLimit !== null) {
      if (purchasedCount >= product.purchaseLimit) {
        throw new Error(`[PurchasePipeline] Purchase limit reached for ${productId}.`);
      }
    }

    for (const price of product.prices) {
      if (!this.wallet.hasEnough(price.currencyId, price.amount)) {
        throw new Error(`[PurchasePipeline] Insufficient currency ${price.currencyId} for ${productId}.`);
      }
    }

    for (const price of product.prices) {
      this.wallet.debit(price.currencyId, price.amount, `shop:${productId}`, nowMs);
    }

    const grantedItemIds: string[] = [];
    for (const reward of product.rewards) {
      this.inventoryStore.add(reward.itemId, reward.count);
      grantedItemIds.push(reward.itemId);
    }

    this.purchaseCounts.set(productId, purchasedCount + 1);
    return {
      productId,
      purchasedAtMs: nowMs,
      grantedItemIds,
    };
  }

  public createSnapshot(): readonly PurchaseRecord[] {
    return Array.from(this.purchaseCounts.entries()).map(([productId, purchaseCount]) => ({
      productId,
      purchaseCount,
    }));
  }
}
