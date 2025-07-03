import type { Widget } from "@/types";

export function WidgetRenderer({ widget }: { widget: Widget }) {
	switch (widget.type) {
		case "iframe":
			return (
				<iframe
					src={widget.config.url}
					title={widget.title}
					className="w-full h-full rounded border"
				/>
			);
		case "note":
			return (
				<div className="p-2 bg-yellow-100 rounded h-full overflow-auto">
					<pre className="whitespace-pre-wrap">{widget.config.content}</pre>
				</div>
			);
		case "link":
			return (
				<a
					href={widget.config.url}
					target="_blank"
					rel="noopener noreferrer"
					className="block p-2 bg-blue-100 rounded text-blue-800 hover:underline"
				>
					{widget.config.label || widget.config.url}
				</a>
			);
		case "script":
			return (
				<div className="p-2 bg-gray-100 rounded h-full text-xs font-mono">
					<pre>{widget.config.code}</pre>
				</div>
			);
		default:
			return <div>Widget inconnu</div>;
	}
}
