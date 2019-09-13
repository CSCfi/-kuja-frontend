import {isInLupa} from "../../../../css/label";
/*
2. Toiminnalliset edellytykset laajennetun oppisopimus järjestämistehtävän järjestämiseksi




 */
export const oppisopimusStory = {
  changes: [],
  categories: [
    {
      anchor: `1`,
      title: "Laajennettu oppisopimuskoulutuksen järjestämistehtävä",
      components: [
        {
          anchor: "tehtavan-tarpeellisuus-label",
          name: "StatusTextRow",
          properties: {
            code: 1,
            labelStyles: {},
            title: "Tehtävän tarpeellisuus"
          }
        }
      ],
      categories: [
        {
          anchor: "tehtavan-tarpeellisuus-field",
          components: [
            {
              anchor: "A",
              name: "TextBox",
              properties: {
                placeholder:
                  "Perustelkaa tehtävän tarpeellisuus ensisijaisella toiminta-alueellanne"
              }
            }
          ]
        }
      ]
    },
    {
      anchor: `2`,
      title: "",
      components: [
        {
          anchor: "toiminnalliset-edellytykset-label",
          name: "StatusTextRow",
          properties: {
            code: 2,
            labelStyles: {},
            title: "Toiminnalliset edellytykset laajennetun oppisopimus järjestämistehtävän järjestämiseksi"
          }
        }
      ],
      categories: [
        {
          anchor: "henkilostoresurssit-field",
          components: [
            {
              anchor: "A",
              name: "TextBox",
              properties: {
                placeholder:
                  "Haetun tehtävän edellyttämät henkilöstöresurssit (mm. tehtävän edellyttämä henkilöstön määrä, sekä rekrytoitavien määrä). Huom. Henkilötietoja ei tule antaa lomakkeella."
              }
            }
          ]
        },
        {
          anchor: "osaaminen-field",
          components: [
            {
              anchor: "A",
              name: "TextBox",
              properties: {
                placeholder:
                "Haetun tehtävän järjestämisen edellyttämä osaaminen (mm. palveluprosessi, hankintaosaaminen, johtaminen ja sopimusten valvonta)."
              }
            }
          ]
        },
        {
          anchor: "sidosryhmayhteistyo-field",
          components: [
            {
              anchor: "A",
              name: "TextBox",
              properties: {
                placeholder:
                  "Haetun tehtävän edellyttämät toimivat ja kokonaisvaltaiset työelämäyhteydet ja -palvelut ja muu sidosryhmäyhteistyö (mm. toimijat, toiminta- ja yhteistyömuodot)."
              }
            }
          ]
        }
      ]
    },
    {
      anchor: `3`,
      title: "",
      components: [
        {
          anchor: "arvio-label",
          name: "StatusTextRow",
          properties: {
            code: 3,
            labelStyles: {},
            title: "Arvio koulutukseen suunnattavista opiskelijavuosista seuraavana kolmena vuotena"
          }
        }
      ],
      categories: [
        {
          anchor: "arvio-opiskelijavuodet-label",
          name: "StatusTextRow",
          properties: {
            labelStyles: {},
            title: "Merkitkää arvionne tehtävään kohdistettavista opiskelijavuosista po. vuosina.",
            withoutMargin: true
          }
        },
        {
          anchor: "arvio-opiskelijavuodet-input-field",
          name: "Input",
          properties: {
            type: 'number'
          }
        },

      ]
    }
  ]
};
