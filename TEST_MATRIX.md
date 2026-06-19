# Test Matrix

Use this file when planning QA coverage for a feature, event, economy change, onboarding flow, or release candidate.

## Coverage axes

Always consider:

- platform
- account state
- progression state
- network condition
- payment or ads condition
- language
- device tier
- upgrade or recovery path

## Minimum matrix template

```md
# Test Matrix

## Scope

## Build Id

## Owner

| Axis | Cases |
| --- | --- |
| Platform | Android / iOS / Web / Mini Game |
| Account State | guest / linked / returning / banned-risk |
| Progression | new user / mid-game / endgame |
| Network | stable / slow / reconnect / offline recovery |
| Monetization | no-pay / ad-user / payer / refund-risk |
| Language | primary locale / secondary locale |
| Device Tier | low / mid / high |
| Upgrade Path | fresh install / hot update / version migration |

## Critical Scenarios

## Deferred Coverage

## QA Recommendation
```

## Matrix rules

- Do not ship a system change tested only on one account state.
- Do not ship a monetization change without at least one failure-path test.
- Do not ship a localization-heavy change without secondary-locale checks.
- Do not ship a save or config migration without upgrade-path coverage.
