import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

export function Section({
	children,
	className,
	id,
}: {
	children: ReactNode;
	className?: string;
	id?: string;
}) {
	return (
		<section id={id} className={cn("py-16 sm:py-24 md:py-32", className)}>
			{children}
		</section>
	);
}

export function Kicker({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <p className={cn("kicker", className)}>{children}</p>;
}

export function SectionHeading({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<h2
			className={cn(
				"mt-5 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl",
				className,
			)}
		>
			{children}
		</h2>
	);
}

export function Lead({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<p
			className={cn(
				"mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted",
				className,
			)}
		>
			{children}
		</p>
	);
}
