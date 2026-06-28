# Git Diff Review Protocol

Use this file before committing any Skill maintenance change.

## Required review

- run `git status`
- run `git diff --name-only`
- run `git diff --stat`

## Review law

- Every changed path must belong to the approved writable scope.
- Unexpected non-doc changes block commit.
- External game-project paths block commit immediately.
- If a required file was promised but is still missing, document the gap before commit.

## Minimum review note

- changed file list
- blocked-path confirmation
- summary of net additions
- residual risk
