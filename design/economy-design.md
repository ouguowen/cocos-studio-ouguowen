# Game Economy Design

Use this file before Codex designs or changes currencies, reward loops, sinks, upgrade costs, stamina/energy, shops, ads, gacha, inventory value, long-term progression, or monetization-sensitive systems.

This file is not a business plan and not a full live-ops economy. It is the minimum design control needed so a game can be developed without chaotic rewards, broken progression, or fake retention loops.

## Economy design law

- Do not add an economy until the core loop has a reason to produce and spend value.
- Do not use multiple currencies just to look professional.
- Every currency needs a source, sink, cap rule, display rule, and player-facing purpose.
- Rewards must support the loop, not cover up weak gameplay.
- Costs must create understandable decisions, not spreadsheet confusion.
- Monetization and ads must not be introduced before the product loop and player value are clear.
- Prototype economy numbers may be fake, but must be labeled as temporary.
- Economy design must respect [design/numerical-design.md](numerical-design.md) when values affect difficulty, pacing, or rewards.

## Required inputs before economy design

Before designing economy, require:

1. selected game type
2. current production stage
3. core loop
4. target session length
5. return reason
6. main reward moment
7. main spend moment
8. whether progression is level-based, run-based, collection-based, idle, merge, card, story, or hybrid
9. whether monetization is in scope now
10. explicit non-goals

If these are missing, do not generate a full economy table.

## MVP economy scope

For an MVP, the safest economy is usually:

- zero economy, if the loop can be tested without it
- or one soft currency
- or one score/progress value
- or one temporary result reward
- or one simple upgrade track

Do not add shop, gacha, battle pass, stamina, inventory, equipment, daily rewards, events, IAP, ads, or multiple currencies unless the MVP is explicitly testing those systems.

## Economy loop structure

Every economy must define:

```text
source -> wallet/store -> sink -> player benefit -> next motivation
```

If any step is unclear, the economy is not ready.

## Currency rules

For each currency, define:

- currency id
- name shown to player
- purpose
- source
- sink
- earn frequency
- spend frequency
- cap or no-cap rule
- storage owner
- reset or persistence rule
- abuse risk
- current stage status

Do not create a currency if it has only a source and no meaningful sink.

## Source design

Sources may include:

- level clear reward
- enemy drop
- quest reward
- idle production
- merge order completion
- story milestone
- ad reward
- shop purchase
- event reward

For each source, define:

- trigger
- expected frequency
- expected amount range
- variance rule
- player understanding
- exploit risk

Do not add random drops before the player understands deterministic rewards.

## Sink design

Sinks may include:

- upgrade cost
- unit deployment cost
- retry cost
- crafting or merge cost
- shop purchase
- stamina spend
- unlock requirement
- gacha pull

For each sink, define:

- decision purpose
- expected timing
- cost range
- whether the player can recover from a bad spend
- whether the sink blocks progress
- whether the sink is fun, necessary, or only a limiter

Do not use costs only to slow the player down.

## Reward cadence

Define rewards by player rhythm:

- per action
- per wave
- per level
- per chapter
- per run
- per return session
- per milestone

Reward cadence must match the selected game type.

Examples:

- tower defense: level clear + optional wave milestone
- card battle: run rewards + deck/build choices
- story clear: chapter unlock + narrative progress
- idle growth: return reward + reinvestment
- merge collection: order reward + collection milestone

## Upgrade economy

Before adding upgrades, define:

- what improves
- why the player wants it
- whether it changes strategy or only increases numbers
- cost curve
- power curve
- unlock gate
- maximum level or soft cap
- refund or reset rule if relevant

Do not add upgrades if they only make the same weak loop last longer.

## Cost curve guidance

Use a named curve before values:

- flat: good for prototype clarity
- linear: good for early readable progression
- soft exponential: good for long-term growth when sinks and sources are stable
- stepped: good for chapter or tier unlocks
- capped: good for prototype and test builds

Do not use aggressive exponential cost during first playable unless the game is specifically an idle/economy game.

## Monetization boundary

Ads, IAP, shop, and gacha are not default systems.

Before monetization enters scope, require:

- core loop is understandable
- reward value is already meaningful without payment
- player pain point is not artificially created only to sell relief
- economy sources and sinks are stable enough to review
- legal/platform/compliance implications are known
- product owner approves the monetization hypothesis

If these are missing, keep monetization out of MVP.

## Ads and rewarded video

Rewarded ads must define:

- placement moment
- player choice
- reward amount
- daily/session limit
- cooldown
- whether it bypasses progression
- whether it harms balance

Do not let rewarded ads become the best source of core progression currency unless that is an explicit product decision.

## Gacha and random rewards

Do not add gacha by default.

If gacha is in scope, define:

- pool purpose
- item rarity
- drop rates
- pity or guarantee rule
- duplicate conversion
- currency source
- free versus paid distinction
- compliance risk
- player understanding

If any of these are missing, gacha is blocked.

## Economy table families

Add only the tables the current stage needs.

### Prototype-safe tables

- `Reward.csv`
- `UpgradeCost.csv` only if upgrades are being tested
- `Currency.csv` only if one currency must persist or be displayed

### MVP or later tables

- `CurrencySource.csv`
- `CurrencySink.csv`
- `ShopCatalog.csv`
- `InventoryItem.csv`
- `QuestReward.csv`
- `DropGroup.csv`

### Monetization-stage tables

- `AdPlacement.csv`
- `IapProduct.csv`
- `GachaPool.csv`
- `GachaRate.csv`
- `PurchaseLimit.csv`

Do not create all tables at once.

## Economy validation categories

Economy validation must include:

- source/sink reference validation
- no orphan currency
- no source-only currency without sink unless intentionally score-only
- no sink-only currency without source unless premium-only and approved
- reward inflation validation
- upgrade affordability validation
- progression skip validation
- ad reward dominance validation
- gacha/purchase compliance validation when relevant
- runtime export validation

## Red flags

Stop and review if:

- there are multiple currencies before one currency is proven
- rewards exist only because a result screen needs something to show
- costs exist only to slow the player down
- shop appears before the core loop is fun
- ad reward is stronger than gameplay reward without approval
- gacha is added before collection value is proven
- upgrade costs grow faster than sources without a pacing reason
- the economy is impossible to explain in one minute
- UI panels are treated as the economy source of truth
- Codex creates a shop, inventory, and gacha while the first playable is still not visible in browser preview

## Economy design record

Use this artifact before economy config or economy code.

```md
# Economy Design Record

## Game Type

## Current Stage

## Core Loop

## Return Reason

## Main Reward Moment

## Main Spend Moment

## Economy Scope
- none / score-only / one soft currency / upgrade-only / shop / ads / gacha / hybrid

## Currencies

## Sources

## Sinks

## Reward Cadence

## Upgrade / Cost Curve

## Monetization In Scope?

## Prototype Placeholder Values

## Validation Rules

## Known Risks

## Gate Decision
- PASS / FAIL / BLOCKED
```

## Gate decision

Economy design passes only when:

- the economy has a reason to exist in the selected game type
- each currency has a clear purpose
- each source and sink has a clear relationship
- the current production stage justifies the economy scope
- monetization is explicitly in or out of scope
- placeholder values are labeled
- validation rules exist before config or implementation

If these are not true, do not proceed to economy implementation.
