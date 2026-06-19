import type { MetaProgressSnapshot } from "./MetaProgressionStore";

export interface ChapterUnlockRule {
  readonly chapterId: string;
  readonly requiredLevelIds?: readonly string[];
  readonly requiredClearedLevelCount?: number;
  readonly requiredTotalStars?: number;
  readonly dependsOnChapterId?: string | null;
}

export interface ChapterUnlockResult {
  readonly chapterId: string;
  readonly unlocked: boolean;
  readonly missingRequirements: readonly string[];
}

export class ChapterUnlockPolicy {
  public evaluate(
    snapshot: MetaProgressSnapshot,
    rule: ChapterUnlockRule,
    chapterCompletionMap: Readonly<Record<string, boolean>> = {}
  ): ChapterUnlockResult {
    const missingRequirements: string[] = [];
    const clearedSet = new Set(snapshot.clearedLevelIds);
    const requiredLevelIds = rule.requiredLevelIds ?? [];

    for (const levelId of requiredLevelIds) {
      if (!clearedSet.has(levelId)) {
        missingRequirements.push(`level:${levelId}`);
      }
    }

    if ((rule.requiredClearedLevelCount ?? 0) > snapshot.clearedLevelIds.length) {
      missingRequirements.push(`clear-count:${rule.requiredClearedLevelCount}`);
    }

    const totalStars = snapshot.levelRecords.reduce((sum, record) => sum + record.bestStarCount, 0);
    if ((rule.requiredTotalStars ?? 0) > totalStars) {
      missingRequirements.push(`stars:${rule.requiredTotalStars}`);
    }

    if (rule.dependsOnChapterId && !chapterCompletionMap[rule.dependsOnChapterId]) {
      missingRequirements.push(`chapter:${rule.dependsOnChapterId}`);
    }

    return {
      chapterId: rule.chapterId,
      unlocked: missingRequirements.length === 0,
      missingRequirements,
    };
  }

  public evaluateAll(
    snapshot: MetaProgressSnapshot,
    rules: readonly ChapterUnlockRule[],
    chapterCompletionMap: Readonly<Record<string, boolean>> = {}
  ): readonly ChapterUnlockResult[] {
    return rules.map((rule) => this.evaluate(snapshot, rule, chapterCompletionMap));
  }
}
