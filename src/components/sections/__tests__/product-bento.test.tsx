import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { HOME_PILLARS } from "#/data/home";

vi.mock("@tanstack/react-router", () => ({
	// biome-ignore lint/suspicious/noExplicitAny: test stub for typed router Link
	Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

const { ProductBento } = await import("#/components/sections/product-bento");

describe("ProductBento", () => {
	it("renders all 6 HOME_PILLARS names", () => {
		render(<ProductBento />);
		for (const pillar of HOME_PILLARS) {
			screen.getByText(pillar.name);
		}
	});
});
