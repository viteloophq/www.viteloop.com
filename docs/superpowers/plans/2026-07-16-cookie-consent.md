# Cookie Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Accept/Reject cookie-consent banner backed by a versioned `localStorage` consent module and a `useConsent` hook, so future analytics/marketing scripts load only with the visitor's consent.

**Architecture:** A pure consent module (`src/lib/consent.ts`) is the source of truth — mirrors the existing `src/lib/theme.ts` pattern (SSR-safe, try/catch on storage, a `window` CustomEvent on change). A `useConsent` hook exposes reactive consent for gating scripts. A client banner component renders only when no choice exists (or when re-summoned by a footer "Cookie settings" link via a window event) and never renders on the server, avoiding hydration flashes. Privacy page gets a short Cookies section.

**Tech Stack:** TanStack Start (React 19), Vite, Tailwind CSS v4, Biome (tabs, double quotes), Vitest + jsdom + @testing-library/react. Package manager: `pnpm`.

**Notes for the implementer:**
- `@testing-library/jest-dom` is **not** installed. Do NOT use `toBeInTheDocument()`/`toHaveTextContent()`. Assert presence with `getByRole` (it throws if missing) and absence with `queryByRole(...)` → `.toBeNull()`.
- Run a single test file with `pnpm exec vitest run <path>`; the whole suite with `pnpm test`.
- After each task, formatting/lint is handled by `pnpm exec biome check --write <files>` — let Biome fix import ordering rather than hand-ordering.
- The branch `feat/cookie-consent` already exists and is checked out (the design spec is committed there).

---

### Task 1: Consent module (source of truth)

