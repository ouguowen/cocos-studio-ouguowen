export interface VersionMigrationStep<TState = unknown> {
  readonly fromVersion: string;
  readonly toVersion: string;
  migrate(state: TState): TState;
}

export class VersionMigrationPlanner<TState = unknown> {
  public constructor(private readonly steps: readonly VersionMigrationStep<TState>[]) {}

  public migrate(state: TState, fromVersion: string, toVersion: string): TState {
    if (fromVersion === toVersion) {
      return state;
    }

    let currentVersion = fromVersion;
    let currentState = state;

    while (currentVersion !== toVersion) {
      const step = this.steps.find((candidate) => candidate.fromVersion === currentVersion);
      if (!step) {
        throw new Error(`[VersionMigrationPlanner] Missing migration step from ${currentVersion}.`);
      }

      currentState = step.migrate(currentState);
      currentVersion = step.toVersion;
    }

    return currentState;
  }
}
