export type AccountBindingStatus = "linked" | "unlinked" | "revoked";

export interface AccountBindingRecord {
  readonly bindingId: string;
  readonly provider: string;
  readonly providerSubjectId: string;
  readonly createdAtMs: number;
  readonly displayName: string | null;
  status: AccountBindingStatus;
  isPrimary: boolean;
}

export class AccountBindingStore {
  private readonly bindings = new Map<string, AccountBindingRecord>();

  public upsert(binding: AccountBindingRecord): AccountBindingRecord {
    this.bindings.set(binding.bindingId, binding);
    return { ...binding };
  }

  public revoke(bindingId: string): AccountBindingRecord {
    const binding = this.requireBinding(bindingId);
    binding.status = "revoked";
    binding.isPrimary = false;
    return { ...binding };
  }

  public setPrimary(bindingId: string): AccountBindingRecord {
    const binding = this.requireBinding(bindingId);
    for (const candidate of this.bindings.values()) {
      candidate.isPrimary = candidate.bindingId === bindingId && candidate.status === "linked";
    }
    return { ...binding };
  }

  public listLinked(): readonly AccountBindingRecord[] {
    return Array.from(this.bindings.values())
      .filter((binding) => binding.status === "linked")
      .map((binding) => ({ ...binding }));
  }

  private requireBinding(bindingId: string): AccountBindingRecord {
    const binding = this.bindings.get(bindingId);
    if (!binding) {
      throw new Error(`[AccountBindingStore] Missing binding: ${bindingId}`);
    }
    return binding;
  }
}
