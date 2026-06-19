import type { EnemyActorHandle, EnemySpawnRequest, MapPointRecord } from "./LevelTypes";

export interface EnemyActorInit {
  readonly actorId: string;
  readonly request: EnemySpawnRequest;
  readonly maxHp: number;
  readonly initialHp?: number;
}

export interface EnemyActorSnapshot {
  readonly actorId: string;
  readonly enemyId: string;
  readonly enemyType: string;
  readonly enemyGroupId: string;
  readonly levelId: string;
  readonly waveId: string;
  readonly spawnId: string;
  readonly prefabId: string;
  readonly currentHp: number;
  readonly maxHp: number;
  readonly alive: boolean;
  readonly mapPoint: MapPointRecord | null;
}

export interface EnemyActorHooks {
  onInitialized?(snapshot: EnemyActorSnapshot): void;
  onDamaged?(snapshot: EnemyActorSnapshot, damage: number): void;
  onDefeated?(snapshot: EnemyActorSnapshot): void;
  onReleased?(snapshot: EnemyActorSnapshot): void;
}

export class EnemyActor implements EnemyActorHandle {
  private state: EnemyActorSnapshot | null = null;

  public constructor(private readonly hooks: EnemyActorHooks = {}) {}

  public get actorId(): string {
    return this.requireState().actorId;
  }

  public get enemyId(): string {
    return this.requireState().enemyId;
  }

  public initialize(init: EnemyActorInit): EnemyActorSnapshot {
    const currentHp = init.initialHp ?? init.maxHp;
    this.state = {
      actorId: init.actorId,
      enemyId: init.request.enemyId,
      enemyType: init.request.enemyType,
      enemyGroupId: init.request.enemyGroupId,
      levelId: init.request.levelId,
      waveId: init.request.waveId,
      spawnId: init.request.spawnId,
      prefabId: init.request.prefabId,
      currentHp: clampHp(currentHp, init.maxHp),
      maxHp: init.maxHp,
      alive: true,
      mapPoint: init.request.mapPoint,
    };
    this.hooks.onInitialized?.(this.state);
    return this.state;
  }

  public isAlive(): boolean {
    return this.requireState().alive;
  }

  public applyDamage(damage: number): EnemyActorSnapshot {
    const state = this.requireState();
    if (!state.alive) {
      return state;
    }

    const nextHp = clampHp(state.currentHp - Math.max(0, damage), state.maxHp);
    const nextState: EnemyActorSnapshot = {
      ...state,
      currentHp: nextHp,
      alive: nextHp > 0,
    };
    this.state = nextState;
    this.hooks.onDamaged?.(nextState, damage);

    if (!nextState.alive) {
      this.hooks.onDefeated?.(nextState);
    }

    return nextState;
  }

  public heal(value: number): EnemyActorSnapshot {
    const state = this.requireState();
    if (!state.alive) {
      return state;
    }

    const nextState: EnemyActorSnapshot = {
      ...state,
      currentHp: clampHp(state.currentHp + Math.max(0, value), state.maxHp),
    };
    this.state = nextState;
    return nextState;
  }

  public release(): void {
    const state = this.requireState();
    this.hooks.onReleased?.(state);
    this.state = null;
  }

  public createSnapshot(): EnemyActorSnapshot {
    return this.requireState();
  }

  private requireState(): EnemyActorSnapshot {
    if (!this.state) {
      throw new Error("[EnemyActor] Actor is not initialized.");
    }
    return this.state;
  }
}

function clampHp(value: number, maxHp: number): number {
  return Math.max(0, Math.min(maxHp, value));
}
