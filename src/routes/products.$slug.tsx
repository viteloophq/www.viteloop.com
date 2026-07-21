import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import type { ComponentType } from "react";
import { Container } from "#/components/primitives/container";
import { Section } from "#/components/primitives/section";
import { CTABand } from "#/components/sections/cta-band";
import { buttonVariants } from "#/components/ui/button";
import { ArchDiagram } from "#/components/visuals/arch-diagram";
import { EdgeNetwork } from "#/components/visuals/edge-network";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";
import {
	DrmMockup,
	LmsMockup,
	StreamMockup,
	TranscoderMockup,
} from "#/components/visuals/product-mockups";
import { RegionMap } from "#/components/visuals/region-map";
import {
	type Capability,
	getCatalogEntry,
	isCapability,
} from "#/data/capabilities";
import { PRODUCTS, type Product, productLinkProps } from "#/data/products";
import { SITE } from "#/data/site";
import { breadcrumbScript, seo } from "#/lib/seo";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/products/$slug")({
	component: ProductDetail,
	head: ({ params }) => {
		const entry = getCatalogEntry(params.slug);
		if (!entry) {
			const base = seo({
				title: "Product not found — ViteLoop",
				description: "The requested ViteLoop product could not be found.",
				path: `/products/${params.slug}`,
			});
			// Keep soft-404s out of the index.
			return {
				...base,
				meta: [...base.meta, { name: "robots", content: "noindex, follow" }],
			};
		}

		const path = `/products/${entry.slug}`;
		const capability = isCapability(entry) ? entry : null;
		const title = capability ? capability.seoTitle : `${entry.name} — ViteLoop`;
		const description = capability ? capability.seoDescription : entry.summary;

		// Capabilities are platform features (schema.org Service); the six core
		// products are SoftwareApplications.
		const primarySchema = capability
			? {
					"@context": "https://schema.org",
					"@type": "Service",
					name: entry.name,
					serviceType: entry.name,
					description: entry.summary,
					areaServed: "Worldwide",
					provider: {
						"@type": "Organization",
						name: SITE.name,
						url: SITE.url,
					},
					url: `${SITE.url}${path}`,
				}
			: {
					"@context": "https://schema.org",
					"@type": "SoftwareApplication",
					name: entry.name,
					applicationCategory: "DeveloperApplication",
					operatingSystem: "Linux, Kubernetes, Cloud, On-premise",
					description: entry.summary,
					url: `${SITE.url}${path}`,
					publisher: {
						"@type": "Organization",
						name: SITE.name,
						url: SITE.url,
					},
				};

		return {
			...seo({ title, description, path }),
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(primarySchema),
				},
				breadcrumbScript([
					{ name: "Home", path: "/" },
					{ name: "Products", path: "/products" },
					{ name: entry.name, path },
				]),
				...(capability && capability.faqs.length > 0
					? [
							{
								type: "application/ld+json",
								children: JSON.stringify({
									"@context": "https://schema.org",
									"@type": "FAQPage",
									mainEntity: capability.faqs.map((f) => ({
										"@type": "Question",
										name: f.q,
										acceptedAnswer: { "@type": "Answer", text: f.a },
									})),
								}),
							},
						]
					: []),
			],
		};
	},
});

function ProductVisual({ kind }: { kind: string }) {
	if (kind === "region") return <RegionMap />;
	if (kind === "arch") return <ArchDiagram />;
	return <EdgeNetwork className="mx-auto max-w-[460px]" />;
}

/** Product-specific hero mockups, keyed by slug. */
const PRODUCT_MOCKUPS: Partial<
	Record<string, ComponentType<{ className?: string }>>
> = {
	stream: StreamMockup,
	drm: DrmMockup,
	transcoder: TranscoderMockup,
	lms: LmsMockup,
};

