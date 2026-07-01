import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "#/lib/utils";

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary:
					"accent-bg text-white shadow-[0_10px_30px_-8px_var(--glow-a)] hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-6px_var(--glow-a)]",
				outline:
					"glass text-fg hover:-translate-y-0.5 hover:border-line-strong",
				ghost: "text-fg-muted hover:bg-fg/5 hover:text-fg",
				subtle:
					"border border-line bg-bg-elev text-fg hover:border-line-strong",
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
