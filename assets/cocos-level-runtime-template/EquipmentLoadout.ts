export interface EquipmentRecord {
  readonly equipmentId: string;
  readonly slotId: string;
  level: number;
  rank: number;
}

export interface CharacterEquipmentLoadout {
  readonly characterId: string;
  readonly slots: Readonly<Record<string, string | null>>;
}

export class EquipmentLoadoutStore {
  private readonly equipments = new Map<string, EquipmentRecord>();
  private readonly loadouts = new Map<string, Map<string, string>>();

  public registerEquipment(record: EquipmentRecord): EquipmentRecord {
    this.equipments.set(record.equipmentId, { ...record });
    return { ...record };
  }

  public equip(characterId: string, equipmentId: string): CharacterEquipmentLoadout {
    const equipment = this.equipments.get(equipmentId);
    if (!equipment) {
      throw new Error(`[EquipmentLoadoutStore] Missing equipment: ${equipmentId}`);
    }

    const slots = this.loadouts.get(characterId) ?? new Map<string, string>();
    slots.set(equipment.slotId, equipment.equipmentId);
    this.loadouts.set(characterId, slots);
    return this.getLoadout(characterId);
  }

  public unequip(characterId: string, slotId: string): CharacterEquipmentLoadout {
    const slots = this.loadouts.get(characterId) ?? new Map<string, string>();
    slots.delete(slotId);
    this.loadouts.set(characterId, slots);
    return this.getLoadout(characterId);
  }

  public getLoadout(characterId: string): CharacterEquipmentLoadout {
    const slots = this.loadouts.get(characterId) ?? new Map<string, string>();
    const result: Record<string, string | null> = {};
    for (const [slotId, equipmentId] of slots.entries()) {
      result[slotId] = equipmentId;
    }
    return {
      characterId,
      slots: result,
    };
  }

  public createEquipmentSnapshot(): readonly EquipmentRecord[] {
    return Array.from(this.equipments.values()).map((equipment) => ({ ...equipment }));
  }
}
