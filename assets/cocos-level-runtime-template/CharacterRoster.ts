export interface CharacterRecord {
  readonly characterId: string;
  level: number;
  rank: number;
  exp: number;
  unlocked: boolean;
}

export class CharacterRoster {
  private readonly characters = new Map<string, CharacterRecord>();

  public unlockCharacter(characterId: string): CharacterRecord {
    const current = this.characters.get(characterId);
    const next: CharacterRecord = {
      characterId,
      level: current?.level ?? 1,
      rank: current?.rank ?? 1,
      exp: current?.exp ?? 0,
      unlocked: true,
    };
    this.characters.set(characterId, next);
    return next;
  }

  public getCharacter(characterId: string): CharacterRecord | null {
    return this.characters.get(characterId) ?? null;
  }

  public requireCharacter(characterId: string): CharacterRecord {
    const character = this.getCharacter(characterId);
    if (!character) {
      throw new Error(`[CharacterRoster] Missing character: ${characterId}`);
    }
    return character;
  }

  public addExp(characterId: string, exp: number): CharacterRecord {
    if (exp < 0) {
      throw new Error("[CharacterRoster] exp must be non-negative.");
    }

    const current = this.requireCharacter(characterId);
    current.exp += exp;
    return { ...current };
  }

  public setLevel(characterId: string, level: number): CharacterRecord {
    if (level < 1) {
      throw new Error("[CharacterRoster] level must be at least 1.");
    }

    const current = this.requireCharacter(characterId);
    current.level = level;
    return { ...current };
  }

  public setRank(characterId: string, rank: number): CharacterRecord {
    if (rank < 1) {
      throw new Error("[CharacterRoster] rank must be at least 1.");
    }

    const current = this.requireCharacter(characterId);
    current.rank = rank;
    return { ...current };
  }

  public createSnapshot(): readonly CharacterRecord[] {
    return Array.from(this.characters.values()).map((character) => ({ ...character }));
  }
}
