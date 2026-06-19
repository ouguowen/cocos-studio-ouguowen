export interface AudioBusRecord {
  readonly busId: string;
  readonly category: "music" | "sfx" | "voice" | "ui" | "ambient";
  volume: number;
  muted: boolean;
}

export class AudioBusRegistry {
  private readonly buses = new Map<string, AudioBusRecord>();

  public upsert(record: AudioBusRecord): AudioBusRecord {
    this.buses.set(record.busId, record);
    return { ...record };
  }

  public setVolume(busId: string, volume: number): AudioBusRecord {
    const bus = this.requireBus(busId);
    bus.volume = Math.max(0, Math.min(1, volume));
    return { ...bus };
  }

  public setMuted(busId: string, muted: boolean): AudioBusRecord {
    const bus = this.requireBus(busId);
    bus.muted = muted;
    return { ...bus };
  }

  public listBuses(): readonly AudioBusRecord[] {
    return Array.from(this.buses.values()).map((bus) => ({ ...bus }));
  }

  private requireBus(busId: string): AudioBusRecord {
    const bus = this.buses.get(busId);
    if (!bus) {
      throw new Error(`[AudioBusRegistry] Missing bus: ${busId}`);
    }
    return bus;
  }
}
