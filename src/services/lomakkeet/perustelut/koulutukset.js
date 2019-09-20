export const getKuljettajienJatkokoulutuslomake = (
  addPeopleFormCallback,
  peopleForms
) => {
  const code = 4;
  return [
    {
      anchor: code,
      styleClasses: ["px-10 py-10"],
      components: [
        {
          anchor: "tehtavan-tarpeellisuus-title",
          name: "StatusTextRow",
          properties: {
            title: "Jatkokoulutusta antavan koulutuskeskuksen tehtävä"
          }
        }
      ],
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
      anchor: "kuljettajien-peruskoulutuslomake",
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
          code,
          5,
          addPeopleFormCallback,
          peopleForms,
          5,
          "Selvitys perustason ammattipätevyyskoulutusen opettajien kelpoisuuksista ja työkokemuksista"
        ),
        ajoneuvoKanta(code, 6, 6),
        muutOpetusvalineet(code, 7, 7)
      ]
    }
  ];
};

export const getAddPeopleForm = orderNumber => {
  return {
    anchor: orderNumber,
    styleClasses: ["border-t py-8"],
    components: [
      {
        anchor: "henkilon-nimi-label",
        name: "StatusTextRow",
        styleClasses: ["text-base"],
        properties: {
          labelStyles: {},
          title: `Henkilö ${orderNumber}`
        }
      }
    ],
    categories: [
      {
        anchor: "form-title",
        styleClasses: ["ml-4"],
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
        anchor: "liikenneopettajalupa",
        styleClasses: ["pl-6"],
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
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "CheckboxWithLabel",
            properties: {
              name: "checkbox-kuorma-autonkuljettaja",
              title: "Voimassa oleva kuorma-autonkuljettajan ammattipätevyys",
              labelStyles: {},
              isChecked: false
            }
          }
        ]
      },
      {
        anchor: "linja-autonkuljettaja",
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "CheckboxWithLabel",
            properties: {
              name: "checkbox-linja-autonkuljettaja",
              title: "Voimassa oleva linja-autonkuljettajan ammattipätevyys",
              labelStyles: {},
              isChecked: false
            }
          }
        ]
      },
      {
        anchor: `paatoiminen-kuljettaja-info`,
        styleClasses: ["pl-6 pt-6"],
        components: [
          {
            anchor: "A",
            name: "StatusTextRow",
            styleClasses: ["pb-4 text-base"],
            properties: {
              code: "a)",
              title:
                "Vähintään 1 vuoden kokemus johonkin seuraavista luokista kuuluvan ajoneuvonpäätoimisena kuljettajana:"
            }
          }
        ]
      },
      {
        anchor: "C-luokka",
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
      },
      {
        anchor: `jokin-tutkinnoista`,
        styleClasses: ["pl-6 pt-6"],
        components: [
          {
            anchor: "A",
            name: "StatusTextRow",
            styleClasses: ["pb-4 text-base"],
            properties: {
              code: "b)",
              title: "Jokin seuraavista tutkinnoista:"
            }
          }
        ]
      },
      {
        anchor: "linja-auto-ammattitutkinto",
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
  };
};

