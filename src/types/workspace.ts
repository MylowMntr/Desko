// /src/types/workspace.ts

import type { Widget } from "./widget";

export interface Workspace {
	id: string;
	name: string;
	widgets: Widget[];
	// Optionnel : layout, préférences, etc.
}
