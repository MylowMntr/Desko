import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddWidgetModal } from "@/components/widgets/AddWidgetModal";
import { WidgetRenderer } from "@/components/widgets/WidgetRenderer";
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
	const navigate = useNavigate();

	// Synchronise l’état global avec l’URL
	useEffect(() => {
		if (activeWs) setActiveWorkspace(workspaceId);
		else if (workspaces.length) navigate({ to: "/" });
	}, [workspaceId, activeWs, setActiveWorkspace, workspaces, navigate]);

	if (!activeWs) return <div>Workspace introuvable.</div>;

	return (
		<div>
			<div className="mb-4 flex justify-end">
				<Button onClick={() => setShowModal(true)}>+ Ajouter un widget</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{activeWs.widgets.map((widget) => (
					<div key={widget.id} className="bg-card p-2 rounded shadow h-40">
						<WidgetRenderer widget={widget} />
					</div>
				))}
			</div>
			<AddWidgetModal
				open={showModal}
				onOpenChange={setShowModal}
				workspaceId={activeWs.id}
			/>
		</div>
	);
}
