import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "#/lib/utils";

export const badgeVariants = cva(
	"inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium tracking-wide",
	{
		variants: {
			variant: {
				default: "border-line bg-bg-soft text-fg-muted",
				accent:
					"border-transparent bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] text-accent",
				success:
					"border-transparent bg-[color-mix(in_oklab,var(--accent-2)_18%,transparent)] text-accent-2",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<span className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}
