# AGENTS.md — OPÉRA landing page

Rules and conventions for AI agents working in this repository, with a focus on
**implementing Figma designs via the Figma Model Context Protocol (MCP)**.

> Source of truth for: stack, design tokens, component patterns, asset/icon
> handling, styling rules, and the design‑to‑code workflow.

---

## 0. TL;DR — non‑negotiable rules

1. **Stack is fixed.** Vite 6 + React 19 + TypeScript 5.8 (strict) + Tailwind CSS **v4** (`@tailwindcss/vite`). Do not add UI kits, CSS-in-JS, Sass, router, state library, Storybook, or a `tailwind.config.js`.
2. **All design tokens live in `src/index.css` inside `@theme`.** Reuse them. If a Figma value is missing, add a token deliberately — don't scatter arbitrary hex values.
3. **Style with Tailwind utilities in JSX.** No new global stylesheets, no `App.css`, no `@apply`-heavy abstractions.
4. **Components are plain function components in `src/App.tsx` today.** Extract to `src/components/` only when a pattern genuinely repeats.
5. **Assets are files in `src/assets/` imported as ESM URLs** and rendered with `<img>`. Icons are individual SVGs, not an icon font or sprite.
6. **The Figma output is a reference, not code to paste.** Map it onto the tokens and patterns below.
7. **`npm run build` must pass** (`tsc -b && vite build`) after every change.
8. **Never commit `dist/`, `node_modules/`, or `.tools/`** (already git‑ignored).

---

## 1. Design System Structure

### 1.1 Token definitions

**Location:** [`src/index.css`](src/index.css) — the `@theme` block (Tailwind v4
CSS‑first configuration). There is **no** `tailwind.config.js`,
`postcss.config.js`, or token transformation pipeline (no Style Dictionary, no
CSS‑in‑JS theme).

#### Colors

| Theme variable | Value | Generated utilities |
| --- | --- | --- |
| `--color-ink` | `#2b2b2b` | `text-ink`, `bg-ink`, `border-ink` |
| `--color-ink-soft` | `rgba(43,43,43,.66)` | `text-ink-soft`, `bg-ink-soft` |
| `--color-ink-muted` | `rgba(43,43,43,.44)` | `text-ink-muted`, `bg-ink-muted` |
| `--color-ink-faint` | `rgba(43,43,43,.86)` | `text-ink-faint`, `bg-ink-faint` |
| `--color-gold` | `#a8834a` | `text-gold`, `bg-gold`, `border-gold` |
| `--color-gold-soft` | `rgba(168,131,74,.33)` | `border-gold-soft`, `bg-gold-soft` |
| `--color-gold-line` | `rgba(168,131,74,.47)` | `border-gold-line` |
| `--color-cream` | `#f2efec` | `bg-cream` |
| `--color-cream-deep` | `#f4ece3` | `bg-cream-deep` |
| `--color-cream-soft` | `#fcfaf8` | `bg-cream-soft` |
| `--color-dark` | `#17130f` | `bg-dark`, `text-dark` |
| `--color-nav` | `#f7f7f7` | `bg-nav` |
| `--color-footer-ink` | `#283646` | `text-footer-ink` |
| `--color-ink-deep` | `#181510` | `text-ink-deep`, `bg-ink-deep` (Contact headings/button) |
| `--color-gold-deep` | `#af853f` | `text-gold-deep` (Contact accent) |
| `--color-clay` | `#4d443c` | `text-clay` (Contact body copy) |
| `--color-bronze` | `#82571f` | `text-bronze` (Contact field labels) |
| `--color-sand` | `#eae3da` | `border-sand`, `bg-sand` (Contact dividers) |
| `--color-sand-line` | `#e2d5c5` | `border-sand-line` (Contact input borders) |
| `--color-muted-warm` | `#84796e` | `text-muted-warm` (Contact placeholders) |

`white` / `black` come from Tailwind's defaults (`bg-white`, `text-black`, …).

#### Typography

