import {
	BarChart3,
	House,
	type LucideIcon,
	Package,
	ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { cn } from "#/lib/utils";

/**
 * An interactive e-commerce admin mockup for the Viteloop Commerce hero.
 * Clicking a sidebar tab swaps the main panel between an overview dashboard,
 * orders, products, and analytics. Self-contained (no data/router) and
 * theme-aware via design tokens.
 */

type Tab = "dashboard" | "orders" | "products" | "analytics";

const NAV: { id: Tab; label: string; icon: LucideIcon }[] = [
	{ id: "dashboard", label: "Dashboard", icon: House },
	{ id: "orders", label: "Orders", icon: ShoppingCart },
	{ id: "products", label: "Products", icon: Package },
	{ id: "analytics", label: "Analytics", icon: BarChart3 },
];

const BARS = [40, 62, 48, 78, 56, 90, 72];

export function CommerceMockup({ className }: { className?: string }) {
	const [tab, setTab] = useState<Tab>("dashboard");

	return (
		<div
			className={cn(
				"overflow-hidden rounded-2xl border border-line bg-bg-elev shadow-sm",
				className,
			)}
		>
			<div className="flex h-[400px]">
				{/* sidebar */}
				<aside className="flex w-14 shrink-0 flex-col gap-1 border-r border-line bg-bg-soft/60 p-2 sm:w-40 sm:p-3">
					<div className="mb-3 flex items-center gap-2 px-1 sm:px-2">
						<span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent text-xs font-bold text-white">
							V
						</span>
						<span className="hidden text-sm font-semibold text-fg sm:inline">
							Commerce
						</span>
					</div>
					{NAV.map((n) => {
						const Icon = n.icon;
						const active = tab === n.id;
						return (
							<button
								key={n.id}
								type="button"
								onClick={() => setTab(n.id)}
								aria-pressed={active}
								className={cn(
									"flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
									active
										? "bg-accent/12 font-medium text-accent"
										: "text-fg-muted hover:bg-fg/5 hover:text-fg",
								)}
							>
								<Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
								<span className="hidden sm:inline">{n.label}</span>
							</button>
						);
					})}
				</aside>

				{/* main */}
				<div className="flex min-w-0 flex-1 flex-col p-4">
					<div className="flex items-center justify-between">
						<span className="text-sm font-semibold capitalize text-fg">
							{tab}
						</span>
						<span className="rounded-md border border-line px-2 py-1 font-mono text-[0.7rem] text-fg-muted">
							Lifetime ▾
						</span>
					</div>
					<div className="mt-4 min-h-0 flex-1">
						{tab === "dashboard" && <DashboardView />}
						{tab === "orders" && <OrdersView />}
						{tab === "products" && <ProductsView />}
						{tab === "analytics" && <AnalyticsView />}
					</div>
				</div>
			</div>
		</div>
	);
}

function StatTile({
	label,
	value,
	delta,
}: {
	label: string;
	value: string;
	delta: string;
}) {
	return (
		<div className="rounded-xl border border-line bg-bg-soft/40 p-3">
			<p className="text-xs text-fg-muted">{label}</p>
			<p className="mt-1 font-mono text-xl font-semibold text-fg">{value}</p>
			<p className="mt-0.5 text-[0.7rem] font-medium text-emerald-500">
				{delta}
			</p>
		</div>
	);
}

function Bars({ compact = false }: { compact?: boolean }) {
	return (
		<div className={cn("flex items-end gap-1.5", compact ? "h-16" : "h-24")}>
			{BARS.map((h) => (
				<div
					key={h}
					className="flex-1 rounded-t bg-accent/70"
					style={{ height: `${h}%` }}
				/>
			))}
		</div>
	);
}

function DashboardView() {
	return (
		<div className="space-y-3">
			<div className="grid grid-cols-2 gap-3">
				<StatTile label="Total sales" value="$12.4k" delta="+18%" />
				<StatTile label="Conversion" value="3.8%" delta="+0.5%" />
			</div>
			<div className="rounded-xl border border-line p-3">
				<p className="mb-2 text-xs font-medium text-fg">Sales this week</p>
				<Bars />
			</div>
		</div>
	);
}

const ORDERS = [
	{ id: "#1043", name: "A. Rahman", status: "Paid", amount: "$128" },
	{ id: "#1042", name: "S. Chen", status: "Pending", amount: "$64" },
	{ id: "#1041", name: "M. Diallo", status: "Paid", amount: "$212" },
	{ id: "#1040", name: "L. Costa", status: "Shipped", amount: "$96" },
];

function StatusBadge({ status }: { status: string }) {
	const tone =
		status === "Paid"
			? "bg-emerald-500/12 text-emerald-500"
			: status === "Pending"
				? "bg-amber-500/12 text-amber-500"
				: "bg-accent/12 text-accent";
	return (
		<span
			className={cn(
				"rounded-full px-2 py-0.5 text-[0.65rem] font-medium",
				tone,
			)}
		>
			{status}
		</span>
	);
}

function OrdersView() {
	return (
		<div className="overflow-hidden rounded-xl border border-line">
			{ORDERS.map((o, i) => (
				<div
					key={o.id}
					className={cn(
						"flex items-center justify-between gap-2 px-3 py-2.5 text-sm",
						i > 0 && "border-t border-line",
					)}
				>
					<span className="font-mono text-xs text-fg-muted">{o.id}</span>
					<span className="min-w-0 flex-1 truncate text-fg">{o.name}</span>
					<StatusBadge status={o.status} />
					<span className="font-mono text-xs font-medium text-fg">
						{o.amount}
					</span>
				</div>
			))}
		</div>
	);
}

const PRODUCTS = [
	{ name: "Aurora Tee", price: "$29" },
	{ name: "Nimbus Hoodie", price: "$59" },
	{ name: "Vertex Cap", price: "$19" },
	{ name: "Loop Bottle", price: "$24" },
];

function ProductsView() {
	return (
		<div className="grid grid-cols-2 gap-3">
			{PRODUCTS.map((p) => (
				<div key={p.name} className="rounded-xl border border-line p-2.5">
					<div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-accent/20 to-bg-soft" />
					<p className="mt-2 truncate text-xs font-medium text-fg">{p.name}</p>
					<p className="font-mono text-xs text-fg-muted">{p.price}</p>
				</div>
			))}
		</div>
	);
}

function AnalyticsView() {
	return (
		<div className="space-y-3">
			<div className="grid grid-cols-3 gap-2">
				<StatTile label="Visitors" value="8.2k" delta="+12%" />
				<StatTile label="AOV" value="$74" delta="+6%" />
				<StatTile label="Repeat" value="41%" delta="+3%" />
			</div>
			<div className="rounded-xl border border-line p-3">
				<p className="mb-2 text-xs font-medium text-fg">Traffic by day</p>
				<Bars compact />
			</div>
		</div>
	);
}
