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
					We use essential cookies to run this site. With your consent we also
					use analytics to improve it. See our{" "}
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
