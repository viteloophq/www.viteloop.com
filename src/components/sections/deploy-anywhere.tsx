import { Check } from "lucide-react";
import { CornerTicks, SectionTag } from "#/components/primitives/blueprint";
import { Container } from "#/components/primitives/container";
import { Lead, Section, SectionHeading } from "#/components/primitives/section";
import { RegionMap } from "#/components/visuals/region-map";

const POINTS = [
	"Self-hosted",
	"Cloud Agnostic",
	"Multi-Cloud",
	"Kubernetes Native",
];

export function DeployAnywhere() {
	return (
		<Section>
			<Container className="grid items-center gap-12 lg:grid-cols-2">
				<div>
					<SectionTag index="04" label="Deploy anywhere" />
					<SectionHeading>
						Deploy anywhere.{" "}
						<span className="accent-gradient">Scale globally.</span>
					</SectionHeading>
					<Lead>
						Run ViteLoop on bare metal, any public cloud, or fully on-premise —
						including air-gapped and sovereign environments. One control plane
						orchestrates every region you operate.
					</Lead>
					<ul className="mt-8 grid grid-cols-2 gap-3">
						{POINTS.map((p) => (
							<li
								key={p}
								className="glass flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-fg"
							>
								<Check
									className="h-4 w-4 shrink-0 text-accent-2"
									strokeWidth={2}
								/>
								{p}
							</li>
						))}
					</ul>
				</div>
				<div className="frame relative rounded-2xl p-6">
					<CornerTicks />
					<div className="mb-4 flex items-center justify-between">
						<span className="mono-label">region.map / anycast</span>
						<span className="mono-label text-accent">● global</span>
					</div>
					<RegionMap />
				</div>
			</Container>
		</Section>
	);
}