| Theme variable | Value | Utility | Notes |
| --- | --- | --- | --- |
| `--font-sans` | `'Outfit', system-ui, sans-serif` | `font-sans` | Applied to `<body>` in `@layer base`. |
| `--font-display` | `'Cormorant Garamond', Georgia, serif` | `font-display` | Defined but **currently unused**. Don't switch the site to serif without a design decision. |

Fonts are loaded from Google Fonts in [`index.html`](index.html)
(`Outfit` 300/400/500/600/700; `Cormorant Garamond` 500/600 + italic 500).
There are no self‑hosted fonts.

#### Layout tokens

Defined in `@layer base :root` — **not** in `@theme`, so they generate **no**
spacing utilities. Use them through Tailwind's CSS‑variable shorthand.

| Variable | Value | Usage |
| --- | --- | --- |
| `--pad` | `clamp(1.25rem, 5vw, 5rem)` | Page gutter: `px-(--pad)` |
| `--max` | `1512px` | Content container: `max-w-(--max)` |

```tsx
<section className="relative mx-auto max-w-(--max) px-(--pad) pb-20 pt-24">
```

#### Motion tokens

```css
/* src/index.css */
@theme {
  --animate-twinkle: twinkle 3.2s ease-in-out infinite;
  --animate-rise: rise 0.9s ease both;
}
```

- `animate-twinkle` → decorative sparkles.
- `animate-rise` → entrance reveal; adjust per element with
  `[animation-delay:0.12s]`, `[animation-duration:1.1s]`.

#### Adding tokens

Add to the `@theme` block, following Tailwind namespaces so utilities are
generated automatically:

```css
@theme {
  --color-<name>: <value>;   /* → bg-/text-/border-<name> */
  --font-<name>: <stack>;    /* → font-<name> */
  --animate-<name>: <shorthand>;
}
```

Prefer extending the existing palette over creating near‑duplicates (e.g. don't
add `--color-cream-2`). If Figma uses a color role that maps to an existing
token, use the token.

---

### 1.2 Component library

- **Shared chrome lives in `src/components/`:** `SiteNav.tsx` (floating sticky
  pill + mobile two-row nav, `active: 'home' | 'about' | 'contact'`) and
  `SiteFooter.tsx` are reused by every page. Shared class strings
  (`btn`, `btnDark`, `btnWithIcon`) live in [`src/styles.ts`](src/styles.ts).
- **`SiteNav` owns its sticky positioning.** It renders a
  `sticky top-0 z-50 px-(--pad) pt-[1.6875rem]` wrapper, so mount it as the
  first child of the page root (no `<header>` wrapper): a short parent would
  confine the sticky range, and an `overflow-hidden` parent would break it.
  Anchor jumps are kept clear of it with `scroll-padding-top` on `html`
  (7rem desktop / 8.5rem below 780px).
- **Pages:** [`src/App.tsx`](src/App.tsx) is the landing page;
  [`src/pages/About.tsx`](src/pages/About.tsx) is the About page;
  [`src/pages/Contact.tsx`](src/pages/Contact.tsx) is the Contact page.
  `src/main.tsx` picks one from the current path.
- **Nav destinations are client routes**, not section anchors: `home → /`,
  `about us → /about`, `contact us → /contact`. Keep the hrefs in `SiteNav` as
  the single source of truth and pass the matching `active` key from each page.
  In-page anchors on the landing page stay plain (`#formula`, `#about`).
- Repeated visual patterns are **Tailwind class-string constants** at the top of
  `App.tsx` (or exported from `src/styles.ts`):

