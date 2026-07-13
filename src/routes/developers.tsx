import { createFileRoute, Link } from "@tanstack/react-router";
import {
	BookOpen,
	Boxes,
	Code2,
	type LucideIcon,
	Terminal,
	Webhook,
} from "lucide-react";
import { CodeBlock } from "#/components/primitives/code-block";
import { Container } from "#/components/primitives/container";
import { PageHero } from "#/components/primitives/page-hero";
import { Section, SectionHeading } from "#/components/primitives/section";
import { CTABand } from "#/components/sections/cta-band";
import { buttonVariants } from "#/components/ui/button";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/developers")({
	component: DevelopersPage,
	head: () =>
		seo({
			title: "Developers — Viteloop",
			description:
				"Viteloop is API-first: REST APIs, SDKs, a CLI, webhooks, and a Terraform provider for automating every part of your infrastructure.",
			path: "/developers",
		}),
});

const CAPABILITIES: { icon: LucideIcon; title: string; blurb: string }[] = [
	{
		icon: Code2,
		title: "REST APIs & SDKs",
		blurb:
			"Typed SDKs for TypeScript, Go, Python, and Rust over clean REST APIs.",
	},
	{
		icon: Webhook,
		title: "Webhooks",
		blurb:
			"Subscribe to events across delivery, transcoding, and billing in real time.",
	},
	{
		icon: Boxes,
		title: "Terraform & Kubernetes",
		blurb:
			"Provision and manage every resource declaratively, the way you already work.",
	},
	{
		icon: Terminal,
		title: "CLI & OpenAPI",
		blurb:
			"A scriptable CLI plus a full OpenAPI spec to generate clients for any stack.",
	},
];

const SAMPLES = [
	{
		title: "rest.sh",
		code: `# Create an edge cache rule
curl -X POST https://cdn.your-org.net/v1/edge-rules \\
  -H "Authorization: Bearer $VL_TOKEN" \\
  -d '{ "match": "/assets/*", "cache_ttl": "30d", "compress": true }'`,
	},
	{
		title: "stream.ts",
		code: `import { Viteloop } from "@viteloop/sdk";

const vl = new Viteloop({ token: process.env.VL_TOKEN });

const asset = await vl.stream.assets.create({
  source: "s3://ingest/keynote.mov",
  profiles: ["1080p", "720p", "480p"],
  drm: true,
});

console.log(asset.playbackUrl);`,
	},
	{
		title: "main.tf",
		code: `resource "viteloop_cdn_zone" "web" {
  name   = "production"
  origin = "https://origin.your-org.net"

  cache {
    default_ttl = "1h"
    brotli      = true
  }
}`,
	},
];

const QUICKSTART = [
	"Install the CLI and authenticate against your control plane.",
	"Provision a zone, pipeline, or bucket via Terraform or the API.",
	"Point your origin at Viteloop and ship — observe everything in real time.",
];

function DevelopersPage() {
	return (
		<>
			<PageHero kicker="Developers" title="API-first. Built for engineers.">
				Every capability in Viteloop is an API. Automate your infrastructure
				with SDKs, a CLI, webhooks, and a Terraform provider — no consoles
				required.
			</PageHero>

			<Section>
				<Container>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{CAPABILITIES.map((c) => {
							const Icon = c.icon;
							return (
								<div key={c.title} className="glass rounded-2xl p-6">
									<Icon className="h-5 w-5 text-accent-2" strokeWidth={1.7} />
									<h3 className="mt-4 font-display text-base font-semibold text-fg">
										{c.title}
									</h3>
									<p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
										{c.blurb}
									</p>
								</div>
							);
						})}
					</div>
				</Container>
			</Section>

			<Section className="border-t border-line">
				<Container>
					<div className="max-w-2xl">
						<SectionHeading>
							One API surface,{" "}
							<span className="accent-gradient">any tool.</span>
						</SectionHeading>
					</div>
					<div className="mt-10 grid gap-4 lg:grid-cols-3">
						{SAMPLES.map((s) => (
							<CodeBlock key={s.title} title={s.title} code={s.code} />
						))}
					</div>
				</Container>
			</Section>

			<Section className="border-t border-line">
				<Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
					<div>
						<SectionHeading>Ship in three steps.</SectionHeading>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link to="/docs" className={buttonVariants()}>
								<BookOpen className="h-4 w-4" /> Read the docs
							</Link>
						</div>
					</div>
					<ol className="flex flex-col gap-4">
						{QUICKSTART.map((step, i) => (
							<li
								key={step}
								className="glass flex items-start gap-4 rounded-2xl p-5"
							>
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-bg-soft font-mono text-sm text-accent-2">
									{i + 1}
								</span>
								<span className="text-fg">{step}</span>
							</li>
						))}
					</ol>
				</Container>
			</Section>

			<CTABand
				heading="Start building on your own infrastructure."
				subtext="Get API access and a guided technical onboarding from our engineering team."
			/>
		</>
	);
}
