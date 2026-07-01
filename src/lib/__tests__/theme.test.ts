import { beforeEach, describe, expect, it } from "vitest";
import { applyTheme, resolveInitialTheme, THEME_KEY } from "#/lib/theme";

describe("theme helpers", () => {
	beforeEach(() => {
		document.documentElement.className = "";
		localStorage.clear();
	});

	it("defaults to light when nothing stored", () => {
		expect(resolveInitialTheme()).toBe("light");
	});

	it("honors a stored preference", () => {
		localStorage.setItem(THEME_KEY, "dark");
		expect(resolveInitialTheme()).toBe("dark");
	});

	it("applyTheme toggles the html class and persists", () => {
		applyTheme("light");
		expect(document.documentElement.classList.contains("light")).toBe(true);
		expect(document.documentElement.classList.contains("dark")).toBe(false);
		expect(localStorage.getItem(THEME_KEY)).toBe("light");

		applyTheme("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);
		expect(document.documentElement.classList.contains("light")).toBe(false);
	});
});
