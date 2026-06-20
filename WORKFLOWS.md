# Workflows

Use these execution patterns when the skill is active.

## Starting a new Cocos game

1. Identify the production mode. Default to Project Framing Mode if unclear.
2. Identify the stage. Default to Project Framing if unclear.
3. If the mode and stage disagree, resolve the contradiction before giving build advice.
4. Start the framing documents using [TEMPLATES.md](TEMPLATES.md).
5. Define the first-version scope and explicit non-goals.
6. Classify the game first with [GAME_CLASSIFIER_SYSTEM.md](GAME_CLASSIFIER_SYSTEM.md).
7. If the core loop is still abstract, choose the closest baseline in [GAME_TYPE_TEMPLATES.md](GAME_TYPE_TEMPLATES.md).
8. If the first playable scope is still expanding, lock it with [MVP_PROTOTYPE_RULES.md](MVP_PROTOTYPE_RULES.md).
9. If the game is level-based or content-heavy, choose the first level data model using [LEVEL_DATA_MODELS.md](LEVEL_DATA_MODELS.md).
10. Identify the first gameplay prototype target.
11. Refuse to jump straight into broad production without gates.

## Classifying a game

1. Open [GAME_CLASSIFIER_SYSTEM.md](GAME_CLASSIFIER_SYSTEM.md).
2. Classify by dominant repeatable player action, not theme.
3. Name the main content unit and progression structure.
4. Route the project to the right template family and data model.
5. Reject architecture choice before classification is stable.

## Choosing an architecture template

1. Open [ARCHITECTURE_TEMPLATE_SYSTEM.md](ARCHITECTURE_TEMPLATE_SYSTEM.md).
2. Confirm the classified game type first.
3. Pick the lightest template family that protects the real loop.
4. Name what systems are primary and what systems are explicitly delayed.
5. Reject one universal skeleton for all game classes.

## Updating project memory

1. Open [PROJECT_MEMORY_SYSTEM.md](PROJECT_MEMORY_SYSTEM.md).
2. Record confirmed facts, active assumptions, and open questions separately.
3. Update memory after scope, stage, platform, risk, or version decisions.
4. Expire stale assumptions instead of letting them linger as fake truth.
5. Reject memory updates that mix guesses with locked facts.

## Running a formal review

1. Open [REVIEW_SYSTEM.md](REVIEW_SYSTEM.md).
2. Review against stage, ownership, classification, MVP, architecture, release, and operations fit.
3. Report findings first.
4. Separate blockers from follow-up improvements.
5. Do not approve work that still fails a named gate.

## Using a playbook

1. Open [PLAYBOOK_SYSTEM.md](PLAYBOOK_SYSTEM.md).
2. Match the situation to a recurring operating procedure.
3. Name trigger, preconditions, owners, steps, and stop conditions.
4. Prefer playbook execution over improvisation for recurring risky flows.
5. If no playbook exists for a recurring failure pattern, create one.

## Defining the MVP

1. Open [MVP_PROTOTYPE_RULES.md](MVP_PROTOTYPE_RULES.md).
2. Name the one-sentence fantasy and repeated loop first.
3. Name what must be proven before discussing polish or scale.
4. Cut supporting systems until one trustworthy first-version loop remains.
5. Record explicit kill conditions before approving expansion.

## Choosing a game-type template

1. Open [GAME_TYPE_TEMPLATES.md](GAME_TYPE_TEMPLATES.md).
2. Choose by dominant player action, not by visual theme.
3. Name the main content unit and progression structure.
4. Start config and runtime planning only after the closest template is selected.
5. Reject template mismatch early instead of forcing one data model onto every idea.

## Working with AI collaborators

1. Open [AI_COLLAB_RULES.md](AI_COLLAB_RULES.md).
2. Name the stage, human owner, and deliverable before prompting AI.
3. State what AI may decide and what remains human authority.
4. Review every adopted output against scope, ownership, and gate discipline.
5. Reject AI-generated volume that has no accountable reviewer.

