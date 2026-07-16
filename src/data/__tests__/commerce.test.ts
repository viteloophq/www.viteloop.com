import { describe, expect, it } from "vitest";
import {
	COMMERCE_FAQ,
	COMMERCE_FEATURES,
	COMMERCE_HERO,
	COMMERCE_SEO,
	COMMERCE_WHY,
} from "#/data/commerce";

describe("commerce data", () => {
	it("has a hero with title, lead, and badges", () => {
		expect(COMMERCE_HERO.title).toBeTruthy();
		expect(COMMERCE_HERO.lead.length).toBeGreaterThan(80);
		expect(COMMERCE_HERO.badges.length).toBeGreaterThanOrEqual(3);
	});

	it("has an SEO title and a SERP-sized description", () => {
		expect(COMMERCE_SEO.title).toContain("Viteloop");
		expect(COMMERCE_SEO.description.length).toBeGreaterThanOrEqual(110);
		expect(COMMERCE_SEO.description.length).toBeLessThanOrEqual(175);
	});

	it("has a why list and feature cards with unique titles", () => {
		expect(COMMERCE_WHY.length).toBeGreaterThanOrEqual(10);
		expect(COMMERCE_FEATURES.length).toBeGreaterThanOrEqual(12);
		const titles = COMMERCE_FEATURES.map((f) => f.title);
		expect(new Set(titles).size).toBe(titles.length);
		for (const f of COMMERCE_FEATURES) {
			expect(f.title).toBeTruthy();
			expect(f.blurb.length).toBeGreaterThan(20);
		}
	});

	it("has FAQs with substantive answers", () => {
		expect(COMMERCE_FAQ.length).toBeGreaterThanOrEqual(4);
		for (const f of COMMERCE_FAQ) {
			expect(f.q).toBeTruthy();
			expect(f.a.length).toBeGreaterThan(30);
		}
	});
});
