import React from "react";
import { Helmet } from "react-helmet";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { PropTypes } from "prop-types";
import AvoimetAsiat from "./components/AvoimetAsiat";
import { Route, Switch, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import common from "../../i18n/definitions/common";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from "@material-ui/core/Link";

const Esittelijat = ({ match, user, history }) => {
  const intl = useIntl();
  const t = intl.formatMessage;
  const location = useLocation();
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Oiva | ${t(common.asiat)}`}</title>
      </Helmet>
      <div className="w-full max-w-screen-xl mx-auto px-3 lg:px-8 py-8">
        <BreadcrumbsItem to="/">{t(common.frontpage)}</BreadcrumbsItem>
        <BreadcrumbsItem to="/asiat">{t(common.asiat)}</BreadcrumbsItem>
        <div className="mx-auto w-full mb-8">
          <h1>{t(common.asiat)}</h1>
        </div>
        <Tabs
          value={location.pathname}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, val) => {
            history.push(val);
          }}
          aria-label="Asiat">
          <Tab
            label={t(common.asiatOpen)}
            component={Link}
            to={`${match.url}/avoimet`}
            value={`${match.url}` || `${match.url}/avoimet`}
          />
          <Tab
            label="Päätetyt"
            label={t(common.asiatReady)}
            component={Link}
            to={`${match.url}/paatetyt`}
            value={`${match.url}/paatetyt`}
          />
        </Tabs>
      </div>
      <div className="w-full max-w-screen-xl mx-auto px-3 lg:px-8 py-8">
        <Switch>
          <Route
            authenticated={!!user}
            path={`${match.url}`}
            render={() => <AvoimetAsiat />}
          />
          <Route
            authenticated={!!user}
            path={`${match.url}/avoimet`}
            render={() => <AvoimetAsiat />}
          />
          <Route
            authenticated={!!user}
            path={`${match.url}/paatetyt`}
            render={() => <AvoimetAsiat />}
          />
        </Switch>
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
