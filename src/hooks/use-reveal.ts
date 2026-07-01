import { useEffect, useRef } from "react";

/**
 * Adds the `is-in` class to an element when it scrolls into view, triggering
 * the CSS reveal transition. Respects prefers-reduced-motion (reveals instantly).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
	const ref = useRef<T>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || typeof window === "undefined") return;

		const reduce = window.matchMedia?.(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduce || typeof IntersectionObserver === "undefined") {
			el.classList.add("is-in");
			return;
		}

		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						el.classList.add("is-in");
						io.unobserve(el);
					}
				}
			},
			{ threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
		);

		io.observe(el);
		return () => io.disconnect();
	}, []);

	return ref;
}
