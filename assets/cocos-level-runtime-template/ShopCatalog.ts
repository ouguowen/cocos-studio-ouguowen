export interface ShopPrice {
  readonly currencyId: string;
  readonly amount: number;
}

export interface ShopRewardEntry {
  readonly itemId: string;
  readonly count: number;
}

export interface ShopProduct {
  readonly productId: string;
  readonly tabId: string;
  readonly prices: readonly ShopPrice[];
  readonly rewards: readonly ShopRewardEntry[];
  readonly purchaseLimit?: number | null;
}

export class ShopCatalog {
  private readonly products = new Map<string, ShopProduct>();

  public constructor(products: readonly ShopProduct[] = []) {
    for (const product of products) {
      this.products.set(product.productId, product);
    }
  }

  public getProduct(productId: string): ShopProduct | null {
    return this.products.get(productId) ?? null;
  }

  public requireProduct(productId: string): ShopProduct {
    const product = this.getProduct(productId);
    if (!product) {
      throw new Error(`[ShopCatalog] Missing product: ${productId}`);
    }
    return product;
  }

  public getProductsByTab(tabId: string): readonly ShopProduct[] {
    return Array.from(this.products.values()).filter((product) => product.tabId === tabId);
  }
}
