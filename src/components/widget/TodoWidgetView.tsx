import { X } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspaceContext } from "@/modules/context/workspace-context";
import { useMylowDeskStore } from "@/store/appStore";
export function TodoWidgetView({ widget }) {
	const updateWidget = useMylowDeskStore((s) => s.updateWidget);
	const { activeWorkspace } = useWorkspaceContext();
	const [input, setInput] = useState("");

	if (!activeWorkspace || activeWorkspace.id === undefined) {
		console.error("Active workspace ID is undefined. Widget update skipped.");
		return;
	}

	function toggleDone(id: string) {
		const newItems = widget.config.items.map((item) =>
			item.id === id ? { ...item, done: !item.done } : item,
		);
		if (!activeWorkspace) return;
		updateWidget(activeWorkspace.id, {
			...widget,
			config: { items: newItems },
		});
	}
	function addItem() {
		if (!input.trim()) return;
		const newItems = [
			...widget.config.items,
			{ id: uuidv4(), text: input, done: false },
		];
		if (!activeWorkspace) return;

		updateWidget(activeWorkspace.id, {
			...widget,
			config: { items: newItems },
		});
		setInput("");
	}
	function removeItem(id: string) {
		const newItems = widget.config.items.filter((item) => item.id !== id);
		if (!activeWorkspace) return;

		updateWidget(activeWorkspace.id, {
			...widget,
			config: { items: newItems },
		});
	}
	return (
		<div>
			<ul className="space-y-2 bg-muted p-4 rounded shadow-md">
				{widget.config.items.map((item) => (
					<li
						key={item.id}
						className="flex items-center gap-4 p-2 border-b last:border-none"
					>
						<Input
							type="checkbox"
							checked={item.done}
							onChange={() => toggleDone(item.id)}
							className="h-4 w-4"
						/>
						<span
							className={`flex-1 text-sm ${
								item.done
									? "line-through text-muted-foreground/50"
									: "text-foreground"
							}`}
						>
							{item.text}
						</span>
						<Button
							className="ml-auto text-xs text-red-500 hover:text-red-700"
							onClick={() => removeItem(item.id)}
						>
							<X className="h-4 w-4" />
						</Button>
					</li>
				))}
			</ul>
			<div className="mt-2 flex gap-2">
				<Input
					className="flex-1 border rounded px-2 py-1 text-xs"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Nouvelle tâche"
					onKeyDown={(e) => e.key === "Enter" && addItem()}
				/>
				<Button
					className="px-2 py-1 bg-primary text-white rounded text-xs"
					onClick={addItem}
				>
					+
				</Button>
			</div>
		</div>
	);
}
