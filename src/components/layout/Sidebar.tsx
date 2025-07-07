import { Link } from "@tanstack/react-router";
import { Download, Edit, Trash2, Upload } from "lucide-react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useDeskoStore } from "@/store/appStore";
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
	const workspaces = useDeskoStore((s) => s.workspaces);
	const activeId = useDeskoStore((s) => s.activeWorkspaceId);
	const setActiveWorkspace = useDeskoStore((s) => s.setActiveWorkspace);
	const addWorkspace = useDeskoStore((s) => s.addWorkspace);
	const removeWorkspace = useDeskoStore((s) => s.removeWorkspace);
	const renameWorkspace = useDeskoStore((s) => s.renameWorkspace);
	const setState = useDeskoStore((s) => s.setState);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Load the file input when the import button is clicked
	function handleImportClick() {
		fileInputRef.current?.click();
	}

	// Load the JSON file and update the store
	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const json = event.target?.result as string;
				const data = JSON.parse(json);
				setState(() => data); // Replace the state (adapt according to your logic)
				alert("Import successful!");
			} catch {
				alert("Invalid JSON file");
			}
		};
		reader.readAsText(file);
	}

	// Create a new workspace with a unique ID and default name
	function handleAddWorkspace() {
		const newWs = {
			id: uuidv4(),
			name: `Workspace ${workspaces.length + 1}`,
			widgets: [],
		};
		addWorkspace(newWs);
		setActiveWorkspace(newWs.id);
	}

	// Export the current state as a JSON file
	function handleExport() {
		const state = useDeskoStore.getState();
		const json = JSON.stringify(state, null, 2);
		// Simple download
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "desko-export.json";
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
					+ New Workspace
				</Button>
				<div className="w-full">
					<Button
						variant="outline"
						className="w-full"
						onClick={handleImportClick}
					>
						<Download className="h-4 w-4 mr-2" />
						Import JSON
					</Button>
					{/* Hidden input for importing JSON */}
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
					Export JSON
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
