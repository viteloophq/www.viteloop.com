import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RunItYourWay } from "#/components/sections/run-it-your-way";
import { DEPLOY_COMMAND } from "#/data/home";

describe("RunItYourWay", () => {
	it("renders both mode headings", () => {
		render(<RunItYourWay />);
		screen.getByText("Use our network");
		screen.getByText("Deploy your own nodes");
	});

	it("renders the deploy snippet with the DEPLOY_COMMAND text", () => {
		render(<RunItYourWay />);
		// `textContent` matches recursively, so both <pre> and its <code> child
		// satisfy the predicate — use getAllByText (still throws on zero matches)
		// instead of getByText (which throws on >1 match) to assert presence.
		screen.getAllByText(
			(_, el) => el?.textContent?.includes(DEPLOY_COMMAND) ?? false,
		);
	});

	it("renders a 'Start free' link to the signup console", () => {
		render(<RunItYourWay />);
		const link = screen.getByRole("link", { name: /start free/i });
		expect(link.getAttribute("href")).toBe(
			"https://console.viteloop.com/signup",
		);
	});
});
