import React, { useContext, useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Login from "scenes/Login/Login";
import Logout from "scenes/Logout/Logout";
import Header from "scenes/Header/Header";
import Footer from "scenes/Footer/Footer";
import Jarjestajat from "scenes/Jarjestajat/Jarjestajat";
import { COLORS } from "./modules/styles";
import { APP_WIDTH } from "modules/styles";
import Home from "scenes/Home/components/Home";
// import { QueryParamProvider } from "use-query-params";
import CasAuthenticated from "scenes/CasAuthenticated/CasAuthenticated";
// import { ConnectedRouter } from "connected-react-router";
import Tilastot from "./scenes/Tilastot/components/Tilastot";
import RequireCasAuth from "scenes/Login/services/RequireCasAuth";
import DestroyCasAuth from "scenes/Logout/services/DestroyCasAuth";
import Lukiokoulutus from "./scenes/Lukiokoulutus/components/Lukiokoulutus";
import { BreadcrumbsContainer } from "./modules/elements";
// import { BreadcrumbsProvider, Breadcrumbs } from "react-breadcrumbs-dynamic";
import { Breadcrumbs } from "react-breadcrumbs-dynamic";
import EsiJaPerusopetus from "scenes/EsiJaPerusopetus/components/EsiJaPerusopetus";
import VapaaSivistystyo from "./scenes/VapaaSivistystyo/components/VapaaSivistystyo";
import JarjestajaSwitch from "scenes/Jarjestajat/Jarjestaja/components/JarjestajaSwitch";
import { NavLink } from "react-dom";
import { createBrowserHistory } from "history";
import { UserContext } from "./context/userContext";
import { getRoles } from "services/kayttajat/actions";

const history = createBrowserHistory();

const App = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    getRoles()(dispatch);
  }, []);

  return (
    <Router history={ history }>
      <div className="flex flex-col min-h-screen">
        <header>
          <Header
            user={state.user}
            oppilaitos={state.oppilaitos}
            dispatch={dispatch}
            maxWidth={`${APP_WIDTH}`}
          />
        </header>

        <main className="flex-1">
          <BreadcrumbsContainer>
            <Breadcrumbs
              separator={<b> / </b>}
              item={NavLink}
              finalItem={"b"}
              finalProps={{
                style: {
                  color: COLORS.BLACK
                }
              }}
            />
          </BreadcrumbsContainer>
          <div className="flex flex-1 flex-col">
            <Switch>
              {<Route exact path="/" component={Home} />}
              {<Route path="/logout" component={Logout} />}
              {<Route path="/kirjaudu" component={Login} />}
              {<Route exact path="/tilastot" component={Tilastot} />}
              {<Route path="/cas-auth" component={RequireCasAuth} />}
              {<Route path="/cas-logout" component={DestroyCasAuth} />}
              {<Route path="/cas-ready" component={CasAuthenticated} />}
              {<Route exact path="/jarjestajat" component={Jarjestajat} />}
              {<Route exact path="/lukiokoulutus" component={Lukiokoulutus} />}
              {
                <Route
                  exact
                  path="/vapaa-sivistystyo"
                  component={VapaaSivistystyo}
                />
              }
              {
                <Route
                  exact
                  path="/esi-ja-perusopetus"
                  component={EsiJaPerusopetus}
                />
              }
              {
                <Route
                  path="/jarjestajat/:ytunnus"
                  component={JarjestajaSwitch}
                />
              }
            </Switch>
          </div>
        </main>
        <footer>
          <Footer maxWidth={`${APP_WIDTH}`} />
        </footer>
      </div>
    </Router>
  );
};

export default App;

/* <BreadcrumbsProvider>
<ConnectedRouter history={history}>
  <QueryParamProvider ReactRouterRoute={Route}>
    <div className="flex flex-col min-h-screen">
      <header>
        <Header maxWidth={`${APP_WIDTH}`} />
      </header>

      <main className="flex-1">
        <BreadcrumbsContainer>
          <Breadcrumbs
            separator={<b> / </b>}
            item={NavLink}
            finalItem={"b"}
            finalProps={{
              style: {
                color: COLORS.BLACK
              }
            }}
          />
        </BreadcrumbsContainer>
        <div className="flex flex-1 flex-col">
          {<Route exact path="/" component={Home} />}
          {<Route path="/logout" component={Logout} />}
          {<Route path="/kirjaudu" component={Login} />}
          {<Route exact path="/tilastot" component={Tilastot} />}
          {<Route path="/cas-auth" component={RequireCasAuth} />}
          {<Route path="/cas-logout" component={DestroyCasAuth} />}
          {<Route path="/cas-ready" component={CasAuthenticated} />}
          {<Route exact path="/jarjestajat" component={Jarjestajat} />}
          {
            <Route
              exact
              path="/lukiokoulutus"
              component={Lukiokoulutus}
            />
          }
          {
            <Route
              exact
              path="/vapaa-sivistystyo"
              component={VapaaSivistystyo}
            />
          }
          {
            <Route
              exact
              path="/esi-ja-perusopetus"
              component={EsiJaPerusopetus}
            />
          }
          {
            <Route
              path="/jarjestajat/:ytunnus"
              component={JarjestajaSwitch}
            />
          }
        </div>
      </main>

      <footer>
        <Footer maxWidth={`${APP_WIDTH}`} />
      </footer>
    </div>
  </QueryParamProvider>
</ConnectedRouter>
</BreadcrumbsProvider> */

// const [valueGlobal, setValueGlobal] = useState(0);

// const [stateReducer1, dispatchReducer1] = useReducer(
//   Reducer1.Reducer1,
//   Reducer1.initialState
// );
// const [stateContext, dispatchContext] = useReducer(
//   UserReducer.UserReducer,
//   UserReducer.initialState
// );

// const incrementValueGlobal = () => {
//   setValueGlobal(valueGlobal + 1);
// };

// const decrementValueGlobal = () => {
//   setValueGlobal(valueGlobal - 1);
// };

// const handleDispatchContextTrue = () => {
//   //    dispatch2(type: "SUCCESS")
//   //    dispatch2(ACTIONS.SUCCESS)
//   dispatchReducer1(ACTIONS.success());
// };

// const handleDispatchContextFalse = () => {
//   //     dispatch2(type: "FAILURE")
//   //    dispatch2(ACTIONS.FAILURE)
//   dispatchReducer1(ACTIONS.failure());
// };

// const handleuseContextChange = event => {
//   dispatchContext(ACTIONS.user_input_change(event.target.value));
// };

// const handleuseContextSubmit = event => {
//   event.preventDefault();
//   event.persist();
//   dispatchContext(ACTIONS.user_input_submit(event.target.useContext.value));
// };
