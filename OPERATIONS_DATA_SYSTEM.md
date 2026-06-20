# Operations Data System

Use this file when the team is defining retention goals, monetization strategy, ad policy, event operations, economy health, or business-metrics review for a Cocos Creator 3.x game.

## Operations data law

- A live game is not healthy because the build is stable; it is healthy when player behavior and business signals are understandable.
- Retention, monetization, ads, events, and economy must be reviewed as one loop, not as isolated dashboards.
- If a metric has no owner, no hypothesis, or no follow-up action, it is decorative telemetry.

## Review order

1. Name the product stage.
2. Name the current business hypothesis.
3. Name the primary player behavior to improve.
4. Name the metrics that prove or reject the hypothesis.
5. Name what team or role owns the follow-up action.

## Core business loops

- Retention loop:
  - Why the player returns.
  - What session-to-session promise exists.
  - What progression or content cadence supports return.
- Monetization loop:
  - What value the player wants before spending.
  - What spend moment exists.
  - What friction or trust risk blocks conversion.
- Ad loop:
  - What opt-in value the ad gives.
  - What cooldown or cap protects player trust.
  - What segments should never be overexposed.
- Event loop:
  - What timed reason brings the player back now.
  - What reward or urgency the event creates.
  - What burnout or economy distortion risk the event introduces.
- Economy loop:
  - Where currency enters.
  - Where currency exits.
  - What upgrades or sinks create real decisions.

## Minimum operating metrics

- Retention:
  - D1
  - D3
  - D7
  - tutorial completion
  - first-session completion
- Monetization:
  - payer conversion
  - first purchase rate
  - ARPDAU or equivalent
  - failed purchase rate
- Ads:
  - rewarded opt-in rate
  - ad completion rate
  - ad value per active user
  - ad fatigue signals
- Economy:
  - currency faucet volume
  - currency sink volume
  - upgrade bottleneck point
  - inflation or dead-currency signals
- Events and operations:
  - event participation rate
  - event completion rate
  - reactivation or recall response
  - support or complaint spike after event changes

## Hypothesis rules

- Every major live change must name the expected player behavior change.
- Do not ship "more rewards" without naming the retention or monetization hypothesis.
- Do not change ads, bundles, or economy sinks without naming the trust risk.
- Do not call a feature successful only because raw usage is high; measure downstream effect.

## Economy validation rules

- Validate faucet and sink balance before scale content rollout.
- Track whether progression blockers are intentional or accidental.
- Separate healthy aspiration from frustration walls.
- Review the effect of events, compensation, and promotions on long-term balance, not just same-day uplift.

## Live operations rules

- Every event needs a target segment, target behavior, and post-event cleanup plan.
- Every compensation grant needs a reason, scope, and economy impact review.
- Every recall campaign needs a return promise, not just a notification.
- Every pricing or offer change needs rollback thinking and player sentiment watch.

## Red flags

- "We added tracking, so we understand the game now."
- "Revenue went up for one day, so the design is correct."
- "We can fix the economy by just adding more currency."
- "The event worked because participation was high" without checking retention or burnout.
- "Ads are free money" without trust or churn review.

## Operations review record

```md
# Operations Review Record

## Stage

## Business Hypothesis

## Primary Player Behavior To Improve

## Owner

## Retention Metrics

## Monetization Metrics

## Ad Metrics

## Economy Health Signals

## Event Or Campaign Signals

## Player Sentiment Signals

## What Changed

## Expected Effect

## Actual Effect

## Risks Introduced

## Follow-Up Actions

## Rollback Or Mitigation Trigger
```
