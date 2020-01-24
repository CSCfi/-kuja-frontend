import "../i18n-config";
import { __ } from "i18n-for-browser";

export function getYleisetTiedotForm(isReadOnly) {
  return [
    {
      anchor: "edellytykset-tekstikentta",
      styleClasses: ["mb-6"],
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            isReadOnly: isReadOnly,
            placeholder: "",
            title: "Taloudelliset edellytykset",
            tooltip: {
              text: __("taloudelliset.yleisettiedot.kentta1.tooltip")
            },
            value: ""
          }
        }
      ]
    },
    {
      anchor: "Vaikutukset-tekstikentta",
      styleClasses: ["mb-6"],
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            isReadOnly: isReadOnly,
            placeholder: "",
            title: "Vaikutukset taloudellisten resurssien kohdentamiseen",
            tooltip: {
              text: __("taloudelliset.yleisettiedot.kentta2.tooltip")
            },
            value: ""
          }
        }
      ]
    },
    {
      anchor: "sopeuttaminen-tekstikentta",
      styleClasses: [""],
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            isReadOnly: isReadOnly,
            placeholder: "",
            title: "Toiminnan ja talouden sopeuttaminen",
            tooltip: {
              text: __("taloudelliset.yleisettiedot.kentta3.tooltip")
            },
            value: ""
          }
        }
      ]
    }
  ];
}

export function getTaloudellisetlomake(action, data, isReadOnly) {
  switch (action) {
    case "yleisettiedot":
      return getYleisetTiedotForm(isReadOnly);
    default:
      return [];
  }
}
