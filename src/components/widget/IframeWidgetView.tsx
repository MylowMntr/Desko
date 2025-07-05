export function IframeWidgetView({ widget }) {
	return (
		<iframe
			src={widget.config.url}
			title={widget.title}
			className="w-full h-full rounded border"
		/>
	);
}
