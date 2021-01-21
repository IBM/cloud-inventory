//Import Geral
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem("currentAccount") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/accounts", state: { from: props.location } }}
        />
      )
    }
  />
);

const App = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await ipcRenderer.invoke("account:get", {
        log: "Getting accounts",
      });
      setAccounts(accounts);
      if (accounts.length !== 0) {
        sessionStorage.setItem("currentAccount", JSON.stringify(accounts[0]));
      }
    };
    fetchAccounts();
  }, []);
  return (
    <div className="app">
      <Header accounts={accounts} />
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/accounts" component={Accounts} />
          <PrivateRoute path="/classic/vsi" component={VirtualServerClassic} />
        </Switch>
      </Content>
    </div>
  );
};

export default App;
