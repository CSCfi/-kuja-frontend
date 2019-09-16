export const getVankilaopetusPerustelulomake = () => {
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
          categories: [opiskelijavuodet(code, 1)]
        }
      ]
    }
  ];
};

export const getOppisopimusPerusteluLomake = () => {
  const code = 4;
  return [
    {
      anchor: "oppisopimus-perustelut-lomake",
      styleClasses: ["px-10 py-10"],
      components: [
        {
          anchor: "oppisopimus-perustelut-title",
          name: "StatusTextRow",
          properties: {
            title: "Laajennettu oppisopimuskoulutuksen järjestämistehtävä"
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
              title: 'Henkilöstöresurssit',
              styleClasses: ["pl-6"],
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
              title: 'Osaaminen',
              styleClasses: ["pl-6"],
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
              title: 'Sidosryhmäyhteistyö',
              styleClasses: ["pl-6"],
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
          anchor: `${code}-4`,
          styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
          categories: [opiskelijavuodet(4, 4)]
        }

      ]
    },

  ]
}

const opiskelijavuodet = (code, anchorNumber) => {
  const year = new Date().getFullYear();
  return {
    anchor: `${code}-${anchorNumber}`,
    styleClasses: [""],
    components: [
      {
        anchor: "opiskelijavuodet-header",
        name: "StatusTextRow",
        styleClasses: ["text-base"],
        properties: {
          code: code,
          labelStyles: {},
          title:
            "Arvio koulutukseen suunnattavista opiskelijavuosista seuraavana kolmena vuotena"
        }
      }
    ],
    categories: [
      {
        anchor: "vuodet",
        styleClasses: ["pl-6 flex sm:row"],
        components: [
          {
            anchor: "A",
            name: "Input",
            styleClasses: ["mr-8"],
            properties: {
              withoutMargin: true,
              label: year + 1,
              type: "number",
              width: "7em"
            }
          },
          {
            anchor: "B",
            name: "Input",
            styleClasses: ["mr-8"],
            properties: {
              withoutMargin: true,
              label: year + 2,
              type: "number",
              width: "7em"
            }
          },
          {
            anchor: "C",
            name: "Input",
            properties: {
              withoutMargin: true,
              label: year + 3,
              type: "number",
              width: "7em"
            }
          }
        ]
      }
    ]
  };
};
