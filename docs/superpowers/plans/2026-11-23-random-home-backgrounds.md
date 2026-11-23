# Random homepage shader backgrounds

**Approved behavior:** Choose one of the user's ten dithercn examples on a full
page reload. Keep it stable through internal navigation. Preserve the portfolio's
palette and content, and add local cursor deformation.

**Implementation:** Vendor the official engine's shader dependencies and the ten
requested example components, with their MIT notice. Use one active shader,
3px cells and a 30fps cap. Add a shared adapter that warps field coordinates near
the cursor, with reduced-motion and visibility cleanup. Select once per document,
exclude the preceding session choice, and allow an effect query for manual review.

**Validation:** Test every selection interval and no-repeat behavior, all ten
field integrations, local pointer uniforms, reduced-motion suppression and
cleanup. Run typecheck, lint, full tests, production build, and diff checks.
Visual and WebGL compilation checks remain with the user's browser review.
