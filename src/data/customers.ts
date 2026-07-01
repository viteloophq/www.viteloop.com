import {
	Boxes,
	Building2,
	Clapperboard,
	Cloud,
	Landmark,
	type LucideIcon,
	MonitorPlay,
	Network,
	Radio,
	Server,
	Wrench,
} from "lucide-react";

export interface Customer {
	name: string;
	blurb: string;
	icon: LucideIcon;
}

export const CUSTOMERS: Customer[] = [
	{
		name: "Hosting Providers",
		blurb: "Launch CDN, storage, and streaming products under your own brand.",
		icon: Server,
	},
	{
		name: "ISPs",
		blurb:
			"Cache and deliver content inside your network to cut transit costs.",
		icon: Network,
	},
	{
		name: "Telecom Operators",
		blurb: "Build edge and media services on your existing footprint.",
		icon: Radio,
	},
	{
		name: "Enterprises",
		blurb:
			"Own the infrastructure behind internal and customer-facing platforms.",
		icon: Building2,
	},
	{
		name: "Governments",
		blurb: "Sovereign, air-gapped deployments with full data residency.",
		icon: Landmark,
	},
	{
		name: "Streaming Platforms",
		blurb: "Operate VOD and live delivery end to end, without per-GB fees.",
		icon: MonitorPlay,
	},
	{
		name: "SaaS Companies",
		blurb: "Embed delivery, storage, and media into your product stack.",
		icon: Boxes,
	},
	{
		name: "Cloud Providers",
		blurb: "Offer differentiated CDN and edge services to your customers.",
		icon: Cloud,
	},
	{
		name: "Media Companies",
		blurb: "Control the full pipeline from ingest to protected delivery.",
		icon: Clapperboard,
	},
	{
		name: "System Integrators",
		blurb: "Deliver turnkey infrastructure platforms for your clients.",
		icon: Wrench,
	},
];
