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
	window.dispatchEvent(
		new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }),
	);
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
