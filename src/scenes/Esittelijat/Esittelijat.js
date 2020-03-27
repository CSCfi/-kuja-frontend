import React from "react";
import { Helmet } from "react-helmet";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { PropTypes } from "prop-types";
import AvoimetAsiat from "./components/AvoimetAsiat";
import PaatetytAsiat from "./components/PaatetytAsiat";
import { Route, Switch, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import common from "../../i18n/definitions/common";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const OivaTab = withStyles(theme => ({
  root: {
    minWidth: 0,
    textTransform: "none",
    color: "#333 !important",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    padding: 0,
    marginRight: "2rem",
    marginLeft: "0.3em",
    marginTop: "0.3em"
  }
}))(props => <Tab {...props} />);

const OivaTabs = withStyles(theme => ({
  root: {},
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "0.3rem !important",
    "& > div": {
      width: "100%",
      backgroundColor: "green"
    }
  }
}))(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const Esittelijat = ({ match, user, history }) => {
  const intl = useIntl();
  const t = intl.formatMessage;
  const location = useLocation();
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Oiva | ${t(common.asiat)}`}</title>
      </Helmet>

      <div
        className="flex flex-col justify-end w-full h-40 max-w-screen-xl mx-auto px-3 lg:px-8"
        style={{
          borderTop: "0.05rem solid #E3E3E3"
        }}>
        <div className="flex items-center">
          <div className="flex-1">
            <BreadcrumbsItem to="/">{t(common.frontpage)}</BreadcrumbsItem>
            <BreadcrumbsItem to="/asiat">{t(common.asiat)}</BreadcrumbsItem>
            <div className="mx-auto w-full my-6 flex flex-row justify-between">
              <h1 style={{ marginLeft: "0.3rem", marginTop: "1rem" }}>
                {t(common.asiat)}
              </h1>
              <Button
                aria-label={t(common.luoUusiAsia)}
                color="primary"
                variant="contained"
                style={{ marginTop: "1.7rem", marginBottom: "-1.5rem" }}>
                {t(common.luoUusiAsia)}
              </Button>
            </div>
            <OivaTabs
              value={location.pathname}
              indicatorColor="primary"
              textColor="primary"
              onChange={(e, val) => {
                history.push(val);
              }}>
              <OivaTab
                label={t(common.asiatOpen)}
                aria-label={t(common.asiatReady)}
                to={`${match.url}/avoimet`}
                value={`${match.url}` || `${match.url}/avoimet`}
              />
              <OivaTab
                label={t(common.asiatReady)}
                aria-label={t(common.asiatReady)}
                to={`${match.url}/paatetyt`}
                value={`${match.url}/paatetyt`}
              />
            </OivaTabs>
          </div>
        </div>
      </div>

      <div
        className="flex-1 flex w-full"
        style={{ borderTop: "0.05rem solid #E3E3E3", background: "#FAFAFA" }}>
        <div className="flex-1 flex flex-col w-full max-w-screen-xl mx-auto px-3 lg:px-8 py-12">
          <div
            className="flex-1 bg-white"
            style={{ border: "0.05rem solid #E3E3E3" }}>
            <Switch>
              <Route
                authenticated={!!user}
                exact
                path={`${match.url}`}
                render={() => <AvoimetAsiat />}
              />
              <Route
                authenticated={!!user}
                exacts
                path={`${match.url}/avoimet`}
                render={() => <AvoimetAsiat />}
              />
              <Route
                authenticated={!!user}
                exact
                path={`${match.url}/paatetyt`}
                render={() => <PaatetytAsiat />}
              />
            </Switch>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Esittelijat.propTypes = {
  match: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object
};

export default Esittelijat;
