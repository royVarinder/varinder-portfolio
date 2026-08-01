# New Portfolio Design (Dark/Glow Theme)

Date: 2026-08-01

## Goal

Recreate the visual design shown in the reference screenshot (a dark, purple/violet "glow" portfolio template) as a new set of React components, populated with Varinder Singh's real resume content, and make it the default view — while keeping the current MUI portfolio (`Elements.jsx`) fully intact and reusable later.

## Non-goals

- No pixel-perfect replication of the reference's hand-drawn cartoon illustration (dropped per decision).
- No fake browser-mockup project previews — real project logos/links from `Config.jsx` are used instead.
- No routing/multi-page setup — this is a single-page swap of which component set `App.jsx` renders.
- No changes to the existing MUI theme/palette used by `Elements.jsx`.

## Approach

Build a parallel, self-contained component set rather than modifying `Elements.jsx` in place. This satisfies "make the existing component reusable in future": nothing is deleted or rewritten, and switching back later is a one-line import change in `App.jsx`.

Styling uses MUI's `styled()` API and `sx` prop (per user's stated preference), with `keyframes` from `@emotion/react` (already a dependency) for animated effects (typing caret, glow pulse, orbit rotation). Colors are literal hex values scoped to the new components' `styled()` definitions, so they do not touch or depend on the app's MUI theme defaults (avoiding any visual regression in `Elements.jsx` if it's swapped back in).

## File Structure

- `src/Components/Elements.jsx` — **unchanged**. Existing MUI portfolio components remain exactly as they are.
- `src/Components/NewElements.jsx` — **new**. Exports: `NewHeader`, `NewHero`, `NewExperience`, `NewTechOrbit`, `NewProjects`, `NewContact`, `NewFooter`.
- `src/Config.jsx` — extended (not replaced):
  - Update `experiences` array with accurate resume data (see Content Mapping below).
  - Add `techStack` array: `{ name, Icon }` pairs using `react-icons` brand icons, derived from the existing `skills` array's tools.
  - Add a `SUMMARY` string (professional summary) and `OBJECTIVE` string (career objective) constant, both sourced verbatim/paraphrased from the resume.
  - Existing `projects` array is reused unmodified for the new Featured Projects grid.
- `src/App.jsx` — import switched from `./Components/Elements` to `./Components/NewElements`, rendering the new set by default.
- New dependency: `react-icons` (brand icons: `FaReact`, `FaNodeJs`, `SiMongodb`, `SiMysql`, `FaHtml5`, `FaWordpress`, `SiMagento`, `FaGithub`, `FaBitbucket`, `SiPostman`, `FaBootstrap`).

## Content Mapping (Resume → Sections)

**Hero**
- Greeting: "Hello! I Am Varinder Singh"
- Tagline: short line adapted from the resume's career objective (e.g., "A Full Stack Developer who builds impactful software solutions.")
- Typed/cycling headline: rotates through "I'm a Full Stack Developer.", "I'm a MERN Stack Developer.", "I'm a Team Lead." (looping via `setInterval`-driven state, styled with a blinking caret using an emotion `keyframes` animation).
- Current role line: "Currently, I'm a Full Stack Developer at UnleashX."
- Body paragraph: the resume's Professional Summary, verbatim.

**Work Experience** (4 cards, one per employer, in resume order — most recent first)
1. UnleashX — SDE-2 (Full Stack Developer) — Jan 2025–Present — highlight: "Building an AI-based web app with AI Agent and automation workflows."
2. Business Optima — Full Stack Developer / Team Lead — 2024–2025 — highlight: "Led a small team building Tecdemy, an education platform."
3. NetQuall Technologies — MERN Stack Developer — 2023–2025 — highlight: "Built modules for BirdDog, a CRM application."
4. Speedum Technologies — React Developer — June 2021–Oct 2023 — highlight: "Built dashboards and admin panels for HealthVault, a healthcare product."

Each card: role title, company + duration, one-line highlight. No "Learn More" button (nothing to link to — dropped per YAGNI).

**Tech Orbit**
- Central glowing badge (monogram "VS" or a code-bracket icon).
- Ring of icons from the new `techStack` config: ReactJS, NodeJS, MongoDB, MySQL, HTML/CSS, WordPress, Magento, GitHub, Bitbucket, Postman, Bootstrap — positioned around the ring via computed angles (`360 / count * index`), rotating continuously via CSS animation; icons counter-rotate to stay upright.
- Caption line above: adapted from the resume's career objective.

**Featured Projects**
- Card grid reusing the existing `projects` array from `Config.jsx` (8 projects: SafePharmacy, JyotiDham, Dentistree, Night Butterflies, Peace Arch Duty Free, Tecdemy, OurFair Field, Business Optima) — each card shows logo image, title, and a "View Project" link button, restyled to the dark/glow card treatment.

**Contact**
- Heading "Contact"
- Blurb adapted from the resume's career objective / summary.
- Email: `varinder2good@gmail.com` (mailto link)
- Social icons: GitHub, LinkedIn, WhatsApp, Instagram, Email — reusing the same links currently in `Footer` in `Elements.jsx`.

**Footer**
- Minimal copyright line: "© {year} Varinder Singh. All rights reserved." matching the dark theme.

## Testing / Verification

- Run `npm run dev`, visually confirm each new section renders without console errors and matches the intended dark/glow aesthetic at desktop and mobile widths.
- Confirm `Elements.jsx` is untouched and the app still builds if `App.jsx`'s import were reverted (spot-check, not required to actually revert).
- Run `npm run lint` to catch unused imports/syntax issues introduced by the new file.
