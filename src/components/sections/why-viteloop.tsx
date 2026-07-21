import { Globe, Layers, type LucideIcon, Server } from "lucide-react";
import { SectionTag } from "#/components/primitives/blueprint";
import { Container } from "#/components/primitives/container";
import { Section, SectionHeading } from "#/components/primitives/section";

const PILLARS: Array<{ title: string; blurb: string; icon: LucideIcon }> = [
	{
		title: "Own your infrastructure",
		blurb:
			"Managed or self-hosted — no lock-in, no per-GB tax, your data in your environment.",
		icon: Server,
	},
	{
		title: "Every media workload, one platform",
		blurb:
			"CDN, video, live, DRM, and commerce share one control plane and one API.",
		icon: Layers,
	},
	{
		title: "Global by default",
		blurb: "Anycast edge, HTTP/3, and instant purge everywhere your users are.",
		icon: Globe,
	},
];

export function WhyViteLoop() {
	return (
		<Section>
			<Container>
				<SectionTag index="03" label="Why ViteLoop" />
				<SectionHeading>Built to own, not rent.</SectionHeading>

				<div className="mt-12 grid gap-4 sm:grid-cols-3">
					{PILLARS.map((pillar) => {
						const Icon = pillar.icon;
						return (
							<div
								key={pillar.title}
								className="glass card-hover rounded-2xl border border-line p-7"
							>
								<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent">
									<Icon className="h-5 w-5" strokeWidth={1.7} />
								</span>
								<h3 className="mt-5 font-display text-lg font-semibold text-fg">
									{pillar.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-fg-muted">
									{pillar.blurb}
								</p>
							</div>
						);
					})}
				</div>
			</Container>
		</Section>
	);
}
