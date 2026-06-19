export interface BattleReplayRecord<TFrame = unknown> {
  readonly replayId: string;
  readonly battleId: string;
  readonly createdAtMs: number;
  readonly version: string;
  readonly frames: readonly TFrame[];
  readonly metadata: Readonly<Record<string, string | number | boolean | null>>;
}

export class BattleReplayArchive<TFrame = unknown> {
  private readonly replays = new Map<string, BattleReplayRecord<TFrame>>();

  public save(record: BattleReplayRecord<TFrame>): BattleReplayRecord<TFrame> {
    this.replays.set(record.replayId, record);
    return {
      ...record,
      frames: [...record.frames],
      metadata: { ...record.metadata },
    };
  }

  public get(replayId: string): BattleReplayRecord<TFrame> | null {
    const record = this.replays.get(replayId);
    if (!record) {
      return null;
    }

    return {
      ...record,
      frames: [...record.frames],
      metadata: { ...record.metadata },
    };
  }

  public listByBattleId(battleId: string): readonly BattleReplayRecord<TFrame>[] {
    return Array.from(this.replays.values())
      .filter((record) => record.battleId === battleId)
      .map((record) => ({
        ...record,
        frames: [...record.frames],
        metadata: { ...record.metadata },
      }));
  }
}
