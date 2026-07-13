import { SectionTag } from "#/components/primitives/blueprint";
import { Container } from "#/components/primitives/container";
import { ArchDiagram } from "#/components/visuals/arch-diagram";
import { GlowMesh } from "#/components/visuals/glow-mesh";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";

const NOTES = [
	{ k: "Components", v: "Containers you deploy" },
	{ k: "Control", v: "One plane, every region" },
	{ k: "Data path", v: "Never leaves your infra" },
];

/** Dark "control plane" band — the high-contrast anchor of the homepage. */
export function ControlPlane() {
	return (
		<section className="dark relative overflow-hidden border-y border-line bg-bg py-24 text-fg md:py-32">
			<GridBackdrop />
			<GlowMesh className="absolute inset-0 opacity-80" />
			<Container className="relative grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
				<div>
					<SectionTag index="03" label="Architecture" />
					<h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-[2.85rem]">
						Software that runs in{" "}
						<span className="accent-gradient">your environment</span> — not ours.
					</h2>
					<p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
						Viteloop is infrastructure software, not infrastructure services.
						Every component ships as containers you deploy, observe, and own —
						composing into a complete platform from the edge down to your cloud.
					</p>
					<dl className="mt-8 divide-y divide-line border-y border-line">
						{NOTES.map((n) => (
							<div
								key={n.k}
								className="flex items-center justify-between gap-4 py-3"
							>
								<dt className="mono-label text-accent">{n.k}</dt>
								<dd className="text-sm text-fg-muted">{n.v}</dd>
							</div>
						))}
					</dl>
					<p className="mt-6 text-sm leading-relaxed text-fg-faint">
						We do not operate a public cloud. We build the software that lets you
						operate yours.
					</p>
				</div>
				<div className="relative">
					<ArchDiagram />
				</div>
			</Container>
		</section>
	);
}
