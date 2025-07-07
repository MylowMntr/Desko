import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useWorkspaceContext } from "@/modules/context/workspace-context";
import { WidgetsGrid } from "@/modules/widgets";
import { useDeskoStore } from "@/store/appStore";

export const Route = createFileRoute("/w/$workspaceId")({
	component: WorkspacePage,
});

function WorkspacePage() {
	const { workspaceId } = Route.useParams();
	const { editable, setActiveWorkspace } = useWorkspaceContext();
	const setTheActiveWorkspace = useDeskoStore((s) => s.setActiveWorkspace);
	const workspaces = useDeskoStore((s) => s.workspaces);
	const activeWs = workspaces.find((ws) => ws.id === workspaceId);
	const navigate = useNavigate();

	useEffect(() => {
		if (activeWs) setTheActiveWorkspace(workspaceId);
		else if (workspaces.length) navigate({ to: "/" });
	}, [workspaceId, activeWs, setTheActiveWorkspace, workspaces, navigate]);

	if (!activeWs) return <div>Workspace introuvable.</div>;

	setActiveWorkspace(activeWs);

	return (
		<div>
			<WidgetsGrid workspaceId={activeWs.id} editable={editable} />
		</div>
	);
}
