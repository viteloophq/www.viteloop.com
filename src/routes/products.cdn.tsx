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
import { GlowMesh } from "#/components/visuals/glow-mesh";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";
import { EdgeNetwork } from "#/components/visuals/edge-network";
import { RegionMap } from "#/components/visuals/region-map";
import {
	CDN_CAPABILITIES,
	CDN_FAQ,
	CDN_FLOW,
	CDN_HERO,
	CDN_PLANS,
	CDN_SPEED,
	CDN_USE_CASES,
	NETWORK_POINTS,
} from "#/data/cdn";
import { getProduct } from "#/data/products";
import { SITE } from "#/data/site";
import { seo } from "#/lib/seo";
import { cn } from "#/lib/utils";

const PATH = "/products/cdn";

export const Route = createFileRoute("/products/cdn")({
	component: CdnPage,
	head: () => {
		const product = getProduct("cdn");
		const title = "CDN — Global Content Delivery Network — Viteloop";
		const description =
			"A managed, Anycast content delivery network for video, downloads, websites, and large files. Edge caching, HTTP/3, TLS, instant purge, and real-time analytics.";
		return {
			...seo({ title, description, path: PATH }),
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Service",
						name: product?.name ?? "Viteloop CDN",
						serviceType: "Content Delivery Network",
						description,
						provider: {
							"@type": "Organization",
							name: SITE.name,
							url: SITE.url,
						},
						url: `${SITE.url}${PATH}`,
						areaServed: "Worldwide",
					}),
				},
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "FAQPage",
						mainEntity: CDN_FAQ.map((f) => ({
							"@type": "Question",
							name: f.q,
							acceptedAnswer: { "@type": "Answer", text: f.a },
						})),
					}),
				},
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: [
							{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
							{
								"@type": "ListItem",
								position: 2,
								name: "Products",
								item: `${SITE.url}/products`,
							},
							{
								"@type": "ListItem",
								position: 3,
								name: "CDN",
								item: `${SITE.url}${PATH}`,
							},
						],
					}),
				},
			],
		};
	},
});

function CdnPage() {
	return (
		<>
			<CdnHero />
			<NetworkSection />
			<UseCasesSection />
			<CapabilitiesSection />
			<SpeedSection />
			<PricingSection />
			<FaqSection />
			<CTABand
				heading="Put your content on a faster network."
				subtext="Tell us about your traffic and origins — we'll spin up a zone and show you the difference."
			/>
		</>
	);
}

function CdnHero() {
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
					<p className="kicker mt-6">{CDN_HERO.kicker}</p>
					<h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-fg sm:text-5xl">
						{CDN_HERO.title}
					</h1>
					<p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
						{CDN_HERO.lead}
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Link to="/contact" className={buttonVariants({ size: "lg" })}>
							Request a quote <ArrowRight className="h-4 w-4" />
						</Link>
						<Link
							to="/docs"
							className={buttonVariants({ variant: "outline", size: "lg" })}
						>
							Read the docs
						</Link>
					</div>
					<ul className="mt-8 flex flex-wrap gap-2">
						{CDN_HERO.badges.map((b) => (
							<li
								key={b}
								className="rounded-full border border-line bg-bg-soft/60 px-3 py-1 font-mono text-xs text-fg-muted"
							>
								{b}
							</li>
						))}
					</ul>
				</div>
				<div className="glass relative overflow-hidden rounded-2xl p-6">
					<EdgeNetwork className="mx-auto max-w-[460px]" />
				</div>
			</Container>
		</section>
	);
}

