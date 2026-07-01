import { cn } from "#/lib/utils";

const CX = 300;
const CY = 238;

interface Node {
	x: number;
	y: number;
	/** seconds */
	delay: number;
	r: number;
}

const NODES: Node[] = [
	{ x: 96, y: 116, delay: 0.0, r: 3.4 },
	{ x: 188, y: 64, delay: 0.6, r: 3 },
	{ x: 286, y: 96, delay: 1.2, r: 2.8 },
	{ x: 414, y: 74, delay: 0.3, r: 3.2 },
	{ x: 512, y: 138, delay: 0.9, r: 3.6 },
	{ x: 452, y: 214, delay: 1.5, r: 2.8 },
	{ x: 120, y: 226, delay: 1.1, r: 3 },
	{ x: 72, y: 330, delay: 0.4, r: 3.4 },
	{ x: 182, y: 392, delay: 1.7, r: 3 },
	{ x: 308, y: 416, delay: 0.8, r: 3.2 },
	{ x: 436, y: 376, delay: 1.3, r: 2.8 },
	{ x: 524, y: 312, delay: 0.2, r: 3.6 },
];

/** Quadratic curve from the core to a node, bowed perpendicular to the chord. */
function curveTo(x: number, y: number, i: number): string {
	const mx = (CX + x) / 2;
	const my = (CY + y) / 2;
	const dx = x - CX;
	const dy = y - CY;
	const bow = (i % 2 === 0 ? 1 : -1) * 26;
	const len = Math.hypot(dx, dy) || 1;
	// perpendicular unit vector
	const px = -dy / len;
	const py = dx / len;
	return `M ${CX} ${CY} Q ${mx + px * bow} ${my + py * bow} ${x} ${y}`;
}

/**
 * The signature hero visual: a private control plane (center) streaming traffic
 * out to edge regions you operate. CSS/SMIL-only animation; reduced-motion safe.
 */
export function EdgeNetwork({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 600 480"
			className={cn("h-auto w-full", className)}
			role="img"
			aria-label="A private control plane streaming traffic to edge regions across the globe"
			fill="none"
		>
			<defs>
				<linearGradient id="vl-flow" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="var(--accent)" />
					<stop offset="100%" stopColor="var(--accent-2)" />
				</linearGradient>
				<radialGradient id="vl-core" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.9" />
					<stop offset="55%" stopColor="var(--accent)" stopOpacity="0.5" />
					<stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
				</radialGradient>
				<radialGradient id="vl-fade" cx="50%" cy="42%" r="60%">
					<stop offset="60%" stopColor="white" stopOpacity="1" />
					<stop offset="100%" stopColor="white" stopOpacity="0" />
				</radialGradient>
				<mask id="vl-mask">
					<rect width="600" height="480" fill="url(#vl-fade)" />
				</mask>
			</defs>

			<g mask="url(#vl-mask)">
				{/* faint globe framing */}
				<g stroke="var(--line-strong)" strokeWidth="1" opacity="0.5">
					<circle cx={CX} cy={CY} r="200" />
					<ellipse cx={CX} cy={CY} rx="200" ry="78" />
					<ellipse cx={CX} cy={CY} rx="120" ry="200" />
					<line x1={CX - 200} y1={CY} x2={CX + 200} y2={CY} />
				</g>

				{/* connection paths with flowing dashes */}
				<g>
					{NODES.map((n, i) => (
						<path
							key={`p-${n.x}-${n.y}`}
							d={curveTo(n.x, n.y, i)}
							stroke="var(--line-strong)"
							strokeWidth="1"
							opacity="0.55"
						/>
					))}
					{NODES.map((n, i) => (
						<path
							key={`f-${n.x}-${n.y}`}
							d={curveTo(n.x, n.y, i)}
							stroke="url(#vl-flow)"
							strokeWidth="1.6"
							strokeLinecap="round"
							strokeDasharray="3 22"
							style={{
								animation: "dash-flow 3s linear infinite",
								animationDelay: `${n.delay}s`,
							}}
						/>
					))}
				</g>

				{/* edge region nodes */}
				<g>
					{NODES.map((n) => (
						<g key={`n-${n.x}-${n.y}`}>
							<circle
								cx={n.x}
								cy={n.y}
								r={n.r + 5}
								fill="var(--accent-2)"
								opacity="0.12"
								style={{
									animation: "node-pulse 3.2s ease-in-out infinite",
									animationDelay: `${n.delay}s`,
								}}
							/>
							<circle
								cx={n.x}
								cy={n.y}
								r={n.r}
								fill="var(--accent-2)"
								style={{
									animation: "node-pulse 3.2s ease-in-out infinite",
									animationDelay: `${n.delay}s`,
								}}
							/>
						</g>
					))}
				</g>

				{/* central control-plane core */}
				<g>
					<circle
						cx={CX}
						cy={CY}
						r="78"
						fill="url(#vl-core)"
						style={{ animation: "core-glow 4s ease-in-out infinite" }}
					/>
					<circle
						cx={CX}
						cy={CY}
						r="46"
						stroke="var(--line-strong)"
						strokeWidth="1"
						opacity="0.7"
					/>
					<circle
						cx={CX}
						cy={CY}
						r="30"
						stroke="url(#vl-flow)"
						strokeWidth="1.5"
						strokeDasharray="2 6"
						style={{
							transformOrigin: `${CX}px ${CY}px`,
							animation: "ring-spin 16s linear infinite",
						}}
					/>
					<circle cx={CX} cy={CY} r="9" fill="url(#vl-flow)" />
					<circle cx={CX} cy={CY} r="9" fill="var(--accent-2)" opacity="0.5">
						<animate
							attributeName="r"
							values="9;15;9"
							dur="2.6s"
							repeatCount="indefinite"
						/>
						<animate
							attributeName="opacity"
							values="0.5;0;0.5"
							dur="2.6s"
							repeatCount="indefinite"
						/>
					</circle>
				</g>
			</g>
		</svg>
	);
}
