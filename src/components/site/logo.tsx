import { cn } from "#/lib/utils";

/**
 * ViteLoop brand lockup (glyph + wordmark). The source art is dark-on-transparent,
 * so in dark mode we flip it to solid white for legibility on the navy header.
 * Not a link itself.
 */
export function Logo({ className }: { className?: string }) {
	return (
		<img
			src="/viteloop-logo-trim.png"
			alt="ViteLoop"
			width={984}
			height={202}
			className={cn(
				"h-7 w-auto select-none dark:brightness-0 dark:invert",
				className,
			)}
			draggable={false}
		/>
	);
}
