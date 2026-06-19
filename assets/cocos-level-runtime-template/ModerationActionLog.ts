export type ModerationActionType = "warn" | "mute" | "ban" | "rollback" | "note";

export interface ModerationActionRecord {
  readonly actionId: string;
  readonly targetUserId: string;
  readonly operatorUserId: string;
  readonly actionType: ModerationActionType;
  readonly reason: string;
  readonly createdAtMs: number;
  readonly expiresAtMs: number | null;
}

export class ModerationActionLog {
  private readonly actions: ModerationActionRecord[] = [];

  public append(record: ModerationActionRecord): ModerationActionRecord {
    this.actions.unshift(record);
    return { ...record };
  }

  public listForUser(targetUserId: string): readonly ModerationActionRecord[] {
    return this.actions.filter((action) => action.targetUserId === targetUserId).map((action) => ({ ...action }));
  }

  public getActiveActions(targetUserId: string, nowMs: number): readonly ModerationActionRecord[] {
    return this.actions
      .filter((action) => action.targetUserId === targetUserId)
      .filter((action) => action.expiresAtMs === null || nowMs <= action.expiresAtMs)
      .map((action) => ({ ...action }));
  }

  public createSnapshot(): readonly ModerationActionRecord[] {
    return this.actions.map((action) => ({ ...action }));
  }
}
