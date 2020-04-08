import React, { useMemo } from "react";
import { PropTypes } from "prop-types";
import Asiat from "./components/Asiat";
import Asiakirjat from "./components/Asiakirjat";
import { Route, Switch, useLocation } from "react-router-dom";
import * as R from "ramda";

const Esittelijat = ({ match, user, history }) => {
  const location = useLocation();

  const uuid = useMemo(() => R.split("asiat/", location.pathname)[1], [
    location.pathname
  ]);

  return (
    <React.Fragment>
      <Switch>
        <Route
          authenticated={!!user}
          exact
          path={`${match.url}`}
          render={() => <Asiat history={history} match={match} user={user} />}
        />
        <Route
          authenticated={!!user}
          exact
          path={`${match.url}/paatetyt`}
          render={() => <Asiat history={history} match={match} user={user} />}
        />
        <Route
          authenticated={!!user}
          exact
          path={`${match.url}/:uuid`}
          render={() => <Asiakirjat history={history} uuid={uuid} />}
        />
      </Switch>
    </React.Fragment>
  );
};

Esittelijat.propTypes = {
  match: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object
};

export default Esittelijat;
