import type { SyncConflict } from "./ServerContractTypes";

export type ConflictResolutionStrategy = "use-local" | "use-server" | "merge" | "manual-review";

export interface ConflictResolutionDecision<TResolved = unknown> {
  readonly strategy: ConflictResolutionStrategy;
  readonly resolvedValue: TResolved | null;
  readonly reason: string;
}

export interface ConflictResolutionRule<
  TLocal = unknown,
  TServer = unknown,
  TResolved = unknown,
> {
  matches(conflict: SyncConflict<TLocal, TServer>): boolean;
  resolve(conflict: SyncConflict<TLocal, TServer>): ConflictResolutionDecision<TResolved>;
}

export class ConflictResolutionPolicy {
  public constructor(
    private readonly rules: readonly ConflictResolutionRule[] = [],
    private readonly fallbackStrategy: ConflictResolutionStrategy = "use-server"
  ) {}

  public resolve<TLocal = unknown, TServer = unknown>(
    conflict: SyncConflict<TLocal, TServer>
  ): ConflictResolutionDecision<TLocal | TServer> {
    const rule = this.rules.find((candidate) => candidate.matches(conflict));
    if (rule) {
      return rule.resolve(conflict) as ConflictResolutionDecision<TLocal | TServer>;
    }

    if (this.fallbackStrategy === "use-local") {
      return {
        strategy: "use-local",
        resolvedValue: conflict.localValue,
        reason: "Fallback policy prefers local state.",
      };
    }

    if (this.fallbackStrategy === "merge") {
      const useLocal = conflict.localUpdatedAtMs >= conflict.serverUpdatedAtMs;
      return {
        strategy: "merge",
        resolvedValue: useLocal ? conflict.localValue : conflict.serverValue,
        reason: "Fallback merge keeps the newer value until a custom merge rule is added.",
      };
    }

    if (this.fallbackStrategy === "manual-review") {
      return {
        strategy: "manual-review",
        resolvedValue: null,
        reason: "Fallback policy escalates unresolved conflicts for manual review.",
      };
    }

    return {
      strategy: "use-server",
      resolvedValue: conflict.serverValue,
      reason: "Fallback policy prefers server state.",
    };
  }
}
