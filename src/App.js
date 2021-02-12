//Import Geral
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Content } from "carbon-components-react/lib/components/UIShell";

//Import dos componentes
import Header from "./components/Header";

//Import das paginas
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import VirtualServerClassic from "./pages/Classic/VirtualServerClassic";
import BareMetal from "./pages/Classic/BareMetal";
import VPC from "./pages/VPC/Overview";
import VirtualServerVPC from "./pages/VPC/VirtualServer";
import SubnetVPC from "./pages/VPC/Subnet";

//Import do CSS
import "./App.scss";

const { ipcRenderer } = window.require("electron");

// Controle para as rotas
// Se o usuario nao tiver nenhuma conta cadastrada no app
// ele é redirecionado para a pagina /accounts
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

  //Busca os dados das contas
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

  //
  return (
    <div className="app">
      <Header accounts={accounts} />
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/accounts" component={Accounts} />
          <PrivateRoute path="/classic/vsi" component={VirtualServerClassic} />
          <PrivateRoute path="/classic/bm" component={BareMetal} />
          <PrivateRoute path="/vpc/overview" component={VPC} />
          <PrivateRoute path="/vpc/vsi" component={VirtualServerVPC} />
          <PrivateRoute path="/vpc/subnet" component={SubnetVPC} />
        </Switch>
      </Content>
    </div>
  );
};

export default App;