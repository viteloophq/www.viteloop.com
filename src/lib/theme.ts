export type Theme = "dark" | "light";

export const THEME_KEY = "viteloop-theme";

/**
 * Resolve the theme to use on first paint. Dark-first: anything other than an
 * explicit stored "light" preference falls back to dark.
 */
export function resolveInitialTheme(): Theme {
	if (typeof localStorage !== "undefined") {
		const stored = localStorage.getItem(THEME_KEY);
		if (stored === "light" || stored === "dark") return stored;
	}
	return "dark";
}

/** Apply a theme to <html> and persist the choice. */
export function applyTheme(theme: Theme): void {
	const root = document.documentElement;
	root.classList.remove("dark", "light");
	root.classList.add(theme);
	try {
		localStorage.setItem(THEME_KEY, theme);
	} catch {
		/* storage unavailable (private mode / SSR) — ignore */
	}
}

/** Read the theme currently applied to <html>. */
export function currentTheme(): Theme {
	if (typeof document === "undefined") return "dark";
	return document.documentElement.classList.contains("light")
		? "light"
		: "dark";
}
