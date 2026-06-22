export interface LevelRuntimeState {
  levelId: string;
  waveGroupId: string;
  objectiveGroupId: string;
  rewardId: string;
  isStarted: boolean;
  isCompleted: boolean;
}

export interface LevelRuntimeFacadeOptions {
  levelId: string;
  waveGroupId: string;
  objectiveGroupId: string;
  rewardId: string;
}

export class LevelRuntimeFacade {
  private state: LevelRuntimeState | null = null;

  public start(options: LevelRuntimeFacadeOptions): LevelRuntimeState {
    this.state = {
      ...options,
      isStarted: true,
      isCompleted: false,
    };

    return this.state;
  }

  public complete(): LevelRuntimeState {
    if (!this.state) {
      throw new Error('Level runtime has not started.');
    }

    this.state.isCompleted = true;
    return this.state;
  }

  public getState(): LevelRuntimeState {
    if (!this.state) {
      throw new Error('Level runtime has not started.');
    }

    return this.state;
  }
}
