import type { AuthSessionStore } from "./AuthSessionStore";
import type { CloudSaveSlotRecord } from "./CloudSaveManifest";
import { CloudSaveMergePolicy, type CloudSaveMergeDecision } from "./CloudSaveMergePolicy";

export interface CloudSaveProvider {
  fetchRemoteSlot(slotId: string, accessToken: string): Promise<CloudSaveSlotRecord | null> | CloudSaveSlotRecord | null;
  pushLocalSlot(slot: CloudSaveSlotRecord, accessToken: string): Promise<void> | void;
  pullRemoteSlot(slot: CloudSaveSlotRecord, accessToken: string): Promise<void> | void;
}

export interface CloudSaveSyncResult {
  readonly decision: CloudSaveMergeDecision;
  readonly executedAction: "push-local" | "pull-remote" | "manual-review" | "noop";
}

export class CloudSaveSyncCoordinator {
  public constructor(
    private readonly authSessionStore: AuthSessionStore,
    private readonly mergePolicy: CloudSaveMergePolicy,
    private readonly provider: CloudSaveProvider
  ) {}

  public async syncSlot(
    slotId: string,
    localSlot: CloudSaveSlotRecord | null,
    nowMs: number
  ): Promise<CloudSaveSyncResult> {
    const accessToken = this.authSessionStore.requireAccessToken(nowMs);
    const remoteSlot = await this.provider.fetchRemoteSlot(slotId, accessToken);
    const decision = this.mergePolicy.resolve(localSlot, remoteSlot);

    if (decision.strategy === "manual-review") {
      return { decision, executedAction: "manual-review" };
    }

    if (decision.chosenSlotId === null) {
      return { decision, executedAction: "noop" };
    }

    if (localSlot && decision.chosenSlotId === localSlot.slotId) {
      await this.provider.pushLocalSlot(localSlot, accessToken);
      return { decision, executedAction: "push-local" };
    }

    if (remoteSlot) {
      await this.provider.pullRemoteSlot(remoteSlot, accessToken);
      return { decision, executedAction: "pull-remote" };
    }

    return { decision, executedAction: "noop" };
  }
}
