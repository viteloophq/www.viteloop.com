import {
	BarChart3,
	DollarSign,
	Lock,
	type LucideIcon,
	Smartphone,
	Tv,
	Users,
} from "lucide-react";

/**
 * Content for the dedicated Viteloop OTT marketing page at /products/ott —
 * a turnkey, self-branded streaming platform. Positioned for media companies,
 * telcos, and content owners who want full control of their OTT service.
 */

export interface OttFeature {
	icon: LucideIcon;
	title: string;
	blurb: string;
}

export interface OttAudience {
	title: string;
	blurb: string;
}

export interface OttFaq {
	q: string;
	a: string;
}

export const OTT_SEO = {
	title: "Viteloop OTT — Launch Your Own Branded Streaming Service | Viteloop",
	description:
		"Launch a branded OTT streaming service with multi-DRM, live TV and VOD, apps for every device, and flexible SVOD/TVOD/AVOD monetization — on infrastructure you own.",
} as const;

export const OTT_HERO = {
	kicker: "Viteloop OTT",
	title: "Your streaming service. Netflix-grade. On your terms.",
	lead: "Viteloop OTT is a turnkey platform for launching a premium, fully branded streaming service — multi-DRM protection, live TV and VOD, native apps on every screen, and the monetization models you choose. Built for media companies, telcos, and content owners who'd rather own their platform than rent one.",
	badges: [
		"Multi-DRM",
		"Live & VOD",
		"Web · Mobile · TV",
		"SVOD · TVOD · AVOD",
	],
} as const;

export const OTT_FEATURES: OttFeature[] = [
	{
		icon: Lock,
		title: "DRM protection",
		blurb:
			"Widevine L1/L3 and FairPlay DRM with encrypted streaming via DASH and HLS protocols.",
	},
	{
		icon: Tv,
		title: "Live TV & VOD",
		blurb:
			"Broadcast live channels alongside a full video-on-demand library with EPG support.",
	},
	{
		icon: Smartphone,
		title: "Multi-device apps",
		blurb:
			"Native apps for iOS, Android, Android TV, Fire TV, Roku, and a responsive web player.",
	},
	{
		icon: DollarSign,
		title: "Flexible monetization",
		blurb:
			"SVOD, TVOD, AVOD, and hybrid models with subscription management and ad insertion.",
	},
	{
		icon: Users,
		title: "Multi-profile & parental controls",
		blurb:
			"Household profiles with PIN-protected content ratings (G, 7+, 13+, 16+, 18+).",
	},
	{
		icon: BarChart3,
		title: "Analytics & insights",
		blurb:
			"Real-time viewer analytics, content performance metrics, churn prediction, and revenue dashboards.",
	},
];

export const OTT_AUDIENCE: OttAudience[] = [
	{
		title: "Media companies",
		blurb:
			"Take your catalog direct-to-consumer with a branded service you fully own and control.",
	},
	{
		title: "Telcos & ISPs",
		blurb:
			"Bundle premium video into your subscriptions and keep subscribers on your network.",
	},
	{
		title: "Content owners",
		blurb:
			"Monetize your library across subscriptions, rentals, and ad-supported tiers — on your terms.",
	},
];

export const OTT_FAQ: OttFaq[] = [
	{
		q: "What is Viteloop OTT?",
		a: "Viteloop OTT is a turnkey platform for launching a fully branded streaming service. It bundles DRM, live TV and VOD, multi-device apps, monetization, and analytics so you can go to market without assembling the stack yourself.",
	},
	{
		q: "Which DRM and streaming formats are supported?",
		a: "Content is protected with Widevine (L1/L3) and FairPlay DRM and delivered as encrypted DASH and HLS, so premium titles play securely across browsers, mobile, and TV devices.",
	},
	{
		q: "What devices can viewers use?",
		a: "Native apps ship for iOS, Android, Android TV, Fire TV, and Roku, plus a responsive web player — a consistent, branded experience on every screen.",
	},
	{
		q: "How can I monetize my content?",
		a: "Run subscriptions (SVOD), rentals and purchases (TVOD), ad-supported tiers (AVOD), or any hybrid — with built-in subscription management and server-side ad insertion.",
	},
	{
		q: "Do I keep control of my brand and data?",
		a: "Yes. The service runs under your brand on infrastructure you control, and viewer, content, and revenue data stays yours — no shared tenancy or platform lock-in.",
	},
];
