# Portfolio Production Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio foundation production-ready by fixing build blockers, enforcing naming and import conventions, tightening route ownership, and expanding the design token system.

**Architecture:** Keep the current split between `components`, `config`, `data`, `design`, `pages`, and `__tests__`, but reduce ambiguity by removing duplicated route metadata, establishing one approved public layout import surface, and turning repeated visual class patterns into named design-layer exports. Add local quality gates so the project can prove build correctness, lint health, and test coverage on every iteration.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Motion, ESLint, Prettier, Vitest, Testing Library

---

## File Map

- `package.json`
  Purpose: add production quality scripts for linting, typechecking, and formatting.
- `tsconfig.app.json`
  Purpose: keep strict browser TypeScript rules and add path alias support if needed.
- `vite.config.ts`
  Purpose: add matching source alias resolution for Vite and Vitest.
- `src/components/layout/*`
  Purpose: fix broken imports, preserve the layout shell, and keep the layout internals private behind one public entry.
- `src/components/ui/shared.tsx`
  Purpose: correct motion prop typing and consume shared visual recipes.
- `src/components/ui/shared-props.ts`
  Purpose: align prop types with Motion-backed components.
- `src/config/navigation.ts`
  Purpose: central document-title ownership plus navigation metadata.
- `src/config/route-paths.ts`
  Purpose: route ids, paths, and builders only.
- `src/config/routes.tsx`
  Purpose: route graph only, without duplicated title ownership.
- `src/design/*`
  Purpose: expand token coverage for shared visual recipes and validate the new exports.
- `src/__tests__/*`
  Purpose: add regression coverage for the new token and routing conventions.

## Execution Order

- [ ] Capture the current failing state through build and lint/type checks.
- [ ] Add focused regression coverage for the new route/title and token conventions.
- [ ] Fix broken layout imports and Motion prop typing.
- [ ] Add lint, typecheck, and formatting enforcement in the root toolchain.
- [ ] Consolidate route metadata ownership and layout import conventions.
- [ ] Replace repeated visual literals with named design-layer exports where reuse already exists.
- [ ] Run fresh verification for build, lint, and tests before closing the task.
