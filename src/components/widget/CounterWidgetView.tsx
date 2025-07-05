import { Button } from "@/components/ui/button";
import { useMylowDeskStore } from "@/store/appStore";
export function CounterWidgetView({ widget }) {
	const updateWidget = useMylowDeskStore((s) => s.updateWidget);
	function increment() {
		updateWidget(widget.workspaceId, {
			...widget,
			config: { value: widget.config.value + 1 },
		});
	}
	function decrement() {
		updateWidget(widget.workspaceId, {
			...widget,
			config: { value: widget.config.value - 1 },
		});
	}
	return (
		<div className="flex flex-col items-center gap-2">
			<span className="text-2xl">{widget.config.value}</span>
			<div className="flex gap-2">
				<Button onClick={decrement} className="px-2 py-1 bg-muted rounded">
					-
				</Button>
				<Button
					onClick={increment}
					className="px-2 py-1 bg-primary text-white rounded"
				>
					+
				</Button>
			</div>
		</div>
	);
}
