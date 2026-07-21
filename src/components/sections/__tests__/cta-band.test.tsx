import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { CTABand } from "#/components/sections/cta-band";

describe("CTABand", () => {
	it("renders opt-in external CTAs as <a> links with the given hrefs", () => {
		render(
			<CTABand
				heading="Own the edge."
				primaryCta={{
					label: "Start free",
					href: "https://console.viteloop.com/signup",
				}}
				secondaryCta={{
					label: "Deploy a node",
					href: "https://console.viteloop.com/signup",
				}}
			/>,
		);

		const primary = screen.getByRole("link", { name: /start free/i });
		if (
			primary.getAttribute("href") !== "https://console.viteloop.com/signup"
		) {
			throw new Error(
				`expected primary href https://console.viteloop.com/signup, got ${primary.getAttribute("href")}`,
			);
		}

		screen.getByRole("link", { name: /deploy a node/i });
	});
});
