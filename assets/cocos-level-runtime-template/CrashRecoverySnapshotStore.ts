export interface CrashRecoverySnapshot<TState = unknown> {
  readonly snapshotId: string;
  readonly sceneId: string;
  readonly capturedAtMs: number;
  readonly appVersion: string;
  readonly recoverable: boolean;
  readonly state: TState;
}

export class CrashRecoverySnapshotStore<TState = unknown> {
  private latestSnapshot: CrashRecoverySnapshot<TState> | null = null;

  public save(snapshot: CrashRecoverySnapshot<TState>): CrashRecoverySnapshot<TState> {
    this.latestSnapshot = snapshot;
    return { ...snapshot };
  }

  public loadLatest(): CrashRecoverySnapshot<TState> | null {
    return this.latestSnapshot ? { ...this.latestSnapshot } : null;
  }

  public clear(): void {
    this.latestSnapshot = null;
  }
}
