# Release Pipeline System

Use this file when the team is preparing a test build, store submission build, live update, channel rollout, or post-launch watch plan.

## Release pipeline law

- A releasable build is a controlled package, not just "the latest branch that runs".
- Submission, live rollout, hotfix, and rollback are different decisions with different owners.
- If build provenance is unclear, release status is automatically unsafe.

## Release lanes

- Internal QA build:
  - Goal: verify changed scope fast.
  - Can contain debug visibility.
  - Must never be confused with submission truth.
- Submission candidate:
  - Goal: satisfy platform, content, and first-session quality bar.
  - Freeze risky scope before final validation.
- Live rollout build:
  - Goal: ship to players with monitoring and fallback.
  - Requires watch plan and communication owner.
- Emergency hotfix:
  - Goal: repair a live blocker with the smallest safe blast radius.
  - Must name touched systems and revalidation scope explicitly.

## Required release records

- Version name
- Build identifier
- Git or source snapshot
- Channel or store target
- Bundle identifier or package identifier
- Feature flags or remote-config dependency
- Data migration dependency
- Rollout plan
- Rollback path

## Channel planning rules

- Separate review channel, limited rollout channel, and full-release channel.
- Do not assume one build fits every store or platform requirement.
- Name exact differences between Android, iOS, web, mini-game, or native package targets.
- If a channel needs store assets, age rating, privacy text, or SDK declarations, treat those as release-scope items, not afterthoughts.

## Hot update rules

- Use hot update only for assets, script patches, or config changes that are already designed for remote replacement.
- Do not treat hot update as permission to skip package-level release discipline.
- If a hot update touches save format, login flow, payment flow, or anti-cheat logic, escalate to full release review unless explicitly proven safe.
- Every hot update needs the same owner, watch metrics, and rollback thinking as a package release.

## Submission review focus

- First-session flow passes.
- Login and account binding paths pass.
- Payment or ad declarations match the build reality.
- Privacy, permission, and SDK usage text matches integrated systems.
- Crash, ANR, and low-end-device risk are visible.
- Store metadata and screenshots match the actual build.

## Post-launch watch rules

- Name who watches crash, login, retention, payment, economy, and support signals.
- Name the first-hour, first-day, and first-week watch windows.
- Name what triggers rollback, hotfix, player notice, or server-side mitigation.
- Do not call the launch stable before the watch window closes cleanly.

## Release pipeline record

```md
# Release Pipeline Record

## Version

## Build Identifier

## Source Snapshot

## Build Lane
- internal QA
- submission candidate
- live rollout
- emergency hotfix

## Platform Targets

## Channel Targets

## Build Owner

## QA Owner

## Release Owner

## Operations Watch Owner

## Remote Config Or Feature Flag Dependency

## Data Migration Dependency

## Store Or Platform Submission Requirements

## Smoke Scope

## Rollout Plan

## Rollback Plan

## First-Hour Watch Metrics

## First-Day Watch Metrics

## Player Communication Path

## Final Release Decision
```
