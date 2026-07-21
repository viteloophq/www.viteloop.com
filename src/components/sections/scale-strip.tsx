import { Container } from "#/components/primitives/container";
import { HOME_STATS } from "#/data/home";
import { cn } from "#/lib/utils";

export function ScaleStrip() {
	return (
		<section className="border-y border-line bg-bg-soft/30 py-10">
			<Container>
				<p className="mono-label text-center">Built to scale</p>
				<div className="mt-7 grid grid-cols-2 gap-y-6 text-center sm:grid-cols-5 sm:gap-y-0">
					{HOME_STATS.map((stat, i) => (
						<div
							key={stat.label}
							className={cn("px-4", i > 0 && "border-line sm:border-l")}
						>
							<div className="font-display text-2xl font-semibold text-fg sm:text-3xl">
								{stat.value}
							</div>
							<div className="mono-label mt-1.5">{stat.label}</div>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}
