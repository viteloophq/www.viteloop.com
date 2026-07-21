import {
	Cpu,
	Network,
	ShieldAlert,
	ShieldCheck,
	Video,
	Waypoints,
} from "lucide-react";
import {
	getProduct,
	type Product,
	type ProductHighlight,
} from "#/data/products";

export interface CapabilityFAQ {
	q: string;
	a: string;
}

/**
 * A platform capability. Shares the product detail shape (so it renders through
 * the `/products/$slug` template) but is kept separate from `PRODUCTS` — these
 * are features of the platform, not the six core products. Adds FAQ content and
 * dedicated SEO copy for keyword-focused landing pages.
 */
export interface Capability extends Product {
	kind: "capability";
	/** 150–160 char meta description. */
	seoDescription: string;
	/** Full <title>, keyword-focused. */
	seoTitle: string;
	faqs: CapabilityFAQ[];
	/** Slugs of related products/capabilities for internal linking. */
	related: string[];
}

export const CAPABILITIES: Capability[] = [
	{
		kind: "capability",
		slug: "anycast-dns",
		short: "Anycast DNS",
		name: "Anycast DNS",
		tagline: "Authoritative DNS on a global anycast network.",
		summary:
			"Answer every DNS query from the network location closest to the user. ViteLoop runs authoritative DNS across an anycast network with DNSSEC, health-checked failover, and latency- and geo-based routing — so resolution is fast, resilient, and under your control.",
		icon: Network,
		accent: "accent",
		visual: "region",
		seoTitle: "Anycast DNS — Fast, Resilient Authoritative DNS | ViteLoop",
		seoDescription:
			"Authoritative Anycast DNS with DNSSEC, health-checked failover, and latency-based routing. Resolve queries from the nearest edge on infrastructure you own.",
		features: [
			"BGP anycast resolution from the nearest POP",
			"DNSSEC signing and validation",
			"Health-checked automatic failover",
			"Latency-, geo-, and weighted routing",
			"Wildcard, ALIAS, and CAA record support",
			"Full API, Terraform, and zone-file import",
		],
		highlights: [
			{ label: "Query latency", value: "<15ms" },
			{ label: "Anycast POPs", value: "Global" },
			{ label: "Uptime SLA", value: "100%" },
		],
		faqs: [
			{
				q: "What is Anycast DNS?",
				a: "Anycast DNS advertises the same IP address from many locations at once. Each DNS query is routed by BGP to the topologically nearest server, cutting resolution latency and absorbing traffic spikes across the network instead of a single site.",
			},
			{
				q: "How is it different from traditional (unicast) DNS?",
				a: "Unicast DNS answers from one location, so distant users and outages both hurt. Anycast serves every user from the closest healthy node and reroutes automatically if a node fails, improving both speed and resilience.",
			},
			{
				q: "Does ViteLoop Anycast DNS support DNSSEC?",
				a: "Yes. Zones can be signed with DNSSEC to protect against cache poisoning and spoofing, with key management handled through the API and dashboard.",
			},
			{
				q: "Can I automate DNS with an API or Terraform?",
				a: "Every record and zone is manageable through the REST API, CLI, and Terraform provider, and existing zones can be imported from standard zone files.",
			},
		],
		related: ["global-load-balancer", "ddos-protection", "cdn"],
	},
	{
		kind: "capability",
		slug: "global-load-balancer",
		short: "Load Balancer",
		name: "Global Load Balancer",
		tagline: "Health-aware traffic steering across regions and origins.",
		summary:
			"Distribute traffic across origins, regions, and clouds with a global load balancer that checks origin health and reroutes in seconds. Balance by latency, geography, or weight, and keep users on the fastest healthy path — without a single point of failure.",
		icon: Waypoints,
		accent: "data",
		visual: "arch",
		seoTitle: "Global Load Balancer — Multi-Region Traffic Steering | ViteLoop",
		seoDescription:
			"A global load balancer with active health checks and automatic failover. Steer traffic by latency, geo, or weight across origins, regions, and clouds.",
		features: [
			"Active health checks with fast failover",
			"Latency, geo, and weighted steering",
			"Active-active and active-passive origins",
			"Session affinity (sticky routing)",
			"Layer 4 and layer 7 balancing",
			"Multi-cloud and hybrid origin pools",
		],
		highlights: [
			{ label: "Failover", value: "<10s" },
			{ label: "Origin pools", value: "Unlimited" },
			{ label: "Steering", value: "Geo · Latency" },
		],
		faqs: [
			{
				q: "What does a global load balancer do?",
				a: "It spreads incoming requests across multiple origins or regions based on health and policy, so no single server is overwhelmed and users are served from the best-performing endpoint available.",
			},
			{
				q: "How fast is failover when an origin goes down?",
				a: "Active health checks continuously probe each origin. When one fails, traffic is rerouted to healthy origins within seconds, typically before end users notice an error.",
			},
			{
				q: "Can I balance across different clouds?",
				a: "Yes. Origin pools can span multiple clouds, regions, and on-premise data centers, making it straightforward to run active-active or hybrid architectures.",
			},
			{
				q: "Does it support sticky sessions?",
				a: "Session affinity keeps a given client pinned to the same origin for the life of a session when your application requires it.",
			},
		],
		related: ["anycast-dns", "cdn", "ddos-protection"],
	},
	{
		kind: "capability",
		slug: "waf",
		short: "WAF",
		name: "Web Application Firewall (WAF)",
		tagline: "Block application-layer attacks at the edge.",
		summary:
			"Filter malicious requests before they reach your origin. ViteLoop's WAF runs managed OWASP rulesets and your own custom rules at the edge, with rate limiting, bot mitigation, and virtual patching — inspecting traffic close to users with negligible latency.",
		icon: ShieldCheck,
		accent: "accent-3",
		visual: "arch",
		seoTitle: "Web Application Firewall (WAF) — Edge App Security | ViteLoop",
		seoDescription:
			"An edge WAF with managed OWASP rules, custom rules, rate limiting, and bot mitigation. Block injection, XSS, and application-layer attacks before they hit origin.",
		features: [
			"Managed OWASP Core Rule Set",
			"Custom rules and virtual patching",
			"Rate limiting and IP reputation",
			"Bot detection and mitigation",
			"Geo and IP allow / deny lists",
			"Real-time security logs and events",
		],
		highlights: [
			{ label: "Added latency", value: "<1ms" },
			{ label: "Managed rules", value: "OWASP" },
			{ label: "Custom rules", value: "Unlimited" },
		],
		faqs: [
			{
				q: "What attacks does a WAF protect against?",
				a: "A web application firewall inspects HTTP traffic and blocks common application-layer attacks such as SQL injection, cross-site scripting (XSS), remote file inclusion, and known exploit patterns before they reach your application.",
			},
			{
				q: "Does the WAF add latency?",
				a: "Inspection runs at the edge, close to your users, so the added latency is sub-millisecond for typical rulesets and is dwarfed by the round-trip time it saves versus origin inspection.",
			},
			{
				q: "Can I write my own rules?",
				a: "Alongside the managed OWASP ruleset you can define custom rules to match your application, apply virtual patches for zero-day exposure, and tune sensitivity per route.",
			},
			{
				q: "Does it handle bots?",
				a: "Bot detection distinguishes legitimate crawlers from abusive automation, letting you challenge or block scrapers, credential-stuffing, and inventory-hoarding bots.",
			},
		],
		related: ["ddos-protection", "cdn", "global-load-balancer"],
	},
	{
		kind: "capability",
		slug: "ddos-protection",
		short: "DDoS Protection",
		name: "DDoS Protection",
		tagline: "Absorb volumetric and application-layer attacks.",
		summary:
			"Keep services online through attacks of any size. ViteLoop's anycast network disperses and absorbs volumetric floods across layers 3, 4, and 7, with always-on detection and automatic mitigation — no need to reroute traffic or wait for a scrubbing center.",
		icon: ShieldAlert,
		accent: "accent",
		visual: "network",
		seoTitle: "DDoS Protection — Always-On L3/L4/L7 Mitigation | ViteLoop",
		seoDescription:
			"Always-on DDoS protection that absorbs volumetric and application-layer attacks across an anycast network. Automatic detection and mitigation with no traffic reroute.",
		features: [
			"Layer 3/4 volumetric mitigation",
			"Layer 7 application-attack defense",
			"Always-on, automatic detection",
			"Anycast dispersion of attack traffic",
			"SYN flood and protocol-abuse protection",
			"Adaptive rate limiting and challenges",
		],
		highlights: [
			{ label: "Network capacity", value: "Multi-Tbps" },
			{ label: "Mitigation", value: "Automatic" },
			{ label: "Coverage", value: "L3 · L4 · L7" },
		],
		faqs: [
			{
				q: "What is a DDoS attack?",
				a: "A distributed denial-of-service attack floods a target with traffic from many sources to exhaust bandwidth, connections, or application resources and take a service offline.",
			},
			{
				q: "How does anycast help mitigate DDoS?",
				a: "Because the same address is advertised from many POPs, attack traffic is spread across the entire network rather than concentrated on one site, so each location only absorbs a fraction of the flood.",
			},
			{
				q: "Is mitigation always on?",
				a: "Yes. Detection runs continuously and mitigation engages automatically, so there is no need to manually reroute traffic to a scrubbing center when an attack begins.",
			},
			{
				q: "Does it protect application-layer (L7) attacks too?",
				a: "In addition to volumetric L3/L4 floods, the system defends against layer-7 attacks such as HTTP floods using rate limiting, challenges, and behavioral analysis.",
			},
		],
		related: ["waf", "anycast-dns", "cdn"],
	},
	{
		kind: "capability",
		slug: "edge-compute",
		short: "Edge Compute",
		name: "Edge Compute",
		tagline: "Run code at the edge, milliseconds from your users.",
		summary:
			"Execute logic at the network edge instead of a distant origin. Deploy lightweight functions that rewrite requests and responses, run authentication, personalize content, and make routing decisions close to users — with near-zero cold starts.",
		icon: Cpu,
		accent: "data",
		visual: "network",
		seoTitle: "Edge Compute — Serverless Functions at the Edge | ViteLoop",
		seoDescription:
			"Run serverless JavaScript and WebAssembly functions at the edge to transform requests, authenticate, and personalize content milliseconds from your users.",
		features: [
			"JavaScript and WebAssembly runtimes",
			"Request and response transformation",
			"Edge authentication and A/B routing",
			"Edge key-value storage",
			"Near-zero cold starts",
			"Deploy via API, CLI, or Git",
		],
		highlights: [
			{ label: "Cold start", value: "<5ms" },
			{ label: "Runtimes", value: "JS · WASM" },
			{ label: "Runs at", value: "Every POP" },
		],
		faqs: [
			{
				q: "What is edge compute?",
				a: "Edge compute runs your code on servers distributed around the world instead of in one central region, so requests are processed at the POP nearest each user for the lowest possible latency.",
			},
			{
				q: "What can I run at the edge?",
				a: "Common uses include rewriting requests and responses, authentication and authorization, A/B testing and routing, header manipulation, personalization, and lightweight API logic.",
			},
			{
				q: "What languages are supported?",
				a: "Functions run in a JavaScript runtime or as WebAssembly modules, so you can bring code compiled from languages such as Rust, Go, or C alongside JavaScript and TypeScript.",
			},
			{
				q: "How bad are cold starts?",
				a: "The runtime is designed for near-instant startup, with cold starts measured in single-digit milliseconds so latency stays predictable even for infrequently invoked functions.",
			},
		],
		related: ["cdn", "waf", "anycast-dns"],
	},
	{
		kind: "capability",
		slug: "video-cdn",
		short: "Video CDN",
		name: "Video CDN",
		tagline: "Delivery tuned for VOD and live video at scale.",
		summary:
			"A content delivery network purpose-built for video. Cache adaptive-bitrate segments at the edge, deliver HLS, DASH, and low-latency live, and shield origins from request storms — for smooth playback and fewer rebuffers to millions of concurrent viewers.",
		icon: Video,
		accent: "accent-3",
		visual: "region",
		seoTitle:
			"Video CDN — Low-Rebuffer VOD & Live Streaming Delivery | ViteLoop",
		seoDescription:
			"A video CDN built for VOD and live streaming: edge-cached ABR segments, HLS/DASH/LL-HLS delivery, origin shielding, and token auth for millions of viewers.",
		features: [
			"Edge caching of ABR video segments",
			"HLS, DASH, and CMAF delivery",
			"Low-latency live (LL-HLS)",
			"Mid-tier origin shielding",
			"Signed URLs and token authentication",
			"Per-title and per-viewer analytics",
		],
		highlights: [
			{ label: "Segment cache hit", value: "99%+" },
			{ label: "Live latency", value: "<2s" },
			{ label: "Concurrency", value: "Millions" },
		],
		faqs: [
			{
				q: "How is a video CDN different from a regular CDN?",
				a: "A video CDN is tuned for the traffic patterns of streaming: large numbers of adaptive-bitrate segments, high concurrency during live events, and origin-shielding to prevent request storms — delivering smoother playback with fewer rebuffers than a general-purpose CDN.",
			},
			{
				q: "Which streaming formats are supported?",
				a: "The video CDN delivers HLS, DASH, and CMAF, including low-latency live (LL-HLS), so you can serve VOD catalogs and live channels to any device.",
			},
			{
				q: "Can I protect video from unauthorized access?",
				a: "Yes. Signed URLs and token authentication restrict access to authorized viewers, and it integrates with ViteLoop DRM for encrypted, license-controlled playback.",
			},
			{
				q: "How does it handle large live audiences?",
				a: "Segments are cached at the edge and origins are shielded by a mid-tier, so a spike of concurrent viewers is absorbed by the network rather than hammering your origin.",
			},
		],
		related: ["cdn", "stream", "edge-compute"],
	},
];

export const getCapability = (slug: string): Capability | undefined =>
	CAPABILITIES.find((c) => c.slug === slug);

/** Resolve a `/products/$slug` route to a product OR a capability. */
export const getCatalogEntry = (
	slug: string,
): Product | Capability | undefined => getProduct(slug) ?? getCapability(slug);

/** Type guard: is a catalog entry a platform capability? */
export const isCapability = (
	entry: Product | Capability,
): entry is Capability => "faqs" in entry;

/** Highlight type re-export for convenience. */
export type { ProductHighlight };
