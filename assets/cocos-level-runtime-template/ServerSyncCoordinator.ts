import type { RetryPolicy } from "./RetryPolicy";
import type { SyncOperationQueue, SyncOperationRecord } from "./SyncOperationQueue";

export interface SyncTransport<TPayload = unknown> {
  send(operation: SyncOperationRecord<TPayload>): Promise<void> | void;
}

export interface SyncExecutionResult {
  readonly processedCount: number;
  readonly failedOperationIds: readonly string[];
}

export class ServerSyncCoordinator<TPayload = unknown> {
  public constructor(
    private readonly queue: SyncOperationQueue<TPayload>,
    private readonly retryPolicy: RetryPolicy,
    private readonly transport: SyncTransport<TPayload>
  ) {}

  public async flush(nowMs: number, limit = 20): Promise<SyncExecutionResult> {
    const pending = this.queue.peekPending(limit);
    const failedOperationIds: string[] = [];
    let processedCount = 0;

    for (const operation of pending) {
      if (!this.retryPolicy.canRetry(operation.retryCount)) {
        failedOperationIds.push(operation.operationId);
        continue;
      }

      if (!this.isReadyForAttempt(operation, nowMs)) {
        continue;
      }

      this.queue.markProcessing(operation.operationId, nowMs);
      try {
        await this.transport.send(operation);
        this.queue.markCompleted(operation.operationId);
        processedCount += 1;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        this.queue.markFailed(operation.operationId, message);
        failedOperationIds.push(operation.operationId);
      }
    }

    return {
      processedCount,
      failedOperationIds,
    };
  }

  private isReadyForAttempt(operation: SyncOperationRecord<TPayload>, nowMs: number): boolean {
    if (operation.retryCount === 0 || operation.lastAttemptAtMs === null) {
      return true;
    }

    const nextAttemptAtMs =
      operation.lastAttemptAtMs + this.retryPolicy.getDelayMs(operation.retryCount);
    return nowMs >= nextAttemptAtMs;
  }
}
