import type { SyncSnapshot } from "./SyncSnapshotCodec";
import { SyncSnapshotCodec } from "./SyncSnapshotCodec";

export interface SyncSnapshotStorage {
  load(): string | null;
  save(raw: string): void;
  clear(): void;
}

export class MemorySyncSnapshotStorage implements SyncSnapshotStorage {
  private raw: string | null = null;

  public load(): string | null {
    return this.raw;
  }

  public save(raw: string): void {
    this.raw = raw;
  }

  public clear(): void {
    this.raw = null;
  }
}

export class SyncSnapshotRepository {
  public constructor(
    private readonly storage: SyncSnapshotStorage,
    private readonly codec: SyncSnapshotCodec = new SyncSnapshotCodec()
  ) {}

  public load<TPayload = unknown, TCacheValue = unknown>():
    | SyncSnapshot<TPayload, TCacheValue>
    | null {
    const raw = this.storage.load();
    if (raw === null) {
      return null;
    }
    return this.codec.decode<TPayload, TCacheValue>(raw);
  }

  public save<TPayload = unknown, TCacheValue = unknown>(
    snapshot: SyncSnapshot<TPayload, TCacheValue>
  ): SyncSnapshot<TPayload, TCacheValue> {
    const raw = this.codec.encode(snapshot);
    this.storage.save(raw);
    return snapshot;
  }

  public clear(): void {
    this.storage.clear();
  }
}
