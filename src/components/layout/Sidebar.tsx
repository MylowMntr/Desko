
import { Link } from "@tanstack/react-router";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useMylowDeskStore } from "@/store/appStore";

export function Sidebar() {
	const workspaces = useMylowDeskStore((s) => s.workspaces);
	const activeId = useMylowDeskStore((s) => s.activeWorkspaceId);
	const setActiveWorkspace = useMylowDeskStore((s) => s.setActiveWorkspace);
	const addWorkspace = useMylowDeskStore((s) => s.addWorkspace);

	// Action pour créer un workspace simple
	function handleAddWorkspace() {
		const newWs = {
			id: uuidv4(),
			name: `Workspace ${workspaces.length + 1}`,
			widgets: [],
		};
		addWorkspace(newWs);
		setActiveWorkspace(newWs.id);
	}

	// Action pour exporter l’état JSON
	function handleExport() {
		const state = useMylowDeskStore.getState();
		const json = JSON.stringify(state, null, 2);
		// Téléchargement simple
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "mylowdesk-export.json";
		a.click();
		URL.revokeObjectURL(url);
	}

	return (
		<aside className="w-56 bg-muted p-4 border-r flex flex-col">
			<h2 className="font-bold mb-4">Workspaces</h2>
			<ul className="flex-1 space-y-2 overflow-auto">
				{workspaces.map((ws) => (
					<li key={ws.id}>
						<Link
							to="/w/$workspaceId"
							params={{ workspaceId: ws.id }}
							className={`block rounded px-2 py-1 ${
								ws.id === activeId ? "bg-primary text-primary-foreground" : ""
							}`}
						>
							{ws.name}
						</Link>
					</li>
				))}
			</ul>
			<div className="mt-4 space-y-2">
				<Button onClick={handleAddWorkspace} className="w-full">
					+ Nouveau workspace
				</Button>
				<Button variant="outline" onClick={handleExport} className="w-full">
					Exporter JSON
				</Button>
			</div>
		</aside>
	);
}
