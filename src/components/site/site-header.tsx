import { Link } from "@tanstack/react-router";
import {
	ChevronDown,
	type LucideIcon,
	Menu,
	ShoppingBag,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "#/components/primitives/container";
import { Logo } from "#/components/site/logo";
import { ThemeToggle } from "#/components/site/theme-toggle";
import { buttonVariants } from "#/components/ui/button";
import { HEADER_NAV } from "#/data/nav";
import { PRODUCTS, productLinkProps } from "#/data/products";
import { cn } from "#/lib/utils";

/** Shared icon + name + tagline content for a product mega-menu item. */
function ProductMenuContent({
	icon: Icon,
	name,
	tagline,
}: {
	icon: LucideIcon;
	name: string;
	tagline: string;
}) {
	return (
		<>
			<span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-bg-soft text-accent-2">
				<Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
			</span>
			<span className="min-w-0">
				<span className="block text-sm font-semibold text-fg">{name}</span>
				<span className="block text-xs leading-snug text-fg-muted">
					{tagline}
				</span>
			</span>
		</>
	);
}

export function SiteHeader() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (!mobileOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMobileOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [mobileOpen]);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 border-b transition-colors duration-300",
				scrolled
					? "border-line bg-bg/80 backdrop-blur-xl"
					: "border-transparent bg-transparent",
			)}
		>
			<Container className="flex h-16 items-center gap-6">
				<Link to="/" className="rounded-md" aria-label="Viteloop home">
					<Logo />
				</Link>

				<nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
					{HEADER_NAV.map((item) =>
						item.label === "Products" ? (
							<div key={item.label} className="group relative">
								<Link
									to={item.to}
									className="nav-link inline-flex items-center gap-1 py-2 text-sm font-medium"
									activeProps={{ className: "is-active" }}
								>
									Products
									<ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
								</Link>
								<div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
									<div className="glass w-[min(95vw,880px)] rounded-2xl p-3">
										<div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
											{PRODUCTS.map((p) => (
												<Link
													key={p.slug}
													{...productLinkProps(p.slug)}
													className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-fg/5"
												>
													<ProductMenuContent
														icon={p.icon}
														name={p.name}
														tagline={p.tagline}
													/>
												</Link>
											))}
											<Link
												to="/products/commerce"
												className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-fg/5"
											>
												<ProductMenuContent
													icon={ShoppingBag}
													name="ViteLoop Commerce"
													tagline="AI-powered e-commerce platform."
												/>
											</Link>
										</div>
									</div>
								</div>
							</div>
						) : (
							<Link
								key={item.label}
								to={item.to}
								className="nav-link py-2 text-sm font-medium"
								activeProps={{ className: "is-active" }}
							>
								{item.label}
							</Link>
						),
					)}
				</nav>

				<div className="ml-auto flex items-center gap-2">
					<ThemeToggle />
					<Link
						to="/contact"
						className={cn(
							buttonVariants({ size: "sm" }),
							"hidden sm:inline-flex",
						)}
					>
						Request Demo
					</Link>
					<button
						type="button"
						aria-label="Toggle menu"
						aria-expanded={mobileOpen}
						onClick={() => setMobileOpen((v) => !v)}
						className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg lg:hidden"
					>
						{mobileOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
				</div>
			</Container>

			{mobileOpen && (
				<div className="border-t border-line bg-bg/95 backdrop-blur-xl lg:hidden">
					<Container className="flex flex-col gap-1 py-4">
						{HEADER_NAV.map((item) => (
							<Link
								key={item.label}
								to={item.to}
								onClick={() => setMobileOpen(false)}
								className="rounded-lg px-3 py-2.5 text-base font-medium text-fg-muted hover:bg-fg/5 hover:text-fg"
								activeProps={{ className: "text-fg" }}
							>
								{item.label}
							</Link>
						))}
						<div className="mt-2 grid grid-cols-2 gap-1 border-t border-line pt-3">
							{PRODUCTS.map((p) => (
								<Link
									key={p.slug}
									{...productLinkProps(p.slug)}
									onClick={() => setMobileOpen(false)}
									className="rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-fg/5 hover:text-fg"
								>
									{p.name}
								</Link>
							))}
							<Link
								to="/products/commerce"
								onClick={() => setMobileOpen(false)}
								className="rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-fg/5 hover:text-fg"
							>
								ViteLoop Commerce
							</Link>
						</div>
						<Link
							to="/contact"
							onClick={() => setMobileOpen(false)}
							className={cn(buttonVariants(), "mt-3")}
						>
							Request Demo
						</Link>
					</Container>
				</div>
			)}
		</header>
	);
}
