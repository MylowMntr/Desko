import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddWidgetModal, WidgetsGrid } from "@/components/widgets/";
import { useMylowDeskStore } from "@/store/appStore";

export const Route = createFileRoute("/w/$workspaceId")({
	component: WorkspacePage,
});

function WorkspacePage() {
	const { workspaceId } = Route.useParams();
	const setActiveWorkspace = useMylowDeskStore((s) => s.setActiveWorkspace);
	const workspaces = useMylowDeskStore((s) => s.workspaces);
	const activeWs = workspaces.find((ws) => ws.id === workspaceId);
	const [showModal, setShowModal] = useState(false);
	const [editable, setEditable] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (activeWs) setActiveWorkspace(workspaceId);
		else if (workspaces.length) navigate({ to: "/" });
	}, [workspaceId, activeWs, setActiveWorkspace, workspaces, navigate]);

	if (!activeWs) return <div>Workspace introuvable.</div>;

	return (
		<div>
			<div className="mb-4 flex justify-between">
				<Button onClick={() => setEditable((e) => !e)}>
					{editable ? "Verrouiller la grille" : "Éditer la grille"}
				</Button>
				<Button onClick={() => setShowModal(true)}>+ Ajouter un widget</Button>
			</div>
			<WidgetsGrid workspaceId={activeWs.id} editable={editable} />
			<AddWidgetModal
				open={showModal}
				onOpenChange={setShowModal}
				workspaceId={activeWs.id}
			/>
		</div>
	);
}
