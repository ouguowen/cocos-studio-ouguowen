export type MatchmakingStatus = "queued" | "matched" | "cancelled" | "timed-out";

export interface MatchmakingRequest {
  readonly requestId: string;
  readonly playerId: string;
  readonly playlistId: string;
  readonly rating: number;
  readonly queuedAtMs: number;
  status: MatchmakingStatus;
}

export class MatchmakingQueue {
  private readonly requests: MatchmakingRequest[] = [];

  public enqueue(request: MatchmakingRequest): MatchmakingRequest {
    this.requests.push(request);
    return { ...request };
  }

  public listQueued(playlistId: string): readonly MatchmakingRequest[] {
    return this.requests
      .filter((request) => request.playlistId === playlistId && request.status === "queued")
      .sort((left, right) => left.queuedAtMs - right.queuedAtMs)
      .map((request) => ({ ...request }));
  }

  public markMatched(requestIds: readonly string[]): void {
    for (const requestId of requestIds) {
      this.requireRequest(requestId).status = "matched";
    }
  }

  public markCancelled(requestId: string): MatchmakingRequest {
    const request = this.requireRequest(requestId);
    request.status = "cancelled";
    return { ...request };
  }

  private requireRequest(requestId: string): MatchmakingRequest {
    const request = this.requests.find((candidate) => candidate.requestId === requestId);
    if (!request) {
      throw new Error(`[MatchmakingQueue] Missing request: ${requestId}`);
    }
    return request;
  }
}
