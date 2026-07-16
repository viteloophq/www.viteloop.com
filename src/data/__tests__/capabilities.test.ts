import { describe, expect, it } from "vitest";
import {
	CAPABILITIES,
	getCapability,
	getCatalogEntry,
	isCapability,
} from "#/data/capabilities";
import { PRODUCTS } from "#/data/products";

describe("capabilities", () => {
	it("has 6 capabilities with unique slugs, none clashing with products", () => {
		expect(CAPABILITIES).toHaveLength(6);
		const slugs = CAPABILITIES.map((c) => c.slug);
		expect(new Set(slugs).size).toBe(6);
		const productSlugs = new Set(PRODUCTS.map((p) => p.slug));
		for (const s of slugs) {
			expect(productSlugs.has(s)).toBe(false);
		}
	});

	it("every capability has substantive SEO + content fields", () => {
		for (const c of CAPABILITIES) {
			expect(c.name).toBeTruthy();
			expect(c.tagline).toBeTruthy();
			expect(c.summary.length).toBeGreaterThan(80);
			expect(c.seoTitle).toBeTruthy();
			// Meta description in a sensible range for SERP display.
			expect(c.seoDescription.length).toBeGreaterThanOrEqual(110);
			expect(c.seoDescription.length).toBeLessThanOrEqual(175);
			expect(c.features.length).toBeGreaterThanOrEqual(3);
			expect(c.highlights).toHaveLength(3);
			expect(c.faqs.length).toBeGreaterThanOrEqual(3);
			for (const f of c.faqs) {
				expect(f.q).toBeTruthy();
				expect(f.a.length).toBeGreaterThan(20);
			}
		}
	});

	it("related slugs resolve to a product or capability", () => {
		for (const c of CAPABILITIES) {
			for (const slug of c.related) {
				expect(getCatalogEntry(slug)).toBeDefined();
			}
		}
	});

	it("getCatalogEntry resolves both products and capabilities", () => {
		expect(getCatalogEntry("cdn")?.name).toBe("Viteloop CDN");
		expect(getCatalogEntry("waf")?.name).toBe("Web Application Firewall (WAF)");
		expect(getCatalogEntry("does-not-exist")).toBeUndefined();
	});

	it("getCapability only resolves capabilities", () => {
		expect(getCapability("cdn")).toBeUndefined();
		expect(getCapability("waf")?.slug).toBe("waf");
	});

	it("isCapability discriminates products from capabilities", () => {
		const waf = getCatalogEntry("waf");
		const cdn = getCatalogEntry("cdn");
		expect(waf && isCapability(waf)).toBe(true);
		expect(cdn && isCapability(cdn)).toBe(false);
	});
});
