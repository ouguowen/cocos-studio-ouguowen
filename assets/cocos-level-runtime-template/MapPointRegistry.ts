import type { MapPointConfig } from "../cocos-config-runtime-template/ConfigTypes";
import type { MapPointRecord } from "./LevelTypes";

export class MapPointRegistry {
  private readonly pointsById = new Map<string, MapPointRecord>();
  private readonly pointsByTag = new Map<string, MapPointRecord[]>();

  public registerPoint(point: MapPointRecord): void {
    this.unregisterPoint(point.pointId);
    this.pointsById.set(point.pointId, point);

    for (const tag of point.tags) {
      const list = this.pointsByTag.get(tag) ?? [];
      list.push(point);
      this.pointsByTag.set(tag, list);
    }
  }

  public registerConfigPoint(point: MapPointConfig): void {
    this.registerPoint({
      mapId: point.mapId,
      pointId: point.pointId,
      pointType: point.pointType,
      x: point.x,
      y: point.y,
      rotation: point.rotation ?? 0,
      tags: point.tags ?? [],
    });
  }

  public registerConfigPoints(points: readonly MapPointConfig[]): void {
    for (const point of points) {
      this.registerConfigPoint(point);
    }
  }

  public unregisterPoint(pointId: string): void {
    const existing = this.pointsById.get(pointId);
    if (!existing) {
      return;
    }

    this.pointsById.delete(pointId);
    for (const tag of existing.tags) {
      const list = this.pointsByTag.get(tag);
      if (!list) {
        continue;
      }

      const next = list.filter((point) => point.pointId !== pointId);
      if (next.length === 0) {
        this.pointsByTag.delete(tag);
      } else {
        this.pointsByTag.set(tag, next);
      }
    }
  }

  public getPointById(pointId: string): MapPointRecord | null {
    return this.pointsById.get(pointId) ?? null;
  }

  public getPointsByTag(tag: string): readonly MapPointRecord[] {
    return this.pointsByTag.get(tag) ?? [];
  }

  public getAllPoints(): readonly MapPointRecord[] {
    return Array.from(this.pointsById.values());
  }

  public clear(): void {
    this.pointsById.clear();
    this.pointsByTag.clear();
  }
}
