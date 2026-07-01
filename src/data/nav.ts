import { SITE } from "#/data/site";

export interface NavLink {
	label: string;
	/** Internal route path. */
	to?: string;
	/** External URL. */
	href?: string;
}

export interface NavGroup {
	title: string;
	links: NavLink[];
}

/** Primary header navigation. "Products" renders a mega-menu from PRODUCTS. */
export const HEADER_NAV: NavLink[] = [
	{ label: "Products", to: "/products" },
	{ label: "Solutions", to: "/solutions" },
	{ label: "Developers", to: "/developers" },
	{ label: "Docs", to: "/docs" },
	{ label: "Blog", to: "/blog" },
	{ label: "Company", to: "/company" },
];

/** Footer columns — covers every link required by the brief. */
export const FOOTER_COLUMNS: NavGroup[] = [
	{
		title: "Product",
		links: [
			{ label: "Products", to: "/products" },
			{ label: "Solutions", to: "/solutions" },
			{ label: "Status", to: "/status" },
		],
	},
	{
		title: "Developers",
		links: [
			{ label: "Documentation", to: "/docs" },
			{ label: "Developers", to: "/developers" },
			{ label: "GitHub", href: SITE.github },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "Company", to: "/company" },
			{ label: "Careers", to: "/careers" },
			{ label: "Contact", to: "/contact" },
			{ label: "Blog", to: "/blog" },
		],
	},
	{
		title: "Legal",
		links: [
			{ label: "Privacy", to: "/privacy" },
			{ label: "Terms", to: "/terms" },
		],
	},
];
