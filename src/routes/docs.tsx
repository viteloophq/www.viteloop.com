import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Boxes, Rocket, Search, Terminal } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/docs")({
	component: DocsPage,
	head: () =>
		seo({
			title: "Documentation — Viteloop",
			description:
				"Guides, references, and API docs for deploying and operating Viteloop infrastructure software.",
			path: "/docs",
		}),
});

const DOCS_NAV = [
	{
		title: "Getting Started",
		items: ["Introduction", "Installation", "Quickstart", "Architecture"],
	},
	{
		title: "Products",
		items: [
			"CDN",
			"Stream",
			"Transcoder",
			"DRM",
			"Billing",
			"Storage",
			"Edge",
			"Gateway",
		],
	},
	{
		title: "Guides",
		items: [
			"Deployment",
			"Multi-region",
			"Scaling",
			"Observability",
			"Security",
		],
	},
	{
		title: "API Reference",
		items: ["Authentication", "REST API", "Webhooks", "SDKs", "CLI"],
	},
];

const QUICKSTART_CARDS = [
	{
		icon: Rocket,
		title: "Quickstart",
		blurb: "Deploy your first Viteloop component in under 15 minutes.",
	},
	{
		icon: Boxes,
		title: "Architecture",
		blurb: "How the control plane, data plane, and edge fit together.",
	},
	{
		icon: Terminal,
		title: "CLI Reference",
		blurb: "Every command for managing your infrastructure from the terminal.",
	},
];

const POPULAR = [
	"Deploying on Kubernetes",
	"Configuring multi-region orchestration",
	"Authentication & API tokens",
	"Setting up multi-DRM",
	"Tuning cache behavior",
	"Streaming low-latency live",
];

function DocsPage() {
	return (
		<>
			<section className="border-b border-line bg-bg-soft/30">
				<Container className="py-12">
					<p className="kicker">Documentation</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
						Everything you need to run Viteloop.
					</h1>
					<div className="mt-6 flex max-w-xl items-center gap-3 rounded-xl border border-line bg-bg px-4 py-3 text-fg-muted">
						<Search className="h-4 w-4 text-fg-faint" />
						<input
							type="search"
							placeholder="Search the docs…"
							aria-label="Search documentation"
							className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-faint"
						/>
						<kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-xs text-fg-faint sm:block">
							⌘K
						</kbd>
					</div>
				</Container>
			</section>

			<Container className="grid gap-12 py-12 lg:grid-cols-[230px_1fr]">
				<aside className="lg:sticky lg:top-24 lg:self-start">
					<nav className="flex flex-col gap-7" aria-label="Documentation">
						{DOCS_NAV.map((group) => (
							<div key={group.title}>
								<p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
									{group.title}
								</p>
								<ul className="mt-3 flex flex-col gap-1">
									{group.items.map((item) => (
										<li key={item}>
											<a
												href="#"
												className="block rounded-md px-2 py-1.5 text-sm text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg"
											>
												{item}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</aside>

				<div>
					<div className="grid gap-4 sm:grid-cols-3">
						{QUICKSTART_CARDS.map((card) => {
							const Icon = card.icon;
							return (
								<a
									key={card.title}
									href="#"
									className="glass card-hover flex flex-col rounded-2xl p-6"
								>
									<Icon className="h-5 w-5 text-accent-2" strokeWidth={1.7} />
									<h2 className="mt-4 font-display text-base font-semibold text-fg">
										{card.title}
									</h2>
									<p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
										{card.blurb}
									</p>
								</a>
							);
						})}
					</div>

					<div className="prose mt-12">
						<h2>Welcome to the Viteloop docs</h2>
						<p>
							Viteloop is infrastructure software you deploy and operate in your
							own environment. These docs cover installation, architecture, and
							the APIs behind every product — from the CDN data path to
							multi-region orchestration.
						</p>
						<p>
							New here? Start with the <a href="#">Quickstart</a> to deploy your
							first component, then read the <a href="#">Architecture</a>{" "}
							overview to understand how the control plane and data plane
							interact.
						</p>
					</div>

					<div className="mt-10">
						<p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
							Popular topics
						</p>
						<ul className="mt-4 grid gap-2 sm:grid-cols-2">
							{POPULAR.map((topic) => (
								<li key={topic}>
									<a
										href="#"
										className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
									>
										<ArrowRight className="h-3.5 w-3.5 text-accent-2 transition-transform group-hover:translate-x-0.5" />
										{topic}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</Container>
		</>
	);
}
