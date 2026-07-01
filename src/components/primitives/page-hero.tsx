import type { ReactNode } from "react";
import { Container } from "#/components/primitives/container";
import { Kicker } from "#/components/primitives/section";
import { GridBackdrop } from "#/components/visuals/grid-backdrop";
import { cn } from "#/lib/utils";

interface PageHeroProps {
	kicker: string;
	title: ReactNode;
	children?: ReactNode;
	align?: "left" | "center";
}

export function PageHero({
	kicker,
	title,
	children,
	align = "left",
}: PageHeroProps) {
	return (
		<section className="relative overflow-hidden border-b border-line">
			<GridBackdrop />
			<Container
				className={cn(
					"relative py-20 md:py-28",
					align === "center" && "text-center",
				)}
			>
				<div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
					<Kicker>{kicker}</Kicker>
					<h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-fg sm:text-5xl md:text-[3.4rem]">
						{title}
					</h1>
					{children && (
						<div
							className={cn(
								"mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted",
								align === "center" && "mx-auto",
							)}
						>
							{children}
						</div>
					)}
				</div>
			</Container>
		</section>
	);
}
