// /src/types/app-state.ts

import type { Workspace } from "./workspace";

export interface AppState {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
}
