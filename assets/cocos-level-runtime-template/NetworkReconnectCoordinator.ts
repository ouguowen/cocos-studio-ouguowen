export interface ReconnectAttemptRecord {
  readonly attemptIndex: number;
  readonly startedAtMs: number;
  readonly reason: string;
}

export interface ReconnectTransport {
  reconnect(): Promise<void> | void;
}

export class NetworkReconnectCoordinator {
  private readonly attempts: ReconnectAttemptRecord[] = [];

  public constructor(
    private readonly transport: ReconnectTransport,
    private readonly maxAttempts: number
  ) {}

  public async tryReconnect(nowMs: number, reason: string): Promise<boolean> {
    if (this.attempts.length >= this.maxAttempts) {
      return false;
    }

    this.attempts.push({
      attemptIndex: this.attempts.length + 1,
      startedAtMs: nowMs,
      reason,
    });

    await this.transport.reconnect();
    return true;
  }

  public reset(): void {
    this.attempts.length = 0;
  }

  public getAttempts(): readonly ReconnectAttemptRecord[] {
    return this.attempts.map((attempt) => ({ ...attempt }));
  }
}
