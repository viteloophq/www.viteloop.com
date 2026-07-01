import { cn } from "#/lib/utils";

interface CodeBlockProps {
	title?: string;
	code: string;
	className?: string;
}

export function CodeBlock({ title, code, className }: CodeBlockProps) {
	return (
		<div className={cn("glass overflow-hidden rounded-2xl", className)}>
			{title && (
				<div className="flex items-center gap-2 border-b border-line px-4 py-3">
					<span className="flex gap-1.5">
						<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
						<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
						<span className="h-2.5 w-2.5 rounded-full bg-fg-faint/30" />
					</span>
					<span className="ml-2 font-mono text-xs text-fg-faint">{title}</span>
				</div>
			)}
			<pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-fg-muted">
				<code>{code}</code>
			</pre>
		</div>
	);
}
