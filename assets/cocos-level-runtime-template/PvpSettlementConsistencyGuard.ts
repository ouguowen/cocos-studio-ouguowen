export interface PvpSettlementSnapshot {
  readonly battleId: string;
  readonly winnerPlayerId: string | null;
  readonly checksum: string;
  readonly resultVersion: string;
}

export class PvpSettlementConsistencyGuard {
  public isConsistent(
    authoritative: PvpSettlementSnapshot,
    candidate: PvpSettlementSnapshot
  ): boolean {
    return (
      authoritative.battleId === candidate.battleId &&
      authoritative.winnerPlayerId === candidate.winnerPlayerId &&
      authoritative.checksum === candidate.checksum &&
      authoritative.resultVersion === candidate.resultVersion
    );
  }

  public requireConsistent(
    authoritative: PvpSettlementSnapshot,
    candidate: PvpSettlementSnapshot
  ): void {
    if (!this.isConsistent(authoritative, candidate)) {
      throw new Error(
        `[PvpSettlementConsistencyGuard] Settlement mismatch for battle ${authoritative.battleId}.`
      );
    }
  }
}
