# Level System Extensions

Use this file only after the core runtime in [LEVEL_SYSTEM_ARCHITECTURE.md](LEVEL_SYSTEM_ARCHITECTURE.md) is already justified and stable.

Do not import these systems into early prototypes just because large commercial games have them.

## 1. Meta progression and economy

Use when the level result must feed long-term player progression.

- `CurrencyWallet.ts`
- `InventoryStore.ts`
- `QuestTracker.ts`
- `ActivityStateStore.ts`
- `CharacterRoster.ts`
- `EquipmentLoadout.ts`
- `StatAggregator.ts`
- `DropTableResolver.ts`

## 2. Monetization

Use when the game has ad rewards, shop purchases, or draw systems.

- `AdPlacementRegistry.ts`
- `RewardedAdPipeline.ts`
- `ShopCatalog.ts`
- `PurchasePipeline.ts`
- `GachaPool.ts`
- `GachaPipeline.ts`
- `IapCatalog.ts`
- `OrderLedger.ts`
- `IapPurchasePipeline.ts`

## 3. Live ops and feature control

Use when switches, experiments, or hotfixes must change behavior after release.

- `RemoteConfigStore.ts`
- `FeatureFlagEvaluator.ts`
- `ExperimentRegistry.ts`
- `HotfixOverrideStore.ts`
- `LiveOpsSwitchboard.ts`
- `EnvironmentSwitchboard.ts`
- `GrayReleasePolicy.ts`

## 4. Analytics and audit

Use when release, economy, or funnel decisions require stable telemetry contracts.

- `AnalyticsSchemaRegistry.ts`
- `SessionTracker.ts`
- `AnalyticsEventQueue.ts`
- `FunnelTracker.ts`
- `AnalyticsDispatchPipeline.ts`
- `AnalyticsAuditLedger.ts`
- `MetricsSchemaContract.ts`
- `NewUserPurchaseFunnel.ts`
- `RecallCampaignTracker.ts`
- `AdMonetizationExperimentPolicy.ts`

## 5. Social and community

Use when player-to-player state becomes a first-class product system.

- `FriendListStore.ts`
- `LeaderboardStore.ts`
- `GuildRosterStore.ts`
- `MailboxStore.ts`
- `NotificationInbox.ts`
- `SocialRelationshipGraph.ts`
- `SquadSeasonTracker.ts`

## 6. Support, moderation, and compliance

Use when operations staff or policy risk becomes part of the runtime boundary.

- `SupportTicketStore.ts`
- `PlayerReportInbox.ts`
- `ModerationActionLog.ts`
- `RiskFlagRegistry.ts`
- `ComplianceConsentStore.ts`
- `SensitiveWordFilter.ts`
- `SupportSlaWorkflow.ts`
- `UgcModerationQueue.ts`
- `BanEnforcementPolicy.ts`
- `PaymentRiskPolicy.ts`

## 7. Sync, account, and cloud save

Use when progress must survive reconnects, device changes, or offline play.

- `OfflineCacheStore.ts`
- `SyncOperationQueue.ts`
- `RetryPolicy.ts`
- `PurchaseRecoveryQueue.ts`
- `ServerSyncCoordinator.ts`
- `ServerContractTypes.ts`
- `ConflictResolutionPolicy.ts`
- `SyncSnapshotCodec.ts`
- `SyncSnapshotRepository.ts`
- `AuthSessionStore.ts`
- `AccountBindingStore.ts`
- `CloudSaveManifest.ts`
- `CloudSaveMergePolicy.ts`
- `CloudSaveSyncCoordinator.ts`

## 8. Operations and safety tooling

Use when the shipped game needs controlled manual intervention or abuse tracing.

- `AnnouncementBoard.ts`
- `EventCalendarStore.ts`
- `DailyCheckInTracker.ts`
- `MailRewardDeliveryPipeline.ts`
- `CompensationGrantPipeline.ts`
- `AppealCaseStore.ts`
- `OpsCommandQueue.ts`
- `GmPermissionPolicy.ts`
- `BattleReplayArchive.ts`
- `AntiCheatEvidenceLog.ts`
- `CrashRecoverySnapshotStore.ts`
- `VersionMigrationPlanner.ts`

## 9. Advanced experience and platform services

Use when onboarding, accessibility, performance tiering, or online battle state is part of the product promise.

- `LocalizationCatalog.ts`
- `GuidedOnboardingFlow.ts`
- `TutorialScenarioScript.ts`
- `ExperimentControlPanel.ts`
- `AudioBusRegistry.ts`
- `MotionSequenceTimeline.ts`
- `AccessibilityProfileStore.ts`
- `DevicePerformanceTierPolicy.ts`
- `AssetBundlePartitionPlan.ts`
- `NetworkReconnectCoordinator.ts`
- `HeartbeatMonitor.ts`
- `MatchmakingQueue.ts`
- `PvpSettlementConsistencyGuard.ts`
- `BotBackfillPolicy.ts`

## Extension law

- Add extension families only when the current stage, business model, and platform target justify them.
- Assign a named owner before introducing any extension family.
- Keep extension systems outside the core level loop unless they truly change runtime behavior.
- If an extension is only needed for one launch experiment, isolate it behind flags or a service boundary.
