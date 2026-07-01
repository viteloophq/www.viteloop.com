import { Container } from "#/components/primitives/container";
import { CUSTOMERS } from "#/data/customers";

export function TrustStrip() {
	return (
		<section className="border-y border-line bg-bg-soft/30 py-10">
			<Container>
				<p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
					Built for the organizations that run the internet
				</p>
				<div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
					{CUSTOMERS.map((c) => {
						const Icon = c.icon;
						return (
							<span
								key={c.name}
								className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-soft/50 px-4 py-1.5 text-sm text-fg-muted"
							>
								<Icon className="h-4 w-4 text-fg-faint" strokeWidth={1.7} />
								{c.name}
							</span>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
