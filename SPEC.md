# Portfolio specification v2

Apply this specification to the existing portfolio with the smallest possible changes. This version supersedes earlier instructions where they conflict. Keep approved copy in data, keep placeholder flags out of the rendered UI, preserve the skip link and route focus handling, and avoid visible TODOs, prohibited company or client names, and invented copy or metrics.

## Information architecture

- The site name links to `/`. The header navigation contains Work, Product, Creative, and About. The current page and its parent section use semibold `--text`; the other links use `--text-2`.
- The footer links to LinkedIn ↗, GitHub ↗, and NextLeap ↗ on the left. The right reads “deekshithn007 © 2026”. The credit wraps below the links on narrow screens.
- Header and footer links are underlined on hover. Links in running text stay underlined.
- Home introduces the portfolio and highlights recent projects. The active routes also include `/work`, `/work/property-document-checker`, `/product`, `/creative`, `/creative/:slug`, and `/about`. Unknown routes and unknown Work or series slugs show the shared 404.
- Redirect the old photography index to `/creative`. Preserve known series links from the former `/beyond-work` URLs. Redirect `/product-thinking` to `/product`. Keep the other approved legacy redirects to `/work`. Retain retired page files and identify those that no longer serve a route.
- Use Creative in navigation, titles, metadata, data, and tests.

## Home

I’m Deekshith, a product designer in Hyderabad. I work on AI and enterprise products, mostly as the only designer.

Show a short list of published projects from Work and Product, newest first. The selected projects are the product fellowship PRD and the work case study. Each links to its page and offers a return to Home when opened from the selection. Directly opened Work detail pages return to Work, and Creative galleries return to Creative. Keep photo captions in `photos.json` for the series pages.

## Product and About

Product presents the existing fellowship project in a section with its NextLeap destination. About tells the career story in short paragraphs, mentions languages in the prose, and has a separate “How I work” section. Social profile links live in the footer. Creative uses a two-column preview grid from 480px and a single column below. Each series opens a full-width gallery with a back link to Creative that scrolls to and focuses the corresponding tile’s title link. Back links use muted supporting type and 16px of space before the heading or case-study label.

## Work

Group projects by experience, newest first. Each group shows company, role, and years on the left and project titles on the right. The prototype groups contain three, two, and two projects. On narrow screens metadata stacks above the titles. All project titles link to detail pages. Unpublished projects show the title, availability status, and a link back to Work.

I start with the problem and the person who has it. I question long feature lists, because most of them are guesses. I like to see how a decision moves through a whole system, not just one screen, and I want to know afterwards whether it worked.

Keep the approved case-study sections, optional captions, and desktop section navigation.

## Visual style

- Keep the single light theme, centered reading column, and Inter at 16px with a 1.6 body line height. The desktop Home background has a white reading column and edge-only dither. Keep the existing desktop rotation and crossfade and honor reduced motion and hidden tabs.
- On desktop the name is 16px in `--text` and the nav is 14px. Align them on one baseline. Use 21px semibold page headings, 18px medium section headings, and 13px muted supporting text.
- Wrap link arrows in a span with a `.25em` left margin. Keep anchor text and arrow adjacent in markup so the underline ends at the arrow. Use a muted 1px underline across links. Darken the color on hover while retaining the weight.
- Use hairlines to separate Work experience groups and to mark the start of the Home selection. Use spacing between individual project rows and Creative grid tiles. Company names use body-sized, medium-weight text.
- Use spacing values of 8, 16, 24, 40, 64, and 96px. The header has 40px below it. Paragraphs are 24px apart. Allow 40px from the Home intro to Selected projects and 16px from label to list. Desktop Home project rows are 56px high. Allow at least 96px above the footer, with a top hairline and 24px padding.
- Draw the New mark with `--pen` set to `#E6128F` and an 8px gap from the title.
- Use typographic apostrophes and en dashes for ranges in data and markup.

## Motion

- Fade route content in over 200ms while the header and footer stay mounted. Reserve scrollbar space to keep the reading column centered as page lengths change. Leave scroll behavior and focus handling intact.
- Fade Creative image reveals over 240ms and ease link color changes over 140ms without changing underline width.
- Skip these transitions when the visitor prefers reduced motion.

## Responsive behavior

- At 480px and wider, Work experience groups use a 176px metadata column and a flexible project column. Use a wrapping flex row for the header. Let the nav wrap beneath the name when space runs out. Keep type sizes fixed and links at least 44px tall.
- Below 480px, use 20px gutters and stack list rows with the title above the secondary-colored year and status, separated by a middle dot. Keep 16px body text.
- Keep the container centered and capped at 640px up to the 1920px check.
- On mobile, use uniform 0.18 dither opacity and a still frame.
- Check 320, 360, 390, 768, 1280, and 1920px in Chromium. Report any horizontal overflow.

## Work order

1. IA, routes, navigation labels, copy, and data.
2. Visual polish and responsive behavior.
3. Tests for renamed routes and labels.

After each step run build, lint, and tests, list the changed files, and stop for approval.
