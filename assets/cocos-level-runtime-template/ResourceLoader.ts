import type { ResourceId } from "./ResourceIds";
import type { ResourceManifest, ResourceManifestEntry } from "./ResourceManifest";

export interface ResourceBundleLoader<TAsset = unknown> {
  preload(entry: ResourceManifestEntry): Promise<void> | void;
  load(entry: ResourceManifestEntry): Promise<TAsset> | TAsset;
  release?(entry: ResourceManifestEntry, asset: TAsset): Promise<void> | void;
}

export class ResourceLoader<TAsset = unknown> {
  private readonly cache = new Map<ResourceId, TAsset>();

  public constructor(
    private readonly manifest: ResourceManifest,
    private readonly bundleLoader: ResourceBundleLoader<TAsset>
  ) {}

  public preload(resourceIds: readonly ResourceId[]): Promise<void> {
    return Promise.all(resourceIds.map((resourceId) => this.preloadOne(resourceId))).then(() => {
      return undefined;
    });
  }

  public async preloadByTag(tag: string): Promise<void> {
    const ids = this.manifest.getByTag(tag).map((entry) => entry.id);
    await this.preload(ids);
  }

  public async load(resourceId: ResourceId): Promise<TAsset> {
    const cached = this.cache.get(resourceId);
    if (cached) {
      return cached;
    }

    const entry = this.manifest.require(resourceId);
    const asset = await this.bundleLoader.load(entry);
    this.cache.set(resourceId, asset);
    return asset;
  }

  public getCached(resourceId: ResourceId): TAsset | null {
    return this.cache.get(resourceId) ?? null;
  }

  public async release(resourceId: ResourceId): Promise<void> {
    const cached = this.cache.get(resourceId);
    if (!cached) {
      return;
    }

    const entry = this.manifest.require(resourceId);
    await this.bundleLoader.release?.(entry, cached);
    this.cache.delete(resourceId);
  }

  public async clear(): Promise<void> {
    for (const resourceId of Array.from(this.cache.keys())) {
      await this.release(resourceId);
    }
  }

  private async preloadOne(resourceId: ResourceId): Promise<void> {
    const entry = this.manifest.require(resourceId);
    await this.bundleLoader.preload(entry);
  }
}
