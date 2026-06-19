export type PaymentRiskDecision = "allow" | "review" | "block";

export interface PaymentRiskSignal {
  readonly signalId: string;
  readonly score: number;
}

export interface PaymentRiskAssessment {
  readonly decision: PaymentRiskDecision;
  readonly score: number;
  readonly triggeredSignalIds: readonly string[];
}

export class PaymentRiskPolicy {
  public constructor(
    private readonly reviewThreshold: number,
    private readonly blockThreshold: number
  ) {}

  public assess(signals: readonly PaymentRiskSignal[]): PaymentRiskAssessment {
    const score = signals.reduce((total, signal) => total + signal.score, 0);
    const triggeredSignalIds = signals.map((signal) => signal.signalId);

    if (score >= this.blockThreshold) {
      return {
        decision: "block",
        score,
        triggeredSignalIds,
      };
    }

    if (score >= this.reviewThreshold) {
      return {
        decision: "review",
        score,
        triggeredSignalIds,
      };
    }

    return {
      decision: "allow",
      score,
      triggeredSignalIds,
    };
  }
}
