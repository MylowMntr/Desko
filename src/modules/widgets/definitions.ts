export const widgetDefinitions = {
  iframe: {
    label: "Iframe",
    fields: [
      { key: "url", label: "URL", type: "text", placeholder: "https://..." }
    ],
    initialConfig: { url: "" }
  },
  note: {
    label: "Note éditable",
    fields: [
      { key: "content", label: "Contenu", type: "textarea", placeholder: "Votre note..." }
    ],
    initialConfig: { content: "" }
  },
  todo: {
    label: "To-do list",
    fields: [], // Pas de champ initial, items sera [] par défaut
    initialConfig: { items: [] }
  },
  counter: {
    label: "Compteur",
    fields: [],
    initialConfig: { value: 0 }
  },
  clock: {
    label: "Horloge",
    fields: [
      { key: "timezone", label: "Fuseau horaire", type: "text", placeholder: "Europe/Paris" }
    ],
    initialConfig: { timezone: "" }
  }
} as const;
