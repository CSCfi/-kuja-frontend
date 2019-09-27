import { HAKEMUS_OTSIKOT } from "../../../locales/uusiHakemusFormConstants";

export const getKuljettajienJatkokoulutuslomake = (
  addPeopleFormCallback,
  peopleForms
) => {
  const code = 4;
  return [
    {
      anchor: code,
      styleClasses: ["px-10 py-10"],
      title: "Jatkokoulutusta antavan koulutuskeskuksen tehtävä",
      categories: [
        tehtavanTarpeellisuus(1, 1),
        voimassaOlo(2, 2),
        suunnitelma(3, 3),
        osaaminen(4, 4),
        johtaja(5, 5),
        opettajien(
          6,
          addPeopleFormCallback,
          peopleForms,
          6,
          "Selvitys jatkokoulutuksen opettajien kelpoisuuksista ja työkokemuksista"
        ),
        ajoneuvoKanta(7, 7),
        muutOpetusvalineet(8, 8)
      ]
    }
  ];
};

export const getKuljettajienPeruskoulutuslomake = (
  addPeopleFormCallback,
  peopleForms
) => {
  const code = 3;
  return [
    {
      anchor: code,
      styleClasses: ["px-10 py-10"],
      components: [
        {
          anchor: "tehtavan-tarpeellisuus-title",
          name: "StatusTextRow",
          properties: {
            title:
              "Perustason ammattipätevyyskoulutusta antavan koulutuskeskuksen tehtävä "
          }
        }
      ],
      categories: [
        tehtavanTarpeellisuus(1, 1),
        voimassaOlo(2, 2),
        suunnitelma(3, 3),
        johtaja(4, 4),
        opettajien(
          5,
          addPeopleFormCallback,
          peopleForms,
          5,
          "Selvitys perustason ammattipätevyyskoulutusen opettajien kelpoisuuksista ja työkokemuksista"
        ),
        ajoneuvoKanta(6, 6),
        muutOpetusvalineet(7, 7)
      ]
    }
  ];
};

export const getAddPeopleForm = orderNumber => {
  return {
    anchor: orderNumber,
    styleClasses: ["border-t pl-6 py-8"],
    categories: [
      {
        anchor: "henkilon-nimi",
        name: "StatusTextRow",
        styleClasses: ["text-base"],
        title: `Henkilö ${orderNumber}`,
        components: [
          {
            anchor: "A",
            name: "TextBox",
            properties: {
              labelStyles: {},
              placeholder: "Henkilön nimi"
            }
          }
        ]
      },
      {
        anchor: "patevyydet",
        styleClasses: ["pl-0"],
        categories: [
          {
            anchor: "liikenneopettajalupa",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-liikenneopettajalupa",
                  title: "Liikenneopettajalupa (pakollinen)",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "kuorma-autonkuljettaja",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-kuorma-autonkuljettaja",
                  title:
                    "Voimassa oleva kuorma-autonkuljettajan ammattipätevyys",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "linja-autonkuljettaja",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-linja-autonkuljettaja",
                  title:
                    "Voimassa oleva linja-autonkuljettajan ammattipätevyys",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          }
        ]
      },
      {
        anchor: `paatoiminen-kuljettaja-info`,
        code: "a)",
        styleClasses: ["pl-0 pt-6"],
        title:
          "Vähintään 1 vuoden kokemus johonkin seuraavista luokista kuuluvan ajoneuvonpäätoimisena kuljettajana:",
        categories: [
          {
            anchor: "C-luokka",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-c-luokka",
                  title: "C-luokka",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "CE-luokka",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-ce-luokka",
                  title: "CE-luokka",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "D-luokka",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-d-luokka",
                  title: "D-luokka",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          }
        ]
      },
      {
        anchor: `jokin-tutkinnoista`,
        code: "b)",
        styleClasses: ["pl-0 pt-6"],
        title: "Jokin seuraavista tutkinnoista:",
        categories: [
          {
            anchor: "linja-auto-ammattitutkinto",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-linja-auto-ammattitutkinto",
                  title: "Linja-auton kuljettajan ammattitutkinto",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "yhdistelmäajoneuvo-ammattitutkinto",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-yhdistelmäajoneuvo-ammattitutkinto",
                  title: "Yhdistelmäajoneuvonkuljettajan ammattitutkinto",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "puutavara-autokuljetus-ammattitutkinto",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-puutavara-autokuljetus-ammattitutkinto",
                  title: "Puutavaran autonkuljetuksen ammattitutkinto",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "kuljetuspalvelut-logistiikan-perustutkinto",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-kuljetuspalvelut-logistiikan-perustutkinto",
                  title:
                    "Kuljetuspalvelujen koulutusohjelmassa suoritettu logistiikan perustutkinto",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "kuljetusalan-ammattitutkinto",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-kuljetusalan-ammattitutkinto",
                  title: "Kuljetusalan ammattitutkinto",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          }
        ]
      }
    ]
  };
};

