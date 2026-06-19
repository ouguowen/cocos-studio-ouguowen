import type {
  LevelEvent,
  LevelRunStatus,
  LevelRuntimeConfigBundle,
  LevelRuntimeLike,
  LevelRuntimeSnapshot,
  ObjectiveRunState,
  RewardResult,
  SpawnRunState,
  WaveRunState,
} from "./LevelTypes";

export class LevelRuntime implements LevelRuntimeLike {
  private status: LevelRunStatus = "ready";
  private currentWaveIndex = -1;
  private activeEnemyCount = 0;
  private startedAtMs: number | null = null;
  private completedAtMs: number | null = null;
  private failureReason: string | null = null;
  private readonly objectives: ObjectiveRunState[];
  private readonly waves: WaveRunState[];

  public constructor(private readonly configBundle: LevelRuntimeConfigBundle) {
    this.objectives = createObjectiveStates(configBundle);
    this.waves = createWaveStates(configBundle);
  }

  public getLevelId(): string {
    return this.configBundle.level.levelId;
  }

  public getStatus(): LevelRunStatus {
    return this.status;
  }

  public getConfigBundle(): LevelRuntimeConfigBundle {
    return this.configBundle;
  }

  public getObjectives(): readonly ObjectiveRunState[] {
    return this.objectives;
  }

  public getWaves(): readonly WaveRunState[] {
    return this.waves;
  }

  public getCurrentWave(): WaveRunState | null {
    return this.waves[this.currentWaveIndex] ?? null;
  }

  public getActiveEnemyCount(): number {
    return this.activeEnemyCount;
  }

  public getWaveById(waveId: string): WaveRunState | null {
    return this.waves.find((wave) => wave.waveId === waveId) ?? null;
  }

  public getObjectiveById(objectiveId: string): ObjectiveRunState | null {
    return this.objectives.find((objective) => objective.objectiveId === objectiveId) ?? null;
  }

  public markStarted(nowMs: number): LevelEvent {
    this.status = "running";
    this.startedAtMs = nowMs;
    return {
      type: "level_started",
      levelId: this.getLevelId(),
      atMs: nowMs,
    };
  }

  public markWaveStarted(
    waveIndex: number,
    nowMs: number
  ): Extract<LevelEvent, { readonly type: "wave_started" }> {
    const wave = this.waves[waveIndex];
    if (!wave) {
      throw new Error(`[LevelRuntime] Missing wave at index ${waveIndex}`);
    }

    this.currentWaveIndex = waveIndex;
    wave.started = true;

    return {
      type: "wave_started",
      levelId: this.getLevelId(),
      atMs: nowMs,
      waveId: wave.waveId,
      waveIndex,
    };
  }

  public markPaused(): void {
    this.status = "paused";
  }

  public markResumed(): void {
    this.status = "running";
  }

  public markCompleted(nowMs: number, rewardResult: RewardResult): LevelEvent {
    this.status = "completed";
    this.completedAtMs = nowMs;
    return {
      type: "level_completed",
      levelId: this.getLevelId(),
      atMs: nowMs,
      rewardResult,
    };
  }

  public markFailed(nowMs: number, reason: string): LevelEvent {
    this.status = "failed";
    this.completedAtMs = nowMs;
    this.failureReason = reason;
    return {
      type: "level_failed",
      levelId: this.getLevelId(),
      atMs: nowMs,
      reason,
    };
  }

  public createSnapshot(): LevelRuntimeSnapshot {
    return {
      levelId: this.getLevelId(),
      status: this.status,
      currentWaveIndex: this.currentWaveIndex,
      activeEnemyCount: this.activeEnemyCount,
      startedAtMs: this.startedAtMs,
      completedAtMs: this.completedAtMs,
      failureReason: this.failureReason,
      objectives: this.objectives.map((objective) => ({ ...objective })),
      waves: this.waves.map((wave) => ({
        ...wave,
        spawns: wave.spawns.map((spawn) => ({ ...spawn })),
      })),
    };
  }

  public recordSpawnExecution(spawnId: string, count: number, nowMs: number): LevelEvent {
    const spawn = this.findSpawn(spawnId);
    spawn.spawnedCount += count;
    spawn.completed = spawn.spawnedCount >= spawn.count;
    this.activeEnemyCount += count;

    return {
      type: "enemy_spawned",
      levelId: this.getLevelId(),
      atMs: nowMs,
      waveId: this.findWaveForSpawn(spawnId).waveId,
      spawnId: spawn.spawnId,
      enemyGroupId: spawn.enemyGroupId,
      count,
    };
  }

