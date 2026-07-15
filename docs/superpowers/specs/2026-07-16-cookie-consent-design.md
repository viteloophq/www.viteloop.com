# Cookie Consent — Design

**Date:** 2026-07-16
**Status:** Approved (pending spec review)

## Problem

The Viteloop marketing site has no cookie consent mechanism. Today it sets no
tracking cookies — the only client-side storage is a functional theme preference
(`viteloop-theme` in `localStorage`), which is strictly necessary and does not
require consent. However, analytics/marketing scripts (e.g. Plausible, GA, a
Meta pixel) are planned soon, and those must not load until the visitor consents.

We need an **Accept / Reject** consent banner plus a consent API that future
tracking scripts can gate on.

## Goals

- Show a consent banner to visitors who have not yet made a choice.
- Offer **Accept all** and **Reject non-essential** actions.
- Persist the choice and expose an API so future scripts load only with consent.
- Let users change/withdraw their choice at any time (GDPR requirement).
- Match the existing codebase conventions (mirror the `lib/theme.ts` pattern,
  reuse design tokens, avoid hydration flashes).

## Non-goals

- Per-category preferences modal with individual toggles (deferred; the data
  model leaves the door open for it without migration).
- A geo-aware / consent-mode integration or a third-party CMP.
- Actually adding any analytics/marketing scripts — this ships the *gate*, not
  the trackers.
- A render-blocking pre-paint script (not needed — see Architecture).

## Architecture

Four units, each with one responsibility:

### 1. Consent module — `src/lib/consent.ts`

The single source of truth, analogous to `src/lib/theme.ts`.

Stored record (in `localStorage`, key `viteloop-consent`):

```jsonc
{ "v": 1, "analytics": true, "marketing": true, "at": "2026-07-16T12:00:00.000Z" }
```

Two independent category booleans (rather than one "accepted" flag) so a
per-category modal can be added later with **no data migration**. Both are set
together by the Accept/Reject buttons for now.

Public API:

- `CONSENT_KEY: "viteloop-consent"`
- `CONSENT_VERSION: 1` — bump when the cookie policy materially changes; any
  stored record with a different `v` is treated as "no choice yet" and the
  visitor is re-prompted.
- `CONSENT_EVENT: "viteloop:consent-change"` — CustomEvent name dispatched on
  `window` after a choice is saved; carries the new `Consent` in `detail`.
- `CONSENT_OPEN_EVENT: "viteloop:consent-open"` — event the footer link
  dispatches to re-summon the banner.
- `type ConsentCategory = "analytics" | "marketing"`
- `type Consent = { analytics: boolean; marketing: boolean }`
- `getStoredConsent(): Consent | null` — returns the saved choice, or `null`
  when unset, when the version is stale, or when storage/parse fails.
- `setConsent(consent: Consent): void` — persist (with `v` and `at`) and
  dispatch `CONSENT_EVENT`. Wrapped in try/catch like `theme.ts` (private mode).
- `acceptAll(): void` — `setConsent({ analytics: true, marketing: true })`.
- `rejectNonEssential(): void` — `setConsent({ analytics: false, marketing: false })`.
- `hasConsent(category: ConsentCategory): boolean` — `false` when unset.

SSR-safe: every function guards `typeof window`/`localStorage`.

**Why no render-blocking script (unlike theme):** the theme needs to apply a
class before first paint to avoid a FOUC. Consent-gated scripts are
React-rendered from consent state and simply don't mount until consent exists,
so there is no flash to prevent.

### 2. `useConsent()` hook — `src/hooks/use-consent.ts`

Client hook that reads current consent and re-renders on change.

- Returns `{ consent: Consent | null; hasConsent(category): boolean; mounted: boolean }`.
- On mount, reads `getStoredConsent()` and subscribes to `CONSENT_EVENT`;
  unsubscribes on unmount.
- `mounted` is `false` during SSR/first render (returns `consent: null`) to keep
  hydration deterministic — matches the `theme-toggle.tsx` pattern.

