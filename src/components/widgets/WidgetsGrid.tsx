import { Responsive, WidthProvider } from "react-grid-layout";
import { useMylowDeskStore } from "@/store/appStore";
import { WidgetRenderer } from "./WidgetRenderer";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export function WidgetsGrid({
	workspaceId,
	editable = false,
}: {
	workspaceId: string;
	editable?: boolean;
}) {
	const workspaces = useMylowDeskStore((s) => s.workspaces);
	const moveWidget = useMylowDeskStore((s) => s.moveWidget);
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

	function onLayoutChange(newLayout: any[]) {
		// Met à jour la position des widgets dans le store
		newLayout.forEach((item) => {
			const widget = ws.widgets.find((w) => w.id === item.i);
			if (
				widget &&
				(widget.position.x !== item.x || widget.position.y !== item.y)
			) {
				moveWidget(ws.id, widget.id, { x: item.x, y: item.y });
			}
			// (optionnel) updateWidget pour la taille (w, h)
		});
	}

	return (
		<ResponsiveGridLayout
			className="layout"
			layouts={{ lg: layout }}
			breakpoints={{ lg: 1024, md: 768, sm: 480, xs: 0 }}
			cols={{ lg: 10, md: 6, sm: 2, xs: 1 }}
			rowHeight={60}
			isDraggable={editable}
			isResizable={editable}
			onLayoutChange={onLayoutChange}
			measureBeforeMount={false}
			useCSSTransforms={true}
			compactType="vertical"
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
						<div className="drag-handle cursor-move px-2 py-1 bg-muted text-xs">
							{widget.title}
						</div>
					)}
					<div className="flex-1 p-2">
						<WidgetRenderer widget={widget} />
					</div>
				</div>
			))}
		</ResponsiveGridLayout>
	);
}
