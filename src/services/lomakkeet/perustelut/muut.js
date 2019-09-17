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
        opiskelijavuodet(4, 4)
      ]
    }
  ];
};

export const getVaativaErityinenTukilomake = () => {
  const code = 4;
  return [{
    anchor: "vaativa-erityinen-tuki-perustelut-lomake",
    styleClasses:
      ["px-10 py-10"],
    components:
      [
        {
          anchor: "vaativa-erityinen-tuki-perustelut-title",
          styleClasses: ["text-base"],
          name: "StatusTextRow",
          properties: {
            title: "Vaativan erityisen tuen tehtävä"
          }
        }
      ],
    categories:
      [
        {
          anchor: `${code}-0`,
          styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
          components: [
            {
              anchor: "koulutukset-label",
              styleClasses: ["text-base"],
              name: "StatusTextRow",
              properties: {
                labelStyles: {},
                title: "Vaativan erityisen tuen tehtävää on haettu seuraaviin koulutuksiin:"
              }
            }
          ],
          categories: [
            {
              anchor: "tutkintokoulutukseen-label",
              styleClasses: ["pl-6"],
              title: 'Tutkintokoulutukseen',
              categories: [
                {
                  anchor: "tutkintokoulutus-label",
                  styleClasses: ["pl-6"],
                  components: [
                    {
                      anchor: "A",
                      styleClasses: ["text-base"],
                      name: "StatusTextRow",
                      properties: {
                        labelStyles: {},
                      }
                    }
                  ]
                }
              ]
            },
            {
              anchor: "ammatilliseenkoulutukseen-label",
              styleClasses: ["pl-6"],
              title: 'Ammatilliseen koulutukseen valmentavaan koulutukseen',
              categories: [
                {
                  anchor: "ammatillinenkoulutus-label",
                  styleClasses: ["pl-6"],
                  components: [
                    {
                      anchor: "A",
                      styleClasses: ["text-base"],
                      name: "StatusTextRow",
                      properties: {
                        labelStyles: {},
                      }
                    }
                  ]
                }
              ]
            },
            {
              anchor: "tyohonjaitsenaiseenelamaan-label",
              styleClasses: ["pl-6"],
              title: 'Työhön ja itsenäiseen elämään valmentavaan koulutukseen',
              categories: [
                {
                  anchor: "tyohonjaitsenaiseenelamaan-label",
                  styleClasses: ["pl-6"],
                  components: [
                    {
                      anchor: "A",
                      styleClasses: ["text-base"],
                      name: "StatusTextRow",
                      properties: {
                        labelStyles: {},
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          anchor: `${code}-1`,
          styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
          components: [
            {
              anchor: "tehtavan-tarpeellisuus-label",
              styleClasses: ["text-base"],
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
              styleClasses: ["text-base"],
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
                      "Haetun tehtävän edellyttämät henkilöstöresurssit (mm. kelpoisuusehdot täyttävän opetushenkilöstön tai muu tehtävän edellyttämä henkilöstön määrä, sekä rekrytoitavien määrä). Huom. Henkilötietoja ei tule antaa lomakkeella."
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
                      "Haetun tehtävän järjestämisen edellyttämä osaaminen vaativasta erityisestä tuesta (mm. HOKS-prosessi, tuki- ja ohjauspalvelut)."
                  }
                }
              ]
            },
            {
              anchor: "jarjestelyt-field",
              title: 'Pedagogiset järjestelyt',
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
              anchor: "sidosryhmayhteistyo-field",
              title: 'Sidosryhmäyhteistyö',
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
              anchor: "suunnitelma-label",
              name: "StatusTextRow",
              styleClasses: ["text-base"],
              properties: {
                code: 3,
                labelStyles: {},
                title: "Suunnitelma vaativan erityisen tuen tehtävän järjestämiseksi"
              }
            }
          ],
          categories: [
            {
              anchor: "suunnitelma-field",
              styleClasses: ["pl-6"],
              components: [
                {
                  anchor: "A",
                  name: "TextBox",
                  properties: {
                    placeholder:
                      "Toimintamalli vaativan erityisen tuen tehtävän järjestämisen suunnittelusta ja toteutuksesta (strateginen suunnitelma, käytännön toteutusmalli ja laadun seuranta)."
                  }
                }
              ]
            }
          ]
        },
        opiskelijavuodet(4, 4)
      ]
  }]
}

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
        opiskelijavuodet(3, 3)

      ]
    },

  ]
}

const opiskelijavuodet = (code, anchorNumber) => {
  const year = new Date().getFullYear();
  return {
    anchor: `${code}-${anchorNumber}`,
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    components: [
      {
        name: "StatusTextRow",
        styleClasses: ["text-base"],
        properties: {
          labelStyles: {},
          code: code,
          title: "Arvio koulutukseen suunnattavista opiskelijavuosista "
        }
      }
    ],
    categories: [
      {
        anchor: `${code}-${anchorNumber}`,
        components: [
          {
            anchor: "opiskelijavuodet-header",
            name: "StatusTextRow",
            styleClasses: ["font-semibold pt-6"],
            properties: {
              labelStyles: {},
              title:
                "Merkitkää arvionne tehtävään kohdistettavista opiskelijavuosista po. vuosina."
            }
          },
        ],
        categories: [
          {
            anchor: "vuodet",
            styleClasses: ["flex sm:row"],
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
      }
    ]
  }
};
