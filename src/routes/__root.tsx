import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Container } from "#/components/primitives/container";
import { SiteFooter } from "#/components/site/site-footer";
import { SiteHeader } from "#/components/site/site-header";
import { buttonVariants } from "#/components/ui/button";
import { GlowMesh } from "#/components/visuals/glow-mesh";
import { SITE } from "#/data/site";
import { cn } from "#/lib/utils";
import appCss from "../styles.css?url";

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
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:image", content: `${SITE.url}/og.png` },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/icon.png", type: "image/png", sizes: "any" },
			{ rel: "apple-touch-icon", href: "/icon.png" },
			{ rel: "manifest", href: "/manifest.json" },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
		],
		scripts: [
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
				{/* Render-blocking: set theme before paint to avoid FOUC */}
				<script src="/theme-init.js" />
				<HeadContent />
			</head>
			<body className="flex min-h-screen flex-col">
				<GlowMesh className="fixed inset-0 -z-10" />
				<SiteHeader />
				<main className="flex-1">{children}</main>
				<SiteFooter />
				<TanStackDevtools
					config={{ position: "bottom-right" }}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
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
