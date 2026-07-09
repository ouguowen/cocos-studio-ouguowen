# Release Rollback Playbook

Use this file when a build may need staged rollout, hotfix, or rollback.

## Pre-release requirements

Before release, name:

- rollout owner
- rollback owner
- target channel
- trigger metrics
- watch window
- rollback command path
- player communication path
- data recovery risk

## Rollback triggers

Common triggers:

- crash spike
- login failure spike
- payment failure spike
- progression corruption
- severe economy exploit
- major live-event outage

## Rollback rules

- Do not roll forward blindly if player data is being corrupted.
- Do not call something "safe to hotfix" without naming touched systems.
- Do not release without a first-hour watch plan.
- Do not rely on a single person remembering rollback steps from memory.

## Rollback checklist

```md
# Rollback Checklist

## Version

## Channel

## Trigger Reason

## Trigger Metrics

## Decision Owner

## Rollback Path

## Player Data Risk

## Communication Sent

## Verification After Rollback

## Follow-up Actions
```
