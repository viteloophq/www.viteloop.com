import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { Section } from "#/components/primitives/section";
import { CTABand } from "#/components/sections/cta-band";
import { buttonVariants } from "#/components/ui/button";
import { ArchDiagram } from "#/components/visuals/arch-diagram";
import { EdgeNetwork } from "#/components/visuals/edge-network";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";
import { RegionMap } from "#/components/visuals/region-map";
import { getProduct, PRODUCTS } from "#/data/products";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/products/$slug")({
	component: ProductDetail,
	head: ({ params }) => {
		const product = getProduct(params.slug);
		return {
			meta: [
				{
					title: product
						? `${product.name} — Viteloop`
						: "Product not found — Viteloop",
				},
				{
					name: "description",
					content: product?.tagline ?? "Viteloop product",
				},
			],
		};
	},
});

function ProductVisual({ kind }: { kind: string }) {
	if (kind === "region") return <RegionMap />;
	if (kind === "arch") return <ArchDiagram />;
	return <EdgeNetwork className="mx-auto max-w-[460px]" />;
}

function ProductDetail() {
	const { slug } = Route.useParams();
	const product = getProduct(slug);

	if (!product) {
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

	const Icon = product.icon;
	const others = PRODUCTS.filter((p) => p.slug !== product.slug);

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
							{product.name}
						</h1>
						<p className="mt-3 text-lg font-medium text-accent-2">
							{product.tagline}
						</p>
						<p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
							{product.summary}
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
					<div className="glass relative overflow-hidden rounded-2xl p-6">
						<ProductVisual kind={product.visual} />
					</div>
				</Container>
			</section>

			<Container>
				<div className="grid gap-4 py-12 sm:grid-cols-3">
					{product.highlights.map((h) => (
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
						{product.features.map((f) => (
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

			<Section className="border-t border-line">
				<Container>
					<h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
						Works with the rest of the platform
					</h2>
					<div className="mt-8 flex flex-wrap gap-3">
						{others.map((p) => {
							const OtherIcon = p.icon;
							return (
								<Link
									key={p.slug}
									to="/products/$slug"
									params={{ slug: p.slug }}
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

			<CTABand
				heading={`Deploy ${product.name} in your environment.`}
				subtext="Request a technical demo and see it running in a stack like yours."
			/>
		</>
	);
}
