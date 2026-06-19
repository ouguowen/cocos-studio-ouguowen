export type PlayerReportStatus = "pending" | "reviewing" | "actioned" | "dismissed";

export interface PlayerReportRecord {
  readonly reportId: string;
  readonly reporterUserId: string;
  readonly targetUserId: string;
  readonly reason: string;
  readonly evidenceIds: readonly string[];
  status: PlayerReportStatus;
  readonly createdAtMs: number;
  reviewedAtMs: number | null;
}

export class PlayerReportInbox {
  private readonly reports = new Map<string, PlayerReportRecord>();

  public submit(report: PlayerReportRecord): PlayerReportRecord {
    this.reports.set(report.reportId, {
      ...report,
      evidenceIds: [...report.evidenceIds],
    });
    return this.requireReport(report.reportId);
  }

  public setStatus(reportId: string, status: PlayerReportStatus, reviewedAtMs: number | null): PlayerReportRecord {
    const report = this.requireReport(reportId);
    report.status = status;
    report.reviewedAtMs = reviewedAtMs;
    return {
      ...report,
      evidenceIds: [...report.evidenceIds],
    };
  }

  public listPending(): readonly PlayerReportRecord[] {
    return Array.from(this.reports.values())
      .filter((report) => report.status === "pending" || report.status === "reviewing")
      .map((report) => ({
        ...report,
        evidenceIds: [...report.evidenceIds],
      }));
  }

  public createSnapshot(): readonly PlayerReportRecord[] {
    return Array.from(this.reports.values()).map((report) => ({
      ...report,
      evidenceIds: [...report.evidenceIds],
    }));
  }

  private requireReport(reportId: string): PlayerReportRecord {
    const report = this.reports.get(reportId);
    if (!report) {
      throw new Error(`[PlayerReportInbox] Missing report: ${reportId}`);
    }
    return report;
  }
}
