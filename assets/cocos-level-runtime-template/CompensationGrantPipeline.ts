export interface CompensationGrantRequest {
  readonly compensationId: string;
  readonly playerId: string;
  readonly reasonCode: string;
  readonly rewardId: string;
  readonly grantedAtMs: number;
}

export interface CompensationLedger {
  hasGranted(compensationId: string, playerId: string): boolean;
  markGranted(compensationId: string, playerId: string, grantedAtMs: number): void;
}

export interface CompensationExecutor {
  grant(request: CompensationGrantRequest): void | Promise<void>;
}

export class CompensationGrantPipeline {
  public constructor(
    private readonly ledger: CompensationLedger,
    private readonly executor: CompensationExecutor
  ) {}

  public async grant(request: CompensationGrantRequest): Promise<boolean> {
    if (this.ledger.hasGranted(request.compensationId, request.playerId)) {
      return false;
    }

    await this.executor.grant(request);
    this.ledger.markGranted(request.compensationId, request.playerId, request.grantedAtMs);
    return true;
  }
}
