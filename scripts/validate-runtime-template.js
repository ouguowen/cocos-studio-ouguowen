#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const { generateTypesSource } = require("./level-config/typegen");

function main() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "cocos-runtime-template-"));

  try {
    prepareCompilationSandbox(tempDir);
    const compiler = resolveTscCommand();
    const result = runCommand(compiler, ["-p", path.join(tempDir, "tsconfig.json")], {
      encoding: "utf8",
      stdio: "pipe",
    });

    if (result.stdout) {
      process.stdout.write(result.stdout);
    }

    if (result.stderr) {
      process.stderr.write(result.stderr);
    }

    if (result.status !== 0) {
      process.exit(result.status || 1);
    }

    console.log("Runtime template TypeScript validation passed.");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function prepareCompilationSandbox(tempDir) {
  const configDir = path.join(tempDir, "cocos-config-runtime-template");
  const runtimeDir = path.join(tempDir, "cocos-level-runtime-template");
  fs.mkdirSync(configDir, { recursive: true });
  fs.mkdirSync(runtimeDir, { recursive: true });

  const skillRoot = path.resolve(__dirname, "..");
  const configTemplateDir = path.join(skillRoot, "assets", "cocos-config-runtime-template");
  const runtimeTemplateDir = path.join(skillRoot, "assets", "cocos-level-runtime-template");

  fs.writeFileSync(path.join(configDir, "ConfigTypes.ts"), generateTypesSource(), "utf8");
  fs.copyFileSync(
    path.join(configTemplateDir, "ConfigIndex.ts"),
    path.join(configDir, "ConfigIndex.ts")
  );
  fs.copyFileSync(
    path.join(configTemplateDir, "ConfigManager.ts"),
    path.join(configDir, "ConfigManager.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "LevelTypes.ts"),
    path.join(runtimeDir, "LevelTypes.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "LevelRuntime.ts"),
    path.join(runtimeDir, "LevelRuntime.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "LevelBuilder.ts"),
    path.join(runtimeDir, "LevelBuilder.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "WaveSystem.ts"),
    path.join(runtimeDir, "WaveSystem.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "SpawnSystem.ts"),
    path.join(runtimeDir, "SpawnSystem.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ObjectiveSystem.ts"),
    path.join(runtimeDir, "ObjectiveSystem.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "RewardSystem.ts"),
    path.join(runtimeDir, "RewardSystem.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "MetaProgressionStore.ts"),
    path.join(runtimeDir, "MetaProgressionStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "GuideProgressStore.ts"),
    path.join(runtimeDir, "GuideProgressStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ChapterUnlockPolicy.ts"),
    path.join(runtimeDir, "ChapterUnlockPolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "CurrencyWallet.ts"),
    path.join(runtimeDir, "CurrencyWallet.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "InventoryStore.ts"),
    path.join(runtimeDir, "InventoryStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "LevelResultRecorder.ts"),
    path.join(runtimeDir, "LevelResultRecorder.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ProgressionSaveRepository.ts"),
    path.join(runtimeDir, "ProgressionSaveRepository.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ProgressionSnapshotCodec.ts"),
    path.join(runtimeDir, "ProgressionSnapshotCodec.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "RewardGrantPipeline.ts"),
    path.join(runtimeDir, "RewardGrantPipeline.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ShopCatalog.ts"),
    path.join(runtimeDir, "ShopCatalog.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "PurchasePipeline.ts"),
    path.join(runtimeDir, "PurchasePipeline.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "QuestTracker.ts"),
    path.join(runtimeDir, "QuestTracker.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ActivityStateStore.ts"),
    path.join(runtimeDir, "ActivityStateStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AdPlacementRegistry.ts"),
    path.join(runtimeDir, "AdPlacementRegistry.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "CharacterRoster.ts"),
    path.join(runtimeDir, "CharacterRoster.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "EquipmentLoadout.ts"),
    path.join(runtimeDir, "EquipmentLoadout.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "StatAggregator.ts"),
    path.join(runtimeDir, "StatAggregator.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "DropTableResolver.ts"),
    path.join(runtimeDir, "DropTableResolver.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "GachaPool.ts"),
    path.join(runtimeDir, "GachaPool.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "GachaPipeline.ts"),
    path.join(runtimeDir, "GachaPipeline.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "IapCatalog.ts"),
    path.join(runtimeDir, "IapCatalog.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "OrderLedger.ts"),
    path.join(runtimeDir, "OrderLedger.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "IapPurchasePipeline.ts"),
    path.join(runtimeDir, "IapPurchasePipeline.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "RemoteConfigStore.ts"),
    path.join(runtimeDir, "RemoteConfigStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "FeatureFlagEvaluator.ts"),
    path.join(runtimeDir, "FeatureFlagEvaluator.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ExperimentRegistry.ts"),
    path.join(runtimeDir, "ExperimentRegistry.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "HotfixOverrideStore.ts"),
    path.join(runtimeDir, "HotfixOverrideStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "LiveOpsSwitchboard.ts"),
    path.join(runtimeDir, "LiveOpsSwitchboard.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AnalyticsSchemaRegistry.ts"),
    path.join(runtimeDir, "AnalyticsSchemaRegistry.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "SessionTracker.ts"),
    path.join(runtimeDir, "SessionTracker.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AnalyticsEventQueue.ts"),
    path.join(runtimeDir, "AnalyticsEventQueue.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "FunnelTracker.ts"),
    path.join(runtimeDir, "FunnelTracker.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AnalyticsDispatchPipeline.ts"),
    path.join(runtimeDir, "AnalyticsDispatchPipeline.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "FriendListStore.ts"),
    path.join(runtimeDir, "FriendListStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "LeaderboardStore.ts"),
    path.join(runtimeDir, "LeaderboardStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "GuildRosterStore.ts"),
    path.join(runtimeDir, "GuildRosterStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "MailboxStore.ts"),
    path.join(runtimeDir, "MailboxStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "NotificationInbox.ts"),
    path.join(runtimeDir, "NotificationInbox.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "SupportTicketStore.ts"),
    path.join(runtimeDir, "SupportTicketStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "PlayerReportInbox.ts"),
    path.join(runtimeDir, "PlayerReportInbox.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ModerationActionLog.ts"),
    path.join(runtimeDir, "ModerationActionLog.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "RiskFlagRegistry.ts"),
    path.join(runtimeDir, "RiskFlagRegistry.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ComplianceConsentStore.ts"),
    path.join(runtimeDir, "ComplianceConsentStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "OfflineCacheStore.ts"),
    path.join(runtimeDir, "OfflineCacheStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "SyncOperationQueue.ts"),
    path.join(runtimeDir, "SyncOperationQueue.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "RetryPolicy.ts"),
    path.join(runtimeDir, "RetryPolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "PurchaseRecoveryQueue.ts"),
    path.join(runtimeDir, "PurchaseRecoveryQueue.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ServerSyncCoordinator.ts"),
    path.join(runtimeDir, "ServerSyncCoordinator.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ServerContractTypes.ts"),
    path.join(runtimeDir, "ServerContractTypes.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ConflictResolutionPolicy.ts"),
    path.join(runtimeDir, "ConflictResolutionPolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "SyncSnapshotCodec.ts"),
    path.join(runtimeDir, "SyncSnapshotCodec.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "SyncSnapshotRepository.ts"),
    path.join(runtimeDir, "SyncSnapshotRepository.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AuthSessionStore.ts"),
    path.join(runtimeDir, "AuthSessionStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AccountBindingStore.ts"),
    path.join(runtimeDir, "AccountBindingStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "CloudSaveManifest.ts"),
    path.join(runtimeDir, "CloudSaveManifest.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "CloudSaveMergePolicy.ts"),
    path.join(runtimeDir, "CloudSaveMergePolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "CloudSaveSyncCoordinator.ts"),
    path.join(runtimeDir, "CloudSaveSyncCoordinator.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AnnouncementBoard.ts"),
    path.join(runtimeDir, "AnnouncementBoard.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "EventCalendarStore.ts"),
    path.join(runtimeDir, "EventCalendarStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "DailyCheckInTracker.ts"),
    path.join(runtimeDir, "DailyCheckInTracker.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "MailRewardDeliveryPipeline.ts"),
    path.join(runtimeDir, "MailRewardDeliveryPipeline.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "EnvironmentSwitchboard.ts"),
    path.join(runtimeDir, "EnvironmentSwitchboard.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "CompensationGrantPipeline.ts"),
    path.join(runtimeDir, "CompensationGrantPipeline.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AppealCaseStore.ts"),
    path.join(runtimeDir, "AppealCaseStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "OpsCommandQueue.ts"),
    path.join(runtimeDir, "OpsCommandQueue.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "GmPermissionPolicy.ts"),
    path.join(runtimeDir, "GmPermissionPolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "GrayReleasePolicy.ts"),
    path.join(runtimeDir, "GrayReleasePolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "BattleReplayArchive.ts"),
    path.join(runtimeDir, "BattleReplayArchive.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AntiCheatEvidenceLog.ts"),
    path.join(runtimeDir, "AntiCheatEvidenceLog.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "CrashRecoverySnapshotStore.ts"),
    path.join(runtimeDir, "CrashRecoverySnapshotStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AnalyticsAuditLedger.ts"),
    path.join(runtimeDir, "AnalyticsAuditLedger.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "VersionMigrationPlanner.ts"),
    path.join(runtimeDir, "VersionMigrationPlanner.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "LocalizationCatalog.ts"),
    path.join(runtimeDir, "LocalizationCatalog.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "SensitiveWordFilter.ts"),
    path.join(runtimeDir, "SensitiveWordFilter.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "GuidedOnboardingFlow.ts"),
    path.join(runtimeDir, "GuidedOnboardingFlow.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "TutorialScenarioScript.ts"),
    path.join(runtimeDir, "TutorialScenarioScript.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ExperimentControlPanel.ts"),
    path.join(runtimeDir, "ExperimentControlPanel.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AudioBusRegistry.ts"),
    path.join(runtimeDir, "AudioBusRegistry.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "MotionSequenceTimeline.ts"),
    path.join(runtimeDir, "MotionSequenceTimeline.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AccessibilityProfileStore.ts"),
    path.join(runtimeDir, "AccessibilityProfileStore.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "DevicePerformanceTierPolicy.ts"),
    path.join(runtimeDir, "DevicePerformanceTierPolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AssetBundlePartitionPlan.ts"),
    path.join(runtimeDir, "AssetBundlePartitionPlan.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "NetworkReconnectCoordinator.ts"),
    path.join(runtimeDir, "NetworkReconnectCoordinator.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "HeartbeatMonitor.ts"),
    path.join(runtimeDir, "HeartbeatMonitor.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "MatchmakingQueue.ts"),
    path.join(runtimeDir, "MatchmakingQueue.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "PvpSettlementConsistencyGuard.ts"),
    path.join(runtimeDir, "PvpSettlementConsistencyGuard.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "BotBackfillPolicy.ts"),
    path.join(runtimeDir, "BotBackfillPolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "PaymentRiskPolicy.ts"),
    path.join(runtimeDir, "PaymentRiskPolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "BanEnforcementPolicy.ts"),
    path.join(runtimeDir, "BanEnforcementPolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "SocialRelationshipGraph.ts"),
    path.join(runtimeDir, "SocialRelationshipGraph.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "SquadSeasonTracker.ts"),
    path.join(runtimeDir, "SquadSeasonTracker.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "MetricsSchemaContract.ts"),
    path.join(runtimeDir, "MetricsSchemaContract.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "NewUserPurchaseFunnel.ts"),
    path.join(runtimeDir, "NewUserPurchaseFunnel.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "RecallCampaignTracker.ts"),
    path.join(runtimeDir, "RecallCampaignTracker.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "AdMonetizationExperimentPolicy.ts"),
    path.join(runtimeDir, "AdMonetizationExperimentPolicy.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "UgcModerationQueue.ts"),
    path.join(runtimeDir, "UgcModerationQueue.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "SupportSlaWorkflow.ts"),
    path.join(runtimeDir, "SupportSlaWorkflow.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "LevelFlowController.ts"),
    path.join(runtimeDir, "LevelFlowController.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "MapPointRegistry.ts"),
    path.join(runtimeDir, "MapPointRegistry.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "MapPointComponent.ts"),
    path.join(runtimeDir, "MapPointComponent.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "EnemyFactory.ts"),
    path.join(runtimeDir, "EnemyFactory.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "EnemyActor.ts"),
    path.join(runtimeDir, "EnemyActor.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "EventBus.ts"),
    path.join(runtimeDir, "EventBus.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ObjectPool.ts"),
    path.join(runtimeDir, "ObjectPool.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ResourceIds.ts"),
    path.join(runtimeDir, "ResourceIds.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ResourceManifest.ts"),
    path.join(runtimeDir, "ResourceManifest.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "ResourceLoader.ts"),
    path.join(runtimeDir, "ResourceLoader.ts")
  );
  fs.copyFileSync(
    path.join(runtimeTemplateDir, "RewardedAdPipeline.ts"),
    path.join(runtimeDir, "RewardedAdPipeline.ts")
  );

  fs.writeFileSync(
    path.join(tempDir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2020",
          module: "CommonJS",
          strict: true,
          noEmit: true,
          skipLibCheck: true,
        },
        include: ["cocos-config-runtime-template/**/*.ts", "cocos-level-runtime-template/**/*.ts"],
      },
      null,
      2
    ),
    "utf8"
  );
}

function resolveTscCommand() {
  const candidates = process.platform === "win32" ? buildWindowsCandidates() : ["tsc"];
  for (const candidate of candidates) {
    const result = runCommand(candidate, ["-v"], { encoding: "utf8", stdio: "pipe" });
    if (result.status === 0) {
      return candidate;
    }
  }

  throw new Error("TypeScript compiler not found. Install it with `npm.cmd install -g typescript`.");
}

function buildWindowsCandidates() {
  const candidates = ["tsc.cmd", "tsc"];
  const appData = process.env.APPDATA;
  if (appData) {
    candidates.push(path.join(appData, "npm", "tsc.cmd"));
  }
  return candidates;
}

function runCommand(command, args, options) {
  if (process.platform === "win32" && /\.cmd$/i.test(command)) {
    const commandLine = [quoteWindows(command), ...args.map(quoteWindows)].join(" ");
    return spawnSync(commandLine, {
      ...options,
      shell: true,
    });
  }

  return spawnSync(command, args, options);
}

function quoteWindows(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

main();
