export type SocialRelationshipType = "friend" | "follow" | "blocked" | "mentor" | "squadmate";

export interface SocialRelationshipEdge {
  readonly sourcePlayerId: string;
  readonly targetPlayerId: string;
  readonly type: SocialRelationshipType;
  readonly createdAtMs: number;
}

export class SocialRelationshipGraph {
  private readonly edges = new Map<string, SocialRelationshipEdge>();

  public upsert(edge: SocialRelationshipEdge): SocialRelationshipEdge {
    this.edges.set(this.buildKey(edge.sourcePlayerId, edge.targetPlayerId, edge.type), edge);
    return { ...edge };
  }

  public remove(sourcePlayerId: string, targetPlayerId: string, type: SocialRelationshipType): void {
    this.edges.delete(this.buildKey(sourcePlayerId, targetPlayerId, type));
  }

  public listOutgoing(sourcePlayerId: string, type: SocialRelationshipType): readonly SocialRelationshipEdge[] {
    return Array.from(this.edges.values())
      .filter((edge) => edge.sourcePlayerId === sourcePlayerId && edge.type === type)
      .map((edge) => ({ ...edge }));
  }

  private buildKey(sourcePlayerId: string, targetPlayerId: string, type: SocialRelationshipType): string {
    return `${sourcePlayerId}:${targetPlayerId}:${type}`;
  }
}
