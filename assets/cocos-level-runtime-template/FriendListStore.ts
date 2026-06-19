export type FriendStatus = "pending" | "accepted" | "blocked";

export interface FriendRecord {
  readonly friendUserId: string;
  status: FriendStatus;
  remarkName: string | null;
  addedAtMs: number;
  intimacy: number;
}

export class FriendListStore {
  private readonly friends = new Map<string, FriendRecord>();

  public addPending(friendUserId: string, nowMs: number): FriendRecord {
    const record: FriendRecord = {
      friendUserId,
      status: "pending",
      remarkName: null,
      addedAtMs: nowMs,
      intimacy: 0,
    };
    this.friends.set(friendUserId, record);
    return { ...record };
  }

  public accept(friendUserId: string): FriendRecord {
    const friend = this.requireFriend(friendUserId);
    friend.status = "accepted";
    return { ...friend };
  }

  public block(friendUserId: string): FriendRecord {
    const friend = this.requireFriend(friendUserId);
    friend.status = "blocked";
    return { ...friend };
  }

  public setRemark(friendUserId: string, remarkName: string | null): FriendRecord {
    const friend = this.requireFriend(friendUserId);
    friend.remarkName = remarkName;
    return { ...friend };
  }

  public addIntimacy(friendUserId: string, value: number): FriendRecord {
    const friend = this.requireFriend(friendUserId);
    friend.intimacy += value;
    return { ...friend };
  }

  public getAcceptedFriends(): readonly FriendRecord[] {
    return Array.from(this.friends.values())
      .filter((friend) => friend.status === "accepted")
      .map((friend) => ({ ...friend }));
  }

  public createSnapshot(): readonly FriendRecord[] {
    return Array.from(this.friends.values()).map((friend) => ({ ...friend }));
  }

  private requireFriend(friendUserId: string): FriendRecord {
    const friend = this.friends.get(friendUserId);
    if (!friend) {
      throw new Error(`[FriendListStore] Missing friend: ${friendUserId}`);
    }
    return friend;
  }
}
