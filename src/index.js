import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";
import App from "./scenes/App";

import "./css/tailwind.css";

const store = configureStore({
  user: {
    user: 'Raipe'
  }
});

const target = document.querySelector("#root");

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