const tehtavanTarpeellisuus = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    components: [
      {
        anchor: "tehtavan-tarpeellisuus-label",
        name: "StatusTextRow",
        styleClasses: ["text-base"],
        properties: {
          code: orderCode,
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
  };
};

const voimassaOlo = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    components: [
      {
        anchor: "voimassaolo-label",
        name: "StatusTextRow",
        styleClasses: ["pb-4 text-base"],
        properties: {
          code: orderCode,
          title:
            "Onko hakijalla voimassa olevaa Liikenne- ja turvallisuusviraston (Trafi) myöntämää lupaa järjestää ammattipätevyyskoulutusta?"
        }
      }
    ],
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
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    components: [
      {
        anchor: "suunnitelma-label",
        name: "StatusTextRow",
        styleClasses: ["text-base"],
        properties: {
          code: orderCode,
          labelStyles: {},
          title: "Suunnitelma ammattipätevyyskoulutuksen järjestämiseksi"
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
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    components: [
      {
        anchor: "osaaminen-label",
        name: "StatusTextRow",
        styleClasses: ["text-base"],
        properties: {
          code: orderCode,
          labelStyles: {},
          title: "Koulutusohjelmien edellyttämä osaaminen"
        }
      }
    ],
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
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    components: [
      {
        anchor: "johtaja-label",
        name: "StatusTextRow",
        styleClasses: ["py-4 text-base"],
        properties: {
          code: orderCode,
          title: "Opetuksesta vastaavan johtajan kelpoisuus ja työkokemus"
        }
      }
    ],
    categories: [
      {
        anchor: `johtaja-info`,
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "StatusTextRow",
            properties: {
              code: "!",
              labelStyles: {},
              title:
                "Valtioneuvoston asetus 434/2018 10 § Selvitys opetuksesta vastaavan johtajan/johtajien kelpoisuudesta ja työkokemuksesta toimipisteittäin."
            }
          }
        ]
      },
      {
        anchor: "johtaja-field",
        styleClasses: ["pl-6 pb-6"],
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
        anchor: "liikenneopettajalupa",
        styleClasses: ["pl-6"],
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
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "CheckboxWithLabel",
            properties: {
              name: "checkbox-kuorma-autonkuljettaja",
              title: "Voimassa oleva kuorma-autonkuljettajan ammattipätevyys",
              labelStyles: {},
              isChecked: false
            }
          }
        ]
      },
      {
        anchor: "linja-autonkuljettaja",
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "CheckboxWithLabel",
            properties: {
              name: "checkbox-linja-autonkuljettaja",
              title: "Voimassa oleva linja-autonkuljettajan ammattipätevyys",
              labelStyles: {},
              isChecked: false
            }
          }
        ]
      },
      {
        anchor: `paatoiminen-kuljettaja-info`,
        styleClasses: ["pl-6 pt-6"],
        components: [
          {
            anchor: "A",
            name: "StatusTextRow",
            styleClasses: ["pb-4 text-base"],
            properties: {
              code: "a)",
              title:
                "Vähintään 1 vuoden kokemus johonkin seuraavista luokista kuuluvan ajoneuvonpäätoimisena kuljettajana:"
            }
          }
        ]
      },
      {
        anchor: "C-luokka",
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
      },
      {
        anchor: `jokin-tutkinnoista`,
        styleClasses: ["pl-6 pt-6"],
        components: [
          {
            anchor: "A",
            name: "StatusTextRow",
            styleClasses: ["pb-4 text-base"],
            properties: {
              code: "b)",
              title: "Jokin seuraavista tutkinnoista:"
            }
          }
        ]
      },
      {
        anchor: "linja-auto-ammattitutkinto",
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
        styleClasses: ["ml-4 pl-10"],
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
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    components: [
      {
        anchor: "opettajien-kelpoisuus-ja-tyokokemus-label",
        name: "StatusTextRow",
        styleClasses: ["text-base"],
        properties: {
          code: orderCode,
          title: "Opettajien kelpoisuus ja työkokemus"
        }
      }
    ],
    categories: [
      {
        anchor: `opettajien-kelpoisuus-ja-tyokokemus-info`,
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "StatusTextRow",
            styleClasses: ["py-4"],
            properties: {
              withoutMargin: true,
              title: helpText
            }
          },
          {
            anchor: "B",
            name: "StatusTextRow",
            styleClasses: ["py-4"],
            properties: {
              code: "!",
              title:
                "Valtioneuvoston asetus 434/2018 10 §. Selvitys perustason ammattipätevyyskoulutusen opettajien kelpoisuuksista ja työkokemuksista."
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
        ],
        categories: [
          {
            anchor: "lisatyt-henkilot",
            styleClasses: ["pt-6"],
            categories: peopleForms
          }
        ]
      }
    ]
  };
};

const ajoneuvoKanta = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    components: [
      {
        anchor: "ajoneuvokanta-label",
        name: "StatusTextRow",
        styleClasses: ["text-base"],
        properties: {
          code: orderCode,
          labelStyles: {},
          title: "Ajoneuvokanta"
        }
      }
    ],
    categories: [
      {
        anchor: `opettajien-kelpoisuus-ja-tyokokemus-info`,
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "StatusTextRow",
            styleClasses: ["py-4"],
            properties: {
              title:
                "Selvitys opetuksessa käytettävästä ajoneuvokannasta ja opetusvälineistä ja niiden soveltuvuudesta ammattipätevyyskoulutukseen."
            }
          }
        ],
        categories: [
          {
            anchor: `ajoneuvokanta-kentat`,
            styleClasses: ["pl-0"],
            components: [
              {
                anchor: "A",
                name: "TextBox",
                properties: {
                  labelStyles: {},
                  placeholder: "Linja-autojen määrä"
                }
              },
              {
                anchor: "B",
                name: "TextBox",
                properties: {
                  labelStyles: {},
                  placeholder: "Kuorma-autojen määrä"
                }
              },
              {
                anchor: "C",
                name: "TextBox",
                properties: {
                  labelStyles: {},
                  placeholder: "Perävaunujen määrä"
                }
              }
            ]
          }
        ]
      }
    ]
  };
};

const muutOpetusvalineet = (anchorNumber, orderCode) => {
  return {
    anchor: anchorNumber,
    styleClasses: ["border-t px-4 py-8 hover:bg-gray-100"],
    components: [
      {
        anchor: "muut-opetusvalineet-label",
        name: "StatusTextRow",
        styleClasses: ["text-base"],
        properties: {
          code: orderCode,
          labelStyles: {},
          title: "Muut opetusvälineet"
        }
      }
    ],
    categories: [
      {
        anchor: `muut-opetusvalineet-info`,
        styleClasses: ["pl-6"],
        components: [
          {
            anchor: "A",
            name: "TextBox",
            properties: {
              labelStyles: {},
              placeholder:
                "Asetuksen mukaiset opetus- ja havaintovälineet (VnAsetus 434/2018, 11 § 1 ja 2 mom.)"
            }
          }
        ]
      },
      {
        anchor: "muut-opetusvalineet",
        styleClasses: ["pl-2"],
        components: [
          {
            anchor: "muut-opetusvalineet-label",
            name: "StatusTextRow",
            styleClasses: ["pl-4"],
            properties: {
              title: "Muut opetus- ja havaintovälineet"
            }
          }
        ]
      },
      {
        anchor: "muut-opetus-ja-havaintovalineet",
        styleClasses: ["pl-6"],
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