## Building the project structure

1. Confirm the current production mode. Structural advice in Prototype Mode should stay lean.
2. Confirm the project is at least in Vertical Slice preparation or earlier planning with architecture authority.
3. Apply [COCOS_RULES.md](COCOS_RULES.md).
4. Apply the baseline blueprint in [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).
5. Name the owner for scene shell, UI framework, config schema, and resource loading.
6. Use the current-stage templates where needed. See [TEMPLATES.md](TEMPLATES.md).
7. Create only the structure justified by the current mode and stage.

## Fixing a messy project

1. Identify the current mode.
2. Identify the current stage.
3. Audit role confusion using [ROLES.md](ROLES.md).
4. Audit asset confusion using [OWNERSHIP.md](OWNERSHIP.md).
5. Audit architecture drift using [COCOS_RULES.md](COCOS_RULES.md).
6. Audit missing gate discipline using [QUALITY_GATES.md](QUALITY_GATES.md).
7. Recommend repairs in this order:
   - ownership clarity
   - architecture containment
   - stage clarity
   - quality gates
   - feature cleanup

## Answering "who should own this?"

1. Find the asset class in [OWNERSHIP.md](OWNERSHIP.md).
2. Name the primary owner, collaborators, and approver.
3. Explain what the owner actually owns.
4. State what should not be changed casually by collaborators.

## Answering "can we ship this?"

1. Confirm Release Hardening Mode or Live Operations and Rescue Mode if the project is live.
2. Identify the current stage and intended build target.
3. Check release-candidate and launch gates in [QUALITY_GATES.md](QUALITY_GATES.md).
4. Run the release and launch checklists in [CHECKLISTS.md](CHECKLISTS.md).
5. Name unresolved blockers explicitly.
6. Do not hide uncertainty behind optimism.

## Producing project artifacts

1. Pick the current mode.
2. Pick the current stage.
3. Open the matching template in [TEMPLATES.md](TEMPLATES.md).
4. Fill owner, scope, gate, and acceptance sections before details.
5. Reject document drafts that skip ownership or exit criteria.

## Writing a PRD

1. Open [PRD_CONSTRAINTS.md](PRD_CONSTRAINTS.md).
2. Name the player problem, business goal, and non-goals first.
3. Name touched systems, assets, config, telemetry, and rollout before polish detail.
4. Refuse PRDs that omit kill or rollback conditions for risky work.

## Breaking work into tasks

1. Open [TASK_DECOMPOSITION_RULES.md](TASK_DECOMPOSITION_RULES.md).
2. Split by ownership and reviewable output, not by arbitrary file count.
3. Keep config, gameplay, UI, analytics, QA, and release work explicit when they differ.
4. Reject task lists that hide cross-discipline work inside one vague ticket.

## Preparing acceptance review

1. Open [ACCEPTANCE_ARTIFACTS.md](ACCEPTANCE_ARTIFACTS.md).
2. Match every acceptance criterion with evidence.
3. Name reviewer, unresolved issues, and accepted risks explicitly.
4. Do not call the work accepted if evidence is missing.

## Planning QA coverage

1. Open [TEST_MATRIX.md](TEST_MATRIX.md).
2. Cover platform, account state, progression state, network, monetization, language, device tier, and upgrade path as applicable.
3. Name deferred coverage explicitly instead of silently skipping it.
4. Do not approve release-risk work with a one-axis test pass.

## Planning release rollback

1. Open [RELEASE_ROLLBACK_PLAYBOOK.md](RELEASE_ROLLBACK_PLAYBOOK.md).
2. Name rollout owner, rollback owner, trigger metrics, and watch window.
3. Record rollback path before the launch decision.
4. Treat missing rollback steps as a release blocker.

## Planning a release pipeline

