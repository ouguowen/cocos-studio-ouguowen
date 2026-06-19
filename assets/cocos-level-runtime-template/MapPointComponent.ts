import { MapPointRegistry } from "./MapPointRegistry";
import type { MapPointRecord } from "./LevelTypes";

export interface MapPointComponentBinding {
  readonly mapId: string;
  readonly pointId: string;
  readonly pointType: string;
  readonly x: number;
  readonly y: number;
  readonly rotation?: number;
  readonly tags?: readonly string[];
}

export class MapPointComponentAdapter {
  private boundPointId: string | null = null;

  public constructor(private readonly registry: MapPointRegistry) {}

  public bind(binding: MapPointComponentBinding): MapPointRecord {
    const point: MapPointRecord = {
      mapId: binding.mapId,
      pointId: binding.pointId,
      pointType: binding.pointType,
      x: binding.x,
      y: binding.y,
      rotation: binding.rotation ?? 0,
      tags: binding.tags ?? [],
    };

    this.registry.registerPoint(point);
    this.boundPointId = point.pointId;
    return point;
  }

  public unbind(): void {
    if (!this.boundPointId) {
      return;
    }

    this.registry.unregisterPoint(this.boundPointId);
    this.boundPointId = null;
  }
}
