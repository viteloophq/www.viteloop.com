import { createFileRoute } from "@tanstack/react-router";
import { seo } from "#/lib/seo";
import { ArrowUpRight } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { PageHero } from "#/components/primitives/page-hero";
import { Section } from "#/components/primitives/section";
import { Badge } from "#/components/ui/badge";

export const Route = createFileRoute("/blog")({
	component: BlogPage,
	head: () =>
		seo({
			title: "Blog — Viteloop",
			description:
				"Engineering deep-dives, product updates, and notes on building internet infrastructure from the Viteloop team.",
			path: "/blog",
		}),
});

interface Post {
	title: string;
	excerpt: string;
	tag: string;
	date: string;
	readtime: string;
}

const FEATURED: Post = {
	title: "Designing a control plane that runs in someone else's cloud",
	excerpt:
		"Building infrastructure software means surrendering control of the environment. Here's how we designed Viteloop's control plane to be portable, observable, and safe across any deployment target.",
	tag: "Engineering",
	date: "Jun 24, 2026",
	readtime: "9 min read",
};

const POSTS: Post[] = [
	{
		title: "Per-title encoding with VMAF-guided AI",
		excerpt:
			"How Viteloop Transcoder cuts bitrate up to 40% without visible quality loss.",
		tag: "Product",
		date: "Jun 12, 2026",
		readtime: "6 min read",
	},
	{
		title: "Request collapsing at the edge",
		excerpt:
			"A look at the caching strategy that keeps origins quiet under traffic spikes.",
		tag: "Engineering",
		date: "May 30, 2026",
		readtime: "7 min read",
	},
	{
		title: "Bringing DRM in-house",
		excerpt:
			"Why owning your license server matters — and how to migrate without downtime.",
		tag: "Security",
		date: "May 18, 2026",
		readtime: "5 min read",
	},
	{
		title: "Multi-region orchestration, explained",
		excerpt:
			"One control plane, many regions: the data model behind global deployments.",
		tag: "Engineering",
		date: "May 02, 2026",
		readtime: "8 min read",
	},
	{
		title: "The economics of owning your CDN",
		excerpt:
			"When per-GB pricing stops making sense, and what self-hosting really costs.",
		tag: "Company",
		date: "Apr 21, 2026",
		readtime: "6 min read",
	},
	{
		title: "Shipping a Terraform provider for everything",
		excerpt:
			"Treating infrastructure software as declarative resources, end to end.",
		tag: "Product",
		date: "Apr 09, 2026",
		readtime: "5 min read",
	},
];

function BlogPage() {
	return (
		<>
			<PageHero kicker="Blog" title="Engineering & product updates.">
				Deep-dives on building internet infrastructure, product releases, and
				lessons from running software in environments we don't control.
			</PageHero>

			<Section>
				<Container>
					<a
						href="#"
						className="glass card-hover group grid gap-6 rounded-3xl p-6 md:grid-cols-2 md:p-8"
					>
						<div className="aspect-[16/10] overflow-hidden rounded-2xl border border-line accent-bg opacity-90" />
						<div className="flex flex-col justify-center">
							<div className="flex items-center gap-3">
								<Badge variant="accent">{FEATURED.tag}</Badge>
								<span className="font-mono text-xs text-fg-faint">
									{FEATURED.date} · {FEATURED.readtime}
								</span>
							</div>
							<h2 className="mt-4 text-balance font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
								{FEATURED.title}
							</h2>
							<p className="mt-3 leading-relaxed text-fg-muted">
								{FEATURED.excerpt}
							</p>
							<span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
								Read article
								<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
							</span>
						</div>
					</a>

					<div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{POSTS.map((post) => (
							<a
								key={post.title}
								href="#"
								className="glass card-hover group flex flex-col rounded-2xl p-6"
							>
								<div className="flex items-center gap-3">
									<Badge>{post.tag}</Badge>
									<span className="font-mono text-xs text-fg-faint">
										{post.readtime}
									</span>
								</div>
								<h3 className="mt-4 font-display text-lg font-semibold leading-snug text-fg">
									{post.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-fg-muted">
									{post.excerpt}
								</p>
								<span className="mt-auto pt-5 font-mono text-xs text-fg-faint">
									{post.date}
								</span>
							</a>
						))}
					</div>
				</Container>
			</Section>
		</>
	);
}
