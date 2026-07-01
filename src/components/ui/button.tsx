import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "#/lib/utils";

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary:
					"bg-accent text-white shadow-[0_8px_22px_-8px_color-mix(in_oklab,var(--accent)_60%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_color-mix(in_oklab,var(--accent)_66%,transparent)]",
				outline:
					"border border-line-strong bg-bg-elev text-fg hover:-translate-y-0.5 hover:border-accent hover:text-accent",
				ghost: "text-fg-muted hover:bg-fg/5 hover:text-fg",
				subtle:
					"border border-line bg-bg-soft text-fg hover:border-line-strong",
			},
			size: {
				sm: "h-9 px-4 text-sm",
				default: "h-11 px-5 text-sm",
				lg: "h-12 px-6 text-base",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}
