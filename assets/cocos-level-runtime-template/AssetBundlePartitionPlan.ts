export interface AssetBundlePartition {
  readonly bundleId: string;
  readonly purpose: "boot" | "core" | "level" | "activity" | "hd-art" | "audio";
  readonly assetIds: readonly string[];
  readonly preload: boolean;
}

export class AssetBundlePartitionPlan {
  private readonly bundles = new Map<string, AssetBundlePartition>();

  public upsert(bundle: AssetBundlePartition): AssetBundlePartition {
    this.bundles.set(bundle.bundleId, bundle);
    return { ...bundle, assetIds: [...bundle.assetIds] };
  }

  public listPreloadBundles(): readonly AssetBundlePartition[] {
    return Array.from(this.bundles.values())
      .filter((bundle) => bundle.preload)
      .map((bundle) => ({ ...bundle, assetIds: [...bundle.assetIds] }));
  }

  public findBundleForAsset(assetId: string): AssetBundlePartition | null {
    for (const bundle of this.bundles.values()) {
      if (bundle.assetIds.includes(assetId)) {
        return { ...bundle, assetIds: [...bundle.assetIds] };
      }
    }
    return null;
  }
}
