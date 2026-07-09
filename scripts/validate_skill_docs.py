#!/usr/bin/env python3
"""Validate Cocos Studio Ouguowen Skill documentation.

This script intentionally uses only the Python standard library so it can run
in GitHub Actions without extra dependency installation.
"""

from __future__ import annotations

import os
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    "README.md",
    "README.zh-CN.md",
    "SKILL.md",
    "COMMANDS.md",
    "MODULE_INDEX.md",
    "QUALITY_GATES.md",
    "package.json",
    "REPO_STRUCTURE_PLAN.md",
    "CONTEXT_LOADING_POLICY.md",
    "SKILL_CONTEXT_SUMMARY.md",
    "SKILL_OPERATION_MODES.md",
    "UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md",
    "CHARACTER_SYSTEM.md",
    "UI_SYSTEM_MODEL.md",
    "CHARACTER_ANIMATION_MODEL.md",
    "ASSET_SEMANTIC_MODEL.md",
    "ASSET_POLICY.md",
    "CHANGELOG.md",
    "LICENSE",
    "CONTRIBUTING.md",
    "SECURITY.md",
    "FIRST_MVP_SUCCESS_PIPELINE.md",
    "COCOS_DEV_STORY_PREWRITE_PROTOCOL.md",
    "COCOS_GENERATED_META_POLICY.md",
    "templates/reports/mvp-acceptance.md",
    "SUCCESS_CASE_MOONLIGHT_DELIVERY.md",
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
        "FIRST_MVP_SUCCESS_PIPELINE.md",
        "COCOS_DEV_STORY_PREWRITE_PROTOCOL.md",
        "COCOS_GENERATED_META_POLICY.md",
        "SUCCESS_CASE_MOONLIGHT_DELIVERY.md",
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
    "COMMANDS.md": [
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
    ],
    "package.json": [
        "check:generated",
        "scripts/check-generated-artifacts.js",
        "npm run validate:example && npm run check:generated && npm run validate:runtime",
    ],
    "SKILL.md": [
        "CONTEXT_LOADING_POLICY.md",
        "SKILL_CONTEXT_SUMMARY.md",
        "SKILL_OPERATION_MODES.md",
        "FAST_CONTEXT",
        "GATE_CONTEXT",
        "AUDIT_CONTEXT",
        "Do not load the full Skill repository by default",
        "Fast Build Mode",
        "Safe Gate Mode",
        "Audit Mode",
        "FIRST_MVP_SUCCESS_PIPELINE.md",
        "COCOS_DEV_STORY_PREWRITE_PROTOCOL.md",
        "COCOS_GENERATED_META_POLICY.md",
        "Preview Visibility Gate",
        "RUNTIME_PROOF_PROTOCOL.md",
        "UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md",
        "CHARACTER_SYSTEM.md",
        "UI_SYSTEM_MODEL.md",
        "CHARACTER_ANIMATION_MODEL.md",
        "ASSET_SEMANTIC_MODEL.md",
        "Do not implement UI-character-action linkage before the first implementation story and production readiness approve the scope",
    ],
    "MODULE_INDEX.md": [
        "CONTEXT_LOADING_POLICY.md",
        "SKILL_CONTEXT_SUMMARY.md",
        "REPO_STRUCTURE_PLAN.md",
        "SKILL_OPERATION_MODES.md",
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
        "FIRST_MVP_SUCCESS_PIPELINE.md",
        "COCOS_DEV_STORY_PREWRITE_PROTOCOL.md",
        "COCOS_GENERATED_META_POLICY.md",
        "templates/reports/mvp-acceptance.md",
        "SUCCESS_CASE_MOONLIGHT_DELIVERY.md",
        "UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md",
        "CHARACTER_SYSTEM.md",
        "UI_SYSTEM_MODEL.md",
        "CHARACTER_ANIMATION_MODEL.md",
        "ASSET_SEMANTIC_MODEL.md",
    ],
    "UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md": [
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
    "CHARACTER_SYSTEM.md": [
        "Character identity",
        "Character behavior",
        "Character action state",
        "Animation state",
        "Skeleton boundary",
        "Asset binding boundary",
        "UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md",
    ],
    "UI_SYSTEM_MODEL.md": [
        "UI input is a request",
        "must not own gameplay truth",
        "UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md",
    ],
    "CHARACTER_ANIMATION_MODEL.md": [
        "Animation state is downstream",
        "must not own gameplay result",
        "UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md",
        "CHARACTER_SYSTEM.md",
    ],
    "ASSET_SEMANTIC_MODEL.md": [
        "Assets do not create behavior",
        "must not introduce gameplay systems",
        "controller-owned behavior",
    ],
    "ASSET_POLICY.md": [
        "Assets do not create behavior",
        "Assets must not own gameplay truth",
        "Placeholder assets",
        "External assets",
        "Generated assets",
        "source",
        "license",
        "owner",
        "approver",
        "COCOS_GENERATED_META_POLICY.md",
        "ASSET_APPROVAL_REQUIRED",
        "ASSET_SCOPE_BLOCKED",
    ],
    "SKILL_OPERATION_MODES.md": [
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
    "CONTEXT_LOADING_POLICY.md": [
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
    "REPO_STRUCTURE_PLAN.md": [
        "Current root-level paths remain canonical",
        "Do not move files",
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
    "SKILL_CONTEXT_SUMMARY.md": [
        "lightweight first-read memory",
        "CONTEXT_LOADING_POLICY.md",
        "SKILL_OPERATION_MODES.md",
        "Do not load the whole repository",
        "Fast Build Mode",
        "Stop conditions",
        "Context anti-patterns",
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
        "UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md",
        "CHARACTER_SYSTEM.md",
        "SKILL_OPERATION_MODES.md",
        "Fast Build Mode",
        "Safe Gate Mode",
        "Audit Mode",
        "ownership rules",
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
    "SKILL_TEST_CASES.md": [
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
    "COCOS_DEV_STORY_PREWRITE_PROTOCOL.md": [
        "PRE_WRITE_APPROVAL_REQUIRED",
        "Before explicit user confirmation",
        "must not",
        "modify `.meta`",
        "commit",
        "push",
        "Fast Build Mode",
        "do not stop after every",
    ],
    "COCOS_GENERATED_META_POLICY.md": [
        "assets/scenes.meta",
        "unapproved `.meta`",
        "stop and report",
        "user must explicitly confirm",
        "must not raw text edit `.scene`, `.prefab`, or `.meta`",
    ],
    "RUNTIME_PROOF_PROTOCOL.md": [
        "browser preview",
        "Preview Visibility Gate",
        "summarized once",
        "Fast Build Mode",
    ],
    "CODEX_WRITE_APPROVAL_PROTOCOL.md": [
        "generated `.meta`",
        "approve a scope",
        "without repeated confirmation",
    ],
    "QUALITY_GATES.md": [
        "Pre-write Approval Gate",
        "Cocos Generated Meta Gate",
        "QA Review Gate",
        "First MVP Acceptance Gate",
        "UI-Character Linkage Gate",
        "Developer Experience Gate",
        "Interruption Budget Gate",
    ],
    "ASSET_POLICY.md": [
        "Assets must not own gameplay truth",
        "External assets require source, license, owner, approver, and import scope",
        "Do not import external assets when ownership, license, or approval is unclear",
        "Cocos `.scene`, `.prefab`, `.anim`, and `.meta` files must not be raw text edited",
        "Generated assets do not bypass approval",
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

    issue_template_config = ROOT / ".github/ISSUE_TEMPLATE/config.yml"
    if issue_template_config.exists():
        for line in read_text(issue_template_config).splitlines():
            if line.strip() == "url: https://github.com/":
                errors.append("Issue template config uses generic GitHub contact link.")
    return errors


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

    runtime_text = read_text(ROOT / "RUNTIME_PROOF_PROTOCOL.md")
    runtime_lower = runtime_text.lower()
    if "editor scene visibility is not enough" not in runtime_lower and "editor hierarchy" not in runtime_lower:
        errors.append("RUNTIME_PROOF_PROTOCOL.md: missing editor-only proof rejection")

    approval_text = read_text(ROOT / "CODEX_WRITE_APPROVAL_PROTOCOL.md").lower()
    if "pre_write_approval_required" not in approval_text and "pre-write" not in approval_text:
        errors.append("CODEX_WRITE_APPROVAL_PROTOCOL.md: missing pre-write approval rule")
    if "user must explicitly approve" not in approval_text and "user confirmation" not in approval_text:
        errors.append("CODEX_WRITE_APPROVAL_PROTOCOL.md: missing explicit user approval rule")
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
        ("required_content_checks", check_required_content),
        ("markdown_link_check", lambda: check_markdown_links(existing)),
        ("safety_rule_checks", check_safety_rules),
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
