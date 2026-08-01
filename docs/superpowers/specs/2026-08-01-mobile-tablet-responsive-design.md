# Mobile & Tablet Responsive Portfolio

Date: 2026-08-01

## Goal

Make the live dark/glow portfolio (rendered via `App.jsx` → `NewElements.jsx`) fully responsive across phone, tablet, and desktop widths — no horizontal overflow, no clipped/overlapping content, readable typography and a properly-scaled Tech Orbit at every breakpoint.

## Non-goals

- No changes to `src/Components/Elements.jsx` — it is unused (kept only for possible future reuse per the prior redesign spec) and out of scope.
- No content/copy changes, no new sections, no navigation menu (the header has no nav links today, so no hamburger-menu decision is needed).
- No visual redesign beyond what's required for responsiveness — the dark/glow aesthetic, colors, and animations stay as designed.

## Approach

Fix the global CSS layout bug first (it affects every breakpoint but is most damaging on mobile, where it doubles up gutters and misaligns the sticky header), then add responsive sizing to the sections that currently use fixed/desktop-oriented dimensions.

## Changes

### 1. Global layout base (`src/index.css`)

`body` currently has `display:flex; place-items:center;` left over from the Vite starter template. With a single auto-width child, this prevents `#root` from reliably stretching to full viewport width. Combined with `#root`'s fixed `padding: 2rem`, this doubles up whitespace on top of each MUI `Container`'s own gutters and insets the sticky header from the viewport edge on every screen size, worst on narrow phones.

- Remove `display:flex; place-items:center;` from `body` in `src/index.css` (keep `margin:0; min-height:100vh`).
- Reduce `#root`'s padding in `src/App.css` to 0 (or a small responsive value), since each section already manages its own horizontal spacing via `Container`. Keep `max-width:1280px; margin:0 auto` as an outer safety cap.

### 2. Header (`NewHeader`)

Shrink the "Hire Me" button's horizontal padding and font size at the `xs` breakpoint via `sx={{ px: { xs: 2, sm: 3 } }}` (and similar for the name `Typography` if needed) so the gradient name and button never wrap or collide down to ~320px-wide screens.

### 3. Hero (`NewHero`)

The `variant="h3"` headline and `variant="h5"` typed-role line use MUI's default fixed sizes (desktop-oriented). Add responsive `fontSize`/`lineHeight` via `sx={{ fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' } }}` (headline) and a similar smaller scale for the typed-role line, tuned so the longest role string ("MERN Stack Developer.") doesn't force a second line at the `xs` width and shift layout. Keep the CTA button as-is (already reasonably sized).

### 4. Work Experience & Featured Projects grids

Grid breakpoints (`xs=12`, `md=6` / `xs=12 sm=6 md=4`) already stack correctly — no structural change. Reduce `GlowCard`'s fixed `padding: 24px` to a responsive value (e.g. `sx={{ p: { xs: 2, md: 3 } }}` override) so cards don't feel oversized relative to phone width.

### 5. Tech Orbit (`NewTechOrbit`)

Per user decision: stays a rotating ring at every size, scaled down rather than replaced with a static grid.

- Use MUI's `useMediaQuery`/`useTheme` to select a size preset based on breakpoint:
  - `xs` (<600px): `ORBIT_SIZE=220`, `ORBIT_RADIUS=85`, icon box `34px`
  - `sm` (600–899px): `ORBIT_SIZE=280`, `ORBIT_RADIUS=115`, icon box `38px`
  - `md+` (≥900px): current values — `ORBIT_SIZE=340`, `ORBIT_RADIUS=155`, icon box `42px`
- These feed both the container `Box`'s `width`/`height` and the per-icon `translate(...)` calculation (which is JS-computed, not pure CSS, so it must read the active preset rather than the current hardcoded constants).
- Central badge (`84px`) and font size inside it scale down slightly at `xs` to stay proportional (e.g. `64px` badge, smaller font).

### 6. Contact / Footer

No structural change — content already stacks and wraps naturally (block-level text, inline-flex icon buttons in a plain `Box`). Spot-check spacing at small widths only.

## Testing / Verification

- `npm run dev`, check the app in browser dev tools at representative widths: 360px and 414px (phone), 768px and 834px (tablet), plus existing desktop (≥1200px).
- Confirm no horizontal scrollbar/overflow at any width, no clipped or overlapping content, Tech Orbit icons stay within their ring and don't collide with adjacent sections.
- `npm run lint` to catch unused imports/syntax issues.
