import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDeskoStore } from "@/store/appStore";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
	const workspaces = useDeskoStore((s) => s.workspaces);
	const navigate = useNavigate();

	useEffect(() => {
		if (workspaces.length) {
			navigate({
				to: "/w/$workspaceId",
				params: { workspaceId: workspaces[0].id },
			});
		}
	}, [workspaces, navigate]);

	return <div>Bienvenue sur MylowDesk ! Crée un workspace pour commencer.</div>;
}
