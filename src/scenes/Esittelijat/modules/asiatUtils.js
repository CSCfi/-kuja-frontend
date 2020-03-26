import * as R from "ramda";
import common from "../../../i18n/definitions/common";
import moment from "moment";

const asiatTableColumnSetup = [
  { titleKey: common["asiaTable.headers.asianumero"], widthClass: "w-2/12" },
  { titleKey: common["asiaTable.headers.asia"], widthClass: "w-2/12" },
  { titleKey: common["asiaTable.headers.asiakas"], widthClass: "w-2/12" },
  { titleKey: common["asiaTable.headers.maakunta"], widthClass: "w-2/12" },
  { titleKey: common["asiaTable.headers.tila"], widthClass: "w-1/12" },
  { titleKey: common["asiaTable.headers.saapunut"], widthClass: "w-2/12" },
  {
    titleKey: common["asiaTable.headers.actions"],
    widthClass: "w-1/12",
    isSortable: false
  }
];

const generateAsiatTableHeaderStructure = t => {
  return {
    role: "thead",
    rowGroups: [
      {
        rows: [
          {
            cells: R.map(item => {
              return {
                isSortable: !(item.isSortable === false),
                truncate: true,
                styleClasses: [item.widthClass],
                text: t(item.titleKey)
              };
            })(asiatTableColumnSetup)
          }
        ]
      }
    ]
  };
};

const getMaakuntaNimiFromHakemus = hakemus => {
  const maakuntaObject = R.find(R.propEq("kieli", "FI"))(
    R.path(["jarjestaja", "maakuntaKoodi", "metadata"], hakemus) || []
  );
  return maakuntaObject ? maakuntaObject.nimi : "";
};

const getJarjestajaNimiFromHakemus = hakemus => {
  return R.path(["jarjestaja", "nimi", "fi"], hakemus) || "";
};

// Generates common row data for all Asiat-tables
export const generateAsiaTableRows = (row, i, t) => {
  const paivityspvm = row.paivityspvm
    ? moment(row.paivityspvm).format("D.M.YYYY")
    : "";
  return R.addIndex(R.map)(
    (col, j) => {
      return {
        truncate: true,
        styleClasses: [asiatTableColumnSetup[j].widthClass],
        text: col.text
      };
    },
    [
      { text: "" }, //TODO: Fill when mechanism for Asianumero assignment exists. Currently no source.
      { text: t(common["asiaTypes.lupaChange"]) }, // Only one type known in system at this juncture
      { text: getJarjestajaNimiFromHakemus(row) },
      { text: getMaakuntaNimiFromHakemus(row) },
      {
        text: t(common[`asiaStates.esittelija.${row.tila}`]) || ""
      },
      { text: paivityspvm }
    ]
  );
};

export const generateAvoimetAsiatTableStructure = (hakemusList, t) => {
  return [
    generateAsiatTableHeaderStructure(t),
    {
      role: "tbody",
      rowGroups: [
        {
          rows: R.addIndex(R.map)((row, i) => {
            return {
              id: row.uuid,
              onClick: (row, action) => {
                if (action === "esittelyyn") {
                  // todo: back end call for Merkitse esittelyssä
                  console.log("Merkitse esittelyssä");
                } else if (action === "paata") {
                  // todo: back end call for Merkitse päätetyksi
                  console.log("Merkitse päätetyksi");
                }
              },
              cells: generateAsiaTableRows(row, i, t).concat({
                menu: {
                  id: `simple-menu-${i}`,
                  actions: [
                    {
                      id: "esittelyyn",
                      text: t(common["asiaTable.actions.esittelyssa"])
                    },
                    {
                      id: "paata",
                      text: t(common["asiaTable.actions.paatetty"])
                    }
                  ]
                },
                styleClasses: [
                  asiatTableColumnSetup[asiatTableColumnSetup.length - 1]
                    .widthClass
                ]
              })
            };
          }, hakemusList)
        }
      ]
    },
    {
      role: "tfoot"
    }
  ];
};

export const generatePaatetytAsiatTableStructure = (hakemusList, t) => {
  return [
    generateAsiatTableHeaderStructure(t),
    {
      role: "tbody",
      rowGroups: [
        {
          rows: R.addIndex(R.map)((row, i) => {
            return {
              id: row.uuid,
              onClick: (row, action) => {
                if (action === "lataa") {
                  // todo: back end call for Lataa PDF
                  console.log("Lataa PDF");
                }
              },
              cells: generateAsiaTableRows(row, i, t).concat({
                menu: {
                  id: `simple-menu-${i}`,
                  actions: [
                    {
                      id: "lataa",
                      text: t(common["asiaTable.actions.lataa"])
                    }
                  ]
                },
                styleClasses: [
                  asiatTableColumnSetup[asiatTableColumnSetup.length - 1]
                    .widthClass
                ]
              })
            };
          }, hakemusList)
        }
      ]
    },
    {
      role: "tfoot"
    }
  ];
};
