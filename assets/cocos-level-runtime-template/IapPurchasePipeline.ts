import type { CharacterRoster } from "./CharacterRoster";
import type { CurrencyWallet } from "./CurrencyWallet";
import type { IapCatalog } from "./IapCatalog";
import type { InventoryStore } from "./InventoryStore";
import type { OrderLedger } from "./OrderLedger";

export interface IapFulfillmentResult {
  readonly orderId: string;
  readonly productId: string;
  readonly grantedCurrencyIds: readonly string[];
  readonly grantedItemIds: readonly string[];
  readonly unlockedIds: readonly string[];
}

export class IapPurchasePipeline {
  public constructor(
    private readonly catalog: IapCatalog,
    private readonly orderLedger: OrderLedger,
    private readonly wallet: CurrencyWallet,
    private readonly inventoryStore: InventoryStore,
    private readonly characterRoster?: CharacterRoster
  ) {}

  public createOrder(orderId: string, productId: string, createdAtMs: number): void {
    this.catalog.requireProduct(productId);
    this.orderLedger.createPendingOrder(orderId, productId, createdAtMs);
  }

  public fulfillPaidOrder(
    orderId: string,
    providerOrderId: string,
    paidAtMs: number
  ): IapFulfillmentResult {
    const paidOrder = this.orderLedger.markPaid(orderId, providerOrderId, paidAtMs);
    const product = this.catalog.requireProduct(paidOrder.productId);

    const grantedCurrencyIds: string[] = [];
    const grantedItemIds: string[] = [];
    const unlockedIds: string[] = [];

    for (const reward of product.rewards) {
      if (reward.currencyId && reward.currencyAmount) {
        this.wallet.credit(
          reward.currencyId,
          reward.currencyAmount,
          `iap:${product.productId}`,
          paidAtMs
        );
        grantedCurrencyIds.push(reward.currencyId);
      }

      if (reward.itemId && reward.itemCount) {
        this.inventoryStore.add(reward.itemId, reward.itemCount);
        grantedItemIds.push(reward.itemId);
      }

      if (reward.unlockId) {
        this.characterRoster?.unlockCharacter(reward.unlockId);
        unlockedIds.push(reward.unlockId);
      }
    }

    this.orderLedger.markFulfilled(orderId, paidAtMs);
    return {
      orderId,
      productId: product.productId,
      grantedCurrencyIds,
      grantedItemIds,
      unlockedIds,
    };
  }
}
