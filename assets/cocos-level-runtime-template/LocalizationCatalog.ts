export interface LocalizedEntry {
  readonly key: string;
  readonly locale: string;
  readonly value: string;
}

export class LocalizationCatalog {
  private readonly values = new Map<string, string>();

  public upsert(entry: LocalizedEntry): LocalizedEntry {
    this.values.set(this.buildMapKey(entry.key, entry.locale), entry.value);
    return { ...entry };
  }

  public translate(key: string, locale: string, fallbackLocale: string | null = null): string {
    const direct = this.values.get(this.buildMapKey(key, locale));
    if (direct !== undefined) {
      return direct;
    }

    if (fallbackLocale !== null) {
      const fallback = this.values.get(this.buildMapKey(key, fallbackLocale));
      if (fallback !== undefined) {
        return fallback;
      }
    }

    throw new Error(`[LocalizationCatalog] Missing translation: ${key} (${locale})`);
  }

  public has(key: string, locale: string): boolean {
    return this.values.has(this.buildMapKey(key, locale));
  }

  private buildMapKey(key: string, locale: string): string {
    return `${locale}::${key}`;
  }
}
