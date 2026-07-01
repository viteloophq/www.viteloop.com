import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { Container } from "#/components/primitives/container";
import { Logo } from "#/components/site/logo";
import { FOOTER_COLUMNS } from "#/data/nav";
import { SITE } from "#/data/site";

export function SiteFooter() {
	return (
		<footer className="relative mt-24 border-t border-line bg-bg-soft/40">
			<Container className="py-16">
				<div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
					<div className="max-w-xs">
						<Link to="/" aria-label="Viteloop home" className="inline-flex">
							<Logo />
						</Link>
						<p className="mt-4 text-sm leading-relaxed text-fg-muted">
							{SITE.tagline} Software for building the next generation of
							internet infrastructure.
						</p>
						<a
							href={SITE.github}
							target="_blank"
							rel="noreferrer"
							className="mt-5 inline-flex h-10 w-10 place-items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
							aria-label="Viteloop on GitHub"
						>
							<Github className="h-[18px] w-[18px]" strokeWidth={1.8} />
						</a>
					</div>

					{FOOTER_COLUMNS.map((col) => (
						<div key={col.title}>
							<p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
								{col.title}
							</p>
							<ul className="mt-4 flex flex-col gap-3">
								{col.links.map((link) => (
									<li key={link.label}>
										{link.to ? (
											<Link
												to={link.to}
												className="text-sm text-fg-muted transition-colors hover:text-fg"
											>
												{link.label}
											</Link>
										) : (
											<a
												href={link.href}
												target="_blank"
												rel="noreferrer"
												className="text-sm text-fg-muted transition-colors hover:text-fg"
											>
												{link.label}
											</a>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
					<p className="text-sm text-fg-faint">
						© 2026 {SITE.name}. All rights reserved.
					</p>
					<p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
						{SITE.thesis}
					</p>
				</div>
			</Container>
		</footer>
	);
}
