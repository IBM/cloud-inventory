import React from "react";
import "./App.scss";
import { Button } from "carbon-components-react";

import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <h1>Roi</h1>
      <Button>Button</Button>
    </div>
  );
};

export default App;
