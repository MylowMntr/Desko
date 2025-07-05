import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspaceContext } from "@/modules/context/workspace-context";
import { useMylowDeskStore } from "@/store/appStore";
export function EditableNoteView({ widget }) {
	const updateWidget = useMylowDeskStore((s) => s.updateWidget);
	const { activeWorkspace } = useWorkspaceContext();
	const [content, setContent] = useState(widget.config.content);

	function save() {
		console.log({ ...widget, config: { content } });

		if (activeWorkspace?.id) {
			updateWidget(activeWorkspace.id, { ...widget, config: { content } });
		} else {
			console.error("Workspace ID is undefined. Widget update skipped.");
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timer = setTimeout(() => {
			save();
		}, 700);
		return () => clearTimeout(timer); // Nettoyage du timer
	}, [content]); // Sauvegarde à chaque changement de contenu

	return (
		<Textarea
			className="w-full h-full p-2 rounded bg-muted resize-none"
			value={content}
			onChange={(e) => setContent(e.target.value)}
			onBlur={save}
			placeholder="Écris ta note ici..."
		/>
	);
}
