import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CornerTicks } from "#/components/primitives/blueprint";
import { Container } from "#/components/primitives/container";
import { buttonVariants } from "#/components/ui/button";
import { EdgeNetwork } from "#/components/visuals/edge-network";
import { GlowMesh } from "#/components/visuals/glow-mesh";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";
import { SITE } from "#/data/site";

const CHIPS = [
	"Self-hosted",
	"Cloud-agnostic",
	"Kubernetes-native",
	"API-first",
];

export function Hero() {
	return (
		<section className="relative overflow-hidden border-b border-line">
			<GlowMesh className="absolute inset-0 opacity-90" />
			<GridBackdrop />
			<Container className="relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.06fr_0.94fr]">
				<div className="relative z-10">
					<div className="vl-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-soft/70 px-3.5 py-1.5">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
						</span>
						<span className="mono-label text-fg-muted">
							Infrastructure software, not services
						</span>
					</div>

					<h1 className="mt-7 text-balance font-display text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-fg sm:text-6xl md:text-[4.15rem]">
						<span className="vl-rise block" style={{ animationDelay: "90ms" }}>
							Power the Internet.
						</span>
						<span
							className="vl-rise block text-accent"
							style={{ animationDelay: "180ms" }}
						>
							On Your Terms.
						</span>
					</h1>

					<p
						className="vl-rise mt-6 max-w-xl text-lg leading-relaxed text-fg-muted"
						style={{ animationDelay: "300ms" }}
					>
						{SITE.description}
					</p>

					<div
						className="vl-rise mt-9 flex flex-wrap items-center gap-3"
						style={{ animationDelay: "400ms" }}
					>
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

					<ul
						className="vl-rise mt-9 flex flex-wrap items-center gap-x-3 gap-y-2"
						style={{ animationDelay: "500ms" }}
					>
						{CHIPS.map((c, i) => (
							<li key={c} className="flex items-center gap-3">
								{i > 0 && (
									<span className="h-1 w-1 rounded-full bg-accent/50" />
								)}
								<span className="mono-label">{c}</span>
							</li>
						))}
					</ul>
				</div>

				<div
					className="vl-scale-in relative z-10"
					style={{ animationDelay: "160ms" }}
				>
					<div className="frame rounded-2xl p-6 sm:p-8">
						<CornerTicks />
						<div className="mb-4 flex items-center justify-between">
							<span className="mono-label">net.map / global</span>
							<span className="mono-label text-accent">● live</span>
						</div>
						<EdgeNetwork className="mx-auto max-w-[520px]" />
						<div className="mt-4 flex items-center justify-between border-t border-line pt-4">
							<span className="mono-label">edge ◍ regions</span>
							<span className="mono-label">anycast · http/3</span>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
