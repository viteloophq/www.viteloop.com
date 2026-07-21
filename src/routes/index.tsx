import { createFileRoute } from "@tanstack/react-router";
import { CTABand } from "#/components/sections/cta-band";
import { DeveloperTeaser } from "#/components/sections/developer-teaser";
import { Hero } from "#/components/sections/hero";
import { PricingTeaser } from "#/components/sections/pricing-teaser";
import { ProductBento } from "#/components/sections/product-bento";
import { RunItYourWay } from "#/components/sections/run-it-your-way";
import { ScaleStrip } from "#/components/sections/scale-strip";
import { WhyViteLoop } from "#/components/sections/why-viteloop";
import { HOME_URLS } from "#/data/home";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/")({
	component: Home,
	head: () =>
		seo({
			title: "ViteLoop — Own the Edge",
			description:
				"The edge platform you can run yourself. CDN, video, live, DRM, and commerce — managed on ViteLoop's global network or deployed on your own nodes.",
			path: "/",
		}),
});

function Home() {
	return (
		<>
			<Hero />
			<ScaleStrip />
			<ProductBento />
			<RunItYourWay />
			<WhyViteLoop />
			<DeveloperTeaser />
			<PricingTeaser />
			<CTABand
				heading="Own the edge."
				subtext="Spin up on ViteLoop's network or deploy your own nodes — video, live, DRM, and commerce, your way."
				primaryCta={{ label: "Start free", href: HOME_URLS.signup }}
				secondaryCta={{ label: "Deploy a node", href: HOME_URLS.deploy }}
			/>
		</>
	);
}
