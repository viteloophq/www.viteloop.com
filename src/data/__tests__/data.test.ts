import { describe, expect, it } from "vitest";
import { BENEFITS } from "#/data/benefits";
import { CUSTOMERS } from "#/data/customers";
import { getProduct, PRODUCTS } from "#/data/products";
import { SOLUTIONS } from "#/data/solutions";

describe("data layer", () => {
	it("has exactly 6 products with unique slugs", () => {
		expect(PRODUCTS).toHaveLength(6);
		expect(new Set(PRODUCTS.map((p) => p.slug)).size).toBe(6);
	});

	it("every product has >=3 features and exactly 3 highlights", () => {
		for (const p of PRODUCTS) {
			expect(p.features.length).toBeGreaterThanOrEqual(3);
			expect(p.highlights).toHaveLength(3);
		}
	});

	it("getProduct resolves by slug", () => {
		expect(getProduct("cdn")?.name).toBe("ViteLoop CDN");
		expect(getProduct("nope")).toBeUndefined();
	});

	it("has 10 benefits and 10 customer types", () => {
		expect(BENEFITS).toHaveLength(10);
		expect(CUSTOMERS).toHaveLength(10);
	});

	it("solutions reference real product slugs", () => {
		const slugs = new Set(PRODUCTS.map((p) => p.slug));
		for (const s of SOLUTIONS) {
			for (const ref of s.products) {
				expect(slugs.has(ref)).toBe(true);
			}
		}
	});
});
