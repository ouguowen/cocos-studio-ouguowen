# Level System Architecture

Use this file when implementing a Cocos Creator 3.x level runtime from level data, CSV-derived JSON, editor-exported points, or generated config.

## Core principle

Do not build one giant `LevelManager` that owns config loading, runtime state, wave flow, spawning, objectives, rewards, UI, scene nodes, and enemy creation.

The professional minimum is to separate:

- config reading
- level building
- runtime state
- flow control
- wave progression
- spawn scheduling
- objective evaluation
- reward calculation
- map point lookup
- actor creation
- event dispatch
- resource loading
- object reuse
- meta progression
- level result persistence
- reward grant handoff
- save persistence
- chapter unlock policy
- guide progression state
- currency and inventory state
- shop purchase flow
- quest progression
- activity state
- character progression
- equipment loadout
- stat aggregation
- drop-table resolution
- gacha draw flow
- rewarded-ad flow
- IAP catalog and order state
- monetization fulfillment
- remote config
- feature flags and experiments
- hotfix override control
- analytics schema
- session and funnel tracking
- analytics dispatch
- friend graph
- leaderboard state
- guild roster
- mailbox and notification state
- support ticket state
- player report and moderation state
- risk and consent records
- offline cache
- sync queue and retry
- purchase recovery and server sync
- server contract typing
- sync snapshot persistence
- conflict resolution rules
- auth session state
- account binding state
- cloud save manifest
- cloud save merge policy
- cloud save synchronization
- announcement visibility state
- event calendar state
- daily check-in progression
- mail reward delivery
- environment switching
- compensation delivery
- appeal case state
- operations command dispatch
- GM permission boundaries
- gray release rules
- battle replay archive
- anti-cheat evidence chain
- crash recovery snapshots
- analytics audit ledger
- version migration planning
- localization catalog
- sensitive-word filtering
- guided onboarding flow
- tutorial scenario scripting
- experiment override control
- audio bus routing
- motion sequence timeline
- accessibility profile state
- device performance tiering
- asset bundle partition planning
- reconnect coordination
- heartbeat liveness state
- matchmaking queue state
- PVP settlement consistency
- bot backfill rules
- payment risk policy
- ban enforcement rules
- social relationship graph
- squad season tracking
- metrics schema contract
- new-user purchase funnel
- recall campaign tracking
- ad monetization experiment policy
- UGC moderation queue
- support SLA workflow

## Recommended minimum modules

```text
assets/scripts/
  data/
    config/
      ConfigTypes.ts
      ConfigIndex.ts
      ConfigManager.ts

  game/
    level/
      LevelTypes.ts
      EventBus.ts
      LevelRuntime.ts
      LevelBuilder.ts
      LevelFlowController.ts
      WaveSystem.ts
      SpawnSystem.ts
      ObjectiveSystem.ts
      RewardSystem.ts
      MetaProgressionStore.ts
      GuideProgressStore.ts
      ChapterUnlockPolicy.ts
      CurrencyWallet.ts
      InventoryStore.ts
      ShopCatalog.ts
      PurchasePipeline.ts
      QuestTracker.ts
      ActivityStateStore.ts
      AdPlacementRegistry.ts
      RewardedAdPipeline.ts
      CharacterRoster.ts
      EquipmentLoadout.ts
      StatAggregator.ts
      DropTableResolver.ts
      GachaPool.ts
      GachaPipeline.ts
      IapCatalog.ts
      OrderLedger.ts
      IapPurchasePipeline.ts
      RemoteConfigStore.ts
      FeatureFlagEvaluator.ts
      ExperimentRegistry.ts
      HotfixOverrideStore.ts
      LiveOpsSwitchboard.ts
      AnalyticsSchemaRegistry.ts
      SessionTracker.ts
      AnalyticsEventQueue.ts
      FunnelTracker.ts
      AnalyticsDispatchPipeline.ts
      FriendListStore.ts
      LeaderboardStore.ts
      GuildRosterStore.ts
      MailboxStore.ts
      NotificationInbox.ts
      SupportTicketStore.ts
      PlayerReportInbox.ts
      ModerationActionLog.ts
      RiskFlagRegistry.ts
      ComplianceConsentStore.ts
      OfflineCacheStore.ts
      SyncOperationQueue.ts
      RetryPolicy.ts
      PurchaseRecoveryQueue.ts
      ServerSyncCoordinator.ts
      ServerContractTypes.ts
      ConflictResolutionPolicy.ts
      SyncSnapshotCodec.ts
      SyncSnapshotRepository.ts
      AuthSessionStore.ts
      AccountBindingStore.ts
      CloudSaveManifest.ts
      CloudSaveMergePolicy.ts
      CloudSaveSyncCoordinator.ts
      AnnouncementBoard.ts
      EventCalendarStore.ts
      DailyCheckInTracker.ts
      MailRewardDeliveryPipeline.ts
      EnvironmentSwitchboard.ts
      CompensationGrantPipeline.ts
      AppealCaseStore.ts
      OpsCommandQueue.ts
      GmPermissionPolicy.ts
      GrayReleasePolicy.ts
      BattleReplayArchive.ts
      AntiCheatEvidenceLog.ts
      CrashRecoverySnapshotStore.ts
      AnalyticsAuditLedger.ts
      VersionMigrationPlanner.ts
      LocalizationCatalog.ts
      SensitiveWordFilter.ts
      GuidedOnboardingFlow.ts
      TutorialScenarioScript.ts
      ExperimentControlPanel.ts
      AudioBusRegistry.ts
      MotionSequenceTimeline.ts
      AccessibilityProfileStore.ts
      DevicePerformanceTierPolicy.ts
      AssetBundlePartitionPlan.ts
      NetworkReconnectCoordinator.ts
      HeartbeatMonitor.ts
      MatchmakingQueue.ts
      PvpSettlementConsistencyGuard.ts
      BotBackfillPolicy.ts
      PaymentRiskPolicy.ts
      BanEnforcementPolicy.ts
      SocialRelationshipGraph.ts
      SquadSeasonTracker.ts
      MetricsSchemaContract.ts
      NewUserPurchaseFunnel.ts
      RecallCampaignTracker.ts
      AdMonetizationExperimentPolicy.ts
      UgcModerationQueue.ts
      SupportSlaWorkflow.ts
      LevelResultRecorder.ts
      ProgressionSaveRepository.ts
      ProgressionSnapshotCodec.ts
      RewardGrantPipeline.ts
      MapPointRegistry.ts
      MapPointComponent.ts

    enemy/
      EnemyTypes.ts
      EnemyFactory.ts
      EnemyActor.ts

  resource/
    manifest/
      ResourceIds.ts
      ResourceManifest.ts
    loader/
      ResourceLoader.ts

  core/
    pool/
      ObjectPool.ts
```

## Ownership

