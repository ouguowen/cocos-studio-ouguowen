import { ConfigManager } from "../cocos-config-runtime-template/ConfigManager";
import type { EnemyActorHandle, EnemySpawnRequest } from "./LevelTypes";

export interface EnemyActorSpawner {
  preload(prefabIds: readonly string[]): Promise<void> | void;
  createActor(request: EnemySpawnRequest): EnemyActorHandle;
  releaseActor(actor: EnemyActorHandle): void;
}

export class EnemyFactory {
  public constructor(
    private readonly configManager: ConfigManager,
    private readonly actorSpawner: EnemyActorSpawner
  ) {}

  public preloadEnemyGroup(enemyGroupId: string): Promise<void> | void {
    const enemyEntries = this.configManager.getEnemyGroup(enemyGroupId);
    const prefabIds = Array.from(
      new Set(
        enemyEntries.map((entry) => this.configManager.getEnemy(entry.enemyId).prefabId)
      )
    );
    return this.actorSpawner.preload(prefabIds);
  }

  public createEnemy(
    levelId: string,
    waveId: string,
    spawnId: string,
    enemyId: string,
    enemyGroupId: string,
    mapPoint: EnemySpawnRequest["mapPoint"]
  ): EnemyActorHandle {
    const enemy = this.configManager.getEnemy(enemyId);
    return this.actorSpawner.createActor({
      levelId,
      waveId,
      spawnId,
      enemyId: enemy.enemyId,
      enemyType: enemy.enemyType,
      prefabId: enemy.prefabId,
      mapPoint,
      enemyGroupId,
    });
  }

  public releaseEnemy(actor: EnemyActorHandle): void {
    this.actorSpawner.releaseActor(actor);
  }
}
