import type { OfflineCacheEntry } from "./OfflineCacheStore";
import type { PurchaseRecoveryRecord } from "./PurchaseRecoveryQueue";
import type { SyncOperationRecord } from "./SyncOperationQueue";

export interface SyncSnapshot<TPayload = unknown, TCacheValue = unknown> {
  readonly revision: number;
  readonly savedAtMs: number;
  readonly lastSuccessfulFlushAtMs: number | null;
  readonly offlineCacheEntries: readonly OfflineCacheEntry<TCacheValue>[];
  readonly syncOperations: readonly SyncOperationRecord<TPayload>[];
  readonly purchaseRecoveries: readonly PurchaseRecoveryRecord[];
}

export class SyncSnapshotCodec {
  public encode<TPayload = unknown, TCacheValue = unknown>(
    snapshot: SyncSnapshot<TPayload, TCacheValue>
  ): string {
    return JSON.stringify(snapshot);
  }

  public decode<TPayload = unknown, TCacheValue = unknown>(
    raw: string
  ): SyncSnapshot<TPayload, TCacheValue> {
    const parsed = JSON.parse(raw) as Partial<SyncSnapshot<TPayload, TCacheValue>>;
    if (
      typeof parsed.revision !== "number" ||
      typeof parsed.savedAtMs !== "number" ||
      !Array.isArray(parsed.offlineCacheEntries) ||
      !Array.isArray(parsed.syncOperations) ||
      !Array.isArray(parsed.purchaseRecoveries)
    ) {
      throw new Error("[SyncSnapshotCodec] Invalid sync snapshot payload.");
    }

    return {
      revision: parsed.revision,
      savedAtMs: parsed.savedAtMs,
      lastSuccessfulFlushAtMs:
        typeof parsed.lastSuccessfulFlushAtMs === "number" ? parsed.lastSuccessfulFlushAtMs : null,
      offlineCacheEntries: parsed.offlineCacheEntries,
      syncOperations: parsed.syncOperations,
      purchaseRecoveries: parsed.purchaseRecoveries,
    };
  }
}
