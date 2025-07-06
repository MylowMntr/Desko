import { Edit, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import GridLayout, { type Layout, WidthProvider } from "react-grid-layout";
import { Button } from "@/components/ui/button";
import { useWorkspaceContext } from "@/modules/context/workspace-context";
import { useMylowDeskStore } from "@/store/appStore";

type Card = {
	id: string;
	title: string;
};

const initialCards: Card[] = [
	{ id: "1", title: "Task A" },
	{ id: "2", title: "Task B" },
	{ id: "3", title: "Task C" },
	{ id: "4", title: "Task D" },
	{ id: "5", title: "Task E" },
];

const initialLayout: Layout[] = [
	{ i: "1", x: 0, y: 0, w: 1, h: 1 },
	{ i: "2", x: 0, y: 1, w: 1, h: 1 },
	{ i: "3", x: 1, y: 0, w: 1, h: 1 },
	{ i: "4", x: 2, y: 0, w: 1, h: 1 },
	{ i: "5", x: 2, y: 1, w: 1, h: 1 },
];

const columns = ["Todo", "In Progress", "Done"];

const ReactGridLayout = WidthProvider(GridLayout);

export function KanbanWidgetView({ widget }) {
	const updateWidget = useMylowDeskStore((s) => s.updateWidget);
	const { activeWorkspace } = useWorkspaceContext();
	const [layout, setLayout] = useState<Layout[]>(
		widget.config.layout || initialLayout,
	);
	const [cards] = useState<Card[]>(widget.config.cards || initialCards);

	function save() {
		if (activeWorkspace?.id) {
			updateWidget(activeWorkspace.id, {
				...widget,
				config: { layout, cards },
			});
		} else {
			console.error("Workspace ID is undefined. Widget update skipped.");
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: false
	useEffect(() => {
		const timer = setTimeout(() => {
			save();
		}, 700);
		return () => clearTimeout(timer); // Cleanup timer
	}, [layout, cards]);

	return (
		<div className="">
			<div className="absolute top-1">
				<Button variant="ghost" onClick={save}>
					<Plus className="h-4 w-4" />
				</Button>
				<Button variant="ghost" onClick={save}>
					<Edit className="h-4 w-4" />
				</Button>
			</div>
			<div className="flex gap-4 px-2">
				{columns.map((colName) => (
					<div key={colName} className="flex-1">
						<h2 className="text-center text-lg font-semibold">{colName}</h2>
					</div>
				))}
			</div>

			<ReactGridLayout
				className="layout"
				layout={layout}
				cols={columns.length}
				rowHeight={100}
				onLayoutChange={(newLayout) => setLayout(newLayout)}
				isResizable={false}
			>
				{cards.map((card) => (
					<div
						key={card.id}
						className="bg-muted-foreground rounded-lg shadow-md p-4 cursor-move flex items-center justify-center"
					>
						{card.title}
					</div>
				))}
			</ReactGridLayout>
		</div>
	);
}
