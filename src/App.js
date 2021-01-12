import React from "react";
import "./App.scss";
import { Button } from "carbon-components-react";

import Header from "./components/Header";
import Table from "./components/Table";

const App = () => {
  return (
    <div>
      <Header />
      <Table />
      <h1>Roi</h1>
      <Button>Button</Button>
    </div>
  );
};

export default App;
