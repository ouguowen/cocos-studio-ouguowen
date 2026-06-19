import type { FeatureFlagContext, FeatureFlagRule } from "./FeatureFlagEvaluator";
import { FeatureFlagEvaluator } from "./FeatureFlagEvaluator";
import type { HotfixOverrideStore } from "./HotfixOverrideStore";
import type { RemoteConfigStore, RemoteConfigValue } from "./RemoteConfigStore";

export class LiveOpsSwitchboard {
  private readonly featureFlagEvaluator = new FeatureFlagEvaluator();

  public constructor(
    private readonly remoteConfigStore: RemoteConfigStore,
    private readonly hotfixOverrideStore: HotfixOverrideStore
  ) {}

  public getValue(key: string, nowMs: number): RemoteConfigValue | null {
    const hotfix = this.hotfixOverrideStore.get(key, nowMs);
    if (hotfix) {
      return hotfix.value;
    }
    return this.remoteConfigStore.get(key);
  }

  public getBoolean(key: string, nowMs: number, fallback = false): boolean {
    const value = this.getValue(key, nowMs);
    return typeof value === "boolean" ? value : fallback;
  }

  public evaluateFlags(
    rules: readonly FeatureFlagRule[],
    context: FeatureFlagContext
  ): Readonly<Record<string, boolean>> {
    return this.featureFlagEvaluator.evaluateAll(rules, context);
  }
}