1. Open [RELEASE_PIPELINE_SYSTEM.md](RELEASE_PIPELINE_SYSTEM.md).
2. Name the build lane before discussing package or hot update details.
3. Record version, build identifier, source snapshot, channel, and dependency assumptions.
4. Separate submission review, rollout decision, and hotfix decision explicitly.
5. Refuse release planning that has no watch owner, no rollback path, or no build provenance.

## Planning platform targets

1. Open [PLATFORM_TARGET_RULES.md](PLATFORM_TARGET_RULES.md).
2. Name the primary launch platform before discussing optimization or SDK decisions.
3. Record what must stay identical across platforms and what may differ.
4. Lock package budget, performance tier, input model, and compliance dependencies per platform.
5. Refuse "export later" thinking when platform constraints already affect scope.

## Reviewing operations and business data

1. Open [OPERATIONS_DATA_SYSTEM.md](OPERATIONS_DATA_SYSTEM.md).
2. Name the stage and the current business hypothesis before reading dashboards.
3. Review retention, monetization, ads, events, and economy as one loop.
4. Separate temporary uplift from healthy long-term behavior.
5. Refuse metric reviews that have no owner or no follow-up action.

## Assigning ownership authority

1. Open [TEAM_SENIORITY_SYSTEM.md](TEAM_SENIORITY_SYSTEM.md).
2. Separate role name from capability level before assigning ownership.
3. Check whether the work requires Support Contributor, Independent Implementer, Senior Owner, Lead Reviewer, or Director Approver authority.
4. Refuse to assign core architecture, release, economy, config-law, or live-ops ownership below Senior Owner level.
5. Record reviewer and escalation path when the executor is not the final authority.

## Running a handoff

1. Open [COLLAB_HANDOFF_SYSTEM.md](COLLAB_HANDOFF_SYSTEM.md).
2. Name the source owner, receiving owner, review owner, and approver if needed.
3. Record exactly what artifacts are included and excluded.
4. Record dependency assumptions, integration steps, and validation evidence.
5. Reject handoffs that dump unresolved work downstream without explicit agreement.

## Planning the version roadmap

1. Open [VERSION_ROADMAP_SYSTEM.md](VERSION_ROADMAP_SYSTEM.md).
2. Name the current milestone and next milestone explicitly.
3. State why the current milestone exists before listing features.
4. Define proof obligation, out-of-scope items, and promotion conditions.
5. Reject roadmap steps that do not prove anything new.

## Escalating project risk

1. Open [RISK_ESCALATION_SYSTEM.md](RISK_ESCALATION_SYSTEM.md).
2. Name the risk class and severity before arguing about optimism.
3. Name affected systems, owner, and escalation authority.
4. Decide whether the response is mitigate, narrow scope, delay, accept explicitly, or stop.
5. Refuse to let critical risk continue as an unwritten background assumption.

## Tracking technical debt

1. Open [TECH_DEBT_REGISTER.md](TECH_DEBT_REGISTER.md).
2. Name owner, impact, and repayment trigger before discussing cleanup order.
3. Separate real debt from taste-based preferences.
4. Refuse debt discussions that produce no owner or exit condition.

## Running a postmortem

1. Open [INCIDENT_POSTMORTEM_TEMPLATE.md](INCIDENT_POSTMORTEM_TEMPLATE.md).
2. Record the actual timeline before root-cause interpretation.
3. Name why safeguards failed, not just what failed.
4. End with action owners and due dates, not just lessons learned.

## Budgeting scope

1. Open [COST_BUDGET_MODEL.md](COST_BUDGET_MODEL.md).
2. Split cost by bucket before making scope promises.
3. Name cuttable scope and escalation triggers early.
4. Reject budgets that hide outsourcing or live-ops cost.

## Managing outsourcing

1. Open [OUTSOURCING_COLLAB_RULES.md](OUTSOURCING_COLLAB_RULES.md).
2. Name delivery owner, review owner, and integration owner separately.
3. Lock format and naming rules before work starts.
4. Reject outsourced work that arrives with no acceptance criteria.