```tsx
const btn =
  'inline-flex items-center justify-center gap-2.5 rounded-[2.1875rem] px-[1.625rem] py-[1.0625rem] text-base font-normal capitalize transition-[transform,background-color,color] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]'
const btnDark = `${btn} bg-ink text-white hover:-translate-y-0.5 hover:bg-[#1a1a1a]`
const btnWithIcon = `${btnDark} [&>img]:h-6 [&>img]:w-6 [&>img]:rotate-180`
```

- Content collections are plain data arrays (`notes`, `acts`, `stats`) mapped to
  markup. Prefer this for anything that is a list of similar cards.

```tsx
{notes.map((note, i) => (
  <article key={note.title} className="...">
    <img src={note.icon} alt="" className="h-8 w-8" />
    <h3 className={i === 0 ? 'text-gold' : 'text-ink'}>{note.title}</h3>
    <p>{note.copy}</p>
  </article>
))}
```

- No Storybook, no component docs, no tests.
- Component architecture: **flat, section‑based**, single page with anchor links
  (`#top`, `#formula`, `#ritual` (unlinked), `#about`, `#footer`).

**When to extract a component:** if a block repeats 3+ times or is reused across
sections. Put new files in `src/components/` (create the folder) using
`PascalCase.tsx`, co‑locating any component‑specific types. Keep shared class
strings in `App.tsx` or a `src/styles.ts` helper.

---

### 1.3 Frameworks & libraries

| Concern | Choice | Config |
| --- | --- | --- |
| UI | React `^19.1.0` + `react-dom` | `src/main.tsx` (`createRoot`, `StrictMode`) |
| Language | TypeScript `~5.8.3`, strict | [`tsconfig.json`](tsconfig.json) |
| Bundler | Vite `^6.3.5` | [`vite.config.ts`](vite.config.ts) |
| React plugin | `@vitejs/plugin-react` `^4.4.1` | `vite.config.ts` |
| Styling | Tailwind CSS `^4.3.5` via `@tailwindcss/vite` | `vite.config.ts`, `src/index.css` |

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://isow-22.github.io/opera-finanal/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/opera-finanal/' : '/',
  plugins: [react(), tailwindcss()],
}))
```

TypeScript is strict with `noUnusedLocals`, `noUnusedParameters`,
`jsx: "react-jsx"`, `moduleResolution: "bundler"`, `noEmit: true` (Vite handles
emit). Scripts:

```bash
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build  → dist/
npm run preview  # serve the production build
```

**Do not** add a CSS framework/layer on top of Tailwind, a state manager, a
router, or an animation library. Motion is CSS keyframes.

---

### 1.4 Asset management

- **Source assets:** [`src/assets/`](src/assets) — imported as ES modules so Vite
  hashes them and emits to `dist/assets/`.

```tsx
import heroProduct from './assets/hero-product.png'
import iconVolume from './assets/icon-volume.svg'
```

- **Static/root assets:** [`public/`](public) (`favicon.svg`, `icons.svg`) — served
  from `/`, copied verbatim, **not** hashed. Only use `public/` when a URL must
  stay stable (favicon, `index.html` references).
- **Formats used:** PNG for photography/product renders; SVG for logos, icons,
  ornaments, dividers.
- **Optimization:** none configured — no image plugin, no `srcset`, no
  `loading="lazy"`, no CDN. Vite only does hashing/emitting. Google Fonts is the
  only CDN dependency.
- Raster assets present: `hero-product.png`, `ritual-product.png`,
  `about-arch.png`, `mascara-tube.png`.
- **Some assets are unused** (leftovers/reference exports): `glow-hero.svg`,
  `hero-wave.svg`, `hero.png`, `social-5.svg`, `social-6.svg`,
  `typescript.svg`, `vite.svg`, and `public/icons.svg`. Don't assume a file is
  wired up — check `App.tsx` imports.

**Figma asset rules:** export each image/icon into `src/assets/` with a
descriptive kebab‑case name; import it and render with `<img>`. Use `alt=""` for
decorative art and a meaningful `alt` for content/product imagery. Size images
with utilities (`w-full`, `w-[min(34rem,100%)]`), not inline styles.

---

### 1.5 Icon system

- Icons are **individual SVG files** in `src/assets/`, imported as URLs and
  rendered as `<img>` (not inline React SVG components, not an icon font, not a
  sprite for app icons).
- Naming conventions:

| Prefix / pattern | Purpose | Examples |
| --- | --- | --- |
| `icon-*.svg` | Feature icons (gold stroke, ~32px) | `icon-volume.svg`, `icon-definition.svg`, `icon-volume-badge.svg`, `icon-mail.svg`, `icon-phone.svg`, `icon-clock.svg` |
| `icon-*-badge.svg` | Circular gold outline badge behind an icon | `icon-mail-badge.svg` |
| `stat-*.svg` | Statistic badges (gold circle, 42px) | `stat-orders.svg`, `stat-visitors.svg`, `stat-satisfaction.svg` |
| `social-*.svg` | Social icons (40px) | `social-1.svg` … `social-4.svg` |
| `logo*.svg` | Brand marks | `logo.svg`, `logo-footer.svg`, `logo-footer-word.svg` |
| `sparkle-*.svg`, `frame-*.svg`, `divider.svg` | Decorative ornaments | `sparkle-1.svg`, `frame-corners.svg` |

- SVGs carry **hardcoded colors** (`#A8834A`, `#2B2B2B`, `white`) and inline
  `width`/`height`/`viewBox`. Sizing is overridden by utilities on the `<img>`.
