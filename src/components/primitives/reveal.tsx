import type { ElementType, ReactNode } from "react";
import { useReveal } from "#/hooks/use-reveal";
import { cn } from "#/lib/utils";

interface RevealProps {
	children: ReactNode;
	className?: string;
	/** Stagger delay in ms. */
	delay?: number;
	as?: ElementType;
}

export function Reveal({
	children,
	className,
	delay = 0,
	as: Tag = "div",
}: RevealProps) {
	const ref = useReveal<HTMLDivElement>();
	return (
		<Tag
			ref={ref}
			className={cn("reveal", className)}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
		>
			{children}
		</Tag>
	);
}
