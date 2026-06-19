export type AppealCaseStatus = "open" | "reviewing" | "approved" | "rejected" | "closed";

export interface AppealCaseRecord {
  readonly caseId: string;
  readonly playerId: string;
  readonly appealType: string;
  readonly createdAtMs: number;
  readonly sourceActionId: string | null;
  status: AppealCaseStatus;
  assignedAgentId: string | null;
  resolutionNote: string | null;
}

export class AppealCaseStore {
  private readonly cases = new Map<string, AppealCaseRecord>();

  public upsert(record: AppealCaseRecord): AppealCaseRecord {
    this.cases.set(record.caseId, record);
    return { ...record };
  }

  public assign(caseId: string, agentId: string): AppealCaseRecord {
    const record = this.requireCase(caseId);
    record.assignedAgentId = agentId;
    record.status = "reviewing";
    return { ...record };
  }

  public resolve(caseId: string, status: "approved" | "rejected", resolutionNote: string): AppealCaseRecord {
    const record = this.requireCase(caseId);
    record.status = status;
    record.resolutionNote = resolutionNote;
    return { ...record };
  }

  public listOpenCases(): readonly AppealCaseRecord[] {
    return Array.from(this.cases.values())
      .filter((record) => record.status === "open" || record.status === "reviewing")
      .map((record) => ({ ...record }));
  }

  private requireCase(caseId: string): AppealCaseRecord {
    const record = this.cases.get(caseId);
    if (!record) {
      throw new Error(`[AppealCaseStore] Missing appeal case: ${caseId}`);
    }
    return record;
  }
}
