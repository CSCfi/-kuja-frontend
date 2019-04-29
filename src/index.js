import React from "react";
import { render } from "react-dom";
import Store from "context/store";
import {ThroughProvider} from 'react-through'
import App from "./App";

import "./css/tailwind.css";

render(
  <Store>
    <ThroughProvider>
      <App />
    </ThroughProvider>
  </Store>,
  document.getElementById("root")
);
