export interface DropEntry {
  readonly rewardId: string;
  readonly weight: number;
  readonly minCount: number;
  readonly maxCount: number;
}

export interface DropResult {
  readonly rewardId: string;
  readonly count: number;
}

export interface RandomSource {
  next(): number;
}

export class DefaultRandomSource implements RandomSource {
  public next(): number {
    return Math.random();
  }
}

export class DropTableResolver {
  public constructor(private readonly randomSource: RandomSource = new DefaultRandomSource()) {}

  public rollOne(entries: readonly DropEntry[]): DropResult {
    if (entries.length === 0) {
      throw new Error("[DropTableResolver] Drop table is empty.");
    }

    const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
    if (totalWeight <= 0) {
      throw new Error("[DropTableResolver] Total weight must be positive.");
    }

    let threshold = this.randomSource.next() * totalWeight;
    for (const entry of entries) {
      threshold -= entry.weight;
      if (threshold <= 0) {
        return {
          rewardId: entry.rewardId,
          count: this.rollCount(entry),
        };
      }
    }

    const fallback = entries[entries.length - 1];
    return {
      rewardId: fallback.rewardId,
      count: this.rollCount(fallback),
    };
  }

  public rollMany(entries: readonly DropEntry[], count: number): readonly DropResult[] {
    const results: DropResult[] = [];
    for (let index = 0; index < count; index += 1) {
      results.push(this.rollOne(entries));
    }
    return results;
  }

  private rollCount(entry: DropEntry): number {
    if (entry.maxCount < entry.minCount) {
      throw new Error(`[DropTableResolver] Invalid count range for ${entry.rewardId}.`);
    }

    const span = entry.maxCount - entry.minCount + 1;
    return entry.minCount + Math.floor(this.randomSource.next() * span);
  }
}
