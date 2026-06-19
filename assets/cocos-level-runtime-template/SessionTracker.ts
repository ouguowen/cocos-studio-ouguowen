export interface SessionSnapshot {
  readonly sessionId: string;
  readonly userId: string | null;
  readonly startedAtMs: number;
  readonly lastActiveAtMs: number;
  readonly endedAtMs: number | null;
}

export class SessionTracker {
  private session: SessionSnapshot | null = null;

  public startSession(sessionId: string, startedAtMs: number, userId: string | null = null): SessionSnapshot {
    this.session = {
      sessionId,
      userId,
      startedAtMs,
      lastActiveAtMs: startedAtMs,
      endedAtMs: null,
    };
    return this.session;
  }

  public touch(nowMs: number): SessionSnapshot {
    const session = this.requireSession();
    this.session = {
      ...session,
      lastActiveAtMs: nowMs,
    };
    return this.session;
  }

  public endSession(nowMs: number): SessionSnapshot {
    const session = this.requireSession();
    this.session = {
      ...session,
      lastActiveAtMs: nowMs,
      endedAtMs: nowMs,
    };
    return this.session;
  }

  public getSession(): SessionSnapshot | null {
    return this.session;
  }

  private requireSession(): SessionSnapshot {
    if (!this.session) {
      throw new Error("[SessionTracker] No active session.");
    }
    return this.session;
  }
}
