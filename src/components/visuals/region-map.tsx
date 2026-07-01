import { cn } from "#/lib/utils";

interface Region {
	x: number;
	y: number;
	label: string;
	delay: number;
}

const REGIONS: Region[] = [
	{ x: 120, y: 120, label: "us-east", delay: 0 },
	{ x: 250, y: 95, label: "eu-west", delay: 0.7 },
	{ x: 470, y: 130, label: "ap-south", delay: 1.1 },
	{ x: 175, y: 215, label: "sa-east", delay: 0.4 },
	{ x: 420, y: 230, label: "ap-east", delay: 1.4 },
];

// A scattered dot field suggesting landmasses.
const DOTS: Array<[number, number]> = [];
for (let gx = 40; gx < 560; gx += 26) {
	for (let gy = 60; gy < 270; gy += 26) {
		// deterministic pseudo-mask to create irregular clusters
		const keep = (gx * 13 + gy * 7) % 11;
		if (keep > 4) DOTS.push([gx, gy]);
	}
}

const LINKS: Array<[number, number]> = [
	[0, 1],
	[1, 2],
	[0, 3],
	[3, 4],
	[1, 4],
];

/** Abstract multi-region map used for "deploy anywhere / scale globally". */
export function RegionMap({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 600 320"
			className={cn("h-auto w-full", className)}
			role="img"
			aria-label="Connected regions across a global map"
			fill="none"
		>
			<defs>
				<linearGradient id="rm-flow" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor="var(--accent)" />
					<stop offset="100%" stopColor="var(--accent-2)" />
				</linearGradient>
			</defs>

			{DOTS.map(([x, y]) => (
				<circle
					key={`d-${x}-${y}`}
					cx={x}
					cy={y}
					r="1.4"
					fill="var(--fg-faint)"
					opacity="0.35"
				/>
			))}

			{LINKS.map(([a, b]) => {
				const ra = REGIONS[a];
				const rb = REGIONS[b];
				const mx = (ra.x + rb.x) / 2;
				const my = Math.min(ra.y, rb.y) - 34;
				const d = `M ${ra.x} ${ra.y} Q ${mx} ${my} ${rb.x} ${rb.y}`;
				return (
					<g key={`l-${a}-${b}`}>
						<path
							d={d}
							stroke="var(--line-strong)"
							strokeWidth="1"
							opacity="0.5"
						/>
						<path
							d={d}
							stroke="url(#rm-flow)"
							strokeWidth="1.6"
							strokeLinecap="round"
							strokeDasharray="3 20"
							style={{
								animation: "dash-flow 3s linear infinite",
								animationDelay: `${a * 0.4}s`,
							}}
						/>
					</g>
				);
			})}

			{REGIONS.map((r) => (
				<g key={r.label}>
					<circle
						cx={r.x}
						cy={r.y}
						r="11"
						fill="var(--accent-2)"
						opacity="0.14"
						style={{
							animation: "node-pulse 3s ease-in-out infinite",
							animationDelay: `${r.delay}s`,
						}}
					/>
					<circle cx={r.x} cy={r.y} r="4.2" fill="var(--accent-2)" />
					<text
						x={r.x + 12}
						y={r.y + 4}
						className="font-mono"
						fontSize="11"
						fill="var(--fg-muted)"
					>
						{r.label}
					</text>
				</g>
			))}
		</svg>
	);
}
