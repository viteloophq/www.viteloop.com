# ViteLoop Homepage Rebrand — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the homepage to lead with "Own the edge" + hybrid delivery (managed network *or* deploy your own nodes), in a cloud-cool developer-infra tone, using bunny.net's product-led structure — without regressing SEO.

**Architecture:** Reuse existing primitives (`Container`, `Section`, `SectionHeading`, `Lead`, `SectionTag`, `Reveal`, `buttonVariants`, blueprint helpers) and tokens (`bg`/`bg-soft`/`line`/`accent`/`fg`/`fg-muted`, `glass`, `card-hover`, `accent-gradient`). All user-supplied content values (scale numbers, pricing, deploy command, external URLs) are centralized in a new `src/data/home.ts` so copy stays honest and editable in one place. Homepage sections are recomposed in `src/routes/index.tsx`.

**Tech Stack:** TanStack Start (React 19), Vite, Tailwind v4, lucide-react, Vitest + Testing Library. CSS/SVG-first, no new deps.

**Note on granularity:** This is a UI/branding redesign. Tasks specify exact files, exact copy, which primitives/tokens to use, a light render test (headline + key links), and acceptance criteria. Final visual JSX is produced at implementation time following the cited patterns.

**⚠️ Content inputs (fill in `src/data/home.ts`):** scale numbers, pricing model + URL, deploy-node command + URL. Until supplied, `home.ts` holds clearly-marked placeholders and the site builds/renders; no invented figures ship silently — placeholders read as `—`/`REPLACE`.

---

### Task 1: Brand-casing sweep — "Viteloop" → "ViteLoop"

**Files:**
- Modify (data/copy): `src/data/site.ts`, `src/data/products.ts`, `src/data/capabilities.ts`, `src/data/commerce.ts`, `src/data/ott.ts`
- Modify (components): `src/components/site/logo.tsx`, `src/components/site/site-header.tsx`, `src/components/site/site-footer.tsx`, `src/components/sections/*.tsx`, `src/components/visuals/*.tsx`
- Modify (routes/SEO): `src/routes/__root.tsx` (JSON-LD `name`, OG), all `src/routes/*.tsx` `head()` titles
- Modify (styles): `src/styles.css` (comment only)
- Update tests: `src/data/__tests__/{capabilities,commerce,data,ott}.test.ts`, `src/components/visuals/__tests__/product-mockups.test.tsx`

- [ ] **Step 1: Scope-confirm the replacement is safe**

