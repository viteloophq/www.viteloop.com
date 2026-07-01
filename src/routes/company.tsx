import { createFileRoute } from "@tanstack/react-router";
import {
	Code2,
	Gauge,
	Globe2,
	Lock,
	type LucideIcon,
	Unplug,
	Workflow,
} from "lucide-react";
import { Container } from "#/components/primitives/container";
import { PageHero } from "#/components/primitives/page-hero";
import { Section, SectionHeading } from "#/components/primitives/section";
import { CTABand } from "#/components/sections/cta-band";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/company")({
	component: CompanyPage,
	head: () =>
		seo({
			title: "Company — Viteloop",
			description:
				"Viteloop builds the infrastructure software powering modern cloud platforms. We don't operate a public cloud — we help you operate yours.",
			path: "/company",
		}),
});

const VALUES: { icon: LucideIcon; title: string; blurb: string }[] = [
	{
		icon: Lock,
		title: "Ownership over rent",
		blurb:
			"Organizations should own the infrastructure their business runs on.",
	},
	{
		icon: Unplug,
		title: "Open by default",
		blurb: "Standards, composability, and no lock-in are non-negotiable.",
	},
	{
		icon: Gauge,
		title: "Performance as a feature",
		blurb: "Latency and efficiency are designed in, never bolted on.",
	},
	{
		icon: Code2,
		title: "Engineering-first",
		blurb:
			"We build for the people who operate infrastructure, not buy slideware.",
	},
	{
		icon: Globe2,
		title: "Built for scale",
		blurb:
			"From a single rack to a global fleet, the software shouldn't change.",
	},
	{
		icon: Workflow,
		title: "Reliability, always",
		blurb:
			"The internet runs on this software. We treat that responsibility seriously.",
	},
];

const STATS = [
	{ value: "8", label: "Infrastructure products" },
	{ value: "Any", label: "Cloud or bare metal" },
	{ value: "10+", label: "Industries served" },
	{ value: "API-first", label: "From day one" },
];

function CompanyPage() {
	return (
		<>
			<PageHero kicker="Company" title="Powering the Next Internet.">
				Viteloop builds the infrastructure software powering modern cloud
				platforms. We don't operate a public cloud — we build the software that
				lets organizations create, manage, and scale their own.
			</PageHero>

			<Section>
				<Container>
					<div className="glass rounded-3xl p-8 md:p-12">
						<p className="kicker">Our thesis</p>
						<p className="mt-5 max-w-3xl text-balance text-2xl font-medium leading-snug text-fg sm:text-3xl">
							The next generation of internet infrastructure won't be rented
							from a handful of public clouds. It will be{" "}
							<span className="accent-gradient">built and owned</span> by the
							organizations that depend on it.
						</p>
					</div>
				</Container>
			</Section>

			<Section className="border-t border-line">
				<Container>
					<div className="grid gap-6 rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
						{STATS.map((s) => (
							<div key={s.label} className="text-center sm:text-left">
								<p className="font-mono text-4xl font-semibold accent-gradient">
									{s.value}
								</p>
								<p className="mt-2 text-sm text-fg-muted">{s.label}</p>
							</div>
						))}
					</div>
				</Container>
			</Section>

			<Section className="border-t border-line">
				<Container>
					<div className="max-w-2xl">
						<SectionHeading>What we believe.</SectionHeading>
					</div>
					<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{VALUES.map((v) => {
							const Icon = v.icon;
							return (
								<div key={v.title} className="glass rounded-2xl p-6">
									<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
										<Icon className="h-5 w-5" strokeWidth={1.7} />
									</span>
									<h3 className="mt-5 font-display text-lg font-semibold text-fg">
										{v.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-fg-muted">
										{v.blurb}
									</p>
								</div>
							);
						})}
					</div>
				</Container>
			</Section>

			<CTABand
				heading="Want to build with us?"
				subtext="Whether you're deploying Viteloop or joining the team — we'd love to talk."
			/>
		</>
	);
}