- `ConfigTypes.ts`: Lead Programmer
- `ConfigIndex.ts`: Lead Programmer
- `ConfigManager.ts`: Lead Programmer
- `LevelTypes.ts`: Gameplay Programmer
- `EventBus.ts`: Lead Programmer
- `LevelRuntime.ts`: Gameplay Programmer
- `LevelBuilder.ts`: Gameplay Programmer
- `LevelFlowController.ts`: Gameplay Programmer
- `WaveSystem.ts`: Gameplay Programmer
- `SpawnSystem.ts`: Gameplay Programmer
- `ObjectiveSystem.ts`: Gameplay Programmer
- `RewardSystem.ts`: Gameplay Programmer
- `MetaProgressionStore.ts`: Lead Programmer and Meta Systems Programmer
- `GuideProgressStore.ts`: Meta Systems Programmer
- `ChapterUnlockPolicy.ts`: Game Designer and Meta Systems Programmer
- `CurrencyWallet.ts`: Economy Programmer
- `InventoryStore.ts`: Economy Programmer
- `ShopCatalog.ts`: Economy Programmer and Game Designer
- `PurchasePipeline.ts`: Economy Programmer
- `QuestTracker.ts`: Systems Designer and Gameplay Programmer
- `ActivityStateStore.ts`: Live Operations Programmer
- `AdPlacementRegistry.ts`: Live Operations Programmer
- `RewardedAdPipeline.ts`: Monetization Programmer
- `CharacterRoster.ts`: Character Systems Programmer
- `EquipmentLoadout.ts`: Character Systems Programmer
- `StatAggregator.ts`: Combat Designer and Gameplay Programmer
- `DropTableResolver.ts`: Economy Programmer
- `GachaPool.ts`: Economy Programmer and Game Designer
- `GachaPipeline.ts`: Economy Programmer
- `IapCatalog.ts`: Monetization Programmer and Game Designer
- `OrderLedger.ts`: Backend or Monetization Programmer
- `IapPurchasePipeline.ts`: Monetization Programmer
- `RemoteConfigStore.ts`: Live Operations Programmer
- `FeatureFlagEvaluator.ts`: Live Operations Programmer
- `ExperimentRegistry.ts`: Data or Live Operations Programmer
- `HotfixOverrideStore.ts`: Technical Director or Live Operations Programmer
- `LiveOpsSwitchboard.ts`: Technical Director
- `AnalyticsSchemaRegistry.ts`: Data Analyst and Gameplay Programmer
- `SessionTracker.ts`: Analytics Programmer
- `AnalyticsEventQueue.ts`: Analytics Programmer
- `FunnelTracker.ts`: Data Analyst and Systems Designer
- `AnalyticsDispatchPipeline.ts`: Analytics Programmer
- `FriendListStore.ts`: Social Systems Programmer
- `LeaderboardStore.ts`: Social Systems Programmer
- `GuildRosterStore.ts`: Social Systems Programmer
- `MailboxStore.ts`: Live Operations Programmer
- `NotificationInbox.ts`: UI Programmer and Social Systems Programmer
- `SupportTicketStore.ts`: Customer Support Tools Programmer
- `PlayerReportInbox.ts`: Moderation Tools Programmer
- `ModerationActionLog.ts`: Moderation Tools Programmer
- `RiskFlagRegistry.ts`: Security or Risk Control Programmer
- `ComplianceConsentStore.ts`: Compliance Programmer
- `OfflineCacheStore.ts`: Platform Programmer
- `SyncOperationQueue.ts`: Platform Programmer
- `RetryPolicy.ts`: Platform Programmer
- `PurchaseRecoveryQueue.ts`: Monetization Programmer
- `ServerSyncCoordinator.ts`: Platform Programmer
- `ServerContractTypes.ts`: Backend Programmer and Platform Programmer
- `ConflictResolutionPolicy.ts`: Lead Programmer and Backend Programmer
- `SyncSnapshotCodec.ts`: Platform Programmer
- `SyncSnapshotRepository.ts`: Platform Programmer
- `AuthSessionStore.ts`: Platform Programmer
- `AccountBindingStore.ts`: Platform Programmer and SDK Integration Programmer
- `CloudSaveManifest.ts`: Platform Programmer
- `CloudSaveMergePolicy.ts`: Lead Programmer and Technical Director
- `CloudSaveSyncCoordinator.ts`: Platform Programmer
- `AnnouncementBoard.ts`: Live Operations Programmer
- `EventCalendarStore.ts`: Live Operations Programmer and Systems Designer
- `DailyCheckInTracker.ts`: Systems Designer and Economy Programmer
- `MailRewardDeliveryPipeline.ts`: Live Operations Programmer and Economy Programmer
- `EnvironmentSwitchboard.ts`: Technical Director and Platform Programmer
- `CompensationGrantPipeline.ts`: Customer Support Tools Programmer and Economy Programmer
- `AppealCaseStore.ts`: Customer Support Tools Programmer
- `OpsCommandQueue.ts`: Live Operations Programmer
- `GmPermissionPolicy.ts`: Technical Director and Security Programmer
- `GrayReleasePolicy.ts`: Technical Director and Platform Programmer
- `BattleReplayArchive.ts`: Gameplay Programmer and QA Tools Programmer
- `AntiCheatEvidenceLog.ts`: Security Programmer and Anti-Cheat Programmer
- `CrashRecoverySnapshotStore.ts`: Platform Programmer
- `AnalyticsAuditLedger.ts`: Analytics Programmer
- `VersionMigrationPlanner.ts`: Lead Programmer and Technical Director
- `LocalizationCatalog.ts`: Localization Engineer and UI Programmer
- `SensitiveWordFilter.ts`: Social Systems Programmer and Compliance Programmer
- `GuidedOnboardingFlow.ts`: UX Designer and Gameplay Programmer
- `TutorialScenarioScript.ts`: Level Designer and Gameplay Programmer
- `ExperimentControlPanel.ts`: Data Analyst and Live Operations Programmer
- `AudioBusRegistry.ts`: Audio Programmer and Technical Sound Designer
- `MotionSequenceTimeline.ts`: Technical Artist and UI Programmer
- `AccessibilityProfileStore.ts`: UI Programmer and UX Designer
- `DevicePerformanceTierPolicy.ts`: Platform Programmer and Technical Director
- `AssetBundlePartitionPlan.ts`: Lead Programmer and Technical Artist
- `NetworkReconnectCoordinator.ts`: Network Programmer
- `HeartbeatMonitor.ts`: Network Programmer
- `MatchmakingQueue.ts`: Backend Programmer and Network Programmer
- `PvpSettlementConsistencyGuard.ts`: Network Programmer and Technical Director
- `BotBackfillPolicy.ts`: Systems Designer and Backend Programmer
- `PaymentRiskPolicy.ts`: Monetization Programmer and Risk Control Programmer
- `BanEnforcementPolicy.ts`: Security Programmer and Customer Support Tools Programmer
- `SocialRelationshipGraph.ts`: Social Systems Programmer
- `SquadSeasonTracker.ts`: Systems Designer and Backend Programmer
- `MetricsSchemaContract.ts`: Data Engineer and Analytics Programmer
- `NewUserPurchaseFunnel.ts`: Monetization Designer and Data Analyst
- `RecallCampaignTracker.ts`: Growth Programmer and Live Operations Programmer
- `AdMonetizationExperimentPolicy.ts`: Monetization Programmer and Data Analyst
- `UgcModerationQueue.ts`: Moderation Tools Programmer
- `SupportSlaWorkflow.ts`: Customer Support Tools Programmer and Operations Lead
- `LevelResultRecorder.ts`: Lead Programmer
- `ProgressionSaveRepository.ts`: Lead Programmer
- `ProgressionSnapshotCodec.ts`: Lead Programmer
- `RewardGrantPipeline.ts`: Meta Systems Programmer
- `MapPointRegistry.ts`: Lead Programmer
- `MapPointComponent.ts`: Lead Programmer and Level Designer
- `EnemyFactory.ts`: Lead Programmer and Gameplay Programmer
- `EnemyActor.ts`: Gameplay Programmer
- `ObjectPool.ts`: Lead Programmer
- `ResourceIds.ts`: Lead Programmer
- `ResourceManifest.ts`: Lead Programmer
- `ResourceLoader.ts`: Lead Programmer

## Config layer

## `ConfigTypes.ts`

Purpose:

- defines generated config interfaces
- owns `LevelConfig`, `WaveConfig`, `SpawnConfig`, `EnemyConfig`, `RewardConfig`, and related config types

Rules:

- config interfaces should be readonly
- config interfaces must not contain runtime progress
- config interfaces must not reference Cocos nodes
- generate this file with `node scripts/export-level-types.js [output-file]` when using the common wave-spawn schema

## `ConfigIndex.ts`

Purpose:

- builds lookup maps from generated JSON
- groups rows such as waves by group and spawns by wave

Rules:

- do not put gameplay decisions here
- do not reinterpret design intent here
- use `assets/cocos-config-runtime-template/ConfigIndex.ts` as the baseline implementation template when helpful

## `ConfigManager.ts`

Purpose:

- provides read-only config queries
- centralizes missing-config errors

Allowed:

- `getLevel`
- `getTemplate`
- `getObjectives`
- `getWaves`
- `getSpawns`
- `getEnemy`
- `getEnemyGroup`
- `getMap`
- `getMapPoints`
- `getReward`

Forbidden:

- starting levels
- spawning enemies
- deciding victory or failure
- awarding rewards
- use `assets/cocos-config-runtime-template/ConfigManager.ts` as the baseline implementation template when helpful

## Runtime layer

## `LevelTypes.ts`

Purpose:

- defines runtime states, events, results, and common system interfaces

Contains:

- `LevelRunState`
- `WaveRunState`
- `SpawnRunState`
- `ObjectiveRunState`
- `LevelEvent`
- `RewardResult`
- `LevelSystem`

Rules:

- do not define CSV field schemas here
- do not put Cocos component logic here
- use `assets/cocos-level-runtime-template/LevelTypes.ts` as the baseline template when helpful

## `EventBus.ts`

Purpose:

- dispatches typed gameplay events without hard-wiring systems together

Rules:

