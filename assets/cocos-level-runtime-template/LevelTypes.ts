import type {
  LevelConfig,
  LevelModifierConfig,
  LevelObjectiveConfig,
  LevelTemplateConfig,
  MapConfig,
  RewardConfig,
  SpawnConfig,
  StarRuleConfig,
  WaveConfig,
} from "../cocos-config-runtime-template/ConfigTypes";

export type LevelRunStatus = "ready" | "running" | "paused" | "completed" | "failed";

export interface ObjectiveRunState {
  readonly objectiveId: string;
  readonly objectiveType: string;
  readonly targetId: string | null;
  readonly targetCount: number;
  readonly timeLimit: number;
  readonly required: boolean;
  currentCount: number;
  completed: boolean;
  failed: boolean;
}

export interface SpawnRunState {
  readonly spawnId: string;
  readonly spawnTime: number;
  readonly mapPointId: string | null;
  readonly enemyGroupId: string;
  readonly count: number;
  readonly interval: number;
  readonly formationId: string | null;
  readonly spawnRule: string;
  spawnedCount: number;
  completed: boolean;
}

export interface WaveRunState {
  readonly waveId: string;
  readonly orderIndex: number;
  readonly startDelay: number;
  readonly nextWaveRule: string;
  readonly nextWaveParam: string | null;
  readonly spawns: readonly SpawnRunState[];
  started: boolean;
  completed: boolean;
}

export interface RewardResult {
  readonly rewardId: string;
  readonly gold: number;
  readonly exp: number;
  readonly dropGroupId: string | null;
  readonly firstClearRewardId: string | null;
  readonly starRewardIds: readonly string[];
}

export interface LevelRuntimeConfigBundle {
  readonly level: LevelConfig;
  readonly template: LevelTemplateConfig;
  readonly map: MapConfig;
  readonly objectives: readonly LevelObjectiveConfig[];
  readonly waves: readonly {
    readonly wave: WaveConfig;
    readonly spawns: readonly SpawnConfig[];
  }[];
  readonly reward: RewardConfig;
  readonly starRules: readonly StarRuleConfig[];
  readonly modifier: LevelModifierConfig | null;
}

export interface LevelRuntimeSnapshot {
  readonly levelId: string;
  readonly status: LevelRunStatus;
  readonly currentWaveIndex: number;
  readonly activeEnemyCount: number;
  readonly startedAtMs: number | null;
  readonly completedAtMs: number | null;
  readonly failureReason: string | null;
  readonly objectives: readonly ObjectiveRunState[];
  readonly waves: readonly WaveRunState[];
}

export interface SpawnExecutionPlan {
  readonly waveId: string;
  readonly spawnId: string;
  readonly spawnTime: number;
  readonly mapPointId: string | null;
  readonly enemyGroupId: string;
  readonly count: number;
  readonly interval: number;
  readonly formationId: string | null;
  readonly spawnRule: string;
}

export interface WaveStartResult {
  readonly waveId: string;
  readonly waveIndex: number;
  readonly event: Extract<LevelEvent, { readonly type: "wave_started" }>;
  readonly spawns: readonly SpawnExecutionPlan[];
}

export interface LevelProgressResult {
  readonly events: readonly LevelEvent[];
  readonly levelCompleted: boolean;
  readonly nextWaveStarted: boolean;
}

export interface RewardCalculationOptions {
  readonly isFirstClear: boolean;
  readonly achievedStarRuleIds?: readonly string[];
}

export interface MapPointRecord {
  readonly mapId: string;
  readonly pointId: string;
  readonly pointType: string;
  readonly x: number;
  readonly y: number;
  readonly rotation: number;
  readonly tags: readonly string[];
}

export interface EnemySpawnRequest {
  readonly levelId: string;
  readonly waveId: string;
  readonly spawnId: string;
  readonly enemyId: string;
  readonly enemyType: string;
  readonly prefabId: string;
  readonly mapPoint: MapPointRecord | null;
  readonly enemyGroupId: string;
}

export interface EnemyActorHandle {
  readonly actorId: string;
  readonly enemyId: string;
  release(): void;
}

export type LevelEvent =
  | { readonly type: "level_started"; readonly levelId: string; readonly atMs: number }
  | {
      readonly type: "wave_started";
      readonly levelId: string;
      readonly atMs: number;
      readonly waveId: string;
      readonly waveIndex: number;
    }
  | {
      readonly type: "enemy_spawned";
      readonly levelId: string;
      readonly atMs: number;
      readonly waveId: string;
      readonly spawnId: string;
      readonly enemyGroupId: string;
      readonly count: number;
    }
  | {
      readonly type: "enemy_dead";
      readonly levelId: string;
      readonly atMs: number;
      readonly enemyId: string;
      readonly count: number;
    }
  | {
      readonly type: "objective_updated";
      readonly levelId: string;
      readonly atMs: number;
      readonly objectiveId: string;
      readonly currentCount: number;
      readonly completed: boolean;
    }
  | {
      readonly type: "level_completed";
      readonly levelId: string;
      readonly atMs: number;
      readonly rewardResult: RewardResult;
    }
  | {
      readonly type: "level_failed";
      readonly levelId: string;
      readonly atMs: number;
      readonly reason: string;
    };

export interface LevelSystem {
  readonly id: string;
  start(runtime: LevelRuntimeLike): void;
  stop(): void;
}

export interface LevelRuntimeLike {
  getLevelId(): string;
  getStatus(): LevelRunStatus;
  createSnapshot(): LevelRuntimeSnapshot;
  areRequiredObjectivesCompleted(): boolean;
}
