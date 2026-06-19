export interface DailyCheckInState {
  readonly trackId: string;
  readonly cycleKey: string;
  readonly claimedDayIndexes: readonly number[];
  readonly streakCount: number;
  readonly lastClaimDateKey: string | null;
}

export class DailyCheckInTracker {
  public claim(
    state: DailyCheckInState,
    dayIndex: number,
    dateKey: string
  ): DailyCheckInState {
    if (state.claimedDayIndexes.includes(dayIndex)) {
      throw new Error(`[DailyCheckInTracker] Day already claimed: ${dayIndex}`);
    }

    const nextClaimedDayIndexes = [...state.claimedDayIndexes, dayIndex].sort((left, right) => left - right);
    const nextStreakCount = state.lastClaimDateKey === dateKey ? state.streakCount : state.streakCount + 1;

    return {
      trackId: state.trackId,
      cycleKey: state.cycleKey,
      claimedDayIndexes: nextClaimedDayIndexes,
      streakCount: nextStreakCount,
      lastClaimDateKey: dateKey,
    };
  }

  public reset(trackId: string, cycleKey: string): DailyCheckInState {
    return {
      trackId,
      cycleKey,
      claimedDayIndexes: [],
      streakCount: 0,
      lastClaimDateKey: null,
    };
  }
}
