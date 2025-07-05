import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMylowDeskStore } from "@/store/appStore";
import { SidebarTrigger } from "../ui/sidebar";

export function TopBar() {
	const [dark, setDark] = useState(() => {
		// Par défaut, détecte le thème système
		return (
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		);
	});

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
				<h1 className="text-xl font-semibold flex-1">
					{activeWs ? activeWs.name : "MylowDesk"}
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
