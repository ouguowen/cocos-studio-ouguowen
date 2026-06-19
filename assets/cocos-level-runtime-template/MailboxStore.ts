export interface MailAttachment {
  readonly itemId: string;
  readonly count: number;
}

export interface MailRecord {
  readonly mailId: string;
  readonly title: string;
  readonly body: string;
  readonly attachments: readonly MailAttachment[];
  readonly receivedAtMs: number;
  read: boolean;
  claimed: boolean;
}

export class MailboxStore {
  private readonly mails = new Map<string, MailRecord>();

  public receive(mail: MailRecord): MailRecord {
    this.mails.set(mail.mailId, {
      ...mail,
      attachments: [...mail.attachments],
    });
    return this.requireMail(mail.mailId);
  }

  public markRead(mailId: string): MailRecord {
    const mail = this.requireMail(mailId);
    mail.read = true;
    return { ...mail, attachments: [...mail.attachments] };
  }

  public markClaimed(mailId: string): MailRecord {
    const mail = this.requireMail(mailId);
    mail.claimed = true;
    return { ...mail, attachments: [...mail.attachments] };
  }

  public listUnclaimed(): readonly MailRecord[] {
    return Array.from(this.mails.values())
      .filter((mail) => !mail.claimed)
      .map((mail) => ({ ...mail, attachments: [...mail.attachments] }));
  }

  public createSnapshot(): readonly MailRecord[] {
    return Array.from(this.mails.values()).map((mail) => ({
      ...mail,
      attachments: [...mail.attachments],
    }));
  }

  private requireMail(mailId: string): MailRecord {
    const mail = this.mails.get(mailId);
    if (!mail) {
      throw new Error(`[MailboxStore] Missing mail: ${mailId}`);
    }
    return mail;
  }
}
