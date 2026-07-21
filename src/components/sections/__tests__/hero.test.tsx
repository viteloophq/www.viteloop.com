import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "#/components/sections/hero";

describe("Hero", () => {
	it("renders the 'Own the edge.' headline", () => {
		render(<Hero />);
		screen.getByText("Own the edge.");
	});

	it("renders a 'Start free' link to the signup console", () => {
		render(<Hero />);
		const link = screen.getByRole("link", { name: /start free/i });
		expect(link.getAttribute("href")).toBe(
			"https://console.viteloop.com/signup",
		);
	});
});