## Tracking milestone burn

1. Open [MILESTONE_BURNDOWN_RULES.md](MILESTONE_BURNDOWN_RULES.md).
2. Track committed, completed, blocked, added, and removed scope explicitly.
3. Name burn risks and delivery probability honestly.
4. Call out scope growth directly when the milestone is not converging.

## Designing level data

1. Confirm Content Production Mode unless the request is still an experiment.
2. Identify the gameplay family before naming tables.
3. Select the closest level data model in [LEVEL_DATA_MODELS.md](LEVEL_DATA_MODELS.md).
4. If the selected model uses spreadsheet-style level data, start from [LEVEL_CONFIG_SCHEMAS.md](LEVEL_CONFIG_SCHEMAS.md).
5. Decide whether content is fixed-authored, template-authored, pool-generated, or runtime-procedural.
6. Define table ownership before field design.
7. Define validation rules before production-scale content entry.
8. Avoid forcing wave-spawn CSVs onto puzzle, quest, exploration, or narrative-heavy designs.

## Validating level config tables

1. Confirm the request fits the common wave-spawn or stage-based model in [LEVEL_CONFIG_SCHEMAS.md](LEVEL_CONFIG_SCHEMAS.md).
2. Run `node scripts/validate-level-config.js <level-data-directory>`.
3. Report errors first, grouped by owner when useful.
4. Separate schema errors, reference errors, and production-risk warnings.
5. If the validator passes, still review whether the chosen data model is correct.

## Exporting runtime level JSON

1. Confirm the request fits the common wave-spawn or stage-based model in [LEVEL_CONFIG_SCHEMAS.md](LEVEL_CONFIG_SCHEMAS.md).
2. Run `node scripts/export-level-config.js <level-data-directory> [output-file]`.
3. If validation fails, stop and fix the source tables first.
4. Treat the exported JSON as generated runtime data, not as the new authoring source.

## Generating TypeScript config types

1. Confirm the request fits the common wave-spawn or stage-based model in [LEVEL_CONFIG_SCHEMAS.md](LEVEL_CONFIG_SCHEMAS.md).
2. Run `node scripts/export-level-types.js [output-file]`.
3. Place the generated file as `assets/scripts/data/config/ConfigTypes.ts` or the project's chosen generated-types location.
4. Keep the generated file readonly in team practice. Regenerate it when the schema changes.

## Wiring ConfigManager into Cocos

1. Generate `ConfigTypes.ts` first with `node scripts/export-level-types.js`.
2. Export normalized JSON with `node scripts/export-level-config.js <level-data-directory> [output-file]`.
3. Reuse `assets/cocos-config-runtime-template/ConfigIndex.ts` and `ConfigManager.ts` as the project baseline.
4. Keep `ConfigManager` read-only and do not let it start levels, spawn enemies, or own UI logic.

## Wiring LevelRuntime into Cocos

