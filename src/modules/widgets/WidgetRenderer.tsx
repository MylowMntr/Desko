import {
	ClockWidgetView,
	EditableNoteView,
	IframeWidgetView,
	KanbanWidgetView,
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
		case "clock":
			return <ClockWidgetView widget={widget} />;
		case "kanban":
			return <KanbanWidgetView widget={widget} />;
		default:
			return <div>Widget unknown</div>;
	}
}
