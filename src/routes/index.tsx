import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useMylowDeskStore } from "@/store/appStore";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
  const workspaces = useMylowDeskStore((s) => s.workspaces);
  const navigate = useNavigate();

  useEffect(() => {
    if (workspaces.length) {
      navigate({ to: "/w/$workspaceId", params: { workspaceId: workspaces[0].id } });
    }
  }, [workspaces, navigate]);

  return <div>Bienvenue sur MylowDesk ! Crée un workspace pour commencer.</div>;
}
