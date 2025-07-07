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

	return (
		<div>
			Welcome to Desko! You can create a workspace to get started, on the left
			sidebar.
		</div>
	);
}