- Social icons get `invert` when rendered on dark circles; feature icons are used
  as‑is.

```tsx
import iconVolume from './assets/icon-volume.svg'

<img src={iconVolume} alt="" className="h-8 w-8" />
```

**Figma icon rules:** export one SVG per icon into `src/assets/` as
`icon-<kebab-name>.svg`; import and render with `<img>`; size with utilities.
If an icon must inherit text color, either export it with `currentColor` and
inline it as a small React component (a new pattern — document it), or keep the
fixed‑color file convention. Do **not** reference `public/icons.svg`; it is an
unused symbol sprite.

---

### 1.6 Styling approach

- **Utility‑first Tailwind v4.** No CSS Modules, no styled‑components, no Sass.
- **Global styles** live only in [`src/index.css`](src/index.css):
  - `@import 'tailwindcss'`
  - `@theme` — tokens + keyframes
  - `@layer base` — `:root` layout vars, `html { scroll-behavior }`, body fonts,
    `img/a/button/ul` resets, `#root { min-height }`
  - Imported once from [`src/main.tsx`](src/main.tsx).
- There is no `App.css` (removed during the Tailwind migration).
- **Responsive strategy:** mobile‑first base utilities plus **max‑width
  variants** matching the design: `max-[1100px]:` (tablet) and `max-[780px]:`
  (mobile). Tailwind v4 compiles `max-[1100px]` to
  `@media not all and (min-width:1100px)`. Use these exact breakpoints unless a
  new design explicitly requires another.

| Breakpoint | Range | Variant | What changes |
| --- | --- | --- | --- |
| Desktop | `> 1100px` | *(base)* | 2‑column grids, absolutely positioned hero side columns, full nav |
| Tablet | `≤ 1100px` | `max-[1100px]:` | grids collapse to 1 column, hero side columns become static flow, ritual image moves first |
| Mobile | `≤ 780px` | `max-[780px]:` | mobile nav (hamburger + sheet), tighter radius/padding, 1‑column cards, stacked stats/footer |
| Small phones | `≤ 480px` | `max-[480px]:` | smaller nav icon buttons, hero title drops to `2.25rem` |

Mobile primitives introduced with the responsive pass (see [`src/App.tsx`](src/App.tsx)):

```tsx
// Nav switches to logo + cart + hamburger; centre links hidden
<nav className="... grid-cols-[1fr_auto_1fr] ... max-[780px]:grid-cols-[1fr_auto]">
  <ul className="flex justify-center gap-10 max-[780px]:hidden">…</ul>
  <a className={`${btnDark} max-[780px]:hidden`} href="#formula">shop now</a>
  <button className="hidden ... max-[780px]:grid" aria-controls="mobile-menu">…</button>
</nav>

// Conditional sheet, rendered only while open (state: useState)
{menuOpen && (
  <div id="mobile-menu" className="absolute left-0 right-0 top-full z-20 mt-3 hidden grid-cols-1 gap-1 rounded-[1.6rem] border border-gold-soft bg-white p-3 shadow-[0_18px_45px_rgba(43,43,43,0.14)] max-[780px]:grid">
    <a href="#about" onClick={() => setMenuOpen(false)} className={mobileLink}>about us</a>
  </div>
)}

// Desktop-absolute blocks become normal flow on small screens
<div className="absolute left-(--pad) top-[48%] z-[4] max-w-[21rem] max-[1100px]:static max-[1100px]:mt-6 max-[1100px]:max-w-none max-[780px]:mt-8 max-[780px]:text-center">
```