  public recordEnemyDeath(enemyId: string, count: number, nowMs: number): LevelEvent {
    this.activeEnemyCount = Math.max(0, this.activeEnemyCount - count);
    return {
      type: "enemy_dead",
      levelId: this.getLevelId(),
      atMs: nowMs,
      enemyId,
      count,
    };
  }

  public recordObjectiveProgress(
    objectiveId: string,
    delta: number,
    nowMs: number,
    forceComplete = false
  ): LevelEvent {
    const objective = this.requireObjective(objectiveId);
    objective.currentCount += delta;

    const targetCount = objective.targetCount > 0 ? objective.targetCount : 1;
    if (forceComplete || objective.currentCount >= targetCount) {
      objective.completed = true;
    }

    return {
      type: "objective_updated",
      levelId: this.getLevelId(),
      atMs: nowMs,
      objectiveId: objective.objectiveId,
      currentCount: objective.currentCount,
      completed: objective.completed,
    };
  }

  public markWaveCompleted(waveId: string): void {
    const wave = this.requireWave(waveId);
    wave.completed = true;
  }

  public areWaveSpawnsCompleted(waveId: string): boolean {
    const wave = this.requireWave(waveId);
    return wave.spawns.every((spawn) => spawn.completed);
  }

  public areRequiredObjectivesCompleted(): boolean {
    return this.objectives
      .filter((objective) => objective.required)
      .every((objective) => objective.completed && !objective.failed);
  }

  public areAllWavesCompleted(): boolean {
    return this.waves.every((wave) => wave.completed);
  }

  private findSpawn(spawnId: string): SpawnRunState {
    for (const wave of this.waves) {
      const spawn = wave.spawns.find((candidate) => candidate.spawnId === spawnId);
      if (spawn) {
        return spawn;
      }
    }

    throw new Error(`[LevelRuntime] Missing spawn: ${spawnId}`);
  }

  private findWaveForSpawn(spawnId: string): WaveRunState {
    for (const wave of this.waves) {
      if (wave.spawns.some((candidate) => candidate.spawnId === spawnId)) {
        return wave;
      }
    }

    throw new Error(`[LevelRuntime] Missing wave for spawn: ${spawnId}`);
  }

  private requireWave(waveId: string): WaveRunState {
    const wave = this.getWaveById(waveId);
    if (!wave) {
      throw new Error(`[LevelRuntime] Missing wave: ${waveId}`);
    }
    return wave;
  }

  private requireObjective(objectiveId: string): ObjectiveRunState {
    const objective = this.getObjectiveById(objectiveId);
    if (!objective) {
      throw new Error(`[LevelRuntime] Missing objective: ${objectiveId}`);
    }
    return objective;
  }
}

function createObjectiveStates(configBundle: LevelRuntimeConfigBundle): ObjectiveRunState[] {
  return configBundle.objectives.map((objective) => ({
    objectiveId: objective.objectiveId,
    objectiveType: objective.objectiveType,
    targetId: objective.targetId,
    targetCount: objective.targetCount ?? 0,
    timeLimit: objective.timeLimit ?? 0,
    required: objective.required,
    currentCount: 0,
    completed: false,
    failed: false,
  }));
}

function createWaveStates(configBundle: LevelRuntimeConfigBundle): WaveRunState[] {
  return configBundle.waves.map(({ wave, spawns }) => ({
    waveId: wave.waveId,
    orderIndex: wave.orderIndex,
    startDelay: wave.startDelay ?? 0,
    nextWaveRule: wave.nextWaveRule,
    nextWaveParam: wave.nextWaveParam,
    started: false,
    completed: false,
    spawns: spawns.map<SpawnRunState>((spawn) => ({
      spawnId: spawn.spawnId,
      spawnTime: spawn.spawnTime,
      mapPointId: spawn.mapPointId,
      enemyGroupId: spawn.enemyGroupId,
      count: spawn.count,
      interval: spawn.interval ?? 0,
      formationId: spawn.formationId,
      spawnRule: spawn.spawnRule,
      spawnedCount: 0,
      completed: false,
    })),
  }));
}
