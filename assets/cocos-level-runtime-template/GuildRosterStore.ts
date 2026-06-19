export type GuildRole = "leader" | "officer" | "member";

export interface GuildMemberRecord {
  readonly userId: string;
  role: GuildRole;
  contribution: number;
  joinedAtMs: number;
}

export interface GuildSnapshot {
  readonly guildId: string;
  readonly name: string;
  readonly members: readonly GuildMemberRecord[];
}

export class GuildRosterStore {
  private guildId: string | null = null;
  private guildName = "";
  private readonly members = new Map<string, GuildMemberRecord>();

  public initializeGuild(guildId: string, name: string): void {
    this.guildId = guildId;
    this.guildName = name;
  }

  public addMember(userId: string, role: GuildRole, joinedAtMs: number): GuildMemberRecord {
    const member: GuildMemberRecord = {
      userId,
      role,
      contribution: 0,
      joinedAtMs,
    };
    this.members.set(userId, member);
    return { ...member };
  }

  public setRole(userId: string, role: GuildRole): GuildMemberRecord {
    const member = this.requireMember(userId);
    member.role = role;
    return { ...member };
  }

  public addContribution(userId: string, value: number): GuildMemberRecord {
    const member = this.requireMember(userId);
    member.contribution += value;
    return { ...member };
  }

  public removeMember(userId: string): void {
    this.members.delete(userId);
  }

  public createSnapshot(): GuildSnapshot {
    return {
      guildId: this.guildId ?? "",
      name: this.guildName,
      members: Array.from(this.members.values()).map((member) => ({ ...member })),
    };
  }

  private requireMember(userId: string): GuildMemberRecord {
    const member = this.members.get(userId);
    if (!member) {
      throw new Error(`[GuildRosterStore] Missing member: ${userId}`);
    }
    return member;
  }
}
