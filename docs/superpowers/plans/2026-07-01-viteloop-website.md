# Viteloop Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. During implementation, the `frontend-design` skill governs visual quality.

**Goal:** Build a premium, dark-first, enterprise-grade multi-page marketing website for Viteloop (infrastructure *software*, not services) on the existing TanStack Start scaffold.

**Architecture:** A shared chrome (animated `SiteHeader` + `SiteFooter`) wraps every file-based route. All copy/structure data lives in typed modules under `src/data/` (single source of truth). Pages compose isolated section components, which compose visual + UI primitives. Theme is a `.dark`/`.light` class on `<html>` set by a tiny render-blocking script in `<head>` (no flash). Animation is CSS/SVG-only (no Framer Motion); scroll reveals use one `IntersectionObserver` hook that respects `prefers-reduced-motion`.

**Tech Stack:** TanStack Start (React 19), Vite, Tailwind CSS v4 (`@theme` + CSS vars), shadcn primitives, lucide-react, Biome, Vitest. Fonts: Inter + JetBrains Mono.

**Verification model:** Per task — `pnpm check` (Biome) + `pnpm build` (typecheck/SSR build) must pass; visual tasks add a Playwright screenshot pass. Two Vitest tests guard the theme helper and data integrity. Commit only when the user requests git operations (this repo has no commits yet); otherwise leave the working tree as-is and report completion.

---

## File Structure

```
public/
  theme-init.js                   # CREATE: render-blocking no-flash theme setter
src/
  styles.css                      # MODIFY: replace lagoon theme with Viteloop dark-first tokens
  routes/
    __root.tsx                    # MODIFY: shell + chrome + theme-init <script> + meta + 404
    index.tsx                     # MODIFY: Home (showpiece)
    products.index.tsx            # CREATE: products overview
    products.$slug.tsx            # CREATE: product detail template
    solutions.tsx                 # CREATE
    developers.tsx                # CREATE
    docs.tsx                      # CREATE: docs shell (sidebar layout + landing)
    blog.tsx                      # CREATE: blog index
    company.tsx                   # CREATE
    careers.tsx                   # CREATE
    contact.tsx                   # CREATE: demo request form
    status.tsx                    # CREATE
    privacy.tsx                   # CREATE
    terms.tsx                     # CREATE
  data/
    site.ts                       # CREATE: brand constants (name, tagline, github, links)
    nav.ts                        # CREATE: header/footer nav model
    products.ts                   # CREATE: 8 products (+ detail content)
    benefits.ts                   # CREATE: 10 core benefits
    customers.ts                  # CREATE: 10 customer types
    solutions.ts                  # CREATE: solution narratives by customer type
    __tests__/data.test.ts        # CREATE: data integrity test
  components/
    site/
      logo.tsx                    # CREATE
      theme-toggle.tsx            # CREATE
      site-header.tsx             # CREATE (product mega-menu, theme toggle, GitHub, mobile)
      site-footer.tsx             # CREATE
    sections/
      hero.tsx                    # CREATE
      trust-strip.tsx             # CREATE
      product-grid.tsx            # CREATE
      benefits.tsx                # CREATE
      deploy-anywhere.tsx         # CREATE
      problems.tsx                # CREATE
      architecture.tsx            # CREATE
      developer-teaser.tsx        # CREATE
      cta-band.tsx                # CREATE
    visuals/
      grid-backdrop.tsx           # CREATE: ambient dot/line grid + glow
      glow-mesh.tsx               # CREATE: radial accent glows
      edge-network.tsx            # CREATE: animated SVG hero centerpiece
      region-map.tsx              # CREATE: multi-region orchestration diagram
      arch-diagram.tsx            # CREATE: layered architecture diagram
    primitives/
      container.tsx               # CREATE: width-constrained wrapper
      section.tsx                 # CREATE: <Section>/<SectionHeading>/<Kicker>/<Lead>
      reveal.tsx                  # CREATE: scroll-reveal wrapper using useReveal
    ui/                           # shadcn primitives added on demand (button, badge)
  hooks/
    use-reveal.ts                 # CREATE: IntersectionObserver hook (reduced-motion aware)
  lib/
    utils.ts                      # EXISTING: cn()
    theme.ts                      # CREATE: theme types + get/set helpers
    __tests__/theme.test.ts       # CREATE: theme helper test
```

---

## Task 1: Design tokens, fonts, and global styles

**Files:**
- Modify: `src/styles.css` (full replace of the token/body block)