function NetworkSection() {
	return (
		<Section className="border-t border-line">
			<Container className="grid items-center gap-12 lg:grid-cols-2">
				<div>
					<Kicker>Global network</Kicker>
					<SectionHeading>
						One Anycast network,{" "}
						<span className="accent-gradient">close to every user.</span>
					</SectionHeading>
					<Lead>
						Every request lands on the nearest healthy edge, is answered from
						cache when it can be, and falls back gracefully when it can't. You
						point your domain at us — we handle the routing, the certificates,
						and the miles.
					</Lead>
					<ul className="mt-8 flex flex-col gap-3">
						{NETWORK_POINTS.map((p) => {
							const Icon = p.icon;
							return (
								<li key={p.label} className="flex items-center gap-3">
									<span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-bg-soft text-accent-2">
										<Icon className="h-5 w-5" strokeWidth={1.7} />
									</span>
									<span className="text-fg">{p.label}</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="glass relative overflow-hidden rounded-2xl p-6">
					<RegionMap />
				</div>
			</Container>
		</Section>
	);
}

function UseCasesSection() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<Kicker>Use cases</Kicker>
					<SectionHeading>Built for whatever you deliver.</SectionHeading>
					<Lead>
						From multi-terabyte game launches to a single hero image, the same
						network keeps it fast and close to your audience.
					</Lead>
				</div>
				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{CDN_USE_CASES.map((u, i) => {
						const Icon = u.icon;
						return (
							<Reveal key={u.title} delay={(i % 4) * 50}>
								<div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
									<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
										<Icon className="h-5 w-5" strokeWidth={1.7} />
									</span>
									<h3 className="mt-5 font-display text-lg font-semibold text-fg">
										{u.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-fg-muted">
										{u.blurb}
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

function CapabilitiesSection() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<Kicker>Capabilities</Kicker>
					<SectionHeading>Everything a modern CDN needs.</SectionHeading>
					<Lead>
						Caching, security, protocols, and control — configured from one
						dashboard or entirely as code.
					</Lead>
				</div>
				<div className="mt-12 grid gap-4 md:grid-cols-2">
					{CDN_CAPABILITIES.map((g, i) => {
						const Icon = g.icon;
						return (
							<Reveal key={g.title} delay={(i % 2) * 60}>
								<div className="glass flex h-full flex-col rounded-2xl p-6 sm:p-7">
									<div className="flex items-center gap-3">
										<span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
											<Icon className="h-5 w-5" strokeWidth={1.7} />
										</span>
										<h3 className="font-display text-lg font-semibold text-fg">
											{g.title}
										</h3>
									</div>
									<ul className="mt-5 grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
										{g.items.map((item) => (
											<li
												key={item}
												className="flex items-start gap-2 text-sm text-fg-muted"
											>
												<Check
													className="mt-0.5 h-4 w-4 shrink-0 text-accent-2"
													strokeWidth={2}
												/>
												{item}
											</li>
										))}
									</ul>
								</div>
							</Reveal>
						);
					})}
				</div>
			</Container>
		</Section>
	);
}

function SpeedSection() {
	return (
		<Section className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<Kicker>How it stays fast</Kicker>
					<SectionHeading>Most requests never reach your origin.</SectionHeading>
					<Lead>
						Traffic is answered as close to the visitor as possible. Your origin
						is fetched once, then the result is reused everywhere.
					</Lead>
				</div>

				<div className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-stretch">
					{CDN_FLOW.map((step, i) => (
						<div
							key={step.label}
							className="flex items-center gap-3 lg:flex-1 lg:flex-col lg:items-stretch"
						>
							<div className="glass flex-1 rounded-2xl p-5">
								<p className="font-mono text-xs uppercase tracking-wider text-accent">
									{`0${i + 1}`}
								</p>
								<p className="mt-2 font-display font-semibold text-fg">
									{step.label}
								</p>
								<p className="mt-1 text-sm leading-relaxed text-fg-muted">
									{step.note}
								</p>
							</div>
							{i < CDN_FLOW.length - 1 && (
								<ArrowRight className="h-5 w-5 shrink-0 rotate-90 text-fg-faint lg:rotate-0" />
							)}
						</div>
					))}
				</div>

				<div className="mt-4 grid gap-4 sm:grid-cols-3">
					{CDN_SPEED.map((s, i) => {
						const Icon = s.icon;
						return (
							<Reveal key={s.title} delay={(i % 3) * 50}>
								<div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
									<Icon className="h-5 w-5 text-accent-2" strokeWidth={1.7} />
									<h3 className="mt-3 font-display text-base font-semibold text-fg">
										{s.title}
									</h3>
									<p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
										{s.blurb}
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

function PricingSection() {
	return (
		<Section id="pricing" className="border-t border-line">
			<Container>
				<div className="max-w-2xl">
					<Kicker>Pricing</Kicker>
					<SectionHeading>Usage-based, with room to grow.</SectionHeading>
					<Lead>
						Pay for the bandwidth you deliver. Move up a tier for analytics,
						security, and support as your traffic scales.
					</Lead>
				</div>
				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{CDN_PLANS.map((plan) => (
						<div
							key={plan.name}
							className={cn(
								"glass card-hover relative flex h-full flex-col rounded-2xl p-6",
								plan.popular &&
									"border-accent/45 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_28%,transparent)]",
							)}
						>
							{plan.popular && (
								<span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-white">
									Most popular
								</span>
							)}
							<h3 className="font-display text-lg font-semibold text-fg">
								{plan.name}
							</h3>
							<p className="mt-1 text-sm text-fg-muted">{plan.tagline}</p>
							<div className="mt-5">
								<span className="font-mono text-3xl font-semibold text-fg">
									{plan.price}
								</span>
								<span className="ml-1.5 text-sm text-fg-faint">{plan.unit}</span>
							</div>
							<Link
								to="/contact"
								className={cn(
									buttonVariants({
										variant: plan.popular ? "primary" : "outline",
									}),
									"mt-6 w-full",
								)}
							>
								{plan.cta}
							</Link>
							<ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
								{plan.features.map((f) => (
									<li
										key={f}
										className="flex items-start gap-2 text-sm text-fg-muted"
									>
										<Check
											className="mt-0.5 h-4 w-4 shrink-0 text-accent-2"
											strokeWidth={2}
										/>
										{f}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<p className="mt-6 text-sm text-fg-faint">
					Prices shown are placeholders.{" "}
					<Link to="/contact" className="text-accent hover:underline">
						Contact us
					</Link>{" "}
					for current per-GB and committed-volume rates.
				</p>
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
					{CDN_FAQ.map((f) => (
						<details
							key={f.q}
							className="glass group rounded-2xl px-5 py-4 open:pb-5"
						>
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-fg [&::-webkit-details-marker]:hidden">
								{f.q}
								<ChevronDown className="h-5 w-5 shrink-0 text-fg-faint transition-transform duration-200 group-open:rotate-180" />
							</summary>
							<p className="mt-3 text-sm leading-relaxed text-fg-muted">{f.a}</p>
						</details>
					))}
				</div>
			</Container>
		</Section>
	);
}
