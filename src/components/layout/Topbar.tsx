import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useMylowDeskStore } from "@/store/appStore";

export function TopBar() {
	const activeId = useMylowDeskStore((s) => s.activeWorkspaceId);
	const workspaces = useMylowDeskStore((s) => s.workspaces);
	const activeWs = workspaces.find((ws) => ws.id === activeId);
	const setState = useMylowDeskStore((s) => s.setState);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Ouvre le sélecteur de fichier
	function handleImportClick() {
		fileInputRef.current?.click();
	}

	// Charge le fichier JSON et met à jour le store
	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const json = event.target?.result as string;
				const data = JSON.parse(json);
				setState(() => data); // Remplace tout l’état (à adapter selon ta logique)
				alert("Import réussi !");
			} catch {
				alert("Fichier JSON invalide");
			}
		};
		reader.readAsText(file);
	}

	return (
		<header className="h-14 flex items-center px-6 border-b bg-card">
			<h1 className="text-xl font-semibold flex-1">
				{activeWs ? activeWs.name : "MylowDesk"}
			</h1>
			<div className="flex space-x-2">
				<Button variant="outline" onClick={handleImportClick}>
					Importer JSON
				</Button>
				{/* Input caché pour importer */}
				<input
					type="file"
					accept="application/json"
					ref={fileInputRef}
					onChange={handleFileChange}
					className="hidden"
				/>
			</div>
		</header>
	);
}
