import { useEffect, useState } from "react";
import {
	CONSENT_EVENT,
	type Consent,
	type ConsentCategory,
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
