// /app/store/appStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppState, Widget, Workspace } from "@/types";

// Typage du store Zustand
interface MylowDeskStore extends AppState {
	addWorkspace: (ws: Workspace) => void;
	setActiveWorkspace: (id: string) => void;
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
	  removeWorkspace: (workspaceId: string) => void;
  removeWidget: (workspaceId: string, widgetId: string) => void;
	renameWorkspace: (workspaceId: string, newName: string) => void;
}

export const useMylowDeskStore = create(
	persist<MylowDeskStore>(
		(set) => ({
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

			renameWorkspace: (workspaceId, newName) =>
				set((state) => ({
					workspaces: state.workspaces.map((ws) =>
						ws.id === workspaceId ? { ...ws, name: newName } : ws
					),
				})),

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
				removeWorkspace: (workspaceId) =>
					set((state) => ({
					workspaces: state.workspaces.filter((ws) => ws.id !== workspaceId),
					activeWorkspaceId:
						state.activeWorkspaceId === workspaceId ? null : state.activeWorkspaceId,
					}
				)
			),

			removeWidget: (workspaceId, widgetId) =>
					set((state) => ({
					workspaces: state.workspaces.map((ws) =>
						ws.id === workspaceId
						? {
							...ws,
							widgets: ws.widgets.filter((w) => w.id !== widgetId),
							}
						: ws
					),
				})),
			}),
		{
			name: "mylowdesk-storage", // clé localStorage
			// (optionnel) : tu peux ajouter des options de migration ici
		},
	),
);
