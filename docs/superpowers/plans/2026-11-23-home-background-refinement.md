# Homepage background refinement

**Scope:** Keep Waves, Ripples, Flow Field, Contours and Aurora. Choose a new
non-repeating effect each Home visit, including returns from other routes.
Preserve user-approved local cursor interaction and reduced-motion handling.

**Implementation:** Store the selected effect in component state, record only
committed selections to avoid StrictMode initialization side effects, and retain
in-memory history when storage is blocked. Lazy-load the five shader fields and
engine separately from page content. Tune speed and detail per effect; use 3px
desktop and 4px mobile cells. Keep the five unused examples as source references.

**Validation:** First reproduce the old navigation behavior with an integration
test; test the curated pool and committed visit history; run focused tests and the
full verification suite. Compare production entry and deferred chunk gzip sizes
against the preceding 111.04kB single entry. Runtime frame rate and appearance
remain subject to the user's browser review.
