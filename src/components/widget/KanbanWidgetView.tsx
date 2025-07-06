import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import GridLayout, { type Layout, WidthProvider } from "react-grid-layout";
import { Button } from "@/components/ui/button";
import { useWorkspaceContext } from "@/modules/context/workspace-context";
import { useMylowDeskStore } from "@/store/appStore";
import { Textarea } from "../ui/textarea";

type Card = {
	id: string;
	title: string;
};

const columns = ["Todo", "In Progress", "Done"];

const ReactGridLayout = WidthProvider(GridLayout);

export function KanbanWidgetView({ widget }) {
	const updateWidget = useMylowDeskStore((s) => s.updateWidget);
	const { activeWorkspace } = useWorkspaceContext();
	const [layout, setLayout] = useState<Layout[]>(widget.config.layout || []);
	const [cards, setCards] = useState<Card[]>(widget.config.cards || []);

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

	function addCard() {
		const newCard: Card = {
			id: Date.now().toString(),
			title: "New Task",
		};
		setCards((prev) => [...prev, newCard]);
	}

	function deleteCard(id: string) {
		setCards((prev) => prev.filter((card) => card.id !== id));
	}

	return (
		<div className="">
			<div className="absolute top-1">
				<Button variant="ghost" onClick={addCard}>
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
						className="bg-input/30 rounded-lg shadow-md p-4 cursor-move flex items-center justify-center"
					>
						<Button
							variant="ghost"
							className="absolute text-destructive top-2 right-2"
							onClick={(e) => {
								e.stopPropagation();
								deleteCard(card.id);
							}}
							onMouseDown={(e) => {
								e.stopPropagation();
							}}
						>
							<Trash className="h-4 w-4" />
						</Button>
						{/* {card.title} */}
						<Textarea
							value={card.title}
							className="w-full h-full  border-none focus:ring-0"
							style={{ resize: "none" }}
							onChange={(e) => {
								const newTitle = e.target.value;
								setCards((prev) =>
									prev.map((c) =>
										c.id === card.id ? { ...c, title: newTitle } : c,
									),
								);
							}}
						/>
					</div>
				))}
			</ReactGridLayout>
		</div>
	);
}