const tehtavanTarpeellisuus = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    code: orderCode,
    title: "Tehtävän tarpeellisuus",
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
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
  };
};

const voimassaOlo = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    code: orderCode,
    title:
      "Onko hakijalla voimassa olevaa Liikenne- ja turvallisuusviraston (Trafi) myöntämää lupaa järjestää ammattipätevyyskoulutusta?",
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    categories: [
      {
        anchor: "voimassaolo-field-no",
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "RadioButtonWithLabel",
            properties: {
              name: "voimassaolo-field-radio-no",
              code: 1,
              title: "Ei",
              labelStyles: {},
              isChecked: false
            }
          }
        ]
      },
      {
        anchor: "voimassaolo-field-yes",
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "RadioButtonWithLabel",
            properties: {
              name: "voimassaolo-field-radio-yes",
              code: 2,
              title: "Kyllä",
              labelStyles: {},
              isChecked: false
            }
          }
        ]
      }
    ]
  };
};

const suunnitelma = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    code: orderCode,
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    title: "Suunnitelma ammattipätevyyskoulutuksen järjestämiseksi",
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
                "Toimintamalli ammattipätevyyskoulutuksen suunnittelusta ja toteutuksesta."
            }
          }
        ]
      }
    ]
  };
};

const osaaminen = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    code: orderCode,
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    title: "Koulutusohjelmien edellyttämä osaaminen",
    categories: [
      {
        anchor: "osaaminen-field",
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "TextBox",
            properties: {
              placeholder: "Kerro osaamisesta?"
            }
          }
        ]
      }
    ]
  };
};

const johtaja = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    code: orderCode,
    title: "Opetuksesta vastaavan johtajan kelpoisuus ja työkokemus",
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    categories: [
      {
        anchor: `johtaja-info`,
        code: "!",
        styleClasses: ["pl-6"],
        title:
          "Valtioneuvoston asetus 434/2018 10 § Selvitys opetuksesta vastaavan johtajan/johtajien kelpoisuudesta ja työkokemuksesta toimipisteittäin.",
        components: [
          {
            anchor: "A",
            name: "TextBox",
            properties: {
              placeholder: "Sana on vapaa..."
            }
          }
        ]
      },
      {
        anchor: "patevyydet",
        styleClasses: ["pl-6"],
        categories: [
          {
            anchor: "liikenneopettajalupa",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-liikenneopettajalupa",
                  title: "Liikenneopettajalupa (pakollinen)",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "kuorma-autonkuljettaja",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-kuorma-autonkuljettaja",
                  title:
                    "Voimassa oleva kuorma-autonkuljettajan ammattipätevyys",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "linja-autonkuljettaja",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-linja-autonkuljettaja",
                  title:
                    "Voimassa oleva linja-autonkuljettajan ammattipätevyys",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          }
        ]
      },
      {
        anchor: `paatoiminen-kuljettaja-info`,
        code: "a)",
        title:
          "Vähintään 1 vuoden kokemus johonkin seuraavista luokista kuuluvan ajoneuvonpäätoimisena kuljettajana:",
        styleClasses: ["pl-6 pt-6"],
        categories: [
          {
            anchor: "C-luokka",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-c-luokka",
                  title: "C-luokka",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "CE-luokka",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-ce-luokka",
                  title: "CE-luokka",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "D-luokka",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-d-luokka",
                  title: "D-luokka",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          }
        ]
      },
      {
        anchor: `jokin-tutkinnoista`,
        code: "b)",
        title: "Jokin seuraavista tutkinnoista:",
        styleClasses: ["pl-6 pt-6"],
        categories: [
          {
            anchor: "linja-auto-ammattitutkinto",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-linja-auto-ammattitutkinto",
                  title: "Linja-auton kuljettajan ammattitutkinto",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "yhdistelmäajoneuvo-ammattitutkinto",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-yhdistelmäajoneuvo-ammattitutkinto",
                  title: "Yhdistelmäajoneuvonkuljettajan ammattitutkinto",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "puutavara-autokuljetus-ammattitutkinto",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-puutavara-autokuljetus-ammattitutkinto",
                  title: "Puutavaran autonkuljetuksen ammattitutkinto",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "kuljetuspalvelut-logistiikan-perustutkinto",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-kuljetuspalvelut-logistiikan-perustutkinto",
                  title:
                    "Kuljetuspalvelujen koulutusohjelmassa suoritettu logistiikan perustutkinto",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          },
          {
            anchor: "kuljetusalan-ammattitutkinto",
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "checkbox-kuljetusalan-ammattitutkinto",
                  title: "Kuljetusalan ammattitutkinto",
                  labelStyles: {},
                  isChecked: false
                }
              }
            ]
          }
        ]
      },
      {
        anchor: "liitteet",
        styleClasses: ["pl-6 pt-6"],
        title: "Liitteet",
        categories: [
          {
            anchor: "info",
            components: [
              {
                anchor: "A",
                name: "StatusTextRow",
                properties: {
                  title: HAKEMUS_OTSIKOT.LIITE_OHJE.FI
                }
              }
            ]
          },
          {
            components: [
              {
                anchor: "A",
                name: "Attachments",
                properties: {}
              }
            ]
          }
        ]
      }
    ]
  };
};

