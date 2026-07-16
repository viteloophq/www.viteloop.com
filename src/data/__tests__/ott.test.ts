import { describe, expect, it } from "vitest";
import {
	OTT_AUDIENCE,
	OTT_FAQ,
	OTT_FEATURES,
	OTT_HERO,
	OTT_SEO,
} from "#/data/ott";
import { productLinkProps } from "#/data/products";

describe("ott data", () => {
	it("has a hero with title, lead, and badges", () => {
		expect(OTT_HERO.title).toBeTruthy();
		expect(OTT_HERO.lead.length).toBeGreaterThan(80);
		expect(OTT_HERO.badges.length).toBeGreaterThanOrEqual(3);
	});

	it("has an SEO title and a SERP-sized description", () => {
		expect(OTT_SEO.title).toContain("Viteloop");
		expect(OTT_SEO.description.length).toBeGreaterThanOrEqual(110);
		expect(OTT_SEO.description.length).toBeLessThanOrEqual(175);
	});

	it("has the six launch features with unique titles", () => {
		expect(OTT_FEATURES).toHaveLength(6);
		const titles = OTT_FEATURES.map((f) => f.title);
		expect(new Set(titles).size).toBe(6);
		for (const f of OTT_FEATURES) {
			expect(f.blurb.length).toBeGreaterThan(20);
		}
	});

	it("has audience segments and substantive FAQs", () => {
		expect(OTT_AUDIENCE.length).toBeGreaterThanOrEqual(3);
		expect(OTT_FAQ.length).toBeGreaterThanOrEqual(4);
		for (const f of OTT_FAQ) {
			expect(f.q).toBeTruthy();
			expect(f.a.length).toBeGreaterThan(30);
		}
	});

	it("routes ott links to the dedicated route", () => {
		expect(productLinkProps("ott")).toEqual({ to: "/products/ott" });
		expect(productLinkProps("stream")).toEqual({
			to: "/products/$slug",
			params: { slug: "stream" },
		});
	});
});
