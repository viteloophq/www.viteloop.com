import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import {
	DrmMockup,
	LmsMockup,
	StreamMockup,
	TranscoderMockup,
} from "#/components/visuals/product-mockups";

describe("product mockups", () => {
	it("StreamMockup renders its wordmark and quality ladder", () => {
		render(<StreamMockup />);
		screen.getByText("Viteloop Stream");
		screen.getByText("1080p");
	});

	it("DrmMockup renders its wordmark and DRM systems", () => {
		render(<DrmMockup />);
		screen.getByText("Viteloop DRM");
		screen.getByText("Widevine");
	});

	it("TranscoderMockup renders its wordmark and a codec", () => {
		render(<TranscoderMockup />);
		screen.getByText("Viteloop Transcoder");
		screen.getByText("AV1");
	});

	it("LmsMockup renders its wordmark and a lesson", () => {
		render(<LmsMockup />);
		screen.getByText("Viteloop LMS");
		screen.getByText("Introduction");
	});
});
