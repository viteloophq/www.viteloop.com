import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CornerTicks, SectionTag } from "#/components/primitives/blueprint";
import { Container } from "#/components/primitives/container";
import { Reveal } from "#/components/primitives/reveal";
import {
	Lead,
	Section,
	SectionHeading,
} from "#/components/primitives/section";
import { PRODUCTS, productLinkProps } from "#/data/products";

export function ProductBento() {
	const featured = PRODUCTS[0];
	const rest = PRODUCTS.slice(1);
	const FeaturedIcon = featured.icon;

	return (
		<Section id="products" className="border-b border-line">
			<Container>
				<SectionTag index="01" label="The Platform" />
				<div className="mt-5 max-w-2xl">
					<SectionHeading>
						One platform.{" "}
						<span className="accent-gradient">Every layer of your stack.</span>
					</SectionHeading>
					<Lead>
						Six composable products on one control plane, one API surface, and
						one deployment model — run the whole stack or a single component.
					</Lead>
				</div>

				<Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
					<Link
						{...productLinkProps(featured.slug)}
						className="card-hover group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-bg-soft/40 p-7 sm:col-span-2 lg:row-span-2"
					>
						<div className="blueprint-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_82%_16%,black,transparent_74%)]" />
						<CornerTicks />
						<div className="relative">
							<div className="flex items-center justify-between">
								<span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-bg text-accent">
									<FeaturedIcon className="h-6 w-6" strokeWidth={1.6} />
								</span>
								<span className="index-num">P·01</span>
							</div>
							<h3 className="mt-6 font-display text-2xl font-semibold text-fg">
								{featured.name}
							</h3>
							<p className="mt-2 max-w-md leading-relaxed text-fg-muted">
								{featured.summary}
							</p>
							<ul className="mt-5 flex flex-wrap gap-2">
								{featured.features.slice(0, 4).map((f) => (
									<li
										key={f}
										className="rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-xs text-fg-muted"
									>
										{f}
									</li>
								))}
							</ul>
						</div>
						<span className="relative mt-8 inline-flex items-center gap-1 text-sm font-medium text-accent">
							Explore {featured.short}
							<ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						</span>
					</Link>

					{rest.map((p, i) => {
						const Icon = p.icon;
						return (
							<Link
								key={p.slug}
								{...productLinkProps(p.slug)}
								className="glass card-hover group flex flex-col rounded-2xl p-6"
							>
								<div className="flex items-center justify-between">
									<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent">
										<Icon className="h-5 w-5" strokeWidth={1.7} />
									</span>
									<span className="index-num">
										{`P·0${i + 2}`}
									</span>
								</div>
								<h3 className="mt-5 font-display text-lg font-semibold text-fg">
									{p.name}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-fg-muted">
									{p.tagline}
								</p>
								<span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent">
									Explore
									<ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
								</span>
							</Link>
						);
					})}
				</Reveal>
			</Container>
		</Section>
	);
}
