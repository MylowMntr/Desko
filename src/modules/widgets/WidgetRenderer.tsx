import {
	ClockWidgetView,
	CounterWidgetView,
	EditableNoteView,
	IframeWidgetView,
	TodoWidgetView,
} from "@/components/widget";
import type { Widget } from "@/types";

export function WidgetRenderer({ widget }: { widget: Widget }) {
	switch (widget.type) {
		case "iframe":
			return <IframeWidgetView widget={widget} />;
		case "note":
			return <EditableNoteView widget={widget} />;
		case "todo":
			return <TodoWidgetView widget={widget} />;
		case "counter":
			return <CounterWidgetView widget={widget} />;
		case "clock":
			return <ClockWidgetView widget={widget} />;
		default:
			return <div>Widget inconnu</div>;
	}
}
