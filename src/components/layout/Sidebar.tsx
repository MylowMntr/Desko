import { Link } from "@tanstack/react-router";
import { Download, Edit, Trash2, Upload } from "lucide-react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useMylowDeskStore } from "@/store/appStore";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";

export function AppSidebar() {
	const workspaces = useMylowDeskStore((s) => s.workspaces);
	const activeId = useMylowDeskStore((s) => s.activeWorkspaceId);
	const setActiveWorkspace = useMylowDeskStore((s) => s.setActiveWorkspace);
	const addWorkspace = useMylowDeskStore((s) => s.addWorkspace);
	const removeWorkspace = useMylowDeskStore((s) => s.removeWorkspace);
	const renameWorkspace = useMylowDeskStore((s) => s.renameWorkspace);
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
		<Sidebar>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Workspaces</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{workspaces.map((ws) => (
								<SidebarMenuItem
									key={ws.id}
									className="flex items-center justify-between"
								>
									<SidebarMenuButton asChild>
										<Link
											to="/w/$workspaceId"
											params={{ workspaceId: ws.id }}
											className={`w-full flex flex-row items-center justify-between ${
												ws.id === activeId ? "text-primary" : ""
											}`}
										>
											{ws.name}

											<div className="">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => {
														const newName = prompt(
															"Renommer le workspace",
															ws.name,
														);
														if (newName) {
															renameWorkspace(ws.id, newName);
														}
													}}
													className="text-muted-foreground"
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="destructive"
													size="icon"
													onClick={() => removeWorkspace(ws.id)}
													className="text-destructive"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>{" "}
			<SidebarFooter>
				<Button onClick={handleAddWorkspace} className="w-full">
					+ Nouveau workspace
				</Button>
				<div className="w-full">
					<Button
						variant="outline"
						className="w-full"
						onClick={handleImportClick}
					>
						<Download className="h-4 w-4 mr-2" />
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
				<Button variant="outline" onClick={handleExport} className="w-full">
					<Upload className="h-4 w-4 mr-2" />
					Exporter JSON
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
