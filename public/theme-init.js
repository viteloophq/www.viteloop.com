// Render-blocking: sets the theme class on <html> before first paint to
// prevent a flash of the wrong theme. Must use the same key as src/lib/theme.ts.
(function () {
	try {
		var t = localStorage.getItem("viteloop-theme");
		if (t !== "light" && t !== "dark") t = "dark";
		document.documentElement.classList.add(t);
	} catch (e) {
		document.documentElement.classList.add("dark");
	}
})();
