import {
	Cpu,
	Globe,
	GraduationCap,
	type LucideIcon,
	PlayCircle,
	ShieldCheck,
	Tv,
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
		slug: "ott",
		short: "OTT",
		name: "Viteloop OTT",
		tagline: "Turnkey OTT streaming platform.",
		summary:
			"Launch a branded OTT service end to end — VOD and live channels, multi-DRM, monetization, and apps for web, mobile, and TV — powered by Viteloop's streaming, transcoding, CDN, and billing stack.",
		icon: Tv,
		accent: "data",
		visual: "region",
		features: [
			"VOD library & live channels",
			"Web, mobile & smart-TV apps",
			"Multi-DRM & forensic watermarking",
			"Subscriptions, pay-per-view & ads",
			"Recommendations & viewer analytics",
			"Global low-latency delivery",
		],
		highlights: [
			{ label: "Apps", value: "Web · Mobile · TV" },
			{ label: "Monetize", value: "SVOD · TVOD · AVOD" },
			{ label: "Live", value: "<2s" },
		],
	},
	{
		slug: "lms",
		short: "LMS",
		name: "Viteloop LMS",
		tagline: "Video-first learning platform.",
		summary:
			"Operate a secure learning platform for training, education, or customer academies — DRM-protected video, courses and learning paths, assessments, and completion tracking, on infrastructure you own.",
		icon: GraduationCap,
		accent: "accent-3",
		visual: "arch",
		features: [
			"Courses, paths & modules",
			"DRM-protected secure video",
			"Quizzes & assessments",
			"Progress & completion tracking",
			"Certificates, SCORM & xAPI",
			"SSO & cohort management",
		],
		highlights: [
			{ label: "Video", value: "DRM-secure" },
			{ label: "Standards", value: "SCORM · xAPI" },
			{ label: "Access", value: "SSO" },
		],
	},
];

export const getProduct = (slug: string): Product | undefined =>
	PRODUCTS.find((p) => p.slug === slug);

/**
 * Link target for a product. CDN has a dedicated static route
 * (`/products/cdn`); every other product uses the shared `/products/$slug`
 * template. Linking CDN to its canonical route avoids the router's
 * "matched a different route" ambiguity warning.
 */
export const productLinkProps = (slug: string) =>
	slug === "cdn"
		? ({ to: "/products/cdn" } as const)
		: ({ to: "/products/$slug", params: { slug } } as const);
