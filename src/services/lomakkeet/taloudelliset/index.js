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

export function getInvestoinnitForm(isReadOnly) {
  return [
    {
      anchor: "investoinnit-tekstikentta",
      title: "Tarvittavat investoinnit",
      styleClasses: ["mb-6 font-normal"],
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            isReadOnly: isReadOnly,
            placeholder: "",
            tooltip: {
              text: __("taloudelliset.tooltipTaloudellisetInvestoinnitKentta1")
            }
          }
        }
      ]
    },
    {
      anchor: "kustannukset-header",
      styleClasses: [""],
      components: [
        {
          anchor: "label",
          name: "StatusTextRow",
          styleClasses: ["font-semibold text-base"],
          properties: {
            title: "Investoinnin kustannukset"
          }
        }
      ]
    },
    {
      anchor: "kustannukset-Input",
      styleClasses: ["flex sm:row mb-6"],
      components: [
        {
          anchor: "A",
          name: "Input",
          styleClasses: [""],
          properties: {
            isReadOnly: isReadOnly,
            withoutMargin: true,
            type: "number",
            tooltip: {
              text: __("taloudelliset.tooltipTaloudellisetInvestoinnitKentta2")
            }
          }
        }
      ]
    },
    {
      anchor: "rahoitus-tekstikentta",
      title: "Investointien rahoitus",
      styleClasses: [""],
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            isReadOnly: isReadOnly,
            placeholder: "",
            tooltip: {
              text: __("taloudelliset.tooltipTaloudellisetInvestoinnitKentta3")
            }
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
    case "investoinnit":
      return getInvestoinnitForm(isReadOnly);
    default:
      return [];
  }
}
