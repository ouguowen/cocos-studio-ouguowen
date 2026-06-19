export type QuestStatus = "active" | "completed" | "claimed";

export interface QuestRecord {
  readonly questId: string;
  readonly questType: string;
  readonly targetValue: number;
  progressValue: number;
  status: QuestStatus;
  readonly rewardIds: readonly string[];
}

export interface QuestProgressEvent {
  readonly questType: string;
  readonly value: number;
}

export class QuestTracker {
  private readonly quests = new Map<string, QuestRecord>();

  public constructor(quests: readonly QuestRecord[] = []) {
    for (const quest of quests) {
      this.quests.set(quest.questId, { ...quest });
    }
  }

  public getQuest(questId: string): QuestRecord | null {
    return this.quests.get(questId) ?? null;
  }

  public applyProgress(event: QuestProgressEvent): readonly QuestRecord[] {
    const updated: QuestRecord[] = [];
    for (const quest of this.quests.values()) {
      if (quest.status === "claimed" || quest.questType !== event.questType) {
        continue;
      }

      const nextProgress = Math.min(quest.progressValue + event.value, quest.targetValue);
      quest.progressValue = nextProgress;
      if (nextProgress >= quest.targetValue) {
        quest.status = "completed";
      }
      updated.push({ ...quest });
    }
    return updated;
  }

  public claimQuest(questId: string): QuestRecord {
    const quest = this.quests.get(questId);
    if (!quest) {
      throw new Error(`[QuestTracker] Missing quest: ${questId}`);
    }
    if (quest.status !== "completed") {
      throw new Error(`[QuestTracker] Quest is not claimable: ${questId}`);
    }

    quest.status = "claimed";
    return { ...quest };
  }

  public createSnapshot(): readonly QuestRecord[] {
    return Array.from(this.quests.values()).map((quest) => ({ ...quest }));
  }
}
