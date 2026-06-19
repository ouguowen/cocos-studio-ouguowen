export interface CloudSaveSlotRecord {
  readonly slotId: string;
  readonly revision: number;
  readonly checksum: string;
  readonly updatedAtMs: number;
  readonly deviceId: string;
  readonly summary: string | null;
}

export class CloudSaveManifest {
  private readonly slots = new Map<string, CloudSaveSlotRecord>();

  public upsert(slot: CloudSaveSlotRecord): CloudSaveSlotRecord {
    this.slots.set(slot.slotId, slot);
    return { ...slot };
  }

  public getSlot(slotId: string): CloudSaveSlotRecord | null {
    const slot = this.slots.get(slotId);
    return slot ? { ...slot } : null;
  }

  public listSlots(): readonly CloudSaveSlotRecord[] {
    return Array.from(this.slots.values()).map((slot) => ({ ...slot }));
  }

  public getLatestSlot(): CloudSaveSlotRecord | null {
    let latest: CloudSaveSlotRecord | null = null;
    for (const slot of this.slots.values()) {
      if (
        !latest ||
        slot.revision > latest.revision ||
        (slot.revision === latest.revision && slot.updatedAtMs > latest.updatedAtMs)
      ) {
        latest = slot;
      }
    }

    return latest ? { ...latest } : null;
  }
}
