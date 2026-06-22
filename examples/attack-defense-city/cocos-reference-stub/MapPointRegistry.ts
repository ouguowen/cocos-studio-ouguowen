import { Node } from 'cc';
import { MapPointComponent } from './MapPointComponent';

export class MapPointRegistry {
  private readonly points = new Map<string, Node>();

  public clear(): void {
    this.points.clear();
  }

  public register(point: MapPointComponent): void {
    if (!point.pointId) {
      throw new Error('MapPointComponent is missing pointId.');
    }

    this.points.set(point.pointId, point.getNode());
  }

  public getRequired(pointId: string): Node {
    const node = this.points.get(pointId);

    if (!node) {
      throw new Error(`Missing map point: ${pointId}`);
    }

    return node;
  }

  public has(pointId: string): boolean {
    return this.points.has(pointId);
  }
}
