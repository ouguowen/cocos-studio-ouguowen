import { LevelBuilder } from "./LevelBuilder";
import { LevelRuntime } from "./LevelRuntime";
import { ObjectiveSystem } from "./ObjectiveSystem";
import { RewardSystem } from "./RewardSystem";
import { SpawnSystem } from "./SpawnSystem";
import { WaveSystem } from "./WaveSystem";
import type { LevelEvent, LevelProgressResult, RewardCalculationOptions } from "./LevelTypes";

export class LevelFlowController {
  private runtime: LevelRuntime | null = null;
  private waveSystem: WaveSystem | null = null;
  private spawnSystem: SpawnSystem | null = null;
  private objectiveSystem: ObjectiveSystem | null = null;
  private rewardSystem: RewardSystem | null = null;

  public constructor(private readonly levelBuilder: LevelBuilder) {}

  public enterLevel(levelId: string): LevelRuntime {
    this.runtime = this.levelBuilder.build(levelId);
    this.waveSystem = new WaveSystem(this.runtime);
    this.spawnSystem = new SpawnSystem(this.runtime);
    this.objectiveSystem = new ObjectiveSystem(this.runtime);
    this.rewardSystem = new RewardSystem(this.runtime);
    return this.runtime;
  }

  public startLevel(nowMs: number): readonly LevelEvent[] {
    const runtime = this.requireRuntime();
    const waveSystem = this.requireWaveSystem();
    const events: LevelEvent[] = [runtime.markStarted(nowMs)];

    const firstWave = waveSystem.startFirstWave(nowMs);
    if (firstWave) {
      events.push(firstWave.event);
    }

    return events;
  }

  public pauseLevel(): void {
    this.requireRuntime().markPaused();
  }

  public resumeLevel(): void {
    this.requireRuntime().markResumed();
  }

  public recordSpawnExecuted(spawnId: string, count: number, nowMs: number): LevelProgressResult {
    const runtime = this.requireRuntime();
    const spawnSystem = this.requireSpawnSystem();
    const events: LevelEvent[] = [spawnSystem.recordSpawnExecuted(spawnId, count, nowMs)];
    return this.evaluateProgress(runtime, events, nowMs, { isFirstClear: false });
  }

  public recordEnemyDefeated(
    enemyId: string,
    nowMs: number,
    count = 1,
    rewardOptions: RewardCalculationOptions = { isFirstClear: false }
  ): LevelProgressResult {
    const runtime = this.requireRuntime();
    const objectiveSystem = this.requireObjectiveSystem();
    const events = [...objectiveSystem.recordEnemyDefeated(enemyId, nowMs, count)];
    return this.evaluateProgress(runtime, events, nowMs, rewardOptions);
  }

  public failLevel(nowMs: number, reason: string): readonly LevelEvent[] {
    return [this.requireRuntime().markFailed(nowMs, reason)];
  }

  public exitLevel(): void {
    this.runtime = null;
    this.waveSystem = null;
    this.spawnSystem = null;
    this.objectiveSystem = null;
    this.rewardSystem = null;
  }

  private evaluateProgress(
    runtime: LevelRuntime,
    initialEvents: LevelEvent[],
    nowMs: number,
    rewardOptions: RewardCalculationOptions
  ): LevelProgressResult {
    const waveSystem = this.requireWaveSystem();
    const objectiveSystem = this.requireObjectiveSystem();
    const rewardSystem = this.requireRewardSystem();
    const events = [...initialEvents];
    let nextWaveStarted = false;

    const currentWave = runtime.getCurrentWave();
    if (
      currentWave &&
      runtime.areWaveSpawnsCompleted(currentWave.waveId) &&
      runtime.getActiveEnemyCount() === 0 &&
      waveSystem.tryCompleteWave(currentWave.waveId)
    ) {
      events.push(...objectiveSystem.evaluateWaveClear(nowMs));

      const nextWave = waveSystem.startNextWave(nowMs);
      if (nextWave) {
        events.push(nextWave.event);
        nextWaveStarted = true;
      }
    }

    if (runtime.areAllWavesCompleted() && objectiveSystem.areRequiredObjectivesCompleted()) {
      const rewardResult = rewardSystem.calculateResult(rewardOptions);
      events.push(runtime.markCompleted(nowMs, rewardResult));
      return {
        events,
        levelCompleted: true,
        nextWaveStarted,
      };
    }

    return {
      events,
      levelCompleted: false,
      nextWaveStarted,
    };
  }

  private requireRuntime(): LevelRuntime {
    if (!this.runtime) {
      throw new Error("[LevelFlowController] No active runtime. Call enterLevel first.");
    }
    return this.runtime;
  }

  private requireWaveSystem(): WaveSystem {
    if (!this.waveSystem) {
      throw new Error("[LevelFlowController] WaveSystem is not ready.");
    }
    return this.waveSystem;
  }

  private requireSpawnSystem(): SpawnSystem {
    if (!this.spawnSystem) {
      throw new Error("[LevelFlowController] SpawnSystem is not ready.");
    }
    return this.spawnSystem;
  }

  private requireObjectiveSystem(): ObjectiveSystem {
    if (!this.objectiveSystem) {
      throw new Error("[LevelFlowController] ObjectiveSystem is not ready.");
    }
    return this.objectiveSystem;
  }

  private requireRewardSystem(): RewardSystem {
    if (!this.rewardSystem) {
      throw new Error("[LevelFlowController] RewardSystem is not ready.");
    }
    return this.rewardSystem;
  }
}
