export type SupportTicketStatus = "open" | "in_progress" | "resolved" | "closed";

export interface SupportTicketRecord {
  readonly ticketId: string;
  readonly userId: string;
  readonly category: string;
  readonly title: string;
  readonly description: string;
  status: SupportTicketStatus;
  readonly createdAtMs: number;
  updatedAtMs: number;
}

export class SupportTicketStore {
  private readonly tickets = new Map<string, SupportTicketRecord>();

  public create(ticket: SupportTicketRecord): SupportTicketRecord {
    this.tickets.set(ticket.ticketId, { ...ticket });
    return this.requireTicket(ticket.ticketId);
  }

  public setStatus(ticketId: string, status: SupportTicketStatus, updatedAtMs: number): SupportTicketRecord {
    const ticket = this.requireTicket(ticketId);
    ticket.status = status;
    ticket.updatedAtMs = updatedAtMs;
    return { ...ticket };
  }

  public listByUser(userId: string): readonly SupportTicketRecord[] {
    return Array.from(this.tickets.values())
      .filter((ticket) => ticket.userId === userId)
      .map((ticket) => ({ ...ticket }));
  }

  public createSnapshot(): readonly SupportTicketRecord[] {
    return Array.from(this.tickets.values()).map((ticket) => ({ ...ticket }));
  }

  private requireTicket(ticketId: string): SupportTicketRecord {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) {
      throw new Error(`[SupportTicketStore] Missing ticket: ${ticketId}`);
    }
    return ticket;
  }
}
