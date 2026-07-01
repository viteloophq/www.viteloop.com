import { createFileRoute } from "@tanstack/react-router";
import { Container } from "#/components/primitives/container";
import { PageHero } from "#/components/primitives/page-hero";
import { Reveal } from "#/components/primitives/reveal";
import { Section, SectionHeading } from "#/components/primitives/section";
import { CTABand } from "#/components/sections/cta-band";
import { CUSTOMERS } from "#/data/customers";
import { SOLUTIONS } from "#/data/solutions";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/solutions")({
	component: SolutionsPage,
	head: () =>
		seo({
			title: "Solutions — Viteloop",
			description:
				"Viteloop powers hosting providers, ISPs, telecoms, enterprises, governments, streaming platforms, and more — software to build and own internet infrastructure.",
			path: "/solutions",
		}),
});

function SolutionsPage() {
	return (
		<>
			<PageHero
				kicker="Solutions"
				title="Built for the organizations that build the internet."
			>
				From hosting providers to governments, teams use Viteloop to launch and
				operate the infrastructure their business depends on — without renting
				it from someone else.
			</PageHero>

			<Section>
				<Container>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{CUSTOMERS.map((c, i) => {
							const Icon = c.icon;
							return (
								<Reveal key={c.name} delay={(i % 3) * 50}>
									<div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
										<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
											<Icon className="h-5 w-5" strokeWidth={1.7} />
										</span>
										<h3 className="mt-5 font-display text-lg font-semibold text-fg">
											{c.name}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-fg-muted">
											{c.blurb}
										</p>
									</div>
								</Reveal>
							);
						})}
					</div>
				</Container>
			</Section>

			<Section className="border-t border-line">
				<Container>
					<div className="max-w-2xl">
						<SectionHeading>Why teams choose to own it.</SectionHeading>
					</div>
					<div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
						{SOLUTIONS.map((s) => {
							const Icon = s.icon;
							return (
								<div key={s.title} className="flex gap-4">
									<span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-bg-soft text-accent">
										<Icon className="h-5 w-5" strokeWidth={1.7} />
									</span>
									<div>
										<h3 className="font-display text-lg font-semibold text-fg">
											{s.title}
										</h3>
										<p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
											{s.outcome}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</Container>
			</Section>

			<CTABand
				heading="Find the right fit for your platform."
				subtext="Tell us what you're building and we'll map Viteloop to your architecture."
			/>
		</>
	);
}
