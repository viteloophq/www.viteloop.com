import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { WhyViteLoop } from "#/components/sections/why-viteloop";

describe("WhyViteLoop", () => {
	it("renders all three pillar titles", () => {
		render(<WhyViteLoop />);
		screen.getByText("Own your infrastructure");
		screen.getByText("Every media workload, one platform");
		screen.getByText("Global by default");
	});
});