- keep events typed and traceable
- do not hide ownership behind an invisible global bus
- use `assets/cocos-level-runtime-template/EventBus.ts` as the baseline template when helpful

## `LevelRuntime.ts`

Purpose:

- creates and owns the current run state for one level attempt
- separates mutable runtime state from static config

Rules:

- runtime can change
- config references remain readonly
- do not store UI node references here
- use `assets/cocos-level-runtime-template/LevelRuntime.ts` as the baseline template when helpful

## `LevelBuilder.ts`

Purpose:

- converts a `levelId` plus config lookups into a `LevelRuntime`

Allowed:

- load related config through `ConfigManager`
- create objective runtime entries
- create wave and spawn runtime entries

Forbidden:

- advancing waves
- spawning enemies
- awarding rewards
- directly touching UI
- use `assets/cocos-level-runtime-template/LevelBuilder.ts` as the baseline template when helpful

## `LevelFlowController.ts`

Purpose:

- coordinates level entry, start, pause, resume, complete, fail, and exit
- starts and stops systems

Allowed:

- call `LevelBuilder`
- start `WaveSystem`, `ObjectiveSystem`, and related systems
- respond to level completion or failure

Forbidden:

- parsing raw CSV
- generating enemies directly
- owning every gameplay rule
- manipulating detailed UI nodes
- use `assets/cocos-level-runtime-template/LevelFlowController.ts` as the baseline template when helpful

## Systems

## `WaveSystem.ts`

Purpose:

- owns wave order and wave progression rules

Allowed:

- start waves
- complete waves
- check next-wave rules
- notify spawn scheduling
- use `assets/cocos-level-runtime-template/WaveSystem.ts` as the baseline template when helpful

Forbidden:

- creating enemy prefabs
- calculating rewards
- acting as final objective authority

## `SpawnSystem.ts`

Purpose:

- owns spawn scheduling and spawn execution timing

Allowed:

- schedule spawns for a wave
- resolve map points through `MapPointRegistry`
- call `EnemyFactory`
- apply formations

Forbidden:

- loading prefabs directly when a factory or resource layer exists
- deciding victory or failure
- calculating rewards
- use `assets/cocos-level-runtime-template/SpawnSystem.ts` as the baseline template when helpful

## `ObjectiveSystem.ts`

Purpose:

- owns objective progress, completion, and failure checks

Allowed:

- listen to level events
- update objective runtime state
- report complete or failed state

Forbidden:

- awarding rewards
- directly controlling UI
- spawning enemies
- use `assets/cocos-level-runtime-template/ObjectiveSystem.ts` as the baseline template when helpful

## `RewardSystem.ts`

Purpose:

- owns reward result calculation and reward commit handoff

Allowed:

- calculate `RewardResult`
- handle first-clear, repeat, star, and drop-group reward composition
- pass results to player data systems

Forbidden:

- deciding economy balance
- playing reward animations
- mutating `RewardConfig`
- use `assets/cocos-level-runtime-template/RewardSystem.ts` as the baseline template when helpful

## `MetaProgressionStore.ts`

Purpose:

- stores unlocked levels, clear records, and best progression state

Rules:

- keep this separate from transient battle runtime
- do not let UI widgets become the source of truth for progression state
- use `assets/cocos-level-runtime-template/MetaProgressionStore.ts` as the baseline template when helpful

## `GuideProgressStore.ts`

Purpose:

- stores tutorial, onboarding, and feature-guide completion state

Rules:

- do not tie guide completion only to visible UI state
- keep guide dismissal and guide completion distinct
- use `assets/cocos-level-runtime-template/GuideProgressStore.ts` as the baseline template when helpful

## `ChapterUnlockPolicy.ts`

Purpose:

- evaluates when a chapter or content block becomes available

Rules:

- unlock rules should be data-driven and reviewable
- do not bury chapter gates in button enable logic
- use `assets/cocos-level-runtime-template/ChapterUnlockPolicy.ts` as the baseline template when helpful

## `CurrencyWallet.ts`

Purpose:

- stores player currency balances and transaction history

Rules:

- all spend and grant paths should pass through one wallet boundary
- do not mutate currency labels directly from UI code
- use `assets/cocos-level-runtime-template/CurrencyWallet.ts` as the baseline template when helpful

## `InventoryStore.ts`

Purpose:

- stores owned item counts and item removal rules

Rules:

- inventory mutation should stay separate from presentation state
- do not let reward popups become the source of truth for owned items
- use `assets/cocos-level-runtime-template/InventoryStore.ts` as the baseline template when helpful

## `ShopCatalog.ts`

Purpose:

- stores product definitions, prices, and rewards

Rules:

- shop catalog data should be reviewable and data-driven
- do not hard-code prices in button handlers
- use `assets/cocos-level-runtime-template/ShopCatalog.ts` as the baseline template when helpful

## `PurchasePipeline.ts`

Purpose:

- validates, spends, grants, and records product purchases

Rules:

- purchase validation and purchase execution stay in one place
- do not split price checks and price spending across unrelated callers
- use `assets/cocos-level-runtime-template/PurchasePipeline.ts` as the baseline template when helpful

## `QuestTracker.ts`

Purpose:

- tracks mission progress, completion, and claim state

Rules:

- quest progress should advance from typed progression signals
- do not infer claim state from whether a popup was shown
- use `assets/cocos-level-runtime-template/QuestTracker.ts` as the baseline template when helpful

## `ActivityStateStore.ts`

Purpose:

- stores live-event state, reward claims, and open or closed status

Rules:

- event availability and claim state should be durable
- do not mix activity logic into generic menu page state
- use `assets/cocos-level-runtime-template/ActivityStateStore.ts` as the baseline template when helpful

## `AdPlacementRegistry.ts`

Purpose:

- stores rewarded-ad placement definitions, cooldowns, and usage state

Rules:

- ad cooldown and daily limits should be durable and reviewable
- do not gate ad rewards only through temporary button-disable state
- use `assets/cocos-level-runtime-template/AdPlacementRegistry.ts` as the baseline template when helpful

## `RewardedAdPipeline.ts`

Purpose:

- validates placement availability and grants ad-view rewards

Rules:

- ad reward payout and cooldown marking should stay in one pipeline
- do not duplicate rewarded-ad grant logic across multiple pages
- use `assets/cocos-level-runtime-template/RewardedAdPipeline.ts` as the baseline template when helpful

## `CharacterRoster.ts`

Purpose:

- stores unlocked characters and their long-term growth state

Rules:

- character ownership and growth state should be durable
- do not calculate unlock state from whether a prefab exists in scene
- use `assets/cocos-level-runtime-template/CharacterRoster.ts` as the baseline template when helpful

## `EquipmentLoadout.ts`

Purpose:

- stores equipment ownership mapping and per-character slot assignment

Rules:

- loadout rules should stay separate from combat scene scripts
- do not let UI drag handlers become the only source of equipped state
- use `assets/cocos-level-runtime-template/EquipmentLoadout.ts` as the baseline template when helpful

## `StatAggregator.ts`

Purpose:

- combines character growth and equipment contributions into battle stats

Rules:

- stat composition should be deterministic and testable
- do not re-derive battle power differently in multiple modules
- use `assets/cocos-level-runtime-template/StatAggregator.ts` as the baseline template when helpful

## `DropTableResolver.ts`

Purpose:

- resolves weighted loot and random reward entries

Rules:

- drop logic should be centralized and auditable
- do not duplicate weighted-roll code in reward popups or enemy scripts
- use `assets/cocos-level-runtime-template/DropTableResolver.ts` as the baseline template when helpful

## `GachaPool.ts`

Purpose:

- stores draw-pool definitions and pity state

Rules:

- pool definition and pity state should be explicit
- do not hide pity counters in ad hoc page variables
- use `assets/cocos-level-runtime-template/GachaPool.ts` as the baseline template when helpful

## `GachaPipeline.ts`

Purpose:

- validates payment, executes draws, grants rewards, and advances pity state

Rules:

- payment and reward grant should stay in one draw pipeline
- do not split draw pricing, pity handling, and reward grant across unrelated callers
- use `assets/cocos-level-runtime-template/GachaPipeline.ts` as the baseline template when helpful

## `IapCatalog.ts`

Purpose:

- stores purchasable real-money products and their grant definitions

Rules:

- storefront products should be data-driven and reviewable
- do not hard-code purchase grants in pay-button handlers
- use `assets/cocos-level-runtime-template/IapCatalog.ts` as the baseline template when helpful

## `OrderLedger.ts`

Purpose:

- records purchase order lifecycle from pending to fulfilled or failed

