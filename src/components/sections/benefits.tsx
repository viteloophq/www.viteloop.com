import { SectionTag } from "#/components/primitives/blueprint";
import { Container } from "#/components/primitives/container";
import { Reveal } from "#/components/primitives/reveal";
import { Lead, Section, SectionHeading } from "#/components/primitives/section";
import { BENEFITS } from "#/data/benefits";

export function Benefits() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<SectionTag index="06" label="Principles" />
					<SectionHeading>
						Engineering principles, not feature checklists.
					</SectionHeading>
					<Lead>
						Viteloop is built on a small set of opinions about how
						infrastructure software should behave when you own it.
					</Lead>
				</div>
				<div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
					{BENEFITS.map((b, i) => {
						const Icon = b.icon;
						return (
							<Reveal key={b.title} delay={(i % 5) * 50}>
								<div className="glass card-hover flex h-full flex-col rounded-xl p-5">
									<Icon className="h-5 w-5 text-accent-2" strokeWidth={1.7} />
									<h3 className="mt-3 font-display text-base font-semibold text-fg">
										{b.title}
									</h3>
									<p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
										{b.blurb}
									</p>
								</div>
							</Reveal>
						);
					})}
				</div>
			</Container>
		</Section>
	);
}
