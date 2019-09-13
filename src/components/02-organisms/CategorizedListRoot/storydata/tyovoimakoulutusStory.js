export const tyovoimakoulutusStory = {
  changes: [],
  categories: [
    {
      anchor: `1`,
      title: "Työvoimakoulutuksen tehtävä",
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
          anchor: "pedagogisetjarjestelyt-field",
          components: [
            {
              anchor: "A",
              name: "TextBox",
              properties: {
                placeholder:
                  "Haetun tehtävän edellyttämä työelämäpalvelu ja muu sidosryhmäyhteistyö (mm. toimijat, toiminta- ja yhteistyömuodot)."
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
          anchor: "suunnitelma-label",
          name: "StatusTextRow",
          properties: {
            code: 3,
            labelStyles: {},
            title: " Suunnitelma työvoimakoulutuksen järjestämiseksi"
          }
        }
      ],
      categories: [
        {
          anchor: "suunnitelma-field",
          components: [
            {
              anchor: "A",
              name: "TextBox",
              properties: {
                placeholder:
                  "Toimintamalli työvoimakoulutuksen suunnittelusta ja toteutuksesta (mm. koulutusalat, joille työvoimakoulutusta aiotaan järjestää)."
              }
            }
          ]
        }
      ]
    },
    {
      anchor: `4`,
      title: "",
      components: [
        {
          anchor: "ely-label",
          name: "StatusTextRow",
          properties: {
            code: 4,
            labelStyles: {},
            title: "ELY-keskusten kanssa suunniteltu yhteistyö"
          }
        }
      ],
      categories: [
        {
          anchor: "ely-autocomplete",
          components: [
            {
              anchor: "A",
              name: "Autocomplete",
              properties: {
                options: [
                    {label: "A", value: "A"},
            {label: "B", value: "B"},
            {label: "C", value: "C"}
          ]

              }
            }
          ]
        }
      ]
    }
  ]
};
