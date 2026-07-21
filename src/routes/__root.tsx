import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Container } from "#/components/primitives/container";
import { CookieConsent } from "#/components/site/cookie-consent";
import { SiteFooter } from "#/components/site/site-footer";
import { SiteHeader } from "#/components/site/site-header";
import { buttonVariants } from "#/components/ui/button";
import { GlowMesh } from "#/components/visuals/glow-mesh";
import { SITE } from "#/data/site";
import { cn } from "#/lib/utils";
import appCss from "../styles.css?url";

// Runs before first paint (see head().scripts). Must use the same localStorage
// key as src/lib/theme.ts. Kept as a minified string since it's inlined verbatim.
const THEME_INIT = `(function(){try{var t=localStorage.getItem("viteloop-theme");if(t!=="light"&&t!=="dark")t="light";document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add("light")}})();`;

const ORG_JSONLD = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: SITE.name,
	url: SITE.url,
	logo: `${SITE.url}/icon.png`,
	description: SITE.description,
	slogan: SITE.tagline,
};

const WEBSITE_JSONLD = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: SITE.name,
	url: SITE.url,
	description: SITE.description,
};

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "theme-color", content: "#ffffff" },
			{ name: "robots", content: "index, follow, max-image-preview:large" },
			{ title: "Viteloop — Powering the Next Internet" },
			{ name: "description", content: SITE.description },
			{ property: "og:site_name", content: SITE.name },
			{ property: "og:type", content: "website" },
			{
				property: "og:title",
				content: "Viteloop — Powering the Next Internet",
			},
			{ property: "og:description", content: SITE.description },
			{ property: "og:image", content: `${SITE.url}/og.png` },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{
				property: "og:image:alt",
				content:
					"Viteloop — infrastructure software for private CDN, edge, and media platforms",
			},
			{ property: "og:locale", content: "en_US" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:image", content: `${SITE.url}/og.png` },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			// Preload the above-the-fold font so the LCP heading swaps to Geist
			// without an extra round-trip. Font fetches are CORS-mode, so
			// crossOrigin is required even for this same-origin file.
			{
				rel: "preload",
				href: "/fonts/Geist-Variable.woff2",
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
			{ rel: "icon", href: "/icon.png", type: "image/png", sizes: "any" },
			{ rel: "apple-touch-icon", href: "/icon.png" },
			{ rel: "manifest", href: "/manifest.json" },
		],
		scripts: [
			// Inlined theme bootstrap: sets the theme class on <html> before first
			// paint to avoid a flash of the wrong theme, with no extra request.
			// Keep the localStorage key in sync with src/lib/theme.ts.
			{
				children: THEME_INIT,
			},
			{ type: "application/ld+json", children: JSON.stringify(ORG_JSONLD) },
			{ type: "application/ld+json", children: JSON.stringify(WEBSITE_JSONLD) },
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="flex min-h-screen flex-col">
				<GlowMesh className="fixed inset-0 -z-10" />
				<SiteHeader />
				<main className="flex-1">{children}</main>
				<SiteFooter />
				<CookieConsent />
				{import.meta.env.DEV && (
					<TanStackDevtools
						config={{ position: "bottom-right" }}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}

function NotFound() {
	return (
		<Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
			<p className="kicker">Error 404</p>
			<h1 className="mt-5 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
				This route isn’t on the map.
			</h1>
			<p className="mt-4 max-w-md text-fg-muted">
				The page you’re looking for doesn’t exist or has moved. Let’s get you
				back to solid infrastructure.
			</p>
			<Link to="/" className={cn(buttonVariants(), "mt-8")}>
				Back to home
			</Link>
		</Container>
	);
}
