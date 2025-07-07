export const widgetDefinitions = {
	iframe: {
		label: "Web integration (Iframe)",
		fields: [
			{ key: "url", label: "URL", type: "text", placeholder: "https://..." },
		],
		initialConfig: { url: "" },
	},
	note: {
		label: "Editable note",
		fields: [
			{
				key: "content",
				label: "Content",
				type: "textarea",
				placeholder: "Your note...",
			},
		],
		initialConfig: { content: "" },
	},
	todo: {
		label: "To-do list",
		fields: [], // No initial field, items will be [] by default
		initialConfig: { items: [] },
	},
	clock: {
		label: "Clock",
		fields: [
			{
				key: "timezone",
				label: "Timezone",
				type: "text",
				placeholder: "Europe/Paris",
			},
		],
		initialConfig: { timezone: "" },
	},
	kanban: {
		label: "Kanban",
		fields: [],
		initialConfig: { items: [] },
	},
} as const;