**Files:**
- Create: `src/lib/consent.ts`
- Test: `src/lib/__tests__/consent.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/consent.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	acceptAll,
	CONSENT_KEY,
	CONSENT_EVENT,
	CONSENT_VERSION,
	getStoredConsent,
	hasConsent,
	rejectNonEssential,
	setConsent,
} from "#/lib/consent";

beforeEach(() => {
	localStorage.clear();
});

describe("consent module", () => {
	it("returns null when no choice has been made", () => {
		expect(getStoredConsent()).toBeNull();
		expect(hasConsent("analytics")).toBe(false);
	});

	it("acceptAll grants both categories", () => {
		acceptAll();
		expect(getStoredConsent()).toEqual({ analytics: true, marketing: true });
		expect(hasConsent("analytics")).toBe(true);
		expect(hasConsent("marketing")).toBe(true);
	});

	it("rejectNonEssential denies both categories", () => {
		rejectNonEssential();
		expect(getStoredConsent()).toEqual({ analytics: false, marketing: false });
		expect(hasConsent("analytics")).toBe(false);
	});

	it("ignores a record saved under a different version", () => {
		localStorage.setItem(
			CONSENT_KEY,
			JSON.stringify({
				v: CONSENT_VERSION + 1,
				analytics: true,
				marketing: true,
			}),
		);
		expect(getStoredConsent()).toBeNull();
	});

	it("returns null for malformed json", () => {
		localStorage.setItem(CONSENT_KEY, "not json{");
		expect(getStoredConsent()).toBeNull();
	});

	it("dispatches CONSENT_EVENT on save", () => {
		const listener = vi.fn();
		window.addEventListener(CONSENT_EVENT, listener);
		setConsent({ analytics: true, marketing: false });
		expect(listener).toHaveBeenCalledTimes(1);
		window.removeEventListener(CONSENT_EVENT, listener);
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run src/lib/__tests__/consent.test.ts`
Expected: FAIL — cannot resolve `#/lib/consent` (module doesn't exist yet).

- [ ] **Step 3: Write the module**

Create `src/lib/consent.ts`:

```ts
export type ConsentCategory = "analytics" | "marketing";

export type Consent = {
	analytics: boolean;
	marketing: boolean;
};

export const CONSENT_KEY = "viteloop-consent";

/** Bump when the cookie policy materially changes to re-prompt every visitor. */
export const CONSENT_VERSION = 1;

/** Fired on `window` after a consent choice is saved. `detail` is the Consent. */
export const CONSENT_EVENT = "viteloop:consent-change";

/** Fired to re-summon the banner (e.g. the footer "Cookie settings" link). */
export const CONSENT_OPEN_EVENT = "viteloop:consent-open";

type StoredConsent = Consent & { v: number; at: string };

/**
 * Read the saved consent choice, or null when the visitor hasn't chosen, the
 * stored version is stale, or storage is unavailable / malformed.
 */
export function getStoredConsent(): Consent | null {
	if (typeof localStorage === "undefined") return null;
	try {
		const raw = localStorage.getItem(CONSENT_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as Partial<StoredConsent>;
		if (parsed.v !== CONSENT_VERSION) return null;
		if (typeof parsed.analytics !== "boolean") return null;
		if (typeof parsed.marketing !== "boolean") return null;
		return { analytics: parsed.analytics, marketing: parsed.marketing };
	} catch {
		return null;
	}
}

/** Persist a consent choice and notify listeners via CONSENT_EVENT. */
export function setConsent(consent: Consent): void {
	if (typeof window === "undefined") return;
	const record: StoredConsent = {
		v: CONSENT_VERSION,
		analytics: consent.analytics,
		marketing: consent.marketing,
		at: new Date().toISOString(),
	};
	try {
		localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
	} catch {
		/* storage unavailable (private mode) — still notify listeners below */
	}
	window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
}

export function acceptAll(): void {
	setConsent({ analytics: true, marketing: true });
}

export function rejectNonEssential(): void {
	setConsent({ analytics: false, marketing: false });
}

/** Whether the visitor has consented to a category (false when unset). */
export function hasConsent(category: ConsentCategory): boolean {
	const consent = getStoredConsent();
	return consent ? consent[category] : false;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run src/lib/__tests__/consent.test.ts`
Expected: PASS — all 6 tests green.

- [ ] **Step 5: Format and commit**

```bash
pnpm exec biome check --write src/lib/consent.ts src/lib/__tests__/consent.test.ts
git add src/lib/consent.ts src/lib/__tests__/consent.test.ts
git commit -m "$(cat <<'EOF'
feat: add cookie-consent module

Versioned localStorage consent record with accept/reject helpers,
hasConsent gating, and a change event for future script loaders.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: `useConsent` hook

**Files:**
- Create: `src/hooks/use-consent.ts`
- Test: `src/hooks/__tests__/use-consent.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/hooks/__tests__/use-consent.test.ts`:

```ts
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useConsent } from "#/hooks/use-consent";
import { acceptAll } from "#/lib/consent";

beforeEach(() => {
	localStorage.clear();
});

