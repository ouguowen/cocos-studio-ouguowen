import type { RemoteConfigValue } from "./RemoteConfigStore";

export interface HotfixOverrideEntry {
  readonly key: string;
  readonly value: RemoteConfigValue;
  readonly reason: string;
  readonly expiresAtMs: number | null;
}

export class HotfixOverrideStore {
  private readonly entries = new Map<string, HotfixOverrideEntry>();

  public set(entry: HotfixOverrideEntry): HotfixOverrideEntry {
    this.entries.set(entry.key, entry);
    return entry;
  }

  public get(key: string, nowMs: number): HotfixOverrideEntry | null {
    const entry = this.entries.get(key);
    if (!entry) {
      return null;
    }

    if (entry.expiresAtMs !== null && nowMs > entry.expiresAtMs) {
      this.entries.delete(key);
      return null;
    }

    return entry;
  }

  public clear(key: string): void {
    this.entries.delete(key);
  }

  public createSnapshot(nowMs: number): readonly HotfixOverrideEntry[] {
    return Array.from(this.entries.values()).filter((entry) => {
      return entry.expiresAtMs === null || nowMs <= entry.expiresAtMs;
    });
  }
}
