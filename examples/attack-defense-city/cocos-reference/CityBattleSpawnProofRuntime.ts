import { _decorator, Component, instantiate, JsonAsset, Node, Prefab, resources, Vec3 } from 'cc';

console.log('[CityBattleSpawnProofRuntime] module loaded');

const { ccclass, property } = _decorator;

type GeneratedLevelConfig = {
    tables?: {
        level?: unknown[];
        wave?: unknown[];
        spawn?: unknown[];
        levelObjective?: unknown[];
    };
};

@ccclass('CityBattleSpawnProofRuntime')
export class CityBattleSpawnProofRuntime extends Component {
    @property(Node)
    public enemyRoot: Node | null = null;

    @property(Node)
    public spawnPoints: Node | null = null;

    @property(Node)
    public basePoint: Node | null = null;

    @property(Prefab)
    public enemyPrefab: Prefab | null = null;

    @property
    public levelConfigPath = 'config/attack-defense-city/level-config';

    @property
    public spawnOnlyProof = true;

    protected onLoad(): void {
        console.log('[CityBattleSpawnProofRuntime] onLoad');
    }

    protected onEnable(): void {
        console.log('[CityBattleSpawnProofRuntime] onEnable');
    }

    protected start(): void {
        console.log('[CityBattleSpawnProofRuntime] start');
        this.validateBindings();
        this.loadLevelConfigAndSpawn();
    }

    private validateBindings(): void {
        console.log('[CityBattleSpawnProofRuntime] binding check');
        console.log('enemyRoot:', this.enemyRoot ? this.enemyRoot.name : 'MISSING');
        console.log('spawnPoints:', this.spawnPoints ? this.spawnPoints.name : 'MISSING');
        console.log('basePoint:', this.basePoint ? this.basePoint.name : 'MISSING');
        console.log('enemyPrefab:', this.enemyPrefab ? this.enemyPrefab.name : 'MISSING');
        console.log('levelConfigPath:', this.levelConfigPath);

        if (!this.enemyRoot || !this.spawnPoints || !this.basePoint || !this.enemyPrefab) {
            console.warn('[CityBattleSpawnProofRuntime] Scene bindings are incomplete. Spawn proof cannot PASS until all required bindings exist.');
        }
    }

    private loadLevelConfigAndSpawn(): void {
        resources.load(this.levelConfigPath, JsonAsset, (error, asset) => {
            if (error) {
                console.error('[CityBattleSpawnProofRuntime] Failed to load level config:', error);
                return;
            }

            const config = asset.json as GeneratedLevelConfig;
            console.log('[CityBattleSpawnProofRuntime] Level config loaded:', config);

            const tables = config?.tables ?? {};
            const levelCount = Array.isArray(tables.level) ? tables.level.length : 0;
            const waveCount = Array.isArray(tables.wave) ? tables.wave.length : 0;
            const spawnTable = Array.isArray(tables.spawn) ? tables.spawn : [];
            const objectiveCount = Array.isArray(tables.levelObjective) ? tables.levelObjective.length : 0;

            console.log(`[CityBattleSpawnProofRuntime] Config summary: levels=${levelCount}, waves=${waveCount}, spawns=${spawnTable.length}, objectives=${objectiveCount}`);
            console.log(`[CityBattleSpawnProofRuntime] Spawn table count: ${spawnTable.length}`);

            this.spawnEnemies(spawnTable.length);
        });
    }

    private spawnEnemies(spawnCount: number): void {
        if (!this.enemyRoot) {
            console.error('[CityBattleSpawnProofRuntime] Cannot spawn: enemyRoot is missing.');
            return;
        }

        if (!this.enemyPrefab) {
            console.error('[CityBattleSpawnProofRuntime] Cannot spawn: enemyPrefab is missing.');
            return;
        }

        if (spawnCount <= 0) {
            console.warn('[CityBattleSpawnProofRuntime] Spawn proof produced no enemies because spawn table is empty.');
            console.log('[CityBattleSpawnProofRuntime] Spawned enemy count: 0');
            return;
        }

        this.enemyRoot.removeAllChildren();

        for (let index = 0; index < spawnCount; index += 1) {
            const enemy = instantiate(this.enemyPrefab);
            const displayIndex = String(index + 1).padStart(3, '0');
            enemy.name = `SpawnedEnemy_${displayIndex}`;

            const x = -120 + index * 60;
            enemy.setPosition(new Vec3(x, 0, 0));
            enemy.active = true;
            enemy.parent = this.enemyRoot;

            console.log(`[CityBattleSpawnProofRuntime] Spawned ${enemy.name} at x=${x}, y=0`);
        }

        console.log(`[CityBattleSpawnProofRuntime] Spawned enemy count: ${this.enemyRoot.children.length}`);

        if (this.spawnOnlyProof) {
            console.log('[CityBattleSpawnProofRuntime] Spawn-only proof complete. Movement, combat, objective state, and result path are intentionally not implemented here.');
        }
    }
}
