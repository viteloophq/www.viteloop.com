import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, GraduationCap, Tv } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { PageHero } from "#/components/primitives/page-hero";
import { Reveal } from "#/components/primitives/reveal";
import {
	Kicker,
	Lead,
	Section,
	SectionHeading,
} from "#/components/primitives/section";
import { CTABand } from "#/components/sections/cta-band";
import { CUSTOMERS } from "#/data/customers";
import { SOLUTIONS } from "#/data/solutions";
import { breadcrumbScript, seo } from "#/lib/seo";

export const Route = createFileRoute("/solutions")({
	component: SolutionsPage,
	head: () => ({
		...seo({
			title: "Solutions — Viteloop",
			description:
				"Viteloop powers hosting providers, ISPs, telecoms, enterprises, governments, streaming platforms, and more — software to build and own internet infrastructure.",
			path: "/solutions",
		}),
		scripts: [
			breadcrumbScript([
				{ name: "Home", path: "/" },
				{ name: "Solutions", path: "/solutions" },
			]),
		],
	}),
});

const VERTICALS = [
	{
		slug: "ott",
		icon: Tv,
		title: "OTT streaming",
		blurb:
			"Launch a branded VOD and live service with web, mobile, and TV apps, multi-DRM, and monetization — built on Viteloop Stream, CDN, and DRM.",
		points: [
			"Web · Mobile · TV apps",
			"Multi-DRM & watermarking",
			"SVOD · TVOD · AVOD",
		],
	},
	{
		slug: "lms",
		icon: GraduationCap,
		title: "Learning (LMS)",
		blurb:
			"Run a secure, video-first learning platform — courses, assessments, and certificates with DRM-protected delivery on infrastructure you own.",
		points: ["DRM-secure video", "Courses & assessments", "SCORM · xAPI · SSO"],
	},
] as const;

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

			<Section className="border-t border-line">
				<Container>
					<div className="max-w-2xl">
						<Kicker>Platforms</Kicker>
						<SectionHeading>
							Ready-made platforms,{" "}
							<span className="accent-gradient">on your infrastructure.</span>
						</SectionHeading>
						<Lead>
							Launch complete, fully branded products for your customers —
							assembled from the Viteloop stack and owned end to end.
						</Lead>
					</div>
					<div className="mt-10 grid gap-4 md:grid-cols-2">
						{VERTICALS.map((v) => {
							const Icon = v.icon;
							return (
								<Link
									key={v.slug}
									to="/products/$slug"
									params={{ slug: v.slug }}
									className="glass card-hover group flex flex-col rounded-2xl p-8"
								>
									<span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
										<Icon className="h-6 w-6" strokeWidth={1.6} />
									</span>
									<h3 className="mt-5 font-display text-xl font-semibold text-fg">
										{v.title}
									</h3>
									<p className="mt-2 leading-relaxed text-fg-muted">
										{v.blurb}
									</p>
									<ul className="mt-5 flex flex-wrap gap-2">
										{v.points.map((p) => (
											<li
												key={p}
												className="rounded-full border border-line bg-bg-soft/60 px-3 py-1 font-mono text-xs text-fg-muted"
											>
												{p}
											</li>
										))}
									</ul>
									<span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
										Explore {v.title}
										<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
									</span>
								</Link>
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
