import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { Reveal } from "#/components/primitives/reveal";
import {
	Kicker,
	Lead,
	Section,
	SectionHeading,
} from "#/components/primitives/section";
import { CTABand } from "#/components/sections/cta-band";
import { buttonVariants } from "#/components/ui/button";
import { EdgeNetwork } from "#/components/visuals/edge-network";
import { GlowMesh } from "#/components/visuals/glow-mesh";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";
import {
	COMMERCE_DIFFERENCE,
	COMMERCE_FAQ,
	COMMERCE_FEATURES,
	COMMERCE_HERO,
	COMMERCE_SEO,
	COMMERCE_WHY,
} from "#/data/commerce";
import { SITE } from "#/data/site";
import { breadcrumbScript, seo } from "#/lib/seo";

const PATH = "/products/commerce";

export const Route = createFileRoute("/products/commerce")({
	component: CommercePage,
	head: () => ({
		...seo({
			title: COMMERCE_SEO.title,
			description: COMMERCE_SEO.description,
			path: PATH,
		}),
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "SoftwareApplication",
					name: "ViteLoop Commerce",
					applicationCategory: "BusinessApplication",
					operatingSystem: "Web",
					description: COMMERCE_SEO.description,
					url: `${SITE.url}${PATH}`,
					publisher: {
						"@type": "Organization",
						name: SITE.name,
						url: SITE.url,
					},
				}),
			},
			breadcrumbScript([
				{ name: "Home", path: "/" },
				{ name: "Products", path: "/products" },
				{ name: "Commerce", path: PATH },
			]),
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: COMMERCE_FAQ.map((f) => ({
						"@type": "Question",
						name: f.q,
						acceptedAnswer: { "@type": "Answer", text: f.a },
					})),
				}),
			},
		],
	}),
});

function CommercePage() {
	return (
		<>
			<CommerceHero />
			<WhySection />
			<FeaturesSection />
			<DifferenceSection />
			<FaqSection />
			<CTABand
				heading="Ready to launch your store?"
				subtext="Tell us about your business and we'll show you ViteLoop Commerce running on infrastructure built for your biggest campaigns."
			/>
		</>
	);
}

function CommerceHero() {
	return (
		<section className="relative overflow-hidden border-b border-line">
			<GlowMesh className="absolute inset-0 opacity-80" />
			<GridBackdrop />
			<Container className="relative grid items-center gap-12 py-20 md:py-24 lg:grid-cols-2">
				<div>
					<Link
						to="/products"
						className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-fg-faint transition-colors hover:text-fg"
					>
						<ArrowLeft className="h-3.5 w-3.5" /> Products
					</Link>
					<p className="kicker mt-6">{COMMERCE_HERO.kicker}</p>
					<h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-fg sm:text-5xl">
						{COMMERCE_HERO.title}
					</h1>
					<p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
						{COMMERCE_HERO.lead}
					</p>
					<div className="mt-7 flex flex-wrap gap-2">
						{COMMERCE_HERO.badges.map((b) => (
							<span
								key={b}
								className="rounded-full border border-line bg-bg-soft px-3 py-1 font-mono text-xs text-fg-muted"
							>
								{b}
							</span>
						))}
					</div>
					<div className="mt-8 flex flex-wrap gap-3">
						<Link to="/contact" className={buttonVariants()}>
							Request Demo <ArrowRight className="h-4 w-4" />
						</Link>
						<Link to="/docs" className={buttonVariants({ variant: "outline" })}>
							View Documentation
						</Link>
					</div>
				</div>
				<div className="glass relative overflow-hidden rounded-2xl p-6">
					<EdgeNetwork className="mx-auto max-w-[460px]" />
				</div>
			</Container>
		</section>
	);
}

function WhySection() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<Kicker>Why ViteLoop Commerce</Kicker>
					<SectionHeading>Everything you need to sell online.</SectionHeading>
				</div>
				<div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{COMMERCE_WHY.map((point) => (
						<div
							key={point}
							className="glass flex items-center gap-3 rounded-xl px-5 py-4"
						>
							<Check
								className="h-5 w-5 shrink-0 text-accent-2"
								strokeWidth={2}
							/>
							<span className="text-sm font-medium text-fg">{point}</span>
						</div>
					))}
				</div>
			</Container>
		</Section>
	);
}

function FeaturesSection() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<Kicker>Key features</Kicker>
					<SectionHeading>Built to sell, ship, and scale.</SectionHeading>
					<Lead>
						From AI-generated storefronts to fraud prevention and server-side
						analytics — the tools to run a modern store, on infrastructure that
						keeps up.
					</Lead>
				</div>
				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{COMMERCE_FEATURES.map((f) => {
						const Icon = f.icon;
						return (
							<Reveal key={f.title}>
								<div className="glass card-hover h-full rounded-2xl p-6">
									<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
										<Icon className="h-5 w-5" strokeWidth={1.7} />
									</span>
									<h3 className="mt-5 font-display text-lg font-semibold text-fg">
										{f.title}
									</h3>
									<p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
										{f.blurb}
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

function DifferenceSection() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="glass rounded-3xl p-8 md:p-12">
					<div className="max-w-3xl">
						<Kicker>{COMMERCE_DIFFERENCE.kicker}</Kicker>
						<SectionHeading>{COMMERCE_DIFFERENCE.title}</SectionHeading>
						<Lead>{COMMERCE_DIFFERENCE.lead}</Lead>
					</div>
					<div className="mt-8 flex flex-wrap gap-3">
						{COMMERCE_DIFFERENCE.punchlines.map((p) => (
							<span
								key={p}
								className="rounded-full border border-line bg-bg-soft px-4 py-2 text-sm font-medium text-fg"
							>
								{p}
							</span>
						))}
					</div>
				</div>
			</Container>
		</Section>
	);
}

function FaqSection() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<Kicker>FAQ</Kicker>
					<SectionHeading>Questions, answered.</SectionHeading>
				</div>
				<div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
					{COMMERCE_FAQ.map((f) => (
						<details
							key={f.q}
							className="glass group rounded-2xl px-5 py-4 open:pb-5"
						>
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-fg [&::-webkit-details-marker]:hidden">
								{f.q}
								<ChevronDown className="h-5 w-5 shrink-0 text-fg-faint transition-transform duration-200 group-open:rotate-180" />
							</summary>
							<p className="mt-3 text-sm leading-relaxed text-fg-muted">
								{f.a}
							</p>
						</details>
					))}
				</div>
			</Container>
		</Section>
	);
}
