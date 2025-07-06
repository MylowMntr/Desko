export type WidgetType = "iframe" | "note" | "todo"| "clock" | "kanban";

export interface WidgetBase {
  id: string;
  type: WidgetType;
  title: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
}

export interface IframeWidget extends WidgetBase {
  type: "iframe";
  config: { url: string };
}
export interface NoteWidget extends WidgetBase {
  type: "note";
  config: { content: string };
}
export interface TodoWidget extends WidgetBase {
  type: "todo";
  config: { items: { id: string; text: string; done: boolean }[] };
}

export interface ClockWidget extends WidgetBase {
  type: "clock";
  config: { timezone?: string }; // optionnel
}

export interface KanbanWidget extends WidgetBase {
  type: "kanban";
  config: { items: { id: string; status: string; summary: string }[] };
}

export type Widget =
  | IframeWidget
  | NoteWidget
  | TodoWidget
  | ClockWidget
  | KanbanWidget