- [ ] **Step 1: Replace `styles.css`**

Replace the entire file. Keep `@import 'tailwindcss';`, `@plugin '@tailwindcss/typography';`, `@import 'tw-animate-css';`, and `@custom-variant dark`. Swap the Google Fonts import to Inter + JetBrains Mono. Replace all lagoon tokens with the Viteloop dark-first system below; dark is the default, light overrides under `.light`.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
@import 'tailwindcss';
@plugin '@tailwindcss/typography';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

/* DARK (default) */
:root,
.dark {
  --bg: #07080d;            /* near-black blue-slate */
  --bg-soft: #0b0d15;
  --surface: rgba(20, 23, 34, 0.72);
  --surface-strong: rgba(24, 28, 42, 0.9);
  --line: rgba(255, 255, 255, 0.09);
  --line-strong: rgba(255, 255, 255, 0.16);
  --fg: #eef1f8;
  --fg-muted: #9aa3b8;
  --fg-faint: #69728a;
  --accent: #4f7cff;        /* electric blue */
  --accent-2: #9b6bff;      /* violet */
  --data: #38e1d6;          /* cyan data flow */
  --glow-a: rgba(79, 124, 255, 0.22);
  --glow-b: rgba(155, 107, 255, 0.16);
  --grid-line: rgba(255, 255, 255, 0.05);
  --shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6);
}

/* LIGHT */
.light {
  --bg: #f7f8fc;
  --bg-soft: #eef1f8;
  --surface: rgba(255, 255, 255, 0.86);
  --surface-strong: rgba(255, 255, 255, 0.96);
  --line: rgba(10, 14, 30, 0.1);
  --line-strong: rgba(10, 14, 30, 0.18);
  --fg: #0c1020;
  --fg-muted: #4a5268;
  --fg-faint: #717a90;
  --accent: #3f63e8;
  --accent-2: #7c4dff;
  --data: #119e95;
  --glow-a: rgba(63, 99, 232, 0.12);
  --glow-b: rgba(124, 77, 255, 0.1);
  --grid-line: rgba(10, 14, 30, 0.05);
  --shadow: 0 24px 48px -24px rgba(20, 30, 70, 0.25);
}

@theme inline {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --color-bg: var(--bg);
  --color-bg-soft: var(--bg-soft);
  --color-surface: var(--surface);
  --color-surface-strong: var(--surface-strong);
  --color-line: var(--line);
  --color-line-strong: var(--line-strong);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-fg-faint: var(--fg-faint);
  --color-accent: var(--accent);
  --color-accent-2: var(--accent-2);
  --color-data: var(--data);
  --radius: 0.9rem;
}

html { color-scheme: dark; }
html.light { color-scheme: light; }

body {
  margin: 0;
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

::selection { background: color-mix(in oklab, var(--accent) 40%, transparent); }

.font-mono { font-family: var(--font-mono); }

.kicker {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--accent) 70%, var(--fg));
}

