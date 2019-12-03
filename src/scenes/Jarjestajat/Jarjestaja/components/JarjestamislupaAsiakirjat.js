import * as R from "ramda";
import React, { useContext, useMemo } from "react";
import Media from "react-media";
import styled from "styled-components";
import { Table as OldTable, Tbody } from "../../../../modules/Table";
import { MEDIA_QUERIES } from "../../../../modules/styles";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import JarjestamislupaAsiakirjatItem from "./JarjestamislupaAsiakirjatItem";
import common from "../../../../i18n/definitions/common";
import PropTypes from "prop-types";
import FetchHandler from "../../../../FetchHandler";
import { BackendContext } from "../../../../context/backendContext";
import Moment from "react-moment";
import { downloadFileFn } from "../../../../utils/common";
import Table from "../../../../components/02-organisms/Table";

const WrapTable = styled.div``;

const colWidths = {
  0: "w-4/12",
  1: "w-3/12",
  2: "w-3/12",
  3: "w-2/12"
};

const columnTitles = [
  common.document,
  common.documentStatus,
  common.author,
  common.sent
];

const JarjestamislupaAsiakirjat = ({ muutospyynto, organisaatio, intl }) => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);
  const fetchSetup = useMemo(() => {
    return muutospyynto && muutospyynto.uuid
      ? [
          {
            key: "muutospyynnonLiitteet",
            dispatchFn: dispatch,
            urlEnding: muutospyynto.uuid
          }
        ]
      : [];
  }, [dispatch, muutospyynto]);

  const baseRow = [
    LUPA_TEKSTIT.MUUTOSPYYNTO.TILA[muutospyynto.tila][R.toUpper(intl.locale)],
    R.path(["nimi", intl.locale], organisaatio)
  ];

  const liitteetRowItems = useMemo(
    () =>
      R.map(
        liite => ({
          uuid: liite.uuid,
          items: [
            intl.formatMessage(
              liite.salainen ? common.secretAttachment : common.attachment
            ) +
              " " +
              R.prop("nimi", liite),
            ...baseRow,
            liite.luontipvm ? (
              <Moment format="D.M.YYYY">{liite.luontipvm}</Moment>
            ) : (
              ""
            )
          ],
          fileLink: `/liitteet/${liite.uuid}/raw`
        }),
        R.sortBy(
          R.prop("nimi"),
          R.pathOr([], ["muutospyynnonLiitteet", "raw"], fromBackend)
        )
      ),
    [intl, fromBackend, baseRow]
  );

  const muutospyyntoRowItem = {
    fileLink: `/pdf/esikatsele/muutospyynto/${muutospyynto.uuid}`,
    openInNewWindow: true,
    items: [intl.formatMessage(common.application), ...baseRow, ""]
  };

  const jarjestamislupaAsiakirjatList = () => {
    return R.addIndex(R.map)(
      (row, idx) => (
        <JarjestamislupaAsiakirjatItem
          onClick={downloadFileFn({
            url: row.fileLink,
            openInNewWindow: row.openInNewWindow
          })}
          rowItems={row.items}
          key={idx}
        />
      ),
      [muutospyyntoRowItem, ...liitteetRowItems]
    );
  };

  const table = [
    {
      role: "thead",
      rowGroups: [
        {
          rows: [
            {
              cells: R.addIndex(R.map)((title, ii) => {
                return {
                  isSortable: true,
                  truncate: false,
                  styleClasses: [colWidths[ii]],
                  text: intl.formatMessage(title),
                  sortingTooltip: "Järjestä sarakkeen mukaan"
                };
              }, columnTitles)
            }
          ]
        }
      ]
    },
    {
      role: "tbody",
      rowGroups: [
        {
          rows: R.addIndex(R.map)(
            row => {
              return {
                fileLink: row.fileLink,
                onClick: (row, action) => {
                  if (action === "click" && row.fileLink) {
                    downloadFileFn({
                      url: row.fileLink,
                      openInNewWindow: row.openInNewWindow
                    })();
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
                  [
                    { text: row.items[0] },
                    { text: row.items[1] },
                    { text: row.items[2] },
                    { text: row.items[3] }
                  ]
                )
              };
            },
            [muutospyyntoRowItem, ...liitteetRowItems]
          )
        }
      ]
    },
    {
      role: "tfoot"
    }
  ];

  return (
    <FetchHandler
      fetchSetup={fetchSetup}
      ready={
        <WrapTable>
          <Media
            query={MEDIA_QUERIES.MOBILE}
            render={() => (
              <OldTable role="table">
                <Tbody role="rowgroup">{jarjestamislupaAsiakirjatList()}</Tbody>
              </OldTable>
            )}
          />
          <Media
            query={MEDIA_QUERIES.TABLET_MIN}
            render={() => <Table structure={table} />}
          />
        </WrapTable>
      }
    />
  );
};

JarjestamislupaAsiakirjat.propTypes = {
  match: PropTypes.object,
  muutospyynto: PropTypes.object,
  organisaatio: PropTypes.object,
  intl: PropTypes.object
};

export default JarjestamislupaAsiakirjat;
