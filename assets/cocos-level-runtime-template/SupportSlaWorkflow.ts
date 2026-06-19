export type SupportSlaStage = "new" | "responded" | "investigating" | "resolved" | "breached";

export interface SupportSlaTicket {
  readonly ticketId: string;
  readonly createdAtMs: number;
  readonly firstResponseDueAtMs: number;
  readonly resolutionDueAtMs: number;
  stage: SupportSlaStage;
  firstRespondedAtMs: number | null;
  resolvedAtMs: number | null;
}

export class SupportSlaWorkflow {
  public markResponded(ticket: SupportSlaTicket, respondedAtMs: number): SupportSlaTicket {
    ticket.stage = "responded";
    ticket.firstRespondedAtMs = respondedAtMs;
    return { ...ticket };
  }

  public markResolved(ticket: SupportSlaTicket, resolvedAtMs: number): SupportSlaTicket {
    ticket.stage = "resolved";
    ticket.resolvedAtMs = resolvedAtMs;
    return { ...ticket };
  }

  public evaluateBreach(ticket: SupportSlaTicket, nowMs: number): SupportSlaTicket {
    const firstResponseBreached =
      ticket.firstRespondedAtMs === null && nowMs > ticket.firstResponseDueAtMs;
    const resolutionBreached = ticket.resolvedAtMs === null && nowMs > ticket.resolutionDueAtMs;

    if (firstResponseBreached || resolutionBreached) {
      ticket.stage = "breached";
    }

    return { ...ticket };
  }
}
