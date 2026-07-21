import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { ScaleStrip } from "#/components/sections/scale-strip";
import { HOME_STATS } from "#/data/home";

describe("ScaleStrip", () => {
	it("renders every stat label from HOME_STATS", () => {
		render(<ScaleStrip />);
		for (const stat of HOME_STATS) {
			screen.getByText(stat.label);
		}
	});
});
