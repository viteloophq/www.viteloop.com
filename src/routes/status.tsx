import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { PageHero } from "#/components/primitives/page-hero";
import { Section } from "#/components/primitives/section";
import { breadcrumbScript, seo } from "#/lib/seo";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/status")({
	component: StatusPage,
	head: () => ({
		...seo({
			title: "Status — Viteloop",
			description: "Operational status of Viteloop systems and services.",
			path: "/status",
		}),
		scripts: [
			breadcrumbScript([
				{ name: "Home", path: "/" },
				{ name: "Status", path: "/status" },
			]),
		],
	}),
});

interface Component {
	name: string;
	uptime: string;
	/** day indices (0-89) that were degraded */
	degraded: number[];
}

const COMPONENTS: Component[] = [
	{ name: "Global CDN", uptime: "100.00%", degraded: [] },
	{ name: "Streaming (VOD & Live)", uptime: "99.99%", degraded: [] },
	{ name: "Transcoding", uptime: "99.94%", degraded: [41, 42] },
	{ name: "DRM & Licensing", uptime: "100.00%", degraded: [] },
	{ name: "OTT Platform", uptime: "99.98%", degraded: [] },
	{ name: "Dashboard", uptime: "99.97%", degraded: [12] },
	{ name: "Control Plane API", uptime: "99.99%", degraded: [70] },
];

const INCIDENTS = [
	{
		date: "Jun 18, 2026",
		title: "Elevated transcoding queue latency",
		status: "Resolved",
		detail:
			"A regional worker pool saw delayed job pickup for ~22 minutes. Capacity was rebalanced and pipelines fully recovered.",
	},
	{
		date: "May 09, 2026",
		title: "Dashboard login delays",
		status: "Resolved",
		detail:
			"Some users experienced slow sign-ins due to an identity provider timeout. Mitigated by failing over to a secondary region.",
	},
];

function UptimeBar({ degraded }: { degraded: number[] }) {
	const set = new Set(degraded);
	return (
		<div className="flex h-8 items-stretch gap-[2px]" aria-hidden="true">
			{Array.from({ length: 90 }, (_, i) => i).map((day) => (
				<span
					key={day}
					className={cn(
						"flex-1 rounded-[1px]",
						set.has(day) ? "bg-amber-400/70" : "bg-accent-2/55",
					)}
				/>
			))}
		</div>
	);
}

function StatusPage() {
	return (
		<>
			<PageHero kicker="Status" title="System status.">
				Real-time operational status for Viteloop's reference services.
				Customers running self-hosted deployments monitor their own instances.
			</PageHero>

			<Section>
				<Container>
					<div className="glass flex items-center gap-4 rounded-2xl border-accent-2/30 p-6">
						<span className="grid h-12 w-12 place-items-center rounded-full bg-accent-2/15 text-accent-2">
							<CheckCircle2 className="h-6 w-6" />
						</span>
						<div>
							<p className="font-display text-xl font-semibold text-fg">
								All systems operational
							</p>
							<p className="text-sm text-fg-muted">
								Last updated just now · 90-day history below
							</p>
						</div>
					</div>

					<div className="mt-6 flex flex-col gap-3">
						{COMPONENTS.map((c) => (
							<div key={c.name} className="glass rounded-2xl p-5">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2.5">
										<span
											className={cn(
												"h-2.5 w-2.5 rounded-full",
												c.degraded.length
													? "bg-amber-400"
													: "bg-accent-2 shadow-[0_0_10px_1px_var(--accent-2)]",
											)}
										/>
										<span className="font-medium text-fg">{c.name}</span>
									</div>
									<span className="font-mono text-xs text-fg-muted">
										{c.uptime} uptime
									</span>
								</div>
								<div className="mt-4">
									<UptimeBar degraded={c.degraded} />
									<div className="mt-2 flex justify-between font-mono text-[11px] text-fg-faint">
										<span>90 days ago</span>
										<span>today</span>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="mt-14">
						<h2 className="text-xl font-semibold tracking-tight text-fg">
							Past incidents
						</h2>
						<div className="mt-6 flex flex-col gap-4">
							{INCIDENTS.map((incident) => (
								<div
									key={incident.title}
									className="rounded-2xl border-l-2 border-line bg-bg-soft/40 p-5 pl-6"
								>
									<div className="flex flex-wrap items-center gap-3">
										<span className="font-mono text-xs text-fg-faint">
											{incident.date}
										</span>
										<span className="rounded-full bg-accent-2/15 px-2.5 py-0.5 font-mono text-[11px] text-accent-2">
											{incident.status}
										</span>
									</div>
									<h3 className="mt-2 font-display text-base font-semibold text-fg">
										{incident.title}
									</h3>
									<p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
										{incident.detail}
									</p>
								</div>
							))}
						</div>
					</div>
				</Container>
			</Section>
		</>
	);
}
