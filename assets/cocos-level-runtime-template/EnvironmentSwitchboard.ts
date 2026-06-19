export type EnvironmentTier = "development" | "review" | "staging" | "production" | "newbie-server";

export interface EnvironmentProfile {
  readonly environmentId: string;
  readonly tier: EnvironmentTier;
  readonly apiBaseUrl: string;
  readonly assetBaseUrl: string;
  readonly analyticsEnabled: boolean;
  readonly paymentsEnabled: boolean;
}

export class EnvironmentSwitchboard {
  private readonly profiles = new Map<string, EnvironmentProfile>();
  private activeEnvironmentId: string | null = null;

  public register(profile: EnvironmentProfile): EnvironmentProfile {
    this.profiles.set(profile.environmentId, profile);
    if (this.activeEnvironmentId === null) {
      this.activeEnvironmentId = profile.environmentId;
    }
    return { ...profile };
  }

  public activate(environmentId: string): EnvironmentProfile {
    const profile = this.requireProfile(environmentId);
    this.activeEnvironmentId = environmentId;
    return { ...profile };
  }

  public getActive(): EnvironmentProfile {
    if (this.activeEnvironmentId === null) {
      throw new Error("[EnvironmentSwitchboard] Missing active environment.");
    }
    return { ...this.requireProfile(this.activeEnvironmentId) };
  }

  public listProfiles(): readonly EnvironmentProfile[] {
    return Array.from(this.profiles.values()).map((profile) => ({ ...profile }));
  }

  private requireProfile(environmentId: string): EnvironmentProfile {
    const profile = this.profiles.get(environmentId);
    if (!profile) {
      throw new Error(`[EnvironmentSwitchboard] Missing environment: ${environmentId}`);
    }
    return profile;
  }
}
