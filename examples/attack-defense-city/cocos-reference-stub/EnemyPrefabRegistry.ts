import { Prefab } from 'cc';

export class EnemyPrefabRegistry {
  private readonly prefabs = new Map<string, Prefab>();

  public register(prefabId: string, prefab: Prefab): void {
    if (!prefabId) {
      throw new Error('Missing enemy prefab id.');
    }

    this.prefabs.set(prefabId, prefab);
  }

  public getRequired(prefabId: string): Prefab {
    const prefab = this.prefabs.get(prefabId);

    if (!prefab) {
      throw new Error(`Missing enemy prefab: ${prefabId}`);
    }

    return prefab;
  }

  public has(prefabId: string): boolean {
    return this.prefabs.has(prefabId);
  }
}
