import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppState, Widget, Workspace } from "@/types";

interface DeskoStore extends AppState {
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
		updater: (state: DeskoStore) => Partial<DeskoStore> | DeskoStore,
	) => void;
	removeWorkspace: (workspaceId: string) => void;
	removeWidget: (workspaceId: string, widgetId: string) => void;
	renameWorkspace: (workspaceId: string, newName: string) => void;
}

export const useDeskoStore = create(
	persist<DeskoStore>(
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
						ws.id === workspaceId ? { ...ws, name: newName } : ws,
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

			updateWidget: (workspaceId: string, widget: Widget) =>
				set((state) => ({
					workspaces: state.workspaces.map((ws) =>
						ws.id === workspaceId
							? {
									...ws,
									widgets: ws.widgets.map((w: Widget) =>
										w.id === widget.id ? { ...w, ...widget } : w,
									),
								}
							: ws,
					),
				})),

			setState: (updater) =>
				set((state) => {
					const next = typeof updater === "function" ? updater(state) : updater;
					return typeof next === "object" ? next : {};
				}),

			removeWorkspace: (workspaceId) =>
				set((state) => ({
					workspaces: state.workspaces.filter((ws) => ws.id !== workspaceId),
					activeWorkspaceId:
						state.activeWorkspaceId === workspaceId
							? null
							: state.activeWorkspaceId,
				})),

			removeWidget: (workspaceId, widgetId) =>
				set((state) => ({
					workspaces: state.workspaces.map((ws) =>
						ws.id === workspaceId
							? {
									...ws,
									widgets: ws.widgets.filter((w) => w.id !== widgetId),
								}
							: ws,
					),
				})),
		}),
		{
			name: "desko-storage", // localStorage key
			// (optional) : you can add migration options here
		},
	),
);
