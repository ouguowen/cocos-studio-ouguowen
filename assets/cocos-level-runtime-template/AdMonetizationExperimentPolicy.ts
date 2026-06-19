export interface AdExperimentRule {
  readonly experimentId: string;
  readonly placementId: string;
  readonly rolloutPercent: number;
  readonly variantA: string;
  readonly variantB: string;
}

export class AdMonetizationExperimentPolicy {
  public constructor(private readonly rules: readonly AdExperimentRule[]) {}

  public resolveVariant(experimentId: string, subjectId: string, placementId: string): string | null {
    const rule = this.rules.find(
      (candidate) =>
        candidate.experimentId === experimentId && candidate.placementId === placementId
    );
    if (!rule) {
      return null;
    }

    const bucket = this.computeBucket(`${experimentId}:${placementId}:${subjectId}`);
    return bucket < rule.rolloutPercent ? rule.variantB : rule.variantA;
  }

  private computeBucket(seed: string): number {
    let hash = 0;
    for (let index = 0; index < seed.length; index += 1) {
      hash = (hash * 33 + seed.charCodeAt(index)) >>> 0;
    }
    return hash % 100;
  }
}
