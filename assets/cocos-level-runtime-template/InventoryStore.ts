export interface InventoryEntry {
  readonly itemId: string;
  count: number;
}

export class InventoryStore {
  private readonly items = new Map<string, number>();

  public getCount(itemId: string): number {
    return this.items.get(itemId) ?? 0;
  }

  public has(itemId: string, count = 1): boolean {
    return this.getCount(itemId) >= count;
  }

  public add(itemId: string, count: number): number {
    if (count < 0) {
      throw new Error("[InventoryStore] add count must be non-negative.");
    }

    const next = this.getCount(itemId) + count;
    this.items.set(itemId, next);
    return next;
  }

  public remove(itemId: string, count: number): number {
    if (count < 0) {
      throw new Error("[InventoryStore] remove count must be non-negative.");
    }

    const current = this.getCount(itemId);
    if (current < count) {
      throw new Error(`[InventoryStore] Insufficient ${itemId}. Required ${count}, got ${current}.`);
    }

    const next = current - count;
    if (next === 0) {
      this.items.delete(itemId);
    } else {
      this.items.set(itemId, next);
    }
    return next;
  }

  public createSnapshot(): readonly InventoryEntry[] {
    return Array.from(this.items.entries()).map(([itemId, count]) => ({
      itemId,
      count,
    }));
  }
}
