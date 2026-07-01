# Viteloop Website — Design Spec

**Date:** 2026-07-01
**Status:** Approved (design), pending implementation plan

## Goal

Build a modern, enterprise-grade marketing website for **Viteloop** — a software
company that builds the infrastructure software powering modern cloud platforms.
The site must position Viteloop as **infrastructure software, not infrastructure
services**: it empowers organizations to build and operate their own CDN, streaming
platforms, edge networks, and related services with full ownership and control.

Tagline: **"Powering the Next Internet."**
Lead hero headline: **"Power the Internet. On Your Terms."**

Design references: Stripe, Vercel, Linear, Cloudflare, HashiCorp, GitLab, Grafana,
Datadog. Communicate engineering excellence, not consumer marketing.

## Decisions (locked)

- **Scope:** Full multi-page site. Every footer link is a real route.
- **Hero visual:** Animated edge-network/architecture visual **plus** ambient
  grid/gradient treatments throughout sections.
- **Theme:** Dark default with a working light-mode toggle (no-flash, persisted).
- **Build approach:** CSS/SVG-first, dependency-light (no Framer Motion). Custom
  animated SVG for the network visual; CSS keyframes + `IntersectionObserver` for
  scroll reveals; ambient grid/gradient via CSS.

## Tech context (existing scaffold)

Fresh `create-tanstack-app` project: TanStack Start (React 19), Vite, Tailwind CSS v4,
shadcn (new-york / zinc), Biome, Nitro, lucide-react. File-based routing
(`src/routes`), path alias `#/* -> ./src/*`, `cn()` helper in `src/lib/utils.ts`.
The starter `styles.css` ships a leftover "lagoon/beach" theme that will be replaced.

## Design system

- **Palette (dark-first):** near-black blue-slate base (not pure black), layered
  surfaces with hairline borders. Signature accent = **electric blue → violet**
  gradient; cyan "data" tint for diagram flows. Light theme = near-white inversion
  with the same accents. Implemented as CSS variables under `:root` and `.dark`,
  wired into Tailwind v4 `@theme`.
- **Type:** `Inter` for UI/headings; `JetBrains Mono` for kickers, code, metrics,
  and engineering accents. Replaces Fraunces/Manrope.
- **Texture:** subtle dot-grid backdrop, faint radial accent glows, glassy bordered
  cards, soft glows on accent elements. Generous spacing, restrained motion.

## Site map (file-based routes)

- `/` — Home (showpiece landing)
- `/products` — Products overview (8 cards)
- `/products/$slug` — Product detail template (cdn, stream, transcoder, drm,
  billing, storage, edge, gateway)
- `/solutions` — By customer type (hosting providers, ISPs, telecom, enterprise,
  government, streaming, SaaS, cloud providers, media, system integrators)
- `/developers` — Developer APIs, code samples, quickstart
- `/docs` — Documentation shell (sidebar layout + landing)
- `/blog` — Blog index (sample posts)
- `/company` — About / mission / values
- `/careers` — Open roles + culture
- `/contact` — Demo request form (client-validated; no backend wiring required)
- `/status` — System status board
- `/privacy` — Privacy policy
- `/terms` — Terms of service

Home is the showpiece; `/products/$slug`, `/solutions`, `/developers` get deep,
real-feeling content. `/docs`, `/blog`, `/company`, `/careers`, `/contact`, `/status`
get solid on-brand layouts. `/privacy`, `/terms` are clean long-form text.

## Home page sections (top → bottom)

1. **Hero** — headline + subheadline + CTAs (Request Demo / View Documentation /
   GitHub) + animated edge-network visual.
2. **Trust strip** — customer-type wordmarks (Hosting Providers, ISPs, Telecom,
   Enterprises, Governments, Streaming Platforms, SaaS, Cloud Providers).
3. **Product grid** — 8 product cards (CDN, Stream, Transcoder, DRM, Billing,
   Storage, Edge, Gateway).
4. **Core benefits** — grid (Self-hosted, Cloud Agnostic, Multi-Cloud, Kubernetes
   Native, API First, Open Architecture, High Performance, Scalable, Enterprise
   Ready, Developer Friendly).
5. **Deploy anywhere** — multi-region orchestration diagram.
6. **Customer problems** — vendor lock-in, full ownership, deploy anywhere, scale
   globally, integrate with existing environment, customize every component.
7. **Architecture** — "how it fits" layered diagram.
8. **Developer/API teaser** — narrative + code block.
9. **Final CTA band** — Request Demo / talk to engineering.
10. **Footer** — Products, Solutions, Documentation, Developers, GitHub, Blog,
    Company, Careers, Contact, Status, Privacy, Terms.

## Code structure

- `src/data/` — single source of truth: `products.ts`, `benefits.ts`,
  `customers.ts`, `nav.ts`, `solutions.ts`. Pages and detail template read from here.
- `src/components/site/` — `SiteHeader` (nav + product menu + theme toggle + GitHub),
  `SiteFooter`, `ThemeToggle`, `Logo`.
- `src/components/sections/` — `Hero`, `TrustStrip`, `ProductGrid`, `Benefits`,
  `DeployAnywhere`, `Problems`, `Architecture`, `DeveloperTeaser`, `CTABand`.
- `src/components/visuals/` — `EdgeNetwork` (animated SVG hero), `GridBackdrop`,
  `GlowMesh`, `RegionMap`, `ArchDiagram`.
- `src/components/ui/` — shadcn primitives as needed (button, badge, etc.).
- `src/hooks/` — `useReveal` (IntersectionObserver scroll reveal).
- `src/lib/theme.ts` — theme init/toggle helpers; inline no-flash script injected in
  `__root.tsx`.

Shared chrome (`SiteHeader` + `SiteFooter`) wraps all routes via the root shell /
layout. Each section is an isolated, independently understandable component reading
typed data from `src/data/`.

## Theme toggle (no-flash)

`.dark` class on `<html>`. An inline script in the document head reads
`localStorage.theme` (falling back to system / default dark) and sets the class
before paint to avoid FOUC. `ThemeToggle` updates the class + persists choice.

## Accessibility & quality

- Semantic landmarks, keyboard-navigable nav/menu, visible focus states.
- `prefers-reduced-motion` disables non-essential animation.
- Responsive from mobile → wide desktop.
- Lighthouse-friendly: no layout shift from the no-flash script, lazy/animated SVG
  rather than heavy imagery.

## Out of scope

- Real backend for the demo/contact form (client-side validation + success state only).
- Real auth, real docs content beyond representative samples, CMS.
- Framer Motion / heavy animation runtime.

## Verification

- `pnpm build` succeeds; `pnpm dev` serves without hydration warnings.
- Manual pass (Playwright screenshots) of `/` and a representative subset of routes
  in both dark and light themes, desktop + mobile widths.
