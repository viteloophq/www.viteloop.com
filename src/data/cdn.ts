import {
	Activity,
	DatabaseZap,
	Gauge,
	Globe,
	HardDriveDownload,
	type LucideIcon,
	MonitorPlay,
	Package,
	RefreshCw,
	Route,
	ShieldCheck,
	Waypoints,
} from "lucide-react";

/**
 * Content for the dedicated, managed-CDN marketing page at /products/cdn.
 * Positioned as a service (traffic runs on our network) — distinct from the
 * generic self-hosted product template. Network scale is kept qualitative and
 * plan prices are placeholders to be replaced before launch.
 */

export interface NetworkPoint {
	icon: LucideIcon;
	label: string;
}

export interface UseCase {
	icon: LucideIcon;
	title: string;
	blurb: string;
}

export interface CapabilityGroup {
	icon: LucideIcon;
	title: string;
	items: string[];
}

export interface SpeedPoint {
	icon: LucideIcon;
	title: string;
	blurb: string;
}

export interface FlowStep {
	label: string;
	note: string;
}

export interface PricingPlan {
	name: string;
	tagline: string;
	/** Placeholder — replace with real pricing before launch. */
	price: string;
	unit: string;
	popular?: boolean;
	cta: string;
	features: string[];
}

export interface Faq {
	q: string;
	a: string;
}

export const CDN_HERO = {
	kicker: "Content Delivery Network",
	title: "Global content delivery, engineered for speed.",
	lead: "Push your traffic to an Anycast network that caches content at the edge, milliseconds from your users. TLS, HTTP/3, instant purge, and real-time analytics — without running a single server yourself.",
	badges: ["HTTP/3 · QUIC", "TLS 1.3", "Instant purge", "Real-time analytics"],
} as const;

export const NETWORK_POINTS: NetworkPoint[] = [
	{ icon: Globe, label: "Points of presence across six continents" },
	{ icon: Route, label: "Anycast routing to the nearest healthy edge" },
	{ icon: DatabaseZap, label: "Tiered caching with automatic origin shield" },
	{ icon: RefreshCw, label: "Self-healing failover and re-routing" },
];

export const CDN_USE_CASES: UseCase[] = [
	{
		icon: MonitorPlay,
		title: "Video & streaming",
		blurb:
			"Deliver VOD and live video at scale — adaptive-bitrate segments cached at the edge for smooth playback and fewer rebuffers, worldwide.",
	},
	{
		icon: HardDriveDownload,
		title: "Software & game downloads",
		blurb:
			"Ship builds, patches, and game updates to millions. Request collapsing keeps your origin cool through launch-day spikes.",
	},
	{
		icon: Gauge,
		title: "Website & app acceleration",
		blurb:
			"Cache static assets, images, and API responses close to users — faster paint, lower latency, and far less load on your servers.",
	},
	{
		icon: Package,
		title: "Large files & SaaS delivery",
		blurb:
			"Installers, user-generated content, and SaaS assets served reliably, with range-aware, resumable caching for files of any size.",
	},
];

export const CDN_CAPABILITIES: CapabilityGroup[] = [
	{
		icon: DatabaseZap,
		title: "Caching & performance",
		items: [
			"Tiered edge caching",
			"Request collapsing",
			"Origin shielding",
			"Instant global purge",
			"Stale-while-revalidate",
			"Brotli & Gzip compression",
		],
	},
	{
		icon: ShieldCheck,
		title: "Security & TLS",
		items: [
			"Free managed TLS 1.3",
			"Signed URLs & token auth",
			"DDoS-resilient edge",
			"Hotlink protection",
			"IP, geo & rate rules",
			"Bring-your-own certificates",
		],
	},
	{
		icon: Waypoints,
		title: "Protocols & delivery",
		items: [
			"HTTP/3 (QUIC) & HTTP/2",
			"IPv6 everywhere",
			"Range & resumable requests",
			"WebSocket passthrough",
			"HLS & DASH pass-through",
			"Custom domains & CNAME",
		],
	},
	{
		icon: Activity,
		title: "Control & observability",
		items: [
			"Real-time logs & analytics",
			"REST API & Terraform",
			"Programmable edge rules",
			"Multiple origins & failover",
			"Role-based access control",
			"Usage & cost dashboards",
		],
	},
];

