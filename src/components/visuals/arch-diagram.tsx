import { Cloud, Cpu, Layers, type LucideIcon, Network } from "lucide-react";
import { cn } from "#/lib/utils";

interface Layer {
	icon: LucideIcon;
	name: string;
	desc: string;
	chips: string[];
}

const LAYERS: Layer[] = [
	{
		icon: Network,
		name: "Edge Layer",
		desc: "Where your users connect",
		chips: ["CDN", "Edge", "Gateway"],
	},
	{
		icon: Layers,
		name: "Control Plane",
		desc: "Orchestration, policy & APIs",
		chips: ["Multi-region Orchestration", "Billing", "DRM"],
	},
	{
		icon: Cpu,
		name: "Data Plane",
		desc: "Processing & delivery",
		chips: ["Stream", "Transcoder", "Media Processing"],
	},
	{
		icon: Cloud,
		name: "Your Infrastructure",
		desc: "Bare metal · Any cloud · On-prem",
		chips: ["Kubernetes", "Object Storage"],
	},
];

/** Layered stack showing how Viteloop composes inside the customer's environment. */
export function ArchDiagram({ className }: { className?: string }) {
	return (
		<div className={cn("relative", className)} aria-hidden="false">
			<div
				className="absolute bottom-6 left-[27px] top-6 w-px"
				style={{
					background:
						"linear-gradient(var(--accent), var(--accent-2), transparent)",
				}}
				aria-hidden="true"
			/>
			<ul className="flex flex-col gap-3">
				{LAYERS.map((layer) => {
					const Icon = layer.icon;
					return (
						<li
							key={layer.name}
							className="glass card-hover relative flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center"
						>
							<div className="flex items-center gap-4">
								<span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
									<Icon className="h-6 w-6" strokeWidth={1.6} />
								</span>
								<div className="min-w-0">
									<p className="font-display font-semibold text-fg">
										{layer.name}
									</p>
									<p className="text-sm text-fg-muted">{layer.desc}</p>
								</div>
							</div>
							<div className="flex flex-wrap gap-2 sm:ml-auto sm:justify-end">
								{layer.chips.map((chip) => (
									<span
										key={chip}
										className="rounded-full border border-line bg-bg-soft/60 px-3 py-1 font-mono text-xs text-fg-muted"
									>
										{chip}
									</span>
								))}
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
