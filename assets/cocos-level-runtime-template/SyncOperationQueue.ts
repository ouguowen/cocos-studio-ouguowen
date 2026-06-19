export type SyncOperationStatus = "pending" | "processing" | "completed" | "failed";

export interface SyncOperationRecord<TPayload = unknown> {
  readonly operationId: string;
  readonly operationType: string;
  readonly payload: TPayload;
  status: SyncOperationStatus;
  retryCount: number;
  readonly createdAtMs: number;
  lastAttemptAtMs: number | null;
  lastError: string | null;
}

export class SyncOperationQueue<TPayload = unknown> {
  private readonly operations: SyncOperationRecord<TPayload>[] = [];

  public enqueue(operation: SyncOperationRecord<TPayload>): SyncOperationRecord<TPayload> {
    this.operations.push(operation);
    return { ...operation };
  }

  public peekPending(limit: number): readonly SyncOperationRecord<TPayload>[] {
    return this.operations
      .filter((operation) => operation.status === "pending" || operation.status === "failed")
      .slice(0, limit)
      .map((operation) => ({ ...operation }));
  }

  public markProcessing(operationId: string, attemptedAtMs: number): SyncOperationRecord<TPayload> {
    const operation = this.requireOperation(operationId);
    operation.status = "processing";
    operation.lastAttemptAtMs = attemptedAtMs;
    return { ...operation };
  }

  public markCompleted(operationId: string): SyncOperationRecord<TPayload> {
    const operation = this.requireOperation(operationId);
    operation.status = "completed";
    operation.lastError = null;
    return { ...operation };
  }

  public markFailed(operationId: string, error: string): SyncOperationRecord<TPayload> {
    const operation = this.requireOperation(operationId);
    operation.status = "failed";
    operation.retryCount += 1;
    operation.lastError = error;
    return { ...operation };
  }

  public createSnapshot(): readonly SyncOperationRecord<TPayload>[] {
    return this.operations.map((operation) => ({ ...operation }));
  }

  private requireOperation(operationId: string): SyncOperationRecord<TPayload> {
    const operation = this.operations.find((item) => item.operationId === operationId);
    if (!operation) {
      throw new Error(`[SyncOperationQueue] Missing operation: ${operationId}`);
    }
    return operation;
  }
}
