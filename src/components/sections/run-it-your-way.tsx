import { SectionTag } from "#/components/primitives/blueprint";
import { Container } from "#/components/primitives/container";
import { Lead, Section, SectionHeading } from "#/components/primitives/section";
import { buttonVariants } from "#/components/ui/button";
import { DEPLOY_COMMAND, HOME_URLS } from "#/data/home";
import { cn } from "#/lib/utils";

export function RunItYourWay() {
	return (
		<Section>
			<Container>
				<SectionTag index="02" label="Deploy your way" />
				<SectionHeading>Managed, or make it yours.</SectionHeading>
				<Lead>
					Consume ViteLoop as a fully managed edge platform, or run the exact
					same stack on nodes you own — same API, same control plane, your
					infrastructure.
				</Lead>

				<div className="mt-12 grid gap-4 md:grid-cols-2">
					<div className="glass card-hover min-w-0 rounded-2xl border border-line p-7">
						<h3 className="font-display text-xl font-semibold text-fg">
							Use our network
						</h3>
						<p className="mt-2 leading-relaxed text-fg-muted">
							Go live in minutes on ViteLoop's global edge. Fully managed,
							pay-as-you-go, zero servers to run.
						</p>
						<a
							href={HOME_URLS.signup}
							target="_blank"
							rel="noopener noreferrer"
							className={cn("mt-6", buttonVariants({ size: "lg" }))}
						>
							Start free
						</a>
					</div>

					<div className="glass card-hover min-w-0 rounded-2xl border border-line p-7">
						<h3 className="font-display text-xl font-semibold text-fg">
							Deploy your own nodes
						</h3>
						<p className="mt-2 leading-relaxed text-fg-muted">
							Run CDN nodes on your own infrastructure and own every packet.
							Bare metal, your cloud, or on-prem.
						</p>
						<pre className="mt-4 overflow-x-auto rounded-xl border border-line bg-bg p-4 font-mono text-sm text-fg-muted">
							<code>$ {DEPLOY_COMMAND}</code>
						</pre>
						<a
							href={HOME_URLS.deploy}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								"mt-6",
								buttonVariants({ variant: "outline", size: "lg" }),
							)}
						>
							Deploy a node
						</a>
					</div>
				</div>
			</Container>
		</Section>
	);
}
