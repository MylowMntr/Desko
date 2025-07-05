import { Grid, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useWorkspaceContext } from "@/modules/context/workspace-context";
import { AddWidgetModal } from "@/modules/widgets";
import { useMylowDeskStore } from "@/store/appStore";

export function TopBar() {
	const [dark, setDark] = useState(() => {
		// Par défaut, détecte le thème système
		return (
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		);
	});
	const { editable, setEditable, showModal, setShowModal } =
		useWorkspaceContext();

	useEffect(() => {
		document.documentElement.classList.toggle("dark", dark);
	}, [dark]);

	const activeId = useMylowDeskStore((s) => s.activeWorkspaceId);
	const workspaces = useMylowDeskStore((s) => s.workspaces);
	const activeWs = workspaces.find((ws) => ws.id === activeId);

	return (
		<header className="h-12 flex border-b bg-card">
			<div className="flex items-center">
				<SidebarTrigger />
			</div>
			<div className="flex items-center px-3 w-full">
				<h1 className="text-xl font-semibold flex items-center justify-between w-full">
					{activeWs ? (
						<>
							<span>{activeWs.name}</span>
							<div className="flex items-center space-x-2">
								<Button
									onClick={() => setEditable((e) => !e)}
									className={editable ? "bg-success" : ""}
								>
									<Grid />
									<span>
										{editable ? "Verrouiller la grille" : "Éditer la grille"}
									</span>
								</Button>
								<Button onClick={() => setShowModal(true)}>
									<Plus /> <span>Ajouter un widget</span>
								</Button>
							</div>
							<AddWidgetModal
								open={showModal}
								onOpenChange={setShowModal}
								workspaceId={activeWs.id}
							/>
						</>
					) : (
						"MylowDesk"
					)}
				</h1>
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						className=""
						onClick={() => setDark((d) => !d)}
					>
						{dark ? "☀️" : "🌙"}
					</Button>
				</div>
			</div>
		</header>
	);
}
