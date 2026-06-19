export interface GmPermissionGrant {
  readonly roleId: string;
  readonly allowedScopes: readonly string[];
  readonly allowedCommands: readonly string[];
}

export class GmPermissionPolicy {
  public constructor(private readonly grants: readonly GmPermissionGrant[]) {}

  public canExecute(roleId: string, commandType: string, targetScope: string): boolean {
    const grant = this.grants.find((candidate) => candidate.roleId === roleId);
    if (!grant) {
      return false;
    }

    const commandAllowed =
      grant.allowedCommands.includes("*") || grant.allowedCommands.includes(commandType);
    const scopeAllowed = grant.allowedScopes.includes("*") || grant.allowedScopes.includes(targetScope);
    return commandAllowed && scopeAllowed;
  }

  public requireExecution(roleId: string, commandType: string, targetScope: string): void {
    if (!this.canExecute(roleId, commandType, targetScope)) {
      throw new Error(
        `[GmPermissionPolicy] Role ${roleId} cannot execute ${commandType} on ${targetScope}.`
      );
    }
  }
}
