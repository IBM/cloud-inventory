import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { HashRouter as Route } from "react-router-dom";

ReactDOM.render(
  <Route>
    <App />
  </Route>,
  document.getElementById("root")
);
