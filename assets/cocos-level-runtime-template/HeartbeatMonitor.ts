export interface HeartbeatSnapshot {
  readonly sentAtMs: number;
  readonly acknowledgedAtMs: number | null;
}

export class HeartbeatMonitor {
  private lastHeartbeat: HeartbeatSnapshot | null = null;

  public markSent(sentAtMs: number): HeartbeatSnapshot {
    this.lastHeartbeat = {
      sentAtMs,
      acknowledgedAtMs: null,
    };
    return { ...this.lastHeartbeat };
  }

  public markAcknowledged(acknowledgedAtMs: number): HeartbeatSnapshot {
    if (!this.lastHeartbeat) {
      throw new Error("[HeartbeatMonitor] Missing heartbeat to acknowledge.");
    }

    this.lastHeartbeat = {
      sentAtMs: this.lastHeartbeat.sentAtMs,
      acknowledgedAtMs,
    };
    return { ...this.lastHeartbeat };
  }

  public isStale(nowMs: number, timeoutMs: number): boolean {
    if (!this.lastHeartbeat) {
      return true;
    }

    const lastSeenAtMs = this.lastHeartbeat.acknowledgedAtMs ?? this.lastHeartbeat.sentAtMs;
    return nowMs - lastSeenAtMs > timeoutMs;
  }

  public getSnapshot(): HeartbeatSnapshot | null {
    return this.lastHeartbeat ? { ...this.lastHeartbeat } : null;
  }
}
