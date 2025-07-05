import { useEffect, useState } from "react";
import { useMylowDeskStore } from "@/store/appStore";
export function EditableNoteView({ widget }) {
	const updateWidget = useMylowDeskStore((s) => s.updateWidget);
	const [content, setContent] = useState(widget.config.content);
	function save() {
		updateWidget(widget.workspaceId, { ...widget, config: { content } });
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timer = setTimeout(() => {
			console.log("Saving note content:", content);

			save();
		}, 1000);
		return () => clearTimeout(timer); // Nettoyage du timer
	}, [content]); // Sauvegarde à chaque changement de contenu

	return (
		<textarea
			className="w-full h-full p-2 rounded bg-muted resize-none"
			value={content}
			onChange={(e) => setContent(e.target.value)}
			onBlur={save}
			placeholder="Écris ta note ici..."
		/>
	);
}
