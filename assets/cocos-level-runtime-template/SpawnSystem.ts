import { LevelRuntime } from "./LevelRuntime";
import type { LevelEvent, LevelSystem, SpawnExecutionPlan } from "./LevelTypes";

export class SpawnSystem implements LevelSystem {
  public readonly id = "spawn-system";

  public constructor(private readonly runtime: LevelRuntime) {}

  public start(): void {}

  public stop(): void {}

  public getSpawnPlansForWave(waveId: string): readonly SpawnExecutionPlan[] {
    const wave = this.runtime.getWaveById(waveId);
    if (!wave) {
      throw new Error(`[SpawnSystem] Missing wave: ${waveId}`);
    }

    return wave.spawns.map((spawn) => ({
      waveId,
      spawnId: spawn.spawnId,
      spawnTime: spawn.spawnTime,
      mapPointId: spawn.mapPointId,
      enemyGroupId: spawn.enemyGroupId,
      count: spawn.count,
      interval: spawn.interval,
      formationId: spawn.formationId,
      spawnRule: spawn.spawnRule,
    }));
  }

  public recordSpawnExecuted(spawnId: string, count: number, nowMs: number): LevelEvent {
    return this.runtime.recordSpawnExecution(spawnId, count, nowMs);
  }

  public areWaveSpawnsCompleted(waveId: string): boolean {
    return this.runtime.areWaveSpawnsCompleted(waveId);
  }
}
