import { createFileRoute } from "@tanstack/react-router";
import { Architecture } from "#/components/sections/architecture";
import { Benefits } from "#/components/sections/benefits";
import { CTABand } from "#/components/sections/cta-band";
import { DeployAnywhere } from "#/components/sections/deploy-anywhere";
import { DeveloperTeaser } from "#/components/sections/developer-teaser";
import { Hero } from "#/components/sections/hero";
import { Problems } from "#/components/sections/problems";
import { ProductGrid } from "#/components/sections/product-grid";
import { TrustStrip } from "#/components/sections/trust-strip";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/")({
	component: Home,
	head: () =>
		seo({
			title: "Viteloop — Powering the Next Internet",
			description:
				"Enterprise software for building private CDN platforms, media infrastructure, edge networks, and cloud-native services — deployed in your own environment.",
			path: "/",
		}),
});

function Home() {
	return (
		<>
			<Hero />
			<TrustStrip />
			<ProductGrid />
			<Benefits />
			<DeployAnywhere />
			<Problems />
			<Architecture />
			<DeveloperTeaser />
			<CTABand />
		</>
	);
}
