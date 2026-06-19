export interface MotionCue {
  readonly cueId: string;
  readonly trackId: string;
  readonly startMs: number;
  readonly durationMs: number;
  readonly payload: Readonly<Record<string, string | number | boolean | null>>;
}

export class MotionSequenceTimeline {
  private readonly cues: MotionCue[] = [];

  public addCue(cue: MotionCue): MotionCue {
    this.cues.push(cue);
    this.cues.sort((left, right) => left.startMs - right.startMs);
    return { ...cue, payload: { ...cue.payload } };
  }

  public listTrack(trackId: string): readonly MotionCue[] {
    return this.cues
      .filter((cue) => cue.trackId === trackId)
      .map((cue) => ({ ...cue, payload: { ...cue.payload } }));
  }

  public listActive(atMs: number): readonly MotionCue[] {
    return this.cues
      .filter((cue) => cue.startMs <= atMs && atMs < cue.startMs + cue.durationMs)
      .map((cue) => ({ ...cue, payload: { ...cue.payload } }));
  }
}
