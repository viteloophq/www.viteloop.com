import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { applyTheme, currentTheme, type Theme } from "#/lib/theme";

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>("dark");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		setTheme(currentTheme());
	}, []);

	function toggle() {
		const next: Theme = theme === "dark" ? "light" : "dark";
		applyTheme(next);
		setTheme(next);
	}

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label="Toggle color theme"
			className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
		>
			{/* Render a stable icon until mounted to avoid hydration mismatch */}
			{!mounted || theme === "dark" ? (
				<Sun className="h-[18px] w-[18px]" strokeWidth={1.8} />
			) : (
				<Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />
			)}
		</button>
	);
}
