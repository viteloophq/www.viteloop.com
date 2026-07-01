import { Container } from "#/components/primitives/container";
import {
	Kicker,
	Lead,
	Section,
	SectionHeading,
} from "#/components/primitives/section";
import { ArchDiagram } from "#/components/visuals/arch-diagram";

export function Architecture() {
	return (
		<Section>
			<Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
				<div>
					<Kicker>Architecture</Kicker>
					<SectionHeading>
						Software that runs in{" "}
						<span className="accent-gradient">your environment</span> — not
						ours.
					</SectionHeading>
					<Lead>
						Viteloop is infrastructure software, not infrastructure services.
						Every component ships as containers you deploy, observe, and own —
						composing into a complete platform from the edge down to your cloud.
					</Lead>
					<p className="mt-6 text-sm leading-relaxed text-fg-faint">
						We do not operate a public cloud. We build the software that lets
						you operate yours.
					</p>
				</div>
				<ArchDiagram />
			</Container>
		</Section>
	);
}
