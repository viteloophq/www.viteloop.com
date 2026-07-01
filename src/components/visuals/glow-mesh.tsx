import { cn } from "#/lib/utils";

/** Ambient blurred radial glows for atmosphere/depth. */
export function GlowMesh({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={cn("pointer-events-none overflow-hidden", className)}
		>
			<div
				className="absolute -left-[12%] -top-[10%] h-[42rem] w-[42rem] rounded-full blur-[120px]"
				style={{
					background: "radial-gradient(circle, var(--glow-a), transparent 62%)",
				}}
			/>
			<div
				className="absolute -right-[14%] top-[6%] h-[38rem] w-[38rem] rounded-full blur-[120px]"
				style={{
					background: "radial-gradient(circle, var(--glow-b), transparent 62%)",
				}}
			/>
			<div
				className="absolute -bottom-[18%] left-[28%] h-[34rem] w-[34rem] rounded-full blur-[130px]"
				style={{
					background: "radial-gradient(circle, var(--glow-c), transparent 62%)",
				}}
			/>
		</div>
	);
}
