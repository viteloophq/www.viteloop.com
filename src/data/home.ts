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
	/** Product slug; converted to typed router props via `pillarLinkProps`. */
	slug: string;
	icon: LucideIcon;
}
export const HOME_PILLARS: HomePillar[] = [
	{
		name: "CDN",
		blurb: "Global content delivery on your network or ours.",
		slug: "cdn",
		icon: Globe,
	},
	{
		name: "Video",
		blurb: "VOD & video CDN with low-rebuffer delivery.",
		slug: "video-cdn",
		icon: PlayCircle,
	},
	{
		name: "Live",
		blurb: "Low-latency live streaming at scale.",
		slug: "stream",
		icon: Radio,
	},
	{
		name: "DRM",
		blurb: "Multi-DRM protection for every screen.",
		slug: "drm",
		icon: ShieldCheck,
	},
	{
		name: "Commerce",
		blurb: "AI-powered commerce at the edge.",
		slug: "commerce",
		icon: ShoppingBag,
	},
	{
		name: "Edge",
		blurb: "Serverless functions and compute at the edge.",
		slug: "edge-compute",
		icon: Cpu,
	},
];

/**
 * Typed router link props for a pillar. `cdn` and `commerce` have dedicated
 * static routes (`/products/cdn`, `/products/commerce`); every other pillar
 * resolves through the shared `/products/$slug` template. Mirrors the intent
 * of `productLinkProps` in `#/data/products` and avoids the router's
 * "matched a different route" ambiguity for pages that have a dedicated route.
 */
export const pillarLinkProps = (slug: string) => {
	if (slug === "cdn") return { to: "/products/cdn" } as const;
	if (slug === "commerce") return { to: "/products/commerce" } as const;
	return { to: "/products/$slug", params: { slug } } as const;
};
