import { HAKEMUS_OTSIKOT } from "../../../../locales/uusiHakemusFormConstants";
import {
  tehtavanTarpeellisuus,
  voimassaOlo,
  suunnitelma,
  osaaminen,
  johtaja,
  opettajien,
  ajoneuvoKanta,
  muutOpetusvalineet
} from "../lomakeosiot/kuljettajakoulutukset";

export function getAdditionForm(isReadOnly, locale) {
  return [
    {
      anchor: "kuljettajien-jatkokoulutuslomake",
      styleClasses: ["px-10 py-10"],
      components: [
        {
          anchor: "jatkokoulutus-title",
          name: "StatusTextRow",
          properties: {
            title: "Jatkokoulutusta antavan koulutuskeskuksen tehtävä"
          }
        }
      ],
      categories: [
        tehtavanTarpeellisuus(1, isReadOnly),
        voimassaOlo(2, isReadOnly),
        suunnitelma(3, isReadOnly),
        osaaminen(4, isReadOnly),
        johtaja(5, isReadOnly),
        opettajien(
          6,
          "Selvitys jatkokoulutuksen opettajien kelpoisuuksista ja työkokemuksista",
          isReadOnly
        ),
        ajoneuvoKanta(7, isReadOnly),
        muutOpetusvalineet(8, isReadOnly)
      ]
    }
  ];
}

export const getAddPeopleForm = (orderNumber, isReadOnly) => {
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
              isReadOnly,
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-liikenneopettajalupa",
                  title: "Liikenneopettajalupa (pakollinen)"
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-kuorma-autonkuljettaja",
                  title:
                    "Voimassa oleva kuorma-autonkuljettajan ammattipätevyys"
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-linja-autonkuljettaja",
                  title: "Voimassa oleva linja-autonkuljettajan ammattipätevyys"
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-c-luokka",
                  title: "C-luokka"
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-ce-luokka",
                  title: "CE-luokka"
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-d-luokka",
                  title: "D-luokka"
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-linja-auto-ammattitutkinto",
                  title: "Linja-auton kuljettajan ammattitutkinto"
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-yhdistelmäajoneuvo-ammattitutkinto",
                  title: "Yhdistelmäajoneuvonkuljettajan ammattitutkinto"
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-puutavara-autokuljetus-ammattitutkinto",
                  title: "Puutavaran autonkuljetuksen ammattitutkinto"
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-kuljetuspalvelut-logistiikan-perustutkinto",
                  title:
                    "Kuljetuspalvelujen koulutusohjelmassa suoritettu logistiikan perustutkinto"
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
                  isChecked: false,
                  isReadOnly,
                  labelStyles: {},
                  name: "checkbox-kuljetusalan-ammattitutkinto",
                  title: "Kuljetusalan ammattitutkinto"
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
        components: [
          {
            anchor: "info",
            name: "StatusTextRow",
            styleClasses: ["w-full"],
            properties: {
              title: HAKEMUS_OTSIKOT.LIITE_OHJE.FI,
              isHidden: isReadOnly
            }
          },
          {
            anchor: "A",
            styleClasses: ["w-full"],
            name: "Attachments",
            properties: {
              isReadOnly
            }
          }
        ]
      }
    ]
  };
};
