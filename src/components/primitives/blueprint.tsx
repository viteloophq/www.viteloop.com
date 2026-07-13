import { cn } from "#/lib/utils";

const CORNERS = [
	{ top: -5, left: -5 },
	{ top: -5, right: -5 },
	{ bottom: -5, left: -5 },
	{ bottom: -5, right: -5 },
] as const;

/** Four technical plus-marks pinned to the corners of a relative parent. */
export function CornerTicks({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={cn("pointer-events-none absolute inset-0", className)}
		>
			{CORNERS.map((c, i) => (
				<span key={i} className="tick-cross" style={c} />
			))}
		</div>
	);
}

/** Monospace section index + label, e.g. `01 // OWNERSHIP`. */
export function SectionTag({
	index,
	label,
	className,
}: {
	index: string;
	label: string;
	className?: string;
}) {
	return (
		<div className={cn("flex items-center gap-3", className)}>
			<span className="index-num">{index}</span>
			<span className="h-px w-8 bg-line-strong" />
			<span className="mono-label">{label}</span>
		</div>
	);
}
