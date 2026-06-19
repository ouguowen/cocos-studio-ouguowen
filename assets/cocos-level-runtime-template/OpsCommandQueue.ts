export type OpsCommandStatus = "pending" | "sent" | "acknowledged" | "failed" | "cancelled";

export interface OpsCommandRecord<TPayload = unknown> {
  readonly commandId: string;
  readonly commandType: string;
  readonly targetScope: string;
  readonly payload: TPayload;
  readonly createdAtMs: number;
  status: OpsCommandStatus;
  sentAtMs: number | null;
  acknowledgedAtMs: number | null;
  lastError: string | null;
}

export class OpsCommandQueue<TPayload = unknown> {
  private readonly commands: OpsCommandRecord<TPayload>[] = [];

  public enqueue(command: OpsCommandRecord<TPayload>): OpsCommandRecord<TPayload> {
    this.commands.push(command);
    return { ...command };
  }

  public listPending(limit: number): readonly OpsCommandRecord<TPayload>[] {
    return this.commands
      .filter((command) => command.status === "pending" || command.status === "failed")
      .slice(0, limit)
      .map((command) => ({ ...command }));
  }

  public markSent(commandId: string, sentAtMs: number): OpsCommandRecord<TPayload> {
    const command = this.requireCommand(commandId);
    command.status = "sent";
    command.sentAtMs = sentAtMs;
    command.lastError = null;
    return { ...command };
  }

  public markAcknowledged(commandId: string, acknowledgedAtMs: number): OpsCommandRecord<TPayload> {
    const command = this.requireCommand(commandId);
    command.status = "acknowledged";
    command.acknowledgedAtMs = acknowledgedAtMs;
    command.lastError = null;
    return { ...command };
  }

  public markFailed(commandId: string, error: string): OpsCommandRecord<TPayload> {
    const command = this.requireCommand(commandId);
    command.status = "failed";
    command.lastError = error;
    return { ...command };
  }

  private requireCommand(commandId: string): OpsCommandRecord<TPayload> {
    const command = this.commands.find((candidate) => candidate.commandId === commandId);
    if (!command) {
      throw new Error(`[OpsCommandQueue] Missing command: ${commandId}`);
    }
    return command;
  }
}