.accent-gradient {
  background: linear-gradient(100deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.glass {
  background: linear-gradient(165deg, var(--surface-strong), var(--surface));
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
}

.hairline { border: 1px solid var(--line); }

/* scroll reveal */
.reveal { opacity: 0; transform: translateY(16px); }
.reveal.is-in {
  opacity: 1;
  transform: none;
  transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* animated network/data-flow primitives */
@keyframes dash-flow { to { stroke-dashoffset: -240; } }
@keyframes node-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
@keyframes float-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; }
  *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
}

.prose pre { border: 1px solid var(--line); border-radius: 12px; background: #0a0c14; color: #e8efff; }
code:not(pre code) {
  font-family: var(--font-mono);
  font-size: 0.85em;
  border: 1px solid var(--line);
  background: var(--bg-soft);
  border-radius: 6px;
  padding: 2px 6px;
}

@layer base {
  * { border-color: var(--line); }
}
```

- [ ] **Step 2: Verify Biome + build**

Run: `pnpm check && pnpm build`
Expected: PASS (no CSS parse errors; build completes).

---

## Task 2: Theme system (no-flash) + helper test

**Files:**
- Create: `src/lib/theme.ts`
- Create: `public/theme-init.js`
- Create: `src/lib/__tests__/theme.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/__tests__/theme.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { applyTheme, resolveInitialTheme, THEME_KEY } from '#/lib/theme'

describe('theme helpers', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    localStorage.clear()
  })

  it('defaults to dark when nothing stored', () => {
    expect(resolveInitialTheme()).toBe('dark')
  })

  it('honors a stored preference', () => {
    localStorage.setItem(THEME_KEY, 'light')
    expect(resolveInitialTheme()).toBe('light')
  })

  it('applyTheme toggles the html class and persists', () => {
    applyTheme('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem(THEME_KEY)).toBe('light')
    applyTheme('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
  })
})
```

- [ ] **Step 2: Run test, verify it fails**

Run: `pnpm vitest run src/lib/__tests__/theme.test.ts`
Expected: FAIL (`#/lib/theme` not found).

- [ ] **Step 3: Implement `src/lib/theme.ts`**

```ts
export type Theme = 'dark' | 'light'
export const THEME_KEY = 'viteloop-theme'

export function resolveInitialTheme(): Theme {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  }
  return 'dark' // dark-first
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {}
}
```

- [ ] **Step 4: Create `public/theme-init.js`** (render-blocking, runs before paint — must use the SAME storage key `viteloop-theme`)

```js
(function () {
  try {
    var t = localStorage.getItem('viteloop-theme');
    if (t !== 'light' && t !== 'dark') t = 'dark';
    document.documentElement.classList.add(t);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
```

- [ ] **Step 5: Run test, verify PASS**

Run: `pnpm vitest run src/lib/__tests__/theme.test.ts`
Expected: PASS (3 tests).

---

## Task 3: Brand constants + data layer + data integrity test

**Files:**
- Create: `src/data/site.ts`, `src/data/nav.ts`, `src/data/products.ts`, `src/data/benefits.ts`, `src/data/customers.ts`, `src/data/solutions.ts`
- Create: `src/data/__tests__/data.test.ts`

- [ ] **Step 1: `src/data/site.ts`**

```ts
export const SITE = {
  name: 'Viteloop',
  tagline: 'Powering the Next Internet.',
  description:
    'Viteloop provides enterprise software for organizations building private CDN platforms, media infrastructure, edge networks, and cloud-native services. Deploy in your own environment with complete ownership and control.',
  github: 'https://github.com/viteloop',
  email: 'hello@viteloop.com',
} as const
```

- [ ] **Step 2: `src/data/products.ts`** — typed list of all 8 products with detail content. Names/taglines are taken verbatim from the brief.

```ts
import type { LucideIcon } from 'lucide-react'
import { Globe, PlayCircle, Cpu, ShieldCheck, Receipt, Database, Network, Waypoints } from 'lucide-react'

export interface Product {
  slug: string
  short: string
  name: string
  tagline: string
  summary: string
  icon: LucideIcon
  features: string[]
  highlights: { label: string; value: string }[]
}

export const PRODUCTS: Product[] = [
  { slug: 'cdn', short: 'CDN', name: 'Viteloop CDN', icon: Globe,
    tagline: 'Private CDN software for high-performance content delivery.',
    summary: 'Run your own globally distributed content delivery network on infrastructure you own — full cache control, real-time analytics, and programmable edge logic without per-GB vendor pricing.',
    features: ['Tiered & request-collapsed caching', 'Programmable edge rules', 'Instant global purge', 'TLS, HTTP/3 & Brotli', 'Real-time logs & analytics', 'Origin shielding'],
    highlights: [{ label: 'Cache hit ratio', value: '99.4%' }, { label: 'Edge POPs', value: 'Unlimited' }, { label: 'Config propagation', value: '<5s' }] },
  // Fill the remaining 7 with the same shape and real, specific copy:
  //  stream      (PlayCircle, 'Viteloop Stream',      'Complete VOD and live streaming software.')
  //  transcoder  (Cpu,        'Viteloop Transcoder',  'Distributed video transcoding powered by AI.')
  //  drm         (ShieldCheck,'Viteloop DRM',         'Content protection and license management.')
  //  billing     (Receipt,    'Viteloop Billing',     'Usage-based billing and subscriptions.')
  //  storage     (Database,   'Viteloop Storage',     'Object storage software for large-scale deployments.')
  //  edge        (Network,    'Viteloop Edge',        'Distributed edge platform.')
  //  gateway     (Waypoints,  'Viteloop Gateway',     'API gateway and traffic management.')
]

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
```
Fill all 8 entries (3–6 features, exactly 3 highlights each).

- [ ] **Step 3: `src/data/benefits.ts`** — `BENEFITS: { title, blurb, icon: LucideIcon }[]`, 10 entries from the brief: Self-hosted, Cloud Agnostic, Multi-Cloud, Kubernetes Native, API First, Open Architecture, High Performance, Scalable, Enterprise Ready, Developer Friendly. One engineering-focused sentence each.

- [ ] **Step 4: `src/data/customers.ts`** — `CUSTOMERS: { name, blurb }[]`, 10 entries: Hosting Providers, ISPs, Telecom Operators, Enterprises, Governments, Streaming Platforms, SaaS Companies, Cloud Providers, Media Companies, System Integrators.

- [ ] **Step 5: `src/data/solutions.ts`** — `SOLUTIONS: { title, problem, outcome, products: string[] }[]` mapping the 6 customer problems (Avoid vendor lock-in, Maintain full ownership, Deploy anywhere, Scale globally, Integrate with your environment, Customize every component) to relevant product slugs.

- [ ] **Step 6: `src/data/nav.ts`** — `HEADER_NAV` (Products [mega-menu over PRODUCTS], Solutions, Developers, Docs, Blog, Company) and `FOOTER_COLUMNS` covering every brief footer link, grouped:
  - **Product:** Products, Solutions, Status
  - **Developers:** Documentation, Developers, GitHub
  - **Company:** Company, Careers, Contact, Blog
  - **Legal:** Privacy, Terms
  Each link `{ label, to | href }` (internal `to` for routes, external `href` for GitHub).

- [ ] **Step 7: Write data integrity test**

```ts
// src/data/__tests__/data.test.ts
import { describe, it, expect } from 'vitest'
import { PRODUCTS, getProduct } from '#/data/products'
import { BENEFITS } from '#/data/benefits'
import { CUSTOMERS } from '#/data/customers'

describe('data layer', () => {
  it('has exactly 8 products with unique slugs', () => {
    expect(PRODUCTS).toHaveLength(8)
    expect(new Set(PRODUCTS.map((p) => p.slug)).size).toBe(8)
  })
  it('every product has >=3 features and exactly 3 highlights', () => {
    for (const p of PRODUCTS) {
      expect(p.features.length).toBeGreaterThanOrEqual(3)
      expect(p.highlights).toHaveLength(3)
    }
  })
  it('getProduct resolves by slug', () => {
    expect(getProduct('cdn')?.name).toBe('Viteloop CDN')
    expect(getProduct('nope')).toBeUndefined()
  })
  it('has 10 benefits and 10 customer types', () => {
    expect(BENEFITS).toHaveLength(10)
    expect(CUSTOMERS).toHaveLength(10)
  })
})
```

- [ ] **Step 8: Run, verify PASS**

Run: `pnpm vitest run src/data/__tests__/data.test.ts`
Expected: PASS (4 tests).

---

## Task 4: Layout primitives + reveal hook + button/badge

**Files:**
- Create: `src/hooks/use-reveal.ts`, `src/components/primitives/container.tsx`, `src/components/primitives/section.tsx`, `src/components/primitives/reveal.tsx`
- Add: `src/components/ui/button.tsx`, `src/components/ui/badge.tsx`

- [ ] **Step 1: `use-reveal.ts`** — `useReveal<T extends HTMLElement = HTMLDivElement>()` returns a ref. In a `useEffect`: if `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, add `is-in` immediately; else one `IntersectionObserver` (threshold 0.15, rootMargin `0px 0px -10% 0px`) that adds `is-in` once then unobserves. Guard `typeof window`.

- [ ] **Step 2: `reveal.tsx`** — `<Reveal delay={0} className>` renders a `div.reveal` with the hook ref and inline `transitionDelay`.

- [ ] **Step 3: `container.tsx`** — `<Container className>` = `mx-auto w-full max-w-[1200px] px-6`.

- [ ] **Step 4: `section.tsx`** — `Section` (`<section className="py-24 md:py-32">` + optional `id`), `Kicker` (`<p className="kicker">` with a leading accent dot), `SectionHeading` (`text-3xl md:text-5xl font-semibold tracking-tight`, children may include an `.accent-gradient` span), `Lead` (`text-lg text-fg-muted max-w-2xl`).

- [ ] **Step 5: Add button + badge**

Run: `pnpm dlx shadcn@latest add button badge --yes`. If the non-interactive add fails, hand-write a CVA `button.tsx`/`badge.tsx` using `cn()` and aliases from `components.json`. Restyle button variants for Viteloop: `default`/`primary` = `.accent-gradient` background + white text + accent glow on hover (`shadow-[0_8px_30px_var(--glow-a)]`); `outline` = `.glass` + hairline; `ghost`; sizes `sm`/`default`/`lg`.

- [ ] **Step 6: Verify**

Run: `pnpm check && pnpm build`
Expected: PASS.

---

## Task 5: Ambient + animated visuals

**Files:**
- Create: `src/components/visuals/grid-backdrop.tsx`, `glow-mesh.tsx`, `edge-network.tsx`, `region-map.tsx`, `arch-diagram.tsx`

- [ ] **Step 1: `grid-backdrop.tsx`** — `aria-hidden`, `pointer-events-none` absolute layer: CSS dot+line grid via `linear-gradient` using `--grid-line` at `32px` spacing, masked with a radial gradient so it fades at edges. Accepts `className` for positioning.

- [ ] **Step 2: `glow-mesh.tsx`** — `aria-hidden` absolute layer with 2–3 large blurred radial gradients using `--glow-a`/`--glow-b`; optional slow `float-slow` animation. Accepts `className`.

- [ ] **Step 3: `edge-network.tsx`** — the signature hero visual. Responsive `<svg viewBox="0 0 600 480" role="img" aria-hidden>`:
  - `<defs>` with `<linearGradient>`/`<radialGradient>` from accent tokens.
  - A faint globe/longitude framing (arcs/ellipses).
  - A central "core" emblem (concentric rings, gradient stroke) = the customer's own control plane.
  - ~12 region **nodes** (`<circle r=3.5>`) positioned around the core, each with `node-pulse` animation and staggered `animationDelay` (inline style).
  - **Edges**: `<path>` curves from core to each node, `stroke="url(#flow)"`, `strokeDasharray="6 10"`, `animation: dash-flow 3s linear infinite` (varied delays) to read as flowing traffic.
  - Small mono region labels optional. All animation CSS/SMIL; reduced-motion handled globally.

- [ ] **Step 4: `region-map.tsx`** — abstract node-lattice "world" with a few highlighted regions linked by animated `dash-flow` paths; mono labels `us-east`, `eu-west`, `ap-south`, `sa-east`. Conveys multi-region orchestration. `aria-hidden`.

- [ ] **Step 5: `arch-diagram.tsx`** — layered stack as bordered `.glass` rows (top→bottom: **Edge / Control Plane / Data Plane / Your Cloud**) with connective lines and small product chips per layer, showing how Viteloop composes inside the customer's environment.

- [ ] **Step 6: Verify**

Run: `pnpm check && pnpm build`
Expected: PASS.

---

## Task 6: Site chrome (header, footer, logo, theme toggle) + root wiring

**Files:**
- Create: `src/components/site/logo.tsx`, `theme-toggle.tsx`, `site-header.tsx`, `site-footer.tsx`
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: `logo.tsx`** — inline SVG mark (an orbit/loop glyph in accent gradient) + "Viteloop" wordmark. `size` prop. Decorative SVG `aria-hidden`, with an `sr-only` "Viteloop" when used as the home link.

- [ ] **Step 2: `theme-toggle.tsx`** — `'use client'`-style interactive button (Sun/Moon from lucide). Track `mounted` (set true in `useEffect`) and read current theme from `document.documentElement.classList`. Render a neutral placeholder icon until `mounted` to avoid hydration mismatch. `onClick` flips via `applyTheme` from `#/lib/theme`. `aria-label="Toggle theme"`.

- [ ] **Step 3: `site-header.tsx`** — sticky `top-0 z-50`, `.glass` border-bottom, becomes more opaque after scroll (track `scrollY > 8`). `Container` row: left `Logo`→`/`; nav links from `HEADER_NAV`; **Products** opens a hover/focus mega-menu (grid of 8 products: icon + name + short tagline → `/products/$slug`). Right: GitHub icon link (`SITE.github`), `ThemeToggle`, primary `Button` "Request Demo" → `/contact`. Mobile (`< lg`): hamburger toggles a full-width panel listing all nav + products; Esc closes; focus-visible rings. Use TanStack Router `<Link>` with `activeProps` for active state.

- [ ] **Step 4: `site-footer.tsx`** — top: `Logo` + tagline + GitHub link. Columns from `FOOTER_COLUMNS` (Product / Developers / Company / Legal) covering all brief links. Bottom bar: `© 2026 Viteloop`, mono tagline "Infrastructure software, not services.", and Privacy/Terms links.

- [ ] **Step 5: Modify `__root.tsx`**
  - Update `head()` meta: title `Viteloop — Powering the Next Internet`, `description` from `SITE`, `theme-color`, basic `og:title`/`og:description`/`og:type`; keep the stylesheet link.
  - In `RootDocument`'s `<head>` JSX, add `<script src="/theme-init.js" />` as the FIRST child of `<head>` (before `<HeadContent/>`) so it runs render-blocking, pre-paint — this sets `.dark`/`.light` and prevents FOUC. (External file → no inline-HTML injection.)
  - `<body className="min-h-screen flex flex-col">`: render `<GlowMesh className="fixed inset-0 -z-10" />`, `<SiteHeader/>`, `<main className="flex-1">{children}</main>`, `<SiteFooter/>`. Keep `<Scripts/>` and dev-only devtools.
  - Add `notFoundComponent` (see Task 13.5) — stub now, fill later.

- [ ] **Step 6: Verify**

Run: `pnpm check && pnpm build`, then `pnpm dev`.
Confirm: no hydration warning in console; header/footer render; toggling theme works and a reload keeps the chosen theme with no flash.

---

## Task 7: Home page sections + assembly

**Files:**
- Create: `src/components/sections/hero.tsx`, `trust-strip.tsx`, `product-grid.tsx`, `benefits.tsx`, `deploy-anywhere.tsx`, `problems.tsx`, `architecture.tsx`, `developer-teaser.tsx`, `cta-band.tsx`
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: `hero.tsx`** — full-bleed top. Left: `Kicker` "Infrastructure Software", H1 `Power the Internet. <span class="accent-gradient">On Your Terms.</span>`, `Lead` = `SITE.description`, CTA row: primary "Request Demo"→`/contact`, outline "View Documentation"→`/docs`, ghost GitHub (icon + label)→`SITE.github`. A mono micro-line "Self-hosted · Cloud-agnostic · Kubernetes-native". Right: `<EdgeNetwork/>` over `<GridBackdrop/>`. Stacks on mobile (visual below copy).

- [ ] **Step 2: `trust-strip.tsx`** — mono label "Built for the organizations that run the internet" + wrapped row of the 10 `CUSTOMERS` names as understated hairline chips.

- [ ] **Step 3: `product-grid.tsx`** — `Section` + `Kicker` "Products" + `SectionHeading` "One platform. Every layer of your infrastructure." + responsive grid of 8 `.glass` cards (icon, name, tagline, "Explore →") → `/products/$slug`. Hover: lift + accent border + icon glow. Each in `<Reveal delay={i*40}>`. Accepts a `variant` prop (`compact` default; `detailed` adds feature bullets — used by `/products`).

- [ ] **Step 4: `benefits.tsx`** — `Kicker` "Why Viteloop" + heading + responsive grid of 10 `BENEFITS` (icon + title + blurb) in compact hairline cards.

- [ ] **Step 5: `deploy-anywhere.tsx`** — two-column: copy ("Deploy anywhere. Scale globally.") + bullet list (Self-hosted, Cloud Agnostic, Multi-Cloud, Kubernetes Native) | `<RegionMap/>`.

- [ ] **Step 6: `problems.tsx`** — `Kicker` "Ownership" + heading + grid of 6 outcomes (Avoid vendor lock-in; Maintain full ownership; Deploy anywhere; Scale globally; Integrate with your environment; Customize every component), each with an engineering-focused blurb + a small icon.

- [ ] **Step 7: `architecture.tsx`** — `Kicker` "Architecture" + `SectionHeading` "Software that runs in your environment — not ours." + `<ArchDiagram/>` + a short paragraph restating "infrastructure software, not infrastructure services."

- [ ] **Step 8: `developer-teaser.tsx`** — two-column: copy ("API-first. Built for engineers.") + buttons →`/developers` & `/docs`; right: a `.glass` code block (mono) of a realistic API call (e.g. `curl` creating a CDN edge rule). Static, lightly token-tinted via spans.

- [ ] **Step 9: `cta-band.tsx`** — reusable full-width `.glass` band with `<GlowMesh/>`: heading "Build your own infrastructure.", subtext, primary "Request Demo"→`/contact`, outline "Talk to engineering"→`/contact`. Props for heading/subtext so other pages reuse it.

- [ ] **Step 10: Assemble `index.tsx`** — route `head()` (home title/description), render in order: `Hero`, `TrustStrip`, `ProductGrid`, `Benefits`, `DeployAnywhere`, `Problems`, `Architecture`, `DeveloperTeaser`, `CTABand`.

- [ ] **Step 11: Verify (build + visual)**

Run: `pnpm check && pnpm build`, then `pnpm dev`.
Visual (Playwright): `/` in dark + light at 1440 and 390. Confirm hero animation runs, theme persists with no flash on reload, no console errors, no horizontal scroll.

---

## Task 8: Products overview + product detail template

**Files:**
- Create: `src/routes/products.index.tsx`, `src/routes/products.$slug.tsx`

- [ ] **Step 1: `products.index.tsx`** — `head()` meta; hero ("The Viteloop platform" + summary of the suite); `<ProductGrid variant="detailed" />`; a closing `<CTABand/>`.

- [ ] **Step 2: `products.$slug.tsx`**
  - `component` reads `getProduct(Route.useParams().slug)`. If undefined, render an on-brand not-found block ("Product not found") + `Button` back to `/products`.
  - Layout: product hero (icon, `name`, `tagline`, `summary`, CTAs Request Demo / View Docs), highlights row (3 `{label,value}` in mono `.glass` stat cards), features grid (check icon + feature), one relevant visual (`EdgeNetwork` for cdn/edge/gateway, `RegionMap` for stream/storage, `ArchDiagram` otherwise), a "Works with" strip linking the other 7 products, and `<CTABand/>`.
  - Dynamic `head()` using `getProduct` for title/description (handle missing slug gracefully).

- [ ] **Step 3: Verify**

Run: `pnpm check && pnpm build`. Visually load `/products`, `/products/cdn`, `/products/stream`, and bad slug `/products/xyz` (not-found). Confirm per-product `<title>` updates.

---

## Task 9: Solutions + Developers

**Files:**
- Create: `src/routes/solutions.tsx`, `src/routes/developers.tsx`

- [ ] **Step 1: `solutions.tsx`** — `head()`; hero ("Solutions for the organizations that build the internet"); grid of 10 `CUSTOMERS` (name + blurb + relevant product chips); a problems→outcomes section from `SOLUTIONS`; `<CTABand/>`.

- [ ] **Step 2: `developers.tsx`** — `head()`; hero ("Built API-first."); feature row (REST + SDKs, Webhooks, Terraform/Kubernetes, OpenAPI); 2–3 realistic `.glass` code blocks (curl + a JS/TS SDK snippet + a Terraform/`kubectl` snippet) stacked or tabbed; quickstart steps (numbered); links to `/docs` and `SITE.github`; `<CTABand/>`.

- [ ] **Step 3: Verify**

Run: `pnpm check && pnpm build`. Visually load both in dark + light.

---

## Task 10: Docs shell + Blog index

**Files:**
- Create: `src/routes/docs.tsx`, `src/routes/blog.tsx`

- [ ] **Step 1: `docs.tsx`** — docs two-column layout: left sticky sidebar with sectioned static nav (Getting Started, Products, Guides, API Reference); right content = "Welcome to Viteloop Docs" landing (a styled non-functional search input, quickstart cards, popular topics, a sample `.prose` paragraph). Full-width within `Container`.

- [ ] **Step 2: `blog.tsx`** — `head()`; hero ("Engineering & product updates"); a featured post card + grid of ~6 sample posts (`POSTS` array inline: `{ title, excerpt, tag, date, readtime }`) with category chips. Cards link to `#` (no detail route in scope).

- [ ] **Step 3: Verify**

Run: `pnpm check && pnpm build`. Visually load both.

---

## Task 11: Company, Careers, Contact, Status

**Files:**
- Create: `src/routes/company.tsx`, `src/routes/careers.tsx`, `src/routes/contact.tsx`, `src/routes/status.tsx`

- [ ] **Step 1: `company.tsx`** — hero/mission ("Powering the Next Internet"), the "infrastructure software, not services" thesis, a values grid, a stats band, a short "built by engineers" section; `<CTABand/>`.

- [ ] **Step 2: `careers.tsx`** — culture intro, perks/benefits grid, list of ~5 sample roles (`ROLES` inline: `{ title, team, location, type }`) as styled rows → `#`; closing CTA "See all roles".

- [ ] **Step 3: `contact.tsx` (demo request form)** — two-column: left value prop + "what to expect"; right `.glass` form with controlled React state: name, work email, company, customer type `<select>` (from `CUSTOMERS`), products of interest, message. Client-side validation (required fields + email regex). `onSubmit` `preventDefault`; on valid, swap to an inline success state ("Thanks — our team will reach out within one business day."). No network call.

- [ ] **Step 4: `status.tsx`** — overall "All systems operational" banner; component list (Global CDN, Streaming, Transcoding, Object Storage, API Gateway, Dashboard, Billing) each with an operational `Badge` + a 90-day uptime bar (static array of day statuses) + uptime %; a sample "Past incidents" section (a couple of resolved entries).

- [ ] **Step 5: Verify**

Run: `pnpm check && pnpm build`. Submit contact empty (validation errors) then valid (success state). Load status/company/careers.

---

## Task 12: Privacy + Terms (long-form)

**Files:**
- Create: `src/routes/privacy.tsx`, `src/routes/terms.tsx`

- [ ] **Step 1: `privacy.tsx`** — `Container` + `.prose` policy with realistic headings (Information We Collect, How We Use It, Data Ownership, Sub-processors, Security, Your Rights, Contact). "Last updated: July 1, 2026."

- [ ] **Step 2: `terms.tsx`** — `.prose` terms (License, Acceptable Use, Software & Deployment, Warranties, Limitation of Liability, Term & Termination, Governing Law). Same date.

- [ ] **Step 3: Verify**

Run: `pnpm check && pnpm build`. Load both; confirm prose readable in dark + light.

---

## Task 13: Final polish, a11y, responsive, full verification

**Files:** cross-cutting

- [ ] **Step 1: Accessibility** — keyboard reachability + visible focus on all interactive elements; nav menu Esc-closes; decorative SVGs `aria-hidden`; landmarks (`header`/`main`/`footer`/`nav`); contrast check on muted text both themes; form labels associated with inputs.
- [ ] **Step 2: Reduced-motion** — verify animations stop under `prefers-reduced-motion`.
- [ ] **Step 3: Responsive sweep** — 390 / 768 / 1024 / 1440: no overflow, header collapses, grids reflow, hero visual scales.
- [ ] **Step 4: Active nav state** — current route highlighted via `<Link activeProps>` in header.
- [ ] **Step 5: 404** — fill the root `notFoundComponent` with an on-brand page (heading, copy, button back to `/`).
- [ ] **Step 6: Full build + Biome**

Run: `pnpm check && pnpm build`
Expected: PASS — zero TS errors, zero Biome errors.

- [ ] **Step 7: Full visual QA (Playwright)** — screenshot `/`, `/products`, `/products/cdn`, `/solutions`, `/developers`, `/docs`, `/blog`, `/company`, `/careers`, `/contact`, `/status`, `/privacy`, `/terms` in dark + light at 1440 and 390. Confirm consistent chrome, no flashes, no console errors.

- [ ] **Step 8: Report** — summarize routes built, how to run (`pnpm dev`), and out-of-scope follow-ups (real form backend, full docs content, blog detail routes).

---

## Self-Review

**Spec coverage:**
- Hero headline/sub/CTAs → 7.1 ✅
- 8 product cards + names/taglines → 3.2, 7.3, 8 ✅
- 10 core benefits → 3.3, 7.4 ✅
- 6 customer problems → 3.5, 7.6 ✅
- 10 customer types → 3.4, 7.2, 9.1 ✅
- Animated hero + ambient throughout → 5, 7.1 ✅
- Dark default + light toggle (no-flash) → 1, 2, 6.2/6.5 ✅
- Every footer link a real route → 7–12 ✅
- Multi-region + architecture diagrams → 5.4/5.5, 7.5/7.7, 8.2 ✅
- Developer/API + code → 7.8, 9.2 ✅
- Fonts/palette/texture → 1 ✅
- A11y / reduced-motion / responsive → 13 ✅

**Placeholder scan:** Foundational/tricky code (tokens, theme, no-flash script, data shape, tests) is given in full. Repetitive page bodies are specified by exact sections + data sources (the brief) rather than transcribed line-by-line — acceptable for a design build.

**Type consistency:** `Product`/`PRODUCTS`/`getProduct` (3) used in 7–8; `Theme`/`THEME_KEY`/`applyTheme`/`resolveInitialTheme` (2) used in 6 and matched by `public/theme-init.js`'s hardcoded `'viteloop-theme'`; `useReveal`/`Reveal`/`Container`/`Section`/`Kicker`/`Lead` (4) used throughout; `CTABand`/`ProductGrid variant` reused across pages. Consistent.

**TDD note:** Visual/marketing build — unit tests guard only logic (theme helper, data integrity); all else verifies via `pnpm check && pnpm build` + Playwright visual QA.
