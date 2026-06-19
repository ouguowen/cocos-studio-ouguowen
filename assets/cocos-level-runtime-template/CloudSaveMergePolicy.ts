import type { CloudSaveSlotRecord } from "./CloudSaveManifest";

export type CloudSaveMergeStrategy = "use-local" | "use-remote" | "use-newer-revision" | "manual-review";

export interface CloudSaveMergeDecision {
  readonly strategy: CloudSaveMergeStrategy;
  readonly chosenSlotId: string | null;
  readonly reason: string;
}

export class CloudSaveMergePolicy {
  public constructor(
    private readonly defaultStrategy: CloudSaveMergeStrategy = "use-newer-revision"
  ) {}

  public resolve(
    localSlot: CloudSaveSlotRecord | null,
    remoteSlot: CloudSaveSlotRecord | null
  ): CloudSaveMergeDecision {
    if (localSlot !== null && remoteSlot === null) {
      return {
        strategy: "use-local",
        chosenSlotId: localSlot.slotId,
        reason: "Only local save exists.",
      };
    }

    if (localSlot === null && remoteSlot !== null) {
      return {
        strategy: "use-remote",
        chosenSlotId: remoteSlot.slotId,
        reason: "Only remote save exists.",
      };
    }

    if (localSlot === null && remoteSlot === null) {
      return {
        strategy: "manual-review",
        chosenSlotId: null,
        reason: "No save candidate exists.",
      };
    }

    if (localSlot === null || remoteSlot === null) {
      throw new Error("[CloudSaveMergePolicy] Unexpected empty save candidate state.");
    }

    const ensuredLocal: CloudSaveSlotRecord = localSlot;
    const ensuredRemote: CloudSaveSlotRecord = remoteSlot;

    if (this.defaultStrategy === "use-local") {
      return {
        strategy: "use-local",
        chosenSlotId: ensuredLocal.slotId,
        reason: "Policy prefers local save.",
      };
    }

    if (this.defaultStrategy === "use-remote") {
      return {
        strategy: "use-remote",
        chosenSlotId: ensuredRemote.slotId,
        reason: "Policy prefers remote save.",
      };
    }

    if (this.defaultStrategy === "manual-review") {
      return {
        strategy: "manual-review",
        chosenSlotId: null,
        reason: "Policy requires manual review.",
      };
    }

    const useLocal =
      ensuredLocal.revision > ensuredRemote.revision ||
      (ensuredLocal.revision === ensuredRemote.revision &&
        ensuredLocal.updatedAtMs >= ensuredRemote.updatedAtMs);

    return {
      strategy: "use-newer-revision",
      chosenSlotId: useLocal ? ensuredLocal.slotId : ensuredRemote.slotId,
      reason: "Policy keeps the newer revision, then the newer update time.",
    };
  }
}
