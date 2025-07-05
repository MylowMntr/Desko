export type WidgetType = "iframe" | "note" | "todo" | "counter" | "clock";

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
export interface CounterWidget extends WidgetBase {
  type: "counter";
  config: { value: number };
}
export interface ClockWidget extends WidgetBase {
  type: "clock";
  config: { timezone?: string }; // optionnel
}

export type Widget =
  | IframeWidget
  | NoteWidget
  | TodoWidget
  | CounterWidget
  | ClockWidget;