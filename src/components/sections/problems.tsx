import { SectionTag } from "#/components/primitives/blueprint";
import { Container } from "#/components/primitives/container";
import { Reveal } from "#/components/primitives/reveal";
import { Lead, Section, SectionHeading } from "#/components/primitives/section";
import { SOLUTIONS } from "#/data/solutions";

export function Problems() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<SectionTag index="02" label="Ownership" />
					<SectionHeading>
						The problems with renting your infrastructure.
					</SectionHeading>
					<Lead>
						Public clouds optimize for their margins, not your control. Viteloop
						gives the ownership back.
					</Lead>
				</div>
				<div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{SOLUTIONS.map((s, i) => {
						const Icon = s.icon;
						return (
							<Reveal key={s.title} delay={(i % 3) * 50}>
								<div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
									<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent">
										<Icon className="h-5 w-5" strokeWidth={1.7} />
									</span>
									<h3 className="mt-5 font-display text-lg font-semibold text-fg">
										{s.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-fg-faint">
										{s.problem}
									</p>
									<p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-fg-muted">
										<span className="font-medium text-accent-2">→ </span>
										{s.outcome}
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
