export interface GrayReleaseRule {
  readonly featureId: string;
  readonly rolloutPercent: number;
  readonly allowedEnvironmentIds: readonly string[];
  readonly allowlistedSubjectIds: readonly string[];
}

export class GrayReleasePolicy {
  public constructor(private readonly rules: readonly GrayReleaseRule[]) {}

  public isEnabled(featureId: string, subjectId: string, environmentId: string): boolean {
    const rule = this.rules.find((candidate) => candidate.featureId === featureId);
    if (!rule) {
      return false;
    }

    if (!rule.allowedEnvironmentIds.includes(environmentId)) {
      return false;
    }

    if (rule.allowlistedSubjectIds.includes(subjectId)) {
      return true;
    }

    const bucket = this.computeBucket(featureId, subjectId);
    return bucket < rule.rolloutPercent;
  }

  private computeBucket(featureId: string, subjectId: string): number {
    const seed = `${featureId}:${subjectId}`;
    let hash = 0;
    for (let index = 0; index < seed.length; index += 1) {
      hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
    }
    return hash % 100;
  }
}
