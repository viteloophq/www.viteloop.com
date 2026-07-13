import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { buttonVariants } from "#/components/ui/button";
import { EdgeNetwork } from "#/components/visuals/edge-network";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";
import { SITE } from "#/data/site";

export function Hero() {
	return (
		<section className="relative overflow-hidden pb-20 pt-14 md:pb-28 md:pt-20">
			<Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
				<div className="relative z-10">
					<span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-soft/60 px-3 py-1 font-mono text-xs tracking-wide text-fg-muted">
						<span className="h-1.5 w-1.5 rounded-full bg-accent-2 shadow-[0_0_10px_1px_var(--accent-2)]" />
						Infrastructure software, not services
					</span>
					<h1 className="mt-6 text-balance text-4xl font-bold leading-[1.04] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-[4.1rem]">
						Power the Internet.{" "}
						<span className="accent-gradient">On Your Terms.</span>
					</h1>
					<p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
						{SITE.description}
					</p>
					<div className="mt-9 flex flex-wrap items-center gap-3">
						<Link to="/contact" className={buttonVariants({ size: "lg" })}>
							Request Demo <ArrowRight className="h-4 w-4" />
						</Link>
						<Link
							to="/docs"
							className={buttonVariants({ variant: "outline", size: "lg" })}
						>
							View Documentation
						</Link>
					</div>
					<p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
						Self-hosted · Cloud-agnostic · Kubernetes-native
					</p>
				</div>

				<div className="relative">
					<GridBackdrop className="scale-110" />
					<EdgeNetwork className="relative z-10 mx-auto max-w-[560px]" />
				</div>
			</Container>
		</section>
	);
}
