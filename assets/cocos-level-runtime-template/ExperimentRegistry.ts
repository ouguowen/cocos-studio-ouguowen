export interface ExperimentDefinition {
  readonly experimentId: string;
  readonly variants: readonly {
    readonly variantId: string;
    readonly weight: number;
  }[];
}

export interface ExperimentAssignment {
  readonly experimentId: string;
  readonly variantId: string;
  readonly bucket: number;
}

export class ExperimentRegistry {
  public assign(experiment: ExperimentDefinition, subjectId: string): ExperimentAssignment {
    if (experiment.variants.length === 0) {
      throw new Error(`[ExperimentRegistry] Experiment has no variants: ${experiment.experimentId}`);
    }

    const totalWeight = experiment.variants.reduce((sum, variant) => sum + variant.weight, 0);
    if (totalWeight <= 0) {
      throw new Error(`[ExperimentRegistry] Invalid total weight: ${experiment.experimentId}`);
    }

    const bucket = stableHash(`${experiment.experimentId}:${subjectId}`) % totalWeight;
    let cursor = 0;
    for (const variant of experiment.variants) {
      cursor += variant.weight;
      if (bucket < cursor) {
        return {
          experimentId: experiment.experimentId,
          variantId: variant.variantId,
          bucket,
        };
      }
    }

    const fallback = experiment.variants[experiment.variants.length - 1];
    return {
      experimentId: experiment.experimentId,
      variantId: fallback.variantId,
      bucket,
    };
  }
}

function stableHash(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}
