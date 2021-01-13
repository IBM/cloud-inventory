import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter as Route } from "react-router-dom";

import "./index.scss";

ReactDOM.render(
  <Route>
    <App />
  </Route>,
  document.getElementById("root")
);
