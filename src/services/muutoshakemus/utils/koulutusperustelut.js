import * as R from "ramda";

export const getKuljettajakoulutusPerustelulomakeByCode = code => {
  const forms = {
    "3": [
      {
        anchor: code,
        title: "Lyhyt normilomake"
      }
    ],
    "4": [
      {
        anchor: `${code}-1`,
        title: "Jatkokoulutusta antavan koulutuskeskuksen tehtävä",
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
        anchor: `${code}-2`,
        components: [
          {
            anchor: "voimassaolo-label",
            name: "StatusTextRow",
            properties: {
              code: 2,
              labelStyles: {},
              title:
                "Onko hakijalla voimassa olevaa Liikenne- ja turvallisuusviraston (Trafi) myöntämää lupaa järjestää ammattipätevyyskoulutusta?"
            }
          }
        ],
        categories: [
          {
            anchor: "voimassaolo-field-no",
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
      },
      {
        anchor: `${code}-3`,
        components: [
          {
            anchor: "suunnitelma-label",
            name: "StatusTextRow",
            properties: {
              code: 3,
              labelStyles: {},
              title: "Suunnitelma ammattipätevyyskoulutuksen järjestämiseksi"
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
                    "Toimintamalli ammattipätevyyskoulutuksen suunnittelusta ja toteutuksesta."
                }
              }
            ]
          }
        ]
      },
      {
        anchor: `${code}-4`,
        components: [
          {
            anchor: "osaaminen-label",
            name: "StatusTextRow",
            properties: {
              code: 4,
              labelStyles: {},
              title: "Koulutusohjelmien edellyttämä osaaminen"
            }
          }
        ],
        categories: [
          {
            anchor: "osaaminen-field",
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
      },
      {
        anchor: `${code}-5`,
        components: [
          {
            anchor: "johtaja-label",
            name: "StatusTextRow",
            properties: {
              code: 5,
              labelStyles: {},
              title: "Opetuksesta vastaavan johtajan kelpoisuus ja työkokemus"
            }
          }
        ],
        categories: [
          {
            anchor: `johtaja-info`,
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
          }
        ]
      }
    ]
  };

  return R.prop(code, forms);
};
