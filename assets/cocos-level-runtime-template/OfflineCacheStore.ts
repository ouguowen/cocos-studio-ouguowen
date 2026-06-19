export interface OfflineCacheEntry<TValue = unknown> {
  readonly key: string;
  value: TValue;
  updatedAtMs: number;
  expiresAtMs: number | null;
}

export class OfflineCacheStore<TValue = unknown> {
  private readonly entries = new Map<string, OfflineCacheEntry<TValue>>();

  public set(key: string, value: TValue, updatedAtMs: number, expiresAtMs: number | null = null): OfflineCacheEntry<TValue> {
    const entry: OfflineCacheEntry<TValue> = {
      key,
      value,
      updatedAtMs,
      expiresAtMs,
    };
    this.entries.set(key, entry);
    return entry;
  }

  public get(key: string, nowMs: number): TValue | null {
    const entry = this.entries.get(key);
    if (!entry) {
      return null;
    }

    if (entry.expiresAtMs !== null && nowMs > entry.expiresAtMs) {
      this.entries.delete(key);
      return null;
    }

    return entry.value;
  }

  public delete(key: string): void {
    this.entries.delete(key);
  }

  public clear(): void {
    this.entries.clear();
  }

  public createSnapshot(nowMs: number): readonly OfflineCacheEntry<TValue>[] {
    return Array.from(this.entries.values())
      .filter((entry) => entry.expiresAtMs === null || nowMs <= entry.expiresAtMs)
      .map((entry) => ({ ...entry }));
  }
}
