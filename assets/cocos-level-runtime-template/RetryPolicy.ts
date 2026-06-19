export interface RetryPolicyConfig {
  readonly maxRetries: number;
  readonly baseDelayMs: number;
  readonly maxDelayMs: number;
  readonly multiplier: number;
}

export class RetryPolicy {
  public constructor(private readonly config: RetryPolicyConfig) {}

  public canRetry(retryCount: number): boolean {
    return retryCount < this.config.maxRetries;
  }

  public getDelayMs(retryCount: number): number {
    const delay = this.config.baseDelayMs * Math.pow(this.config.multiplier, retryCount);
    return Math.min(delay, this.config.maxDelayMs);
  }
}
