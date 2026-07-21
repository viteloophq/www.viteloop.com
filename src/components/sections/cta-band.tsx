import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { buttonVariants } from "#/components/ui/button";
import { GlowMesh } from "#/components/visuals/glow-mesh";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";
import { cn } from "#/lib/utils";

interface CTALink {
	label: string;
	href: string;
}

interface CTABandProps {
	heading?: string;
	subtext?: string;
	primaryCta?: CTALink;
	secondaryCta?: CTALink;
}

export function CTABand({
	heading = "Build your own infrastructure.",
	subtext = "Deploy ViteLoop in your environment and take full ownership of your CDN, streaming, edge, and media platforms.",
	primaryCta,
	secondaryCta,
}: CTABandProps) {
	return (
		<section className="py-24 md:py-28">
			<Container>
				<div className="glass relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 md:py-20">
					<GlowMesh className="absolute inset-0 opacity-80" />
					<GridBackdrop />
					<div className="relative z-10 mx-auto max-w-2xl">
						<h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
							{heading}
						</h2>
						<p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
							{subtext}
						</p>
						<div className="mt-9 flex flex-wrap items-center justify-center gap-3">
							{primaryCta ? (
								<a
									href={primaryCta.href}
									target="_blank"
									rel="noopener noreferrer"
									className={buttonVariants({ size: "lg" })}
								>
									{primaryCta.label} <ArrowRight className="h-4 w-4" />
								</a>
							) : (
								<Link to="/contact" className={buttonVariants({ size: "lg" })}>
									Request Demo <ArrowRight className="h-4 w-4" />
								</Link>
							)}
							{secondaryCta ? (
								<a
									href={secondaryCta.href}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										buttonVariants({ variant: "outline", size: "lg" }),
									)}
								>
									{secondaryCta.label}
								</a>
							) : (
								<Link
									to="/contact"
									className={cn(
										buttonVariants({ variant: "outline", size: "lg" }),
									)}
								>
									Talk to engineering
								</Link>
							)}
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