1. Generate `ConfigTypes.ts` and export normalized JSON first.
2. Reuse `assets/cocos-level-runtime-template/LevelTypes.ts`, `LevelRuntime.ts`, and `LevelBuilder.ts` as the gameplay baseline.
3. Keep `LevelBuilder` focused on config assembly only.
4. Keep `LevelRuntime` as mutable run state, not as a UI owner or scene manager.
5. Validate the template package with `node scripts/validate-runtime-template.js` after runtime-template changes.
6. Reuse `WaveSystem.ts`, `SpawnSystem.ts`, and `ObjectiveSystem.ts` from the same template package before inventing one-off level systems.
7. Reuse `RewardSystem.ts` and `LevelFlowController.ts` before writing custom top-level level orchestration.
8. Reuse `MapPointRegistry.ts`, `MapPointComponent.ts`, and `EnemyFactory.ts` before wiring scene points or enemy creation directly into unrelated classes.
9. Reuse `EnemyActor.ts`, `ResourceIds.ts`, and `ResourceManifest.ts` before scattering enemy lifecycle rules or raw prefab paths across gameplay code.
10. Reuse `EventBus.ts`, `ObjectPool.ts`, and `ResourceLoader.ts` before inventing ad hoc global event hubs, manual prefab caches, or duplicated loader utilities.
11. Reuse `MetaProgressionStore.ts`, `LevelResultRecorder.ts`, and `RewardGrantPipeline.ts` before mixing level settlement, reward payout, and save-data mutation inside UI or `LevelFlowController`.
12. Reuse `ProgressionSaveRepository.ts`, `ProgressionSnapshotCodec.ts`, `ChapterUnlockPolicy.ts`, and `GuideProgressStore.ts` before writing one-off save logic or hard-coding unlock conditions inside menu pages.
13. Reuse `CurrencyWallet.ts`, `InventoryStore.ts`, `ShopCatalog.ts`, `PurchasePipeline.ts`, `QuestTracker.ts`, and `ActivityStateStore.ts` before scattering shop logic, quest progress, or live-event claims across UI callbacks.
14. Reuse `CharacterRoster.ts`, `EquipmentLoadout.ts`, `StatAggregator.ts`, `DropTableResolver.ts`, `GachaPool.ts`, and `GachaPipeline.ts` before hard-coding battle power, loot logic, or draw rules inside panels or controllers.
15. Reuse `AdPlacementRegistry.ts`, `RewardedAdPipeline.ts`, `IapCatalog.ts`, `OrderLedger.ts`, and `IapPurchasePipeline.ts` before mixing ad reward cooldowns, order state, and purchase fulfillment into page scripts.
16. Reuse `RemoteConfigStore.ts`, `FeatureFlagEvaluator.ts`, `ExperimentRegistry.ts`, `HotfixOverrideStore.ts`, and `LiveOpsSwitchboard.ts` before hard-coding live switches, AB variants, or emergency overrides in scattered modules.
17. Reuse `AnalyticsSchemaRegistry.ts`, `SessionTracker.ts`, `AnalyticsEventQueue.ts`, `FunnelTracker.ts`, and `AnalyticsDispatchPipeline.ts` before scattering analytics event names, queue logic, or funnel state across unrelated systems.
18. Reuse `FriendListStore.ts`, `LeaderboardStore.ts`, `GuildRosterStore.ts`, `MailboxStore.ts`, and `NotificationInbox.ts` before mixing social state, rank data, and inbox logic into UI pages or temporary caches.
19. Reuse `SupportTicketStore.ts`, `PlayerReportInbox.ts`, `ModerationActionLog.ts`, `RiskFlagRegistry.ts`, and `ComplianceConsentStore.ts` before mixing support state, moderation decisions, or consent records into chat panels or ad hoc admin pages.
20. Reuse `OfflineCacheStore.ts`, `SyncOperationQueue.ts`, `RetryPolicy.ts`, `PurchaseRecoveryQueue.ts`, and `ServerSyncCoordinator.ts` before scattering offline fallback, retry logic, or purchase-recovery flow across unrelated modules.
21. Reuse `ServerContractTypes.ts`, `ConflictResolutionPolicy.ts`, `SyncSnapshotCodec.ts`, and `SyncSnapshotRepository.ts` before hard-coding protocol fields, local sync-save JSON, or conflict decisions in scattered feature code.
22. Reuse `AuthSessionStore.ts`, `AccountBindingStore.ts`, `CloudSaveManifest.ts`, `CloudSaveMergePolicy.ts`, and `CloudSaveSyncCoordinator.ts` before mixing login state, account-link status, or cross-device save decisions into launch pages and popup callbacks.
23. Reuse `AnnouncementBoard.ts`, `EventCalendarStore.ts`, `DailyCheckInTracker.ts`, `MailRewardDeliveryPipeline.ts`, and `EnvironmentSwitchboard.ts` before mixing notice visibility, event timing, sign-in claims, mail payout, or environment toggles into page-specific scripts.
24. Reuse `CompensationGrantPipeline.ts`, `AppealCaseStore.ts`, `OpsCommandQueue.ts`, `GmPermissionPolicy.ts`, and `GrayReleasePolicy.ts` before mixing compensation payout, appeal handling, backend command authority, or rollout rules into ad hoc admin pages and temporary debug code.
25. Reuse `BattleReplayArchive.ts`, `AntiCheatEvidenceLog.ts`, `CrashRecoverySnapshotStore.ts`, `AnalyticsAuditLedger.ts`, and `VersionMigrationPlanner.ts` before scattering replay data, cheat evidence, crash-state recovery, analytics acknowledgement, or save-schema upgrade rules across unrelated systems.
26. Reuse `LocalizationCatalog.ts`, `SensitiveWordFilter.ts`, `GuidedOnboardingFlow.ts`, `TutorialScenarioScript.ts`, and `ExperimentControlPanel.ts` before scattering translated copy, chat moderation, tutorial step order, scripted teaching actions, or experiment overrides across page-specific code.
27. Reuse `AudioBusRegistry.ts`, `MotionSequenceTimeline.ts`, `AccessibilityProfileStore.ts`, `DevicePerformanceTierPolicy.ts`, and `AssetBundlePartitionPlan.ts` before hard-coding volume groups, motion timing, accessibility flags, device quality switches, or resource bundle layout inside unrelated presentation scripts.
28. Reuse `NetworkReconnectCoordinator.ts`, `HeartbeatMonitor.ts`, `MatchmakingQueue.ts`, `PvpSettlementConsistencyGuard.ts`, and `BotBackfillPolicy.ts` before scattering reconnect loops, liveness checks, queue state, PVP result comparison, or bot fill rules across network pages and battle controllers.
29. Reuse `PaymentRiskPolicy.ts`, `BanEnforcementPolicy.ts`, `SocialRelationshipGraph.ts`, `SquadSeasonTracker.ts`, and `MetricsSchemaContract.ts` before mixing payment decisions, punishment rules, social-edge ownership, season progression, or warehouse metric definitions into scattered product, admin, or analytics code.
30. Reuse `NewUserPurchaseFunnel.ts`, `RecallCampaignTracker.ts`, `AdMonetizationExperimentPolicy.ts`, `UgcModerationQueue.ts`, and `SupportSlaWorkflow.ts` before mixing funnel stages, recall windows, ad experiment assignments, content-review queues, or support response timing into unrelated growth or operations code.

## Implementing the level runtime

1. Choose the level data model first. See [LEVEL_DATA_MODELS.md](LEVEL_DATA_MODELS.md).
2. Apply the runtime boundaries in [LEVEL_SYSTEM_ARCHITECTURE.md](LEVEL_SYSTEM_ARCHITECTURE.md).
3. Keep config, runtime state, result data, managers, systems, and factories separate.
4. Use ordinary TypeScript classes unless the object truly needs Cocos node lifecycle.
5. Reject designs where one `LevelManager` owns the whole level stack.

## Running operational reviews

1. Select the current mode.
2. Select the current stage.
3. Open the matching checklist in [CHECKLISTS.md](CHECKLISTS.md).
4. Mark any unanswered item as unresolved risk, not as pass.
5. Escalate blockers before allowing the next stage or release decision.

## Solo studio mode

- Treat one person as many roles with explicit hat switching.
- Before each task, identify the current hat:
  - Producer
  - Lead Designer
  - Technical Director
  - Lead Programmer
  - Gameplay Programmer
  - UI Programmer
  - Art Director
  - Animation Lead
  - Technical Artist
  - Level Designer
  - QA Lead
  - Release / Operations Lead
- Do not let one hat silently bypass another hat's gate.
