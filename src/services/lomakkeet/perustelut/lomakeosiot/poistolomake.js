export default function getDefaultRemovalForm() {
  return [
    {
      anchor: "removal",
      components: [
        {
          anchor: "textbox",
          name: "TextBox",
          properties: {
            placeholder: "Syitä voi olla monia. Sana on vapaa...",
            title: "Perustelut poistolle"
          }
        }
      ]
    }
  ];
}
