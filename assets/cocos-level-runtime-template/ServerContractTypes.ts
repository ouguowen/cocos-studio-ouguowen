export type ServerResponseStatus = "ok" | "retryable-error" | "fatal-error" | "conflict";

export interface ServerEnvelope<TPayload = unknown> {
  readonly requestId: string;
  readonly version: string;
  readonly serverTimeMs: number;
  readonly status: ServerResponseStatus;
  readonly payload: TPayload | null;
  readonly errorCode: string | null;
  readonly errorMessage: string | null;
}

export interface SyncAck<TPayload = unknown> {
  readonly operationId: string;
  readonly accepted: boolean;
  readonly nextVersion: string | null;
  readonly payload: TPayload | null;
}

export interface SyncConflict<TLocal = unknown, TServer = unknown> {
  readonly entityType: string;
  readonly entityId: string;
  readonly fieldPath: string;
  readonly localValue: TLocal;
  readonly serverValue: TServer;
  readonly localUpdatedAtMs: number;
  readonly serverUpdatedAtMs: number;
}

export interface SyncBatchResponse<TPayload = unknown> {
  readonly envelope: ServerEnvelope<readonly SyncAck<TPayload>[]>;
  readonly conflicts: readonly SyncConflict[];
}
