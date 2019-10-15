import React, {useContext, useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import JarjestamislupaAsiatListItem from "./JarjestamislupaAsiatListItem";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import ArrowBack from "@material-ui/icons/ArrowBack";
import _ from "lodash";
import JarjestamislupaAsiakirjat from "./JarjestamislupaAsiakirjat";
import { Typography } from "@material-ui/core";
import { MEDIA_QUERIES } from "modules/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Media from "react-media";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const columnTitles = [
  LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.DNRO.FI,
  LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.ASIA.FI,
  LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.TILA.FI,
  LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.MAARAAIKA.FI,
  LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.PAATETTY.FI
];

const JarjestamislupaAsiatList = ({lupahistory, newApplicationRouteItem, muutospyynnot, match}) => {
  const { url } = match;
  const breakpointTabletMin = useMediaQuery(MEDIA_QUERIES.TABLET_MIN);
  const classes = useStyles();
  const [state, setState] = useState({
    opened: 0
  });
  const { data } = lupahistory || {};

  const setOpened = dnro => {
    setState({ opened: dnro });
  };

  const renderJarjestamislupaAsiatList = (muutospyynnot) => {
    const data = _.orderBy(muutospyynnot.data, ["voimassaalkupvm"], ["desc"]);
    return _.map(data, (historyData) => (
      <JarjestamislupaAsiatListItem
        url={url}
        muutospyynto={historyData}
        key={historyData.uuid}
        setOpened={setOpened}
      />
    ));
  };

  if (state && state.opened !== 0) {
    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={e => setOpened(0)}>
          <ArrowBack/>
          <span className="pl-2">{LUPA_TEKSTIT.ASIAT.PALAA.FI}</span>
        </Button>
        <Paper className={classes.root}>
          <JarjestamislupaAsiakirjat lupaHistory={lupahistory}/>
        </Paper>
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <div className="flex">
          <div className="mr-4">
            <Button variant="contained" color="primary">
              {breakpointTabletMin && <Add/>}
              <NavLink
                to={newApplicationRouteItem.path}
                exact={newApplicationRouteItem.exact}
                className="pl-2"
                style={{textDecoration: "none", color: "inherit"}}
              >
                {newApplicationRouteItem.text}
              </NavLink>
            </Button>
          </div>
        </div>
        <Paper className={classes.root}>
          <Media
            query={MEDIA_QUERIES.MOBILE}
            render={() => (
              <div>
                <div>{renderJarjestamislupaAsiatList(data)}</div>
              </div>
            )}
          />
          <Media
            query={MEDIA_QUERIES.TABLET_MIN}
            render={() => (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {columnTitles.map((title, i) => (
                      <TableCell key={`title-${i}`}>
                        <span className="text-white">
                          <Typography component="span">
                            {title}
                          </Typography>
                        </span>
                      </TableCell>
                    ))}
                    <TableCell>&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderJarjestamislupaAsiatList(muutospyynnot)}</TableBody>
              </Table>
            )}
          />
        </Paper>
      </div>
    );
  }
};

export default JarjestamislupaAsiatList;
