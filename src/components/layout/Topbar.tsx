import { Grid, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useWorkspaceContext } from "@/modules/context/workspace-context";
import { AddWidgetModal } from "@/modules/widgets";

export function TopBar() {
	const [dark, setDark] = useState(() => {
		return (
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		);
	});
	const { editable, setEditable, showModal, setShowModal, activeWorkspace } =
		useWorkspaceContext();

	useEffect(() => {
		document.documentElement.classList.toggle("dark", dark);
	}, [dark]);

	return (
		<header className="h-12 flex border-b bg-card">
			<div className="flex items-center">
				<SidebarTrigger />
			</div>
			<div className="flex items-center px-3 w-full">
				<h1 className="text-xl font-semibold flex items-center justify-between w-full">
					{activeWorkspace ? (
						<>
							<span>{activeWorkspace.name}</span>
							<div className="flex items-center space-x-2">
								<Button
									onClick={() => setEditable((e) => !e)}
									className={editable ? "bg-success" : ""}
								>
									<Grid />
									<span className="hidden md:block">
										{editable ? "Lock Grid" : "Edit Grid"}
									</span>
								</Button>
								<Button onClick={() => setShowModal(true)}>
									<Plus />
									<span className="hidden md:block">Add Widget</span>
								</Button>
							</div>
							<AddWidgetModal
								open={showModal}
								onOpenChange={setShowModal}
								workspaceId={activeWorkspace.id}
							/>
						</>
					) : (
						"Desko"
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
