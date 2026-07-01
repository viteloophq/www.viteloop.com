import { cn } from "#/lib/utils";

/** Decorative blueprint grid that fades out toward the edges. */
export function GridBackdrop({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={cn("pointer-events-none absolute inset-0", className)}
			style={{
				backgroundImage:
					"linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
				backgroundSize: "44px 44px",
				maskImage: "radial-gradient(circle at 50% 40%, black, transparent 76%)",
				WebkitMaskImage:
					"radial-gradient(circle at 50% 40%, black, transparent 76%)",
			}}
		/>
	);
}