function ProductDetail() {
	const { slug } = Route.useParams();
	const entry = getCatalogEntry(slug);

	if (!entry) {
		return (
			<Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
				<p className="kicker">Not found</p>
				<h1 className="mt-5 text-4xl font-semibold tracking-tight text-fg">
					This product doesn’t exist.
				</h1>
				<Link to="/products" className={cn(buttonVariants(), "mt-8")}>
					<ArrowLeft className="h-4 w-4" /> All products
				</Link>
			</Container>
		);
	}

	const Icon = entry.icon;
	const capability = isCapability(entry) ? entry : null;
	const related: (Product | Capability)[] = capability
		? capability.related
				.map(getCatalogEntry)
				.filter((e): e is Product | Capability => Boolean(e))
		: PRODUCTS.filter((p) => p.slug !== entry.slug);
	const Mockup = PRODUCT_MOCKUPS[entry.slug];

	return (
		<>
			<section className="relative overflow-hidden border-b border-line">
				<GridBackdrop />
				<Container className="relative grid items-center gap-12 py-20 md:py-24 lg:grid-cols-2">
					<div>
						<Link
							to="/products"
							className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-fg-faint transition-colors hover:text-fg"
						>
							<ArrowLeft className="h-3.5 w-3.5" /> Products
						</Link>
						<span className="mt-6 grid h-14 w-14 place-items-center rounded-2xl border border-line bg-bg-soft text-accent-2">
							<Icon className="h-7 w-7" strokeWidth={1.6} />
						</span>
						<h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-fg sm:text-5xl">
							{entry.name}
						</h1>
						<p className="mt-3 text-lg font-medium text-accent-2">
							{entry.tagline}
						</p>
						<p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
							{entry.summary}
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link to="/contact" className={buttonVariants()}>
								Request Demo <ArrowRight className="h-4 w-4" />
							</Link>
							<Link
								to="/docs"
								className={buttonVariants({ variant: "outline" })}
							>
								View Documentation
							</Link>
						</div>
					</div>
					{Mockup ? (
						<Mockup className="w-full max-w-[520px] lg:ml-auto" />
					) : (
						<div className="glass relative overflow-hidden rounded-2xl p-6">
							<ProductVisual kind={entry.visual} />
						</div>
					)}
				</Container>
			</section>

			<Container>
				<div className="grid gap-4 py-12 sm:grid-cols-3">
					{entry.highlights.map((h) => (
						<div key={h.label} className="glass rounded-2xl p-6">
							<p className="font-mono text-3xl font-semibold text-fg">
								{h.value}
							</p>
							<p className="mt-1 text-sm text-fg-muted">{h.label}</p>
						</div>
					))}
				</div>
			</Container>

			<Section className="border-t border-line">
				<Container>
					<h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
						Capabilities
					</h2>
					<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{entry.features.map((f) => (
							<div
								key={f}
								className="glass flex items-start gap-3 rounded-xl p-5"
							>
								<Check
									className="mt-0.5 h-5 w-5 shrink-0 text-accent-2"
									strokeWidth={2}
								/>
								<span className="text-fg">{f}</span>
							</div>
						))}
					</div>
				</Container>
			</Section>

			{capability && capability.faqs.length > 0 && (
				<Section className="border-t border-line">
					<Container>
						<h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
							Frequently asked questions
						</h2>
						<div className="mt-8 flex max-w-3xl flex-col gap-3">
							{capability.faqs.map((f) => (
								<details
									key={f.q}
									className="glass group rounded-2xl px-5 py-4 open:pb-5"
								>
									<summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-fg [&::-webkit-details-marker]:hidden">
										{f.q}
										<ChevronDown className="h-5 w-5 shrink-0 text-fg-faint transition-transform duration-200 group-open:rotate-180" />
									</summary>
									<p className="mt-3 text-sm leading-relaxed text-fg-muted">
										{f.a}
									</p>
								</details>
							))}
						</div>
					</Container>
				</Section>
			)}

			{related.length > 0 && (
				<Section className="border-t border-line">
					<Container>
						<h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
							Works with the rest of the platform
						</h2>
						<div className="mt-8 flex flex-wrap gap-3">
							{related.map((p) => {
								const OtherIcon = p.icon;
								return (
									<Link
										key={p.slug}
										{...productLinkProps(p.slug)}
										className="glass card-hover inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium text-fg"
									>
										<OtherIcon
											className="h-4 w-4 text-accent-2"
											strokeWidth={1.7}
										/>
										{p.name}
									</Link>
								);
							})}
						</div>
					</Container>
				</Section>
			)}

			<CTABand
				heading={`Deploy ${entry.name} in your environment.`}
				subtext="Request a technical demo and see it running in a stack like yours."
			/>
		</>
	);
}