export const CDN_SPEED: SpeedPoint[] = [
	{
		icon: DatabaseZap,
		title: "Tiered caching",
		blurb:
			"Popular content is held at edge and regional tiers, so most requests are served without ever reaching your origin.",
	},
	{
		icon: Waypoints,
		title: "Request collapsing",
		blurb:
			"Thousands of simultaneous misses for the same object collapse into a single origin fetch — no thundering herd.",
	},
	{
		icon: ShieldCheck,
		title: "Origin shield",
		blurb:
			"A designated shield tier absorbs misses and smooths traffic, cutting origin egress and protecting your servers.",
	},
];

export const CDN_FLOW: FlowStep[] = [
	{ label: "Visitor", note: "Routed by Anycast to the nearest edge" },
	{ label: "Nearest edge", note: "A cache hit never touches your origin" },
	{ label: "Origin shield", note: "One regional node fetches on a miss" },
	{ label: "Your origin", note: "Fetched once, cached everywhere" },
];

/** NOTE: prices are placeholders — replace before launch. */
export const CDN_PLANS: PricingPlan[] = [
	{
		name: "Starter",
		tagline: "Side projects & first traffic",
		price: "$0.0X",
		unit: "per GB delivered",
		cta: "Start free",
		features: [
			"Pay-as-you-go bandwidth",
			"Full global edge network",
			"Free managed TLS & HTTP/3",
			"Instant cache purge",
			"Community support",
		],
	},
	{
		name: "Growth",
		tagline: "Growing products & teams",
		price: "$0.0X",
		unit: "per GB delivered",
		popular: true,
		cta: "Request a quote",
		features: [
			"Everything in Starter",
			"Committed-volume discounts",
			"Real-time analytics & logs",
			"API, Terraform & edge rules",
			"Signed URLs & token auth",
			"Email & chat support",
		],
	},
	{
		name: "Scale",
		tagline: "High-traffic platforms",
		price: "$0.0X",
		unit: "per GB delivered",
		cta: "Request a quote",
		features: [
			"Everything in Growth",
			"Volume & regional pricing",
			"Multiple origins & origin shield",
			"Uptime SLA",
			"Priority support",
			"Onboarding assistance",
		],
	},
	{
		name: "Enterprise",
		tagline: "Custom scale & compliance",
		price: "Custom",
		unit: "tailored to your traffic",
		cta: "Talk to sales",
		features: [
			"Everything in Scale",
			"Dedicated & bring-your-own PoPs",
			"Custom contracts & billing",
			"SSO, RBAC & audit logs",
			"Dedicated support & TAM",
			"Security & compliance reviews",
		],
	},
];

export const CDN_FAQ: Faq[] = [
	{
		q: "How do I point my traffic to the CDN?",
		a: "Create a pull zone, set your origin, and add a CNAME in your DNS — or delegate to our nameservers. Content is pulled and cached on the first request, then served from the edge.",
	},
	{
		q: "Which origins do you support?",
		a: "Any HTTP origin: your own servers, S3-compatible object storage, or another cloud provider. Configure multiple origins with automatic, health-based failover.",
	},
	{
		q: "How fast is cache purge?",
		a: "Purge single files, wildcards, or entire zones from the dashboard or API. Changes propagate across the network within seconds.",
	},
	{
		q: "Is HTTPS included?",
		a: "Yes. Every zone gets a free managed TLS certificate with automatic renewal, plus HTTP/3 and modern ciphers. You can also bring your own certificate.",
	},
	{
		q: "How does pricing work?",
		a: "You pay for the bandwidth you deliver, with volume discounts as you grow. Higher plans add analytics, token auth, SLAs, and dedicated support. Prices on this page are placeholders — contact us for current rates.",
	},
	{
		q: "Can I get dedicated or private PoPs?",
		a: "On Enterprise, we can provision dedicated capacity or deploy private points of presence in the regions you choose — useful for compliance, data sovereignty, or predictable performance.",
	},
];
