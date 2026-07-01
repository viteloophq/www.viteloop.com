import {
	Boxes,
	Cloud,
	Code2,
	Container,
	Gauge,
	Lock,
	type LucideIcon,
	Plug,
	Scaling,
	ShieldCheck,
	Unplug,
} from "lucide-react";

export interface Benefit {
	title: string;
	blurb: string;
	icon: LucideIcon;
}

export const BENEFITS: Benefit[] = [
	{
		title: "Self-hosted",
		blurb:
			"Deploy inside your own data centers or cloud accounts. Your data and traffic never leave infrastructure you control.",
		icon: Lock,
	},
	{
		title: "Cloud Agnostic",
		blurb:
			"Runs anywhere — bare metal, AWS, GCP, Azure, or on-prem. No proprietary primitives, no platform tax.",
		icon: Cloud,
	},
	{
		title: "Multi-Cloud",
		blurb:
			"Span providers and regions from one control plane. Move workloads without rewrites or lock-in.",
		icon: Boxes,
	},
	{
		title: "Kubernetes Native",
		blurb:
			"Ships as containers with Helm charts and operators. Fits the orchestration you already run.",
		icon: Container,
	},
	{
		title: "API First",
		blurb:
			"Every capability is exposed through clean, documented APIs. The UI is just another client.",
		icon: Code2,
	},
	{
		title: "Open Architecture",
		blurb:
			"Composable, observable, and standards-based. Swap, extend, or integrate any component.",
		icon: Unplug,
	},
	{
		title: "High Performance",
		blurb:
			"Engineered in Rust and Go for sub-millisecond paths and predictable tail latency at scale.",
		icon: Gauge,
	},
	{
		title: "Scalable",
		blurb:
			"Scale horizontally from a single rack to a global fleet without re-architecting.",
		icon: Scaling,
	},
	{
		title: "Enterprise Ready",
		blurb:
			"SSO, RBAC, audit logging, and air-gapped deployments. Built for compliance from day one.",
		icon: ShieldCheck,
	},
	{
		title: "Developer Friendly",
		blurb:
			"SDKs, a CLI, Terraform providers, and docs that respect your time. Productive on day one.",
		icon: Plug,
	},
];
