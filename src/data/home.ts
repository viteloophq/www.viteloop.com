import {
	Cpu,
	Globe,
	type LucideIcon,
	PlayCircle,
	Radio,
	ShieldCheck,
	ShoppingBag,
} from "lucide-react";

/** External + still-unconfirmed URLs. REPLACE placeholders when known. */
export const HOME_URLS = {
	signup: "https://console.viteloop.com/signup", // confirmed
	deploy: "https://console.viteloop.com/signup", // TODO(content): real deploy quickstart
	pricing: "https://console.viteloop.com/signup", // TODO(content): real pricing page/route
} as const;

/** One-command deploy snippet shown in "Run it your way". */
export const DEPLOY_COMMAND = "viteloop nodes deploy --region auto"; // TODO(content): real CLI command

/** Scale strip. Values are placeholders until real figures land — no invented numbers ship as fact. */
export interface HomeStat {
	label: string;
	value: string;
}
export const HOME_STATS: HomeStat[] = [
	{ label: "Edge locations", value: "—" }, // TODO(content)
	{ label: "Regions", value: "—" }, // TODO(content)
	{ label: "Capacity", value: "—" }, // TODO(content)
	{ label: "Requests / sec", value: "—" }, // TODO(content)
	{ label: "p50 latency", value: "—" }, // TODO(content)
];

/** Pricing teaser. */
export const HOME_PRICING = {
	headline: "Simple, usage-based pricing.",
	sub: "Start free. Pay for what you deliver. No lock-in.",
	price: "—", // TODO(content): e.g. "From $X / mo"
} as const;

/** 6 marketing pillars → link to the best-matching product route. */
export interface HomePillar {
	name: string;
	blurb: string;
	to: string;
	icon: LucideIcon;
}
export const HOME_PILLARS: HomePillar[] = [
	{
		name: "CDN",
		blurb: "Global content delivery on your network or ours.",
		to: "/products/cdn",
		icon: Globe,
	},
	{
		name: "Video",
		blurb: "VOD & video CDN with low-rebuffer delivery.",
		to: "/products/video-cdn",
		icon: PlayCircle,
	},
	{
		name: "Live",
		blurb: "Low-latency live streaming at scale.",
		to: "/products/stream",
		icon: Radio,
	},
	{
		name: "DRM",
		blurb: "Multi-DRM protection for every screen.",
		to: "/products/drm",
		icon: ShieldCheck,
	},
	{
		name: "Commerce",
		blurb: "AI-powered commerce at the edge.",
		to: "/products/commerce",
		icon: ShoppingBag,
	},
	{
		name: "Edge",
		blurb: "Serverless functions and compute at the edge.",
		to: "/products/edge-compute",
		icon: Cpu,
	},
];
