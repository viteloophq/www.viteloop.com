import { Link } from "@tanstack/react-router";
import { Container } from "#/components/primitives/container";
import { Logo } from "#/components/site/logo";
import { FOOTER_COLUMNS } from "#/data/nav";
import { SITE } from "#/data/site";
import { CONSENT_OPEN_EVENT } from "#/lib/consent";

export function SiteFooter() {
	return (
		<footer className="relative mt-24 border-t border-line bg-bg-soft/40">
			<Container className="py-16">
				<div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-12">
					<div className="col-span-2 max-w-xs lg:col-span-1">
						<Link to="/" aria-label="Viteloop home" className="inline-flex">
							<Logo />
						</Link>
						<p className="mt-4 text-sm leading-relaxed text-fg-muted">
							{SITE.tagline} Software for building the next generation of
							internet infrastructure.
						</p>
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
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
						<p className="text-sm text-fg-faint">
							© 2026 {SITE.name}. All rights reserved.
						</p>
						<button
							type="button"
							onClick={() =>
								window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
							}
							className="text-left text-sm text-fg-faint transition-colors hover:text-fg"
						>
							Cookie settings
						</button>
					</div>
					<p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
						{SITE.thesis}
					</p>
				</div>
			</Container>
		</footer>
	);
}
