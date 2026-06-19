export interface BotBackfillRule {
  readonly playlistId: string;
  readonly minWaitMs: number;
  readonly maxHumanSlots: number;
  readonly botCount: number;
}

export class BotBackfillPolicy {
  public constructor(private readonly rules: readonly BotBackfillRule[]) {}

  public shouldBackfill(
    playlistId: string,
    waitedMs: number,
    humanCount: number
  ): boolean {
    const rule = this.rules.find((candidate) => candidate.playlistId === playlistId);
    if (!rule) {
      return false;
    }

    return waitedMs >= rule.minWaitMs && humanCount < rule.maxHumanSlots;
  }

  public getBotCount(playlistId: string): number {
    const rule = this.rules.find((candidate) => candidate.playlistId === playlistId);
    return rule ? rule.botCount : 0;
  }
}
