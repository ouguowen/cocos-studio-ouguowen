# Skill Change Review Protocol

Use this file when reviewing changes to the Skill itself.

## Review focus

- safety rule coverage
- command linkage
- module index linkage
- quality gate linkage
- Agent routing completeness
- self-test completeness
- audit trail quality

## Required findings format

- blocker issues
- major issues
- minor issues
- missing integrations
- residual risk

## Approval law

- Missing safety linkage blocks approval.
- Missing block-path tests block approval.
- Missing audit evidence blocks approval.
- Skill changes that improve, evolve, extend, restructure, or add core systems must check [core/evolution-system.md](../core/evolution-system.md) before implementation.
- E3/E4 changes require evolution proposal and approval.
