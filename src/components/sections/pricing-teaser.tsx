import { Container } from "#/components/primitives/container";
import { Section } from "#/components/primitives/section";
import { buttonVariants } from "#/components/ui/button";
import { HOME_PRICING, HOME_URLS } from "#/data/home";

export function PricingTeaser() {
	return (
		<Section>
			<Container>
				<div className="glass relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 md:py-20">
					<div className="relative z-10 mx-auto max-w-2xl">
						<h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
							{HOME_PRICING.headline}
						</h2>
						{HOME_PRICING.price !== "—" ? (
							<p className="mono-label mt-4">{HOME_PRICING.price}</p>
						) : null}
						<p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
							{HOME_PRICING.sub}
						</p>
						<div className="mt-9 flex flex-wrap items-center justify-center gap-3">
							<a
								href={HOME_URLS.signup}
								target="_blank"
								rel="noopener noreferrer"
								className={buttonVariants({ size: "lg" })}
							>
								Start free
							</a>
							<a
								href={HOME_URLS.pricing}
								target="_blank"
								rel="noopener noreferrer"
								className={buttonVariants({ variant: "outline", size: "lg" })}
							>
								See pricing
							</a>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
}
