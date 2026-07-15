#!/usr/bin/env python3
"""Validate Cocos Studio Ouguowen Skill documentation.

This script intentionally uses only the Python standard library so it can run
in GitHub Actions without extra dependency installation.
"""

from __future__ import annotations

import os
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[1]

ALLOWED_ROOT_FILES = {
    ".gitignore",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "LICENSE",
    "package.json",
    "pnpm-lock.yaml",
    "README.md",
    "README.zh-CN.md",
    "SECURITY.md",
    "SKILL.md",
}

REQUIRED_FILES = [
    "README.md",
    "README.zh-CN.md",
    "SKILL.md",
    "core/commands.md",
    "core/module-index.md",
    "protocols/quality-gates.md",
    "package.json",
    "docs/structure/repository-structure-plan.md",
    "core/context-loading-policy.md",
    "core/context-summary.md",
    "core/operation-modes.md",
    "core/evolution-system.md",
    "architecture/map-space-model.md",
    "architecture/map-model-router.md",
    "architecture/minimap-navigation-model.md",
    "templates/map-design-template.md",
    "templates/evolution-proposal-template.md",
    "design/ui-character-action-linkage.md",
    "design/character-system.md",
    "design/ui-system-model.md",
    "design/character-animation-model.md",
    "design/asset-semantic-model.md",
    "design/asset-policy.md",
    "CHANGELOG.md",
    "LICENSE",
    "CONTRIBUTING.md",
    "SECURITY.md",
    "production/first-mvp-success-pipeline.md",
    "protocols/write-approval.md",
    "protocols/cocos-dev-story-prewrite.md",
    "protocols/cocos-generated-meta.md",
    "templates/reports/mvp-acceptance.md",
    "docs/success-cases/moonlight-delivery.md",
    "docs/quickstart/general.md",
    "docs/quickstart/first-mvp.md",
    "docs/open-source/roadmap.md",
    "docs/open-source/project-roadmap.md",
    "docs/open-source/v1.0-skill-definition.md",
    "docs/examples/general.md",
    "docs/archive/update-manifest-v0.2.0.md",
    "docs/archive/readme-agent-workflow-section.md",
    "docs/validation/automation.md",
    "docs/release/strategy.md",
    "docs/release/checklist.md",
    "scripts/check-generated-artifacts.js",
    ".github/ISSUE_TEMPLATE/bug_report.yml",
    ".github/ISSUE_TEMPLATE/feature_request.yml",
    ".github/ISSUE_TEMPLATE/safety_report.yml",
    ".github/ISSUE_TEMPLATE/documentation.yml",
    ".github/ISSUE_TEMPLATE/config.yml",
    ".github/pull_request_template.md",
    "examples/moonlight-delivery/README.md",
]

