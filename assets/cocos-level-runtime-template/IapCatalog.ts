export interface IapReward {
  readonly currencyId?: string;
  readonly currencyAmount?: number;
  readonly itemId?: string;
  readonly itemCount?: number;
  readonly unlockId?: string;
}

export interface IapProductDefinition {
  readonly productId: string;
  readonly productType: "consumable" | "non-consumable" | "subscription";
  readonly storefrontId: string;
  readonly rewards: readonly IapReward[];
}

export class IapCatalog {
  private readonly products = new Map<string, IapProductDefinition>();

  public constructor(products: readonly IapProductDefinition[] = []) {
    for (const product of products) {
      this.products.set(product.productId, product);
    }
  }

  public getProduct(productId: string): IapProductDefinition | null {
    return this.products.get(productId) ?? null;
  }

  public requireProduct(productId: string): IapProductDefinition {
    const product = this.getProduct(productId);
    if (!product) {
      throw new Error(`[IapCatalog] Missing product: ${productId}`);
    }
    return product;
  }
}
