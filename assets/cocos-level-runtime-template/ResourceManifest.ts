import type { ResourceAssetKind, ResourceId } from "./ResourceIds";

export interface ResourceManifestEntry<TResourceId extends ResourceId = ResourceId> {
  readonly id: TResourceId;
  readonly kind: ResourceAssetKind;
  readonly bundle: string;
  readonly path: string;
  readonly preload?: boolean;
  readonly tags?: readonly string[];
}

export class ResourceManifest {
  private readonly entries = new Map<ResourceId, ResourceManifestEntry>();
  private readonly entriesByTag = new Map<string, ResourceManifestEntry[]>();

  public constructor(entries: readonly ResourceManifestEntry[] = []) {
    this.registerMany(entries);
  }

  public register(entry: ResourceManifestEntry): void {
    const existing = this.entries.get(entry.id);
    if (existing) {
      this.unregister(entry.id);
    }

    this.entries.set(entry.id, entry);
    for (const tag of entry.tags ?? []) {
      const list = this.entriesByTag.get(tag) ?? [];
      list.push(entry);
      this.entriesByTag.set(tag, list);
    }
  }

  public registerMany(entries: readonly ResourceManifestEntry[]): void {
    for (const entry of entries) {
      this.register(entry);
    }
  }

  public has(resourceId: ResourceId): boolean {
    return this.entries.has(resourceId);
  }

  public get(resourceId: ResourceId): ResourceManifestEntry | null {
    return this.entries.get(resourceId) ?? null;
  }

  public require(resourceId: ResourceId): ResourceManifestEntry {
    const entry = this.get(resourceId);
    if (!entry) {
      throw new Error(`[ResourceManifest] Missing resource: ${resourceId}`);
    }
    return entry;
  }

  public getByTag(tag: string): readonly ResourceManifestEntry[] {
    return this.entriesByTag.get(tag) ?? [];
  }

  public getPreloadEntries(): readonly ResourceManifestEntry[] {
    return Array.from(this.entries.values()).filter((entry) => entry.preload);
  }

  public getBundleEntries(bundle: string): readonly ResourceManifestEntry[] {
    return Array.from(this.entries.values()).filter((entry) => entry.bundle === bundle);
  }

  public unregister(resourceId: ResourceId): void {
    const entry = this.entries.get(resourceId);
    if (!entry) {
      return;
    }

    this.entries.delete(resourceId);
    for (const tag of entry.tags ?? []) {
      const list = this.entriesByTag.get(tag);
      if (!list) {
        continue;
      }

      const next = list.filter((candidate) => candidate.id !== resourceId);
      if (next.length === 0) {
        this.entriesByTag.delete(tag);
      } else {
        this.entriesByTag.set(tag, next);
      }
    }
  }

  public clear(): void {
    this.entries.clear();
    this.entriesByTag.clear();
  }
}
