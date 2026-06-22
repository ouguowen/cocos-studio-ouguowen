# Expected Validation Outputs

This file explains what a beginner should expect from validation commands.

## Validate config

Command:

```bash
npm run validate:example
```

Expected result:

```text
No blocking config errors.
Process exits with code 0.
```

If validation fails, check:

- missing required fields
- references to missing map points
- references to missing enemy groups
- references to missing reward IDs
- disabled rows accidentally referenced by enabled rows

## Export runtime config

Command:

```bash
npm run export:example
```

Expected result:

```text
examples/attack-defense-city/generated-level-config.json
```

The exported JSON should be treated as runtime data.

The CSV files remain the authoring source.

## Export TypeScript types

Command:

```bash
npm run types:example
```

Expected result:

```text
examples/attack-defense-city/generated-config-types.ts
```

Use generated types as references when writing Cocos runtime integration code.

## Validate runtime template

Command:

```bash
npm run validate:runtime
```

Expected result:

```text
TypeScript runtime template compiles in the temporary validation sandbox.
```

If this fails, check:

- missing TypeScript compiler
- broken imports in runtime template files
- generated config type mismatch

## Full check

Command:

```bash
npm run check
```

Expected result:

```text
validate:example passes
export:example passes
validate:runtime passes
```

This command is the same high-level check used by GitHub Actions.
