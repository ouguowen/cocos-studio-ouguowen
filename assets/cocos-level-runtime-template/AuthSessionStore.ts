export interface AuthSessionRecord {
  readonly accountId: string;
  readonly subjectId: string;
  readonly accessToken: string;
  readonly refreshToken: string | null;
  readonly issuedAtMs: number;
  readonly expiresAtMs: number;
  readonly provider: string;
  readonly scopes: readonly string[];
}

export class AuthSessionStore {
  private session: AuthSessionRecord | null = null;

  public setSession(session: AuthSessionRecord): AuthSessionRecord {
    this.session = session;
    return { ...session, scopes: [...session.scopes] };
  }

  public getSession(): AuthSessionRecord | null {
    if (!this.session) {
      return null;
    }

    return { ...this.session, scopes: [...this.session.scopes] };
  }

  public clear(): void {
    this.session = null;
  }

  public isAuthenticated(nowMs: number): boolean {
    return this.session !== null && nowMs < this.session.expiresAtMs;
  }

  public requireAccessToken(nowMs: number): string {
    if (!this.session) {
      throw new Error("[AuthSessionStore] Missing auth session.");
    }

    if (nowMs >= this.session.expiresAtMs) {
      throw new Error("[AuthSessionStore] Access token expired.");
    }

    return this.session.accessToken;
  }
}
