import GridLayout, {
	type ResizeHandle,
	WidthProvider,
} from "react-grid-layout";
import { useMylowDeskStore } from "@/store/appStore";
import { WidgetRenderer } from "./WidgetRenderer";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Trash2 } from "lucide-react";

import "@/styles/react-grid.css";
import { Button } from "@/components/ui/button";

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
	const availableHandles = ["sw", "nw", "se", "ne"] as ResizeHandle[];

	if (!ws) return null;

	// Génère le layout pour react-grid-layout
	const layout = ws.widgets.map((widget) => ({
		i: widget.id,
		x: widget.position.x,
		y: widget.position.y,
		w: widget.size.w,
		h: widget.size.h,
		static: !editable, // widgets non déplaçables si pas en mode édition
		resizeHandles: availableHandles,
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
			draggableHandle={editable ? ".drag-handle" : undefined}
			preventCollision={true}
		>
			{ws.widgets.map((widget) => (
				<div
					key={widget.id}
					className="bg-card rounded shadow flex flex-col overflow-hidden"
				>
					{/* Optionnel : barre de drag en mode édition */}
					{editable && (
						<div className="flex p-1 px-4 absolute w-full z-10 drag-handle cursor-move items-center justify-between bg-muted/90 drop-shadow-lg">
							<div className=" text-sm">{widget.title}</div>
							<Button
								variant={"ghost"}
								className="justify-end p-0 cursor-pointer z-30"
								onClick={(e) => {
									e.stopPropagation();
									removeWidget(ws.id, widget.id);
								}}
								onMouseDown={(e) => {
									e.stopPropagation();
								}}
							>
								<Trash2 className="h-4 w-4 flex left-4 text-destructive " />
							</Button>
						</div>
					)}
					<div className="flex-1 p-2 overflow-y-auto ">
						<WidgetRenderer widget={widget} />
					</div>
				</div>
			))}
		</ReactGridLayout>
	);
}
