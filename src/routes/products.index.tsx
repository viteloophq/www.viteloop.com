import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { PageHero } from "#/components/primitives/page-hero";
import { Section } from "#/components/primitives/section";
import { CTABand } from "#/components/sections/cta-band";
import { ProductGrid } from "#/components/sections/product-grid";
import { buttonVariants } from "#/components/ui/button";
import { CAPABILITIES } from "#/data/capabilities";
import { breadcrumbScript, seo } from "#/lib/seo";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/products/")({
	component: ProductsPage,
	head: () => ({
		...seo({
			title: "Products — Viteloop",
			description:
				"Composable infrastructure products — CDN, Stream, Transcoder, DRM, OTT, and LMS — that you deploy and own.",
			path: "/products",
		}),
		scripts: [
			breadcrumbScript([
				{ name: "Home", path: "/" },
				{ name: "Products", path: "/products" },
			]),
		],
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

			<Container className="pt-2">
				<Link
					to="/products/commerce"
					className="glass card-hover flex flex-col gap-6 rounded-3xl border-accent/35 p-8 md:flex-row md:items-center md:justify-between md:p-10"
				>
					<div className="max-w-2xl">
						<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
							<ShoppingBag className="h-5 w-5" strokeWidth={1.7} />
						</span>
						<h2 className="mt-5 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
							ViteLoop Commerce — sell online at scale.
						</h2>
						<p className="mt-3 text-base leading-relaxed text-fg-muted">
							A full e-commerce platform: AI store builder, social commerce,
							fraud prevention, and a global CDN — built to stay fast through
							your biggest campaigns.
						</p>
					</div>
					<span className={cn(buttonVariants(), "shrink-0")}>
						Explore Commerce <ArrowRight className="h-4 w-4" />
					</span>
				</Link>
			</Container>

			<Section className="border-t border-line">
				<Container>
					<div className="max-w-2xl">
						<p className="kicker">Platform capabilities</p>
						<h2 className="mt-5 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
							The capabilities behind the platform.
						</h2>
						<p className="mt-4 text-lg leading-relaxed text-fg-muted">
							Edge, security, and delivery features that power the Viteloop
							products — each available across the infrastructure you run.
						</p>
					</div>
					<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{CAPABILITIES.map((c) => {
							const Icon = c.icon;
							return (
								<Link
									key={c.slug}
									to="/products/$slug"
									params={{ slug: c.slug }}
									className="glass card-hover rounded-2xl p-6"
								>
									<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
										<Icon className="h-5 w-5" strokeWidth={1.7} />
									</span>
									<h3 className="mt-4 font-display text-lg font-semibold text-fg">
										{c.name}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-fg-muted">
										{c.tagline}
									</p>
								</Link>
							);
						})}
					</div>
				</Container>
			</Section>

			<CTABand
				heading="See the platform in your environment."
				subtext="Request a technical walkthrough and we'll show you how Viteloop deploys into your stack."
			/>
		</>
	);
}
