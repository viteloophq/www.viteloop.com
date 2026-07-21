# ViteLoop Homepage Rebrand — Design Spec

**Date:** 2026-07-21
**Status:** Draft — pending user review
**Scope:** Homepage (`/`) branding + structure only. Inner product/marketing pages
unchanged except the site-wide brand-casing sweep (see Decisions).

## Goal

Reposition the ViteLoop homepage from "enterprise infrastructure software" toward a
**broad, self-serve edge & media platform** — in the spirit of bunny.net's homepage
playbook — while leading with the differentiator bunny.net cannot claim: **you can run
it yourself.** ViteLoop delivers CDN, Video, Live, DRM, Commerce, and Edge, consumed
as a **managed network** *or* by **deploying your own CDN nodes**.

New brand line: **"Own the edge."**
Support line: **"The edge platform you can run yourself."**

Reference (structure borrowed, personality diverged): **bunny.net** — product grid →
scale stats → pillars → transparent pricing → self-serve CTA.

## Decisions (locked)

- **Delivery positioning:** Hybrid. Managed ViteLoop network **and** deploy-your-own
  nodes are both first-class and shown side by side.
- **Brand personality:** "Cloud-cool developer-infra" — confident, technical, warm.
  **No mascot.** Dark canvas, one vivid gradient accent, mono-label micro-details as
  "engineered" texture. Vibe reference: Vercel / Fly.io / Cloudflare (not bunny's
  cuteness).
- **Brand casing:** **ViteLoop** (capital L) everywhere. Site-wide sweep replaces
  "Viteloop" → "ViteLoop" in `src/data/site.ts`, route `head()`s, JSON-LD, OG, and
  copy. (Default assumption — user may veto.)
- **Self-serve is real:** signup, public pricing, real scale numbers, and
  deploy-your-own-node all exist today, so CTAs and stats are literal, not aspirational.
- **Signup:** `https://console.viteloop.com/signup` — a **separate app** (console),
  linked externally (new tab), not an internal route.
- **Continuity:** Keep Geist (already self-hosted), keep the corner-tick/mono-label
  detailing, evolve the existing `EdgeNetwork` visual rather than replacing it.

## Design system (deltas from current)

- **Palette:** keep the dark-first base + existing accent; introduce a **vivid gradient
  accent** for the hero and per-product **muted accent tints** on the product cards
  (bunny-style color-coding, restrained).
- **Type:** Geist / Geist Mono (unchanged). Larger, tighter hero headline.
- **Motion:** restrained; keep it CSS/SVG-first (no new animation deps), consistent with
  the existing site.

## Homepage structure (top → bottom)

1. **Hero**
   - Badge: `Managed edge · or your own nodes`
   - H1: **Own the edge.**
   - Sub: *"Run ViteLoop's global network, or deploy your own CDN nodes and own every
     packet — video, live, DRM, and commerce, delivered worldwide."*
   - CTAs: **[ Start free ]** (→ console.viteloop.com/signup, external) ·
     **[ Deploy a node ]** (→ deploy quickstart — ⚠️ URL needed)
   - Visual: evolve `EdgeNetwork` into an interactive node/region map with an
     "+ add your node" beat that shows the hybrid model.

2. **Scale strip** — stat bar: PoPs · regions · Tbps · RPS · latency · customers.
   ⚠️ Real numbers needed (below). No invented figures.

3. **Product bento** (centerpiece) — 6 cards, each icon + one-liner + link:
   **CDN · Video · Live · DRM · Commerce · Edge.** Muted per-product accent tint.

4. **"Run it your way"** (the wedge) — two modes side by side: *Use our network* vs
   *Deploy your own nodes*, with a real one-command deploy snippet. ⚠️ command needed.

5. **Why ViteLoop** — 3 pillars: *Own your infrastructure · One platform, every media
   workload · Global by default.*

6. **Developer teaser** — API/code-first; restyle existing `DeveloperTeaser`.

7. **Pricing teaser** — transparent, usage-based, "start free." Links to pricing.
   ⚠️ pricing model + URL needed (or add a `/pricing` route — TBD with user).

8. **Final CTA band** — *"Start free. Deploy a node."*

9. **Footer** — existing.

## Content inputs still needed from user

These are literal values required for honest copy; marked ⚠️ above. Placeholders will
be used in implementation only until supplied:

- [ ] **Scale numbers:** edge locations/PoPs, regions/countries, capacity (Tbps),
      requests/sec, latency, customers/sites.
- [ ] **Pricing:** model (usage-based? tiers? "from $X/mo") + pricing page URL, or
      decision to add a `/pricing` route.
- [ ] **Deploy-a-node:** the real quickstart command + docs link for the snippet, and
      the "Deploy a node" CTA destination.
- [ ] **Customer logos** (optional) for the trust/scale strip.
- [ ] **Casing** confirm: ViteLoop (assumed).

## Out of scope (this spec)

- Inner product pages, pricing page build-out, console/app itself.
- New pricing logic or signup flow (external app owns these).
- Unrelated refactors.

## Success criteria

- Homepage leads with "Own the edge" + hybrid delivery, reads as a broad self-serve
  platform, and visibly differentiates on "run it yourself."
- All copy/stats/CTAs are literal (backed by supplied values), not aspirational.
- Brand casing consistent ("ViteLoop") site-wide.
- No regression to existing SEO wins (title/canonical/JSON-LD/prerender all preserved).
- Keeps CSS/SVG-first, dependency-light approach; Geist retained.