CONTENT_CHECKS = {
    "README.md": [
        "Cocos Creator 3.8.8",
        "production-control Skill",
        "Developer Experience / Operation Modes",
        "Fast Build Mode",
        "Safe Gate Mode",
        "Audit Mode",
        "production/first-mvp-success-pipeline.md",
        "protocols/write-approval.md",
        "protocols/cocos-dev-story-prewrite.md",
        "protocols/cocos-generated-meta.md",
        "docs/success-cases/moonlight-delivery.md",
        "cocos-dev-story-prewrite",
        "FIRST_MVP_ACCEPTED",
        "docs/release/strategy.md",
        "docs/release/checklist.md",
        ".github/ISSUE_TEMPLATE/bug_report.yml",
        ".github/pull_request_template.md",
    ],
    "README.zh-CN.md": [
        "Cocos Creator 3.8.8",
        "不是单一游戏模板",
        "不是某个 MCP 插件",
        "Pre-write Approval",
        "Preview Visibility Gate",
        "FIRST_MVP_ACCEPTED",
        "Moonlight Delivery",
        "Use $cocos-studio-ouguowen",
        "docs/release/strategy.md",
        "docs/release/checklist.md",
    ],
    "core/commands.md": [
        "cocos-fast-build",
        "cocos-safe-gate",
        "cocos-audit-mode",
        "cocos-asset-policy",
        "cocos-first-implementation-story",
        "cocos-dev-story-prewrite",
        "cocos-dev-story",
        "cocos-qa-review",
        "cocos-release-review",
        "READY_FOR_IMPLEMENTATION",
        "PRE_WRITE_APPROVAL_REQUIRED",
        "QA_PASS",
        "FIRST_MVP_ACCEPTED",
        "cocos-character-system-design",
        "cocos-ui-character-linkage",
        "cocos-map-model",
        "cocos-map-space-design",
        "cocos-minimap-navigation",
        "cocos-skill-evolution",
        "cocos-evolution-proposal",
        "cocos-evolution-review",
    ],
    "package.json": [
        "check:generated",
        "scripts/check-generated-artifacts.js",
    ],
    "SKILL.md": [
        "core/context-loading-policy.md",
        "core/context-summary.md",
        "core/operation-modes.md",
        "FAST_CONTEXT",
        "GATE_CONTEXT",
        "AUDIT_CONTEXT",
        "Do not load the full Skill repository by default",
        "Fast Build Mode",
        "Safe Gate Mode",
        "Audit Mode",
        "production/first-mvp-success-pipeline.md",
        "protocols/write-approval.md",
        "protocols/cocos-dev-story-prewrite.md",
        "protocols/cocos-generated-meta.md",
        "Preview Visibility Gate",
        "protocols/runtime-proof.md",
        "design/ui-character-action-linkage.md",
        "design/character-system.md",
        "design/ui-system-model.md",
        "design/character-animation-model.md",
        "design/asset-semantic-model.md",
        "Do not implement UI-character-action linkage before the first implementation story and production readiness approve the scope",
        "map-model-router.md",
        "map-space-model.md",
        "minimap-navigation-model.md",
        "Do not assume one map model fits every game",
        "Do not add minimap by default",
        "Do not treat background art as the full map system",
        "core/evolution-system.md",
        "Do not evolve Skill from theoretical completeness alone",
        "Do not allow automatic self-evolution",
    ],
    "core/module-index.md": [
        "core/context-loading-policy.md",
        "core/context-summary.md",
        "docs/structure/repository-structure-plan.md",
        "core/operation-modes.md",
        "CONTRIBUTING.md",
        "SECURITY.md",
        "docs/quickstart/general.md",
        "docs/quickstart/first-mvp.md",
        "docs/open-source/roadmap.md",
        "docs/open-source/project-roadmap.md",
        "docs/examples/general.md",
        "docs/archive/update-manifest-v0.2.0.md",
        "docs/archive/readme-agent-workflow-section.md",
        "docs/validation/automation.md",
        "docs/release/strategy.md",
        "docs/release/checklist.md",
        ".github/ISSUE_TEMPLATE/bug_report.yml",
        ".github/ISSUE_TEMPLATE/feature_request.yml",
        ".github/ISSUE_TEMPLATE/safety_report.yml",
        ".github/ISSUE_TEMPLATE/documentation.yml",
        ".github/ISSUE_TEMPLATE/config.yml",
        ".github/pull_request_template.md",
        "examples/moonlight-delivery/README.md",
        "production/first-mvp-success-pipeline.md",
        "protocols/cocos-dev-story-prewrite.md",
        "protocols/cocos-generated-meta.md",
        "templates/reports/mvp-acceptance.md",
        "docs/success-cases/moonlight-delivery.md",
        "design/ui-character-action-linkage.md",
        "design/character-system.md",
        "design/ui-system-model.md",
        "design/character-animation-model.md",
        "design/asset-semantic-model.md",
        "architecture/map-space-model.md",
        "architecture/map-model-router.md",
        "architecture/minimap-navigation-model.md",
        "templates/map-design-template.md",
        "core/evolution-system.md",
        "templates/evolution-proposal-template.md",
    ],
    "design/ui-character-action-linkage.md": [
        "UI Input",
        "Behavior Request",
        "Character Intent",
        "Action State",
        "Animation State",
        "Visual Output",
        "UI Feedback",
        "UI does not own gameplay truth",
        "Animation only represents state",
        "Skeleton only displays animation",
        "controller owns final state",
        "Forbidden linkage patterns",
    ],
    "design/character-system.md": [
        "Character identity",
        "Character behavior",
        "Character action state",
        "Animation state",
        "Skeleton boundary",
        "Asset binding boundary",
        "design/ui-character-action-linkage.md",
    ],
    "design/ui-system-model.md": [
        "UI input is a request",
        "must not own gameplay truth",
        "design/ui-character-action-linkage.md",
    ],
    "design/character-animation-model.md": [
        "Animation state is downstream",
        "must not own gameplay result",
        "design/ui-character-action-linkage.md",
        "design/character-system.md",
    ],
    "design/asset-semantic-model.md": [
        "Assets do not create behavior",
        "must not introduce gameplay systems",
        "controller-owned behavior",
    ],
    "design/asset-policy.md": [
        "Assets do not create behavior",
        "Assets must not own gameplay truth",
        "Placeholder assets",
        "External assets",
        "Generated assets",
        "source",
        "license",
        "owner",
        "approver",
        "protocols/cocos-generated-meta.md",
        "ASSET_APPROVAL_REQUIRED",
        "ASSET_SCOPE_BLOCKED",
    ],
    "core/operation-modes.md": [
        "Fast Build Mode",
        "Safe Gate Mode",
        "Audit Mode",
        "Interruption budget",
        "Stop conditions",
        "Validation cadence",
        "Reporting style",
        "Do not use Audit Mode as the default",
        "normal game development",
        "STOP_FOR_APPROVAL",
        "CONTINUE_AUTOMATICALLY",
    ],
    "core/context-loading-policy.md": [
        "Fast Build Mode context budget",
        "Safe Gate Mode context budget",
        "Audit Mode context budget",
        "Trigger-based loading",
        "Forbidden default behavior",
        "FAST_CONTEXT",
        "GATE_CONTEXT",
        "AUDIT_CONTEXT",
        "CONTEXT_OVERLOAD",
        "REDUCE_CONTEXT",
    ],
    "docs/structure/repository-structure-plan.md": [
        "Only root entry files remain canonical",
        "Do not add new root-level support documents",
        "Target directory model",
        "core/",
        "protocols/",
        "production/",
        "design/",
        "architecture/",
        "templates/",
        "Phase 0: Index-first stabilization",
        "Migration batch rules",
        "python scripts/validate_skill_docs.py",
        "npm run check",
        "no game project files are modified",
    ],
    "core/context-summary.md": [
        "lightweight first-read memory",
        "core/context-loading-policy.md",
        "core/operation-modes.md",
        "Do not load the whole repository",
        "Fast Build Mode",
        "Stop conditions",
        "Context anti-patterns",
        "Map work should route through universal map model selection first",
        "Maps are not only background art",
        "Map model must be selected by game type and gameplay space",
        "Skill evolution is controlled and evidence-driven",
        "Do not upgrade Skill just because a new rule is theoretically possible",
        "core/evolution-system.md",
    ],
    "core/evolution-system.md": [
        "The Skill should evolve from repeated real development evidence",
        "Evolution is not automatic self-modification",
        "E0",
        "E1",
        "E2",
        "E3",
        "E4",
        "E5",
        "Context impact check",
        "Fast Build impact check",
        "Repository structure impact check",
        "Rollback requirement",
        "EVOLUTION_BLOCKED_BY_CONTEXT_COST",
        "EVOLUTION_BLOCKED_BY_FAST_BUILD_IMPACT",
        "EVOLUTION_BLOCKED_BY_STRUCTURE_RULE",
    ],
    "templates/evolution-proposal-template.md": [
        "Skill Evolution Proposal",
        "Problem",
        "Evidence",
        "Repeated Or One-Off",
        "Context Impact",
        "Fast Build Impact",
        "Repository Structure Impact",
        "Validation Plan",
        "Rollback Plan",
        "Decision",
        "Approval",
    ],
    "architecture/map-space-model.md": [
        "There is no universal map layout",
        "Viewport",
        "World Space",
        "Camera Window",
        "Playable Area",
        "Safe UI Area",
        "Map Layer",
        "Collision Layer",
        "Interaction Zone",
        "Spawn Point",
        "Objective Point",
        "Trigger Zone",
        "MiniMap Projection",
        "Runtime Map Binding",
        "Cocos Creator 3.8.8",
    ],
    "architecture/map-model-router.md": [
        "Fixed Screen Map",
        "Scrolling Stage Map",
        "Path / Lane Map",
        "Grid / Tile Map",
        "Room-Based Map",
        "Region / Area Map",
        "Node Graph Map",
        "World Map",
        "Narrative Scene Map",
        "Endless Chunk Map",
        "Use one primary map model",
        "Do not mix three or four map models",
    ],
    "architecture/minimap-navigation-model.md": [
        "When minimap is needed",
        "When minimap is not needed",
        "Static MiniMap",
        "Dynamic MiniMap",
        "Region MiniMap",
        "Room MiniMap",
        "Node Graph MiniMap",
        "Route MiniMap",
        "Grid MiniMap",
        "Compass / Arrow Hint",
        "Fog of War",
        "Map Reveal",
        "Objective Marker",
        "Player Marker",
    ],
    "CONTRIBUTING.md": [
        ".github/ISSUE_TEMPLATE/bug_report.yml",
        ".github/ISSUE_TEMPLATE/feature_request.yml",
        ".github/ISSUE_TEMPLATE/safety_report.yml",
        ".github/ISSUE_TEMPLATE/documentation.yml",
        ".github/pull_request_template.md",
        "docs/release/strategy.md",
        "docs/release/checklist.md",
    ],
    "docs/validation/automation.md": [
        ".github/ISSUE_TEMPLATE/bug_report.yml",
        ".github/ISSUE_TEMPLATE/feature_request.yml",
        ".github/ISSUE_TEMPLATE/safety_report.yml",
        ".github/ISSUE_TEMPLATE/documentation.yml",
        ".github/ISSUE_TEMPLATE/config.yml",
        ".github/pull_request_template.md",
        "docs/release/strategy.md",
        "docs/release/checklist.md",
        "design/ui-character-action-linkage.md",
        "design/character-system.md",
        "core/operation-modes.md",
        "Fast Build Mode",
        "Safe Gate Mode",
        "Audit Mode",
        "ownership rules",
        "controlled Skill evolution governance",
        "anti-automatic-self-evolution",
    ],
    "protocols/quality-gates.md": [
        "Skill Evolution Gate",
        "EVOLUTION_READY",
        "EVOLUTION_NOT_READY",
        "EVOLUTION_CONTEXT_TOO_HEAVY",
        "EVOLUTION_FAST_BUILD_REGRESSION",
    ],
    "protocols/skill-self-test-modes.md": [
        "Evolution Governance Self-Test",
    ],
    "protocols/skill-extended-safety-test-cases.md": [
        "Evolution Test 01",
        "Evolution Test 02",
        "Evolution Test 03",
        "Evolution Test 04",
        "Evolution Test 05",
        "EVOLUTION_BLOCKED_BY_FAST_BUILD_IMPACT",
        "EVOLUTION_BLOCKED_BY_CONTEXT_COST",
    ],
    "docs/release/strategy.md": [
        "python scripts/validate_skill_docs.py",
        "checklist.md",
        "CHANGELOG.md",
        "Cocos `.scene`, `.prefab`, `.anim`, `.meta`",
        "pre-write approval",
        "browser proof",
    ],
    "docs/release/checklist.md": [
        "Bug report issue template",
        "Feature request issue template",
        "Safety report issue template",
        "Documentation issue template",
        "Pull request template",
        "python scripts/validate_skill_docs.py",
    ],
    "docs/quickstart/general.md": [
        "Restart Codex after copying or updating the skill",
        "Use $cocos-studio-ouguowen",
        "optional Cocos automation tool/MCP provider",
        "selected game type",
        "provider proof",
    ],
    "docs/open-source/project-roadmap.md": [
        "AI Game Studio",
        "Current stable direction",
        "Current capabilities",
        "v0.3.0-alpha",
        "provider-neutral Cocos automation execution policy",
    ],
    "docs/open-source/v1.0-skill-definition.md": [
        "## Endpoint",
        "v1.0 is the point",
        "AI Game Studio operating system",
        "Codex + Cocos Creator 3.8.8",
        "It is not:",
        "a complete game",
        "a single game template",
        "Cocos Creator manual",
        "default MCP automation tool",
        "lightweight by default",
        "Do not open Cocos Creator by default",
        "Do not call Cocos MCP by default",
        "Do not inspect real Cocos project files by default",
        "next recommended command",
        "optional advice only",
        "Stop proof-chain work after each approved proof slice",
        "Cleanup Decision Rules",
        "Never Optimize Away",
        "safety",
        "pre-write approval",
        "runtime proof honesty",
        "rollback discipline",
        "v1.0 is not complete yet",
    ],
    "docs/examples/general.md": [
        "Use these examples",
        "Solo studio starting a new Cocos project",
        "Our Cocos project is getting messy",
        "Building a vertical slice correctly",
        "Do not",
    ],
    "docs/archive/update-manifest-v0.2.0.md": [
        "Cocos AI Game Studio Update v0.2.0",
        "Additive files",
        "Intended result",
        "Safe application rule",
    ],
    "docs/archive/readme-agent-workflow-section.md": [
        "README section to paste",
        "AI Game Studio Mode",
        "Main commands",
        "Main Agents",
        "Beginner start",
    ],
    ".github/pull_request_template.md": [
        "I did not modify a live Cocos game project",
        "python scripts/validate_skill_docs.py",
        "git diff --name-only",
        "Changelog updated",
    ],
    ".github/ISSUE_TEMPLATE/config.yml": [
        "blank_issues_enabled: false",
        "https://github.com/ouguowen/cocos-studio-ouguowen/blob/main/SECURITY.md",
        "https://github.com/ouguowen/cocos-studio-ouguowen/blob/main/CONTRIBUTING.md",
        "https://github.com/ouguowen/cocos-studio-ouguowen/blob/main/docs/quickstart/first-mvp.md",
    ],
    "protocols/skill-test-cases.md": [
        "FAST_CONTEXT",
        "GATE_CONTEXT",
        "AUDIT_CONTEXT",
        "CONTEXT_OVERLOAD",
        "REDUCE_CONTEXT",
        "Do not load all gates",
        "Do not load the whole repository",
        "Context Loading Behavior",
    ],
    "scripts/check-generated-artifacts.js": [
        "mkdtempSync",
        "os.tmpdir",
        "scripts/export-level-config.js",
        "scripts/export-level-types.js",
        "Generated artifact check passed without writing repository outputs.",
        "rmSync",
    ],
}

