import GridLayout, { WidthProvider } from "react-grid-layout";
import { useMylowDeskStore } from "@/store/appStore";
import { WidgetRenderer } from "./WidgetRenderer";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

import "@/styles/react-grid.css";

const ReactGridLayout = WidthProvider(GridLayout);

export function WidgetsGrid({
	workspaceId,
	editable = false,
}: {
	workspaceId: string;
	editable?: boolean;
}) {
	const workspaces = useMylowDeskStore((s) => s.workspaces);
	const moveWidget = useMylowDeskStore((s) => s.moveWidget);
	const removeWidget = useMylowDeskStore((s) => s.removeWidget);
	const updateWidget = useMylowDeskStore((s) => s.updateWidget);
	const ws = workspaces.find((w) => w.id === workspaceId);

	if (!ws) return null;

	// Génère le layout pour react-grid-layout
	const layout = ws.widgets.map((widget) => ({
		i: widget.id,
		x: widget.position.x,
		y: widget.position.y,
		w: widget.size.w,
		h: widget.size.h,
		static: !editable, // widgets non déplaçables si pas en mode édition
	}));

	function onLayoutChange(
		newLayout: { i: string; x: number; y: number; w: number; h: number }[],
	) {
		// Met à jour la position des widgets dans le store
		newLayout.forEach((item) => {
			const widget = ws?.widgets.find((w) => w.id === item.i);
			if (
				widget &&
				(widget.position.x !== item.x || widget.position.y !== item.y)
			) {
				if (ws) {
					moveWidget(ws.id, widget.id, { x: item.x, y: item.y });
				}
			}
			//  updateWidget pour la taille (w, h)
			if (widget && (widget.size.w !== item.w || widget.size.h !== item.h)) {
				if (ws) {
					updateWidget(ws.id, {
						...widget,
						size: { w: item.w, h: item.h },
					});
				}
			}
		});
	}

	return (
		<ReactGridLayout
			className="layout"
			layout={layout}
			cols={10}
			rowHeight={60}
			isDraggable={editable}
			isResizable={editable}
			onLayoutChange={onLayoutChange}
			verticalCompact={false} // <-- Désactive le compactage vertical
			preventCollision={!editable}
			draggableHandle={editable ? ".drag-handle" : undefined}
		>
			{ws.widgets.map((widget) => (
				<div
					key={widget.id}
					className="bg-card rounded shadow flex flex-col overflow-hidden"
				>
					{/* Optionnel : barre de drag en mode édition */}
					{editable && (
						<div className="flex drag-handle cursor-move items-center justify-between bg-muted">
							<div className=" px-2 py-1 bg-muted text-xs">{widget.title}</div>
							<div className="flex justify-end p-1">
								<Button
									className="text-red-300 hover:text-red-500"
									onClick={() => removeWidget(ws.id, widget.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}
					<div className="flex-1 p-2">
						<WidgetRenderer widget={widget} />
					</div>
				</div>
			))}
		</ReactGridLayout>
	);
}