Run: `grep -rho "Viteloop" src/ | sort -u` (expect only the exact token `Viteloop`).
Verify NO matches touch domains/keys: `grep -rn "viteloop.com\|viteloop-theme" src/` must be unaffected (all lowercase — won't match `Viteloop`).

- [ ] **Step 2: Replace display brand only (capital-V token)**

Run: `grep -rl "Viteloop" src/ | xargs sed -i '' 's/Viteloop/ViteLoop/g'`
(macOS `sed -i ''`). This changes only `Viteloop`→`ViteLoop`; lowercase `viteloop.com`, `viteloop-theme` untouched.

- [ ] **Step 3: Fix product/page titles that now read awkwardly**

Manually verify titles like `CDN — Global Content Delivery Network — Viteloop` became `... — ViteLoop`. No other edits.

- [ ] **Step 4: Run tests, update brand assertions**

Run: `pnpm vitest run`
Expected: failures only in the 5 test files asserting `"Viteloop"`. Update those string literals to `"ViteLoop"`. Re-run until green.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "brand: standardize casing to ViteLoop site-wide"
```

---

### Task 2: Homepage content data module (`src/data/home.ts`)

Single source of truth for the rebrand's content + external URLs. Honest placeholders where the user hasn't supplied values.

**Files:**
- Create: `src/data/home.ts`
- Test: `src/data/__tests__/home.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { HOME_STATS, HOME_PILLARS, HOME_URLS } from "#/data/home";

describe("home data", () => {
  it("exposes 6 product pillars linking to real routes", () => {
    expect(HOME_PILLARS).toHaveLength(6);
    for (const p of HOME_PILLARS) {
      expect(p.name).toBeTruthy();
      expect(p.to).toMatch(/^\/products\//);
    }
  });
  it("has a signup url on the console host", () => {
    expect(HOME_URLS.signup).toBe("https://console.viteloop.com/signup");
  });
  it("stats each have a label and value", () => {
    for (const s of HOME_STATS) {
      expect(s.label).toBeTruthy();
      expect(s.value).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run test → FAIL** (`Cannot find module '#/data/home'`). Run: `pnpm vitest run src/data/__tests__/home.test.ts`

- [ ] **Step 3: Implement `src/data/home.ts`**

```ts
import { Globe, PlayCircle, Radio, ShieldCheck, ShoppingBag, Cpu, type LucideIcon } from "lucide-react";

/** External + still-unconfirmed URLs. REPLACE placeholders when known. */
export const HOME_URLS = {
  signup: "https://console.viteloop.com/signup",      // confirmed
  deploy: "https://console.viteloop.com/signup",       // TODO(content): real deploy quickstart
  pricing: "https://console.viteloop.com/signup",      // TODO(content): real pricing page/route
} as const;

/** One-command deploy snippet shown in "Run it your way". */
export const DEPLOY_COMMAND = "viteloop nodes deploy --region auto"; // TODO(content): real CLI command

/** Scale strip. Values are placeholders until real figures land — no invented numbers ship as fact. */
export interface HomeStat { label: string; value: string; }
export const HOME_STATS: HomeStat[] = [
  { label: "Edge locations", value: "—" }, // TODO(content)
  { label: "Regions",        value: "—" }, // TODO(content)
  { label: "Capacity",       value: "—" }, // TODO(content)
  { label: "Requests / sec", value: "—" }, // TODO(content)
  { label: "p50 latency",    value: "—" }, // TODO(content)
];

/** Pricing teaser. */
export const HOME_PRICING = {
  headline: "Simple, usage-based pricing.",
  sub: "Start free. Pay for what you deliver. No lock-in.",
  price: "—", // TODO(content): e.g. "From $X / mo"
} as const;

/** 6 marketing pillars → link to the best-matching product route. */
export interface HomePillar { name: string; blurb: string; to: string; icon: LucideIcon; }
export const HOME_PILLARS: HomePillar[] = [
  { name: "CDN",      blurb: "Global content delivery on your network or ours.", to: "/products/cdn",           icon: Globe },
  { name: "Video",    blurb: "VOD & video CDN with low-rebuffer delivery.",       to: "/products/video-cdn",     icon: PlayCircle },
  { name: "Live",     blurb: "Low-latency live streaming at scale.",              to: "/products/stream",        icon: Radio },
  { name: "DRM",      blurb: "Multi-DRM protection for every screen.",            to: "/products/drm",           icon: ShieldCheck },
  { name: "Commerce", blurb: "AI-powered commerce at the edge.",                  to: "/products/commerce",      icon: ShoppingBag },
  { name: "Edge",     blurb: "Serverless functions and compute at the edge.",     to: "/products/edge-compute",  icon: Cpu },
];
```

- [ ] **Step 4: Run test → PASS.** Run: `pnpm vitest run src/data/__tests__/home.test.ts`
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat(home): add centralized homepage content module"`

---

### Task 3: Hero rewrite (`src/components/sections/hero.tsx`)

**Files:** Modify `src/components/sections/hero.tsx` · Test `src/components/sections/__tests__/hero.test.tsx`

Copy:
- Badge: `Managed edge · or your own nodes`
- H1: **Own the edge.** (keep two-line treatment; second line accent: e.g. `Own the edge.` / accent `Run it yourself.`)
- Sub: *"Run ViteLoop's global network, or deploy your own CDN nodes and own every packet — video, live, DRM, and commerce, delivered worldwide."*
- Primary CTA: `Start free` → `HOME_URLS.signup` (external `<a href target="_blank" rel="noopener">`, not `<Link>`)
- Secondary CTA: `Deploy a node` → `HOME_URLS.deploy` (external)
- Chips: `Managed or self-hosted · Bring your own nodes · Cloud-agnostic · API-first`
- Right visual: keep `EdgeNetwork` in its framed card; change the mono-labels to hint the hybrid model (e.g. `your.nodes / + add region`).

- [ ] **Step 1: Failing test** — render `<Hero/>`, assert `getByText("Own the edge.")` and a link with `href="https://console.viteloop.com/signup"` and name `/start free/i`.
- [ ] **Step 2: Run → FAIL.** `pnpm vitest run src/components/sections/__tests__/hero.test.tsx`
- [ ] **Step 3: Implement** using existing hero layout (grid, `GlowMesh`, `GridBackdrop`, `Container`, `buttonVariants`); swap `<Link to="/contact">` for external `<a>` CTAs pointing at `HOME_URLS`.
- [ ] **Step 4: Run → PASS.**
- [ ] **Step 5: Commit** — `git commit -am "feat(home): rebrand hero to 'Own the edge' + hybrid CTAs"`

---

### Task 4: Scale strip (`src/components/sections/scale-strip.tsx`)

Replaces the customer-logo `TrustStrip` position with a bunny-style stat bar driven by `HOME_STATS`.

**Files:** Create `src/components/sections/scale-strip.tsx` · Test `src/components/sections/__tests__/scale-strip.test.tsx`

- [ ] **Step 1: Failing test** — render, assert each `HOME_STATS[i].label` is present.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** — `Container` + flex/grid row; each stat = big `font-display` value over a `mono-label` label; hairline dividers (`border-line`). Bordered band `border-y border-line bg-bg-soft/30 py-10` (match `TrustStrip`).
- [ ] **Step 4: Run → PASS.**
- [ ] **Step 5: Commit** — `git commit -am "feat(home): add scale-stats strip"`

---

### Task 5: Product bento → 6 pillars (`src/components/sections/product-bento.tsx`)

Re-point the bento at `HOME_PILLARS` (CDN · Video · Live · DRM · Commerce · Edge) with the new heading.

**Files:** Modify `src/components/sections/product-bento.tsx` · Test `src/components/sections/__tests__/product-bento.test.tsx`

Copy: heading `One platform. ` + accent `Every edge workload.`; lead *"CDN, video, live, DRM, commerce, and edge — one control plane, one API. Run the whole platform or a single piece, managed or on your own nodes."*

- [ ] **Step 1: Failing test** — assert all six pillar names render and each card links to its `to` route (`/products/...`).
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** — keep the bento card visuals (featured first card larger); map over `HOME_PILLARS` instead of `PRODUCTS`; use `<Link to={pillar.to}>`; icon from `pillar.icon`.
- [ ] **Step 4: Run → PASS.**
- [ ] **Step 5: Commit** — `git commit -am "feat(home): product bento to 6 edge pillars"`

---

### Task 6: "Run it your way" wedge (`src/components/sections/run-it-your-way.tsx`)

The differentiator: two modes side by side + a real deploy snippet.

**Files:** Create `src/components/sections/run-it-your-way.tsx` · Test `src/components/sections/__tests__/run-it-your-way.test.tsx`

Content: `SectionTag index="02" label="Deploy your way"`; heading `Managed, or make it yours.`; two `glass` cards:
- **Use our network** — "Go live in minutes on ViteLoop's global edge. Fully managed, pay-as-you-go." CTA `Start free` → `HOME_URLS.signup`.
- **Deploy your own nodes** — "Run CDN nodes on your own infrastructure and own every packet." Code block showing `DEPLOY_COMMAND`. CTA `Deploy a node` → `HOME_URLS.deploy`.

- [ ] **Step 1: Failing test** — assert both mode headings render and `DEPLOY_COMMAND` text appears.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** — two-column grid of `glass` cards; deploy snippet in a `<pre><code>` with `font-mono text-sm`, `border border-line bg-bg rounded-xl p-4`.
- [ ] **Step 4: Run → PASS.**
- [ ] **Step 5: Commit** — `git commit -am "feat(home): add 'run it your way' hybrid section"`

---

### Task 7: "Why ViteLoop" pillars (`src/components/sections/why-viteloop.tsx`)

**Files:** Create `src/components/sections/why-viteloop.tsx` · Test `src/components/sections/__tests__/why-viteloop.test.tsx`

Three columns (icon + title + blurb):
- **Own your infrastructure** — "Managed or self-hosted — no lock-in, no per-GB tax, your data in your environment."
- **Every media workload, one platform** — "CDN, video, live, DRM, and commerce share one control plane and API."
- **Global by default** — "Anycast edge, HTTP/3, and instant purge everywhere your users are."

- [ ] **Step 1: Failing test** — assert the three titles render.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** — `Section` + `Container` + `SectionHeading`; 3-col grid (`sm:grid-cols-3`) of bordered/`glass` cards with lucide icons.
- [ ] **Step 4: Run → PASS.**
- [ ] **Step 5: Commit** — `git commit -am "feat(home): add why-ViteLoop pillars"`

---

### Task 8: Pricing teaser (`src/components/sections/pricing-teaser.tsx`)

**Files:** Create `src/components/sections/pricing-teaser.tsx` · Test `src/components/sections/__tests__/pricing-teaser.test.tsx`

Content from `HOME_PRICING`: heading, sub, `price`, primary CTA `Start free` → `HOME_URLS.signup`, secondary `See pricing` → `HOME_URLS.pricing`.

- [ ] **Step 1: Failing test** — assert `HOME_PRICING.headline` renders and a `start free` link points to the signup URL.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** — centered `glass` panel (mirror `CTABand` styling) with the pricing copy + two CTAs.
- [ ] **Step 4: Run → PASS.**
- [ ] **Step 5: Commit** — `git commit -am "feat(home): add pricing teaser"`

---

### Task 9: CTA band + home route recompose

**Files:** Modify `src/components/sections/cta-band.tsx`, `src/routes/index.tsx`

- [ ] **Step 1:** Update `CTABand` default copy → heading `Own the edge.` · subtext *"Spin up on ViteLoop's network or deploy your own nodes — video, live, DRM, and commerce, your way."*; CTAs `Start free` (→ `HOME_URLS.signup`, external) + `Deploy a node` (→ `HOME_URLS.deploy`). Replace the two `<Link to="/contact">` with external `<a>`.
- [ ] **Step 2:** Recompose `src/routes/index.tsx` render order: `Hero → ScaleStrip → ProductBento → RunItYourWay → WhyViteLoop → DeveloperTeaser → PricingTeaser → CTABand`. Remove now-unused sections from the homepage import list (`TrustStrip`, `Problems`, `ControlPlane`, `DeployAnywhere`, `Benefits`) — keep the files (used elsewhere or future).
- [ ] **Step 3:** Update home `head()` in `index.tsx`: `title: "ViteLoop — Own the Edge"`, `description: "The edge platform you can run yourself. CDN, video, live, DRM, and commerce — managed on ViteLoop's global network or deployed on your own nodes."`
- [ ] **Step 4: Run tests** — `pnpm vitest run` → all pass.
- [ ] **Step 5: Commit** — `git commit -am "feat(home): recompose homepage + refresh CTA band"`

---

### Task 10: Verify build + SEO preservation + visual pass

**Files:** none (verification)

- [ ] **Step 1:** `pnpm biome check --write src/` (or `rtk proxy` per project quirk) → clean.
- [ ] **Step 2:** `pnpm build` → succeeds.
- [ ] **Step 3: SEO regression check** on the prerendered output:

```bash
grep -o '<title>[^<]*</title>' .output/public/index.html
grep -c 'rel="canonical"' .output/public/index.html      # expect 1
grep -c 'application/ld+json' .output/public/index.html    # expect >=2 (Org + WebSite)
```

Expected: title `ViteLoop — Own the Edge`, canonical present, JSON-LD present.

- [ ] **Step 4: Visual check** — run the dev server, screenshot the homepage (Playwright), confirm hero, scale strip, bento (6 pillars), run-it-your-way, pillars, pricing, CTA render and are responsive at mobile width (no horizontal overflow).
- [ ] **Step 5: Final commit** — `git commit -am "chore(home): lint, build, SEO verification"`

---

## Self-review notes

- **Spec coverage:** hero ✓(T3), scale strip ✓(T4), product bento ✓(T5), run-it-your-way ✓(T6), why-ViteLoop ✓(T7), developer teaser (reused, T9), pricing ✓(T8), CTA ✓(T9), casing sweep ✓(T1), SEO preservation ✓(T10), centralized honest content ✓(T2).
- **Placeholders:** the only placeholders are user-owned content values, quarantined in `src/data/home.ts` with `TODO(content)` markers and rendered as visible `—`/`REPLACE` so nothing false ships silently.
- **Type consistency:** `HOME_URLS`, `HOME_STATS`, `HOME_PILLARS`, `HOME_PRICING`, `DEPLOY_COMMAND` names are used identically across T2–T9.
- **Deferred:** interactive "+ add your node" map animation is out of scope for v1 (static `EdgeNetwork` retained); can be a follow-up.
