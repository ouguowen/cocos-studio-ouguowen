import { _decorator, Component, Node, Prefab } from 'cc';
import { EnemyPrefabRegistry } from './EnemyPrefabRegistry';
import { LevelRuntimeFacade } from './LevelRuntimeFacade';
import { MapPointComponent } from './MapPointComponent';
import { MapPointRegistry } from './MapPointRegistry';

const { ccclass, property } = _decorator;

@ccclass('AttackDefenseCityBootstrap')
export class AttackDefenseCityBootstrap extends Component {
  @property([MapPointComponent])
  public mapPoints: MapPointComponent[] = [];

  @property(Prefab)
  public enemyScoutPrefab: Prefab | null = null;

  @property(Prefab)
  public enemyRaiderPrefab: Prefab | null = null;

  @property(Node)
  public enemyRoot: Node | null = null;

  private readonly mapPointRegistry = new MapPointRegistry();
  private readonly enemyPrefabRegistry = new EnemyPrefabRegistry();
  private readonly levelRuntime = new LevelRuntimeFacade();

  public start(): void {
    this.bindMapPoints();
    this.bindEnemyPrefabs();
    this.startExampleLevel();
  }

  private bindMapPoints(): void {
    this.mapPointRegistry.clear();

    for (const point of this.mapPoints) {
      this.mapPointRegistry.register(point);
    }

    this.mapPointRegistry.getRequired('player_spawn_city');
    this.mapPointRegistry.getRequired('enemy_spawn_left');
    this.mapPointRegistry.getRequired('enemy_spawn_right');
  }

  private bindEnemyPrefabs(): void {
    if (!this.enemyScoutPrefab || !this.enemyRaiderPrefab) {
      throw new Error('Enemy placeholder prefabs are not assigned.');
    }

    this.enemyPrefabRegistry.register('prefab_enemy_scout', this.enemyScoutPrefab);
    this.enemyPrefabRegistry.register('prefab_enemy_raider', this.enemyRaiderPrefab);
  }

  private startExampleLevel(): void {
    const state = this.levelRuntime.start({
      levelId: 'city_001',
      waveGroupId: 'wg_city_001',
      objectiveGroupId: 'obj_city_001',
      rewardId: 'reward_city_001',
    });

    console.log('[AttackDefenseCityBootstrap] Started example level:', state);
  }
}
