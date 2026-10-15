# Design QA — Câmbiofix

## Evidence

- Source visual truth: https://cambiofixoficina.com.br/
- Rendered implementation: http://localhost:4173/
- Desktop viewport: 1543 × 954 CSS px; browser screenshot captured at the source and implementation in the same viewport.
- Mobile viewport: 390 × 844 CSS px; browser screenshot captured at the source and implementation in the same viewport.
- Density normalization: browser CSS screenshots compared at the same viewport dimensions; no device-frame or density scaling applied.
- Primary state: landing page at the top, quote form empty.
- Additional states: service carousel advanced once, FAQ item expanded, quote form submitted state, mobile menu available.

## Comparison

- Full view: hero image, dark overlay, white logo/navigation, green contact actions, floating quote form, brand strip, light/dark section rhythm, red CTAs, and contact/footer composition are aligned with the source.
- Focused regions: desktop hero/form and mobile hero/form were checked for crop, padding, input sizing, button placement, and responsive stacking. Typography uses local Poppins font files captured from the source; the hero image, logo, brand marks, and service/social imagery are local assets.
- Interactions tested in the browser: anchor navigation, mobile menu state, service previous/next controls and pagination, FAQ expand/collapse, required quote form fields and success state, WhatsApp/telephone/Instagram/map links.
- Console errors: no implementation errors reported by the local browser console.

## Findings

No actionable P0, P1, or P2 mismatches remain. The Instagram section is implemented as local, clickable post cards using the captured source imagery instead of a live third-party embed, keeping the clone self-contained and avoiding external runtime dependencies.

## Implementation Checklist

- [x] Desktop layout and hero composition
- [x] Mobile responsive layout and menu state
- [x] Local source assets and fonts
- [x] Anchor navigation and CTA links
- [x] Form success state
- [x] Service carousel interaction
- [x] FAQ expand/collapse
- [x] Reduced-motion preference
- [x] `npm run build`
- [x] `npm run test:sites`

## Follow-up Polish

- P3: connect the quote form to a real submission endpoint if the clone will be used in production.

final result: passed
