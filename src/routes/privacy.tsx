import { createFileRoute } from "@tanstack/react-router";
import { Container } from "#/components/primitives/container";
import { breadcrumbScript, seo } from "#/lib/seo";

export const Route = createFileRoute("/privacy")({
	component: PrivacyPage,
	head: () => ({
		...seo({
			title: "Privacy Policy — ViteLoop",
			description:
				"How ViteLoop collects, uses, and protects information — and why your self-hosted deployments keep your data under your control.",
			path: "/privacy",
		}),
		scripts: [
			breadcrumbScript([
				{ name: "Home", path: "/" },
				{ name: "Privacy", path: "/privacy" },
			]),
		],
	}),
});

function PrivacyPage() {
	return (
		<Container className="py-20 md:py-24">
			<div className="mx-auto max-w-3xl">
				<p className="kicker">Legal</p>
				<h1 className="mt-5 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
					Privacy Policy
				</h1>
				<p className="mt-4 font-mono text-sm text-fg-faint">
					Last updated: July 1, 2026
				</p>

				<div className="prose mt-10">
					<p>
						ViteLoop builds infrastructure software that our customers deploy
						and operate in their own environments. This policy explains what
						information we collect through our website and services, how we use
						it, and the rights you have.
					</p>

					<h2>Information we collect</h2>
					<p>
						We collect information you provide directly — such as your name,
						work email, and organization when you request a demo or contact us —
						along with limited technical data (IP address, browser type)
						gathered automatically when you visit our website.
					</p>
					<ul>
						<li>Contact and account details you submit to us.</li>
						<li>Usage and device data from our website.</li>
						<li>Communications you send to our team.</li>
					</ul>

					<h2>How we use information</h2>
					<p>
						We use the information to respond to your requests, provide and
						improve our software, communicate product updates, and meet our
						legal obligations. We do not sell your personal information.
					</p>

					<h2>Data ownership</h2>
					<p>
						Because ViteLoop software runs in your environment, the data
						processed by your deployments stays under your control. We do not
						have access to traffic, content, or end-user data flowing through
						self-hosted ViteLoop instances.
					</p>

					<h2>Sub-processors</h2>
					<p>
						We use a limited set of vetted vendors for hosting our website,
						customer communication, and analytics. Each is bound by data
						protection terms consistent with this policy.
					</p>

					<h2>Cookies</h2>
					<p>
						We use strictly necessary storage to run the site — for example,
						remembering your light or dark theme preference. With your consent,
						we also use analytics cookies to understand how the site is used so
						we can improve it. We do not use advertising cookies.
					</p>
					<p>
						You choose your preference the first time you visit, and you can
						change or withdraw it at any time using the “Cookie settings” link
						in the footer.
					</p>

					<h2>Security</h2>
					<p>
						We apply industry-standard administrative, technical, and physical
						safeguards to protect the information we hold, including encryption
						in transit, access controls, and audit logging.
					</p>

					<h2>Your rights</h2>
					<p>
						Depending on your jurisdiction, you may have the right to access,
						correct, delete, or port your personal information, and to object to
						certain processing. Contact us to exercise these rights.
					</p>

					<h2>Contact</h2>
					<p>
						Questions about this policy? Email{" "}
						<a href="mailto:privacy@viteloop.com">privacy@viteloop.com</a>.
					</p>
				</div>
			</div>
		</Container>
	);
}
