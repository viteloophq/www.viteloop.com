import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		tanstackStart({
			// Fully static site: prerender every route to HTML at build time.
			// crawlLinks follows nav/footer/product links to reach /products/$slug.
			prerender: {
				enabled: true,
				crawlLinks: true,
			},
		}),
		nitro({ rollupConfig: { external: [/^@sentry\//] } }),
		tailwindcss(),
		viteReact(),
	],
});

export default config;