const opettajien = (
  anchorNumber,
  addPeopleFormCallback,
  peopleForms,
  orderCode,
  helpText
) => {
  return {
    anchor: anchorNumber,
    code: orderCode,
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    title: "Opettajien kelpoisuus ja työkokemus",
    categories: [
      {
        anchor: `opettajien-kelpoisuus-ja-tyokokemus-info`,
        code: "!",
        title:
          "Valtioneuvoston asetus 434/2018 10 §. Selvitys perustason ammattipätevyyskoulutusen opettajien kelpoisuuksista ja työkokemuksista.",
        styleClasses: ["pl-6"]
      },
      {
        anchor: `opettajien-kelpoisuus-ja-tyokokemus-info`,
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "StatusTextRow",
            styleClasses: ["py-4 text-base"],
            properties: {
              title: helpText
            }
          },
          {
            anchor: `lisaa-henkilo-painike`,
            name: "SimpleButton",
            onClick: addPeopleFormCallback,
            styleClasses: "flex justify-end",
            properties: {
              text: "Lisää henkilö"
            }
          }
        ]
      },

      {
        anchor: "lisatyt-henkilot",
        styleClasses: ["pt-6"],
        categories: peopleForms
      }
    ]
  };
};

const ajoneuvoKanta = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    code: orderCode,
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    title: "Ajoneuvokanta",
    categories: [
      {
        anchor: `ajoneuvokanta-kentat`,
        styleClasses: ["pl-6"],
        title:
          "Selvitys opetuksessa käytettävästä ajoneuvokannasta ja opetusvälineistä ja niiden soveltuvuudesta ammattipätevyyskoulutukseen.",

        components: [
          {
            anchor: "linja-autoja",
            name: "Input",
            styleClasses: ["mt-6"],
            properties: {
              fullWidth: true,
              label: "Linja-autoja",
              placeholder: "Linja-autoja",
              type: "number"
            }
          },
          {
            anchor: "kuorma-autoja",
            name: "Input",
            styleClasses: ["mt-6"],
            properties: {
              fullWidth: true,
              label: "Kuorma-autoja",
              placeholder: "Kuorma-autoja",
              type: "number"
            }
          },
          {
            anchor: "peravaunuja",
            name: "Input",
            styleClasses: ["mt-6"],
            properties: {
              fullWidth: true,
              label: "Perävaunuja",
              placeholder: "Perävaunuja",
              type: "number"
            }
          }
        ]
      }
    ]
  };
};

const muutOpetusvalineet = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    code: orderCode,
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    title: "Muut opetusvälineet",
    categories: [
      {
        anchor: `asetuksen-mukaiset`,
        code: "!",
        styleClasses: ["pl-6"],
        title:
          "Asetuksen mukaiset opetus- ja havaintovälineet (VnAsetus 434/2018, 11 § 1 ja 2 mom.)",
        components: [
          {
            anchor: "A",
            name: "TextBox",
            properties: {}
          }
        ]
      },
      {
        anchor: "muut",
        styleClasses: ["pl-6"],
        title: "Muut opetus- ja havaintovälineet",

        components: [
          {
            anchor: "B",
            name: "TextBox",
            properties: {
              labelStyles: {},
              placeholder:
                "Muut oppilaitoksen oppimisympäristöissä tapahtuvaan osaamisen hankkimiseen liittyvät välineet"
            }
          }
        ]
      }
    ]
  };
};
