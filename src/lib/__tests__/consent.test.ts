import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	acceptAll,
	CONSENT_EVENT,
	CONSENT_KEY,
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

	it("returns null when a stored field is not a boolean", () => {
		localStorage.setItem(
			CONSENT_KEY,
			JSON.stringify({ v: CONSENT_VERSION, analytics: "yes", marketing: true }),
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
		const event = listener.mock.calls[0][0] as CustomEvent;
		expect(event.detail).toEqual({ analytics: true, marketing: false });
		window.removeEventListener(CONSENT_EVENT, listener);
	});

	it("dispatches CONSENT_EVENT even when the write throws", () => {
		const setItem = vi
			.spyOn(Storage.prototype, "setItem")
			.mockImplementation(() => {
				throw new Error("quota");
			});
		const listener = vi.fn();
		window.addEventListener(CONSENT_EVENT, listener);
		setConsent({ analytics: true, marketing: true });
		expect(listener).toHaveBeenCalledTimes(1);
		window.removeEventListener(CONSENT_EVENT, listener);
		setItem.mockRestore();
	});
});
