import {
	Activity,
	BarChart3,
	Bell,
	Gauge,
	LayoutTemplate,
	type LucideIcon,
	Package,
	Palette,
	PhoneCall,
	Search,
	Share2,
	ShieldAlert,
	ShieldCheck,
	TrendingUp,
	Truck,
	Wand2,
} from "lucide-react";

/**
 * Content for the dedicated ViteLoop Commerce marketing page at
 * /products/commerce. Commerce is a standalone product offering — a full
 * e-commerce platform — kept separate from the six core infrastructure
 * products, so it is not counted in the PRODUCTS catalog.
 */

export interface CommerceFeature {
	icon: LucideIcon;
	title: string;
	blurb: string;
}

export interface CommerceFaq {
	q: string;
	a: string;
}

export const COMMERCE_SEO = {
	title: "ViteLoop Commerce — AI-Powered E-commerce Platform | ViteLoop",
	description:
		"Build an online store with AI, sell across social channels, and stop fake orders — on enterprise infrastructure with a global CDN, auto scaling, and built-in security.",
} as const;

export const COMMERCE_HERO = {
	kicker: "ViteLoop Commerce",
	title: "Launch, sell, and grow on an AI-powered commerce platform.",
	lead: "ViteLoop Commerce helps businesses create beautiful online stores, sell across social channels, and manage orders from a single platform — all on enterprise-grade infrastructure built to stay fast during high-traffic campaigns.",
	badges: [
		"AI store builder",
		"Global CDN included",
		"Auto scaling",
		"Fraud prevention",
	],
} as const;

/** Quick-scan value props (the "Why ViteLoop Commerce" checklist). */
export const COMMERCE_WHY: string[] = [
	"AI-powered store creation",
	"Drag-and-drop website builder",
	"Professional mobile-first themes",
	"Social commerce integrations",
	"AI order confirmation",
	"Fake order prevention",
	"Server-side marketing analytics",
	"Shipping & payment integrations",
	"Enterprise performance",
	"Built-in security",
	"Auto scaling",
	"Global CDN included",
];

export const COMMERCE_FEATURES: CommerceFeature[] = [
	{
		icon: Wand2,
		title: "AI store builder",
		blurb:
			"Create a professional online store in minutes with AI-generated layouts, branding, and content.",
	},
	{
		icon: LayoutTemplate,
		title: "Drag-and-drop builder",
		blurb:
			"Design and customize your storefront without writing a single line of code.",
	},
	{
		icon: Palette,
		title: "Ready-made themes",
		blurb:
			"Launch quickly with beautiful, responsive themes optimized for every device.",
	},
	{
		icon: Package,
		title: "Product & order management",
		blurb:
			"Manage products, inventory, orders, customers, and returns from one dashboard.",
	},
	{
		icon: Share2,
		title: "Social commerce",
		blurb:
			"Sell on Facebook, Instagram, TikTok, and WhatsApp while managing everything in one place.",
	},
	{
		icon: Truck,
		title: "Shipping & payments",
		blurb:
			"Connect local and global shipping providers and payment gateways for a seamless checkout.",
	},
	{
		icon: PhoneCall,
		title: "AI order confirmation",
		blurb:
			"Automatically verify Cash on Delivery orders with AI voice calls, WhatsApp, or SMS to reduce fake orders.",
	},
	{
		icon: ShieldAlert,
		title: "Fraud prevention",
		blurb:
			"Identify suspicious orders with intelligent risk scoring before they are shipped.",
	},
	{
		icon: BarChart3,
		title: "Marketing analytics",
		blurb:
			"Track conversions with server-side integrations for Google, Meta, and TikTok for more reliable insights.",
	},
	{
		icon: Search,
		title: "SEO optimization",
		blurb:
			"Improve search visibility with built-in SEO tools, structured data, and optimized performance.",
	},
	{
		icon: Gauge,
		title: "Enterprise performance",
		blurb:
			"Every store includes a global CDN, intelligent caching, image optimization, and HTTP/3 for fast loads worldwide.",
	},
	{
		icon: TrendingUp,
		title: "Auto scaling",
		blurb:
			"Handle sudden spikes from Google, TikTok, influencer campaigns, and flash sales without managing servers.",
	},
	{
		icon: Activity,
		title: "High availability",
		blurb:
			"Redundant infrastructure and automatic failover help keep your store online through maintenance and outages.",
	},
	{
		icon: ShieldCheck,
		title: "Enterprise security",
		blurb:
			"Protect your business with SSL, WAF, DDoS protection, bot mitigation, and automated backups.",
	},
	{
		icon: Bell,
		title: "Smart notifications",
		blurb:
			"Keep customers and staff informed with real-time Email, SMS, WhatsApp, and push notifications.",
	},
];

export const COMMERCE_DIFFERENCE = {
	kicker: "The ViteLoop difference",
	title: "Enterprise infrastructure, built in.",
	lead: "Unlike e-commerce platforms that rely on basic hosting, ViteLoop Commerce runs on enterprise-grade infrastructure. Every store gets high performance, automatic scaling, integrated security, and reliable marketing analytics — so you can focus on growing your business instead of managing servers.",
	punchlines: [
		"Run bigger campaigns.",
		"Handle more traffic.",
		"Never miss a sale.",
	],
} as const;

export const COMMERCE_FAQ: CommerceFaq[] = [
	{
		q: "What is ViteLoop Commerce?",
		a: "ViteLoop Commerce is an AI-powered e-commerce platform for creating online stores, selling across social channels, and managing orders — running on enterprise-grade infrastructure with a global CDN, auto scaling, and built-in security.",
	},
	{
		q: "Do I need coding or design skills?",
		a: "No. The AI store builder generates layouts, branding, and content for you, and the drag-and-drop editor plus ready-made mobile-first themes let you customize everything without writing code.",
	},
	{
		q: "Can I sell on social media?",
		a: "Yes. Built-in social commerce lets you sell on Facebook, Instagram, TikTok, and WhatsApp while managing products, orders, and customers from a single dashboard.",
	},
	{
		q: "How does it reduce fake orders?",
		a: "AI order confirmation automatically verifies Cash on Delivery orders through AI voice calls, WhatsApp, or SMS, and intelligent risk scoring flags suspicious orders before they ship.",
	},
	{
		q: "Will my store stay fast during a flash sale?",
		a: "Every store runs on a global CDN with intelligent caching, image optimization, and HTTP/3, and auto scaling absorbs sudden traffic spikes from campaigns and influencers without manual server management.",
	},
	{
		q: "What security is included?",
		a: "Stores include SSL, a Web Application Firewall (WAF), DDoS protection, bot mitigation, and automated backups, backed by redundant infrastructure with automatic failover.",
	},
];
