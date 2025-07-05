import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useWorkspaceContext } from "@/modules/context/workspace-context";
import { WidgetsGrid } from "@/modules/widgets";
import { useMylowDeskStore } from "@/store/appStore";

export const Route = createFileRoute("/w/$workspaceId")({
	component: WorkspacePage,
});

function WorkspacePage() {
	const { workspaceId } = Route.useParams();
	const { editable } = useWorkspaceContext();
	const setActiveWorkspace = useMylowDeskStore((s) => s.setActiveWorkspace);
	const workspaces = useMylowDeskStore((s) => s.workspaces);
	const activeWs = workspaces.find((ws) => ws.id === workspaceId);
	const navigate = useNavigate();

	useEffect(() => {
		if (activeWs) setActiveWorkspace(workspaceId);
		else if (workspaces.length) navigate({ to: "/" });
	}, [workspaceId, activeWs, setActiveWorkspace, workspaces, navigate]);

	if (!activeWs) return <div>Workspace introuvable.</div>;

	return (
		<div>
			<WidgetsGrid workspaceId={activeWs.id} editable={editable} />
		</div>
	);
}
