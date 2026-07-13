import { Link } from "@tanstack/react-router";
import { ArrowRight, Terminal } from "lucide-react";
import { CornerTicks, SectionTag } from "#/components/primitives/blueprint";
import { Container } from "#/components/primitives/container";
import { Lead, Section, SectionHeading } from "#/components/primitives/section";
import { buttonVariants } from "#/components/ui/button";

export function DeveloperTeaser() {
	return (
		<Section className="border-t border-line">
			<Container className="grid items-center gap-12 lg:grid-cols-2">
				<div>
					<SectionTag index="05" label="Developers" />
					<SectionHeading>
						API-first.{" "}
						<span className="accent-gradient">Built for engineers.</span>
					</SectionHeading>
					<Lead>
						Every capability is an API. Configure edges, pipelines, and policies
						as code, automate with the CLI and Terraform provider, and ship on
						day one.
					</Lead>
					<div className="mt-8 flex flex-wrap gap-3">
						<Link to="/developers" className={buttonVariants()}>
							Explore the APIs <ArrowRight className="h-4 w-4" />
						</Link>
						<Link to="/docs" className={buttonVariants({ variant: "outline" })}>
							Read the docs
						</Link>
					</div>
				</div>

				<div className="relative">
					<CornerTicks />
					<div className="glass overflow-hidden rounded-2xl">
						<div className="flex items-center gap-2 border-b border-line px-4 py-3">
							<Terminal className="h-4 w-4 text-fg-faint" />
							<span className="font-mono text-xs text-fg-faint">
								deploy an edge rule
							</span>
						<span className="ml-auto flex gap-1.5">
							<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
							<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
							<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
						</span>
					</div>
					<pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
						<code>
							<span className="text-fg-faint">$ </span>
							<span className="text-accent-2">curl</span>
							<span className="text-fg"> -X POST </span>
							<span className="text-accent">
								https://cdn.your-org.net/v1/edge-rules
							</span>
							{"\n"}
							<span className="text-fg"> -H </span>
							<span className="text-accent-2">
								"Authorization: Bearer $VL_TOKEN"
							</span>
							{"\n"}
							<span className="text-fg"> -d </span>
							<span className="text-accent-2">{"'{"}</span>
							{"\n"}
							<span className="text-accent-2"> "match"</span>
							<span className="text-fg">: </span>
							<span className="text-accent-2">"/assets/*"</span>
							<span className="text-fg">,</span>
							{"\n"}
							<span className="text-accent-2"> "cache_ttl"</span>
							<span className="text-fg">: </span>
							<span className="text-accent-2">"30d"</span>
							<span className="text-fg">,</span>
							{"\n"}
							<span className="text-accent-2"> "compress"</span>
							<span className="text-fg">: </span>
							<span className="text-accent-3">true</span>
							{"\n"}
							<span className="text-accent-2">{"    }'"}</span>
							{"\n\n"}
							<span className="text-fg-faint">{"{ "}</span>
							<span className="text-accent-2">"id"</span>
							<span className="text-fg-faint">: </span>
							<span className="text-fg">"rule_8fk2"</span>
							<span className="text-fg-faint">, </span>
							<span className="text-accent-2">"status"</span>
							<span className="text-fg-faint">: </span>
							<span className="text-fg">"active"</span>
							<span className="text-fg-faint">{" }"}</span>
						</code>
					</pre>
					</div>
				</div>
			</Container>
		</Section>
	);
}
