# Project media viewer implementation plan

**Goal:** Let readers expand project images, GIFs, and videos into a viewport-sized viewer.

**Design approved:** Keep the inline column unchanged. Show a top-right expand control on hover and focus, and persistently on touch. Display media uncropped in a native modal dialog. Close by button, Escape, or backdrop; restore trigger focus. Videos use native controls and do not autoplay.

**Architecture:** A ProjectMedia component owns inline rendering and the modal. CaseStudyPage delegates populated media slots to it and retains empty placeholders. Existing image data remains valid; sections gain an optional video field with source, accessible label, poster, and caption tracks. UI labels remain in site.json.

**Steps:**
- [x] Add regression tests for image expansion, closing and focus restoration, GIF sources, and video controls.
- [x] Run the focused tests and confirm missing behavior fails.
- [x] Implement ProjectMedia, extend section types, and integrate the active case-study template.
- [x] Add token-based responsive viewer styles and media authoring documentation.
- [x] Run focused tests, then npm run verify and git diff --check.

**Validation:** Native dialog behavior requires a small jsdom API shim in component tests. Tests exercise user-facing open/close controls and media markup; browser-native focus trapping is delegated to showModal. No existing content assets are replaced.