Rules:

- order state should be explicit and queryable
- do not treat a successful SDK callback as the only durable order record
- use `assets/cocos-level-runtime-template/OrderLedger.ts` as the baseline template when helpful

## `IapPurchasePipeline.ts`

Purpose:

- creates purchase orders, fulfills paid receipts, and grants entitlements

Rules:

- order marking and reward grant should stay in one fulfillment boundary
- do not split payment verification, order state, and item grant across unrelated scripts
- use `assets/cocos-level-runtime-template/IapPurchasePipeline.ts` as the baseline template when helpful

## `RemoteConfigStore.ts`

Purpose:

- stores remotely delivered key-value configuration with versioning

Rules:

- remote values should be durable and inspectable
- do not bury live tuning numbers in arbitrary singleton globals
- use `assets/cocos-level-runtime-template/RemoteConfigStore.ts` as the baseline template when helpful

## `FeatureFlagEvaluator.ts`

Purpose:

- evaluates feature flags against stable segment rules

Rules:

- feature gating should be deterministic and reviewable
- do not scatter `if (isTestUser)` checks throughout product code
- use `assets/cocos-level-runtime-template/FeatureFlagEvaluator.ts` as the baseline template when helpful

## `ExperimentRegistry.ts`

Purpose:

- assigns stable experiment variants for subjects

Rules:

- AB bucketing should be deterministic per subject
- do not randomize variants separately on every page entry
- use `assets/cocos-level-runtime-template/ExperimentRegistry.ts` as the baseline template when helpful

## `HotfixOverrideStore.ts`

Purpose:

- stores temporary emergency overrides with optional expiry

Rules:

- kill switches and temporary overrides should be explicit
- do not implement hotfixes as forgotten one-off booleans in production code
- use `assets/cocos-level-runtime-template/HotfixOverrideStore.ts` as the baseline template when helpful

## `LiveOpsSwitchboard.ts`

Purpose:

- resolves remote config and hotfix values behind one live-ops boundary

Rules:

- callers should ask one switchboard instead of mixing config and override logic
- keep runtime reads simple and auditable
- use `assets/cocos-level-runtime-template/LiveOpsSwitchboard.ts` as the baseline template when helpful

## `AnalyticsSchemaRegistry.ts`

Purpose:

- stores analytics event schemas and validates event payloads

Rules:

- event names and required fields should be reviewable
- do not let every caller invent payload shape ad hoc
- use `assets/cocos-level-runtime-template/AnalyticsSchemaRegistry.ts` as the baseline template when helpful

## `SessionTracker.ts`

Purpose:

- tracks gameplay session lifecycle and last activity

Rules:

- session identity should be explicit and durable for event correlation
- do not rebuild session state separately in every analytics caller
- use `assets/cocos-level-runtime-template/SessionTracker.ts` as the baseline template when helpful

## `AnalyticsEventQueue.ts`

Purpose:

- buffers analytics events before upload or persistence

Rules:

- analytics buffering should stay separate from gameplay systems
- do not directly call SDK upload from every feature module
- use `assets/cocos-level-runtime-template/AnalyticsEventQueue.ts` as the baseline template when helpful

## `FunnelTracker.ts`

Purpose:

- tracks ordered player progression through key funnels

Rules:

- funnel completion should be deterministic and inspectable
- do not infer funnel state only from UI navigation callbacks
- use `assets/cocos-level-runtime-template/FunnelTracker.ts` as the baseline template when helpful

## `AnalyticsDispatchPipeline.ts`

Purpose:

- validates, enqueues, and flushes analytics events through one dispatch boundary

Rules:

- event validation and dispatch should stay in one pipeline
- do not split event schema checks, queue writes, and upload calls across unrelated modules
- use `assets/cocos-level-runtime-template/AnalyticsDispatchPipeline.ts` as the baseline template when helpful

## `FriendListStore.ts`

Purpose:

- stores friend relationship state, remarks, and intimacy

Rules:

- friend state should be durable and queryable
- do not let social panels become the only source of truth for friendship state
- use `assets/cocos-level-runtime-template/FriendListStore.ts` as the baseline template when helpful

## `LeaderboardStore.ts`

Purpose:

- stores ranked score snapshots and top lists

Rules:

- ranking updates should be deterministic
- do not derive rank only from transient page memory
- use `assets/cocos-level-runtime-template/LeaderboardStore.ts` as the baseline template when helpful

## `GuildRosterStore.ts`

Purpose:

- stores guild identity, members, roles, and contribution state

Rules:

- guild role changes should stay explicit
- do not spread guild authority checks across random UI handlers
- use `assets/cocos-level-runtime-template/GuildRosterStore.ts` as the baseline template when helpful

## `MailboxStore.ts`

Purpose:

- stores inbox mail, attachments, read state, and claim state

Rules:

- mail claim state should be durable
- do not grant attachments directly from popup state without mailbox records
- use `assets/cocos-level-runtime-template/MailboxStore.ts` as the baseline template when helpful

## `NotificationInbox.ts`

Purpose:

- stores dismissible local notification and message-center entries

Rules:

- notification visibility should be explicit
- do not hard-code dismissed state only in UI component memory
- use `assets/cocos-level-runtime-template/NotificationInbox.ts` as the baseline template when helpful

## `SupportTicketStore.ts`

Purpose:

- stores customer-support tickets and resolution state

Rules:

- support workflow state should be durable
- do not manage ticket status only in CRM-like page component state
- use `assets/cocos-level-runtime-template/SupportTicketStore.ts` as the baseline template when helpful

## `PlayerReportInbox.ts`

Purpose:

- stores player-submitted reports, evidence references, and review state

Rules:

- report review state should be explicit and auditable
- do not discard evidence linkage after opening a moderation page
- use `assets/cocos-level-runtime-template/PlayerReportInbox.ts` as the baseline template when helpful

## `ModerationActionLog.ts`

Purpose:

- records warnings, bans, mutes, and other moderation actions

Rules:

- moderation actions should be queryable and time-bounded when needed
- do not rely on silent account flags without an action log
- use `assets/cocos-level-runtime-template/ModerationActionLog.ts` as the baseline template when helpful

## `RiskFlagRegistry.ts`

Purpose:

- stores risk-control flags such as abuse, fraud, chargeback, or bot suspicion

Rules:

- risk flags should be explicit and clearable
- do not bury anti-abuse state in untraceable numeric counters
- use `assets/cocos-level-runtime-template/RiskFlagRegistry.ts` as the baseline template when helpful

## `ComplianceConsentStore.ts`

Purpose:

- stores durable consent records for privacy, terms, age-gate, and related compliance decisions

Rules:

- consent state should be versioned and queryable
- do not infer legal consent from whether a popup was once dismissed
- use `assets/cocos-level-runtime-template/ComplianceConsentStore.ts` as the baseline template when helpful

## `OfflineCacheStore.ts`

Purpose:

- stores durable local fallback data with optional expiry

Rules:

- offline cache lifetime should be explicit
- do not invent one-off local caches in each feature module
- use `assets/cocos-level-runtime-template/OfflineCacheStore.ts` as the baseline template when helpful

## `SyncOperationQueue.ts`

Purpose:

- stores pending sync operations and their retry state

Rules:

- queued operations should be visible and auditable
- do not hide sync retry state inside random promise chains
- use `assets/cocos-level-runtime-template/SyncOperationQueue.ts` as the baseline template when helpful

## `RetryPolicy.ts`

Purpose:

- centralizes retry limits and backoff calculation

Rules:

- retry behavior should be deterministic and configurable
- do not duplicate backoff math across unrelated modules
- use `assets/cocos-level-runtime-template/RetryPolicy.ts` as the baseline template when helpful

## `PurchaseRecoveryQueue.ts`

Purpose:

- stores pending order-recovery checks for delayed or interrupted purchase fulfillment

Rules:

- purchase recovery state should be durable and queryable
- do not rely on reopening the payment page to recover unfinished orders
- use `assets/cocos-level-runtime-template/PurchaseRecoveryQueue.ts` as the baseline template when helpful

## `ServerSyncCoordinator.ts`

Purpose:

- drives queued operation upload through one retry-aware sync boundary

Rules:

- sync execution should stay separate from gameplay logic
- do not let every feature module invent its own flush loop
- use `assets/cocos-level-runtime-template/ServerSyncCoordinator.ts` as the baseline template when helpful

## `ServerContractTypes.ts`

Purpose:

- defines request, response, ack, and conflict payload contracts for sync features

Rules:

- protocol fields should be typed once and reused everywhere
- do not let each feature invent its own envelope keys and error field names
- use `assets/cocos-level-runtime-template/ServerContractTypes.ts` as the baseline template when helpful

## `ConflictResolutionPolicy.ts`

Purpose:

- centralizes how local state and server state are resolved after sync conflicts

Rules:

- conflict strategy should be reviewable and deterministic
- do not bury conflict decisions inside random callback branches
- use `assets/cocos-level-runtime-template/ConflictResolutionPolicy.ts` as the baseline template when helpful

## `SyncSnapshotCodec.ts`

Purpose:

- serializes and validates durable sync snapshots for offline rehydration

Rules:

- sync snapshot format should be version-aware and testable
- do not copy-paste JSON encode and decode rules across queue, shop, and social systems
- use `assets/cocos-level-runtime-template/SyncSnapshotCodec.ts` as the baseline template when helpful

## `SyncSnapshotRepository.ts`

Purpose:

- loads, saves, and clears durable sync snapshots behind one repository boundary

Rules:

- snapshot persistence transport should stay behind an adapter
- do not let feature modules each write their own local sync-save file directly
- use `assets/cocos-level-runtime-template/SyncSnapshotRepository.ts` as the baseline template when helpful

## `AuthSessionStore.ts`

Purpose:

- stores the current login session, provider identity, expiry, and access token boundary

Rules:

- session validity should be checked through one store boundary
- do not let launch pages and payment pages each cache their own token copy
- use `assets/cocos-level-runtime-template/AuthSessionStore.ts` as the baseline template when helpful

## `AccountBindingStore.ts`

Purpose:

- stores which platform identities are linked to the current game account

Rules:

- binding state should be durable and queryable
- do not infer whether an account is linked only from the last SDK callback result
- use `assets/cocos-level-runtime-template/AccountBindingStore.ts` as the baseline template when helpful

## `CloudSaveManifest.ts`

Purpose:

- stores cloud-save slot revision summaries and update ordering

Rules:

- save-slot revision and checksum data should stay centralized
- do not compare cross-device save candidates with ad hoc JSON checks in UI code
- use `assets/cocos-level-runtime-template/CloudSaveManifest.ts` as the baseline template when helpful

## `CloudSaveMergePolicy.ts`

Purpose:

- centralizes how local and remote save candidates are chosen or escalated

Rules:

- merge rules should be explicit and reviewable
- do not let different pages choose different save winners for the same account state
- use `assets/cocos-level-runtime-template/CloudSaveMergePolicy.ts` as the baseline template when helpful

## `CloudSaveSyncCoordinator.ts`

Purpose:

- coordinates authenticated remote save fetch, merge decision, and push or pull execution

Rules:

- save synchronization should pass through one authenticated coordinator
- do not spread cloud-save fetch, compare, and overwrite logic across login panels and settings popups
- use `assets/cocos-level-runtime-template/CloudSaveSyncCoordinator.ts` as the baseline template when helpful

## `AnnouncementBoard.ts`

Purpose:

- stores timed announcements, read state, and dismiss state for player-facing notices

Rules:

- notice visibility should be durable and sortable
- do not let each popup prefab decide independently whether the same announcement should appear
- use `assets/cocos-level-runtime-template/AnnouncementBoard.ts` as the baseline template when helpful

## `EventCalendarStore.ts`

Purpose:

- stores event preview windows, active windows, and reward-group linkage

Rules:

- event timing should be centralized and reviewable
- do not hard-code event open and close checks in multiple activity pages
- use `assets/cocos-level-runtime-template/EventCalendarStore.ts` as the baseline template when helpful

## `DailyCheckInTracker.ts`

Purpose:

- tracks sign-in claim progress, streak count, and cycle reset state

Rules:

- check-in claim state should be durable and deterministic
- do not infer sign-in reward eligibility from whether a button was tapped once this session
- use `assets/cocos-level-runtime-template/DailyCheckInTracker.ts` as the baseline template when helpful

## `MailRewardDeliveryPipeline.ts`

Purpose:

- grants mail rewards through one idempotent delivery boundary

Rules:

- mail reward payout should be idempotent and ledger-backed
- do not grant attachment rewards directly from inbox item views without a delivery ledger
- use `assets/cocos-level-runtime-template/MailRewardDeliveryPipeline.ts` as the baseline template when helpful

## `EnvironmentSwitchboard.ts`

Purpose:

- stores environment profiles and controls which runtime environment is active

Rules:

- environment selection should stay explicit and auditable
- do not let login pages, review builds, and payment code each choose different endpoint roots silently
- use `assets/cocos-level-runtime-template/EnvironmentSwitchboard.ts` as the baseline template when helpful

## `CompensationGrantPipeline.ts`

Purpose:

- grants support or operations compensation through one idempotent payout boundary

Rules:

- compensation payout should be ledger-backed and replay-safe
- do not let support popups and mail pages each grant the same compensation independently
- use `assets/cocos-level-runtime-template/CompensationGrantPipeline.ts` as the baseline template when helpful

## `AppealCaseStore.ts`

Purpose:

- stores ban appeals, review assignment, and resolution state

Rules:

- appeal status should be durable and queryable
- do not manage appeal decisions only in spreadsheet notes or moderator memory
- use `assets/cocos-level-runtime-template/AppealCaseStore.ts` as the baseline template when helpful

## `OpsCommandQueue.ts`

Purpose:

- stores pending backend or runtime operations commands and their acknowledgement state

Rules:

- command dispatch should be explicit and auditable
- do not send one-off backend control commands directly from temporary admin buttons without queue records
- use `assets/cocos-level-runtime-template/OpsCommandQueue.ts` as the baseline template when helpful

## `GmPermissionPolicy.ts`

Purpose:

- defines which GM roles may execute which command types against which scopes

Rules:

- GM authority should be explicit and reviewable
- do not let hidden debug menus bypass the same permission policy used by formal operations tools
- use `assets/cocos-level-runtime-template/GmPermissionPolicy.ts` as the baseline template when helpful

## `GrayReleasePolicy.ts`

Purpose:

- evaluates whether a feature is enabled for a subject under gray or staged rollout rules

Rules:

- rollout rules should be deterministic and environment-aware
- do not let each feature invent its own rollout percentage math or whitelist parsing
- use `assets/cocos-level-runtime-template/GrayReleasePolicy.ts` as the baseline template when helpful

## `BattleReplayArchive.ts`

Purpose:

- stores replay records, frame streams, and replay metadata for battle review

Rules:

- replay payloads should stay versioned and queryable
- do not let QA capture and anti-cheat capture each invent their own replay storage shape
- use `assets/cocos-level-runtime-template/BattleReplayArchive.ts` as the baseline template when helpful

## `AntiCheatEvidenceLog.ts`

Purpose:

- stores structured anti-cheat evidence records per player and per rule

Rules:

- evidence should be durable, sortable, and reviewable
- do not bury cheat-detection proof only in transient console logs or screenshots
- use `assets/cocos-level-runtime-template/AntiCheatEvidenceLog.ts` as the baseline template when helpful

## `CrashRecoverySnapshotStore.ts`

Purpose:

- stores the latest recoverable runtime snapshot after crashes or forced exits

Rules:

- recovery state should be explicit and clearable
- do not guess crash recovery eligibility only from whichever scene was open last
- use `assets/cocos-level-runtime-template/CrashRecoverySnapshotStore.ts` as the baseline template when helpful

## `AnalyticsAuditLedger.ts`

Purpose:

- stores analytics dispatch audit records, payload checksums, and acknowledgement state

Rules:

- analytics delivery should be auditable after the fact
- do not assume a sent SDK call means the event was durably accepted
- use `assets/cocos-level-runtime-template/AnalyticsAuditLedger.ts` as the baseline template when helpful

## `VersionMigrationPlanner.ts`

Purpose:

- defines ordered state-migration steps between saved-data versions

Rules:

- migration paths should be explicit and testable
- do not patch old save payloads opportunistically in random loaders
- use `assets/cocos-level-runtime-template/VersionMigrationPlanner.ts` as the baseline template when helpful

## `LocalizationCatalog.ts`

Purpose:

- stores localized text entries and resolves per-locale copy with fallback support

Rules:

- text lookup should stay centralized and deterministic
- do not hard-code translated UI copy directly into multiple prefab scripts
- use `assets/cocos-level-runtime-template/LocalizationCatalog.ts` as the baseline template when helpful

## `SensitiveWordFilter.ts`

Purpose:

- detects and masks blocked chat or naming terms before submission or display

Rules:

- moderation checks should be reusable and consistent
- do not let chat, guild rename, and mailbox nickname flows each invent their own filter behavior
- use `assets/cocos-level-runtime-template/SensitiveWordFilter.ts` as the baseline template when helpful

## `GuidedOnboardingFlow.ts`

Purpose:

- tracks ordered onboarding steps, completion state, and next-step progression

Rules:

- onboarding progress should be durable and replayable
- do not store tutorial progress only in temporary page flags
- use `assets/cocos-level-runtime-template/GuidedOnboardingFlow.ts` as the baseline template when helpful

## `TutorialScenarioScript.ts`

Purpose:

- stores scripted tutorial scenarios and action sequences for teaching moments

Rules:

- tutorial scripting should be data-driven and inspectable
- do not bury teaching logic in one-off cutscene callbacks and hidden page events
- use `assets/cocos-level-runtime-template/TutorialScenarioScript.ts` as the baseline template when helpful

## `ExperimentControlPanel.ts`

Purpose:

- stores operator or analyst overrides for experiment variants at the subject level

Rules:

- experiment overrides should be explicit and queryable
- do not let ad hoc debug menus silently override experiment assignment with no audit trail
- use `assets/cocos-level-runtime-template/ExperimentControlPanel.ts` as the baseline template when helpful

## `AudioBusRegistry.ts`

Purpose:

- stores audio bus categories, per-bus volume, and mute state

Rules:

- audio routing should be centralized and durable
- do not let every page or cutscene controller invent its own independent volume group
- use `assets/cocos-level-runtime-template/AudioBusRegistry.ts` as the baseline template when helpful

## `MotionSequenceTimeline.ts`

Purpose:

- stores ordered motion cues for UI, cutscene, or onboarding presentation tracks

Rules:

- timing should be inspectable and reusable
- do not spread animation timing constants across unrelated widget scripts
- use `assets/cocos-level-runtime-template/MotionSequenceTimeline.ts` as the baseline template when helpful

## `AccessibilityProfileStore.ts`

Purpose:

- stores player accessibility preferences such as text scale, subtitles, and reduced motion

Rules:

- accessibility settings should be durable and globally readable
- do not let each settings page or overlay hold separate copies of accessibility toggles
- use `assets/cocos-level-runtime-template/AccessibilityProfileStore.ts` as the baseline template when helpful

## `DevicePerformanceTierPolicy.ts`

Purpose:

- classifies devices into stable performance tiers from hardware snapshots

Rules:

- quality tiering should be deterministic and shared
- do not let combat, lobby, and cutscene modules each classify the same device differently
- use `assets/cocos-level-runtime-template/DevicePerformanceTierPolicy.ts` as the baseline template when helpful

## `AssetBundlePartitionPlan.ts`

Purpose:

- stores bundle partitions, preload decisions, and asset-to-bundle ownership

Rules:

- bundle layout should be explicit and reviewable
- do not scatter bundle membership and preload rules across manual loader call sites
- use `assets/cocos-level-runtime-template/AssetBundlePartitionPlan.ts` as the baseline template when helpful

## `NetworkReconnectCoordinator.ts`

Purpose:

- coordinates reconnect attempts, attempt history, and reconnect ceilings

Rules:

- reconnect policy should be centralized and bounded
- do not let login, room, and battle layers each run their own silent reconnect loop
- use `assets/cocos-level-runtime-template/NetworkReconnectCoordinator.ts` as the baseline template when helpful

## `HeartbeatMonitor.ts`

Purpose:

- stores last heartbeat send or ack state and evaluates stale connections

Rules:

- liveness checks should be explicit and shared
- do not let each socket caller guess timeout rules from separate timestamps
- use `assets/cocos-level-runtime-template/HeartbeatMonitor.ts` as the baseline template when helpful

## `MatchmakingQueue.ts`

Purpose:

- stores queued matchmaking requests and request status transitions

Rules:

- queue state should be traceable and playlist-scoped
- do not let match entry UI become the only source of matchmaking state
- use `assets/cocos-level-runtime-template/MatchmakingQueue.ts` as the baseline template when helpful

## `PvpSettlementConsistencyGuard.ts`

Purpose:

- validates that candidate PVP settlement data matches the authoritative result snapshot

Rules:

- settlement consistency checks should be deterministic and enforced
- do not trust client-side result screens without a shared settlement guard
- use `assets/cocos-level-runtime-template/PvpSettlementConsistencyGuard.ts` as the baseline template when helpful

## `BotBackfillPolicy.ts`

Purpose:

- decides when matchmaking may backfill bots and how many bots should be inserted

Rules:

- bot backfill rules should be explicit and playlist-specific
- do not hide bot fill thresholds inside temporary server handlers or debug scripts
- use `assets/cocos-level-runtime-template/BotBackfillPolicy.ts` as the baseline template when helpful

## `PaymentRiskPolicy.ts`

Purpose:

- evaluates payment risk signals and returns allow, review, or block decisions

Rules:

- payment risk scoring should be centralized and reviewable
- do not let pay entry pages and backend callback handlers each invent their own risk thresholds
- use `assets/cocos-level-runtime-template/PaymentRiskPolicy.ts` as the baseline template when helpful

## `BanEnforcementPolicy.ts`

Purpose:

- decides warning, mute, suspension, or permanent-ban outcomes from violation history

Rules:

- punishment rules should be explicit and repeatable
- do not let moderators apply different penalties for the same rule breach with no shared policy
- use `assets/cocos-level-runtime-template/BanEnforcementPolicy.ts` as the baseline template when helpful

## `SocialRelationshipGraph.ts`

Purpose:

- stores directed social relationship edges such as friend, follow, block, mentor, or squadmate

Rules:

- social edges should be centralized and queryable
- do not split relationship truth across separate friend lists, block lists, and temporary page caches
- use `assets/cocos-level-runtime-template/SocialRelationshipGraph.ts` as the baseline template when helpful

## `SquadSeasonTracker.ts`

Purpose:

- stores squad season records, score accumulation, rank, and season reward claim state

Rules:

- season progression should be durable and season-scoped
- do not let squad season score live only in result pages or temporary server response caches
- use `assets/cocos-level-runtime-template/SquadSeasonTracker.ts` as the baseline template when helpful

## `MetricsSchemaContract.ts`

Purpose:

- stores owned metric contracts and required field definitions for data-warehouse ingestion

Rules:

- metric semantics should be explicit and shared
- do not let analytics, BI, and gameplay teams each redefine the same metric payload shape
- use `assets/cocos-level-runtime-template/MetricsSchemaContract.ts` as the baseline template when helpful

## `NewUserPurchaseFunnel.ts`

Purpose:

- stores funnel progression for first-session and early-life monetization milestones

Rules:

- funnel stage changes should be explicit and analyzable
- do not infer new-user purchase funnel state later from mixed UI traces and payment logs
- use `assets/cocos-level-runtime-template/NewUserPurchaseFunnel.ts` as the baseline template when helpful

## `RecallCampaignTracker.ts`

Purpose:

- stores recall campaign eligibility, entry window, and reward claim state

Rules:

- recall state should be durable and campaign-scoped
- do not let each comeback popup calculate inactivity and eligibility independently
- use `assets/cocos-level-runtime-template/RecallCampaignTracker.ts` as the baseline template when helpful

## `AdMonetizationExperimentPolicy.ts`

Purpose:

- decides monetization ad variants for subjects under experiment rules

Rules:

- ad experiment assignment should be deterministic and reviewable
- do not let reward-ad, interstitial, and revive-ad flows each hash subjects differently
- use `assets/cocos-level-runtime-template/AdMonetizationExperimentPolicy.ts` as the baseline template when helpful

## `UgcModerationQueue.ts`

Purpose:

- stores queued UGC moderation tasks, review decisions, and evidence references

Rules:

- UGC review state should be explicit and queryable
- do not manage screenshot, replay, and text moderation in disconnected temporary queues
- use `assets/cocos-level-runtime-template/UgcModerationQueue.ts` as the baseline template when helpful

## `SupportSlaWorkflow.ts`

Purpose:

- tracks support ticket SLA stages, deadlines, and breach state

Rules:

- response and resolution timing should be durable and measurable
- do not track support urgency only in spreadsheet labels or chat reminders
- use `assets/cocos-level-runtime-template/SupportSlaWorkflow.ts` as the baseline template when helpful

## `LevelResultRecorder.ts`

Purpose:

- records the durable result of a level attempt for analytics, history, or recovery

Rules:

- store summary data, not the full live runtime object graph
- keep failure and completion records in one consistent schema
- use `assets/cocos-level-runtime-template/LevelResultRecorder.ts` as the baseline template when helpful

## `ProgressionSaveRepository.ts`

Purpose:

- owns save and load access for meta progression snapshots

Rules:

- persistence transport stays behind a repository boundary
- gameplay and menu logic should not each invent their own save format
- use `assets/cocos-level-runtime-template/ProgressionSaveRepository.ts` as the baseline template when helpful

## `ProgressionSnapshotCodec.ts`

Purpose:

- serializes and deserializes durable progression snapshots

Rules:

- version save payloads explicitly
- normalization should happen in one place instead of every caller
- use `assets/cocos-level-runtime-template/ProgressionSnapshotCodec.ts` as the baseline template when helpful

## `RewardGrantPipeline.ts`

Purpose:

- turns `RewardResult` into actual account mutation and progression updates

Rules:

- payout policy should not live inside result UI or button handlers
- keep reward calculation separate from reward commitment
- use `assets/cocos-level-runtime-template/RewardGrantPipeline.ts` as the baseline template when helpful

## Scene bridge

## `MapPointRegistry.ts`

Purpose:

- stores and queries runtime map points

Allowed:

- register points
- get point by id
- get points by tag
- clear map points on level exit

Forbidden:

- deciding spawn rules
- deciding level pacing
- owning objective logic
- use `assets/cocos-level-runtime-template/MapPointRegistry.ts` as the baseline template when helpful

## `MapPointComponent.ts`

Purpose:

- attaches to Cocos nodes that represent logical map points
- exposes `pointId`, `pointType`, and tags
- registers into `MapPointRegistry`

Rules:

- this can be a Cocos Component
- it should not spawn enemies itself
- it should not own gameplay rules
- use `assets/cocos-level-runtime-template/MapPointComponent.ts` as the baseline template when helpful

## Actor creation

## `EnemyFactory.ts`

Purpose:

- creates enemies from enemy config and spawn context
- owns prefab lookup, pooling, and initialization handoff

Allowed:

- create enemy actors
- release enemy actors
- preload enemy prefab families

Forbidden:

- deciding when a wave spawns
- deciding objective completion
- awarding rewards
- use `assets/cocos-level-runtime-template/EnemyFactory.ts` as the baseline template when helpful

## `EnemyActor.ts`

Purpose:

- runtime component for an enemy instance

Allowed:

- initialize from runtime data
- receive damage
- die
- emit enemy events
- reset for pooling

Forbidden:

- reading the whole level table
- deciding global reward results
- controlling level flow
- use `assets/cocos-level-runtime-template/EnemyActor.ts` as the baseline template when helpful

## `ObjectPool.ts`

Purpose:

- reuses frequently spawned runtime objects
- reduces instantiate and destroy churn for enemies, bullets, effects, and UI fragments

Rules:

- pool ownership must stay explicit
- pooled object reset must be deterministic
- use `assets/cocos-level-runtime-template/ObjectPool.ts` as the baseline template when helpful

## Resource manifest

## `ResourceIds.ts`

Purpose:

- defines stable resource id types

Rules:

- keep ids stable
- do not spread raw paths into gameplay configs
- use `assets/cocos-level-runtime-template/ResourceIds.ts` as the baseline template when helpful

## `ResourceManifest.ts`

Purpose:

- maps stable ids to bundles and resource paths

Rules:

- gameplay config references ids, not direct paths
- resource ownership remains explicit
- use `assets/cocos-level-runtime-template/ResourceManifest.ts` as the baseline template when helpful

## `ResourceLoader.ts`

Purpose:

- bridges stable resource ids to actual bundle loading
- centralizes cache, preload, and release behavior

Rules:

- gameplay code requests ids, not raw paths
- loader policy stays outside gameplay systems when possible
- use `assets/cocos-level-runtime-template/ResourceLoader.ts` as the baseline template when helpful

## Recommended flow

```text
LevelFlowController.enterLevel(levelId)
  -> LevelBuilder.build(levelId)
    -> ConfigManager queries generated config
  -> MapPointRegistry registers scene points
  -> ObjectiveSystem.start(runtime)
  -> WaveSystem.start(runtime)
    -> SpawnSystem schedules spawns
      -> MapPointRegistry resolves points
      -> EnemyFactory creates actors
  -> ObjectiveSystem evaluates events
  -> RewardSystem calculates result
  -> RewardGrantPipeline commits result
  -> MetaProgressionStore updates clear state
  -> LevelResultRecorder persists summary
  -> ProgressionSnapshotCodec encodes updated save state
  -> ProgressionSaveRepository saves durable snapshot
  -> CurrencyWallet / InventoryStore support economy and shop systems outside battle
  -> CharacterRoster / EquipmentLoadout / StatAggregator support long-term combat growth
  -> DropTableResolver / GachaPool / GachaPipeline support loot and draw systems
  -> AdPlacementRegistry / RewardedAdPipeline support ad monetization
  -> IapCatalog / OrderLedger / IapPurchasePipeline support real-money purchase fulfillment
  -> RemoteConfigStore / FeatureFlagEvaluator / ExperimentRegistry / HotfixOverrideStore / LiveOpsSwitchboard support live tuning
  -> AnalyticsSchemaRegistry / SessionTracker / FunnelTracker / AnalyticsDispatchPipeline support telemetry
  -> FriendListStore / LeaderboardStore / GuildRosterStore / MailboxStore / NotificationInbox support social systems
  -> SupportTicketStore / PlayerReportInbox / ModerationActionLog / RiskFlagRegistry / ComplianceConsentStore support operations safety
  -> OfflineCacheStore / SyncOperationQueue / RetryPolicy / PurchaseRecoveryQueue / ServerSyncCoordinator support resilient sync
  -> ServerContractTypes / ConflictResolutionPolicy / SyncSnapshotCodec / SyncSnapshotRepository support protocol discipline and sync recovery
  -> AuthSessionStore / AccountBindingStore / CloudSaveManifest / CloudSaveMergePolicy / CloudSaveSyncCoordinator support login and cross-device save continuity
  -> AnnouncementBoard / EventCalendarStore / DailyCheckInTracker / MailRewardDeliveryPipeline / EnvironmentSwitchboard support live notices, event cadence, and runtime environment control
  -> CompensationGrantPipeline / AppealCaseStore / OpsCommandQueue / GmPermissionPolicy / GrayReleasePolicy support service recovery, operations authority, and staged rollout control
  -> BattleReplayArchive / AntiCheatEvidenceLog / CrashRecoverySnapshotStore / AnalyticsAuditLedger / VersionMigrationPlanner support postmortem review, auditability, recovery, and upgrade safety
  -> LocalizationCatalog / SensitiveWordFilter / GuidedOnboardingFlow / TutorialScenarioScript / ExperimentControlPanel support scalable content presentation, safe social text, guided teaching, and controlled experiment override
  -> AudioBusRegistry / MotionSequenceTimeline / AccessibilityProfileStore / DevicePerformanceTierPolicy / AssetBundlePartitionPlan support presentation consistency, inclusive UX, device-aware quality, and scalable resource shipping
  -> NetworkReconnectCoordinator / HeartbeatMonitor / MatchmakingQueue / PvpSettlementConsistencyGuard / BotBackfillPolicy support resilient realtime connectivity, fair queueing, and consistent PVP outcomes
  -> PaymentRiskPolicy / BanEnforcementPolicy / SocialRelationshipGraph / SquadSeasonTracker / MetricsSchemaContract support monetization safety, enforceable moderation, social graph consistency, competitive seasonal tracking, and stable analytics semantics
  -> NewUserPurchaseFunnel / RecallCampaignTracker / AdMonetizationExperimentPolicy / UgcModerationQueue / SupportSlaWorkflow support growth clarity, ad monetization control, UGC review discipline, and measurable support operations
```

## Event flow

Common events:

- `level_started`
- `wave_started`
- `enemy_spawned`
- `enemy_dead`
- `objective_updated`
- `level_completed`
- `level_failed`
- `reward_calculated`

Event rules:

- events should aid decoupling, not hide ownership
- do not turn the event bus into an untraceable rule engine
- important events should include `levelId`, time, and typed payload when practical
- prefer one scoped bus per gameplay domain over a silent app-wide singleton

## Component rules

Use Cocos Components for:

- scene entry components
- actor components
- map point components
- visual presenters that need node lifecycle

Use ordinary TypeScript classes for:

- config queries
- builders
- wave logic
- spawn logic
- objective logic
- reward calculation

Rule:

- only classes that need node lifecycle or node references should be Cocos Components

## Forbidden patterns

- `LevelManager.ts` owns everything
- each level has a custom script with unique rules
- UI pages read CSV or generate enemies
- scene scripts become the actual level system
- enemy components read global level config directly
- runtime state is written back into config objects
- resource paths are scattered across level tables and gameplay code
- pooled objects keep stale state between uses
- loading logic is duplicated inside gameplay systems
- level clear state lives only in result UI memory
- reward payout and save-data mutation happen directly inside popup callbacks
- local storage keys and JSON schema are redefined in multiple classes
- chapter unlock rules are hidden inside menu buttons or red-dot code
- tutorial completion is inferred from whether a panel was opened once
- shop prices and payment checks live in button click code
- quest completion depends on whether a popup was displayed
- limited-time event claim state lives only in server response caches or temporary page state
- battle power is calculated differently in lineup page, battle entry, and result screen
- pity counters live only in draw panel memory
- weighted reward logic is copy-pasted across monsters, quests, and events
- rewarded-ad cooldowns are enforced only by greyed-out buttons
- IAP fulfillment grants items twice because there is no order ledger
- store SDK callbacks directly mutate UI state without durable fulfillment records
- live tuning values are hard-coded in client builds
- AB experiment assignment changes every time the page reopens
- hotfix switches are patched manually into unrelated gameplay files
- analytics event names drift across modules with no schema contract
- session identifiers are generated differently by different feature teams
- funnel completion is guessed later from raw logs because no explicit tracker exists
- friend state exists only in an open panel cache
- guild roles are checked differently in different pages
- mailbox attachments are granted before claim state is persisted
- report review status exists only in moderator notes outside the game system
- bans and mutes are applied without a durable action ledger
- privacy consent is guessed from a popup close event
- pending sync operations disappear after app restart
- retry backoff differs across shop, mail, and social systems
- interrupted payments depend on manual support intervention because there is no purchase recovery queue
- server response envelopes drift across wallet, mail, and guild features
- sync conflict outcomes depend on which page handled the callback last
- offline sync snapshots are saved with hand-written JSON in multiple systems
- login tokens are cached separately by splash page, store page, and guild page
- guest-to-platform account binding status is guessed from button text instead of durable state
- cloud-save overwrite decisions differ between first-login popup and settings page
- announcement popups reappear because dismiss state lives only in the prefab instance
- activity calendars disagree because each page recalculates event timing differently
- mail rewards are granted twice because inbox UI and settlement UI both call payout directly
- staging, review, and production endpoints are mixed by build-time constants with no runtime switchboard
- compensation rewards are granted twice because support tools and mail flows use separate payout ledgers
- GM commands are executed from hidden debug pages with no permission check
- gray rollout differs between login, lobby, and shop because each module hashes players differently
- appeal case decisions cannot be audited because resolution lives only in chat history
- replay data cannot be trusted because capture format differs between QA, PvP, and anti-cheat tools
- crash recovery loops players into broken state because there is no explicit recoverable snapshot boundary
- analytics discrepancies cannot be reconciled because there is no acknowledgement ledger
- version upgrades corrupt old saves because migration rules live in scattered `if version < x` patches
- translated copy drifts because each UI page owns its own local string table
- naming and chat moderation produce inconsistent results across lobby, guild, and profile pages
- tutorial progress resets because step state is stored only in current-scene memory
- experiment overrides are changed from hidden debug widgets with no shared control surface
- audio balance drifts because popup, battle, and cutscene systems each apply their own volume multipliers
- reduced-motion users still see full animation because motion policy lives only inside one panel controller
- the same device runs different quality levels in lobby and battle because tier logic is duplicated
- bundle preload rules are rebuilt manually in each loader entry point
- reconnect attempts loop forever because room and battle systems retry independently
- heartbeat timeout logic differs between socket client and matchmaking page
- match queue cancellation only updates UI state and not the real queue record
- PVP result disagreements are resolved by whichever client reports last
- bot fill timing changes silently between playlists because no shared policy exists
- payment review thresholds differ between shop entry and callback fulfillment
- bans are enforced differently by different moderation tools because no shared policy exists
- friend, follow, and block relationships disagree across features because edge storage is fragmented
- squad season score and reward claim state are recalculated differently by different pages
- warehouse metric names drift because contract ownership is not centralized
- first-purchase funnel steps are guessed after the fact because no formal funnel tracker exists
- recall eligibility differs between login popup and mail campaign because inactivity rules are duplicated
- ad revenue experiments conflict because each ad placement assigns variants independently
- UGC review status is lost between tools because moderation queue state is not unified
- support escalation timing is managed manually and SLA breaches are invisible until complaints arrive

## Review questions

Ask these before approving implementation:

1. Can config be loaded without starting a level?
2. Can a level be built without touching UI?
3. Can waves advance without knowing prefab paths?
4. Can objectives be tested without a full scene?
5. Can rewards be calculated without playing result UI?
6. Can map points be cleared and re-registered safely?
7. Is there any class that owns too many responsibilities?

## Architecture law

ConfigManager reads. LevelBuilder assembles. LevelFlowController coordinates. WaveSystem progresses. SpawnSystem schedules. ObjectiveSystem judges. RewardSystem calculates. RewardGrantPipeline commits. MetaProgressionStore remembers. GuideProgressStore tracks. ChapterUnlockPolicy evaluates. CurrencyWallet pays. InventoryStore holds. ShopCatalog defines. PurchasePipeline executes. QuestTracker advances. ActivityStateStore tracks. AdPlacementRegistry limits. RewardedAdPipeline grants. CharacterRoster grows. EquipmentLoadout assigns. StatAggregator composes. DropTableResolver rolls. GachaPool tracks. GachaPipeline draws. IapCatalog defines. OrderLedger records. IapPurchasePipeline fulfills. RemoteConfigStore stores. FeatureFlagEvaluator gates. ExperimentRegistry assigns. HotfixOverrideStore overrides. LiveOpsSwitchboard resolves. AnalyticsSchemaRegistry validates. SessionTracker tracks. AnalyticsEventQueue buffers. FunnelTracker advances. AnalyticsDispatchPipeline flushes. FriendListStore connects. LeaderboardStore ranks. GuildRosterStore organizes. MailboxStore stores. NotificationInbox notifies. SupportTicketStore serves. PlayerReportInbox receives. ModerationActionLog records. RiskFlagRegistry flags. ComplianceConsentStore records. OfflineCacheStore caches. SyncOperationQueue queues. RetryPolicy delays. PurchaseRecoveryQueue recovers. ServerSyncCoordinator flushes. ServerContractTypes define. ConflictResolutionPolicy decides. SyncSnapshotCodec serializes. SyncSnapshotRepository stores. AuthSessionStore authenticates. AccountBindingStore links. CloudSaveManifest summarizes. CloudSaveMergePolicy chooses. CloudSaveSyncCoordinator synchronizes. AnnouncementBoard announces. EventCalendarStore schedules. DailyCheckInTracker advances. MailRewardDeliveryPipeline grants. EnvironmentSwitchboard switches. CompensationGrantPipeline compensates. AppealCaseStore tracks. OpsCommandQueue dispatches. GmPermissionPolicy authorizes. GrayReleasePolicy rolls out. BattleReplayArchive replays. AntiCheatEvidenceLog proves. CrashRecoverySnapshotStore restores. AnalyticsAuditLedger audits. VersionMigrationPlanner migrates. LocalizationCatalog translates. SensitiveWordFilter filters. GuidedOnboardingFlow guides. TutorialScenarioScript teaches. ExperimentControlPanel overrides. AudioBusRegistry mixes. MotionSequenceTimeline sequences. AccessibilityProfileStore adapts. DevicePerformanceTierPolicy classifies. AssetBundlePartitionPlan partitions. NetworkReconnectCoordinator reconnects. HeartbeatMonitor watches. MatchmakingQueue queues. PvpSettlementConsistencyGuard verifies. BotBackfillPolicy fills. PaymentRiskPolicy scores. BanEnforcementPolicy punishes. SocialRelationshipGraph links. SquadSeasonTracker tracks. MetricsSchemaContract defines. NewUserPurchaseFunnel funnels. RecallCampaignTracker recalls. AdMonetizationExperimentPolicy experiments. UgcModerationQueue moderates. SupportSlaWorkflow times. LevelResultRecorder persists. ProgressionSnapshotCodec serializes. ProgressionSaveRepository stores. MapPointRegistry locates. EnemyFactory creates.

No single class should replace this separation.