SAFETY_CHECKS = {
    "protocols/cocos-dev-story-prewrite.md": [
        "PRE_WRITE_APPROVAL_REQUIRED",
        "Before explicit user confirmation",
        "must not",
        "modify `.meta`",
        "commit",
        "push",
        "Fast Build Mode",
        "do not stop after every",
    ],
    "protocols/cocos-generated-meta.md": [
        "assets/scenes.meta",
        "unapproved `.meta`",
        "stop and report",
        "user must explicitly confirm",
        "must not raw text edit `.scene`, `.prefab`, or `.meta`",
    ],
    "protocols/runtime-proof.md": [
        "browser preview",
        "Preview Visibility Gate",
        "summarized once",
        "Fast Build Mode",
    ],
    "protocols/write-approval.md": [
        "generated `.meta`",
        "approve a scope",
        "without repeated confirmation",
    ],
    "protocols/quality-gates.md": [
        "Pre-write Approval Gate",
        "Cocos Generated Meta Gate",
        "QA Review Gate",
        "First MVP Acceptance Gate",
        "UI-Character Linkage Gate",
        "Developer Experience Gate",
        "Interruption Budget Gate",
    ],
    "design/asset-policy.md": [
        "Assets must not own gameplay truth",
        "External assets require source, license, owner, approver, and import scope",
        "Do not import external assets when ownership, license, or approval is unclear",
        "Cocos `.scene`, `.prefab`, `.anim`, and `.meta` files must not be raw text edited",
        "Generated assets do not bypass approval",
    ],
}

