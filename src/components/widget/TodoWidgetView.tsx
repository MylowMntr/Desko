import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useMylowDeskStore } from "@/store/appStore";
export function TodoWidgetView({ widget }) {
	const updateWidget = useMylowDeskStore((s) => s.updateWidget);
	const [input, setInput] = useState("");
	function toggleDone(id: string) {
		const newItems = widget.config.items.map((item) =>
			item.id === id ? { ...item, done: !item.done } : item,
		);
		updateWidget(widget.workspaceId, {
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
		updateWidget(widget.workspaceId, {
			...widget,
			config: { items: newItems },
		});
		setInput("");
	}
	function removeItem(id: string) {
		const newItems = widget.config.items.filter((item) => item.id !== id);
		updateWidget(widget.workspaceId, {
			...widget,
			config: { items: newItems },
		});
	}
	return (
		<div>
			<ul className="space-y-1">
				{widget.config.items.map((item) => (
					<li key={item.id} className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={item.done}
							onChange={() => toggleDone(item.id)}
						/>
						<span className={item.done ? "line-through text-gray-400" : ""}>
							{item.text}
						</span>
						<Button
							className="ml-auto text-xs text-red-400 hover:text-red-600"
							onClick={() => removeItem(item.id)}
						>
							✕
						</Button>
					</li>
				))}
			</ul>
			<div className="mt-2 flex gap-2">
				<input
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
