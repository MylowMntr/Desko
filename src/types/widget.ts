// /src/types/widget.ts

export type WidgetType = "iframe" | "note" | "link" | "script";

export interface WidgetBase {
  id: string;
  type: WidgetType;
  title: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
}

export interface IframeWidget extends WidgetBase {
  type: "iframe";
  config: {
    url: string;
  };
}

export interface NoteWidget extends WidgetBase {
  type: "note";
  config: {
    content: string;
  };
}

export interface LinkWidget extends WidgetBase {
  type: "link";
  config: {
    url: string;
    label: string;
  };
}

export interface ScriptWidget extends WidgetBase {
  type: "script";
  config: {
    code: string;
  };
}

// Discriminated union pour tous les widgets
export type Widget = IframeWidget | NoteWidget | LinkWidget | ScriptWidget;
