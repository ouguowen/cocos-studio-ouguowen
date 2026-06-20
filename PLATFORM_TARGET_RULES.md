# Platform Target Rules

Use this file when the team is planning, reviewing, optimizing, or shipping for Android, iOS, web, mini-game platforms, or mixed multi-platform delivery.

## Platform law

- Platform targets are product constraints, not a late export setting.
- Do not assume one asset budget, SDK set, or input model fits every platform.
- If a platform changes package size, memory, review policy, or monetization policy, treat it as design and production scope.

## Selection order

1. Name the primary launch platform.
2. Name the secondary platforms if they are first-version commitments.
3. Name what must be identical across platforms.
4. Name what is allowed to differ.
5. Lock performance tier, input model, package budget, and SDK policy per platform.

## Cross-platform invariants

- Core loop and progression truth should stay consistent unless the product is intentionally platform-specific.
- Save compatibility rules must be explicit.
- Analytics event names and business meaning should stay consistent.
- Remote-config flags must name platform targeting rules.

## Android focus

- Expect wider device fragmentation.
- Set low-end and mid-tier performance targets early.
- Watch package size, permissions, SDK declarations, background behavior, and crash diversity.
- Treat payment SDK, ad SDK, privacy prompts, and app signing as release-scope concerns.

## iOS focus

- Treat review compliance, permission wording, account deletion or recovery expectations, and privacy declarations as first-class work.
- Watch memory spikes, startup smoothness, and interrupted-session recovery.
- Do not assume Android-style hotfix or SDK rollout habits map cleanly to iOS review reality.

## Web focus

- Treat first-load size, CDN strategy, cache invalidation, and reconnect behavior as core product quality.
- Watch browser compatibility, low-memory tabs, focus loss, and resume behavior.
- If the game depends on long warm-up, large bundles, or unstable network recovery, surface that early.

## Mini-game focus

- Treat package limit, subpackage split, cold-start time, login bridge, payment bridge, share flow, and platform review wording as hard constraints.
- Keep first-session loop short and resilient.
- Avoid assuming full native or full web feature freedom.

## Native-package focus

- Separate engine package, art package, audio package, and remote content thinking.
- Name patch strategy before content volume grows.
- If native bridge or SDK bridge exists, name ownership and regression scope clearly.

## Platform adaptation checklist

- Input adaptation:
  - touch
  - controller
  - keyboard or mouse
  - mixed
- Performance adaptation:
  - frame target
  - memory target
  - thermal or battery sensitivity
- Package adaptation:
  - initial package budget
  - remote bundle policy
  - patch or hot-update policy
- Compliance adaptation:
  - permissions
  - SDK disclosure
  - store wording
  - privacy or account policy

## Red flags

- "We export to every platform after launch week."
- "Package size can be optimized at the end."
- "The same UI flow should work everywhere without review."
- "Mini-game is basically the same as web."
- "iOS review text can be copied from Android."

## Platform target record

```md
# Platform Target Record

## Product

## Primary Launch Platform

## Secondary Launch Platforms

## Shared Core Truth

## Allowed Platform Differences

## Input Model By Platform

## Performance Tier By Platform

## Package Budget By Platform

## Remote Bundle Or Hot-Update Policy

## SDK And Permission Dependencies

## Store Or Review Constraints

## Save Compatibility Rules

## Analytics Consistency Rules

## Platform Owners
- Android:
- iOS:
- Web:
- Mini-game:
- Native package:

## Platform-Specific Risks

## Exit Criteria
- Platform differences are intentional, not accidental.
- Package, performance, and compliance constraints are visible.
- Release planning reflects real platform divergence.
```
