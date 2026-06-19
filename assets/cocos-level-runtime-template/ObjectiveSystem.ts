import { LevelRuntime } from "./LevelRuntime";
import type { LevelEvent, LevelSystem } from "./LevelTypes";

export class ObjectiveSystem implements LevelSystem {
  public readonly id = "objective-system";

  public constructor(private readonly runtime: LevelRuntime) {}

  public start(): void {}

  public stop(): void {}

  public recordEnemyDefeated(enemyId: string, nowMs: number, count = 1): readonly LevelEvent[] {
    const events: LevelEvent[] = [this.runtime.recordEnemyDeath(enemyId, count, nowMs)];

    for (const objective of this.runtime.getObjectives()) {
      if (objective.completed || objective.failed) {
        continue;
      }

      if (objective.objectiveType === "kill_enemy" && objective.targetId === enemyId) {
        events.push(this.runtime.recordObjectiveProgress(objective.objectiveId, count, nowMs));
      }
    }

    return events;
  }

  public evaluateWaveClear(nowMs: number): readonly LevelEvent[] {
    const events: LevelEvent[] = [];
    const allSpawnsCompleted = this.runtime
      .getWaves()
      .every((wave) => this.runtime.areWaveSpawnsCompleted(wave.waveId));

    if (!allSpawnsCompleted || this.runtime.getActiveEnemyCount() > 0) {
      return events;
    }

    for (const objective of this.runtime.getObjectives()) {
      if (objective.completed || objective.failed) {
        continue;
      }

      if (objective.objectiveType === "kill_all") {
        events.push(this.runtime.recordObjectiveProgress(objective.objectiveId, 1, nowMs, true));
      }
    }

    return events;
  }

  public areRequiredObjectivesCompleted(): boolean {
    return this.runtime.areRequiredObjectivesCompleted();
  }
}
