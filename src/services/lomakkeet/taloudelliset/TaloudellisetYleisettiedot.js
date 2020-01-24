// import { useIntl } from "react-intl";
import wizardMessages from "../../../i18n/definitions/wizard";

export function getForm(isReadOnly) {
  // const intl = useIntl();
  return [
    {
      anchor: "edellytykset-tekstikentta",
      title: "Taloudelliset edellytykset",
      styleClasses: ["mb-6"],
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            isReadOnly: isReadOnly,
            placeholder: "",
            tooltip: {
              // text: intl.formatMessage(
              //   wizardMessages.tooltipTaloudellisetYleisetTiedotKentta1
              // )
            }
          }
        }
      ]
    },
    {
      anchor: "Vaikutukset-tekstikentta",
      title: "Vaikutukset taloudellisten resurssien kohdentamiseen",
      styleClasses: ["mb-6"],
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            isReadOnly: isReadOnly,
            placeholder: "",
            tooltip: {
              // text: intl.formatMessage(
              //   wizardMessages.tooltipTaloudellisetYleisetTiedotKentta2
              // )
            }
          }
        }
      ]
    },
    {
      anchor: "sopeuttaminen-tekstikentta",
      title: "Toiminnan ja talouden sopeuttaminen",
      styleClasses: [""],
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            isReadOnly: isReadOnly,
            placeholder: "",
            tooltip: {
              // text: intl.formatMessage(
              //   wizardMessages.tooltipTaloudellisetYleisetTiedotKentta3
              // )
            }
          }
        }
      ]
    }
  ];
}
