import React, { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import JarjestamislupaAsiatListItem from "./JarjestamislupaAsiatListItem";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/AddCircleOutline";
import ArrowBack from "@material-ui/icons/ArrowBack";
import _ from "lodash";
import JarjestamislupaAsiakirjat from "./JarjestamislupaAsiakirjat";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";
import common from "../../../../i18n/definitions/common";
import Table from "../../../../components/02-organisms/Table";
import * as R from "ramda";
import moment from "moment";
import { ROLE_KATSELIJA } from "../../../../modules/constants";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginTop: 0
  },
  table: {
    minWidth: 650
  }
}));

const colWidths = {
  0: "w-2/12",
  1: "w-2/12",
  2: "w-2/12",
  3: "w-2/12",
  4: "w-2/12",
  5: "w-2/12 justify-center"
};

const columnTitles = [
  LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.DNRO.FI,
  LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.ASIA.FI,
  LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.TILA.FI,
  LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.MAARAAIKA.FI,
  LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.PAATETTY.FI
];

const JarjestamislupaAsiatList = ({
  history,
  match,
  muutospyynnot = [],
  newApplicationRouteItem,
  organisaatio,
  intl
}) => {
  const { url } = match;
  const classes = useStyles();
  const [muutospyynto, setMuutospyynto] = useState(null);

  const tableData = useMemo(() => {
    const data = R.map(muutospyynto => {
      return {
        luontipvm: moment(muutospyynto.luontipvm).format("DD.MM.YYYY HH:mm:ss"),
        paatetty: R.path(["paatoskierros", "loppupvm"], muutospyynto),
        tila: LUPA_TEKSTIT.MUUTOSPYYNTO.TILA[muutospyynto.tila].FI,
        uuid: muutospyynto.uuid
      };
    }, muutospyynnot);
    return data;
  }, [muutospyynnot]);

  const mainTable = [
    {
      role: "thead",
      rowGroups: [
        {
          rows: [
            {
              cells: R.addIndex(R.map)((title, ii) => {
                return {
                  truncate: false,
                  styleClasses: [colWidths[ii]],
                  text: title,
                  sortingTooltip: "Järjestä sarakkeen mukaan"
                };
              }, columnTitles).concat({
                text: "Toiminnot",
                styleClasses: [colWidths[5]]
              })
            }
          ]
        }
      ]
    },
    {
      role: "tbody",
      rowGroups: [
        {
          rows: R.addIndex(R.map)((row, i) => {
            let cells = R.addIndex(R.map)(
              (col, ii) => {
                return {
                  truncate: true,
                  styleClasses: [colWidths[ii]],
                  text: col.text
                };
              },
              [
                { text: "" },
                { text: "Järjestämisluvan muutos" },
                { text: row.tila },
                { text: "" },
                { text: row.paatetty }
              ]
            );
            if (sessionStorage.getItem("role") !== ROLE_KATSELIJA) {
              cells = R.append(
                {
                  menu: {
                    id: `simple-menu-${i}`,
                    actions: [
                      {
                        id: "start-preparing",
                        text: "Ota valmisteluun"
                      },
                      {
                        id: "delete",
                        text: "Poista"
                      }
                    ]
                  },
                  styleClasses: [colWidths[5]]
                },
                cells
              );
            } else {
              cells = R.append({ styleClasses: [colWidths[5]] }, cells);
            }
            return {
              id: row.uuid,
              onClick: (row, action) => {
                if (action === "click" && row.id) {
                  setMuutospyynto(
                    R.find(R.propEq("uuid", row.id), muutospyynnot)
                  );
                } else if (action === "edit") {
                  history.push(`hakemukset-ja-paatokset/${row.id}/1`);
                }
              },
              cells: cells
            };
          }, tableData)
        }
      ]
    },
    {
      role: "tfoot"
    }
  ];

  const jarjestamislupaAsiatList = useMemo(() => {
    const data = _.orderBy(muutospyynnot, ["voimassaalkupvm"], ["desc"]);
    return _.map(data, historyData => (
      <JarjestamislupaAsiatListItem
        url={url}
        muutospyynto={historyData}
        key={historyData.uuid}
        setOpened={() => setMuutospyynto(historyData)}
      />
    ));
  }, [url, muutospyynnot]);

  let hasRights = sessionStorage.getItem("role") !== ROLE_KATSELIJA;
  return (
    <React.Fragment>
      <div className="mb-2">
        {muutospyynto && (
          <Button color="primary" onClick={() => setMuutospyynto(null)}>
            <ArrowBack />
            <span className="pl-2">
              {intl.formatMessage(common.backFromAsiakirjat)}
            </span>
          </Button>
        )}
        {!muutospyynto && hasRights && (
          <NavLink
            className="mb-2"
            to={newApplicationRouteItem.path}
            exact={newApplicationRouteItem.exact}
            style={{ textDecoration: "none", color: "inherit" }}>
            <Button color="primary" className="newHakemus">
              <Add />
              <span className="pl-2">{newApplicationRouteItem.text}</span>
            </Button>
          </NavLink>
        )}
      </div>

      {muutospyynto && (
        <div>
          <h3 className="mt-4 mb-2">
            {intl.formatMessage(common.hakemusAsiakirjat)}
          </h3>
          <Paper className={classes.root}>
            <JarjestamislupaAsiakirjat
              organisaatio={organisaatio}
              muutospyynto={muutospyynto}
              intl={intl}
            />
          </Paper>
        </div>
      )}

      {!muutospyynto && muutospyynnot && muutospyynnot.length > 0 && (
        <Paper className={classes.root}>
          <div className="lg:hidden">
            <div>{jarjestamislupaAsiatList}</div>
          </div>
          <div className="hidden lg:block">
            <Table structure={mainTable}></Table>
          </div>
        </Paper>
      )}
    </React.Fragment>
  );
};

JarjestamislupaAsiatList.propTypes = {
  history: PropTypes.object,
  lupahistory: PropTypes.array,
  match: PropTypes.object,
  muutospyynnot: PropTypes.array,
  newApplicationRouteItem: PropTypes.object
};

export default injectIntl(JarjestamislupaAsiatList);
