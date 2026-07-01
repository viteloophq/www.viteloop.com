import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { Reveal } from "#/components/primitives/reveal";
import {
	Kicker,
	Lead,
	Section,
	SectionHeading,
} from "#/components/primitives/section";
import { PRODUCTS } from "#/data/products";
import { cn } from "#/lib/utils";

interface ProductGridProps {
	variant?: "compact" | "detailed";
	heading?: boolean;
}

export function ProductGrid({
	variant = "compact",
	heading = true,
}: ProductGridProps) {
	return (
		<Section id="products">
			<Container>
				{heading && (
					<div className="max-w-2xl">
						<Kicker>Products</Kicker>
						<SectionHeading>
							One platform.{" "}
							<span className="accent-gradient">
								Every layer of your infrastructure.
							</span>
						</SectionHeading>
						<Lead>
							Eight composable products that share one control plane, one API
							surface, and one deployment model — run only what you need.
						</Lead>
					</div>
				)}
				<div
					className={cn(
						"mt-12 grid gap-4 sm:grid-cols-2",
						variant === "compact" ? "lg:grid-cols-4" : "lg:grid-cols-3",
					)}
				>
					{PRODUCTS.map((p, i) => {
						const Icon = p.icon;
						return (
							<Reveal key={p.slug} delay={(i % 4) * 50}>
								<Link
									to="/products/$slug"
									params={{ slug: p.slug }}
									className="glass card-hover group flex h-full flex-col rounded-2xl p-6"
								>
									<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
										<Icon className="h-5 w-5" strokeWidth={1.7} />
									</span>
									<h3 className="mt-5 font-display text-lg font-semibold text-fg">
										{p.name}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-fg-muted">
										{p.tagline}
									</p>
									{variant === "detailed" && (
										<ul className="mt-4 flex flex-col gap-2">
											{p.features.slice(0, 3).map((f) => (
												<li
													key={f}
													className="flex items-center gap-2 text-sm text-fg-muted"
												>
													<Check
														className="h-4 w-4 shrink-0 text-accent-2"
														strokeWidth={2}
													/>
													{f}
												</li>
											))}
										</ul>
									)}
									<span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent">
										Explore
										<ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
									</span>
								</Link>
							</Reveal>
						);
					})}
				</div>
			</Container>
		</Section>
	);
}
