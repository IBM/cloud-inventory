import React from "react";
import { Route, Switch } from "react-router-dom";
import { Content } from "carbon-components-react/lib/components/UIShell";
import "./App.scss";

import Header from "./components/Header";

import VirtualServerClassic from "./pages/VirtualServerClassic";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Content>
        <Switch>
          <Route exact path="/" />
          <Route path="/vsi/classic" component={VirtualServerClassic} />
        </Switch>
      </Content>
    </div>
  );
};

export default App;
