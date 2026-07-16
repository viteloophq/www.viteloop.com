import { Play } from "lucide-react";
import { cn } from "#/lib/utils";

/**
 * A branded OTT streaming-app mockup for the Viteloop OTT hero — a stylized
 * storefront: featured hero tile with a play button, a rail of poster
 * thumbnails, and the product wordmark. Pure CSS/JSX, no external assets.
 */
export function OttMockup({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"rounded-2xl border border-line bg-bg-soft/60 p-4 shadow-sm sm:p-5",
				className,
			)}
		>
			{/* window chrome */}
			<div className="flex items-center justify-between">
				<span className="font-display text-sm font-semibold text-fg">
					Viteloop OTT
				</span>
				<span className="flex gap-1.5">
					<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
					<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
					<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
				</span>
			</div>

			{/* featured hero tile */}
			<div className="relative mt-4 grid aspect-[16/9] place-items-center overflow-hidden rounded-xl border border-line bg-gradient-to-br from-accent/25 via-bg-elev to-bg-soft">
				<span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--accent)_70%,transparent)]">
					<Play className="ml-0.5 h-6 w-6 fill-current" strokeWidth={0} />
				</span>
				<span className="absolute bottom-3 left-4 h-2 w-24 rounded-full bg-fg/20" />
				<span className="absolute bottom-3 left-[7.5rem] h-2 w-12 rounded-full bg-fg/10" />
			</div>

			{/* poster rail */}
			<div className="mt-4 grid grid-cols-4 gap-2.5">
				{[0, 1, 2, 3].map((i) => (
					<div
						key={i}
						className="aspect-[3/4] rounded-lg border border-line bg-gradient-to-b from-bg-elev to-bg-soft"
					/>
				))}
			</div>

			<p className="mt-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-faint">
				OTT Streaming Platform
			</p>
		</div>
	);
}
