import { createFileRoute } from "@tanstack/react-router";
import { seo } from "#/lib/seo";
import { CheckCircle2, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Container } from "#/components/primitives/container";
import { Kicker } from "#/components/primitives/section";
import { Button } from "#/components/ui/button";
import { CUSTOMERS } from "#/data/customers";
import { PRODUCTS } from "#/data/products";
import { SITE } from "#/data/site";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
	head: () => ({
		meta: [
			{ title: "Request a Demo — Viteloop" },
			{
				name: "description",
				content:
					"Request a technical demo of Viteloop and talk to our engineering team about deploying infrastructure software in your environment.",
			},
		],
	}),
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
	name: string;
	email: string;
	company: string;
	customerType: string;
	message: string;
}

const EMPTY: FormState = {
	name: "",
	email: "",
	company: "",
	customerType: "",
	message: "",
};

const inputClass =
	"w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-accent";

function ContactPage() {
	const [form, setForm] = useState<FormState>(EMPTY);
	const [interests, setInterests] = useState<string[]>([]);
	const [errors, setErrors] = useState<
		Partial<Record<keyof FormState, string>>
	>({});
	const [submitted, setSubmitted] = useState(false);

	function set<K extends keyof FormState>(key: K, value: string) {
		setForm((f) => ({ ...f, [key]: value }));
	}

	function toggleInterest(slug: string) {
		setInterests((list) =>
			list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug],
		);
	}

	function validate(): boolean {
		const next: Partial<Record<keyof FormState, string>> = {};
		if (!form.name.trim()) next.name = "Please enter your name.";
		if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid work email.";
		if (!form.company.trim()) next.company = "Please enter your organization.";
		setErrors(next);
		return Object.keys(next).length === 0;
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (validate()) setSubmitted(true);
	}

	return (
		<Container className="grid gap-12 py-20 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
			<div>
				<Kicker>Request a demo</Kicker>
				<h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-fg sm:text-5xl">
					Talk to our engineering team.
				</h1>
				<p className="mt-5 max-w-md text-lg leading-relaxed text-fg-muted">
					Tell us what you're building. We'll show you how Viteloop deploys into
					your environment and answer the technical questions that matter.
				</p>
				<ul className="mt-8 flex flex-col gap-3 text-sm text-fg-muted">
					{[
						"A working demo in a stack like yours",
						"Architecture and deployment guidance",
						"Straight answers from engineers, not sales",
					].map((point) => (
						<li key={point} className="flex items-center gap-2.5">
							<CheckCircle2 className="h-4 w-4 shrink-0 text-accent-2" />
							{point}
						</li>
					))}
				</ul>
				<a
					href={`mailto:${SITE.email}`}
					className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-accent-2"
				>
					<Mail className="h-4 w-4" /> {SITE.email}
				</a>
			</div>

			<div className="glass rounded-3xl p-6 sm:p-8">
				{submitted ? (
					<div className="flex min-h-[20rem] flex-col items-center justify-center text-center">
						<span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-bg-soft text-accent-2">
							<CheckCircle2 className="h-7 w-7" />
						</span>
						<h2 className="mt-5 font-display text-2xl font-semibold text-fg">
							Thanks, {form.name.split(" ")[0] || "there"}.
						</h2>
						<p className="mt-2 max-w-sm text-fg-muted">
							Our team will reach out within one business day to schedule your
							demo.
						</p>
					</div>
				) : (
					<form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
						<Field label="Name" error={errors.name} htmlFor="name">
							<input
								id="name"
								className={inputClass}
								value={form.name}
								onChange={(e) => set("name", e.target.value)}
								placeholder="Ada Lovelace"
							/>
						</Field>
						<Field label="Work email" error={errors.email} htmlFor="email">
							<input
								id="email"
								type="email"
								className={inputClass}
								value={form.email}
								onChange={(e) => set("email", e.target.value)}
								placeholder="ada@yourcompany.com"
							/>
						</Field>
						<Field
							label="Organization"
							error={errors.company}
							htmlFor="company"
						>
							<input
								id="company"
								className={inputClass}
								value={form.company}
								onChange={(e) => set("company", e.target.value)}
								placeholder="Your company"
							/>
						</Field>
						<Field label="Organization type" htmlFor="customerType">
							<select
								id="customerType"
								className={cn(inputClass, "appearance-none")}
								value={form.customerType}
								onChange={(e) => set("customerType", e.target.value)}
							>
								<option value="">Select one…</option>
								{CUSTOMERS.map((c) => (
									<option key={c.name} value={c.name}>
										{c.name}
									</option>
								))}
							</select>
						</Field>
						<div>
							<span className="mb-2 block text-sm font-medium text-fg">
								Products of interest
							</span>
							<div className="flex flex-wrap gap-2">
								{PRODUCTS.map((p) => {
									const active = interests.includes(p.slug);
									return (
										<button
											key={p.slug}
											type="button"
											onClick={() => toggleInterest(p.slug)}
											aria-pressed={active}
											className={cn(
												"rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
												active
													? "border-transparent accent-bg text-white"
													: "border-line text-fg-muted hover:border-line-strong hover:text-fg",
											)}
										>
											{p.short}
										</button>
									);
								})}
							</div>
						</div>
						<Field label="What are you building?" htmlFor="message">
							<textarea
								id="message"
								rows={4}
								className={cn(inputClass, "resize-none")}
								value={form.message}
								onChange={(e) => set("message", e.target.value)}
								placeholder="A few lines about your use case…"
							/>
						</Field>
						<Button type="submit" size="lg" className="mt-1 w-full">
							Request Demo
						</Button>
					</form>
				)}
			</div>
		</Container>
	);
}

function Field({
	label,
	htmlFor,
	error,
	children,
}: {
	label: string;
	htmlFor: string;
	error?: string;
	children: React.ReactNode;
}) {
	return (
		<label htmlFor={htmlFor} className="block">
			<span className="mb-2 block text-sm font-medium text-fg">{label}</span>
			{children}
			{error && (
				<span className="mt-1.5 block text-xs text-red-400">{error}</span>
			)}
		</label>
	);
}
