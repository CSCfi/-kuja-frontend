import * as R from "ramda";
import common from "../../../i18n/definitions/common";
import {resolveLocalizedOrganizerName} from "../../../modules/helpers";

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
          rows: R.addIndex(R.map)(lupa => {
            const jarjestajanNimi =
              resolveLocalizedOrganizerName(lupa, intl.locale) ||
              "[nimi puuttuu]";
            const maakunta = R.find(
              R.propEq("kieli", R.toUpper(intl.locale)),
              lupa.jarjestaja.maakuntaKoodi.metadata
            );
            return {
              id: lupa.jarjestajaYtunnus,

              onClick: row => {
                console.log(lupa)
                if (history) {
                  history.push(`/lupa/${lupa.uuid}`);
                } else {
                  console.error(
                    intl.formatMessage(common.errorLoadingLupa)
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
                [{ text: jarjestajanNimi }, { text: vstMap[lupa.oppilaitostyyppi] }]
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
