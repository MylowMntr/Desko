import type { Widget } from "./widget";

export interface Workspace {
	id: string;
	name: string;
	widgets: Widget[];
}
