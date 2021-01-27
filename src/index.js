import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { HashRouter as Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Use of FontAwrsome Icons

ReactDOM.render(
  <Route>
    <App />
  </Route>,
  document.getElementById("root")
);
