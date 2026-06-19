export type RemoteConfigValue = string | number | boolean | null;

export interface RemoteConfigEntry {
  readonly key: string;
  value: RemoteConfigValue;
  version: number;
  updatedAtMs: number | null;
}

export class RemoteConfigStore {
  private readonly entries = new Map<string, RemoteConfigEntry>();

  public set(key: string, value: RemoteConfigValue, version: number, updatedAtMs: number): RemoteConfigEntry {
    const entry: RemoteConfigEntry = {
      key,
      value,
      version,
      updatedAtMs,
    };
    this.entries.set(key, entry);
    return entry;
  }

  public get(key: string): RemoteConfigValue | null {
    return this.entries.get(key)?.value ?? null;
  }

  public getBoolean(key: string, fallback = false): boolean {
    const value = this.get(key);
    return typeof value === "boolean" ? value : fallback;
  }

  public getNumber(key: string, fallback = 0): number {
    const value = this.get(key);
    return typeof value === "number" ? value : fallback;
  }

  public getString(key: string, fallback = ""): string {
    const value = this.get(key);
    return typeof value === "string" ? value : fallback;
  }

  public createSnapshot(): readonly RemoteConfigEntry[] {
    return Array.from(this.entries.values()).map((entry) => ({ ...entry }));
  }
}