DEFAULT_BOUNDARY_CHECKS = {
    "normal_skill_discussion_boundary": [
        "Normal Skill discussion",
        "must not enter real game implementation by default",
    ],
    "no_cocos_mcp_default": [
        "Do not use Cocos Creator",
        "Cocos MCP",
        "browser preview",
        "real project inspection by default",
    ],
    "runtime_proof_validation_sandbox": [
        "Runtime proof",
        "proof-chain work",
        "validation sandbox",
        "not default product development",
    ],
    "proof_slice_stop_rule": [
        "Proof-chain work must stop after each approved proof slice",
        "explicitly asks to continue",
    ],
    "next_recommended_command_optional": [
        "next recommended command",
        "optional advice only",
        "never implicit approval",
        "automatic continuation",
    ],
    "fast_context_heavy_loading_rule": [
        "FAST_CONTEXT",
        "heavy protocol",
        "index",
        "agent",
        "proof",
        "directly triggered",
    ],
    "compact_output_safety_rule": [
        "Safety completeness",
        "wins over compact output",
    ],
}

DANGEROUS_PHRASES = [
    "git reset --hard",
    "git push --force",
    "git add .",
    "rm -rf",
    "raw text edit .scene",
    "raw text edit .prefab",
    "raw text edit .meta",
    "skip pre-write approval",
    "bypass pre-write approval",
    "editor hierarchy is enough",
]

