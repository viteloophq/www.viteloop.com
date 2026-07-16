import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CommerceMockup } from "#/components/visuals/commerce-mockup";

describe("CommerceMockup", () => {
	it("shows the dashboard overview by default", () => {
		render(<CommerceMockup />);
		screen.getByText("Total sales");
		expect(screen.queryByText("A. Rahman")).toBeNull();
	});

	it("switches to orders when the Orders tab is clicked", () => {
		render(<CommerceMockup />);
		fireEvent.click(screen.getByRole("button", { name: /Orders/ }));
		screen.getByText("A. Rahman");
		expect(screen.queryByText("Total sales")).toBeNull();
	});

	it("switches to products and analytics panels", () => {
		render(<CommerceMockup />);
		fireEvent.click(screen.getByRole("button", { name: /Products/ }));
		screen.getByText("Aurora Tee");
		fireEvent.click(screen.getByRole("button", { name: /Analytics/ }));
		screen.getByText("Visitors");
		expect(screen.queryByText("Aurora Tee")).toBeNull();
	});
});
