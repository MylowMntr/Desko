// /app/store/appStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppState, Widget, Workspace } from "@/types";

// Typage du store Zustand
interface MylowDeskStore extends AppState {
	addWorkspace: (ws: Workspace) => void;
	setActiveWorkspace: (id: string) => void;
	removeWorkspace: (id: string) => void;
	addWidget: (workspaceId: string, widget: Widget) => void;
	moveWidget: (
		workspaceId: string,
		widgetId: string,
		position: { x: number; y: number },
	) => void;
	updateWidget: (workspaceId: string, widget: Widget) => void;
	setState: (
		updater: (
			state: MylowDeskStore,
		) => Partial<MylowDeskStore> | MylowDeskStore,
	) => void;
}

export const useMylowDeskStore = create(
	persist<MylowDeskStore>(
		(set, get) => ({
			// --- State initial ---
			workspaces: [],
			activeWorkspaceId: null,

			// --- Actions ---

			addWorkspace: (ws) =>
				set((state) => ({
					workspaces: [...state.workspaces, ws],
				})),

			setActiveWorkspace: (id) =>
				set(() => ({
					activeWorkspaceId: id,
				})),

			removeWorkspace: (id) =>
				set((state) => {
					const filtered = state.workspaces.filter((ws) => ws.id !== id);
					// Si le workspace actif est supprimé, on le désactive
					const activeWorkspaceId =
						state.activeWorkspaceId === id ? null : state.activeWorkspaceId;
					return { workspaces: filtered, activeWorkspaceId };
				}),

			addWidget: (workspaceId, widget) =>
				set((state) => ({
					workspaces: state.workspaces.map((ws) =>
						ws.id === workspaceId
							? { ...ws, widgets: [...ws.widgets, widget] }
							: ws,
					),
				})),

			moveWidget: (workspaceId, widgetId, position) =>
				set((state) => ({
					workspaces: state.workspaces.map((ws) =>
						ws.id === workspaceId
							? {
									...ws,
									widgets: ws.widgets.map((w) =>
										w.id === widgetId ? { ...w, position } : w,
									),
								}
							: ws,
					),
				})),

			updateWidget: (workspaceId, widget) =>
				set((state) => ({
					workspaces: state.workspaces.map((ws) =>
						ws.id === workspaceId
							? {
									...ws,
									widgets: ws.widgets.map((w) =>
										w.id === widget.id ? widget : w,
									),
								}
							: ws,
					),
				})),

			// Permet de remplacer tout l’état (pour l’import JSON)
			setState: (updater) =>
				set((state) => {
					const next = typeof updater === "function" ? updater(state) : updater;
					return typeof next === "object" ? next : {};
				}),
		}),
		{
			name: "mylowdesk-storage", // clé localStorage
			// (optionnel) : tu peux ajouter des options de migration ici
		},
	),
);