KNOWN_DEFERRED_LINK_TARGETS = set()

SAFETY_NEGATIONS = [
    "do not",
    "don't",
    "did not",
    "never",
    "must not",
    "forbidden",
    "blocked",
    "stop",
    "not allowed",
    "禁止",
    "不要",
    "不得",
    "不能",
    "必须停止",
    "需要确认",
    "only if explicitly confirms",
    "unless the user explicitly confirms",
    "forbidden meta behavior",
    "avoid contributions",
    "dangerous phrases",
]


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def normalize_for_danger(text: str) -> str:
    return (
        text.lower()
        .replace("`", "")
        .replace("*", "")
        .replace("_", "")
        .replace("cocos .", ".")
    )


def tracked_paths() -> set[str]:
    try:
        result = subprocess.run(
            ["git", "ls-files"],
            cwd=ROOT,
            check=True,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
    except (OSError, subprocess.CalledProcessError):
        return set()
    return {line.strip().replace("\\", "/") for line in result.stdout.splitlines() if line.strip()}


def all_existing_paths() -> set[str]:
    existing = tracked_paths()
    for path in ROOT.rglob("*"):
        if ".git" in path.parts:
            continue
        if path.is_file():
            existing.add(rel(path))
    return existing


def markdown_files() -> list[Path]:
    return sorted(path for path in ROOT.rglob("*.md") if ".git" not in path.parts)


def pass_group(name: str) -> None:
    print(f"PASS {name}")


def fail_group(name: str, errors: list[str]) -> None:
    print(f"FAIL {name}")
    for error in errors:
        print(f"  - {error}")


def check_required_files_exist(existing: set[str]) -> list[str]:
    errors = []
    for file_name in REQUIRED_FILES:
        if file_name not in existing and not (ROOT / file_name).exists():
            errors.append(f"missing required file: {file_name}")
    return errors


def check_root_entry_files() -> list[str]:
    errors = []
    for path in ROOT.iterdir():
        if path.is_file() and path.name not in ALLOWED_ROOT_FILES:
            errors.append(f"unexpected root-level file: {path.name}")
    return errors


def check_required_content() -> list[str]:
    errors = []
    for file_name, required_terms in CONTENT_CHECKS.items():
        path = ROOT / file_name
        if not path.exists():
            errors.append(f"{file_name}: file missing for content check")
            continue
        text = read_text(path)
        for term in required_terms:
            if term not in text:
                errors.append(f"{file_name}: missing required content {term!r}")

    readme = read_text(ROOT / "README.md") if (ROOT / "README.md").exists() else ""
    lower_readme = readme.lower()
    if "full game is complete" not in lower_readme or not any(
        phrase in lower_readme
        for phrase in [
            "not that the full game is complete",
            "does not mean the full game is complete",
            "not the full game is complete",
        ]
    ):
        errors.append("README.md: missing negative full-game-complete statement")

    errors.extend(check_package_json_check_script())

    issue_template_config = ROOT / ".github/ISSUE_TEMPLATE/config.yml"
    if issue_template_config.exists():
        for line in read_text(issue_template_config).splitlines():
            if line.strip() == "url: https://github.com/":
                errors.append("Issue template config uses generic GitHub contact link.")
    return errors


def check_package_json_check_script() -> list[str]:
    path = ROOT / "package.json"
    if not path.exists():
        return []

    try:
        package_json = json.loads(read_text(path))
    except json.JSONDecodeError as error:
        return [f"package.json: invalid JSON: {error}"]

    scripts = package_json.get("scripts", {})
    if not isinstance(scripts, dict):
        return ["package.json: scripts must be an object"]

    check_script = scripts.get("check")
    if not isinstance(check_script, str):
        return ["package.json: missing scripts.check"]

    allowed_check_scripts = {
        "npm run validate:example && npm run check:generated && npm run validate:runtime",
        "pnpm run validate:example && pnpm run check:generated && pnpm run validate:runtime",
    }
    if check_script not in allowed_check_scripts:
        return [
            "package.json: scripts.check must run validate:example, check:generated, and validate:runtime through npm or pnpm"
        ]

    return []


def strip_anchor(target: str) -> str:
    return target.split("#", 1)[0]


def is_ignored_link(target: str) -> bool:
    stripped = target.strip()
    return (
        not stripped
        or stripped.startswith("#")
        or stripped.startswith("http://")
        or stripped.startswith("https://")
        or stripped.startswith("mailto:")
    )


def check_markdown_links(existing: set[str]) -> list[str]:
    errors = []
    link_re = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
    for md_file in markdown_files():
        text = read_text(md_file)
        for match in link_re.finditer(text):
            raw_target = match.group(1).strip()
            if is_ignored_link(raw_target):
                continue
            target = raw_target.split()[0].strip("<>")
            target = unquote(strip_anchor(target))
            if is_ignored_link(target):
                continue
            resolved = (md_file.parent / target).resolve()
            try:
                relative = resolved.relative_to(ROOT).as_posix()
            except ValueError:
                errors.append(f"{rel(md_file)}: link escapes repository: {raw_target}")
                continue
            if relative not in existing and not resolved.exists():
                if relative in KNOWN_DEFERRED_LINK_TARGETS:
                    continue
                errors.append(f"{rel(md_file)}: missing link target {raw_target} -> {relative}")
    return errors


def check_safety_rules() -> list[str]:
    errors = []
    for file_name, required_terms in SAFETY_CHECKS.items():
        path = ROOT / file_name
        if not path.exists():
            errors.append(f"{file_name}: file missing for safety check")
            continue
        text = read_text(path)
        for term in required_terms:
            if term not in text:
                errors.append(f"{file_name}: missing safety term {term!r}")

    runtime_text = read_text(ROOT / "protocols/runtime-proof.md")
    runtime_lower = runtime_text.lower()
    if "editor scene visibility is not enough" not in runtime_lower and "editor hierarchy" not in runtime_lower:
        errors.append("protocols/runtime-proof.md: missing editor-only proof rejection")

    approval_text = read_text(ROOT / "protocols/write-approval.md").lower()
    if "pre_write_approval_required" not in approval_text and "pre-write" not in approval_text:
        errors.append("protocols/write-approval.md: missing pre-write approval rule")
    if "user must explicitly approve" not in approval_text and "user confirmation" not in approval_text:
        errors.append("protocols/write-approval.md: missing explicit user approval rule")
    return errors


def check_default_boundary_rules() -> list[str]:
    errors = []
    source_files = [
        "SKILL.md",
        "core/context-summary.md",
        "core/context-loading-policy.md",
        "core/operation-modes.md",
    ]
    combined_parts = []
    for file_name in source_files:
        path = ROOT / file_name
        if not path.exists():
            errors.append(f"{file_name}: file missing for default boundary check")
            continue
        combined_parts.append(read_text(path))

    combined = "\n".join(combined_parts)
    combined_lower = combined.lower()
    for rule_name, required_terms in DEFAULT_BOUNDARY_CHECKS.items():
        missing_terms = [term for term in required_terms if term.lower() not in combined_lower]
        if missing_terms:
            errors.append(
                f"default boundary rule {rule_name}: missing required term(s) "
                + ", ".join(repr(term) for term in missing_terms)
            )
    return errors


def check_dangerous_patterns() -> list[str]:
    errors = []
    for md_file in markdown_files():
        lines = read_text(md_file).splitlines()
        normalized_lines = [normalize_for_danger(line) for line in lines]
        for index, line in enumerate(normalized_lines):
            for phrase in DANGEROUS_PHRASES:
                if phrase in line:
                    start = max(0, index - 6)
                    end = min(len(normalized_lines), index + 7)
                    context = "\n".join(normalized_lines[start:end])
                    if not any(negation in context for negation in SAFETY_NEGATIONS):
                        errors.append(
                            f"{rel(md_file)}:{index + 1}: dangerous phrase without safety context: {phrase!r}"
                        )
    return errors


def run_group(name: str, check_func) -> bool:
    errors = check_func()
    if errors:
        fail_group(name, errors)
        return False
    pass_group(name)
    return True


def main() -> int:
    print("Skill docs validation started")
    existing = all_existing_paths()
    checks = [
        ("required_files_exist", lambda: check_required_files_exist(existing)),
        ("root_entry_file_check", check_root_entry_files),
        ("required_content_checks", check_required_content),
        ("markdown_link_check", lambda: check_markdown_links(existing)),
        ("safety_rule_checks", check_safety_rules),
        ("default_boundary_rule_checks", check_default_boundary_rules),
        ("dangerous_pattern_checks", check_dangerous_patterns),
    ]
    ok = True
    for name, check_func in checks:
        ok = run_group(name, check_func) and ok
    if ok:
        print("Skill docs validation PASS")
        return 0
    print("Skill docs validation FAIL")
    return 1


if __name__ == "__main__":
    sys.exit(main())
