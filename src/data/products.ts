import {
	Cpu,
	Database,
	Globe,
	type LucideIcon,
	Network,
	PlayCircle,
	Receipt,
	ShieldCheck,
	Waypoints,
} from "lucide-react";

export type ProductAccent = "accent" | "data" | "accent-3";
export type ProductVisual = "network" | "region" | "arch";

export interface ProductHighlight {
	label: string;
	value: string;
}

export interface Product {
	slug: string;
	short: string;
	name: string;
	tagline: string;
	summary: string;
	icon: LucideIcon;
	accent: ProductAccent;
	visual: ProductVisual;
	features: string[];
	highlights: ProductHighlight[];
}

export const PRODUCTS: Product[] = [
	{
		slug: "cdn",
		short: "CDN",
		name: "Viteloop CDN",
		tagline: "Private CDN software for high-performance content delivery.",
		summary:
			"Run your own globally distributed content delivery network on infrastructure you own. Full cache control, programmable edge logic, and real-time analytics — without per-GB vendor pricing or shared tenancy.",
		icon: Globe,
		accent: "accent",
		visual: "network",
		features: [
			"Tiered, request-collapsed caching",
			"Programmable edge rules & routing",
			"Instant global cache purge",
			"TLS 1.3, HTTP/3 and Brotli",
			"Real-time logs and analytics",
			"Origin shielding & failover",
		],
		highlights: [
			{ label: "Cache hit ratio", value: "99.4%" },
			{ label: "Edge POPs", value: "Unlimited" },
			{ label: "Config propagation", value: "<5s" },
		],
	},
	{
		slug: "stream",
		short: "Stream",
		name: "Viteloop Stream",
		tagline: "Complete VOD and live streaming software.",
		summary:
			"A full video platform you operate yourself — ingest, package, and deliver VOD and low-latency live streams with adaptive bitrate, captions, and per-title analytics across your own delivery network.",
		icon: PlayCircle,
		accent: "data",
		visual: "region",
		features: [
			"VOD and low-latency live (LL-HLS)",
			"Adaptive bitrate packaging",
			"HLS, DASH and CMAF output",
			"Server-side ad insertion",
			"Per-title and per-viewer analytics",
			"Captions, thumbnails & previews",
		],
		highlights: [
			{ label: "Live glass-to-glass", value: "<2s" },
			{ label: "Concurrent streams", value: "Millions" },
			{ label: "Output formats", value: "HLS · DASH" },
		],
	},
	{
		slug: "transcoder",
		short: "Transcoder",
		name: "Viteloop Transcoder",
		tagline: "Distributed video transcoding powered by AI.",
		summary:
			"A distributed transcoding engine that scales across your fleet. AI-driven per-title encoding maximizes quality per bit, while GPU and CPU pipelines keep large catalogs moving in parallel.",
		icon: Cpu,
		accent: "accent-3",
		visual: "arch",
		features: [
			"AI per-title & per-scene encoding",
			"GPU and CPU pipelines",
			"Distributed job orchestration",
			"AV1, HEVC, H.264 & VP9",
			"Priority queues and autoscaling",
			"Quality scoring (VMAF)",
		],
		highlights: [
			{ label: "Bitrate savings", value: "Up to 40%" },
			{ label: "Parallel workers", value: "Elastic" },
			{ label: "Codecs", value: "AV1 · HEVC" },
		],
	},
	{
		slug: "drm",
		short: "DRM",
		name: "Viteloop DRM",
		tagline: "Content protection and license management.",
		summary:
			"Protect premium content with multi-DRM packaging and a license server you control. Issue, rotate, and revoke keys on your own terms with full audit trails and policy-based entitlements.",
		icon: ShieldCheck,
		accent: "accent",
		visual: "arch",
		features: [
			"Widevine, FairPlay & PlayReady",
			"Self-hosted license server",
			"Policy-based entitlements",
			"Key rotation and revocation",
			"Forensic & session watermarking",
			"Full audit logging",
		],
		highlights: [
			{ label: "DRM systems", value: "3" },
			{ label: "License latency", value: "<50ms" },
			{ label: "Key custody", value: "Yours" },
		],
	},
	{
		slug: "billing",
		short: "Billing",
		name: "Viteloop Billing",
		tagline: "Usage-based billing and subscriptions.",
		summary:
			"Meter usage, price plans, and invoice customers for the infrastructure you operate. Built for usage-based, subscription, and hybrid models with multi-currency and reseller hierarchies.",
		icon: Receipt,
		accent: "data",
		visual: "arch",
		features: [
			"Usage metering & rating engine",
			"Subscriptions and one-off charges",
			"Tiered, volume & graduated pricing",
			"Multi-currency invoicing",
			"Reseller & sub-account hierarchies",
			"Payment gateway integrations",
		],
		highlights: [
			{ label: "Events / sec", value: "100k+" },
			{ label: "Pricing models", value: "Any" },
			{ label: "Currencies", value: "Multi" },
		],
	},
	{
		slug: "storage",
		short: "Storage",
		name: "Viteloop Storage",
		tagline: "Object storage software for large-scale deployments.",
		summary:
			"S3-compatible object storage that runs on commodity hardware in your data centers. Erasure-coded durability, multi-region replication, and lifecycle policies for petabyte-scale workloads.",
		icon: Database,
		accent: "accent-3",
		visual: "region",
		features: [
			"S3-compatible API",
			"Erasure coding & self-healing",
			"Multi-region replication",
			"Lifecycle & tiering policies",
			"Bucket-level access controls",
			"Runs on commodity hardware",
		],
		highlights: [
			{ label: "Durability", value: "11 nines" },
			{ label: "Scale", value: "Exabyte" },
			{ label: "API", value: "S3" },
		],
	},
	{
		slug: "edge",
		short: "Edge",
		name: "Viteloop Edge",
		tagline: "Distributed edge platform.",
		summary:
			"Run code and services at the edge of your network. Deploy lightweight compute, routing, and caching close to users with a single control plane spanning every region you operate.",
		icon: Network,
		accent: "accent",
		visual: "network",
		features: [
			"Edge compute runtime",
			"Anycast routing & load balancing",
			"WASM and container workloads",
			"Edge key-value & cache",
			"Unified multi-region control plane",
			"Health-aware traffic steering",
		],
		highlights: [
			{ label: "Cold start", value: "<5ms" },
			{ label: "Regions", value: "Yours" },
			{ label: "Runtimes", value: "WASM" },
		],
	},
	{
		slug: "gateway",
		short: "Gateway",
		name: "Viteloop Gateway",
		tagline: "API gateway and traffic management.",
		summary:
			"A high-throughput API gateway for routing, securing, and observing every request that enters your platform. Auth, rate limiting, and transformations defined as code and deployed across regions.",
		icon: Waypoints,
		accent: "data",
		visual: "arch",
		features: [
			"Declarative routing & versioning",
			"Auth, JWT & mTLS",
			"Rate limiting & quotas",
			"Request/response transformation",
			"Observability & tracing built in",
			"Config-as-code deployments",
		],
		highlights: [
			{ label: "Throughput", value: "1M+ rps" },
			{ label: "p99 overhead", value: "<1ms" },
			{ label: "Config", value: "As code" },
		],
	},
];

export const getProduct = (slug: string): Product | undefined =>
	PRODUCTS.find((p) => p.slug === slug);
