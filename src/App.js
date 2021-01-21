//Import Geral
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Content } from "carbon-components-react/lib/components/UIShell";

//Import dos componentes
import Header from "./components/Header";

//Import das paginas
import Home from "./pages/Home";
import VirtualServerClassic from "./pages/VirtualServerClassic";
import Accounts from "./pages/Accounts";

//Import do CSS
import "./App.scss";

const { ipcRenderer } = window.require("electron");

const App = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await ipcRenderer.invoke("account:get", {
        log: "Getting accounts",
      });
      //sessionStorage.setItem("accounts", JSON.stringify(accounts));
      setAccounts(accounts);
    };
    fetchAccounts();
  }, []);
  return (
    <div className="app">
      <Header accounts={accounts} />
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/classic/vsi" component={VirtualServerClassic} />
          <Route path="/accounts" component={Accounts} />
        </Switch>
      </Content>
    </div>
  );
};

export default App;
