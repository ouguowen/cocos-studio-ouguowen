export interface CurrencyBalance {
  readonly currencyId: string;
  amount: number;
}

export interface CurrencyTransaction {
  readonly currencyId: string;
  readonly delta: number;
  readonly reason: string;
  readonly atMs: number;
}

export class CurrencyWallet {
  private readonly balances = new Map<string, number>();
  private readonly transactions: CurrencyTransaction[] = [];

  public getBalance(currencyId: string): number {
    return this.balances.get(currencyId) ?? 0;
  }

  public hasEnough(currencyId: string, amount: number): boolean {
    return this.getBalance(currencyId) >= amount;
  }

  public credit(currencyId: string, amount: number, reason: string, atMs: number): number {
    if (amount < 0) {
      throw new Error("[CurrencyWallet] credit amount must be non-negative.");
    }
    return this.applyDelta(currencyId, amount, reason, atMs);
  }

  public debit(currencyId: string, amount: number, reason: string, atMs: number): number {
    if (amount < 0) {
      throw new Error("[CurrencyWallet] debit amount must be non-negative.");
    }

    const current = this.getBalance(currencyId);
    if (current < amount) {
      throw new Error(`[CurrencyWallet] Insufficient ${currencyId}. Required ${amount}, got ${current}.`);
    }

    return this.applyDelta(currencyId, -amount, reason, atMs);
  }

  public createSnapshot(): readonly CurrencyBalance[] {
    return Array.from(this.balances.entries()).map(([currencyId, amount]) => ({
      currencyId,
      amount,
    }));
  }

  public getRecentTransactions(limit: number): readonly CurrencyTransaction[] {
    return this.transactions.slice(0, limit);
  }

  private applyDelta(currencyId: string, delta: number, reason: string, atMs: number): number {
    const next = this.getBalance(currencyId) + delta;
    this.balances.set(currencyId, next);
    this.transactions.unshift({
      currencyId,
      delta,
      reason,
      atMs,
    });
    return next;
  }
}