describe("useConsent", () => {
	it("reports no consent initially", () => {
		const { result } = renderHook(() => useConsent());
		expect(result.current.consent).toBeNull();
		expect(result.current.hasConsent("analytics")).toBe(false);
	});

	it("updates reactively when consent is granted", () => {
		const { result } = renderHook(() => useConsent());
		act(() => {
			acceptAll();
		});
		expect(result.current.hasConsent("analytics")).toBe(true);
		expect(result.current.consent).toEqual({ analytics: true, marketing: true });
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run src/hooks/__tests__/use-consent.test.ts`
Expected: FAIL — cannot resolve `#/hooks/use-consent`.

- [ ] **Step 3: Write the hook**

Create `src/hooks/use-consent.ts`:

```ts
import { useEffect, useState } from "react";
import {
	type Consent,
	type ConsentCategory,
	CONSENT_EVENT,
	getStoredConsent,
} from "#/lib/consent";

/**
 * Reactive access to the visitor's cookie-consent choice. Use this to gate
 * analytics/marketing scripts:
 *
 *   const { hasConsent } = useConsent();
 *   if (hasConsent("analytics")) return <PlausibleScript />;
 *
 * `consent` is null until mounted, keeping hydration deterministic (SSR-safe).
 */
export function useConsent() {
	const [mounted, setMounted] = useState(false);
	const [consent, setConsent] = useState<Consent | null>(null);

	useEffect(() => {
		setMounted(true);
		setConsent(getStoredConsent());

		function onChange() {
			setConsent(getStoredConsent());
		}
		window.addEventListener(CONSENT_EVENT, onChange);
		return () => window.removeEventListener(CONSENT_EVENT, onChange);
	}, []);

	function hasConsent(category: ConsentCategory): boolean {
		return consent ? consent[category] : false;
	}

	return { consent, hasConsent, mounted };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run src/hooks/__tests__/use-consent.test.ts`
Expected: PASS — both tests green.

- [ ] **Step 5: Format and commit**

```bash
pnpm exec biome check --write src/hooks/use-consent.ts src/hooks/__tests__/use-consent.test.ts
git add src/hooks/use-consent.ts src/hooks/__tests__/use-consent.test.ts
git commit -m "$(cat <<'EOF'
feat: add useConsent hook for gating scripts

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Cookie consent banner

**Files:**
- Create: `src/components/site/cookie-consent.tsx`
- Test: `src/components/site/__tests__/cookie-consent.test.tsx`

The banner uses TanStack Router's `<Link>`, which needs a router context to render. The test mocks the router so the component can render standalone.

- [ ] **Step 1: Write the failing test**

Create `src/components/site/__tests__/cookie-consent.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// The banner links to /privacy via <Link>; stub it as a plain anchor.
vi.mock("@tanstack/react-router", () => ({
	Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => (
		<a href={to} {...props}>
			{children}
		</a>
	),
}));

import { CookieConsent } from "#/components/site/cookie-consent";
import { CONSENT_OPEN_EVENT, getStoredConsent } from "#/lib/consent";

beforeEach(() => {
	localStorage.clear();
});

describe("CookieConsent", () => {
	it("shows for a visitor with no stored choice", () => {
		render(<CookieConsent />);
		// getByRole throws if the button is missing — presence assertion.
		screen.getByRole("button", { name: "Accept all" });
		screen.getByRole("button", { name: "Reject non-essential" });
	});

	it("stores consent and hides after Accept all", () => {
		render(<CookieConsent />);
		fireEvent.click(screen.getByRole("button", { name: "Accept all" }));
		expect(screen.queryByRole("button", { name: "Accept all" })).toBeNull();
		expect(getStoredConsent()).toEqual({ analytics: true, marketing: true });
	});

	it("stores a reject choice and hides after Reject non-essential", () => {
		render(<CookieConsent />);
		fireEvent.click(screen.getByRole("button", { name: "Reject non-essential" }));
		expect(screen.queryByRole("button", { name: "Reject non-essential" })).toBeNull();
		expect(getStoredConsent()).toEqual({ analytics: false, marketing: false });
	});

	it("does not show when a choice already exists", () => {
		localStorage.setItem(
			"viteloop-consent",
			JSON.stringify({ v: 1, analytics: true, marketing: true, at: "now" }),
		);
		render(<CookieConsent />);
		expect(screen.queryByRole("button", { name: "Accept all" })).toBeNull();
	});

	it("re-appears when a consent-open event fires", () => {
		localStorage.setItem(
			"viteloop-consent",
			JSON.stringify({ v: 1, analytics: true, marketing: true, at: "now" }),
		);
		render(<CookieConsent />);
		expect(screen.queryByRole("button", { name: "Accept all" })).toBeNull();
		fireEvent(window, new Event(CONSENT_OPEN_EVENT));
		screen.getByRole("button", { name: "Accept all" });
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run src/components/site/__tests__/cookie-consent.test.tsx`
Expected: FAIL — cannot resolve `#/components/site/cookie-consent`.

- [ ] **Step 3: Write the banner**

Create `src/components/site/cookie-consent.tsx`:

```tsx
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { buttonVariants } from "#/components/ui/button";
import {
	acceptAll,
	CONSENT_OPEN_EVENT,
	getStoredConsent,
	rejectNonEssential,
} from "#/lib/consent";
import { cn } from "#/lib/utils";

export function CookieConsent() {
	// Server render and first client render both produce null (no flash);
	// the effect flips this on only for visitors who haven't chosen yet.
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (getStoredConsent() === null) setVisible(true);

		function onOpen() {
			setVisible(true);
		}
		window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
		return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
	}, []);

	if (!visible) return null;

	function accept() {
		acceptAll();
		setVisible(false);
	}

	function reject() {
		rejectNonEssential();
		setVisible(false);
	}

	return (
		<div
			role="dialog"
			aria-label="Cookie consent"
			className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg-soft/95 backdrop-blur"
		>
			<div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
				<p className="text-sm text-fg-muted">
					We use essential cookies to run this site. With your consent we also use
					analytics to improve it. See our{" "}
					<Link
						to="/privacy"
						className="text-fg underline underline-offset-4 hover:text-accent"
					>
						Privacy Policy
					</Link>
					.
				</p>
				<div className="flex shrink-0 gap-3">
					<button
						type="button"
						onClick={reject}
						className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
					>
						Reject non-essential
					</button>
					<button
						type="button"
						onClick={accept}
						className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
					>
						Accept all
					</button>
				</div>
			</div>
		</div>
	);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run src/components/site/__tests__/cookie-consent.test.tsx`
Expected: PASS — all 5 tests green.

- [ ] **Step 5: Format and commit**

```bash
pnpm exec biome check --write src/components/site/cookie-consent.tsx src/components/site/__tests__/cookie-consent.test.tsx
git add src/components/site/cookie-consent.tsx src/components/site/__tests__/cookie-consent.test.tsx
git commit -m "$(cat <<'EOF'
feat: add cookie consent banner

Bottom bar with Accept all / Reject non-essential, re-summonable via
the consent-open event. Renders only when no choice exists.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Footer "Cookie settings" link

**Files:**
- Modify: `src/components/site/site-footer.tsx`

Add a subtle button in the footer meta row that re-summons the banner by dispatching `CONSENT_OPEN_EVENT`.

- [ ] **Step 1: Add the import**

At the top of `src/components/site/site-footer.tsx`, add to the existing imports:

```tsx
import { CONSENT_OPEN_EVENT } from "#/lib/consent";
```

- [ ] **Step 2: Replace the footer meta row**

Find this block near the end of the component:

```tsx
			<div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
				<p className="text-sm text-fg-faint">
					© 2026 {SITE.name}. All rights reserved.
				</p>
				<p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
					{SITE.thesis}
				</p>
			</div>
```

Replace it with:

```tsx
			<div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
					<p className="text-sm text-fg-faint">
						© 2026 {SITE.name}. All rights reserved.
					</p>
					<button
						type="button"
						onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
						className="text-left text-sm text-fg-faint transition-colors hover:text-fg"
					>
						Cookie settings
					</button>
				</div>
				<p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
					{SITE.thesis}
				</p>
			</div>
```

- [ ] **Step 3: Verify the suite still passes**

Run: `pnpm test`
Expected: PASS — all existing and new tests green (no test targets the footer directly; this confirms nothing regressed).

- [ ] **Step 4: Format and commit**

```bash
pnpm exec biome check --write src/components/site/site-footer.tsx
git add src/components/site/site-footer.tsx
git commit -m "$(cat <<'EOF'
feat: add "Cookie settings" link to footer

Re-opens the consent banner so visitors can change their choice.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Render the banner in the root layout

**Files:**
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Add the import**

In `src/routes/__root.tsx`, add alongside the other `#/components/site/...` imports:

```tsx
import { CookieConsent } from "#/components/site/cookie-consent";
```

- [ ] **Step 2: Render the banner after the footer**

Find:

```tsx
				<SiteFooter />
				<TanStackDevtools
```

Replace with:

```tsx
				<SiteFooter />
				<CookieConsent />
				<TanStackDevtools
```

- [ ] **Step 3: Verify the suite still passes**

Run: `pnpm test`
Expected: PASS.

- [ ] **Step 4: Format and commit**

```bash
pnpm exec biome check --write src/routes/__root.tsx
git add src/routes/__root.tsx
git commit -m "$(cat <<'EOF'
feat: mount cookie consent banner in root layout

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Privacy page Cookies section

**Files:**
- Modify: `src/routes/privacy.tsx`

- [ ] **Step 1: Insert the Cookies section**

In `src/routes/privacy.tsx`, find the "Sub-processors" section:

```tsx
					<h2>Sub-processors</h2>
					<p>
						We use a limited set of vetted vendors for hosting our website,
						customer communication, and analytics. Each is bound by data
						protection terms consistent with this policy.
					</p>
```

Immediately after that closing `</p>`, add:

```tsx
					<h2>Cookies</h2>
					<p>
						We use strictly necessary storage to run the site — for example,
						remembering your light or dark theme preference. With your consent,
						we also use analytics cookies to understand how the site is used so
						we can improve it. We do not use advertising cookies.
					</p>
					<p>
						You choose your preference the first time you visit, and you can
						change or withdraw it at any time using the “Cookie settings” link in
						the footer.
					</p>
```

- [ ] **Step 2: Verify the suite still passes**

Run: `pnpm test`
Expected: PASS.

- [ ] **Step 3: Format and commit**

```bash
pnpm exec biome check --write src/routes/privacy.tsx
git add src/routes/privacy.tsx
git commit -m "$(cat <<'EOF'
docs: add cookies section to privacy policy

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `pnpm test`
Expected: PASS — all suites green (data, consent, use-consent, cookie-consent).

- [ ] **Step 2: Lint/format check**

Run: `pnpm check`
Expected: no errors (Biome reports the files clean).

- [ ] **Step 3: Production build (typechecks + SSR)**

Run: `pnpm build`
Expected: build completes with no type or SSR errors. This confirms the consent module's `typeof window`/`typeof localStorage` guards keep it SSR-safe.

- [ ] **Step 4: Manual smoke test in the dev server**

Run: `pnpm dev` and open http://localhost:3000 in a fresh/incognito window. Verify, in order:
1. The banner appears at the bottom on first load.
2. Clicking **Accept all** dismisses it; reloading does not show it again.
3. In DevTools → Application → Local Storage, `viteloop-consent` holds `{"v":1,"analytics":true,"marketing":true,"at":...}`.
4. Clicking **Cookie settings** in the footer re-opens the banner.
5. Clicking **Reject non-essential** stores `analytics:false, marketing:false` and dismisses it.
6. The `/privacy` page shows the new **Cookies** section.

Stop the dev server when done (Ctrl-C).

- [ ] **Step 5: Confirm branch state**

Run: `git log --oneline main..feat/cookie-consent`
Expected: the spec commit plus six implementation commits (Tasks 1–6).

---

## Self-Review (completed by plan author)

**Spec coverage:**
- Consent module (`lib/consent.ts`) → Task 1. ✓
- `useConsent` hook → Task 2. ✓
- Banner component (bottom bar, tokens, re-summon, no SSR render) → Task 3. ✓
- Footer "Cookie settings" link → Task 4. ✓
- Root wiring after `<SiteFooter/>` → Task 5. ✓
- Privacy page Cookies section → Task 6. ✓
- Testing (unset→null, accept/reject, version mismatch, malformed, event) → Task 1 tests. ✓
- SSR-safety verification → Task 7 build step. ✓

**Placeholder scan:** No TBD/TODO; every code and test step contains full content. ✓

**Type consistency:** `Consent = { analytics, marketing }`, `ConsentCategory = "analytics" | "marketing"`, and the helpers `getStoredConsent` / `setConsent` / `acceptAll` / `rejectNonEssential` / `hasConsent` are named identically across the module, hook, banner, footer, and all tests. Event constants `CONSENT_EVENT` / `CONSENT_OPEN_EVENT` and key `CONSENT_KEY` / `CONSENT_VERSION` are consistent. Button variants (`primary`, `ghost`) and sizes (`sm`) match `src/components/ui/button.tsx`. No `jest-dom` matchers used. ✓
