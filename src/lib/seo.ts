import { SITE } from "#/data/site";

interface SeoInput {
	/** Page title (full, unfabricated). */
	title: string;
	description: string;
	/** Route path, e.g. "/products". Used for canonical + og:url. */
	path: string;
	/** Absolute URL or root-relative path to the social image. */
	image?: string;
	/** og:type — "website" (default) or "article". */
	type?: "website" | "article";
}

/**
 * Builds a consistent set of SEO head tags (title, description, canonical,
 * Open Graph, Twitter) for a route's `head()`. Site-wide defaults
 * (og:site_name, twitter:card, favicon, robots, JSON-LD) live in __root.tsx.
 */
export function seo({
	title,
	description,
	path,
	image = "/og.png",
	type = "website",
}: SeoInput) {
	const url = `${SITE.url}${path}`;
	const img = image.startsWith("http") ? image : `${SITE.url}${image}`;

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:type", content: type },
			{ property: "og:url", content: url },
			{ property: "og:image", content: img },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: img },
		],
		links: [{ rel: "canonical", href: url }],
	};
}

/**
 * Builds a JSON-LD BreadcrumbList `<script>` for a route's `head()`. Pass the
 * trail from the site root, e.g. `[{ name: "Home", path: "/" }, …]`.
 */
export function breadcrumbScript(trail: { name: string; path: string }[]) {
	return {
		type: "application/ld+json",
		children: JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: trail.map((crumb, i) => ({
				"@type": "ListItem",
				position: i + 1,
				name: crumb.name,
				item: `${SITE.url}${crumb.path}`,
			})),
		}),
	};
}
