export interface ConsentRecord {
  readonly userId: string;
  readonly consentType: string;
  granted: boolean;
  readonly version: string;
  readonly recordedAtMs: number;
}

export class ComplianceConsentStore {
  private readonly consents = new Map<string, ConsentRecord>();

  public record(consent: ConsentRecord): ConsentRecord {
    const key = buildConsentKey(consent.userId, consent.consentType);
    this.consents.set(key, { ...consent });
    return { ...consent };
  }

  public get(userId: string, consentType: string): ConsentRecord | null {
    return this.consents.get(buildConsentKey(userId, consentType)) ?? null;
  }

  public hasGranted(userId: string, consentType: string, minVersion?: string): boolean {
    const consent = this.get(userId, consentType);
    if (!consent || !consent.granted) {
      return false;
    }
    if (!minVersion) {
      return true;
    }
    return consent.version >= minVersion;
  }

  public createSnapshot(): readonly ConsentRecord[] {
    return Array.from(this.consents.values()).map((consent) => ({ ...consent }));
  }
}

function buildConsentKey(userId: string, consentType: string): string {
  return `${userId}:${consentType}`;
}