Rules for mobile work:

- **Don't** duplicate markup for mobile — add `max-[…]:` overrides to the same
  element, or make the class string conditional.
- Any `absolute` placement must gain a `max-[1100px]:static` (or equivalent)
  escape hatch so the mobile flow does not overlap.
- Keep tap targets ≥ `3rem` square and keep `aria-label` on icon‑only buttons;
  the hamburger toggles `aria-expanded` and `aria-controls="mobile-menu"`.
- Hide, don't reflow, the desktop centre nav on mobile; the sheet is the mobile
  navigation.
- Vertical rhythm: shrink section padding with `max-[780px]:pt-16` /
  `max-[780px]:pb-14` rather than rewriting the layout.
- **Arbitrary values are normal here** for pixel‑accurate design fidelity:
  `text-[clamp(...)]`, `rounded-[4.8rem]`, `w-[min(34rem,100%)]`,
  `bg-[linear-gradient(...)]`, `drop-shadow-[...]`.
- **CSS variables:** use the v4 shorthand `px-(--pad)`, `max-w-(--max)` (not
  `px-[var(--pad)]`).

#### Key patterns

Page gutter + container:

```tsx
<header className="relative isolate min-h-[min(100vh,64rem)] overflow-hidden rounded-b-[4.8rem] bg-[linear-gradient(180deg,#ffffff_0%,#f2efec_100%)] px-(--pad) pb-14 pt-[1.625rem]">
```

Gradient text (hero title):

```tsx
<h1 className="bg-[linear-gradient(82deg,#2b2b2b_0%,#282828_42%,#7f6844_66%,#3a3838_97%)] bg-clip-text text-transparent">
```

Pseudo‑element decoration (product card glow):

```tsx
<article className="... before:absolute before:bottom-[-35%] before:left-[15%] before:right-[-10%] before:h-[70%] before:rounded-full before:bg-[radial-gradient(circle,rgba(168,131,74,0.35),transparent_65%)] before:content-['']">
```

Responsive two‑column → stacked:

```tsx
<div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-stretch gap-6 max-[1100px]:grid-cols-1">
```

Reveal animation:

```tsx
const revealDelay = 'animate-rise [animation-delay:0.12s]'
<p className={`${revealDelay} m-0 uppercase`}>Make Every Blink a</p>
```

#### ⚠️ Tailwind class‑order pitfall

Conflicting utilities on one element are resolved by **generated CSS order, not
JSX order**. Always make state‑dependent classes mutually exclusive:

```tsx
// ❌ white text can land on a white background
className={`bg-white ${act.active ? 'bg-black text-white' : ''}`}

// ✅ only one background utility is ever emitted
className={act.active ? 'bg-black text-white' : 'bg-white'}
```

This exact bug occurred on the active "act" card during the Tailwind migration.

---

### 1.7 Project structure

```
opera-finanal/
├─ index.html              # single entry (document shell, fonts, favicon, #root)
├─ README.md               # local dev + GitHub Pages deploy notes
├─ package.json            # scripts + deps
├─ vite.config.ts          # react + tailwind plugins, production base
├─ tsconfig.json           # app (src) TS config
├─ tsconfig.node.json      # vite.config TS config
├─ .github/workflows/
│  └─ deploy.yml           # builds dist/ and deploys it to Pages
├─ public/                 # static, copied verbatim into dist/
│  ├─ 404.html             # SPA deep-link fallback for GitHub Pages
│  ├─ .nojekyll
│  ├─ favicon.svg
│  └─ icons.svg            # unused symbol sprite
└─ src/
   ├─ main.tsx             # createRoot + Root: maps path → App / About / Contact
   ├─ router.tsx           # History-API shim: Link, usePath, navigate
   ├─ App.tsx              # landing page sections + data arrays
   ├─ styles.ts            # shared btn/btnDark/btnWithIcon class strings
   ├─ components/          # SiteNav.tsx, SiteFooter.tsx (shared chrome)
   ├─ pages/               # About.tsx (brand/legal info), Contact.tsx
   ├─ index.css            # @import tailwind, @theme tokens, base layer
   ├─ vite-env.d.ts
   └─ assets/              # images + SVG icons/logos (Vite‑imported)
```

