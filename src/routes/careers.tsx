import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowUpRight,
	GraduationCap,
	HeartPulse,
	Home,
	Laptop,
	type LucideIcon,
	Plane,
	TrendingUp,
} from "lucide-react";
import { Container } from "#/components/primitives/container";
import { PageHero } from "#/components/primitives/page-hero";
import { Section, SectionHeading } from "#/components/primitives/section";
import { Badge } from "#/components/ui/badge";
import { buttonVariants } from "#/components/ui/button";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/careers")({
	component: CareersPage,
	head: () =>
		seo({
			title: "Careers — Viteloop",
			description:
				"Join Viteloop and build the software behind the next generation of internet infrastructure. Remote-first, engineering-led.",
			path: "/careers",
		}),
});

const PERKS: { icon: LucideIcon; title: string }[] = [
	{ icon: Home, title: "Remote-first, globally" },
	{ icon: TrendingUp, title: "Meaningful equity" },
	{ icon: HeartPulse, title: "Full health coverage" },
	{ icon: GraduationCap, title: "Learning budget" },
	{ icon: Laptop, title: "Top-tier hardware" },
	{ icon: Plane, title: "Generous time off" },
];

interface Role {
	title: string;
	team: string;
	location: string;
	type: string;
}

const ROLES: Role[] = [
	{
		title: "Senior Systems Engineer, CDN",
		team: "Edge",
		location: "Remote",
		type: "Full-time",
	},
	{
		title: "Rust Engineer, Data Plane",
		team: "Core",
		location: "Remote",
		type: "Full-time",
	},
	{
		title: "Video Infrastructure Engineer",
		team: "Stream",
		location: "Remote",
		type: "Full-time",
	},
	{
		title: "Developer Experience Engineer",
		team: "Platform",
		location: "Remote",
		type: "Full-time",
	},
	{
		title: "Solutions Architect",
		team: "Field Engineering",
		location: "Remote",
		type: "Full-time",
	},
];

function CareersPage() {
	return (
		<>
			<PageHero
				kicker="Careers"
				title="Build the software behind the internet."
			>
				We're a small, senior team of infrastructure engineers building software
				that the world's networks run on. If you care about ownership,
				performance, and getting the details right — you'll fit in.
			</PageHero>

			<Section>
				<Container>
					<SectionHeading>How we work.</SectionHeading>
					<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{PERKS.map((perk) => {
							const Icon = perk.icon;
							return (
								<div
									key={perk.title}
									className="glass flex items-center gap-4 rounded-2xl p-5"
								>
									<span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-bg-soft text-accent-2">
										<Icon className="h-5 w-5" strokeWidth={1.7} />
									</span>
									<span className="font-medium text-fg">{perk.title}</span>
								</div>
							);
						})}
					</div>
				</Container>
			</Section>

			<Section className="border-t border-line">
				<Container>
					<SectionHeading>Open roles.</SectionHeading>
					<ul className="mt-10 flex flex-col gap-3">
						{ROLES.map((role) => (
							<li key={role.title}>
								<a
									href="#"
									className="glass card-hover group flex flex-col gap-3 rounded-2xl p-6 sm:flex-row sm:items-center"
								>
									<div>
										<h3 className="font-display text-lg font-semibold text-fg">
											{role.title}
										</h3>
										<p className="mt-1 font-mono text-xs uppercase tracking-wider text-fg-faint">
											{role.team}
										</p>
									</div>
									<div className="flex items-center gap-3 sm:ml-auto">
										<Badge>{role.location}</Badge>
										<Badge>{role.type}</Badge>
										<ArrowUpRight className="h-5 w-5 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
									</div>
								</a>
							</li>
						))}
					</ul>
					<div className="mt-8">
						<a href="#" className={buttonVariants({ variant: "outline" })}>
							See all roles
						</a>
					</div>
				</Container>
			</Section>
		</>
	);
}
