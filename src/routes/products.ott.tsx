import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
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
import { GlowMesh } from "#/components/visuals/glow-mesh";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";
import { OttMockup } from "#/components/visuals/ott-mockup";
import {
	OTT_AUDIENCE,
	OTT_FAQ,
	OTT_FEATURES,
	OTT_HERO,
	OTT_SEO,
} from "#/data/ott";
import { SITE } from "#/data/site";
import { breadcrumbScript, seo } from "#/lib/seo";

const PATH = "/products/ott";

export const Route = createFileRoute("/products/ott")({
	component: OttPage,
	head: () => ({
		...seo({
			title: OTT_SEO.title,
			description: OTT_SEO.description,
			path: PATH,
		}),
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "SoftwareApplication",
					name: "Viteloop OTT",
					applicationCategory: "MultimediaApplication",
					operatingSystem: "iOS, Android, Android TV, Fire TV, Roku, Web",
					description: OTT_SEO.description,
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
				{ name: "OTT", path: PATH },
			]),
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: OTT_FAQ.map((f) => ({
						"@type": "Question",
						name: f.q,
						acceptedAnswer: { "@type": "Answer", text: f.a },
					})),
				}),
			},
		],
	}),
});

function OttPage() {
	return (
		<>
			<OttHero />
			<FeaturesSection />
			<AudienceSection />
			<FaqSection />
			<CTABand
				heading="Launch your streaming service."
				subtext="Tell us about your content and audience — we'll show you Viteloop OTT running under your brand."
			/>
		</>
	);
}

function OttHero() {
	return (
		<section className="relative overflow-hidden border-b border-line">
			<GlowMesh className="absolute inset-0 opacity-80" />
			<GridBackdrop />
			<Container className="relative grid items-center gap-12 py-20 md:py-24 lg:grid-cols-2">
				<div>
					<Link
						to="/products"
						className="flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-fg-faint transition-colors hover:text-fg"
					>
						<ArrowLeft className="h-3.5 w-3.5" /> Products
					</Link>
					<p className="kicker mt-6">{OTT_HERO.kicker}</p>
					<h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-fg sm:text-5xl">
						{OTT_HERO.title}
					</h1>
					<p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
						{OTT_HERO.lead}
					</p>
					<div className="mt-7 flex flex-wrap gap-2">
						{OTT_HERO.badges.map((b) => (
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
						<Link
							to="/contact"
							className={buttonVariants({ variant: "outline" })}
						>
							Talk to Sales
						</Link>
					</div>
				</div>
				<OttMockup className="w-full max-w-[520px] lg:ml-auto" />
			</Container>
		</section>
	);
}

function FeaturesSection() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<Kicker>Everything you need to launch</Kicker>
					<SectionHeading>A complete platform, built in.</SectionHeading>
					<Lead>
						All the tools and features to run a modern streaming service — ready
						from day one.
					</Lead>
				</div>
				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{OTT_FEATURES.map((f) => {
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

function AudienceSection() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<Kicker>Who it's for</Kicker>
					<SectionHeading>
						Built for content owners who want control.
					</SectionHeading>
				</div>
				<div className="mt-10 grid gap-4 sm:grid-cols-3">
					{OTT_AUDIENCE.map((a) => (
						<div key={a.title} className="glass rounded-2xl p-6">
							<h3 className="font-display text-lg font-semibold text-fg">
								{a.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-fg-muted">
								{a.blurb}
							</p>
						</div>
					))}
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
					{OTT_FAQ.map((f) => (
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
