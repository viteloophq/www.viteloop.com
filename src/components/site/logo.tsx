import { cn } from "#/lib/utils";

/** Viteloop wordmark — an orbit/loop glyph + name. Not a link itself. */
export function Logo({
	className,
	showText = true,
}: {
	className?: string;
	showText?: boolean;
}) {
	return (
		<span className={cn("inline-flex items-center gap-2.5", className)}>
			<svg
				width="30"
				height="30"
				viewBox="0 0 32 32"
				fill="none"
				aria-hidden="true"
				className="shrink-0"
			>
				<title>Viteloop</title>
				<defs>
					<linearGradient id="vl-logo" x1="2" y1="2" x2="30" y2="30">
						<stop offset="0%" stopColor="var(--accent)" />
						<stop offset="100%" stopColor="var(--accent-2)" />
					</linearGradient>
				</defs>
				<circle
					cx="16"
					cy="16"
					r="11"
					stroke="url(#vl-logo)"
					strokeWidth="2.4"
					strokeLinecap="round"
					strokeDasharray="48 18"
					transform="rotate(-30 16 16)"
				/>
				<circle cx="16" cy="5" r="3.1" fill="url(#vl-logo)" />
				<circle cx="16" cy="16" r="2.4" fill="var(--accent-2)" />
			</svg>
			{showText && (
				<span className="font-display text-[1.15rem] font-bold tracking-tight text-fg">
					Viteloop
				</span>
			)}
		</span>
	);
}
