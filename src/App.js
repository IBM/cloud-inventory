import React from "react";
import { Content } from "carbon-components-react/lib/components/UIShell";
import "./App.scss";

import Header from "./components/Header";
import Table from "./components/Table";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Content>
        <Table />
      </Content>
    </div>
  );
};

export default App;
