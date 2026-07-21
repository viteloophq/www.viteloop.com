import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { PricingTeaser } from "#/components/sections/pricing-teaser";
import { HOME_PRICING, HOME_URLS } from "#/data/home";

describe("PricingTeaser", () => {
	it("renders the headline", () => {
		render(<PricingTeaser />);
		screen.getByText(HOME_PRICING.headline);
	});

	it("links 'Start free' to the signup console URL", () => {
		render(<PricingTeaser />);
		const link = screen.getByRole("link", { name: /start free/i });
		if (link.getAttribute("href") !== HOME_URLS.signup) {
			throw new Error(
				`expected href ${HOME_URLS.signup}, got ${link.getAttribute("href")}`,
			);
		}
	});
});
