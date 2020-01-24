import "../i18n-config";
import { __ } from "i18n-for-browser";

function getYleisetTiedotForm(isReadOnly) {
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

function getTilinpaatostiedotForm(isReadOnly) {
  return [
    {
      anchor: "tilinpaatostiedot",
      styleClasses: ["mb-2"],
      components: [
        {
          anchor: "omavaraisuusaste",
          name: "Input",
          styleClasses: ["px-2 w-full sm:w-1/2 md:w-1/3"],
          properties: {
            fullWidth: true,
            isReadOnly: isReadOnly,
            label: __("taloudelliset.omavaraisuusaste"),
            type: "number",
            value: ""
          }
        },
        {
          anchor: "maksuvalmius",
          name: "Input",
          styleClasses: ["px-2 w-full sm:w-1/2 md:w-1/3"],
          properties: {
            fullWidth: true,
            isReadOnly: isReadOnly,
            label: __("taloudelliset.maksuvalmius"),
            type: "number",
            value: ""
          }
        },
        {
          anchor: "velkaantuneisuus",
          name: "Input",
          styleClasses: ["px-2 w-full sm:w-1/2 md:w-1/3"],
          properties: {
            fullWidth: true,
            isReadOnly: isReadOnly,
            label: __("taloudelliset.velkaantuneisuus"),
            type: "number",
            value: ""
          }
        },
        {
          anchor: "kannattavuus",
          name: "Input",
          styleClasses: ["px-2 w-full sm:w-1/2 md:w-1/3"],
          properties: {
            fullWidth: true,
            isReadOnly: isReadOnly,
            label: __("taloudelliset.kannattavuus"),
            type: "number",
            value: ""
          }
        },
        {
          anchor: "jaama",
          name: "Input",
          styleClasses: ["px-2 w-full sm:w-1/2 md:w-2/3"],
          properties: {
            fullWidth: true,
            isReadOnly: isReadOnly,
            label: __("taloudelliset.kumulatiivinen"),
            type: "number",
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
    case "tilinpaatostiedot":
      return getTilinpaatostiedotForm(isReadOnly);
    default:
      return [];
  }
}
