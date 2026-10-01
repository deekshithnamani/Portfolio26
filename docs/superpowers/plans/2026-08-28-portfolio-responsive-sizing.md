# Portfolio Responsive Sizing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tighten the portfolio's density for small laptop viewports while keeping the existing visual language, accessibility behavior, and desktop quality intact.

**Architecture:** Treat responsive density as a design-system concern instead of a page-by-page override problem. Keep layout, spacing, and headline scale inside shared semantic tokens and class recipes. Add explicit `sm` and `md` size variants only to true reusable controls such as pills and filter buttons, and keep structural components responsive through shared tokens.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Motion, Vitest, Testing Library

---

## File Map

- `docs/superpowers/specs/2026-08-28-portfolio-responsive-sizing-design.md`
  Purpose: approved design direction and responsive sizing rules.
- `src/design/layout-system.ts`
  Purpose: page shell density, horizontal gutters, and shared section rhythm.
- `src/design/ui-recipes.ts`
  Purpose: responsive typography, row density, drawer sizing, and control-size recipes.
- `src/components/ui/shared.tsx`
  Purpose: apply new shared recipes and expose control size variants where appropriate.
- `src/components/ui/shared-props.ts`
  Purpose: define the control size contracts for shared primitives.
- `src/components/layout/top-bar.tsx`
  Purpose: reduce compact-desktop bulk without changing layout behavior.
- `src/components/layout/nav-drawer.tsx`
  Purpose: tune drawer width, spacing, and nav scale for small laptops.
- `src/pages/Home.tsx`
  Purpose: tighten hero, CTA rhythm, and preview row density.
- `src/pages/Work.tsx`
  Purpose: tighten index rows and detail-page spacing while preserving readability.
- `src/pages/Writing.tsx`
  Purpose: tighten index rows, filter density, and detail-page spacing.
- `src/pages/Interests.tsx`
  Purpose: reduce row and media spacing through shared tokens.
- `src/pages/NotFound.tsx`
  Purpose: align the fallback page with the updated shell density.
- `src/__tests__/design-system.test.ts`
  Purpose: verify responsive token ownership and shared recipe contracts.
- `src/__tests__/shared.test.tsx`
  Purpose: verify explicit size variants for shared control components.

## Execution Order

- [ ] Write the approved responsive sizing plan into the repo.
- [ ] Add regression tests for responsive layout tokens and explicit shared-control size contracts.
- [ ] Compact the page shell, row recipes, and typography scale for small laptops.
- [ ] Tune the top bar, drawer, and detail-page spacing without changing behavior.
- [ ] Apply the new shared size variants only to reusable control components.
- [ ] Run format, typecheck, lint, tests, and build before closing the task.
