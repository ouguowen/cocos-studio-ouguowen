export interface AnnouncementRecord {
  readonly announcementId: string;
  readonly title: string;
  readonly body: string;
  readonly channel: string;
  readonly priority: number;
  readonly startsAtMs: number;
  readonly endsAtMs: number | null;
  dismissed: boolean;
  readAtMs: number | null;
}

export class AnnouncementBoard {
  private readonly announcements = new Map<string, AnnouncementRecord>();

  public upsert(record: AnnouncementRecord): AnnouncementRecord {
    this.announcements.set(record.announcementId, record);
    return { ...record };
  }

  public listVisible(nowMs: number): readonly AnnouncementRecord[] {
    return Array.from(this.announcements.values())
      .filter((record) => record.startsAtMs <= nowMs && (record.endsAtMs === null || nowMs <= record.endsAtMs))
      .sort((left, right) => right.priority - left.priority || left.startsAtMs - right.startsAtMs)
      .map((record) => ({ ...record }));
  }

  public markRead(announcementId: string, readAtMs: number): AnnouncementRecord {
    const record = this.requireRecord(announcementId);
    record.readAtMs = readAtMs;
    return { ...record };
  }

  public dismiss(announcementId: string): AnnouncementRecord {
    const record = this.requireRecord(announcementId);
    record.dismissed = true;
    return { ...record };
  }

  private requireRecord(announcementId: string): AnnouncementRecord {
    const record = this.announcements.get(announcementId);
    if (!record) {
      throw new Error(`[AnnouncementBoard] Missing announcement: ${announcementId}`);
    }
    return record;
  }
}
