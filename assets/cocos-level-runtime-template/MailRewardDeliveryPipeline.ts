export interface MailRewardGrantRequest {
  readonly mailId: string;
  readonly rewardId: string;
  readonly grantedAtMs: number;
}

export interface MailRewardLedger {
  hasGranted(mailId: string): boolean;
  markGranted(mailId: string, grantedAtMs: number): void;
}

export interface MailRewardExecutor {
  grant(request: MailRewardGrantRequest): void | Promise<void>;
}

export class MailRewardDeliveryPipeline {
  public constructor(
    private readonly ledger: MailRewardLedger,
    private readonly executor: MailRewardExecutor
  ) {}

  public async deliver(request: MailRewardGrantRequest): Promise<boolean> {
    if (this.ledger.hasGranted(request.mailId)) {
      return false;
    }

    await this.executor.grant(request);
    this.ledger.markGranted(request.mailId, request.grantedAtMs);
    return true;
  }
}
