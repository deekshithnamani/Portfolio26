# Portfolio Typography Scale Design

Date: August 28, 2026

## Purpose

Refine the portfolio typography into a more deliberate production system with clear scale logic, cleaner role separation, and better long-form readability. The current type foundation is good, but it still mixes some typography ownership across utility classes and design tokens, and it does not yet express a documented modular scale strategy.

## Source Of Truth

- Existing portfolio foundation spec: `docs/superpowers/specs/2026-08-27-portfolio-foundation-design.md`
- Existing responsive sizing spec: `docs/superpowers/specs/2026-08-28-portfolio-responsive-sizing-design.md`
- User feedback on August 28, 2026:
  - typography should be properly structured and production-ready
  - a good scale system should be used
  - examples discussed: modular scales such as major third, minor third, and golden ratio

## Problem Statement

The current build has usable typography, but not yet a fully systematized type scale:

- display, title, body, and metadata roles exist, but the scale logic is not documented
- metadata typography is split between `src/index.css` and `src/design/ui-recipes.ts`
- long-form writing still uses the same supporting-body token as shorter excerpts
- some secondary typography, such as drawer descriptions, does not fully align with the established mono metadata language

The result is decent consistency, but not yet a typography system that is easy to extend confidently.

## Goals

- Establish a documented scale strategy that is production-level and easy to grow
- Use a scale that fits compact portfolio UI, not a dramatic editorial-only ratio
- Separate display, page-title, section-title, supporting-body, long-form prose, and metadata roles
- Reduce token ambiguity by consolidating typography ownership in the design layer
- Improve readability for writing pages without making the whole site feel larger

## Non-Goals

- No font-family change
- No brand redesign
- No decorative editorial flourishes that fight the current industrial look
- No giant golden-ratio jumps across all UI elements

## Scale Options Considered

### Option 1: Golden Ratio Everywhere

Use an approximately `1.618` modular scale across headings and supporting roles.

Pros:

- dramatic visual hierarchy
- strong editorial contrast

Cons:

- too aggressive for compact UI
- makes chips, nav labels, and dense laptop layouts feel inflated
- harder to keep page rhythm balanced in a restrained product-style portfolio

### Option 2: Minor Third Everywhere

Use an approximately `1.2` modular scale for nearly all typography roles.

Pros:

- compact and controlled
- works well for dense interfaces

Cons:

- can feel too flat for hero and primary titles
- less expressive for the homepage and key page headers

### Option 3: Hybrid Scale System

Use a `major third` scale, approximately `1.25`, for display and heading roles, plus a tighter utility scale for mono metadata and controls, and a dedicated readable prose role for long-form writing.

Pros:

- strong enough hierarchy without becoming oversized
- fits both expressive display moments and compact laptop layouts
- cleaner distinction between UI text and editorial text

Cons:

- slightly more design-token work than a single universal scale

## Recommended Direction

Use **Option 3: Hybrid Scale System**.

This portfolio needs two different typographic behaviors:

- expressive hierarchy for hero and page titles
- restrained density for UI labels, filters, metadata, and navigation

A single universal ratio does not serve both equally well. The right production rule is:

- `major third` for display and heading hierarchy
- utility micro-scale for mono UI and metadata
- dedicated prose role for long-form content

## Proposed Type System

### 1. Display And Heading Ladder

Base reference size: `16px`

Major third progression:

- `16`
- `20`
- `25`
- `31`
- `39`
- `49`

How it maps to the portfolio:

- `heroDisplay`
  - responsive range anchored around the upper end of the ladder
  - expressive, but still constrained for small laptops
- `titleLarge`
  - page-detail titles and major headers
- `titleMedium`
  - list-row titles and section-level content headers
- `titleSmall`
  - preview-row titles and smaller emphasis points

These roles should keep:

- `font-light`
- slight negative tracking
- tight but readable leading

### 2. UI And Metadata Utility Scale

Use a tighter utility ladder for mono roles and compact controls:

- `10`
- `11`
- `12`
- `14`

How it maps:

- `10px`
  - compact filter chips and the smallest dense utility text
- `11px`
  - secondary chips, drawer descriptions, compact pills
- `12px`
  - standard mono metadata, nav labels, action links, section labels
- `14px`
  - only where a mono label needs stronger visibility without becoming title-like

These roles should keep:

- uppercase
- tracked spacing
- mono font

### 3. Body Roles

Body text should split into two roles instead of one:

- `bodySupport`
  - for excerpts, one-liners, supporting descriptions, and compact page copy
  - slightly smaller and tighter than prose
- `bodyProse`
  - for long-form writing and narrative detail content
  - based around `16px`
  - more generous line-height and narrower ideal measure

This avoids using a single token for both short UI-support text and long reading text.

## Token Ownership Rules

Typography should be owned primarily by design tokens, not split between unrelated local utilities.

Expected outcome:

- keep typography recipes in `src/design/ui-recipes.ts`
- reduce free-floating typography definitions in `src/index.css`
- keep only genuinely global base utilities in CSS when they are not design-role specific

## Component-Specific Decisions

### Section Labels And Metadata

- `sectionLabel`, `metaText`, and `monoMuted` should stay within one coherent mono family
- tracking values should remain close enough to feel related
- drawer descriptions should align with the mono metadata system instead of behaving like an orphan role

### Navigation Drawer

- main nav links can remain sans and display-like
- supporting drawer descriptions should become part of the mono metadata family

### Writing Pages

- index excerpts should use `bodySupport`
- long-form article paragraphs should use `bodyProse`
- bold text should remain supported inside prose without needing a separate rich-text system yet

### Buttons, Chips, And Pills

- control typography should stay on the utility scale, not the heading ladder
- this keeps controls crisp and prevents button-like heaviness

## Responsiveness Rules

- heading scale should remain fluid through responsive clamps
- utility text should stay mostly discrete and stable across breakpoints
- prose should optimize for readability, not visual drama
- small laptops should not jump too quickly into oversized title values

## Accessibility Rules

- all text roles must preserve strong contrast in both dark and light themes
- long-form prose must remain comfortably readable at normal laptop widths
- compact utility text must stay legible and should not become overly condensed

## Testing Strategy

Add or update tests to cover:

- the presence of distinct typography roles for support body and prose body
- the documented hybrid scale ownership in design tokens
- continued mono metadata conventions for UI labels and drawer description text

Manual verification should check:

- homepage hero hierarchy
- work and writing row title hierarchy
- filter-chip readability
- long-form writing readability on laptop widths
- metadata consistency across top bar, drawer, pills, and labels

## Success Criteria

This pass is successful when:

- the portfolio has a documented and coherent scale strategy
- heading hierarchy feels intentional without inflating compact layouts
- prose reads better than support copy because it uses a distinct role
- metadata and utility text feel like one family
- the system is easier to extend without naming confusion

## File Impact

Planned files to change:

- `src/design/ui-recipes.ts`
- `src/index.css`
- `src/pages/Writing.tsx`
- shared components or page files that consume updated body or metadata roles
- typography-related tests under `src/__tests__/`
- `docs/superpowers/style-guides/portfolio-foundation-style-guide.md`

## Final Recommendation

The right scale system for this portfolio is not a universal golden-ratio ladder.

It is a **hybrid system**:

- `major third` for headings and display
- utility micro-scale for mono UI and metadata
- separate prose sizing for long-form reading

That gives the project stronger structure, better readability, and more room to scale without visual confusion.
