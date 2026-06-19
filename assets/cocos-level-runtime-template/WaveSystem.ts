import { LevelRuntime } from "./LevelRuntime";
import type { LevelSystem, SpawnExecutionPlan, WaveStartResult } from "./LevelTypes";

export class WaveSystem implements LevelSystem {
  public readonly id = "wave-system";

  public constructor(private readonly runtime: LevelRuntime) {}

  public start(): void {}

  public stop(): void {}

  public startFirstWave(nowMs: number): WaveStartResult | null {
    return this.startWaveAtIndex(0, nowMs);
  }

  public startNextWave(nowMs: number): WaveStartResult | null {
    const currentWave = this.runtime.getCurrentWave();
    if (!currentWave) {
      return this.startFirstWave(nowMs);
    }

    if (!currentWave.completed) {
      return null;
    }

    const nextIndex =
      this.runtime.getWaves().findIndex((wave) => wave.waveId === currentWave.waveId) + 1;
    return this.startWaveAtIndex(nextIndex, nowMs);
  }

  public tryCompleteWave(waveId: string): boolean {
    if (!this.runtime.areWaveSpawnsCompleted(waveId)) {
      return false;
    }

    this.runtime.markWaveCompleted(waveId);
    return true;
  }

  private startWaveAtIndex(waveIndex: number, nowMs: number): WaveStartResult | null {
    const wave = this.runtime.getWaves()[waveIndex];
    if (!wave) {
      return null;
    }

    const event = this.runtime.markWaveStarted(waveIndex, nowMs);
    const spawns = wave.spawns.map<SpawnExecutionPlan>((spawn) => ({
      waveId: wave.waveId,
      spawnId: spawn.spawnId,
      spawnTime: spawn.spawnTime,
      mapPointId: spawn.mapPointId,
      enemyGroupId: spawn.enemyGroupId,
      count: spawn.count,
      interval: spawn.interval,
      formationId: spawn.formationId,
      spawnRule: spawn.spawnRule,
    }));

    return {
      waveId: wave.waveId,
      waveIndex,
      event,
      spawns,
    };
  }
}
