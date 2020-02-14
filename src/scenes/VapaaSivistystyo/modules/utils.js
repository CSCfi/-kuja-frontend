import * as R from "ramda";
import common from "../../../i18n/definitions/common";

const colWidths = {
  0: "w-4/6",
  1: "w-2/6"
};

export const generateVSTTableStructure = (tableData = [], intl, vstMap, history) => {
  return [
    {
      role: "thead",
      rowGroups: [
        {
          rows: [
            {
              cells: R.addIndex(R.map)(
                (col, ii) => {
                  return {
                    isSortable: true,
                    truncate: true,
                    styleClasses: [colWidths[ii]],
                    text: col.text
                  };
                },
                [
                  { text: intl.formatMessage(common.jarjestaja) },
                  { text: intl.formatMessage(common.oppilaitostyyppi) }
                ]
              )
            }
          ]
        }
      ]
    },
    {
      role: "tbody",
      rowGroups: [
        {
          rows: R.addIndex(R.map)(row => {
            const jarjestajanNimi =
              row.jarjestaja.nimi[intl.locale] ||
              row.jarjestaja.nimi.fi ||
              "[nimi puuttuu]";
            const maakunta = R.find(
              R.propEq("kieli", R.toUpper(intl.locale)),
              row.jarjestaja.maakuntaKoodi.metadata
            );
            return {
              id: row.jarjestajaYtunnus,

              onClick: row => {
                if (history) {
                  history.push(`luvat/${row.id}`);
                } else {
                  console.error(
                    "Järjestämislupatietojen näyttäminen epäonnistui."
                  );
                }
              },

              cells: R.addIndex(R.map)(
                (col, ii) => {
                  return {
                    truncate: true,
                    styleClasses: [colWidths[ii]],
                    text: col.text
                  };
                },
                [{ text: jarjestajanNimi }, { text: vstMap[row.oppilaitostyyppi] }]
              )
            };
          }, tableData)
        }
      ]
    },
    {
      role: "tfoot"
    }
  ];
};
