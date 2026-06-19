export interface FeatureFlagRule {
  readonly flagKey: string;
  readonly defaultValue: boolean;
  readonly requiredSegmentIds?: readonly string[];
  readonly blockedSegmentIds?: readonly string[];
}

export interface FeatureFlagContext {
  readonly segmentIds: readonly string[];
}

export class FeatureFlagEvaluator {
  public evaluate(rule: FeatureFlagRule, context: FeatureFlagContext): boolean {
    const segments = new Set(context.segmentIds);

    for (const blockedSegmentId of rule.blockedSegmentIds ?? []) {
      if (segments.has(blockedSegmentId)) {
        return false;
      }
    }

    const requiredSegmentIds = rule.requiredSegmentIds ?? [];
    if (requiredSegmentIds.length === 0) {
      return rule.defaultValue;
    }

    return requiredSegmentIds.every((segmentId) => segments.has(segmentId));
  }

  public evaluateAll(
    rules: readonly FeatureFlagRule[],
    context: FeatureFlagContext
  ): Readonly<Record<string, boolean>> {
    const result: Record<string, boolean> = {};
    for (const rule of rules) {
      result[rule.flagKey] = this.evaluate(rule, context);
    }
    return result;
  }
}
