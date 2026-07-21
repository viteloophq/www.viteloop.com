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