- **Pattern:** one entry, client-side routes, section-based landing. Landing
  sections in order: Hero (`header`) → Formula (`#formula`) → Ritual (`#ritual`)
  → About (`#about`) → Footer (`#footer`). The About page reuses `SiteNav` /
  `SiteFooter` around a title + brand lockup + dense spec column; the Contact
  page reuses them around a two-column intro + form layout.
- **Routing (no router package):** `src/router.tsx` wraps the History API in
  ~100 lines — `usePath` subscribes with `useSyncExternalStore`, `navigate` does
  `pushState` + scroll, and `Link` intercepts plain left-clicks (modifier
  clicks still open a new tab). App routes are `/`, `/about`, `/contact`;
  `router.tsx` prefixes them with `import.meta.env.BASE_URL` (`/` in dev,
  `/opera-finanal/` in the Pages build), and legacy `/about.html` /
  `/contact.html` links are rewritten with `replaceState`.
- **Pages fallback:** GitHub Pages has no SPA rewrite, so `public/404.html`
  bounces deep links through `/?/about` and the inline script in `index.html`
  restores the clean path before React boots. Vite dev/preview handle the
  fallback themselves.
- **State:** none. No hooks/state/context beyond React itself.
- **Naming:** files kebab‑case for assets, PascalCase for components/pages. CSS utilities are Tailwind‑canonical; theme tokens use
  `--color-*`/`--font-*`/`--animate-*`.
- **Build artifacts:** `dist/` and `tsconfig.tsbuildinfo` are generated; don't
  hand‑edit them.

---

## 2. Figma MCP workflow (design → code)

The Figma MCP server is available as `tools["figma"]` inside `execute`. Follow
this sequence.

### 2.1 Session setup

1. Extract `fileKey` (and `nodeId`, converting `-` → `:` in the URL) from the
   `figma.com/design/:fileKey/:fileName?node-id=:nodeId` URL.
2. Call `create_session({ fileKey, description })` **before any file tool** —
   including read‑only work.
3. Reuse the returned `sessionId` on every subsequent file tool for the task.

### 2.2 Read the design

1. **Load the `/figma-design-to-code` skill first** (required before
   `get_design_context`).
2. Call `get_design_context({ fileKey, nodeId, sessionId })` — this is the
   primary source. Its output is a **reference to adapt**, not final code.
3. Use `get_screenshot` for visual confirmation and `get_metadata` to understand
   layering/constraints when needed.
4. If the file uses a shared library, run `search_design_system` /
   `get_libraries` after `create_session` to prefer existing components and
   variables.

### 2.3 Adapt, don't paste

- Replace Figma colors with existing `@theme` tokens (`text-gold`, `bg-cream`,
  …). Add a token only when no existing one fits.
- Replace Figma text styles with `font-sans` + Tailwind size/weight utilities;
  match the original's `uppercase`/`capitalize` treatment.
- Convert auto‑layout to `flex` / `grid` + `gap`.
- Convert constraints to `max-[1100px]:` / `max-[780px]:` variants.
- Convert effects to `shadow-[...]` / `drop-shadow-[...]` / arbitrary gradients.
- Implement variants/states with conditional class strings (never two competing
  utilities).
- Export images/icons to `src/assets/` and import them; don't hotlink Figma URLs.

### 2.4 Verify

1. `npm run build` — TypeScript (strict) and Vite must pass.
2. `npm run dev`, then check the page at **>1100px**, **780–1100px**, and
   **≤780px**.
3. Confirm no console errors and that tokens (colors/fonts/spacing) match the
   design at each breakpoint.

---

## 3. Figma → code mapping cheat sheet

