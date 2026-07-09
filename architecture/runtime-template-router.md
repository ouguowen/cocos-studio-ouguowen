# Runtime Template Router

Use this file when a user wants reusable runtime code, config integration, or a subsystem baseline from the template assets and scripts bundled with this skill.

## Config and level runtime entry

- Config schema validation:
  - Run `node scripts/validate-level-config.js <level-data-directory>`
- Runtime-ready JSON export:
  - Run `node scripts/export-level-config.js <level-data-directory> [output-file]`
- Generated config types:
  - Run `node scripts/export-level-types.js [output-file]`
- Config integration baseline:
  - Reuse `assets/cocos-config-runtime-template/ConfigIndex.ts`
  - Reuse `assets/cocos-config-runtime-template/ConfigManager.ts`
- Core level runtime baseline:
  - Reuse `assets/cocos-level-runtime-template/LevelTypes.ts`
  - Reuse `assets/cocos-level-runtime-template/LevelRuntime.ts`
  - Reuse `assets/cocos-level-runtime-template/LevelBuilder.ts`

## Encounter and flow systems

- Reuse `WaveSystem.ts`, `SpawnSystem.ts`, `ObjectiveSystem.ts`
- Reuse `RewardSystem.ts`, `LevelFlowController.ts`, `LevelResultRecorder.ts`
- Reuse `MapPointRegistry.ts`, `MapPointComponent.ts`, `EnemyFactory.ts`, `EnemyActor.ts`
- Reuse `EventBus.ts`, `ObjectPool.ts`, `ResourceLoader.ts`, `ResourceManifest.ts`, `ResourceIds.ts`

## Progression and economy

- Reuse `MetaProgressionStore.ts`, `ProgressionSaveRepository.ts`, `ProgressionSnapshotCodec.ts`
- Reuse `ChapterUnlockPolicy.ts`, `GuideProgressStore.ts`
- Reuse `CurrencyWallet.ts`, `InventoryStore.ts`, `ShopCatalog.ts`, `PurchasePipeline.ts`
- Reuse `QuestTracker.ts`, `ActivityStateStore.ts`

## Character growth and monetization

- Reuse `CharacterRoster.ts`, `EquipmentLoadout.ts`, `StatAggregator.ts`, `DropTableResolver.ts`
- Reuse `GachaPool.ts`, `GachaPipeline.ts`
- Reuse `AdPlacementRegistry.ts`, `RewardedAdPipeline.ts`
- Reuse `IapCatalog.ts`, `OrderLedger.ts`, `IapPurchasePipeline.ts`

## Live ops, analytics, and social

- Reuse `RemoteConfigStore.ts`, `FeatureFlagEvaluator.ts`, `ExperimentRegistry.ts`, `HotfixOverrideStore.ts`, `LiveOpsSwitchboard.ts`
- Reuse `AnalyticsSchemaRegistry.ts`, `SessionTracker.ts`, `AnalyticsEventQueue.ts`, `FunnelTracker.ts`, `AnalyticsDispatchPipeline.ts`
- Reuse `AnnouncementBoard.ts`, `EventCalendarStore.ts`, `DailyCheckInTracker.ts`, `MailRewardDeliveryPipeline.ts`, `EnvironmentSwitchboard.ts`
- Reuse `FriendListStore.ts`, `LeaderboardStore.ts`, `GuildRosterStore.ts`, `MailboxStore.ts`, `NotificationInbox.ts`

## Account, sync, and cloud

- Reuse `OfflineCacheStore.ts`, `SyncOperationQueue.ts`, `RetryPolicy.ts`, `PurchaseRecoveryQueue.ts`, `ServerSyncCoordinator.ts`
- Reuse `ServerContractTypes.ts`, `ConflictResolutionPolicy.ts`, `SyncSnapshotCodec.ts`, `SyncSnapshotRepository.ts`
- Reuse `AuthSessionStore.ts`, `AccountBindingStore.ts`, `CloudSaveManifest.ts`, `CloudSaveMergePolicy.ts`, `CloudSaveSyncCoordinator.ts`

## Moderation, safety, and operations tooling

- Reuse `SupportTicketStore.ts`, `PlayerReportInbox.ts`, `ModerationActionLog.ts`, `RiskFlagRegistry.ts`, `ComplianceConsentStore.ts`
- Reuse `CompensationGrantPipeline.ts`, `AppealCaseStore.ts`, `OpsCommandQueue.ts`, `GmPermissionPolicy.ts`, `GrayReleasePolicy.ts`
- Reuse `BattleReplayArchive.ts`, `AntiCheatEvidenceLog.ts`, `CrashRecoverySnapshotStore.ts`, `AnalyticsAuditLedger.ts`, `VersionMigrationPlanner.ts`

## Presentation, accessibility, and network

- Reuse `LocalizationCatalog.ts`, `SensitiveWordFilter.ts`, `GuidedOnboardingFlow.ts`, `TutorialScenarioScript.ts`, `ExperimentControlPanel.ts`
- Reuse `AudioBusRegistry.ts`, `MotionSequenceTimeline.ts`, `AccessibilityProfileStore.ts`, `DevicePerformanceTierPolicy.ts`, `AssetBundlePartitionPlan.ts`
- Reuse `NetworkReconnectCoordinator.ts`, `HeartbeatMonitor.ts`, `MatchmakingQueue.ts`, `PvpSettlementConsistencyGuard.ts`, `BotBackfillPolicy.ts`

## Business and growth

- Reuse `PaymentRiskPolicy.ts`, `BanEnforcementPolicy.ts`, `SocialRelationshipGraph.ts`, `SquadSeasonTracker.ts`, `MetricsSchemaContract.ts`
- Reuse `NewUserPurchaseFunnel.ts`, `RecallCampaignTracker.ts`, `AdMonetizationExperimentPolicy.ts`, `UgcModerationQueue.ts`, `SupportSlaWorkflow.ts`

## Validation rule

- When any runtime template asset changes, run `node scripts/validate-runtime-template.js`
