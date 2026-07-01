import { createFileRoute } from "@tanstack/react-router";
import { Container } from "#/components/primitives/container";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/terms")({
	component: TermsPage,
	head: () =>
		seo({
			title: "Terms of Service — Viteloop",
			description:
				"The terms governing your access to and use of Viteloop's website, software, and related services.",
			path: "/terms",
		}),
});

function TermsPage() {
	return (
		<Container className="py-20 md:py-24">
			<div className="mx-auto max-w-3xl">
				<p className="kicker">Legal</p>
				<h1 className="mt-5 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
					Terms of Service
				</h1>
				<p className="mt-4 font-mono text-sm text-fg-faint">
					Last updated: July 1, 2026
				</p>

				<div className="prose mt-10">
					<p>
						These Terms of Service govern your access to and use of Viteloop's
						website, software, and related services. By using them, you agree to
						these terms.
					</p>

					<h2>License</h2>
					<p>
						Subject to a valid agreement, Viteloop grants you a non-exclusive,
						non-transferable license to deploy and use Viteloop software within
						your organization. Specific entitlements are defined in your order
						or subscription.
					</p>

					<h2>Acceptable use</h2>
					<p>
						You agree not to use the software to violate any law, infringe the
						rights of others, or attempt to disrupt the integrity or performance
						of systems beyond your authorized scope.
					</p>

					<h2>Software & deployment</h2>
					<p>
						Viteloop provides infrastructure software, not infrastructure
						services. You are responsible for the environments in which you
						deploy the software, including provisioning, security configuration,
						and operational management.
					</p>

					<h2>Warranties</h2>
					<p>
						The software is provided under the warranties set out in your
						agreement. Except as expressly stated, the software is provided "as
						is" without further warranties of any kind.
					</p>

					<h2>Limitation of liability</h2>
					<p>
						To the maximum extent permitted by law, Viteloop will not be liable
						for indirect, incidental, or consequential damages arising from your
						use of the software.
					</p>

					<h2>Term & termination</h2>
					<p>
						These terms apply for the duration of your use of the software.
						Either party may terminate in accordance with the governing
						agreement; certain provisions survive termination.
					</p>

					<h2>Governing law</h2>
					<p>
						These terms are governed by the laws specified in your agreement,
						without regard to conflict-of-law principles.
					</p>

					<h2>Contact</h2>
					<p>
						Questions about these terms? Email{" "}
						<a href="mailto:legal@viteloop.com">legal@viteloop.com</a>.
					</p>
				</div>
			</div>
		</Container>
	);
}
