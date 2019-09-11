export const getVankilaopetusPerustelulomake = (
  addPeopleFormCallback,
  peopleForms
) => {
  const code = 4;
  return [
    {
      anchor: "vankilaopetus",
      styleClasses: ["px-10 py-10"],
      components: [
        {
          anchor: "tehtavan-tarpeellisuus-title",
          name: "StatusTextRow",
          properties: {
            title: "Vankilaopetuksen järjestämistehtävä"
          }
        }
      ],
      categories: [
        {
          anchor: `${code}-1`,
          styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
          components: [
            {
              anchor: "tehtavan-tarpeellisuus-label",
              name: "StatusTextRow",
              styleClasses: ["text-base"],
              properties: {
                code: 1,
                title: "Tehtävän tarpeellisuus"
              }
            }
          ],
          categories: [
            {
              anchor: "tehtavan-tarpeellisuus-field",
              styleClasses: ["pl-6"],
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
          anchor: `${code}-2`,
          styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
          components: [
            {
              anchor: "edellytykset-label",
              name: "StatusTextRow",
              styleClasses: ["pb-4 text-base"],
              properties: {
                code: 2,
                title:
                  "Toiminnalliset edellytykset vankilaopetuksen järjestämiseksi"
              }
            }
          ],
          categories: [
            {
              anchor: `resurssit-label`,
              styleClasses: ["font-semibold pl-6 pt-6"],
              components: [
                {
                  anchor: "A",
                  name: "StatusTextRow",
                  styleClasses: ["pb-4 text-base"],
                  properties: {
                    title: "Henkilöstöresurssit"
                  }
                }
              ]
            },
            {
              anchor: "resurssit-field",
              styleClasses: ["pl-6"],
              components: [
                {
                  anchor: "A",
                  name: "TextBox",
                  properties: {
                    placeholder:
                      "Haetun tehtävän edellyttämät henkilöstöresurssit (mm. kelpoisuusehdot täyttävän opetushenkilöstön tai muu tehtävän edellyttämä henkilöstön määrä, sekä rekrytoitavien määrä). Huom. Henkilötietoja ei tule antaa lomakkeella."
                  }
                }
              ]
            },
            {
              anchor: `osaaminen-label`,
              styleClasses: ["font-semibold pl-6 pt-6"],
              components: [
                {
                  anchor: "A",
                  name: "StatusTextRow",
                  styleClasses: ["pb-4 text-base"],
                  properties: {
                    title: "Osaaminen"
                  }
                }
              ]
            },
            {
              anchor: "osaaminen-field",
              styleClasses: ["pl-6"],
              components: [
                {
                  anchor: "A",
                  name: "TextBox",
                  properties: {
                    placeholder:
                      "Haetun tehtävän järjestämisen edellyttämä osaaminen vaativasta erityisestä tuesta (mm. HOKS-prosessi, tuki- ja ohjauspalvelut)."
                  }
                }
              ]
            },
            {
              anchor: "jarjestelyt-label",
              styleClasses: ["font-semibold pl-6 pt-6"],
              components: [
                {
                  anchor: "A",
                  name: "StatusTextRow",
                  styleClasses: ["pb-4 text-base"],
                  properties: {
                    title: "Pedagogiset järjestelyt"
                  }
                }
              ]
            },
            {
              anchor: "jarjestelyt-field",
              styleClasses: ["pl-6"],
              components: [
                {
                  anchor: "A",
                  name: "TextBox",
                  properties: {
                    placeholder:
                      "Haetun tehtävän edellyttämät pedagogiset järjestelyt (mm. opetusjärjestelyt, oppimisympäristöt, tilat ja välineet)."
                  }
                }
              ]
            },
            {
              anchor: "yhteistyo-label",
              styleClasses: ["font-semibold pl-6 pt-6"],
              components: [
                {
                  anchor: "A",
                  name: "StatusTextRow",
                  styleClasses: ["pb-4 text-base"],
                  properties: {
                    title: "Sidosryhmäyhteistyö"
                  }
                }
              ]
            },
            {
              anchor: "yhteistyo-field",
              styleClasses: ["pl-6"],
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
            }
          ]
        },
        {
          anchor: `${code}-3`,
          styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
          components: [
            {
              anchor: "toteuttaminen-header",
              name: "StatusTextRow",
              styleClasses: ["text-base"],
              properties: {
                code: 3,
                labelStyles: {},
                title: "Vankilaopetuksen toteuttaminen"
              }
            }
          ],
          categories: [
            {
              anchor: "toteuttaminen-missa-label",
              styleClasses: ["font-semibold pl-6 pt-6"],
              components: [
                {
                  anchor: "A",
                  name: "StatusTextRow",
                  styleClasses: ["text-base"],
                  properties: {
                    title: "Vankila/t missä opetusta aiotaan järjestää"
                  }
                }
              ]
            },
            {
              anchor: "toteuttaminen-missa-info",
              styleClasses: ["pl-6"],
              components: [
                {
                  anchor: "A",
                  name: "StatusTextRow",
                  styleClasses: ["text-base"],
                  properties: {
                    title:
                      "Valitkaa listasta ne vankilat, joissa suunnittelette järjestävänne vankilaopetusta."
                  }
                }
              ]
            },
            {
              anchor: "toteuttaminen-missa-select",
              styleClasses: ["pl-6 pt-6"],
              components: [
                {
                  anchor: "A",
                  name: "Autocomplete",
                  styleClasses: ["pb-4 text-base"]
                }
              ]
            }
          ]
        },
        {
          anchor: `${code}-4`,
          styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
          components: [
            {
              anchor: "opiskelijavuodet-header",
              name: "StatusTextRow",
              styleClasses: ["text-base"],
              properties: {
                code: 4,
                labelStyles: {},
                title:
                  "Arvio koulutukseen suunnattavista opiskelijavuosista seuraavana kolmena vuotena"
              }
            }
          ],
          categories: [
            {
              anchor: "edellinenvuosi",
              components: [
                {
                  anchor: "A",
                  name: "TextBox"
                  // properties: {
                  //   initialValue: initialValue,
                  //   applyForValue: applyFor,
                  //   name: `${sectionId}-difference-1`,
                  //   titles
                  // }
                }
              ]
            },
            {
              anchor: "nykyinenvuosi",
              // title: props.intl.formatMessage(
              //   wizardMessages.limitForSpecialSupport
              // ),
              components: [
                {
                  anchor: "A",
                  name: "TextBox"
                  // properties: {
                  //   initialValue: initialValueVaativa,
                  //   applyForValue: applyForVaativa,
                  //   name: `${sectionId}-difference-2`,
                  //   titles
                  // }
                }
              ]
            },
            {
              anchor: "seuraavavuosi",
              // title: props.intl.formatMessage(
              //   wizardMessages.limitForBoardingSchool
              // ),
              components: [
                {
                  anchor: "A",
                  name: "TextBox"
                  // properties: {
                  //   initialValue: initialValueSisaoppilaitos,
                  //   applyForValue: applyForSisaoppilaitos,
                  //   name: `${sectionId}-difference-3`,
                  //   titles
                  // }
                }
              ]
            }
          ]
        }
      ]
    }
  ];
};
