# Six blue-gray backgrounds

Approved scope: Fire, Smoke, Plasma, Contours, Ripple, and Waves only. Remove
Flow Field and Aurora from the rotation. Use one muted blue-gray accent with
paper-derived tints and no glow. Keep ambient-only motion and per-visit rotation.

Implementation: one thinner ripple source just outside the bottom-right corner,
with greater decay and a local radial fade; three shallow waves below a 0.3
horizon with glow disabled; lower flames and smoke; fewer contour lines; broad,
low-contrast plasma. Strengthen text protection through the reading column.
Preserve 2px/3px grain, the cell budget, lazy loading, and the 30fps limit.

Validation: reproduce pool, ripple, and wave failures; verify the six fields and
new uniforms with focused tests; lint changed source; typecheck and build. Actual
WebGL rendering and final appearance remain for the user's browser review.
