import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "#/components/primitives/page-hero";
import { CTABand } from "#/components/sections/cta-band";
import { ProductGrid } from "#/components/sections/product-grid";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/products/")({
	component: ProductsPage,
	head: () =>
		seo({
			title: "Products — Viteloop",
			description:
				"Composable infrastructure products — CDN, Stream, Transcoder, DRM, OTT, and LMS — that you deploy and own.",
			path: "/products",
		}),
});

function ProductsPage() {
	return (
		<>
			<PageHero
				kicker="The Viteloop platform"
				title="The building blocks of your infrastructure."
			>
				Composable products that share one control plane, one API surface, and
				one deployment model. Run the whole platform or a single component — in
				your environment, under your control.
			</PageHero>
			<ProductGrid variant="detailed" heading={false} />
			<CTABand
				heading="See the platform in your environment."
				subtext="Request a technical walkthrough and we'll show you how Viteloop deploys into your stack."
			/>
		</>
	);
}
