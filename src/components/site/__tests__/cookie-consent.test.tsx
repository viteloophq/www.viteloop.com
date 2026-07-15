import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// The banner links to /privacy via <Link>; stub it as a plain anchor.
vi.mock("@tanstack/react-router", () => ({
	Link: ({
		children,
		to,
		...props
	}: {
		children: React.ReactNode;
		to: string;
	}) => (
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
		fireEvent.click(
			screen.getByRole("button", { name: "Reject non-essential" }),
		);
		expect(
			screen.queryByRole("button", { name: "Reject non-essential" }),
		).toBeNull();
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
