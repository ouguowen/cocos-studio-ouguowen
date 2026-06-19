export interface GachaEntry {
  readonly rewardId: string;
  readonly weight: number;
  readonly rarity: string;
}

export interface GachaPoolDefinition {
  readonly poolId: string;
  readonly costCurrencyId: string;
  readonly costAmount: number;
  readonly drawCount: number;
  readonly entries: readonly GachaEntry[];
  readonly pityThreshold?: number | null;
  readonly pityRewardId?: string | null;
}

export interface GachaPoolState {
  readonly poolId: string;
  drawCountSinceTopReward: number;
  totalDrawCount: number;
}

export class GachaPoolStore {
  private readonly definitions = new Map<string, GachaPoolDefinition>();
  private readonly states = new Map<string, GachaPoolState>();

  public constructor(definitions: readonly GachaPoolDefinition[] = []) {
    for (const definition of definitions) {
      this.definitions.set(definition.poolId, definition);
    }
  }

  public getDefinition(poolId: string): GachaPoolDefinition | null {
    return this.definitions.get(poolId) ?? null;
  }

  public requireDefinition(poolId: string): GachaPoolDefinition {
    const definition = this.getDefinition(poolId);
    if (!definition) {
      throw new Error(`[GachaPoolStore] Missing pool: ${poolId}`);
    }
    return definition;
  }

  public getState(poolId: string): GachaPoolState {
    const existing = this.states.get(poolId);
    if (existing) {
      return existing;
    }

    const created: GachaPoolState = {
      poolId,
      drawCountSinceTopReward: 0,
      totalDrawCount: 0,
    };
    this.states.set(poolId, created);
    return created;
  }

  public markDraw(poolId: string, hitTopReward: boolean): GachaPoolState {
    const state = this.getState(poolId);
    state.totalDrawCount += 1;
    state.drawCountSinceTopReward = hitTopReward ? 0 : state.drawCountSinceTopReward + 1;
    return { ...state };
  }

  public createSnapshot(): readonly GachaPoolState[] {
    return Array.from(this.states.values()).map((state) => ({ ...state }));
  }
}
