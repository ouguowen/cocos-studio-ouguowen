export interface AdReward {
  readonly currencyId?: string;
  readonly currencyAmount?: number;
  readonly itemId?: string;
  readonly itemCount?: number;
}

export interface AdPlacementDefinition {
  readonly placementId: string;
  readonly cooldownSeconds: number;
  readonly dailyLimit?: number | null;
  readonly rewards: readonly AdReward[];
}

export interface AdPlacementState {
  readonly placementId: string;
  viewCountToday: number;
  lastViewedAtMs: number | null;
}

export class AdPlacementRegistry {
  private readonly definitions = new Map<string, AdPlacementDefinition>();
  private readonly states = new Map<string, AdPlacementState>();

  public constructor(definitions: readonly AdPlacementDefinition[] = []) {
    for (const definition of definitions) {
      this.definitions.set(definition.placementId, definition);
    }
  }

  public requireDefinition(placementId: string): AdPlacementDefinition {
    const definition = this.definitions.get(placementId);
    if (!definition) {
      throw new Error(`[AdPlacementRegistry] Missing placement: ${placementId}`);
    }
    return definition;
  }

  public getState(placementId: string): AdPlacementState {
    const existing = this.states.get(placementId);
    if (existing) {
      return existing;
    }

    const created: AdPlacementState = {
      placementId,
      viewCountToday: 0,
      lastViewedAtMs: null,
    };
    this.states.set(placementId, created);
    return created;
  }

  public canView(placementId: string, nowMs: number): boolean {
    const definition = this.requireDefinition(placementId);
    const state = this.getState(placementId);

    if (
      definition.dailyLimit !== undefined &&
      definition.dailyLimit !== null &&
      state.viewCountToday >= definition.dailyLimit
    ) {
      return false;
    }

    if (state.lastViewedAtMs === null) {
      return true;
    }

    return nowMs - state.lastViewedAtMs >= definition.cooldownSeconds * 1000;
  }

  public markViewed(placementId: string, viewedAtMs: number): AdPlacementState {
    const state = this.getState(placementId);
    state.viewCountToday += 1;
    state.lastViewedAtMs = viewedAtMs;
    return { ...state };
  }

  public createSnapshot(): readonly AdPlacementState[] {
    return Array.from(this.states.values()).map((state) => ({ ...state }));
  }
}
