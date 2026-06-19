import type { CharacterRecord } from "./CharacterRoster";
import type { CharacterEquipmentLoadout, EquipmentRecord } from "./EquipmentLoadout";

export interface StatBlock {
  readonly hp: number;
  readonly attack: number;
  readonly defense: number;
}

export interface CharacterBaseStats {
  readonly characterId: string;
  readonly base: StatBlock;
  readonly growthPerLevel: StatBlock;
  readonly rankBonus: StatBlock;
}

export interface EquipmentStats {
  readonly equipmentId: string;
  readonly stats: StatBlock;
}

export class StatAggregator {
  public calculateCharacterStats(
    character: CharacterRecord,
    baseStats: CharacterBaseStats,
    equipmentRecords: readonly EquipmentRecord[],
    equipmentStatsMap: Readonly<Record<string, EquipmentStats>>
  ): StatBlock {
    const levelOffset = character.level - 1;
    const rankOffset = character.rank - 1;

    let hp =
      baseStats.base.hp +
      baseStats.growthPerLevel.hp * levelOffset +
      baseStats.rankBonus.hp * rankOffset;
    let attack =
      baseStats.base.attack +
      baseStats.growthPerLevel.attack * levelOffset +
      baseStats.rankBonus.attack * rankOffset;
    let defense =
      baseStats.base.defense +
      baseStats.growthPerLevel.defense * levelOffset +
      baseStats.rankBonus.defense * rankOffset;

    for (const equipment of equipmentRecords) {
      const stats = equipmentStatsMap[equipment.equipmentId]?.stats;
      if (!stats) {
        continue;
      }

      hp += stats.hp;
      attack += stats.attack;
      defense += stats.defense;
    }

    return { hp, attack, defense };
  }

  public resolveEquippedRecords(
    loadout: CharacterEquipmentLoadout,
    equipments: readonly EquipmentRecord[]
  ): readonly EquipmentRecord[] {
    const equippedIds = new Set(
      Object.values(loadout.slots).filter((equipmentId): equipmentId is string => equipmentId !== null)
    );
    return equipments.filter((equipment) => equippedIds.has(equipment.equipmentId));
  }
}