| Figma concept | Implement as |
| --- | --- |
| Color variable / fill style | Existing `--color-*` token → `bg-*`, `text-*`, `border-*` |
| Text style | `font-sans`/`font-display` + `text-[size]`, `font-*`, `uppercase`/`capitalize`, `tracking-*`, `leading-*` |
| Auto layout (row/column) | `flex`, `grid`, `gap-*`, `items-*`, `justify-*` |
| Padding / gap | Tailwind spacing scale (`p-6`, `gap-4`) or `px-(--pad)` for page gutters |
| Corner radius | `rounded-[value]`; pills `rounded-full` |
| Drop shadow | `shadow-[...]`, `drop-shadow-[...]` |
| Gradient fill | `bg-[linear-gradient(...)]` / `bg-[radial-gradient(...)]`; text gradients add `bg-clip-text text-transparent` |
| Blend/opacity | `opacity-*`, color alpha (`text-white/62`) |
| Absolute positioning | `absolute` + `inset/top/left/...` + `z-[n]` |
| Constraints / responsive | Base utilities + `max-[1100px]:` / `max-[780px]:` |
| Boolean/variant properties | Conditional class strings / props (mutually exclusive) |
| Decorative overlay | `before:` / `after:` + `before:content-['']` |
| Icon | Export SVG → `src/assets/icon-*.svg` → `<img src={...} className="h-* w-*" />` |
| Image | Export PNG/SVG → `src/assets/` → `<img>` with `alt` and width utilities |
| Prototype animation | CSS `@theme` `--animate-*` + `@keyframes`, applied with `animate-*` |

---

## 4. Do / Don't

**Do**

- Keep design tokens centralized in `@theme`.
- Reuse `--pad`, `--max`, and the color/typography tokens.
- Use arbitrary values when they preserve pixel fidelity.
- Use `max-[1100px]:` / `max-[780px]:` for responsiveness.
- Use conditional class strings for stateful styles.
- Import assets from `src/assets/`.
- Keep semantic HTML: `header`, `nav`, `section`, `footer`; `alt` text;
  `aria-label` on icon‑only buttons; `role="list"` where lists are divs.
- Run `npm run build` before finishing.

**Don't**

- Add `tailwind.config.js` / `postcss.config.js` (Tailwind v4 is CSS‑first).
- Add a UI kit, CSS-in-JS, Sass, icon font, animation library, router, or state
  library.
- Create new global CSS files or reintroduce `App.css`.
- Scatter one‑off hex colors when a token exists.
- Put two conflicting utilities on the same element.
- Inline Figma URLs as image `src`.
- Paste Figma‑generated HTML/CSS wholesale.
- Assume unused asset files are wired up — verify imports.
- Edit generated files (`dist/`, `tsconfig.tsbuildinfo`).

---

## 5. Quick reference

```bash
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview  # production preview
```

Key files:

- Tokens/globals: [`src/index.css`](src/index.css)
- Page/component patterns: [`src/App.tsx`](src/App.tsx)
- Entry: [`src/main.tsx`](src/main.tsx)
- Build config: [`vite.config.ts`](vite.config.ts)
- HTML shell/fonts: [`index.html`](index.html)
- Assets/icons: [`src/assets/`](src/assets)

---

## 6. Deployment (GitHub Pages)

Live at <https://isow-22.github.io/opera-finanal/> (repo `IsoW-22/opera-finanal`).

- `vite.config.ts` sets `base: '/opera-finanal/'` **only for `vite build`**; the
  dev server stays on `/`.
- `src/router.tsx` prefixes app routes with `import.meta.env.BASE_URL`, so
  `/about` resolves to `/opera-finanal/about` in production without changing any
  call site.
- Deep links work on Pages through `public/404.html` → `/?/about` → the inline
  restore script in `index.html` (Pages has no SPA rewrite). `segmentsToKeep` in
  `404.html` is the repo-name segment count.
- `.github/workflows/deploy.yml` runs `npm ci && npm run build` and publishes
  `dist/` via `actions/deploy-pages`. Enable it once with
  **Settings → Pages → Source: GitHub Actions**.
- If the repo is renamed, update `base` in `vite.config.ts`, `segmentsToKeep`
  in `public/404.html`, and the URL in [`README.md`](README.md).
