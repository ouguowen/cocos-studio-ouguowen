export type BanAction = "warn" | "mute" | "suspend" | "permanent-ban";

export interface BanPolicyRule {
  readonly violationType: string;
  readonly repeatCountAtLeast: number;
  readonly action: BanAction;
  readonly durationHours: number | null;
}

export interface BanDecision {
  readonly action: BanAction;
  readonly durationHours: number | null;
}

export class BanEnforcementPolicy {
  public constructor(private readonly rules: readonly BanPolicyRule[]) {}

  public decide(violationType: string, repeatCount: number): BanDecision {
    const candidates = this.rules
      .filter(
        (rule) => rule.violationType === violationType && repeatCount >= rule.repeatCountAtLeast
      )
      .sort((left, right) => right.repeatCountAtLeast - left.repeatCountAtLeast);

    const rule = candidates[0];
    if (!rule) {
      return {
        action: "warn",
        durationHours: null,
      };
    }

    return {
      action: rule.action,
      durationHours: rule.durationHours,
    };
  }
}
