export interface ObjectPoolFactory<TItem> {
  create(): TItem;
  reset?(item: TItem): void;
  destroy?(item: TItem): void;
}

export class ObjectPool<TItem> {
  private readonly available: TItem[] = [];
  private readonly active = new Set<TItem>();

  public constructor(private readonly factory: ObjectPoolFactory<TItem>) {}

  public prewarm(count: number): void {
    for (let index = this.available.length; index < count; index += 1) {
      this.available.push(this.factory.create());
    }
  }

  public acquire(): TItem {
    const item = this.available.pop() ?? this.factory.create();
    this.active.add(item);
    return item;
  }

  public release(item: TItem): void {
    if (!this.active.has(item)) {
      throw new Error("[ObjectPool] Attempted to release an item that is not active.");
    }

    this.active.delete(item);
    this.factory.reset?.(item);
    this.available.push(item);
  }

  public releaseAll(): void {
    for (const item of Array.from(this.active)) {
      this.release(item);
    }
  }

  public clear(): void {
    for (const item of this.available) {
      this.factory.destroy?.(item);
    }
    for (const item of this.active) {
      this.factory.destroy?.(item);
    }
    this.available.length = 0;
    this.active.clear();
  }

  public getActiveCount(): number {
    return this.active.size;
  }

  public getAvailableCount(): number {
    return this.available.length;
  }
}
