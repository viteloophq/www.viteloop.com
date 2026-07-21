import { Check, Circle, CircleCheck, Lock, Play } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

/**
 * Static, on-brand product mockups shown in the `/products/$slug` hero for the
 * self-hosted media products (Stream, DRM, Transcoder, LMS). Each is a small
 * app-like panel that hints at the product's UI. Pure CSS/JSX, theme-aware.
 */

function Frame({
	title,
	children,
	className,
}: {
	title: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"rounded-2xl border border-line bg-bg-soft/60 p-4 shadow-sm sm:p-5",
				className,
			)}
		>
			<div className="mb-4 flex items-center justify-between">
				<span className="font-display text-sm font-semibold text-fg">
					{title}
				</span>
				<span className="flex gap-1.5">
					<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
					<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
					<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
				</span>
			</div>
			{children}
		</div>
	);
}

export function StreamMockup({ className }: { className?: string }) {
	return (
		<Frame title="ViteLoop Stream" className={className}>
			<div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl border border-line bg-gradient-to-br from-accent/25 via-bg-elev to-bg-soft">
				<span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-500/90 px-2 py-0.5 text-[0.65rem] font-semibold text-white">
					<span className="h-1.5 w-1.5 rounded-full bg-white" /> LIVE
				</span>
				<span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--accent)_70%,transparent)]">
					<Play className="ml-0.5 h-5 w-5 fill-current" strokeWidth={0} />
				</span>
				<div className="absolute inset-x-3 bottom-3 h-1 rounded-full bg-fg/15">
					<div className="h-1 w-2/3 rounded-full bg-accent" />
				</div>
			</div>
			<div className="mt-4 flex gap-1.5">
				{["1080p", "720p", "480p", "AUTO"].map((q, i) => (
					<span
						key={q}
						className={cn(
							"rounded-md border px-2 py-0.5 text-[0.65rem] font-medium",
							i === 0
								? "border-accent/40 bg-accent/10 text-accent"
								: "border-line text-fg-muted",
						)}
					>
						{q}
					</span>
				))}
			</div>
			<p className="mt-2 font-mono text-[0.7rem] text-fg-faint">
				12,480 watching · &lt;2s latency
			</p>
		</Frame>
	);
}

const DRM_SYSTEMS = ["Widevine", "FairPlay", "PlayReady"];

export function DrmMockup({ className }: { className?: string }) {
	return (
		<Frame title="ViteLoop DRM" className={className}>
			<div className="flex items-center gap-3 rounded-xl border border-line bg-bg-elev p-3">
				<span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
					<Lock className="h-5 w-5" strokeWidth={1.8} />
				</span>
				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-medium text-fg">
						Premiere_S01E04.mp4
					</p>
					<p className="text-xs text-fg-muted">Encrypted · CENC</p>
				</div>
				<span className="rounded-full bg-emerald-500/12 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-500">
					Protected
				</span>
			</div>
			<div className="mt-3 grid grid-cols-3 gap-2">
				{DRM_SYSTEMS.map((d) => (
					<div
						key={d}
						className="flex items-center gap-1.5 rounded-lg border border-line p-2"
					>
						<Check className="h-3.5 w-3.5 shrink-0 text-accent-2" />
						<span className="truncate text-[0.7rem] text-fg">{d}</span>
					</div>
				))}
			</div>
			<div className="mt-3 rounded-lg border border-line bg-bg-soft/40 p-3">
				<p className="text-xs text-fg-muted">License issued</p>
				<p className="mt-1 font-mono text-[0.7rem] text-fg">
					key_8fk2…a19c · rotates 24h
				</p>
			</div>
		</Frame>
	);
}

const TRANSCODE_JOBS = [
	{ name: "master_4k.mov", codec: "AV1", pct: 82 },
	{ name: "trailer.mp4", codec: "HEVC", pct: 100 },
	{ name: "promo_1080.mov", codec: "H.264", pct: 46 },
];

export function TranscoderMockup({ className }: { className?: string }) {
	return (
		<Frame title="ViteLoop Transcoder" className={className}>
			<div className="space-y-2.5">
				{TRANSCODE_JOBS.map((j) => (
					<div key={j.name} className="rounded-xl border border-line p-3">
						<div className="flex items-center justify-between gap-2">
							<span className="truncate font-mono text-xs text-fg">
								{j.name}
							</span>
							<span className="shrink-0 rounded-md border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[0.6rem] font-medium text-accent">
								{j.codec}
							</span>
						</div>
						<div className="mt-2 flex items-center gap-2">
							<div className="h-1.5 flex-1 rounded-full bg-fg/10">
								<div
									className="h-1.5 rounded-full bg-accent"
									style={{ width: `${j.pct}%` }}
								/>
							</div>
							<span className="font-mono text-[0.65rem] text-fg-muted">
								{j.pct}%
							</span>
						</div>
					</div>
				))}
			</div>
			<p className="mt-3 font-mono text-[0.7rem] text-fg-faint">
				VMAF 96 · −38% bitrate · 12 workers
			</p>
		</Frame>
	);
}

const LMS_LESSONS = [
	{ title: "Introduction", done: true, len: "6m" },
	{ title: "Core concepts", done: true, len: "14m" },
	{ title: "Hands-on lab", done: false, len: "22m" },
	{ title: "Assessment", done: false, len: "10m" },
];

export function LmsMockup({ className }: { className?: string }) {
	return (
		<Frame title="ViteLoop LMS" className={className}>
			<div className="rounded-xl border border-line p-3">
				<p className="text-sm font-medium text-fg">Edge Infrastructure 101</p>
				<div className="mt-2 flex items-center gap-2">
					<div className="h-1.5 flex-1 rounded-full bg-fg/10">
						<div className="h-1.5 w-1/2 rounded-full bg-accent" />
					</div>
					<span className="font-mono text-[0.65rem] text-fg-muted">50%</span>
				</div>
			</div>
			<div className="mt-3 space-y-1.5">
				{LMS_LESSONS.map((l) => (
					<div
						key={l.title}
						className="flex items-center gap-2.5 rounded-lg border border-line px-3 py-2"
					>
						{l.done ? (
							<CircleCheck className="h-4 w-4 shrink-0 text-accent-2" />
						) : (
							<Circle className="h-4 w-4 shrink-0 text-fg-faint" />
						)}
						<span
							className={cn(
								"flex-1 text-xs",
								l.done ? "text-fg-muted line-through" : "text-fg",
							)}
						>
							{l.title}
						</span>
						<span className="font-mono text-[0.65rem] text-fg-faint">
							{l.len}
						</span>
					</div>
				))}
			</div>
		</Frame>
	);
}
