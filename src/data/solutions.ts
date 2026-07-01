import {
	Boxes,
	Globe2,
	Lock,
	type LucideIcon,
	Puzzle,
	Settings2,
	Workflow,
} from "lucide-react";

export interface Solution {
	title: string;
	problem: string;
	outcome: string;
	icon: LucideIcon;
	products: string[];
}

/** The six customer problems from the brief, reframed as outcomes. */
export const SOLUTIONS: Solution[] = [
	{
		title: "Avoid vendor lock-in",
		problem:
			"Public clouds trap you with proprietary APIs, egress fees, and pricing you can't predict.",
		outcome:
			"Standards-based software you run yourself — portable across any provider, with no platform tax.",
		icon: Lock,
		products: ["cdn", "edge", "gateway"],
	},
	{
		title: "Maintain full ownership",
		problem:
			"Your traffic, data, and roadmap shouldn't depend on a third party's terms.",
		outcome:
			"You own the deployment, the data path, and the keys. Nothing leaves infrastructure you control.",
		icon: Workflow,
		products: ["storage", "drm", "stream"],
	},
	{
		title: "Deploy anywhere",
		problem:
			"Regions and environments are dictated by what a provider happens to offer.",
		outcome:
			"Run on bare metal, any cloud, or on-prem — including air-gapped and sovereign environments.",
		icon: Globe2,
		products: ["edge", "cdn", "storage"],
	},
	{
		title: "Scale globally",
		problem:
			"Growth means renegotiating contracts and fighting opaque capacity limits.",
		outcome:
			"Add nodes and regions on demand from a single control plane, from one rack to a global fleet.",
		icon: Boxes,
		products: ["edge", "cdn", "stream"],
	},
	{
		title: "Integrate with your environment",
		problem:
			"New platforms rarely fit the identity, observability, and tooling you already run.",
		outcome:
			"API-first and Kubernetes-native, with SSO, RBAC, and OpenTelemetry that slot into your stack.",
		icon: Puzzle,
		products: ["gateway", "billing"],
	},
	{
		title: "Customize every component",
		problem:
			"Black-box services can't be tuned to your workloads or business model.",
		outcome:
			"Composable, configurable software with programmable edges and policies defined as code.",
		icon: Settings2,
		products: ["cdn", "gateway", "transcoder"],
	},
];
