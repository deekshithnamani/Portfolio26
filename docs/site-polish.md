# Site polish

Creative photos retain their original proportions. Intrinsic dimensions in
`src/data/photos.json` reserve space before lazy images load. The existing WebP
files are only 24–39 KB, so additional image variants are not needed for these
assets. Update dimensions when replacing photos.

Narrow screens stack project metadata below titles. Footer links retain 44px
touch targets; gallery covers expose keyboard focus. Secondary text is darkened
to remain readable even over the darkest light-red background at 40% opacity.
The existing shader respects reduced motion and pauses when hidden.

`public/social-preview.png` is the default 1200 × 630 sharing card. Once a public
URL is chosen, set `VITE_SITE_URL` in the deployment environment (see
`.env.example`) and rebuild. Production HTML then includes absolute Open Graph
and Twitter image addresses on each route. Image tags are deliberately omitted
until that URL is configured; no guessed domain is published.

Unused Writing, Make, Interests, Curations, and Drafts page components were
removed. Their legacy URLs still use the existing redirects. Hidden background
effects remain in source.
