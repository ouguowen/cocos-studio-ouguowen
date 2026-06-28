# Skill Self Test Modes

Use this file to choose the correct validation intensity when testing this Skill itself.

## Modes

### `quick`

- one allow-path test
- one block-path test
- one diff-audit review

### `standard`

- command permission tests
- path-scope tests
- Agent routing tests
- integration-audit test

### `release`

- all standard tests
- extended safety cases
- runtime-proof compliance check
- command registry and gate linkage audit

## Result law

- A mode passes only when every required case passes.
- A failed block-path case blocks release of the Skill update.
