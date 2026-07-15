import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useConsent } from "#/hooks/use-consent";
import { acceptAll, rejectNonEssential } from "#/lib/consent";

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
		expect(result.current.consent).toEqual({
			analytics: true,
			marketing: true,
		});
	});

	it("reflects an explicit reject choice", () => {
		const { result } = renderHook(() => useConsent());
		act(() => {
			rejectNonEssential();
		});
		expect(result.current.hasConsent("analytics")).toBe(false);
		expect(result.current.consent).toEqual({
			analytics: false,
			marketing: false,
		});
	});

	it("sets mounted true after hydration", () => {
		const { result } = renderHook(() => useConsent());
		expect(result.current.mounted).toBe(true);
	});
});
