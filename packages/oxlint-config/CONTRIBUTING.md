# Contributing to @wakamsha/oxlint-config

This document describes package-specific contribution rules for `packages/oxlint-config`.

## Scope

This guide applies only to the `@wakamsha/oxlint-config` workspace.

## Source of truth

- TypeScript sources in `src/` are the source of truth.
- Generated JSON files are build artifacts:
  - `configs/**/*.json`
  - `rules-json/**/*.json`
- Do not manually edit generated JSON files.

## Directory roles

- `src/configs/**/*.ts`: internal config implementation.
- `src/rules/**/*.ts`: internal rule-set implementation.
- `configs/index.ts`: public package entrypoint.
- `configs/**/*.json`: published JSON presets for `.oxlintrc.json` users.
- `rules-json/**/*.json`: generated JSON rule presets referenced by `configs/**/*.json`.

## Regeneration workflow

When changing files under `src/`, regenerate artifacts before committing.

1. Generate rule JSON:

```bash
pnpm -F @wakamsha/oxlint-config generate:rules-json
```

1. Generate config JSON:

```bash
pnpm -F @wakamsha/oxlint-config generate:configs-json
```

These scripts also run Prettier for generated files.

## Pull request checklist

Before opening a PR:

- Ensure generated JSON files are updated and committed when `src/` changes.
- Ensure no manual-only edits exist in generated JSON files.
- Ensure package checks/hooks pass locally.
- Keep user-facing usage docs in `README.md` and development rules in this file.

## Notes for compatibility

- `oxlint.config.ts` users consume exports from `configs/index.ts`.
- `.oxlintrc.json` users consume JSON presets under `configs/`.
- Keep both paths working when changing internal structure.
