export interface NotificationRecord {
  readonly notificationId: string;
  readonly type: string;
  readonly title: string;
  readonly message: string;
  readonly createdAtMs: number;
  dismissed: boolean;
}

export class NotificationInbox {
  private readonly notifications = new Map<string, NotificationRecord>();

  public push(notification: NotificationRecord): NotificationRecord {
    this.notifications.set(notification.notificationId, { ...notification });
    return this.requireNotification(notification.notificationId);
  }

  public dismiss(notificationId: string): NotificationRecord {
    const notification = this.requireNotification(notificationId);
    notification.dismissed = true;
    return { ...notification };
  }

  public listActive(): readonly NotificationRecord[] {
    return Array.from(this.notifications.values())
      .filter((notification) => !notification.dismissed)
      .sort((left, right) => right.createdAtMs - left.createdAtMs)
      .map((notification) => ({ ...notification }));
  }

  public createSnapshot(): readonly NotificationRecord[] {
    return Array.from(this.notifications.values()).map((notification) => ({ ...notification }));
  }

  private requireNotification(notificationId: string): NotificationRecord {
    const notification = this.notifications.get(notificationId);
    if (!notification) {
      throw new Error(`[NotificationInbox] Missing notification: ${notificationId}`);
    }
    return notification;
  }
}
