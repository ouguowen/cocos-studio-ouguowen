export interface AccessibilityProfile {
  readonly profileId: string;
  readonly textScale: number;
  readonly highContrastEnabled: boolean;
  readonly reducedMotionEnabled: boolean;
  readonly subtitleEnabled: boolean;
  readonly screenReaderHintsEnabled: boolean;
}

export class AccessibilityProfileStore {
  private profile: AccessibilityProfile | null = null;

  public setProfile(profile: AccessibilityProfile): AccessibilityProfile {
    this.profile = profile;
    return { ...profile };
  }

  public getProfile(): AccessibilityProfile | null {
    return this.profile ? { ...this.profile } : null;
  }

  public requireProfile(): AccessibilityProfile {
    if (!this.profile) {
      throw new Error("[AccessibilityProfileStore] Missing accessibility profile.");
    }
    return { ...this.profile };
  }
}
