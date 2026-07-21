import { ArrowRight } from "lucide-react";
import { CornerTicks } from "#/components/primitives/blueprint";
import { Container } from "#/components/primitives/container";
import { buttonVariants } from "#/components/ui/button";
import { EdgeNetwork } from "#/components/visuals/edge-network";
import { GlowMesh } from "#/components/visuals/glow-mesh";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";
import { HOME_URLS } from "#/data/home";

const CHIPS = [
	"Managed or self-hosted",
	"Bring your own nodes",
	"Cloud-agnostic",
	"API-first",
];

export function Hero() {
	return (
		<section className="relative overflow-hidden border-b border-line">
			<GlowMesh className="absolute inset-0 opacity-90" />
			<GridBackdrop />
			<Container className="relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.06fr_0.94fr]">
				<div className="relative z-10">
					<div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-soft/70 px-3.5 py-1.5">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
						</span>
						<span className="mono-label text-fg-muted">
							Managed edge · or your own nodes
						</span>
					</div>

					<h1 className="mt-7 text-balance font-display text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-fg sm:text-6xl md:text-[4.15rem]">
						<span className="block">Own the edge.</span>
						<span className="block text-accent">Run it yourself.</span>
					</h1>

					<p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
						Run ViteLoop's global network, or deploy your own CDN nodes and
						own every packet — video, live, DRM, and commerce, delivered
						worldwide.
					</p>

					<div className="mt-9 flex flex-wrap items-center gap-3">
						<a
							href={HOME_URLS.signup}
							target="_blank"
							rel="noopener noreferrer"
							className={buttonVariants({ size: "lg" })}
						>
							Start free <ArrowRight className="h-4 w-4" />
						</a>
						<a
							href={HOME_URLS.deploy}
							target="_blank"
							rel="noopener noreferrer"
							className={buttonVariants({ variant: "outline", size: "lg" })}
						>
							Deploy a node
						</a>
					</div>

					<ul className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2">
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

				<div className="relative z-10">
					<div className="frame rounded-2xl p-6 sm:p-8">
						<CornerTicks />
						<div className="mb-4 flex items-center justify-between">
							<span className="mono-label">your.nodes / global</span>
							<span className="mono-label text-accent">● live</span>
						</div>
						<EdgeNetwork className="mx-auto max-w-[520px]" />
						<div className="mt-4 flex items-center justify-between border-t border-line pt-4">
							<span className="mono-label">edge ◍ regions</span>
							<span className="mono-label">+ add region</span>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