This is the integration point for future trackers, e.g.:

```tsx
const { hasConsent } = useConsent();
if (hasConsent("analytics")) return <PlausibleScript />;
```

### 3. Banner — `src/components/site/cookie-consent.tsx`

- Client component. Uses a `mounted` flag (as in `theme-toggle.tsx`) to avoid a
  hydration mismatch and render nothing on the server.
- Visibility state: shown when `mounted && getStoredConsent() === null`, OR when
  a `CONSENT_OPEN_EVENT` arrives (re-summoned from the footer). Hidden after the
  user picks Accept or Reject.
- Layout: fixed **bottom bar** spanning the viewport, above page content.
  Styled with existing tokens — `bg-bg-soft`, `border-line`, `text-fg-muted`,
  `buttonVariants`. Contents: one line of copy + a link to `/privacy` +
  **Accept all** (primary button) + **Reject non-essential** (ghost/outline).
- Accessibility: a landmark `<section aria-label="Cookie consent">` (implicit
  `role="region"`) — chosen over `role="dialog"` because the banner is
  non-modal (it doesn't trap focus or block the page, so `dialog` would
  mislead assistive tech); buttons are real `<button>`s; the bar is keyboard
  reachable.

### 4. Footer "Cookie settings" link — `src/components/site/site-footer.tsx`

- A small button in the footer bottom bar (next to the copyright line) that
  dispatches `CONSENT_OPEN_EVENT`. Satisfies the GDPR requirement that
  withdrawing consent be as easy as granting it.
- Styled as a subtle text button (`text-fg-faint hover:text-fg`) to match the
  existing footer meta row.

## Wiring

Render `<CookieConsent />` in `src/routes/__root.tsx`, inside `<body>` after
`<SiteFooter />` and before the devtools/`<Scripts />`.

## Data flow

1. First visit: `getStoredConsent()` → `null` → banner shows.
2. User clicks **Accept all** → `acceptAll()` → record saved, `CONSENT_EVENT`
   fired → banner hides; `useConsent` subscribers re-render.
3. Later visits: record present → banner stays hidden; trackers gated by
   `hasConsent(...)` load per the saved choice.
4. User clicks **Cookie settings** in the footer → `CONSENT_OPEN_EVENT` → banner
   re-appears with the same Accept/Reject actions.
5. Policy change: bump `CONSENT_VERSION` → stale records read as `null` →
   everyone is re-prompted.

## Error handling / edge cases

- `localStorage` unavailable (private mode, SSR): reads return `null`, writes are
  swallowed by try/catch. The banner may reappear each load in private mode —
  acceptable, and consistent with `theme.ts`.
- Malformed/partial stored JSON: `getStoredConsent()` returns `null`.
- No window (SSR): all module functions and the hook no-op / return defaults.

## Privacy page addition — `src/routes/privacy.tsx`

Add a short **Cookies** section: distinguishes strictly-necessary storage (theme
preference) from analytics/marketing, and states that visitors can change their
choice anytime via the footer "Cookie settings" link.

## Testing

`src/lib/__tests__/consent.test.ts` (vitest + jsdom, matching the existing
`src/data/__tests__` setup):

- Unset → `getStoredConsent()` returns `null`.
- `acceptAll()` → both categories `true`; `hasConsent("analytics")` true.
- `rejectNonEssential()` → both `false`; `hasConsent(...)` false.
- Version mismatch (record with `v` ≠ `CONSENT_VERSION`) → treated as `null`.
- Malformed JSON → `null` (no throw).
- `setConsent` dispatches `CONSENT_EVENT`.

Reset `localStorage` between tests.

## Design decisions

- **Bottom bar** over a corner card — reads as more standard/trustworthy for a
  B2B infrastructure site.
- **Event-based** re-open and change notification rather than a global store —
  lightweight, no new dependency, and consistent with the app's plain-DOM
  patterns.
- **Two booleans + version field** — future-proofs a per-category modal and a
  policy-change re-prompt without a migration.
